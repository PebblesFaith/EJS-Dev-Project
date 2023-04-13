/*
In the get route of the Express Passport is always established by ways of the ‘req.authenticate’
method within the request and response function which will authenticate the user sent request within 
the login session. And, by default, when the user login authentication succeeds then the user
request property (data information is sent to the SQLites3 database) such as, the user’s email 
address and password is set through the login session is established. For example, in the example below:

app.get('/signup', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('signup');
    } else {
        res.render('error404');
    }
});

In the Passport ‘req.authenticate’ must always be set up to the ‘app.get(‘/signup’, (req, res) =>’ 
because the user input data information must pass through the login session from the user internet 
browser assigned cookie; in order to establish authentication rights that passes the user’s data information
through the login session into the SQLite3 database. Therefore, Sarai Hannah Ajai must always use the
‘req.isAuthenticated()’ method in order to establish, the user login session then the user’s data information
is pass through the login session from the Passport database route ‘app.get(‘/signup’, (req, res) =>’.
However, Ms. Ajai is experiencing Passport library ‘req.isAuthenticated()’ problems from her install passport 
library into her Node Packaging Manager (“NPM”) project name, EJS-DEV-Project. After, she had properly used 
the ‘req.isAuthenticated()’ methods for the ‘app.get(‘/signup’, (req, res) =>’ and ‘app.get(‘/login’, (req, res) =>’
function routes it appears someone is changing the ‘req.isAuthenticated’ method to the ‘req.isunauthenticated()’ 
method within the API Passport Library causing Ms. Ajai to experience route reversal after, she enter her route names 
in the URL bar. So, if you want to test her NPM project name, EJS-DEV-Project than you might have to switch the 
req.isAuthenticated() method to req.isunauthenticated() method, as the reverse JavaScript programmatic code language
logic; in order to get the routes, URL to work properly because someone is tampering with the API Passport Library 
‘req.isAuthenticated()’ for which Ms. Ajai had no control over.
*/

/* -------------------------------------------------------------------------------------------------------------*/

/* 
1. The code const express = require('express') imports the Express.js framework into your Node.js application and assigns
   it to the constant express.
2. The require function is a built-in Node.js method that allows you to import modules, and in this case, it is 
   importing the express module so that you can use the framework in your application.
*/
const express = require('express');

/*
The code const app = express(); creates a new instance of the Express.js framework and assigns it to the
constant app, allowing you to define routes and middleware for your application.
*/
const app = express();

/*
1. The code const path = require('path') imports the built-in Node.js path module, which provides utilities
   for working with file and directory paths.
2. You can use the path module to manipulate file paths in a platform-independent way and perform
   tasks such as resolving relative paths, joining multiple paths, and extracting file extensions.
*/
const path = require('path');

/*
1. The code const ejs = require('ejs') imports the EJS (Embedded JavaScript) templating engine into
   your Node.js application.
2. You can use the ejs module to render dynamic HTML pages by embedding JavaScript code into
   your HTML templates, allowing you to easily generate dynamic content based on data from your
   application.
*/
const ejs = require('ejs');

/*
1. The code const sqlite3 = require('sqlite3').verbose() imports the SQLite3 module into your Node.js application.
2. The .verbose() method provides additional debugging information when working with the SQLite3 database.
3. You can use the sqlite3 module to create, read, update, and delete data in an SQLite3 database,
   which is a popular embedded database engine.
*/
const sqlite3 = require('sqlite3').verbose();

/*
1. The code const bodyParser = require('body-parser') is a middleware module that parses incoming request bodies
   in a Node.js application.
2. The body-parser module can parse different types of request bodies, including JSON, URL-encoded, and
   multipart forms.
3. Once the request body is parsed, the middleware adds the parsed data to the request object, which you
   can then access in your route handlers.
*/
const bodyParser = require('body-parser');

/*
1. The code const bcrypt = require('bcrypt') is a module that allows you to hash and compare passwords in
   a Node.js application.
2. The bcrypt module uses a one-way hashing algorithm to securely store user passwords in a database,
   making it difficult for attackers to retrieve the original password.
3. You can use the bcrypt module to generate a salted hash of a password, and later compare the hash with
   the user's input to verify their identity.
*/
const bcrypt = require('bcrypt');

/*
1. The code const passport = require('passport') is a middleware module that provides authentication support
   in a Node.js application.
2. The passport module provides a flexible and modular authentication framework that can be easily
   integrated into an existing application.
3. You can use the passport module to implement various authentication strategies, such as local
   authentication, social authentication, and token-based authentication, to secure your application's resources.
*/
const passport = require('passport');

/*
1. The code const LocalStrategy = require('passport-local').Strategy is a module that provides a local authentication
   strategy for the passport middleware.
2. The passport-local module allows you to authenticate users using a username and password combination that is
   stored locally in your application.
3. You can use the LocalStrategy object to define how the authentication process works and provide custom
 validation and error handling logic for the authentication flow.
*/
const LocalStrategy = require('passport-local').Strategy;

/*
1. The code const sqliteDB = require('better-sqlite3') is a module that provides a more efficient and convenient
   way to work with SQLite databases in a Node.js application.
2. The better-sqlite3 module is built on top of the standard sqlite3 module but provides a simpler and more
   intuitive API for performing common database operations.
3. You can use the better-sqlite3 module to create, read, update, and delete data in an SQLite database,
   and leverage features such as prepared statements and transactions for better performance and security.
*/
const sqliteDB = require('better-sqlite3');

/*
The code const session = require('express-session'); imports the express-session module and assigns it
to a constant variable named session. This module provides a middleware that allows you to create and
manage user sessions in your index.js (server) web application. With express-session, you can store
the user data in a session and persist it across requests.
*/
const session = require('express-session');

