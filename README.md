# Flaggen-Raten

Webapp zum Erraten und Nachbauen von Länderflaggen.

## Spielmodi

1. **Flagge raten** – Eine Flagge wird angezeigt, du tippst den Ländernamen.
2. **Flagge bauen** – Ein Land wird genannt, du baust die Flagge aus Layout, Farben und Symbolen (Sterne, Halbmond, Wappen …).

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
