import episodeItem from "../css/episodeItem.mjs";

export default ({
  data,
  type,
  title = "",
  description = "",
  link = "",
  length = "",
  pubDate = ""
}) => `
<style>
  ${episodeItem}
</style>
<li class="episode-item">
  ${title !== "" ? `<h2 class="episode-item__title">${title}</h2>` : ""}
  <div class="episode-item__info">
    ${
      pubDate !== ""
        ? `<div class="episode-item__pub-date">Publish Date: ${new Date(
            pubDate
          ).toLocaleDateString()}</div>`
        : ""
    }
    ${
      length !== ""
        ? `<div class="episode-item__duration">Size: ${Math.round(
            length / 1028
          )} Kb</div>`
        : ""
    }
    ${
      link !== ""
        ? `<div class="episode-item__link">Episode Link: ${link}</div>`
        : ""
    }
  </div>
  <audio class="episode-item__audio" preload="none" controls src="${data}" type="${type}" crossorigin="anonymous"></audio>
</li>
`;
