<template>
	<div>
		<div>
			播放器页面
		</div>
		<!--<aplayer autoplay :music="obj">
		</aplayer>
		-->
<a href="http://ting666.yymp3.com:86/new27/chenrui8/2.mp3">Play Song 2</a>
	</div>
</template>

<script>
//	import Aplayer from 'vue-aplayer';
	export default {
  name: 'HelloWorld',
	components: {
//    Aplayer
 	},
 	created(){
 		console.log('created')
 		this.obj = {
		  title: 'Preparation',
		  artist: ' ',
		  src: 'http://ting666.yymp3.com:86/new27/chenrui8/2.mp3',
		  pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg',
		  showlrc: false,
		  theme: '#999999',
		  mode: 'order',
		  music: '信息'
		}
 	},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      obj: {}
    }
  }
}
</script>

<style>
</style>