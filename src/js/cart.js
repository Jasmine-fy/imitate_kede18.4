require(['config'],function(){
require(['jquery','flexslider','common'],function($,a){

// -------------获取cookie数据-------------------------
    var more_data = Cookie.get('more_data') || [];
    if(typeof more_data === 'string'){
        more_data = JSON.parse(more_data);
    }
    console.log(more_data)

    var $goods = $('#k_main .goods');
    for(var i=0;i<more_data.length;i++){
        $goods[0].innerHTML += `<li class="clearfix" data-id="${more_data[i].id}">
            <img src="${more_data[i].imgurl}"/>
            <a href="#" class="msg fl">${more_data[i].name}</a>
            <div class=" fl du">光度：0.00</div>
            <div class="amount fl">
                <span class="minus">&minus;</span>
                <input type="text" value="${more_data[i].qty}" />
                <span class="plus">&plus;</span>
            </div>
            <div class=" fl unit">￥${more_data[i].price}</div>
            <div class=" fl total">￥${more_data[i].price*more_data[i].qty}</div>
            <div class=" fr change">
                <a href="javascript:;">加入收藏夹</a>
                <a href="javascript:;" class="btnDel">删除</a>
            </div>
        </li>`     
    }

// --------------计算总价--------------------------
    var $caculate = $('#k_main .caculate');
    var $amount = $caculate.find('.amount');
    var $z_price = $caculate.find('.price');
    var $z_total = $caculate.find('.total');

    // 头部的商品数量
    var $head_amount = $('#k_header .h_right .li4 span');
    $head_amount.text(more_data.length);
    // 共有的商品数量
    $amount.text(more_data.length);


    // 获取goods里所有total值
    var $all = $goods.find('li').get();
    var he = 0;
    for(var i=0;i<$all.length;i++){
        he += Number($($goods.find('li')[i]).find('.total').text().slice(1));
    }
    $z_price.text(`￥${he}`);
    $z_total.text($z_price.text().slice(1)-76);

// ------------计算价格，并存入cookie------------------
    var $currentP,$total,$unit,$input,$qty,
        $currentLi,$myid;
    // 商品加价
    $goods.on('click','.plus',function(){
        // 计算当前li的价格
        $currentP = $(this).parent('.amount');
        $input = $(this).siblings('input')
        $total = $currentP.siblings('.total')
        $unit = $currentP.siblings('.unit')

        $input[0].value++;
        $total.text(`￥${$input.val()*$unit.text().slice(1)}`);
        $qty = $input.val();

        // 总价变化
        $amount.text(more_data.length);
        var $all = $goods.find('li').get();
        var he = 0;
        for(var i=0;i<$all.length;i++){
            he += Number($($goods.find('li')[i]).find('.total').text().slice(1));
        }
        $z_price.text(`￥${he}`);
        $z_total.text($z_price.text().slice(1)-76);

        // 存入cookie
        // 获取当前li的id
        $currentLi = $(this).closest('li');
        $myid = $currentLi.attr('data-id');
        console.log($myid);
        // 遍历cookie中的数据
        for(var i=0;i<more_data.length;i++){
            // 若id相等则改变其的qty值
            if(more_data[i].id == $myid){
                more_data[i].qty = $qty
                Cookie.set('more_data',JSON.stringify(more_data),{path:'/'})
            }
        }
        
    })
    // 商品减价
    .on('click','.minus',function(){
        // 计算当前li的价格
        $currentP = $(this).parent('.amount');
        $input = $(this).siblings('input')
        $total = $currentP.siblings('.total')
        $unit = $currentP.siblings('.unit')

        $input[0].value--;
        // 当数量小于0，移出当前li
        if($input[0].value <= 0){
            $currentLi = $(this).closest('li');
            $currentLi.remove();
            // 存入cookie
            $myid = $currentLi.attr('data-id');
            console.log($myid);

            // 遍历cookie中的数据
            for(var i=0;i<more_data.length;i++){
                // 若id相等则改变其的qty值
                if(more_data[i].id == $myid){
                    more_data.splice(i,1);
                    Cookie.set("more_data",JSON.stringify(more_data),{path:"/"});
                }
            }
        }

        $total.text(`￥${$input.val()*$unit.text().slice(1)}`);

        $qty = $input.val();

        // 总价变化
        $amount.text(more_data.length);
        var $all = $goods.find('li').get();
        var he = 0;
        for(var i=0;i<$all.length;i++){
            he += Number($($goods.find('li')[i]).find('.total').text().slice(1));
        }
        $z_price.text(`￥${he}`);
        $z_total.text($z_price.text().slice(1)-76);

        // 存入cookie
        // 获取当前li的id
        $currentLi = $(this).closest('li');
        $myid = $currentLi.attr('data-id');
        console.log($myid);
        // 遍历cookie中的数据
        for(var i=0;i<more_data.length;i++){
            // 若id相等则改变其的qty值
            if(more_data[i].id == $myid){
                more_data[i].qty = $qty
                Cookie.set('more_data',JSON.stringify(more_data),{path:'/'})
            }
        }
    })
    // 删除商品
    .on('click','.btnDel',function(){
        // 删除当前商品
        $currentLi = $(this).closest('li');
        $currentLi.remove();

        // 存入cookie
        $myid = $currentLi.attr('data-id');
        console.log($myid);

        // 遍历cookie中的数据
        for(var i=0;i<more_data.length;i++){
            // 若id相等则改变其的qty值
            if(more_data[i].id == $myid){
                more_data.splice(i,1);
                Cookie.set("more_data",JSON.stringify(more_data),{path:"/"});
            }
        }
    })

});
});