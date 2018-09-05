cordova.define("jjd-plugin-interface-adapter.InterfaceAdapter", function(require, exports, module) {
var exec = require('cordova/exec');

exports.dealFunc = function (methodName, arg) {
	if (methodName == "get_version") {
		window.jjd.plugin.BasePlugin.getVersionInfo(arg);
	}else if(methodName == "load_http_html") {
     	window.jjd.plugin.BasePlugin.loadHtml(arg);
    }else if(methodName == "update") {
    	window.jjd.plugin.BasePlugin.update(arg);
    }else if(methodName == "app_share") {
    	window.jjd.plugin.BasePlugin.appShare(arg);
  	}else if(methodName == "wechat_share") {
	    window.jjd.plugin.WechatPlugin.wechat(methodName, arg);
	}
};
});
