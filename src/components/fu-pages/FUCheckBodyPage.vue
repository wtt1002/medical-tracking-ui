<template>
  <el-form
    ref="checkBodyForm"
    :model="checkBodyForm"
    :rules="addRules"
    label-width="50px"
    @submit.prevent="onSubmit"
    style="margin:20px;width:60%;min-width:600px;"
  >
    <el-form-item label style="height:30px">
      <label style="margin-right:20px">血压：</label>
      <el-input style="width:50px" v-model="checkBodyForm.bloodPressureHigh"></el-input>/
      <el-input style="width:50px" v-model="checkBodyForm.bloodPressureLow"></el-input>mmHg
    </el-form-item>
    <el-form-item label style="height:30px">
      <label style="margin-right:20px">心率：</label>
      <el-input style="width:50px" v-model="checkBodyForm.heartRate"></el-input>bpm
    </el-form-item>
    <el-form-item label style="height:30px">
      <label style="margin-right:20px">体重：</label>
      <el-input style="width:50px" v-model="checkBodyForm.weight"></el-input>Kg
    </el-form-item>
    <el-form-item>
      <el-col style="width:60px;min-width:60px">
        <label>其它：</label>
      </el-col>
      <el-col style="width:500px">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入其它查体信息"
          v-model="checkBodyForm.otherInfo"
          autosize
        ></el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="addLoading" @click="saveOrUpdate">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import util from "../../common/js/util";
import { patientData } from "../../common/js/data";
import { patientApi, recordApi, followApi } from "../../api/api";
export default {
  data() {
    return {
      checkBodyForm: {
        followPhysicalExamId: "",
        followUpId: "",
        bloodPressureHigh: "",
        bloodPressureLow: "",
        heartRate: "",
        weight: "",
        otherInfo: ""
      },
      isOtherFactor: [],
      isOtherDrug: [],
      // mainDiagnose: [],
      factors: patientData.riskOptions,
      drugs: patientData.preDrugOptions,
      addLoading: false,
      addRules: {},
      options: patientData.diagnoseOptions
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    /**
     * 体检新增或修改
     */
    saveOrUpdate: function() {
      this.addLoading = true;
      //NProgress.start();
      var params = this.checkBodyForm;
      // console.log(JSON.stringify(params));
      if (params.followPhysicalExamId == "") {
        params.followUpId = sessionStorage.getItem("currentFollowUp");
        this.save(params);
      } else {
        this.update(params);
      }
    },
    /**
     * 体检新增
     */
    save: function(params) {
      followApi.addFollowPhysicalExam(params).then(res => {
        // console.log(JSON.stringify(res));
        this.addLoading = false;
        //NProgress.done();
        if (res.code != "0000") {
          this.$message({
            message: res.Msg,
            type: "warning"
          });
          return;
        }
        this.checkBodyForm.followPhysicalExamId = res.data.followPhysicalExamId;
        this.$message({
          message: "新增成功",
          type: "success"
        });
      });
    },
    /**
     * 体检更新
     */
    update: function(params) {
      followApi.updateFollowPhysicalExam(params).then(res => {
        // console.log(JSON.stringify(res));
        this.addLoading = false;
        if (res.code !== "0000") {
          this.$message({
            message: res.Msg,
            type: "warning"
          });
          return;
        }
        this.checkBodyForm = { ...this.checkBodyForm, ...res.data };
        this.$message({
          message: "更新成功",
          type: "success"
        });
      });
    },
    /**
     * 获取体检信息
     */
    getDetail: function() {
      followApi
        .getFollowPhysicalExam(sessionStorage.getItem("currentFollowUp"))
        .then(res => {
          // console.log(JSON.stringify(res));
          if (res.code !== "0000") {
            this.$message({
              message: res.Msg,
              type: "warning"
            });
            return;
          }
          this.checkBodyForm = { ...this.checkBodyForm, ...res.data };
        });
    }
  },
  mounted() {
    console.log("查体");
    this.getDetail();
  }
};
</script>