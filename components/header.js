/**
 * author: tyd
 * createTime: 2017/11/13
 * title: 分页组件
 */
var headerComponent = Vue.extend({
    template: '<div class="pub-header" id="mainDiv">' +
			        '<div class="pub-header-com">' +
			        '<p>{{title}}</p>' +
            		'<p class="pub-header-rig"  @click="quit">{{quitName}}</p>' +
    				'<p class="pub-header-rig mal85"  @click="quit">{{name}}</p>' +
			   '</div>',
	// 用户组件传递数据		    
    props: {
        title: {
            type: String,
            default: '今借到信用借还商家版'
        },
        quitName:{
        	type: String,
            default: '退出'
        },
      		name:{
            type: String,
            default: window.sessionStorage.name
				}
    },
    data:function (){
        return{
           bsending: [{}, {}, {}, {}],
        }
    },
    computed: {
    },
    methods: {
        //退出
		quit:function(){
			var that = this;
			Cpop.confirm({
					'content':'您的确要退出当前账号吗？',
		            'title':'提醒',
		            firm:'取消',
		            firm2:'退出',
		            firmFn:function(flag) {
						if(flag == 1) {
							var url = config.LEASE_MERCHANT_URL + "/staff/loginOut";
							utils.getAndDealBySelf(url, {}, that.bsending[0], function(res){
								if(res.code===200){
									window.localStorage.storagePwd='';
									window.sessionStorage.clear();
									utils.replace('../index/login.html');
								}else{
									Chef.alert({
								            'content':res.message,
								            'title':'提示'
							       		});
								}
							})
						}else{
							return;
						}
					}
			});
		}
    }
});
Vue.component('header-component', headerComponent); // 注册组件