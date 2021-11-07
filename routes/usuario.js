const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Usuario")
const Usuario = mongoose.model('usuarios')


router.get('/registro', (req, res) => {
	res.render("registro")
})

router.post("/registro", (req, res) => {
	var erros = []

	if(!req.body.nome || typeof req.body.nome == undefined){
		erros.push({texto: 'Nome inválido'})
	}

	if(!req.body.email || typeof req.body.email == undefined){
		erros.push({texto: 'Email inválido'})
	}

	if(!req.body.password1 || typeof req.body.password1 == undefined){
		erros.push({texto: 'Senha inválida!'})
	}

	if(req.body.password1.length < 4){
		erros.push({texto: 'Senha muito curta!'})
	}

	if(req.body.password1 != req.body.password2){
		erros.push({texto: 'As senhas são diferentes, tente novamente!'})
	}

	if(erros.length > 0){
		res.render("registro", {erros: erros})
	}else{
		//
	}


})

module.exports = router