<template>
	<view class="bg-details">
		<view class="top_img bg-white">
			<image :src="productInfo.main_img_url" mode="aspectFill"></image>
		</view>

		<view class="pd_base_info bg-white">
			<view class="pd-price">
				<text class="text-price text-red">{{productInfo.price}}</text>
			</view>
			<view class="pd-name text-black" v-if="productInfo.name">
				{{productInfo.name}}
			</view>
		</view>

		<view class="pd_param bg-white">
			<view class="text-grey text-center Tips" v-if="productInfo.properties.length==0">此商户还未填写基本参数</view>

			<view class="cu-list menu" v-else>
				<view class="cu-item" v-for="(item,index) in productInfo.properties" :key="index">
					<view class="content">
						<text class="text-grey list-l">{{item.name}}：</text>
						<text class="text-grey">{{item.detail}}</text>
					</view>
				</view>
			</view>

		</view>

		<view class="pd_details_info bg-white ">
			<view class="text-grey text-center" v-if="productInfo.imgs.length==0">此商户还未添加产品详情</view>

			<block v-for="(item,index) in productInfo.imgs" :key="index" v-else>
				<image :src="item.img_url.url" mode="aspectFill"></image>
			</block>
		</view>

		<view class="after_sales bg-white">
			<view class="text-center padding text-gray">—— 七天无理由退货 ——</view>



		</view>

		<!-- 底部定位 -->
		<view class="cu-bar bg-white tabbar border shop position_bottom">
			<button class="action text-gray" open-type="contact">
				<view class="cuIcon-service ">
					<view class="cu-tag badge" v-if="custMessCount>0">{{custMessCount}}</view>
				</view>客服
			</button>
			<view class="action text-gray" @click="changeCollect()">
				<block v-if="CollectStatus==false">
					<view class="cuIcon-favor"></view>收藏
				</block>
				<block v-else>
					<view class="cuIcon-favorfill"></view>
					已收藏
				</block>

			</view>

			<view class="action text-gray" @click="goCat">
				<view class="cuIcon-cart">
					<view class="cu-tag badge" v-if="catCount>0">{{catCount}}</view>
				</view>购物车
			</view>

			<view class="submit bg-add-color text-white" @tap="showModal" data-target="bottomModal">加入购物车
			</view>
			<!-- 加入购物车弹窗 -->
			<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
				<view class="cu-dialog dialogH">

					<view class="cuIcon-roundclose close_model" @tap="hideModal"></view>

					<view class="paddingTop_mode solids-bottom solids-top">
						<view class="text-black mode_left">购买数量
							<text class="text-gray mode_left_No">(限购50件)</text>
						</view>
						<view class="mode_right">
							<button class="cuIcon-move bg-gray" @tap="moverNo" :disabled="shoppingCount<=0">
							</button>
							<input class="text-black" :value="shoppingCount" type="number" @input="changeCount" maxlength="50" />
							<button class="cuIcon-add bg-gray" @tap="addNo">
							</button>
						</view>
					</view>
					<button class="submit_btn text-white" @tap="addCart">确定</button>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import {
		getProduct_info
	} from "../../api/index.js"
	export default {
		data() {
			return {
				productInfo: [],
				CollectStatus: false, //收藏状态
				modalName: null,
				shoppingCount: 1,
				catCount:0, //购物车产品总数量
				custMessCount:0, //客服消息数
				cartStorageKeyName: 'cart' //购物车本地缓存key
			};
		},
		onLoad(option) {
			this._getProductInfo(option.id)
		},
		methods: {

			// 购物车数量加减变化————
			changeCount(e) {
				this.shoppingCount = +e.detail.value
			},
			addNo() {
				this.shoppingCount += 1
			},
			moverNo() {
				this.shoppingCount -= 1
			},
			// ————


			addCart() { //添加购物车确定				
				this.modalName = null;
				//待写添加购物车操作
				//准备好需要的商品信息 addcatOne 和数量  shoppingCount
				var keys=['id','name','main_img_url','price'],addcatOne ={};
				for (var productKey in this.productInfo){
					if(keys.indexOf(productKey)>=0){
						addcatOne[productKey]= this.productInfo[productKey];
					}
				}
				this.add(addcatOne,this.shoppingCount);
				
				
				setTimeout(function() {
					uni.showToast({
						title: '添加购物车成功',
						duration: 2000,
						icon: 'none'
					});
				}, 1000)
			},
			//添加
			add(addcatOne,counts) {
				//获取本地缓存
				var cartData =this.getCartDataFromLocal();
				//判断要添加的的商品 addcatOne 是否存在于购物车 cartData里
				var exist = this.hasOneIf(addcatOne.id,cartData);
				if (exist.index==-1){ //不存在
					addcatOne['counts'] = counts;
					addcatOne['selectStatus'] = true;
					cartData.push(addcatOne);
				}else{	//存在 存在即给 cartData 的counts 加数量
					cartData[exist.index].counts += counts
					cartData[exist.index].selectStatus = true //新添加商品，即使原来取消选中，现在也重新选中，不改变状态删除就行
				};
				//存入缓存
				this.setCartDataToLocal(cartData);
			},
			//存入缓存
			setCartDataToLocal(data){
				try {
				    uni.setStorageSync(this.cartStorageKeyName,data);
				} catch (e) {
				    uni.showToast({
				    	title: '收藏错误',
				    	duration: 1000,
				    	icon: 'none'
				    });
				}
			},
			//获取购物车缓存
			getCartDataFromLocal(){
				var value = uni.getStorageSync(this.cartStorageKeyName);
				if (!value){
					value = []
				};
				return value;
			},
			//判断是否已经存在于购物车
			hasOneIf(OneId,cartData){
				var result = {index:-1}
				for(let i=0;i<cartData.length;i++){
					if(cartData[i].id==OneId){
						result = {
							index:i,
							item :cartData[i]
						}
					}
				}
				return result //假定不存在
			},
			
			goCat() { //跳转购物车页面
				uni.navigateTo({
					url: '../cart/cart'
				})
			},
			changeCollect() { // 收藏状态切换	
				var productID = this.productInfo.id;
				var CollectID_all = uni.getStorageSync('CollectID_all');
				//点击收藏
				if (!this.CollectStatus) {
					CollectID_all.push(productID);
				}
				//取消收藏
				if (this.CollectStatus) {
					var index = CollectID_all.indexOf(productID);
					if (index >= 0) {
						CollectID_all.splice(index, 1)
					}
				}
				try {
					uni.setStorageSync('CollectID_all', CollectID_all);
					this.CollectStatus = !this.CollectStatus;
				} catch (e) {
					uni.showToast({
						title: '收藏错误',
						duration: 1000,
						icon: 'none'
					});
				}
			},

			//弹窗开启
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			//弹窗关闭
			hideModal(e) {
				this.modalName = null
			},

			//id获取产品信息
			_getProductInfo(productID) {
				getProduct_info(productID).then(data => {
					var [error, res] = data;
					this.productInfo = res.data;
					this.collect(res.data.id);
				});
			},

			//判断产品是否已收藏
			collect(productID) {
				var CollectID_all = uni.getStorageSync('CollectID_all');
				if (CollectID_all.indexOf(productID) >= 0) {
					this.CollectStatus = true;
				} else {
					this.CollectStatus = false;
				}

			}

		}

	}
