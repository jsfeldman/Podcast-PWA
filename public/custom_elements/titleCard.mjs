import { parseRss } from "/utils.mjs";

export default class SearchBox extends HTMLElement {
  constructor() {
    super();
    let template = document.getElementById("title-card-template");
    let templateContent = template.content;
    let templateClone = templateContent.cloneNode(true);

    let form = templateClone.querySelector("form");
    form.addEventListener("submit", this.subscribe);
    const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
      templateClone
    );
  }
  subscribe(evt) {
    evt.preventDefault();
    console.log("hit subscribe");
  }
}
