! function () {
  var view = document.querySelector('#topNavBar')

  var controller = {
    view: null,
    init: function (view) {
      this.view = view
      this.bindEvents()//this.bindEvents.call(this)
    },
    bindEvents: function () {
      var view = this.view
      //箭头函数内外this不变
      window.addEventListener('scroll',(x)=>{
        if(window.scrollY > 0){
          this.active()
        }else{
          this.deactive()
        }
      })
    },
      /*  addEventListener的this是用户触发的元素,
      所以需要加bind(this),绑定外面的this
      window.addEventListener('scroll', function (x) {
        if (window.scrollY > 0) {
          this.active()
        } else {
          this.deactive()
        }
      }.bind(this))
    },*/
    active:function(){
      this.view.classList.add('sticky')
    },
    deactive:function(){
      this.view.classList.remove('sticky')
    }
  }
  controller.init(view)
  //controller.init.call(controller)
}.call()