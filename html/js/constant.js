

window.dfttranstp = 's';
window.nowDate = new Date();
window.nowts = parseInt(nowDate.getTime()/1000);
window.nowYear = nowDate.getFullYear();
window.nowMonth = nowDate.getMonth()+1;
window.nowDay = nowDate.getDate();
window.nowHour = nowDate.getHours();
window.nowMin = nowDate.getMinutes();
window.nowSec = nowDate.getSeconds();

let SQLS = [
  {'text':'count','value':'count'},
  {'text':'desc','value':'desc'},

];
// window.prjurl = srv+'/aa/getlist';

let HTTP= 'http://';
let srvs = SRVS;
let dfturl = HTTP+'aa/get';

let srv = HTTP+ srvs[0].value;

let typeUrl = {
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

let urlParts = {
  updFile:'/contentmgr/updfile',
  pub:'/contentmgr/pub',
  rbHtml:'/contentmgr/rollback',
  searchdb:'/text/textp'
};

let url_eims_upload = "http://eims-mis.intsit.sfdc.com.cn:1080/pub/tpi_pdf_save";

let timeObjInit =
{
  unix2bj:{"unixts":nowts,"bjtime":''},
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

let pubTypeDft = [
          {text:'JS',value:'J'},
          {text:'CSS',value:'C'},
          {text:'HTML',value:'H'}
      ];

