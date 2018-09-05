Vue.component('check-pay-password', {
	props: ['payPasswdShow','confirmFlag'], //是否显示支付密码输入页
	data: function() {
		return {
			payPasswd: '',
			payPasswdMd5: '',
			keys: [
	        	'1', '2', '3',
	        	'4', '5', '6',
	        	'7', '8', '9',
	        	'c', '0', 'd'],
	        hoverKey: '',
       }
	},
    template:
	'<div v-if="payPasswdShow">'+
			 '<div class="pay_pwd">'+
						// ' <div class="ppwd_tip flex_pp">'+
								'<div class="textCenter" style="margin-top: 50px;"> 请输入您的交易密码'+
									 // '<div class="tt_pp ok" >1</div>'+
									 // ' <div class="line_pp"></div>'+
                                      // '<div class="tt_pp ok" v-if="confirmFlag">2</div>'+
									 //  '<div class="tt_pp" v-else>2</div>'+
									 //   ' <!--到第二部的时候加一个ok样式-->'+
								// ' </div>'+
								// ' <div class="ppwd_desc">'+
								// 		' <div class="ok">设置密码</div>'+
								// 		'<div>确认密码</div>'+
								// ' </div>'+
					       ' </div>'+
				'<div class="pwd_box" style="background: #efefef;height: initial;">'+
					'<div style="margin-top: 50px;">'+
						'<div class="numbers" style="background: #fff;">'+
							'<div v-for="dot in 6" class="border_box top c6">'+
								 '<div v-if="dot <= payPasswd.length"class="dot"></div>'+
							'</div>'+
						'</div>'+
				   '</div>'+
				'</div>'+
				'<div class="calua_bottom" style="bottom:0px;top:auto">'+
							'<div class="key_board_div">'+
										'<div class="key_board">'+



														'<div class="keys">'+
																	'<div v-for="key in keys" class="border_box top c3" >'+
																		 '<div @touchstart.stop.prevent="startPos(key)" @touchend.stop.prevent="endPos" class="key" :class="{c:key==\'c\',d:key==\'d\',hover:hoverKey==key}">{{key}}</div>'+
																	'</div>'+
														'</div>'+
										'</div>'+
							'</div>'+
				'</div>'+
	  '</div>'+
    '</div>',

	
	methods: {
	    //用户输入支付密码/验证码
	    startPos: function(num){
	    	this.hoverKey = num
	    	if (num === 'd') {
	        	if (this.verifyCodeShow) {
	            	this.verifyCode = this.verifyCode.substring(0, this.verifyCode.length - 1)
	          	} else {
	            	this.payPasswd = this.payPasswd.substring(0, this.payPasswd.length - 1)
	          	}
	        } else if (num === 'c') {
	          	if (this.verifyCodeShow) {
	            	this.verifyCode = ''
	          	} else {
	            	this.payPasswd = ''
	          	}
	        } else if (this.verifyCodeShow && this.verifyCode.length < 6) {
	          	this.verifyCode += num
	        } else if (this.verifyCodeShow && this.verifyCode.length >= 6) {
	          	return
	        } else if (this.payPasswd.length < 5) {
	          	this.payPasswd += num
	        } else {
	          	this.payPasswd += num
	          	this.payPasswdMd5 = md5(md5(this.payPasswd));
	          	this.$emit('get-pass', this.payPasswdMd5);
	          	this.payPasswd = '';
	          	this.payPasswdMd5 = '';
	          	this.hoverKey = ''
	        }
	    },
	    endPos: function() {
			this.hoverKey = ''
		},
		close: function() {
			this.payPasswd = '';
			this.payPasswdMd5 = '';
			this.$emit('close');
		},
	}
	
})