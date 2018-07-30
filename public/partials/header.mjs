import searchBox from '../templates/searchBox';

export default () => `
<link href="/css/header.css" rel="stylesheet">
<header class="top-app-bar">
  <section class="top-app-bar__row">
    <i class="material-icons top-app-bar__navigation-icon">menu</i>
    <div class="top-app-bar__title">
      ${searchBox()}
    </div>
  </section>
</header>
`
