<template>
	<view class="categorylist">
		<view class="ca_left">
			<view class="l_item" v-for="(item,index) in categoryList" :key="index" @click="changed_cate(item,index)"
			 :class="changed_no==index?'changed_chunk':''">
				{{item.name}}
			</view>
		</view>
		<view class="ca_right">
			<scroll-view scroll-y="true" >
				<view class="theme_img">
					<image :src="ThemeImgUrl" mode="aspectFill"></image>
				</view>
				<view class="tittle">
					<text>
						{{categoryName}}
					</text>
				</view>
				<view class="pr_list">
					
					<view class="product_item" v-for="(item,index) in product_list" :key="index" @click="GoDetails(item.id)">
						<view class="pr_img">
							<image :src="item.main_img_url" mode="aspectFill"></image>
						</view>
						<view class="pr_name text-cut" >
							{{item.name}}
						</view>
					</view>
					
					<view class="product_item" v-for="(item,index) in product_list.length%3" :key="index">
					</view>
					
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {getCategorys} from "../../api/index.js";
	import {getProductByCategorys} from "../../api/index.js"
	export default {
		data() {
			return {
				categoryList:[], //类名列表
				ThemeImgUrl:"",	//主题图
				changed_no:0, //选取项目
				product_list:[], //产品列表
				categoryName:''//类名
			};
		},
		onLoad() {
			this._getCategoryList();
		},
		methods:{
			GoDetails(id){
				uni.navigateTo({
					url:'../details/details?id='+id
				})
			},
			_getCategoryList(){
				getCategorys().then(data=>{
					var [error, res] = data;
					this.categoryList = res.data;	
					console.log(this.categoryList);
					this.ThemeImgUrl = res.data[0].img.url;
					this.categoryName = res.data[0].name;
					this._getProductByCategorysByid(res.data[0].id);
				})
			},
			changed_cate(item,index){
				this.changed_no = index;
				this.ThemeImgUrl=item.img.url;
				this.categoryName = item.name;
				this._getProductByCategorysByid(item.id);
			},
			_getProductByCategorysByid(id){
				getProductByCategorys(id).then(data=>{
					var [error, res] = data;
					this.product_list= res.data;
				})
			}
			
		}
		
		
	}
</script>

<style lang="scss">
	.categorylist{
		display: flex;
		background-color: white;
		.ca_left{
			width:130rpx;
			height:100vh;
			border-right: 1rpx solid #bebebe;
			.l_item{
				width: 100%;
				height: 80upx;
				text-align: center;
				line-height: 80upx;
			}
			.changed_chunk{
				color: #ab956d;
			}
			.changed_chunk::before{
				content:"";
				position: absolute;
				left: 0;
				width: 7upx;
				height:80upx;
				background-color: #ab956d;
			}			
		}
		.ca_right{
			flex: 1;
			padding: 0 30rpx;
			padding-top: 30rpx;
			
			.pr_list{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				
				.product_item{
					margin-top: 20rpx;
					width: 170rpx;
					height:210rpx;
					.pr_img{
						width: 170rpx;
						height: 170rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.pr_name{
						font-size: 24rpx;
						width: 170rpx;
						height:40rpx;
						text-align: center;
						line-height: 40rpx;
					}
					
				}
			}
			
			.theme_img{
				width: 100%;
				height: 200rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			
			.tittle{
				color: #ab956d;
				margin-top: 20rpx;
				text-align: center;
				font-size: 28rpx;
			}
			.tittle text::after,.tittle text::before{
				content:"";
				display: inline-block;
				position: relative;
				top: -6rpx;
				width: 70rpx;
				height: 2rpx;
				margin: 0 20rpx;
				background-color:#ab956d;
			}
			
			
		}
	}
</style>
