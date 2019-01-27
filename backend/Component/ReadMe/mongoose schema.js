const mongoose = require('mongoose'); 
const Db ='mongodb://localhost:27017/test'
mongoose.connect(Db, {useCreateIndex: true,useNewUrlParser: true})
.then(client =>console.log('Conected',client)).catch(err =>console.log(err));

const RootSchema =new mongoose.model({
    Orders:{type:Boolean,  required:false},
    Walets:{type:Boolean,  required:false},
    WidhDraw:{type:Boolean,  required:false},
    WWalets:{type:Boolean,  required:false},
    WOrders:{type:Boolean,  required:false},
    AcHistory:{type:Boolean,  required:false},
    AcInfo:{type:Boolean,  required:false}
})

const TokensSchema = new mongoose.model({
    ApiKey:{type:String, unique:true, default:undefined },
    SecKey:{type:String, unique:true, default:undefined },
    PochtaMail:{type:String, unique:true, default:undefined },
    RootHash:{type:String, unique:true, default:undefined },
    RevokeHash:{type:String, unique:true, default:undefined },
})

const ApiTokenSchema = new mongoose.model('ApiToken',  {
        ObjectId: {type:mongoose.Schema.Types.ObjectId}, 
        e_mail: {type:String, unique:false, ref:User, default:undefined }, 
        RemoteId: {type:String, unique:false, ref:User, default:undefined },        
        NameToken: {type:String, unique:false, default:undefined },
        TimeCreate: {type:Date, default:Date.now },
        // Root: [RootSchema],
        // Tokens: [TokensSchema], 
        TokenId: {type:String, unique:false, default:undefined }, 
    })

ApiTokenSchema.plugin(mongooseUniqueValidator)

const ApiTokens = mongoose.model('ApiTokenSchema',ApiTokenSchema,'ApiToken')

const ApiToken =(data)=> new ApiTokens(data);
const ApiGenerate=(data)=>ApiToken(data).save().then(() => console.log('монго '+ JSON.stringify(data)));
module.exports = ApiGenerate



