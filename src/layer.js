/* 
 *  图层类
 *  
 *  初始化参数：
 *  @param {String} type 图层的属性 (当前仅处理 Text 和 Image 两类)
 *  @param {Object} pos 图层的在画布上的位置 {x:横坐标,y:纵坐标}
 *  @param {int} zindex 图层的在画布上的层次
 *  @param {Object} info 图层的内容
 *  	Text类型下 {text:内容,font:字体名,bold:粗细,color:颜色(css值),size:字号(像素，不带单位)[,fontSrc:字体文件URL,fontObj:字体对象]}
 *  	Image类型下 {src:图片URL,width:显示宽度,height:显示高度[,image:图像对象]}
 *
 */

var layer = function(type,pos,zindex,info){

	this.type = type;
	this.pos = pos;
	this.zindex = zindex;

	this.obj = {};
	this.canvas = null;
	this.ready = false;

	if(this.type == 'Text'){

		this.text = info.text || '';
		this.property = {
			font: info.font,
			bold: info.bold || 'normal',
			color: info.color || '#000000',
			size: info.size || 12
		}

		if(info.fontObj) this.loadFont(info.fontObj);
		else if(info.fontSrc) this.loadFont(info.fontSrc);
		else if(!info.font){
			this.property.font = 'Microsoft Yahei';
			this.ready = true;
		}
		else this.ready = true;

	}else if(this.type == 'Image'){

		this.property = {};

		if(info.image){
			this.loadImage(info.image);
			this.src = info.image.src;
		}else{
			this.loadImage(info.src);
			this.src = info.src;
		}

		this.width = info.width || 0;
		this.height = info.height || 0;

	}

}

layer.prototype = {

	setCavans: function(canvas){
		this.canvas = canvas;
		return this;
	},

	setPos: function(pos){
		this.pos = pos;
		return this;
	},
	getPos: function(){
		return this.pos;
	},

	setZindex: function(zindex){
		this.zindex = zindex;
		return this;
	},
	getZindex: function(){
		return this.zindex;
	},

	setText: function(info){
		for(v in info){
			if(v == 'text' || v == 'font' || v == 'bold' || v == 'color' || v == 'size') this.property[v] = info[v];
			else if(v == 'fontSrc' || v == 'fontObj') this.loadFont(info[v]);
		}
		return this;
	},

	setImage: function(info){
		if(info.image){
			this.loadImage(info.image);
			this.src = info.image.src;
		}else{
			this.loadImage(info.src);
			this.src = info.src;
		}
		return this;
	},

	draw: function(){
		if(!this.canvas) return this;

		var me = this;

		setTimeout(function(){
			if(me.ready){
				if(me.type == 'Text') me._drawHandlerText();
				else if(me.type == 'Image') me._drawHandlerImage();
			}
			else setTimeout(arguments.callee,10);
		},10);

		return this;
	},

	onDrawComplete: function(){},

	_drawHandlerText: function(){
		var c = this.canvas;
		c.textBaseline = 'top';
		c.font = this.property.bold + ' ' + this.property.size + 'px ' + this.property.font;
		c.fillStyle = this.property.color;
		c.fillText(this.text,this.pos.x,this.pos.y);
		this.onDrawComplete();
	},

	_drawHandlerImage: function(){
		var c = this.canvas;
		c.drawImage(this.obj.image, this.pos.x, this.pos.y, this.width, this.height);
		this.onDrawComplete();
	},

	loadFont: function(src){

		var me = this;
		me.ready = false;

		if(typeof src == 'string') var font = new Font(src);
		else var font = src;
		font.bindload(function(){
			me.property.font = font.name;
			me.obj.font = font;
			me.ready = true;
		}).load();

	},

	loadImage: function(src){

		var me = this;
		me.ready = false;

		if(typeof src == 'string'){
			var img = new Image();
			var url = src;
		} else {
			var img = src;
			var url = img.src;
		}
		img.onload = function(){
			me.obj.image = img;
			me.property.width = img.width;
			me.property.height = img.height;
			me.ready = true;
			me.width = me.width || img.width;
			me.height = me.height || img.height;
		}
		img.src = url;

	}


}
