import episodeListOpen from "./partials/episodeListOpen.mjs";
import episodeItem from "./templates/episodeItem.mjs";

const ITEM_CLOSING_TAG_LENGTH = 7;

export const templateWrapper = (htmlString, id) => `
<template id="${id}">
  ${htmlString()}
</template>
`;

export function parseRss(resp, parser) {
  const channelIdx = resp.indexOf("<channel>");
  const firstItem = resp.indexOf("<item>");
  let titleHTML = "";
  let titleEnd = 0;
  if (channelIdx !== -1 && firstItem !== -1) {
    const { info, end } = parseRssTitle(resp, parser);
    titleHTML = episodeListOpen(info);
    titleEnd = end;
  }
  const { items, end } = parseRssItems(resp, parser);
  const itemsHTML = items.map(episodeItem).join("");
  return { html: titleHTML + itemsHTML, end: Math.max(titleEnd, end) };
}

export function parseRssTitle(resp, parser) {
  const start = resp.indexOf("<channel>");
  const end = resp.indexOf("<item>");
  const headingString = resp.substring(start, end) + "</channel>";
  const heading = parser.parseFromString(headingString, "application/xml");
  const title = heading.getElementsByTagName("title")[0].textContent;
  let descriptionList = heading.getElementsByTagName("description");
  let description = "";
  if (descriptionList.length > 0) {
    description = descriptionList[0].textContent;
  } else {
    const itunesSummary = heading.getElementsByTagName("itunes:summary");
    description = itunesSummary[0].textContent;
  }
  const coverImgSrc = heading
    .getElementsByTagName("image")[0]
    .getElementsByTagName("url")[0].textContent;
  const link = heading.getElementsByTagName("link")[0].textContent;
  return { info: { title, description, coverImgSrc, link }, end };
}

export function parseRssItems(resp, itemParser) {
  const items = [];
  let index = 0;
  while (resp.indexOf("</item>", index) > -1) {
    const start = resp.indexOf("<item>", index);
    const end = resp.indexOf("</item>", index);
    const content = resp.substring(start, end + ITEM_CLOSING_TAG_LENGTH);
    // It's synchronous
    const xml = itemParser.parseFromString(content, "application/xml");
    const title = xml.getElementsByTagName("title")[0].textContent;
    const link = xml.getElementsByTagName("link")[0].textContent;
    const pubDate = xml.getElementsByTagName("pubDate")[0].textContent;
    const enclosure = xml.getElementsByTagName("enclosure")[0];
    const data = enclosure.getAttribute("url");
    const length = enclosure.getAttribute("length");
    const type = enclosure.getAttribute("type");

    items.push({ title, link, pubDate, data, type, length });
    index = end + ITEM_CLOSING_TAG_LENGTH;
  }
  return { items, end: index };
}
