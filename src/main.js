
/**
 * @author Garens
 * @date 2017年4月7日10:12:15
 */
 let EventEmitter = require('eventemitter3');
 let Render = require('./render');


class Scada extends EventEmitter
{
  constructor(objs) {
    super();
    this.objects = objs;
    this.Render = new Render(111,222);
  }

  init(objs) {
    this.objects = objs;
    this.distCenter();
  }

  distCenter() {
    let objs = this.objects;
    for(var i in objs) {
      if(objs[i].type != 'svg') {
        objs[i].data = JSON.parse(objs[i].data);
      }
      this.emit(objs[i].type,objs[i].data);
      // switch (objs[i].type) {
      //   case 'path':
      //       // new RenderPath(objs[i]);
      //       this.emit('path',objs[i].data);
      //     break;
      //   default:
      //     break;
      // }
    }
  }

  /**
   * 此处必须要设置为this._objects，否则会Uncaught RangeError: Maximum call stack size exceeded错误
   * @return {Array} objects
   */
  get objects()
  {
    return this._objects;
  }

  set objects(arr)
  {
    this._objects = arr;
  }

}

// function Scada(){
//   console.log(123);
// }
// Scada.prototype.init = function(objs){
//   this.objs = objs;
//   console.log(1);
// }
//
module.exports = Scada;
