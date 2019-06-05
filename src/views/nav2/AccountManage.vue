<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getAccounts">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="accounts"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%;"
    >
      <!-- <el-table-column type="selection" width="40"></el-table-column> -->
      <el-table-column type="index" width="55"></el-table-column>
      <el-table-column prop="doctor.doctorName" label="姓名" sortable></el-table-column>
      <el-table-column prop="doctor.doctorNum" label="医生编号" sortable></el-table-column>
      <el-table-column prop="account.loginMobile" label="登录账号" sortable></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="handleChange(scope.$index, scope.row)">修改登录密码</el-button>
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="10"
        :total="total"
        style="float:right;"
      ></el-pagination>
    </el-col>

    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addAccount" label-width="100px" :rules="addFormRules" ref="addAccount">
        <el-form-item label="登录手机号" prop="name">
          <el-input v-model="addAccount.loginMobile" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="addAccount.loginPassword" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="绑定医生">
          <el-select v-model="addAccount.doctorId" placeholder="请选择医生">
            <el-option
              v-for="doctor in doctors"
              :key="doctor.doctorId"
              :value="doctor.doctorId"
              :label="doctor.doctorName"
            >{{doctor.doctorName}}({{doctor.doctorNum}})</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editAccount" label-width="100px" :rules="editFormRules" ref="editAccount">
        <el-form-item label="登录手机号" prop="name">
          <el-input v-model="editAccount.loginMobile" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="绑定医生">
          <el-select v-model="editAccount.doctorId" placeholder="请选择医生">
            <el-option
              v-for="doctor in doctors"
              :key="doctor.doctorId"
              :value="doctor.doctorId"
              :label="doctor.doctorName"
            >{{doctor.doctorName}}({{doctor.doctorNum}})</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!-- 修改密码 -->
    <el-dialog title="修改密码" v-model="changePsVisible" :close-on-click-modal="false">
      <el-form
        :model="changePsAccount"
        label-width="100px"
        :rules="editFormRules"
        ref="changePsAccount"
      >
        <el-form-item label="登录手机号" prop="name" :readonly="true">
          <el-input
            v-model="changePsAccount.loginMobile"
            auto-complete="off"
            style="width:50%"
            :readonly="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="绑定医生">
          <el-select v-model="changePsAccount.doctorId" placeholder="请选择医生" :readonly="true">
            <el-option
              v-for="doctor in doctors"
              :key="doctor.doctorId"
              :value="doctor.doctorId"
              :label="doctor.doctorName"
            >{{doctor.doctorName}}({{doctor.doctorNum}})</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="changePsAccount.loginPassword" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="changePsVisible = false">取消</el-button>
        <el-button type="primary" @click.native="changePsSubmit" :loading="changeLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from "../../common/js/util";
