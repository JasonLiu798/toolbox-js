<template>
<!--ajax request CQRS -->
<div class="panel panel-primary"><div class="panel-heading">ajaxRequest</div>
  <div class="panel-body inputbox">
    <el-form :inline="true">
      <el-form-item><el-input v-model="reqUrl" size="70"><template slot="prepend">url</template></el-input></el-form-item>
      <el-form-item>
        <el-select v-model="ajaxReq.inftype" placeholder="请选择" @change="changeInf">
          <el-option v-for="item in inftypes" :key="item.value" :label="item.text" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="simajax">submit</el-button>
      <el-button type="primary" @click="ajaxreset">reset</el-button>
    </el-form>
    <el-row>
      <el-input type="textarea" :rows="4" :cols="60" placeholder="参数" v-model="ajaxReq.param"></el-input>
    </el-row>
    <div class="resultbox">
      <pre><code>{{ajaxReq.res}}</code></pre>
    </div>
  </div>
</div>
</template>
<script>
// import gc_ from '../common/js/constant.vue'
// import {} from '../common/js/constant'
import { Message } from 'element-ui';
const TYPE_URL = {
    "prj":{
        "url":'/project/get',
        "param":{"projectId":"0040999f-d3e3-11e7-9d4a-c81f66de7db1"}
    },
    "prjs":{
        "url":'/project/getlist',
        "param":{"prjStatus":"U"}
    },
    "items":{
        "url":'/projectitem/getlist',
        "param":{"projectId":"0040999f-d3e3-11e7-9d4a-c81f66de7db1" }
    }
};

export default {
  data(){
    return {
      reqUrl:TYPE_URL['prj'].url ,
      ajaxReq:{
        "inftype":'prj',
        // "url":TYPE_URL['prj'].url ,
        "param": JSON.stringify(TYPE_URL['prj'].param) ,
        "res":''
      },
      inftypes:[],//ajax 接口url+参数
    }
  },
  mounted:function(){
    for (let i in TYPE_URL){
      this.inftypes.push({text:i,value:i});
    }
    this.$nextTick(() => {
      this.ajaxReq.url = this.srv +TYPE_URL['prj'].url;//ajax
    })
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
      this.$nextTick(() => {
        this.reqUrl = val?val+TYPE_URL[this.ajaxReq.inftype].url:TYPE_URL[this.ajaxReq.inftype].url;
      })
    }
  },
  methods:{
    //ajax sim
    simajax: function () {
      console.log('req url '+this.reqUrl+',param '+this.ajaxReq.param );

      let that = this;
      this.httpExt().post(this.reqUrl ,this.ajaxReq.param)
        .then(function(response) {
          if(response.code!=0){
            Message({ message: response.msg,type: 'warning'});
          }else{
            let data = response.data
            console.log('res:'+ JSON.stringify(data));
            that.ajaxReq.res = JSON.stringify(data,null, 4);
          }
        },function(response) {
          Message({ message: response, type: 'warning' });
        });
    },
    ajaxreset: function () {
        this.aurl = dfturl;
        this.aparam = '';
    },
    changeInf: function(){
        console.log('change '+this.ajaxReq.inftype);
        this.ajaxReq.param = JSON.stringify( TYPE_URL[ this.ajaxReq.inftype ].param);
        this.reqUrl = this.srv + TYPE_URL[this.ajaxReq.inftype].url;
        // this.ajaxReq.url = HTTP+ this.main.srv + TYPE_URL[ this.ajaxReq.inftype ].url;
    },
  }
}
</script>
