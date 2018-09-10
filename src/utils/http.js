import axios from 'axios';
import Store from '@/store/index';
import qs from 'qs';

axios.defaults.baseURL = 'http://api.bkvo666.cn/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
class Ajax {
	post(url, obj = {}) {
		Store.commit('toggleLoading');
		return new Promise((resolve, reject) => {
			axios.post(url, qs.stringify(obj)).then(res => {
				Store.commit('toggleLoading');
				if(res.data && res.data.status == 1) {
					resolve(res.data);
				} else {
					console.log('数据异常')
				}
			}).catch(function (error) {
				Store.commit('toggleLoading');
			    console.log(error);
		  	});

		})
	}
	get(url, obj = {}) {
		Store.commit('toggleLoading');
		return new Promise((resolve, reject) => {
			axios.get(url, {
				params: obj
			}).then(res => {
				Store.commit('toggleLoading');
				if(res.data && res.data.status == 1) {
					resolve(res.data);
				} else {
					console.log('数据异常')
				}
			})
		}).catch(function (error) {
			Store.commit('toggleLoading');
		    console.log(error);
	  	});
	}
	getSystemData(url, obj = {}) {
		return new Promise((resolve, reject) => {
			axios.get(url, {
				params: obj
			}).then(res => {
				resolve(res.data);
			})
		})
	}
}
const ajax = new Ajax();
export default ajax;