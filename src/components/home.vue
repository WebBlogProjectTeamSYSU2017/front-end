<template>
  <div class="top">
    <div class="container">
      <div class="sidebar">
        <div class="message" :style="{'text-align': 'left'}">
          <h1> {{userInfo.email}}</h1>
          <div :style="{'font-size':'1rem'}">的博客</div>
        </div>
        <Button class="button" @click="changeStatus('myblog')">我的博客</Button>
        <Button class="button" @click="changeStatus('blogground')">博客广场</Button>
        <Button class="button" @click="changeStatus('writeblog')">写博客</Button>
      </div>
      <div v-show="status==='writeblog'" class="writeblog content">
        <h1> 写博客 </h1>
        <hr>
        <Form class="form" ref="createblog" :model="createblog" :rules="ruleValidate" :label-width="80">
          <FormItem label="博客标题" prop="title">
              <Input v-model="createblog.title" placeholder="输入文章标题"/>
          </FormItem>
          <FormItem label="是否公开" prop="ispublic">
              <RadioGroup v-model="createblog.ispublic">
                  <Radio label="1">设为公开</Radio>
                  <Radio label="0">设为私密</Radio>
              </RadioGroup>
          </FormItem>
          <FormItem label="博客概述" prop="tag">
              <Input v-model="createblog.tag" type="textarea"  :autosize="{minRows: 1,maxRows: 2}" placeholder="Enter something..."/>
          </FormItem>
          <FormItem label="博客内容" prop="content">
              <Input v-model="createblog.content" type="textarea" :autosize="{minRows: 20,maxRows: 20}" placeholder="Enter something..."/>
          </FormItem>
          <FormItem>
              <Button type="primary" @click="handleSubmit()">上传</Button>
          </FormItem>
        </Form>
      </div>
      <div v-show="status==='blogground'" class="blogground content">
        <h1> 博客广场 </h1>
        <hr>
        <List item-layout="vertical" class="bloglist">
          <ListItem :style="{'text-align':'left'}" v-for="item in groundblogs" :key="item.id" @click="showContent">
              <ListItemMeta :title="item.title" :description="item.tag" />
              <span>作者:{{item.creatorname}} <br>发表于:{{item.createtime}}</span>
              <Button @click="showContent(item.title,item.content)" :style="{position:'relative',left:'65%'}">阅读<Icon class="icon" type="ios-arrow-forward" size="20" /></Button>
          </ListItem>
        </List>
      </div>
      <div v-show="status==='myblog'" class="myblog content">
        <h1> 我的博客 </h1>
        <hr>
        <List item-layout="vertical" class="bloglist">
          <ListItem :style="{'text-align':'left'}" v-for="item in myblogs" :key="item.id" @click="showContent">
              <ListItemMeta :title="item.title" :description="item.tag" />
              <span> <Icon v-show="item.ispublic === '0'" type="md-lock" /> {{item.createtime}}</span>
              <Button @click="deleteBlog(item.id)" :style="{position:'relative',left:'60%'}">删除</Button>
              <Button @click="showContent(item.title,item.content)" :style="{position:'relative',left:'60%'}">阅读<Icon class="icon" type="ios-arrow-forward" size="20" /></Button>
          </ListItem>
        </List>
      </div>
    </div>
    <Modal
      v-model="showBox"
      :title="showBlog.title"
      fullscreen
      scrollable
      >
      <pre>{{showBlog.content}}</pre>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'home',
  data: function () {
    return {
      userInfo: {
        username: '',
        email: ''
      },
      showBox: false,
      showBlog: {
        title: '',
        content: ''
      },
      status: '', // writeblog,blogground,myblog
      createblog: {
        title: '',
        ispublic: '',
        content: '',
        tag: ''
      },
      ruleValidate: {
        title: [
          { required: true, type: 'string', message: '请输入博客标题', trigger: 'blur' }
        ],
        ispublic: [
          { required: true, message: '请选择是否公开博客', trigger: 'change' }
        ],
        tag: [
          { required: true, type: 'string', message: '请输入博客摘要', trigger: 'change' }
        ],
        content: [
          { required: true, type: 'string', message: '请输入博客内容', trigger: 'change' }
        ]
      },
      myblogs: [],
      groundblogs: []
    }
  },
  created () {
    this.userInfo.email = this.$route.params.email
    this.status = 'blogground'
    if (!this.$cookies.get('jwt')) {
      console.log('no user is login')
      this.$router.replace('/')
    }
    // this.userInfo.username = this.$route.params.username
  },
  methods: {
    changeStatus: function (s) {
      this.status = s
    },
    handleSubmit: function () {
      this.$refs['createblog'].validate((valid) => {
        if (valid) {
          console.log(this.createblog)
          console.log('submit()')
          this.$http.post('/api/' + this.userInfo.email + '/createblog', {
            title: this.createblog.title,
            ispublic: this.createblog.ispublic,
            content: this.createblog.content,
            tag: this.createblog.tag
          }, {
            headers: {
              token: this.$cookies.get('jwt')
            }
          }).then(res => {
            if (res.data.ok) {
              this.$Message.success('发布成功')
              this.changeStatus('myblog')
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
    showContent: function (title, content) {
      this.showBox = true
      this.showBlog.content = content
      this.showBlog.title = title
    },
    loadMyBlogs: function () {
      console.log('loadMyBlogs()')
      this.$http.get('/api/' + this.userInfo.email + '/bloghome', {
        headers: {
          token: this.$cookies.get('jwt')
        }
      }).then(res => {
        if (res.data.ok) {
          this.myblogs = res.data.data
        } else {
          this.$Message.error('我的博客获取失败')
        }
      }).catch(err => {
        this.$Message.error('服务器出错,请稍后再试')
        console.log(err)
      })
    },
    loadGroudBlogs: function () {
      console.log('loadGroundBlogs()')
      this.$http.get('/api/' + this.userInfo.email + '/blogground', {
        headers: {
          token: this.$cookies.get('jwt')
        }
      }).then(res => {
        if (res.data.ok) {
          this.groundblogs = res.data.data
        } else {
          this.$Message.error('博客广场获取失败')
        }
      }).catch(err => {
        this.$Message.error('服务器出错,请稍后再试')
        console.log(err)
      })
    },
    deleteBlog: function (blogid) {
      console.log('deleteblog()')
      this.$http.delete('/api/' + this.userInfo.email + '/bloghome', {
        headers: {
          token: this.$cookies.get('jwt')
        },
        data: {
          id: blogid
        }
      }).then(res => {
        if (res.data.ok) {
          this.$Message.success('删除成功')
          this.loadMyBlogs()
        } else {
          this.$Message.error(res.data.data)
        }
      }).catch(err => {
        this.$Message.error('服务器出错,请稍后再试')
        console.log(err)
      })
    }
  },
  watch: {
    status: function () {
      if (this.status === 'myblog') {
        this.loadMyBlogs()
      } else if (this.status === 'blogground') {
        this.loadGroudBlogs()
      }
    }
  }
}
</script>

<style scoped>
.top {
  padding-top: 2.5vmin;
}
h1{
  margin-top: 5%;
  word-wrap: break-word;
  margin-bottom: 5%;
}
.container {
  height: 95vmin;
  width: 95vmax;
  border-radius: 20px;
  background-color: white;
  margin: auto;
  box-shadow: 0 0 15px gainsboro;
  overflow: hidden;
}
.sidebar{
  float: left;
  height: 100%;
  background-color: rgb(223, 240, 255);
  width: 15%;
  box-shadow: 0px 0px 10px gray;
}
.message{
  padding: 10%;
  text-align: center;
  height: 30%;
  background-color: rgba(0, 195, 255, 0.5);
  color: white;
}
.button{
  width: 105%;
  border: none;
  border-radius: 0px;
  height: 50px;
  margin: 1px;
  box-shadow: 5px 0px 5px skyblue;
  border-radius: 0px 10px 10px 0px;
}
.content{
  float: left;
  width: 85%;
  height: 100%;
}
.form{
  margin-top: 5%;
  padding: 0 0% 0 10%;
  width: 85%;
}
.bloglist{
  padding: 0 0 0 5%;
  height: 87%;
  overflow-y: scroll;
}
span{
  color: gainsboro;
}
</style>
