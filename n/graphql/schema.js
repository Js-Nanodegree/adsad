const { gql } =require ('apollo-server-express')

const typeDefs = gql`
	type Query {
		messages: [Message!]!
	}
	type Subscription {
		messageCreated: Message
	}
	type Message {
		id: String
		message:Silk
	}
	type Silk{
		error:String
		result:String
		id:String
		method:String

	}
`

module.exports= typeDefs