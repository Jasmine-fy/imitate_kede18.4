require(['config'],function(){
require(['jquery','flexslider','common'],function($,a){
    var $k_main = $('#k_main');
    var $tab = $k_main.find('.top');
    var $cont1 = $k_main.find('.cont1');
    var $cont2 = $k_main.find('.cont2');

    // 显示扫描登录
    $tab.children().first().css({'color':'#89B929'});
    $cont1.css('display','block');

    // 鼠标点击tab标签页切换
    $tab.on('click','li',function(){
        $(this).css({'color':'#89B929'});
        $(this).siblings('li').css({'color':'#666'})
        .on('mouseenter',function(){
            $(this).css({'color':'#f60'});
        });
        if($(this).text() == '扫描登录'){     
            $(this).css({'color':'#89B929'});
            $cont1.css('display','block');
            $cont2.css('display','none');
        }
        if($(this).text() == '账号登录'){
            $(this).css({'color':'#89B929'});
            $cont1.css('display','none');
            $cont2.css('display','block');
        }
    });

// -------------------登录----------------------
    var $phoneNum = $cont2.find('.phoneNum');
    var $password = $cont2.find('.pwd');
    var $remember = $cont2.find('#remember');
    var $auto_login = $cont2.find('#auto_login');
    var $btnLogin = $cont2.find('.denglu');

    $btnLogin.on('click',function(){
        var $_phoneNum = $phoneNum.val();
        var $_password = $password.val();

        // 记住账户
        // if($remember.prop('checked')){}

        // 自动登录
        // if($auto_login.prop('checked')){}

        ajax({
            url:'../api/login.php',
            data:{
                phoneNum:$_phoneNum,
                password:$_password,
                type:'reg'
            },
            success:function(data){
                console.log(data)
                if(data === 'success'){
                    var message = {phoneNum:$_phoneNum}
                    // Cookie.set('message',JSON.stringify(message),{path:'/'});
                    ajax({
                        url:'../api/requestSQL.php',
                        data:{phoneNum:$_phoneNum},
                        success:function(msg){
                            console.log(msg)
                            console.log(msg[0].phoneNum);
                            location.href="../index.html?user="+msg[0].phoneNum.slice(0,6);
                        }
                    })
                }
            }
        })
    })
});
});