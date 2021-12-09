'use strict';

/**
 * @namespace Telerik
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
/**
 * Telerik-Show : This endpoint is called when a shopper navigates to the home page
 * @name Base/Telerik-Show
 * @function
 * @memberof Telerik
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
    var Site = require('dw/system/Site');
    
    res.render('telerik/home', {welcomeMsg :'Welcome user'});
    
    next();
}, pageMetaData.computedPageMetaData);

server.get('Include', function (req, res, next) {
    var Site = require('dw/system/Site');
    
    res.render('telerik/include', {welcomeMsg :'Welcome user'});
    
    next();
}, pageMetaData.computedPageMetaData);

server.get('List', function (req, res, next) {
    
    var Site = require('dw/system/Site');
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');
    var query= req.httpParameterMap.query;
    var newProductSearchModel = new ProductSearchModel();
    newProductSearchModel.setSearchPhrase(query);
    newProductSearchModel.search();
    res.render('telerik/searchResults', {
        searchResults : newProductSearchModel, 
        query : query,
        format: req.httpParameterMap.format
    });
    
    next();
}, pageMetaData.computedPageMetaData);


server.get('ShowContent', function (req, res, next) {
    
    var Site = require('dw/system/Site');
    var ContentMgr = require('dw/content/ContentMgr');
    var cid = req.httpParameterMap.cid;
    
    var apiContent = ContentMgr.getContent(cid);
    res.render('telerik/contentAsset', { 
    content : apiContent});
      
    next();
}, pageMetaData.computedPageMetaData);


module.exports = server.exports();
