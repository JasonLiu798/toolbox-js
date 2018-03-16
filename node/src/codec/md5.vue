<template>
<el-col :span="12">
	<div class="panel panel-primary">
		<div class="panel-heading">
			md5
		</div>
		<div class="panel-body inputbox">
		  <el-form>
		  	<el-form-item>
		  		<el-input type="textarea" :rows="4" :cols="60" v-model="inputstr"></el-input>
		  	</el-form-item>
		  	<el-button type="primary" @click="md5">md5</el-button>
		  </el-form>
		  <div class="row resultbox">
		  	<ul>
		  		<li v-if="output32">
		  			32位：{{ output32 }}
		  		</li>
		  		<li v-if="output16">
		  			16位：{{ output16 }}
		  		</li>
		  	</ul>
		  </div>
		</div>
	</div>
</el-col>
</template>
<script>
// import hex_md5 from '../common/js/md5.vue';
let md5func = require('md5');
export default {
	data(){
		return {
			inputstr:'',
			output32:'',
			output16:'',
		}
	},
	methods: {
		md5:function(){//md5
			let res32 = md5func(this.inputstr);
			this.output32 = res32;
			let res16 = res32.substr(8, 16);
			this.output16 = res16;
		},
	},
	components: {

	},
}
</script>
