<template>
  <el-form
    ref="form"
    :model="form"
    :rules="addRules"
    label-width="0"
    @submit.prevent="onSubmit"
    style="margin:20px;width:60%;min-width:600px;"
  >
    <el-form-item label="" style="height:20px">
      <label>缺血事件：</label>
      <el-radio-group v-model="form.resource">
        <el-radio label="无"></el-radio>
        <el-radio label="有"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="" style="height:20px">
      <label>出血事件：</label>
      <el-radio-group v-model="form.resource">
        <el-radio label="无"></el-radio>
        <el-radio label="有"></el-radio>
      </el-radio-group>
      <input>
    </el-form-item>
    <el-form-item label="" style="height:20px">
      <label>缺血驱动的再次血运重建术：</label>
      <el-radio-group v-model="form.resource">
        <el-radio label="无"></el-radio>
        <el-radio label="有"></el-radio>
      </el-radio-group>
      <label>发生日期</label>
      <el-date-picker></el-date-picker>
    </el-form-item>
    <el-form-item label="" style="height:20px">
      <label>心功能NYHA分级：</label>
      <el-radio-group v-model="form.resource">
        <el-radio label="I级"></el-radio>
        <el-radio label="II级"></el-radio>
        <el-radio label="III级"></el-radio>
        <el-radio label="IV级"></el-radio>
        <el-radio label="V级"></el-radio>
        <el-radio label="VI级"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="" style="height:20px">
      <label>乏力：</label>
      <el-radio-group v-model="form.resource">
        <el-radio label="无"></el-radio>
        <el-radio label="有"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="" style="height:20px">
      <label>肌肉酸痛：</label>
      <el-radio-group v-model="form.resource">
        <el-radio label="无"></el-radio>
        <el-radio label="有"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="" style="height:20px">
      <label>正在吸烟：</label>
      <el-radio-group v-model="form.resource">
        <el-radio label="无"></el-radio>
        <el-radio label="有"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="" style="height:20px">
      <label>是否参加患者教育：</label>
      <el-radio-group v-model="form.resource">
        <el-radio label="无"></el-radio>
        <el-radio label="有"></el-radio>
      </el-radio-group>
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
        bmi: ""
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

    getDetail: function() {
      recordApi
        .getMedicalHistory(sessionStorage.getItem("currentMedicalHistory"))
        .then(res => {
          if (res.code != "0000") {
            this.$message({
              message: res.Msg,
              type: "warning"
            });
            return;
          }
          this.form = { ...this.form, ...res.data.medicalHistory };
          this.form.inTimeUI = util.formatDate.parse(
            res.data.inTimeStr,
            "yyyy-MM-dd"
          );
          this.form.outTimeUI = util.formatDate.parse(
            res.data.outTimeStr,
            "yyyy-MM-dd"
          );
          this.form.diagnoseUI = JSON.parse(
            res.data.medicalHistory.mainDiagnose
          );
          var risk = JSON.parse(res.data.medicalHistory.riskFactor);
          this.form.riskBriefFactorUI = risk.riskBriefFactorUI;
          this.form.riskOtherFactorUI = risk.riskOtherFactorUI;
          if (risk.riskOtherFactorUI != "") {
            this.isOtherFactor = ["其它"];
          }
          var drugs = JSON.parse(res.data.medicalHistory.preDrugs);
          this.form.preDrugsUI = drugs.preDrugsUI;
          this.form.preOtherDrugUI = drugs.preOtherDrugUI;
          if (drugs.preOtherDrugUI != "") {
            this.isOtherDrug = ["其它"];
          }
        });
    }
  },
  mounted() {
    this.getDetail();
  }
};
</script>