/*
The code const Sqlite3SessionStore = require("better-sqlite3-session-store")(session); imports the
better-sqlite3-session-store module and creates a new instance of the session store that can be used
with the express-session middleware. This session store uses the better-sqlite3 module to store
session data in a SQLite database. By using this module, you can store and manage user sessions in a
reliable and efficient way.
*/
const Sqlite3SessionStore = require("better-sqlite3-session-store")(session);

/*
The code const flash = require('connect-flash'); imports the connect-flash module, which provides a 
middleware for storing and displaying flash messages in an Express.js application. Flash messages are 
short-lived messages that are stored in the session and displayed to the user on the next request. With
connect-flash, you can easily create and manage flash messages in your application, which can be used to
display success messages, error messages, or any other kind of notification to the user.
*/

const flash2 = require('connect-flash');

const flash = require('express-flash');

const { check, matchedData } = require('express-validator');

/*
The code const methodOverride = require('method-override'); imports the method-override module, which
provides a middleware for overriding the HTTP method of a request in an Express.js application. This is
useful when working with HTML forms, which can only submit GET and POST requests, but you want to use
other HTTP methods like PUT or DELETE. With method-override, you can specify a method override using a
query parameter or a special header, and the middleware will modify the request accordingly before it is
handled by your application's routes.
*/
const methodOverride = require('method-override');

/*
The code const nodemailer = require('nodemailer'); imports the nodemailer module, which is a popular
email sending library for Node.js applications. With nodemailer, you can easily create and send emails 
from your application using a wide range of transport methods, including SMTP, Sendmail, and more. The
module also provides support for HTML emails, attachments, and other advanced email features.
*/
const nodemailer = require('nodemailer');

/*
The code const db = new sqliteDB('signUpDatabase_Session.db', { verbose: console.log('Session login has
been successfully created')}); creates a new instance of the sqliteDB object and initializes a new SQLite
database file named signUpDatabase_Session.db. The second argument to the constructor is an options object
that enables logging to the console when the database is successfully created. Once the database is created,
you can use the db object to query and manipulate the database using the better-sqlite3 module.
*/
const db = new sqliteDB('signUpDatabase_Session.db', { verbose: console.log('Session login has been successfully created')});

/*
The code const port = 3000; initializes a constant variable named port with the value 3000. This value is
the port number that the Express.js application will listen on.
*/
const port = 1090; 

/*
The app.listen() method starts the Express.js application and listens for incoming requests on the port specified 
by the port variable. If an error occurs during startup, the method logs an error message to the console. If the 
application starts successfully, the method logs a message to the console indicating that the application is 
listening on the specified port for test prototype requests.
*/
app.listen(port, function(err) {
    if (err) {
        console.log('There is a problem loading iVoteBallot prototype port 1090' + err);
    } else {    
        console.log('The Nodejs in conjunction with Express framework is listening onto port ' + port + ' for test prototype.');
    }
});

/*
The code require('dotenv').config(); loads environment variables from a .env file into the Node.js process environment.
This allows you to store sensitive information like API keys or database credentials outside of your codebase and keep
them separate from your application logic
*/
require('dotenv').config();

/*
The variables IONOS_SECRET_KEY, EXPRESS_SESSION_KEY, and SESSION_MAX_AGE retrieve the values of environment variables
with the same names. These values are typically used to configure and customize the behavior of the application.
*/
const IONOS_SECRET_KEY = process.env.IONOS_SECRET_KEY;
const EXPRESS_SESSION_KEY = process.env.EXPRESS_SESSION_KEY;
const SESSION_MAX_AGE = 30 * 60 * 1000;

/*
The if (process.env.NODE_ !== 'production') block checks whether the application is running in production mode,
and if not, loads additional environment variables from another .env file. This is a common practice to ensure
that sensitive information is not accidentally leaked in development or testing environments.
*/
if (process.env.NODE_ !== 'production') {
    require('dotenv').config();
}

/*
The code app.use(express.json()); is a middleware function that is used in an Express.js application.
It enables the application to parse incoming requests with JSON payloads, which are commonly used for
RESTful APIs. This middleware adds the parsed JSON data to the request object of the application, allowing
it to be accessed and used by subsequent middleware functions or route handlers.
*/
app.use(express.json());

/*
The code app.use(express.urlencoded({ extended: false })); is a middleware function that is used in
an Express.js application. It enables the application to parse incoming requests with URL-encoded payloads, 
which are commonly used for HTML form submissions. This middleware adds the parsed data to the request object
of the application, allowing it to be accessed and used by subsequent middleware functions or route handlers.
The extended option is set to false to use the Node.js built-in querystring library to parse the data, which 
is suitable for simple data structures.
*/
app.use(express.urlencoded({ extended: false }));

/*
The code creates a new instance of the SQLite3 Database using the sqlite3 module in JavaScript. 
The first argument passed to the constructor is the name of the database file to create or 
connect to. In this case, the name of the database file is 'users.db'. If there is an error
during the database connection, the error message will be logged to the console with an 
appropriate message. If the connection is successful, a message will be logged to the console
indicating that the connection has been established successfully. The created instance of the 
SQLite3 database can be used to perform database operations such as inserting, updating, or
querying data.

This code is useful for developers who want to use a lightweight, serverless SQLite3 database
for their JavaScript application without the need for a separate server or installation process.
*/
const db1 = new sqlite3.Database('users.db', err => {
    if (err) {
        console.log('Developer has created the SQLite3 database connection from her JavaScript codes language which has a generated an error, as ' + err + '.');
    }else {
        console.log('Developer has created the SQLite3 database connection from her JavaScript codes language which has a generated successfully connection.');
    }
});

/*
The given JavaScript codes language creates a SQLite3 database table named "users"
if it does not already exist. The "users" table has seven columns, including an 
auto-incrementing primary key column named "id", and six other columns that store 
user information such as first name, last name, username, email, password, and 
confirm password. The first name, last name, username, email, password, and confirm
password columns are all required and have maximum length limits of 25, 50, and 150
characters, respectively.

The "serialize" function is called on the database instance, which ensures that all
database queries within the function are executed sequentially and not concurrently.
The "run" function is then used to execute the SQLite3 query that creates the "users"
table, which is wrapped in a template string for easy readability and formatting.

This code snippet is commonly used in web development to create a database table for
storing user account information, which can be accessed and manipulated as needed.
*/

