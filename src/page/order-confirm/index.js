'use strict'

require('./index.css');
require('@/common/nav/index.js');
require('@/common/header/index.js');
var _mm = require('util/mm.js');

var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');
var addressModal = require('./address-modal.js');

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
		});
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
			}else{
				_mm.errorTips('请选择地址后提交');
			}
		});
		// 地址的添加
		$(document).on('click', '.address-add', function(){
			addressModal.show({
				isUpdate: false,
				onSuccess: function(){
					// 添加成功的时候要及时加载地址列表
					_this.loadAddressList();
					_this.loadProductList();
				}
			})
		});
		//地址的编辑
		$(document).on('click','.address-update',function(e){
			e.stopPropagation();
			var shippingId= $(this).parents('.address-item')
			.data('id');
			_address.getAddress(shippingId, function(res){
				//如果成功，就打开Mpdal窗
				addressModal.show({
					isUpdate: true,
					data: res,
					onSuccess: function(){
						_this.loadAddressList();
					}
				})
			},function(errMsg){
				//如果失败，打印失败信息
				_mm.errorTips(errMsg);
			})
		});
		//地址的删除
		$(document).on('click','.address-delete', function(e){
			e.stopPropagation();
			var id = $(this).parents('.address-item').data('id');
			if(window.confirm('确认要删除地址吗？')){
				_address.deleteAddress(id, function(res){
					_this.loadAddressList();
				},function(errMsg){
					_mm.errorTips(errMsg);
				})
			}
		});
		
	},
	// 加载地址列表函数
	loadAddressList: function(){
		var _this = this;
		$('.address-con').html('<div class="loading"></div>');
		// 获取地址列表
		_address.getAddressList(function(res){
			//console.log(res)
			_this.addressFilter(res);
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
	},
	//处理地址列表中的选中状态
	addressFilter: function(data){
		$('.address-con').html('<div class="loading"></div>');
		if(this.data.selectedAddressId){
			var selectedAddressIdFlag = false;
			for (var i = 0, length = data.list.length; i < length; i++){
				if(data.list[i].id == this.data.selectedAddressId){
					data.list[i].isActive = true;
					selectedAddressIdFlag = true;
				}
			}
			if(!selectedAddressIdFlag){
				this.data.selectedAddressId = null;
			}
		}
	},
	
}

$(function(){
	page.init();
})
