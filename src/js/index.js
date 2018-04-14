require(['config'],function(){
require(['jquery','flexslider','common'],function($,a){

    // 首页的二级菜单先存在
    var $k_nav = $('#k_nav');
    var $nav_tab1 = $k_nav.find('.tab1');
    $nav_tab1.css('display','block');

    // 鼠标移动到二级菜单
    var $tab1_li = $nav_tab1.children();

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
  
// -------------轮播图-------------------------------
    // 轮播图滚动
    var $k_banner = $('#k_banner');
    $k_banner.find('.container').flexslider({
        directionNav: true,
        pauseOnAction: false
    });

    // 鼠标移动到轮播图出现前后按钮
    $k_banner.find('.container').on('mouseenter',function(){
        $k_banner.find('.flex-direction-nav').css('display','block');
    }).on('mouseleave',function(){
        $k_banner.find('.flex-direction-nav').css('display','none');
    })

    // 创建轮播图右边广告APP
    var $app = $('<div/>');
    var $img = $('<img/>');
    $img.prop('src','img/app.jpg');
    $app.addClass('ad');
    $app.append($img);
    $k_banner.find('.container').append($app);

// ------------热门搜索的tab标签切换------------------
    // 显示样式
    $k_hot = $('#k_hot');
    $k_hot.find('.h_right .tab3').css('display','block');
    $k_hot.find('.h_right .tab2').find('li.tab2_left').children().css({
        backgroundColor:'#fff'
    });
    $k_hot.find('.h_right .tab2').find('li.tab2_right').children().css({
        borderLeft:'1px solid #E9E9E9',
        borderBottom:'1px solid #E9E9E9'
    });
    // 鼠标hover上的变换
    // 左边：促销活动
    $k_hot.find('.h_right .tab2').on('mouseenter','li.tab2_left',function(){
        $(this).find('a').css({
            backgroundColor:'#fff',
            border:'0 none'
        });
        $(this).next().find('a').css({
            borderLeft:'1px solid #E9E9E9',
            borderBottom:'1px solid #E9E9E9',
            backgroundColor:'#F3F3F3'
        });
        $k_hot.find('.h_right .tab3').css('display','block');
        $k_hot.find('.h_right .tab4').css('display','none');
    })
    // 右边：最新动态
    .on('mouseenter','li.tab2_right',function(){
        $(this).prev().find('a').css({
            borderRight:'1px solid #E9E9E9',
            borderBottom:'1px solid #E9E9E9',
            backgroundColor:'#F3F3F3'
        });
        $(this).find('a').css({
            backgroundColor:'#fff',
            border:'0 none'
        });
        $k_hot.find('.h_right .tab4').css('display','block');
        $k_hot.find('.h_right .tab3').css('display','none');
    });

// -----------------秒杀tab切换-----------------------
    var $k_miaosha = $('#k_miaosha');
    var $msha = $k_miaosha.find('.msha');
    var $wbuy = $k_miaosha.find('.wbuy');
    // 显示秒杀和tab1
    $msha.css('background-position','0 0');
    $wbuy.css('background-position','0 -91px');
    $k_miaosha.find('.tab1').css('display','block');
    $k_miaosha.find('.tab2').css('display','none');

    // 鼠标移入tab标签页切换
    $msha.on('mouseenter',function(){
        $(this).css('background-position','0 0');
        $wbuy.css('background-position','0 -91px');
        $k_miaosha.find('.tab1').css('display','block');
        $k_miaosha.find('.tab2').css('display','none');
    });
    $wbuy.on('mouseenter',function(){
        $(this).css('background-position','0 -274px')
        $msha.css('background-position','0 -182px');
        $k_miaosha.find('.tab1').css('display','none');
        $k_miaosha.find('.tab2').css('display','block');
    });

// ----------------主要内容-------------------------
    var $k_main = $('#k_main');
    // 实现轮播图
    $k_main.find('.ml_banner').flexslider({
        directionNav: true,
        pauseOnAction: false
    });
    $k_main.find('.mr_banner').flexslider({
        directionNav: true,
        pauseOnAction: false
    });
    $k_main.find('.flex-control-nav').find('a').text(' ');
// -------------1楼---------------------------------
    var $main1 = $k_main.find('.main1');
// -------------2楼---------------------------------
    var $main2 = $k_main.find('.main2');

// -------------3楼---------------------------------
    var $main3 = $k_main.find('.main3');

// -------------4楼---------------------------------
    var $main4 = $k_main.find('.main4');

// -------------5楼---------------------------------
    var $main5 = $k_main.find('.main5');

// -------------门店概况tab切换---------------------
    var $k_store = $('#k_store');
    var $ks_top = $k_store.find('.top');
    var $ks_center = $k_store.find('.center');
    var $ks_cont = $k_store.find('.cont');
    var $ks_dian = $k_store.find('.dian');
    var $ks_traffic = $k_store.find('.traffic');
    var $ks_guide_msg = $k_store.find('.map_msg');
    var $ks_map_msg = $k_store.find('.guide_msg');

    // 显示桂林店
    $ks_top.children().first().css({'background-color':'#94C51B','color':'#fff'});
    $k_store.find('.center1').css('display','block');
    // 内容
    $ks_dian.css('background-position','0 0');
    $ks_traffic.css('background-position','0 -136px');
    $ks_map_msg.css('display','block');
    $ks_guide_msg.css('display','none');

    // 鼠标移动到店铺名称，更换店铺
    $ks_top.on('mouseenter','li',function(){
        $(this).css({'background-color':'#94C51B','color':'#fff'});
        $(this).siblings('li').css({'background-color':'#fff','color':'#666'});
        if($(this).text() == '桂林店'){
            $k_store.find('.center').css('display','none');
            $k_store.find('.center1').css('display','block');
        }else if($(this).text() == '新天地店'){
            $ks_dian.css('background-position','0 0');
            $k_store.find('.center').css('display','none');
            $k_store.find('.center2').css('display','block');
        }else if($(this).text() == '日月光店'){
            $ks_dian.css('background-position','0 0');
            $k_store.find('.center').css('display','none');
            $k_store.find('.center3').css('display','block');
        }else if($(this).text() == '人民广场店'){
            $ks_dian.css('background-position','0 0');
            $k_store.find('.center').css('display','none');
            $k_store.find('.center4').css('display','block');
        }else if($(this).text() == '龙之梦店'){
            $ks_dian.css('background-position','0 0');
            $k_store.find('.center').css('display','none');
            $k_store.find('.center5').css('display','block');
        }else if($(this).text() == '巴黎春天店'){
            $ks_dian.css('background-position','0 0');
            $k_store.find('.center').css('display','none');
            $k_store.find('.center6').css('display','block');
        }else if($(this).text() == '宝山店'){
            $ks_dian.css('background-position','0 0');
            $k_store.find('.center').css('display','none');
            $k_store.find('.center7').css('display','block');
        }else if($(this).text() == '唐镇店'){
            $ks_dian.css('background-position','0 0');
            $k_store.find('.center').css('display','none');
            $k_store.find('.center8').css('display','block');
        }else if($(this).text() == '中山公园'){
            $ks_dian.css('background-position','0 0');
            $k_store.find('.center').css('display','none');
            $k_store.find('.center9').css('display','block');
        }
    })

    // 鼠标移动门店概况、交通指引
    $ks_dian.on('mouseenter',function(){
        $(this).css('background-position','0 0');
        $ks_traffic.css('background-position','0 -136px');
        $ks_map_msg.css('display','block');
        $ks_guide_msg.css('display','none');
    });
    $ks_traffic.on('mouseenter',function(){
        $(this).css('background-position','0 -409px');
        $ks_dian.css('background-position','0 -273px');
        $ks_map_msg.css('display','none');
        $ks_guide_msg.css('display','block');
    });

// ---------------登录或注册更改用户名------------------
    var $loginName = $('#k_header .loginName');
    // ajax({
    //     url:'../api/requestSQL.php',
    //     //data:{phoneNum:}
    //     success:function(data){
    //         console.log(data)
    //         $loginName.text(`${data[0]}...您好，欢迎来可得！`);
    //         $loginName.css({'color':'#f60'});
    //         // $loginName.text(`${$_phone.slice(0,6)}...您好，欢迎来可得！`);
    //         $loginName.next('a').text(' ');
    //         $loginName.next('a').next('a').text('[退出]');
    //     }
    // })
    if(location.search.length > 0){
        var user = location.search.substr(6);
        console.log(location.search)
        $loginName.text(`${user}...您好，欢迎来可得！`).css('color','#f60')
    }
    
});
});