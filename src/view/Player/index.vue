<template>
	<div>
		<!--头图-->
		<div>
			<img src="../../../static/img/test3.jpg" class="top-banner" />
		</div>

		<!--标题-->
		<div class="essay-title">
			{{audio_list[active_index].name}}
		</div>

		<!--内容-->
		<div class="content" v-html="audio_list[active_index].content"></div>

		<!--二维码部分-->
		<div class="company flex-between">
			<img src="../../../static/img/walking_voice.png" class="left" />
			<div class="right">
				<img src="http://p.doguane.cn/03/qrcode_2.jpg" />
			</div>
		</div>

		<!--播放器-->
		<div class="bottom">
			<!--滚动条-->
			<input type="range" name="" id="" v-model='current_scd' value="0" step="1" :max="duration_scd" @change="change" :style="{backgroundSize:(current_scd*100/duration_scd)+'%'}" />
			<!--<div class="handle-bar-time" :style="{left:(value*100/duration_scd)+'%'}" ref='timeEle'>02:23|04:45</div>-->

			<div class="btn-group flex-between">
				<router-link to='/'><img src="../../../static/img/home_icon.png" class="home-icon" /></router-link>
				<div>
					<img src="../../../static/img/prev.png" class="prev-next" v-if="btn_state == 0" />
					<img src="../../../static/img/prev_clickable.png" class="prev-next" @click="prev" v-else/>
				</div>
				<div>
					<img src="../../../static/img/pause.png" class="home-icon" @click="pause" v-if="playing_state == 2" />
					<img src="../../../static/img/play.png" class="play-icon" @click="startPlay" v-else-if="playing_state == 1" />
					<img src="../../../static/img/audio_loading.gif" class="home-icon" v-else/>
				</div>
				<div>
					<img src="../../../static/img/next.png" class="prev-next" v-if="btn_state == 2" />
					<img src="../../../static/img/next_clickable.png" class="prev-next" @click="next" v-else/>
				</div>
				<img src="../../../static/img/list_icon.png" class="home-icon" @click="show" />
			</div>
		</div>

		<!--列表弹窗-->
		<!---->
		<div class="list-modal" :class="show_modal==1?'show-modal':(show_modal == 2?'hide-modal':'')">
			<div class="album-title flex-between">
				<h4>专辑列表</h4>
				<span @click="hide">关闭</span>
			</div>
			<div class="item-box">
				<div class="item flex-between" v-for="(item,index) in audio_list" @click="chooseAudio(index)">
					<div :class="active_index == index?'active':''">{{item.name}}</div>
					<img src="../../../static/img/wave.gif" v-if="active_index == index" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	var myAudio;
	export default {
		name: 'HelloWorld',
		components: {
			//    Aplayer
		},
		created() {
			console.log('created')
			this.getData();
			this.active_index = this.$store.state.current_index;
		},
		mounted() { //在该生命周期获取audio节点,否则会报错
			myAudio = document.getElementById("myAudio");
			this.switchAudio();
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				obj: {},
				show_modal: false, //列表弹窗
				active_index: 0, //正在在播放音频index
				current_scd: 0, //当前播放秒数
				duration_scd: 100, //当前歌曲总的秒数
				playing_state: 1, //1为暂停中,2为播放中,0为加载中
				btn_state: 1, //0为已播放到第一首,2为播放到最后一首
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
						id: 3,
						content: '<div>玫瑰花的葬礼</div><div>黄思海深爱美霞</div><div>离开你一百个星期</div><div>我回到了这里</div><div>寻找我们爱过的证据</div>'
					}
				],

			}
		},
		methods: {
			...mapMutations(['saveCurrentIndex','saveAudioId']),
			getData() {
				if(this.active_index < this.audio_list.length - 1) {
					this.btn_state = 2;
				}
				if(this.active_index < 1) {
					this.btn_state = 0;
				}
			},
			show() {
				this.show_modal = 1;
			},
			hide() {
				this.show_modal = 2;
			},
			chooseAudio(index){
				this.switchAudio(index);
				this.show_modal = 2;
			},
			switchAudio(index,id) {
				if(index || index ===0) {
					this.active_index = index;
					this.saveCurrentIndex(index);
				}
				this.saveAudioId(this.audio_list[this.active_index].id);
				this.playing_state = 0;
				myAudio.autoplay = true;
				if(myAudio.played.length > 0 && !index && index!== 0) { //音乐已播放部分并且没有切换index
					myAudio.play();
				} else { //切换音乐
					myAudio.src = this.audio_list[this.active_index].src;
					console.log(myAudio.src)
				}

				myAudio.ontimeupdate = () => {
					this.duration_scd = myAudio.duration;
					if(!this.duration_scd) {}
					this.current_scd = myAudio.currentTime;
					if(myAudio.paused) {
						this.playing_state = 1;
					} else {
						this.playing_state = 2;
					}
					if(myAudio.ended) { //音频结束切换current_time
						this.current_scd = 0;
					}
				}

				if(index+1 == this.audio_list.length) {
					this.btn_state = 2;
				}
				if(index < 1) {
					this.btn_state = 0;
				}
			},
			//开始播放
			startPlay() {
				
				this.switchAudio();
			},
			//暂停
			pause() {
				myAudio.pause();
			},
			//下一首
			next() {
				this.switchAudio(this.active_index + 1);
			},
			//上一首
			prev() {
				this.switchAudio(this.active_index - 1);
			},
			//进度控制
			change() {
				let seek = this.current_scd;
				myAudio.currentTime = seek;
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.top-banner {
		width: 100%;
	}
	
	.essay-title {
		line-height: 1.6rem;
		border-bottom: 1px solid #eee;
		text-align: center;
		font-size: 0.6rem;
		/*font-weight: 500;*/
		font-family: '黑体';
	}
	
	.content {
		padding: 0.6rem 0.3rem;
		min-height: 3rem;
		line-height: 1.5;
	}
	
	.company {
		height: 5rem;
		background-color: #83bcab;
		color: #f4f1ef;
		padding: 0 0.28rem 0 1.2rem;
		margin-bottom: 2rem;
		.left {
			width: 2.8rem;
			height: 2.906666rem;
		}
		.right {
			width: 4.45rem;
			height: 4.45;
			/*padding: 0.28rem;*/
			box-sizing: border-box;
			img {
				width: 100%;
				/*height: 100%;*/
			}
		}
	}
	/*底部操作条*/
	
	.bottom {
		position: fixed;
		width: 100%;
		bottom: 0;
		padding-top: 0.16rem;
		background-color: #fff;
		box-shadow: 0 -1px 0.2rem rgba(0, 0, 0, 0.05);
		.btn-group {
			img {
				vertical-align: middle;
			}
			/*border-top: 1px solid #eee;*/
			padding: 0 0.6rem;
			height: 1.2rem;
			.home-icon {
				width: 0.53rem;
			}
			.prev-next {
				width: 0.45rem;
			}
			.play-icon {
				width: 0.42rem;
			}
		}
		.handle-bar-time {
			/*display: none;*/
			display: inline-block;
			position: absolute;
			z-index: 1;
			top: -0.5rem;
			/*top: -0.15rem;*/
			/*background-color: #7cd9bd;*/
			background-color: red;
			color: #fff;
			/*color: #999;*/
			padding: 0.05rem 0.1rem;
			border-radius: 0.2rem;
		}
		/*.handle-bar{
			top: -0.2rem;
			color: #fff;
			line-height: 0.4rem;
			padding: 0 0.15rem;
			border-radius: 1rem;
			display: inline-block;
			background-color: #62aa95;
			position: absolute;
		}*/
		/*滚动条*/
		input[type=range] {
			position: absolute;
			top: 0;
			-webkit-appearance: none;
			/*清除系统默认样式*/
			width: 100%;
			background: -webkit-linear-gradient(#7cd9bd, #7cd9bd) no-repeat, #eee;
			/*设置左边颜色为#62aa95，右边颜色为#ddd*/
			/*background-size: 100% 100%;*/
			/*设置左右宽度比例*/
			height: 2px;
			/*横条的高度*/
		}
		/*拖动块的样式*/
		input[type=range]::-webkit-slider-thumb {
			/*opacity: 0;*/
			-webkit-appearance: none;
			box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
			/*清除系统默认样式*/
			height: 0.5rem;
			/*拖动块高度*/
			width: 0.5rem;
			/*拖动块宽度*/
			background: #7cd9bd;
			/*拖动块背景*/
			border-radius: 100%;
			/*外观设置为圆形*/
			/*border: solid 1px #ddd;*/
			/*设置边框*/
			position: relative;
			z-index: 2;
		}
	}
	
	.list-modal {
		position: fixed;
		height: 0;
		width: 100%;
		bottom: 0;
		background-color: #666;
		box-shadow: 0 -1px 0.2rem rgba(0, 0, 0, 0.1);
		.album-title {
			width: 100%;
			height: 1.2rem;
			/*border-bottom: 1px solid #eee;*/
			padding: 0 0.6rem;
			box-sizing: border-box;
			position: absolute;
			background-color: #fff;
			top: 0;
			h4 {
				/*color: #fff;*/
				font-size: 0.373333rem;
			}
			span {
				/*color: #f0f0f0;*/
			}
		}
		.item-box {
			margin-top: 1.2rem;
			max-height: 7.8rem;
			overflow-y: scroll;
			.item {
				height: 1rem;
				padding: 0 0.6rem;
				color: #ccc;
				.active {
					color: #fff;
				}
			}
		}
	}
	
	.show-modal {
		animation: show 0.5s;
		height: 9rem;
	}
	
	.hide-modal {
		animation: hide 0.5s;
		height: 0;
	}
	
	@keyframes show {
		from {
			height: 0;
		}
		to {
			height: 9rem;
		}
	}
	
	@keyframes hide {
		from {
			height: 9rem;
		}
		to {
			height: 0;
		}
	}
</style>