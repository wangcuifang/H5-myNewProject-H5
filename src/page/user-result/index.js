'use strict'
require('./index.css');
require('../common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	//通过浏览器地址获取参数，然后拼接成class
	var type = _mm.getUrlParam('type') || 'default',
	$element = $('.' + type + '-success');
	//显示对应的提示元素
	$element.show();
})


