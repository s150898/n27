// .\node_modules\.bin\nodemon .\server.js

// Klassendefinition. Die Klasse ist der Bauplan, 
// der alle relevanten Eigenschaften enthält.
// Nach der Deklaration wird mit dem reservierten Wort
// 'new' ein Objekt der Klasse instanziiert.
// Alle Objekte, die von dieser Klasse instanziiert werden, haben 
// dieselben Eigenschaften, aber möglciherweise unterschiedliche Eigenschaftswerte


class Konto{
    constructor(){
        this.Iban
        this.Kontonummer
        this.Kontoart
        this.Anfangssaldo
        // Die IdKunde ist eine Eigenschaft von Konto.
        // Jedes Konto wird einem Kunden zugeordnet.
        this.IdKunde
    }
}

let konto 

class Kunde{
    constructor(){
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

// Deklaration und Instanziierung

let kunde = new Kunde()

// Initialisierung

// Externe Module werden eingebunden
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

// Die Congig.js einbinden:

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];


// host: Adresse des Servers
// port: lauscht auf port 3306

const dbVerbindung = mysql.createConnection({
    host: '130.255.124.99', 
    user: 'placematman',
    password: "BKB123456!",
    database: "dbn27"
})

//Verbindung zum Server wird hergestellt
dbVerbindung.connect()

// Die Kontotabelle wird angelegt.

// DAten werden in Tabellen gehalten
// Sprache in sql
// Die Tabelle konto wird angelegt, sofern sie nicht existiert. (Spalten der Tabelle (Attribute), dahinter Datentypen)
// über die IBAN bekomme ich auch allen anderen Attribute, IBAN eindeutig
// ; beendet SQL Befehl
// err Variable, die den Fehler angibt
// VARCHAR(22) Zeichenkette mit max 22 Zeichen (Buchstaben und Zahlen)
// primary key kennzeichnet datensatz; das einzelne Konto eindeutig; es kann keine 2 gleiche iban geben

dbVerbindung.connect(function(err){

    dbVerbindung.query("CREATE TABLE konto(iban VARCHAR(22), idKunde INT(11), kontoart VARCHAR(20), timestamp TIMESTAMP, PRIMARY KEY(iban));", function(err, result){
        if(err){
            if(err.code === "ER_TABLE_EXISTS_ERROR"){
                console.log("Die Tabelle konto existiert bereits.")
            }else{
                console.log("Es ist ein Fehler aufgetreten: " + err.code)
            }            
        }else{
            console.log("Tabelle konto erstellt.")    
        }        
    })
})


/*
if(err){
            if(err.code == "ER_TABLE_EXISTS_ERROR"){
                console.log("Die Tabelle konto existiert bereits." )
            }else{
                console.log("Es ist ein Fehler aufgetreten: " + err.code)
            }  
        }else{
            console.log("Tabelle konto erstellt.")
        }
*/

// Die Rückmeldung der Datenbank über den Erfolg des Anlegens der Tabelle steckt in der Variablen "err"

dbVerbindung.connect(function(err){

    dbVerbindung.query("CREATE TABLE kunde(idKunde INT(11), vorname VARCHAR(45), nachname VARCHAR(45), kennwort VARCHAR(45), mail VARCHAR(45), PRIMARY KEY(idKunde));", function(err, result){
        if(err){
            if(err.code === "ER_TABLE_EXISTS_ERROR"){
                console.log("Die Tabelle kunde existiert bereits.")
            }else{
                console.log("Es ist ein Fehler aufgetreten: " + err)
            }            
        }else{
            console.log("Tabelle kunde erstellt.")    
        }        
    })
})

// 20210808

// Wir brauchen eine neue Tabelle namens Kontobewegung
// Der Primärschlüssel ist: IBAN und Timestamp
// Die Eigenschaften sind: iban VARCHAR(22), betrag DECIMAL(15,2), verwendungszweck VARCHAR(140), timestamp Timestamp

// Der Datentyp INT ist für Ganzzahlen

dbVerbindung.connect(function(err){

    dbVerbindung.query("CREATE TABLE kontobewegung(quellIban VARCHAR(22), zielIban VARCHAR(22), betrag DECIMAL(15,2), verwendungszweck VARCHAR(140), timestamp Timestamp, PRIMARY KEY(quellIban, timestamp), FOREIGN KEY (quellIban) REFERENCES konto(iban));", function(err, result){
        if(err){
            if(err.code === "ER_TABLE_EXISTS_ERROR"){
                console.log("Die Tabelle kontobewegung existiert bereits.")
            }else{
                console.log("Es ist ein Fehler aufgetreten: " + err)
            }            
        }else{
            console.log("Tabelle kontobewegung erstellt.")    
        }        
    })
})

/*  FOREIGN KEY (iban) REFERENCES konto(iban)
    Wir verwendet, damit es zu keiner Löschanomalie kommt (Anomalie = fehlerhafter oder
    unterdrückter Datenbankzugriff)
    Ansonsten könnte die Iban eines Kunden gelöscht werden, obwohl noch Kontobewegungen mit 
    dieser Iban existieren
*/

kunde.Mail = "s150898@berufskolleg-borken.de"
kunde.Vorname = "L"
kunde.Nachname = "E"
kunde.Kennwort = "123"
kunde.IdKunde = 150898

dbVerbindung.connect(function(err){
    dbVerbindung.query("INSERT INTO kunde(idKunde,vorname,nachname,kennwort,mail) VALUES (" + kunde.IdKunde + ", '" + kunde.Vorname + "', '" + kunde.Nachname + "', '" + kunde.Kennwort + "','" + kunde.Mail + "');", function(err, result){
        if(err){         
            if(err.code == "ER_DUP_ENTRY")   
                console.log("Der Kunde mit der ID " + kunde.IdKunde + " existiert bereits.")
            else
                console.log("Es ist ein Fehler aufgetreten: " + err)
        }else{
            console.log("Kunde " + kunde.IdKunde + " erfogreich eingefügt.")    
        }        
    })            
})

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Server lauscht auf Port %s', server.address().port)    
})


