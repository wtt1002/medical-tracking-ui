<template>
  <div style="margin-left:60px">
    <div style="margin-top:10px; margin-bottom:30px">
      <div
        style="color:#409EFF; font-weight:bold; font-size:16px; margin:20px; margin-top:0px"
      >康复量表评分</div>
      <el-form
        :inline="true"
        :model="assessment"
        class="demo-form-inline"
        style="min-width:200px; max-width:800px"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="SAS">
          <template scope="scope">
            <el-input
              size="small"
              v-model="assessment.sasScore"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left; width:180px"
            ></el-input>
            <label>分</label>
          </template>
        </el-form-item>
        <el-form-item label="SDS">
          <template scope="scope">
            <el-input
              size="small"
              v-model="assessment.sdsScore"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:180px"
            ></el-input>
            <label>分</label>
          </template>
        </el-form-item>
        <el-form-item label="NA">
          <template scope="scope">
            <el-input
              size="small"
              v-model="assessment.naScore"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:180px"
            ></el-input>
            <label>分</label>
          </template>
        </el-form-item>
        <el-form-item label="PSQI">
          <template scope="scope">
            <el-input
              size="small"
              v-model="assessment.psqiScore"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:180px"
            ></el-input>
            <label>分</label>
          </template>
        </el-form-item>
        <el-form-item label="IPQA">
          <template scope="scope">
            <el-input
              size="small"
              v-model="assessment.ipqaScore"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:180px"
            ></el-input>
            <label>分</label>
          </template>
        </el-form-item>
        <el-form-item label="Fagerstorm">
          <template scope="scope">
            <el-input
              size="small"
              v-model="assessment.fagerstormScore"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:180px"
            ></el-input>
            <label>分</label>
          </template>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top:10px; margin-bottom:30px">
      <div style="color:#409EFF; font-weight:bold; font-size:16px; margin:20px">入院试验</div>
      <el-form
        :inline="true"
        :model="assessment"
        class="demo-form-inline"
        style="min-width:200px; max-width:800px"
        label-position="right"
        label-width="110px"
      >
        <el-form-item label="左手握力">
          <template scope="scope">
            <el-input
              size="small"
              v-model="assessment.leftGrip"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:200px"
            ></el-input>
            <label>Kg</label>
          </template>
        </el-form-item>
        <el-form-item label="右手握力">
          <template scope="scope">
            <el-input
              size="small"
              v-model="assessment.rightGrip"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:200px"
            ></el-input>
            <label>Kg</label>
          </template>
        </el-form-item>
        <el-form-item label="3m往返试验">
          <template scope="scope">
            <el-input
              size="small"
              v-model="assessment.threeMeterTest"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:200px"
            ></el-input>
            <label>秒</label>
          </template>
        </el-form-item>
        <el-form-item label="4m步行试验">
          <template scope="scope">
            <el-input
              size="small"
              v-model="assessment.fourMeterTest"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:200px"
            ></el-input>
            <label>秒</label>
          </template>
        </el-form-item>
        <el-form-item label="椅子站起试验">
          <template scope="scope">
            <el-input
              size="small"
              v-model="assessment.standUpTest"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:200px"
            ></el-input>
            <label>秒</label>
          </template>
        </el-form-item>
        <el-form-item label="座位前伸">
          <template scope="scope">
            <el-input
              size="small"
              v-model="assessment.sitReach"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:200px"
            ></el-input>
            <label>秒</label>
          </template>
        </el-form-item>
        <el-form-item label="平衡试验（左）">
          <template scope="scope">
            <el-input
              size="small"
              v-model="assessment.leftBalanceTest"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:200px"
            ></el-input>
            <label>秒</label>
          </template>
        </el-form-item>
        <el-form-item label="平衡试验（右）">
          <template scope="scope">
            <el-input
              size="small"
              v-model="assessment.rightBalanceTest"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:200px"
            ></el-input>
            <label>秒</label>
          </template>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <div style="color:#409EFF; font-weight:bold; font-size:16px; margin:20px">其它测评量</div>
      <el-form
        :inline="true"
        :model="assessment"
        class="demo-form-inline"
        style="min-width:200px; max-width:800px"
        label-position="right"
        label-width="110px"
      >
        <el-form-item label="上臂围">
          <template scope="scope">
            <el-input
              size="small"
              v-model="assessment.upperarmCircumference"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:200Px"
            ></el-input>
            <label>分</label>
          </template>
        </el-form-item>
        <el-form-item label="三头肌皮褶厚度">
          <template scope="scope">
            <el-input
              size="small"
              v-model="assessment.tricepsSkinfoldThickness"
              placeholder
              @change="handleEdit(scope.$index, scope.row)"
              style="text-align: left;width:200px"
            ></el-input>
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
          >保存</el-button>
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
      addLoading: false,
      assessment: {
        assessmentId: "",
        sasScore: "",
        sdsScore: "",
        naScore: "",
        psqiScore: "",
        ipqaScore: "",
        fagerstormScore: "",
        leftGrip: "",
        rightGrip: "",
        threeMeterTest: "",
        fourMeterTest: "",
        standUpTest: "",
        leftBalanceTest: "",
        rightBalanceTest: "",
        sitReach: "",
        upperarmCircumference: "",
        bmi: "",
        tricepsSkinfoldThickness: "",
        medicalHistoryId: ""
      }
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
      this.addLoading = true;
      //NProgress.start();
      let params = { ...this.assessment };
      // console.log(JSON.stringify(params));

      if (this.assessment.assessmentId == "") {
        params.medicalHistoryId = sessionStorage.getItem(
          "currentMedicalHistory"
        );
        this.save(params);
      } else {
        this.update(params);
        //console.log("更新。。。。。。。。")
      }
    },
    save: function(params) {
      recordApi.addAssessment(params).then(res => {
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
        this.assessment.medicalHistoryId = res.data;
        this.$message({
          message: "新增成功",
          type: "success"
        });
      });
    },
    update: function(params) {
      recordApi.updateAssessment(params).then(res => {
        this.addLoading = false;
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
    },
    getDetail: function() {
      recordApi
        .getAssessment(sessionStorage.getItem("currentMedicalHistory"))
        .then(res => {
          // console.log(JSON.stringify(res));
          if (res.code != "0000") {
            this.$message({
              message: res.Msg,
              type: "warning"
            });
            return;
          }
          //数据填充
          this.assessment = { ...this.assessment, ...res.data[0] };
        });
    }
  },
  mounted() {
    this.getDetail();
    console.log("Assessment");
  }
};
</script>
<style>
</style>
