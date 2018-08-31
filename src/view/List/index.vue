<template>
	<div>
		<div class="top flex">
			<div class="bg" :style="{backgroundImage:'url('+album_info.thumb+')' }"></div>
			<div class="mask"></div>
			<img :src="album_info.thumb" />
			<div class="right">
				<h4 class="flex-between">
					<span class="ellipsis">{{album_info.name}}</span> 
					<!--<img @click="share" src="../../../static/img/share.png"/>-->
				</h4>
				<p>简介：{{album_info.title}}</p>
			</div>
		</div>
		<div class="tabbar flex-between">
			<div :class="active_tab==1?'active':''" @click="switchTab(1)">详情</div>
			<span></span>
			<div :class="active_tab==2?'active':''" @click="switchTab(2)">目录</div>
		</div>

		<!--详情-->

		<div class="detail" :hidden="active_tab == 2">
			<div class="detail-title">{{album_info.name}}</div>
			{{album_info.info}}
		</div>
		<!--目录-->
		<div :hidden="active_tab == 1">
			<router-link :to="'/player/'+item.id"  class="item flex-between" v-for="(item,index) in album_song_list" :key="index">
				<div class="right">
					<h4>{{item.name}}</h4>
					<p>来自声行漫步</p>
				</div>
				<div class="left" :style="{backgroundImage: 'url('+item.thumb+')'}" @click="audio_id == item.id ?(play_state == 1?pause(): play(item.id,item.src)):''">
					<span :class="audio_id == item.id ?(play_state == 1?'playing':'paused'): ''"></span>
				</div>
			</router-link>

		</div>
		<div class="bottom-line">已经到底了~</div>
	</div>
</template>

