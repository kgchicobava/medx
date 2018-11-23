# MedX
As i need something in my portfolio (Lol), i decided to make a full-stack app. At first i thought to make this as my diploma project, but then i decided this is not the best idea because it might be more difficult that i wanted to be.

**Idea is simple:** info-system, where tou can register/login as patient or doctor. As patient you can plan your visit to doctor, see what recepies he gave you, pay bills, etc. I think ideas will come. As doctor you can manage your patients, see individual their profiles, set threatment, manage your schedule.

Now it is in development. I only made authentication system. But i hope more will coming.

## Installation
Install dependencies for server
```bash
npm install
```
Then cd to client
```bash
cd client
npm install
```
Then change back to root
and you can run back-end and react server
```bash
npm run dev
```

## Keys
In config folder you should create keys.js file and include your own keys
```javascript
module.exports = {
    mongoURI: "YOUR MONGOURI",
    secretKey: 'YOUR SECRET KEY'
}
```

## Used technology
* React - well known frontend library
* Redux - for managing states in react
* Material UI library - because bootstrap is borring, and i personally like Material Design
* Express - back-end framework for NodeJS
* JSONWebToken - for auth purposes
* MongoDB - as database
* Mongoose - MongoDB ODM
* Passport - for auth

*i know that in real systems doctors are not register on site, hospitals work with companies, but this is not a commercial product, so i made this simpler*

