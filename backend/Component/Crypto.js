const   crypto = require('crypto'),
        algorithm = 'aes-256-ctr',
        password = 'd6F3Efeq';

        
        const TokenGotov=(params)=>{

        const apiToken = params => {

            const {NameToken,TimeCreate,Root} = decompose(params)
            const Tokens =  TokenGenerate(params)
            const zalup =Object.assign(	
                                                    {TokenId:params},		//самый начальный запрос
                                                    {NameToken:NameToken},
                                                    {TimeCreate:TimeCreate},
                                                    {Root:Root},
                                                    {Tokens}

                                                
                                                )
                                                
            return  zalup
        }


               
         const decompose= params=>{
            var decipher = crypto.createDecipher(algorithm,password)
            var dec =  decipher.update(params,'hex','utf8')
            dec += decipher.final('utf8')
            const {Orders,Walets,WidhDraw,WWalets,WOrders,AcHistory,AcInfo,NameToken} =JSON.parse(dec)
            const Root = Object.assign([{Orders:Orders},
                                                    {Walets:Walets},
                                                    {WidhDraw:WidhDraw},
                                                    {WWalets:WWalets},
                                                    {WOrders:WOrders},
                                                    {AcHistory:AcHistory},
                                                    {AcInfo:AcInfo}])
            return {Root,NameToken}
          }

         const hash = (params) =>{
            const hashs = crypto.createHmac('sha512','d6F3Efeq')
                                        .update(JSON.stringify(params))
                                        .digest('hex')
                    return hashs
        }
         const TokenHash=(params)=>{

            const Tokenhash = crypto.scryptSync(hash(params),'d6F3Efeq',25).toString('hex')
            return Tokenhash
        }
         const ApiHash=(a,b)=>{
            const Apihash =crypto.createHmac('sha512', b).update(JSON.stringify(a)).digest('hex')
            return Apihash
        }
         const TokenGenerate=  params=>{

            const random =crypto.randomBytes(256).toString('hex')
            const {Root,NameToken,TimeCreate} =  decompose(params)
            const ApiKey = TokenHash(NameToken+TimeCreate+random)
            const SecKey = TokenHash(TimeCreate+random)
            const Hash = ApiHash(ApiKey,SecKey)
            const d = hash(JSON.stringify(Root)+random)
            const e = hash(JSON.stringify(Root)+NameToken+random)
            const TokenGen = Object.assign([{ApiKey:ApiKey},
                                            {SecKey:SecKey},
                                            {PochtaMail:Hash},
                                            {RootHash:d},
                                            {RevokeHash:e}])
                return TokenGen
        }
        return apiToken(params)
        
    }
        
        module.exports =TokenGotov
