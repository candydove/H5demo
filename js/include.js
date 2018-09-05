document.write('<script src="https://cdn.bootcss.com/vue/2.4.0/vue.min.js"></script>');
/*document.write('<script src="https://static.gushistory.com/mui.min.js"></script>');*/
document.write('<script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>');

if(!(window.location.pathname.indexOf('/index.html')!=-1
|| window.location.pathname.indexOf('shareRedirect.html')!=-1)){
	document.write('<script src="../../js/config.js?ver='+100*Math.random()+'"></script>');
	document.write('<script src="../../js/utils.js?ver='+100*Math.random()+'"></script>');
	document.write('<script src="../../js/chef.js?ver='+100*Math.random()+'"></script>');
	document.write('<script src="../../js/cpop.js?ver='+100*Math.random()+'"></script>');
}

