(function($){
	
	
	var Font = function(url,name){
		this.url = url || '';
		this.name = name || 'FontName'+ (999999 * Math.random() | 0);
	};
	
	Font.prototype.loaded = false;
	Font.prototype.canvas = null;
	Font.prototype.blankCanvas = '';
	
	/* Font.prototype._blankCanvas = {
		moz: 'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGklEQVRIie3BMQEAAADCoPVP7W8GoAAAAOANDi4AAUcnKGwAAAAASUVORK5CYII=',
		webkit: 'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAPklEQVRIS+3TsQ0AMAgEMdh/afr0D0XMACBZR9fR9NHdcnhNHjXqmIC4YrTvYtSoYwLiitH6Y3GJKybwX1wD6fcAH1bniBkAAAAASUVORK5CYII='
	}; */
	
	Font.prototype._createStyleNode = function(){
		var styleNode = document.createElement("style");
		styleNode.type = 'text/css';
		var styletext = "@font-face {\n";
		styletext += "  font-family: '" + this.name + "';\n";
		styletext += "  src: url('" + this.url + "');\n";
		styletext += "}";
		styleNode.innerHTML = styletext;
		$('head').append(styleNode);
	};
	
	Font.prototype._createTestCanvas = function(){
		var canvas = document.createElement('canvas');
		var $canvas = $(canvas);
		$canvas.appendTo('body');
		canvas.width = 30;
		canvas.height = 30;
		$canvas.css({
			'position':'absolute',
			'top':-30,
			'left':-30,
			'z-index':-99999,
			'visibility':'hidden'
		});
		this.blankCanvas = canvas.toDataURL().substring(22);
		this.canvas = canvas;
	};
	
	Font.prototype._writeTestToCanvas = function(){
		if(!this.canvas) this._createTestCanvas();
		var ctx = this.canvas.getContext('2d');
		ctx.clearRect(0,0,30,30); 
		ctx.textBaseline = 'top';
		ctx.font = '30px '+this.name;
		ctx.fillText("\u6C38",0,0);
		//return ctx;
	};
	
	Font.prototype._validateLoad = function(me){
		me._writeTestToCanvas();
		var code = me.canvas.toDataURL().substring(22);
		//if($.browser.mozilla) var ori = me._blankCanvas.moz;
		//else if($.browser.webkit) var ori = me._blankCanvas.webkit;
		var ori = me.blankCanvas;
		
		if(code == ori) setTimeout(function(){me._validateLoad(me)},50);
		else{
			me.onload();
			me.loaded = true;
		}
	}
	
	Font.prototype.load = function(){
		
		if(this.loaded){
			this.onload();
			return;
		}
		
		this._createStyleNode();
		this._validateLoad(this);
		
	};

	Font.prototype.onload = function(){};
	
	window.Font = Font;
	
})(jQuery)