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

5. **HSU-Quiz** – Fragen aus den Themen des Merkhefts für die 4. Klasse unter `/hsu`:
   Himmelsrichtungen, Kartenzeichen, Höhenlinien, Deutschland mit allen Landeshauptstädten
   und demokratische Wahlen. Themen einzeln oder gemischt üben, bis zu 10/20 Fragen oder
   den gesamten Themenvorrat wählen. Freitext- und Auswahlfragen, eigene SVG-Abbildungen,
   Erklärungen nach jeder Antwort, Auswertung je Thema und gezielte Fehlerwiederholung.
   Gemischte Runden berücksichtigen alle fünf Themen. Jede Frage wird pro Runde höchstens
   einmal gestellt. Die Aufgaben sind Übungsfragen, keine Vorhersage der Klassenarbeit.

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

## Automatisch nach Heroku deployen

Der Workflow [Test and deploy to Heroku](.github/workflows/deploy-heroku.yml)
prüft bei Pull Requests und Pushes auf `master` die Tests und den Produktionsbuild.
Nach einem erfolgreichen Push auf `master` wird genau dieser Commit per HTTPS-Git
zur bestehenden Heroku-App gepusht. Auch ein Merge in `master` löst das Deployment aus.
Pull Requests deployen nicht. Unter **Actions > Test and deploy to Heroku > Run workflow**
kannst du den Workflow für `master` manuell starten, etwa nach dem Einrichten der Secrets.
Parallele Deployments werden nacheinander ausgeführt.

### Einmalige Einrichtung

1. Die Heroku-App muss bereits existieren und das verwendete Heroku-Konto muss
   Deploy-Rechte dafür haben. Den App-Namen findest du im Heroku-Dashboard.
2. Öffne im GitHub-Repository **Settings > Environments > Heroku Deployment**.
   Der Deployment-Job verwendet genau diese Umgebung. Alternativ funktionieren
   auch Repository-Secrets unter **Settings > Secrets and variables > Actions**:

   | Bereich | Name | Wert |
   | --- | --- | --- |
   | Environment secrets > Add environment secret (oder Repository secret) | `HEROKU_API_KEY` | Dein Heroku-API-Key bzw. gültiger Heroku-Token |
   | Variables > New repository variable (optional) | `HEROKU_APP_NAME` | Andere Heroku-App; Standard ist `flaggen-raten` |

   `HEROKU_APP_NAME` darf alternativ als Repository-Secret hinterlegt werden.
   Falls beides existiert, hat die Variable Vorrang. Ohne diese Einstellung
   wird die App `flaggen-raten` verwendet.

3. Den API-Key findest du unter [Heroku Account settings](https://dashboard.heroku.com/account)
   im Abschnitt **API Key**. Alternativ zeigt `heroku auth:token` nach `heroku login`
   den aktuellen CLI-Token an. CLI-Token können ablaufen; dann das GitHub-Secret erneuern.
   Verwendest du ein separates Deployment-Konto, muss dieses Zugriff auf die App haben.
4. Sobald der Workflow in `master` liegt und der API-Key gesetzt ist, wähle
   **Actions > Test and deploy to Heroku > Run workflow > Branch: master**.
   Jeder folgende Push auf `master` startet das Deployment automatisch.

Das Secret enthält den Token selbst, nicht das Heroku-Passwort und nicht einen
GitHub-Personal-Access-Token. Ein `HEROKU_EMAIL`-Secret ist bei diesem Workflow nicht nötig.
Den API-Key ausschließlich als GitHub-Secret hinterlegen, nicht committen oder in
Chat-Nachrichten einfügen. Der Key berechtigt zum Zugriff auf die vom Konto erreichbaren
Heroku-Ressourcen. Beim Erneuern oder Widerrufen des Keys muss das GitHub-Secret
entsprechend aktualisiert werden.

Der Workflow verwendet nur die offiziellen Checkout-/Node-Actions und Git; eine
Heroku-CLI oder eine zusätzliche Deployment-Action ist nicht erforderlich.
Fehlende Konfiguration wird mit einer verständlichen Fehlermeldung gemeldet.
GitHub ist die maßgebliche Quellcode-Historie; Heroku Git dient als Deployment-Spiegel.
Vor dem Push wird der aktuelle Heroku-Branch-Stand gelesen. Mit `--force-with-lease`
wird der gewünschte GitHub-Stand auch bei abweichender alter Deployment-Historie
übertragen, aber eine zwischenzeitliche Änderung auf Heroku nicht überschrieben.
Falls bisher zusätzlich Herokus GitHub-Autodeploy aktiv ist, diesen deaktivieren,
um doppelte Deployments zu vermeiden.

Heroku setzt `PORT` automatisch. `heroku-postbuild` erzeugt bei Heroku den Vite-Build,
und `Procfile` startet den Express-Server, der `dist/` ausliefert.

Quellen: [Heroku Git-Authentifizierung](https://devcenter.heroku.com/articles/git#http-git-authentication),
[Heroku-Token](https://devcenter.heroku.com/articles/authentication#retrieving-the-api-token),
[GitHub Actions Secrets](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets).

## Manuell nach Heroku deployen

Mit installierter [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli):

```bash
heroku login
heroku git:remote -a dein-app-name
git push heroku master
heroku open
```

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
