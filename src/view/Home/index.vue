<template>
	<div>
		<!--<img src="/static/img/banner_1.jpg" style="width: 100%;"/>-->
		<!--轮播-->
		<swiper :options="swiperOption" ref="mySwiper" style="height:4rem">
			<swiper-slide v-for="(banner,index) in banners" :key="index">
				<router-link :to="banner.link?banner.link:'/'" style="display: inline-block;width: 100%;height:100%;">
					<img :src="banner.img" style="width: 100%;height: 100%;">
				</router-link>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
		<!--热门收听-->
		<div class="home-title">
			<div>热门收听</div>
		</div>
		<div class="flex-between hot">
			<router-link v-for="(item,index) in hot_list" :to="'list/'+item.id" class="item" :key="item.id">
				<img :src="item.thumb" />
				<p class="ellipsis">
					{{item.name}}
				</p>
			</router-link>
		</div>
		<div class="gap-line"></div>

		<!--专辑列表-->
		<div class="home-title">
			<div>专辑列表</div>
		</div>
		<div class="flex-between album">
			<router-link v-for="(item,index) in albums_list" :to="'/list/'+item.id" class="item" :key="index">
				<img :src="item.thumb" />
				<p class="ellipsis">
					{{item.name}}
				</p>
			</router-link>

		</div>

		<!--我是有底线的-->
		<div class="bottom-line">
			<div>已经到底了~</div>
		</div>

		<!--单曲入口-->
		<router-link :to="'/player/'+audio_id" class="entrance" v-if="audio_id">
			<img src="../../../static/img/light_disk.png" class="rotate" />
		</router-link>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import { mapState, mapMutations } from 'vuex';
	export default {
		components: {
			swiper,
			swiperSlide
		},
		data() {
			return {
				banners: [],
				swiperOption: { //轮播配置项
					//					loop: true, //这个东西有bug
					autoplay: {
						delay: 3000,
						stopOnLastSlide: false,
						disableOnInteraction: false,
					},
					grabCursor: true,
					setWrapperSize: true,
					autoHeight: false,
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
						bulletActiveClass: 'my-bullet-active',
					},

				},
				hot_list: [],
				albums_list: []
			}
		},

		computed: {
			...mapState(['audio_id', 'code']),
		},
		mounted() {
			this.server.getIndexData().then(res => {
				this.banners = res.msg.swiper;
				this.hot_list = res.msg.hot;
				this.albums_list = res.msg.albums;
			})
		},
		methods: {
			actualBack() {
				console.log('dianw ')
			},
			back() {
				console.log('回退')
			},

		},

	}
</script>

<style lang='less'>
	.my-bullet-active {
		background-color: #ffffff;
		opacity: 0.8;
	}
	
	.home-title {
		padding: 0.453333rem 0.4rem;
		text-align: left;
		div {
			font-weight: 600;
			line-height: 1;
			font-size: 0.48rem;
			display: inline-block;
			padding-left: 0.16rem;
			border-left: 0.08rem solid #fe0000;
			border-radius: 0.08rem 0 0 0.08rem;
		}
	}
	/*热门*/
	
	.hot {
		font-weight: 600;
		padding: 0.2rem 0.45rem 0.3rem 0.45rem;
		text-align: center;
		.item {
			width: 2rem;
			img {
				width: 1.8rem;
				height: 1.8rem;
				border-radius: 100%;
			}
			p {
				margin-top: 0.4rem;
			}
		}
	}
	/*专辑*/
	
	.album {
		font-weight: 600;
		padding: 0 0.28rem;
		.item {
			margin-bottom: 0.48rem;
			width: 3.01rem;
			img {
				width: 100%;
				height: 3.01rem;
			}
			p {
				margin-top: 0.24rem;
			}
		}
	}
	/*单曲入口*/
	
	.entrance {
		position: fixed;
		/*right:calc(50% - 0.55rem);*/
		/*bottom: 0%;*/
		right: 0;
		top: 65%;
		width: 1.4rem;
		padding: 0.05rem;
		background-color: #fff;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
		border: 1px solid #eee;
		border-radius: 100% 0 0 100%;
		img {
			width: 1.1rem;
			height: 1.1rem;
			margin-top: 0.05rem;
		}
	}
	
	.rotate {
		animation: rotate 3s linear infinite;
	}
	
	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>