const crypto = require('crypto')
const request = require('request')

const apiKey = '...'                            //Публичный ключ 
const apiSecret = '...'                         //Секретный ключ
const id = {id : 322}                           //индификационный номер клиента


const nonce = '1'

const metods ='orders'                          //Параметры запроса согластно правам  токена (в разработке)
            ||'walets'
            ||'withdraw'
            ||'accountHistory'
            ||'accountInfo'                      //нужно для определения Прав токена и проверки метода 


const body = {
    "query":"{assetList {result {name}}}"       //наименование параметра запроса   
}

const gurl = `http://localhost:3000/api`        //глобальная переменная

let signature = `${gurl}${nonce}${JSON.stringify(body)}`        //подпись

const shex = crypto.createHmac('sha512', apiSecret).update(signature).digest('hex')

const options = {
  url: `http://localhost:3000/api`,             //передаваемые данные
  headers: {                                    //данные которые передаются в заголовке тела
    'nonce': nonce,                             
    'apiKey': apiKey,                                               
    'signature': shex,
    'metods':metods,                           //метод который выставляется
  },
  body: body,                                   // тело запроса
  json: true
}

request.post(options, (error, response, body) => {
  console.log(response.body);                   //вывод результатов в теле запроса
})

//Данные приходят в формате JSON 

// метод распарсить пришедшие данные
// const {data:{users:a}} = response.body
// console.log(a)

`// const body = {"query":"{users{username} 
              time{time} 
              assetList {result{name}}}"}
//пример мульти запроса нескольких параметров

//{walletUpdate(currency:"BTCUSD"){
              status 
              errorDescription{errorCode errorMessage} 
              result{id price market mtime deal_fee deal_stock left type user side ctime amount taker_fee maker_fee deal_money source}}}


//{walletTransactionInitSchema(amount currency:"BTCUSD" description:"fjsansdibghi") {
              status 
              errorDescription{errorCode errorMessage} 
              result{order_id  sign shop desc}}}
//{walletQuery (currency:"BTCUSD") {
              status 
              errorDescription{errorCode errorMessage} 
              result{id price market mtime deal_fee deal_stock left typeuser side ctime amount taker_fee make_fee deal_money source}}}
//{orderPutLimit(pair:"BTCUSD"side:0||1 amount:"5" price:"3500"){
              status 
              errorDescription{errorCode errorMessage} 
              result{id price market mtime deal_fee deal_stock left typeuser side ctime amount taker_fee make_fee deal_money source}}
//orderPending(pair:"BTCUSD", offset:12 limit:12){
              status 
              result{id price market mtime deal_fee deal_stock left typeuser side ctime amount taker_fee make_fee deal_money source}}
//orderFinished(pair:"BTCUSD", offset:12 limit:12){
              status 
              result{
                offset 
                limit 
                record{id price market mtime deal_fee deal_stock left typeuser side ctime amount taker_fee make_fee deal_money source}}}
//orderBook(pair:"BTCUSD" side:0||1 offset: 12 amount:12){
              status 
              result{
                offset 
                limit 
                total 
                orders{market ctime price taker_fee amount id mtime deal_money type side user maker_fee left deal_stock deal_fee}}}
//bases{stock price volume change high low}`