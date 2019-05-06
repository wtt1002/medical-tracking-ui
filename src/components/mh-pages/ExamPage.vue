<template>
  <div style="margin-left:80px">
    <div class="block" style="margin-top:10px; margin-bottom:30px">
      <div style="color:#409EFF; font-weight:bold; font-size:16px">血常规</div>
      <!-- <span class="demonstration">检查日期</span> -->
      <el-date-picker
        v-model="timeUI1"
        type="date"
        placeholder="选择日期"
        size="small"
        style="margin-bottom:10px;margin-top:10px"
      ></el-date-picker>
      <el-table :data="bloodExam" border style="width: fit-content;">
        <el-table-column prop="examItemName" label="中文" width="180"></el-table-column>
        <el-table-column prop="itemShortName" label="英文" width="180"></el-table-column>
        <el-table-column prop="examValue" label="值" width="180">
          <template scope="scope">
            <el-input
              size="small"
              v-model.number="scope.row.examValue"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:60px"
              @keyup="test"
            >
              <!-- <template slot="append">{{scope.row.examItemUnit}}</template> -->
            </el-input>
            <label>{{scope.row.examItemUnit}}</label>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="margin-top:5px; background-color:#EEE" @click="save('1000')">保存</el-button>
    </div>

    <div class="block" style="margin-top:10px; margin-bottom:30px">
      <div style="color:#409EFF; font-weight:bold; font-size:16px">肝肾功能</div>
      <!-- <span class="demonstration">检查日期</span> -->
      <el-date-picker
        v-model="timeUI2"
        type="date"
        placeholder="选择日期"
        size="small"
        style="margin-bottom:10px;margin-top:10px"
      ></el-date-picker>
      <el-table :data="liverKidneyExam" border style="width: fit-content;">
        <el-table-column prop="examItemName" label="中文" width="180"></el-table-column>
        <el-table-column prop="itemShortName" label="英文" width="180"></el-table-column>
        <el-table-column prop="examValue" label="值" width="180">
          <template scope="scope">
            <el-input
              size="small"
              v-model.number="scope.row.examValue"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:60px"
            >
              <!-- <template slot="append">{{scope.row.examItemUnit}}</template> -->
            </el-input>
            <label>{{scope.row.examItemUnit}}</label>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="margin-top:5px; background-color:#EEE" @click="save('2000')">保存</el-button>
    </div>

    <div class="block" style="margin-top:10px; margin-bottom:30px">
      <div style="color:#409EFF; font-weight:bold; font-size:16px">血脂检查</div>
      <!-- <span class="demonstration">检查日期</span> -->
      <el-date-picker
        v-model="timeUI3"
        type="date"
        placeholder="选择日期"
        size="small"
        style="margin-bottom:10px;margin-top:10px"
      ></el-date-picker>
      <el-table :data="bloodLipidExam" border style="width: fit-content;">
        <el-table-column prop="examItemName" label="中文" width="180"></el-table-column>
        <el-table-column prop="itemShortName" label="英文" width="180"></el-table-column>
        <el-table-column prop="examValue" label="值" width="180">
          <template scope="scope">
            <el-input
              size="small"
              v-model.number="scope.row.examValue"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:60px"
            >
              <!-- <template slot="append">{{scope.row.examItemUnit}}</template> -->
            </el-input>
            <label>{{scope.row.examItemUnit}}</label>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="margin-top:5px; background-color:#EEE" @click="save('3000')">保存</el-button>
    </div>

    <div class="block" style="margin-top:10px; margin-bottom:30px">
      <div style="color:#409EFF; font-weight:bold; font-size:16px">凝血检查</div>
      <!-- <span class="demonstration">检查日期</span> -->
      <el-date-picker
        v-model="timeUI4"
        type="date"
        placeholder="选择日期"
        size="small"
        style="margin-bottom:10px;margin-top:10px"
      ></el-date-picker>
      <el-table :data="coagulationExam" border style="width: fit-content;">
        <el-table-column prop="examItemName" label="中文" width="180"></el-table-column>
        <el-table-column prop="itemShortName" label="英文" width="180"></el-table-column>
        <el-table-column prop="examValue" label="值" width="180">
          <template scope="scope">
            <el-input
              size="small"
              v-model.number="scope.row.examValue"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:60px"
            >
              <!-- <template slot="append">{{scope.row.examItemUnit}}</template> -->
            </el-input>
            <label>{{scope.row.examItemUnit}}</label>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="margin-top:5px; background-color:#EEE" @click="save('4000')">保存</el-button>
    </div>
  </div>
