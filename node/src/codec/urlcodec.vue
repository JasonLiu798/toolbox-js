<template>
<!-- url decode/encode 编解码-->
<el-col :span="12">
	<div class="panel panel-primary">
		<div class="panel-heading">
			url decode/encode
		</div>
		<div class="panel-body inputbox">
		  <el-form><el-form-item>
		  <el-input type="textarea" :rows="4" :cols="60" placeholder="url" v-model="inputstr"></el-input></el-form-item>
		  <el-button type="primary" @click="codecurl('D')">decode</el-button>
		  <el-button type="primary" @click="codecurl('E')">encode</el-button>
		  </el-form>
		</div>
	</div>
</el-col>
</template>
<script>
export default {
	data(){
		return {
			inputstr:'',
		}
	},
	methods: {
	    codecurl:function(ctype){//url encode/decode
	      let res = ctype==="D"?decodeURI(this.inputstr):encodeURI(this.inputstr);
	      this.inputstr = res;
	    },
	},
	components: {
	},
}
</script>
