const {gql} = require('apollo-server-express')

const dealsSchema = gql`
	extend type Query {
		dealsQuery: Deals
    }
    
	type Deals {
		market: String
		offset: Int
		limit:Int
		user:Int
	}
	
	extend type Subscription {
		dealsSubscribe:Deals1
	}
	type Deals1{
		market:String
		user:Int
	}

	extend type Subscription {
		dealsUpdate:Deals2
	}
	type Deals2{
		user:Int
		market:String
		start_time:Int
		end_time:Int
		offset:Int
		limit:Int
	}
	
`

module.exports = dealsSchema
