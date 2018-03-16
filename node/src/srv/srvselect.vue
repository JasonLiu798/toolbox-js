<template>
<el-row>
	<el-col :span="24">
	  <div class="panel panel-primary">
	    <div class="panel-heading">环境选择</div>
	    <div class="panel-body inputbox">
	      <el-form :inline="true" ><!--style="float: right;"-->
	        <el-form-item label="服务器">
	          <!--@change="changeSrv"-->
	          <el-select v-model="srv" >
	            <el-option v-for="item in servs" :key="item.value" :label="item.text" :value="item.value"></el-option>
	          </el-select>
	        </el-form-item>
	      </el-form>

	    </div>
	  </div><!-- end of panel -->
	</el-col>
</el-row>
</template>
<script>
let SRVS = [
  // {text:'local',value:'127.0.0.1:8080'},
  {text:'local',value:'10.118.13.68:8080'},
  {text:'dev',value:'10.202.125.246:1080'},
  {text:'sit',value:'aos.sit.sf-express.com'},
  {text:'stg',value:'aos.stg.sf-express.com'},
  {text:'prd',value:'aos.sf-express.com'}
];
export default {
	data(){
		return {
			srv:'',//环境选择区
			servs:SRVS,
		}
	},
	mounted:function(){
		this.srv = SRVS[1].value;
	},
	watch:{
		srv(val){
			// this.$nextTick(() => {
			this.$store.state.global.url = val;
			// });
			// this.$store.state.global.url = val;
		}
	},
	methods: {

	},
	components: {

	},
}
</script>
