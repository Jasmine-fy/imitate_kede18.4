require(['config'],function(){
require(['jquery','flexslider','common'],function($,a){
    var $k_main = $('#k_main')
    var $phone = $k_main.find('#phone');
    var $input_code = $k_main.find('#code');
    var $tel_code = $k_main.find('#tel_code');
    var $pwd = $k_main.find('#pwd');
    var $read = $k_main.find('#read');
    var $btnReg = $k_main.find('.zhuce');

    // 随机验证码
    var $code = $k_main.find('.check');
    var letter = 'qwertyuiopasdfghjklzxcvbnm1234567890';
    CAPTCHA();
    function CAPTCHA(){
        var res = '';
        for(var i=0;i<4;i++){
            res += letter[parseInt(Math.random()*36)];
        }
        $code.text(res);
    }
    $code.on('click',CAPTCHA);

    // 判断手机是否注册
    $phone.on('blur',function(){
        var $_phone = $phone.val();

        // 正确手机号
        if(!/^1[3-9]\d{9}$/.test($_phone)){
            $k_main.find('.wenzi').text('请输入正确的手机号');
            return false;
        }

        ajax({
            url:"../api/reg.php",
            data:{phoneNum:$_phone},
            success:function(data){
                if(data === "fail"){
                    $k_main.find('.tip').css({'display':'block'});
                    $k_main.find('.tip_bg').css({'display':'block'});
                }
            }
        })
        // 提示文字 和 手机验证码
        $k_main.find('.wenzi').text(' ');
        $k_main.find('.i4').css('background-color','#f60');
    })

    // 关闭tip
    $k_main.find('.tip').on('click','h3 i',function(){
        $k_main.find('.tip').css('display','none');
        $k_main.find('.tip_bg').css('display','none');
    });

    // 点击注册
    // 密码由6-15位字母、数字或字符组成
    $btnReg.on('click',function(){
        var $_phone = $phone.val();
        var $_pwd = $pwd.val();
        var $_input_code = $input_code.val();
        console.log($_input_code)

        if($_input_code != $code.text()){
            $k_main.find('.wenzi').text('验证码错误');
            return false;
        }
        else if($_pwd == '' ){
            $k_main.find('.wenzi').text('请输入密码');
            return false;
        }
        else if(!/^\w{6,15}$/.test($_pwd)){
            $k_main.find('.wenzi').text('密码由字母、数字、字符组成，长度6-15位。');
            return false;
        }
        else if(!$read.prop('checked')){
            $k_main.find('.wenzi').text('请先同意可得网用户注册协议。');
            return false;
        }

        ajax({
            url:'../api/reg.php',
            data:{
                phoneNum:$_phone,
                password:$_pwd,
                type:'reg'
            },
            success:function(data){
                if(data === 'success'){
                    location.href = '../index.html';                   
                }
            }
        })
    })

    // 实际页面用：点击验证码时判断手机号码是否存在
    // $k_main.find('.i4').on('click',function(){
    //     var $_phone = $phone.val();
    //     console.log($_phone);

    //     var status = [200,304];

    //     var xhr = new XMLHttpRequest();

    //     xhr.onload = function(){
    //         if(status.includes(xhr.status)){
    //             var res = xhr.responseText;

    //             if(res === 'fail'){
    //                 $k_main.find('.tip').css({'display':'block'});
    //                 $k_main.find('.tip_bg').css({'display':'block'});
    //             }
    //         }
    //     }
    //     xhr.open('get','../api/zhuce.php?phoneNum='+$_phone,true);
    //     xhr.send();
    // })
});
});