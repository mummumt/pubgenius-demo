## Demo Project For PubGenius Technical Interviews

Link : **[pubgenius-demo.vercel.app/](pubgenius-demo.vercel.app/)**

**HOW TO PLAY:**

 - Create a new user or use pre-created user with username = **admin** and password = **12345678** ( All users have the same password which is **12345678**, you can freely log in to their account. )
 - After logged in or registered, the stack of cards should be displayed. Each card represents a user and their provided details. You can swipe each of these card to the left to pass them, or to the right to like them.
 - When there is no user left for you to swipe, log out then register a new user to play again. 

This project was created to help demonstrate my Node.js and problem solving skills. The project was built from the ground up and destined to be finished within 2 days ( last weekend ). Due to time constraints, some of these code are not well optimized and may not use best approaches to solve problems, but I am satisfied with the result.

**THE PROCESS:**
	In this	section I will share the whole process of me working on this project to help you walkthrough the code easier.
	
 1. Firstly I opened a Github account and initialized the project via [this commit](https://github.com/mummumt/pubgenius-demo/commit/04555b2b1a2d6776798ed9df1f63fb375cbdbd98) then decided to build the back-end part first since this is usually how the projects are done. I used NextJs with tRPC backend for api endpoints. And for orm I used Prisma since this is what I am comfortable at. And for database I used PostgreSQL from docker image.
 2. Then when I was about to set up the project, the Docker itself suddenly crashes and threw an error for the first time. That took me an hour just to find the solution which was to uninstall & remove all caches and disable all features from the pc then install again.
 3. After solving the problem I created a backend authentication service using JWT (the private key and public key were not set properly in the environment variable) then route the service to tRPC endpoints. 
 4. After some of the endpoints were created, I initialized frontend section by installing MaterialUI, Emotion, Redux, React-Hook-Form etc. and then I realized that some dependencies were not well suited for each other,, took me long hours to get it to work properly.
 
 5. Then I worked on frontend parts and use Redux for storing user data and to use snackbar notification hook. Then styled the website. There was no problem in the development part that would consume my time more than they should have.
 6. Connected frontend to the backend services, tested and when I think the project was ready, I looked for a hosting for the database and the application and then decided to use the traditional way of deploying which is to deploy with Vercel and to host PostgreSQL database with Heroku. The process went well.
 7. After all things are done, removed .env file from the project and all commits. Then wrote this article.

The code were not 100% written by me, I most likely wrote by hand around 20% of the codebase in this project. Most of the code were reusable ones copied from my own projects and some of them are the ones I found on the internet and then modified to suit my needs.
 
 **Thank you for taking your time here, have a great day!**


