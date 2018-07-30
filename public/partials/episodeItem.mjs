export default ({data, type, title = '', description = '', link = '', duration = '', pubDate = ''}) => `
<li>
  ${ title !== '' ? `<h2>${title}</h2>`: ''}
  <div>
    ${ pubDate !== '' ? `<div>Publish Date: ${pubDate}</div>` : '' }
    ${ duration !== '' ? `<div>Duration: ${duration}</div>` : '' }
    ${ pubDate !== '' ? `<div>Episode Link : ${pubDate}</div>` : '' }
    <a href="${data}">Download</a>
  </div>
  <audio controls src="${data}" type="${type}" crossorigin="anonymous"></audio>
</li>
`
