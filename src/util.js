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
		arr.splice(index,1);
		return arr;
	},

	/* 
	 *  依据对象关键字 数组排序
	 *  @param {Array} 源数组
	 *  @param {String} 关键字(值需要为int类型)
	 *  @param {Boolean} 是否升序，默认升序
	 *  return {Array} 处理过的数组
	 */
	arrSortByKey: function(arr,key,order){
		if(typeof order == 'undefined') order = true;
		for(var i = 0; i < arr.length - 1; i++){
			for (var ii = 0; ii < arr.length - i - 1; ii++){
				if(arr[ii][key] > arr[ii+1][key]){
					var t = arr[ii];
					arr[ii] = arr[ii+1];
					arr[ii+1] = t;
				}
			}
		}
		if(!order) arr.reverse();
		return arr;
	},

	/* 
	 *  依据对象关键字 数组找索引
	 *  @param {Array} 源数组
	 *  @param {String} 关键字
	 *  @param {} 关键字值
	 *  return {int} 索引
	 */
	arrIndexOfByKey: function(arr,key,value){
		for(var i = 0; i < arr.length; i++){
			if(arr[i][key]===value) return i;
		}
		return -1;
	}
	
}