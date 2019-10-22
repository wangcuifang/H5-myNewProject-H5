'use strict'

require('./index.css');
require('@/common/nav/index.js');
require('@/common/header/index.js');
var _mm = require('util/mm.js');

var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');

var page = {
	data: {
		selectedAddressId : null
	},
	// 页面的初始化
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		// 加载地址列表
		this.loadAddressList();
		// 加载商品清单
		this.loadProductList();
	},
	// 事件绑定
	// 先记住id，然后在加载的时候把状态回填
	bindEvent: function(){
		var _this = this;
		// 地址的选择
		$(document).on('click', '.address-item', function(){
			// 被点击的item项需要添加新的样式：红色边框
			$(this).addClass('active').siblings('.address-item').removeClass('active');
			// 必须先选择地址，先获取到id值，然后才能点击【提交按钮】
			_this.data.selectedAddressId = $(this).data('id')
		})
		// 监听数据的改变
		$(document).on('click', '.order-submit', function(){
			// 如果没有选择地址，那么这个shippingId为null
			var shippingId = _this.data.selectedAddressId;
			// 如果地址已经选择成功
			if (shippingId) {
				_order.createOrder({
					shippingId: shippingId
				}, function(res){
					//console.log(res);
					window.location.href = './payment.html?orderNumber=' + res.orderNo;
				}, function(errMsg){
					_mm.errTips(errMsg);
				})
			}
		})
	},
	// 加载地址列表函数
	loadAddressList: function(){
		var _this = this;
		$('.address-con').html('<div class="loading"></div>');
		// 获取地址列表
		_address.getAddressList(function(res){
			//console.log(res)

			var addressListHtml = _mm.renderHtml(templateAddress, res);
			$('.address-con').html(addressListHtml);
		}, function(errMsg){
			$('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
		})
	},
	// 加载商品清单函数
	loadProductList: function(){
		var _this = this;
		$('.product-con').html('<div class="loading"></div>');
		// 获取地址列表
		_order.getProductList(function(res){
			// console.log(res)

			var productListHtml = _mm.renderHtml(templateProduct, res);
			$('.product-con').html(productListHtml);
		}, function(errMsg){
			$('.product-con').html('<p class="err-tip">商品加载失败，请刷新后重试</p>');
		})
	}
}

$(function(){
	page.init();
})