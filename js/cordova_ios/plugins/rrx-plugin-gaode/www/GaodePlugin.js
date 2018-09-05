cordova.define("rrx-plugin-gaode.GaodePlugin", function (require, exports, module) {
    var exec = require('cordova/exec');

    window.navigator.geolocation.getCurrentPosition = function (success, error) {
        exec(success, error, "Gaode", "get_location_info", null);
    };

    exports.getCurrentPosition = function (success, error) {
        exec(success, error, "Gaode", "get_location_info", null);
    };

});
