const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Note = new Schema({
	title: {
		type: String,
		required: true
	},
	note: {
		type: String,
		required: true
	},
	img_link: {
		type: String,
		required: false,
		default: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80"
	},
	date: {
		type: String,
		default: Date()
	},
	cor: {
		type: String,
		default: "#282828"
	},
	autor: {
		type: String,
		default: "Desconhecido"
	}
})

mongoose.model('notes', Note)

// const novoUsuario = mongoose.model('usuarios')

// new novoUsuario({
// 	nome: 'Jaqueta Preta',
// 	email: 'Jaqueta de Couro Preta',
// 	senha: '1234'
// }).save().then(() => {
// 	console.log('Usuario cadastrado com sucesso.')
// }).catch((err) => {
// 	console.log('Houve um erro ao cadastrar o usuario: '+err)
// })