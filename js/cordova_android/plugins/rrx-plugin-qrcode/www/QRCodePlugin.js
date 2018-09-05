cordova.define("rrx-plugin-qrcode.QRCodePlugin", function(require, exports, module) {
var exec = require('cordova/exec');

exports.analysisQRCode = function (args,success) {
	exec(success, null, "QRCode", "analysis_qrcode", args);
};
});
