const { gql } = require('apollo-server-express')

const typeDefs = gql`
	type Query {
		orderSubscribe(Apikey: String, AuthShex: String, Nonce: Int, params: String): Silk
	}
	type Silk {
		error: String
		result: Status
		id: String
		method: String
	}
	type Status {
		status: String
	}

	type Subscription {
		orderSubscribes: Strips
	}

	type Strips {
		method: String
		params: [Params]
		id: Int
	}
	type Params {
		id: String
		market: String
		source: String
		type: Int
		side: Int
		user: Int
		ctime: String
		mtime: String
		price: String
		amount: String
		taker_fee: String
		maker_fee: String
		left: String
		deals_stock: String
		deal_money: String
		deal_fee: String
	}
`

module.exports = typeDefs
