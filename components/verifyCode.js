Vue.component('verify-code', {
	props: ['verifyCodeShow', 'voiceShow'], //是否显示支付密码输入页，是否显示语音验证码
	data: function() {
		return {
			verifyCode: '',
			gettingSmsCode: false,
			gettingCodeVoice: false,
			pidSms: '',
			pidVoice: '',
			timeSms: 30,
        	timeVoice: 60,
			keys: [
	        	'1', '2', '3',
	        	'4', '5', '6',
	        	'7', '8', '9',
	        	'c', '0', 'd'],
	        hoverKey: '',
       }
	},
	
	template: '<div v-if="verifyCodeShow">'+
				'<div id="backdrop" class="fade-transition"></div>'+
				'<div class="pay slide-bottom-transition">'+
					'<div class="calua_top">'+
						'<div class="tti_div">'+
							'<div class="title">'+
								'<div class="icon close" @click="close"></div>'+
								'<div class="buttonFontSize strongTextColor" style="line-height: 30px;">请输入验证码</div>'+
								'<div style="width: 40px;"></div>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="calua_bottom">'+
						'<div class="key_board_div">'+
							'<div class="key_board">'+
								'<div class="pwd_box">'+
									'<div class="code_box">'+
										'<div :class="{\'fake_place\':!verifyCode}" class="numbers">'+
											'<div v-for="dot in 6" class="border_box new_code top c6">'+
												'<div v-if="dot <= verifyCode.length" class="code-dot">{{verifyCode.split(\'\')[dot-1]}}</div>'+
											'</div>'+
										'</div>'+
										'<div @click="getSmsCode" class="tip">'+
											'<span v-if="gettingSmsCode" class="tipTextColor">{{timeSms}}秒后重新获取</span>'+
											'<span v-else class="mainColor">重新获取验证码</span>'+
										'</div>'+
										'<div class="code_btn_box">'+
											'<button @click="confirmCode">提交</button>'+
										'</div>'+
										'<div v-if="voiceShow" @click="getVoiceCode" class="tip">'+
											'<span v-if="gettingCodeVoice" class="tipTextColor">{{timeVoice}}秒后重新获取</span>'+
											'<span v-else class="tipTextColor">收不到短信？<a href="#" class="mainColor" style="color: #FF973A;">获取语音验证码</a></span>'+
										'</div>'+
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
	            this.verifyCode = this.verifyCode.substring(0, this.verifyCode.length - 1)
	        } else if (num === 'c') {
	          	this.verifyCode = ''
	        } else if (this.verifyCode.length < 6) {
	          	this.verifyCode += num
	        } else if (this.verifyCode.length >= 6) {
	          	return
	        }
	    },
	    endPos: function() {
			this.hoverKey = ''
		},
		
		getSmsCode: function(){
			if (this.gettingSmsCode) return
			var self = this;
        	setTimeout(function() {
          		self.startCountSms()
        	}, 300)
			this.$emit('get-sms-code');
		},
		startCountSms: function() {
	        clearInterval(this.pidSms)
	        this.gettingSmsCode = true
	        var self = this;
	        var count = setInterval(function() {
	          	if (self.timeSms === 1) {
	            	clearInterval(count)
	            	self.timeSms = 30
	            	self.gettingSmsCode = false
	          	} else {
	            	self.timeSms -= 1
	          	}
	        }, 1000)
	        this.pidSms = count
	    },
		getVoiceCode: function(){
			if (this.gettingCodeVoice) return
			var self = this;
	        setTimeout(function() {
	        	self.startCountVoice()
	        }, 300)
	        this.$emit('get-voice-code');
		},
		startCountVoice: function() {
	        clearInterval(this.pidVoice)
	        this.gettingCodeVoice = true
	        var self = this;
	        var count = setInterval(function() {
	          	if (self.timeVoice === 1) {
	            	clearInterval(count)
	            	self.timeVoice = 60
	            	self.gettingCodeVoice = false
	          	} else {
	            	self.timeVoice -= 1
	          	}
	        }, 1000)
	        this.pidVoice = count
	    },
	    confirmCode: function(){
	    	if(this.verifyCode && this.verifyCode.length >= 4){
	    		this.$emit('get-verify-code', this.verifyCode);
	    		this.verifyCode = '';
	    		this.hoverKey = ''
	    	}
	    },
		close: function() {
			this.verifyCode = '';
			this.$emit('close');
		},
	},
	
	
})