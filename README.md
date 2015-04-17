# Modul zur Fehlerrechnung

Autor: [Luca Keidel](https://github.com/lkdl)

## Voraussetungen
* nodejs (node) (Es sollte im Grunde auch jede andere JavaScript-Implementierung gehen, ich hab es aber nur mit node getestet.)

## Starten

1. Terminal öffnen, in den Ordner navigieren, in dem physik.js liegt
2. `$ node`
3. `> Physik = require('./physik')`

## Rumspielen

Nach dem Laden kann es losgehen, z.B. habe ich mal alle Werte von heute Vormittag gegengerechnet:

```
> new Physik.ErrorInterval(0.62, 0.02).pow(2)
{ median: 0.384, radius: 0.025 }
> new Physik.ErrorInterval(0.91, 0.02).pow(2)
{ median: 0.828, radius: 0.036 }
> new Physik.ErrorInterval(0.112, 0.02).pow(2)
{ median: 0.013, radius: 0.0045 }
> new Physik.ErrorInterval(1.12, 0.02).pow(2)
{ median: 1.254, radius: 0.045 }
> new Physik.ErrorInterval(1.20, 0.02).pow(2)
{ median: 1.44, radius: 0.049 }
> new Physik.ErrorInterval(1.44, 0.02).pow(2)
{ median: 2.074, radius: 0.058 }

```

Ich habe auch alle relevanten Aufgaben vorimplementiert um zu testen, ob das Tool auch richtig rechnet (Physik.aufg4(), ..., Physik.aufg12()).

Was man alles mit ErrorInterval machen kann, ist in doc/index.html einsehbar

# Parser

Autor: [David Bohn](https://github.com/dbohn)

## Benutzung

Zusätzlich ist es nun möglich, Ausdrücke parsen und berechnen zu lassen. Eine GUI ist hier zu finden: http://davbohn.userpage.fu-berlin.de/physcalc/

Zur Benutzung im Terminal:

1. In das `dist`-Verzeichnis wechseln
2. `node` ausführen
3. `> parser = require('./parser')`

### Beispiele

Der Parser kann nun über die Funktion parse im importierten parser-Modul ausgeführt werden und kann zur Auswertung beliebiger arithmetischer Ausdrücke verwendet werden, die die Rechenoperationen +, -, *, /, ^ verwenden:

```
> parser.parse('2 + 3')
{ median: 5, radius: 0 }
> parser.parse('2 * (3 + 4)')
{ median: 14, radius: 0 }
```

Wie man sieht, werden überall ErrorInterval-Objekte zurückgegeben. Nun kommen wir zum interessanten Teil, der Rechnung mit Fehlern.
Ein Fehlerwert wird in der Form `[<Median>+-<Radius>]` ausgedrückt:

```
> parser.parse('[2+-0.2]+[3+-0.01]')
{ median: 5, radius: 0.21 }
> parser.parse('2+[4+-3]*[2+-0.1]^2')
{ median: 18, radius: 14 }
```

Einige Dinge hierzu: Skalare Werte, wie die einzelne 2 im zweiten Beispiel, werden automatisch in ein ErrorInterval mit Radius 0 umgewandelt.

Die Exponenten dürfen nur Werte mit Fehlerradius 0 sein. Dies ist der verwendeten Fehlerrechnung geschuldet.

Möchte man am Ende der Rechnung ein als Endergebnis formatiertes ErrorInterval erhalten, so kann man den Ausdruck mit einem `=` beginnen:

```
> parser.parse('([62.4+-0.2]-[11.2+-0.2])/[9.2+-0.2]')
{ median: 5.57, radius: 0.17 }
> parser.parse('=([62.4+-0.2]-[11.2+-0.2])/[9.2+-0.2]')
{ median: 5.6, radius: 0.2 }
```

## Bauen
Um das Projekt zu bauen, sind folgende Schritte notwendig:

1. `npm install`
2. `gulp`

Es ist auch ein Watcher vorhanden, der das Bauen startet, sobald eine CoffeeScript-Datei oder die Parser-Grammatik geändert wird: `gulp watch`

Die Dokumentation wird mit [Codo](https://github.com/coffeedoc/codo) erstellt. Dies wird mit `npm install -g codo` installiert und kann dann mittels `codo ./coffee` gebaut werden.