</template>

<script>
import util from "../../common/js/util";
import { patientData } from "../../common/js/data";
import { patientApi, recordApi } from "../../api/api";
var lodash = require('lodash');
export default {
  data() {
    return {
      bloodExam: [...patientData.bloodItem],
      liverKidneyExam: [...patientData.liverKidneyItem],
      bloodLipidExam: [...patientData.bloodLipidItem],
      coagulationExam: [...patientData.coagulationItem],
      addRules: {
        examValue: [
          { type: "number", message: "只能输入数字", trigger: "blur" }
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
      // console.log(index, row);
    },
    changeOtherFactor(value) {
      // alert(value)
      // this.form.riskOtherFactor = value;
      // alert(this.form.riskOtherFactorUI);
    },
    test() {
      console.log("wtt.djddd");
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
    save: function(index) {
      var params;
      var examDate;
      switch (index) {
        case "1000":
          params = Object.assign([], this.bloodExam);
          examDate = util.formatDate.format(this.timeUI1, "yyyy-MM-dd");
          break;
        case "2000":
          params = Object.assign([], this.liverKidneyExam);
          examDate = util.formatDate.format(this.timeUI2, "yyyy-MM-dd");
          break;
        case "3000":
          params = Object.assign([], this.bloodLipidExam);
          examDate = util.formatDate.format(this.timeUI3, "yyyy-MM-dd");
          break;
        case "4000":
          params = Object.assign([], this.coagulationExam);
          examDate = util.formatDate.format(this.timeUI4, "yyyy-MM-dd");
          break;
        default:
          break;
      }

      for (var i = 0; i < params.length; i++) {
        params[i].myExamTime = examDate;
      }
      console.log(JSON.stringify(params));
      if (params[0].examValueId == "") {
        recordApi.addExam(params).then(res => {
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
      } else {
        recordApi.updateExam(params).then(res => {
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
            message: "提交成功",
            type: "success"
          });
        });
      }
    },

    getDetail: function() {
      recordApi
        .getExam(sessionStorage.getItem("currentMedicalHistory"))
        .then(res => {
          console.log(JSON.stringify(res));
          if (res.code != "0000") {
            this.$message({
              message: res.Msg,
              type: "warning"
            });
            return;
          }
          res.data.forEach(element => {
            console.log("ssss");
            switch (element.examCategoryCode) {
              case "1000":
                this.assembleData(element.listMyExamDto, this.bloodExam);
                break;
              case "2000":
                this.assembleData(element.listMyExamDto, this.liverKidneyExam);
                break;
              case "3000":
                this.assembleData(element.listMyExamDto, this.bloodLipidExam);
                break;
              case "4000":
                this.assembleData(element.listMyExamDto, this.coagulationExam);
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
    this.bloodExam=lodash.cloneDeep(patientData.bloodItem)
    this.liverKidneyExam=lodash.cloneDeep(patientData.liverKidneyItem);
    this.bloodLipidExam=lodash.cloneDeep(patientData.bloodLipidItem);
    this.coagulationExam=lodash.cloneDeep(patientData.coagulationItem);
    // this.bloodExam=[...patientData.bloodItem];
    // this.liverKidneyExam=[...patientData.liverKidneyItem];
    // this.bloodLipidExam=[...patientData.bloodLipidItem];
    // this.coagulationExam=[...patientData.coagulationItem];
    // console.log(JSON.stringify(patientData.bloodItem))
    this.getDetail();
    // console.log("我不该出来的")
  }
};
</script>
<style>
</style>
