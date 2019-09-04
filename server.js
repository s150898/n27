// 


// Klassendefinition

class Konto {
    constructor() {
        this.Kontonummer
        this.Kontoart
    }
}

class Kunde {
    constructor() {
        this.Mail
        this.Name
        this.Kennwort
        this.IdKunde
        this.Geburtsdatum
        this.Adresse
        this.Telefon

    }
}

//Deklaration und Instanziierung

let kunde = new Kunde ()

// Initialisierung

kunde.Mail = "zuki@gmail.com"
kunde.Name = "Zuki"
kunde.Kennwort = 123
kunde.IdKunde = "4711"

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const iban = require('iban')
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Server lauscht auf Port %s', server.address().port)    
})

// Beim Aufrufen der Startseite wird die app.get('/'...) abgearbeitet.

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

// app.post() wird abgearbeitet, wenn der Button gedrückt wird.

app.post('/',(req, res, next) => {  
    
    // Der Wert aus dem Input mit dem name = 'idKunde' wird über 
    // die Anfrage (req) an den Server gesendet und zugewiesen 
    // an eine Konstante namens idKunde. 

    const idKunde = req.body.idKunde
    const kennwort = req.body.kennwort

    // Wenn der Wert von idKunde gleich dem Wert der Eigenschaft IdKunde
    // von kunde ist UND wenn der Wert von kennwort gleich dem Wert der
    // Eigenschaft Kennwort von kunde ist, dann werden die Anweisungen im Rumpf
    // der if-Kontrollstruktur ausgeführt.  

    if(idKunde == kunde.IdKunde && kennwort == kunde.Kennwort){
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
    
    const bankleitzahl = "27000000"
    const laenderkennung = "DE"
    
    if(idKunde){

        let konto = new Konto()
        konto.Kontonummer = req.body.kontonummer
        konto.Kontoart = req.body.kontoart

        let errechneteIban = iban.fromBBAN(laenderkennung, bankleitzahl + " " + req.body.kontonummer)
        console.log(errechneteIban)
        
        
        console.log("Kunde ist angemeldet als " + idKunde)
        res.render('kontoAnlegen.ejs', {
            meldung: "Das " + konto.Kontoart + " mit der Iban " + errechneteIban + " wurde erfolgreich angelegt." 

        })
    }else{
        res.render('login.ejs', {                    
        })    
    }
})

app.get('/profilBearbeiten',(req, res, next) => {   

    let idKunde = req.cookies['istAngemeldetAls']
    
    if(idKunde){
        console.log("Kunde ist angemeldet als " + idKunde)
        res.render('profilBearbeiten.ejs', { 
        meldung:""                             
        })
    }else{
        res.render('login.ejs', {                    
        })    
    }
})

app.post('/profilBearbeiten',(req, res, next) => {   

    let idKunde = req.cookies['istAngemeldetAls']
    
    if(idKunde){

        
        kunde.Mail = req.body.mail
        kunde.Name = req.body.name
        kunde.Kennwort = req.body.kennwort
        kunde.Adresse = req.body.adresse
        kunde.Telefon = req.body.telefon
        
        console.log("Kunde ist angemeldet als " + idKunde)
        res.render('profilBearbeiten.ejs', {
            meldung: "Das Profil wurde aktualisiert."                              
        })
    }else{
        res.render('login.ejs', {                    
        })    
    }
})

