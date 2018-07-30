
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
}
