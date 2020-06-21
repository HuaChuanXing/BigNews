 // 入口函数
 $(function() {
     // 思路分析：
     // 需求一：
     // 发送ajax请求，将请求回来的数据，展示在对应的位置
     $.ajax({
         type: 'get',
         url: BigNew.user_detail,
         success: function(backData) {
             if (backData.code == 200) {
                 $('.username').val(backData.data.username); //用户名
                 $('.nickname').val(backData.data.nickname); //昵称
                 $('.email').val(backData.data.email); //邮箱
                 $('.password').val(backData.data.password); //密码
                 $('.user_pic').attr('src', backData.data.userPic); //头像
             };
         }
     });

     // 需求二：
     // 头像预览
     $('#exampleInputFile').on('change', function() {
         // 获取选中的头像
         var file = this.files[0];
         // 创建一个url地址
         var url = URL.createObjectURL(file);
         // 将创建的url地址给img预览标签
         $('.user_pic').attr('src', url);
     });

     // 需求三：
     // 完成用户中心修改
     // 1.给修改按钮创建点击事件
     // 2.取消按钮的默认行为
     // 3.创建一个FormData对象
     // 4.发送ajax请求，完成用户信息修改
     // 5.请求成功后，局部刷新页面

     // 1.给修改按钮创建点击事件
     $('.btn-edit').on('click', function(e) {
         // 2.取消按钮的默认行为
         e.preventDefault();
         // 3.创建一个FormData对象
         var fd = new FormData($('#form')[0]);
         // 4.发送ajax请求，完成用户信息修改
         $.ajax({
             type: 'post',
             url: BigNew.user_edit,
             data: fd,
             contentType: false,
             processData: false,
             success: function(backData) {
                 if (backData.code == 200) {
                     alert('编辑成功！');
                     // 再次调用首页的ajax方法，完成首页的局部更新（使用parent.的方式，找到父页面）
                     $.ajax({
                         type: 'get',
                         url: BigNew.user_info,
                         headers: {
                             Authorization: localStorage.getItem('token')
                         },
                         success: function(backData) {
                             if (backData.code == 200) {
                                 parent.$('.user_info img').attr('src', backData.data.userPic);
                                 parent.$('.user_info span>i').text(backData.data.nickname);
                                 parent.$('.user_center_link img').attr('src', backData.data.userPic);
                             };
                         }
                     });
                 };
             }
         });
     });
     // 5.请求成功后，局部刷新页面
 });