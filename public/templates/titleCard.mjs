import titleCardCss from "../css/titleCard.mjs";

export default ({ title, description, coverImgSrc, link }) => `
<style>
  ${titleCardCss}
</style>
<section class="title-card">
  <img class="title-card__image" src="${coverImgSrc}" alt="${title}'s cover art" crossorigin="anonymous" />
  <h2 class="title-card__heading">${title}</h2>
  <a class="title-card__link" href="${link}">${link}</a>
  <p class="title-card__description">${description}</p>
  <form action="/subscribe" method="POST">
    <button class="title-card__subscribeButton" type="submit">Subscribe</button>
  </form>
</section>
`;
