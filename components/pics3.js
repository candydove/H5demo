Vue.component('show-pic3', {
	template: '<div class="pics" :class="{\'one-row\': oneRow}"> ' +
		'<div @mouseover="overShow($event,index)" @mouseout="outHide($event,index)" class="pic-div" v-for="(picId,index) in picIds" track-by="$index">' +
		'<div class="posb-mainimg" v-if="index==0">主图</div>' +
		'<div class="pic" :style="{backgroundImage:\'url(\' + picUrl + picId + \')\'}" :url="picUrl + picId" @click="showCurrent"></div> ' +
		'<div class="posb-delimg" @click="deletePic(picId,index)">删除</div></div>'+
		'<div class="pic upload"  @click="choosePic" v-if="isUpload"></div>' +
		'<input type="file" id="uploadFile" file="file" @change="choosePic2($event)" accept="image/*"  style="display:none"  multiple />' +
		'<div v-show="imgOShowFlag" class="box_fild" @click="showSmallImage"><img id="img0" src="" /></div>' +
		'<div v-show="waitShow">' +
		'<div id="pics-backdrop2" class="pics-fade-transition"></div>' +
		'<div class="mui-slider pics-waiting slide-bottom-transition">' +
		'<div class="pics-wait_tip">' +
		'<div class="pics-title_op">正在上传中 </div>' +
		'<div class="more_op"><span class="dot_1"></span><span class="dot_2"></span><span class="dot_3"></span></div>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>',
	props: ['picIds','oneRow','picUrl'],
	data: function() {
		return {
			wxWKWebview: window.__wxjs_is_wkwebview === true,
			isWeixin: utils.browser().weixin,
			imgOShowFlag: false,
			waitShow: false,
			isUpload:true
		}
	},
	created: function() {},
	methods: {
		//显示删除按钮
		overShow: function (event,index) {
			if(index == 0){
				event.currentTarget.children[2].style.display='block'
			}else{
		 		event.currentTarget.children[1].style.display='block'
		 	}
	    },
	    //隐藏删除按钮
	    outHide: function (event,index) {
		    if(index == 0){
				event.currentTarget.children[2].style.display='none'
			}else{
		 		event.currentTarget.children[1].style.display='none'
		 	}
	    },
	    //删除图片
	    deletePic: function(picId,index){
	    	var that = this;
	    	Cpop.confirm({
							'content':'确认删除？',
				            'title':'提醒',
				            firm:'否',
				            firm2:'是',
				            firmFn:function(flag) {
								if(flag == 1) {
									that.picIds.splice(index,1);
									that.isUpload = true;									
								}else{
									return;
								}
							}
					});
	    	//删除服务器图片接口不好使,后期完善
	    	/*var that = this;
	    	var url = config.LEASE_URL+'/commonController/deletePicture';
	    	utils.postAndDealBySelf(url,{'picId':picId},{}, function(res){
			    		if(res.code === 200) {
							utils.arrayDelete(that.picIds,picId);
						} else {
							Chef.alert({
					            'content':res.message,
					            'title':'提醒'
				       		});
							return;
						}
                    })*/
	    },
		//显示图片大图
		showCurrent: function(e) {
			var current = e.target.getAttribute('url')
			var that = this
			//判断是否微信，以决定如何展示大图
			if(that.isWeixin) {
				window.wx.previewImage({
					current: current, // 当前显示图片的http链接
					urls: that.picUrls // 需要预览的图片http链接列表
				})
			} else {
				that.showBigPic(current, that.picUrls)
			}
		},
		//处理单个图片
		uploadPic: function(img, postfix, callback) {
			var that = this;
			//判断运行环境是否微信
			if(that.isWeixin) {
				window.wx.uploadImage({
					localId: img, // 需要上传的图片的本地ID，由chooseImage接口获得
					isShowProgressTips: 1, // 默认为1，显示进度提示
					success: function(data) {
						if(that.wxWKWebview) {
							that.loadLocalPic(img, data.serverId, callback);
						} else {
							that.$emit('upload-pic', {
								localId: img,
								serverId: data.serverId
							})
							callback();
						}
					}
				})
			} else {
				that.waitShow = true;
				var selector = document.createElement('img');
				that.compress1(selector, img, postfix, function(base64Img, n_pic_index) {
                    var l_image=[];
                    l_image.push(base64Img);
                    utils.post(config.LEASE_URL+'/commonController/uploadPicture',{'l_image':l_image},{},function(json){
                        that.$emit('upload-pic', {
                            localId: json.picId,
                            serverId: json.picId
                        })
                        that.waitShow = false;
                        callback();
                    })



				})
			}
		},
		//图片压缩
		compress1: function(selector, file, n, callback) {
			var that = this
			var Orientation = 1;
			EXIF.getData(file, function() {
				Orientation = EXIF.getTag(this, 'Orientation');
			});
			if(!n) {
				var n = 1;
			};
			var reader = new FileReader();
			reader.onload = function(e) {
				var image = selector;
				image.onload = function() {
					var data = that.compress_rectangle(Orientation, this, 1280);
					callback(data, n);
				};
				image.src = e.target.result
				// image.attr('src', e.target.result);
			};
			reader.readAsDataURL(file);
		},
		//加载本地图片
		loadLocalPic: function(img, serverId, callback) {
			var that = this;
			if(that.isWeixin) {
				window.wx.getLocalImgData({
					localId: img, // 图片的localID
					success: function(res) {
						// localData是图片的base64数据，可以用img标签显示
						that.$emit('upload-pic', {
							localId: res.localData,
							serverId: serverId
						})
						callback();
					}
				})
			} else {
				that.$emit('upload-pic', {
					localId: img.name,
					serverId: ''
				})
				callback();
			}
		},
		//按尺寸压缩
		compress_rectangle: function(Orientation, img, max) {
			var canvas = document.createElement('canvas');
			// if (checkAppleBrowser() && Orientation && Orientation != 1) {
			if(utils.browser().ios && Orientation && Orientation != 1) {
				switch(Orientation) {
					case 6: //需要顺时针（向左）90度旋转
						var expectWidth = img.height;
						var expectHeight = img.width;
						if(expectWidth > expectHeight) {
							if(expectWidth > max) {
								expectWidth = max;
								expectHeight = max * img.width / img.height;
							}
						} else {
							if(expectHeight > max) {
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
					case 8: //需要逆时针（向右）90度旋转
						var expectWidth = img.height;
						var expectHeight = img.width;
						if(expectWidth > expectHeight) {
							if(expectWidth > max) {
								expectWidth = max;
								expectHeight = max * img.width / img.height;
							}
						} else {
							if(expectHeight > max) {
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
					case 3: //需要180度旋转
						var expectWidth = img.height;
						var expectHeight = img.width;
						if(expectWidth > expectHeight) {
							if(expectWidth > max) {
								expectWidth = max;
								expectHeight = max * img.height / img.width;
							}
						} else {
							if(expectHeight > max) {
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
				if(expectWidth > expectHeight) {
					if(expectWidth > max) {
						expectWidth = max;
						expectHeight = max * img.naturalHeight / img.naturalWidth;
					}
				} else {
					if(expectHeight > max) {
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
		//逐张图片处理
		uploadOneByOne: function(list, i) {

			var that = this
			var k = i
			that.uploadPic(list[k], k, function() {
				if(k < list.length - 1) {
					k += 1
					that.uploadOneByOne(list, k);
				}
			})
		},
		//点击＋号
		choosePic: function() {
			var that = this
			if(that.isWeixin) {
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
			} else {
				document.getElementById("uploadFile").click()
				// that.uploadOneByOne(res.localIds, 0)

			}

		},
		//非微信环境的选择图片
		choosePic2: function(event) {
			var files = event.currentTarget.files;
			var that = this
			if(files != null && files.length > 0) {
				that.uploadOneByOne(files, 0)

			}
		},
		//返回显示缩略图
		showSmallImage: function() {
			var selector = document.getElementById('img0');
			selector.src = ""
			var that = this
			that.imgOShowFlag = false
		},
		//显示大图
		showBigPic: function(current, pics) {
			// window.console.log("current "+current)
			var that = this
			// that.imgOShowFlag=true
			var img0 = document.getElementById('img1');
			if(img0 == null) {
				img0 = document.getElementById('img0');
				img0.src = current
				/*if(window.innerWidth)
					winWidth = window.innerWidth;
				else if((document.body) && (document.body.clientWidth))
					winWidth = document.body.clientWidth;
				img0.width = winWidth - 22*/
				img0.width = 800;
				img0.height = 800;
				that.imgOShowFlag = true
			} else {
				img0.src = current
				/*if(window.innerWidth)
					winWidth = window.innerWidth;
				else if((document.body) && (document.body.clientWidth))
					winWidth = document.body.clientWidth;
				img0.width = winWidth - 22*/
				img0.width = 800;
				img0.height = 800;
				that.$emit('upload-pic', {
					imgOShowFlag: true
				})
			}

			// that.AutoResizeImage(img0.width,200,img0,img0.src)
		}
	},
})