require(['config'],function(){
require(['jquery','flexslider','common'],function($,a){

    var num = randomNumber(10,50);
    console.log(num);

// ------------------登录更改用户名------------------
    var $loginName = $('.loginName');console.log($loginName.val())
    ajax({
        url:'../api/requestSQL.php',
        //data:{phoneNum:}
        success:function(data){
            console.log(data)
            $loginName.text(`${data[0]}...您好，欢迎来可得！`);
            // $loginName.text(`${$_phone.slice(0,6)}...您好，欢迎来可得！`);
            $loginName.next('a').text(' ');
            $loginName.next('a').next('a').text('[退出]');
        }
    })


});
});