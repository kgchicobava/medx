# MedX
As i need something in my portfolio (Lol), i decided to make a full-stack app. At first i thought to make this as my diploma project, but then i decided this is not the best idea because it might be more difficult that i wanted to be.

**Idea is simple:** info-system, where tou can register/login as patient or doctor. As patient you can plan your visit to doctor, see what recepies he gave you, pay bills, etc. I think ideas will come. As doctor you can manage your patients, see individual their profiles, set threatment, manage your schedule.

Now it is in development. I only made authentication system. But i hope more will coming.

## Used technology
* React - well known frontend library
* Redux - for managing states in react
* React Router - for route logic in react
* Material UI library - because bootstrap is borring, and i personally like Material Design
* Express - back-end framework for NodeJS
* JSONWebToken - for auth purposes
* Sass - for better CSS
* MongoDB - as database
* Mongoose - MongoDB ODM
* Passport - for auth
* ApexCharts - for great looking charts
* Axios - for requests

## Installation
Install dependencies for server
```bash
npm install
```
Then cd to client and install dependencies for client (May take a while)
```bash
cd client
npm install
```
Then change back to root
and you can run back-end and react server
```bash
npm run dev
```
And then open in browser localhost:3000

## Features
### As **Doctor** you can:
1. Look at modern charts with stats information about all your patients. Of course with bigger number of people, charts will be more correct
[![image.png](https://i.postimg.cc/9Xs4n2WR/image.png)](https://postimg.cc/QVkxFRKh)
1. Take a look on list of all patients that registered as yours. and their short info
[![image.png](https://i.postimg.cc/W181TcP7/image.png)](https://postimg.cc/sMBr48xB)
1. See more detailed info about patient
[![image.png](https://i.postimg.cc/02d801rq/image.png)](https://postimg.cc/ykx475Ff)
[![image.png](https://i.postimg.cc/xTR2bGFf/image.png)](https://postimg.cc/BXXyrF0k)
1. Add records to e-card of patients, and read all previous, if needed
[![image.png](https://i.postimg.cc/bvGcM7Yr/image.png)](https://postimg.cc/VScV0HCP)
1. Sign up recepies
[![image.png](https://i.postimg.cc/Prf79g2H/image.png)](https://postimg.cc/8s3wrn2X)
1. Take a look on all weekly visits to you, so you can see how heavy this week will be
[![image.png](https://i.postimg.cc/L5xxmsNp/image.png)](https://postimg.cc/0KJYfPTW)
1. Generate a token. Then patient can find you by it
[![image.png](https://i.postimg.cc/LskBHX8b/image.png)](https://postimg.cc/4KdhPXt6)
1. Settings
[![image.png](https://i.postimg.cc/Qtx5hJPF/image.png)](https://postimg.cc/mcJhSCT4)
[![image.png](https://i.postimg.cc/3rqpQpZw/image.png)](https://postimg.cc/rzSzSD36)

### As **Patient** you can:
1. See list of all your doctors and main information about them
[![image.png](https://i.postimg.cc/SNhbJYZS/image.png)](https://postimg.cc/HjBhNnDR)
1. Add new doctors, via token system, which you have to get personally.
[![image.png](https://i.postimg.cc/d0q0dS40/image.png)](https://postimg.cc/870Dgw88)
1. In case if you disliked your doctor, you can unregister him.
[![image.png](https://i.postimg.cc/hjYyT6bW/image.png)](https://postimg.cc/wyhQdWG0)
1. In case if you liked yoir doc, you can rate him by 5-star system. Or set to 1, all allowed
[![image.png](https://i.postimg.cc/CLpy2nky/image.png)](https://postimg.cc/Sjdt2sgV)
1. See more detailed info about doctor
[![image.png](https://i.postimg.cc/bNg6RZR9/image.png)](https://postimg.cc/w7tcqTZ1)
1. Take a look at their schedule, so you can plan your visits
[![image.png](https://i.postimg.cc/4dRbGG53/image.png)](https://postimg.cc/4KwhvrjC)
1. So when you plan your time, you can early register visit, at comfortable time
[![image.png](https://i.postimg.cc/ZqppVgSz/image.png)](https://postimg.cc/qtBN71q1)
1. See what recepies signed for you this particular doctor, so you never forget
[![image.png](https://i.postimg.cc/3xpkTvbg/image.png)](https://postimg.cc/TKddjpxw)
1. See all recepies that was signed to you. No more paper cards needed
[![image.png](https://i.postimg.cc/hG2cW4gL/image.png)](https://postimg.cc/hJQHVBXv)
1. Look in calendar view at all your planned visits to all doctors current week
[![image.png](https://i.postimg.cc/13tZ0hD4/image.png)](https://postimg.cc/9rvSVk8j) 
1. And of course change settings
[![image.png](https://i.postimg.cc/Zqvtg87S/image.png)](https://postimg.cc/hJn5QdRy)
## Keys
In config folder you should create keys.js file and include your own keys
```javascript
module.exports = {
    mongoURI: "YOUR MONGOURI",
    secretKey: 'YOUR SECRET KEY'
}
```

## Some additional screenshots
* Home page
[![image.png](https://i.postimg.cc/8zNLZGHd/image.png)](https://postimg.cc/tYv1gL87)
* Register page
[![image.png](https://i.postimg.cc/jdNh8ZrT/image.png)](https://postimg.cc/4mftyvd2)
* Login page
[![image.png](https://i.postimg.cc/63yrChhD/image.png)](https://postimg.cc/cgGtSw2m)

*I know that in real systems doctors are not register on site, hospitals work with companies, but this is not a commercial product, so i made this simpler*
