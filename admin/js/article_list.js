$(function() {
    // 需求分析：
    // 需求一：
    // 1.一加载页面，文章分类展示
    $.ajax({
        type: "get",
        url: BigNew.category_list,
        success: function(backData) {
            // console.log(backData);
            if (backData.code == 200) {
                var resHtml = template('categureList', backData);
                $('#selCategory').html(resHtml);
            };
        }
    });

    var currentPage; //声明一个变量来存储当前页
    // 需求二：
    // 一加载页面，所有的文章都显示在页面中
    getData(1, function(backData) {
        $('#pagination').twbsPagination({
            totalPages: backData.data.totalPage, //页数
            startPage: 1,
            visiblePages: 7, //可见页数上限
            first: '首页',
            last: '尾页',
            prev: '上一页',
            next: '下一页',
            onPageClick: function(event, page) {
                currentPage = page;
                getData(page, null);
            }
        });
    });

    function getData(myPage, callBack) {
        $.ajax({
            type: 'get',
            url: BigNew.article_query,
            data: {
                type: $('#selCategory').val().trim(), //文章类型id
                state: $('#selStatus').val().trim(), //文章状态
                page: myPage, //当前页，为空就是返回第一页
                perpage: 3 //每页显示条数，，默认为每页6条
            },
            success: function(backData) {
                // console.log(backData);
                if (backData.code == 200) {
                    var resHtml = template('articalList', backData);
                    $('tbody').html(resHtml);

                    if (callBack != null && backData.data.data.length != 0) {
                        $('#pagination').show().next().hide();
                        callBack(backData);
                    } else if (backData.data.data.length == 0 && currentPage == 1) {
                        $('#pagination').hide().next().show();
                    } else if (backData.data.data.length == 0 && backData.data.totalPage == currentPage - 1) {
                        currentPage -= 1;
                        // 重绘分页插件
                        $('#pagination').twbsPagination('changeTotalPages', backData.data.totalPage, currentPage);
                    };
                };
            }
        });
    };

    // 需求二：
    // 给筛选按钮创建点击事件
    $('#btnSearch').on('click', function(e) {
        // 取消按钮的默认行为
        e.preventDefault();
        // 点击后，让页码变成1
        currentPage = 1;
        // 发送ajax请求，请求文章
        getData(1, function(backData) {
            // 重绘分页插件
            $('#pagination').twbsPagination('changeTotalPages', backData.data.totalPage, 1);
        });
    });

    // 需求三
    // 点击删除按钮，移除当前按钮的数据
    $('tbody').on('click', 'a.delete', function(e) {
        // 取消按钮的默认行为                
        e.preventDefault();
        if (confirm('你确定要移除文章吗？')) {
            // 获取id
            var aritcalId = $(this).attr('data-id');
            $.ajax({
                type: 'post',
                url: BigNew.article_delete,
                data: {
                    id: aritcalId
                },
                success: function(backData) {
                    if (backData.code == 204) {
                        alert('移除成功！');
                        getData(currentPage, function(backData) {
                            // 重绘分页插件
                            $('#pagination').twbsPagination('changeTotalPages', backData.data.totalPage, currentPage);
                        });
                    };
                }
            });
        };
    });

    // 需求四：
    // 点击发表文章按钮：跳转到发表文章页面，同时首页中左侧菜单按钮发表文章高亮显示
    $('#release_btn').on('click', function() {
        // 触发发表文章按钮的点击事件
        parent.$('ul.level02>li:eq(1)').click();
    });
});