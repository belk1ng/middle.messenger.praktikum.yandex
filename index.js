const express = require('express')
const app = express()

const PORT = 3000

app.use(express.static('dist'))

app.get('/', (_, response) => {
	console.log('inside get /')
	response.sendFile(__dirname + '/dist/index.html')
})

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`)
})
