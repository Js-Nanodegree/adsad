const crypto =require('crypto')
const gurl = 'hhtp://localhost:8000/api' // global
const id ='322' //индификационный номер клиента
const apiKey = 'rTB4jhWoSS7BbV9LK39gFRnmThthR945203I0D07U27' //находиться у клиента
const apiSecret = 'jwiarANXsioKbSWzGxXrc878SzhPpisB9xmcLculrZx' //находиться у клиента
const body = [
            {name:1},
            {name:2}
] //заполняются данные клиентом
const queryParams = 'type=orders'
            ||'type=wallet'
            ||'type=withdraw'
            ||'type=wallets'
            ||'type=accountHistory'
||'type=accountInfo' //нужно для Graphql запросов
const metods ='orders'
            ||'walets'
            ||'withdraw'
            ||'accountHistory'
            ||'accountInfo'   //нужно для определения Прав токена и проверки метода ???

const nonce = Date.now().toString() //задается моментомотправки со стороны клиента
const apiPath = `/v2/auth?id=${id}&m=${metods}`  //проверка методов  

let signature_client=`{
                    ${gurl}/
                    ${apiPath}
                    ${nonce}
                    ${JSON.stringify(body)}
}`  //подпись клиента со сторнык передаваеых данных

const shex =crypto.createHmac('sha512', apiSecret).update(signature_client).digest('hex')

const urlSend=`exs.cash/${apiPath}&${queryParams}`
const bodys =body
const headers =[{nonce:nonce},{apiKey:apiKey},{shex:shex}]

console.log('На отправку со стороны клиента'+urlSend,bodys,headers)
// это отправляем запрос


const req_body=bodys   // получаем параметры
const req_header_nonce =headers[0]   //
const req_header_apikey =headers[1]
const req_header_shex =headers[2]

let signature_server =()=>{
const a = `{${gurl}                        // Globall    
            ${apiPath}                      //Это надо получить CURL
            ${req_header_nonce}
            ${JSON.stringify(req_body)}}` }

const shex =crypto.createHmac('sha512', apiSecret).update(signature_client).digest('hex')


console.log(headers)



const a = Object.assign(
    {"operationName":null},
    {"variables":{}},
    {"query": "{  user(id: \"2\") {username}me {username}}"}
)

// return gurl+a