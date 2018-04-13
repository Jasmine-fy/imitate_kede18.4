require(['config'],function(){
require(['jquery','flexslider','common'],function($,a){

    // 首页的二级菜单先存在
    var $k_nav = $('#k_nav');
    var $nav_tab1 = $k_nav.find('.tab1');
    $nav_tab1.css('display','none');

    // 鼠标移动到二级菜单
    var $tab1_li = $nav_tab1.children();

    $k_nav.find('.left').on('mouseenter','h3',function(){
        $nav_tab1.css('display','block');
    }).on('mouseleave',function(){
        $nav_tab1.css('display','none');
    })

    // 生成二级菜单底边框点线
    for(var i=0;i<$tab1_li.length-1;i++){
        var $tab1_bottom = $('<div/>');
        $tab1_bottom.addClass('mybottom');
        $tab1_li.get(i).appendChild($tab1_bottom[0]);
    }
    // 生成二级菜单与三级菜单的。。。略
    for(var i=0;i<$tab1_li.length;i++){
        var $tab1_right = $('<div/>');
        $tab1_right.addClass('myright');
        $tab1_li.get(i).appendChild($tab1_right[0]);        
    }

    // 鼠标移动到二级菜单出现三级菜单
    $nav_tab1.on('mouseenter','>li',function(){
        $(this).css({
            'border-right':"5px solid #fff",
            'height':'45px',
            'line-height':'45px'
        });
        $(this).find('i.right').css('display',"none");
        $(this).find('.mybottom').css('display',"none");
        $(this).find('.myright').css('display',"block");
        $(this).find('.child_list').css('display','block');
    }).on('mouseleave','>li',function(){
        $(this).css({
            'border-right':"0 none",
            'height':'46px',
            'line-height':'46px'
        });
        $(this).find('i.right').css('display',"block");
        $(this).find('.mybottom').css('display',"block");
        $(this).find('.myright').css('display',"none");
        $(this).find('.child_list').css('display','none');
    });

// -------------回到顶部动画------------------------
    var $goBack = $('.k_right .li5');
    $goBack.on('click',function(){
        var timer = setInterval(function(){
            var speed = parseInt(window.scrollY/4);
            if(speed <= 0){
                speed = 0;
                clearInterval(timer);
            }
            scrollBy(0,-speed);
        },30)
    })

// -------------传入数据---------------------------
    var data = (function(){
        var accept;
        ajax({
            url:"../api/link.php",
            async:false,
            success:function(data){
                accept = data;
            }
        });
        return accept;
    })();
    var id = location.search.slice(4);
    var res = {};
    for(var i=0;i<data.length;i++){
      if(data[i].id == id){
        res = data[i];
      }
    }
    // 获取页面数据
    var $small_box = $('#k_main .small_box');
    var $wrapper = $('#k_main .wrapper');
    var $myLi = $wrapper.find('li').first();
    var $big_box = $('#k_main .big_box');
    var $name = $('#k_main .name');
    var $price = $('#k_main .price');

    $small_box.find('img').attr('src',`${res.imgurl}`);
    $myLi.attr('data-src',`${res.imgurl}`);
    $myLi.find('img').attr('src',`${res.imgurl}`)
    $big_box.find('img').attr('src',`${res.imgurl}`);
    $name.text(`${res.name}`);
    $price.text(`${res.price}`);

    // 计算价格
    var $caculate1 = $('#k_main .you .amount');
    var $caculate2 = $('#k_main .zuo .amount');
    var $plus1 = $caculate1.find('.plus');
    var $plus2 = $caculate2.find('.plus');
    var $minus1 = $caculate1.find('.minus');
    var $minus2 = $caculate2.find('.minus');
    var $input1 = $caculate1.find(':input');
    var $input2 = $caculate2.find(':input');

    var qty = 1;
    $input1.val(qty);
    $input2.val(qty);
    $plus1.on('click',function(){
       $input1[0].value++;
    });
    $plus2.on('click',function(){
       $input2[0].value++;
    });
    $minus1.on('click',function(){
       $input1[0].value--;
       if($input1[0].value <= 1){
          $input1[0].value = 1;
       }
    });
    $minus2.on('click',function(){
       $input2[0].value--;
       if($input2[0].value <= 1){
          $input2[0].value = 1;
       }
    });

// -----------实现头部，右边购物车数据--------------------------
  var more_data = Cookie.get('more_data') || [];
    if(typeof more_data === 'string'){
        more_data = JSON.parse(more_data);
    };
  Cookie.set("more_data",JSON.stringify(more_data),{path:"/"});

  // 头部的商品数量
  var $head_amount = $('#k_header .h_right .li4 span');
  $head_amount.text(more_data.length);

  // 右边购物车的商品数量
  var $myCart = $('.k_right .li4 span');
  $myCart.text(more_data.length)
  
// -----------添加到购物车--------------------------
  var $btnAdd = $('#k_main .btnAdd');
  $btnAdd.on('click',function(){
      // 动画
      // 复制图片，增加路径，定位到按钮
      var $cloneImg = $('<img/>');
      $cloneImg.attr('src',`${res.imgurl}`);
      $cloneImg.css({
          'width':'60',
          'height':'60',
          'position':'absolute',
          'left':this.offsetLeft,
          'top':this.offsetTop
      })
      // 写入页面
      // $('body').append($cloneImg);
      // 动画实现改变定位，并回调函数
      // $cloneImg.animate()

      // 添加到购物车，存入cookie
      res.qty = $input1.val();
      console.log(res);
      var more_data = Cookie.get('more_data') || [];
      if(typeof more_data === 'string'){
          more_data = JSON.parse(more_data);
      };
      var idx;
      var has = more_data.some(function(g,i){
          idx = i;
          return g.id === id;
      });
      if(has){
          more_data[idx].qty=(more_data[idx].qty)*1+$input1.val()*1;
      }else{
          more_data.push(res);
      }
      Cookie.set("more_data",JSON.stringify(more_data),{path:"/"});

      // 头部的商品数量
      var $head_amount = $('#k_header .h_right .li4 span');
      $head_amount.text(more_data.length);

      // 右边购物车的商品数量
      var $myCart = $('.k_right .li4 span');
      $myCart.text(more_data.length)
  });
// --------------------去到购物车页面----------------
  var $goBuy = $('.k_right .li4');
  $goBuy.on('click',function(){
      location.href = '../html/cart.html'
  })

// --------------立即购买--------------------------
  var $btnBuy = $('#k_main .btnBuy');
  $btnBuy.on('click',function(){
      location.href = '../html/cart.html'
  })

// -----------放大镜------------------------------
;(function ($, window, document, undefined) {

  var Magnifier = function (elem) {
    var self = this;
    this.$elem = elem;
    this.$smallBox = this.$elem.find('.small_box');
    this.$smallBox_pic = this.$smallBox.find('img');
    this.$smallBox_mask = this.$smallBox.find('.mask');
    this.$thumbnailBox = this.$elem.find('.more');
    this.$thumbnailBox_prev = this.$thumbnailBox.find('.prev');
    this.$thumbnailBox_next = this.$thumbnailBox.find('.next');
    this.$thumbnailBox_wrapper = this.$thumbnailBox.find('.wrapper');
    this.$thumbnailBox_item = this.$thumbnailBox.find('.item');
    this.$thumbnailBox_pic = this.$thumbnailBox.find('img');
    this.$bigBox = this.$elem.find('.big_box');
    this.$bigBox_pic = this.$bigBox.find('img');
  };

  Magnifier.prototype = {
    moveBigPic: function () { // 改变大图
      var scaleX = this.$smallBox_mask.position().left / (this.$smallBox.width() - this.$smallBox_mask.width());
      var scaleY = this.$smallBox_mask.position().top / (this.$smallBox.height() - this.$smallBox_mask.height());
      var scroll_l = scaleX * (this.$bigBox_pic.width() - this.$bigBox.width());
      var scroll_t = scaleY * (this.$bigBox_pic.height() - this.$bigBox.height());

      this.$bigBox.scrollLeft(scroll_l).scrollTop(scroll_t);
    },

    changeSrouce: function (index, cur_src) { // 改变大小图地址
      this.$smallBox_pic.attr('src', cur_src);
      this.$bigBox_pic.attr('src', '../img/mt'+(index + 1)+'.jpg');
    },

    setMask: function () { // 设置 mask 宽高
      var mask_w = 160;
      var mask_h = 160;
      // var mask_w = this.$smallBox.width() / (this.$bigBox_pic.width() / this.$bigBox.width());
      // var mask_h = this.$smallBox.height() / (this.$bigBox_pic.height() / this.$bigBox.height());

      this.$smallBox_mask.css({width: mask_w, height: mask_h});
    },

    inital: function () { // 初始化
      var self = this;
      
      this.$thumbnailBox_next.click(function () {
        var ov_pic = self.$thumbnailBox_item.length - 5;
        var ov_dis = ov_pic * 78;

        if (ov_pic > 0) {
          self.$thumbnailBox_wrapper.animate({marginLeft: -ov_dis});
        }
      });

      this.$thumbnailBox_item.mouseover(function () {
        var cur_src = $(this).attr('data-src');

        self.$thumbnailBox_item.removeClass('item-cur');

        $(this).addClass('item-cur');

        self.changeSrouce($(this).index(), cur_src);
      });

      this.$smallBox.hover(function () {
        self.$bigBox.show();
        self.$smallBox_mask.show();
        self.setMask();

        $(this).mousemove(function (ev) {
          var oEvent = ev || window.event;
          var offset_pos = {
            left: oEvent.clientX - $(this).offset().left - self.$smallBox_mask.width() / 2,
            top: oEvent.clientY - $(this).offset().top - self.$smallBox_mask.height() / 2 + $(window).scrollTop()
          };

          if (offset_pos.left < 0) {
            offset_pos.left = 0;
          } else if (offset_pos.left > $(this).width() - self.$smallBox_mask.width()) {
            offset_pos.left = $(this).width() - self.$smallBox_mask.width();
          }
          if (offset_pos.top < 0) {
            offset_pos.top = 0;
          } else if (offset_pos.top > $(this).height() - self.$smallBox_mask.height()) {
            offset_pos.top = $(this).height() - self.$smallBox_mask.height();
          }

          self.$smallBox_mask.css(offset_pos);

          self.moveBigPic();
        });
      }, function () {
        self.$smallBox_mask.hide();
        self.$bigBox.hide();
      });
    },

    constructor: Magnifier
  };

  $.fn.magnifier = function () {
    var magnifier = new Magnifier(this);

    return magnifier.inital();
  };

})(jQuery, window, document);

    var $magnifier = $('#k_main .left');
    $magnifier.magnifier();


});
});