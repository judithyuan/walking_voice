import Vuex from 'vuex';
import Vue from 'vue';
import server from '@/utils/server';
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		current_index: 0,
		audio_id: 0,
		loading: false,
		album_list: [],
		code: ''
	},
	mutations: {
		saveCurrentIndex(state, index) {
			state.current_index = index;
			console.log(index)
		},
		saveAudioId(state, id) {
			state.audio_id = id;
			console.log(id, 'id')
		},
		toggleLoading(state) {
			state.loading = !state.loading;
		},
		saveAlbumList(state, album_list) {
			state.album_list = album_list;
		},
		saveCode(state,code){
			state.code = code;
		}
	}
})