const {gql} = require('apollo-server-express')

const priceSchema = gql`
	extend type Query {
		priceQuery: Price
    }
    
	type Price {
		market: String
		result: Status
	}
	
	extend type Subscription {
		priceSubscribe:Price1
	}
	type Price1{
		market:[String]
	}

	extend type Subscription {
		priceUpdate:Price2
	}
	type Price2{
		market:String
		price:String
	}
	
`

module.exports = priceSchema
