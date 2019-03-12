const {gql} = require('apollo-server-express')

const serverSchema = gql`
	extend type Query {
		serverPing: Silk
    }
    extend type Query {
		serverTime: Silk
	}
	type Silk {
		error: String
		result: Status
		id: String		
	}
`

module.exports = serverSchema
