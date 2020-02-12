// .\node_modules\.bin\nodemon .\server.js


// Klassendefinition

class Konto {
    constructor() {
        this.Iban
        this.Kontonummer
        this.Kontoart
        this.Anfangssaldo
    }
}
// Die Klasse ist der Bauplan, der alle relevanten Eigenschaften enthält.
// Nach der Deklaration wird mit dem reservierten Wort 'new' ein Objekt der Klasse instanziiert.

let konto

class Kunde {
    constructor() {
        this.Mail
        this.Nachname
        this.Vorname
        this.Kennwort
        this.IdKunde
        this.Geburtsdatum
        this.Adresse
        this.Telefonnummer
    }
}

//Deklaration und Instanziierung

let kunde = new Kunde ()

// Initialisierung


const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mysql = require('mysql')
const iban = require('iban')
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

// host: Adresse des Servers
// port: lauscht auf port 3306
const dbVerbindung = mysql.createConnection ({
    host: "10.40.38.110",
    port: "3306",
    database: "dbn27",
    user: "placematman",
    password: "BKB123456!"
})

//Verbindung zum Server wird hergestellt
dbVerbindung.connect()

// DAten werden in Tabellen gehalten
// Sprache in sql
// Die Tabelle konto wird angelegt, sofern sie nicht existiert. (Spalten der Tabelle (Attribute), dahinter Datentypen)
// über die IBAN bekomme ich auch allen anderen Attribute, IBAN eindeutig
// ; beendet SQL Befehl
// err Variable, die den Fehler angibt
// VARCHAR(22) Zeichenkette mit max 22 Zeichen (Buchstaben und Zahlen)
// primary key kennzeichnet datensatz; das einzelne Konto eindeutig; es kann keine 2 gleiche iban geben

dbVerbindung.connect(function(err){
    dbVerbindung.query("CREATE TABLE IF NOT EXISTS konto(iban VARCHAR(22), anfangssalso DECIMAL(15,2), kontoart VARCHAR(20), timestamp TIMESTAMP, PRIMARY KEY (iban));",function(err, result){
        if(err){
            console.log("Es ist ein Fehler aufgetreten: " + err)
        }else{
            console.log("Tabelle konto erstellt bzw. schon existent")
        }
    })
})

dbVerbindung.connect(function(err){
    dbVerbindung.query("CREATE TABLE IF NOT EXISTS kunde(idkunde INT(11), vorname VARCHAR(45), nachname VARCHAR(45), kennwort VARCHAR(45), mail VARCHAR(45), PRIMARY KEY (idkunde));",function(err, result){
        if(err){
            console.log("Es ist ein Fehler aufgetreten: " + err)
        }else{
            console.log("Tabelle kunde erstellt bzw. schon existent")
        }
    })
})

// Der Datentyp INT ist für Ganzzahlen

kunde.Mail = "s150898@berufskolleg-borken.de"
kunde.Vorname = "L"
kunde.Vorname = "E"
kunde.Kennwort = "123"
kunde.IdKunde = 150898

dbVerbindung.connect(function(err){
    dbVerbindung.query("INSERT INTO kunde(idkunde, vorname, nachname, kennwort, mail) VALUES (" + kunde.IdKunde + ", '" + kunde.Vorname + "', '" + kunde.Nachname + "', '" + kunde.Kennwort + "','" + kunde.Mail + "');", function(err, result){
        if(err){
            console.log("Es ist ein Fehler aufgetreten: " + err)
        }else{
            console.log("Tabelle erstellt bzw. schon existent")
        }
    })
})

// alles in '' was ein String ist (Zaheln und Buchstaben) ->Zahlen ohne Hochkommas
// Das Programm will die Daten immer wieder einfügen -> d.h., die IdKunde gibt es mehrmals; das ist aber der primary key, den es nur einmal geben kann; deswegen error 


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

        // Von der Klasse Konto wird ein Objekt namens konto instanziiert
        konto = new Konto()

        // Nach der Deklaration und Instanziierung kommt die Initialisierung. D.h., 
        // dass konkrete Eigenscahftswerte dem Objekt zugewiesen werden.
        konto.Kontonummer = req.body.kontonummer
        konto.Kontoart = req.body.kontoart
        konto.Anfangssaldo = req.body.anfangssaldo
        // Client stellt request , reqeust enthält Wert der Kontonummer

        konto.Iban = iban.fromBBAN(laenderkennung, bankleitzahl + " " + req.body.kontonummer)
        console.log(konto.Iban)

        // let errechneteIban das ist eine lokale variable die lebt nur für diese if else
        // deswegen Eigenschaft
        
        // Einfügen von iban, anfangssaldo, kontoart, timestamp in die Tabelle konto, mit der Sprache sql
        // 2000 ohne Hochkommas, weil Zahl nicht in Hochkommas

        // "INSERT INTO konto(iban, anfangssaldo, kontoart, timestamp) VALUES ('" und "', 2000, '', NOW());" sind jeweils 2 String wegen der Anführungszeichen
        // die Hochkaommas sind ein Teil des SQL Befehls und müssen da bleiben
        // weil das alles wie ein String ist werden die dynamischen Inhalte mit plus eingefügt  

        dbVerbindung.connect(function(err){
            dbVerbindung.query("INSERT INTO konto(iban,anfangssaldo,kontoart, timestamp) VALUES ('" + konto.Iban + "', " + konto.Anfangssaldo + ", '" + konto.Kontoart + "', NOW());", function(err, result){
                if(err){
                    console.log("Es ist ein Fehler aufgetreten: " + err)
                }else{
                    console.log("Tabelle erstellt bzw. schon existent")
                }
            })
        })
        
        console.log("Kunde ist angemeldet als " + idKunde)
        res.render('kontoAnlegen.ejs', {
            meldung: "Das " + konto.Kontoart + " mit der Iban " + konto.Iban + " mit dem Anfangssaldo " + konto.Anfangssaldo + "€ wurde erfolgreich angelegt." 

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

        kunde.Telefonnummer = req.body.telefonnummer
        kunde.Mail = req.body.mail
        kunde.Adresse = req.body.adresse
        kunde.Kennwort = req.body.kennwort
        kunde.Nachname= "Mustermann"
        
        console.log("Kunde ist angemeldet als " + idKunde)
        res.render('profilBearbeiten.ejs', {
            meldung: "Das Profil wurde aktualisiert."                              
        })
    }else{
        res.render('login.ejs', {                    
        })    
    }
})

