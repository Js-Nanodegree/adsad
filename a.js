const crypto = require('crypto')
const request = require('request')

const apiKey = 'rTB4jhWoSS7BbV9LK39gFRnmThthR945203I0D07U27'
const apiSecret = 'jwiarANXsioKbSWzGxXrc878SzhPpisB9xmcLculrZx'

const apiPath = 'a'
const nonce = Date.now().toString()
const body = {"query":"{me{username}time{time}}"}
let signature = `/api/${apiPath}${nonce}${JSON.stringify(body)}`

const shex =()=> {
  console.log('server start',Date.now().toString())
  return crypto.createHmac('sha512', apiSecret).update(signature).digest('hex')}

  
const metods ='orders'                          //Параметры запроса согластно правам  токена (в разработке)
            // ||'walets'
            // ||'withdraw'
            // ||'accountHistory'
            // ||'accountInfo'                      //нужно для определения Прав токена и проверки метода 



const options = {
  url: `http://localhost:8000/${apiPath}`,
  headers: {
    'bfx-nonce': nonce,
    'bfx-apikey': apiKey,
    'bfx-signature': shex(),
    'metods':metods, 
  },
  
  body: body,
  json: true
}
request.post(options, (error, response, body) => {
  console.log(response.body);
  const {data:{me:a}} =response.body
  console.log(a)
  console.log('server end',Date.now().toString())
})