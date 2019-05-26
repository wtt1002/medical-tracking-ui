<template>
  <div>
    <div>
      <el-form
        ref="followUpDetail"
        :model="followUpDetail"
        label-width="10px"
        @submit.prevent="onSubmit"
        style="margin:20px;width:600px;"
      >
        <el-form-item label>
          <el-col :span="8">
            <label>随访患者</label>
            <el-input v-model="followUpDetail.patientName" style="width:120px"></el-input>
          </el-col>
          <!-- <el-col class="line" :span="4"></el-col> -->
          <el-col :span="16">
            <label>随访医生</label>
            <el-input v-model="followUpDetail.doctorName" style="width:120px"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label>
          <el-col :span="10">
            <label>实际随访方式</label>
            <el-select
              v-model="followUpDetail.followUp.finalWay"
              placeholder="请选择"
              style="width:150px"
            >
              <el-option label="电话" value="电话"></el-option>
              <el-option label="短信" value="短信"></el-option>
              <el-option label="门诊" value="门诊"></el-option>
              <el-option label="造影" value="造影"></el-option>
              <el-option label="其它" value="其它"></el-option>
            </el-select>
          </el-col>
          <!-- <el-col class="line" :span="4"></el-col> -->
          <el-col :span="14">
            <label>实际随访日期</label>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="followUpDetail.finalDateUI"
              style="width: 150px;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label=" ">
          <label>出院后：</label>
          <el-radio-group v-model="followUpDetail.followUp.followUpDuration">
            <el-radio label="1个月" value="1"></el-radio>
            <el-radio label="3个月" value="3"></el-radio>
            <el-radio label="6个月" value="6"></el-radio>
            <el-radio label="12个月" value="12"></el-radio>
            <el-radio label="18个月" value="18"></el-radio>
            <el-radio label="24个月" value="24"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" ">
          <label>目前恢复：</label>
          <el-radio-group v-model="followUpDetail.followUp.recoveryStatus">
            <el-radio label="很好" value="很好"></el-radio>
            <el-radio label="好" value="好"></el-radio>
            <el-radio label="一般" value="一般"></el-radio>
            <el-radio label="差" value="差"></el-radio>
            <el-radio label="死亡" value="死亡"></el-radio>
            <el-radio label="植物人" value="植物人"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" ">
          <label>是否到院复诊：</label>
          <el-radio-group v-model="followUpDetail.followUp.furtherConsultation">
            <el-radio label="本院复诊" value="本院复诊"></el-radio>
            <el-radio label="外院复诊" value="外院复诊"></el-radio>
            <el-radio label="无复诊" value="无复诊"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label>
          <!-- <el-checkbox-group v-model="followUp.recentSymptoms">
            <label>最近是否出现：</label>
            <el-checkbox label="住院" name="type"></el-checkbox>
            <el-checkbox label="急诊观察" name="type"></el-checkbox>
            <el-checkbox label="死亡" name="type"></el-checkbox>
            <el-checkbox label="以上均未出现" name="type"></el-checkbox>
          </el-checkbox-group>-->
          <label>最近是否出现：</label>
          <el-radio-group v-model="followUpDetail.followUp.recentSymptoms">
            <el-radio label="住院" value="住院"></el-radio>
            <el-radio label="急诊观察" value="急诊观察"></el-radio>
            <el-radio label="死亡" value="死亡"></el-radio>
            <el-radio label="以上均未出现" value="以上均未出现"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save" :loading="editLoading">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="contentwrap" class="contentwrap">
      <ul class="tab">
        <li
          id="li_stage"
          :class="['li', tabIndex === 0 ? 'current' : '']"
          @click="changeTab(0,'FUDiseaseHistoryPage')"
        >
          <span>出院病史</span>
        </li>
        <li
          id="li_class"
          :class="['li', tabIndex === 1 ? 'current' : '']"
          @click="changeTab(1,'FUCheckBodyPage')"
        >
          <span>查体</span>
        </li>
        <li
          id="li_photo"
          :class="['li', tabIndex === 2 ? 'current' : '']"
          @click="changeTab(2,'AdmissionCheckPage')"
        >
          <span>康复检查项目</span>
        </li>
        <li
          id="li_stage"
          :class="['li', tabIndex === 3 ? 'current' : '']"
          @click="changeTab(3,'ExamPage')"
        >
          <span>化验检查</span>
        </li>
        <li
          id="li_class"
          :class="['li', tabIndex === 4 ? 'current' : '']"
          @click="changeTab(4,'FUSideEffectPage')"
        >
          <span>不良反应</span>
        </li>
        <li
          id="li_photo"
          :class="['li', tabIndex === 5 ? 'current' : '']"
          @click="changeTab(5,'FUBodyRiskFactorPage')"
        >
          <span>个体化危险因素控制情况</span>
        </li>
        <li
          id="li_photo"
          :class="['li', tabIndex === 6 ? 'current' : '']"
          @click="changeTab(6,'DrugPlanPage')"
        >
          <span>药物方案</span>
        </li>
        <li
          id="li_photo"
          :class="['li', tabIndex === 7 ? 'current' : '']"
          @click="changeTab(7,'FollowUpPage')"
        >
          <span>随访记录</span>
        </li>
      </ul>
    </div>
    <component v-bind:is="trialDetailChoose"></component>
  </div>
