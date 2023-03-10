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

const LocalStrategy2 = require('passport-local').Strategy;

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
const flash = require('connect-flash');

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
const port = 3000; 

/*
The app.listen() method starts the Express.js application and listens for incoming requests on the port specified 
by the port variable. If an error occurs during startup, the method logs an error message to the console. If the 
application starts successfully, the method logs a message to the console indicating that the application is 
listening on the specified port for test prototype requests.
*/
app.listen(port, function(err) {
    if (err) {
        console.log('There is a problem loading iVoteBallot prototype port 3000' + err);
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
const SESSION_MAX_AGE = process.env.SESSION_MAX_AGE;

/*
The if (process.env.NODE_ !== 'production') block checks whether the application is running in production mode,
and if not, loads additional environment variables from another .env file. This is a common practice to ensure
that sensitive information is not accidentally leaked in development or testing environments.
*/
if (process.env.NODE_ !== 'production') {
    require('dotenv').config();
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        store: new Sqlite3SessionStore({
            client: db,
            dir: 'signUpDatabase_Session.db',
            cookie: {
                secure: true,
                httpOnly: true,
                sameSite: 'lax',
                saveUninitialized: false,
                maxAge: 'SESSION_MAX_AGE'
            }
        }),
        secret: 'EXPRESS_SESSION_KEY',
        resave: false,
    })
)

app.use([passport.initialize()]);
app.use(passport.session());
app.use(flash());
app.use(methodOverride('_method'));


//Setup Passport to use the LocalStrategy for authentication
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // To allow request object to be passed to callback
},
   
    function(req, email, password, done) {
        if (!password) {
            console.log('User password enter onto the login field:' + password);            
            console.log('The user passport.use LocalStrategy password and confirm password does not match');
            return done(null, false, { message: 'Your password and confirm password does not match.'})
            
        } else 
        db1.get(`SELECT * FROM users WHERE email = ?`, email, (err, row) => {
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
                    return done(null, { id: row.id, email: row.email, firstName: row.firstName, lastName: row.lastName });

                });
                
            });

       
    }
));


//Set up Passport to serialize and deserialize users
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
/*
passport.deserializeUser(function(id, done) {
    db1.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return done(err);
        }
        if (!row) {

            return done(null, {
                id:row.id,
                email: row.email, firstName: row.firstName, lastName: row.lastName

            });   
});
*/

passport.deserializeUser(function(id, done) {
    db1.get('SELECT * FROM users WHERE id = ?', id, (err, row) => {
      if (err) { 
        return done(err); 
    }
      if (!row) { 
        return done(null, false); 
    }
      return done(null, { id: row.id, email: row.email, firstName: row.firstName, lastName: row.lastName });
    });
  });

// Set the views directory
app.set('views', './public/views');

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

/*
In the get route of the Express Passport is always established by ways of the ‘req.authenticate’
method within the request and response function which will authenticate the user sent request within 
the login session. And, by default, when the user login authentication succeeds then the user
request property (data information is sent to the SQLites3 database) such as, the user’s email 
address and password is set through the login session is established. 
*/

// Define a route for the login page
app.get('/', (req, res) => { 
    if (req.isAuthenticated()) {
        res.render('home');
    } else {
        res.render('error404');
    }    
});

// Define a route for the error 404 page
app.get('/error403', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('error403');
    } else {
        res.render('error500');
    }    
});

// Define a route for the error 404 page
app.get('/error404', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('error404');
    } else {
        res.render('error500');
    }    
});

// Define a route for the error 500 page
app.get('/error500', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('error500');
    } else {
        res.render('error404');
    }    
});

// Define a route for the forgot password page
app.get('/forgotPassword', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('forgotPassword');
    } else {
        res.render('error404');
    }    
});

// Define a route for the forgot username page
app.get('/forgotUsername', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('forgotUsername');
    } else {
        res.render('error404');
    }    
});

