$(function(){
    // 读取数据，加载用户历史记录信息
    // 1.数据存储在localStorage中：只能存储字符串数据
    // var res = localStorage.getItem("lt_searchHistory");
    // var arr = JSON.parse(res); // {"list":arr}
    var arr = getHistoryData();
    var html = template("lt_history",{"list":arr});
    $(".lt_searchList").html(html);


    // 添加搜索事件
    $(".lt_userSearch").on("click",function(){
        // 1.收集用户数据
        var key = $("#userKey").val();
        // 2。将数据添加到本地存储
        // 2.1.先读取原始数据
        var arr = getHistoryData();
        // 2.2 将当前关键字添加到数组中
        // 2.2.1遍历，判断当前数组中是否拥有相同内容的值
        for(var i=0;i<arr.length;i++){
            if(arr[i] == key){
                arr.splice(i,1);
            }
        }
        // 2.2.2 判断当前的记录数据 是来超过10条
        if(arr.length >= 10){
            arr.splice(0,1);
        }
        arr.push(key);
        // 2.3 将arr重新添加到localStorage中
        localStorage.setItem("lt_searchHistory",JSON.stringify(arr));
        // 2.3 跳转
        window.location.href="searchList.html?key="+key;
        // 阻止默认行为
        return false;
    });

    function getHistoryData(){
        // LocalStorage.setItems(“lt_searchHistory”,’[“手机”,”电脑”,”平板”]’);
        var res = localStorage.getItem("lt_searchHistory");
        var arr = JSON.parse(res); // {"list":arr}
        // 为了能够规避后期模板中的可能错误，如果arr没有数据，则返回一个空值数组
        return arr || [];
    }
});