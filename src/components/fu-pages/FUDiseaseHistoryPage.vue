<template>
  <el-form
    :model="diseaseHistory"
    :rules="addRules"
    label-width="50px"
    @submit.prevent="onSubmit"
    style="margin:20px;width:60%;min-width:600px;"
  >
    <el-form-item label style="height:20px">
      <label>1. 缺血事件：</label>
      <el-radio-group v-model="diseaseHistory.ischemia">
        <el-radio label="无" value="无"></el-radio>
        <el-radio label="是" value="有"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label style="height:20px">
      <label>2. 出血事件：</label>
      <el-radio-group v-model="diseaseHistory.hemorrhage.isHemorrhage">
        <el-radio label="无" value="无"></el-radio>
        <el-radio label="有" value="有"></el-radio>
      </el-radio-group>
      <el-input size="small" style="width:100px;margin-left:10px" v-model="diseaseHistory.hemorrhage.info"></el-input>
    </el-form-item>
    <el-form-item label style="height:20px">
      <label>3. 缺血驱动的再次血运重建术：</label>
      <el-radio-group v-model="diseaseHistory.revascularization.isRevascularization">
        <el-radio label="无" value="无"></el-radio>
        <el-radio label="有" value="有"></el-radio>
      </el-radio-group>
      <label>发生日期</label>
      <el-date-picker v-model="revaDateUI"></el-date-picker>
    </el-form-item>
    <el-form-item label style="height:20px">
      <label>4. 心功能NYHA分级：</label>
      <el-radio-group v-model="diseaseHistory.nyhaRank">
        <el-radio label="I级" value="I级"></el-radio>
        <el-radio label="II级" value="II级"></el-radio>
        <el-radio label="III级" value="III级"></el-radio>
        <el-radio label="IV级" value="IV级"></el-radio>
        <el-radio label="V级" value="V级"></el-radio>
        <el-radio label="VI级" value="VI级"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label style="height:20px">
      <label>5. 乏力：</label>
      <el-radio-group v-model="diseaseHistory.isWeak">
        <el-radio label="无" value="无"></el-radio>
        <el-radio label="有" value="有"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label style="height:20px">
      <label>6. 肌肉酸痛：</label>
      <el-radio-group v-model="diseaseHistory.isSoreness">
        <el-radio label="无" value="无"></el-radio>
        <el-radio label="有" value="有"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label style="height:20px">
      <label>7. 正在吸烟：</label>
      <el-radio-group v-model="diseaseHistory.isSmoke">
        <el-radio label="无" value="无"></el-radio>
        <el-radio label="有" value="有"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label style="height:20px">
      <label>8. 是否参加患者教育：</label>
      <el-radio-group v-model="diseaseHistory.isPatientEdu">
        <el-radio label="无" value="无"></el-radio>
        <el-radio label="有" value="有"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-col style="width:60px;min-width:60px">
        <label>9. 其它：</label>
      </el-col>
      <el-col style="width:500px">
        <el-input
          type="textarea"
          :rows="1"
          placeholder="请输入内容"
          v-model="diseaseHistory.otherInfo"
          autosize
        ></el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
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
      revaDateUI:new Date(),
      diseaseHistory: {
        followSickHistoryId: "",
        followUpId: "",
        ischemia: "无",
        hemorrhage: {
          isHemorrhage:"有",
          info:"123"
        },
        revascularization: {
          isRevascularization:"有",
          revaDate:""
        },
        nyhaRank: "",
        isWeak: "",
        isSoreness: "",
        isSmoke: "",
        isPatientEdu: "",
        otherInfo: "王婷婷"
      },
      isOtherFactor: [],
      isOtherDrug: [],
      // mainDiagnose: [],
      factors: patientData.riskOptions,
      drugs: patientData.preDrugOptions,
      addLoading: false,
      addRules: {
      },
      options: patientData.diagnoseOptions
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
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
      followApi.getFollowSickHistory(1).then(res => {
        // console.log(JSON.stringify(res));
        if(res.code !== "0000"){
          this.$message({
            message:res.Msg,
            type:"warning"
          });
          return;
        }
        this.diseaseHistory = {...this.diseaseHistory, ...res.data}
        console.log(JSON.stringify(this.diseaseHistory))
      });
    }
  },
  mounted() {
    this.getDetail();
  }
};
</script>