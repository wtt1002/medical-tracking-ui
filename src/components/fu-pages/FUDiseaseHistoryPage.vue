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
      <el-radio-group v-model="diseaseHistory.hemorrhageUnit.isHemorrhage">
        <el-radio label="无" value="无"></el-radio>
        <el-radio label="有" value="有"></el-radio>
      </el-radio-group>
      <el-input
        size="small"
        style="width:100px;margin-left:10px"
        v-model="diseaseHistory.hemorrhageUnit.info"
      ></el-input>
    </el-form-item>
    <el-form-item label style="height:20px">
      <label>3. 缺血驱动的再次血运重建术：</label>
      <el-radio-group v-model="diseaseHistory.revascularizationUnit.isRevascularization">
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
      revaDateUI: new Date(),
      diseaseHistory: {
        followSickHistoryId: "",
        followUpId: "",
        ischemia: "",
        hemorrhageUnit: {
          isHemorrhage: "",
          info: ""
        },
        revascularizationUnit: {
          isRevascularization: "",
          revaDate: ""
        },
        nyhaRank: "",
        isWeak: "",
        isSoreness: "",
        isSmoke: "",
        isPatientEdu: "",
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
    saveOrUpdate: function() {
      this.addLoading = true;
      //NProgress.start();
      var params = this.diseaseHistory;
      params.hemorrhage = JSON.stringify(params.hemorrhageUnit);
      params.revascularizationUnit.revaDate = util.formatDate.format(
        this.revaDateUI,
        "yyyy-MM-dd"
      );
      params.revascularization = JSON.stringify(params.revascularizationUnit);
      if (this.diseaseHistory.followSickHistoryId == "") {
        this.params.followUpId = sessionStorage.getItem("currentFollowUp");
        this.save(params);
      } else {
        console.log("更新");
        this.update(params);
      }
    },
    save: function(params) {
      followApi.addFollowSickHistory(params).then(res => {
        this.addLoading = false;
        //NProgress.done();
        if (res.code != "0000") {
          this.$message({
            message: res.Msg,
            type: "warning"
          });
          return;
        }
        this.diseaseHistory.followSickHistoryId = res.data.followSickHistoryId;
        this.$message({
          message: "保存成功",
          type: "success"
        });
      });
    },
    update: function(params) {
      followApi.updateFollowSickHistory(params).then(res => {
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
    getDetail: function(followUpId) {
      followApi.getFollowSickHistory(followUpId).then(res => {
        // console.log(JSON.stringify(res));
        if (res.code !== "0000") {
          this.$message({
            message: res.Msg,
            type: "warning"
          });
          return;
        }
        if(res.data == null){
          return;
        }
        this.diseaseHistory = { ...this.diseaseHistory, ...res.data };
        if (res.data.hemorrhage !== null) {
          this.diseaseHistory.hemorrhageUnit = {
            ...this.diseaseHistory.hemorrhageUnit,
            ...JSON.parse(res.data.hemorrhage)
          };
        }

        if (res.data.revascularization !== null) {
          this.diseaseHistory.revascularizationUnit = {
            ...this.diseaseHistory.revascularizationUnit,
            ...JSON.parse(res.data.revascularization)
          };
        }

        if (
          util.formatDate.parse(
            this.diseaseHistory.revascularizationUnit.revaDate,
            "yyyy-MM-dd"
          )
        )
          console.log(JSON.stringify(this.diseaseHistory));
      });
    }
  },
  mounted() {
    console.log(sessionStorage.getItem("currentFollowUp"))
    this.getDetail(sessionStorage.getItem("currentFollowUp"));
  }
};
</script>