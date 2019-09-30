'use strict'
require('./index.css');
require('@/common/nav-simple/index.js');
require('node_modules/font-awesome/css/font-awesome.min.css');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');
// 错误提示的对象
var formError = {
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
		$('.user-content').keyup(function(e){
			if(e.keyCode === 13){
				_this.submit()
			}
		})
		// 失去焦点的时候进行验证
		$('#username').blur(function(){
			var username = $.trim($('this').val());
			// 如果用户名为空则返回,不做处理
			if(!username){
				formError .hide();
				return
			}
			// 如果用户名不为空,则进行用户名的异步验证
			_user.checkUsername(username,function(res){
				formError.hide();
			},function(errMsg){
				formError.show(errMsg);
			});
		})
	},
	
	//提交表单的函数
	submit: function(){
		var _this = this
		//从表单
		var formData = {
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val()),
			passwordConfirm: $.trim($('#password-confirm').val()),
			phone: $.trim($('#phone').val()),
			email: $.trim($('#email').val()),
			question: $.trim($('#question').val()),
			answer: $.trim($('#answer').val())
		};
// 		console.log("name =",formData.username)
// 		console.log("password",formData.password)
		//表单验证结果
		var validateResult = this.formValiDate(formData);
		// console.log(validateResult.status = ', validateResult.status');
		// 如果前端验证成功
		if(validateResult.status){
			console.log("表单验证成功，服务端验证...");
			_user.register(formData,function(){
				window.location.href = './user-result.html?type=register'
			},function(errMsg){
				// 错误提示
				
				formError.show(errMsg);
			});
		}else{
			formError.show(validateResult.msg);
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
		// 验证密码长度
		if(formData.password.length < 6){
			result.msg = '密码长度不能少于6位';
			return result;
		}
		// 验证两次密码是否一致
		if(formData.password !== formData.passwordConfirm){
			result.msg = '两次输入密码不相同';
			return result;
		}
		// 验证手机号
		if(!_mm.validate(formData.phone,'phone')){
			result.msg = '手机号格式不正确';
			return result;
		}
		// 验证邮箱格式是否为空
		if(!_mm.validate(formData.email,'email')){
			result.msg = '邮箱格式不正确';
			return result;
		}
		if(!_mm.validate(formData.question,'require')){
			result.msg = '密码提示问题不能为空';
			return result;
		}
		if(!_mm.validate(formData.answer,'require')){
			result.msg = '密码提示问题答案不能为空';
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










