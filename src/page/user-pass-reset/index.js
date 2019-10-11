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
	// 备用
	data: {
		username:'',
		question: '',
		answer:'',
		token:''
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		this.loadStepUsername();
	},
	// 加载输入用户名的一步
	loadStepUsername: function(){
		$('.step-username').show();
	},
	// 加载输入密码提示问题的一步
	loadStepQusetion: function(){
		
		formError.hide();
		$('.step-username').hide()
		.siblings('.step-question').show()
		.find('.question').text(this.data.question)
	},
	// 加载输入密码的一部
	loadStepPassword: function(){
		formError.hide();
		$('.step-question').hide()
		.siblings('.step-password').show();
	},
	//绑定事件函数
	bindEvent: function(){
		var _this = this
		// 输入用户名,点击下一步
		$('#submit-username').click(function(){
			// 获取到输入的用户名字
			var username = $.trim($('#username').val());
			if(username){
				// 判断用户名是否存在
				_user.getQuestion(username,function(res){
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQusetion();
				},function(errMsg){
					formError.show(errMsg);
				});
			}else{
				formError.show('请输入用户名');
			}
		});
		
		$('#submit-question').click(function(){
			var answer = $.trim($('#answer').val());
			if(answer){
				_user.checkAnswer({
					username: _this.data.username,
					question: _this.data.question,
					answer: answer
				},function(res){
					_this.data.answer = answer;
					_this.data.token = res;
					_this.loadStepPassword();
				},function(errMsg){
					formError.show(errMsg);
				});
			}else{
				formError.show('请输入用户问题的答案');
			}
		});
		
		
		$('#submit-password').click(function(){
			var password = $.trim($('#password').val());
			if(password && password.length >= 6){
				_user.resetPassword({
					username: _this.data.username,
					passwordNew: password,
					forgetToken: _this.data.token
				},function(res){
					window,location.href = './user-result.html?type=pass-reset';
				},function(errMsg){
					formError.show(errMsg);
				})
				
			}else{
				// 如果密码为空或者长度<6
				formError.show('请输入不少于6位数的密码');
			}
		});
		// ==============
		
	},
	//提交表单的函数
	submit: function(){
		var _this = this
		
	}	
}
$(function(){
	page.init();
});