db1.serialize(() => {
    db1.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName VARCHAR (25) NOT NULL,
        lastName VARCHAR (25) NOT NULL,
        userName VARCHAR (25) NOT NULL,
        email VARCHAR (50) NOT NULL,
        password VARCHAR (150) NOT NULL,
        confirmPassword VARCHAR (150) NOT NULL,
        temporary_Password VARCHAR (150) NOT NULL
    )`);
});

/*
The code app.use(session(...)); is a middleware function that is used in an Express.js application to enable
and configure session management. It creates and maintains a server-side session store to store session data 
between users' requests. In this particular example, the session store is implemented using the
Sqlite3SessionStore module, which uses a SQLite database to store the session data.

The middleware takes several options, including secret, which is used to sign the session ID cookie to
prevent tampering, and resave, which determines whether to save the session data to the store on every
request or only when it has been modified. Additionally, the cookie option is used to configure various
properties of the session ID cookie, such as its maxAge, which determines how long the session will 
remain active, and its secure and httpOnly flags, which provide additional security protections.

Overall, this middleware function provides a way to manage session data for each user session and
allows developers to store and retrieve data on a per-session basis to keep track of user data,
authentication status, and other user-specific information.
*/
app.use(
    session({
        store: new Sqlite3SessionStore({
            client: db,
            dir: 'signUpDatabase_Session.db',
            name: 'SESSION_NAME',
            cookie: {
                secure: true,
                httpOnly: true,
                sameSite: true,
                resave: false,
                saveUninitialized: false,
                maxAge: SESSION_MAX_AGE // 30 minutes in milliseconds
            }
        }),
        secret: 'EXPRESS_SESSION_KEY',
        resave: false,
    })
)

/*
The code app.use([passport.initialize()]); is a middleware function that is used in an Express.js
application to enable authentication and authorization using the Passport.js library. 
The passport.initialize() method initializes Passport and adds it to the middleware chain of the
application.

Once initialized, Passport can be used to authenticate requests and protect routes by verifying user
credentials and permissions. Passport supports a wide range of authentication strategies, such as
local authentication with a username and password, third-party authentication with OAuth or OpenID,
and token-based authentication.

By using Passport in conjunction with middleware functions like app.use(), developers can easily
integrate authentication and authorization into their Express.js applications and secure their
routes and data.
*/
app.use([passport.initialize()]);

/*
The code app.use(passport.session()); is a middleware function that is used in an Express.js 
application to provide persistent authentication across multiple requests using Passport.js. 
This middleware function depends on the passport.initialize() middleware function and should
be added after it.

When a user logs in successfully, Passport creates a session that is stored on the server and
serialized using passport.serializeUser(). On subsequent requests, the session is deserialized
using passport.deserializeUser() and the user information is loaded from the session store.

By using app.use(passport.session()), developers can provide persistent authentication to their
users and enable a seamless experience across multiple requests without requiring the user to
log in every time they navigate to a new page.
*/
app.use(passport.session());

/*
The code app.use(methodOverride('_method')); is a middleware function that is used in an Express.js
application to enable HTTP method overriding. It allows developers to use HTTP verbs such as PUT
and DELETE, which are not supported by HTML forms, by using a special query parameter or header to
specify the desired method.

The _method argument passed to the methodOverride() function specifies the name of the parameter or
header to use for the method override. By default, the middleware looks for the _method parameter
in the query string of the request, but this can be customized using the getter option.

Overall, this middleware provides a way to work around the limitations of HTML forms and use all
HTTP methods in an Express.js application, making it easier to build RESTful APIs and perform CRUD
operations.
*/
app.use(flash());

app.use(flash2());

/*
The code app.use(methodOverride('_method')); is a middleware function that is used in an Express.js
application to enable HTTP method overriding. It allows developers to use HTTP verbs such as PUT and
DELETE, which are not supported by HTML forms, by using a special query parameter or header to
specify the desired method.

The _method argument passed to the methodOverride() function specifies the name of the parameter or
header to be use for the method override. By default, the middleware looks for the _method parameter in
the query string of the request, but this can be customized using the getter option.

Overall, this middleware provides a way to work around the limitations of HTML forms and use all HTTP
methods in an Express.js application, making it easier to build RESTful APIs and perform CRUD operations.
*/
app.use(methodOverride('_method'));

/*
The JavaScript codes language sets up a LocalStrategy for Passport, which is a popular
authentication middleware for Node.js. It defines a function that will be called when an
user attempts to log in. The function takes the user's email and password, as an input
and uses them to search for an user in a SQLite3 database.

If the user is not found, the function returns an error message to the client. If the user
is found, the function uses the bcrypt library to compare the provided password with the
stored hashed password. If the passwords match, the function returns the user's data information
to the client (back-end server).

The passReqToCallback option is set to true, which allows the request object to be passed
to the callback function, enabling the developer to access other request parameters if 
necessary. This code provides a simple but effective way to authenticate users and ensure
the security of their data.
*/
passport.use(
    'login1',
    new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // To allow request object to be passed to callback
},   
    async (req, email, password, done) => {
        console.log('The passport.use email is: ' + email);
        console.log('The passport.use temporary password: ' + password);
        
        if (!password) {
            console.log('User password enter onto the login field:' + password);            
            console.log('The user passport.use LocalStrategy password and confirm password does not match');
            return done(null, false, { message: 'Your password and confirm password does not match.'})
            
        } else 
         await db1.get(`SELECT * FROM users WHERE email = ?`, email,(err, row) => {
            if (err) {
                return done(err);
            }
          
            if (!row) {
                return done(null, false, { message: 'You have entered the incorrect email address.'});
            }
            
             bcrypt.compare(password, row.password, (err, result) => {
               
                if (err) {
                    return done(err);
                }
                if (!result) {
                    return done(null, false, { message: 'You have entered the incorrect password.'});
                }
                //return done(null, row);

                return done(null, { id: row.id, email: row.email, firstName: row.firstName, lastName: row.lastName, isAuthenticated: true });

            });                
        });       
    }
));

/* Check, if user exists onto the SQLite3 database from the passport.use LocalStrategy 
    (which is actual similar to the "app.post('login2', (req, res) =>" that passes the user data 
    information through the Session cookie for the user authentication permission which should
    match to the SQLite3 database's email column. If user passport.use LocalStrategy does not
    match to the session cookie authentication than the session cookie will not authenticate user
    data information.
    */
passport.use(
    'login2', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'temporary_Password',
   
    passReqToCallback: true // To allow request object to be passed to callback
},        
    function(req, email, temporary_Password, done) { 
        console.log('The passport.use(login2) email is: ' + email);
        console.log('The passport.use(login2) temporary password: ' + temporary_Password);
        db1.get(`SELECT * FROM users WHERE email = ?`, email, (err, row) => {
            if (err) {
                
                return done(err);
            }
            if (!row) {
                return done(null, false, { message: 'You have entered the incorrect email address.'});
            }

            bcrypt.compare(temporary_Password, row.temporary_Password, (err, result) => {
                
                if (err) {
                    return done(err);
                }
                if (!result) {
                    console.log('The email and temporary password are: '  + email + temporary_Password + '.');
                    return done(null, false, { message: 'You have entered the incorrect temporary password.'});
                }
                
                return done(null, { id: row.id, email: row.email, firstName: row.firstName, lastName: row.lastName, password: row.password, confirmPassword: row.confirmPassword, temporary_Password: row.temporary_Password, isAuthenticated: true });      

            });
        });
         
    } 
));
    
/*
The code passport.serializeUser(function (user, done) { done(null, user.id); }) is a function
that is used by Passport to serialize the user object for storage in a session.

The serializeUser function takes in a callback function that receives the user object and a
done callback function as its parameters. The done function is called with null and the
user's id property as arguments, which is then used to serialize the user object to a string
representation.

This serialized user data is then stored in the session, allowing the server to persist the
user's authentication state across requests.

Overall, serializeUser is an essential function for Passport-based authentication, as it enables
the back-end server to efficiently manage user sessions and keep track of user authentication.
*/
passport.serializeUser(function (user, done) {
    console.log('Serializing user...');
    console.log('user');
    done(null, user.id);
});

/*
The code passport.deserializeUser is used by Passport to deserialize the user object from a 
session. This function takes in the user's id and a callback function done as parameters.

The deserializeUser function first queries the database using the user's id to retrieve
the user's information. If the user is not found, the function returns a false value to 
the done callback function. If the user is found, the function returns an object containing 
the user's id, email, firstName, and lastName to the done callback function.

Overall, deserializeUser is an important function in Passport-based authentication, as it 
allows the server to retrieve user data from sessions and use it to authenticate requests.
*/
passport.deserializeUser(function(id, done) {
    console.log('Deserializing user...')
    console.log(id);   
    db1.get('SELECT * FROM users WHERE id = ?', id, (err, row) => {
      if (err) { 
        return done(err); 
    }
      if (!row) { 
        return done(null, false); 
    }
      return done(null, { id: row.id, email: row.email, firstName: row.firstName, lastName: row.lastName,password: row.password, confirmPassword: row.confirmPassword, temporary_Password: row.temporary_Password, isAuthenticated: true });
    });
  });

// Middleware to set req.isUnauthenticated for the first use of the '/dashboard' URL bar
app.use('/dashboard', (req, res, next) => {
    // Check if user is Already authenticated
    if (!req.session.isAuthenticated) {
        req.isUnauthenticated = true;        
    }
    next();
});

// Middleware to set req.isUnauthenticated for the first use of the '/error403' URL bar
app.use('/error403', (req, res, next) => {
    // Check if user is Already authenticated
    if (!req.session.isAuthenticated) {
        req.isUnauthenticated = true;        
    }
    next();
});

// Middleware to set req.isUnauthenticated for the first use of the '/error404' URL bar
app.use('/error404', (req, res, next) => {
    // Check if user is Already authenticated
    if (!req.session.isAuthenticated) {
        req.isUnauthenticated = true;        
    }
    next();
});

// Middleware to set req.isUnauthenticated for the first use of the '/error500' URL bar
app.use('/error500', (req, res, next) => {
    // Check if user is Already authenticated
    if (!req.session.isAuthenticated) {
        req.isUnauthenticated = true;        
    }
    next();
});

// Middleware to set req.isUnauthenticated for the first use of the '/forgotPassword' URL bar
app.use('/forgotPassword', (req, res, next) => {
    // Check if user is Already authenticated
    if (!req.session.isAuthenticated) {
        req.isUnauthenticated = true;        
    }
    next();
});

// Middleware to set req.isUnauthenticated for the first use of the '/forgotUsername' URL bar
app.use('/forgotUsername', (req, res, next) => {
    // Check if user is Already authenticated
    if (!req.session.isAuthenticated) {
        req.isUnauthenticated = true;        
    }
    next();
});

// Middleware to set req.isUnauthenticated for the first use of the '/home' URL bar
app.use('/home', (req, res, next) => {
    // Check if user is Already authenticated
    if (!req.session.isAuthenticated) {
        req.isUnauthenticated = true;        
    }
    next();
});

// Middleware to set req.isUnauthenticated for the first use of the '/verifyEmail' URL bar
app.use('/verifyEmail', (req, res, next) => {
    // Check if user is Already authenticated
    if (!req.session.isAuthenticated) {
        req.isUnauthenticated = true;        
    }
    next();
});

// Middleware to set req.isUnauthenticated for the first use of the '/signup' URL bar

app.use('/signup', (req, res, next) => {
    // Check if user is Already authenticated
    if (!req.session.isAuthenticated) {
        req.isUnauthenticated = true;        
    }
    next();
});

// Middleware to set req.isUnauthenticated for the first use of the '/login' URL bar
app.use('/login', (req, res, next) => {
    console.log('middleware called!');
    // Check if user is Already authenticated
    if (!req.session.isAuthenticated) {  
      
        // User of '/login' URL
        req.isUnauthenticated = true;
    }
    next();
});

// Middleware to set req.isUnauthenticated for the first use of the '/login2' URL bar
app.use('/login2', (req, res, next) => {
    console.log('middleware called!');
    // Check if user is Already authenticated
    if (!req.session.isAuthenticated) {  
      
        // User of '/login' URL
        req.isUnauthenticated = true;
    }
    next();
});

// Middleware to set req.isUnauthenticated for the first use of the '/logout' URL bar
app.use('/logout', (req, res, next) => {
    // Check if user is Already authenticated
    if (!req.session.isAuthenticated) {
        req.isUnauthenticated = true;        
    }
    next();
});

// Middleware to set req.isUnauthenticated for the first use of the '/resetPassword' URL bar
app.use('/resetPassword', (req, res, next) => {
    // Check if user is Already authenticated
    if (!req.session.isAuthenticated) {
        req.isUnauthenticated = true;        
    }
    next();
});

// Middleware to set req.isUnauthenticated for the first use of the '/resetPassword' URL bar
app.use('/test', (req, res, next) => {
    // Check if user is Already authenticated
    if (!req.session.isAuthenticated) {
        req.isUnauthenticated = true;        
    }
    next();
});

/*
The code app.set('views', './public/views') is used to set the directory where the server
will look for views/templates to render. The views method is a built-in method of the Express.js
framework, and the first argument specifies the name of the option to set, while the second
argument specifies its value.

In this case, the views directory is set to ./public/views, which means that the back-end server
will look for view files in the public/views folder when rendering views/templates.
*/
app.set('views', './public/views');

/*
The code app.set('view engine', 'ejs') is used to set the default view engine for the Express.js
application. The view engine method is a built-in method of the Express.js framework, and the first
argument specifies the name of the option to set, while the second argument specifies its value.

In this case, the view engine is set to ejs, which means that the back-end server will use the EJS 
(Embedded JavaScript) templating engine to render views/templates.
*/
app.set('view engine', 'ejs');

/*
The code app.use(express.static(path.join(__dirname, 'public'))) is used to serve static files in 
the Express.js application. The express.static method is a built-in middleware function of the
Express.js framework, which serves static files such as images, CSS, JavaScript, and other files
in a directory specified in the method.

In this case, the path.join(__dirname, 'public') specifies the directory where the static files
are located, which is the public directory located in the same directory as the current file.
*/
app.use(express.static(path.join(__dirname, 'public')));

/*
    The constant redirectDashboard is a middleware function that checks if the user is already
    logged in by verifying the existence of a userId property in the user's session. If the user
    is logged in, the function redirects them to the dashboard page; otherwise, it allows the
    request to proceed to the next middleware function. This middleware is commonly used to restrict
    access to certain routes for authenticated users.
*/
const redirectDashboard = (req, res, next) => {
    if(req.session.userId) {
        res.redirect('/dashboard');
    } else {
        next();
    }
}

/*
In the get route of the Express Passport is always established by ways of the ‘req.authenticate’
method within the request and response function which will authenticate the user sent request within 
the login session. And, by default, when the user login authentication succeeds then the user
request property (data information is sent to the SQLites3 database) such as, the user’s email 
address and password is set through the login session is established. 
*/

/*
The code app.get('/', (req, res) => {...} sets up a route for the root URL of the Express.js application.

The route handler function checks if the user is authenticated using the req.isAuthenticated()
method provided by Passport.js. If the user is authenticated, the home template is rendered using the
res.render() method. If the user is not authenticated, the error404 template is rendered.
*/
app.get('/', (req, res) => { 
    if (req.isUnauthenticated()) {
        res.render('home');
    } else {
        res.render('error404');
    }    
});


// User route error403
app.get('/error403', (req, res) => {
    // Check if user already authenticated.
    if (req.session.isAuthenticated) {
        return alert('You are already logged in!');
    }
    // Check if this is the first use of '/error403' route URL bar
    if (req.isUnauthenticated) {
        res.render('error403');
    } else {
        // Render signup page for new users
        res.render('error500')
    }  
});

// User route error403
app.get('/error404', (req, res) => {
    // Check if user already authenticated.
    if (req.session.isAuthenticated) {
        return alert('You are already logged in!');
    }
    // Check if this is the first use of '/error404' route URL bar
    if (req.isUnauthenticated) {
        res.render('error404');
    } else {
        // Render signup page for new users
        res.render('error500')
    }  
});

// User route error500
app.get('/error500', (req, res) => {
    // Check if user already authenticated.
    if (req.session.isAuthenticated) {
        return alert('You are already logged in!');
    }
    // Check if this is the first use of '/error500' route URL bar
    if (req.isUnauthenticated) {
        res.render('error500');
    } else {
        // Render signup page for new users
        res.render('error404')
    }  
});

// User route forgotPassword
app.get('/forgotPassword', (req, res) => {
    // Check if user already authenticated.
    if (req.isUnauthenticated) {
        console.log('User had been successfully authenticated within the Session through the passport from forgotPassword webpage!');
        res.render('forgotPassword');
    } else {
        // Render signup page for new users
        console.log('User had not been successfully authenticated within the Session through the passport from forgotPassword webpage!');
        res.render('error404')
    }  
});

// User route forgotUsername
app.get('/forgotUsername', (req, res) => {
    // Check if user already authenticated.
    if (req.session.isAuthenticated) {
        return alert('You are already logged in!');
    }
    // Check if this is the first use of '/forgotUsername' route URL bar
    if (req.isUnauthenticated) {
        res.render('forgotUsername');
    } else {
        // Render signup page for new users
        res.render('error404')
    }  
});

// User route forgotUsername
app.get('/home', (req, res) => {
    // Check if user already authenticated.
    if (req.session.isAuthenticated) {
        return alert('You are already logged in!');
    }
    // Check if this is the first use of '/home' route URL bar
    if (req.isUnauthenticated) {
        res.render('home');
    } else {
        // Render signup page for new users
        res.render('error404')
    }  
});

// User route verifyEmail
app.get('/verifyEmail', (req, res) => {
    // Check if user already authenticated.
    if (req.session.isAuthenticated) {
        return alert('You are already logged in!');
    }
    // Check if this is the first use of '/verifyEmail' route URL bar
    if (req.isUnauthenticated) {
        res.render('verifyEmail');
    } else {
        // Render signup page for new users
        res.render('error404')
    }  
});

// User route signup
app.get('/signup', redirectDashboard, (req, res) => {    
    // Check if user already authenticated.
    if (req.session.isAuthenticated) {
        return alert('You are already logged in!');
    }
    console.log(req.session);
    // Check if this is the first use of '/signup' route URL bar
    if (req.isUnauthenticated) {
        res.render('signup');
    } else {
        // Render signup page for new users
        res.render('signup')
    }  
});

// Delete a route for the logout page
app.delete('/logout', (req, res) => {  
    if (req.isAuthenticated()) {
    
        req.logOut(); 
        res.render('login');
        }
        /* The logout logic will clear the users from the session object and save. 
        Also, will enure that the re-using of the old session id does not have
        a logged in user again.
        */
        req.session.user = null    
        req.session.save(function (err) {
            if (err) 
                next(err)       
            
                /* The regenerate of the session, which is good practice to help safe
                guard against users' forms of session fixation.
                */ 
                req.session.regenerate(function (err) {
                    if (err) next(err)
                res.render('dashboard');
            });        
        }
    );    
});

/*
   This is a route handler for a GET request to the path /login in the application. It first
   invokes the middleware function redirectDashboard, and then proceeds to the main route
   handler function. The main function logs the current user session and checks if the user is
   authenticated or not. If the user is not authenticated, it renders a login page and logs a
   message, and if the user is authenticated, it redirects them to the dashboard and logs another
   message. If neither of these conditions are met, it renders an error403 page.
*/
app.get('/login', redirectDashboard, (req, res) => {
    console.log(req.session);
    console.log('isUnauthenticated: ', req.isUnauthenticated);
    // Check if user already authenticated.
    if (req.isUnauthenticated) {
        res.render('login');
        console.log('User is not logged into the dashboard!');
    } else if         
        (req.session.isAuthenticated) {
        res.redirect('/dashboard');
        console.log('User is logged into the dashboard!');
       
    } else {       
        res.render('error403');
    }  
});

// User route logout
app.get('/logout', (req, res) => { 
    if (req.isAuthenticated()) {
        console.log('The User have successfully logged out of the dashboard!');
        res.render('logout');
    } else {      
        res.render('error404');
    }  
});

// User route login
//app.get('/login2', (req, res) => {
    //console.log('isUnauthenticated: ', req.isUnauthenticated);
    // Check if user already authenticated.
    //if (req.isUnauthenticated) {
        //res.render('login2');
        //console.log('User is not logged into the login2 to reset password webpage!');
    //} else if     
    //(req.session.isAuthenticated) {
       // res.redirect('/resetPassword');
        //console.log('User is has successfully logged into the login2 reset password authentication!');
   // } else {       
        //res.render('error403');
    //}  
//});

/*
  The constant redirectLogin is a middleware function that checks if the user is logged in by
  verifying the existence of a userId property in the user's session. If the user is not logged
  in, the function redirects them to the login page; otherwise, it allows the request to proceed 
  to the next middleware function.
*/
const redirectLogin = (req, res, next) => {
    if(!req.session.userId) {
        res.redirect('/login');
    } else {
        next();
    }
}

/*
The app.get function handles an HTTP GET request to the /dashboard route, with redirectLogin as
middleware. The function checks if the user is authenticated by calling req.isAuthenticated().
If the user is authenticated, it renders the dashboard template with user information; otherwise, 
it renders the login template and logs a message indicating that the user is not authenticated.
*/
app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated) {
        console.log(req.user);
        console.log(req.session);
        console.log('User had been successfully authenticated within the Session through the passport from dashboard!');
        res.render('dashboard', { firstName: req.user.firstName, lastName: req.user.lastName, email: req.user.email});
    } else if (req.isUnauthenticated) {
        res.render('/login')
        console.log('User is not successfully authenticated within the session through the passport from dashboard!');
    }
});

app.get('/resetPassword', (req, res) => {
    if (req.isAuthenticated) {
        console.log(req.user);
        console.log(req.session);
        console.log('User had been successfully authenticated within the Session through the passport from login2!');
        res.render('resetPassword', { firstName: req.user.firstName, lastName: req.user.lastName, email: req.user.email});
    } else if (req.isUnauthenticated) {
        res.redirect('/login2')
        console.log('User is not successfully authenticated within the session through the passport from login2!');
    }
});

app.get('/login2', (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.user);
        console.log('Request Session:' + req.session)
        console.log('' + req.logIn);
        console.log('The User had been successfully authenticated within the Session through the passport from reset password webpage!');
        res.render('login2');
    } else {
        res.render('error500')
       
        console.log('The user is not successfully authenticated within the session through the passport from reset password webpage!');
    }
});

/*
The given JavaScript codes language defines a route for signing up a new users using
the HTTP POST method. When an user submits a signup form, the back-end server extracts 
the form data (first name, last name, username, email, password, and confirmPassword) 
from the request body using the req.body object.

The JavaScript codes language then logs each user input to the console, and prints 
their values using string concatenation. It also logs the req.session object, which
may contain session data specific to the user.

The user's password and confirm password fields are then hashed using the bcrypt
algorithm, with the bcrypt library. The same salt is used to hash both fields, 
and the hashed values are stored in separate variables. The two hashes are compared 
using the bcrypt.compare() method to ensure they match, and if they do not, the user
is redirected to the signup page with an error message.

If the passwords match, the user's data is inserted into a SQLite3 database using an
SQLite3 query. The query is executed using the db1.run() method, and the results are
returned either as a successful redirect to the login page, or an error page if
something goes wrong.
*/

app.post('/signup', 
    async (req, res) => {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const userName = req.body.userName;
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const temporary_Password = req.body.temporary_Password;

        console.log(req.body);
        console.log('User first name: ' + firstName + '.');
        console.log('User last name is: ' + lastName + '.');
        console.log('User username is: ' + userName + '.');
        console.log('User email is: ' + email + '.');
        console.log('User password is: ' + password + '.');
        console.log('User confirm password is: ' + confirmPassword + '.');
        console.log('User temporary password is: ' + temporary_Password + '.');
        console.log(req.session);

        // User input data information validation.
        if (!firstName || !lastName || !userName|| !email || !password || !confirmPassword) {
            req.flash({message: 'Please fill in all field'});
          
            return res.redirect('/signup');
        }
        if (password !== confirmPassword) {
            req.flash('error', 'Passwords do not match');
            return res.redirect('/signup');
        

        } else {
            console.log('The user passwordHashed and confirmPasswordHashed successfully match, and the user is successfully authenticated to the passport and session.');
        }   

        // Hash the password field using bcrypt.
        const salt = await bcrypt.genSalt(13);  
        const passwordHashed = await bcrypt.hash(req.body.password, salt); 

        // Hash the confirmPassword field using the same salt, as the password field.
        const confirmPasswordHashed = await bcrypt.hash(req.body.confirmPassword, salt); 

        const newUser = {
            firstName,
            lastName, 
            userName,
            email,
            password: passwordHashed,
            confirmPassword: confirmPasswordHashed,
            temporary_Password
        };

        await db1.run(
            `INSERT INTO users (firstName, lastName, userName, email, password, confirmPassword, temporary_Password) VALUES (?,?,?,?,?,?,?)`,
            [newUser.firstName, newUser.lastName, newUser.userName, newUser.email, newUser.password, newUser.confirmPassword, newUser.temporary_Password]  
        );

        req.flash('Success', 'You are registered and can log in');
        res.redirect('/login');

});

// When the user login from using the middleware function that checks, if the user
// is already authenticated or not authenticated is causing the middleware
// to set to false from the above middleware.

app.post(
    '/login',
    passport.authenticate('login1', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true  
}));

app.post(
    '/logout',
    passport.authenticate('local', {
        successRedirect: '/login',
        failureRedirect: '/logout',
        failureFlash: true  
}));

app.post(
    '/login2',
    passport.authenticate('login2', {
        successRedirect: '/resetPassword',
        failureRedirect: '/login2',
        failureFlash: true 
}));

function generateNewPassword() {
    const length = 20;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-={}[]:";?,./~';
    let newPassword = '';
    for (let i = 0, n = charset.length; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * n));
    }
    return newPassword;
  }

/*
This code sets up a connection to a SQLite3 database called "users.db" and creates a table
called "users" if it doesn't already exist. It then sets up two routes: one to handle user
signups and another to handle user login.

The signup route takes in user data from a form and logs it to the console. It then uses
the bcrypt library to hash the user's password and confirm password before checking if
they match. If they match, it inserts the user data into the "users" table in the database.
If they don't match, it renders the signup page again with an error message.

The login route uses Passport.js to authenticate the user's credentials. If the authentication
succeeds, it redirects the user to a dashboard. If it fails, it redirects the user to the login
page with a flash message.

There is also a function called "generateNewPassword" that generates a random password of
length 20 containing letters, numbers, and symbols. Finally, there is a route called
"/forgotPassword" that allows users to reset their password by generating a new one,
hashing it, updating their record in the database, and sending them an email with the
new password (using nodemailer and a test SMTP service account).
*/
app.post('/forgotPassword', (req, res) => {
const email = req.body.email;

    // Check if the email exists in the database
    db1.get('SELECT * FROM users WHERE email = ?', email, (err, row) => {
        if (err) {
        console.error(err);
        console.log('SQLite3 language did not successfully execute user/s email address search properly; therefore this error means a JavaScript codes language error.');
        res.render('error500');

        } else if (!row) {
        res.render('/forgotPassword', { error: 'Email not found' });
        console.log('User/s email was not successfully found onto the SQlite3 database.')
        } else {
        // Generate a new password and update the user's record in the database
      
        const newPassword = generateNewPassword();
        const hash = bcrypt.hashSync(newPassword, 13);
       
        db1.run('UPDATE users SET temporary_Password = ? WHERE email = ?', hash, email, (err) => {
            if (err) {
            console.error(err);
            console.log('SQlite3 language had not properly execute the UPDATE correctly.')
            res.render('error500');
            } else {
            // Send the new password to the user's email to nodemailer 
            //sendEmail(email, 'New password', `Your new password is: ${newPassword}`);

            res.redirect('/login2');
            console.log('SQlite3 language had properly execute the UPDATE successfully for the user.')

            /*
            Sarai Hannah Ajai has generated a test SMTP service account; in order to receive AccouNetrics' customercare@ionos.com emails from the 
            'transporter' constant object from the AccouNetrics' users which pass through the 'nodemailer' API library.
            */
            const transporter = nodemailer.createTransport ({
                host: 'smtp.ionos.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'testdevelopmentenvcustomercare@ivoteballot.com',
                    pass: IONOS_SECRET_KEY,
                }
            });            
            
            if (req.isAuthenticated()) {
                /*
                Sarai Hannah Ajai has written her JavaScript programmatic codes for creating a usable 'transporter' constant object by ways of
                using the default SMTP transporter nodemailer API library.
                */
                const mailOptions_01 = {
                    from: req.body.email,
                    to: 'testdevelopmentenvcustomercare@ivoteballot.com', 
                    subject: `iVoteBallot has a New Online Voter Registration Not Yet Verified`,  
                    text: `iVoteBallot new online voter registration name is:
                    ${req.user.firstName} ${req.user.lastName}
                    and ${req.user.firstName} ${req.user.lastName} has been sent an iVoteBallot's verification link registration in order to verify his/her
                    email account, ${req.user.email}.`,     
                };

                const mailOptions_02 = {
                    from: 'testdevelopmentenvcustomercare@ivoteballot.com',
                    to: req.body.email, 
                    subject: `Authenticate your iVoteBallot's Email Address Link`,
                    html: `
                    
                    <p>Dear ${req.user.firstName} ${req.user.lastName},</p>

                    <p>Please click onto the following link in order to authenticate your email address:<p>

                    <p>Your new temporary password is: ${newPassword}</p;
                
                    <br>
                    
                    <p>and, your email address verification code will expire in 10 minutes. </p>
                    <br>        
                    <p>Respectfully, </p>
                    
                    <br>

                    <p>iVoteBallot's Customer Care Team </p>
                    
                    `,          
                };

                /*
                Sarai Hannah Ajai has written her JavaScript programmatic codes to send an user test email to AccouNetrics' customercare@accounetrics.com
                email account with nodemailer defined transporter object.
                */
                
                transporter.sendMail(mailOptions_01, (error, info) => {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email Sent: ' + info.response);
                    }
                  });                

                  transporter.sendMail(mailOptions_02, (error, info) => {
                    if (error) {
                      console.log(error);
                      res.send('error');
                    } else {
                      console.log('Email Sent: ' + info.response);
                      res.send('success!');
                    }
                  });                  
                  
            } else {
                res.render('error404');
                console.log('The nodemailer user could not be authenticated.');

            }
                          
            }
        });
        }
    });
});