// alles in '' was ein String ist (Zaheln und Buchstaben) ->Zahlen ohne Hochkommas
// Das Programm will die Daten immer wieder einfügen -> d.h., die IdKunde gibt es mehrmals; das ist aber der primary key, den es nur einmal geben kann; deswegen error 

// Beim Aufrufen der Startseite wird die 
// app.get('/' ...) abgearbeitet.

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

// app.post() wird abgearbeitet, wenn der 
// Button gedrückt wird.

app.post('/',(req, res, next) => {   

    // Der Wert aus dem Input mit dem 
    // name = 'idKunde' wird über die
    // Anfrage (req) an den Server gesendet und
    // zugewiesen an eine Konstante namens
    // idKunde.

    const idKunde = req.body.idKunde
    const kennwort = req.body.kennwort

    // Wenn der Wert von idKunde gleich dem Wert der
    // Eigenschaft IdKunde von kunde ist UND
    // wenn der Wert von kennwort gleich dem Wert der
    // Eigenschaft Kennwort von kunde ist, dann
    // werden die Anweisungen im Rumpf der 
    // if-Kontrollstruktur ausgeführt.

    if(idKunde == kunde.IdKunde && kennwort == kunde.Kennwort){
        console.log("Der Cookie wird gesetzt: " + idKunde)
        res.cookie('istAngemeldetAls', idKunde)
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

// Die app.get() wird abgearbeitet, wenn die Seite im Browser aufgerufen wird.

app.get('/kontoAnlegen',(req, res, next) => {   

    let idKunde = req.cookies['istAngemeldetAls']
    
    if(idKunde){
        console.log("Kunde ist angemeldet als " + idKunde)
        res.render('kontoAnlegen.ejs', { 
            meldung : ""                             
        })
    }else{
        res.render('login.ejs', {                    
        })    
    }
})

// Die Funktion wird abgearbeitet, wenn der Button gedrückt wird.

app.post('/kontoAnlegen',(req, res, next) => {   

    let idKunde = req.cookies['istAngemeldetAls']    
    if(idKunde){

// Von der Klasse Konto wird ein Objekt namens konto 
// instanziiert.

        konto = new Konto()
   
// Nach der Deklaration und der Instanziierung kommt die
// Initialisierung. Das heißt, dass konkrete Eigenschafts-
// werte dem Objekt zugewiesen werden.        
   
        konto.Kontonummer = req.body.kontonummer
        konto.Kontoart = req.body.kontoart
        konto.IdKunde = idKunde 
        console.log(idKunde)

 // Client stellt request , reqeust enthält Wert der Kontonummer

        const bankleitzahl = "27000000"
        const laenderkennung = "DE"

        konto.Iban = iban.fromBBAN(laenderkennung, bankleitzahl + " " + req.body.kontonummer)
        
        console.log(konto.Iban)

         // let errechneteIban das ist eine lokale variable die lebt nur für diese if else
        // deswegen Eigenschaft
        
        // Einfügen von iban, anfangssaldo, kontoart, timestamp in die Tabelle konto, mit der Sprache sql
        // 2000 ohne Hochkommas, weil Zahl nicht in Hochkommas

        // "INSERT INTO konto(iban, anfangssaldo, kontoart, timestamp) VALUES ('" und "', 2000, '', NOW());" sind jeweils 2 String wegen der Anführungszeichen
        // die Hochkaommas sind ein Teil des SQL Befehls und müssen da bleiben
        // weil das alles wie ein String ist werden die dynamischen Inhalte mit plus eingefügt  

        // Einfügen von kontonummer in die Tabelle konto (SQL)
       
        dbVerbindung.connect(function(err){

            dbVerbindung.query("INSERT INTO konto(iban, idKunde, kontoart, timestamp) VALUES ('" + konto.Iban + "'," + kunde.IdKunde + ",'" + konto.Kontoart + "', NOW());", function(err, result){
                if(err){         
                    if(err.code == "ER_DUP_ENTRY")   
                        console.log("Das Konto " + konto.Iban + " existiert bereits.")
                    else
                        console.log("Es ist ein Fehler aufgetreten: " + err)
                }else{
                    console.log("Konto " + kunde.IdKunde + " erfolgreich eingefügt.")    
                }
            })            
        })

        console.log("Kunde ist angemeldet als " + idKunde)
        res.render('kontoAnlegen.ejs', {                              
           meldung : "Das Konto " + konto.Iban + " wurde erfolgreich angelegt." 
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
        
        // ... dann wird kontoAnlegen.ejs gerendert.
        
        res.render('profilBearbeiten.ejs', {    
            meldung : ""                          
        })
    }else{
        res.render('login.ejs', {                    
        })    
    }
})

app.post('/profilBearbeiten',(req, res, next) => {   

    let idKunde = req.cookies['istAngemeldetAls']
    
    if(idKunde){
        console.log("Kunde ist angemeldet als " + idKunde)
        
        kunde.Telefonnummer = req.body.telefonnummer
        kunde.Mail = req.body.mail
        kunde.Adresse = req.body.adresse
        kunde.Nachname = "Schmidt"
        kunde.Kennwort = req.body.kennwort
        
        res.render('profilBearbeiten.ejs', {                              
            meldung : "Die Stammdaten wurden geändert."
        })
    }else{
        // Die login.ejs wird gerendert 
        // und als Response
        // an den Browser übergeben.
        res.render('login.ejs', {                    
        })    
    }
})

app.get('/ueberweisen',(req, res, next) => {   

    // Der Cookie mit dem Namen 'istAngemeldetAls' wird abgefragt und der Variablen idKunde zugewiesen.

    let idKunde = req.cookies['istAngemeldetAls']
    
    // Wenn idKunde ungleich leer oder null, dann ist der Wert von idKunde == true

    if(idKunde){
        console.log("Kunde ist angemeldet als " + idKunde)
        
        // Eine neue Variable namens quellkonten wird deklariert. 

        let quellkonten

        dbVerbindung.connect(function(fehler){
            dbVerbindung.query('SELECT iban FROM konto WHERE idKunde = "' + idKunde + '";', function (fehler, quellkontenResult) {
                if (fehler) throw fehler
                
                console.log(quellkontenResult)
        
                // Der neuen Variablen namens quellkonten wird der Result zugewiesen.

                quellkonten = quellkontenResult
            })
        })
  

        dbVerbindung.connect(function(fehler){

            // Durch diesen Select-Befehl werden alle Ibans angezeigt.
            dbVerbindung.query('SELECT iban FROM konto;', function (fehler, zielkontenResult) {
                if (fehler) throw fehler
                
                console.log(zielkontenResult)
        
                // Die ueberweisen-Seite wird mit den quellkonten und zielkonten an den Browser übergeben.

                res.render('ueberweisen.ejs', {    
                    meldung : "",
                         quellkonten : quellkonten,
                         zielkonten : zielkontenResult                     
                })
            })
        })
    }else{
        res.render('login.ejs', {                    
        })    
    }
})
    
    // Die app.post wird abgearbeitet, wenn der Button auf dem Formular gedrückt wird.


// Hausaufgabe: Hier muss die dbVerbindung.query() zur Datenbank hergestellt werden, um alle gültigen ZielIbans auszulesen. 
                // Die Verbindungen werden also ineinander geschachtelt.
                // Die res.render()-Zeilen müssen in den Rumpf der innerern dbVerbindung.query() gelegt werden.
                // Der Result der inneren dbVerbindung.query() muss dann anders benannt werden. Z.B. result2 oder resultZielIbans
                // ... dann wird kontoAnlegen.ejs gerendert.
        


app.post('/ueberweisen',(req, res, next) => {   

    let idKunde = req.cookies['istAngemeldetAls']
    
    if(idKunde){
        console.log("Kunde ist angemeldet als " + idKunde)
        
        // Das Zielkonto und der Betrag wird aus dem Formular entgegengenommen.

        let zieliban = req.body.zieliban
        let betrag = req.body.betrag
        



        /*
        // Der aktuelle Anfangssaldo wird aus der Datenbank ausgelesen
        // Hier wieder Hochkommas gehören zum SQL Befehl dann weil quasi 2 Strings die Hochkommas, der dynamischen Inhalt mit Plus einfügen

        dbVerbindung.connect(function(err){

            dbVerbindung.query("SELECT anfangssaldo FROM konto WHERE iban = '" + zielkontonummer + "';", function(err, result){
                if(err){
                    console.log("Es ist ein Fehler aufgetreten: " + err)
                }else{
                    console.log("Tabelle erstellt bzw. schon existent.")    
                }        
            })
        })
        */


        //ToDo: Saldo um den Betrag reduzieren mit einem SQL-UPDATE.

         // Hier gleiches Schema, die Hochkommas gehören nicht zum SQL Befehl weil es ZAhlen  sind und damit gerechnet wird Zielkontonummer ist aber Text deswegen Hochkommas

        dbVerbindung.connect(function(err){

            dbVerbindung.query("UPDATE konto SET anfangssaldo = anfangssaldo + " + betrag + " WHERE iban = '" + zielkontonummer + "' ;", function(err, result){
                if(err){
                    console.log("Es ist ein Fehler aufgetreten: " + err)
                }else{
                    console.log("Tabelle erstellt bzw. schon existent.")                     
                }        
            })
        })


        //ToDo: Betrag beim Zielkonto gutschreiben mit einem SQL-UPDATE.

        // Umsetzung mit einer gemeinsamen relationalen Datenbank.

        res.render('ueberweisen.ejs', {                              
            meldung : "Die Überweisung wurde erfolgreich ausgeführt."
        })
    }else{
        // Die login.ejs wird gerendert 
        // und als Response
        // an den Browser übergeben.
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

        dbVerbindung.query("SELECT anfangssaldo FROM konto WHERE idKunde = '" + idKunde + "';", function(err, result){
            if(err){
                console.log("Es ist ein Fehler aufgetreten: " + err)
            }else{
                if(result[0] != null)
                    console.log("Kontostand wurde erfolgreich abgefragt. Der Kontostand ist: " + result[0].anfangssaldo)                                     
            }        
        })
    })


    if(idKunde){
        console.log("Kunde ist angemeldet als " + idKunde)
        res.render('kontoAbfragen.ejs', { 
            meldung : "Hallo"                             
        })
    }else{
        res.render('login.ejs', {                    
        })    
    }
})


app.get('/zinsrechnung',(req, res, next) => {   

    let idKunde = req.cookies['istAngemeldetAls']


    if(idKunde){
        console.log("Kunde ist angemeldet als " + idKunde)
        res.render('zinsrechnung.ejs', { 
            meldung : "Hallo"                             
        })
    }else{
        res.render('login.ejs', {                    
        })    
    }
})


app.post('/zinsrechnung',(req, res, next) => {   

    let idKunde = req.cookies['istAngemeldetAls']
    
    if(idKunde){
        console.log("Kunde ist angemeldet als " + idKunde)
        var kapital = req.body.startkapital
        console.log("Kapital: " + kapital)
        var zinssatz = req.body.zinssatz
        console.log("Zinsssatz: " + zinssatz)
        var laufzeit = req.body.laufzeit
        console.log("Laufzeit: "+ laufzeit)

        var jahr;
        for (jahr = 0; jahr < laufzeit ; jahr++)
        {
            kapital = kapital * zinssatz / 100 + parseFloat(kapital)
            console.log("E-Kapital:" + kapital)
        }

        res.render('zinsrechnung.ejs', {                              
            meldung : "Die Zinsen wurden berechnet. Endkapital:" + kapital 
        })
    }else{
        // Die login.ejs wird gerendert 
        // und als Response
        // an den Browser übergeben.
        res.render('login.ejs', {                    
        })    
    }
})