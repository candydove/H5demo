
Vue.component('show-pic', {
	template: '<div class="pics" :class="{\'one-row\': oneRow}"> '
		+'<div v-for="(pic,index) in picUrls"   track-by="$index" class="pic_div" >' +
		'<img class="pic" :src="pic"  :url="pic" @click="showCurrent"></img><span v-if="deleteFlag" @click="deleteCurrent(index)"  class="del">x</span></div> '
	+'<div class="pic upload"  @click="choosePic" v-if="upload"></div>' +
		'<input type="file" id="uploadFile" file="file" @change="choosePic2($event)" accept="image/*"  style="display:none"  multiple />'+
	' <div v-show="imgOShowFlag" class="box_fild" @click="showSmallImage"><img id="img0" src="" /></div>' +
    '<div v-show="waitShow">' +
    '<div id="pics-backdrop2" class="pics-fade-transition"></div>' +
    '<div class="mui-slider pics-waiting slide-bottom-transition">' +
    '<div class="pics-wait_tip">' +
    '<div class="pics-title_op">正在上传中 </div>' +
    '</div></div></div>'+
    '</div>' ,
	props:['picUrls', 'upload', 'oneRow','deleteFlag'],
	data:function() {
	    return {
	        wxWKWebview: window.__wxjs_is_wkwebview === true,
	        isWeixin:utils.browser().weixin,
            imgOShowFlag:false,
            waitShow:false
	    }
	},
	created:function() {

	},
	methods: {
		deleteCurrent:function(index){
			
			this.$emit('delete-pic', {
				index: index
            })
		},
	    showCurrent: function(e) {
	        var current = e.target.getAttribute('url')
	        var that = this

	        if (that.isWeixin) {
	            window.wx.previewImage({
	                current:current, // 当前显示图片的http链接
	                urls: that.picUrls // 需要预览的图片http链接列表
	            })
	        }else{
                that.showBigPic(current,that.picUrls)
            }
	//      else {
	//          this.changeCurrentImg({
	//              current, // 当前显示图片的http链接
	//              urls: that.picUrls // 需要预览的图片http链接列表
	//          })
	//      }
	    },
	    uploadPic: function(img,postfix, callback) {
	        var that = this;

            if (that.isWeixin) {
				window.wx.uploadImage({
					localId: img,// 需要上传的图片的本地ID，由chooseImage接口获得
					isShowProgressTips: 1,// 默认为1，显示进度提示
					success: function(data) {
						if(that.wxWKWebview){
							that.loadLocalPic(img, data.serverId, callback);
						}else{
							that.$emit('upload-pic', {
								localId: img,
								serverId: data.serverId
							})
							callback();
						}
					}
				})
            }else{
                that.waitShow=true;
                var selector = document.createElement('img');
                that.compress1(selector, img,postfix, function(base64Img, base64Img_s,n_pic_index) {

                    that.$emit('upload-pic', {
                        localId: base64Img,
                        serverId: base64Img
                    })
                    that.waitShow=false;
                    callback();

                })





            }
	    },
        compress1:function(selector, file, n, callback) {
	    	var that=this
            var Orientation = 1;
            EXIF.getData(file, function () {
                Orientation = EXIF.getTag(this, 'Orientation');
            });
            if (!n) {
                var n = 1;
            }
            ;
            var reader = new FileReader();
            reader.onload = function (e) {
                var image = selector;
                image.onload=function () {
                    var data = that.compress_rectangle(Orientation, this, 1280);
                    var data_s = that.compress_rectangle(Orientation, this, 430);
                    callback(data, data_s, n);
                };
                image.src =e.target.result
                // image.attr('src', e.target.result);
            };
            reader.readAsDataURL(file);
        },
	    loadLocalPic: function(img, serverId, callback) {
	        var that = this;
            if (that.isWeixin) {
                window.wx.getLocalImgData({
                    localId: img,// 图片的localID
                    success: function (res) {
                        // localData是图片的base64数据，可以用img标签显示
                        that.$emit('upload-pic', {
                            localId: res.localData,
                            serverId: serverId
                        })
                        callback();
                    }
                })
            }else{
                that.$emit('upload-pic', {
                    localId: img.name,
                    serverId: ''
                })
                callback();
			}
	    },
        compress_rectangle:function(Orientation, img, max) {
            var canvas = document.createElement('canvas');
            // if (checkAppleBrowser() && Orientation && Orientation != 1) {
            if (utils.browser().ios&& Orientation && Orientation != 1) {
                switch (Orientation) {
                    case 6://需要顺时针（向左）90度旋转
                        var expectWidth = img.height;
                        var expectHeight = img.width;
                        if (expectWidth > expectHeight) {
                            if (expectWidth > max) {
                                expectWidth = max;
                                expectHeight = max * img.width / img.height;
                            }
                        } else {
                            if (expectHeight > max) {
                                expectHeight = max;
                                expectWidth = max * img.height / img.width;
                            }
                        }
                        canvas.width = expectWidth;
                        canvas.height = expectHeight;
                        var context = canvas.getContext('2d');
                        context.clearRect(0, 0, expectWidth, expectHeight);
                        context.rotate(1 * 90 * Math.PI / 180);
                        context.drawImage(img, 0, -expectWidth, expectHeight, expectWidth);
                        break;
                    case 8://需要逆时针（向右）90度旋转
                        var expectWidth = img.height;
                        var expectHeight = img.width;
                        if (expectWidth > expectHeight) {
                            if (expectWidth > max) {
                                expectWidth = max;
                                expectHeight = max * img.width / img.height;
                            }
                        } else {
                            if (expectHeight > max) {
                                expectHeight = max;
                                expectWidth = max * img.height / img.width;
                            }
                        }
                        canvas.width = expectWidth;
                        canvas.height = expectHeight;
                        var context = canvas.getContext('2d');
                        context.clearRect(0, 0, expectWidth, expectHeight);
                        context.rotate(3 * 90 * Math.PI / 180);
                        context.drawImage(img, -expectWidth, 0, expectHeight, expectWidth);
                        break;
                    case 3://需要180度旋转
                        var expectWidth = img.height;
                        var expectHeight = img.width;
                        if (expectWidth > expectHeight) {
                            if (expectWidth > max) {
                                expectWidth = max;
                                expectHeight = max * img.height / img.width;
                            }
                        } else {
                            if (expectHeight > max) {
                                expectHeight = max;
                                expectWidth = max * img.width / img.height;
                            }
                        }
                        canvas.width = expectWidth;
                        canvas.height = expectHeight;
                        var context = canvas.getContext('2d');
                        context.clearRect(0, 0, expectWidth, expectHeight);
                        context.rotate(2 * 90 * Math.PI / 180);
                        context.drawImage(img, -expectWidth, -expectHeight, expectWidth, expectHeight);
                        break;
                    default:
                        break;
                }
            } else {
                var expectWidth = img.naturalWidth;
                var expectHeight = img.naturalHeight;
                if (expectWidth > expectHeight) {
                    if (expectWidth > max) {
                        expectWidth = max;
                        expectHeight = max * img.naturalHeight / img.naturalWidth;
                    }
                } else {
                    if (expectHeight > max) {
                        expectHeight = max;
                        expectWidth = max * img.naturalWidth / img.naturalHeight;
                    }
                }
                canvas.width = expectWidth;
                canvas.height = expectHeight;
                var context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0, expectWidth, expectHeight);
            }
            return canvas.toDataURL('image/jpeg');
        },
	    uploadOneByOne: function(list, i) {

	        var that = this
	        var k = i
	        that.uploadPic(list[k],k, function(){
	            if (k < list.length - 1) {
	                k += 1
	                that.uploadOneByOne(list, k);
	            }
	        })
	    },
	    choosePic: function() {

	        var that = this

	        if (that.isWeixin) {
		        window.wx.chooseImage({
		            count: 9, // 默认9
		            sizeType: ['original', 'compressed'],
		            // 可以指定是原图还是压缩图，默认二者都有
		            sourceType: ['album', 'camera'],
		            // 可以指定来源是相册还是相机，默认二者都有
		            success: function(res) {
		                // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
		                that.uploadOneByOne(res.localIds, 0)
		            }
		        })
	        }else{
                document.getElementById("uploadFile").click()
                // that.uploadOneByOne(res.localIds, 0)

            }

		},
        showSmallImage:function(){
            var selector = document.getElementById('img0');
            selector.src=""
            var that =this
            that.imgOShowFlag=false
        },
		showBigPic:function (current,pics) {
	        // window.console.log("current "+current)
            var that =this
            // that.imgOShowFlag=true
            var img0 = document.getElementById('img1');
            if(img0==null){
                img0 = document.getElementById('img0');
                img0.src=current
                if (window.innerWidth)
                    winWidth = window.innerWidth;
                else if ((document.body) && (document.body.clientWidth))
                    winWidth = document.body.clientWidth;
                img0.width=winWidth-22
                that.imgOShowFlag=true
            }else{
                img0.src=current
                if (window.innerWidth)
                    winWidth = window.innerWidth;
                else if ((document.body) && (document.body.clientWidth))
                    winWidth = document.body.clientWidth;
                img0.width=winWidth-22
                that.$emit('upload-pic', {
                    imgOShowFlag: true
                })
            }

            // that.AutoResizeImage(img0.width,200,img0,img0.src)
		},

        choosePic2:function(event){
            var files = event.currentTarget.files;
            var that = this
            that.uploadOneByOne(files, 0)
		}
	},
})