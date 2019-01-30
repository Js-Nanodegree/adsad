const crypto = require('crypto')
const request = require('request')

const apiKey = 'rTB4jhWoSS7BbV9LK39gFRnmThthR945203I0D07U27'
const apiSecret = 'jwiarANXsioKbSWzGxXrc878SzhPpisB9xmcLculrZx'

const apiPath = 'v2/auth/r/alerts'
const nonce = Date.now().toString()
const queryParams = 'type=price'
const body = {}
let signature = `/api/${apiPath}${nonce}${JSON.stringify(body)}`

const sig = crypto.createHmac('sha384', apiSecret).update(signature).digest('hex')
const shex = sig.digest('hex')

const options = {
  url: `https://api.bitfinex.com/${apiPath}?${queryParams}`,
  headers: {
    'bfx-nonce': nonce,
    'bfx-apikey': apiKey,
    'bfx-signature': shex
  },
  body: body,
  json: true
}
request.post(options, (error, response, body) => {
  console.log(body);
})