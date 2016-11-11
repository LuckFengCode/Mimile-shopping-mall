$(function(){



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

	//加载商品详情
	var id = $.cookie('buyId',{path:'/'})-1;
	//console.log(id)
	$.ajax({
			url:"../data/wangzhanshangpin.json",
			type:"GET",
			success:function(res){
				//console.log(res)  cs ww
				var k=0;
				var html='';
				html+='<div class="biaoti"><h2><a href="../index.html">首页</a> &gt; ';
				html+='<a href="shangpinxiangqing.html"> 手机数码</a> &gt;';
				html+='<a href="#"> 手机通讯</a> &gt; <span>'+res[id].name+'</span></h2>';
				html+='<div class="jubao"><span>举报中心<i></i></span><br>';
				html+='<a href="##">举报该商品</a></div></div><div class="goumai clear">';
				html+='<div class="left"><div class="pic"><div class="mark_box"></div>';

				html+='<div class="big"><img src="'+res[id].url+'" alt=""></div>';
				html+='<div class="position_box"></div><div class="b_box"><div class="b_box_big">'
				html+='<img src="'+res[id].url+'" alt=""></div></div>'
				html+='<ul class="small">';
				for(var i=0;i<res[id].small.length;i++){
					html+='<li><a href="##"><img class="test" src="'+res[id].small[i]+'" alt=""></a></li>';
				}
				html+='</ul></div><div class="pic_b"><ul><li class="kaip"><a href="##"><i></i>开具增票</a></li>';
				html+='<li class="caig"><a href="##"><i></i>批发采购</a></li>';
				html+='<li class="xinq"><a href="##"><i></i>信用到账</a></li>';
				html+='</ul></div></div><div class="right"><div class="name">';
				html+='<h3>'+res[id].name+'</h3></div>';
				html+='<div class="meta"><p>零 售 价：<span style="text-decoration:line-through;">'+res[id].em2+'</span></p>';
				html+='<p>批 发 价：<strong> '+res[id].em1+' </strong>一个也批发，单单返钱花</p>';
				html+='<p class="youhui">促销信息：<span> 赠品 </span><a href="##"><img src="../images/1_05124957373420929_240.jpg" alt=""></a><i>（赠完即止）</i></p>';
				html+='<p class="pinglun">商品评价';
				for(var n=0;n<5;n++){
					if(k<res[i].value){
						html+='<img src="../images/star-on.png" title="'+res[id].pingjia+'">';
						k++;
					}else{
						if(k<5){
							html+='<img src="../images/star-off.png" title="'+res[id].pingjia+'">';
							k++;
						}
					}
				}
				html+='<a href="##">(<b>'+res[id].pinglun+'</b>条评论)</a></p><div class="youji"> 至<span>全国';
				html+='<div class="place">';
				html+='<a href="javascript:void(0)" nctype="1">北京</a><a href="javascript:void(0)" nctype="2">天津</a><a href="javascript:void(0)" nctype="3">河北</a><a href="javascript:void(0)" nctype="4">山西</a><a href="javascript:void(0)" nctype="5">内蒙古</a><a href="javascript:void(0)" nctype="6">辽宁</a><a href="javascript:void(0)" nctype="7">吉林</a><a href="javascript:void(0)" nctype="8">黑龙江</a><a href="javascript:void(0)" nctype="9">上海</a><a href="javascript:void(0)" nctype="10">江苏</a><a href="javascript:void(0)" nctype="11">浙江</a><a href="javascript:void(0)" nctype="12">安徽</a><a href="javascript:void(0)" nctype="13">福建</a><a href="javascript:void(0)" nctype="14">江西</a><a href="javascript:void(0)" nctype="15">山东</a><a href="javascript:void(0)" nctype="16">河南</a><a href="javascript:void(0)" nctype="17">湖北</a><a href="javascript:void(0)" nctype="18">湖南</a><a href="javascript:void(0)" nctype="19">广东</a><a href="javascript:void(0)" nctype="20">广西</a><a href="javascript:void(0)" nctype="21">海南</a><a href="javascript:void(0)" nctype="22">重庆</a><a href="javascript:void(0)" nctype="23">四川</a><a href="javascript:void(0)" nctype="24">贵州</a><a href="javascript:void(0)" nctype="25">云南</a><a href="javascript:void(0)" nctype="26">西藏</a><a href="javascript:void(0)" nctype="27">陕西</a><a href="javascript:void(0)" nctype="28">甘肃</a><a href="javascript:void(0)" nctype="29">青海</a><a href="javascript:void(0)" nctype="30">宁夏</a><a href="javascript:void(0)" nctype="31">新疆</a><a href="javascript:void(0)" nctype="32">台湾</a><a href="javascript:void(0)" nctype="33">香港</a><a href="javascript:void(0)" nctype="34">澳门</a><a href="javascript:void(0)" nctype="35">海外</a>';
				html+='</div></span>运费：	10.00元 ，满49元包邮 由 <em>官方店铺 </em>发货</div>';
				html+='<div class="key"><dl class="dl1"><dt>颜色:</dt><dd><ul class="clear">';
				for(var j=0;j<res[id].small.length;j++){
					html+='<li><a href="javscript:;"><img src="'+res[id].small[j]+'" alt=" "></a></li>';
					
					
				}			
				html+='</ul></dd></dl><dl class="dl2"><dt>规格：</dt><dd><a href="##">T2</a></dd>';
				html+='</dl><dl class="dl3"><dt>购买数量：</dt><dd class="number"><input type="text" value="1"/>';
				html+='<a href="##" class="jia">+</a><a href="##" class="jian">-</a></dd></dl>';
				html+='<dl class="dl4"><dt>分期付款：<br><b class="vip">1-12<s>期</s></b></dt>';
				html+='<dd class="fenqi"><p class="info">选择捷信分期付款，每月只需65.24元起&nbsp;&nbsp;</p>';
				html+='<a href="##"><img src="../images/question.png" alt=""></a>';
				html+='<p>请在订单付款页面选择分期付款&nbsp;&nbsp;<a href="##">关于捷信</a></p></dd></dl>';
				html+='<div class="gm_bt"><span class="yes">已选择 <strong>天蓝色，T2</strong></span>';
				html+='<a href="##" class="a1" id="'+(id+1)+'">立即购买</a><a href="##" class="a2" id="'+(id+1)+'"><i></i>添加购物车</a><a href="##" class="a3">分期付款</a></div></div>';
				html+='<div class="share"><a href="##" style="border-left:none;"><i class="f_pic" ></i>分享 <em>0</em></a>';
				html+='<a href="##"><i class="s_pic"></i>收藏商品 <em>0</em></a></div>';
				html+='<div class="hezuo"><a href="#"></a><a href="#"></a><a href="#"></a><a href="#"></a><a href="#"></a><a href="#"></a></div></div></div>';
				$('.dp_info').before(html);
			
				show($('.youji').find('span'),$('.youji').find('.place'));
				hide($('.youji').find('span'),$('.youji').find('.place'));

				show($('.jubao'),$('.jubao').find('a'));
				hide($('.jubao'),$('.jubao').find('a'));



				$('.pic .small').find('li').mouseover(function(){
					var img=$(this).find('img').clone();
					//console.log(img)
					$('.pic .big').html(img);
					var img1=$(this).find('img').clone();
					$('.pic .b_box_big').html(img1);
					
				})


				$('.dl1 dd ul').find('li').mouseover(function(){
					var img=$(this).find('img').clone();
					//console.log(img)
					$('.pic .big').html(img);
					var img1=$(this).find('img').clone();
					$('.pic .b_box_big').html(img1);
				})


				//商品数量加
				$('.dl3 .number').find('.jia').click(function(){
					var num=$('.dl3 .number').find('input').val();
					$('.dl3 .number').find('input').val(++num);
				})

				//商品数量减
				$('.dl3 .number').find('.jian').click(function(){
					var num=$('.dl3 .number').find('input').val();
					if(num>1){
						$('.dl3 .number').find('input').val(--num);
					}
					
				})

				//添加购物车
			$('.gm_bt').on('click','.a2',function(){

				//alert(this.id); 
				var n=parseInt($('.dl3 .number').find('input').val());
				var id=this.id;
				//console.log(typeof n)
				var first = $.cookie('goods')==null?true:false;//判断是否有cookie进行添加
				var same=false;
				//第一次添加
				if(first){
					//第一次，建立json结构
					$.cookie('goods','[{id:'+id+',num:'+n+'}]',{expires:7,path:'/'});
					$.cookie('first','false',{expires:7,path:'/'});
				}else{
					var str=$.cookie('goods');
					var arr=eval(str);
					//console.log(str)
					//遍历所有对象，如果id相同，则数量增加
					for(var attr in arr){
						if(arr[attr].id == id){
							arr[attr].num =arr[attr].num +n; //数量增加
							var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
							$.cookie('goods',cookieStr,{expires:7,path:'/'});
							same = true;
						}
					}
						//如果id不同，重新建立商品
					if(!same){
						var obj={id:id,num:n};
						arr.push(obj);
						var cookieStr=JSON.stringify(arr);
						$.cookie('goods',cookieStr,{expires:7,path:'/'});
					}
				}
				//console.log($.cookie('goods'));
				sc_car();
					
			})   // end 添加购物车


			//放大镜
			var oPosition_box=$('.pic').find('.position_box');
			var oMark_box=$('.pic').find('.mark_box');
			var  b_box =$('.pic').find('.b_box');
			var b_box_big=$('.pic').find('.b_box_big')

			 oMark_box.mousemove(function(event){
				//console.log(1)
				
				var left,top;
				left = event.offsetX-oPosition_box.outerWidth()/2;
				top = event.offsetY-oPosition_box.outerHeight()/2;
				//console.log(oPosition_box.outerWidth())
				//边界检测
				
				left = left < 0 ? 0 : left;
				top = top < 0 ? 0 : top;
				left = left > oMark_box.outerWidth() - oPosition_box.outerWidth() ? oMark_box.outerWidth() - oPosition_box.outerWidth() : left;
				top = top > oMark_box.outerHeight() - oPosition_box.outerHeight() ? oMark_box.outerHeight() - oPosition_box.outerHeight() : top;

				//赋值
				oPosition_box.css("left",left);
				oPosition_box.css("top",top);


				//比例计算
				//console.log(left)
				var prop_left = left/(oMark_box.outerWidth() - oPosition_box.outerWidth());
				var prop_top = top/(oMark_box.outerHeight() - oPosition_box.outerHeight());
				//显示隐藏事件


				//移动大图
				//console.log(prop_left)
				var b_left=-(b_box_big.outerWidth()-b_box.outerWidth())*prop_left;
				//console.log(b_left)
				b_box_big.css("left",b_left);
				var b_top=-(b_box_big.outerHeight()-b_box.outerHeight())*prop_top;
				
				b_box_big.css('top',b_top)
			})

			 oMark_box.mouseover(function(){
			 	oPosition_box.css('display','block');
			 	b_box.css('display','block');
			 })

			  oMark_box.mouseout(function(){
			 	oPosition_box.css('display','none');
			 	b_box.css('display','none');
			 })


			}    //end success
		})
	
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


	

	//商品详情内容切换
	$('.goods_nav ul').children('li').click(function(){
		//alert($(this).index())	
		for(var i=0;i<4;i++){
			$('.goods_nav ul').children('li').eq(i).removeClass('current')
		}
		$(this).addClass('current')
		if($(this).index()==0){	
			$('.xq_intro').css('display','block');
			$('.gm_intro').css('display','block');
			$('.pj_intro').css('display','block');
			$('.tj_intro').css('display','block');
		}
		if($(this).index()==1){	
			$('.xq_intro').css('display','none');
			$('.gm_intro').css('display','none');
			$('.pj_intro').css('display','none');
			$('.tj_intro').css('display','block');
		}
		if($(this).index()==2){	
			$('.xq_intro').css('display','none');
			$('.gm_intro').css('display','none');
			$('.pj_intro').css('display','block');
			$('.tj_intro').css('display','none');
		}
		if($(this).index()==3){	
			$('.xq_intro').css('display','none');
			$('.gm_intro').css('display','block');
			$('.pj_intro').css('display','none');
			$('.tj_intro').css('display','none');
		}
	})




})
