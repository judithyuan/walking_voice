<template>
	<div>
		<div class="top flex">
			<div class="bg"></div>
			<div class="mask"></div>
			<img src="../../../static/img/banner_3.jpg" />
			<div class="right">
				<h4 class="flex-between"><span class="ellipsis">南通-张骞</span> <img src="../../../static/img/share.png"/></h4>
				<p>简介的事发生发射点发射点发射点发射胜多负少发射点发射点发士大夫撒旦发生大哥萨格撒旦发射点发范德萨发撒法发士大夫打撒广东噶阿凡达是发噶多噶梵蒂冈点发射点</p>
			</div>
		</div>
		<div class="tabbar flex-between">
			<div :class="active_tab==1?'active':''" @click="switchTab(1)">详情</div>
			<span></span>
			<div :class="active_tab==2?'active':''" @click="switchTab(2)">目录</div>
		</div>

		<!--详情-->

		<div class="detail" :hidden="active_tab == 2">
			这里是详情 这里是详情 这里是详情
		</div>
		<!--目录-->
		<div  :hidden="active_tab == 1">
			<router-link to="/player" class="item flex-between">
				<div class="right">
					<h4>南通-张骞：中国伟大的失败的英雄</h4>
					<p>来自声行漫步</p>
				</div>
				<div class="left" style="background-image: url('../../../static/img/banner_1.jpg');">
					<span></span>
				</div>
			</router-link>
			<router-link to="/player" class="item flex-between">
				<div class="right">
					<h4>南通-张骞：中国伟大的失败的英雄</h4>
					<p>来自声行漫步</p>
				</div>
				<div class="left" style="background-image: url('../../../static/img/banner_1.jpg');">
					<span class="playing"></span>
				</div>
			</router-link>

		</div>
		<div class="bottom-line">已经到底了~</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				active_tab: 2,
			}
		},
		methods:{
			switchTab(param){
				this.active_tab = param;
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
			margin-top: 0.2rem;
			color: #fff;
			span {
				width: 5rem;
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
			background: url('../../../static/img/banner_3.jpg') no-repeat;
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
				background-image: url(../../../static/img/play_icon.png);
			}
			.playing{
				margin-top: 0.3rem;
				width: 0.4rem;
				height: 0.4rem;
				background-image: url(../../../static/img/wave.gif);

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