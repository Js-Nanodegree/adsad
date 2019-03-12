const { gql } =require ('apollo-server-express')

const typeDefs = gql`
	type Query {
		orderSubscribe(Apikey:String,AuthShex:String,Nonce:Int,params:String): Silk
	}
	type Subscription {
		messageCreated: Message
	}
	type Message {
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
// const Nano = gql`
// 	extend type Query { orderSubscribe (Apikey:String,AuthShex:String,Nonce:Int,params:String){
// 	messages: Silk}`
	

module.exports= typeDefs