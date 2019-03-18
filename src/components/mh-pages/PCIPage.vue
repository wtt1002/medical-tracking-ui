<template>
  <div style="margin-left:0px">
    <div style="margin-bottom:30px; padding:10px 0; border-bottom:1px solid #EEE">
      <label style="margin-left:0px; margin-right:10px">冠脉介入:</label>
      <el-radio v-model="radio" label="1">有</el-radio>
      <el-radio v-model="radio" label="2">无</el-radio>
      <label style="margin-left:50px; margin-right:10px">CABG:</label>
      <el-radio v-model="radio" label="1">有</el-radio>
      <el-radio v-model="radio" label="2">无</el-radio>
      <label style="margin-left:50px; margin-right:10px">溶栓:</label>
      <el-radio v-model="radio" label="1">有</el-radio>
      <el-radio v-model="radio" label="2">无</el-radio>
      <div style="margin-top:5px; margin-left:50px;">
        <el-checkbox-group v-if="radio == '1'" v-model="checkList">
          <el-checkbox label="左主干(LM)"></el-checkbox>
          <el-checkbox label="左前降支(LAD)"></el-checkbox>
          <el-checkbox label="左回旋支(LCX)"></el-checkbox>
          <el-checkbox label="右冠状动脉(RCA)"></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div>
      <label style="margin-left:0px; margin-right:10px">介入治疗:</label>
      <el-radio v-model="radio" label="1">择期</el-radio>
      <el-radio v-model="radio" label="2">急诊</el-radio>
    </div>
    <div>
      <label>手术时间</label>
      <el-date-picker type="date" placeholder="选择日期" v-model="pci.operateTimeUI" size="small"></el-date-picker>
    </div>
    <div>
      <label>急诊PCI DB2时间：</label>
      <el-input v-model="pci.pcidb2" style="width:50px" size="small"></el-input>
      <label>min</label>
    </div>
    <div>
      <label>造影结果：</label>
      <el-table :data="zaoying" :span-method="arraySpanMethod" border style="width: fit-content">
        <el-table-column prop="position" label="position" width="100"></el-table-column>
        <el-table-column prop="LM" label="左主干(LM)" width="150">
          <template scope="scope">
            <el-input
              size="small"
              v-model="scope.row.LM"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left; width:60px"
            ></el-input>%
          </template>
        </el-table-column>
        <el-table-column prop="LAD" label="左前降支(LAD)" width="150">
          <template scope="scope">
            <el-input
              size="small"
              v-model="scope.row.LAD"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left; width:60px"
            ></el-input>%
          </template>
        </el-table-column>
        <el-table-column prop="LCX" label="左回旋支(LCX)" width="150">
          <template scope="scope">
            <el-input
              size="small"
              v-model="scope.row.LCX"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left; width:60px"
            ></el-input>%
          </template>
        </el-table-column>
        <el-table-column prop="RCA" label="右冠状动脉(RCA)" width="150">
          <template scope="scope">
            <el-input
              size="small"
              v-model="scope.row.RCA"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left; width:60px"
            ></el-input>%
          </template>
        </el-table-column>
        <el-table-column prop="OTHER" label="其他血管" width="120">
          <template scope="scope">
            <el-input
              size="small"
              v-model="scope.row.OTHER"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left; width:60px"
            ></el-input>%
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <label>PCI抗血小板药：</label>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="左主干(LM)"></el-checkbox>
        <el-checkbox label="左前降支(LAD)"></el-checkbox>
        <el-checkbox label="左回旋支(LCX)"></el-checkbox>
        <el-checkbox label="右冠状动脉(RCA)"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div>
      <label>PCI抗凝药物：</label>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="左主干(LM)"></el-checkbox>
        <el-checkbox label="左前降支(LAD)"></el-checkbox>
        <el-checkbox label="左回旋支(LCX)"></el-checkbox>
        <el-checkbox label="右冠状动脉(RCA)"></el-checkbox>
      </el-checkbox-group>
      <el-checkbox-group>
        <el-checkbox label="其它">
          <el-input placeholder="其它"></el-input>
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div>
      <label>术中用药：</label>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="左主干(LM)"></el-checkbox>
        <el-checkbox label="左前降支(LAD)"></el-checkbox>
        <el-checkbox label="左回旋支(LCX)"></el-checkbox>
        <el-checkbox label="右冠状动脉(RCA)"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div>
      <label>辅助器械：</label>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="左主干(LM)"></el-checkbox>
        <el-checkbox label="左前降支(LAD)"></el-checkbox>
        <el-checkbox label="左回旋支(LCX)"></el-checkbox>
        <el-checkbox label="右冠状动脉(RCA)"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div>
      <el-select v-model="pci.contrastMediumType" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
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
      radio: "1",
      checkList: ["选中且禁用", "复选框 A"],
      zaoying: [
        {
          position: "开口",
          LM: "",
          LAD: "",
          LCX: "45",
          RCA: "",
          OTHER: ""
        },
        {
          position: "近段",
          LM: "",
          LAD: "",
          LCX: "66",
          RCA: "",
          OTHER: ""
        },
        {
          position: "中段",
          LM: "",
          LAD: "",
          LCX: "",
          RCA: "23",
          OTHER: ""
        },
        {
          position: "远段",
          LM: "",
          LAD: "",
          LCX: "",
          RCA: "",
          OTHER: ""
        }
      ],
      pci: {
        pciType: {
          type: "",
          info: []
        },
        cabg: "",
        thrombolysis: "",
        therapy_type: "",
        operateTimeUI: "",
        pcidb2: "",
        contrastMediumType:"2"
      },
      options: [
        {
          value: "1",
          label: "黄金糕"
        },
        {
          value: "2",
          label: "双皮奶"
        },
        {
          value: "3",
          label: "蚵仔煎"
        },
        {
          value: "4",
          label: "龙须面"
        },
        {
          value: "5",
          label: "北京烤鸭"
        }
      ],
      tableData6: [
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
      ]
    };
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(row);
      console.log(column);
      console.log(rowIndex);
      console.log(columnIndex);
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },
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
</style>
