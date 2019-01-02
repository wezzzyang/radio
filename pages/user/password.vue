<template>
  <el-card class="card-password">
    <h1 slot="header">找回密码</h1>
    <div class="card-body">
      <el-form 
        ref="findPasswordForm"
        :model="info" 
        :rules="rules">
        <el-form-item 
          label="手机号" 
          prop="phone">
          <el-input 
            v-model="info.phone" 
            placeholder="请输入你的手机号"/>
        </el-form-item>
        <el-form-item 
          label="验证码" 
          prop="code">
          <el-input 
            v-model="info.code" 
            placeholder="请输入你的验证码">
            <el-button
              slot="suffix"
              class="input-code-link" 
              type="text" 
              @click="handleGetCode">获取验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button 
            type="primary" 
            @click="handleFindPassword">找回密码</el-button>
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
    title: '找回密码'
  },
  layout: 'entry',
  data() {
    return {
      info: {
        phone: null,
        code: null
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号必须是11位', trigger: 'blur' }
          // TODO: 使用正则表达式来验证手机号
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          // TODO: 使用正则表达式来验证验证码
        ],
      }
    }
  },
  methods: {
    /*  获取验证码  */
    async handleGetCode() {
      await this.dispacth('/user/getCode', this.info);;
    },
    /*  找回密码  */
    handleFindPassword() {
      this.$refs['findPasswordForm'].validate(async (valid) => {
          if (valid) {
            await this.dispacth('/user/findPassword', info);
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
.card-password {
  width: 460px;
  height: auto;

  margin: auto;
}
.card-password.is-always-shadow {
  box-shadow: 0 2px 12px 0 rgba(0, 0,0,0.2);
}
.input-code-link {
    margin-right: 10px;
}
.el-input--suffix .el-input__inner {
    padding-right: 90px;
}
</style>