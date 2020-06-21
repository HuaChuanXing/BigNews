 // 入口函数
 $(function() {
     // 思路分析：
     // 需求一：
     // 一加载页面，就获取到用户的信息在对应的位置
     $.ajax({
         type: 'get',
         url: BigNew.user_info,
         headers: {
             Authorization: localStorage.getItem('token')
         },
         success: function(backData) {
             // console.log(backData);
             if (backData.code == 200) {
                 $('.user_info img').attr('src', backData.data.userPic);
                 $('.user_info span>i').text(backData.data.nickname);
                 $('.user_center_link img').attr('src', backData.data.userPic);
             };
         }
     });

     // 需求二：
     // 点击退出按钮，退出账号
     // 1.给退出按钮创建点击事件
     // 2.移除localStorage的属性值
     $('.logout').on('click', function() {
         localStorage.removeItem('token');
         if (confirm('你确定要退出吗？')) {
             location.href = './login.html';
         };
     });

     // 需求三：
     // 给level01创建点击事件，当前点击的按钮添加一个类，其他兄弟标签移除这个添加的类
     $('.level01').on('click', function() {
         $(this).addClass('active').siblings('div').removeClass('active');
         // 判断出是否是第二个文章管理
         if ($(this).index('.level01') == 1) {
             // 滑入滑出效果
             $(this).next().stop(true, false).slideToggle(300);
             // 箭头图标的转向
             $(this).find('b').toggleClass('rotate0');
             // 给第一个li设置默认的高亮显示
             $(this).next().children('li').first().addClass('active').siblings().removeClass('active');
         };
     });

     // 需求四：
     // 给类名为level02的子标签设置点击事件
     $('.level02 li').on('click', function() {
         $(this).addClass('active').siblings().removeClass('active');
     });
 });