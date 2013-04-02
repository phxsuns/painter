/* 
 *  绘图类
 *  
 *  初始化参数
 *  @param {String} id 画布id
 *  @param {object} size 画布大小{width:宽度,height:高度}
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
	this.idCount = 0;

	this.eventList = {};

	this._createCanvas();

}

painter.prototype = {

	/* 在画布添加图层
	 * @param {String} type 图层的属性 (Text 和 Image 两类)
	 * @param {object} info 图层的内容
	 * @param {object} pos 图层的在画布上的位置 {x:横坐标,y:纵坐标}
 	 * @param {int} zindex 图层的在画布上的层次
 	 * return 图层对象id
	 */
	add: function(type,info,pos,zindex){
		if(type != 'Text' && type != 'Image') return this;
		pos = pos || {x:0,y:0};
		zindex = zindex || 0;
		var l = new layer(type,pos,zindex,info);
		l.setId(this.idCount++).setCavans(this.ctx);
		this.layerList.push(l);
		return l.id;
	},

	/* 从画布删除图层
	 * @param {Layer} layer 图层对象 或 id
 	 * return painter对象
	 */
	del: function(layer){
		var id = (typeof layer == 'number' || typeof layer == 'string') ? Number(layer) : layer.id;
		var index = util.arrIndexOfByKey(this.layerList,'id',id);
		util.arrRmEle(this.layerList,id);
		return this;
	},

	/* 设置图层
	 * @param {Layer} layer 图层对象 或 id
	 * @param {String} key 设置属性
	 * @param {} value 设置值
 	 * return painter对象
	 */
	set: function(layer,key,value){
		if(typeof layer == 'number' || typeof layer == 'string') layer = this.find(layer);
		switch(key){
			case 'x':
				var y = layer.getPos().y;
				layer.setPos({x:value,y:y});
				break;
			case 'y':
				var x = layer.getPos().x;
				layer.setPos({x:x,y:value});
				break;
			case 'pos':
				layer.setPos(value);
				break;
			case 'zindex':
				layer.setZindex(value);
				break;
			case 'text':
				layer.setText({text:value});
				break;
			case 'color':
				layer.setText({color:value});
				break;
			case 'size':
				layer.setText({size:value});
				break;
			case 'bold':
				layer.setText({bold:value});
				break;
			case 'font':
				layer.setText({fontObj:value});
				break;
			case 'image':
				layer.setImage({src:value});
				break;
		}
		return this;
	},

	/* 批量设置图层
	 * @param {Layer} layer 图层对象 或 id
	 * @param {object} info 设置值（键值对）
 	 * return painter对象
	 */
	sets: function(layer,info){
		if(typeof layer == 'number' || typeof layer == 'string') layer = this.find(layer);
		for(v in info){
			this.set(layer,v,info[v]);
		}
		return this;
	},

	/* 查找图层
	 * @param {Layer} layer id
 	 * return layer对象
	 */
	find: function(layer){
		var index = util.arrIndexOfByKey(this.layerList,'id',layer);
		return this.layerList[index];
	},

	/* 画布渲染至dom节点
	 * @param {Dom} 源生dom对象
 	 * return layer对象
	 */
	render: function(dom){
		dom.appendChild(this.canvas);
		return this;
	},

	/* 将所有图层绘制到画布
	 *
	 */
	draw: function(){
		this.clean();
		var arr = util.arrSortByKey(this.layerList,'zindex');
		this._draw(0);
	},

	clean: function(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); 
		return this;
	},

	/* 绑定事件
	 * @param {string} type 事件名
	 * @param {function} cb 事件回调 
 	 * return painter对象
	 */
	on: function(type,cb){
		if(!type) return this;
		cb = cb || function(){};
		this.eventList[type] = this.eventList[type] || [];
		this.eventList[type].push(cb);
		return this;
	},

	/* 解绑事件
	 * @param {string} type 事件名
 	 * return painter对象
	 */
	un: function(type){
		if(!type) return this;
		this.eventList[type] = [];
		return this;
	},

	_doEvent: function(type){
		this.eventList[type] = this.eventList[type] || [];
		for(var i = 0;i < this.eventList[type].length; i++){
			this.eventList[type][i]();
		}
	},

	_draw: function(i){
		var me = this;
		this.layerList[i].onDrawComplete = function(){
			if(i<me.layerList.length - 1) me._draw(i+1);
			else me._doEvent('drawComplete');
		};
		this.layerList[i].draw();
	},

	_createCanvas: function(){
		var c = document.createElement('canvas');
		var ctx = c.getContext('2d');
		c.id = this.id;
		c.width = this.width;
		c.height = this.height;
		this.canvas = c;
		this.ctx = ctx;
	}

}
