<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
	*{
		margin: 0;
		padding: 0;
	}
#app {
  font-family: PingFangSC-Regular, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
div,text,p{
	line-height: 1;
}
a{
	text-decoration: none;
	color: inherit;
}
.img-container img{
	width: 100%;
	height: 100%;
}
.common-bg{
	background-size: 100 auto;
	background-position: center;
	background-repeat: no-repeat;
}
/*间隔条*/
.gap-line{
	height: 0.2rem;
	background-color: #999;
}
/*弹性布局*/
.flex-between{
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
}
.flex{
	display: flex;
	flex-wrap: wrap;
}
/*单行文字省略*/
.ellipsis{
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
/*我是有底线的*/
.bottom-line{
	padding: 0.4rem;
	background-color: #999;
	color: #fff;
}

</style>
