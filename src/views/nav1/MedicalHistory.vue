<template>
  <el-tabs type="border-card" style="margin-top:10px">
    <el-tab-pane>
      <span slot="label">
        <i class="el-icon-date"></i> 我的行程
      </span>
	  <HistoryPage></HistoryPage>
    </el-tab-pane>
    <el-tab-pane label="消息中心" :disabled="true">
		<HistoryPage></HistoryPage>
    </el-tab-pane>
    <el-tab-pane label="角色管理">入院检查</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<script>
import HistoryPage from "@/components/mh-pages/HistoryPage.vue";
export default {
  data() {
    return {
    };
  },

  components: {
    HistoryPage
  },

  methods: {
  }
};
</script>