# Book Rating React App

Created a React app which allows users to share book reviews with each other. Users can also contribute their ratings to existing books.  
This project was deployed using Firebase (frontend) and Heroku (backend). It uses [json-server](https://www.npmjs.com/package/json-server) as a prototype backend.    
  
You can access the project [here](https://book-ratings-project.web.app).

## How to run locally

Frontend:

```bash
npm run install
```

Backend:

```bash
npx json-server --watch data/db.json --port 8000
```

## How to deploy

Firebase:

```bash
firebase login
npm run build
firebase deploy
```

Heroku:

```bash
heroku login
git push heroku main
```

## Reference:

Inspired by [this project](https://youtu.be/j942wKiXFu8?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d)
