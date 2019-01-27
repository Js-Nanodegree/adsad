const mongoose = require('mongoose');

module.exports.connect = (uri) => {
  mongoose.connect(uri, {useCreateIndex: true,useNewUrlParser: true},()=>{console.log('ok mongo connect')});
  // plug in the promise library:
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });


  module.exports = ApiTokenSchema = mongoose.model('ApiToken', 
    {
        ObjectId: {type:mongoose.Schema.Types.ObjectId}, 
        e_mail: {type:String, unique:false, default:undefined }, 
        RemoteId: {type:String, unique:false, default:undefined },        
        NameToken: {type:String, unique:false, default:undefined },
        TimeCreate: {type:Date, default:Date.now },
        Root: {
                    Orders:{type:Boolean,  required:false,  default:false},
                    Walets:{type:Boolean,  required:false,  default:false},
                    WidhDraw:{type:Boolean,  required:false,  default:false},
                    WWalets:{type:Boolean,  required:false,  default:false},
                    WOrders:{type:Boolean,  required:false,  default:false},
                    AcHistory:{type:Boolean,  required:false,  default:false},
                    AcInfo:{type:Boolean,  required:false,  default:false}
        },
        Tokens: [{
                    ApiKey:{type:String, default:undefined },
                    SecKey:{type:String,  default:undefined },
                    PochtaMail:{type:String,  default:undefined },
                    RootHash:{type:String, default:undefined },
                    RevokeHash:{type:String,  default:undefined },
                }], 
        TokenId: {type:String, unique:false, default:undefined }, 
    })
 const ApiGenerate = data=> new ApiTokenSchema(data);
 module.exports = ApiGenerate

}
