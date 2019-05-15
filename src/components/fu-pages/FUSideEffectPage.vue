<template>
  <el-form
    ref="form"
    :model="form"
    :rules="addRules"
    label-width="50px"
    @submit.prevent="onSubmit"
    style="margin:20px;width:60%;min-width:600px;"
  >
    <el-form-item label style="height:20px">
      <label style="margin-right:20px">肠胃刺激：</label>
      <el-radio-group v-model="form.resource">
        <el-radio label="无"></el-radio>
        <el-radio label="有"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label style="height:20px">
      <label style="margin-right:20px">出血：</label>
      <el-radio-group v-model="form.resource">
        <el-radio label="无"></el-radio>
        <el-radio label="有，部位"></el-radio>
        <el-input size="small" style="width:100px;margin-left:10px"></el-input>
      </el-radio-group>
    </el-form-item>
    <el-form-item label style="height:20px">
      <label style="margin-right:20px">因出血再住院：</label>
      <el-radio-group v-model="form.resource">
        <el-radio label="无"></el-radio>
        <el-radio label="有"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label style="height:20px">
      <label style="margin-right:20px">呼吸困难：</label>
      <el-radio-group v-model="form.resource">
        <el-radio label="无"></el-radio>
        <el-radio label="有"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import util from "../../common/js/util";
import { patientData } from "../../common/js/data";
import { patientApi, recordApi } from "../../api/api";
export default {
  data() {
    return {
      form: {
        medicalHistoryId: "",
        patientId: "",
        admissionNum: "",
        inTimeUI: "",
        outTimeUI: "",
        operateDoc: "",
        diagnoseUI: [],
        riskBriefFactorUI: [],
        riskOtherFactorUI: "",
        preDrugsUI: [],
        preOtherDrugUI: "",
        bloodPressureH: "",
        bloodPressureL: "",
        heartRate: "",
        height: "",
        weight: "",
        bmi: "",
        textarea: ""
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
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let risk = {};
            let drug = {};
            risk.riskBriefFactorUI = this.form.riskBriefFactorUI;
            risk.riskOtherFactorUI = this.form.riskOtherFactorUI;
            drug.preDrugsUI = this.form.preDrugsUI;
            drug.preOtherDrugUI = this.form.preOtherDrugUI;
            let mh = Object.assign({}, this.form);
            //json转为字符串
            mh.riskFactor = JSON.stringify(risk);
            mh.mainDiagnose = JSON.stringify(this.form.diagnoseUI);
            mh.preDrugs = JSON.stringify(drug);
            mh.patientId = sessionStorage.getItem("currentPatient");
            let params = {
              medicalHistory: mh,
              inTimeStr: util.formatDate.format(
                new Date(this.form.inTimeUI),
                "yyyy-MM-dd"
              ),
              outTimeStr: util.formatDate.format(
                new Date(this.form.outTimeUI),
                "yyyy-MM-dd"
              )
            };
            console.log(JSON.stringify(params));

            if (this.form.medicalHistoryId == "") {
              this.save(params);
            } else {
              // this.update();
            }
          });
        }
      });
    },
    save: function(params) {
      recordApi.addMedicalHistory(params).then(res => {
        console.log(JSON.stringify(res));
        this.addLoading = false;
        //NProgress.done();
        if (res.code != "0000") {
          this.$message({
            message: res.Msg,
            type: "warning"
          });
          return;
        }
        this.form.medicalHistoryId = res.data;
        this.$message({
          message: "提交成功",
          type: "success"
        });
      });
    },

    getDetail: function() {}
  },
  mounted() {
    this.getDetail();
  }
};
</script>