export default () => `
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" crossorigin="anonymous">
<form class="search-box" method="GET" action="/podcastList">
  <input class="search-box__input" placeholder="Search" name="searchTerm" value="" />
  <button type="submit" class="search-box__button"><i class="material-icons">search</i>
</form>
`;
