<template>
	<view>
		<swiper class="screen-swiper" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index" @click="goTo_Details()">
				<image :src="item.img.url" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		getBannerData
	} from "../../../api/index.js";
	export default {
		data() {
			return {
				cardCur: 0,
				swiperList: [],
				dotStyle: true
			};
		},
		mounted() {
			getBannerData(1).then(data => {
				var [error, res] = data;
				this.swiperList = res.data.items;
			})
		},
		methods:{
			goTo_Details(){
				uni.navigateTo({
				    url: '../details/details'
				});
			}
		}
	}
</script>

<style>

</style>
