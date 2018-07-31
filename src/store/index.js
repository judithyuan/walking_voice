import Vuex from 'vuex';
import Vue from 'vue';
import server from '@/utils/server';
Vue.use(Vuex);
export default new Vuex.Store({
	state:{
		current_index: 0,
		audio_id: 0,
		loading:false,
		album_list: [],
		openid: ''
	},
	mutations:{
		saveCurrentIndex(state,index){
			state.current_index = index;
			console.log(index)
		},
		saveAudioId(state,id){
			state.audio_id = id;
			console.log(id,'id')
		},
		toggleLoading(state){
			state.loading = !state.loading;
		},
		saveAlbumList(state,album_list){
			state.album_list = album_list;
			
		},
		checkAttention(state){
//			let obj = {
//				appid: 'wxa749e08e4328a34d',
//				redirect_uri: 'sheng.51tui.vip',
//				response_type: 'code',
//				scope: 'snsapi_base',
//				state:'123#wechat_redirect'
//			}
			server.getOpenId().then(res=>{
				console.log(res)
				state.openid = res;
			})
		}
		
	}
})
