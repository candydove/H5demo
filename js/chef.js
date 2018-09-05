var Chef = {
        //body 的宽高
        'bodyH':document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight,
        'bodyH2':document.documentElement.clientHeight/2 || document.body.clientHeight/2 || window.innerHeight/2,
        'bodyW':document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth,
        //动态创建 style 标签添加样式
        'cssStyle':function (){
            var doc=document;
            var style=doc.createElement("style");
            if(style.styleSheet){// IE
                style.styleSheet.cssText = arguments[0];
            }else{// w3c
                var cssText = doc.createTextNode(arguments[0]);
                style.appendChild(cssText);
            }
            var heads = doc.getElementsByTagName("head");
            if(heads.length){
                heads[0].appendChild(style);
            }else{
                doc.documentElement.appendChild(style);
            }
        },
        // 创建并显示遮罩层
        'createChef':function(){
            if(document.body.getElementsByClassName('Chef_opacity').length == 1){
                document.body.removeChild(document.body.getElementsByClassName('Chef_opacity')[0]);
            }
            var div = this.create('div');
            div.style.width = this.bodyW + 'px';
            div.style.height = this.bodyH + 'px';
            div.className = 'Chef_opacity';
            document.body.appendChild(div);
        },
        'show':function(msg,flag){
        	if(!flag){
        		flag = "success";
        	}
        	var showDiv = this.create('div');
        	if(flag == "success"){
        		showDiv.className = 'change-success active';
	        	showDiv.style.display = 'block';
	        	showDiv.innerHTML = '<div class="ch-suc-con">' +
							        '<i class="duihao-icon"></i>' +
							        '<span class="xiugai-tit">' + msg + '</span>' +
							    '</div>'
        	}
        	document.body.appendChild(showDiv);
        },
        //alert 框
        'alert':function(){
        	var firmFn = arguments[0].firmFn;
            // 显示遮罩层
            this.createChef();
            // 创建
            var alertDiv = this.create('div'),
                    alertH2 = this.create('h2'),
                    alertX = this.create('span'),
                    alertP = this.create('p'),
                    alertBDiv = this.create('div'),
                    alertFirm = this.create('button');
            alertX.innerHTML = '';
            alertX.className = 'Chef_X';
            // 插号的click事件 什么都不做
            alertX.onclick = function(){alertFirm.onclick();}
            // 确定按钮的click事件 什么都不做
            alertFirm.onclick = function(){
            	if(firmFn!=undefined) firmFn();
                document.getElementsByClassName('Chef_opacity')[0].style.display = 'none';
                document.body.removeChild(alertDiv);
            }

            //样式以及内容
            alertDiv.className = 'Chef_alert';
            if(arguments.length == 1){
                document.getElementsByClassName('Chef_opacity')[0].style.background = 'rgba(0,0,0,'+arguments[0].shade+')'    ;
                alertDiv.style.top = arguments[0].offset;
                /* 根据字数自适应宽度 lisheng 20180427 start */
                var content = arguments[0].content;
                var width = 250;
                var maxSize = 20;
                var minSize = 14;
                if(content.length >= minSize && content.length <= maxSize){
                	width = 250 + (content.length-minSize)*20;
                }
                else if(content.length > maxSize){
                	width = 370;
                }
                /* end */
                if(arguments[0].width == undefined){
                    alertDiv.style.width = width + 'px';
                    alertDiv.style.marginLeft = '-'+parseInt(width)/2 + 'px';
                }else{
                    alertDiv.style.width = arguments[0].width;
                    alertDiv.style.marginLeft = '-'+parseInt(arguments[0].width)/2 + 'px';
                }
                alertDiv.style.marginTop = '-101px'
                arguments[0].title == undefined ? alertH2.innerHTML = '来自网页的信息' : alertH2.innerHTML = arguments[0].title;
                arguments[0].content == undefined ? alertP.innerHTML = '' : alertP.innerHTML = arguments[0].content;
                arguments[0].firm == undefined ? alertFirm.innerHTML = '确定' : alertFirm.innerHTML = arguments[0].firm;
            }else{// -- 默认提示信息
                alertH2.innerHTML = '来自网页的信息';
                alertFirm.innerHTML = '确定';
            }
            // 添加到页面
            alertBDiv.appendChild(alertFirm);
            alertH2.appendChild(alertX);
            alertDiv.appendChild(alertH2);
            alertDiv.appendChild(alertP);
            alertDiv.appendChild(alertBDiv);
            document.body.appendChild(alertDiv);
        },
        //创建
        'create':function(){
            return document.createElement(arguments[0]);
        }
    };
    ;(function(Chef){
        var cssString = '\
                    *{padding:0;margin:0;}\
                    .Chef_opacity{display:block;background:rgba(0,0,0,0.4);position:fixed;top:0;z-index:99;}\
                    .Chef_alert{position:fixed;border-radius: 6px;top:50%;margin-top:-61px;background:white;width:260px;padding-bottom:5px;left:50%;margin-left:-130px;z-index:100;font-family: inherit;font-size: 16px;}\
                    .Chef_alert>h2{width:90%;margin:0px auto;margin-top:15px;font-size:18px;text-align:center;}\
                    .Chef_alert>p{width:90%;margin:0 auto;padding:20px 0;text-align:center;border-bottom:1px solid #d8d8d8;}\
                    .Chef_alert>div{width:90%;height:44px;margin:0 auto;font-size:0;text-align: center;}\
                    .Chef_alert>div>button{width:50%;height:100%;border:0;outline:0;font-size:18px;background:white;font-family:Microsoft YaHei;cursor:pointer;}\
                    .Chef_X{width: 21px;height: 21px;float:right;font-size:13px;color:grey;cursor:pointer;font-weight:normal;display: inline-block;background:url("../../images/fork-icon2.svg") no-repeat center center;background-size: 15px 15px;}\
                ';
        Chef.cssStyle(cssString);
    })(Chef);