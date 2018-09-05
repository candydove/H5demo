
var utils = {
	arrayDelete: function(array,val){
		for (var i = 0; i < array.length; i++) {
			if (array[i] == val) {
				array.splice(i,1);
				break;
			};
		}
	},
	// 跳转到指定页面
	go: function(url) {
		window.location = url;
	},
	// 用指定页面替换当前页面
	replace: function(url) {
		window.location.replace(url);
	},
	// 页面重新加载
	reload: function(url) {
		window.location.reload();
	},
	// 退回item个页面
	back: function(npage) {
		if(this.isNull(npage)){
			window.history.go(-1);
		}else{
			window.history.go(npage);
		}
	},
    //获取指定页面路径
    getPageUrl:function(url,patten){
    	var nowhref = window.location.href;
    	var pageUrl = nowhref.split('html')[0]+patten+'/'+url;
    	return pageUrl;
    },
	// 上拉刷新
	up:function(id,callbackUp){
		mui.init({
			pullRefresh: {
				container: '#'+id,
				up: {//上拉加载
					//auto:true,//可选,默认false.自动上拉加载一次
					contentrefresh: '正在加载...',
					contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
					callback: callbackUp
				}
			}
		});
	},
	// 下拉刷新
	down:function(id,callbackDown){
		mui.init({
			pullRefresh: {
				container: '#'+id,
				down: {//下拉刷新
					//auto:true,//可选,默认false.自动下拉刷新一次
					contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
					contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
					contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
					callback: callbackDown
				}
			}
		});
	},
	
	//元转分
	toFen: function(v) {
		return v * 100;
	},

	//分转元
	toYuan: function(v) {
		if(v == 0) return 0
		return(v / 100).toFixed(2);
	},

	// 判断浏览器类型
	browsertype:{},
	browser: function() {
		if(this.isNull(this.browsertype.weixin)){
			var u = navigator.userAgent.toLowerCase();
			this.browsertype = {
				trident: u.indexOf('trident') > -1, // IE内核
				crosswalk: !!u.match(/crosswalk/i), // crosswalk app
				presto: u.indexOf('presto') > -1, // opera内核
				webKit: u.indexOf('applewebkit') > -1, // 苹果、谷歌内核
				gecko: u.indexOf('gecko') > -1 && u.indexOf('khtml') === -1, // 火狐内核
				mobile: !!u.match(/applewebkit.*mobile.*/), // 是否为移动终端
				ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/), // ios终端
				android: u.indexOf('android') > -1 || u.indexOf('adr') > -1,// android终端
				iPhone: u.indexOf('iphone') > -1, // 是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('ipad') > -1, // 是否iPad
				webApp: u.indexOf('safari') === -1, // 是否web应该程序，没有头部与底部
				weixin: u.indexOf('micromessenger') > -1, // 是否微信
				qq: u.match(/\sqq/i) === ' qq', // 是否QQ
				language: (navigator.browserLanguage || navigator.language).toLowerCase(),
				jiajia:u.indexOf('jiajia') > -1 || u.indexOf('tbs') > -1
			};
		}
		return this.browsertype;
	},
	 //ios环境头部位置调整
    addIosHead:function(index,type){
        //window.document.body.style.display = 'none';
		if(type==0){
            var head_topxy = document.getElementsByClassName('index_head');
            if(!utils.isNull(head_topxy) && !utils.isNull(head_topxy[index])){
                var head_ = head_topxy[index];
                var parentNode = head_.parentNode;
                var newNode=document.createElement("div"); //创建一个div
                newNode.style.cssText="position: fixed;top: 0;left: 0;width: 100%;height: 44px;z-index: 3000;height: 20px; background:#fff; width: 100%;";
                parentNode.insertBefore(newNode,null);
                head_.setAttribute("style","top:20px!important");
                document.getElementsByTagName("body")[0].setAttribute("style","padding-top: 20px!important");
            }
		}else if(type==1){
        	var head_topxy = document.getElementsByClassName('mui-bar mui-bar-nav');
            if(!utils.isNull(head_topxy) && !utils.isNull(head_topxy[index])){
                var head_ = head_topxy[index];
                var parentNode = head_.parentNode;
                var newNode=document.createElement("div"); //创建一个div
                newNode.style.cssText="position: fixed;top: 0;left: 0;width: 100%;height: 44px;z-index: 3000;height: 20px; background:#fff; width: 100%;";
                parentNode.insertBefore(newNode,null);
                head_.setAttribute("style","top:20px!important");
				var body=document.getElementsByTagName("body")[0];
                body.setAttribute("style","padding-top: 20px!important");
            }

        }else if(type==2){
            var head_topxy = document.getElementsByClassName('mui-bar mui-bar-nav');
            if(!utils.isNull(head_topxy) && !utils.isNull(head_topxy[index])){
                var head_ = head_topxy[index];
                var parentNode = head_.parentNode;
                var newNode=document.createElement("div"); //创建一个div
                newNode.style.cssText="position: fixed;top: 0;left: 0;width: 100%;height: 44px;z-index: 3000;height: 20px; background:#fff; width: 100%;";
                parentNode.insertBefore(newNode,null);
                head_.setAttribute("style","top:20px!important");
                var body=document.getElementsByTagName("body")[0];
                body.setAttribute("style","padding-top: 20px!important");
            }else{
                var head_topxy = document.getElementsByClassName('head_topxy');
                if(!utils.isNull(head_topxy) && !utils.isNull(head_topxy[index])){
                    var head_ = head_topxy[index];
                    var parentNode = head_.parentNode;
                    var newNode=document.createElement("div"); //创建一个div
                    newNode.style.cssText="position: fixed;top: 0;left: 0;width: 100%;height: 44px;z-index: 3000;height: 20px; background:#fff; width: 100%;";
                    parentNode.insertBefore(newNode,null);
                    head_.setAttribute("style","top:20px!important");
                    var body=document.getElementsByTagName("body")[0];
                    body.setAttribute("style","padding-top:64px!important");
                }
			}

        }

        var drop_btn = document.getElementsByClassName('drop_btn');
        if(!utils.isNull(drop_btn) && !utils.isNull(drop_btn[index])) {
            drop_btn[index].style.cssText="top:62px";
        }
        //window.document.body.style.display = 'block';

    },
	// 校验用户的手机号是否合法
	checkPhone : function(telephone){
		if(!(/^1[34578]\d{9}$/.test(telephone))){
			return false;
		}
		return true;
	},

	// 校验用户的身份证号是否合法
	checkIdentityCode : function (code) {
		var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
		var tip = "";
		var pass = true;
		// if (!code || !/^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/i.test(code)) {
            // tip = "身份证号格式错误";
            // pass = false;
       	// } else
		if (!city[code.substr(0, 2)]) {
			tip = "地址编码错误";
			pass = false;
		} else {
			//18位身份证需要验证最后一位校验位
			if (code.length == 18) {
				code = code.split('');
				//∑(ai×Wi)(mod 11)
				//加权因子
				var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
				//校验位
				var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
				var sum = 0;
				var ai = 0;
				var wi = 0;
				for (var i = 0; i < 17; i++) {
					ai = code[i];
					wi = factor[i];
					sum += ai * wi;
				}
				var last = parity[sum % 11];
				if (parity[sum % 11] != code[17]) {
					tip = "校验位错误";
					pass = false;
				}
			}
		}
		// if (!pass) mui.alert(tip);
		return pass;
	},
