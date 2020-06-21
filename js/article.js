$(function() {
    // 获取传过来的id
    var articleId = location.search.split('=')[1];

    if (articleId == undefined) {
        location.href = './list.html';
    };

    // 页面一加载就获取文章的详细信息
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/article',
        data: {
            id: articleId
        },
        success: function(backData) {
            if (backData.code == 200) {
                // var resHtml = template('article',backData);
                $('.article_title').text(backData.data.title);
                $('.article_info').text(backData.data.author + '发布于 ' + backData.data.date + ' 分类: ' + backData.data.category + ' 阅读: (' + backData.data.read + ')   评论: (' + backData.data.comments + ')');
                $('.article_con').html(backData.data.content);
                $('.breadcrumb>a:eq(1)').text(backData.data.category);

                if (backData.data.prev == null) {
                    $('.article_links>a:eq(0)').text('没有上一篇文章');
                } else {
                    $('.article_links>a:eq(0)').text(backData.data.prev.title).attr('href', './article.html?id=' + backData.data.prev.id);
                };
                if (backData.data.next == null) {
                    $('.article_links>a:eq(1)').text('没有下一篇文章');
                } else {
                    $('.article_links>a:eq(1)').text(backData.data.next.title).attr('href', './article.html?id=' + backData.data.next.id);
                };
            };
        }
    });

    // 给评论按钮创建点击事件
    $('.comment_sub').on('click', function(e) {
        // 取消submit按钮的默认提交行为
        e.preventDefault();
        // 获取输入框中的内容
        var userName = $('.comment_name').val().trim();
        var userCon = $('.comment_input').val().trim();
        // 发送ajax请求，发送评论
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/index/post_comment',
            data: {
                author: userName,
                content: userCon,
                articleId: articleId
            },
            success: function(backData) {
                console.log(backData);
                if (backData.code == 201) {
                    alert('评论发表成功，等待管理员审核！');
                    $('.comment_name').val('');
                    $('.comment_input').val('');
                };
            }
        });
    });

    // 获取当前文章的所有的评价
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/get_comment',
        data: {
            articleId: articleId
        },
        success: function(backData) {
            console.log(backData);
            if (backData.code == 200) {
                var resHtml = template('get_comment', backData);
                $('.comment_list_con').html(resHtml);
                $('.comment_count').text(backData.data.length + '条评论');
            };
        }
    });
});