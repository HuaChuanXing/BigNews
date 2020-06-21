$(function() {
    // 分析：
    // 需求一：
    // 页面一加载，就将所有的评论展示在页面中
    var currentPage;

    function getData(myPage, callBack) {
        $.ajax({
            type: 'get',
            url: BigNew.comment_list,
            data: {
                page: myPage,
                perpage: 6
            },
            success: function(backData) {
                // console.log(backData);
                if (backData.code == 200) {
                    var resHtml = template('comment_list', backData);
                    $('tbody').html(resHtml);

                    if (callBack != null && backData.data.data.length != 0) {
                        callBack(backData);
                    } else if (backData.data.data.length == 0 && backData.data.totalPage == currentPage - 1) {
                        currentPage -= 1;
                        // 重绘页面条
                        $('#pagination').twbsPagination('changeTotalPages', backData.data.totalPage, currentPage);
                    };
                };
            }
        });
    };
    getData(1, function(backData) {
        $('#pagination').twbsPagination({
            totalPages: backData.data.totalPage,
            startPage: 1,
            visiblePages: 7,
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

    // 给批准按钮创建点击事件
    $('tbody').on('click', 'a#btn-pz', function(e) {
        e.preventDefault();
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'post',
            url: BigNew.comment_pass,
            data: {
                id: id
            },
            success: function(backData) {
                // console.log(backData);
                if (backData.code == 200) {
                    alert('评论已经通过了！');
                    getData(currentPage, function(backData) {
                        // 重绘页面条
                        $('#pagination').twbsPagination('changeTotalPages', backData.data.totalPage, currentPage);
                    });
                };
            }
        });
    });

    // 给拒绝按钮创建点击事件
    $('tbody').on('click', 'a#btn-jj', function(e) {
        e.preventDefault();
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'post',
            url: BigNew.comment_reject,
            data: {
                id: id
            },
            success: function(backData) {
                // console.log(backData);
                if (backData.code == 200) {
                    alert('评论已经已拒绝了！');
                    getData(currentPage, function(backData) {
                        // 重绘页面条
                        $('#pagination').twbsPagination('changeTotalPages', backData.data.totalPage, currentPage);
                    });
                };
            }
        });
    });

    // 给拒绝按钮创建点击事件
    $('tbody').on('click', 'a#btn-delete', function(e) {
        e.preventDefault();
        if (confirm('你确定要删除吗？')) {
            var id = $(this).attr('data-id');
            $.ajax({
                type: 'post',
                url: BigNew.comment_delete,
                data: {
                    id: id
                },
                success: function(backData) {
                    // console.log(backData);
                    if (backData.code == 200) {
                        alert('评论已经已删除了！');
                        getData(currentPage, function(backData) {
                            // 重绘页面条
                            $('#pagination').twbsPagination('changeTotalPages', backData.data.totalPage, currentPage);
                        });
                    };
                }
            });
        };
    });

});