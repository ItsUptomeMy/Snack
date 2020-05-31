<template>
	<view class="container">
		<swiperG></swiperG>
		<view class="tittle">精选主题</view>
		<themeG></themeG>
		<view class="tittle">最近新品</view>
		<newProductsG></newProductsG>
	</view>

</template>

<script>
	import swiperG from "./components/swiper.vue";
	import themeG from "./components/theme.vue";
	import newProductsG from "./components/newProducts.vue";
	export default {
		components: {
			swiperG,
			themeG,
			newProductsG
		},
		data() {
			return {};
		},
	}
</script>

<style>
	.tittle{
		display: flex;
		height: 60rpx;
		color: #AB956D;
		background-color: #fff;
		font-size: 32rpx;
		align-items: center;
		justify-content: center;
		margin: 20rpx 0;
	}
</style>
