var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var File = require('dw/io/File');
var FileWriter = require('dw/io/FileWriter');
var CSVStreamWriter = require('dw/io/CSVStreamWriter');
var Transaction = require('dw/system/Transaction');
var Logger = require('dw/system/Logger');

module.exports.execute = function () {
   var objects = CustomObjectMgr.getAllCustomObjects('CustomTestHomework');

   try{
      var file = new File([File.IMPEX, 'homework.csv'].join(File.SEPARATOR));

      var fileWriter = new FileWriter(file);
   
      var csvWriter = new CSVStreamWriter(fileWriter);
   
      while(objects.hasNext()){
         var object = objects.next();
         csvWriter.writeNext(object.custom.firstName + 
            " " + object.custom.lastName + 
            " " + object.custom.email + 
            " " + object.custom.gender);
   
            Transaction.wrap(function () {
               CustomObjectMgr.remove(object);
               });
    }
   }
   catch(e) {

      var logger = Logger.getLogger('TestLog', 'Job');
      logger.error(e.message);

   }finally {
      csvWriter.close();
      fileWriter.close();
   }
}