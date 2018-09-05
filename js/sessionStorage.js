
storageTel:'',// 用户的手机号码，存储在localstorage里面
storagePwd:'',// 用户的密码，存储在localstorage里面
token: '', // 用户访问token
tempToken: '',// 用户注册用临时访问token
bsignURL:false,// 微信端是否授权了微信接口调用权限
userId: '', // 用户id
openId: '',// 用户openId
name: '', // 用户姓名
telephone:'',// 用户手机号
headimgurl: '',,// 用户头像
subscribe: 1, // 是否订阅
b_lt_23: '', // 是否小于23岁，1：是， 0：否， -1：未知（用户没填身份证号）
n_xuexin_fill: '', // 用户是否与填写学信 1：是，0：否
n_student: '', // 是否在校大学生， true：是， false：否
b_guide: '', // 判断是否进行新手引导 0：否 1：是
c_user_identity: '',//用户是何种身份   0:未确认身份, 1:借款人  2:出借人
b_long_term_credit: false, // 是否是长期认证 false true
c_home_addr:'' // 用户家庭住址
passPage:0  // 点击返回的时候，需要额外回退的页数
cache: {// json字符串
	bidFirstTime: false,
	iouFirstTime: false,
	prodFirstTime: false,
	prodListFirstTime: false,
	beginnerGuide: false,
	noTipBorrowerCreate: false,
	noTipBorrowerConfirm: false,
	noTipLenderCreate: false,
	noTipLenderConfirm: false,
	tutorialIndex: false,
	tutorialDetail: false,
	overdueTip: false,
	superCreditToday: 0,
	superCreditDateList: {},
},



