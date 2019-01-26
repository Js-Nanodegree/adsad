const crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';



module.exports = decrypt=text=>{
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    const kitty = new Cat({ name: dec });
   
    return kitty.save().then(() => console.log('meow'));
  }
