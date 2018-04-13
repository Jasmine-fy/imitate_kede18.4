<?php
    // 连接数据库
    require('connect.php');

    //获取查询结果集（集合）
    $result = $conn->query("select * from products");

    // 获取数据（使用查询结果集）
    $res = $result->fetch_all(MYSQLI_ASSOC);

    //释放查询结果集，避免资源浪费
    $result->close();

    // 关闭数据库，避免资源浪费
    $conn->close();

    // var_dump($res);

    echo json_encode($res,JSON_UNESCAPED_UNICODE);
?>