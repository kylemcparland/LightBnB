# LightBnB - By: Kyle McParland (Lighthouse Labs 2024)

LightBnB is a web application designed to replicate the core functionalities of Airbnb, providing a platform for users to browse and book properties. This project served as a practical exercise in back-end and database technologies, including PostgreSQL, Node.js, Express, and JavaScript.

## Installation

- Clone **LightBnB** using the SSH key in the git repo:

```bash
git clone git@github.com:kylemcparland/LightBnB.git
cd lightbnb
```

- Next, using your **RDBMS** of choice (postgreSQL in my case), initialize the local database using `migrations/01_schema.sql.` Populate the database using `seeds/02_seeds.sql.`

```bash
\i migrations/01_schema.sql
\i seeds/02_seeds.sql
```

- Finally, navigate to the LightBnB_WebApp directory and install dependencies using `npm install` ( full list documented on bottom of README.md ):

```bash
cd LightBnB_WebApp
npm install
```

## How to use
- Initialize the development web server using `npm run local`. The app will be served at [port 3000](http://localhost:3000/) by default.
```bash
npm run local
...
"listening on port 8080 😎"
```
- Connect locally using the url http://localhost:3000/ in your browser!

## Final Product

_ERD of the project's database - for learning purposes there is one instance of de-normalization._
!["Screenshot of the database ERD"](https://raw.githubusercontent.com/kylemcparland/LightBnB/main/screenshots/lightbnb1.png "Screenshot of the database ERD")

_How the database is structured behind the scenes. There are some additional tables to allow the project's scope to grow!_
!["Screenshot of the database tables in PSQL"](https://raw.githubusercontent.com/kylemcparland/LightBnB/main/screenshots/lightbnb4.png "Screenshot of the database tables in PSQL")

_Search the database..._
!["Screenshot of the front-end of LightBnB - search"](https://raw.githubusercontent.com/kylemcparland/LightBnB/main/screenshots/lightbnb2n.png "Screenshot of the front-end of LightBnB - search")

_...and you shall find._
!["Screenshot of the front-end of LightBnB - property listings"](https://raw.githubusercontent.com/kylemcparland/LightBnB/main/screenshots/lightbnb3.png "Screenshot of the front-end of LightBnB - property listings")

## Dependencies + Acknowledgements
This project would not be possible without the following amazing libraries, and development tools:

[Node.js](https://nodejs.org/en/download/package-manager) ^5.10.x

[PostgreSQL](https://www.postgresql.org/) ^10.14

[node-postgres](https://node-postgres.com/) ^8.12.0

[Express](https://expressjs.com/) ^4.17.1

[bcrypt](https://www.npmjs.com/package/bcrypt) ^3.0.6

[cookie-session](https://www.npmjs.com/package/cookie-session?activeTab=readme) ^1.3.3

[Sass](https://www.npmjs.com/package/sass) ^1.77.8

[nodemon](https://www.npmjs.com/package/nodemon) ^1.19.2


## Bugs and Issues:
If you encounter any bugs, please feel free to open an issue at [github](https://github.com/kylemcparland/LightBnB/issues).

---

#### This project was built for educational purposes. Thank you for checking it out!