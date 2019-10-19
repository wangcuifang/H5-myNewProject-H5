'use strict'

require('./index.css');
require('@/common/nav/index.css');
require('@/common/header/index.js');

var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');
var addressModal = require('./address-modal.js');

var page = {
	data: {
		selectedAddressId: null
	},
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		this.loadAddressList();
		this.loadProductList();
	},
	bindEvent: function(){
		var _this = this;
		//地址的选择
		$(document).on('click','.address',function(){
			$(this).addClass('active')
			.siblings('.address-item').removeClass('active');
			//先记住id，然后再加载的时候再把状态填回去
			_this.data.selectedAddressId = $(this).data('id');
			
		})
		
		$(document).on('click','order-submit', function(){
			var shippingId = _this.data.selectedAddressId;
			if(shippingId){
				_order.creatOrder({
					shippingId: shippingId
				},function(res){
					window.loadtion.href = './payment.html?orderNumber=' + res.orderNo;
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else{
				_mm.errorTips('请选择地址后再提交');
			}
		})
		
	},
	
	//加载地址列表
	loadAddressList: function(){
		var _this = this;
		$('.address-con').html('<div calss="loading"></div>');
		//获得地址列表
		_address.getAddressList(function(res){
			//加载地址列表前先对地址做一个过滤，然后再去渲染
			_this.addressFilter(res);
			var addressListHtml = _mm.renderHtml(templateAddress, res);
			$('.address-con').html(addressListHtml);
		},function(errMsg){
			$('.address-con').html('<p calss="err-tip">地址加载失败，请刷新后重试。</div>')
		})
	},
		//加载商品清单
	loadProductList: function(){
		var _this = this;
		$('.product-con').html('<div calss="loading"></div>');
		//获得商品列表
		_order.getProductList(function(res){
			var productListHtml = _mm.renderHtml(templateProduct, res);
			$('.product-con').html(productListHtml);
		},function(errMsg){
			$('.product-con').html('<p calss="err-tip">地址加载失败，请刷新后重试。</div>')
		})
	},
	
	
	
	
}



$(function(){
	page.init();
})








