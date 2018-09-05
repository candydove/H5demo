Vue.component('waiting', {
	props: [
			'waitingShow', //是否显示等待页
			'iconClass', //成功or失败的样式，值只能为 ok 或者 failed 
			'titleText', //title显示文字，status显示文字
			'statusText' //status显示文字
		], 
	data: function() {
		return {
			max: 5,
        	cur: 1,
       }
	},
	
	template: '<div v-if="waitingShow">'+
				'<div id="backdrop" class="fade-transition"></div>'+
				'<div class="pay slide-bottom-transition verify_now">'+
					'<div class="calua_top">'+
						'<div class="tti_div">'+
							'<div class="title">'+
								'<div class="icon close" @click="close"></div>'+
								'<div class="baseFontSize strongTextColor" style="line-height: 30px;">{{titleText}}</div>'+
								'<div style="width: 40px;"></div>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="calua_bottom">'+
						'<div class="verify_div">'+
							'<div class="verify_font">'+
								'<div v-show="iconClass!=\'\'" :class="iconClass" class="icon"></div>'+
								'<p style="font-size: 16px; color: #333;">{{statusText}}</p>'+
								'<div v-show="iconClass==\'\'">'+
									'<p>小提示</p>'+
									'<div @click="nextTip" class="box_ver">'+
										'<div v-show="cur == 1" transition="slide-transition">今借到平台自身不放款，只提供信息服务，您需要把自己的借贷信息分享给他人看到。</div>'+
									    '<div v-show="cur == 2" transition="slide-transition">非亲密关系，不建议您使用【补借条】功能，风险较大，平台推荐【求借款】【去出借】。</div>'+
									    '<div v-show="cur == 3" transition="slide-transition">所有用户都需要信用认证，这是保障电子合同法律有效性的必要前提。</div>'+
									    '<div v-show="cur == 4" transition="slide-transition">正常情况下提现后立即到账；如遇特殊情况，请耐心等待银行结果。</div>'+
									    '<div v-show="cur == 5" transition="slide-transition">线下还款需要对方确认才算完成，如若担心对方不确认建议选择线上还款。</div>'+
									'</div>'+
									'<div @click="nextTip" class="refrsh_img"></div>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>',
			
	methods: {
	    //显示下一个提示
	    nextTip: function() {
	        if (this.cur === this.max) {
	          	this.cur = 1
	        } else {
	          	this.cur += 1
	        }
	    },
	    close: function() {
			this.$emit('close');
		},
	},

})