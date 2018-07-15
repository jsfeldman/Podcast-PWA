export default (styles, scripts) => `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Helix Cast</title>
    <meta name="Description" content="A progressive web app for listening to podcasts.">
    ${styles.map(href => `<link rel="stylesheet" href="${href}">`)}
    ${scripts.map(scriptObj => `<script ${scriptObj.module === undefined ? '' : (scriptObj.module === true ? 'type="module"' : 'nomodule')} src="${scriptObj.src}"></script>`)}
  </head>
`
