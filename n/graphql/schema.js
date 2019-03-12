const { gql } =require ('apollo-server-express')

const typeDefs = gql`
	type Query {
		messages: Silk
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
		result:Status
		id:String
		method:String

	}
	type Status{
		status:String
	}
`

module.exports= typeDefs