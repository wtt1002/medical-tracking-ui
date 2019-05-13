<template>
  <div>
    <div>
      <el-form
        ref="followUp"
        :model="followUp"
        label-width="80px"
        @submit.prevent="onSubmit"
        style="margin:20px;width:60%;min-width:600px;"
      >
        <el-form-item label="随访患者">
          <el-input v-model="followUp.patientName"></el-input>
        </el-form-item>
        <el-form-item label="随访医生">
          <el-input v-model="followUp.doctorName"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="followUp.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="followUp.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              type="fixed-time"
              placeholder="选择时间"
              v-model="followUp.date2"
              style="width: 100%;"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch on-text off-text v-model="followUp.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="followUp.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="followUp.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="followUp.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">立即创建</el-button>
          <el-button @click.native.prevent>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="contentwrap" class="contentwrap">
      <ul class="tab">
        <li
          id="li_stage"
          :class="['li', tabIndex === 0 ? 'current' : '']"
          @click="changeTab(0,'HistoryPage')"
        >
          <span>患者病历</span>
        </li>
        <li
          id="li_class"
          :class="['li', tabIndex === 1 ? 'current' : '']"
          @click="changeTab(1,'AssessmentPage')"
        >
          <span>入院评估</span>
        </li>
        <li
          id="li_photo"
          :class="['li', tabIndex === 2 ? 'current' : '']"
          @click="changeTab(2,'AdmissionCheckPage')"
        >
          <span>入院康复检查项目</span>
        </li>
        <li
          id="li_stage"
          :class="['li', tabIndex === 3 ? 'current' : '']"
          @click="changeTab(3,'ExamPage')"
        >
          <span>辅助检查</span>
        </li>
        <li
          id="li_class"
          :class="['li', tabIndex === 4 ? 'current' : '']"
          @click="changeTab(4,'PCIPage')"
        >
          <span>冠脉介入</span>
        </li>
        <li
          id="li_photo"
          :class="['li', tabIndex === 5 ? 'current' : '']"
          @click="changeTab(5,'ConclusionPage')"
        >
          <span>出院小结</span>
        </li>
        <li
          id="li_photo"
          :class="['li', tabIndex === 6 ? 'current' : '']"
          @click="changeTab(6,'DrugPlanPage')"
        >
          <span>用药方案</span>
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
export default {
  data() {
    return {
      tabIndex: 0,
      trialDetailChoose: "HistoryPage",
      followUp: {
        patientName: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
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
