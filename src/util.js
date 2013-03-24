/* 
 *  工具库
 *  
 *
 */

var util = {
	
	/* 
	 *  删除数组元素
	 *  @param {Array} 源数组
	 *  @param {init} 删除索引
	 *  return {Array} 处理过的数组
	 */
	arrRmEle : function(arr,index){
		var r = [];
		for(var i = 0; i < arr.length; i ++){
			if(i != index) r.push(arr[i]);
		}
		return r;
	},

	/* 
	 *  依据对象关键字数组排序
	 *  @param {Array} 源数组
	 *  @param {String} 关键字
	 *  @param {Boolean} 是否升序，默认升序
	 *  return {Array} 处理过的数组
	 */
	arrOrderByKey: function(arr,key,order){

	}
	
}