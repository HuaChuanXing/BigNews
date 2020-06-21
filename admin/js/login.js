// 思路分析：
// 1.给登录按钮创建点击事件
// 2.取消按钮的默认行为
// 3.获取输入框中的值
// 4.非空判断
// 5.发送ajax，验证账号
// 6.验证成功后，跳转到首页


// 1.给登录按钮创建点击事件
$('.input_sub').on('click', function(e) {
    // 2.取消按钮的默认行为
    e.preventDefault();
    // 3.获取输入框中的值
    var username = $('.input_txt').val().trim();
    var password = $('.input_pass').val().trim();
    // 4.非空判断
    if (username == '' || password == '') {
        // alert('用户名或密码不能为空！');
        $('.modal-body').text('用户名或密码不能为空！');
        $('#myModal').modal();
        return;
    };
    // 5.发送ajax，验证账号
    $.ajax({
        type: 'post',
        url: BigNew.user_login,
        data: {
            username: username,
            password: password
        },
        success: function(backData) {
            $('.modal-body').text(backData.msg);
            $('#myModal').modal();

            if (backData.code == 200) {
                // 将token存储到本地存储中
                localStorage.setItem('token', backData.token);
                $('#myModal').on('hide.bs.modal', function(e) {
                    // 6.验证成功后，跳转到首页
                    location.href = './index.html';
                })
            };
        }
    });
});