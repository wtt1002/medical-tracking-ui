<template>
  <el-form
    ref="sideEffectForm"
    :model="sideEffectForm"
    :rules="addRules"
    label-width="50px"
    @submit.prevent="onSubmit"
    style="margin:20px;width:60%;min-width:600px;"
  >
    <el-form-item label style="height:20px">
      <label style="margin-right:20px">肠胃刺激：</label>
      <el-radio-group v-model="sideEffectForm.stomachStimulation">
        <el-radio label="无"></el-radio>
        <el-radio label="有"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label style="height:20px">
      <label style="margin-right:20px">出血：</label>
      <el-radio-group v-model="sideEffectForm.hemorrhageUnit.isHemorrhage">
        <el-radio label="无"></el-radio>
        <el-radio label="有，部位"></el-radio>
      </el-radio-group>
      <el-input
        size="small"
        style="width:100px;margin-left:10px"
        v-model="sideEffectForm.hemorrhageUnit.info"
      ></el-input>
    </el-form-item>
    <el-form-item label style="height:20px">
      <label style="margin-right:20px">因出血再住院：</label>
      <el-radio-group v-model="sideEffectForm.goHospital">
        <el-radio label="无"></el-radio>
        <el-radio label="有"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label style="height:20px">
      <label style="margin-right:20px">呼吸困难：</label>
      <el-radio-group v-model="sideEffectForm.dyspnea">
        <el-radio label="无"></el-radio>
        <el-radio label="有"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveOrUpdate" :loading="addLoading">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import util from "../../common/js/util";
import { patientData } from "../../common/js/data";
import { followApi } from "../../api/api";
export default {
  data() {
    return {
      sideEffectForm: {
        sideEffectsId: "",
        followUpId: "",
        stomachStimulation: "",
        hemorrhageUnit: {
          isHemorrhage: "",
          info: ""
        },
        hemorrhage: "",
        goHospital: "",
        dyspnea: ""
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
    handleChange(value) {
      // console.log(value);
      // alert(value);
    },
    changeOtherFactor(value) {
      // alert(value)
      // this.form.riskOtherFactor = value;
      // alert(this.form.riskOtherFactorUI);
    },
    saveOrUpdate: function() {
      this.addLoading = true;
      //NProgress.start();
      var params = this.sideEffectForm;
      params.hemorrhage = JSON.stringify(params.hemorrhageUnit);
      console.log(JSON.stringify(params));

      if (params.sideEffectsId == "") {
        params.followUpId = sessionStorage.getItem("currentFollowUp");
        this.save(params);
      } else {
        this.update(params);
      }
    },
    save: function(params) {
      followApi.addFollowSideEffects(params).then(res => {
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
        this.sideEffectForm.sideEffectsId = res.data.sideEffectsId;
        this.$message({
          message: "新增成功",
          type: "success"
        });
      });
    },
    update: function(params) {
      followApi.updateFollowSideEffects(params).then(res => {
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
        this.$message({
          message: "更新成功",
          type: "success"
        });
      });
    },
    getDetail: function() {
      followApi
        .getFollowSideEffects(sessionStorage.getItem("currentFollowUp"))
        .then(res => {
          // console.log(JSON.stringify(res));
          if (res.code !== "0000") {
            this.$message({
              message: res.Msg,
              type: "Warning"
            });
            return;
          }
          if (res.data == null) return;
          this.sideEffectForm = { ...this.sideEffectForm, ...res.data };
          this.sideEffectForm.hemorrhageUnit = JSON.parse(
            this.sideEffectForm.hemorrhage
          );
        });
    }
  },
  mounted() {
    this.getDetail();
  }
};
</script>