<template>
<div>
	<el-row>
		<el-col :span="8">
			<el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" :cols="60" placeholder="text" v-model="left"></el-input>
		</el-col>
		<el-col :span="8">
			<el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" :cols="60" placeholder="text" v-model="right"></el-input>
		</el-col>
		<el-col :span="8">
			<div class="row resultbox ">
				<span v-for="item in result"
				:class="item.added ?'ins': item.removed?'del':'grey'">{{item.value}}</span>
			<!-- </pre> -->
			</div>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span="2">
			<el-button type="primary" @click="diffprocess">diff</el-button>
		</el-col>
	</el-row>
</div>
</template>
<script>
import colors from 'colors';
// import {jsdiff} from 'diff';
var jsdiff = require('diff');
export default {
	data(){
		return {
			left:'',
			right:'',
			result:[],
		}
	},
	mounted:function(){
	},
	methods: {
		diffprocess:function(){

			var diffres = jsdiff.diffChars(this.left, this.right);
			// var diffres = jsdiff.diffLines(this.left, this.right);
			/*
			diffres.forEach(function(part){
			// 	// green for additions, red for deletions
			// 	// grey for common parts
				color = part.added ? 'green' :
				part.removed ? 'red' : 'grey';
				span = document.createElement('span');
				span.style.color = color;
				span.appendChild(document
				.createTextNode(part.value));
				fragment.appendChild(span);
			});*/
			console.log(diffres);
			this.result = diffres;
		}
	},
	components: {

	},
}
</script>
<style>
.del {
	text-decoration: none;
	color: #b30000;
	background: #fadad7;
}
.ins {
	background: #eaf2c2;
	color: #406619;
	text-decoration: none;
}
</style>
