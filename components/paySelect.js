Vue.component('pay-select', {
	template: 
'<div v-if="bshow">'+
    '<div id="backdrop" class="fade-transition"></div>'+
    '<div class="pay slide-bottom-transition" v-if="bFirst">'+
        '<div class="calua_top">'+
            '<div class="tti_div">'+
               ' <div class="title">'+
                    '<div class="icon close" @click="onCancel"></div>'+
                    '<div class="baseFontSize strongTextColor" style="line-height: 30px;">支付详情</div>'+
                    '<div class="info"></div>'+
                '</div>'+
            '</div>'+
            '<div class="group first slide_box slide-out-transition">'+
                '<div class="row_10">'+
                    '<div class="baseFontSize strongTextColor">交易账户</div>'+
                    '<div class="baseFontSize strongTextColor">{{telephone}}</div>'+
                '</div>'+
                '<div class="row_10" @click="changeMethod">'+
                    '<div class="baseFontSize strongTextColor">支付方式</div>'+
                    '<div class="baseFontSize strongTextColor" style="margin-right: 20px;">{{payMethods[defaultMethod].payMethod}}</div>'+
                    '<div class="more"></div>'+
                '</div>'+
                '<div v-if="bchangeAmt">'+
	                '<div class="row_10">'+
	                    	'<div class="baseFontSize strongTextColor">支付金额</div>'+
		                    '<input style="color:#999;" type="number" class="money_text" v-bind:readonly="!bchangeAmt" :placeholder="payMethods[defaultMethod].n_total_amt" v-on:blur="onChangeAmt(event)"/>'+
		                    '<div class="baseFontSize strongTextColor mal5">元</div>'+
	                '</div>'+
	                '<div class="tip">'+
						'<div style="color: #999;">支持部分还款，金额可修改</div>'+
					'</div>'+
                '</div>'+
                '<div v-else>'+
                    '<div class="row_10">'+
                    	'<div class="baseFontSize strongTextColor">支付金额</div>'+
                    	'<div class="baseFontSize strongTextColor">{{payMethods[defaultMethod].n_total_amt}}元</div>'+
                	'</div>'+
				'</div>'+
            '</div>'+
            '<div class="group pay_btn slide-out-transition single">'+
                '<div class="tip_top" style="padding: 0 0 10px;">'+
                    '<div class="row_noline">'+
                        '<div class="real_amount">'+
                            '<div>'+
                                '实际扣款<span>{{(payMethods[defaultMethod].n_total_amt*1+payMethods[defaultMethod].n_fee_amt*1).toFixed(2)}}元</span>，含有手续费<span>{{(payMethods[defaultMethod].n_fee_amt*1).toFixed(2)}}元</span>'+
                            '</div>'+
							'<div v-if="payMethods[defaultMethod].n_fee_amt>0">'+
								'<div>手续费明细如下:</div>'+
								'<ul v-for="(item, index) in payMethods[defaultMethod].fee_detail">'+
									'<li>{{index+1}}.{{item.text}}<span>{{item.n_fee_amt}}元</span></li>'+
								'</ul>'+
							'</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<button class="next" style="width: calc(100% - 20px);" @click="onOk">确认支付&nbsp;￥{{(payMethods[defaultMethod].n_total_amt*1+payMethods[defaultMethod].n_fee_amt*1).toFixed(2)}}元</button>'+
            '</div>'+
        '</div>'+
    '</div>'+
    '<div class="pay slide-bottom-transition" v-if="!bFirst">'+
    	'<div class="calua_top">'+
        	'<div class="tti_div">'+
            	'<div class="title">'+
	                '<div class="icon back" @click="back"></div>'+
	                '<div class="baseFontSize strongTextColor" style="line-height: 30px;">支付方式</div>'+
	                '<div class="info"></div>'+
            	'</div>'+
        	'</div>'+
        	'<div class="group slide_box plaway_list first slide-in-transition"'+
        		'<div v-for="(item, index) in payMethods">'+
		            '<div class="row_10">'+
		              	'<div class="payway chosen" v-if="index==defaultMethod" @click="selectMethod(index)">'+
		                  	'{{item.text}}'+
		              	'</div>'+
		                '<div class="payway" v-else @click="selectMethod(index)">'+
		                    '{{item.text}}'+
		                '</div>'+
		            '</div>'+
	            '</div>'+
	        '</div>'+
        '</div>'+
    '</div>'+
'</div>',
	props: ['payMethods', 'telephone', 'bshow', 'bchangeAmt'], // 父控件传进来的数据
	data: function() {
		return {
			default: -1, // 默认支付方式
			bFirst:true, // 默认显示第一页
		}
	},
    computed: {
    	// 计算默认选项，如果余额大于
       	defaultMethod: function() {
       		if(this.default<0){
	   			if(this.payMethods[0].n_yue>=this.payMethods[0].n_total_amt){
       				return 0;
       			}else if(this.payMethods.length>1){
       				return 1;
       			}else{
       				return 0
       			}
       		}else{
       			return this.default;
       		}
      	},
       	defaultMoney: function() {
       		if(this.default<0){
	   			if(this.payMethods[0].n_yue>=this.payMethods[0].n_total_amt){
       				return 0;
       			}else if(this.payMethods.length>1){
       				return 1;
       			}else{
       				return 0
       			}
       		}else{
       			return this.default;
       		}
      	}
    },
	methods: {
	    back: function(){
			this.bFirst = true;
	    },
	    onChangeAmt: function(event){
	    	if(!this.bchangeAmt){
	    		return;
	    	}
	    	var temp = event.target.value;
	    	if(temp==null|| temp==''){
	    		return;
	    	}
	    	var temp1 = parseFloat(temp)
	    	if(temp1!=this.payMethods[this.defaultMethod].n_total_amt){
	    		this.$emit('amt-change', temp1);
	    	}
	    },
	    changeMethod: function(){
			this.bFirst = false
	    },
	    selectMethod: function(select){
			this.default = select
			this.bFirst = true;
	    },
	    onOk: function(){
			this.$emit('ok', this.payMethods[this.defaultMethod].id);
		},
		onCancel: function() {
			this.$emit('cancel');
		},
	}
})