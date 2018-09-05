cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "rrx-plugin-base.BasePlugin",
    "file": "plugins/rrx-plugin-base/www/BasePlugin.js",
    "pluginId": "rrx-plugin-base",
    "clobbers": [
      "rrx.plugin.BasePlugin"
    ]
  },
  {
    "id": "rrx-plugin-gaode.GaodePlugin",
    "file": "plugins/rrx-plugin-gaode/www/GaodePlugin.js",
    "pluginId": "rrx-plugin-gaode",
    "clobbers": [
      "rrx.plugin.GaodePlugin"
    ]
  },
  {
    "id": "rrx-plugin-qrcode.QRCodePlugin",
    "file": "plugins/rrx-plugin-qrcode/www/QRCodePlugin.js",
    "pluginId": "rrx-plugin-qrcode",
    "clobbers": [
      "rrx.plugin.QRCodePlugin"
    ]
  },
  {
    "id": "rrx-plugin-tencent.TencentPlugin",
    "file": "plugins/rrx-plugin-tencent/www/TencentPlugin.js",
    "pluginId": "rrx-plugin-tencent",
    "clobbers": [
      "rrx.plugin.TencentPlugin"
    ]
  },
  {
    "id": "rrx-plugin-wechat.WechatPlugin",
    "file": "plugins/rrx-plugin-wechat/www/WechatPlugin.js",
    "pluginId": "rrx-plugin-wechat",
    "clobbers": [
      "rrx.plugin.WechatPlugin"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.2",
  "x5webview-cordova-plugin": "1.1.0",
  "cordova-plugin-wkwebview-engine": "1.1.4-dev",
  "cordova-plugin-splashscreen": "4.0.3",
  "rrx-plugin-base": "0.0.1",
  "rrx-plugin-gaode": "0.0.1",
  "rrx-plugin-qrcode": "0.0.1",
  "rrx-plugin-tencent": "0.0.1",
  "rrx-plugin-wechat": "0.0.1"
};
// BOTTOM OF METADATA
});