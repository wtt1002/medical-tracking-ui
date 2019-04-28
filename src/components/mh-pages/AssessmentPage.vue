<template>
  <div style="margin-left:60px">
    <div style="margin-top:10px; margin-bottom:30px">
      <div
        style="color:#409EFF; font-weight:bold; font-size:16px; margin:20px; margin-top:0px"
      >康复量表评分</div>
      <el-form
        :inline="true"
        :model="form"
        class="demo-form-inline"
        style="min-width:200px; max-width:800px"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="SAS">
          <template scope="scope">
            <el-input
              size="small"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left; width:180px"
            >
            </el-input>
            <label>分</label>
          </template>
        </el-form-item>
        <el-form-item label="SDS">
          <template scope="scope">
            <el-input
              size="small"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:180px"
            >
            </el-input>
            <label>分</label>
          </template>
        </el-form-item>
        <el-form-item label="NA">
          <template scope="scope">
            <el-input
              size="small"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:180px"
            >
            </el-input>
            <label>分</label>
          </template>
        </el-form-item>
        <el-form-item label="PSQI">
          <template scope="scope">
            <el-input
              size="small"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:180px"
            >
            </el-input>
            <label>分</label>
          </template>
        </el-form-item>
        <el-form-item label="IPQA">
          <template scope="scope">
            <el-input
              size="small"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:180px"
            >
            </el-input>
            <label>分</label>
          </template>
        </el-form-item>
        <el-form-item label="Fagerstorm">
          <template scope="scope">
            <el-input
              size="small"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:180px"
            >
            </el-input>
            <label>分</label>
          </template>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top:10px; margin-bottom:30px">
      <div style="color:#409EFF; font-weight:bold; font-size:16px; margin:20px">入院试验</div>
      <el-form
        :inline="true"
        :model="form"
        class="demo-form-inline"
        style="min-width:200px; max-width:800px"
        label-position="right"
        label-width="110px"
      >
        <el-form-item label="左手握力">
          <template scope="scope">
            <el-input
              size="small"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:200px"
            >
            </el-input>
            <label>Kg</label>
          </template>
        </el-form-item>
        <el-form-item label="右手握力">
          <template scope="scope">
            <el-input
              size="small"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:200px"
            >
            </el-input>
            <label>Kg</label>
          </template>
        </el-form-item>
        <el-form-item label="3m往返试验">
          <template scope="scope">
            <el-input
              size="small"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:200px"
            >
            </el-input>
            <label>秒</label>
          </template>
        </el-form-item>
        <el-form-item label="4m步行试验">
          <template scope="scope">
            <el-input
              size="small"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:200px"
            >
            </el-input>
            <label>秒</label>
          </template>
        </el-form-item>
        <el-form-item label="椅子站起试验">
          <template scope="scope">
            <el-input
              size="small"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:200px"
            >
            </el-input>
            <label>秒</label>
          </template>
        </el-form-item>
        <el-form-item label="座位前伸">
          <template scope="scope">
            <el-input
              size="small"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:200px"
            >
            </el-input>
            <label>秒</label>
          </template>
        </el-form-item>
        <el-form-item label="平衡试验（左）">
          <template scope="scope">
            <el-input
              size="small"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:200px"
            >
            </el-input>
            <label>秒</label>
          </template>
        </el-form-item>
        <el-form-item label="平衡试验（右）">
          <template scope="scope">
            <el-input
              size="small"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:200px"
            >
            </el-input>
            <label>秒</label>
          </template>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <div style="color:#409EFF; font-weight:bold; font-size:16px; margin:20px">其它测评量</div>
      <el-form
        :inline="true"
        :model="form"
        class="demo-form-inline"
        style="min-width:200px; max-width:800px"
        label-position="right"
        label-width="110px"
      >
        <el-form-item label="上臂围">
          <template scope="scope">
            <el-input
              size="small"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:200Px"
            >
            </el-input>
            <label>分</label>
          </template>
        </el-form-item>
        <el-form-item label="三头肌皮褶厚度">
          <template scope="scope">
            <el-input
              size="small"
              v-model="form.user"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:200px"
            >
            </el-input>
            <label>分</label>
          </template>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item>
          <el-button
            type="primary"
            @click="saveOrUpdate"
            :loading="addLoading"
            style="margin-left:320px"
          >立即创建</el-button>
        </el-form-item>
      </el-form>
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
      value1: "",
      form: {
        user: "",
        region: ""
      },
      addLoading: false
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
    // this.getDetail();
    console.log("Assessment")
  }
};
</script>
<style>
</style>
