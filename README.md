I Know Someone Public Website
- - - - - - - - - - - - - - -

### Setting up Git environment (from scratch)

1 - `$ git remote add origin https://github.com/st-andrew/IKS-Public.git`

2 - `$ git fetch origin`

3 - `$ git pull origin master`


### Starting the server

##### Start the server in development mode

1 - In app.js comment out the line that sets the 'env' variable to 'production'

2 - Start the server by running

  `$ node app.js`

##### To start the server in production mode

1 - Uncomment the line that sets the 'env' variable to 'production' in app.js

2 - Start the server by running

  `$ node app.js`
