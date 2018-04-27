
init()

function init(){
    check_login()
    initSwiper()
}

function check_login(isNull){
    let _isNull= isNull || true
    var user_info = $.cookie("user_info")   
    if(user_info&&_isNull){
        $(".user-info").removeClass("hidden").find(".nickname").text(JSON.parse(user_info).nickname)
        $(".control-btn").addClass("hidden")   
    }else{
        $(".user-info").addClass("hidden")
        $(".control-btn").removeClass("hidden")   
    }
}


function exit(){
    $.cookie('user_info',null)
    check_login(false)
}



function initSwiper(){
    var mySwiper = new Swiper ('.swiper-container', {
        loop: true,                
        // 如果需要分页器
        pagination: '.swiper-pagination',                
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplay: 1500
    })      
}

$(".goods-box").delegate('.buy-btn','click',function(){
    let user_info = JSON.parse($.cookie("user_info"))
    if(!user_info){
        alert('请登陆后操作')
        return ;
    }
    let username = user_info.username
    let goodid = $(this).data("id")
    $.ajax({
        url:'/goods/add.do',
        type:'post',
        data:{
            username:username,
            goodid:goodid
        },
        success:function(results){
            if(results==1){
                alert('加入失败，请稍后重试')
            }else{
                alert('成功')
            }
        }
    })
})
