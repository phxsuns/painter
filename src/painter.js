/* 
 *  绘图类
 *  
 *  初始化参数
 *  @param {String} id 画布id
 *  @param {Object} size 画布大小{width:宽度,height:高度}
 *
 */

var painter = function(id, size){

	this.id = id || 'Painter'+ (999999 * Math.random() | 0);

	size = size || {width:100,height:100};
	this.width = size.width;
	this.height = size.height;

	this.canvas = null;
	this.ctx = null;
	this.layerList = [];

	this._createCanvas();

}

painter.prototype = {

	add: function(n){

	},

	del: function(n){

	},

	set: function(n){

	},

	sets: function(n){

	},

	find: function(n){

	},

	render: function(dom){
		dom.appendChild(this.canvas);
	},

	draw: function(){
		
	},

	_createCanvas: function(){
		var c = document.createElement('canvas');
		var ctx = c.getContext('2d');
		c.id = this.id;
		this.canvas = c;
		this.ctx = ctx;
	}

}
