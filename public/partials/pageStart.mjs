import searchBox from "../templates/searchBox";

export default `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Helix Cast</title>
    <meta name="Description" content="A progressive web app for listening to podcasts." />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" crossorigin="anonymous">
    <link href="/css/basic.css" rel="stylesheet" />
    <script src="/custom_elements/searchBox.mjs" type="module" defer></script>
    <script src="/scripts/mainPageScript.mjs" type="module" defer></script>
  </head>
  <body>
    <link href="/css/header.css" rel="stylesheet" />
    <header class="top-app-bar">
      <section class="top-app-bar__row">
        <i class="material-icons top-app-bar__navigation-icon">menu</i>
        <div class="top-app-bar__title">
          ${searchBox()}
        </div>
      </section>
    </header>
    <link href="/css/mainPage.css" rel="stylesheet">
    <main class="main-page">
`;