// Define a route for the home page
app.get('/home', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('home');    
    } else {
        res.render('error404');        
    }
});

// Define a route for the verify email page
app.get('/verifyEmail', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('verifyEmail');
    } else {
        res.render('error404'); 
    }    
});

app.get('/signup', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('signup', {text: 'This is a EJS tutorial example'});
    } else {
        res.render('error404');
    }
})


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
        
        });    
});

// Define a route for the logout page
app.get('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('logout');
    } else {
        res.render('error404');
    }    
});

// Define a route for the login page
app.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('login');
    } else {
        res.render('dashboard');
    }    
});

// Define a route for the Reset Password page
app.get('/resetPassword', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('resetPassword');
    } else {
        res.render('error403');
    }    
});

// Define a route for the login page
app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.user);
        res.render('dashboard', { firstName: req.user.firstName, lastName: req.user.lastName, email: req.user.email});
    } else {
        res.render('login')
    }
});

const db1 = new sqlite3.Database('users.db', err => {
    if (err) {
        console.log('Developer has created the SQLite3 database connection from her JavaScript codes language which has a generated an error, as ' + err + '.');
    }else {
        console.log('Developer has created the SQLite3 database connection from her JavaScript codes language which has a generated successfully connection.');
    }
});

// Set up the User Schema
db1.serialize(() => {
    db1.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName VARCHAR (25) NOT NULL,
        lastName VARCHAR (25) NOT NULL,
        userName VARCHAR (25) NOT NULL,
        email VARCHAR (50) NOT NULL,
        password VARCHAR (150) NOT NULL,
        confirmPassword VARCHAR (150) NOT NULL
    )`);
});

// Set up the route to handle users signup form.
app.post('/signup', async(req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    console.log(req.body);
    console.log('User first name: ' + firstName + '.');
    console.log('User last name is: ' + lastName + '.');
    console.log('User username is: ' + userName + '.');
    console.log('User email is: ' + email + '.');
    console.log('User password is: ' + password + '.');
    console.log('User confirm password is: ' + confirmPassword + '.');
    console.log(req.session);
    
   // Hash the password field using bcrypt.
    const salt = await bcrypt.genSalt(13);  
    const passwordHashed = await bcrypt.hash(req.body.password, salt); 

    // Hash the confirmPassword field using the same salt, as the password field.
    const confirmPasswordHashed = await bcrypt.hash(req.body.confirmPassword, salt);    

    // Compare the passwordHashed to the confirmPasswordHashed in order ensure they match in values.
    const passwordsMatch = await bcrypt.compare(passwordHashed, confirmPasswordHashed);
    if (passwordsMatch) {
        console.log('The user passwordHashed and confirmPasswordHashed did not match.');
        //return done(null, false, { message: 'Password do not match.'});
        return res.render('signup');    //or res.render('signup', { message: 'Password do not match})
    } else {
        console.log('The user passwordHashed and confirmPasswordHashed successfully match');
    }   

    // Insert the user data information in the SQLite3 database.
    db1.run(`INSERT INTO users (firstName, lastName, userName, email, password, confirmPassword) VALUES (?,?,?,?,?,?)`,         
    [firstName, lastName, userName, email, passwordHashed, confirmPasswordHashed],
        function(err) {
            if(err) {
                console.log(err.message);
                res.render('error500');
            } else {
                res.render('login');
            }
        });
    });     

app.post('/login', passport.authenticate('local', {
    successRedirect: 'dashboard',
    failureRedirect: 'login',
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
       
        db1.run('UPDATE users SET password = ? WHERE email = ?', hash, email, (err) => {
            if (err) {
            console.error(err);
            console.log('SQlite3 language had not properly execute the UPDATE correctly.')
            res.render('error500');
            } else {
            // Send the new password to the user's email to nodemailer 
            //sendEmail(email, 'New password', `Your new password is: ${newPassword}`);

            res.redirect('/verifyEmail');
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