checkIdCardNo:function(value){
  //验证身份证号方法
  var area = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "xinjiang", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" }
  var idcard, Y, JYM;
  var idcard=value;
  var S, M;
  var idcard_array = new Array();
  idcard_array = idcard.split("");
  if (area[parseInt(idcard.substr(0, 2))] == null) return false;
  switch (idcard.length) {
      case 15:
          if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
              ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
          }
          else {
              ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
          }
          if (ereg.test(idcard))
              //return Errors[0];
            var res = true;
          else
              //return Errors[2];
            var res = false;
          return res;
          break;
      case 18:
          if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
              ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
          }
          else {
              ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
          }
          if (ereg.test(idcard)) {
              S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
              Y = S % 11;
              M = "F";
              JYM = "10X98765432";
              M = JYM.substr(Y, 1);
              if (M == idcard_array[17])
                  //return Errors[0];
                var res = true;
              else
                  //return Errors[3];
                var res = false;
          }
          else
              //return Errors[2];
            res = false;
          return res;
          break;
      default:
          res = false;
          return res;
          break;
    };
},
	/**
	 * 修改的mui.toast()的方法，自定义的样式
	 * 参数text为提示文字
	 */
	toast:function(text){
		var durationTime=arguments[1]?arguments[1]:1300;

		var style = document.createElement("link");
			style.rel="stylesheet";
			style.type="text/css";
			style.id="toastStyle";
			style.href="../../css/toast.css";
		var head=document.getElementsByTagName("head")[0];
			head.appendChild(style);
		mui.toast(text,{duration:durationTime,type:'div'});
		setTimeout(function(){
			var toastStyle=document.getElementById("toastStyle");
			head.removeChild(toastStyle);
		},durationTime+1000);
	},

	// 这是一个工具函数, 用于获取url中名称为name的参数
    getArg: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) return decodeURI(r[2]);
        return null;
    },

	// 用户token过期后重新登录
    reLogIn: function (method, url, params, lock, callBack) {
		var storageTel = window.localStorage.storageTel;
		var storagePwd = window.localStorage.storagePwd;
		// 如果之前登录过，用保存的手机号密码登录
		if(!this.isNull(storageTel) && !this.isNull(storagePwd)) {
			var param = {
				"telephone": storageTel,
                "pwd": storagePwd
			};
			utils.postAndDealBySelf(config.LEASE_MERCHANT_URL + '/staff/login', param, lock, function(res){
				if(res.code===200){
					window.sessionStorage.userId = res.object.userId;
                    window.sessionStorage.token = res.object.token;
                    window.sessionStorage.permisCode = JSON.stringify(res.object.permisCode);
                    window.sessionStorage.isAdmin = res.object.isAdmin;
                    window.sessionStorage.b_bindBank = res.object.b_bindBank;
                    window.sessionStorage.pwdOk = res.object.b_pwd;
                    window.localStorage.com = JSON.stringify(res.object.com);
					if(method==='get'){
						utils.getAndDealBySelf(url, params, lock, callBack);
					}else if(method==='post'){
						utils.postAndDealBySelf(url, params, lock, callBack);
					}
				}else { // 跳转到登录页
                    window.localStorage.storagePwd = '';
                    utils.replace(utils.getPageUrl('index/login.html','html'));
                }
			});
		}else{
			utils.replace(utils.getPageUrl('index/login.html','html'));
		}
    },


	// get方法,负责处理失败的情况
	// params传入的json类型会被转成key1=value&key2=value2格式
	// lock 同样请求是否发送中,防止同一个请求发送多次，初始值是空的对象{}
	// callBack 回调函数
	get:function (url, params, lock, callBack) {
		this.getAndDealBySelf(url, params, lock, function(res){
			if(res.code===200){
				callBack(res.object);
			}else{
				mui.alert(res.message);
			}
		})
	},
	// get方法，不负责处理失败，将返回全部推送给回调函数，
	// params传入的json类型会被转成key1=value&key2=value2格式
	// lock 同样请求是否发送中,防止同一个请求发送多次，初始值是空的对象{}
	// callBack 回调函数
	getAndDealBySelf: function(url, params, lock, callBack) {
		if(!this.isNull(lock.bsending) && lock.bsending){
			return;
		}
		lock.bsending = true;
		var tempParams = params;
		if(this.isNull(tempParams)){
			tempParams = {};
		}
		var tempURL = '';
		var urls = url.split('?');// 处理请求的url中已经带了?的情况
		tempURL = urls[0];
		if(!this.isNull(urls[1]) && urls[1].length>0){
			var para1 = urls[1].split('&');
			for(var i=0; i<para1.length; i++){
				var para2 = para1[i].split('=');
				tempParams[para2[0]] = para2[1];
			}
		}

		var token = window.sessionStorage.token;
		if(!this.isNull(token)){
			tempParams["token"] = token;
		}
		//增加时间戳
		tempParams["timestamp"] = new Date().getTime();
		// 将对象转成字符串
		var temp = '';
		for (var Key in tempParams){
	      	temp = temp+'&'+''+Key+'='+tempParams[Key];
	    }
		tempURL = tempURL+'?'+temp.substring(1);
	    var ajax = new XMLHttpRequest()
	    ajax.open('GET', tempURL);
	    var tryTimes = 3;
	    ajax.onload = function(e) {
	        if (this.status == 200) {
	            var text = this.responseText;
	            var json = null;
	            try{
					json = JSON.parse(text);
	            }catch(err){
	            	console.log('数据解析错误');
	            	if(tryTimes>0){
						tryTimes--;
						ajax.open('GET', tempURL);
						ajax.send();
	            	}else{
						lock.bsending = false;
						mui.alert('服务器繁忙,请稍后再试');
	            	}
	            	return;
	            }
	            lock.bsending = false;
	            if(json!=null){
	            	if(json.code === 9001) {//token过期
		            	if(!utils.isNull(token)){
							window.sessionStorage.token = "";
						}
		            	utils.reLogIn("get", url, params, lock, callBack);
					}else{
						callBack(json);
					}
	            }
	        } else {
	        	console.log('网络错误：' + this.status);
	        }
	    };
	    ajax.onerror = function(e) {
	    	console.log('http error');
        	if(tryTimes>0){
				tryTimes--;
				ajax.open('GET', tempURL);
				ajax.send();
        	}else{
				lock.bsending = false;
        	}
		};
	    ajax.send();
	},


	// post方法,负责处理失败的情况
	// params传入的json类型
	// lock 同样请求是否发送中,防止同一个请求发送多次，初始值是空的对象{}
	// callBack 回调函数
	post: function (url, params, lock, callBack) {
		this.postAndDealBySelf(url, params, lock, function(res){
			if(res.code ===200){
				callBack(res.object);
			}else{
				// mui.alert(res.message);
                Chef.alert({
                    'title':'提醒',
                    'content':res.message
                });
			}
		})
	},
	post2: function (url, params, lock, callBack) {
		this.postAndDealBySelf(url, params, lock, function(res){
			console.log("haah")
			if(res.code ===200){
				callBack(res);
			}else{
				// mui.alert(res.message);
                console.log(res)
                Chef.alert({
                    'title':'提醒',
                    'content':res.message
                });
			}
		})
	},

	// post方法,负责处理失败的情况
	// params传入的json类型
	// lock 同样请求是否发送中,防止同一个请求发送多次，初始值是空的对象{}
	// callBack 回调函数
	postAndDealBySelf: function(url, params, lock, callBack) {
		if(!this.isNull(lock.bsending) && lock.bsending){
			return;
		}
		lock.bsending = true;

		var tempParams = {};
		var tempURL = '';
		var urls = url.split('?');// 处理请求的url中已经带了?的情况
		tempURL = urls[0];
		if(!this.isNull(urls[1]) && urls[1].length>0){
			var para1 = urls[1].split('&');
			for(var i=0; i<para1.length; i++){
				var para2 = para1[i].split('=');
				tempParams[para2[0]] = para2[1];
			}
		}
		var token = window.sessionStorage.token;
		if(!this.isNull(token)){
			tempParams["token"] = token;
		}
		// 将对象转成字符串
		var temp = '';
		for (var Key in tempParams){
	      	temp = temp+'&'+''+Key+'='+tempParams[Key];
	    }
		tempURL = tempURL+'?'+temp.substring(1);

	    var ajax = new XMLHttpRequest()
	    ajax.open('POST', tempURL);
	    ajax.setRequestHeader('Content-Type', 'application/json');
	    var tryTimes = 3;
	    ajax.onload = function(e) {
	        if (this.status == 200) {
	            var text = this.responseText;
	            var json = null;
	            try{
					json = JSON.parse(text);
	            }catch(err){
	            	console.log('数据解析错误');
	            	if(tryTimes>0){
						tryTimes--;
						ajax.open('POST', tempURL);
						ajax.send(JSON.stringify(params));
	            	}else{
						lock.bsending = false;
						mui.alert('服务器繁忙,请稍后再试');
	            	}
	            	return;
	            }
	            lock.bsending = false;
	            if(json!=null){
	            	if(json.code === 9001) {//token过期
		            	if(!utils.isNull(token)){
							window.sessionStorage.token = "";
						}
		            	utils.reLogIn("post", url, params, lock, callBack);
					}else{
						callBack(json);
					}
	            }
	        } else {
	            console.log('网络错误：' + this.status);
	        }
	    };
	    ajax.onerror = function(e) {
	    	console.log('http error');
        	if(tryTimes>0){
				tryTimes--;
				ajax.open('POST', tempURL);
				ajax.send(JSON.stringify(params));
        	}else{
				lock.bsending = false;
        	}
		};
	    ajax.send(JSON.stringify(params));
	},

	// POST以x-www-form-urlencoded的方式发送数据
	postAndDealBySelf2: function(url, params, lock, callBack) {
		if(!this.isNull(lock.bsending) && lock.bsending){
			return;
		}
		lock.bsending = true;

		var paramsData;
		for (var Key in params){
		  paramsData ='&'+Key+'='+params[Key];
		}
		paramsData = paramsData.substring(1);

		var tempParams = {};
		var tempURL = url;
		var urls = url.split('?');// 处理请求的url中已经带了?的情况
		tempURL = urls[0];
		if(!this.isNull(urls[1]) && urls[1].length>0){
			var para1 = urls[1].split('&');
			for(var i=0; i<para1.length; i++){
				var para2 = para1[i].split('=');
				tempParams[para2[0]] = para2[1];
			}
		}
		var token = window.sessionStorage.token;
		if(!this.isNull(token)){
			tempParams["token"] = token;
		}
		// 将对象转成字符串
		var temp = '';
		for (var Key in tempParams){
	      	temp = temp+'&'+''+Key+'='+tempParams[Key];
	    }
		tempURL = tempURL+'?'+temp.substring(1);

	    var ajax = new XMLHttpRequest()
	    ajax.open('POST', tempURL);
	    //ajax.setRequestHeader('Content-Type', 'application/json');
		ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	    var tryTimes = 3;
	    ajax.onload = function(e) {
	        if (this.status == 200) {
	            var text = this.responseText;
	            var json = null;
	            try{
					json = JSON.parse(text);
	            }catch(err){
	            	console.log('数据解析错误');
	            	if(tryTimes>0){
						tryTimes--;
						ajax.open('POST', tempURL);
						ajax.send(paramsData);
	            	}else{
						lock.bsending = false;
						mui.alert('服务器繁忙,请稍后再试');
	            	}
	            	return;
	            }
	            lock.bsending = false;
	            if(json!=null){
	            	if(json.code === 9001) {//token过期
		            	if(!utils.isNull(token)){
							window.sessionStorage.token = "";
						}
		            	utils.reLogIn("post2", url, params, lock, callBack);
					}else{
						callBack(json);
					}
	            }
	        } else {
	            console.log('网络错误：' + this.status);
	        }
	    };
	    ajax.onerror = function(e) {
			alert("http error");
		};
	    ajax.send(paramsData);
	},

	//保存前端cache
    saveFullCache:function(){
    	var cache = window.sessionStorage.cache;
		if(cache!=null && cache!=''){
			this.postAndDealBySelf(config.LEASE_MERCHANT_URL+'/user/saveCache', JSON.parse(cache), {}, function(){});
		}
	},

	//保存前端cache
	saveCache:function(key,value){
		var cache = window.sessionStorage.cache;
        var userId = window.sessionStorage.userId;
        if(typeof(userId)!='undefined' && userId!=null && userId!='' && userId!= 'null'){
            var cacheJson = {};
            if(typeof(cache)!='undefined' && cache!=null && cache!='' && cache!= 'null'){
                cacheJson = JSON.parse(cache);
            }
            cacheJson[key] = value;
            window.sessionStorage.cache = JSON.stringify(cacheJson);
            this.postAndDealBySelf(config.LEASE_MERCHANT_URL+'/user/saveCache', cacheJson, {}, function(){});
        }
	},
	//获取前端cache
	getCacheValue:function(key){
		var cache = window.sessionStorage.cache;
		if(cache!=null && cache!='' && cache!= 'null'){
			cacheJson = JSON.parse(cache);
			if(typeof(cacheJson[key])!='undefined' && cacheJson[key]!='undefined'
				&& cacheJson[key]!=null && cacheJson[key]!='null' && cacheJson[key]!=''){
				return cacheJson[key];
			}
			return null;
		}
		return null;
	},
	// 判断传入是否为null
	isNull: function(item){
		if(typeof(item)=='undefined' || item==null || item=='' || item == 'undefined' || item == 'null'){
			return true;
		}
		return false;
	},

	isNullButEmpty: function(item){
		if(typeof(item)=='undefined' || item==null  || item == 'undefined' || item == 'null'){
			return true;
		}
		return false;
	},
	// 判断用户是否注册
	isRegister:function(){
		if(utils.isNull(window.sessionStorage.token)){
//			mui.confirm('请先完成注册', '', ['去注册'], function(){utils.go("../register/registFirstStep.html")});
			utils.go("../register/registFirstStep.html");
			return false;
		}
		return true;
	},
	// 获取数字的中文显示
	digitUppercase: function(num) {
	    var fraction = ['角', '分']
	    var digit = [
	        '零', '壹', '贰', '叁', '肆',
	        '伍', '陆', '柒', '捌', '玖'
	    ]
	    var unit = [
	        ['元', '万', '亿'],
	        ['', '拾', '佰', '仟']
	    ]
	    var s = ''
	    for (var i = 0; i < fraction.length; i += 1) {
	        s += (digit[Math.floor(num * 10 * Math.pow(10, i)) % 10] +
	            fraction[i]).replace(/零./, '')
	    }

	    s = s || '整'
	    var n = Math.floor(num)
	    for (var i = 0; i < unit[0].length && n > 0; i += 1) {
	        var p = ''
	        for (var j = 0; j < unit[1].length && n > 0; j += 1) {
	            p = digit[n % 10] + unit[1][j] + p
	            n = Math.floor(n / 10)
	        }
	        s = p.replace(/(零.)*零$/, '')
	            .replace(/^$/, '零') + unit[0][i] + s
	    }
	    return s.replace(/(零.)*零元/, '元')
	        .replace(/(零.)+/g, '零')
	        .replace(/^整$/, '零元整')
	},
	// 在数字中每3位加入逗号
	getAmountText: function(e) {
        var amountNum = parseInt(e, 10)
        var amountText = e.toString()
        if (amountNum >= 1000) {
          return amountText.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
        return amountNum
    },
    // 根据金额获取以万为单位的字符串
	getAmountTextWan: function(e) {
	    var amountNum = parseInt(e, 10)
	    var amountText = e.toString()
	    if (amountNum >= 1000 && amountNum < 10000) {
	        return amountText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	    } else if(amountNum >= 10000) {
			return(amountNum / 10000).toFixed(1)
		}
	    return amountNum
	},
	// 根据金额获取金额的单位
	getAmountUnit: function(e) {
		var amountNum = parseInt(e, 10)
		if(amountNum >= 10000) {
			return '万'
		}
		return ''
	},
	// 对身份证号脱敏处理
	getHideIdCard: function(id) {
	    if(utils.isNull(id)){
	    	return null;
	    }
	    if(id.length==18){
	    	return id.substring(0, 6)+"**********"+id.substring(16)
	    }
	    if(id.length==15){
	    	return id.substring(0, 6)+"******"+id.substring(12)
	    }
		return null;
	},
	remindSubscribe:function(){
        var btnArray=['知道了']
        mui.confirm(
            "<div>长按下方图片<br>点击【识别图中二维码】<br>点击关注即可关注</div><img src='../../images/jjd_qr_small.jpg' style='width: 172px; height: 172px'><br>你还没有关注【今借到】公众号",'提醒', btnArray, function(e) {
        });
	},
	remindSubscribeIndex:function(){
        var btnArray=['知道了']
        mui.confirm(
            "<div>长按下方图片<br>点击【识别图中二维码】<br>点击关注即可关注</div><img src='../images/jjd_qr_small.jpg' style='width: 172px; height: 172px'><br>你还没有关注【今借到】公众号",'提醒', btnArray, function(e) {

        });
	},

	//图片压缩
	compress_rectangle:function(Orientation, img, max) {
		var canvas = document.createElement('canvas');
		// if (checkAppleBrowser() && Orientation && Orientation != 1) {
		if (utils.browser().ios&& Orientation && Orientation != 1) {
			switch (Orientation) {
				case 6://需要顺时针（向左）90度旋转
					var expectWidth = img.height;
					var expectHeight = img.width;
					if (expectWidth > expectHeight) {
						if (expectWidth > max) {
							expectWidth = max;
							expectHeight = max * img.width / img.height;
						}
					} else {
						if (expectHeight > max) {
							expectHeight = max;
							expectWidth = max * img.height / img.width;
						}
					}
					canvas.width = expectWidth;
					canvas.height = expectHeight;
					var context = canvas.getContext('2d');
					context.clearRect(0, 0, expectWidth, expectHeight);
					context.rotate(1 * 90 * Math.PI / 180);
					context.drawImage(img, 0, -expectWidth, expectHeight, expectWidth);
					break;
				case 8://需要逆时针（向右）90度旋转
					var expectWidth = img.height;
					var expectHeight = img.width;
					if (expectWidth > expectHeight) {
						if (expectWidth > max) {
							expectWidth = max;
							expectHeight = max * img.width / img.height;
						}
					} else {
						if (expectHeight > max) {
							expectHeight = max;
							expectWidth = max * img.height / img.width;
						}
					}
					canvas.width = expectWidth;
					canvas.height = expectHeight;
					var context = canvas.getContext('2d');
					context.clearRect(0, 0, expectWidth, expectHeight);
					context.rotate(3 * 90 * Math.PI / 180);
					context.drawImage(img, -expectWidth, 0, expectHeight, expectWidth);
					break;
				case 3://需要180度旋转
					var expectWidth = img.height;
					var expectHeight = img.width;
					if (expectWidth > expectHeight) {
						if (expectWidth > max) {
							expectWidth = max;
							expectHeight = max * img.height / img.width;
						}
					} else {
						if (expectHeight > max) {
							expectHeight = max;
							expectWidth = max * img.width / img.height;
						}
					}
					canvas.width = expectWidth;
					canvas.height = expectHeight;
					var context = canvas.getContext('2d');
					context.clearRect(0, 0, expectWidth, expectHeight);
					context.rotate(2 * 90 * Math.PI / 180);
					context.drawImage(img, -expectWidth, -expectHeight, expectWidth, expectHeight);
					break;
				default:
					break;
			}
		} else {
			var expectWidth = img.naturalWidth;
			var expectHeight = img.naturalHeight;
			if (expectWidth > expectHeight) {
				if (expectWidth > max) {
					expectWidth = max;
					expectHeight = max * img.naturalHeight / img.naturalWidth;
				}
			} else {
				if (expectHeight > max) {
					expectHeight = max;
					expectWidth = max * img.naturalWidth / img.naturalHeight;
				}
			}
			canvas.width = expectWidth;
			canvas.height = expectHeight;
			var context = canvas.getContext('2d');
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.drawImage(img, 0, 0, expectWidth, expectHeight);
		}
		return canvas.toDataURL('image/jpeg');
	},

	compress_square:function(Orientation, img, square) {
	    var canvas = document.createElement('canvas');
	    canvas.width = square;
	    canvas.height = square;
	    var context = canvas.getContext('2d');
	    context.clearRect(0, 0, square, square);

	    var imageWidth = img.width;
	    var imageHeight = img.height;
	    var offsetX = 0;
	    var offsetY = 0;
	    if (img.width > img.height) {
	        imageWidth = Math.round(square * img.width / img.height);
	        imageHeight = square;
	        offsetX = -Math.round((imageWidth - square) / 2);
	    } else {
	        imageHeight = Math.round(square * img.height / img.width);
	        imageWidth = square;
	        offsetY = -Math.round((imageHeight - square) / 2);
	    }
	    if (utils.browser().ios && Orientation != 1 && Orientation) {
	        context.rotate(90 * Math.PI / 180);
	        context.drawImage(img, offsetX, offsetY - imageHeight, imageWidth, imageHeight);
	    } else {
	        context.drawImage(img, offsetX, offsetY, imageWidth, imageHeight);
	    }
	    return canvas.toDataURL('image/jpeg');
	},
	//获取滚动条当前的位置
	getScrollTop:function () {
		var scrollTop = 0;
		if(document.documentElement && document.documentElement.scrollTop) {
			scrollTop = document.documentElement.scrollTop;
		} else if(document.body) {
			scrollTop = document.body.scrollTop;
		}
		return scrollTop;
	},
	//获取当前可视范围的高度
	getClientHeight:function () {
		var clientHeight = 0;
		if(document.body.clientHeight && document.documentElement.clientHeight) {
			clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
		} else {
			clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
		}
		return clientHeight;
	},

	//获取文档完整的高度
	getScrollHeight:function () {
		return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	},
	getOnScroll:function(){
		var scrollTop = utils.getScrollTop();
		if(scrollTop == 0){
			//当滚动条的位置是0,不认为是向下拉动到最低
			return false;
		}else{
			if(scrollTop + utils.getClientHeight() == utils.getScrollHeight()) {
				return true;
			}
		}
		return false;
	},
	//通过标识获取定位数据
	getLocationDataByFlag:function(flag){
		var reData = null;
		if(!utils.isNull(window.sessionStorage.locationData)){
			var locationData = JSON.parse(window.sessionStorage.locationData);
			if(!utils.isNull(locationData[flag])){
				reData = JSON.parse(locationData[flag]);
			}
		}
		return reData;
	}
};




