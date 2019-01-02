<template>
  <el-card class="card-login">
    <h1 slot="header">登录</h1>
    <div class="card-body">
      <el-form
        ref="loginForm"
        :model="user" 
        :rules="rules">
        <el-form-item 
          label="账号" 
          prop="account">
          <el-input 
            v-model="user.account" 
            placeholder="请输入你的手机号"/>
        </el-form-item>
        <el-form-item 
          label="密码" 
          prop="password">
          <el-input
            v-model="user.password"
            type="password" 
            placeholder="请输入你的密码"/>
        </el-form-item>
        <el-form-item>
          <el-button 
            type="primary" 
            @click="handleLogin">登录账号</el-button>
          <el-button 
            type="button" 
            @click="turnToFindPassword">找回密码</el-button>
          <el-button 
            type="button" 
            @click="turnToRegister">立即注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  head: {
    title: '登录'
  },
  layout: 'entry',
  data() {
    return {
      user: {
        account: null,
        password: null,
      },
      rules: {
        account: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // { min: 11, max: 11, message: '手机号必须是11位', trigger: 'blur' }
          // TODO: 使用正则表达式来验证手机号
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码必须为6到16位的字符', trigger: 'blur' }
          // TODO: 使用正则表达式来验证密码
        ]
      }
    }
  },
  methods: {
    ...mapActions('user', [ 'login' ]),
    /*  登录账号  */
    handleLogin() {
      this.$refs['loginForm'].validate(async (valid) => {
          if (!valid) {
            return false
          }

          let result = await this.login(this.user);

          if(!result) {
            this.$message({ message: '登录失败', type: 'error' });
          } else {
            this.$message({ message: '登录成功', type: 'success' });
            this.$router.push('/admin/dashboard');
          }
      }); 
    },
    /*  跳转到查找密码页面  */
    turnToFindPassword() {
      this.$router.push('/user/password');
    },
    /*  跳转到注册页面  */
    turnToRegister() {
      this.$router.push('/user/register');
    }
  }
}
</script>
<style>
.card-login {
  width: 460px;
  height: auto;

  margin: auto;
}
.card-login.is-always-shadow {
  box-shadow: 0 2px 12px 0 rgba(0, 0,0,0.2);
}
</style>