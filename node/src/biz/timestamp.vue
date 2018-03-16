<template>
<!--时间戳 -->
<div class="panel panel-primary"><div class="panel-heading">timestamp</div>
  <div class="panel-body inputbox">
    <el-form :inline="true">
      <el-form-item><el-input v-model="timeObj.unix2bj.unixts"><template slot="prepend">unix时间戳</template></el-input></el-form-item>
      <el-button type="primary" @click="tranbj">转成北京时间</el-button>
      <el-form-item><el-input v-model="timeObj.unix2bj.bjtime"><template slot="prepend">北京时间</template></el-input></el-form-item>
    </el-form>
    <el-form :inline="true">
      <el-form-item><el-input v-model="timeObj.bj2unix.bjyear"><template slot="prepend">北京时间</template><template slot="append">年</template></el-input></el-form-item>
      <el-form-item><el-input v-model="timeObj.bj2unix.bjmonth"><template slot="append">月</template></el-input></el-form-item>
      <el-form-item><el-input v-model="timeObj.bj2unix.bjday"><template slot="append">日</template></el-input></el-form-item>
    </el-form>
    <el-form :inline="true">
      <el-form-item><el-input v-model="timeObj.bj2unix.bjhour"><template slot="append">时</template></el-input></el-form-item>
      <el-form-item><el-input v-model="timeObj.bj2unix.bjmin"><template slot="append">分</template></el-input></el-form-item>
      <el-form-item><el-input v-model="timeObj.bj2unix.bjsec"><template slot="append">秒</template></el-input></el-form-item>
      <el-button type="primary" @click="trants">转成ts</el-button>
      <el-form-item>
        <el-select v-model="timeObj.bj2unix.tranststp" placeholder="请选择">
          <el-option v-for="item in timeObj.bj2unix.transopts" :key="item.value" :label="item.text" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="timeObj.bj2unix.resunixts">
          <template slot="append">秒</template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</div><!--时间戳 end -->
</template>
<script>
import {NOWDATE,NOWTS} from '../common/js/constant';
let dfttranstp = 's';
// let nowDate = new Date();
// let nowts = parseInt(nowDate.getTime()/1000);
let nowYear = NOWDATE.getFullYear();
let nowMonth = NOWDATE.getMonth()+1;
let nowDay = NOWDATE.getDate();
let nowHour = NOWDATE.getHours();
let nowMin = NOWDATE.getMinutes();
let nowSec = NOWDATE.getSeconds();
let timeObjInit =
{
  unix2bj:{"unixts":NOWTS,"bjtime":''},
  bj2unix:{
      bjyear: nowYear,
      bjmonth: nowMonth,
      bjday: nowDay,
      bjhour: nowHour,
      bjmin: nowMin,
      bjsec: nowSec,
      tranststp: dfttranstp,
      resunixts: 0,
      transopts:[
          {text:'年',value:'y'}, {text:'月',value:'m'}, {text:'日',value:'d'}, {text:'时',value:'h'}, {text:'分',value:'min'}, {text:'秒',value:'s'}
      ],
  }
};

export default {
  props: ['srv'],
  data(){
    return {
      timeObj: timeObjInit,
    }
  },
  created:function () {
    this.timeObj.unix2bj.bjtime = this.ts2date(this.timeObj.unix2bj.unixts);
    this.timeObj.bj2unix.resunixts =  this.datestr2ts(this.timeObj.bj2unix.bjyear,this.timeObj.bj2unix.bjmonth,this.timeObj.bj2unix.bjday,this.timeObj.bj2unix.bjhour,this.timeObj.bj2unix.bjmin,this.timeObj.bj2unix.bjsec);
  },
  methods: {
    tranbj:function () {//ts 2 bj
        this.timeObj.unix2bj.bjtime = this.ts2date(this.timeObj.unix2bj.unixts);
    },
    trants:function () {//bj 2 unix ts
      let y = this.timeObj.bj2unix.bjyear;
      let m = this.timeObj.bj2unix.bjmonth;
      let d = this.timeObj.bj2unix.bjday;
      let h = this.timeObj.bj2unix.bjhour;
      let min = this.timeObj.bj2unix.bjmin;
      let s = this.timeObj.bj2unix.bjsec;
      switch (this.timeObj.bj2unix.tranststp){
          case 'y': m = 1;
          case 'm': d = 1;
          case 'd': h = 0;
          case 'h': min = 0;
          case 'min': s = 0;
      }
      let res = this.datestr2ts(y,m,d,h,min,s);
      this.timeObj.bj2unix.resunixts = res;
    },
  },
}


</script>


