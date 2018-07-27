<template>
	<div class="loading">
		<img src="../../static/img/loading.gif"/>
	</div>
</template>

<script>
</script>

<style scoped="scoped" lang="less">
	.loading{
		text-align: center;
		z-index: 999;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: fixed;
		/*background-color: rgba(255,255,255,0.5);*/
		background-color: #eff4fa;
		img{
			width: 0.4rem;
			margin-top: 8.24rem;
		}
	}
</style>