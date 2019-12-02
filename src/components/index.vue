<template>
  <div class='top'>
    <div class='container'>
      <h1>My Blog</h1>
      <Row type="flex" justify="center">
        <Tabs>
          <TabPane class="contentArea" icon="ios-log-in" label="登录" name="login">
            <Form ref="loginInfo" :model="loginInfo" :rules="rules">
              <FormItem prop="email">
                <Input size="large" type="text" v-model="loginInfo.email" prefix="ios-mail-outline" placeholder="邮箱" />
              </FormItem>
              <FormItem prop="password">
                <Input size="large" type="password" v-model="loginInfo.password" prefix="ios-lock-outline" placeholder="密码" />
              </FormItem>
              <FormItem class="buttonArea">
                <Button class="button" long @click="login">登录</Button>
              </FormItem>
              <FormItem class="test">
                <Button class="button" long @click="toNext">跳转测试</Button>
              </FormItem>
            </Form>
          </TabPane>
          <TabPane class="contentArea" icon="ios-person-add-outline" label="注册" name="register">
            <Form ref="registerInfo" :model="registerInfo" :rules="rules">
              <FormItem prop="email">
                <Input size="large" type="email" v-model="registerInfo.email" prefix="ios-mail-outline" placeholder="邮箱" />
              </FormItem>
              <FormItem prop="username">
                  <Input size="large" type="text" v-model="registerInfo.username" prefix="ios-person-outline" placeholder="用户名" />
                </FormItem>
              <FormItem prop="password">
                <Input size="large" type="password" v-model="registerInfo.password" prefix="ios-lock-outline" placeholder="密码（6-20个字符组成）" />
              </FormItem>
              <FormItem prop="password2">
                <Input size="large" type="password" v-model="registerInfo.password2" prefix="ios-lock-outline" placeholder="再次输入密码（6-20个字符组成）" />
              </FormItem>
              <FormItem class="buttonArea">
                <Button class="button" long @click="register">注册</Button>
              </FormItem>
            </Form>
          </TabPane>
        </Tabs>
      </Row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  data: function () {
    const comfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerInfo.password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      loginInfo: {
        password: '',
        email: ''
      },
      registerInfo: {
        email: '',
        username: '',
        password: '',
        password2: ''
      },
      rules: {
        email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'},
          {type: 'string', pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '邮箱必须符合"example@email.com"格式', trigger: 'blur'}
        ],
        username: [
          {required: true, message: '用户昵称不能为空', trigger: 'blur'},
          {type: 'string', min: 6, max: 10, message: '长度在6-10字符之间', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {type: 'string', min: 6, max: 20, message: '长度在6-20字符之间', trigger: 'blur'}
        ],
        password2: [
          {required: true, validator: comfirmPass, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    toOJ: function (inputIndex) {
      this.$router.push({
        name: 'vote',
        params: {
          access_token: this.access_token,
          env: this.env,
          vote_index: inputIndex
        }
      })
    },
    login: function () {
      this.$refs['loginInfo'].validate((valid) => {
        if (valid) {
          console.log('login()')
          this.$http.post('/api/login', {
            email: this.loginInfo.email,
            password: this.loginInfo.password
          }).then(res => {
            if (res.data.ok) {
              this.$cookies.remove('jwt')
              let token = res.data.data.token
              this.$Message.success('登陆成功')
              this.$cookies.set('jwt', token)
              this.toNext()
            } else {
              this.$Message.error(res.data.data)
            }
          }).catch(err => {
            this.$Message.error('服务器出错,请稍后再试')
            console.log(err)
          })
        }
      })
    },
    register: function () {
      this.$refs['registerInfo'].validate((valid) => {
        if (valid) {
          console.log('register')
          this.$http.post('/api/signup', {
            username: this.registerInfo.username,
            email: this.registerInfo.email,
            password: this.registerInfo.password
          }).then(res => {
            if (res.data.ok) {
              this.$Message.success('注册成功')
            } else {
              this.$Message.error(res.data.data)
            }
          }).catch(err => {
            this.$Message.error('服务器出错,请稍后再试')
            console.log(err)
          })
        }
      })
    },
    toNext () {
      this.$router.push('/home/' + this.loginInfo.email)
    }
  }
}
</script>

<style scoped>
.top{
  padding: 10vh;
}
.container{
 background-color: white;
 border-radius: 15px;
 width: 50vh;
 padding: 3%;
 text-align: center;
 margin: auto;
 box-shadow: 0 10px 10px gray;
}
.container h1{
  margin-bottom: 10%;
}
</style>
