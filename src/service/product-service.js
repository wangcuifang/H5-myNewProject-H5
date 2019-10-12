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
	}
}

module.exports = product;



