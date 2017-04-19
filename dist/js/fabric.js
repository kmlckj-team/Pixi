
new Vue({
  el: '#app',
  data:{
    t1:0,
    t2:0,
    t:0
  },
  mounted: function () {
    this.$nextTick(function () {
      this.initScada();
      this.getObjects();
      this.initPixi();
    })
  },
  filters: {
    /**
     * 毫秒转秒的过滤器
     * @param  {Number} time 要格式化的毫秒数
     * @return {Float}      格式好的两位小数的秒数
     */
    formatTime: function(time) {
      return (time/1000).toFixed(2);
    }
  },
  methods:{
    initPixi:function(){
      var canvas = document.createElement("canvas");
      canvas.id = 'canvas';
      canvas.width = 1200;
      canvas.height = 900;
      document.getElementById('app').appendChild(canvas);
      this.canvas = new fabric.Canvas('canvas',{backgroundColor:'#1099bb'});
    },
    initScada: function() {
      // var scada =
      this.scada = new Scada();
    },
    getObjects: function() {
      var _this = this;
      axios.get('/getDeviceList').then(function(res){
        console.log(res);
        var objs = res.data;
        console.log(objs);
        _this.scada.init(objs);
        _this.objects = [];
        var type = ['path','group','path-group','rect'];
        for(var i in objs) {
          if(!type.includes(objs[i].type)) {
            continue;
          }
          _this.objects.push(objs[i].data);
        }
        _this.test1();
      })
    },
    test1: function() {
      var _this = this;
      this.startTimer();
      var json = {objects:this.objects,backgroundColor:'#1099bb'}
      this.canvas.loadFromJSON(json, function(){
        _this.canvas.renderAll();
        _this.stopTimer();
      });
    },
    /**
     * 根据不同type进行渲染不同类型图元总开关
     * @return {[type]} [description]
     */
    switchRender: function() {
      var _this = this;
      this.startTimer();
      this.scada.on('path',function(obj) {
          _this.renderPath(obj);
      });
      this.scada.on('group',function(obj) {
          _this.renderPath(obj);
      });
      this.scada.on('path-group',function(obj) {
          _this.renderPath(obj);
      });
      this.scada.on('rect',function(obj) {
          _this.renderPath(obj);
      });
      // this.scada.on('svg',function(obj) {
      //     _this.renderSvg(obj);
      // });

    },

    startTimer () {
      this.t1 = new Date().getTime();
      return this.t1;
    },
    stopTimer () {
      this.t2 = new Date().getTime();
      this.t = this.t2 - this.t1;
      return this.t;
    },
    parseDom: function(arg) {
      var objE = document.createElement("div");
      objE.innerHTML = arg;
      console.log(objE);
      return objE.childNodes;
    },

    /**
     * 测试渲染多个图元
     * @return {[type]}            [description]
     */
    testDraw() {
      var _this = this;
      for (var i = 0; i < 1000; i++) {
          createBunny(
              Math.floor(Math.random() * 1400),
              Math.floor(Math.random() * 800)
          );
        }

          function createBunny(x, y) {
            var graphics = new PIXI.Graphics();

            // set a fill and line style
            graphics.beginFill(0xFF3300);
            graphics.lineStyle(4, 0xffd900, 1);

            // draw a shape
            graphics.moveTo(50,50);
            graphics.lineTo(250, 50);
            graphics.lineTo(100, 100);
            graphics.lineTo(50, 50);
            graphics.endFill();
              graphics.x = x;
              graphics.y = y;
              graphics.scale = {x:0.5,y:0.5};

              _this.container.addChild(graphics);
            }

        }
  }
})
