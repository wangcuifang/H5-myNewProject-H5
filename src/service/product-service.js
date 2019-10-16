'use strict'
var _mm = require('util/mm.js');
var product = {
	//
	getProductList: function(listParam,resolve,reject){
		_mm.request({
			url: _mm.getServerUrl('/product/list.do'),
			data: listParam,
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	//2.获得商品详情
	getProductDetail: function(productId,resolve,reject){
		_mm.request({
			url: _mm.getServerUrl('/product/detail.do'),
			data: {
				productId: productId
			},
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
	addToCart: function(productId,resolve,reject){
		_mm.request({
			url: _mm.getServerUrl('/cart/add.do'),
			data: productInfo,
			method: 'POST',
			success: resolve,
			error: reject
		});
	},
}

module.exports = product;



