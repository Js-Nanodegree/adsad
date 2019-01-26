const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useCreateIndex: true,useNewUrlParser: true});

const ApiTokenSchema = mongoose.model('ApiToken', 
                                    {
                                        ObjectId:{
                                            type:mongoose.Schema.Types.ObjectId
                                        },
                                        e_mail:{ type: String, unique: false , default: undefined },

                                        RemoteId:{ type: String, unique: false , default: undefined },
                                        
                                        NameToken:{ type: String, unique: false , default: undefined },

                                        TimeCreate:{ type: Date, default: Date.now },

                                        Root: { type: Array, unique: false , default: undefined},

                                        Tokens: { type: Array, unique: true , default: undefined},                                   
                                        
                                        TokenId: { type: String, unique: false , default: undefined },
                                    })

const ApiToken =(data)=> new ApiTokenSchema(data);



const ApiGenerate=(data)=>ApiToken(data).save().then(() => console.log('монго '+ JSON.stringify(data)));




module.exports = ApiGenerate