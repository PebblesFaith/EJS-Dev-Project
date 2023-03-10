# EJS-Dev-Project

Dated March 9, 2023

In the get route of the Express Passport is always established by ways of the ‘req.authenticate’ method within the request and response function which will authenticate the user sent request within the login session. And, by default, when the user login authentication succeeds then the user request property (data information is sent to the SQLites3 database) such as, the user’s email address and password is set through the login session is established. For example, in the example below:

app.get('/signup', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('signup');
    } else {
        res.render('error404');
    }
});

In the Passport ‘req.authenticate’ must always be set up to the ‘app.get(‘/signup’, (req, res) =>’ because the user input data information must pass through the login session from the user internet browser assigned cookie; in order to establish authentication rights that passes the user’s data information through the login session into the SQLite3 database. Therefore, Sarai Hannah Ajai must always use the ‘req.isAuthenticated()’ method in order to establish, the user login session then the user’s data information is pass through the login session from the Passport database route ‘app.get(‘/signup’, (req, res) =>’. However, Ms. Ajai is experiencing Passport library ‘req.isAuthenticated()’ problems from her install passport library into her Node Packaging Manager (“NPM”) project name, EJS-DEV-Project. After, she had properly used the ‘req.isAuthenticated()’ methods for the ‘app.get(‘/signup’, (req, res) =>’ and ‘app.get(‘/login’, (req, res) =>’ function routes it appears someone is changing the ‘req.isAuthenticated’ method to the ‘req.isunauthenticated()’ method within the API Passport Library causing Ms. Ajai to experience route reversal after, she enter her route names in the URL bar. So, if you want to test her NPM project name, EJS-DEV-Project than you might have to switch the req.isAuthenticated() method to req.isunauthenticated() method, as the reverse JavaScript programmatic code language logic; in order to get the routes, URL to work properly because someone is tampering with the API Passport Library  ‘req.isAuthenticated()’ for which Ms. Ajai had no control over.


