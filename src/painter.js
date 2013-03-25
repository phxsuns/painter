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

	/* 在画布添加图层
	 * @param {String} type 图层的属性 (Text 和 Image 两类)
	 * @param {Object} pos 图层的在画布上的位置 {x:横坐标,y:纵坐标}
 	 * @param {int} zindex 图层的在画布上的层次
 	 * @param {Object} info 图层的内容
 	 * return painter对象
	 */
	add: function(type,info,pos,zindex){

	},

	/* 从画布删除图层
	 * @param {Layer} layer 图层对象
 	 * return painter对象
	 */
	del: function(layer){

	},

	/* 设置图层
	 * @param {Layer} layer 图层对象
	 * @param {key} key 设置属性
	 * @param {value} value 设置值
 	 * return painter对象
	 */
	set: function(layer,key,value){

	},

	sets: function(layer,info){

	},

	find: function(layer){

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
