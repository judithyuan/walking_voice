
import ajax from '@/utils/http';

export default {
	getIndexData: (data)=>{ //首页
		return ajax.post('',data);
	},
	getAlbumList: (data)=>{
		console.log(data)
		return ajax.get('index.php/index/list',data);
	},
}
