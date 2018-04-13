<?php
    
    require('connect.php');
 
    $phoneNum = isset($_GET['phoneNum']) ? $_GET['phoneNum'] : null;
    // 查找数据库判断用户名是否存在
    $sql = "select * from login where phoneNum='$phoneNum'";

    $result = $conn->query($sql);
    // 获取数据（使用查询结果集）
    $res = $result->fetch_all(MYSQLI_ASSOC);
    
    echo json_encode($res,JSON_UNESCAPED_UNICODE);

?>