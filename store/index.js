import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new VueX.Store({
	state:{
		cartNo:0,
		cartName:'cart'
	},
	mutations:{
		getCartCounts(){
			getCartDataFromLocal()
		},
		getCartFromlocal(){
			
		}
	},
	actions:{
		
	}
	
})