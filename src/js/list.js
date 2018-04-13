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

// -------------回到顶部---------------------------
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

// ---------------生成数据--------------------------
    var $goods = $('#k_main .goods');// ul

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
    var res = data.map(function(item){
        if(item.type === '美瞳'){            
            return `<li class="clearfix" data-myid="${item.id}">
                <img src="${item.imgurl}"/>
                <h2 class="price">￥${item.price}</h2>
                <h3 class="name">${item.name}</h3>
                <p class="sale">全新升级，改善滑片，更易配戴。</p>
                <p class="join clearfix"><span class="cart"><i></i>加入购物车</span><span class="collect"><i></i>收藏</span></p>
            </li>`
        }        
    }).join('');
    $goods.html(res);

// -------------------传出数据----------------------
    $goods.on('click','li',function(){
        var data_id = $(this).attr('data-myid');
        console.log(data_id);
        location.href = '../html/goods.html?id='+data_id;
    })
});
});