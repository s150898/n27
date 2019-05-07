class Konto {
    constructor() {
        this.Kontonummer;
        this.Kontoart;
    }
}

class Kunde {
    constructor() {
        this.Mail
        this.Name
        this.Kennwort
        this.IdKunde
        
    }
}

let kunde = new Kunde ()
kunde.Mail = "zuki@gmail.com"
kunde.Name = "Zuki"
kunde.Kennwort = 123
kunde.IdKunde = 4711

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Server lauscht auf Port %s', server.address().port)    
})

app.get('/',(req, res, next) => {   

    let idKunde = req.cookies['istAngemeldetAls']
    
    if(idKunde){
        console.log("Kunde ist angemeldet als " + idKunde)
        res.render('index.ejs', {                              
        })
    }else{
        res.render('login.ejs', {                    
        })    
    }
})

app.get('/login',(req, res, next) => {         
    res.cookie('istAngemeldetAls', '')       
    res.render('login.ejs', {                    
    })
})

app.get('/login',(req, res, next) => {   
    res.render('login.ejs', {                    
    })
})

app.post('/',(req, res, next) => {   

    const idKunde = req.body.idKunde
    const kennwort = req.body.kennwort

    if(idKunde == kunde.IdKunde && kennwort === kunde.Kennwort){
        console.log("Der Cookie wird gesetzt")
        res.cookie('istAngemeldetAls','idKunde')
        res.render('index.ejs', {                    
        })
    }else{
        console.log("Der Cookie wird gelöscht")
        res.cookie('istAngemeldetAls','')
        res.render('login.ejs', {                    
        })
    }
})

app.get('/impressum',(req, res, next) => {   

    let idKunde = req.cookies['istAngemeldetAls']
    
    if(idKunde){
        console.log("Kunde ist angemeldet als " + idKunde)
        res.render('impressum.ejs', {                              
        })
    }else{
        res.render('login.ejs', {                    
        })    
    }
})

app.get('/kontoAnlegen',(req, res, next) => {   

    let idKunde = req.cookies['istAngemeldetAls']
    
    if(idKunde){
        console.log("Kunde ist angemeldet als " + idKunde)
        res.render('kontoAnlegen.ejs', { 
        meldung:""                             
        })
    }else{
        res.render('login.ejs', {                    
        })    
    }
})

app.post('/kontoAnlegen',(req, res, next) => {   

    let idKunde = req.cookies['istAngemeldetAls']
    
    if(idKunde){

        let konto = new Konto()
        konto.Kontonummer = req.body.kontonummer
        konto.Kontoart = req.body.kontoart
        
        
        console.log("Kunde ist angemeldet als " + idKunde)
        res.render('kontoAnlegen.ejs', {
            meldung: "Das " + konto.Kontoart +" " + konto.Kontonummer +" wurde erfolgreich angelegt."                              
        })
    }else{
        res.render('login.ejs', {                    
        })    
    }
})

