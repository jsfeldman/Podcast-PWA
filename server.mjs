// server.js
// where your node app starts
import Stream from 'stream';
import Koa from 'koa';

import headPartial from './public/partials/head.mjs';
import testBodyPartial from './public/partials/testBody.mjs'
import htmlClosePartial from './public/partials/htmlClose.mjs'

const app = new Koa();

app.use(ctx => {
  const inStream = new Stream.Readable({
    read (size) {
      this.push(headPartial([], []))
      this.push(testBodyPartial())
      this.push(htmlClosePartial())
      this.push(null)
    }
  })
  ctx.type = 'text/html';
  ctx.body = inStream
});

// listen for requests :)
console.log(process.env.PORT)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