app.get('/ueberweisen',(req, res, next) => {   

    let idKunde = req.cookies['istAngemeldetAls']
    
    if(idKunde){
        console.log("Kunde ist angemeldet als " + idKunde)
        res.render('ueberweisen.ejs', { 
        meldung:""                             
        })
    }else{
        res.render('login.ejs', {                    
        })    
    }
})

app.post('/ueberweisen',(req, res, next) => {   

    let idKunde = req.cookies['istAngemeldetAls']
    
    if(idKunde){

       // Das Zielkonto und der Betarg wird aus dem Formular entgegengenommen.

       let zielkontonummer = req.body.zielkontonummer
       let betrag = req.body.betrag

    /*
    // Der aktuelle Anfangssaldo wird aus der Datenbank ausgelesen, um dann mit diesem aktuellen Wert weiterrechnen zu können
    // Hier wieder Hochkommas gehören zum SQL Befehl dann weil quasi 2 Strings die Hochkommas, der dynamischen Inhalt mit Plus einfügen
       
    dbVerbindung.connect(function(err){
        dbVerbindung.query("SELECT anfangssaldo FROM konto WHERE iban = '" + zielkontonummer +"';",function(err, result){
            if(err){
                console.log("Es ist ein Fehler aufgetreten: " + err)
            }else{
                console.log("Tabelle erstellt bzw. schon existent")
            }
        })
    })
    */


    // Hier gleiches Schema, die Hochkommas gehören nicht zum SQL Befehl weil es ZAhlen  sind und damit gerechnet wird Zielkontonummer ist aber Text deswegen Hochkommas

    dbVerbindung.connect(function(err){
        dbVerbindung.query("UPDATE konto SET anfangssaldo = anfangssaldo +  " + betrag + " WHERE iban = '" + zielkontonummer + "'  ;",function(err, result){
            if(err){
                console.log("Es ist ein Fehler aufgetreten: " + err)
            }else{
                console.log("Tabelle erstellt bzw. schon existent")
            }
        })
        })

       // To do: Saldo um den Betrag reduzieren mit einem SQL-Update.
       // To do: Betrag beim Zielkonto gutschreiben mit einem SQL-Update.

       // Umsetzung mit einer gemeinsamen relationalen  Datenbank.

        console.log("Kunde ist angemeldet als " + idKunde)
        res.render('ueberweisen.ejs', {
            meldung: "Die Überweisung wurde erfolgreich ausgeführt."                              
        })
    }else{
        res.render('login.ejs', {                    
        })    
    }
})

app.get('/kontoAbfragen',(req, res, next) => {   

    let idKunde = req.cookies['istAngemeldetAls']


    //Aus der Datenbank muss der Kontostand für das Objekt selektiert werden.
    // Bei den dynamischen Inahlten braucht es '', weil es sich um keine Zahl handelt
    // Problem: Iban muss erst noch als Eigenschaft angelegt werden usw. (??)
    
    dbVerbindung.connect(function(err){
        dbVerbindung.query("SELECT anfangssaldo FROM konto WHERE iban = '" + konto.Iban + "';",function(err, result){
            if(err){
                console.log("Es ist ein Fehler aufgetreten: " + err)
            }else{
                console.log("Kontostand wurde erfolgreich abgefragt. Der Kontostand ist: " + result[0].anfangssaldo)
                console.log(result[0].anfangssaldo)
            

            }
        })
        })


    if(idKunde){
        console.log("Kunde ist angemeldet als " + idKunde)
        res.render('kontoAbfragen.ejs', { 
        meldung:"Hallo"                             
        })
    }else{
        res.render('login.ejs', {                    
        })    
    }
})
