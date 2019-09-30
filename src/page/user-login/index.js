'use strict'
require('./index.css');
require('@/common/nav-simple/index.js');
require('node_modules/font-awesome/css/font-awesome.min.css');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');
// 错误提示的对象
var fromError = {
	show: function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide: function(){
		$('.error-item').hide().find('.err-msg').text('');
	}
}

var page = {
	init: function(){
		this.bindEvent();
	},
	//绑定事件函数
	bindEvent: function(){
		var _this = this
		$('#submit').click(function(){
			_this.submit();
		})
		$('.user-context').keyup(function(e){
			if(e.keyCode === 13){
				_this.submit()
			}
		})
	},
	//提交表单的函数
	submit: function(){
		var _this = this
		//从表单
		var formData = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val()),
		};
		console.log("name =",formData.username)
		console.log("password",formData.password)
		//表单验证结果
		var validateResult = _this.formValiDate(formData);
		console.log(validateResult.status = ', validateResult.status');
		// 如果前端验证成功
		if(validateResult.status){
			console.log("表单验证成功，服务端验证...");
			_user.login(formData,function(){
				window.location.href =decodeURIComponent( _mm.getUrlParam('redirect')) || './index.html';
				// window.location.href = _mm.getUrlParam('redirect') || './index.html';
				// window.location.href = './index.html';
			},function(errMsg){
				// 错误提示
				
				fromError.show(errMsg);
			});
		}else{
			formError: show(validateResult.msg);
		}
		
	},
	//表单验证函数开发
	formValiDate: function(formData){
		// 空的结果对象
		var result = {
			status: false,
			msg:''
		};
		// 验证用户名
		if(!_mm.validate(formData.username,'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		// 验证密码
		if(!_mm.validate(formData.password,'require')){
			result.msg = '密码不能为空';
			return result;
		}
		//如果通过验证，则返回正确的提示
		result.status = true;
		result.msg = '验证通过';
		//返回验证的结果对象
		return result;
	}
};
$(function(){
	page.init();
});










