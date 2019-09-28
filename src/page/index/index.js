'use strict'
require('./index.css');

require('@/common/nav-simple/index.js');
require('@/common/nav/index.js');
require('@/common/header/index.js');
var _mm = require('util/mm.js');

var navSide = require('@/common/nav-side/index.js');
 navSide.init({
	name: 'user-center'
 });

// navSide.init({
	// name: 'order-list'
// });

//navSide.init({
//	name: 'user-pass-update'
//});

//navSide.init({
//	name: 'about'
//});

/*_mm.request({
	//url: './xx.do', //错误接口❌
	url: '/product/list.do?keyword=1',
	success: function(res){
		console.log("这是我们从网络接口中获取的数据：", res);
	},
	error: function(errMsg){
		console.log(errMsg);
	}
});*/

// console.log(_mm.getUrlParam('test'));

// 提供模板
// var html = '<div>{{ data }}</div>';
// 提供数据
// var data = {
// 	data: 123
// }
// console.log(_mm.renderHtml(html, data));