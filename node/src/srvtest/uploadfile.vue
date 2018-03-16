<template>
<!-- 更新静态文件 -->
<el-col :span="12"><div class="panel panel-primary">
	<div class="panel-heading">更新静态文件</div>
	<div class="panel-body inputbox">
	  <div class="row oneline">发布url：{{ uploadUrl }}</div>
	  <el-form>
	  <!--:file-list="scope.row.fileList" :on-remove="handleRemove"  -->
	  	<el-upload
	  		name="fileInput"
            :action="uploadUrl"
            :with-credentials="true"
            :before-upload="beforeUpload"
            @click.native="uploadClick()"
            :data="{
            	'name':filemate.name ,
            	'version':filemate.version,
            	'type':filemate.type}"
            :on-success="uploadSuccess">
            <el-button style="margin-left:3px" size="mini" type="primary" @click="uploadClick">点击上传</el-button>
        </el-upload>

<!-- 	    <el-form-item label="文件">
	      <input type="file" id="fileInput" class="form-control"/>
	    </el-form-item> -->
	    <el-form-item label="name">
	      <el-input type="text" v-model="filemate.name"></el-input>
	    </el-form-item>
	    <el-form-item label="ver">
	      <el-input type="text" v-model="filemate.version"></el-input>
	    </el-form-item>
	    <el-form-item label="type">
	      <el-select v-model="filemate.type">
	        <el-option v-for="item in pubType" :key="item.value" :label="item.text" :value="item.value"></el-option>
	      </el-select>
	    </el-form-item>
	    <!-- <el-button type="primary" >更新</el-button> -->
	    <!--@click="updfile"-->
	  </el-form>
	  <div class="row resultbox">发布结果{{ filemate.res }}</div>
	</div>
	</div>
</el-col>
</template>
<script>
import {NOWTS} from '../common/js/constant';
let UPD_FILE = '/contentmgr/updfile';
import { Message } from 'element-ui';
export default {
	data(){
		return {
			uploadUrl:'',
			filemate:{
				type:"J",
				name:"main",
				version: NOWTS,
				res:''
			},
			pubType:[
				{text:'JS',value:'J'},
				{text:'CSS',value:'C'},
				{text:'HTML',value:'H'}
			],
		}
	},
	mounted:function(){
	},
	computed: {
		srv() {
			return this.$store.state.global.url;
		}
	},
	watch:{
		srv(val){
			console.log('srv '+val);
			this.uploadUrl = 'http://'+this.srv+ UPD_FILE;
		}
	},
	methods: {
		beforeUpload(file) {

			let that = this;
			return new Promise((resolve, reject) => {
				if( !this.uploadUrl ){
					Message({ message: '上传url为空，请选择环境', type: 'error'});
					reject(file);
					return
				}
				if(file.size / (1024 * 1024) > 50) {
					Message({ message: '文件大小超出50M！', type: 'error'});
					reject(file);
					return;
				}
				that.$nextTick(_ => {
                    this.filemate.res = "正在进行，请稍候";
					resolve(file);
				});
			});
		},
		uploadSuccess(response, file, fileList) {
			this.filemate.res = response.msg;
		},
		uploadClick(){

		}
		//upload file ajax,crossdomain
		/*
	    updfile: function(){
	        let formData = new FormData();
	        formData.append("fileInput",$("#fileInput")[0].files[0]);
	        formData.append("type",this.filemate.type);
	        formData.append("name",this.filemate.name);
	        formData.append("version",this.filemate.version);
	        console.log('filemate:'+ formData );

	        $.ajax({
	            type: "POST",
	            url: this.urls.updFile,
	            processData: false,
	            contentType: false,
	            crossDomain: true,
	            xhrFields: { withCredentials: true },
	            data: formData,
	            beforeSend:function(){
	                this.filemate.res = "正在进行，请稍候";
	            }.bind(this),
	            success: function (data) {
	                this.filemate.res = data.msg;
	            }.bind(this),
	            error: function (data) {
	                this.filemate.res = '失败：' + data;
	            }.bind(this)
	        });
	    },*/
	},
	components: {

	},
}
</script>
