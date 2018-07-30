import xml2js from 'xml2js'

import episodeListOpen from './partials/episodeListOpen.mjs'
import episodeItem from './partials/episodeItem.mjs'

const ITEM_CLOSING_TAG_LENGTH = 7

export const templateWrapper = (htmlString, id) => `
<template id="${id}">
  ${htmlString()}
</template>
`

export function parseRss (resp, location) {
  const channelIdx = resp.indexOf('<channel>')
  const firstItem = resp.indexOf('<item>')
  let titleHTML = ''
  let titleEnd = 0
  if (channelIdx !== -1 && firstItem !== -1) {
    const { title, description, end } = parseRssTitle(resp)
    titleHTML = episodeListOpen({title, description})
    titleEnd = end
  }
  const { items, end } = parseRssItems(resp)
  const itemsHTML = items.map(episodeItem).join('')
  return { html: titleHTML + itemsHTML, end: Math.max(titleEnd, end) };
}

export function parseRssTitle (resp) {
  const title = RegExp('<title>(.*?)</title>').exec(resp)[1]
  /* const description = RegExp('<description>(.*?)</description>').exec(resp)[1] */
  const end = resp.indexOf('<item>')
  return { title, description: '', end }
}

export function parseRssItems (resp) {
  const items = []
  let index = 0
  while (resp.indexOf('</item>', index) > -1 ){
    const start = resp.indexOf('<item>', index)
    const end = resp.indexOf('</item>', index)
    const content = resp.substring(start, end + ITEM_CLOSING_TAG_LENGTH)
    let xml = ''
    // It's synchronous
    xml2js.parseString(content, (err, res) => {
      xml = res
    })
    const title = xml.item.title
    const { url: data, length, type } = xml.item.enclosure[0].$
    items.push({ title, link: '', data, type })
    index = end + ITEM_CLOSING_TAG_LENGTH
  }
  return { items, end: index }
}