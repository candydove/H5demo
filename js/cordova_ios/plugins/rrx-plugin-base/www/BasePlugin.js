cordova.define("rrx-plugin-base.BasePlugin", function (require, exports, module) {

    var exec = require('cordova/exec');

    exports.getVersionInfo = function (arg) {
        exec(null, null, "Base", "get_version", [arg]);
    };

    exports.loadHtml = function (arg) {
        exec(null, null, "Base", "load_http_html", [arg]);
    };

    exports.update = function (arg) {
        exec(null, null, "Base", "update", [arg]);
    };

    exports.appShare = function (arg) {
        exec(null, null, "Base", "app_share", [arg]);
    };

    exports.sendSMS = function (arg) {
        exec(null, null, "Base", "send_sms", [arg]);
    };

    exports.showProgress = function () {
        exec(null, null, "Base", "show_progress", null);
    };

    exports.hideProgress = function () {
        exec(null, null, "Base", "hide_progress", null);
    };

});
