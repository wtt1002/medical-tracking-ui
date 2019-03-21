<template>
  <div style="margin-left:80px">
    <div style="margin-top:10px; margin-bottom:30px">
      <div style="color:#409EFF; font-weight:bold; font-size:16px; margin-bottom:10px">人体成分分析仪</div>
      <el-form
        :inline="true"
        :model="form"
        class="demo-form-inline"
        style="min-width:200px; max-width:800px"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="身高">
          <template scope="scope">
            <el-input
              size="medium"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left"
            >
              <template slot="append">cm</template>
            </el-input>
          </template>
        </el-form-item>
        <el-form-item label="体重">
          <template scope="scope">
            <el-input
              size="medium"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left"
            >
              <template slot="append">Kg</template>
            </el-input>
          </template>
        </el-form-item>

        <el-form-item label="肌肉重量">
          <template scope="scope">
            <el-input
              size="medium"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left"
            >
              <template slot="append">Kg</template>
            </el-input>
          </template>
        </el-form-item>
        <el-form-item label="脂肪重量">
          <template scope="scope">
            <el-input
              size="medium"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left"
            >
              <template slot="append">Kg</template>
            </el-input>
          </template>
        </el-form-item>

        <el-form-item label="体脂比">
          <template scope="scope">
            <el-input
              size="medium"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left"
            >
              <template slot="append">%</template>
            </el-input>
          </template>
        </el-form-item>
        <el-form-item label="BMI">
          <template scope="scope">
            <el-input
              size="medium"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left"
            >
              <template slot="append">Kg/m²</template>
            </el-input>
          </template>
        </el-form-item>
      </el-form>
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
            >
            </el-input>
            <label>{{scope.row.examItemUnit}}</label>
          </template>
        </el-table-column>
      </el-table>
      <div style="width:550px; margin-top:10px; margin-bottom:10px">
        <el-input placeholder="请输入结论" style="margin-top:5px"></el-input>
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
            >
            </el-input>
            <label>{{scope.row.examItemUnit}}</label>
          </template>
        </el-table-column>
      </el-table>
      <div style="width:550px; margin-top:10px; margin-bottom:10px">
        <!-- <label>运动心肺功能检测结论：</label> -->
        <el-input placeholder="请输入结论" style="margin-top:5px"></el-input>
      </div>
      <el-button style="background-color:#EEE" @click="saveTime">保存</el-button>
    </div>

    <div style="margin-top:10px; margin-bottom:30px">
      <div style="color:#409EFF; font-weight:bold; font-size:16px">6分钟步行试验</div>
      <!-- <span class="demonstration">检查日期</span> -->
      <el-date-picker
        v-model="timeUI2"
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
            >
            </el-input>
            <label>{{scope.row.examItemUnit}}</label>
          </template>
        </el-table-column>
      </el-table>
      <div style="width:550px; margin-top:10px; margin-bottom:10px">
        <!-- <label>运动心肺功能检测结论：</label> -->
        <el-input placeholder="请输入结论" style="margin-top:5px"></el-input>
      </div>
      <el-button style="background-color:#EEE" @click="saveTime">保存</el-button>
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
      liverKidneyExam: Object.assign([], patientData.liverKidneyItem),
      bloodLipidExam: Object.assign([], patientData.bloodLipidItem),
      coagulationExam: Object.assign([], patientData.coagulationItem),
      noninvasiveExam: Object.assign([], patientData.noninvasiveItem),
      cardiopulmonaryExam: Object.assign([], patientData.cardiopulmonaryItem),
      walkExam:Object.assign([],patientData.walkItem),
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
      form: {
        user: "",
        region: ""
      },
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
      tableDataa: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15
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

    saveTime: function() {
      console.log(this.timeUI1);
      console.log(util.formatDate.format(this.timeUI1, "yyyy-MM-dd"));
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  },
  mounted() {
    // this.getDetail();
    console.log("Admission");
  }
};
</script>
<style>
</style>
