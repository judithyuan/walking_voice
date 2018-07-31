
import ajax from '@/utils/http';
export default {
	getIndexData: (data)=>{ //首页
		return ajax.post('',data);
	},
	getAlbumList: (data)=>{//通过专辑id获取列表
		return ajax.get('index.php/index/list',data);
	},
	getAlbumListByAudioId: (data)=>{//通过音频id获取列表
		return ajax.post('index.php/index/getListBySong',data);
	},
	getConfigData: (data)=>{
		return ajax.getSystemData('index.php/index/share ',data);
	},
	getOpenId:(data={})=>{//获取openid
		return ajax.getSystemData('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa749e08e4328a34d&redirect_uri=sheng.51tui.vip&response_type=code&scope=snsapi_base&state=123#wechat_redirect',data)
	}
}
