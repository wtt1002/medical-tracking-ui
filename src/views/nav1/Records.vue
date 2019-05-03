<template>
  <section>
    <el-col :span="8" style=" background-color:#F2F6FC">
      <el-form
        :model="editForm"
        label-width="120px"
        :rules="editFormRules"
        ref="editForm"
        style="margin:auto; width:10%;min-width:400px;background-color:#F2F6FC"
      >
        <el-form-item label prop></el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="editForm.gender" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="民族">
          <el-input v-model="editForm.nation" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="editForm.age" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="发病年龄">
          <el-input v-model="editForm.sickAge" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <!-- <el-input v-model="editForm.birth" auto-complete="off"></el-input> -->
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth" :disabled="true"></el-date-picker>
        </el-form-item>
        <el-form-item label="省份证号" prop="numId">
          <el-input v-model="editForm.numId" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobilePhone">
          <el-input v-model="editForm.mobilePhone" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="座机号">
          <el-input v-model="editForm.telPhone" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人">
          <el-input v-model="editForm.emergePeople" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人电话">
          <el-input v-model="editForm.emergePhone" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="与患者关系">
          <el-input v-model="editForm.emergeRelationship" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="婚姻状况">
          <el-input v-model="editForm.married" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="患者职业">
          <el-input v-model="editForm.profession" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="职业状态">
          <el-input v-model="editForm.professionStatus" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="文化程度">
          <el-input v-model="editForm.education" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="年收入">
          <el-input v-model="editForm.income" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editForm.address" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-button @click.native="addFormVisible = false">取消</el-button> -->
          <el-button type="primary" @click="editPatient">编辑</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="16">
      <el-table :data="records" style="margin:0 10px; width: 100%">
        <!-- <el-table-column type="index" width="55"></el-table-column> -->
        <!-- <el-table-column label width="80">
          <el-button size="small" @click="historyDetail(scope.$index, scope.row)">详情</el-button>
        </el-table-column> -->
        <el-table-column label width="80">
          <template scope="scope">
            <el-button type="primary" size="small" @click="historyDetail(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="inTime" label="入院时间" width="150"></el-table-column>
        <el-table-column prop="outTime" label="出院时间" width="150"></el-table-column>
        <el-table-column prop="operateDoc" label="介入术者" width="120"></el-table-column>
        <el-table-column prop="mainDiagnose" label="主要诊断" width="230"></el-table-column>
        <el-table-column prop="riskFactor" label="高危因素" width="250"></el-table-column>
        <el-table-column label="操作">
          <el-button size="small" type="danger" @click="delRecord">删除</el-button>
        </el-table-column>
        <!-- <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="margin:10px">
        <el-button type="primary" @click="addMedicalHistory">新增患者病历</el-button>
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="10"
          :total="total"
          style="float:right;"
        ></el-pagination>
      </el-col>
    </el-col>

    <!--编辑界面-->
    <el-dialog
      title="编辑"
      v-model="editFormVisible"
      :close-on-click-modal="false"
      style="width: 100%;"
    >
      <el-form
        :model="editForm"
        label-width="160px"
        :rules="editFormRules"
        ref="editForm"
        style="width: 80%;"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.gender">
            <el-radio class="radio" label="1">男</el-radio>
            <el-radio class="radio" label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="民族">
          <el-select v-model="editForm.nation" placeholder="请选择民族">
            <el-option label="汉族" value="汉族"></el-option>
            <el-option label="壮族" value="壮族"></el-option>
            <el-option label="满族" value="满族"></el-option>
            <el-option label="回族" value="回族"></el-option>
            <el-option label="苗族" value="苗族"></el-option>
            <el-option label="维吾尔族" value="维吾尔族"></el-option>
            <el-option label="彝族" value="彝族"></el-option>
            <el-option label="土家族" value="土家族"></el-option>
            <el-option label="蒙古族" value="蒙古族"></el-option>
            <el-option label="藏族" value="藏族"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="发病年龄">
          <el-input-number v-model="editForm.sickAge" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="省份证号" prop="numId">
          <el-input v-model="editForm.numId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobilePhone">
          <el-input v-model="editForm.mobilePhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="座机号">
          <el-input v-model="editForm.telphone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人">
          <el-input v-model="editForm.emergePeople" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人电话">
          <el-input v-model="editForm.emergePhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="与患者关系">
          <el-select v-model="editForm.emergeRelationship" placeholder="请选择患者关系">
            <el-option label="配偶" value="配偶"></el-option>
            <el-option label="子女" value="子女"></el-option>
            <el-option label="朋友" value="朋友"></el-option>
            <el-option label="亲戚" value="亲戚"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="婚姻状况">
          <el-select v-model="editForm.married" placeholder="请选择婚姻状况">
            <el-option label="未婚" value="未婚"></el-option>
            <el-option label="已婚" value="已婚"></el-option>
            <el-option label="离异" value="离异"></el-option>
            <el-option label="丧偶" value="丧偶"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="患者职业">
          <el-input v-model="editForm.profession" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职业状态">
          <el-select v-model="editForm.profession_status" placeholder="请选择职业状态">
            <el-option label="在职" value="在职"></el-option>
            <el-option label="退休" value="退休"></el-option>
            <el-option label="无业" value="无业"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文化程度">
          <el-select v-model="editForm.education" placeholder="请选择文化程度">
            <el-option label="小学及以下" value="小学及以下"></el-option>
            <el-option label="初中" value="初中"></el-option>
            <el-option label="高中" value="高中"></el-option>
            <el-option label="大学及以上" value="大学及以上"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年收入">
          <el-select v-model="editForm.income" placeholder="请选择年收入">
            <el-option label="5万以下" value="5万以下"></el-option>
            <el-option label="5-10万" value="5-10万"></el-option>
            <el-option label="10万以上" value="10万以上"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="editForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from "../../common/js/util";
