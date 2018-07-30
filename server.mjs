// server.js
// where your node app starts
import Stream from 'stream';
import Koa from 'koa';
import koaStatic from 'koa-static'
import matchit from 'matchit'
import https from 'https'

import head from './public/partials/head.mjs';
import headClose from './public/partials/headClose.mjs';
import header from './public/partials/header.mjs'
import mainStart from './public/partials/mainStart.mjs'
import mainEnd from './public/partials/mainEnd.mjs'
import htmlClosePartial from './public/partials/htmlClose.mjs'

import mainPageStyles from './public/partials/mainPageStyles.mjs'
import mainPageJs from './public/partials/mainPageJs.mjs'
import mainPageTemplates from './public/partials/mainPageTemplates.mjs'

import { parseRss } from './public/utils.mjs'

const app = new Koa();

app.use(koaStatic('public'))

app.use(ctx => {
  if (ctx.url === '/') {
    const inStream = new Stream.Readable({
      read (size) {
        this.push(head());
        this.push(mainPageStyles());
        this.push(mainPageJs());
        this.push(headClose());
        this.push(header());
        this.push(mainStart());
        this.push(mainEnd());
        this.push(mainPageTemplates());
        this.push(htmlClosePartial());
        this.push(null);
      }
    })
    ctx.type = 'text/html';
    ctx.body = inStream;
  } else if (ctx.path === '/podcastList') {
      const searchTerm = ctx.query['searchTerm']
      console.log('hit')
      /* const inStream = new Stream.Readable({
      read (size) {

      }
    }) */
    ctx.type = 'text/html';
    const passThrough = new Stream.PassThrough();
    ctx.body = passThrough;
    passThrough.write(head());
    passThrough.write(mainPageStyles());
    passThrough.write(mainPageJs());
    passThrough.write(headClose());
    passThrough.write(header());
    passThrough.write(mainStart());
    https.get(searchTerm, (resp) => {
      // A chunk of data has been recieved.
      let data = ''
      resp.on('data', (chunk) => {
        data += chunk.toString()
        const { html, end } = parseRss(data)
        passThrough.write(html)
        data = data.substring(end)
      });
      resp.on('end', (chunk) => {
        passThrough.write(mainEnd());
        passThrough.write(mainPageTemplates());
        passThrough.write(htmlClosePartial());
        passThrough.end()
      });
    })
  }
});

// listen for requests :)
console.log(process.env.PORT)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
