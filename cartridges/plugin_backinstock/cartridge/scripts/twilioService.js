'use strict';

var Resource = require('dw/web/Resource');

function sendSms(phoneNumber, productName) {
    var fromPhone = "+18303577159";
    var bodyText = Resource.msgf('msg.twilioservice.body', 'product', null, productName);
    var getTwilioService = dw.svc.LocalServiceRegistry.createService('plugin_backinstock.twilio', {
        
        createRequest : function (svc, args) {
            svc.setRequestMethod('POST');
            svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');
            var body = "From=" + fromPhone + "&Body=" + bodyText + "&To=" + phoneNumber;
            return body;
        },
        parseResponse : function(svc, client){
            return client.text;
        }
    });

    var response = getTwilioService.call().object;

    return response;
}

module.exports = {
    sendSms: sendSms
};
