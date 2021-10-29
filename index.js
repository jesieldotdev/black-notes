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
		app.use(express.static(path.join(__dirname, 'public')))

	//	Mongoose
	mongoose.connect(db.mongoURI).then(() => {
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
		const novaNota = {
			title: req.body.title,
			note: req.body.note
		}
		console.log(novaNota.titulo)
		
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


// Nova Rota
	app.get('/login', (req, res) => {
		res.render('login')
	})

// Editar Nota
	app.get('/editar/nota/:id', (req, res) => {
		Note.findOne({_id: req.params.id}).lean().then((nota) => {
			res.render('note-edit', {nota: nota})
		}).catch((err) => {
			res.flash('error_msg', 'Algo deu errado!')
		})
	})


const PORT = process.env.PORT || 8089
app.listen(PORT, ()=> {
	console.log('Servidor rodando na porta 8089')
})