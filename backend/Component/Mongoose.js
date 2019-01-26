import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema({
	ObjectId: {
		type: ObjectId,
		ref: 'Token'
	},
	RemoteId: {
		type: String,
		unique: true
    },
    Token:{
        type:String,
        unique: true
    },
	NameToken: {
		value: {
			type: String,
			unique: true
		},
	TimeCreate: {
			type: Date,
			default: Date.now
		}
	},
	Root: {
		value: {
			type: Array,
			unique: true
		}
	},
	Tokens: {
		type: Array,
		set: function(password) {
			this.salt = makeSalt()
			return this.encryptPassword(password)
		}
	},
	TokenId: {
		type: Boolean,
		default: true
	},
	RemoteId: {
		type: String,
		default: Date.now
	}
})

UserSchema.methods = {}

UserSchema.statics = {}

UserSchema.plugin(AutoIncrement, { inc_field: 'remoteId' })

UserSchema.virtual('userId').get(function() {
	return this.remoteId
})

UserSchema.virtual('Root').get(async function() {
	return (await Role.find({ _id: { $in: this._roles } }).select('-_id name')).map(role => role.name)
})
UserSchema.virtual('verified').get(function() {
	return this.verification && 'status' in this.verification && this.verification.status == 'verified'
})

UserSchema.virtual('email').get(function() {
	var email = new String(this._email.value)
	email.isConfirmed = () => !!this._email.confirmedAt
	return email
})
UserSchema.virtual('email').set(function(value) {
	this._email.value = value
})

UserSchema.virtual('phonenumber').get(function() {
	var phonenumber = new String(this._phonenumber.value)
	phonenumber.isConfirmed = () => !!this._phonenumber.confirmedAt
	return phonenumber
})
UserSchema.virtual('phonenumber').set(function(value) {
	this._phonenumber.value = value
})

const aliases = {
	email: '_email.value',
	phonenumber: '_phonenumber.value'
}
function preFindHook(next) {
	for (let alias in aliases) {
		if (alias in this._conditions) {
			this._conditions[aliases[alias]] = this._conditions[alias]
			delete this._conditions[alias]
		}
	}
	next()
}
TokenSchema.pre('count', preFindHook)
TokenSchema.pre('find', preFindHook)
TokenSchema.pre('findOne', preFindHook)
TokenSchema.pre('findOneAndDelete', preFindHook)
TokenSchema.pre('findOneAndRemove', preFindHook)
TokenSchema.pre('findOneAndUpdate', preFindHook)
TokenSchema.pre('remove', preFindHook)
TokenSchema.pre('update', preFindHook)
TokenSchema.pre('updateOne', preFindHook)
TokenSchema.pre('updateMany', preFindHook)

TokenSchema.pre('save', function(next) {
	if (this._roles.length < 1) this._roles = defaultRoles
	if (!this.otpSecret) this.otpSecret = generateOTPSecret()
	next()
})

TokenSchema.set('toObject', { getters: true, virtuals: true })
TokenSchema.set('toJSON', { getters: true, virtuals: true })

const TokenApi = mongoose.model('User', TokenSchema)

// console.log(crypto.randomBytes(32).toString('hex'))

export default TokenApi