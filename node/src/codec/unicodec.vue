<template>
<el-col :span="12">
	<div class="panel panel-primary">
		<div class="panel-heading">
			unicode decode/encode
		</div>
		<div class="panel-body inputbox">
		  <el-form>
		  	<el-form-item>
		  		<el-input type="textarea" :rows="4" :cols="60" placeholder="str" v-model="unicodeCodec.inputstr"></el-input>
		  	</el-form-item>
		  	<el-button type="primary" @click="codecunicode('D')">decode</el-button>
		  	<el-button type="primary" @click="codecunicode('E')">encode</el-button>
		  </el-form>
		</div>
	</div>
</el-col>
</template>
<script>

export default {
	data() {
		return {
			unicodeCodec:{
				"inputstr":'',
			},
		}
	},
	methods: {
		codecunicode:function(ctype){//unicode de/en code
	    	let res = ctype==="D" ?
	    		this.decToHex(this.unicodeCodec.inputstr):
	    		this.hexToDec(this.unicodeCodec.inputstr);
	    	this.unicodeCodec.inputstr=res;
	    },
	},
	components: {

	},
}
</script>
