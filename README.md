# Brutto-Netto Gehaltsrechner

Node.js-Programm zum Abrufen einer Spanne von Gehältern von 
https://www.brutto-netto-rechner.info/. Ein Beispiel befindet sich unter [EXAMPLE.md](EXAMPLE.md)

Beim Aufruf von ```index.html``` erstellt das Programm eine CSV-Datei.

Zum ändern des Gehaltsbereichs muss in ```index.html```:

``` Javascript
const bereich = [30000, 120000];
```

angepasst werden.

Zur Anpassung der weiteren Formwerte (geldwerter Vorteil, Alter, Bundesland, etc.) müssen die Formdaten angepasst werden:

``` json
    form: {
        "f_bruttolohn": bJahr,
        "f_abrechnungszeitraum": "jahr",
        "f_geld_werter_vorteil": 0,
        "f_abrechnungsjahr": 2018,
        "f_steuerfreibetrag": 0,
        "f_steuerklasse": 1,
        "f_kirche": "nein",
        "f_bundesland": "nordrhein-westfalen",
        "f_alter": 20,
        "f_kinder": "nein",
        "f_kinderfreibetrag": 0,
        "f_krankenversicherung": "pflichtversichert",
        "f_private_kv": "",
        "f_arbeitgeberzuschuss_pkv": "ja",
        "f_KVZ": 1.1,
        "f_rentenversicherung": "pflichtversichert",
        "f_arbeitslosenversicherung": "pflichtversichert",
        "ok": 1
    }
```
