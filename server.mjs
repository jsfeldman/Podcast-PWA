// server.js
// where your node app starts
import Stream from "stream";
import Koa from "koa";
import koaStatic from "koa-static";
import matchit from "matchit";
import https from "https";

import xmldom from "xmldom";

import pageStart from "./public/partials/pageStart.mjs";
import pageEnd from "./public/partials/pageEnd.mjs";

import { parseRss } from "./public/utils.mjs";

const app = new Koa();

app.use(koaStatic("public"));

app.use(ctx => {
  if (ctx.url === "/") {
    const inStream = new Stream.Readable({
      read(size) {
        this.push(pageStart);
        this.push(pageEnd);
        this.push(null);
      }
    });
    ctx.type = "text/html";
    ctx.body = inStream;
  } else if (ctx.path === "/podcastList") {
    const searchTerm = ctx.query["searchTerm"];
    /* const inStream = new Stream.Readable({
      read (size) {

      }
    }) */
    ctx.type = "text/html";
    const passThrough = new Stream.PassThrough();
    ctx.body = passThrough;
    passThrough.write(pageStart);

    https.get(searchTerm, resp => {
      // A chunk of data has been recieved.
      let data = "";
      const DOMParser = xmldom.DOMParser.bind(xmldom);
      const itemParser = new DOMParser();
      resp.on("data", chunk => {
        data += chunk.toString();
        const { html, end } = parseRss(data, itemParser);
        passThrough.write(html);
        data = data.substring(end);
      });
      resp.on("end", chunk => {
        passThrough.write(pageEnd);
        passThrough.end();
      });
    });
  }
});

// listen for requests :)
console.log(process.env.PORT);
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
