// Server starten ...     .\node_modules\.bin\nodemon .\Training\klasse-objekt-ejs-trainieren.js
// Um diese Seite im Browser aufzurufen ...    http://localhost:3000/klasse-objekt-ejs-trainieren

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.set('views', 'Training')

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Server lauscht auf Port %s', server.address().port)    
})

// Eine Klasse ist ein Bauplan (z.B. bei einem Rechteck die Seitenlänge,...).
// Ein Objekt ist die konkrete Umsetzung auf der Grundlage des Bauplans.
// Alle Objekte eines Bauplans haben dieselben Eigenschaften (z.B. Seitenlänge,...), 
// aber möglicherweise unterschiedliche Eigenschaftswerte.
// Auf "class" folgt immer ein Wort, das mit Großbuchstabe beginnt. Klasse immer groß
// Auf "this." folgt immer ein Wort, das mit Kleinbuchstabe beginnt, keine Umlaute verwenden. Objekt immer klein

// Klassendefinition

class Rechteck {
    constructor() {
        this.laenge
        this.breite
    }
}



// Deklaration eines Rechteckobjekts vom Typ Rechteck.
// Deklaration = Bekanntmachung, dass es ein Objekt vom Typ Rechteck geben soll.

// let rechteck = ...

// Instanziierung erkennt man am reservierten Wort "new".
// Instanziierung reserviert Speicherzellen für das soeben deklarierte Objekt.

// ... = new Rechteck()

// Initialisierung belegt die reservierten Speicherzellen mit konkreten Eigenschaftswerten.

// rechteck.breite = 3

// let rechteck = new Rechteck() ist Deklaration, Instanziierung


let rechteck = new Rechteck()
rechteck.breite = 3
rechteck.laenge = 2

// Zahlen nicht in Anführungszeichen,  Buchstaben, Wörter mit Anführungszeichen
// Postleitzahl, evtl. Hausnummer in Anführungszeichen, weil bei Berlin mit Null beginnt , weil führende Nullen weg und weil damit nicht gerechnet werden soll und weil Alter, das nicht in Anführungszeichen steht, berechnet werden kann
// Um etwas auf der Konsole/ im Terminal anzuzeigen...
// Es wird nur 2 bzw. 3 angezeigt



// Um beide Werte anzuzeigen ... (hier 3 und 2)
console.log(rechteck)

// Damit davor Länge,... steht

console.log("Länge:" + rechteck.laenge)

// Wenn localhost:3000/klasse-objekt-ejs-trainieren aufgerufen wird ...

app.get('/klasse-objekt-ejs-trainieren',(req, res, next) => {   

    // ... wird klasse-objekt-ejs-trainieren.ejs gerendert:

    res.render('klasse-objekt-ejs-trainieren', {  
        breite : rechteck.breite,
        laenge : rechteck.laenge
    })
})

// Zwischen den Aufzählungen Komma, dahinter nicht
// "breite : rechteck.breite" ,damit das im Browser angezeigt wird 
// Zur klasse-objekt...ejs wechseln und da im Body "  Breite: <%= breite %    eingeben




