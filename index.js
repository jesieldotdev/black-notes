const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const path = require('path')
require('./models/Note')
const mongoose = require('mongoose')
const Note = mongoose.model('notes')
const session = require('express-session')
const flash = require('connect-flash')
const db = require('./config/db')


//	Configurações
	// Body Parser
	app.use(express.json({limit: '20mb'}));
	app.use(express.urlencoded({ extended: false, limit: '20mb' }))

	//	Template Engine
	app.engine('hbs', hbs({
		defaultLayout: 'main',
		extname: '.hbs',
		layoutsDir: __dirname + '/views/layouts/',
  		partialsDir: __dirname + '/views/partials/'
	}))
	app.set('view engine', 'hbs')

	// Public
		app.use(express.static(path.join(__dirname, '/public')))
		app.use(express.static(path.join(__dirname, '/views')))

	//	Mongoose
	mongoose.connect('mongodb+srv://jesiel364:12458917@jesieldb.twzzt.mongodb.net/todoapp?retryWrites=true&w=majority').then(() => {
		console.log('MONGODB Conectado.')
	}).catch((err) => {
		console.log('Erro ao tentar se conectar ao MONGODB: '+err)
	})

	//	Sessão
	app.use(session({
		secret: 'todo',
		resave: true,
		saveUnitialized: true
	}))
	app.use(flash())

//	Middleware
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg')
	res.locals.error_msg = req.flash('error_msg')
	next()
})


//	Rota Principal
	app.get('/', (req, res) => {
		Note.find().lean().sort({_id: -1}).then((notes) => {
		res.render('home', {notes: notes})
	}).catch((err) => {
		res.send('Houve um erro: '+err)
	})
	})

// Salvar Nota
	app.post('/salvar_nota', (req, res) => {
		// Tratamento de Entradas
		if(req.body.img_link == undefined || req.body.img_link == ''){
			var img = 'https://source.unsplash.com/collection/2250268/800x900'
		}else {
		 	var img = req.body.img_link
		}


		const novaNota = {
			title: req.body.note_title,
			note: req.body.note,
			img_link: img
		}
		console.log(img)

		// Salvando dados no Mongo
		new Note(novaNota).save().then(() => {
			req.flash('success_msg', `Nota Salva com Sucesso!`)
			res.redirect('/')
		}).catch((err) => {
			req.flash('error_msg', `Houve um erro ao salvar a nota!`)
			res.redirect('/')
		})
	})

//	Apagar Nota
	app.post('/deletar', (req, res) => {
		Note.deleteOne({_id: req.body.id}).then(() => {
			req.flash('success_msg', 'Nota deletada.')
			res.redirect('/')
		}).catch((err) => {
			req.flash('error_msg', 'Não foi possivel apagar a nota.')
			res.redirect('/')
		})
	})

// Rota Note Page
	app.get('/note/:id', (req, res) => {
		Note.findOne({_id: req.params.id}).lean().then((note) => {
			res.render('notepage', {note: note})
		}).catch((err) => {
			req.flash('error_msg', 'Erro ao abrir a nota: ' +err)
			res.redirect('/')
		})
	})


// Nova Rota
	app.get('/login', (req, res) => {
		res.render('login')
	})

// Page Editar Nota
	app.get('/edit/:id', (req, res) => {
		Note.findOne({_id: req.params.id}).lean().then((note) => {
			res.render('note-edit', {note: note})
		}).catch((err) => {
			res.flash('error_msg', 'Algo deu errado!')
		})
	})

//	Rota de Edição Nota
	app.post('/notas/editar', (req, res) => {
		Note.findOne({_id: req.body.id}).lean().then((note) => {

			const editarNota = {
			title: req.body.note_title,
			note: req.body.note,
			img_link: req.body.img_link
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


const PORT = process.env.PORT || 8089
app.listen(PORT, ()=> {
	console.log('Servidor rodando na porta 8089')
})