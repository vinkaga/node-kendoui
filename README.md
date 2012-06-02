# Node Kendo UI Sample Project #

It is a sample project for a Node/HTML5 application optimized separately for desktop browsers (web), iOS and Android devices. Its server side project is based on [robrighter / node-boilerplate](https://github.com/robrighter/node-boilerplate) and its client side project implements [ccoenraets / backbone-directory](https://github.com/ccoenraets/backbone-directory) sample using Kendo UI.

## Goals ##
1. Quickly get started with a Node/Kendo UI application
2. Optimize separately for browsers, phones and tablets
3. Serve pages optimized for the client automatically using the user agent string
4. Serve assets compressed in production but uncompressed during development
5. Chat capability (enabled on browsers)
6. BDD tests
7. Easily deployable on a Joyent Node SmartMachine

### Status ###
Work in progress

## Technologies ##
### Server ###
1. Node
2. Express - web framework and router
3. Mongoose/MongoDB - for persistence
4. Redis - for sessions
5. Socket.io - for chat etc
6. Jade - only for error pages
7. EJS - for serving production/development index
8. Mocha - BDD testing framework

### Client ###
1. HTML5
2. jQuery
3. Kendo UI


## The Application ##

It is a simple Employee Directory application that allows you to look up employees by name, view the details of an employee, and navigate up and down the Org Chart by clicking the employee’s manager or any of his/her direct reports.

### Set Up ###

1. Install and run MongoDB
2. Install and run Redis.io
3. Edit config.js if you are running MongoDB or Redis.io from another machine or non-default port
4. Start server by typing "node server.js"

### Trying Out ###
You can try out different versions of this application using Google Chrome's built-in user-agent switcher. [Read more.](http://www.learnwithnirab.com/2012/01/how-to-use-google-chromes-built-in-user.html)