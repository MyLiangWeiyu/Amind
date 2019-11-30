window.addEventListener('load',function(){
	let header = document.querySelector('.header');
	let ul_box = document.getElementById("ul_box");
	let lis = ul_box.getElementsByTagName('li')
	let tbody = document.querySelector("tbody");
	let username = document.getElementById("username");
	let password = document.getElementById("password");
	let cofpassword = document.getElementById("cofpassword");
	let addUser = document.getElementById("addUser");
	let u_dele = document.getElementsByClassName('u_dele');
	let u_modify = document.getElementsByClassName('u_modify');
	let zg = document.querySelector('.zg');
	let zg_user = document.getElementById("zg_user");
	let zg_pass = document.getElementById("zg_pass");
	let define = document.getElementById("define");
	let cancel = document.getElementById("cancel");
	let query = document.getElementById("query");
	let queryName = document.getElementById("queryName");
	let position = document.getElementById("position");
	let enterpr = document.querySelector(".enterprise");
	//取消定时
	let clear=null;
	
	//获取用户登录的密码和用户名
	let data = JSON.parse(localStorage.getItem('newitem')||'[]');
	let users = JSON.parse(localStorage.getItem('item')||'[]');
	
	//点击添加用户
	addUser.onclick=function(){
		if(username.value.trim()==''){
			alert('用户名不能为空')
		}else if(password.value.trim()==''){
			alert('密码不能为空')
		}else if(cofpassword.value.trim()==''){
			alert('密码不能为空')
		}else if(password.value.trim() != cofpassword.value.trim()){
			alert('输入的密码不一致')
		}else{
			//添加用户
			let result2 = users.some(function(item){
				if(item.user == username.value){
					return true;
				}
			})
			if(result2){
				alert('该用户名已被添加了，请重新输入')
				return;
			}
			alert('添加成功');
			let obj ={"user":username.value,"pass":password.value,"date":Date.now()};
			users.push(obj);
			localStorage.setItem('item',JSON.stringify(users))
			enterprise();
			username.value='';
			password.value='';
			cofpassword.value='';
		}
	}
	
//企业管理列表
	enterprise();
	function enterprise(){
		tbody.innerHTML='';
		for (let item of users){
			tbody.innerHTML+=`
				<tr>
					<td>${item.user}</td>
					<td>${item.pass}</td>
					<td>${fmt(item.date)}</td>
					<td>
						<a href="javascript:;" class="u_dele">删除</a>
						<a href="javascript:;" class="u_modify">修改</a>
					</td>
				</tr>`
		}
		//删除用户
		delect()
		
		//修改
		modify()
	}
	
	
	//时间格式
	function fmt(data){
		let date = new Date(data);
		let year = date.getFullYear();//获取年
		let month = date.getMonth()+1;//获取月
		let day = date.getDate();//获取日
		let h = date.getHours();//获取时
		let m = date.getMinutes();//获取分
		let s = date.getSeconds();//获取秒
		
		return `${year}年${month}月${day}号 ${h}:${m}:${s}`
	}
	
	//删除
	function delect(){
		
		for(let i=0;i<u_dele.length;i++){
			u_dele[i].addEventListener('click',function(e){
				let flag = confirm('真的要删除?');
				if(flag){
					let target = e.target.parentNode.parentNode.firstElementChild.innerHTML;
					users.some(function(item,index){
						if(item.user === target){
							users.splice(index,1)
							localStorage.setItem('item',JSON.stringify(users))
							enterprise();
						if(u_dele.length<=0){
							alert("已删除所有用户，请重新注册");
								window.location.href='./index.html';
						}
							return true;
					}
			})
		}
	})
}
}
	
	//修改
	function modify(){
		//修改
		for(let i =0 ;i<u_modify.length;i++){
			u_modify[i].addEventListener('click',function(e){
				let texts = e.target.parentNode.parentNode.children
				zg.style.display="block"
				zg_user.value=texts[0].innerHTML;
				zg_pass.value=texts[1].innerHTML;
				window.old_user=zg_user.value;
			})
		}
	}
	
	//确定修改
	define.onclick=function(){
		zg.style.display="none"
		console.log(old_user)
		users.some(function(item,index){
			if(item.user === old_user){
				let obj = {"user":zg_user.value,"pass":zg_pass.value,"date":Date.now()};
				users.splice(index,1,obj)
				console.log(users)
				
				enterprise();
				return true;
			}
		})
		localStorage.setItem('item',JSON.stringify(users))
	}
	
	//取消修改
	cancel.onclick=function(){
		zg.style.display="none"
	}
	
	//搜索
	query.onclick=function(){
		let newusers=users.filter(function(item,index){
			return item.user.includes(queryName.value)
		})
	
		tbody.innerHTML='';
		for (let item of newusers){
			tbody.innerHTML+=`
				<tr>
					<td>${item.user}</td>
					<td>${item.pass}</td>
					<td>${fmt(item.date)}</td>
					<td>
						<a href="javascript:;" class="u_dele">删除</a>
						<a href="javascript:;" class="u_modify">修改</a>
					</td>
				</tr>`
		}
	}
	
	//判断是否登录进来
	if(data.length<=0){
		
		//防止越墙过来
		document.write("<h1>请登录</h1>");
		clearTimeout(clear);
		clear=setTimeout(function(){
			window.location.href='./index.html';
		},3000)
	}else{
		//登录成功
		header.innerHTML='欢迎:'+data.user
		for(let i =0;i<lis.length;i++){
			lis[i].onclick=function(e){
				for(let j=0;j<lis.length;j++){
					lis[j].className=''
				}
				
				this.className='active';
				if(this.innerHTML==='退出登录'){
					let result = confirm("您确定要退出登录？");
					if(result){
						localStorage.removeItem("newitem");
						window.location.href='./index.html';
					}
				}else if(this.innerHTML==='职位管理'){
					enterpr.style.display="none";
					position.style.display="block";
				}else if(this.innerHTML==='企业管理'){
					enterpr.style.display="block";
					position.style.display="none"
				}
			}
		}
	}
})