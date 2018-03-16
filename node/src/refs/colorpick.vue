<template>
<div class="colorpick">
	<div class="form__field">
		<div class="form__label">
		<strong>Please choose a color:</strong>
		</div>
		<div class="form__input">
			<swatches
			  v-model="color"
			  colors="text-advanced"
			  show-fallback
			  popover-to="right"
			  showBorder
			  shapes="circles"
			></swatches>
			<!-- inline="false" -->
		</div>
	</div>
</div>
</template>
<script>
import Swatches from 'vue-swatches'
import "vue-swatches/dist/vue-swatches.min.css"
export default {
	data(){
		return {
			color:'#123',
		}
	},
	mounted:function(){
	},
	methods: {
	},
	components: {
		Swatches
	},
}
</script>
<style>
.colorpick{
	text-align:left;
	height:500px;
}
</style>


