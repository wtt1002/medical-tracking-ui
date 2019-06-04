<template>
  <div>
    <el-col>
      <!--列表-->
      <el-table
        :data="follows"
        highlight-current-row
        v-loading="listLoading"
        style="width: 1000px;"
      >
        <!-- <el-table-column type="selection" width="40"></el-table-column> -->
        <!-- <el-table-column type="index" width="100"></el-table-column> -->
        <el-table-column label="随访记录" width="100">
          <template scope="scope">
            <el-button type="primary" size="small" @click="followDetail(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="planTime" label="计划随访日期"></el-table-column>
        <el-table-column prop="finalTime" label="实际随访日期"></el-table-column>
        <el-table-column prop="followUp.planWay" label="计划随访方式"></el-table-column>
        <el-table-column prop="followUp.planWay" label="实际随访方式"></el-table-column>
        <!-- <el-table-column prop="patient.sickAge" label="主要诊断" width="120"></el-table-column> -->
        <!-- <el-table-column label="随访报告" width="150">
          <template scope="scope">
            <el-button size="small">编辑</el-button>
          </template>
        </el-table-column>-->
        <el-table-column label="操作" width="150">
          <template scope="scope">
            <el-button size="small" @click="editFollowUp(scope.row)">编辑</el-button>
            <!-- <el-button type="danger" size="small">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!--工具条-->
      <el-col class="toolbar" style="margin:0px; width:100%;max-width:1000px; background-color:#EEF1F6">
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
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="200px" :rules="editFormRules" ref="editForm">
        <el-form-item label="随访病人" style="width:350px">
          <el-input v-model="editForm.patientName" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="出院时间">
          <el-date-picker type="date" placeholder="出院日期" v-model="editForm.outTime" disabled></el-date-picker>
        </el-form-item>
        <el-form-item label="计划随访方式" prop="planWay">
          <el-select v-model="editForm.planWay" placeholder="请选择计划随访方式">
            <el-option label="电话" value="电话">电话</el-option>
            <el-option label="短信" value="短信">短信</el-option>
            <el-option label="门诊" value="门诊">门诊</el-option>
            <el-option label="造影" value="造影">造影</el-option>
            <el-option label="其它" value="其它">其它</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划随访时间" prop="followUpDuration">
          <el-select v-model="editForm.followUpDuration" placeholder="请选择计划随访时间">
            <el-option
              v-for="item in pointOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
    <!-- 新增界面 -->
    <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="200px" :rules="editFormRules" ref="addForm">
        <el-form-item label="随访病人" style="width:350px">
          <el-input v-model="addForm.patientName" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="出院时间">
          <el-date-picker type="date" placeholder="出院日期" v-model="addForm.outTime" disabled></el-date-picker>
        </el-form-item>
        <el-form-item label="计划随访方式" prop="planWay">
          <el-select v-model="addForm.planWay" placeholder="请选择计划随访方式">
            <el-option label="电话" value="电话"></el-option>
            <el-option label="短信" value="短信"></el-option>
            <el-option label="门诊" value="门诊"></el-option>
            <el-option label="造影" value="造影"></el-option>
            <el-option label="其它" value="其它"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划随访时间" prop="planPoint">
          <el-select v-model="addForm.followUpDuration" placeholder="请选择计划随访时间">
            <el-option
              v-for="item in pointOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import util from "../../common/js/util";
