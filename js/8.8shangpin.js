$(function(){

		//页面刷新获取购物车
	sc_car();

	function sc_car(){
		var sc_car=$.cookie('goods');
		if(sc_car){			//如果购物车不为空
			var sc_obj=eval(sc_car);
			var sc_num=0;
			for(var i in sc_obj){
				sc_num = Number(sc_obj[i].num) + sc_num;
			}
			//console.log(sc_num)
			$('.my-cart .addcart-num').html(sc_num);
			$('.my-cart .sl').html(sc_num);
			$('.my-cart .checkout').find('i').html(sc_num)	;	
		}
					
	}


	// 左侧二级菜单
	
	show($('#navWrapper').find('.title'),$('#navWrapper').find('.category'))
	hide($('#navWrapper').find('.title'),$('#navWrapper').find('.category'))
	show($('#navWrapper').find('.category'),$('#navWrapper').find('.category'))
	hide($('#navWrapper').find('.category'),$('#navWrapper').find('.category'))
	for(var i=0;i<$('#navWrapper .menu').find("li").length;i++){
		show($('#navWrapper .menu').find("li").eq(i),$('#navWrapper .category').find('.cont').eq(i));
		hide($('#navWrapper .menu').find("li").eq(i),$('#navWrapper .category').find('.cont').eq(i));
		show($('#navWrapper .category').find('.cont').eq(i),$('#navWrapper .category').find('.cont').eq(i))
		hide($('#navWrapper .category').find('.cont').eq(i),$('#navWrapper .category').find('.cont').eq(i))
	}

	//显示   隐藏函数
	function show(source,show){
		source.mouseenter(function(){
			//console.log("+")
			show.css('display','block');
		})
	}
	function hide(source,hide){
		source.mouseleave(function(){
			hide.css('display','none')
		})
	}


	$.ajax({	  
		url:'../data/tiantianfloor.json',
		type:"GET",
		success:function(res){
			//console.log(res)  //cs ww
			//floor1
			for(var i=0;i<21;i++){
				var html="<li><dl>";
				html+='<dt><a href="##"><img src="'+res[i].url+'" alt="" id='+res[i].id+'></a></dt>';
				html+='<dd><a href="##" id='+res[i].id+'>'+res[i].name+'</a></dd>';
				html+='<span><a href="#">促销价：¥<em>'+res[i].em1+'</em></a><b class="add_change" id='+res[i].id+'></b></span>';
				html+='<p class="addTip"><i></i><strong>成功加入购物车</strong></p>';
				html+="</dl></li>"
				$('.floor1 .sale').children('ul').append(html);
			}

			//floor2
			for(var i=22;i<33;i++){
				var html="<li><dl>";
				html+='<dt><a href="##"><img src="'+res[i].url+'" alt="" id='+res[i].id+'></a></dt>';
				html+='<dd><a href="##" id='+res[i].id+'>'+res[i].name+'</a></dd>';
				html+='<span><a href="#">促销价：¥<em>'+res[i].em1+'</em></a><b class="add_change" id='+res[i].id+'></b></span>';
				html+='<p class="addTip"><i></i><strong>成功加入购物车</strong></p>';
				html+="</dl></li>"
				$('.floor2 .sale').children('ul').append(html);
			}

			//floor3
			for(var i=34;i<res.length;i++){
				var html="<li><dl>";
				html+='<dt><a href="##"><img src="'+res[i].url+'" alt="" id='+res[i].id+'></a></dt>';
				html+='<dd><a href="##" id='+res[i].id+'>'+res[i].name+'</a></dd>';
				html+='<span><a href="#">促销价：¥<em>'+res[i].em1+'</em></a><b class="add_change" id='+res[i].id+'></b></span>';
				html+='<p class="addTip"><i></i><strong>成功加入购物车</strong></p>';
				html+="</dl></li>"
				$('.floor2 .sale').children('ul').append(html);
			}


			//添加购物车
			$('.sale dl').on('click','.add_change',function(){

				//alert(1); 
					
				var id=this.id;
				//console.log(id)
				var first = $.cookie('goods')==null?true:false;//判断是否有cookie进行添加
				var same=false;
				//第一次添加
				if(first){
					//第一次，建立json结构
					console.log("-")
					$.cookie('goods','[{id:'+id+',num:1}]',{expires:7,path:'/'});
					$.cookie('first','false',{expires:7,path:'/'});
				}else{
					var str=$.cookie('goods');
					var arr=eval(str);
					//遍历所有对象，如果id相同，则数量增加
					for(var attr in arr){
						if(arr[attr].id == id){
							arr[attr].num =arr[attr].num +1; //数量增加
							var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
							$.cookie('goods',cookieStr,{expires:7,path:'/'});
							same = true;
						}
					}
						//如果id不同，重新建立商品
					if(!same){
						console.log("=")
						var obj={id:id,num:1};
						
						arr.push(obj);
						
						var cookieStr=JSON.stringify(arr);
						//console.log(cookieStr)
						$.cookie('goods',cookieStr,{expires:7,path:'/'});
					}
				}
				//console.log($.cookie('goods'));
				sc_car();
				//购物车加入成功的提示
				// var t=0;
				// var timer=setInterval(function(){
				// 		t++;
				// 		console.log(t)
				// 		$(this).find('.addTip').css('display','block');
				// 		if(t>2){
				// 			console.log("+")
				// 			clearInterval(timer);
				// 			$('.addTip').css('display','none');
				// 			t=0;
				// 		}
				// },1000);

					
			})   // end 添加购物车

				//商品跳转详情页
			$('.sale dt').on('click','img',function(){
				//alert(this.id)
				var id=this.id;
				$.cookie('buyId',id)
				window.location.href="xiangqing.html"
			})

			$('.sale dd').on('click','a',function(){
				//alert(this.id)
				var id=this.id;
				$.cookie('buyId',id)
				window.location.href="xiangqing.html"
			})


		}  //end success
	})		//end ajax




})