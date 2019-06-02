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
        :rules="addRules"
      ></el-date-picker>
      <el-table :data="bloodExam" border style="width: fit-content;">
        <el-table-column prop="examItemName" label="中文" width="180"></el-table-column>
        <el-table-column prop="itemShortName" label="英文" width="180"></el-table-column>
        <el-table-column prop="examValue" label="值" width="180">
          <template scope="scope">
            <el-input
              size="small"
              v-model.number="scope.row.examValue"
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
      <el-button
        type="primary"
        style="margin-top:5px"
        @click="saveOrUpdate('1000')"
      >保存</el-button>
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
              v-model.number="scope.row.examValue"
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
      <el-button
        type="primary"
        style="margin-top:5px"
        @click="saveOrUpdate('2000')"
      >保存</el-button>
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
              v-model.number="scope.row.examValue"
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
      <el-button
        type="primary"
        style="margin-top:5px"
        @click="saveOrUpdate('3000')"
      >保存</el-button>
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
              v-model.number="scope.row.examValue"
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
      <el-button
        type="primary"
        style="margin-top:5px"
        @click="saveOrUpdate('4000')"
      >保存</el-button>
    </div>

    <div class="block" style="margin-top:10px; margin-bottom:30px; width:600px">
      <div style="color:#409EFF; font-weight:bold; font-size:16px">医学图像检查</div>
      <!-- <span class="demonstration">检查日期</span> -->
      <el-form>
        <el-form-item style="margin:10px 0">
          <label style="color:#78BEFF; font-weight:bold; font-size:16px">心电图检查</label>
        </el-form-item>
        <div style>
          <el-form-item style="margin-top:-10px">
            <label style>心电图检查时间：</label>
            <el-date-picker v-model="timeUI5" type="date" placeholder="选择日期" size="small"></el-date-picker>
          </el-form-item>
          <el-form-item style="margin-top:-10px">
            <el-col style="width:100px;min-width:100px">
              <label>心电图结论：</label>
            </el-col>
            <el-col style="width:480px">
              <el-input
                type="textarea"
                :rows="1"
                placeholder="请输入内容"
                v-model="conclusion1.inspectionConclusion.examConclusion"
                autosize
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="margin-top:-10px"
              @click="saveOrUpdateCon(conclusion1,timeUI5,'9')"
            >保存</el-button>
          </el-form-item>
        </div>

        <el-form-item style="margin:10px 0">
          <label style="color:#78BEFF; font-weight:bold; font-size:16px">心脏超声</label>
        </el-form-item>
        <el-form-item style="margin-top:-10px">
          <label style>心脏超声检查时间：</label>
          <el-date-picker v-model="timeUI6" type="date" placeholder="选择日期" size="small"></el-date-picker>
        </el-form-item>
        <el-form-item style="margin-top:-10px">
          <el-col style="width:100px;min-width:100px">
            <label>心脏超声结论：</label>
          </el-col>
          <el-col style="width:480px">
            <el-input
              type="textarea"
              :rows="1"
              placeholder="请输入内容"
              v-model="conclusion2.inspectionConclusion.examConclusion"
              autosize
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="margin-top:-10px"
            @click="saveOrUpdateCon(conclusion2,timeUI6,'11')"
          >保存</el-button>
        </el-form-item>

        <el-form-item style="margin:10px 0">
          <label style="color:#78BEFF; font-weight:bold; font-size:16px">心电核磁</label>
        </el-form-item>
        <el-form-item style="margin-top:-10px">
          <label style>心电核磁检查时间：</label>
          <el-date-picker v-model="timeUI7" type="date" placeholder="选择日期" size="small"></el-date-picker>
        </el-form-item>
        <el-form-item style="margin-top:-10px">
          <el-col style="width:100px;min-width:100px">
            <label>心电核磁结论：</label>
          </el-col>
          <el-col style="width:480px">
            <el-input
              type="textarea"
              :rows="1"
              placeholder="请输入内容"
              v-model="conclusion3.inspectionConclusion.examConclusion"
              autosize
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button
           type="primary"
            style="margin-top:-10px"
            @click="saveOrUpdateCon(conclusion3,timeUI7,'12')"
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
var lodash = require("lodash");
export default {
  data() {
    return {
      bloodExam: [...patientData.bloodItem],
      liverKidneyExam: [...patientData.liverKidneyItem],
      bloodLipidExam: [...patientData.bloodLipidItem],
      coagulationExam: [...patientData.coagulationItem],
      addRules: {
        examValue: [
          { type: "number", message: "只能输入数字", trigger: "blur" }
        ],
        timeUI1: [{ required: true }]
      },
      options: patientData.diagnoseOptions,
      timeUI1: new Date(),
      timeUI2: new Date(),
      timeUI3: new Date(),
      timeUI4: new Date(),
      timeUI5: new Date(),
      timeUI6: new Date(),
      timeUI7: new Date(),
      value1: "",
      conclusion1: {
        inspectionConclusion: {
          inspectionConclusionId: "",
          medicalHistoryId: "",
          examCategory: "",
          examConclusion: "",
          examIndex: "",
          examTime: null
        },
        time: ""
      },
      conclusion2: {
        inspectionConclusion: {
          inspectionConclusionId: "",
          medicalHistoryId: "",
          examCategory: "",
          examConclusion: "",
          examIndex: "",
          examTime: null
        },
        time: ""
      },
      conclusion3: {
        inspectionConclusion: {
          inspectionConclusionId: "",
          medicalHistoryId: "",
          examCategory: "",
          examConclusion: "",
          examIndex: "",
          examTime: null
        },
        time: ""
      }
    };
  },
  methods: {
    handleEdit(index, row) {
      // console.log(index, row);
    },
    /**
     * 保存时的数据封装，加入病历id
     */
    prepareData(source) {
      var param = Object.assign([], source);
      for (var i = 0; i < param.length; i++) {
        param[i].medicalHistoryId = sessionStorage.getItem(
          "currentMedicalHistory"
        );
        param[i].examIndex = sessionStorage.getItem("currentIndex");
      }
      return param;
    },
    /**
     * 保存或更新接口数据整合
     */
    saveOrUpdate: function(index) {
      var params;
      var examDate;
      switch (index) {
        case "1000":
          params = this.prepareData(this.bloodExam);
          examDate = util.formatDate.format(this.timeUI1, "yyyy-MM-dd");
          break;
        case "2000":
          params = this.prepareData(this.liverKidneyExam);
          examDate = util.formatDate.format(this.timeUI2, "yyyy-MM-dd");
          break;
        case "3000":
          params = this.prepareData(this.bloodLipidExam);
          examDate = util.formatDate.format(this.timeUI3, "yyyy-MM-dd");
          break;
        case "4000":
          params = this.prepareData(this.coagulationExam);
          examDate = util.formatDate.format(this.timeUI4, "yyyy-MM-dd");
          break;
        default:
          break;
      }
      if (examDate == "") {
        examDate = util.formatDate.format(new Date(), "yyyy-MM-dd");
      }
      for (var i = 0; i < params.length; i++) {
        params[i].myExamTime = examDate;
      }
      if (params[0].examValueId == "") {
        // console.log(JSON.stringify(params));
        this.save(params, index);
      } else {
        this.update(params);
      }
    },
    /**
     * 保存接口
     */
    save: function(params, index) {
      recordApi.addExam(params).then(res => {
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
        switch (index) {
          case "1000":
            this.assembleData(res.data, this.bloodExam);
            break;
          case "2000":
            this.assembleData(res.data, this.liverKidneyExam);
            break;
          case "3000":
            this.assembleData(res.data, this.bloodLipidExam);
            break;
          case "4000":
            this.assembleData(res.data, this.coagulationExam);
            break;
          default:
            break;
        }
        this.$message({
          message: "新增成功",
          type: "success"
        });
      });
    },
    /**
     * 更新接口
     */
    update: function(params) {
      recordApi.updateExam(params).then(res => {
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
        this.$message({
          message: "更新成功",
          type: "success"
        });
      });
    },
    /**
     * 数据获取接口
     */
    getDetail: function() {
      var params = {
        medicalHistoryId: sessionStorage.getItem("currentMedicalHistory"),
        examIndex: 0
      };
      if (sessionStorage.getItem("currentIndex")) {
        params.examIndex = sessionStorage.getItem("currentIndex");
      }
      // console.log(JSON.stringify(params))
      recordApi.getExam(params).then(res => {
        // console.log(JSON.stringify(res));
        if (res.code != "0000") {
          this.$message({
            message: res.Msg,
            type: "warning"
          });
          return;
        }
        res.data.forEach(element => {
          switch (element.examCategoryCode) {
            case "1000":
              this.assembleData(element.listMyExamDto, this.bloodExam);
              this.timeUI1 = util.formatDate.parse(
                element.listMyExamDto[0].examTime,
                "yyyy-MM-dd"
              );
              break;
            case "2000":
              this.assembleData(element.listMyExamDto, this.liverKidneyExam);
              this.timeUI2 = util.formatDate.parse(
                element.listMyExamDto[0].examTime,
                "yyyy-MM-dd"
              );
              break;
            case "3000":
              this.assembleData(element.listMyExamDto, this.bloodLipidExam);
              this.timeUI3 = util.formatDate.parse(
                element.listMyExamDto[0].examTime,
                "yyyy-MM-dd"
              );
              break;
            case "4000":
              this.assembleData(element.listMyExamDto, this.coagulationExam);
              this.timeUI4 = util.formatDate.parse(
                element.listMyExamDto[0].examTime,
                "yyyy-MM-dd"
              );
              break;
            default:
              break;
          }
        });
      });
    },
    saveOrUpdateCon: function(insConclusion, timeUI, category) {
      var params = insConclusion;
      params.time = util.formatDate.format(timeUI, "yyyy-MM-dd");
      params.inspectionConclusion.examTime = null;
      params.inspectionConclusion.examCategory = category;
      params.inspectionConclusion.medicalHistoryId = sessionStorage.getItem(
        "currentMedicalHistory"
      );
      params.inspectionConclusion.examIndex = 0;
      if (sessionStorage.getItem("currentIndex")) {
        params.inspectionConclusion.examIndex = sessionStorage.getItem(
          "currentIndex"
        );
      }
      // console.log(JSON.stringify(params));

      if (params.inspectionConclusion.inspectionConclusionId == "") {
        this.saveCon(params);
      } else {
        this.updateCon(params);
      }
    },
    saveCon: function(params) {
      recordApi.addInspectionConclusion(params).then(res => {
        // console.log(JSON.stringify(res));
        if (res.code !== "0000") {
          this.$message({
            message: res.Msg,
            type: "warning"
          });
          return;
        }
        params.inspectionConclusion.inspectionConclusionId =
          res.data.inspectionConclusion.inspectionConclusionId;
        this.$message({
          message: "新增成功",
          type: "success"
        });
      });
    },
    updateCon: function(params) {
      recordApi.updateInspectionConclusion(params).then(res => {
        // console.log(JSON.stringify(res));
        if (res.code !== "0000") {
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
    getInspectionConclusion: function() {
      var params = {
        medicalHistoryId: sessionStorage.getItem("currentMedicalHistory"),
        examIndex: 0
      };
      if (sessionStorage.getItem("currentIndex")) {
        params.examIndex = sessionStorage.getItem("currentIndex");
      }
      recordApi.getInspectionConclusion(params).then(res => {
        // console.log(JSON.stringify(res));
        if (res.code !== "0000") {
          this.$message({
            message: res.Msg,
            type: "warning"
          });
          return;
        }
        //数据
        if (res.data == null || res.data.length == 0) {
          return;
        }
        res.data.forEach(ele => {
          switch (ele.inspectionConclusion.examCategory) {
            case "9":
              this.conclusion1 = {
                ...this.conclusion1,
                ...ele
              };
              this.timeUI5 = util.formatDate.parse(ele.time, "yyyy-MM-dd");
              break;
            case "11":
              this.conclusion2 = {
                ...this.conclusion2,
                ...ele
              };
              this.timeUI6 = util.formatDate.parse(ele.time, "yyyy-MM-dd");
              break;
            case "12":
              this.conclusion3 = {
                ...this.conclusion3,
                ...ele
              };
              this.timeUI7 = util.formatDate.parse(ele.time, "yyyy-MM-dd");
              break;
            default:
              break;
          }
        });
      });
    },
    /**
     * 数据渲染
     */
    assembleData(source, target) {
      for (var t = 0; t < target.length; t++) {
        for (var s = 0; s < source.length; s++) {
          if (target[t].examItemCode == source[s].examItem.examItemCode) {
            target[t].examValueId = source[s].examValue.examValueId;
            target[t].medicalHistoryId = source[s].examValue.medicalHistoryId;
            target[t].examValue = source[s].examValue.examValue;
            target[t].examIndex = source[s].examValue.examIndex;
            break;
          }
        }
      }
    }
  },

  mounted() {
    this.bloodExam = lodash.cloneDeep(patientData.bloodItem);
    this.liverKidneyExam = lodash.cloneDeep(patientData.liverKidneyItem);
    this.bloodLipidExam = lodash.cloneDeep(patientData.bloodLipidItem);
    this.coagulationExam = lodash.cloneDeep(patientData.coagulationItem);

    this.getDetail();
    this.getInspectionConclusion();
  }
};
</script>
<style>
</style>
