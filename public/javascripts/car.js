_init()

function _init(){
    renderAllInfo()
}

//计算总价钱总数量并渲染
function renderAllInfo(){
    let all_money = 0
    let all_num = 0
    $(".good-money").each(function(i){
        all_money+=parseFloat($(this).html())
    })
    $(".good-num").each(function(i){
        all_num+=parseFloat($(this).html())
    })

    $(".all_money").html(all_money)
    $(".all_num").html(all_num)
}




//防止在请求过程中再次请求的开关
let isAjax = false

$(".good-row").delegate(".add-btn","click",function(){
    if(isAjax){return ;}
    isAjax=true
    let user_info = JSON.parse($.cookie("user_info"))
    if(!user_info){
        alert('请登陆后操作')
        return ;
    }
    let username = user_info.username
    let goodid = $(this).data("id")
    let that = this
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
                //更改页面显示的价钱
                let price = parseFloat($(that).parents('.good-item').find('.good-price').html())
                //更改页面显示的数量
                let now_num = parseFloat($(that).siblings('.good-num').html())+1

                $(that).siblings('.good-num').html(now_num)
                $(that).parents('.good-item').find('.good-money').html(price*now_num)

                renderAllInfo()
                isAjax=false
            }
        }
    })
})

//reduce
$(".good-row").delegate(".reduce-btn","click",function(){
    if(isAjax){return ;}
    isAjax=true
    let user_info = JSON.parse($.cookie("user_info"))
    if(!user_info){
        alert('请登陆后操作')
        return ;
    }
    let username = user_info.username
    let goodid = $(this).data("id")
    let that = this
    $.ajax({
        url:'/goods/reduce.do',
        type:'post',
        data:{
            username:username,
            goodid:goodid
        },
        success:function(results){
            console.log(results)
            isAjax=false

            switch(results){
                case '0':alert('操作失败，请稍后再试');break;
                case '1':
                    let price = parseFloat($(that).parents('.good-item').find('.good-price').html())
                    //更改页面显示的数量
                    let now_num = parseFloat($(that).siblings('.good-num').html())-1
                    $(that).siblings('.good-num').html(now_num)
                    $(that).parents('.good-item').find('.good-money').html(price*now_num)
                    renderAllInfo()
                    break;
                case '2':                   
                    $(that).parents('.good-item').remove();
                    renderAllInfo()
                     break;

            }
        }
    })
})

//remove
$(".good-row").delegate(".remove-btn","click",function(){
    if(isAjax){return ;}
    isAjax=true
    let user_info = JSON.parse($.cookie("user_info"))
    if(!user_info){
        alert('请登陆后操作')
        return ;
    }
    let username = user_info.username
    let goodid = $(this).data("id")
    let that = this
    $.ajax({
        url:'/goods/remove.do',
        type:'post',
        data:{
            username:username,
            goodid:goodid
        },
        success:function(results){
            console.log(results)
            isAjax=false

            switch(results){
                case '1':alert('操作失败，请稍后再试');break;
                case '0':
                    $(that).parents('.good-item').remove();
                    renderAllInfo()
                    break;
            }
        }
    })
})


//remove
$(".good-row").delegate(".clear-btn","click",function(){
    if(isAjax){return ;}
    isAjax=true
    let user_info = JSON.parse($.cookie("user_info"))
    if(!user_info){
        alert('请登陆后操作')
        return ;
    }
    let username = user_info.username
    let that = this
    $.ajax({
        url:'/goods/clear.do',
        type:'post',
        data:{
            username:username
        },
        success:function(results){
            console.log(results,1)
            isAjax=false
            switch(results){
                case '1':alert('操作失败，请稍后再试');break;
                case '0':
                    $(".good-row").html('<img class="center-block" src="/images/nogoods.jpg" alt="">')
                    break;
            }
        }
    })
})