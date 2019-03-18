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
      <el-table :data="pciItem" border style="width: fit-content;">
        <el-table-column prop="drugCh" label="中文" width="180"></el-table-column>
        <el-table-column prop="drugEn" label="英文" width="180"></el-table-column>
        <el-table-column prop="examValue" label="值" width="180">
          <template scope="scope">
            <el-input
              size="small"
              v-model="scope.row.examValue"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:60px"
            >  
            </el-input>
            <label>{{scope.row.pciItemUnit}}</label>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="margin-top:20px; background-color:#EEE" @click="saveTime">保存</el-button>
    </div>
    <el-form>
      <el-form-item label="血管路入并发症：">
        <el-checkbox-group v-model="summary.bloodDisease">
          <el-checkbox v-for="factor in factors" :label="factor" :key="factor">{{factor}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>

    <div class="block" style="margin-top:10px; margin-bottom:30px">
      <div style="color:#409EFF; font-weight:bold; font-size:16px">评分</div>
      <!-- <span class="demonstration">检查日期</span> -->
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-light">
            <label>GRACE评分：</label>
            <el-input style="text-align: left;width:70px">
            </el-input>
            <label>分</label>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-light">
            <label>DAPT   评分：</label>
            <el-input style="text-align: left;width:70px">
            </el-input>
            <label>分</label>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-light">
            <label>Crucede   评分：</label>
            <el-input style="text-align: left;width:70px">
            </el-input>
            <label>分</label>
          </div>
        </el-col>
      </el-row>

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
      pciItem: Object.assign([], patientData.pciItem),
      liverKidneyExam: Object.assign([], patientData.liverKidneyItem),
      bloodLipidExam: Object.assign([], patientData.bloodLipidItem),
      coagulationExam: Object.assign([], patientData.coagulationItem),
      factors: Object.assign([],patientData.bloodOptions),
      summary: {
        bloodDisease: ["血肿"]
      },
      score:{
        graceScore:"",
      },
      timeUI1:""
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

    saveTime: function() {
      console.log(this.timeUI1);
      console.log(util.formatDate.format(this.timeUI1, "yyyy-MM-dd"));
    }
  },
  mounted() {
    this.getDetail();
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
