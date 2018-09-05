cordova.define("rrx-plugin-tencent.TencentPlugin", function(require, exports, module) {
var exec = require('cordova/exec');

exports.shareToQQ = function (arg) {
	exec(null, null, "Tencent", "share_to_qq", [arg]);
};
});
