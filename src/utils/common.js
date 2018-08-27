/**
 * 批量设置cookie
 * @param obj
 */
export const setCookie = (obj)=>{
	let days = 30;
	let exp = new Date();
	if(obj.min){		
		exp.setTime(exp.getTime() + obj.min*60*1000);
	}else{
		exp.setTime(exp.getTime() + days*24*60*60*1000);		
	}
	for(let key in obj){
		document.cookie = key+'='+obj[key]+';expires='+exp.toGMTString();
	}
	
}

/**
 * 获取某个cookie值
 * @param {*string} name 
 */
export const getCookie = (name) => {
    var cookies = document.cookie.split(';');
    for ( let i = 0; i < cookies.length; i++ ) {
        var temp = cookies[i].split("=");
        if ( temp[0].trim() == name ) {
            return unescape(temp[1])
        }
    }
}

