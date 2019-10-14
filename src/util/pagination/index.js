'use strict'

require('./index.css');
var _mm = require('util/mm.js');
var templatePagination = require('./index.string');

var Pagination = function(){
	var _this = this;
	this.defaultOption = {
		container: null,
		pageNum: 1,//默认第一页
		pageRange: 4, //显示几个页码按钮
		onSelectPage: null
	}
	$(document).on('click', '.pg-item', function(){
		var $this = $(this);
		if($this.hasClass('active') || $this.hasClass('disabled')){
			return;
		}
		typeof _this.option.onSelectPage === 'function' ?
		_this.option.onSelectPage($this.data('value')) : null;
	});
}
Pagination.prototype.render = function(userOption){
	// 合并选项
	this.option = $.extend({}, this.defaultOption, userOption);
	if(!(this.option.container instanceof jQuery)){
		return;
	}
	// 判断是否只有一页
	if(this.option.pages <= 1){
		return;
	}
	this.option.container.html(this.getPaginationHtml());
}
Pagination.prototype.getPaginationHtml = function(){
	// 获取分页HTML
	var html = '',
	option = this.option,
	pageArray = [],
	start = (option.pageNum - option.pageRange > 0) ? 
		(option.pageNum - option.pageRange) : 1,
	end = (option.pageNum + option.pageRange < option.pages) ? 
		(option.pageNum + option.pageRange) : option.pages;
	//上一页按钮的数据
	pageArray.push({
		name: '上一页',
		value: this.option.prePage,
		//如果当前页有上一页那么sisacled就是false
		disabled: !this.option.hasPreviousPage
	});
	for(var i = start; i <= end; i++){
		pageArray.push({
			name: i,
			value: i,
			active: (i === option.pageNum)
		})
	}
	pageArray.push({
		name: '下一页',
		value: this.option.nextPage,
		//如果当前页有上一页那么sisacled就是false
		disabled: !this.option.hasNextPage
	});
	html = _mm.renderHtml(templatePagination,{
		pageArray: pageArray,
		pageNum: option.pageNum,
		pages: option.pages
	})
	return html;
}

module.exports = Pagination;


