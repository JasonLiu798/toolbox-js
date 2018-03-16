<template>
<div class="panel panel-primary">
	<div class="panel-heading">各类常用格式化</div>
	<div class="panel-body inputbox">
	  <el-form>
	  	<el-form-item>
	    	<el-input type="textarea" :rows="10" :cols="60" placeholder="..." v-model="raw">
	    	</el-input>
	    </el-form-item>
	    <el-button type="primary" @click="formatjson">json</el-button>
	    <el-button type="primary" @click="fmtjs">js</el-button>
	    <el-button type="primary" @click="fmtsql">SQL</el-button>
	    <el-button type="primary" @click="fmtcss">CSS</el-button>
	    <el-button type="primary" @click="fmtxml">XML</el-button>
	    <el-button type="primary" @click="fmthtml">HTML</el-button>

	    <el-button type="primary" @click="clear">clear</el-button>
	    <div class="row resultbox"><pre><code>{{output}}</code>
	    </pre></div>
	  </el-form>
	</div>
</div>
</template>
<script>
import { Message } from 'element-ui'
import { js_beautify } from './jsbeautify'
import { cssbeautify } from './cssbeautify'
import sqlFormatter from "sql-formatter"
import xmlformat from 'xml-formatter'
import pretty from 'pretty'
export default {
	data(){
		return {
			raw:'',
			output:''
		}
	},
	methods: {
		formatjson:function(){
			let jsonRaw = this.raw;
			console.log('json raw:'+jsonRaw);
			try{
				let jsonfmted = JSON.stringify(JSON.parse(jsonRaw), null, 4);
				// console.log('json fmt:'+jsonfmted);
				this.output = jsonfmted;
			}catch(err){
				Message({ message: '格式化报错'+err.message,type: 'warning'});
			}
	    },
		fmtjs:function(){
			this.output = js_beautify(this.raw);
		},
		fmtsql:function(){
			this.output = sqlFormatter.format(this.raw, {
				language: "n1ql", // Defaults to "sql"
				indent: "    "// Defaults to two spaces
			});
		},
		fmtcss:function(){
			this.output = cssbeautify(this.raw);
		},
		fmtxml:function(){
			this.output = xmlformat(this.raw);
		},
		fmthtml:function(){
			this.output = pretty(this.raw);
		},
	    clear:function(){
	      this.jsonRaw= '';
	      this.output = '';
	    },
	},
	components: {

	},
}
</script>
