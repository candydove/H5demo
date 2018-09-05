Vue.component('set-pay-pass', {
	props: ['show'], //是否显示支付密码输入页
	data: function() {
		return {
			confirmFlag:false,
			payPasswd0:'',
			payPasswd: '',
			lock:{},
			keys: [
	        	'1', '2', '3',
	        	'4', '5', '6',
	        	'7', '8', '9',
	        	'c', '0', 'd'],
	        hoverKey: '',
       }
	},
    template:
	'<div v-if="show">'+
		'<div id="backdrop" class="fade-transition"></div>'+
		'<div class="pay slide-bottom-transition">'+
			'<div class="calua_top">'+
				'<div class="tti_div">'+
					'<div class="title">'+
						'<div class="icon close" @click="close"></div>'+
						'<div class="baseFontSize strongTextColor" style="line-height: 30px;margin: 0 auto;">设置交易密码</div>'+
						'<div style="width: 40px;"></div>'+
					'</div>'+
				'</div>'+
			'</div>'+
			'<div class="pay_pwd">'+
				'<div class="pwd_box" style="background: #fff;height: initial;margin-top: 70px;">'+
					'<div class="numbers" style="background: #fff;">'+
						'<div v-for="dot in 6" class="border_box top c6">'+
							'<div v-if="dot <= payPasswd.length"class="dot"></div>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<div style="font-size:14px;width:300px;margin:5px auto;text-align:right;" v-if="!confirmFlag">请输入交易密码</div>' +
				'<div style="font-size:14px;width:300px;margin:5px auto;text-align:right;" v-else>请确认交易密码</div>' +
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
				if(!this.confirmFlag){
					this.payPasswd += num
					this.payPasswd0 = this.payPasswd;
					this.payPasswd = '';
					this.hoverKey = '';
					this.confirmFlag = true;
				}else{
					this.payPasswd += num;
					var that = this;
					if(this.payPasswd == this.payPasswd0){
						var url=config.LEASE_MERCHANT_URL+"/staff/addPayPassword";
						utils.getAndDealBySelf(url,{password: md5(md5(this.payPasswd))},this.lock, function (res) {
							if(res.code==200){
								that.payPasswd0 = '';
								that.payPasswd = '';
								that.hoverKey = '';
								that.confirmFlag = false;
								that.$emit('ok');
							}else{
								var that1 = that;
								mui.confirm(res.message+', 确认从新输入吗？', '', ['取消', '确认'], function(e) {
									that1.payPasswd0 = '';
									that1.payPasswd = '';
									that1.hoverKey = '';
									that1.confirmFlag = false;
									if (e.index == 0) {
										that1.$emit('cancel');
									}
								});
							}
						});
					}else{
						mui.confirm('两次输入的密码不一致，确认从新输入吗？', '', ['取消', '确认'], function(e) {
							that.payPasswd0 = '';
							that.payPasswd = '';
							that.hoverKey = '';
							that.confirmFlag = false;
							if (e.index == 0) {
								that.$emit('cancel');
							}
						});
					}
				}

	        }
	    },
	    endPos: function() {
			this.hoverKey = ''
		},
		close: function() {
			this.payPasswd = '';
			this.hoverKey = '';
			this.confirmFlag = false;
			this.$emit('cancel');
		},
	}
	
})