app.post('/login2', 
    async (req, res) => {
        const email = req.body.email;
        const temporary_Password = req.body.temporary_Password;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        console.log('These are the request body' + req.body);    
        console.log('User email is: ' + email + '.');
        console.log('User temporary password is: ' + temporary_Password + '.');
        console.log('User password is: ' + password + '.');
        console.log('User confirm password is: ' + confirmPassword + '.');    
        console.log('The request session: ' + req.session);

        // Hash the password field using bcrypt.
        const salt = await bcrypt.genSalt(13);  
        const passwordHashed = await bcrypt.hash(password, salt); 

        // Hash the confirmPassword field using the same salt, as the password field.
        const confirmPasswordHashed = await bcrypt.hash(confirmPassword, salt); 

        // Check, if the user's email exists onto the passport serialization through the session.
        db1.get('SELECT * FROM users WHERE email = ?', email, (err, row) => {
            if (err) {
                console.error(err);
                console.log('The user\s passport and session was not successfully executed causing an 500 error message due from Developer\s programmatic coding language problems.');
                res.render('error500');
            } else if (!row) {
                console.log('The user\s email address is not successfully found within the passport serialization authenticated processes through the session.');
                res.render('login2');
            } else {
                
                db1.run('UPDATE users SET password = ?, confirmPassword = ? WHERE email = ?', passwordHashed, confirmPasswordHashed, row.email, (err) => {
                    if (err) {
                        console.error(err);
                        console.log('The user\s passport and session was not successfully executed causing an 500 error message due from Developer\s programmatic coding language problems.');
                        res.render('error500');                     
                    } else {
                        console.log('The user\s email address is successfully found within the passport serialization authenticated processes through the session.');
                        res.redirect('/login');
                    }                  

                });                
            }
        });
});

