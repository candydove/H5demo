/**
 * author: tyd
 * createTime: 2017/11/13
 * title: 分页组件
 */
var pageComponent = Vue.extend({
    template: '<nav aria-label="Page navigation">'+
			        '<ul class="paging-con clearfix">'+
			            '<li @click="goPage(curPage==1?1:curPage-1)" v-bind:class="[curPage==1 ? \'disabled pag-item sanjiao fl\' : \'\', \'pag-item sanjiao fl\']">'+
			               '<a href="javascript:;" aria-label="Previous">'+
			                    '<span aria-hidden="true"></span>'+
			               '</a>'+
			           '</li>'+
			           '<li v-for="page in showPageBtn" class="fl">'+
			                '<a href="javascript:;" v-bind:class="[page==curPage ? \'pag-active\' : \'\', \'pag-item\']" @click="goPage(page)" v-if="page" >{{page}}</a>'+
			             	'<a href="javascript:;" v-else>···</a>'+
			           '</li>'+
			           '<li @click="goPage(curPage==pages?pages:curPage+1)" v-bind:class="[curPage==pages ? \'disabled pag-item sanjiao2 fl\' : \'\', \'pag-item sanjiao2 fl\']">'+
			               '<a href="javascript:;" aria-label="Next">'+
			               		'<span aria-hidden="true"></span>'+
			               '</a>'+
			            '</li>'+
			            '<li :class="{\'pag-item fl\':pages==pages}">'+
			               '<a href="javascript:void(0);">'+
			               		 '共  {{pages}} 页'+
			               '</a>'+
			           '</li>'+
			       '</ul>'+
			   '</nav>',
	// 用户组件传递数据		    
    props: {
        pages: {
            type: Number,
            default: 1
        },
        current: {
            type: Number,
            default: 1
        }
    },
    data:function (){
        return{
            curPage:1
        }
    },
    computed: {
    	// 显示分页按钮
        showPageBtn:function() {
            let pageNum = this.pages; // 总页数
            let index = this.curPage; // 当前页
            let arr = [];
            if (pageNum <= 6) {
                for (let i = 1; i <= pageNum; i++) {
                    arr.push(i)
                }
                return arr
            }
            // 对页码显示进行处理，动态展示
			if (index <= 3) return [1, 2, 3, 4, 0, pageNum];
            if (index >= pageNum - 1) return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum];
            if (index === 4) return [1, 2, 3, 4, 5, 0, pageNum];
            if (index === pageNum - 2) return [1, 0, pageNum - 4, pageNum - 3, pageNum - 2, pageNum - 1, pageNum];
            return [1, 0, index - 2,index - 1, index, index + 1, index + 2, 0, pageNum];
        }
    },
    methods: {
        goPage:function(page) {
            if (page != this.curPage) {
                console.log(page);
                this.curPage = page;
                this.$emit('navpage', this.curPage);
            }else{
                console.log('Already in the current page');
            }
        }
    }
});
Vue.component('navigation', pageComponent); // 注册组件