// const getDb =require('./Mongoosecon').getDb
const ApiTokenSchema = require('./mongo')

class TokenApi {
    constructor(title, Price, Desc, Image) {
        this.title = title; 
        this.Price = Price; 
        this.Desc = Desc; 
        this.Image = Image; 
    }

    save() {
        const db = getDb()
        return db.collection('TokenApi')
        .insertOne(this)
        .then(result =>  {
            console.log(result)
        })
        .catch(err =>  {
            console.log(err)
        })
    }
}

module.exports = Token