<template>

	<el-tabs v-model="activeName">
    	<el-tab-pane label="html-char" name="html-char">
    		<html-char></html-char>
    	</el-tab-pane>
    	<el-tab-pane label="ascii" name="ascii">
    		<ascii></ascii>
    	</el-tab-pane>
    	<el-tab-pane label="httpStatus" name="httpStatus">
    		<http-status></http-status>
    	</el-tab-pane>
    	<el-tab-pane label="ContentType" name="ContentType">
    		<http-content></http-content>
    	</el-tab-pane>
    	<el-tab-pane label="color" name="color">
    		<color-pick></color-pick>
    	</el-tab-pane>
    </el-tabs>
</template>
<script>
import htmlChar from './htmlchar.vue'
import ascii from './ascii.vue'
import httpStatus from './httpstatus.vue'
import httpContent from './httpcontent.vue'
import colorPick from './colorpick.vue'
export default {
	data(){
		return {
			activeName:'html-char'
		}
	},
	mounted:function(){
	},
	methods: {

	},
	components: {
		htmlChar,ascii,httpStatus,httpContent,colorPick
	},
}
</script>
<style>

</style>
