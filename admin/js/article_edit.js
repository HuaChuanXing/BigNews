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
    // 根据从文章列表页带过来的id，发送ajax请求，将文章的数据请求回来
    var articleId = location.search.split('=')[1]; //文章id
    $.ajax({
        type: 'get',
        url: BigNew.article_search,
        data: {
            id: articleId
        },
        success: function(backData) {
            // console.log(backData);
            if (backData.code == 200) {
                $('#inputTitle').val(backData.data.title); //文章标题
                $('.article_cover').attr('src', backData.data.cover); //文章封面
                $('.category').val(backData.data.categoryId); //文章类别
                $('#testico').val(backData.data.date); //时间日期
                editor2.txt.html(backData.data.content) //设置富文本编辑器内容
                $('#hiddens').val(articleId);
            };
        }
    });

    // 需求四：
    // 获取到文章的所有内容，发送ajax请求进行修改
    $('.btn-edit').on('click', function(e) {
        // 取消事件的默认行为
        e.preventDefault();
        // 创将一个FormDate对象
        var fd = new FormData($('#form')[0]);
        // 将状态和文章内容追加到FormData对象中
        fd.append('state', '已发布');
        fd.append('content', editor2.txt.html());
        $.ajax({
            type: 'post',
            url: BigNew.article_edit,
            data: fd,
            contentType: false,
            processData: false,
            success: function(backData) {
                if (backData.code == 200) {
                    alert('文章修改成功！');
                    location.href = './article_list.html';
                };
            }
        });
    });

    // 需求五
    // 点击另存为草稿
    $('.btn-draft').on('click', function(e) {
        // 取消事件的默认行为
        e.preventDefault();
        // 创将一个FormDate对象
        var fd = new FormData($('#form')[0]);
        // 将状态和文章内容追加到FormData对象中
        fd.append('state', '');
        fd.append('content', editor2.txt.html());
        $.ajax({
            type: 'post',
            url: BigNew.article_edit,
            data: fd,
            contentType: false,
            processData: false,
            success: function(backData) {
                if (backData.code == 200) {
                    alert('草稿另存成功！');
                    location.href = './article_list.html';
                };
            }
        });
    });

});