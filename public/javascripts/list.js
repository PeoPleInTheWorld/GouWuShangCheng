

var pageNum = 0;
var pageSize = 2;

_init()

function _init(){
    getGoods(true,renderGoods)
}

function getGoods(type,callback){

    pageNum+= type?1:-1
    console.log(pageNum)
    $.ajax({
        url:'/goods/getGoods',
        data:{
            pageNum:pageNum,
            pageSize:pageSize
        },
        success:function(results){
            if(!results.length){
                alert(type?'已经到最后了':'已经是第一页了')
                pageNum+= type?-1:1
            }else{
                callback(results)
            }
            $("#pageNum").html(pageNum)
        }
    })
}

function renderGoods(goods){
    let str =''
    goods.forEach(function(good,index){
        str+=`
            <div class="col-xs-12 col-md-6 col-lg-3">
                <div class="thumbnail">
                    <img class="good-img" tite="${good.title}" src="${good.imgurl}" alt="...">
                    <div class="caption">
                        <h3><a href="/detail?goodid=${good.goodid}">${good.title}</a></h3>
                        <p>${good.description}</p>
                        <p class="clearfix">
                            <button class="btn btn-danger pull-left" role="button">￥：${good.price}</button>
                            <button data-id="${good.goodid}" class="btn btn-primary pull-right buy-btn" role="button">加入购物车</button>
                        </p>
                    </div>
                </div>
            </div>
        `
    })
    $(".good-row").html(str)
}


function changePage(type){
    getGoods(type,renderGoods)
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