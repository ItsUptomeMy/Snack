<template>
	<view>
		<view class="top_img">
			<image :src="ImgUrl" mode="aspectFill"></image>
		</view>
		<themeG :ThemeID="ThemeID" @top="topImgUrl"></themeG>
	</view>
</template>

<script>
	import themeG from "../home/components/newProducts.vue";
	export default {
		components:{
			themeG
		},
		data() {
			return {
				ThemeID:0,
				ImgUrl:''
			}
		},
		onLoad(option) {
			this.ThemeID=option.id;
			
		},
		methods: {
			topImgUrl(url){
				this.ImgUrl =url;
			}
		}
	}
</script>

<style lang="scss">
	.top_img{
		/* width: 100%; */
		height:400rpx ;
		
		image{
			width: 100%;
			height: 100%;
		}
	}
</style>
