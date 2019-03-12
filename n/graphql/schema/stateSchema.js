const {gql} = require('apollo-server-express')

const stateSchema = gql`
	extend type Query {
		stateQuery: State
    }
    
	type State {
		market: String
		period: Int
	}
	
	extend type Subscription {
		stateSubscribe:State1
	}
	type State1{
		market:[String]
	}

	extend type Subscription {
		stateUpdate:State2
	}
	type State2{
		market:String
	}
	
`

module.exports = stateSchema
