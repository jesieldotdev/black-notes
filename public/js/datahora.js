// Hora
		function time(){
			var agora = new Date()
			var hora = agora.getHours()
			var min = agora.getMinutes()
			var s = agora.getSeconds()
			var clock = {}
			
			if (hora  <= 9){
				clock.textContent = `0${hora}:${min}:${s}`
				if (min <= 9){
					clock.textContent = `0${hora}:0${min}`}
					
			}else {clock.textContent = `${hora}:0${min}`
			if (min <= 9){
					clock.textContent = `${hora}:0${min}`
				}else{
					clock.textContent = `${hora}:${min}`
				}
			}
			return clock.textContent
		}

		setInterval(time, 1000)

		// console.log(time())

		// Data
		var agora = new Date()
		var dia = agora.getDate()
		var mes = agora.getMonth()
		var ano = agora.getFullYear()
		

		if (dia <= 9){
			dia = '0'+ dia
		}
		
		if(mes <= 9){
			mes = '0' +mes
		}
		

		var dataText = `${dia}/${mes}/${ano}`
		// console.log(dataText)

		let datahora = `${dataText} às ${time()}`
		console.log(datahora)