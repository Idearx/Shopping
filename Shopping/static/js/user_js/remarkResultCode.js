/**
 * 评论返回码共通处理
 */
ec.pkg("ec.remark");
ec.load("ajax");
ec.load("ec.box", {
	loadType : "lazy"
});

/**
 * 评价返回码共通处理
 */
ec.remark.result = function(data,isShowMsg) {
	var resultObj = {};
	var result = false;
	var msg = "";
	var resultCode="";
	if (data != "" && data != undefined) {
		//取得返回码
		resultCode = data.resultCode;
		switch (resultCode) {
		//上传成功
		case "0":
			result = true;
			break;
		//请求参数错误
		case "42001":
			msg = "系统繁忙，请稍后重试";
			break;
		//系统繁忙
		case "42002":
			msg = "系统繁忙，请稍后重试";
			break;
		//未登录
		case "42003":
			msg = "系统繁忙，请稍后重试";
			break;
		//用户名或密码错误
		case "42004":
			msg = "系统繁忙，请稍后重试";
			break;
		//获取订单信息错误
		case "42006":
			msg = "系统繁忙，请稍后重试";
			break;
		//已评论数据
		case "42007":
			msg = "此商品已经评论，不能重复评论哦";
			break;
		//评论不属于该用户
		case "42008":
			msg = "系统繁忙，请稍后重试";
			break;
		//评论不能修改
		case "42009":
			msg = "你的评论刚刚已经发布到商品详情页，无法重新提交；<br>如需修改，请联系人工客服。";
			break;
		//不存在用户订单信息
		case "42010":
			msg = "系统繁忙，请稍后重试";
			break;
		//隐藏评论
		case "42011":
			msg = "系统繁忙，请稍后重试";
			break;
		//已评论服务用户订单，不能添加评论服务
		case "42012":
			msg = "服务已评价，请不要重复评价哦";
			break;
		//不属于用户订单，不能添加评论服务
		case "42013":
			msg = "系统繁忙，请稍后重试";
			break;
		//OMS不存在的订单
		case "42014":
			msg = "系统繁忙，请稍后重试";
			break;
		//该条评论回复不存在
		case "42015":
			msg = "系统繁忙，请稍后重试";
			break;
		//存在无效的TagId
		case "42016":
			msg = "系统繁忙，请稍后重试";
			break;
		//pms校验pid不通过
		case "42017":
			msg = "系统繁忙，请稍后重试";
			break;
		//标签名称重复
		case "42018":
			msg = "系统繁忙，请稍后重试";
			break;
		//该条评论不存在
		case "42019":
			msg = "系统繁忙，请稍后重试";
			break;
		//tagName失效
		case "42020":
			msg = "系统繁忙，请稍后重试";
			break;
//		//商品ID不能为空
//		case "42021":
//			msg = "商品ID不能为空";
//			break;
//			//商品ID相同，无法关联
//		case "42022":
//			msg = "商品ID相同，无法关联";
//			break;
		//评论中含有非法字符
		case "42023":
			msg = "您提交的评论中含有非法字符,请修改";
			break;
		//评论内容为10-1000个字节
		case "42024":
			msg = "您提交的评论内容长度不在1-500之间,请修改";
			break;
		//digTags不能超过12个字节
		case "42025":
			msg = "自定义标签不能超过6个字,请修改";
			break;
		//标签不能为空或不能超过6个字
		case "42026":
			msg = "标签不能为空或不能超过6个字,请修改";
			break;
		//图片URL不能为空
		case "42027":
			msg = "系统繁忙，请稍后重试";
			break;
		//系统异常
		case "50999":
			msg = "系统异常，请稍后重试";
			break;
		//写文件到磁盘出错
		case "60000":
			msg = "系统繁忙，请稍后重试";
			break;
		//上传文件失败
		case "60001":
			msg = "系统繁忙，请稍后重试";
			break;
		//上传文件太大
		case "60002":
			msg = "您上传的文件太大,最大支持8M,请重新选择";
			break;
		//文件类型错误
		case "60003":
			msg = "您选择的文件类型错误,仅支持jpg/jpeg/png,请重新选择";
			break;
		//生成文件错误
		case "60004":
			msg = "系统繁忙，请稍后重试";
			break;
		//读取文件错误
		case "60005":
			msg = "系统繁忙，请稍后重试";
			break;
		//点赞与图片异常
		//上传图片数量超过限定值
		case "60006":
			msg = "每条评论最多上传" + maxNum + "张图片";
			break;
		//请求参数为空
		case "60007":
			msg = "系统繁忙，请稍后重试";
			break;
		//不能重复点赞
		case "60008":
			msg = "系统繁忙，请稍后重试";
			break;
		//点赞对应的评论不存在
		case "60009":
			msg = "系统繁忙，请稍后重试";
			break;
		//点赞对应评论的回复不存在
		case "60010":
			msg = "系统繁忙，请稍后重试";
			break;
		//创建图片存放目录失败
		case "60019":
			msg = "系统繁忙，请稍后重试";
			break;
		default:
			msg = "系统繁忙，请稍后重试";
			break;
		}
	} else {
		msg = "系统繁忙，请稍后重试";
	}
	
	//封装返回参数
	resultObj.result = result;
	resultObj.msg = msg;
	resultObj.code = resultCode;
	
	return resultObj;
};