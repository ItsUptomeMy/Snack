<template>
	<view class="newProductBox">
		<block v-for="(item,index) in newProductsList" :key="index">
			<view class="newProduct_NO">
				<image :src="item.main_img_url" mode="aspectFill"></image>
				<view class="p_name">{{item.name}}</view>
				<view class="p_price">￥{{item.price}}</view>
			</view>
		</block>
	</view>
</template>

<script>
	import {getProductsData,getThemeProducts} from "../../../api/index.js";
	export default {
		props:["ThemeID"],
		data() {
			return {
				newProductsList:[],
			};
		},
		mounted() {
			//主题id 导航栏文字			
			
			if(null != this.ThemeID){ 
				this._getThemeProducts();
			}else{
				this._getProductsData();
			}
		},
		methods:{
			_getThemeProducts(){	//根据主题id查询商品
				getThemeProducts(this.ThemeID).then(data=>{ 
					var [error, res] = data;
					console.log(res.data);
					this.newProductsList = res.data.products;
					this.$emit('top',res.data.head_img.url);
					uni.setNavigationBarTitle({
					    title: '新的标题'
					});
				})
			},
			_getProductsData(){		//所有新品
				getProductsData().then(data=>{
					var [error, res] = data;
					console.log(res.data);
					this.newProductsList = res.data;
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.newProductBox{
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.newProduct_NO{
			margin-top: 20rpx;
			width: 49%;
			height: 350rpx;
			background-color: #F5F6F5;
			display: flex;
			justify-content: space-around;
			align-items: center;
			flex-direction: column;
			.p_name{
				font-size: 28rpx;
				font-weight: bold;
				margin-bottom:10rpx;
			}
			.p_price{
				font-size: 24rpx;
				margin-bottom:20rpx;
			}
			image{
				width: 80%;
				height:80%;
			}
		}
	}
</style>
