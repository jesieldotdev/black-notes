if(process.env.NODE_ENV == 'production'){
	module.exports = {mongoURI: 'mongodb+srv://jesiel364:12458917@jesieldb.twzzt.mongodb.net/todoapp?retryWrites=true&w=majority'}
	}else{
		module.exports = {mongoURI: 'mongodb://localhost/todoapp'}
	}