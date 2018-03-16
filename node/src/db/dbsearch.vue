<template>
<div class="panel panel-primary">
	<div class="panel-heading">
		db
	</div>
	<div class="panel-body inputbox">
		<el-form :inline="true">
			<el-form-item>
				url {{this.urlSearchdb}}
			</el-form-item>
	  		<el-form-item>
			    <el-select v-model="sqlpart" ><!--@change="changeDbSrv"-->
			        <el-option v-for="item in sqls" :key="item.value" :label="item.text" :value="item.value"></el-option>
			    </el-select>
			</el-form-item>
	    	<el-button type="primary" @click="addsql('S')">sql</el-button>


		    <el-select v-model="btable" ><!--@change="changeDbSrv"-->
		        <el-option v-for="item in btables" :key="item.value" :label="item.text" :value="item.value"></el-option>
		    </el-select>
	    	<el-button type="primary" @click="addsql('B')">btable</el-button>

		    <el-select v-model="ttable" ><!--@change="changeDbSrv"-->
		        <el-option v-for="item in ttables" :key="item.value" :label="item.text" :value="item.value"></el-option>
		    </el-select>
		    <el-button type="primary" @click="addsql('T')">ttable</el-button>
	  	</el-form>

		<el-form :inline="true">
			<el-select v-model="psql" :default-first-option="true">
				<el-option v-for="item in psqls" :key="item.value" :label="item.text" :value="item.value"></el-option>
			</el-select>
			<el-button type="primary" @click="addsql('P')">sqls</el-button>
		</el-form>

		<el-form>
			<el-form-item>
				<el-input type="textarea" :rows="10" :cols="60" placeholder="sql" v-model="sql"></el-input>
			</el-form-item>
			<el-button type="primary" @click="searchdb">search</el-button>
			<el-button type="primary" @click="cleardb">clear</el-button>
			<div class="row resultbox">
				<div id="dbresult" style="overflow:scroll;" v-html="output">
				{{ output }}
				</div>
				</pre>
			</div>
		</el-form>
	</div>
</div>
</template>
<script>
let SEARCH_DB="/text/textp";
import pgc_ from '../common/js/constantPrivate.vue'
import { Message } from 'element-ui';
export default {
	data(){
		return {
			urlSearchdb:'',
			sqlpart:'',
			sql:'',
			output:'',
			ttables:pgc_.THIRD_TABLES,
			btables:pgc_.BIZ_TABLES,
			psqls:pgc_.PSQLS,
			psql:'',
			btable:'tm_clue',
			ttable:'bie_dim_audit_model_aos',
			sqls:pgc_.SQLS,
			sqlpart:'count'
		}
	},
	mounted:function(){
		this.urlSearchdb = this.srv + SEARCH_DB;
	},
	computed: {
		srv() {
		  return this.$store.state.global.url;
		}
	},
	watch:{
		srv(val){
		  console.log('srv '+val);
		  // this.ajaxReq.url = val?val+TYPE_URL[this.ajaxReq.inftype].url:TYPE_URL[this.ajaxReq.inftype].url;
		  this.urlSearchdb = this.srv + SEARCH_DB;
		}
	},
	// watch:{
	// 	srv(val){
	// 		// this.ajaxReq.url = val +TYPE_URL[this.ajaxReq.inftype].url;//ajax
	// 		this.urlSearchdb = this.srv + SEARCH_DB;
	// 		//this.ajaxReq.url = HTTP+ val +TYPE_URL['prj'].url;//ajax
	// 	}
	// },
	methods: {
		addsql:function(addtype){
			switch(addtype){
			case 'S':
			  if(this.sqlpart==='desc'){
			    this.sql = 'select * from '+this.sql+' limit 1';
			  }else if(this.sqlpart==='count'){
			      this.sql='select count(*) from '+this.sql;
			  }
			  break;
			case 'T':
			  this.sql+=' '+this.ttable;
			  break;
			case 'B':
			  this.sql+=' '+this.btable;
			  break;
			case 'P':
			  this.sql+=this.psql;
			  break;
			}
		},
		searchdb:function(){
			let param = { "text": this.sql,"type":'T' };
			//console.log('url '+this.urls.searchdb+',param '+JSON.stringify(param));
			let that = this;
			this.httpExt().post(this.urlSearchdb,JSON.stringify(param))
				.then(function(response) {
					if( response.code===0){
						that.output = response.result;
					}else{
						Message({ message: response.msg,type: 'warning'});
					}
				},
				function(response) {
					Message({ message: response, type: 'warning' });
				});
		},
		cleardb:function(){
			this.sql='';
		},
	},
	components: {

	},
}
</script>
