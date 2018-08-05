import { parseRss } from "/utils.mjs";

export default class SearchBox extends HTMLElement {
  constructor() {
    super();
    let template = document.getElementById("search-box-template");
    let templateContent = template.content;
    let templateClone = templateContent.cloneNode(true);

    let form = templateClone.querySelector("form");
    form.addEventListener("submit", this.generateList);
    const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
      templateClone
    );
  }
  generateList(evt) {
    evt.preventDefault();
    const url = evt.target.querySelector("input").value;
    var decoder = new TextDecoder();

    const mainTag = document.querySelector("main");
    let data = "";
    fetch(url, {
      method: "GET",
      mode: "cors"
    }).then(response => {
      const reader = response.body.getReader();
      const itemParser = new DOMParser();
      const main = document.querySelector("main");
      while (main.firstChild) {
        main.removeChild(main.firstChild);
      }
      return reader.read().then(function processResult(result) {
        if (result.done) {
          return;
        }
        data += decoder.decode(result.value, { stream: true });
        const { html: htmlString, end } = parseRss(data, itemParser);
        const itemHTML = itemParser.parseFromString(htmlString, "text/html");

        if (itemHTML.documentElement.querySelector("ul")) {
          main.appendChild(itemHTML.documentElement.querySelector("link"));
          main.appendChild(
            itemHTML.documentElement.querySelector(".title-with-list")
          );
        } else {
          const itemList = itemHTML.documentElement.querySelectorAll("li");
          for (const itemElem of itemList) {
            document.querySelector("ul").appendChild(itemElem);
          }
        }
        data = data.substring(end);

        // Read some more, and call this function again
        return reader.read().then(processResult);
      });
    });
  }
}