//import NProgress from 'nprogress'
import { patientApi, recordApi } from "../../api/api";

export default {
  data() {
    return {
      filters: {
        name: ""
      },
      records: [],
      total: 0,
      page: 1,
      count: 10,
      listLoading: false,
      sels: [], //列表选中列
      patientId: "",
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        numId: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
        mobilePhone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        gender: [{ required: true, message: "请输入性别", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        name: "wwwwwww",
        gender: -1,
        nation: "",
        age: 0,
        sickAge: "",
        birth: "",
        numId: "",
        mobilePhone: "",
        telPhone: "",
        emergePeople: "",
        emergePhone: "",
        emergeRelationship: "",
        married: "",
        profession: "",
        professionStatus: "",
        education: "",
        income: "",
        address: ""
      }
    };
  },

  methods: {
    addMedicalHistory: function() {
      this.$router.push({ path: "/addHistory" });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getRecords();
    },
    //性别显示转换
    formatSex: function(row, column) {
      return row.patient.gender == "1"
        ? "男"
        : row.patient.gender == "0"
        ? "女"
        : "未知";
    },
    //获取用户列表
    getRecords() {
      this.patientId = parseInt(sessionStorage.getItem("currentPatient"));
      let para = {
        page: this.page,
        count: this.count,
        patientId: this.patientId
      };
      this.listLoading = true;
      //NProgress.start();
      recordApi.getRecordsListPage(para).then(res => {
        console.log(JSON.stringify(res));
        if (res.code != "0000") {
          this.$message({
            message: "获取患者病历失败",
            type: "warning"
          });
          return;
        }
        //清空数据
        this.records = [];
        res.data.forEach(element => {
          var temp = element;
          var diagnoes = JSON.parse(element.mainDiagnose);
          temp.mainDiagnose = diagnoes ? diagnoes.toString() : "";
          var risk = JSON.parse(element.riskFactor);
          temp.riskFactor = risk.riskBriefFactorUI.toString();
          this.total = element.total;
          this.records.push(temp);
        });
        // this.records = res.data;
        // console.log(JSON.stringify(this.records));
      });
      //   patientApi.getPatientListPage(para).then(res => {
      //     if (res.code != "0000") {
      //       this.$message({
      //         message: "删除失败",
      //         type: "warning"
      //       });
      //       return;
      //     }
      //     this.total =
      //       res.data && res.data[0] && res.data[0].total ? res.data[0].total : 0;
      //     this.patients = res.data;
      //     this.listLoading = false;
      //     //NProgress.done();
      //   });
    },
    /**
     * 获取患者详情
     */
    getPatientInfo() {
      this.patientId = sessionStorage.getItem("currentPatient");
      console.log("patientId...." + this.patientId);
      //   if (this.patientId == "") {
      //     return;
      //   }
      patientApi.getPatient(this.patientId).then(res => {
        if (res.code !== "0000") {
          this.$message({
            message: "未查询到患者信息",
            type: "warning"
          });
          return;
        }
        this.editForm = { ...this.editForm, ...res.data.patient };
        this.editForm.birth = res.data.birthdayStr;
      });
    },
    //删除
    delRecord: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      });
      // .then(() => {
      //   this.listLoading = true;
      //   //NProgress.start();
      //   let para = row.patient.patientId;
      //   patientApi.removePatient(para).then(res => {
      //     if (res.code !== "0000") {
      //       this.$message({
      //         message: "删除失败",
      //         type: "warning"
      //       });
      //       this.getRecords();
      //       return;
      //     }
      //     this.listLoading = false;
      //     //NProgress.done();
      //     this.$message({
      //       message: "删除成功",
      //       type: "success"
      //     });
      //     this.getRecords();
      //   });
      // })
      // .catch(() => {});
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            para.birth =
              !para.birth || para.birth == ""
                ? ""
                : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            para.gender = para.gender.toString();
            para.age = para.age.toString();
            para.sickAge = para.sickAge.toString();
            para.birthday = null;
            let params = {
              patient: para,
              birthdayStr: para.birth
            };
            patientApi.savePatient(params).then(res => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getPatientInfo();
            });
          });
        }
      });
    },

    //患者编辑
    editPatient() {
      this.editFormVisible = true;
    },
    //查看病历详情
    historyDetail: function(index, row) {
      sessionStorage.setItem("currentMedicalHistory", row.medicalHistoryId);
      this.$router.push({ path: "/mhistory" });
    }
  },
  mounted() {
    this.getRecords();
    this.getPatientInfo();
  },
  created() {
    // this.patientId = this.$route.query.patientId;
  }
};
</script>

<style scoped>
</style>