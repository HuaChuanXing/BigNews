$(function() {
    // 思路分析

    // 需求一：
    // 获取所有的文章类别
    getData();

    function getData() {
        $.ajax({
            type: 'get',
            url: BigNew.category_list,
            success: function(backData) {
                if (backData.code == 200) {
                    var resHtml = template('category_list', backData);
                    $('tbody').html(resHtml);
                };
            }
        });
    };

    // 需求三：
    // 判断点击的新增分类按钮还是编辑按钮触发的点击
    $('#myModal').on('show.bs.modal', function(e) {
        // console.log(e.relatedTarget);
        if (e.relatedTarget == $('#xinzengfenlei')[0]) {
            // 新增
            $('#myModalLabel').text('新增分类');
            $('#addOrEdit').text('新增').addClass('btn-primary').removeClass('btn-success');


        } else {
            // 编辑
            $('#myModalLabel').text('编辑分类');
            $('#addOrEdit').text('编辑').addClass('btn-success').removeClass('btn-primary');

            var id = $(e.relatedTarget).attr('data-id');
            var name = $(e.relatedTarget).parent().prev().prev().text();
            var slugText = $(e.relatedTarget).parent().prev().text();

            $('#recipient-name').val(name);
            $('#message-text').val(slugText);
            $('#hiddens').val(id);
        };
    });

    // 需求四：
    //  点击新增按钮新增类别
    // 1.给新增按钮创建点击事件
    // 2.发送ajax请求，添加类别
    // 3.局部刷新
    // 4.关闭模态框

    // 1.给新增按钮创建点击事件
    $('#addOrEdit').on('click', function() {
        var recipientName = $('#recipient-name').val().trim(); //获取名字
        var messageText = $('#message-text').val().trim(); //获取描述
        var id = $('#hiddens').val().trim();

        // 非空判断
        if (recipientName == '' || messageText == '') {
            alert('名称或描述不能为空！');
            return;
        };

        if ($(this).text() == '新增') {
            // 2.发送ajax请求，添加类别
            $.ajax({
                type: 'post',
                url: BigNew.category_add,
                data: {
                    name: recipientName,
                    slug: messageText
                },
                success: function(backData) {
                    // console.log(backData);
                    if (backData.code == 201) {
                        alert('新增成功！');

                        // 关闭模态框
                        $('#myModal').modal('hide');
                        // 局部刷新页面
                        getData();
                        // 清除输入框的内容
                        $('#recipient-name').val("");
                        $('#message-text').val("");
                    };
                }
            });
        } else {
            // 编辑
            // 发送ajax请求
            $.ajax({
                type: 'post',
                url: BigNew.category_edit,
                data: {
                    id: id,
                    name: recipientName,
                    slug: messageText
                },
                success: function(backData) {
                    alert(backData.msg);
                    if (backData.code == 200) {
                        // 关闭模态框
                        $('#myModal').modal('hide');
                        // 局部刷新页面
                        getData();
                        // 清除输入框的内容
                        $('#recipient-name').val("");
                        $('#message-text').val("");
                    };
                }
            });
        };
    });

    // 需求五：
    // 点击关闭按钮，请求form表单的内容
    $('#btn-close').on('click', function() {
        $('.modal-body form')[0].reset();
    });

    // 需求六：
    // 给tbody标签创建委托点击事件
    $('tbody').on('click', 'a#btn-delete', function() {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'post',
            url: BigNew.category_delete,
            data: {
                id: id
            },
            success: function(backData) {
                // console.log(backData);
                if (backData.code == 204) {
                    alert('移除成功！');
                    // 局部刷新页面
                    getData();
                }
            }
        });
    });

});