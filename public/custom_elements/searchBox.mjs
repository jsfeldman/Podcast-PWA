export default class SearchBox extends HTMLElement {
  constructor() {
    super();
    let template = document.getElementById('search-box-template');
    let templateContent = template.content;

    const shadowRoot = this.attachShadow({mode: 'open'})
      .appendChild(templateContent.cloneNode(true));
  }
}
