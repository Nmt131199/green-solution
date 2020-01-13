# Green Solution

This website is made for Vietnam Sach Va Xanh organization. We didn't get the part but here's the website anyways. The website is 100% Vietnamese.

## Demo

[Green Solution](https://green-solution-rmit.web.app/home)

## Getting Started

Go to the client folder and run:

### `npm install` or `npm i`

to install all of the packages needed for this website

## Run

Run this command:

### `npm start`

to start the website. The website should run on http://locahost:8000 on your browser.

## Deployment

This website is deployed with Firebase Hosting and AWS Beanstalk, but the AWS version does not last long because AWS charges quite a lot of money to keep a website running.

To deploy the webiste, first run:

### `npm run build`

to bundle the website, a build folder should be created after the build is done.

Then run:

### `firebase deploy`

to deploy this website to your Firebase Hosting server (I won't cover how to set up one).

## Built With

Frontend:
* [ReactJS](https://reactjs.org/) - Very neat Frontend library for web development
* [Redux](https://redux.js.org/) - State container for JS Applications, we use this library to manage our states, and for 
UI effects (loading, etc)
* [Material UI + Material UI Icons](https://material-ui.com/) - CSS + Animation all in one package

Backend:
* [NodeJS](https://nodejs.org/en/) - 100% of our APIs are written in NodeJS, very powerful language for backend applications.
* [Google Cloud Functions aka Firebase Functions](https://firebase.google.com/docs/functions) - Extrememly powerful Cloud 
Platform to build backend applications from scratch.
* [Cloud Firestore](https://firebase.google.com/docs/firestore) - We used Firestore to build a NoSQL database for our backend.

Hosted with [Firebase Hosting](https://firebase.google.com/docs/hosting)



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Thanks Triet, a Quang and Boi for making this website, great work guys!
