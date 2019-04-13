'use strict';

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;


// Imports dependencies and set up http server
const
  // request = require('request'),
  axios = require('axios'),
  express = require('express'),
  bodyParser = require('body-parser'),
  merchants = require('../config/clientTemplates'),
  app = express().use(bodyParser.json()); // creates express http server

// Creates the endpoint for our webhook
app.post('/', (req, res) => {
  console.log("we got a post request!");
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {
    console.log("it is coming from a page!");
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

        // Get the sender PSID
        let sender_psid = webhook_event.sender.id;
        console.log('Sender PSID: ' + sender_psid);

        if (webhook_event.message) {
            handleMessage(sender_psid, webhook_event.message)
        } else if (webhook_event.postback) {
            handlePostback(sender_psid, webhook_event.postback)
        } else if (webhook_event.optin) {
          console.log('We have a optin!')
          handleDiscountCodeMessage(sender_psid, webhook_event.optin)
        }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

// Adds support for GET requests to our webhook
app.get('/', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "kljdfiuheqr78f4378hfaudbfo87q3h4oyh";

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }else {
          res.sendStatus(200);
  }
});

app.get('/webhook/policy', (req, res) => {
        console.log("in /policy");
        res.send("policy here. honest.");
});

// Handles messages events
function handleMessage(sender_psid, received_message) {
    let response 
    if (received_message.text) {
        response = {
            "text": `Hello World! You sent me ${received_message.text}`
        }
    }

    callSendAPI(sender_psid, response)
}

// Create the template and return response 

function buildTemplate (sender_psid, template_object) {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: template_object.title,
            image_url: template_object.image,
            subtitle: template_object.subtitle,
            default_action: {
              type: "web_url",
              url: template_object.client_url,
              webview_height_ratio: "tall",
            },
            buttons: [
              {
                type: "web_url",
                url: template_object.client_url,
                title: "View Website"
              },
              {
                type: "postback",
                title: "Thank You!",
                payload: "Thank You"
              }
            ]
          },
          {
            title: `Code: ${template_object.discount_code}`
          }
        ]
      }
    }
  }
  return response
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let payload = received_postback.payload
  let response = {}
  if (payload === 'Thank You') {
    response = {
      text: 'Enjoy your discount! Buy responsibly ;)'
    }
  }
  callSendAPI(sender_psid, response)
}

// Sends response messages via the Send API
async function callSendAPI(sender_psid, response) {
    let request_body = {
        recipient: {
            id: sender_psid
        },
        message: response
    }
  try {
    const response = await axios.post(`https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, request_body)
    console.log('Message Sent', response)
  } catch (error) {
    console.log(error)
  }
}

async function handleDiscountCodeMessage (sender_psid, recieved_optin) {
  let response 
  let template
  // recieved_optin.ref -- is the app id we pass through from the CTA
  if (recieved_optin.ref) {
    switch (recieved_optin.ref) {
        // merchant 1
        case '0001':
          response = buildTemplate(sender_psid, merchants.rossSocks)
          break;
        // merchant 2
        case '0002':
        response = buildTemplate(sender_psid, merchants.LukesWares)
          break;
        // merchant 3
        case '0003':
        response = buildTemplate(sender_psid, merchants.chrisSmokes)
          break;
        default:
          break;
      }
    }

    callSendAPI(sender_psid, response)
}

module.exports = app