$(function() {
    // 需求一：
    var searchVal = location.search.split('=');
    var searchKey = searchVal[0];
    var searchContent = decodeURI(searchVal[1]);

    if (searchKey == '') {
        // 重定向到首页去
        location.href = './index.html';
    } else if (searchKey == '?categoryId') {
        // 通过文章类别进入
        $.ajax({
            type: 'get',
            url: 'http://localhost:8080/api/v1/index/search',
            data: {
                type: searchContent,
                page: 1,
                perpage: 6
            },
            success: function(backData) {
                // console.log(backData);
                if (backData.code == 200) {
                    var resHtml = template('searchArticle', backData);
                    if (backData.data.data.length != 0) {
                        $('.setfr').html('<div class="list_title"><h3>' + backData.data.data[0].category + '</h3>\</div>' + resHtml);
                    } else {
                        $('.setfr').html('没有数据~！');
                    };
                };
            }
        });
    } else if (searchKey == '?searchTxt') {
        // 通过关键词搜索进入
        $.ajax({
            type: 'get',
            url: 'http://localhost:8080/api/v1/index/search',
            data: {
                key: searchContent,
                page: 1,
                perpage: 5
            },
            success: function(backData) {
                // console.log(backData);
                if (backData.code == 200) {
                    var resHtml = template('searchArticle', backData);
                    if (backData.data.data.length != 0) {
                        $('.setfr').html('<div class="list_title"><h3>搜索词：' + searchContent + '</h3>\</div>' + resHtml);
                    } else {
                        $('.setfr').html('没有数据~！');
                    };
                };
            }
        });
    };
});