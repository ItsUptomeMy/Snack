<template>
	<!-- 主页主题组 -->
	<view class="theme_No bg-white">
		<block v-for="(item,index) in themeList" :key="index">
			<view :class="index==2?'theme_No_02':'theme_No_01'" @click="goTo_Theme(item.id)">
				<image :src="item.topic_img.url" mode="aspectFill" ></image>
				
			</view>
		</block>		
	</view>
</template>

<script>
	import {
		getThemeData
	} from "../../../api/index.js";
	export default {
		data() {
			return {
				themeList: []
			};
		},
		mounted() {
			getThemeData().then(data => {
				var [error, res] = data;
				this.themeList = res.data;
				// console.log(this.themeList);
			})
		},
		methods: {
			goTo_Theme(id){		//到主题页
				uni.navigateTo({
				    url: '../theme/theme?id='+id,
				});
			}
		}
	}
</script>

<style lang="scss">
	.theme_No {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.theme_No_01 {
			width: 49.7%;
			height: 375rpx;
			
		}

		.theme_No_02 {
			width: 100%;
			height: 375rpx;
			margin-top: 4rpx;
		}
		image{
			width: 100%;
			height: 100%;
		}
	}
</style>