</template>

<script>
import util from "../../common/js/util";
import { recordApi } from "../../api/api";
export default {
  data() {
    return {
      tabIndex: 0,
      trialDetailChoose: "FUDiseaseHistoryPage",
      editLoading:false,
      followUpDetail: {
        patientName: "",
        doctorName: "",
        finalDateUI: new Date(),
        realTime: "",
        followUp: {
          followUpId: "",
          medicalHistoryId: "",
          doctorId: "",
          finalTime: null,
          planWay: null,
          finalWay: null,
          followUpDuration: "",
          recoveryStatus: "",
          furtherConsultation: "",
          recentSymptoms: "",
          followUpIndex: ""
        }
      }
    };
  },
  components: {
    FUDiseaseHistoryPage: resolve => {
      require(["@/components/fu-pages/FUDiseaseHistoryPage.vue"], resolve);
    },
    ExamPage: resolve => {
      require(["@/components/mh-pages/ExamPage.vue"], resolve);
    },
    AdmissionCheckPage: resolve => {
      require(["@/components/mh-pages/AdmissionCheckPage.vue"], resolve);
    },
    FUBodyRiskFactorPage: resolve => {
      require(["@/components/fu-pages/FUBodyRiskFactorPage.vue"], resolve);
    },
    FollowUpPage: resolve => {
      require(["@/components/mh-pages/FollowUpPage.vue"], resolve);
    },
    FUSideEffectPage: resolve => {
      require(["@/components/fu-pages/FUSideEffectPage.vue"], resolve);
    },
    FUCheckBodyPage: resolve => {
      require(["@/components/fu-pages/FUCheckBodyPage.vue"], resolve);
    },
    DrugPlanPage: resolve => {
      require(["@/components/mh-pages/DrugPlanPage.vue"], resolve);
    }
  },

  methods: {
    onSubmit() {
      console.log("submit!");
    },
    testqqq(data) {
      console.log(data);
    },
    changeTab(index, tab) {
      console.log(index, tab);
      this.tabIndex = index;
      this.trialDetailChoose = tab;
    },
    getDetail() {
      var params = 1;
      recordApi.getFollowUpDetail(params).then(res => {
        // console.log(JSON.stringify(res));
        if (res.code !== "0000") {
          this.$message({
            message: "res.msg",
            type: "warning"
          });
          return;
        }

        this.patientName = res.data.patientName;
        this.doctorName = res.data.doctorName;
        this.followUpDetail = { ...this.followUpDetail, ...res.data };
        try {
          this.followUpDetail.finalDateUI = util.formatDate.parse(
            res.data.realTime,
            "yyyy-MM-dd"
          );
        } catch (error) {
          this.finalDateUI = null;
        }
      });
    },
    save: function() {
      this.editLoading = true;
      this.followUpDetail.realTime = util.formatDate.format(
        this.followUpDetail.finalDateUI,
        "yyyy-MM-dd"
      );
      //将LocalDate类型数据置空
      this.followUpDetail.followUp.planTime = null;
      this.followUpDetail.followUp.finalTime = null;
      recordApi.updateFollowUpDetail(this.followUpDetail).then(res => {
        this.editLoading = false;
        if (res.code !== "0000") {
          this.$message({
            message: "res.msg",
            type: "warning"
          });
          return;
        }
        this.$message({
          message: "更新成功",
          type: "success"
        });
      });
    }
  },
  created() {
    this.getDetail();
  }
};
</script>
<style>
.contentwrap {
  width: 98%;
  margin: 0 auto;
  padding: 10px;
}
ul {
  list-style: none;
  margin: 0;
  padding-left: 20px;
}
ul.tab {
  border-bottom: 1px solid #ccc;
  padding-bottom: 1px;
  height: 30px;
  line-height: 30px;
  color: #696969;
}
ul.tab li {
  float: left;
  font-family: "微软雅黑";
  cursor: pointer;
  padding: 0px;
}
ul.tab li.li {
  padding: 0px 25px 0px;
  font-size: 13px;
  height: 30px;
  line-height: 30px;
  background: #f4f5f9;
  border-top: 1px solid #c5d0dc;
  border-left: 1px solid #c5d0dc;
  border-bottom: 1px solid #c5d0dc;
}
ul.tab li.current {
  border-bottom: 0px;
  border-top: 2px solid #7599de;
  font-size: 13px;
  color: #343434;
  background: #ffffff;
}
ul.tab li.li:last-child {
  border-right: 1px solid #c5d0dc;
}
</style>
