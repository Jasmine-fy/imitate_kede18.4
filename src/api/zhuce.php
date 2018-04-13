<?php
    $phoneNum = isset($_GET['phoneNum']) ? $_GET['phoneNum'] : null;
    $phoneList = array('15913547233','13533556890','13402220713','18433445790');
    $res = in_array($phoneNum,$phoneList);
    if($res){
        echo "fail";
    }else{
        echo "success";
    }
?>