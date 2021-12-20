'use strict';

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var deathStarService = require('*/cartridge/scripts/deathStarService.js');

/**
 * DeathStar-Details : Used to retrieve a death star info
 * @name DeathStar-Details
 * @param {middleware} -server.middleware.include
 */

server.get(
   'Details',
   server.middleware.include,
   cache.applyDefaultCache,
   function (req, res, next) {

    var deathStar = JSON.parse(deathStarService.getDeathStarDetails());

    res.render('deathStar', {
name: deathStar.name,
manufacturer: deathStar.manufacturer,
starship_class : deathStar.starship_class
} );
    next();

   }
);

module.exports = server.exports();