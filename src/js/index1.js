jQuery(function($){//原本的

    // 首页的二级菜单先存在
    var $k_nav = $('#k_nav');
    var $nav_tab1 = $k_nav.find('.tab1');
    $nav_tab1.css('display','block');

    // 鼠标移动到二级菜单
    var $tab1_li = $nav_tab1.children();
    console.log($tab1_li)

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
    })

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
    $img.prop('src','images/app.jpg');
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
// -------------1楼---------------------------------
    var $main1 = $k_main.find('.main1');
    // $main1.find('.tab1')
// -------------2楼---------------------------------
    var $main2 = $k_main.find('.main2');

// -------------3楼---------------------------------
    var $main3 = $k_main.find('.main3');

// -------------4楼---------------------------------
    var $main4 = $k_main.find('.main4');

// -------------5楼---------------------------------
    var $main5 = $k_main.find('.main5');
// -------------------------------------------
});