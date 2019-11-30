window.addEventListener('load',function(){
	let addPosition = document.getElementById("addPosition");
	let job = document.getElementById("job");
	let salary = document.getElementById("salary");
	let jobRe = document.getElementById("jobRe");
	let cName = document.getElementById("cName");
	let cProfile = document.getElementById("cProfile");
	let position_zg = document.getElementById('position_zg');
	let dete = document.getElementById("dete");
	let cc = document.getElementById("cc");
	let position = document.getElementById("position");
	let ul = position.querySelector("ul");
	let p_removes = document.getElementsByClassName("p_remove");
	let p_edits = document.getElementsByClassName("p_edit");
	let po_edits = document.getElementById("po_edit");
	//数据
	let lists=[
		{
			"job":"前端工程师",
			"salary":"20k-30k",
			"jobRe":"经验1-3年/本科",
			"cName":"邮政银行",
			"cProfile":"社交软件/不需要融资/50-1000人",
			"date":Date.now()
		},
		{
			"job":"后端工程师",
			"salary":"20k-30k",
			"jobRe":"经验1-3年/本科",
			"cName":"邮政银行",
			"cProfile":"社交软件/不需要融资/50-1000人",
			"date":Date.now()
		},
		{
			"job":"运维工程师",
			"salary":"20k-30k",
			"jobRe":"经验1-3年/本科",
			"cName":"邮政银行",
			"cProfile":"社交软件/不需要融资/50-1000人",
			"date":Date.now()
		}
	]
	
	//添加职位
	addPosition.addEventListener('click',pShow);
	//确定添加
	dete.addEventListener('click',pDete);
	//取消
	cc.addEventListener('click',pHide);
	
	//渲染列表
	demo()
	function demo(){
		ul.innerHTML='';
		for(let item of lists){
			ul.innerHTML+=`
			<li>
				<div class="p_left">
					<h3>${item.job}</h3>
					<p class="price">
						<span>${item.salary}</span>
						<span>${item.jobRe}</span>
					</p>
					<p class="move">
						<span>移动端</span>
						<span>前端开发</span>
					</p>
				</div>
				<div class="p_main">
					<h3>${item.cName}</h3>
					<p>${item.cProfile}</p>
					<div class="a_container">
						<a class='p_remove' href="javascript:;">删除</a>
						<a class='p_edit' href="javascript:;">编辑</a>
						<span>发布时间:${fmt(item.date)}<span>
					</div>
				</div>
				<div class="p_right">
					<div class="img_box"></div>
				</div>
			</li>
			`
		}
	Delebox();
	Editbox();
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
	
	function pShow(){
		position_zg.style.display="block";
		po_edits.style.visibility="hidden";
		dete.style.visibility="visible";
	}
	function pDete(name){
		if(job.value.trim()==''){
			alert('职位名称不能为空')
		}else if(salary.value.trim()==''){
			alert('薪水不能为空')
		}else if(jobRe.value.trim()==''){
			alert('职位要求不能为空')
		}else if(cName.value.trim()==''){
			alert('公司名称不能为空')
		}else if(cProfile.value.trim()==''){
			alert('公司简介不能为空')
		}else{
			let result = lists.some(function(item,index){
				if(item.job === job.value && item.cName==cName.value){
					return true;
				}
			})
			if(result){
				alert('该职位已经添加了,请勿重复添加')
				return;
			}
			name='添加成功'
			alert(name)
			let obj = {
			"job":job.value.trim(),
			"salary":salary.value.trim(),
			"jobRe":jobRe.value.trim(),
			"cName":cName.value.trim(),
			"cProfile":cProfile.value.trim(),
			"date":Date.now()
		}
			job.value='';
			salary.value='';
			jobRe.value='';
			cName.value='';
			cProfile.value='';
			
			lists.unshift(obj)
			demo()
		}
	}
	
	function pHide(){
		position_zg.style.display="none"
	}
	
	//删除
	Delebox()
	function Delebox(){
		for(let i = 0 ; i<p_removes.length;i++){
			p_removes[i].onclick=function(){
				let flag = confirm('确定删除吗?');
				if(flag){
				let childs = this.parentNode.parentNode.parentNode.children;
				let one = childs[0].firstElementChild.innerHTML;
				let two = childs[1].firstElementChild.innerHTML;
				lists.some(function(item,index){
					if(item.job === one && item.cName==two){
						lists.splice(index,1)
						demo()
						return true;
				}
		})
	}
	}
}
}
	//编辑
	Editbox()
	function Editbox(){
	
		for(let i = 0 ; i<p_edits.length;i++){
			p_edits[i].onclick=function(){
				po_edits.style.visibility="visible";
				dete.style.visibility="hidden";
				let childs = this.parentNode.parentNode.parentNode.children;
				let ones = childs[0].children;
				let cs = ones[1].children;
				let twos = childs[1].children;
				 console.log(ones,twos,cs)
				position_zg.style.display="block";
				job.value = ones[0].innerHTML;
				salary.value = cs[0].innerHTML ;
				jobRe.value = cs[1].innerHTML;
				cName.value = twos[0].innerHTML;
				cProfile.value = twos[1].innerHTML;
				po_edits.onclick=function(){
					lists.some(function(item,index){
						if(item.job === ones[0].innerHTML && item.cName==twos[0].innerHTML){
							let obj = {
									"job":job.value.trim(),
									"salary":salary.value.trim(),
									"jobRe":jobRe.value.trim(),
									"cName":cName.value.trim(),
									"cProfile":cProfile.value.trim(),
									"date":Date.now()
								};
							lists.splice(index,1,obj)
							console.log(lists)
							alert('修改成功');
							position_zg.style.display="none"
							job.value='';
							salary.value='';
							jobRe.value='';
							cName.value='';
							cProfile.value='';
							demo()
							return true;
						}
					})
				}
				
			}
		}
	}
	
})