'use strict';

/**
 * @namespace Subscribe
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
var URLUtils = require('dw/web/URLUtils');

/**
 */
/**
 * Subscribe-Show 
 * @name Subscribe-Show
 * @function
 * @memberof Subscribe
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
    var Site = require('dw/system/Site');

    var subscriptionForm = server.forms.getForm('subscribe');
    subscriptionForm.clear();
    
    res.render('subscribe/subscribe', {subscriptionForm : subscriptionForm});
    
    next();
}, pageMetaData.computedPageMetaData);


server.post('Create', function (req, res, next) {
    var Site = require('dw/system/Site');
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var Transaction = require('dw/system/Transaction');
    var UUIDUtils = require('dw/util/UUIDUtils');

    var subscriptionForm = server.forms.getForm('subscribe');

    var type = 'CustomTestHomework';
    var keyValue = UUIDUtils.createUUID();

    Transaction.wrap(function() {
        var subscription = CustomObjectMgr.createCustomObject(type, keyValue);
        subscription.custom.firstName = subscriptionForm.subscribeCustomer.firstname.htmlValue;
        subscription.custom.lastName = subscriptionForm.subscribeCustomer.lastname.htmlValue;
        subscription.custom.email = subscriptionForm.subscribeCustomer.email.htmlValue;
        subscription.custom.gender = subscriptionForm.subscribeCustomer.gender.htmlValue;       
    });

    var redirectUrl = URLUtils.url('Subscribe-Show');
    res.redirect(redirectUrl);
    
    next();
}, pageMetaData.computedPageMetaData);


module.exports = server.exports();
