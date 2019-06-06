<template>
  <el-form
    :model="ruleForm2"
    :rules="rules2"
    ref="ruleForm2"
    label-position="left"
    label-width="0px"
    class="demo-ruleForm login-container"
  >
    <h3 class="title">冠心病康复随访系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember" @click="savePassword()">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button
        type="primary"
        style="width:100%;"
        @click.native.prevent="handleSubmit2"
        :loading="logining"
      >登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { userApi } from "../api/api";
//import NProgress from 'nprogress'
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: "",
        checkPass: ""
      },
      rules2: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: false
    };
  },
  methods: {
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    handleSubmit2(ev) {
      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;
          //NProgress.start();
          var loginParams = {
            username: this.ruleForm2.account,
            password: this.ruleForm2.checkPass
          };
          if (this.checked == true) {
            //传入账号名，密码，和保存天数3个参数
            this.setCookie(this.ruleForm2.account, this.ruleForm2.checkPass, 7);
          }else{
            this.clearCookie();
          }
          userApi.requestLogin(loginParams).then(res => {
            // console.log(JSON.stringify(res))
            this.logining = false;
            if (res.code != "0000") {
              this.$message({
                message: "用户名或密码错误",
                type: "error"
              });
            } else {
              sessionStorage.setItem("user", JSON.stringify(res.data));
              this.$router.push({ path: "/table" });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    savaPassword() {
      this.checked = !this.checked;
      console.log(this.checked);
    },

    /**
     * 设置cookie
     */
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "mt_userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "mt_userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    /**
     * 读取cookie
     */
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "mt_userName") {
            console.log(arr2[1])
            this.ruleForm2.account = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "mt_userPwd") {
            console.log(arr2[1])
            this.ruleForm2.checkPass = arr2[1];
          }
        }
      }
    },
    /**
     * 清除cookie
     */
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
  },
    mounted() {
    this.getCookie();
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>