var TeleSignSDK = require('telesignsdk');

const customerId = "BF4F9040-A605-425F-9E89-BE66ACEA0268";
const apiKey = "OBDiV7BtkhuUnczhWRJWCt3K7W4oQNXuI01DUG/8QHS7AQTvhWRoJs5YhizVSyNDGXp3JQk1s8X6H4RlE5w71w==";
const rest_endpoint = "https://rest-api.telesign.com";
const timeout = 10*1000; // 10 secs

const client = new TeleSignSDK( customerId,
    apiKey,
    rest_endpoint,
    timeout // optional
    // userAgent
);

const phoneNumber = "01083963007";
const message = "You're scheduled for a dentist appointment at 2:30PM.";
const messageType = "ARN";

console.log("## MessagingClient.message ##");

function messageCallback(error, responseBody) {
    if (error === null) {
        console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
            ` => code: ${responseBody['status']['code']}` +
            `, description: ${responseBody['status']['description']}`);
    } else {
        console.error("Unable to send message. " + error);
    }
}
client.sms.message(messageCallback, phoneNumber, message, messageType);
