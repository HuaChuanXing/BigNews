$(function() {

    // 三：热门排行
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/rank',
        success: function(backData) {
            // console.log(backData);
            if (backData.code == 200) {
                var resHtml = template('rank', backData);
                $('.hotrank_list').html(resHtml);
            };
        }
    });

    // 四：最新评论
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/latest_comment',
        success: function(backData) {
            // console.log(backData);
            if (backData.code == 200) {
                var resHtml = template('latest_comment', backData);
                $('.comment_list').html(resHtml);
            };
        }
    });

    // 五：焦点关注
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/attention',
        success: function(backData) {
            // console.log(backData);
            if (backData.code == 200) {
                var resHtml = template('attention', backData);
                $('.guanzhu_list').html(resHtml);
            };
        }
    });

    // 六：文章类型
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/category',
        success: function(backData) {
            // console.log(backData);
            if (backData.code == 200) {
                var resHtml = template('category', backData);
                // 竖排结构
                $('.level_two').html('<li class="up"></li>' + resHtml);
                // 横排结构
                $('.left_menu').html(resHtml);
            };
        }
    });

    // 七：给搜索按钮创建点击事件
    $('.search_btn').on('click', function(e) {
        // 取消按钮的默认行为
        e.preventDefault();
        // 获取输入框中的值
        var searchTxt = $('.search_txt').val().trim();
        // 非空判断
        if (searchTxt == '') {
            alert('请输入你想要搜索的内容！');
            return;
        };
        location.href = './list.html?searchTxt=' + searchTxt;
    });

});