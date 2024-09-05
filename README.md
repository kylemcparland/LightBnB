# LightBnB - By: Kyle McParland (Lighthouse Labs 2024)

LightBnB is a web application designed to replicate the core functionalities of Airbnb, providing a platform for users to browse and book properties. This project served as a practical exercise in back-end and database technologies, including PostgreSQL, Node.js, Express, and JavaScript.

## Installation

- Clone **LightBnB** using the SSH key in the git repo:

```bash
git clone git@github.com:kylemcparland/LightBnB.git
cd lightbnb
```

//... With your RDBMS of choice, initialize local database using migrations/01_schema.sql
//... Import test/dummy data using seeds/02_seeds.sql
//... Navigate to lightbnb_webapp

- Install dependencies using `npm install` ( full list documented on bottom of README.md ):

```bash
npm install
```

- Setup

## How to use
- Initialize the development web server using `npm run local`. The app will be served at [port 8080](http://localhost:8080/) by default.
```bash
npm run local
...
"Tweeter listening on port 8080!"
```
- Connect locally using the url http://localhost:8080/ in your browser! _(Or customize the host using the PORT variable stored in server/index.js)_

## Final Product

!["Screenshot of terminal running Tweeter"](https://raw.githubusercontent.com/kylemcparland/tweeter/master/public/images/host-tweeter.png "Screenshot of terminal running Tweeter")

_Tweet whatever you like and Tweeter will generate a Username and Handle for you!_
!["Animated gif of submitting a new Tweet"](https://raw.githubusercontent.com/kylemcparland/tweeter/master/public/images/submit-tweet.gif "Animated gif of submitting a new Tweet")

_Responsive design in action! Desktop ==> Mobile_
!["Animated gif of the layout changing when resizing the window"](https://github.com/kylemcparland/tweeter/blob/master/public/images/responsive-design.gif?raw=true "Animated gif of the layout changing when resizing the window")

_Even the Tweets have responsive design!_
!["Screenshot of two different sized Tweets"](https://raw.githubusercontent.com/kylemcparland/tweeter/master/public/images/tweet-designs.png "Screenshot of two different sized Tweets")

## Dependencies + Acknowledgements
This project would not be possible without the following amazing libraries:

1. [Node.js](https://nodejs.org/en/download/package-manager) ^5.10.x

2. [express](https://www.npmjs.com/package/express) ^4.19.2

3. [Sass](https://www.npmjs.com/package/sass) ^1.77.8

4. [body-parser](https://www.npmjs.com/package/body-parser) ^1.20.2

5. [md5](https://www.npmjs.com/package/md5) ^2.1.0

6. [chance](https://www.npmjs.com/package/chance) ^1.0.2

[jquery](https://jquery.com/), [timeago](https://www.npmjs.com/package/timeago): (External JS downloaded on connect)


### Furthermore, these amazing development tools:

[nodemon](https://www.npmjs.com/package/nodemon) ^1.9.2

## Bugs and Issues:
If you encounter any bugs, please feel free to open an issue at [github](https://github.com/kylemcparland/tweeter/issues).

---

#### This project was built for educational purposes. Thank you for checking it out!