</script>

<style lang="scss" scoped>
	.bg-details {
		background-color: #efeff3;

		.cartIco {
			.ico-size {
				font-size: 50rpx;
			}

			position: fixed;
			top: 50rpx;
			right: 50rpx;

			.countIco {
				width: 25rpx;
				height: 25rpx;
				border-radius: 50%;
				background-color: #ab956d;
				position: absolute;
				top: 0rpx;
				right: -10rpx;
			}
		}

		.top_img {
			width: 100%;
			min-height: 240rpx;

			image {
				width: 100%;
				// height: 100%;
			}
		}

		.pd_base_info {
			min-height: 100rpx;
			padding: 20rpx 30rpx;

			.pd-price {
				font-size: 40rpx;
			}

			.pd-name {
				font-size: 32rpx;
				font-weight: bold;
			}
		}

		.pd_param {
			margin: 10rpx 0;
			font-size: 32rpx;

			.list-l {
				display: inline-block;
				width: 120rpx;
			}

			.Tips {
				font-size: 28rpx;
				line-height: 100rpx;
			}
		}

		.pd_details_info {
			min-height: 200rpx;
			line-height: 200rpx;

			image {
				width: 100%;
				display: block;
			}
		}

		.after_sales {
			margin-top: 10rpx;
			padding-bottom: 100rpx;
		}

		.position_bottom {
			width: 100%;
			position: fixed;
			bottom: 0;

			.text-base {
				color: #ab956d;
			}

			.bg-add-color {
				background-color: #ab956d;

			}

			.dialogH {
				width: 100%;
				min-height: 350rpx;
				padding: 0 40rpx;
				padding-top: 90rpx;
				position: relative;

				.close_model {
					position: absolute;
					top: 30rpx;
					right: 30rpx;
					font-size: 36rpx;
					color: #c5c5c5;
				}

				.submit_btn {
					background-color: #ab956d;
					border-radius: 150rpx;
					margin-top: 25rpx;
				}


				.paddingTop_mode {
					width: 100%;
					height: 100rpx;

					display: flex;
					justify-content: space-between;
					align-items: center;
					position: relative;


					.mode_left_No {
						font-size: 24rpx;
					}

					.mode_right {
						width: 170rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;

						button {
							width: 50rpx;
							height: 50rpx;
							display: flex;
							justify-content: center;
							align-items: center;
						}

						input {
							width: 50rpx;
							height: 50rpx;
							border: 1px solid rgba(0, 0, 0, .2);
							border-radius: 5px;
						}


					}
				}


			}

		}
	}
</style>
