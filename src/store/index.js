import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
export default new Vuex.Store({
	state:{
		current_index: 0,
		audio_id: '',
	},
	mutations:{
		saveCurrentIndex(state,index){
			state.current_index = index;
			console.log(index)
		},
		saveAudioId(state,id){
			state.audio_id = id;
			console.log(id,'id')
		}
	}
})
