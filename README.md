# Flaggen-Raten

Webapp zum Erraten und Nachbauen von Länderflaggen sowie zum Lernen der deutschen Bundesländer.

## Spielmodi

1. **Flagge raten** – Eine Flagge wird angezeigt, du tippst den Ländernamen.
2. **Flagge bauen** – Ein Land wird genannt, du baust die Flagge aus Layout, Farben und Symbolen (Sterne, Halbmond, Wappen …).

3. **Bundesländer – Hauptstädte raten** – Alle 16 Landeshauptstädte frei eingeben. Groß-/Kleinschreibung und ae/oe/ue werden toleriert.
4. **Bundesländer – Auf der Karte finden** – Alle 16 Länder auf einer unbeschrifteten Deutschlandkarte auswählen. Stadtstaaten haben zusätzlich vergrößerte Auswahlkreise; die Karte ist mit Tab und Enter/Leertaste bedienbar.

Die Bundesländer-Rubrik liegt unter `/bundeslaender`, die Spielarten unter
`/bundeslaender/hauptstaedte` und `/bundeslaender/karte`. Jede Runde fragt alle
16 Länder einmal in zufälliger Reihenfolge ab. Fehler werden aufgelöst und
können am Ende gezielt wiederholt werden. Die Lernübersicht zeigt alle Paare.
Die Kartendaten sind lokal gebündelt; es wird kein Kartendienst benötigt.

## Lokal starten

```bash
npm install
npm run dev
```

Produktions-Build lokal testen:

```bash
npm run build
npm start
```

Die App läuft dann auf [http://localhost:3000](http://localhost:3000).

## Deploy auf Heroku

Voraussetzungen: [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) und ein Heroku-Account.

```bash
heroku login
heroku create dein-app-name
git add .
git commit -m "Initial commit"
git push heroku main
heroku open
```

Heroku setzt `PORT` automatisch. Der Express-Server in `server.js` liefert den Vite-Build aus `dist/` aus. Beim Deploy läuft `heroku-postbuild` (`npm run build`).

## Tech-Stack

- Vue 3 + Vite + Vue Router
- Express (statisches Hosting)
- Flaggenbilder: [flagcdn.com](https://flagcdn.com)

## Prüfen

```bash
npm test
npm run build
```

## Kartendaten

Quelle: [Click That ’Hood, germany.geojson](https://github.com/codeforgermany/click_that_hood/blob/main/public/data/germany.geojson),
laut [Quellenmetadaten](https://github.com/codeforgermany/click_that_hood/blob/main/public/data/germany.metadata.json)
aus dem Dienstleistungszentrum des Bundesamts für Kartographie und Geodäsie (BKG).
Der Lizenzhinweis des Quellprojekts ist in `public/data/LICENSE-germany.txt` enthalten.
Die Geometrie ist für das Lernspiel geeignet, nicht für genaue Grenzvermessungen.

Das Original liegt in `public/data/germany.geojson`. `npm run generate:map`
erzeugt daraus `src/data/stateMap.json` mit einer für Deutschland angepassten
Projektion und auf eine Nachkommastelle gerundeten SVG-Pfaden. Namen und Hauptstädte
werden separat in `src/data/federalStates.js` gepflegt.
