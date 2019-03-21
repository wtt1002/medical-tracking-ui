<template>
  <div>
    <div id="contentwrap" class="contentwrap">
      <ul class="tab">
        <li id="li_stage" :class="['li', tabIndex === 0 ? 'current' : '']" @click="changeTab(0,'HistoryPage')">
          <span>患者病历</span>
        </li>
        <li id="li_class" :class="['li', tabIndex === 1 ? 'current' : '']" @click="changeTab(1,'AssessmentPage')">
          <span>入院评估</span>
        </li>
        <li id="li_photo" :class="['li', tabIndex === 2 ? 'current' : '']" @click="changeTab(2,'AdmissionCheckPage')">
          <span>入院康复检查项目</span>
        </li>
        <li id="li_stage" :class="['li', tabIndex === 3 ? 'current' : '']" @click="changeTab(3,'ExamPage')">
          <span>辅助检查</span>
        </li>
        <li id="li_class" :class="['li', tabIndex === 4 ? 'current' : '']" @click="changeTab(4,'PCIPage')">
          <span>冠脉介入</span>
        </li>
        <li id="li_photo" :class="['li', tabIndex === 5 ? 'current' : '']" @click="changeTab(5,'ConclusionPage')">
          <span>出院小结</span>
        </li>
        <li id="li_photo" :class="['li', tabIndex === 6 ? 'current' : '']" @click="changeTab(6,'DrugPlanPage')">
          <span>用药方案</span>
        </li>
        <li id="li_photo" :class="['li', tabIndex === 7 ? 'current' : '']" @click="changeTab(7,'FollowUpPage')">
          <span>随访记录</span>
        </li>
      </ul>
    </div>
    <component v-bind:is="trialDetailChoose"></component>
  </div>

  <!-- <el-tabs type="border-card" style="margin-top:10px" @tab-click="changeTab" >
    <el-tab-pane lazy=true>
      <span slot="label">
        <i class="el-icon-date"></i> 患者病历
      </span>
      <HistoryPage></HistoryPage>
    </el-tab-pane>
    <el-tab-pane label="入院评估" lazy="true">
      <AssessmentPage></AssessmentPage>
    </el-tab-pane>
    <el-tab-pane label="入院康复检查项目" lazy="true">
      <AdmissionCheckPage></AdmissionCheckPage>
    </el-tab-pane>
    <el-tab-pane label="辅助检查" lazy="true">
      <ExamPage></ExamPage>
    </el-tab-pane>
    <el-tab-pane label="冠脉介入" lazy="true">
      <PCIPage></PCIPage>
    </el-tab-pane>
    <el-tab-pane label="出院小结" lazy="true">
      <ConclusionPage></ConclusionPage>
    </el-tab-pane>
    <el-tab-pane label="用药方案" lazy="true">
      <DrugPlanPage></DrugPlanPage>
    </el-tab-pane>
    <el-tab-pane label="随访记录" lazy="true">
      <FollowUpPage></FollowUpPage>
    </el-tab-pane>
  </el-tabs>-->
</template>

<script>
// import HistoryPage from "@/components/mh-pages/HistoryPage.vue";
// import ExamPage from "@/components/mh-pages/ExamPage.vue";
// import AdmissionCheckPage from "@/components/mh-pages/AdmissionCheckPage.vue";
// import ConclusionPage from "@/components/mh-pages/ConclusionPage.vue";
// import FollowUpPage from "@/components/mh-pages/FollowUpPage.vue";
// import PCIPage from "@/components/mh-pages/PCIPage.vue";
// import AssessmentPage from "@/components/mh-pages/AssessmentPage.vue";
// import DrugPlanPage from "@/components/mh-pages/DrugPlanPage.vue";
// import { resolve } from 'dns';
export default {
  data() {
    return {
      tabIndex: 0,
      trialDetailChoose: "HistoryPage"
    };
  },
  components: {
    HistoryPage: resolve => {
      require(["@/components/mh-pages/HistoryPage.vue"], resolve);
    },
    ExamPage: resolve => {
      require(["@/components/mh-pages/ExamPage.vue"], resolve);
    },
    AdmissionCheckPage: resolve => {
      require(["@/components/mh-pages/AdmissionCheckPage.vue"], resolve);
    },
    ConclusionPage: resolve => {
      require(["@/components/mh-pages/ConclusionPage.vue"], resolve);
    },
    FollowUpPage: resolve => {
      require(["@/components/mh-pages/FollowUpPage.vue"], resolve);
    },
    PCIPage: resolve => {
      require(["@/components/mh-pages/PCIPage.vue"], resolve);
    },
    AssessmentPage: resolve => {
      require(["@/components/mh-pages/AssessmentPage.vue"], resolve);
    },
    DrugPlanPage: resolve => {
      require(["@/components/mh-pages/DrugPlanPage.vue"], resolve);
    }
  },

  methods: {
    testqqq(data) {
      console.log(data);
    },
    changeTab(index,tab) {
      console.log(index,tab);
      this.tabIndex = index
      this.trialDetailChoose = tab;
      // this.trialDetailChoose =
      // switch (tab){
      //   case 0: this.trialDetailChoose = 'HistoryPage';
      //           break;
      //   case 1: this.trialDetailChoose = 'AssessmentPage';
      //           break;
      //   default: this.trialDetailChoose = 'ExamPage';
      //   break;
      // }
    }
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
