$(function() {
    // 一：最新资讯
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/latest',
        success: function(backData) {
            // console.log(backData);
            if (backData.code == 200) {
                var resHtml = template('latest', backData);
                $('.common_news').html(resHtml);
            };
        }
    });

    // 二：热点图
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/hotpic',
        success: function(backData) {
            // console.log(backData);
            if (backData.code == 200) {
                var resHtml = template('hotpic', backData);
                $('.focus_list').html(resHtml);
            };
        }
    });
});