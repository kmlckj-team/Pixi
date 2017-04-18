
new Vue({
  el: '#app',
  data:{
    t1:0,
    t2:0,
    t:0
  },
  mounted: function () {
    this.$nextTick(function () {
      // this.startTimer();
      this.initScada();
      this.getObjects();
      this.switchRender();
      this.initPixi();
      // this.testDraw();
      // this.scada.Render.drawNode(1,2);
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
      this.container = new PIXI.Container();
      this.app = new PIXI.autoDetectRenderer(1200, 900, {backgroundColor : 0x1099bb});
      document.getElementById('app').appendChild(this.app.view);
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
      })
    },
    test1: function() {
      this.app.render(this.container);
      console.log(this.scada);
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

    setAttribute: function(graphics,obj) {
      graphics.x = obj.left;
      graphics.y = obj.top;
      graphics.width = obj.width;
      graphics.height = obj.height;
      graphics.scale.x = obj.scaleX;
      graphics.scale.y = obj.scaleY;
    },

    renderSvg: function(obj) {
      // console.log(obj);
      var svg = this.parseDom(obj);
      var _svg = '';
      for(var i in svg){
        if(svg[i].nodeName == 'svg') {
          _svg = svg[i];
        }
      }
      var graphics = new PIXI.Graphics();

      this.container.addChild(graphics);
      SVGGraphics.drawSVG(graphics, _svg);
      graphics.x = 111;
      graphics.y = 111;
      graphics.width = 100;
      graphics.height = 100;
      this.app.render(this.container);
    },

    /**
     * 渲染矩形
     * @param  {Object} obj 矩形json数据
     * @return {[type]}     [description]
     */
    renderRect: function(obj) {
      var fillColor = color2color(obj.fill,'int');
      var strokeColor = '';
      if(obj.stroke) {
        strokeColor = color2color(obj.stroke,'int');
      }
      var graphics = new PIXI.Graphics();
      if(obj.stroke) {
        graphics.lineStyle(obj.strokeWidth, strokeColor, 1);
      }
      graphics.beginFill(fillColor, obj.opacity);
      // graphics.drawRoundedRect(obj.left, obj.top, obj.width, obj.height, 0);
      graphics.drawRect(0,0,100,100);
      graphics.endFill();
      // this.container.addChild(graphics);
      //属性设置
      graphics.x = obj.left;
      graphics.y = obj.top;
      graphics.width = obj.width;
      graphics.height = obj.height;
      graphics.scale.x = obj.scaleX;
      graphics.scale.y = obj.scaleY;
      this.container.addChild(graphics);
      this.app.render(this.container);
    },

    /**
     * 渲染路径的方法 type="path"
     * @param  {Object} obj [description]
     * @return {[type]}     [description]
     */
    renderPath:function(obj){

      var graphics = new PIXI.Graphics();
      this.container.addChild(graphics);
      SVGGraphics.drawSVG(graphics, obj,this.container);
      this.setAttribute(graphics,obj);
      this.app.render(this.container);
      this.stopTimer();
      // document.getElementById('timeLine').innerHtml(this.stopTimer);
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
