<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getDoctors">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="doctors"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%;"
    >
      <!-- <el-table-column type="selection" width="40"></el-table-column> -->
      <el-table-column type="index" width="55"></el-table-column>
      <el-table-column prop="doctor.doctorName" label="姓名" sortable></el-table-column>
      <el-table-column prop="doctor.gender" label="性别" :formatter="formatSex" sortable></el-table-column>
      <el-table-column prop="doctor.doctorMajor" label="医生专长" sortable></el-table-column>
      <el-table-column prop="hospital.hosName" label="所属医院" sortable></el-table-column>
      <el-table-column prop="department.deptName" label="所属科室" sortable></el-table-column>
      <el-table-column prop="doctor.doctorNum" label="医生编号" sortable></el-table-column>
      <el-table-column prop="doctor.qcNum" label="资格证书" sortable></el-table-column>
      <el-table-column prop="qcDateStr" label="资证时间" sortable></el-table-column>
      <el-table-column prop="doctor.opqcNum" label="从业资格" sortable></el-table-column>
      <el-table-column prop="opqcDateStr" label="从证时间" sortable></el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
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

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="医生姓名" prop="name">
          <el-input v-model="editForm.doctor.doctorName" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="医生性别">
          <el-radio-group v-model="editForm.doctor.gender">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="医生专长">
          <el-input type="textarea" v-model="editForm.doctor.doctorMajor" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="所在医院">
          <el-select
            v-model="editForm.doctor.hospitalId"
            placeholder="请选择医院"
            @change="changeHospital(editForm.doctor.hospitalId)"
          >
            <el-option
              v-for="hospital in hospitalSet"
              :key="hospital.hosId"
              :value="hospital.hosId"
              :label="hospital.hosName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在科室">
          <el-select v-model="editForm.doctor.deptId" placeholder="请选择科室">
            <el-option
              v-for="dept in departmentSet"
              :key="dept.deptId"
              :value="dept.deptId"
              :label="dept.deptName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医生编号" prop="name">
          <el-input v-model="editForm.doctor.doctorNum" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="资格证书">
          <el-input v-model="editForm.doctor.qcNum" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="资格证书时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.qcDateUI"></el-date-picker>
        </el-form-item>
        <el-form-item label="从业资格" prop="numId">
          <el-input v-model="editForm.doctor.opqcNum" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="从证时间" prop="mobilePhone">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.opqcDateUI"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="editForm">
        <el-form-item label="医生姓名" prop="name">
          <el-input v-model="addForm.doctor.doctorName" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="医生性别">
          <el-radio-group v-model="addForm.doctor.gender">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="医生专长">
          <el-input type="textarea" v-model="addForm.doctor.doctorMajor" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="所在医院">
          <el-select
            v-model="addForm.doctor.hospitalId"
            placeholder="请选择医院"
            @change="changeHospital(addForm.doctor.hospitalId)"
          >
            <el-option
              v-for="hospital in hospitalSet"
              :key="hospital.hosId"
              :value="hospital.hosId"
              :label="hospital.hosName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在科室">
          <el-select v-model="addForm.doctor.deptId" placeholder="请选择科室">
            <el-option
              v-for="dept in departmentSet"
              :key="dept.deptId"
              :value="dept.deptId"
              :label="dept.deptName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医生编号" prop="num">
          <el-input v-model="addForm.doctor.doctorNum" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="资格证书">
          <el-input v-model="addForm.doctor.qcNum" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="资格证书时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="addForm.qcDateUI"></el-date-picker>
        </el-form-item>
        <el-form-item label="从业资格" prop="numId">
          <el-input v-model="addForm.doctor.opqcNum" auto-complete="off" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="从证时间" prop="mobilePhone">
          <el-date-picker type="date" placeholder="选择日期" v-model="addForm.opqcDateUI"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="editLoading">提交</el-button>
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
      radioValue: "",
      value: "",
      filters: {
        name: ""
      },
      doctors: [],
      total: 0,
      page: 1,
      count: 10,
      listLoading: false,
      sels: [], //列表选中列
      addFormVisible: false,
      addLoading: false,
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        // name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        // num: [{ required: true, message: "请输入医生编号", trigger: "blur" }]
      },
      addFormRules: {
        // name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        // num: [{ required: true, message: "请输入医生编号", trigger: "blur" }]
      },
      dataUnit: {
        doctor: {
          doctorId: "",
          doctorName: "",
          gender: "",
          doctorMajor: "",
          doctorNum: "",
          qcNum: "",
          opqcNum: ""
        },
        hospital: {
          hosName: ""
        },
        department: {
          deptName: ""
        },
        qcDateStr: "",
        opqcDateStr: "",
        total: 0,
        qcDateUI: null,
        opqcDateUI: null,
        radioValue: ""
      },
      //新增界面数据
      addForm: {
        doctor: {
          doctorId: "",
          doctorName: "",
          gender: "",
          doctorMajor: "",
          doctorNum: "",
          qcNum: "",
          opqcNum: ""
        },
        hospital: {
          hosName: ""
        },
        department: {
          deptName: ""
        },
        qcDateStr: "",
        opqcDateStr: "",
        total: 0,
        qcDateUI: null,
        opqcDateUI: null
      },
      //编辑界面数据
      editForm: {
        doctor: {
          doctorId: "",
          doctorName: "",
          gender: "",
          doctorMajor: "",
          doctorNum: "",
          qcNum: "",
          opqcNum: ""
        },
        hospital: {
          hosName: ""
        },
        department: {
          deptName: ""
        },
        qcDateStr: "",
        opqcDateStr: "",
        total: 0,
        qcDateUI: null,
        opqcDateUI: null
      },
      hospitalSet: [],
      departmentSet: []
    };
  },
  methods: {
    changeHospital(id) {
      if (id !== null) {
        this.getDepartment(id);
      }
    },
    //性别显示转换
    formatSex: function(row, column) {
      return row.doctor.gender == "1"
        ? "男"
        : row.doctor.gender == "0"
        ? "女"
        : "未知";
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getDoctors();
    },
    //获取用户列表
    getDoctors() {
      let para = {
        page: this.page,
        count: this.count,
        filter: this.filters.name
      };
      this.listLoading = true;
      // NProgress.start();
      userApi.getDoctorListPage(para).then(res => {
        //console.log(JSON.stringify(res));
        if (res.code != "0000") {
          this.$message({
            message: "查询失败",
            type: "warning"
          });
          return;
        }
        this.total =
          res.data && res.data[0] && res.data[0].total ? res.data[0].total : 0;
        this.doctors = [];
        this.doctors = res.data;
        this.doctors.slice(0);
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
          let para = { doctorId: row.doctor.doctorId };
          console.log(JSON.stringify(para))
          userApi.deleteDoctor(row.doctor.doctorId).then(res => {
            if (res.code !== "0000") {
              this.$message({
                message: "当前用户不允许删除",
                type: "warning"
              });
              this.getDoctors();
              return;
            }
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getDoctors();
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      var rowData = lodash.cloneDeep(row);
      this.editForm = lodash.cloneDeep(this.dataUnit);
      this.editForm = { ...this.editForm, ...rowData };
      this.editForm.qcDateUI = util.formatDate.parse(
        this.editForm.qcDateStr,
        "yyyy-MM-dd"
      );
      this.editForm.opqcDateUI = util.formatDate.parse(
        this.editForm.opqcDateStr,
        "yyyy-MM-dd"
      );
      this.getHospital();
      this.getDepartment(this.editForm.doctor.deptId);
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = lodash.cloneDeep(this.dataUnit);
      this.getHospital();
    },
    //编辑
    editSubmit: function() {
      this.editLoading = true;
      this.editForm.qcDateStr = util.formatDate.format(
        this.editForm.qcDateUI,
        "yyyy-MM-dd"
      );
      this.editForm.opqcDateStr = util.formatDate.format(
        this.editForm.opqcDateUI,
        "yyyy-MM-dd"
      );
      //日期类型置空
      this.editForm.doctor.qcDate = null;
      this.editForm.doctor.opqcDate = null;
      // console.log(JSON.stringify(this.editForm))
      userApi.updateDoctor(this.editForm).then(res => {
        this.editFormVisible = false;
        console.log(JSON.stringify(res));
        this.editLoading = false;
        if (res.code !== "0000") {
          this.$message({
            message: "更新失败",
            type: "warning"
          });
          return;
        }
        this.$message({
          message: "更新成功",
          type: "success"
        });
      });
      this.getDoctors();
    },
    addSubmit: function() {
      this.addForm.qcDateStr = util.formatDate.format(
        this.addForm.qcDateUI,
        "yyyy-MM-dd"
      );
      this.addForm.opqcDateStr = util.formatDate.format(
        this.addForm.opqcDateUI,
        "yyyy-MM-dd"
      );
      // console.log(JSON.stringify(this.addForm));
      userApi.addDoctor(this.addForm).then(res => {
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
        this.getDoctors();
      });
    },
    /**
     * 获取医院
     */
    getHospital() {
      userApi.getHospital().then(res => {
        // console.log(JSON.stringify(res))
        if (res.code !== "0000") {
          this.$message({
            message: "查询失败",
            type: "warning"
          });
          return;
        }
        this.hospitalSet = res.data;
      });
    },
    /**
     * 获取医院科室
     */
    getDepartment(hosId) {
      userApi.getDepartment(hosId).then(res => {
        // console.log(JSON.stringify(res));
        if (res.code !== "0000") {
          this.$message({
            message: "查询科室失败",
            type: "warning"
          });
          return;
        }
        if (res.data !== null && res.data.length >= 0) {
          this.departmentSet = res.data;
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    }
  },
  mounted() {
    //新增界面数据
    this.addForm = lodash.cloneDeep(this.dataUnit);
    //编辑界面数据
    this.editForm = lodash.cloneDeep(this.dataUnit);
    this.getDoctors();
  }
};
</script>

<style scoped>
</style>