const {gql} = require('apollo-server-express')

const depthSchema = gql`
	extend type Query {
		depthQuery: Depth
    }
    
	type Depth {
		market: String
		limit: Int
		Interval:Int
	}
	
	extend type Subscription {
		depthSubscribe:Depth1
	}
	type Depth1{
		market:[String]
		limit:Int
		Interval:Int
	}

	extend type Subscription {
		depthUpdate:Depth2
	}
	type Depth2{
		clear:Boolean
		market:String
	}
	
`

module.exports = depthSchema
