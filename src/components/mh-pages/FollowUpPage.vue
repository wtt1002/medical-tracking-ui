<template>
  <div>
    <el-col>
      <!--列表-->
      <el-table
        :data="follows"
        highlight-current-row
        v-loading="listLoading"
        style="width: fit-content;"
      >
        <!-- <el-table-column type="selection" width="40"></el-table-column> -->
        <el-table-column type="index" width="100"></el-table-column>
        <el-table-column prop="birthday" label="计划随访日期" width="180"></el-table-column>
        <el-table-column prop="birthday" label="实际随访日期" width="180"></el-table-column>
        <el-table-column prop="patient.age" label="计划随访方式" width="180"></el-table-column>
        <el-table-column prop="patient.age" label="实际随访方式" width="180"></el-table-column>
        <!-- <el-table-column prop="patient.sickAge" label="主要诊断" width="120"></el-table-column> -->
        <!-- <el-table-column label="随访报告" width="150">
          <template scope="scope">
            <el-button size="small">编辑</el-button>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="150">
          <template scope="scope">
            <el-button size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--工具条-->
      <el-col class="toolbar" style="margin:0px; width:950px">
        <el-button type="primary" @click="addFollowUp">新增随访记录</el-button>
        <el-pagination
          layout="prev, pager, next"
          :page-size="10"
          :total="total"
          style="float:right;"
        ></el-pagination>
      </el-col>
    </el-col>
    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false" >
      <el-form :model="followForm" label-width="200px" :rules="editFormRules" ref="followForm">
        <el-form-item label="随访病人" style="width:350px">
          <el-input v-model="followForm.patientName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出院时间">
          <el-date-picker type="date" placeholder="出院日期" v-model="followForm.outTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="计划随访方式" prop="planWay" >
          <el-select v-model="followForm.planWay" placeholder="请选择计划随访方式">
            <el-option label="电话" value="电话"></el-option>
            <el-option label="短信" value="短信"></el-option>
            <el-option label="门诊" value="门诊"></el-option>
            <el-option label="造影" value="造影"></el-option>
            <el-option label="其它" value="其它"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划随访时间" prop="planPoint" >
          <el-select v-model="followForm.planPoint" placeholder="请选择计划随访时间">
            <el-option label="出院后1个月" value="1"></el-option>
            <el-option label="出院后3个月" value="3"></el-option>
            <el-option label="出院后6个月" value="6"></el-option>
            <el-option label="出院后12个月" value="12"></el-option>
            <el-option label="出院后18个月" value="18"></el-option>
            <el-option label="出院后24个月" value="24"></el-option>
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
      bloodExam: Object.assign([], patientData.bloodItem),
      liverKidneyExam: Object.assign([], patientData.liverKidneyItem),
      bloodLipidExam: Object.assign([], patientData.bloodLipidItem),
      coagulationExam: Object.assign([], patientData.coagulationItem),
      editLoading:false,
      editFormRules: {
        planWay: [{ required: true, message: "请选择随访方式", trigger: "blur" }],
        planPoint: [{ required: true, message: "请选择随访时间", trigger: "blur" }],
      },
      follows: [
        {
          planDate: "",
          actuDate: "",
          planWay: "",
          actuWay: "",
        }
      ],
      listLoading: false,
      total: 0,
      editFormVisible: false, //编辑界面是否显示
      followForm: {
        patientName: "",
        outTime: "",
        planWay: "",
        planPoint: ""
      }
    };
  },
  methods: {
    getDetail: function(page) {
      var params ={
        medicalHistoryId:sessionStorage.getItem("currentMedicalHistory"),
        page:page,
        count:10
      }
      recordApi
        .getFollowUp(params)
        .then(res => {
          console.log(JSON.stringify(res))
          if (res.code != "0000") {
            this.$message({
              message: res.Msg,
              type: "warning"
            });
            return;
          }
          // this.form = { ...this.form, ...res.data.medicalHistory };
          // this.form.inTimeUI = util.formatDate.parse(
          //   res.data.inTimeStr,
          //   "yyyy-MM-dd"
          // );
          // this.form.outTimeUI = util.formatDate.parse(
          //   res.data.outTimeStr,
          //   "yyyy-MM-dd"
          // );
          // this.form.diagnoseUI = JSON.parse(
          //   res.data.medicalHistory.mainDiagnose
          // );
          // var risk = JSON.parse(res.data.medicalHistory.riskFactor);
          // this.form.riskBriefFactorUI = risk.riskBriefFactorUI;
          // this.form.riskOtherFactorUI = risk.riskOtherFactorUI;
          // if (risk.riskOtherFactorUI != "") {
          //   this.isOtherFactor = ["其它"];
          // }
          // var drugs = JSON.parse(res.data.medicalHistory.preDrugs);
          // this.form.preDrugsUI = drugs.preDrugsUI;
          // this.form.preOtherDrugUI = drugs.preOtherDrugUI;
          // if (drugs.preOtherDrugUI != "") {
          //   this.isOtherDrug = ["其它"];
          // }
        });
    },
    //显示编辑界面
    addFollowUp: function(index, row) {
      this.editFormVisible = true;
      // patientApi.getPatient(row.patient.patientId).then(res => {
      //   this.editForm = { ...this.editForm, ...res.data.patient };
      //   this.editForm.birth = util.formatDate.parse(
      //     res.data.birthdayStr,
      //     "yyyy-MM-dd"
      //   );
      // });
    },
    //编辑
    editSubmit: function() {
      this.$refs.followForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            // let para = Object.assign({}, this.editForm);
            // para.birth =
            //   !para.birth || para.birth == ""
            //     ? ""
            //     : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            // para.gender = para.gender.toString();
            // para.age = para.age.toString();
            // para.sickAge = para.sickAge.toString();
            // para.birthday = null;
            // let params = {
            //   patient: para,
            //   birthdayStr: para.birth
            // };
            // patientApi.savePatient(params).then(res => {
            //   this.editLoading = false;
            //   //NProgress.done();
            //   this.$message({
            //     message: "提交成功",
            //     type: "success"
            //   });
            //   this.$refs["editForm"].resetFields();
            this.editFormVisible = false;
            //   this.getPatients();
            // });
          });
        }
      });
    }
  },
  mounted() {
    this.getDetail(1);
  }
};
</script>
<style>
</style>
