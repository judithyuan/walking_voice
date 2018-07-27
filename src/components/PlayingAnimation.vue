<template>
	<!--音乐在播动画-->
	<div class="playing-animation">
		<div class="vertical-line fst-line"></div>
		<div class="vertical-line scd-line"></div>
		<div class="vertical-line third-line"></div>
		<div class="vertical-line forth-line"></div>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	/*音乐在播小动画*/
		
	.playing-animation {
		position: relative;
		width: 0.37rem;
		height: 0.3rem;
		display: inline-block;
		overflow: hidden;
	}
	.vertical-line {
		position: absolute;
		/*background: rgb(92, 188, 125);*/
		background-color: #25cfad;
		height: 0.3rem;
		/*left: 1px;*/
		width: 2px;
		border-radius: 25%;
	}
	
	.fst-line {
		left: 0;
		animation: skip 2s infinite;
	}
	
	.scd-line {
		left: 0.1rem;
		animation: skip 3s ease-out infinite;
	}
	
	.third-line {
		left: 0.2rem;
		animation: skip 4s linear infinite;
	}
	
	.forth-line {
		left: 0.3rem;
		animation: skip 1.5s infinite;
	}
	
	@keyframes skip {
		0% {
			top: 0;
		}
		50% {
			top: 0.3rem;
		}
		100% {
			top: 0;
		}
	}
</style>