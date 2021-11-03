const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const path = require('path')
const admin = require('./routes/admin')
require('./models/Note')
const dataHora = require('./public/js/datahora')
const mongoose = require('mongoose')
const Note = mongoose.model('notes')
const session = require('express-session')
const flash = require('connect-flash')
const db = require('./config/db')

console.log(dataHora)

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

//	Rotas
	app.use('/', admin)



const PORT = process.env.PORT || 8089
app.listen(PORT, ()=> {
	console.log('Servidor rodando na porta 8089')
})