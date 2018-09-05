(function (doc, win) {
    var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                if(clientWidth>=750){
                    docEl.style.fontSize = '100px';
                }else{
                    docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
                }
            };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


window.onload = function(){
	
	var chatingMsg = {
		num: 0,//未读条数
		msgDiv: document.createElement('div'),
		//生成html
		setMsg: function(){
			var _self = this;
			this.msgDiv.innerHTML = '<div class="chatting-box">'+
										'<div class="title">提示<span id="chatting_close">关闭</span></div>'+
										'<div id="chatting_href" class="content">'+
											'您有新的未读消息'+
											'<span id="chatting_msg" class="mui-badge mui-badge-primary"></span>'+
										'</div>'+
									'</div>'
			
			document.body.appendChild(this.msgDiv);
			document.getElementById('chatting_close').onclick=function(){
				_self.closeMsg()
			}
			document.getElementById('chatting_href').onclick=function(){
				_self.num=0;
				location.href = 'chatting.html'
			}
			
		},
		alertMsg: function(){
			if(location.pathname.match('chatting.html')){
				location.refresh()
			}
			var _self = this;
			this.msgDiv.firstElementChild.className='chatting-box active';
			setTimeout(function(){
				_self.closeMsg()
			},5000)
		},
		closeMsg: function(){
			this.msgDiv.firstElementChild.className='chatting-box';
		}
	}
	
	chatingMsg.setMsg();
	
	var url = config.LEASE_MERCHANT_URL + "/com/getUnTreatedInfo";
	var lock = [{}, {}, {}, {}, {}, {}, {}, {}, {},{}];
    
    setInterval(function(){
    	utils.post(url, {}, lock[8], function (json) {
	        if (json.unTreatedInfo&&json.unTreatedInfo.unTreated_im_info>0) {//未读叨叨(消息)数
	        	if(chatingMsg.num!=json.unTreatedInfo.unTreated_im_info){
	        		//缓存当前未读数目
	        		chatingMsg.num=json.unTreatedInfo.unTreated_im_info
	        		document.getElementById('chatting_msg').innerHTML=chatingMsg.num
	            	chatingMsg.alertMsg()
	        	}	        	
	        }
	    });
    },7000)
	
}
