
$(function(){

    // 获取一级分类数据
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        data:{},
        dataType:'json',
        success:function(result){
            console.log(result);
            // 调用模板引擎生成动态的结构
            // 如果数据是对象就直接传入对象
            // 如果数据是数组，就包装为对象再传递
            // template(模板id名称，数据);
            var html = template("firstCategoryTemp",result);
            console.log(html);
            $(".lt_left ul").html(html);

            // 模拟第一个一级被选中的操作：加载一级分类的对应的二级分类数据
            getSecondCategory(result.rows[0].id);
        }
    });

    function getSecondCategory(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{"id":id},
            dataType:'json',
            success:function(result){
                console.log(result);
                var html = template("secondCategoryTemp",result);
                $(".lt_secondC").html(html);
            }
        });
    }

    // 动态的为一级分类导航项添加事件
    // 1一定要保证这些元素在事件触发之前已生成了
    // 2.动态生成的元素无法直接添加事件，一般考虑使用事件委托
    $(".firstCategoryNav").on("click","a",function(){
        // 修改样式
        $(this).parent().siblings().removeClass("active");
        $(this).parent().addClass("active");
        // 获取二级分类数据
        var id = $(this).data("id");
        // var id = $(this).attr("data-id");
        // var id = $(this)[0].dataset["id"];
        getSecondCategory(id);
    })

});