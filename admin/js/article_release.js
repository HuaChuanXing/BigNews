$(function() {
    // 需求一：
    // 头像预览功能
    $('#inputCover').on('change', function() {
        var file = this.files[0];
        var url = URL.createObjectURL(file);
        $('.article_cover').attr('src', url);
    });

    // 日期插件
    jeDate('#testico', {
        format: "YYYY-MM-DD",
        isTime: false,
        zIndex: 99999,
    });
    // 富文本编辑器
    var E = window.wangEditor;
    var editor2 = new E('#editor');
    editor2.create();

    // 需求二：
    // 文章类别加载就显示在页面对应的位置
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function(backData) {
            if (backData.code == 200) {
                var resHtml = template('categoryList', backData);
                $('.category').html(resHtml);
            };
        }
    });

    // 需求三：
    // 点击发布按钮，发表文章
    $('.btn-release').on('click', function(e) {
        // 取消按钮的默认提交行为
        e.preventDefault();
        // 创建一个FormData对象
        var fd = new FormData($('#form')[0]);
        // 将状态和文章内容追加到FormData对象中
        fd.append('state', '已发布');
        fd.append('content', editor2.txt.html());
        // 发送ajax请求，发布文章
        $.ajax({
            type: 'post',
            url: BigNew.article_publish,
            data: fd,
            contentType: false,
            processData: false,
            success: function(backData) {
                // console.log(backData);
                if (backData.code == 200) {
                    alert('文章新增成功！');
                    location.href = './article_list.html';
                    parent.$('ul.level02 li:eq(0)').click();
                };
            }
        });
    });

    // 需求四：
    // 点击发布为草稿按钮，创建为草稿
    $('.btn-draft').on('click', function(e) {
        // 取消按钮的默认提交行为
        e.preventDefault();
        // 创建一个FormData对象
        var fd = new FormData($('#form')[0]);
        // 将状态和文章内容追加到FormData对象中
        fd.append('state', '');
        fd.append('content', editor2.txt.html());
        // 发送ajax请求，发布文章
        $.ajax({
            type: 'post',
            url: BigNew.article_publish,
            data: fd,
            contentType: false,
            processData: false,
            success: function(backData) {
                // console.log(backData);
                if (backData.code == 200) {
                    alert('草稿新增成功！');
                    location.href = './article_list.html';
                    parent.$('ul.level02 li:eq(0)').click();
                };
            }
        });
    });
});