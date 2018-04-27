


1. 登陆接口

url: '/users/login'

method: GET

params: username password

response: success {nickname:'',username:''}

          用户名不存在  1

          密码错误      2

---

2. 注册接口

url: '/users/register'

method: POST

params: username password nickname

response: success     0 

          用户名已存在  1


---

2. banner接口

url: '/banner'

method: get


response: [{bid,title,url}]


---

3. 加入购物车

url: '/goods/add'
method:post
username,goodid

加入成功  0 失败 1

---

4. 获取商品数据

url: '/goods/getGoods'

method:'get'

pageNum  pageSize