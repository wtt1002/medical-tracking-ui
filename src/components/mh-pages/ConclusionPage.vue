<template>
  <div style="margin-left:80px">
    <div class="block" style="margin-top:10px; margin-bottom:30px">
      <div style="color:#409EFF; font-weight:bold; font-size:16px">PCI术后检查</div>
      <!-- <span class="demonstration">检查日期</span> -->
      <el-date-picker
        v-model="timeUI1"
        type="date"
        placeholder="选择日期"
        size="small"
        style="margin-bottom:10px;margin-top:10px"
      ></el-date-picker>
      <el-table :data="pciExam" border style="width: fit-content;">
        <el-table-column prop="examItemName" label="中文" width="180"></el-table-column>
        <el-table-column prop="itemShortName" label="英文" width="180"></el-table-column>
        <el-table-column prop="examValue" label="值" width="180">
          <template scope="scope">
            <el-input
              size="small"
              v-model="scope.row.examValue"
              placeholder
              style="text-align: left;width:60px"
            ></el-input>
            <label>{{scope.row.examItemUnit}}</label>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" style="margin-top:20px;" @click.native.prevent="saveOrUpdatePci">保存</el-button>
    </div>
    <div>
      <div style="color:#409EFF; font-weight:bold; font-size:16px">血管入路并发症</div>
      <el-form>
        <el-form-item label="并发症：">
          <el-checkbox-group v-model="vasProblem.bloodDiseaseItem">
            <el-checkbox v-for="factor in factors" :label="factor" :key="factor">{{factor}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <el-button type="primary" style="margin-top:-10px" @click="saveOrUpdateVas">保存</el-button>
    </div>
    <div class="block" style="margin-top:30px; margin-bottom:30px">
      <div style="color:#409EFF; font-weight:bold; font-size:16px">评分</div>
      <!-- <span class="demonstration">检查日期</span> -->
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <label>GRACE评分：</label>
            <el-input style="text-align: left;width:70px" v-model="score.graceScore"></el-input>
            <label>分</label>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <label>DAPT 评分：</label>
            <el-input
              style="text-align: left;width:70px"
              v-model="score.daptScore"
              :readonly="true"
            ></el-input>
            <label>分</label>
          </div>
        </el-col>
        <el-button
          class="el-icon-edit"
          type="info"
          size="small"
          style="margin-left:-80px; margin-top:5px"
          circle
          @click="changeEdit"
        ></el-button>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <label>Crucede 评分：</label>
            <el-input style="text-align: left;width:70px" v-model="score.crucedeScore"></el-input>
            <label>分</label>
          </div>
        </el-col>
      </el-row>
      <div style="margin:10px 0" v-if="datpEdit">
        <el-table
          ref="multipleTable"
          :data="daptExam"
          tooltip-effect="dark"
          style="width:fit-content"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" v-if="true"></el-table-column>
          <el-table-column prop="reason" label="项目" width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.value == '0'">
                <label>患者年龄</label>
                <el-input
                  size="small"
                  v-model="scope.row.reason"
                  placeholder
                  @blur="handleEdit(scope.$index, scope.row)"
                  style="text-align: left;width:60px"
                ></el-input>
                <label>岁</label>
              </div>
              <div v-if="scope.row.value !== '0'">
                <label>{{scope.row.reason}}</label>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="score" label="得分" width="100"></el-table-column>
          <el-table-column prop="desc" label="说明" show-overflow-tooltip width="350px"></el-table-column>
        </el-table>
      </div>
      <el-button type="primary" style="margin-top:5px" @click="saveOrUpdateScore">保存</el-button>
    </div>
  </div>
</template>
      

<script>
import util from "../../common/js/util";
import { patientData } from "../../common/js/data";
import { patientApi, recordApi } from "../../api/api";
var lodash = require("lodash");
export default {
  data() {
    return {
      pciExam: lodash.cloneDeep(patientData.pciItem),
      liverKidneyExam: lodash.cloneDeep(patientData.liverKidneyItem),
      bloodLipidExam: lodash.cloneDeep(patientData.bloodLipidItem),
      coagulationExam: lodash.cloneDeep(patientData.coagulationItem),
      factors: lodash.cloneDeep(patientData.bloodOptions),
      daptExam: lodash.cloneDeep(patientData.daptItem),
      vasProblem: {
        medicalHistoryId: "",
        vascularAccessProblemId: "",
        bloodDiseaseItem: [],
        complication: "",
        otherComplication: ""
      },
      score: {
        scoreId: "",
        medicalHistoryId: "",
        graceScore: 0,
        daptScore: 0,
        crucedeScore: 0,
        daptDetail: ""
      },
      multipleSelection: [],
      timeUI1: new Date(),
      datpEdit: false
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.calcDapt();
    },
    onSubmit() {
      console.log("submit!");
    },
    handleChange(value) {},
    handleEdit(index, row) {
      row.score = 0;
      if (parseInt(row.reason)) {
        var age = parseInt(row.reason);
        if (age >= 75) {
          row.score = -2;
        }
        if (age >= 65) {
          row.score = -1;
        }
      }
      this.calcDapt();
    },
    changeEdit() {
      this.datpEdit = !this.datpEdit;
    },
    calcDapt() {
      var dapt = 0;
      this.multipleSelection.forEach(function(ele) {
        dapt += ele.score;
      });
      this.score.daptScore = dapt;
    },
    /**
     * pci术后检查
     */
    saveOrUpdatePci: function() {
      this.addLoading = true;
      //NProgress.start();
      var params = this.pciExam;
      for (let index = 0; index < params.length; index++) {
        var dateStr = util.formatDate.format(this.timeUI1, "yyyy-MM-dd");
        params[index].myExamTime = dateStr
          ? dateStr
          : util.formatDate.format(new Date(), "yyyy-MM-dd");
        params[index].medicalHistoryId = sessionStorage.getItem(
          "currentMedicalHistory"
        );
      }
      // 新增
      if (params[0].examValueId == "") {
        recordApi.addExam(params).then(res => {
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
          this.form.medicalHistoryId = res.data;
          this.$message({
            message: "新增成功",
            type: "success"
          });
        });
      } else {
        //更新
        recordApi.updateExam(params).then(res => {
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
      }
    },
    /**
     * 血管入路并发症
     */
    saveOrUpdateVas: function() {
      this.vasProblem.medicalHistoryId = sessionStorage.getItem(
        "currentMedicalHistory"
      );
      this.vasProblem.complication = JSON.stringify(
        this.vasProblem.bloodDiseaseItem
      );
      //保存
      if (this.vasProblem.vascularAccessProblemId == "") {
        recordApi.addVasProblem(this.vasProblem).then(res => {
          // console.log(JSON.stringify(res));
          if (res.code != "0000") {
            this.$message({
              message: res.Msg,
              type: "warning"
            });
            return;
          }
          this.vasProblem.vascularAccessProblemId =
            res.data.vascularAccessProblemId;
          this.$message({
            message: "新增成功",
            type: "success"
          });
        });
      } else {
        //更新
        recordApi.updateVasProblem(this.vasProblem).then(res => {
          // console.log(JSON.stringify(res));
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
      }
    },
    /**
     * 评分
     */
    saveOrUpdateScore: function() {
      this.score.daptDetail = JSON.stringify(this.multipleSelection);
      this.score.medicalHistoryId = sessionStorage.getItem(
        "currentMedicalHistory"
      );
      if (this.score.scoreId == "") {
        recordApi.addScore(this.score).then(res => {
          // console.log(JSON.stringify(res));
          if (res.code != "0000") {
            this.$message({
              message: res.Msg,
              type: "warning"
            });
            return;
          }
          this.score.scoreId = res.data.scoreId;
          this.$message({
            message: "新增成功",
            type: "success"
          });
        });
      } else {
        // console.log("更新");
        recordApi.updateScore(this.score).then(res => {
          // console.log(JSON.stringify(res));
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
      }
    },

    getDetail: function() {
      recordApi
        .getDischargeSummary(sessionStorage.getItem("currentMedicalHistory"))
        .then(res => {
          // console.log(JSON.stringify(res));
          if (res.code != "0000") {
            this.$message({
              message: res.Msg,
              type: "warning"
            });
            return;
          }
          //渲染pci术后检查
          this.pciExam = res.data.dischargeExamItemDtos;
          this.timeUI1 = util.formatDate.parse(res.data.examTime, "yyyy-MM-dd");
          //渲染血管入路并发症
          if (res.data.vascularAccessProblem !== null) {
            this.vasProblem = {
              ...this.vasProblem,
              ...res.data.vascularAccessProblem
            };
            this.vasProblem.bloodDiseaseItem = JSON.parse(
              this.vasProblem.complication
            );
          }
          //渲染得分
          this.score = { ...this.score, ...res.data.score };
          this.multipleSelection = JSON.parse(this.score.daptDetail);
          console.log(JSON.stringify(this.multipleSelection));
        });
    }
  },
  mounted() {
    this.getDetail();
    console.log("conclusion");
  }
};
</script>
<style>
.el-row {
  margin-bottom: 5px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-light {
  background: #e5e9f2;
}
</style>
