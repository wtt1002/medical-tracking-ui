<template>
  <div style="margin-left:80px">
    <div class="block" style="margin-top:10px; margin-bottom:30px">
      <div style="color:#409EFF; font-weight:bold; font-size:16px; margin-bottom:20px">出院带药</div>
      <div v-if="drugPlanItem.length == 0">暂时未开具处方</div>
      <div v-for="(drugUnit,idx) in drugPlanItem">
        <div style="margin:20px 0">
          <label style="margin:15px; color:#409EFF; font-size:15px">{{drugUnit.drugCategoryName}}</label>
          <el-table :data="drugUnit.drugAndUseageDtoList" border style="width: fit-content;">
            <!-- <el-table-column prop="category" label="药物类别" width="150"></el-table-column> -->
            <el-table-column prop="drug.drugName" label="药物名称" width="150"></el-table-column>
            <el-table-column prop="singleDose" label="单次剂量" width="100">
              <template scope="scope">
                <label>{{scope.row.followDrugUsage.drugDosage}}</label>
                <label>{{scope.row.followDrugUsage.drugDosageUnit}}</label> / 次
              </template>
            </el-table-column>
            <el-table-column prop="timeOfDay" label="服用频率" width="100">
              <template scope="scope">
                <label>{{scope.row.followDrugUsage.drugTime}}</label>次 /
                <label>{{scope.row.followDrugUsage.drugDay}}</label> 天
              </template>
            </el-table-column>
            <el-table-column prop="timeOfDay" label="服用周期" width="100">
              <template scope="scope">
                <label>{{scope.row.followDrugUsage.drugPeriod}}</label>
                <label>{{scope.row.followDrugUsage.drugPeriodUnit}}</label>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="editRow(idx,scope.$index, scope.row)"
                  type="text"
                  size="small"
                >编辑</el-button>
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, scope.$row)"
                  type="text"
                  size="small"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div style="margin:10px 0">
        <el-button @click.native.prevent="addRow" type="text" size="medium">+添加新药物</el-button>
      </div>
      <div>
        <el-button type="primary" @click="saveTime">保存</el-button>
      </div>
    </div>
    <!-- 新增界面 -->
    <el-dialog title="添加药物" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="药品类别：" prop="drugName">
          <el-select
            v-model="editForm.followDrugUsage.drugDosageUnit"
            placeholder="请选择药物类别"
            style="width:150px"
          >
            <el-option label="抗血小板类" value="粒"></el-option>
            <el-option label="他汀类" value="片"></el-option>
            <el-option label="β受体阻滞剂类" value="袋"></el-option>
            <el-option label="ARB/ACEI" value="ml"></el-option>
            <el-option label="质子泵抑制剂" value="mg"></el-option>
            <el-option label="抗凝药" value="g"></el-option>
            <el-option label="利尿剂" value="mg"></el-option>
            <el-option label="其它" value="g"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="药品名称：" prop="drugName">
          <el-input v-model="editForm.drug.drugName" auto-complete="off" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item label="单次计量：" prop="drugName">
          <el-input
            v-model="editForm.followDrugUsage.drugDosage"
            auto-complete="off"
            style="width:50px"
          ></el-input>
          <el-select
            v-model="editForm.followDrugUsage.drugDosageUnit"
            placeholder="请选择药物规格"
            style="width:80px"
          >
            <el-option label="粒" value="粒"></el-option>
            <el-option label="片" value="片"></el-option>
            <el-option label="袋" value="袋"></el-option>
            <el-option label="ml" value="ml"></el-option>
            <el-option label="mg" value="mg"></el-option>
            <el-option label="g" value="g"></el-option>
          </el-select>/ 次
        </el-form-item>
        <el-form-item label="服用频率：" prop="drugName">
          <el-input
            v-model="editForm.followDrugUsage.drugTime"
            auto-complete="off"
            style="width:50px"
          ></el-input>次 /
          <el-input
            v-model="editForm.followDrugUsage.drugDay"
            auto-complete="off"
            style="width:50px"
          ></el-input>天
        </el-form-item>
        <el-form-item label="服用周期：" prop="drugName">
          <el-input
            v-model="editForm.followDrugUsage.drugPeriod"
            auto-complete="off"
            style="width:50px"
          ></el-input>
          <el-select
            v-model="editForm.followDrugUsage.drugPeriodUnit"
            placeholder="周期单位"
            style="width:80px"
          >
            <el-option label="天" value="天"></el-option>
            <el-option label="周" value="周"></el-option>
            <el-option label="月" value="月"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="药品名称：" prop="drugName">
          <el-input v-model="editForm.drug.drugName" auto-complete="off" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item label="单次计量：" prop="drugName">
          <el-input
            v-model="editForm.followDrugUsage.drugDosage"
            auto-complete="off"
            style="width:50px"
          ></el-input>
          <el-select
            v-model="editForm.followDrugUsage.drugDosageUnit"
            placeholder="请选择药物规格"
            style="width:80px"
          >
            <el-option label="粒" value="粒"></el-option>
            <el-option label="片" value="片"></el-option>
            <el-option label="袋" value="袋"></el-option>
            <el-option label="ml" value="ml"></el-option>
            <el-option label="mg" value="mg"></el-option>
            <el-option label="g" value="g"></el-option>
          </el-select>/ 次
        </el-form-item>
        <el-form-item label="服用频率：" prop="drugName">
          <el-input
            v-model="editForm.followDrugUsage.drugTime"
            auto-complete="off"
            style="width:50px"
          ></el-input>次 /
          <el-input
            v-model="editForm.followDrugUsage.drugDay"
            auto-complete="off"
            style="width:50px"
          ></el-input>天
        </el-form-item>
        <el-form-item label="服用周期：" prop="drugName">
          <el-input
            v-model="editForm.followDrugUsage.drugPeriod"
            auto-complete="off"
            style="width:50px"
          ></el-input>
          <el-select
            v-model="editForm.followDrugUsage.drugPeriodUnit"
            placeholder="周期单位"
            style="width:80px"
          >
            <el-option label="天" value="天"></el-option>
            <el-option label="周" value="周"></el-option>
            <el-option label="月" value="月"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import util from "../../common/js/util";
import { patientData } from "../../common/js/data";
import { patientApi, recordApi } from "../../api/api";
export default {
  data() {
    return {
      drugPlanItem: Object.assign([], patientData.drugPlanItem),
      liverKidneyExam: Object.assign([], patientData.liverKidneyItem),
      bloodLipidExam: Object.assign([], patientData.bloodLipidItem),
      coagulationExam: Object.assign([], patientData.coagulationItem),
      editFormVisible: false, //编辑界面是否显示
      addFormVisible: false,
      editLoading: false,
      editForm: {
        drug: {
          drugName: ""
        },
        followDrugUsage: {
          drugUsageId: "",
          drugDosage: "",
          drugDosageUnit: "",
          drugTime: "",
          drugDay: "",
          drugPeriod: "",
          drugPeriodUnit: "",
          drugId: "",
          medicalHistoryId: "",
          followUpIndex: ""
        }
      },
      editFormRules: {
        drugName: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      }
    };
  },
  methods: {
    deleteRow(index, rows) {
      this.$confirm("确认删除吗？", "提示", {}).then(() => {
        rows.splice(index, 1);
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    handleChange(value) {
      // console.log(value);
      // alert(value);
    },
    editRow(idx, index, row) {
      console.log(idx, index, row);
      console.log(JSON.stringify(row));
      this.editForm = { ...this.editForm, ...row };
      this.editFormVisible = true;
    },
    addRow() {
      this.addFormVisible = true;
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
