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
		default: "https://source.unsplash.com/collection/2250268/600x600"
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