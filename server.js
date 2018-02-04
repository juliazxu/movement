var path = require('path'),
    express = require('express'),
		app = express(),
		webpackDevHelper = require('./index.dev.js')

var pgp = require('pg-promise')(/*options*/)
var db = pgp('postgres://postgres:postgres@localhost:5432/movement')

if (process.env.NODE_ENV !== 'production') {
    console.log('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...')
    webpackDevHelper.useWebpackMiddleware(app)
} else {
    console.log('PRODUCTION ENVIRONMENT')
    app.use('/js', express.static(__dirname + '/dist/js'))
}

// Setting up express to serve static files
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'node_modules')))

// we always want to serve the index.html
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'assets/index.html'))
})

app.listen(3456);

// TELESIGN SDK

var TeleSignSDK = require('telesignsdk');

const customerId = "661143F9-BD7C-4199-B4A9-5EFCF1CA7C25";
const apiKey = "/dR+fRG9WftRkENgupQViBeOs2TfeRcIvEs2NE8T+8pg/D5fMp6/vuG/oZvItvcQePwSsS2d7Ol5uGFdv/GPRw==";
const rest_endpoint = "https://rest-api.telesign.com";
const timeout = 10*1000; // 10 secs

const client = new TeleSignSDK( customerId,
    apiKey,
    rest_endpoint,
    timeout // optional
    // userAgent
);

const phoneNumber = "13019804834";
const message = "You're scheduled for a dentist appointment at 2:30PM.";
const messageType = "ARN";

console.log("## MessagingClient.message ##");

// sendMessage
app.post('/api/petitions', (req, res, next) => {
	await db.any(`
		INSERT INTO petitions (title, body, author_id)
			VALUES ($1, $2, $3)
	`, [req.body.title, req.body.body, req.body.author_id]);
});

// sendMessages('test-title', 'this is a cool petition', 1);

// db.any('SELECT * from persons')
//   .then( (data) => {
//     console.log('DATA:', data.value)
//   })
//   .catch( (error) => {
//     console.log('ERROR:', error)
//   })

messageCallback = (error, responseBody) => {
    if (error === null) {
        console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
            ` => code: ${responseBody['status']['code']}` +
            `, description: ${responseBody['status']['description']}`);
    } else {
        console.error("Unable to send message. " + error);
    }
}

client.sms.message(messageCallback, phoneNumber, message, messageType);