const express = require('express')
const router = express.Router()
mongoose = require('mongoose')
require('../models/Note')
const dataHora = require('../public/js/datahora')
Note = mongoose.model('notes')


//	Rota Principal
	router.get('/', (req, res) => {
		Note.find().lean().sort({_id: -1}).then((notes) => {
		res.render('home', {notes: notes})
	}).catch((err) => {
		res.send('Houve um erro: '+err)
	})
	})

// Salvar Nota
	router.post('/salvar_nota', (req, res) => {
		// Tratamento de Entradas
		if(req.body.img_link == undefined || req.body.img_link == ''){
			var img = 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80'
		}else {
		 	var img = req.body.img_link
		}

		const novaNota = {
			title: req.body.note_title,
			note: req.body.note,
			img_link: img,
			date: dataHora,
			cor: req.body.ColorInput,
			autor: req.body.autor
		}
		// console.log(img)

		// Salvando dados no Mongo
		new Note(novaNota).save().then(() => {
			req.flash('success_msg', `Nota Salva com Sucesso`)
			res.redirect('/')
		}).catch((err) => {
			req.flash('error_msg', `Houve um erro ao salvar a nota!`)
			res.redirect('/')
		})
	})

//	Apagar Nota
	router.all('/deletar', (req, res) => {
		Note.deleteOne({_id: req.body.id}).then((nota) => {
			console.log(nota.title)
			req.flash('success_msg', 'Nota deletada')
			res.redirect('/')
		}).catch((err) => {
			req.flash('error_msg', 'Não foi possivel apagar a nota!')
			res.redirect('/')
		})
	})

// Rota Note Page
	router.get('/note/:id', (req, res) => {
		Note.findOne({_id: req.params.id}).lean().then((note) => {
			res.render('notepage', {note: note})
		}).catch((err) => {
			req.flash('error_msg', 'Erro ao abrir a nota')
			res.redirect('/')
		})
	})


// Login
	router.get('/login', (req, res) => {
		res.render('login')
	})

// Page Editar Nota
	router.get('/edit/:id', (req, res) => {
		Note.findOne({_id: req.params.id}).lean().then((note) => {
			res.render('note-edit', {note: note})
		}).catch((err) => {
			res.flash('error_msg', 'Algo deu errado!')
		})
	})

//	Rota de Edição Nota
	router.post('/notas/editar', (req, res) => {
		Note.findOne({_id: req.body.id}).lean().then((note) => {

		// Tratamento de Entradas
		if(req.body.img_link == undefined || req.body.img_link == ''){
			var img = '/img/anime-1.png'
		}else {
		 	var img = req.body.img_link
		}

			const editarNota = {
			title: req.body.note_title,
			note: req.body.note,
			img_link: img,
			date: datahora,
			cor: req.body.ColorInput,
			autor: req.body.autor
		}

			new Note(editarNota).save().then(() => {
				req.flash('success_msg', 'Nota editada com sucesso')
				res.redirect('/')
			}).catch((err) => {
				req.flash('error_msg', 'Não foi possivel salvar a edição: ' +err)
				res.redirect('/')
			})

		}).catch((err) => {
			req.flash('error_msg', 'Houve um erro ao editar a nota: ' +err)
			res.redirect('/')
		})
	})

module.exports = router