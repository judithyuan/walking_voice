import axios from 'axios';
import Store from '@/store/index';

axios.defaults.baseURL = 'http://sheng.51tui.vip/';
class Ajax{
	post(url,obj={}){
		Store.commit('toggleLoading');
		return axios.post(url,obj).then(res => {
			Store.commit('toggleLoading');
			if(res.data && res.data.status == 1){
				return res.data;				
			}else{
				console.log('数据异常')
			}
		})
	}
	get(url,obj={}){
		Store.commit('toggleLoading');
		return axios.get(url,{
			params: obj
		}).then(res => {
			Store.commit('toggleLoading');
			if(res.data && res.data.status == 1){
				return res.data;				
			}else{
				console.log('数据异常')
			}
		})
	}
}
const ajax = new Ajax();
export default ajax;
