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
    
// -----------实现头部，右边购物车数据------------------
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

    var res = (function(){
        var accept;
        ajax({
            url:"../api/list.php",
            // url:"../api/link.php",
            async:false,
            success:function(data){
                accept = data;
            }
        });
        return accept;
    })();
    console.log(res)
    var result = res.data.map(function(item){
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
    // var result = data.map(function(item){
    //     if(item.type === '美瞳'){            
    //         return `<li class="clearfix" data-myid="${item.id}">
    //             <img src="${item.imgurl}"/>
    //             <h2 class="price">￥${item.price}</h2>
    //             <h3 class="name">${item.name}</h3>
    //             <p class="sale">全新升级，改善滑片，更易配戴。</p>
    //             <p class="join clearfix"><span class="cart"><i></i>加入购物车</span><span class="collect"><i></i>收藏</span></p>
    //         </li>`
    //     }        
    // }).join('');
    $goods.html(result);

// -------------------传出数据----------------------
    // 点击进入详情页
    $goods.on('click','li',function(){
        var data_id = $(this).attr('data-myid');
        console.log(data_id);
        location.href = '../html/goods.html?id='+data_id;
    })

// ----------------分页加载数据----------------------
    var $page = $('#k_main .page');
    var $prev = $page.find('.prev');
    var $next = $page.find('.next');console.log($next)
    var $yema = $page.find('.yema .yema_page');// li>ul

    // 创建分页
    var pageLen = Math.ceil(res.total/res.qty);
    $yema.html('')
    for(var i=0;i<pageLen;i++){
        var $li = $('<li/>');
        $li.text(i+1);

        // 高亮分页
        if(i === res.page-1){
            $li.addClass('active');
        }
        $yema.append($li)
    }
    var qty = 12
    // 点击页数切换
    $yema.on('click','li',changePage)
    // $yema.on('click','li',function(){
    //     // 改变样式
    //     $(this).addClass('active');
    //     $(this).siblings().removeClass('active');
    //     // 获取当前页码
    //     var pageNo = $(this).text();console.log(pageNo);

    //     // 请求得到数据，再次生成页面
    //     var accept;
    //     ajax({
    //         url:"../api/list.php",
    //         data:{qty:qty,page:pageNo},
    //         async:false,
    //         success:function(msg){console.log(msg)
    //             accept = msg.data.map(function(item){
    //                 if(item.type === '美瞳'){            
    //                     return `<li class="clearfix" data-myid="${item.id}">
    //                         <img src="${item.imgurl}"/>
    //                         <h2 class="price">￥${item.price}</h2>
    //                         <h3 class="name">${item.name}</h3>
    //                         <p class="sale">全新升级，改善滑片，更易配戴。</p>
    //                         <p class="join clearfix"><span class="cart"><i></i>加入购物车</span><span class="collect"><i></i>收藏</span></p>
    //                     </li>`
    //                 }        
    //             }).join('');
    //         }
    //     });
    //     $goods.html(accept);
    // })
    // 点击前一页切换
    $prev.on('click',function(){
        var $current = $(this).siblings('.yema').find('.yema_page');
        var $li = $current.find('li.active');
        // 获取当前页码
        var num = $current.find('li.active')[0].innerText*1;
        if(num != 1){
            // 改变样式
            $li.removeClass('active')
            $li.prev().addClass('active');

            // 请求得到数据，再次生成页面
            var accept;
            ajax({
                url:"../api/list.php",
                data:{qty:qty,page:num-1},
                async:false,
                success:function(msg){console.log(msg)
                    accept = msg.data.map(function(item){
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
                }
            });
            $goods.html(accept);
        }
        
    })
    // 点击下一页切换
    $next.on('click',function(){
        var $current = $(this).siblings('.yema').find('.yema_page');
        var $li = $current.find('li.active');
        // 获取当前页码
        var num = $current.find('li.active')[0].innerText*1;console.log(num);console.log($current.length)
        if(num != $current.children().length){
            // 改变样式
            $li.removeClass('active')
            $li.next().addClass('active');

            // 请求得到数据，再次生成页面
            var accept;
            ajax({
                url:"../api/list.php",
                data:{qty:qty,page:num+1},
                async:false,
                success:function(msg){console.log(msg)
                    accept = msg.data.map(function(item){
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
                }
            });
            $goods.html(accept);
        }
    });

    // 封装切换页码，获取数据
    function changePage(){
        // 改变样式
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        // 获取当前页码
        var pageNo = $(this).text();console.log(pageNo);

        // 请求得到数据，再次生成页面
        var accept;
        ajax({
            url:"../api/list.php",
            data:{qty:qty,page:pageNo},
            async:false,
            success:function(msg){console.log(msg)
                accept = msg.data.map(function(item){
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
            }
        });
        $goods.html(accept);
    };

// -----------列表左边手风琴效果----------------------
    var $accordion = $('#k_main .left .accordion');
    // 点击列表，实现手风琴效果
    $accordion.on('click','>li',function(){
        console.log($(this).next('.cont')[0])
        console.log($(this).css('color'))
        if($(this).css('color') == 'rgb(109, 157, 3)'){
            $(this).css({'color':'#f60'});
            $(this).siblings('li').css('color','#6d9d03')
            $(this).find('i').css('background-position','-7px -796px');
            $(this).prev('.cont').slideUp();
            $(this).next('.cont').slideDown();            
        }
        else if($(this).css('color') == 'rgb(255, 102, 0)'){
            $(this).find('i').css('background-position','-7px -766px');
            $(this).css({'color':'#6d9d03'})
            $(this).next('.cont').slideUp();
        }
    })

//-------------点击logo，跳转首页----------------------
    $('.logo').on('click',function(){console.log(666)
        location.href = '../index.html';
    });
});
});