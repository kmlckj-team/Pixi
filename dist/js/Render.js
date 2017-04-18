

function Render(obj) {
  this.object = obj;
  var cacheWith = obj.with || 200;
  var cacheHeight = obj.height || 200;
  this.cacheCanvas = document.createElement("canvas");
  this.cacheCtx = this.cacheCanvas.getContext("2d");
  this.cacheCanvas.width = cacheWith;
  this.cacheCanvas.height = cacheHeight;

}

/**
 * 绘制的总开关
 * @param  {Object} obj 图元json数据
 */
Render.prototype.drawNode = function(obj) {
  var type = obj.type;
  type = type.toLowerCase();
  type = type.replace('-','');
  var tagName = type.charAt(0).toUpperCase() + type.slice(1);

  if (!this['draw' + tagName + 'Node']) {
    console.warn('No drawing behavior for ' + tagName + ' node');
  } else {
    this['draw' + tagName + 'Node'](obj);
  }
}

Render.prototype.drawPathgroupNode = function(obj) {
  var paths = obj.paths || [];
  for(var i in paths) {
    this.drawNode(paths[i]);
  }
}

Render.prototype.drawCircleNode = function(obj) {
  this.cacheCtx.save();
  this.setAttr(obj);
  this.cacheCtx.beginPath();
  this.cacheCtx.arc(obj.left,obj.top,obj.radius,0,2*Math.PI);
  this.cacheCtx.restore();
}

Render.prototype.setAttr(obj) {

}