import { patientData } from "../../common/js/data";
import { patientApi, recordApi, followApi } from "../../api/api";
export default {
  data() {
    return {
      bloodExam: Object.assign([], patientData.bloodItem),
      liverKidneyExam: Object.assign([], patientData.liverKidneyItem),
      bloodLipidExam: Object.assign([], patientData.bloodLipidItem),
      coagulationExam: Object.assign([], patientData.coagulationItem),
      editLoading: false,
      editFormRules: {
        planWay: [
          { required: true, message: "请选择随访方式", trigger: "blur" }
        ],
        planPoint: [
          { required: true, message: "请选择随访时间", trigger: "blur" }
        ]
      },
      follows: [],
      listLoading: false,
      total: 0,
      editFormVisible: false, //编辑界面是否显示
      addFormVisible: false, //新增界面是否显示
      editForm: {
        patientName: "",
        outTime: "",
        planWay: "",
        medicalHistoryId: "",
        followUpDuration: ""
      },
      addForm: {
        patientName: "",
        outTime: "",
        planWay: "",
        medicalHistoryId: "",
        followUpDuration: ""
      },
      pointOptions: [
        {
          value: "1",
          label: "出院后1个月",
          disabled: false
        },
        {
          value: "3",
          label: "出院后3个月",
          disabled: false
        },
        {
          value: "6",
          label: "出院后6个月",
          disabled: false
        },
        {
          value: "12",
          label: "出院后12个月",
          disabled: false
        },
        {
          value: "18",
          label: "出院后18个月",
          disabled: false
        },
        {
          value: "24",
          label: "出院后24个月",
          disabled: false
        }
      ]
    };
  },
  methods: {
    getDetail: function(page) {
      var params = {
        medicalHistoryId: sessionStorage.getItem("currentMedicalHistory"),
        page: page,
        count: 10
      };
      recordApi.getFollowUp(params).then(res => {
        console.log(JSON.stringify(res));
        if (res.code != "0000") {
          this.$message({
            message: "信息获取失败",
            type: "warning"
          });
          return;
        }
        //随访节点遍历，确定可再增节点
        res.data.forEach(element => {
          switch (element.followUp.followUpDuration) {
            case "1":
              this.pointOptions[0].disabled = true;
              break;
            case "3":
              this.pointOptions[1].disabled = true;
              break;
            case "6":
              this.pointOptions[2].disabled = true;
              break;
            case "12":
              this.pointOptions[3].disabled = true;
              break;
            case "18":
              this.pointOptions[4].disabled = true;
              break;
            case "24":
              this.pointOptions[5].disabled = true;
              break;
            default:
              break;
          }
        });
        this.follows = res.data;
      });
    },
    //显示编辑界面
    addFollowUp: function(index, row) {
      this.addFormVisible = true;
      this.addForm.patientName = sessionStorage.getItem("currentPatientName");
      this.addForm.outTime = sessionStorage.getItem("currentMedicalOutTime");
      this.addForm.followUpDuration = ""
    },
    editFollowUp: function(row) {
      this.editFormVisible = true;
      // console.log(JSON.stringify(row));
      this.editForm.patientName = sessionStorage.getItem("currentPatientName");
      this.editForm.outTime = sessionStorage.getItem("currentMedicalOutTime");
      // this.editForm.outTime = sessionStorage.getItem("currentMedicalOutTime");
      this.editForm.planWay = row.followUp.planWay;
      this.editForm.followUpDuration = row.followUp.followUpDuration;
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // this.$confirm("确认提交吗？", "提示", {}).then(() => {
          //   this.editLoading = true;
          //   this.editFormVisible = false;
          // });

        }
      });
    },
    addSubmit: function() {
      var planTimeUI = util.formatDate.parse(
        this.addForm.outTime,
        "yyyy-MM-dd"
      );
      //确定计划随访时间
      switch (this.addForm.followUpDuration) {
        case "1":
          planTimeUI.setDate(planTimeUI.getDate() + 30);
          break;
        case "3":
          planTimeUI.setDate(planTimeUI.getDate() + 90);
          break;
        case "6":
          planTimeUI.setDate(planTimeUI.getDate() + 180);
          break;
        case "12":
          planTimeUI.setDate(planTimeUI.getDate() + 365);
          break;
        case "18":
          planTimeUI.setDate(planTimeUI.getDate() + 545);
          break;
        case "24":
          planTimeUI.setDate(planTimeUI.getDate() + 730);
          break;
        default:
          break;
      }
      // console.log(planTimeUI)
      //构造添加参数
      var params = {
        planTime: util.formatDate.format(planTimeUI, "yyyy-MM-dd"),
        followUp: {
          planWay: this.addForm.planWay,
          followUpDuration: this.addForm.followUpDuration,
          followUpIndex: parseInt(this.addForm.followUpDuration)
            ? parseInt(this.addForm.followUpDuration)
            : 0,
          medicalHistoryId: sessionStorage.getItem("currentMedicalHistory"),
          doctorId: JSON.parse(sessionStorage.getItem("user")).account.doctorId
        }
      };

      //添加随访记录
      recordApi.addFollowUp(params).then(res => {
        // console.log(JSON.stringify(res));
        this.addFormVisible = false;
        if (res.code !== "0000") {
          this.$message({
            message: "新增失败",
            type: "warning"
          });
          return;
        }
        this.$message({
          message: "新增成功",
          type: "success"
        });
        this.getDetail(1);
      });
    },
    followDetail:function (row) {
      // console.log(JSON.stringify(row))
      sessionStorage.setItem("currentIndex",row.followUp.followUpIndex);
      sessionStorage.setItem("currentFollowUp", row.followUp.followUpId);
      this.$router.push({ path: "/follow" });
    }
  },
  mounted() {
    this.getDetail(1);
  }
};
</script>
<style>
</style>