

let EventEmitter = require('eventemitter3');

class Render extends EventEmitter
{
  constructor(graphics,obj) {
    super();
    this.graphics = graphics;
    this.object = obj;
    this.drawNode(obj)
  }

  drawNode(obj) {
    console.log(this.on());
    this.on('test',function(_obj) {
      console.log(_obj);
    })
  }

}

module.exports = Render;
