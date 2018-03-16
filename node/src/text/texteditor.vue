<template>
<div class="panel panel-primary">
	<div class="panel-heading">文本处理</div>
	<div class="panel-body inputbox">
	  <el-form>
	  	<el-form-item>
	    	<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 20}" :cols="60" placeholder="text" v-model="textEditArea.textRaw"></el-input>
	    </el-form-item>
	    <el-button type="primary" @click="textEdit('rmSpaceLine')">去除空行</el-button>
	    <el-button type="primary" @click="textEdit('rmComment')">去除注释</el-button>
	    <el-button type="primary" @click="textEdit('derangement')">乱序</el-button>
	    <div class="row resultbox"><pre>{{textEditArea.output}}</pre>
	    </div><!--<pre></pre> -->
	  </el-form>
	</div>
</div>
</template>
<script>
import { editWord } from './texttools'
import { Message } from 'element-ui';
export default {
	data(){
		return {
			textEditArea:{textRaw:'',output:''},
		}
	},
	mounted:function(){
	},
	methods: {
		textEdit:function(opType){
			try{
				this.textEditArea.output = editWord(opType,this.textEditArea.textRaw);
			}catch(err){
				Message({ message: '处理报错'+err.message, type: 'warning' });
			}
		},
	},
	components: {

	},
}
</script>
