<template>
	<view>
		<view class="top_img">
			<image :src="ImgUrl" mode="aspectFill"></image>
		</view>
		<newProductsG v-if="flog" :newProducts="newProducts"></newProductsG>
	</view>
</template>

<script>
	import newProductsG from "../home/components/newProducts.vue";
	import {getThemeProducts} from "../../api/index.js";
	
	export default {
		components:{
			newProductsG
		},
		data() {
			return {
				ImgUrl:'',
				newProducts:[],
				flog:false
			}
		},
		onLoad(option) {
			this._getThemeProducts(option.id);
		},
		methods: {
			_getThemeProducts(id){	//根据主题id查询商品	
			 	getThemeProducts(id).then(data=>{
					var [error, res] = data;
					this.newProducts = res.data.products;
					this.ImgUrl = res.data.head_img.url
					uni.setNavigationBarTitle({
					    title:res.data.description
					});
					this.flog = true;
				})
			},
			
			
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
