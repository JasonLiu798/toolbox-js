<template>
<div id="app">
  <el-row>
    <el-col :span="22" :offset="1">
      <!--<h1>工具箱</h1> -->
      <!-- 环境选择 -->
      <srv-select></srv-select>
      <el-row :span="22" :offset="1">
        <el-tabs v-model="activeName">
          <!-- business associate ,业务相关 -->
          <el-tab-pane label="biz" name="biz">
            <biz></biz>
          </el-tab-pane>
          <!-- 编解码 -->
          <el-tab-pane label="codec" name="codec">
            <codec></codec>
          </el-tab-pane>
          <el-tab-pane label="fmt" name="fmt">
            <fmt></fmt>
          </el-tab-pane>
          <el-tab-pane label="dbsearch" name="dbsearch">
            <dbsearch></dbsearch>
          </el-tab-pane>
          <el-tab-pane label="texteditor" name="texteditor">
            <text-asso></text-asso>
          </el-tab-pane>

          <el-tab-pane label="pub" name="third">
            <front-deploy></front-deploy>
          </el-tab-pane>
          <!-- 文件相关,文件hash -->
          <el-tab-pane label="file" name="file">
            <file></file>
          </el-tab-pane>
          <!-- 常用资料参考表 -->
          <el-tab-pane label="refs" name="refs">
            <refs></refs>
          </el-tab-pane>

          <!--for test
          <el-tab-pane label="test" name="test">
            <test></test>
          </el-tab-pane>-->
        </el-tabs>
      </el-row>
    </el-col>
  </el-row>
</div>
</template>
<script>
import srvSelect from './srv/srvselect.vue'

import biz from './biz/biz.vue'
import codec from './codec/codec.vue';
import fmt from './fmt/fmt.vue';
import dbsearch from './db/dbsearch.vue';
import textAsso from './text/text.vue';
import frontDeploy from './srvtest/frontdeploy.vue';
import file from './file/file.vue';
import refs from './refs/refs.vue';//refs

import test from './test/test.vue';

export default {
  data() {
    return {
      activeName: 'biz',//默认打开标签 biz
    }
  },
  mounted:function(){
  },
  methods: {
  },
  components: {
    srvSelect,

    biz,
    codec,
    fmt,
    dbsearch,
    textAsso,
    frontDeploy,
    file,
    refs,
    test,
  },
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
