import parseRSS from "./public/utils/parseRSS.mjs";

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  console.log(url);
  if (url.pathname === "/podcastList") {
    const podcastURL = url.searchParams.get("searchTerm");
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    var stream = new ReadableStream({
      start(controller) {
        const pageStartFetch = fetch("/pageStart");
        const pageEndFetch = fetch("/pageEnd");
        const dataFetch = fetch(podcastURL, {
          method: "GET",
          mode: "cors"
        }).then(response => {
          const reader = response.body.getReader();
          let data = "";
          const dataStream = new ReadableStream({
            pull: dataController => {
              return reader.read().then(result => {
                if (result.done) {
                  const { html, end } = parseRSS(data);
                  const encodedData = encoder.encode(html);
                  dataController.enqueue(encodedData);
                  data = data.substring(end);
                  dataController.close();
                  return;
                } else {
                  data += decoder.decode(result.value, { stream: true });
                  const { html, end } = parseRSS(data);
                  const encodedData = encoder.encode(html);
                  dataController.enqueue(encodedData);
                  data = data.substring(end);
                }
              });
            },
            cancel: () => {
              reader.cancel();
            }
          });

          return new Response(dataStream, {
            headers: {
              "Content-Type": "text/html; charset=utf-8",
              Connection: "keep-alive",
              "Transfer-Encoding": "chunked"
            }
          });
        });

        function pushStream(stream) {
          // Get a lock on the stream
          var reader = stream.getReader();
          return reader.read().then(function process(result) {
            if (result.done) {
              return;
            }
            controller.enqueue(result.value);
            // Read more & process
            return reader.read().then(process);
          });
        }

        pageStartFetch
          .then(resp => pushStream(resp.body))
          .then(() => dataFetch)
          .then(resp => pushStream(resp.body))
          .then(() => pageEndFetch)
          .then(resp => pushStream(resp.body))
          .then(() => controller.close());
      }
    });

    event.respondWith(
      new Response(stream, {
        headers: { "Content-Type": "text/html" }
      })
    );
  } else {
    // need to fix range header issue for those cors requests.
    // And actually cache things
    // Also actually handle the rest of fetch requests
    // event.respondWith(fetch(event.request, { mode: "cors" }));
  }
});
