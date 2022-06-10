require('dotenv').config()

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require("./config/db");

const modelRouter = require('./Routes/moodRoute')

// Google Auth
const {OAuth2Client} = require('google-auth-library');
const moodmodel = require('./Model/moodmodel');
const CLIENT_ID = '637632514001-v58rbsgfnephq7d5egiamd1ell3sit4c.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);


const PORT = 7000;

db.authenticate().then(() => 
    console.log("Connected to Database."
)).catch (err => {
    console.error('Unable to connect to the database:', err);
});

// Middleware

app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use("/mood", modelRouter);
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/login', (req,res)=>{
    res.render('login');
})

app.post('/login', (req,res)=>{
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // to specify the client ID for backend access
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
      }
      verify()
      .then(()=>{
          res.cookie('session-token', token);
          res.send('success')
      })
      .catch(console.error);

})

app.get('/profile', checkAuthenticated, (req, res)=>{
    let user = req.user;
    res.render('profile', {user});
})

app.get('/protectedRoute', checkAuthenticated, (req,res)=>{
    res.send('This route is protected')
})

app.get('/logout', (req, res)=>{
    res.clearCookie('session-token');
    res.redirect('/login')

})


function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // to specify the client ID for backend access
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
      }
      verify()
      .then(()=>{
          req.user = user;
          next();
      })
      .catch(err=>{
          res.redirect('/login')
      })

}


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})