'use strict';


/**
 * If the resource to add is not already in the resource array then add it to the array
 */
function getDeathStarDetails() {
    var getDeathStarService = dw.svc.LocalServiceRegistry.createService('app_custom_storefront.http.deathstar.getdeathstar', {
        createRequest : function (svc, args) {
            svc.setRequestMethod('GET');
            return args;
        },
        parseResponse : function(svc, client){
            return client.text;
        },
        filterLogMessage : function(msg) {      
            return msg.replace(/cost_in_credits\: \".*?\"/, "cost_in_credits:$$$$$$$$$$$$$$$$$$$");
        }
    });

    var response = getDeathStarService.call().object;
    return response;

}

module.exports = {
    getDeathStarDetails: getDeathStarDetails
};
