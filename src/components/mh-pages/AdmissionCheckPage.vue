<template>
  <div style="margin-left:80px">
    <div style="margin-top:10px; margin-bottom:30px">
      <div style="color:#409EFF; font-weight:bold; font-size:16px; margin-bottom:10px">人体成分分析仪</div>
      <el-form
        :inline="true"
        :model="bodyComposition"
        class="demo-form-inline"
        style="min-width:200px; max-width:800px"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="身高">
          <template scope="scope">
            <el-input
              size="small"
              v-model="bodyComposition.height"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:120px"
            ></el-input>
            <label>cm</label>
          </template>
        </el-form-item>
        <el-form-item label="体重">
          <template scope="scope">
            <el-input
              size="small"
              v-model="bodyComposition.weight"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:120px"
            ></el-input>
            <label>Kg</label>
          </template>
        </el-form-item>

        <el-form-item label="肌肉重量">
          <template scope="scope">
            <el-input
              size="small"
              v-model="bodyComposition.muscleWeight"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:120px"
            ></el-input>
            <label>Kg</label>
          </template>
        </el-form-item>
        <el-form-item label="脂肪重量">
          <template scope="scope">
            <el-input
              size="small"
              v-model="bodyComposition.fatWeight"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:120px"
            ></el-input>
            <label>Kg</label>
          </template>
        </el-form-item>

        <el-form-item label="体脂比">
          <template scope="scope">
            <el-input
              size="small"
              v-model="bodyComposition.bodyFatPercentage"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:120px"
            ></el-input>
            <label>%</label>
          </template>
        </el-form-item>
        <el-form-item label="BMI">
          <template scope="scope">
            <el-input
              size="small"
              v-model="bodyComposition.bmi"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:120px"
            ></el-input>
            <label>Kg/m²</label>
          </template>
        </el-form-item>
      </el-form>
      <el-button style="background-color:#EEE" @click="saveBody">保存</el-button>
    </div>

    <div style="margin-top:10px; margin-bottom:30px">
      <div style="color:#409EFF; font-weight:bold; font-size:16px">无创心功能</div>
      <!-- <span class="demonstration">检查日期</span> -->
      <el-date-picker
        v-model="timeUI1"
        type="date"
        placeholder="选择日期"
        size="small"
        style="margin-bottom:10px;margin-top:10px"
      ></el-date-picker>
      <el-table :data="noninvasiveExam" border style="width: fit-content;">
        <el-table-column prop="examItemName" label="中文" width="200"></el-table-column>
        <el-table-column prop="itemShortName" label="英文" width="150"></el-table-column>
        <el-table-column prop="examValue" label="值" width="200">
          <template scope="scope">
            <el-input
              size="small"
              v-model="scope.row.examValue"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:60px"
            ></el-input>
            <label>{{scope.row.examItemUnit}}</label>
          </template>
        </el-table-column>
      </el-table>
      <div style="width:550px; margin-top:10px; margin-bottom:10px">
        <el-input v-model="noninvasiveConclusion" placeholder="请输入结论" style="margin-top:5px"></el-input>
      </div>
      <el-button style="background-color:#EEE" @click="saveTime">保存</el-button>
    </div>
    <div style="margin-top:10px; margin-bottom:30px">
      <div style="color:#409EFF; font-weight:bold; font-size:16px">运动心肺功能检测</div>
      <!-- <span class="demonstration">检查日期</span> -->
      <el-date-picker
        v-model="timeUI2"
        type="date"
        placeholder="选择日期"
        size="small"
        style="margin-bottom:10px;margin-top:10px"
      ></el-date-picker>
      <el-table :data="cardiopulmonaryExam" border style="width: fit-content;">
        <el-table-column prop="examItemName" label="中文" width="200"></el-table-column>
        <el-table-column prop="itemShortName" label="英文" width="150"></el-table-column>
        <el-table-column prop="examValue" label="值" width="200">
          <template scope="scope">
            <el-input
              size="small"
              v-model="scope.row.examValue"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:60px"
            ></el-input>
            <label>{{scope.row.examItemUnit}}</label>
          </template>
        </el-table-column>
      </el-table>
      <div style="width:550px; margin-top:10px; margin-bottom:10px">
        <!-- <label>运动心肺功能检测结论：</label> -->
        <el-input v-model="cardiopulmonaryConclusion" placeholder="请输入结论" style="margin-top:5px"></el-input>
      </div>
      <el-button style="background-color:#EEE" @click="saveTime">保存</el-button>
    </div>

    <div style="margin-top:10px; margin-bottom:30px">
      <div style="color:#409EFF; font-weight:bold; font-size:16px">6分钟步行试验</div>
      <!-- <span class="demonstration">检查日期</span> -->
      <el-date-picker
        v-model="timeUI3"
        type="date"
        placeholder="选择日期"
        size="small"
        style="margin-bottom:10px;margin-top:10px"
      ></el-date-picker>
      <el-table :data="walkExam" border style="width: fit-content;">
        <el-table-column prop="examItemName" label="中文" width="200"></el-table-column>
        <el-table-column prop="itemShortName" label="英文" width="150"></el-table-column>
        <el-table-column prop="examValue" label="值" width="200">
          <template scope="scope">
            <el-input
              size="small"
              v-model="scope.row.examValue"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:60px"
            ></el-input>
            <label>{{scope.row.examItemUnit}}</label>
          </template>
        </el-table-column>
      </el-table>
      <div style="width:550px; margin-top:10px; margin-bottom:10px">
        <!-- <label>运动心肺功能检测结论：</label> -->
        <el-input v-model="walkConclusion" placeholder="请输入结论" style="margin-top:5px"></el-input>
      </div>
      <el-button style="background-color:#EEE" @click="saveTime">保存</el-button>
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
      noninvasiveExam: [],
      cardiopulmonaryExam: [],
      walkExam: [],
      noninvasiveConclusion: "",
      cardiopulmonaryConclusion: "",
      walkConclusion: "",
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
      options: patientData.diagnoseOptions,
      bodyComposition: {
        medicalHistoryId: "",
        bodyCompositionId: "",
        height: "",
        weight: "",
        muscleWeight: "",
        fatWeight: "",
        bodyFatPercentage: "",
        bmi: ""
      },
      timeUI1: "",
      timeUI2: "",
      timeUI3: "",
      timeUI4: "",
      value1: ""
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
    handleEdit(index, row) {
      console.log(index, row);
    },
    changeOtherFactor(value) {
      // alert(value)
      // this.form.riskOtherFactor = value;
      // alert(this.form.riskOtherFactorUI);
    },
    saveBody: function() {
      if (this.bodyComposition.bodyCompositionId == "") {
        this.bodyComposition.medicalHistoryId = sessionStorage.getItem(
          "currentMedicalHistory"
        );
        recordApi.addBodyComposition(this.bodyComposition).then(res => {
          if (res.code != "0000") {
            this.$message({
              message: res.Msg,
              type: "warning"
            });
            return;
          }
          this.$message({
            message: "保存成功",
            type: "success"
          });
        });
      } else {
        recordApi.updateBodyComposition(this.bodyComposition).then(res => {
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
      var params = {
        medicalHistoryId: sessionStorage.getItem("currentMedicalHistory"),
        examIndex: 0
      };
      recordApi.getAdmissionCheck(params).then(res => {
        if (res.code != "0000") {
          this.$message({
            message: res.Msg,
            type: "warning"
          });
          return;
        }
        this.bodyComposition = {
          ...this.bodyComposition,
          ...res.data.bodyComposition
        };
        res.data.medicalHistoryExamDtos.forEach(element => {
          switch (element.examCategoryCode) {
            case "6000":
              this.assembleData(element.listMyExamDto, this.noninvasiveExam);
              this.noninvasiveConclusion = element.examConclusion;
              this.timeUI1 = util.formatDate.parse(
                element.listMyExamDto[0].examTime,
                "yyyy-MM-dd"
              );
              break;
            case "7000":
              this.assembleData(
                element.listMyExamDto,
                this.cardiopulmonaryExam
              );
              this.cardiopulmonaryConclusion = element.examConclusion;
              this.timeUI2 = util.formatDate.parse(
                element.listMyExamDto[0].examTime,
                "yyyy-MM-dd"
              );
              break;
            case "8000":
              this.assembleData(element.listMyExamDto, this.walkExam);
              this.walkConclusion = element.examConclusion;
              this.timeUI3 = util.formatDate.parse(
                element.listMyExamDto[0].examTime,
                "yyyy-MM-dd"
              );
              break;
            default:
              break;
          }
        });
      });
    },
    /**
     * 数据渲染
     */
    assembleData(source, target) {
      for (var t = 0; t < target.length; t++) {
        for (var s = 0; s < source.length; s++) {
          if (target[t].examItemCode == source[s].examItem.examItemCode) {
            target[t].examValueId = source[s].examValue.examValueId;
            target[t].medicalHistoryId = source[s].examValue.medicalHistoryId;
            target[t].examValue = source[s].examValue.examValue;
            target[t].examIndex = source[s].examValue.examIndex;
            break;
          }
        }
      }
    },
    saveTime: function() {
      console.log(this.timeUI1);
      console.log(util.formatDate.format(this.timeUI1, "yyyy-MM-dd"));
    }
  },
  mounted() {
    this.noninvasiveExam = lodash.cloneDeep(patientData.noninvasiveItem);
    this.cardiopulmonaryExam = lodash.cloneDeep(
      patientData.cardiopulmonaryItem
    );
    this.walkExam = lodash.cloneDeep(patientData.walkItem);
    this.getDetail();
    console.log("Admission");
  }
};
</script>
<style>
</style>
