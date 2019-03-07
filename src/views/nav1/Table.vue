<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getPatients">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="patients"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%;"
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column type="index" width="55"></el-table-column>
      <el-table-column label="" width="80">
        <template scope="scope">
          <el-button type="primary" size="small" @click="patientCase(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="patient.name" label="姓名" width="100" sortable></el-table-column>
      <el-table-column prop="patient.gender" label="性别" width="100" :formatter="formatSex" sortable></el-table-column>
      <el-table-column prop="birthday" label="出生日期" width="120" sortable></el-table-column>
      <el-table-column prop="patient.age" label="年龄" width="90" sortable></el-table-column>
      <el-table-column prop="patient.sickAge" label="发病年龄" width="120" sortable></el-table-column>
      <!-- <el-table-column prop="inTime" label="最新入院时间" width="100" :formatter="formatSex" sortable>
			</el-table-column>
			<el-table-column prop="outTime" label="最新出院时间" width="100" :formatter="formatSex" sortable>
      </el-table-column>-->
      <el-table-column prop="mainDiagnose" label="最新诊断" width="160" sortable></el-table-column>
      <el-table-column prop="patient.numId" label="身份证号" width="180" sortable></el-table-column>
      <el-table-column prop="patient.mobilePhone" label="手机" width="140" sortable></el-table-column>
      <!-- <el-table-column prop="patient.emergePeople" label="紧急联系人" width="180" sortable>
      </el-table-column>-->
      <el-table-column prop="patient.emergePhone" label="紧急联系人" width="140" sortable></el-table-column>
      <el-table-column prop="patient.address" label="地址" width="180" sortable></el-table-column>
      <!-- <el-table-column prop="addr" label="地址" min-width="180" sortable>
      </el-table-column>-->
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="10"
        :total="total"
        style="float:right;"
      ></el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
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
import { patientApi } from "../../api/api";

export default {
  data() {
    return {
      filters: {
        name: ""
      },
      patients: [],
      total: 0,
      page: 1,
      count: 10,
      listLoading: false,
      sels: [], //列表选中列

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        name: "",
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
      },
    };
  },
  methods: {
    //性别显示转换
    formatSex: function(row, column) {
      return row.patient.gender == "1"
        ? "男"
        : row.patient.gender == "0"
        ? "女"
        : "未知";
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getPatients();
    },
    //获取用户列表
    getPatients() {
      let para = {
        page: this.page,
        count: this.count,
        filter: this.filters.name
      };
      this.listLoading = true;
      //NProgress.start();
      patientApi.getPatientListPage(para).then(res => {
        if (res.code != "0000") {
          this.$message({
            message: "删除失败",
            type: "warning"
          });
          return;
        }
        this.total =
          res.data && res.data[0] && res.data[0].total ? res.data[0].total : 0;
        this.patients = res.data;
        this.listLoading = false;
        //NProgress.done();
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = row.patient.patientId;
          patientApi.removePatient(para).then(res => {
            if (res.code !== "0000") {
              this.$message({
                message: "删除失败",
                type: "warning"
              });
              this.getPatients();
              return;
            }
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getPatients();
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      patientApi.getPatient(row.patient.patientId).then(res => {
        this.editForm = { ...this.editForm, ...res.data.patient };
        this.editForm.birth = util.formatDate.parse(
          res.data.birthdayStr,
          "yyyy-MM-dd"
        );
      });
    },
    //patientCase
    patientCase:function(index, row){
      sessionStorage.setItem("currentPatient",row.patient.patientId);
      this.$router.push({ path: "/records"});
    },
    //显示新增界面
    handleAdd: function() {
      this.$router.push({ path: "/addPatient" });
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
              this.getPatients();
            });
          });
        }
      });
    },

    selsChange: function(sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function() {
      // console.log(JSON.stringify(this.sels))
      // var ids = this.sels.map(item => item.patient.patientId).toString();
      // console.log(JSON.stringify(ids))
      // ids = [4,13];
      // console.log(JSON.stringify(ids))
      console.log("9999999");
      var ids = [];
      this.sels.forEach(item => {
        ids.push(item.patient.patientId.toString());
      });
      console.log(JSON.stringify(ids));
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          patientApi.batchRemovePatient(ids).then(res => {
            console.log(JSON.stringify(res));
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getPatients();
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getPatients();
  }
};
</script>

<style scoped>
</style>