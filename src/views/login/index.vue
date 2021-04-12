<template>
  <div>
    <el-form
      ref="loginForm"
      class="login-container"
      :rules="rules"
      :model="loginForm"
    >
      <h2 class="login-title">摩云办公系统登录</h2>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="请输入用户密码"
        ></el-input>
      </el-form-item>
      <el-form-item size="normal">
        <el-checkbox v-model="checked">记住我</el-checkbox>
      </el-form-item>
      <el-button type="primary" class="sign-btn" @click="submitLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      checked: true,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 用户登录
     */
    submitLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          alert('submit!!')
        } else {
          this.$message.error('请认真填写数据！')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.sign-btn {
  width: 100%;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 25px 35px 25px 35px;
  border: 1px solid #eaeaea;
  background-color: white;
  box-shadow: 0 0 25px #cac6c6;
}
.login-title {
  margin: 20px auto 40px auto;
  text-align: center;
}
</style>
