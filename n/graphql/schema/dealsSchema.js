const {gql} = require('apollo-server-express')

const dealsSchema = gql`
	extend type Query {
		dealsQuery: Deals
    }
    
	type Deals {
		market: String
		limit: Int
		last_id:Int
	}
	
	extend type Subscription {
		dealsSubscribe:Deals1
	}
	type Deals1{
		market:[String]
	}

	extend type Subscription {
		dealsUpdate:Deals2
	}
	type Deals2{
		market:String
		order:[String]
	}
	
`

module.exports = dealsSchema
