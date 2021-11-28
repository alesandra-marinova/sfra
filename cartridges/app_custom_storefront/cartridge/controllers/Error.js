'use strict';

/**
 * @namespace Error
 */

var server = require('server');

/**
 * Error-Start : This endpoint is called when there is a server error
 * @name Base/Error-Start
 * @function
 * @memberof Error
 * @param {renders} - isml
 * @param {serverfunction} - get/post
 */
 server.use('Start', function (req, res, next) {
    
    res.setStatusCode(500);

    if( !req.httpSecure && (req.httpHeaders.containsKey("x-is-request_method")) &&
         (req.httpHeaders["x-is-request_method"] == 'GET')) {

       var queryString = !empty(req.httpQueryString) ? ('?' + req.httpQueryString) : '';
       var location = 'https://' + (req.httpHost || '') + (req.httpPath || '') + queryString;
       res.render('redirect');
       
    } else {
             if(req.httpHeaders().get("x-requested-with") != null &&
              req.httpHeaders().get("x-requested-with") === "XMLHttpRequest") {

                var format = httpParameterMap.format.stringValue || "";
                var nodecorator = true;
                if(format === "json") {
                    res.render ('error/generalerrorjson');
                } else {
                    res.render ('error/generalerror');
                }
              } else {
                res.render ('error/generalerror');
              }
         }       
    next();
});

/**
 * Error-Forbidden : This endpoint is called when a shopper tries to access a forbidden content. The shopper is logged out and the browser is redirected to the home page
 * @name Base/Error-Forbidden
 * @function
 * @memberof Error
 * 
 */
 server.get('Forbidden', function (req, res, next) { 
    var CustomerMgr = require('dw/customer/CustomerMgr');

    CustomerMgr.logoutCustomer(true);
    res.render('error/forbidden');
    next();
});

module.exports = server.exports();