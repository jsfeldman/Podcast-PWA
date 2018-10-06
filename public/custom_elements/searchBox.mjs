export default class SearchBox extends HTMLElement {
  constructor() {
    super();
    let template = document.getElementById("search-box-template");
    let templateContent = template.content;
    let templateClone = templateContent.cloneNode(true);

    const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
      templateClone
    );
  }
  generateList(evt) {
    // evt.preventDefault();
  }
}
