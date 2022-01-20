var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var ProductMgr = require('dw/catalog/ProductMgr');
var Transaction = require('dw/system/Transaction');
var twilioService = require('~/cartridge/scripts/twilioService.js');

module.exports.execute = function () {
   var objects = CustomObjectMgr.getAllCustomObjects('NotifyMeBackInStock');

   try{
       
      while(objects.hasNext()){
         var object = objects.next();
         var product = ProductMgr.getProduct(object.custom.productId);
         
         if(product.availabilityModel.inStock === true) {
            var phoneNumbers = object.custom.phoneNumbers.split(', ');
            phoneNumbers.forEach(function (phoneNumber) {
               var result = twilioService.sendSms(phoneNumber, product.name);
            });
            
            Transaction.wrap(function () {
                CustomObjectMgr.remove(object);
            });
        }      
    }
   }
   catch(e) {
      throw new Error(e.message);
   }   
};