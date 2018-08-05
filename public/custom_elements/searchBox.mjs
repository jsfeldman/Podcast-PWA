export default class SearchBox extends HTMLElement {
  constructor() {
    super();
    let template = document.getElementById('search-box-template');
    let templateContent = template.content;
    let templateClone = templateContent.cloneNode(true);

    let form = templateClone.querySelector('form');
    form.addEventListener('submit', this.generateList)
    const shadowRoot = this.attachShadow({mode: 'open'})
      .appendChild(templateClone);
  }
  generateList (evt) {
    evt.preventDefault()
    const url = evt.target.querySelector('input').value;
    var decoder = new TextDecoder();
    
    const mainTag = document.querySelector('main');
    let data = '';
    fetch(url, {
      method: 'GET',
      mode: "cors"
    })
      .then(response => {
        const reader = response.body.getReader();
        return reader.read()
          .then(function processResult(result) {
            if (result.done) {
              return;
            }
            data += decoder.decode(result.value, {stream: true})
            const { html, end } = parseRss(data)
            passThrough.write(html)
            data = data.substring(end)

            // Read some more, and call this function again
            return reader.read().then(processResult);
          });
      })
  }
}
