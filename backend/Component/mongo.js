const mongoose = require('mongoose');

module.exports.connect = (uri) => {
  mongoose.connect(uri, {useCreateIndex: true,useNewUrlParser: true},()=>{console.log('ok mongo connect')});
  // plug in the promise library:
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });


 const ApiTokenSchema = new mongoose.Schema( 
    {
        ObjectId: {type:mongoose.Schema.Types.ObjectId}, 
        e_mail: {type:String, unique:false, default:undefined }, 
        RemoteId: {type:String, unique:false, default:undefined },        
        NameToken: {type:String, unique:false, default:undefined },
        TimeCreate: {type:Date, default:Date.now },
        Root: [{
                    Orders:{type:Boolean},
                    Walets:{type:Boolean},
                    WidhDraw:{type:Boolean},
                    WWalets:{type:Boolean},
                    WOrders:{type:Boolean},
                    AcHistory:{type:Boolean},
                    AcInfo:{type:Boolean}
        }],
        
                    ApiKey:{type:String, default:undefined },
                    SecKey:{type:String,  default:undefined },
                    PochtaMail:{type:String,  default:undefined },
                    RootHash:{type:String, default:undefined },
                    RevokeHash:{type:String,  default:undefined },
                 
        TokenId: {type:String, unique:false, default:undefined }, 
    }, {versionKey: false})

    ApiTokenSchema.methods = {
      checkPochtaMail: function checkPassword(param) {
        return this.param === this.PochtaMail
      },
    }
module.exports = new mongoose.model('ApiTokenSchema',ApiTokenSchema)

}
