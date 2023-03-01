const express = require('express')
const app = express()

const PORT = 3000

app.use(express.static('dist'))

app.get('/', (_, response) => {
	response.sendFile(__dirname + '/dist/signin.html')
})

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`)
})
