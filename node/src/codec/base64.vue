<template>
<el-col :span="12">
	<div class="panel panel-primary"><!--base64 decode/encode-->
		<div class="panel-heading">
			base64 decode/encode
		</div>
		<div class="panel-body inputbox">
			<el-form>
				<el-form-item>
					<el-input type="textarea" :rows="4" :cols="60" placeholder="str" v-model="base64Codec.inputstr"></el-input>
				</el-form-item>
				<el-button type="primary" @click="base64('E')">encode</el-button>
				<el-button type="primary" @click="base64('D')">decode</el-button>
			</el-form>
		</div>
	</div>
</el-col>
</template>
<script>
// import base64node from 'base64-coder-node'
let base64node = require('base64-coder-node')();
export default {
	data(){
		return {
			base64Codec:{
				"inputstr": ''
			},
		}
	},
	methods: {
		base64:function(btype){
			let res =
	    		btype==="D"?
	    		base64node.decode(this.base64Codec.inputstr):
	    		base64node.encode(this.base64Codec.inputstr);
	    	this.base64Codec.inputstr= res;
	    },
	},
	components: {

	},
}
</script>
