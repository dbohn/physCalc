# Modul zur Fehlerrechnung

Autor: [Luca Keidel](https://github.com/lkdl)

## Voraussetzungen
* nodejs (node) (Jede andere JavaScript-Implementierung sollte ebenfalls funktionieren)

## Starten

1. Im Terminal zu dem Ordner `dist` navigieren
2. `$ node`
3. `> Physik = require('./physik')`

## Verwenden der Fehlerrechnung

Nach dem Laden kann es losgehen, z.B. mit arithmetichen Operationen,

```
> new Physik.ErrorInterval(0.62, 0.02).add(new Physik.ErrorInterval(0.82, 0.07))
{ median: 1.44, radius: 0.09 }

```
mit Potenzen

```
> new Physik.ErrorInterval(0.62, 0.02).pow(2)
{ median: 0.384, radius: 0.025 }

```
oder auch mit trigonometrischen Funktionen:

```
> new Physik.ErrorInterval(45.00, 0.02).apply(Physik.sin)
{ median: 0.7071, radius: 0.0025 } 

```

Der gesamte unterstützte Funktionsumfang kann in der Dokumentation der API eingesehen werden (`doc/index.html`).

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
