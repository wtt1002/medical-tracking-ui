<template>
  <el-form
    ref="riskFactorForm"
    :model="riskFactorForm"
    :rules="addRules"
    label-width="50px"
    @submit.prevent="onSubmit"
    style="margin:20px;width:60%;min-width:600px;"
  >
    <el-form-item label style="height:20px">
      <label style="margin-right:20px">吸烟：</label>
      <el-radio-group v-model="riskFactorForm.isSmoke">
        <el-radio label="0">无</el-radio>
        <el-radio label="1">有</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label style="height:20px">
      <label style="margin-right:20px">超重：</label>
      <el-radio-group v-model="riskFactorForm.isHeavy">
        <el-radio label="0">无</el-radio>
        <el-radio label="1">有</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label style="height:20px">
      <label style="margin-right:20px">少动：</label>
      <el-radio-group v-model="riskFactorForm.isLessMove">
        <el-radio label="0">无</el-radio>
        <el-radio label="1">有</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label style="height:20px">
      <label style="margin-right:20px">血压控制：</label>
      <el-radio-group v-model="riskFactorForm.bloodPressureControl">
        <el-radio label="0">无</el-radio>
        <el-radio label="1">有</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label style="height:20px">
      <label style="margin-right:20px">血糖控制：</label>
      <el-radio-group v-model="riskFactorForm.glycemicControl">
        <el-radio label="0">无</el-radio>
        <el-radio label="1">有</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label style="height:20px">
      <label style="margin-right:20px">血脂控制：</label>
      <el-radio-group v-model="riskFactorForm.bloodLipidControl">
        <el-radio label="0">无</el-radio>
        <el-radio label="1">有</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveOrUpdate">保存</el-button>
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
      riskFactorForm: {
        riskFactorsId: "",
        followUpId: "",
        isSmoke: "",
        isHeavy: "",
        isLessMove: "",
        bloodPressureControl: "",
        glycemicControl: "",
        bloodLipidControl: ""
      },
      isOtherFactor: [],
      isOtherDrug: [],
      // mainDiagnose: [],
      factors: patientData.riskOptions,
      drugs: patientData.preDrugOptions,
      addLoading: false,
      addRules: {
        admissionNum: [
          { required: true, message: "请输入住院号", trigger: "blur" }
        ],
        intime: [
          { required: true, message: "请选择入院时间", trigger: "blur" }
        ],
        outtime: [
          { required: true, message: "请选择出院时间", trigger: "blur" }
        ],
        height: [{ required: true, message: "请输入身高", trigger: "blur" }],
        weight: [{ required: true, message: "请输入体重", trigger: "blur" }]
      },
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
      var params = this.riskFactorForm;
      // console.log(JSON.stringify(params));

      if (params.riskFactorsId == "") {
        params.followUpId = sessionStorage.getItem("currentFollowUp");
        this.save(params);
      } else {
        this.update(params);
      }
    },
    save: function(params) {
      followApi.addRiskFactors(params).then(res => {
        // console.log(JSON.stringify(res));
        this.addLoading = false;
        //NProgress.done();
        if (res.code != "0000") {
          this.$message({
            message: "新增失败",
            type: "warning"
          });
          return;
        }
        this.riskFactorForm.riskFactorsId = res.data.riskFactorsId;
        this.$message({
          message: "新增成功",
          type: "success"
        });
      });
    },
    update: function(params) {
      followApi.updateRiskFactors(params).then(res => {
        // console.log(JSON.stringify(res));
        this.addLoading = false;
        //NProgress.done();
        if (res.code != "0000") {
          this.$message({
            message: "更新失败",
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
        .getRiskFactors(sessionStorage.getItem("currentFollowUp"))
        .then(res => {
          // console.log(JSON.stringify(res));
          if (res.code != "0000") {
            this.$message({
              message: "信息获取失败",
              type: "warning"
            });
            return;
          }
          this.riskFactorForm = { ...this.riskFactorForm, ...res.data };
        });
    }
  },
  mounted() {
    this.getDetail();
  }
};
</script>