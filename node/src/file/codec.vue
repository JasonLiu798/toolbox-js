<template>
<el-row>
	<el-col :span="24"><div class="panel panel-primary">
		<div class="panel-heading">file md5,crc,sha...</div>
		<div class="panel-body inputbox">
		  <a href="http://www.atool.org/file_hash.php">atool(big file slow too)</a>
		  <input type="file" @change="filemd5"/>
		  <el-button type="primary" @click="clear">clear</el-button>
		  <div class="row resultbox">{{fileCrypt.progress}}
		    <ul>
		      <li v-for="item in fileCrypt.cryptFiles">
		      	{{item.name}}:&nbsp;{{item.val}}
		      </li>
		    </ul>
		  </div>
		</div>
		</div>
	</el-col>
</el-row>
</template>
<script>
import { progressiveRead,workerImpl } from './crypto/crypt'
export default {
	data(){
		return {
			fileCrypt:{
				cryptFiles:[],
				progress:''
			},
		}
	},
	mounted:function(){
	},
	methods: {
		clear:function(){
			this.fileCrypt.progress = '';
			this.fileCrypt.cryptFiles = [];
		},
		filemd5:function($event){
			let that = this;
			that.fileCrypt.progress = 'crpyting.....';
			progressiveRead($event.target.files[0],
				workerImpl,
				function(enabledAlgorithms,crc32intermediate){
					let reslist = [
					{
						name:'crc',val:
						that.decimalToHexString(crc32intermediate.res)
					}];
					// debugger
					for (var j = 0; j < enabledAlgorithms.length ; j++) {
					    let res = enabledAlgorithms[j].instance.finalize().toString();
					    reslist.push({name:enabledAlgorithms[j].name,val:res });
					}
					that.fileCrypt.cryptFiles = reslist;
					that.fileCrypt.progress = 'crpyted';
				}
			);

		},
	},
	components: {

	},
}
</script>
