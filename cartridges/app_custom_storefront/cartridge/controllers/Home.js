//Home.js
'use strict';

/**
 * @namespace Home
 */

var server = require('server');
var HookMgr = require('dw/system/HookMgr');
var page = module.superModule;

server.extend(page);

server.append('Show', function (req, res, next) {
   var viewData = res.getViewData();

   if(!viewData){
    next();
   } else {
    viewData.newField = {value:'test field'};

    if(HookMgr.hasHook("extend.home")){
        var jsonOb = HookMgr.callHook('extend.home', 'returnNewJsonObject');
        viewData.phone = jsonOb;
     }
   }

   res.setViewData(viewData);
   next();
});

module.exports = server.exports();
