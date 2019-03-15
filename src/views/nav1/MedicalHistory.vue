<template>
  <el-tabs type="border-card" style="margin-top:10px">
    <el-tab-pane>
      <span slot="label">
        <i class="el-icon-date"></i> 患者病历
      </span>
      <HistoryPage></HistoryPage>
    </el-tab-pane>
    <el-tab-pane label="入院评估">
      <AssessmentPage></AssessmentPage>
    </el-tab-pane>
    <el-tab-pane label="入院康复检查项目">
      <AdmissionCheckPage></AdmissionCheckPage>
    </el-tab-pane>
    <el-tab-pane label="辅助检查">
      <ExamPage></ExamPage>
    </el-tab-pane>
    <el-tab-pane label="冠脉介入">
      <PCIPage></PCIPage>
    </el-tab-pane>
    <el-tab-pane label="出院小结">
      <ConclusionPage></ConclusionPage>
    </el-tab-pane>
    <el-tab-pane label="用药方案">用药方案</el-tab-pane>
    <el-tab-pane label="随访记录">
      <FollowUpPage></FollowUpPage>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import HistoryPage from "@/components/mh-pages/HistoryPage.vue";
import ExamPage from "@/components/mh-pages/ExamPage.vue";
import AdmissionCheckPage from "@/components/mh-pages/AdmissionCheckPage.vue";
import ConclusionPage from "@/components/mh-pages/ConclusionPage.vue";
import FollowUpPage from "@/components/mh-pages/FollowUpPage.vue";
import PCIPage from "@/components/mh-pages/PCIPage.vue";
import AssessmentPage from "@/components/mh-pages/AssessmentPage.vue";
export default {
  data() {
    return {};
  },

  components: {
    HistoryPage,
    ExamPage,
    AdmissionCheckPage,
    ConclusionPage,
    FollowUpPage,
    PCIPage,
    AssessmentPage
  },

  methods: {}
};
</script>