<template>
<!-- 发布html -->
<el-col :span="12"><div class="panel panel-primary">
	<div class="panel-heading">
		发布html
	</div>
	<div class="panel-body inputbox">
		<div class="row oneline">
			发布url:{{ pubUrl }}</br>
			回滚为: {{ rbUrl }}
		</div>

		<el-form :inline="true">
			<el-form-item label="是否强制">
			  <el-select v-model="pubhtml.pubType">
			    <el-option v-for="item in commonYN" :key="item.value" :label="item.text" :value="item.value"></el-option>
			  </el-select>
			</el-form-item>

			<el-form-item>
				<el-input type="text" v-model="pubhtml.oldversion">
					<template slot="prepend">旧版本</template>
				</el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="pubHtml">发布</el-button>
				<el-button type="primary" @click="rollbackHtml">回滚</el-button>
			</el-form-item>
		</el-form>

		<el-form>
			<el-form-item>
				<el-input type="textarea" :rows="8" :cols="70" placeholder="html内容" v-model="pubhtml.newHtmlContent"></el-input>
			</el-form-item>
		</el-form>
		<div class="row resultbox">
			发布结果 {{ pubhtml.pubRes }}
		</div>
	</div>
	</div>
</el-col>
</template>
<script>
let HTML = '';
let PUB = '/contentmgr/pub';
let RB_HTML = '/contentmgr/rollback';
export default {
	data(){
		return {
			pubUrl:'',
			rbUrl:'',
			pubhtml:{
				newHtmlContent: HTML,
				oldversion:'' ,
				pubRes:'',
				pubType:'Y'
			},
			commonYN:[{text:'第一次',value:'Y'},{text:'非第一次',value:'N'}],
		}
	},
	mounted:function(){
		// this.srv = this.$store.state.global.url;
	},
	computed: {
		srv() {
			return this.$store.state.global.url;
		}
	},
	watch:{
		srv(val){
			// console.log('srv '+val);
			this.pubUrl = this.srv+ PUB;
			this.rbUrl = this.srv + RB_HTML;
		}
	},
	methods: {
		//发布html
		pubHtml:function(){
		    let updContent = {
		        "content": this.pubhtml.newHtmlContent,
		        "isFirst": this.pubhtml.pubType
		    };
		    console.log('pub html '+JSON.stringify(updContent) );
		    // this.httpExt().post()
		    /*
		    $.ajax({
		        type: "POST",
		        url: this.urls.pub,
		        data: updContent,
		        crossDomain: true,
		        xhrFields: { withCredentials: true },
		        success: function (data) {
		            console.log('res:'+ JSON.stringify(data));
		            this.pubhtml.pubRes = JSON.stringify(data);
		        }.bind(this),
		        error: function (data) {
		            this.pubhtml.pubRes = JSON.stringify(data);
		        }.bind(this)
		    });*/
		},
		//回滚 js
		rollbackHtml:function(){
			/*
		    $.ajax({
		        type: "post",
		        url: this.urls.rbHtml,
		        crossDomain: true,
		        xhrFields: { withCredentials: true },
		        data: { "content": this.pubhtml.oldversion },
		        success: function (data) {
		            console.log('res:'+ JSON.stringify(data));
		            this.pubhtml.pubRes = JSON.stringify(data);
		        }.bind(this),
		        error: function (data) {
		            this.ares = 'fail:' + data;
		        }.bind(this)
		    });
		    */
		},
	},
	components: {

	},
}
</script>
