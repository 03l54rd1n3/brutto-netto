const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs')

const pricePattern = /[. €]/ig;
const spacePattern = /\s+/ig;

const getGehalt = function (bJahr) {
    return request.post(
        'https://www.brutto-netto-rechner.info/',
        {
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
        }).then(body => {
            const $ = cheerio.load(body);
            var nettoWerte = $('.right_column.orange.big b').text().replace(pricePattern, '').replace(spacePattern, ' ').replace(',', '.').trim().split(' ');
            return { bMonat: bJahr / 12, bJahr, nMonat: parseFloat(nettoWerte[0]), nJahr: parseFloat(nettoWerte[1]) }
        });
}

var toFixed = function(n) {
    return (Math.round(n * 100) / 100).toFixed(2);
}

const bereich = [30000, 120000];
for(var i = bereich[0]; i <= bereich[1]; i+=1000) {
    getGehalt(i).then(gehalt => {
        var bruttoJahr = toFixed(gehalt.bJahr);
        var bruttoMonat = toFixed(gehalt.bMonat);
        var nettoJahr = toFixed(gehalt.nJahr);
        var nettoMonat = toFixed(gehalt.nMonat);
        var s = `${bruttoMonat};${bruttoJahr};${nettoMonat};${nettoJahr}\n`;

        fs.appendFile('gehaelter.csv', s);
    });
}