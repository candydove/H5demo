cordova.define("rrx-plugin-wechat.WechatPlugin", function(require, exports, module) {
var exec = require('cordova/exec');

exports.wechat = function (method, arg) {
	exec(null, null, "Wechat", method, [arg]);
};
});
