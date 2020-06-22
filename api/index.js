const baseUrl = "http://127.0.0.7/api/v1";

// 原始
// export const getBannerData = (id) => {
// 	return uni.request({
// 		url: baseUrl + '/banner/' + id,
// 	})
// }


//轮播请求 简写
export const getBannerData = id => (
		uni.request({
		    url: baseUrl+'/banner/'+id, 
		})
);
//主题
//首页主题 1,2,3主题
export const getThemeData = () => (
		uni.request({
		    url: baseUrl+'/theme?ids=1,2,3', 
		})
)


//最近新品
export const getProductsData = () => (
		uni.request({
		    url: baseUrl+'/product/recent', 
		})
)

// 获取主题下的商品列表
// 对应主题 
export const getThemeProducts =async id => (
    await  uni.request({
		    url: baseUrl+'/theme/'+id	
		})
)
//产品id 获取产品信息
export const getProduct_info = id =>(
	uni.request({
	    url: baseUrl+'/product/'+id
	})
)

//获取所有分类
export const getCategorys = () =>(
	uni.request({
	    url: baseUrl+'/category/all'	    
	})
)
//分类产品
export const getProductByCategorys = id =>(
	uni.request({
	    url: baseUrl+'/product/by_category?id='+id 	   
	})
)
