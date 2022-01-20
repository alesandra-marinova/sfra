'use strict';

/**
 * @namespace Twilio
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
var URLUtils = require('dw/web/URLUtils');
var Resource = require('dw/web/Resource');


server.post('Subscribe', function (req, res, next) {
    var Site = require('dw/system/Site');
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var Transaction = require('dw/system/Transaction');
    var UUIDUtils = require('dw/util/UUIDUtils');

    var phone = req.form.phone;
    var productId = req.form.pid;

    var message;

    var type = 'NotifyMeBackInStock';
    
   try {

    var allObjects = CustomObjectMgr.getAllCustomObjects(type);
    var subscriptionExists = false;

    if(allObjects.getCount() > 0) {
        while(allObjects.hasNext()) {
            var object = allObjects.next();
            if(object.custom.productId === productId) {
                Transaction.wrap(function() {
                object.custom.phoneNumbers = (object.custom.phoneNumbers).concat(", ", phone);
                });
                subscriptionExists = true;
                break;
            }
        }
    }
    if(!subscriptionExists){
        var keyValue = UUIDUtils.createUUID();
        Transaction.wrap(function() {
            var subscription = CustomObjectMgr.createCustomObject(type, keyValue);
            subscription.custom.phoneNumbers = phone;
            subscription.custom.productId = productId;       
        });
    }   

    res.json({
        success: true,
        message: Resource.msg('msg.product.notifywhenbackinstock.success.message','product',null)
    });
   }
   catch (err) {
    res.json({
        success: false,
        error:true,
        message: Resource.msg('msg.product.notifywhenbackinstock.error.message','product',null)
    });
   }
    
  next();
}, pageMetaData.computedPageMetaData);


module.exports = server.exports();
