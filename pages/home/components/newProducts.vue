<template>
	<view class="newProductBox">
		<block v-for="(item,index) in newProductsList" :key="index">
			<view class="newProduct_NO" @click="gotoDetails(item.id)">
				<image :src="item.main_img_url" mode="aspectFill"></image>
				<view class="p_name">{{item.name}}</view>
				<view class="p_price">￥{{item.price}}</view>
			</view>
		</block>
	</view>
</template>

<script>
	import {getProductsData} from "../../../api/index.js";
	export default {
		props:["newProducts"],
		data() {
			return {
				newProductsList:[],
			};
		},
		mounted() {
			//主题id 		
			if(null != this.newProducts){ 
				this.newProductsList = this.newProducts;			
			}else{
				this._getProductsData();
			}
		}, 
		methods:{			
			_getProductsData(){		//所有新品
				getProductsData().then(data=>{
					var [error, res] = data;
					this.newProductsList = res.data;
				})
			},
			gotoDetails(productID){
				// console.log(productID);
				uni.navigateTo({
					url:'../details/details?id='+productID
				})
				// uni.navigateTo({
				//     url: 'test?id=1&name=uniapp'
				// });
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
