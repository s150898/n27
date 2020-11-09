# Schleifen

Schleifen wiederholen sich so oft, bis eine Bedingung erfüllt ist. Die Bedingung muss ```true``` sein.

### Beispiele für den Einsatz von Schleifen:

1. Warteschleife im Callcenter: Sobald der Mitarbeiter wieder verfügbar ist, wird die Schleife abgebrochen. In der Schleife wird Musik gespielt.
2. Ein Laptop versucht solange eine Verbindung zum WLAN aufzubauen, bis er erfolgreich ist. 
3. Mit Schleifen können Zins- und Zinsseszinsen ausgerechnet werden.

### Arten von Schleifen

1. while
2. do-while
3. for

#### Unterschiede

While ist eine kopfgesteuerte Schleifen. do-while ist eine fußgesteuerte Schleife.
for ist eine Zählschleife.

Bei einer *kopfgesteuerten* Schleife und  bei einer Zählschleife erfolgt die Prüfung der Bedingung vor dem ersten Schleifendurchlauf. 

Bei *fußgesteuerten* Schleifen gibt es mindestens einen Durchlauf. Am Ende des ersten Durchlaufs wird geprüft.

### Wie werden Schleifen in Javascript programiert?

```Javascript

for(var i = 0; i < 10; i++){
    console.log(i)
}

```

Die drei Teile des Schleifenkopfes sind:
1. Initialisierug einer Zählvariablen mit 0
2. Bedingung, die entweder wahr oder falsch sein kann.
   Initialisierung belegt die reservierten Speicherzellen mit konkreten Eigenschaftswerten.
3. Die Zählvariable wird mit jedem Schleifendurchlauf um 1 erhöht (i++)


### Eine Schleife, die von 3 bis 0 herunterzählt.

```Javascript
for(var i = 3; i >= 0; i--){
    console.log(i)
}
```

### Es soll von 0 bis 3 hochgezählt, danach wieder bis 0 heruntergezählt werden

```Javascript

for(var i = 0; i < 4; i++){
    console.log(i)    
}
for(var i = 3; i >= 0; i--){
    console.log(i)    
}
```
### Die verherige Aufgabe soll 3x abgearbeitet werden.

Anmerkung: Es werden drei Schleifen benötigt. Die äußere schließt die inneren Schleifen ein. Wichtig: Die äußere darf nicht i initialisieren.
```Javascript
for(var z = 0; z < 3; z++){
    for(var i = 0; i < 4; i++){
        console.log(i)    
    }
    for(var i = 2; i >= 0; i--){
        console.log(i)    
    }
}
```

### Erstelle eine Zinseszins-Rechnung für ein Sparbuch.
