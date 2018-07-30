import axios from 'axios';
import Store from '@/store/index';
import qs from 'qs';

axios.defaults.baseURL = 'http://sheng.51tui.vip/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
class Ajax{
	post(url,obj={}){
		Store.commit('toggleLoading');
		return new Promise((resolve, reject) => {
			axios.post(url, qs.stringify(obj)).then(res => {
				Store.commit('toggleLoading');
				if(res.data && res.data.status == 1){
					resolve(res.data);				
				}else{
					console.log('数据异常')
				}
			})
			
		})
	}
	get(url,obj={}){
		Store.commit('toggleLoading');
//			return axios.get(url,{
//				params: obj
//			}).then(res => {
//				Store.commit('toggleLoading');
//				if(res.data && res.data.status == 1){
//					return res.data;				
//				}else{
//					console.log('数据异常')
//				}
//			})
		return new Promise((resolve, reject) => {
			axios.get(url,{
				params: obj
			}).then(res => {
				Store.commit('toggleLoading');
				if(res.data && res.data.status == 1){
					resolve(res.data);				
				}else{
					console.log('数据异常')
				}
			})
		})
	}
}
const ajax = new Ajax();
export default ajax;
