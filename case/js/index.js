window.addEventListener("load",function(){
	let log = document.getElementById("log");
	let reg = document.getElementById("reg");
	let login = document.getElementById("login");
	let regis = document.getElementById("regis");
	
	//登录密码和用户
	let username = document.getElementById("username");
	let password = document.getElementById("password");
	let errName = document.getElementById("errName");
	let errPas = document.getElementById("errPas");
	
	//注册密码和用户
	let username1 = document.getElementById("username1");
	let password1 = document.getElementById("password1");
	let cofpassword = document.getElementById("cofpassword");
	let errName1 = document.getElementById("errName1");
	let errPas1 = document.getElementById("errPas1");
	let errPas2 = document.getElementById("errPas2");
	
	//保存用户名和密码
	let users = JSON.parse(localStorage.getItem("item") || '[]');
	
	//点击登录
	log.onclick=function(){
		
		reg.className="";
		this.className="active";
		regis.style.transform="translateX(-200%)"
		login.style.transform="translateX(0%)"
		isEmpty(this,username,password,errName,errPas)
	}
	
	
	//点击注册
	reg.onclick=function(){
		
		log.className="";
		this.className="active";
		login.style.transform="translateX(-200%)"
		regis.style.transform="translateX(0%)"
		isEmpty(this,username1,password1,errName1,errPas1,errPas2,cofpassword)
	}
	
	//判断用户输入是否为空
	function isEmpty(than,username,password,errname,errpas,errpas2,cofpassword){
		
		if(than.innerHTML=='登录'){
			if(username.value.trim() == ''){
				errname.innerHTML = '用户名不能为空';
			} 
			if(password.value.trim() == ''){
				errpas.innerHTML = '密码不能为空';
			}
			if(username.value.trim() != '' && password.value.trim() != ''){
				errname.innerHTML = '';
				errpas.innerHTML = '';
				
				let result = users.some(function(item){
					if(item.user == username.value && item.pass == password.value){
						localStorage.setItem('newitem',JSON.stringify(item))
						return true;
					}
				})
				
				if(result){
					username.value='';
					password.value='';
					alert('登录成功')
					window.location.href='./main.html';
				}else{
					username.value='';
					password.value='';
					alert('您输入的用户名或密码错误')
				}
			}
			
		}else{
			
			if(username.value.trim() == ''){
				errname.innerHTML = '用户名不能为空';
			}
			if(password.value.trim() == ''){
				errpas.innerHTML = '密码不能为空';
			}
			if(cofpassword.value.trim() == ''){
				errpas2.innerHTML = '密码不能为空';
			}else if(password.value.trim()!=cofpassword.value.trim()){
				errpas2.innerHTML = '密码不一致,请重新输入';
			}else{
				if(username.value.trim() != '' && password.value.trim() != ''){
					let result2 = users.some(function(item){
						if(item.user == username.value){
							return true;
						}
					})
					errname.innerHTML = '';
					errpas.innerHTML = '';
					errpas2.innerHTML = '';
					if(result2){
						alert('该用户名已被注册了，请重新输入')
						return;
					}
					
					//添加用户
					let obj ={"user":username.value,"pass":password.value,"date":Date.now()};
					users.push(obj);
					localStorage.setItem('item',JSON.stringify(users))
					username.value='';
					password.value='';
					cofpassword.value='';
					alert("注册成功")
				}
			}
		}
		
	}
})