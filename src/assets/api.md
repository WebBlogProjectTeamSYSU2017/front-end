# __API__
## 创建用户 [url: /signup]
```
method:POST
body:
{
	"username":"username"
	"email": "382673304@qq.com"
	"password":"123456"
}
```
返回值：
```
{
	"ok" : bool: 是否创建成功
	"data" :  string：错误信息
}
```

## 用户登录 [url: /login]
```
method:POST
head:{
	"token":"XXXXX" //可以为空
}
body:
{
	"email": "382673304@qq.com"
	"password":"123456"
}
```
返回值:
```
{
	"ok" : bool: 是否登录成功
	"data" :  string：错误信息
}
```

## 创建博客 [url: /{email}/createblog/]
```
method:POST
head:{
	"token":"XXXXX" //可以为空
}
body:
{
	"title": string 博客标题
	"ispublic": string 是否公开："0" 为私密
	"content": string博客内容
	"tag": string 博客摘要
}
```
返回值:
```
{
	"ok" : bool: 是否创建成功
	"data" :  string：错误信息
}
```

## 获取当前用户所有博客 [url: /{email}/bloghome/]
```
method:GET
head:{
	"token":"XXXXX" 
}
body:
{
	
}
```
返回值:
```
{
	"ok" : bool: 是否获取成功
	"data" :{
		{"id":"dagwewewfcwfedcwe",
		"creatoremail":"1111@qq.com"
		,"createtime":"2019-11-28 23:25:48",
		"title":"你好呀_private",
		"ispublic":"0",
		"content":"hellow world",
		"tag":"这是tag"},
		
		{"id":"dagwewewfcwfedcwe",
		"creatoremail":"1111@qq.com"
		,"createtime":"2019-11-28 23:25:48",
		"title":"你好呀_private",
		"ispublic":"0",
		"content":"hellow world",
		"tag":"这是tag"},
		...
	}
}
```

## 获取所有可见博客 [url: /{email}/blogground/]
```
method:GET
head:{
	"token":"XXXXX" 
}
body:
{
	
}
```
返回值:
```
{
	"ok" : bool: 是否获取成功
	"data" :{
		{"id":"dagwewewfcwfedcwe",
		"creatorname":"LZX"
		,"createtime":"2019-11-28 23:25:48",
		"title":"你好呀_private",
		"content":"hellow world",
		"tag":"这是tag"},
		
		{"id":"dagwewewfcwfedcwe",
		"creatorname":"LZX"
		,"createtime":"2019-11-28 23:25:48",
		"title":"你好呀_private",
		"content":"hellow world",
		"tag":"这是tag"},
		...
	}
}
```

## 删除自己的博客 [url: /{email}/bloghome]
```
method:DELETE
head:{
	"token":"XXXXX" 
}
body:
{
	"id": "dwogejge"string 博客ID
}
```
返回值:
```
{
	"ok" : bool: 是否获取成功
	"data" : string 错误信息
}
```
