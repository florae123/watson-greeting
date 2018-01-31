# Node.js Watson Speech Sample

This application demonstrates a simple, reusable Node.js web application based on the Express framework, that connects to the Watson Text-to-Speech service on IBM Cloud.

## Deploy the app to IBM Cloud

From a command/shell terminal
* `cd` into the parent directory you want to install the project in
* `git clone` the project into a child directory
* `cd` into that child directory
* run `npm install` to install dependencies

For example:

    $ cd Projects
    $ git clone https://github.com/florae123/watson-greeting

        ... git output here ...

    $ cd watson-greeting

    $ npm install

        ... npm output here ...


Set the api endpoint to connect to IBM Cloud

    bx api https://api.eu-de.bluemix.net

Login to the IBM Cloud CLI

    bx login

Push the app to IBM Cloud

    bx app push

Create an instance of the Watson Text-to-Speech service in the same Cloud Foundry space you deployed the app to and connect it to your new app. Restage the application.

## Run the app locally

1. [Install Node.js][]
1. cd into this project's root directory
1. add the credentials of a Watson Text-to-Speech service to the app manually.
1. Run `npm install` to install the app's dependencies
1. Run `npm start` to start the app
1. Access the running app in a browser at <http://localhost:6001>

[Install Node.js]: https://nodejs.org/en/download/
