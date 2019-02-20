//Das ist ein einzeiliger Kommentar.

/*
Das
ist
ein mehrzeiliger
Kommentar
*/

const bodyparser = require('body-parser')

const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.use (bodyparser.urlencoded({extended: true}))

app.use (express.static('public'))

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Der Server ist erfolgreich gestartet auf Port %s', server.address().port)
})

app.get('/',(req,res, next) => {
    res.render('index.ejs', {
        
    })
})