//import NProgress from 'nprogress'
import { patientApi, userApi } from "../../api/api";
var lodash = require("lodash");
export default {
  data() {
    return {
      filters: {
        name: ""
      },
      doctors: [],
      accounts: [],
      total: 0,
      page: 1,
      count: 10,
      listLoading: false,
      sels: [], //列表选中列
      addFormVisible: false,
      addLoading: false,
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      changePsVisible: false,
      changeLoading: false,
      editFormRules: {},
      addFormRules: {},
      dataUnit: {
        loginMobile: "",
        loginPassword: "",
        doctorId: ""
      },
      //新增界面数据
      addAccount: {
        loginMobile: "",
        loginPassword: "",
        doctorId: ""
      },
      //编辑界面数据
      editAccount: {
        loginMobile: "",
        doctorId: ""
      },
      changePsAccount: {
        loginMobile: "",
        loginPassword: "",
        doctorId: ""
      },
      editIndex: 0
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getAccounts();
    },

    /**
     * 获取账号列表
     */
    getAccounts() {
      let para = {
        page: this.page,
        count: this.count,
        filter: this.filters.name
      };
      this.listLoading = true;
      // NProgress.start();
      userApi.getAccountListPage(para).then(res => {
        // console.log(JSON.stringify(res));
        if (res.code != "0000") {
          this.$message({
            message: "查询失败",
            type: "warning"
          });
          return;
        }
        this.total =
          res.data && res.data[0] && res.data[0].total ? res.data[0].total : 0;
        this.accounts = [];
        this.accounts = res.data;
        this.accounts.slice(0);
        this.listLoading = false;
        //NProgress.done();
      });
    },

    /**
     * 删除
     */
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          userApi.deleteAccount(row.account.accountId).then(res => {
            if (res.code !== "0000") {
              this.$message({
                message: "删除失败",
                type: "warning"
              });
              this.getAccounts();
              return;
            }
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getAccounts();
          });
        })
        .catch(() => {});
    },
    /**
     * 显示编辑界面
     */
    handleEdit: function(index, row) {
      this.editIndex = index;
      this.editFormVisible = true;
      var rowData = lodash.cloneDeep(row.account);
      this.editAccount = lodash.cloneDeep(this.dataUnit);
      this.editAccount = { ...this.editAccount, ...rowData };
      //   console.log(JSON.stringify(this.editAccount));
      this.getDoctors();
    },

    /**
     * 显示新增界面
     */
    handleAdd: function() {
      this.addFormVisible = true;
      this.addAccount = lodash.cloneDeep(this.dataUnit);
      this.getDoctors();
    },

    handleChange: function(index, row) {
      this.changePsVisible = true;
      this.changePsAccount = lodash.cloneDeep(this.dataUnit);
      this.changePsAccount = { ...this.changePsAccount, ...row.account };
      this.getDoctors();
    },

    /**
     * 编辑
     */
    editSubmit: function() {
      this.editLoading = true;
      userApi.updateAccount(this.editAccount).then(res => {
        this.editFormVisible = false;
        // console.log(JSON.stringify(res));
        this.editLoading = false;
        if (res.code !== "0000") {
          this.$message({
            message: "更新失败",
            type: "warning"
          });
          return;
        }
        // this.$set(this.accounts.account,this.editIndex,this.editAccount)
        this.$message({
          message: "更新成功",
          type: "success"
        });
      });
      this.getAccounts();
    },
    /**
     * 添加
     */
    addSubmit: function() {
      // console.log(JSON.stringify(this.addForm));
      this.addLoading = true;
      userApi.addAccount(this.addAccount).then(res => {
        this.addLoading = false;
        this.addFormVisible = false;
        // console.log(JSON.stringify(res));
        if (res.code !== "0000") {
          this.$message({
            message: "添加失败",
            type: "warning"
          });
          return;
        }
        this.$message({
          message: "添加成功",
          type: "success"
        });
        this.getAccounts();
      });
    },
    changePsSubmit: function() {
	  this.changeLoading = true;
	  this.changePsAccount.createTime = null;
	  console.log(JSON.stringify(this.changePsAccount))
      userApi.updateAccount(this.changePsAccount).then(res => {
        this.changeLoading = false;
        this.changePsVisible = false;
        // console.log(JSON.stringify(res));
        if (res.code !== "0000") {
          this.$message({
            message: "密码修改失败",
            type: "warning"
          });
          return;
        }
        this.$message({
          message: "密码修改成功",
          type: "success"
        });
        this.getAccounts();
      });
    },
    /**
     * 获取医生
     */
    getDoctors() {
      userApi.getDoctors().then(res => {
        // console.log(JSON.stringify(res));
        if (res.code !== "0000") {
          this.$message({
            message: "查询失败",
            type: "warning"
          });
          return;
        }
        this.doctors = res.data;
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    }
  },
  mounted() {
    //新增界面数据
    this.addAccount = lodash.cloneDeep(this.dataUnit);
    //编辑界面数据
    this.editAccount = lodash.cloneDeep(this.dataUnit);
    this.getAccounts();
  }
};
</script>

<style scoped>
</style>