/*
Sarai Hannah Ajai has imported the 'express' API library and she has assigned a constant; in order to import an Express module
library application that connect with HTTP and middleware in Node.js back-end server (index.js) for accepting HTTP requests and responses.
 */
const express = require('express');

const app = express();

const path = require('path');

const ejs = require('ejs');

const sqlite3 = require('sqlite3').verbose();

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');

const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const LocalStrategy2 = require('passport-local').Strategy;

const sqliteDB = require('better-sqlite3');

const session = require('express-session');

const Sqlite3SessionStore = require("better-sqlite3-session-store")(session);

const flash = require('connect-flash');

const methodOverride = require('method-override');

const nodemailer = require('nodemailer');

const db = new sqliteDB('signUpDatabase_Session.db', { verbose: console.log('Session login has been successfully created')});

const port = 3000; 

app.listen(port, function(err) {
    if (err) {
        console.log('There is a problem loading iVoteBallot prototype port 3000' + err);
    } else {    
        console.log('The Nodejs in conjunction with Express framework is listening onto port ' + port + ' for test prototype.');
    }
});

require('dotenv').config();
const IONOS_SECRET_KEY = process.env.IONOS_SECRET_KEY;
const EXPRESS_SESSION_KEY = process.env.EXPRESS_SESSION_KEY;
const SESSION_MAX_AGE = process.env.SESSION_MAX_AGE;

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



