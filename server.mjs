// server.js
// where your node app starts
import Stream from 'stream';
import Koa from 'koa';
import koaStatic from 'koa-static'

import head from './public/partials/head.mjs';
import mainPageStyles from './public/partials/mainPageStyles.mjs'
import mainPageJs from './public/partials/mainPageJs.mjs'
import headClose from './public/partials/headClose.mjs';
import header from './public/partials/header.mjs'
import mainPage from './public/partials/mainPage.mjs'
import htmlClosePartial from './public/partials/htmlClose.mjs'

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
        this.push(mainPage());
        this.push(htmlClosePartial());
        this.push(null);
      }
    })
    ctx.type = 'text/html';
    ctx.body = inStream;
  }
});

// listen for requests :)
console.log(process.env.PORT)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
