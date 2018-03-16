<template>
<el-row :gutter="20">
	<pub></pub>
	<upload-file></upload-file>
</el-row>
</template>
<script>
import pub from './pub.vue'
import uploadFile from './uploadfile.vue'

export default {
	data(){
		return {

		}
	},
	mounted:function(){
	},
	methods: {

	},
	components: {
		pub,
		uploadFile
	},
}
</script>
