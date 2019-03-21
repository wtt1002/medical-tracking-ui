<template>
  <div style="margin-left:60px">
    <div style="margin-bottom:30px; padding:10px 0; border-bottom:1px solid #EEE">
      <label style="margin-left:0px; margin-right:10px">冠脉介入:</label>
      <el-radio v-model="pci.pciType.type" label="1">有</el-radio>
      <el-radio v-model="pci.pciType.type" label="2">无</el-radio>
      <label style="margin-left:50px; margin-right:10px">CABG:</label>
      <el-radio v-model="pci.cabg" label="1">有</el-radio>
      <el-radio v-model="pci.cabg" label="2">无</el-radio>
      <label style="margin-left:50px; margin-right:10px">溶栓:</label>
      <el-radio v-model="pci.thrombolysis" label="1">有</el-radio>
      <el-radio v-model="pci.thrombolysis" label="2">无</el-radio>
      <div style="margin-top:5px; margin-left:50px;">
        <el-checkbox-group v-if="pci.pciType.type == '1'" v-model="pci.pciType.info">
          <el-checkbox v-for="item in pciTypeExam" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div style="margin:15px 0">
      <label style="margin-left:0px; margin-right:10px; font-weight:bold">介入治疗:</label>
      <el-radio v-model="pci.therapyType" label="1">择期</el-radio>
      <el-radio v-model="pci.therapyType" label="2">急诊</el-radio>
    </div>
    <div style="margin:15px 0">
      <label style="margin-left:0px; margin-right:10px; font-weight:bold">手术时间：</label>
      <el-date-picker type="date" placeholder="选择日期" v-model="pci.operateTimeUI" size="small"></el-date-picker>
    </div>
    <div style="margin:15px 0">
      <label style="margin-left:0px; margin-right:10px; font-weight:bold">急诊PCI DB2时间：</label>
      <el-input v-model="pci.pcidb2" style="width:50px" size="small"></el-input>
      <label>min</label>
    </div>
    <div style="margin:15px 0">
      <label style="font-weight:bold">造影结果：</label>
      <el-table
        :data="contrastOutPutExam"
        border
        style="width: fit-content; margin-top:10px"
      >
        <el-table-column prop="position" label="position" width="100"></el-table-column>
        <el-table-column prop="LM" label="左主干(LM)" width="150">
          <template scope="scope">
            <el-input
              size="small"
              v-model="scope.row.LM"
              placeholder
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
              style="text-align: left; width:60px"
            ></el-input>%
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin:15px 0">
      <label style="font-weight:bold">PCI抗血小板药：</label>
      <el-checkbox-group v-model="pci.pciAntiplatelet" style="margin-top:5px">
        <el-checkbox v-for="item in pciAntiplateletExam" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div style="margin:15px 0">
      <label style="font-weight:bold">PCI抗凝药物：</label>
      <el-checkbox-group v-model="pci.pciAnticoagulant" style="margin-top:5px">
        <el-checkbox v-for="item in pciAnticoagulantExam" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
      </el-checkbox-group>
      <el-checkbox-group style="margin-top:5px">
        <el-checkbox label="其它">
          <el-input placeholder="其它" size="small"></el-input>
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div style="margin:15px 0">
      <label style="font-weight:bold">术中用药：</label>
      <el-checkbox-group v-model="pci.operateDrug" style="margin-top:5px">
        <el-checkbox v-for="item in operateDrugExam" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div style="margin:15px 0">
      <label style="font-weight:bold">辅助器械：</label>
      <el-checkbox-group v-model="pci.assistiveDevice" style="margin-top:5px">
        <el-checkbox v-for="item in assistiveDeviceExam" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div style="margin:15px 0">
      <div>
        <label style="font-weight:bold">造影剂类型:</label>
      </div>
      <el-select
        v-model="pci.contrastMediumType"
        placeholder="请选择"
        size="small"
        style="width:100px; margin-top:5px"
      >
        <el-option
          v-for="item in contrastMediumTypeExam"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input
        size="small"
        v-model="pci.contrastMediumAmount"
        placeholder
        style="text-align: left;width:60px"
      ></el-input>
      <label>ml</label>
    </div>
    <div style="margin:10px 0">
      <div style="font-weight:bold">PCI入路血管：</div>
      <el-checkbox-group v-model="pci.pciInfo" style="margin-top:5px">
        <el-checkbox v-for="item in pciInfoExam" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div style="margin:10px 0">
      <el-table
        :data="pciDetailExam"
        border
        style="width: fit-content"
      >
        <el-table-column prop="position" label="干预血管" width="100"></el-table-column>
        <el-table-column prop="catheter" label="左主干(LM)" width="150">
          <template scope="scope">
            <el-input
              size="small"
              v-model="scope.row.catheter"
              placeholder
              style="text-align: left; width:60px"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="wire" label="左前降支(LAD)" width="150">
          <template scope="scope">
            <el-input
              size="small"
              v-model="scope.row.wire"
              placeholder
              style="text-align: left; width:60px"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="preBalloon" label="左回旋支(LCX)" width="150">
          <template scope="scope">
            <el-input
              size="small"
              v-model="scope.row.preBalloon"
              placeholder
              style="text-align: left; width:60px"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="stent" label="右冠状动脉(RCA)" width="150">
          <template scope="scope">
            <el-input
              size="small"
              v-model="scope.row.stent"
              placeholder
              style="text-align: left; width:60px"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="aftBalloon" label="其他血管" width="120">
          <template scope="scope">
            <el-input
              size="small"
              v-model="scope.row.aftBalloon"
              placeholder
              style="text-align: left; width:60px"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin:15px 0">
      <div style="font-weight:bold">介入并发症：</div>
      <el-checkbox-group v-model="pci.pciInfo" style="margin-top:5px; max-width:900px">
        <el-checkbox v-for="item in interventionProblemExam" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
      </el-checkbox-group>
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

      //pci类型
      pciTypeExam:Object.assign([],patientData.pciTypeItem),
      //造影结果
      contrastOutPutExam: Object.assign([], patientData.contrastOutPutItem),
      //介入并发症
      interventionProblemExam: Object.assign(
        [],
        patientData.interventionProblemItem
      ),
      //pci抗血小板药物
      pciAntiplateletExam: Object.assign([], patientData.pciAntiplateletItem),
      //pci抗凝药物
      pciAnticoagulantExam: Object.assign([], patientData.pciAnticoagulantItem),
      //术中用药
      operateDrugExam: Object.assign([], patientData.operateDrugItem),
      //辅助器械
      assistiveDeviceExam: Object.assign([], patientData.assistiveDeviceItem),
      //造影剂类型
      contrastMediumTypeExam:Object.assign([],patientData.contrastMediumTypeItem),
      //pci入路信息
      pciInfoExam: Object.assign([], patientData.pciInfoItem),
      //pci介入详情
      pciDetailExam: Object.assign([], patientData.pciDetailItem),
      pci: {
        //冠脉介入
        pciType: {
          type: "",
          info: ["2"]
        },
        //CABG
        cabg: "",
        //溶栓
        thrombolysis: "",
        //介入治疗类型
        therapyType: "",
        operateTimeUI: "",
        //急诊用时
        pcidb2: "",
        //造影剂类型
        contrastMediumType: "",
        //造影剂用量
        contrastMediumAmount: "",
        //pci入路血管信息
        pciInfo: [],
        //入路并发症
        interventionProble: [],
        //pci抗血小板药物
        pciAntiplatelet: [],
        //pci抗凝药物
        pciAnticoagulant: [],
        //术中用药
        operateDrug: [],
        //辅助器械
        assistiveDevice:[],
      }
    };
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
  },
  mounted() {
    // this.getDetail();
  }
};
</script>
<style>
</style>
