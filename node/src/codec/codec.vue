<template>
	<el-row>
		<el-row :gutter="20">
			<md5></md5>
			<urlcodec></urlcodec>
		</el-row>
		<el-row :gutter="20">
			<unicodec></unicodec>
			<base64></base64>
		</el-row>
	</el-row>
</template>
<script>
import md5 from './md5.vue'
import urlcodec from './urlcodec.vue'
import base64 from './base64.vue'
import unicodec from './unicodec.vue'

export default {
	data(){
		return {
		}
	},
	methods: {

	},
	components: {
		md5,
		urlcodec,
		unicodec,
		base64,
	},
}
</script>
