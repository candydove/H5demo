Vue.component('pay-password', {
	props: ['payPasswdShow'], //是否显示支付密码输入页
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

	template: '<div v-if="payPasswdShow">'+
				'<div id="backdrop" class="fade-transition"></div>'+
				'<div class="pay slide-bottom-transition">'+
					'<div class="calua_top">'+
						'<div class="tti_div">'+
							'<div class="title">'+
								'<div class="icon close" @click="close"></div>'+
								'<div class="buttonFontSize strongTextColor" style="line-height: 30px;margin: 0 auto;">请输入交易密码</div>'+
								'<div style="width: 40px;"></div>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="calua_bottom">'+
						'<div class="key_board_div">'+
							'<div class="key_board">'+
								'<div class="pwd_box">'+
									'<div>'+
										'<div class="numbers">'+
											'<div v-for="dot in 6" class="border_box top c6">'+
												'<div v-if="dot <= payPasswd.length"class="dot"></div>'+
											'</div>'+
										'</div>'+
										'<a href="../setting/setting-identityVerification1.html" class="tip" style="float: right;">忘记交易密码？</a>'+
									'</div>'+
								'</div>'+
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