<template>
	<div id="app">
		<audio id="myAudio">
			<!--<source src="horse.ogg" type="audio/ogg">-->
			<!--<source src="http://ting666.yymp3.com:86/new27/chenrui8/2.mp3" type="audio/mpeg">-->
			您的浏览器不支持 audio 元素。
		</audio>
		<router-view/>
		<loading v-if="loading"></loading>
	</div>
</template>

<script>
	import Loading from '@/components/Loading';
	import { mapState,mapMutations } from 'vuex';
	export default {
		name: 'App',
		components:{
			Loading
		},
		mounted(){
			
		},
		methods:{
			...mapMutations(['checkAttention'])
		},
		computed:{
			...mapState(['loading'])
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}
	
	html {
		min-height: 100%;
		background-color: #f5f9f8;
	}
	
	#app {
		font-family: PingFangSC-Regular, 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/*text-align: center;*/
		color: #2c3e50;
	}
	
	div,
	text,
	p {
		line-height: 1;
	}
	
	a {
		text-decoration: none;
		color: inherit;
	}
	
	.img-container img {
		width: 100%;
		height: 100%;
	}
	
	.common-bg {
		background-size: 100 auto;
		background-position: center;
		background-repeat: no-repeat;
	}
	/*间隔条*/
	
	.gap-line {
		height: 0.2rem;
		background-color: #ebf0f3;
	}
	/*弹性布局*/
	
	.flex-between {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	
	.flex {
		display: flex;
		flex-wrap: wrap;
	}
	/*单行文字省略*/
	
	.ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	/*我是有底线的*/
	
	.bottom-line {
		text-align: center;
		padding: 0.4rem;
		/*background-color: #999;*/
		color: #999;
	}
</style>