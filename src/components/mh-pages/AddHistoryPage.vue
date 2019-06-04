<template>
  <el-form
    ref="form"
    :model="form"
    :rules="addRules"
    label-width="100px"
    @submit.prevent="onSubmit"
    style="margin:20px;width:60%;min-width:600px;"
  >
    <el-form-item label="住院号" prop="admissionNum">
      <el-input v-model="form.admissionNum" style="width:192px"></el-input>
    </el-form-item>
    <el-form-item label="入院时间">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.inTimeUI"></el-date-picker>
    </el-form-item>
    <el-form-item label="出院时间">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.outTimeUI"></el-date-picker>
    </el-form-item>
    <el-form-item label="介入术者">
      <el-input v-model="form.operateDoc" style="width:192px"></el-input>
    </el-form-item>
    <el-form-item label="主要诊断">
      <el-cascader
        expand-trigger="hover"
        :options="options"
        v-model="form.diagnoseUI"
        size="medium"
      ></el-cascader>
    </el-form-item>
    <el-form-item label="高危因素">
      <el-checkbox-group v-model="form.riskBriefFactorUI">
        <el-checkbox v-for="factor in factors" :label="factor" :key="factor">{{factor}}</el-checkbox>
      </el-checkbox-group>
      <el-checkbox-group v-model="isOtherFactor">
        <el-checkbox label="其它">
          <el-input placeholder="其它" v-model="form.riskOtherFactorUI"></el-input>
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="住院前用药">
      <el-checkbox-group v-model="form.preDrugsUI">
        <el-checkbox v-for="drug in drugs" :label="drug" :key="drug">{{drug}}</el-checkbox>
      </el-checkbox-group>
      <el-checkbox-group v-model="isOtherDrug">
        <el-checkbox label="其它">
          <el-input placeholder="其它" v-model="form.preOtherDrugUI"></el-input>
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="体格检查" style="font-size:20px"></el-form-item>
    <el-form-item label="血压">
      <el-input v-model="form.bloodPressureH" style="width:50px"></el-input>
      <label style="margin-left:5px;margin-right:5px">/</label>
      <el-input v-model="form.bloodPressureL" style="width:50px"></el-input>
      <label>mmHg</label>
    </el-form-item>
    <el-form-item label="心率">
      <el-input v-model="form.heartRate" style="width:50px"></el-input>
      <label>bpm</label>
    </el-form-item>
    <el-form-item label="身高" prop="height">
      <el-input v-model="form.height" style="width:50px"></el-input>
      <label>cm</label>
    </el-form-item>
    <el-form-item label="体重" prop="weight">
      <el-input v-model="form.weight" style="width:50px"></el-input>
      <label>Kg</label>
    </el-form-item>
    <el-form-item label="BMI">
      <el-input v-model="form.bmi" style="width:50px"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveOrUpdate" :loading="addLoading">立即创建</el-button>
      <el-button @click.native.prevent = "quit">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import util from "../../common/js/util";
import { patientData } from "../../common/js/data";
import { patientApi, recordApi } from "../../api/api";
export default {
  data() {
    return {
      form: {
        medicalHistoryId: "",
        patientId: "",
        admissionNum: "",
        inTimeUI: "",
        outTimeUI: "",
        operateDoc: "",
        diagnoseUI: [],
        riskBriefFactorUI: [],
        riskOtherFactorUI: "",
        preDrugsUI: [],
        preOtherDrugUI: "",
        bloodPressureH: "",
        bloodPressureL: "",
        heartRate: "",
        height: "",
        weight: "",
        bmi: ""
      },
      isOtherFactor: [],
      isOtherDrug: [],
      // mainDiagnose: [],
      factors: patientData.riskOptions,
      drugs: patientData.preDrugOptions,
      addLoading: false,
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
      options: patientData.diagnoseOptions
    };
  },
  computed: {
    count() {
      return this.$store.state.count;
    },
    incFunc() {
      return this.$store.actions.increment;
    }
  },
  methods: {
    onSubmit() {
      console.log("submit!");
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
            //保存
            this.save(params);
          });
        }
      });
    },
    /**
     * 确定新增病历
     */
    save: function(params) {
      
      recordApi.addMedicalHistory(params).then(res => {
        console.log(JSON.stringify(res));
        this.addLoading = false;
        //NProgress.done();
        if (res.code != "0000") {
          this.$message({
            message: "新增失败",
            type: "warning"
          });
          return;
        }
        this.form.medicalHistoryId = res.data;
        sessionStorage.setItem("currentMedicalHistory",res.data);
        this.$router.push("/mhistory");
        // this.$message({
        //   message: "提交成功",
        //   type: "success"
        // });
      });
    },
    /**
     * 取消添加病历
     */
    quit: function(){
      this.$router.go(-1);
    }
  },
  mounted() {
  }
};
</script>