/* 
    Sarai Hannah Ajai's JavaScript codes language uses the Express, Passport, Session, Bcrypt, and SQLite3 libraries;
    in order to handle user authentication and update a user's new password and confirm password. When a user submits
    the reset password form, the code extracts their email, new password, and confirm password from the request object.
    It then hashes the new password and confirm password using the Bcrypt library with the same salt value to ensure
    they can be compared later.

    Her written JavaScript codes language checks whether the hashed password and confirm password match. If they do
    not match, the code displays an error message to the user. If the new password and confirm password match, the
    code updates the user's new password and confirm password in the SQLite3 database.

    If an error occurs during the update process, the code logs the error and redirects the user back to the reset
    password view with an error message. Otherwise, the code redirects the user to the login page, indicating that
    the new password and confirm password updates were successful.

    Overall, Ms. Ajai's JavaScript codes language ensures that the user's new password and confirm password were
    securely hashed, and the user's new password and confirm password match before updating the SQLite3 database.
    This helps to prevent any unauthorized access to the user's account and ensures that their password is kept safe.

    Dated 04-12-23

*/
app.post('/resetPassword', 
    async(req, res) => {
        const userEmail = req.user.email;
        const newPassword = req.body.password;
        const confirmNewPassword = req.body.confirmPassword; 

        // Hash the password field using bcrypt.
        const salt = await bcrypt.genSalt(13);  
        const passwordHashed = await bcrypt.hash(newPassword, salt);       

        // Hash the confirmPassword field using the same salt, as the password field.
        const confirmPasswordHashed = await bcrypt.hash(confirmNewPassword, salt);  

        if (passwordHashed !== confirmPasswordHashed) {
        return res.render('resetPassword', { error: 'New password and confirm password did not match.'});    }
    
        // Update the user's password and confirm password in the database.    
        db1.run('UPDATE users SET password = ?, confirmPassword = ? WHERE email = ?', [passwordHashed, confirmPasswordHashed, userEmail], (err) => {       
    
            if (err) {
                console.error(err.message);
            return res.redirect('resetPassword', { error: 'An error occurred while updating your new password and confirm password. Please try again.'});
            }     
        
            res.redirect('/login');
            
        });
    });
