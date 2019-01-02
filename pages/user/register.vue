<template>
  <el-card class="card-register">
    <h1 slot="header">注册</h1>
    <div class="card-body">
      <el-form 
        ref="registerForm" 
        :model="user"
        :rules="rules">
        <el-form-item 
          label="账号" 
          prop="account">
          <el-input 
            v-model="user.account" 
            placeholder="请输入你的账号"/>
        </el-form-item>
        <el-form-item 
          label="密码" 
          prop="password">
          <el-input 
            v-model="user.password" 
            type="password" 
            placeholder="请输入你的密码"/>
        </el-form-item>
        <el-form-item 
          label="重复密码" 
          prop="passwordAgain">
          <el-input
            v-model="user.passwordAgain" 
            type="password" 
            placeholder="请输入你的密码"/>
        </el-form-item>
        <el-form-item>
          <el-button 
            type="primary" 
            @click="handleRegister">注册账号</el-button>
          <el-button 
            type="button" 
            @click="turnToLogin">返回登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>
<script>
export default {
  head: {
    title: '注册'
  },
  layout: 'entry',
  data() {
    return {
      user: {
        account: null,
        password: null,
        passwordAgain: null,
      },
      rules: {
        account: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号必须是11位', trigger: 'blur' }
          // TODO: 使用正则表达式来验证手机号
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码必须为6到16位的字符', trigger: 'blur' }
          // TODO: 使用正则表达式来验证密码
        ],
        passwordAgain: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.user.password) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          }, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /*  注册账号  */
    handleRegister() {
      this.$refs['registerForm'].validate(async (valid) => {
          if (valid) {
            await this.dispacth('/user/register', account);
          } else {
            console.log('error submit!!');
            return false;
          }
      }); 
    },
    /*  跳转到登录页面  */
    turnToLogin() {
      this.$router.push('/user/login');
    }
  }
}
</script>
<style>
.card-register {
  width: 460px;
  height: auto;

  margin: auto;
}
.card-register.is-always-shadow {
  box-shadow: 0 2px 12px 0 rgba(0, 0,0,0.2);
}
</style>