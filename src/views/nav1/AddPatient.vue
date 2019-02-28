<template>
  <section>
    <!--新增界面-->
    <!-- <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false"> -->
    <el-form
      :model="addForm"
      label-width="120px"
      :rules="addFormRules"
      ref="addForm"
      style="margin:20px auto;width:40%;min-width:600px;"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="addForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="addForm.gender">
          <el-radio class="radio" :label="1">男</el-radio>
          <el-radio class="radio" :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="民族">
        <el-select v-model="addForm.nation" placeholder="请选择民族">
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
        <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
      </el-form-item>
      <el-form-item label="发病年龄">
        <el-input-number v-model="addForm.sickAge" :min="0" :max="200"></el-input-number>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
      </el-form-item>
      <el-form-item label="省份证号" prop="numId">
        <el-input v-model="addForm.numId" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobilePhone">
        <el-input v-model="addForm.mobilePhone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="座机号">
        <el-input v-model="addForm.telphone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="紧急联系人">
        <el-input v-model="addForm.emergePeople" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="紧急联系人电话">
        <el-input v-model="addForm.emergePhone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="与患者关系">
        <el-select v-model="addForm.emergeRelationship" placeholder="请选择患者关系">
          <el-option label="配偶" value="配偶"></el-option>
          <el-option label="子女" value="子女"></el-option>
          <el-option label="朋友" value="朋友"></el-option>
          <el-option label="亲戚" value="亲戚"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="婚姻状况">
        <el-select v-model="addForm.married" placeholder="请选择婚姻状况">
          <el-option label="未婚" value="未婚"></el-option>
          <el-option label="已婚" value="已婚"></el-option>
          <el-option label="离异" value="离异"></el-option>
          <el-option label="丧偶" value="丧偶"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="患者职业">
        <el-input v-model="addForm.profession" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="职业状态">
        <el-select v-model="addForm.profession_status" placeholder="请选择职业状态">
          <el-option label="在职" value="在职"></el-option>
          <el-option label="退休" value="退休"></el-option>
          <el-option label="无业" value="无业"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文化程度">
        <el-select v-model="addForm.education" placeholder="请选择文化程度">
          <el-option label="小学及以下" value="小学及以下"></el-option>
          <el-option label="初中" value="初中"></el-option>
          <el-option label="高中" value="高中"></el-option>
          <el-option label="大学及以上" value="大学及以上"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年收入">
        <el-select v-model="addForm.income" placeholder="请选择年收入">
          <el-option label="5万以下" value="5万以下"></el-option>
          <el-option label="5-10万" value="5-10万"></el-option>
          <el-option label="10万以上" value="10万以上"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址">
        <el-input type="textarea" v-model="addForm.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import util from "../../common/js/util";
//import NProgress from 'nprogress'
import {
  getPatientListPage,
  removeUser,
  batchRemoveUser,
  editUser,
  addUser,
  addPatient
} from "../../api/api";

export default {
  data() {
    return {
      filters: {
        name: ""
      },
      users: [],
      total: 0,
      page: 1,
      count: 10,
      listLoading: false,
      sels: [], //列表选中列

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        numId: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
        mobilePhone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        gender: [{ required: true, message: "请输入性别", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
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
      }
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
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.addForm);
            para.birth =
              !para.birth || para.birth == ""
                ? ""
                : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            para.gender = para.gender.toString();
            para.age = para.age.toString();
            para.sickAge = para.sickAge.toString();
            let params = {
              patient: para,
              birthdayStr: para.birth
            };
            console.log(JSON.stringify(params));
            addPatient(params).then(res => {
              this.addLoading = false;
              //NProgress.done();
              if (res.code != "0000") {
                this.$message({
                  message: res.Msg,
                  type: "success"
                });
                return;
              }
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              // this.getUsers();
              this.$router.push({ path: "/table" });
              
            });
          });
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    }
  },
  mounted() {
    // this.getUsers();
  }
};
</script>

<style scoped>
</style>