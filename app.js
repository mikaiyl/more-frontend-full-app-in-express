const express = require('express')
const path = require('path')

const app = express()
const publicFolderPath = path.join(__dirname, 'public')

app.use(express.json())
app.use(express.static(publicFolderPath))

const users = []

// add POST request listener here
app.post( '/api/user', ( req, res ) => {

    if ( !users.includes( req.body.username ) ) {
        let user = req.body.username

        users.push( user )

        console.log( user + ' added to users.\n' )
        console.log( 'Current users are: ' + users.join(', ') )

        res.status(201).send({ message: 'User ' + user + ' added', user: req.body })
    } else if ( users.includes( req.body.username ) ) {
        res.status(409).send({ message: 'Username already taken' })
    } else {
        res.status(404).send({ message: 'Oops, we can\'t find what you\'re looking for.' })
    }

} )

app.listen(3000)