//日期格式化
Date.prototype.Format = function (fmt) { //author: meizz
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

//判断数组内是否存在元素
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}



//ios解决头部问题
// if(utils.browsertype.iPhone) {
// 	window.onload=function(){
// 		utils.addIosHead(0,2);
// 	}
// }


// 给window.onload绑定函数
function addLoadEvent(func){
	var oldOnload = window.onload;
	if (typeof window.onload !== "function") {
		window.onload = func;
	} else {
		window.onload = function() {
			oldOnload();
			func();
		};
	}	
}

// 判断是否为iPhone X
function isIphoneX(){
	if (utils.browser().iPhone && window.screen.height === 812 && window.screen.width === 375) {
    return true;
  } else {
    return false;
  }
}
// 给IOS顶部添加背景条（一般为20px，iPhone X为40px）
function addTopDivForIphone() {
	var body = document.getElementsByTagName("body")[0];
	var header =
		body.getElementsByTagName("header")[0] ||
		body.getElementsByClassName("head_topxy")[0];

	if (header === undefined) {
		return;
	}
	var headerBgColor = window.getComputedStyle(header, "")["background-color"]; // header背景色
	var headerHeight = parseFloat(
		window.getComputedStyle(header, "")["height"]
	); // header高度
	if (document.getElementsByClassName("head_topxy")[0] === undefined) {
		var muiContent = document.getElementsByClassName("mui-content")[0];
	} else {
		var muiContent = body;
	}

	var newDivHeight = isIphoneX() ? 40 : 20;


	var newDiv = document.createElement("div");
	newDiv.style.cssText =
		"position:fixed;left:0;top:0;z-index:200;width:100%;background-color:" +
		headerBgColor +
		";height:" +
		newDivHeight +
		"px;";
	newDiv.id = "topNoticeBar";


	body.insertBefore(newDiv, body.children[0]);
	header.style.top = newDivHeight + "px";
	muiContent.style.paddingTop = newDivHeight + headerHeight + "px";


  if (isIphoneX()){
    if(window.location.pathname.indexOf('/html/order/my-order.html')!=-1){
      document.getElementById("bor_search_box_phonex").setAttribute("style","top: 84px!important");
      document.getElementById("text-oneline-average-phonex").setAttribute("style","top: 130px!important");
      document.getElementById("filterTop-phonex").setAttribute("style","top: 170px!important");
      document.getElementsByClassName('store-information_div').setAttribute("style","margin-top: 105px!important;");
    }
  }
}
if (utils.browser().iPhone) {
	addLoadEvent(addTopDivForIphone);
}








if(utils.browser().jiajia || config.beProduct){
	if(utils.browser().iPhone) {
		if(window.location.pathname.indexOf('/index.html')!=-1){
			document.write('<script src="../js/cordova_ios/cordova.js?ver="'+Math.random()+'></script>');
		}else{
			document.write('<script src="../../js/cordova_ios/cordova.js?ver="'+Math.random()+'></script>');
		}
	}else if(utils.browser().android) {
		if(window.location.pathname.indexOf('/index.html')!=-1){
			document.write('<script src="../js/cordova_android/cordova.js?ver="'+Math.random()+'></script>');
		}else{
			document.write('<script src="../../js/cordova_android/cordova.js?ver="'+Math.random()+'></script>');
		}
	}
}






window.onpageshow = function(e){
	if(utils.browser().ios && event.persisted) {
	    utils.reload();
    }else{
        if(!utils.isNull(window.sessionStorage.tipMessage)){
        	utils.toast(window.sessionStorage.tipMessage)
        	window.sessionStorage.tipMessage='';
        }
    }
};
