# EJS-Dev-Project

Dated March 11, 2023

After, Sarai Hannah Ajai had made her necessary JavaScript codes language changes corrections from her yesterday (March 10, 2023) JavaScript codes language errors she had experienced today (March 11, 2023) computer hacker[s] had intentionally, knowingly, and willfully added these lines of codes are as follows:

app.use('/login', (req, res, next) => {
    console.log('middleware called!');
    // Check if user is Already authenticated
    if (!req.session.isAuthenticated) {  
      
        // User of '/login' URL
        req.isUnauthenticated = true;
    }
    next();
}); 

when she had already written the above line of codes causing her index.js (server) file to execute within the Visual Studio Code ("VSC") twice  for which, had shown up onto her VSC terminal twice, as a console.log messages. And, those duplication within her index.js (server) 'app.use('/login', req, res, next)=>' function when executing twice within her NPM's  EJS-Dev-Project had caused her 'app.use('/login', req, res, next)=>' function to execute an error within the Passport that passes through the Session then the computer hacker[s] had deleted his/her added 'app.use('/login', req, res, next)=>' function. Until, Ms. Ajai had performed a 'Middleware' search; in order to review how many times she had console.log('middleware called!) to which had shown only once. Please keep in mind, Ms. Ajai is the only person working on her NPM's EJS-Dev-Project alone, and she does not share her VSC browser with anyone person. Therefore, how could this happen to her without her legal authorities. The attached PNG file is her proof and evidence of her computer hacking experiences.

<img width="1280" alt="Screenshot 2023-03-11 at 5 22 37 PM" src="https://user-images.githubusercontent.com/42658881/224518784-f588b0d3-2a46-4d7a-ba12-05942a635d4b.png">
_______________________________________________________________________________________________________________________________

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