<script>
	import { mapState,mapMutations } from 'vuex';
	import ajax from '@/utils/http';
	var myAudio;
	export default {
		data() {
			return {
				active_tab: 2,
				audio_list: [{
						name: '陈瑞',
						src: 'http://ting666.yymp3.com:86/new27/chenrui8/2.mp3',
						id: 1,
						content: '这是一首简单的小情歌'
					},
					{
						name: '求婚',
						src: 'http://ting666.yymp3.com:86/new27/underlover/1.mp3',
						id: 2,
						content: '无论你爱不爱我'
					},
					{
						name: '玫瑰花的葬礼',
						src: 'http://ting666.yymp3.com:86/new11/vae2/10.mp3',
						id: 2,
						content: '<div>玫瑰花的葬礼</div><div>黄思海深爱美霞</div><div>离开你一百个星期</div><div>我回到了这里</div><div>寻找我们爱过的证据</div>'
					}
				],
				album_info: {},
				album_song_list: [],
				config_data: null,
				play_state:0,
			}
		},
		computed: {
			...mapState(['audio_id','current_index']),
		},
		mounted() {	
			myAudio = document.getElementById("myAudio");
			this.play_state = myAudio.played.length;
			console.log(this.play_state,'this.play_state');
			this.server.getAlbumList({
				id: this.$route.params.id
			}).then(res => {

				this.album_info = res.msg.album_info;
				this.album_song_list = res.msg.album_song;
			})
			
//			if(!this.config_data) {
//				this.server.getConfigData({
//					url: window.location.href
//				}).then(res => {
//					this.config_data = {
////						debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//						appId: res.msg.appid, // 必填，公众号的唯一标识
//						timestamp: res.msg.time, // 必填，生成签名的时间戳
//						nonceStr: res.msg.nonceStr, // 必填，生成签名的随机串
//						signature: res.msg.signature, // 必填，签名
//						jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
//					}
//				})
//			}
			
//			this.share();
		},

		methods: {
			...mapMutations(['saveCurrentIndex', 'saveAudioId','saveAlbumList']),
			getItemIndex(id){ //获取当前id对应的索引值index
				for(let i = 0;i<this.album_song_list.length;i++){
					if(id === this.album_song_list[i].id){
						this.active_index = i;
						console.log(i,'i')
						return i;
					}
				}
			},
			switchTab(param) {
				this.active_tab = param;
			},
			play(id,src){
				let index = this.getItemIndex(id);
				if(myAudio.played.length > 0 && index===this.current_index) { //音乐已播放部分并且没有切换index
					myAudio.play();
				} else { //切换音乐
					this.saveAlbumList(this.album_song_list);
					this.saveAudioId(id);
					this.saveCurrentIndex(index);
					myAudio.src = src;
					myAudio.play();
				}
				this.play_state = 1;
				return false;
			},
			pause(){
				myAudio.pause();
				this.play_state = 0;
				return false;
			},
			share() {
				wx.config({
					...this.config_data
				});
				wx.ready(()=> {
					// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
					wx.onMenuShareTimeline({
						title: this.album_info.name, // 分享标题
						link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: this.album_info.thumb, // 分享图标
						success: function() {
							// 用户点击了分享后执行的回调函数
							
						}
					});

					wx.onMenuShareAppMessage({
						title: this.album_info.name, // 分享标题
						desc: this.album_info.title, // 分享描述
						link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: this.album_info.thumb, // 分享图标
						type: '', // 分享类型,music、video或link，不填默认为link
						dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
						success: function() {
							// 用户点击了分享后执行的回调函数
						}
					});

				});
				wx.error(function(res) {
					// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				});
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	@tipicColor: #7bd6d3;
	/*主题色*/
	
	.top {
		justify-content: flex-start;
		padding: 0.5rem 0;
		position: relative;
		z-index: 2;
		>img {
			width: 3rem;
			height: 3rem;
			margin-right: 0.4rem;
			margin-left: 0.4rem;
			box-shadow: 0.1rem 0.1rem 0.3rem rgba(0, 0, 0, 0.3);
		}
		.right {
			width: 5.8rem;
		}
		h4 {
			font-size: 0.48rem;
			padding-top: 0.1rem;
			line-height: 1.5;
			color: #fff;
			span {
				/*width: 5rem;*/
			}
			img {
				width: 0.48rem;
				height: 0.48rem;
			}
		}
		p {
			color: #F7F7F7;
			text-align: left;
			margin-top: 0.4rem;
			line-height: 0.6rem;
			max-height: 1.8rem;
			overflow: hidden;
			display: -webkit-box;
			display: -moz-box;
			overflow: hidden;
			text-overflow: ellipsis;
			word-break: break-all;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
		}
		.bg {
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;
			width: 100%;
			height: 4rem;
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			z-index: -2;
			/*-1 可以当背景*/
			-webkit-filter: blur(0.04rem);
			filter: blur(0.04rem);
		}
		.mask {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			/*background-color: rgba(0,0,116,0.2);*/
			background-color: #666;
			opacity: 0.5;
			z-index: -1;
		}
	}
	
	.tabbar {
		font-size: 0.4rem;
		color: #666;
		padding: 0 0.6rem;
		height: 1.2rem;
		border-bottom: 1px solid #eee;
		div {
			width: 3rem;
			text-align: center;
			&.active {
				color: @tipicColor;
			}
		}
		span {
			display: inline-block;
			height: 0.4rem;
			width: 0;
			border-right: 1px solid #ccc;
		}
	}
	/*详情*/
	
	.detail {
		padding: 0.6rem;
		line-height: 1.5;
		font-size: 0.373333rem;
		.detail-title {
			font-size: 0.453333rem;
			padding-bottom: 0.4rem;
			color: #000;
		}
	}
	/*目录*/
	
	.item {
		padding: 0.2rem 0.6rem 0 0.6rem;
		margin-top: 0.4rem;
		.left {
			width: 1.2rem;
			height: 1.2rem;
			background-size: cover;
			background-position: center;
			text-align: center;
			span {
				display: inline-block;
				width: 0.7rem;
				height: 0.7rem;
				margin-top: 0.22rem;
				background-size: cover;
				background-repeat: no-repeat;
				/*background-image: url(../../../static/img/list_play.png);*/
			}
			.playing {
				/*width: 0.6rem;
				height: 0.6rem;*/
				/*background-image: url(../../../static/img/list_pause.png);*/
				
				margin-top: 0.4rem;
				width: 0.4rem;
				height: 0.4rem;
				background-image: url(../../../dist/static/img/wave.gif);
			}
			.paused{
				width: 0.7rem;
				height: 0.7rem;
				margin-top: 0.22rem;
				background-image: url(../../../static/img/list_play.png);
				
			}
		}
		.right {
			box-sizing: border-box;
			padding-top: 0.12rem;
			width: 7.2rem;
			border-bottom: 1px solid #eee;
			height: 1.2rem;
			/*margin-left: 0.24rem;*/
			p {
				color: #999;
				margin-top: 0.2rem;
			}
		}
	}
</style>