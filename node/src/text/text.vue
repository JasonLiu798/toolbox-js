<template>
<div>
	<el-tabs v-model="activeName">
		<!-- business associate ,业务相关 -->
		<el-tab-pane label="editor" name="editor">
			<text-editor></text-editor>
		</el-tab-pane>
		<el-tab-pane label="diff" name="diff">
			<text-diff></text-diff>
		</el-tab-pane>
    </el-tabs>
</div>

</template>
<script>
import textEditor from './texteditor.vue'
import textDiff from './diff.vue'

export default {
	data(){
		return {
			activeName:'editor'
		}
	},
	mounted:function(){
	},
	methods: {

	},
	components: {
		textEditor,textDiff
	},
}
</script>

