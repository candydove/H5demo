#支付密码组件（示例可参考charge.html）

1、需要引入的文件
<link rel="stylesheet" type="text/css" href="../../components/component.css" />
<script type='text/javascript' src='../../components/md5.min.js' charset='utf-8'></script>
<script type='text/javascript' src='../../components/payPassword.js' charset='utf-8'></script>

2、组件引入
<pay-password :pay-passwd-show="payPasswdShow" @close="payPasswdClose" @get-pass="getPass"></pay-password>

3、组件说明
:pay-passwd-show向子组件的传参， payPasswdShow为父组件的data内属性，用于控制组件的是否显示
payPasswdClose 为关闭按钮被点击后父组件执行的方法（隐藏组件）
getPass 为密码输入完成后父组件执行的方法（获得的密码已经过两次MD5）

===========================================================================================================

#验证码组件（示例可参考charge.html）

1、需要引入的文件
<link rel="stylesheet" type="text/css" href="../../components/component.css" />
<script type='text/javascript' src='../../components/verifyCode.js' charset='utf-8'></script>

2、组件引入
<verify-code ref="verifyCode" :verify-code-show="verifyCodeShow" @close="verifyCodeClose" @get-sms-code="getSmsCode" @get-voice-code="getVoiceCode" @get-verify-code="getVerifyCode"></verify-code>

3、组件说明
:verify-code-show向子组件的传参， verifyCodeShow为父组件的data内属性，用于控制组件的是否显示
:voice-show向子组件的传参，用于控制组件内是否显示语音验证码（银行卡支付时不支持语音）
verifyCodeClose为关闭按钮被点击后父组件执行的方法（隐藏组件）
getSmsCode 为用户点击获取短信验证码时，父组件需要执行的方法
getVoiceCode 为用户点击获取语音验证码时，父组件需要执行的方法
getVerifyCode 为用户点击提交按钮时，父组件需要执行的方法

4、若需要在父组件中调用发送验证码方法，然后再显示验证码组件，参考代码如下
this.$refs.verifyCode.getSmsCode();
var self = this; //此处必须用self暂存this
setTimeout(function() {
	self.verifyCodeShow = true
}, 300)

===========================================================================================================

#等待组件（示例可参考charge.html）
1、需要引入的文件
<link rel="stylesheet" type="text/css" href="../../components/component.css" />
<script type='text/javascript' src='../../components/waiting.js' charset='utf-8'></script>

2、组件引入
<waiting :waiting-show="waitingShow" :icon-class="iconClass" :title-text="waitingTitleText" :status-text="waitingStatusText"></waiting>

3、组件说明
:waiting-show 向子组件的传参， 用于控制组件的是否显示
:icon-class 向子组件的传参， 用于控制组件中成功或失败的图标是否显示（可选值为：ok / failed）
:title-text 向子组件的传参， 标题栏显示文字
:status-text 向子组件的传参， 状态栏显示文字

=========================================================================================================

#图片预览上传组件

1、需要引入的文件
<link rel="stylesheet" type="text/css" href="../../components/component.css" />
<script type='text/javascript' src='../../components/pics.js' charset='utf-8'></script>
<script type='text/javascript src="../../js/exif.js"></script>

2、组件引入
<show-pic :upload="true" :delete-flag="true" :pic-urls="picUrls" :one-row="true" @upload-pic="uploaded" @delete-pic="deletePics">
</show-pic>
uploaded: function(json){
	this.picUrls.push(json.localId);// 将增加的本地图片加入传入子控件的图片列表中
	this.uploadUrls.push(json.serverId);// 保存需要上传服务器的图片id，后台根据这个id从腾讯云上把图片下载下来
},
删除图片
deletePics:function(json){
				
this.picUrls.splice(json.index,1);					
this.uploadUrls.splice(json.index,1);
},

3、组件说明
:upload 标识是否需要上传图片
:delete-flag组件是否需要删除图片
:one-row 整个控件显示在一行上面，如果超过了页面宽度，图片显示不会换行，会一直向后面增加，一般不配置这个参数，控件会自动换行
:pic-urls 图片的列表，如果是后端返回的七牛图片名称，需要拼接成URL
@upload-pic,是用户上传了一张图片，父控件需要做的响应，返回的数据格式为{localId:"", serverId:""},由于子控件不可以对传入的图片列表进行修改，因此修改列表的工作需要由父控件承担，直接push到传入子控件的列表中就可以了，同时父控件需要保存下子控件返回的serverId，用于用户点击确定的时候，将这个列表传回给服务器端。

@delete-pic,用户删除一张图片，父控件需要做的响应
=========================================================================================================

#支付方式选择组件

1、需要引入的文件
<link rel="stylesheet" type="text/css" href="../../components/component.css" />
<script src='../../components/paySelect.js'></script>


2、组件引入
<pay-select :bshow="bShowPaySelect"
	:telephone="telephone"
	:pay-methods="payMethods"
	:bchange-amt="bChangeAmt"
	@ok="onPaySelectOk"
	@cancel="onPaySelectCancel"
	@amt-change="onAmtChange">
</pay-select>

3、组件说明
:bshow 是否需要显示控件
:telephone 用户的账户名称(手机号)
:pay-methods 支付方式的列表
:bchange-amt 是否允许用户修改金额
@ok 用户选好支付方式，返回支付方式的id，需要额外隐藏控件
@cancel 用户取消选择支付方式，需要隐藏控件
@amt-change 用户对还款金额进行修改，需要重新计算并且传入:pay-methods，

:pay-methods=
[
    {
    	id:"0",
        payMethod: "余额支付",
        n_total_amt: 200,
        n_fee_amt: 0,
        text: "账户余额 (1900元)",
        n_yue: 1900
    },
    {
    	id:"JJD2017",
        payMethod: "工商银行 (尾号3456)",
        n_total_amt: 200,
        n_fee_amt: 1,
        text: "工商银行 (尾号3456)",
        fee_detail: [
            {
                text: "线下补借条，线上还款",
                n_fee_amt: 0.5
            },
            {
                text: "低于500手续费",
                n_fee_amt: 0.5
            }
        ]
    }
]



