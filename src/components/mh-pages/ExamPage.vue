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
              v-model="scope.row.examValue"
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
      <el-button style="margin-top:5px; background-color:#EEE" @click="saveTime">保存</el-button>
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
              v-model="scope.row.examValue"
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
      <el-button style="margin-top:5px; background-color:#EEE">保存</el-button>
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
              v-model="scope.row.examValue"
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
      <el-button style="margin-top:5px; background-color:#EEE">保存</el-button>
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
              v-model="scope.row.examValue"
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
      <el-button style="margin-top:5px; background-color:#EEE">保存</el-button>
    </div>
  </div>
</template>

<script>
import util from "../../common/js/util";
import { patientData } from "../../common/js/data";
import { patientApi, recordApi } from "../../api/api";
export default {
  data() {
    return {
      bloodExam: Object.assign([], patientData.bloodItem),
      liverKidneyExam: Object.assign([],patientData.liverKidneyItem),
      bloodLipidExam:Object.assign([],patientData.bloodLipidItem),
      coagulationExam:Object.assign([],patientData.coagulationItem),
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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
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
    },

    saveTime: function(){
      console.log(this.timeUI1)
      console.log(util.formatDate.format(this.timeUI1,"yyyy-MM-dd"))
    }
  },
  mounted() {
    this.getDetail();
  }
};
</script>
<style>
</style>
