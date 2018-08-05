import titleCard from "../templates/titleCard.mjs";

export default titleInfo => `
<link href="/css/titleWithList.css" rel="stylesheet" />
<div class="title-with-list">
  ${titleCard(titleInfo)}
  <ul class="episode-list">
`;
