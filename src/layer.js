/* 
 *  图层类
 *  
 *  初始化参数：
 *  @param {String} type 图层的属性 (当前仅处理 Text 和 Image 两类)
 *  @param {Object} pos 图层的在画布上的位置 形式{x:横坐标,y:纵坐标}
 *  @param {Object} info 图层的内容
 *  	Text类型下 {text:内容,font:字体名,bold:粗细,color:颜色,size:字号[,fontSrc:字体文件URL,fontObj:字体对象]}
 *  	Image类型下 {src:图片URL[,image:图像对象]}
 *
 */

var layer = function(type,pos,info){

	this.type = type;
	this.pos = pos;

}
