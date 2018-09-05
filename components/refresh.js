Vue.component('refresh', {
	template:
'<div @touchstart="startMove" @touchmove="onMove" @touchend="stopMove">'+
    '<div class="pull-loading" @transitionEnd="transitionEnd" :style="{transform:translate,transitionDuration:transitionDuration}">'+
        '<div>'+
            '<span class="status-class" :class="{\'loading\': loading}"></span>'+
        '</div>'+
    '</div>'+
'</div>',
	data: function() {
		return {
	        dragging: 0,
	        startY: 0,
	        loading:false,
	        dY: 0,
	        reset: true,
	        loadingAreaHeight: 60,
	        pullRefresh: true,
		}
	},
    computed: {
    	transitionDuration: function() {
    		return this.dragging || this.dY === 0 && this.reset ? '0s' : '200ms'
    	},
    	translate: function() {
    		var t = 'translateY('+(80 * Math.atan(this.dY / 80))+'px)'
    		if(80 * Math.atan(this.dY / 80) === 0) {
    			t = ''
    		}
    		return t
    	},
    },
	methods: {
		refresh: function() {
			window.console.log('refreshing...')
			this.loading = true;
			document.body.scrollTop = 0
			var that = this;
			setTimeout(function(){
				window.console.log('refreshed')
				that.loading = false;
				that.dY = 0;
			}, 1000)
		},
		startMove: function(e) {
			if(!this.pullRefresh) return
			var touch = e.changedTouches[0]
			console.log('startMove'+touch.pageY)
			if(window.scrollY <= 0) {
				this.startY = touch.pageY
				this.dragging = true
				this.reset = false
			} else {
				this.dragging = false
			}
		},
		onMove: function(e) {
			if(!this.pullRefresh) return
			var touch = e.changedTouches[0]
			console.log('onMove'+touch.pageY)
			if(this.dragging && touch.pageY - this.startY > 0 &&
				window.scrollY <= 0) {
				e.preventDefault()
				this.dY = touch.pageY - this.startY
				if(this.loading) {
					this.dY += this.loadingAreaHeight
				}
			}
		},
		stopMove: function() {
			if(!this.pullRefresh) return
			this.dragging = false
			if(this.dY > this.loadingAreaHeight && window.scrollY <= 0) {
				this.refresh()
				this.dY = this.loadingAreaHeight
			} else {
				this.dY = 0
			}
		},
		transitionEnd: function() {
			if(this.dY === 0) {
				this.reset = true
			}
		},
	}
})