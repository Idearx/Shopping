/**
 * 修改密码 Last Update:2012-6-14
 */
ec.pkg("ec.member.integral");
ec.load("ajax", {
	loadType : "lazy"
});
ec.load("jquery.movebar");

ec.member.integral.pageNumber = 1;

ec.member.integral.load = function(page) {
	new ec.ajax().submit({
		url : "/member/point/page.json",
		data : {
			"pageNumber" : page.pageNumber,
			"pageSize" : page.pageSize
		},
		timeout : 10000,
		timeoutFunction : function() {
			alert(timeOutInfo);
		},
		beforeSendFunction : function(){
			ec.ui.loading.show({modal : false});
		},
		afterSendFunction  : ec.ui.loading.hide,
		successFunction : function(json) {
			if (!json.success) {
				ec.showError(json);
				return;
			}

			var html = [], p;

			for ( var i = 0; i < json.custPointList.length; i++) {
				p = json.custPointList[i];
				var score,order,text;
				if(p.action == 1){
					score = '<span>+&nbsp;' + p.scores + '</span>';
				}
				if(p.action == 2){
					score = '<em>-&nbsp;' + p.scores + '</em>';
				}
				if(p.sourceType == '1'){
					order = 'order',
					text = '订单编号';
				}
				if(p.sourceType == '2'){
					order = 'exchange/supplyInfo',
					text = '退换货编号';
				}
				if(p.sourceType == '3'){
					score = '<span>+&nbsp;' + p.scores + '</span>';
					text = '开售提醒';
				}
				if(p.sourceType == '4'){
					score = '<span>+&nbsp;' + p.scores + '</span>';
					text = '评论';
				}
				if(p.sourceType == '5'){
					score = '<span>+&nbsp;' + p.scores + '</span>';
					text = '签到';
				}
				
				var date = ec.util.parseDate(p.createDate);
				
				html.push('<div class="list-group-item"><table border="0" cellpadding="0" cellspacing="0"><tbody><tr>');
				html.push('<td class="col-date">');
				html.push(date.format("yyyy-MM-dd")+'</td>');
				html.push('<td class="col-exp">');
				html.push(score+'</td>');
				html.push('<td class="col-soure">');
				html.push(text);
				if(p.sourceType == 2){
	                html.push('<a onclick="ec.postTo(\'/member/exchange/supplyInfo\', {rmaCode:\''+p.receiptCode+'\'});" href="javascript:;">'+p.receiptCode+'</a>');
				 }else if(p.sourceType ==1){
	               html.push('<a onclick="ec.postTo(\'/member/order/detail\', {orderCode:\''+p.receiptCode+'\'},{isHisData:\''+p.isHistory+'\'});" href="javascript:;">'+p.receiptCode+'</a>');
				}
				html.push('</td></tr></div></tbody></table></div>');
			}

			$("#score-list").html(html.join(""));

			// 初始化分页
			ec.member.integral.renderPage(json.page);
			ec.ui.scrollTo("#list-head");
		}
	});
};

ec.member.integral.renderPage = function(page) {
	$("#list-pager").pager({
		pageNumber : page.pageNumber,
		pageCount : page.totalPage,
		pageSize : 10,
		text : {
			first : "|&lt;",
			pre : "&lt",
			next : "&gt;",
			last : "&gt;|"
		},
		item : [ "first", "pre", "qpage", "next", "last", "quickPager" ],// 显示样式
		callBack : ec.member.integral.load
	});
};

/*
 * 描述:点击标签页：我的等级与特权，特权介绍，会员体系规则，我的经验值明细 四个便签
 * 特权介绍的标签页面，没有显示我的等级的图标,要做特别处理
 * 作者:李峰
 */

ec.member.integral.tabClick = function(dom,index){
	
	//1.或者点击的这个元素的父类元素li
	var $li = $(dom).closest('li');
	
	//2.判断给点击的$li的对象加上current的类，当加上就直接返回，如果没有就加上current类
	if($li.hasClass('current')){
		return;
	}else{
		$li.addClass('current');
		//3.$li其他的 兄弟节点就删除相应current类
		$li.siblings().removeClass('current');
		//4.$li对应的div显示，其他的div组件隐藏
		ec.member.integral._showTabElement($li,index);
	}
	
};

/*
 * 描述:标签页：我的等级与特权，特权介绍，会员体系规则，我的经验值明细 四个便签
 * 对应显示tab的元素内容div
 * 其他的几个标签页点击的时候都会有等级状态的组件，我作为一个共用的div
 * 作者:李峰
 */
ec.member.integral._showTabElement = function(dom, index){
	//1.得到dom兄弟和自己总共的个数
	var count = dom.siblings().andSelf().size();
	
	//2.对应显示tab的元素内容div显示，其他的隐藏
	for(var i=1;i<=count;i++){
		if(i==index){
			$("#tab-common-index-"+i).show();
		}else{
			$("#tab-common-index-"+i).hide();
		}
	}
	
	//3.有一个公共组件只有1,3,4标签页才会显示等级状态的组件
	if(index == 2){
		$("#common-div").hide();
	}else{
		$("#common-div").show();
	}
	
};

/*
 * 描述:当点击查看等级状态组件下，跳转链接的去查看“会员体系规则”时调用的方法
 * 作者:李峰
 */
ec.member.integral._showRule = function(){
	//1.获得会员体制规则的标签页
	var $li = $("#ec-tab-grade ul").find("li:eq(2)");
	
	//2.触发一下点击标签页会员体系规则,以及下滑线滚动事件
	$li.mouseenter();
	$li.find('a').click();
	
	
};

ec.ready(function() {
	$("#li-point").addClass("current");
	$("#pathTitle").html("等级与特权");

	$("#concern-list :checkbox").click(function() {
		if (!this.checked) {
			$("#checkAll-top,#checkAll-buttom").prop("checked", false);
		}
	});
	
	//小导航滑动
	//author:李峰  增加下滑线滑动
	$("#ec-tab-grade").navMove({
		boxClass:"ec-tab-arrow"
	});
	
	/*
	 * 当刚开始加载这个页面是，只显示第一个标签页的内容
	 * 作者：李峰
	 */
	var $li = $("#ec-tab-grade").find(".current");
	var index = $li.index()+1;
	ec.member.integral._showTabElement($li,index);

	$('#tab-common-index-1 .myPle-state .b ul li .p-img img').each(function() {
		var s = $(this).attr('title');
		s = String(s).transHtmlAttribute();
		var len = 0;
		var txt = '';
		for (var i = 0; i < s.length; i++) {
			var width = /[\x00-\xff]/.test(s[i]) ? 1 : 2;
			len += width;
			txt += s[i];
			if (len > 35) {
				len = 0;
				txt += "\n";
			}
		}
		$(this).attr('title', txt);
	});
});