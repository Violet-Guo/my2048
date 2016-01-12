<%--
  Created by IntelliJ IDEA.
  User: violet
  Date: 2016/1/8
  Time: 14:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<%
    String path = request.getContextPath();
    String basepath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

    <link rel="stylesheet" type="text/css" href="<%=basepath%>css/2048.css">
    <script type="text/javascript" src="<%=basepath%>js/jquery.min.js"></script>
    <script type="text/javascript" src="<%=basepath%>js/main2048.js"></script>
    <script type="text/javascript" src="<%=basepath%>js/show2048.js"></script>
    <script type="text/javascript" src="<%=basepath%>js/support2048.js"></script>
    <title>2048</title>
</head>
<body>
    <header>
        <h1>2048</h1>
        <p>Modified By Violet-Guo</p>
        <a href="javascript:newgame();" id="newgamebutton">New Game</a>
        <p>score:<span id="score">0</span></p>
    </header>

    <div id="grid-container">
        <div class="grid-cell" id="grid-cell-0-0"></div>
        <div class="grid-cell" id="grid-cell-0-1"></div>
        <div class="grid-cell" id="grid-cell-0-2"></div>
        <div class="grid-cell" id="grid-cell-0-3"></div>

        <div class="grid-cell" id="grid-cell-1-0"></div>
        <div class="grid-cell" id="grid-cell-1-1"></div>
        <div class="grid-cell" id="grid-cell-1-2"></div>
        <div class="grid-cell" id="grid-cell-1-3"></div>

        <div class="grid-cell" id="grid-cell-2-0"></div>
        <div class="grid-cell" id="grid-cell-2-1"></div>
        <div class="grid-cell" id="grid-cell-2-2"></div>
        <div class="grid-cell" id="grid-cell-2-3"></div>

        <div class="grid-cell" id="grid-cell-3-0"></div>
        <div class="grid-cell" id="grid-cell-3-1"></div>
        <div class="grid-cell" id="grid-cell-3-2"></div>
        <div class="grid-cell" id="grid-cell-3-3"></div>
    </div>
</body>
</html>
