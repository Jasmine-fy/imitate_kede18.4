<?php
    // 连接数据库
    require('connect.php');

    $page = isset($_GET['page']) ? $_GET['page'] : 1;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 12;

    //获取查询结果集（集合）
    $result = $conn->query("select * from products");

    // 获取数据（使用查询结果集）
    $res = $result->fetch_all(MYSQLI_ASSOC);

    $data = array(
        'total' => count($res),
        'data' => array_slice($res,$qty*($page-1),$qty),
        'qty' => $qty*1,
        'page' => $page*1
    );

    //释放查询结果集，避免资源浪费
    $result->close();

    // 关闭数据库，避免资源浪费
    $conn->close();

    // var_dump($res);

    // echo json_encode($res,JSON_UNESCAPED_UNICODE);
    echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>