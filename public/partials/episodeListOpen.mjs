import titleCardHtml from "../templates/titleCard.mjs";
import titleCardCss from "../css/titleCard.mjs";

export default titleInfo => `
<link href="/css/titleWithList.css" rel="stylesheet" />
<div class="title-with-list">
  <style>
    ${titleCardCss}
  </style>
  ${titleCardHtml(titleInfo)}
  <ul class="episode-list">
`;
