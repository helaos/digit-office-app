<template>
  <div id="home-box">
    <el-container>
      <!-- 页面头部 -->
      <el-header class="home-header">
        <div class="title">摩云办公</div>
        <el-dropdown @command="commandHandler">
          <div class="el-dropdown-link">
            <span class="menu-username">{{ user.name }}</span>
            <el-avatar :src="user.avatar" size="medium">
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 下边主体 -->
      <el-container style="height: 100%">
        <!-- 侧边栏 -->
        <el-aside style="width: 200px">
          <el-menu router v-for="(item, index) in routes" :key="index">
            <el-submenu :index="item.path" v-if="!item.hidden">
              <template slot="title">
                <i class="home-icon" :class="item.iconCls"></i>
                <span>{{ item.name }}</span>
              </template>
              <div v-for="(child, i) in item.children" :key="i">
                <el-menu-item v-if="!child.hidden" :index="child.path">
                  {{ child.name }}
                </el-menu-item>
              </div>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 主题内容 -->
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item
              v-if="this.$router.currentRoute.path !== '/home'"
              >{{ this.$router.currentRoute.name }}</el-breadcrumb-item
            >
          </el-breadcrumb>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      user: JSON.parse(window.sessionStorage.getItem('user'))
    }
  },
  methods: {

    commandHandler (cmd) {
      if ('logout' === cmd) {
        this.$confirm('此操作将注销登录，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('initRoutes', [])
          this.getRequest('/logout')
          window.sessionStorage.removeItem('user')
          this.$router.replace('/')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      }
    },

  },
  computed: {
    routes () {
      return this.$store.state.routes
    }
  }
}
</script>

<style scoped>
#home-box {
  height: 100vh;
  width: 100vw;
}
.el-container {
  height: 100%;
}

.el-aside {
  background-color: #8dacca38;
  box-shadow: 0 3px 5px #b9b9b9;
  /* text-align: center; */
}
.el-aside ul {
  background-color: #ffffff38;
  color: #333;
  line-height: 200px;
  box-shadow: 0 1.5px 5px #b9b9b9;
}

.el-aside ul li {
  box-shadow: 0 1px 5px #b9b9b9;
}

.home-header {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 0 3.2rem;
  font-weight: bold;
  box-shadow: 0 3px 5px #b9b9b9;
  background-color: #409aff;
  background-repeat: repeat-x;
  background-image: -webkit-linear-gradient(
    top,
    rgba(21, 55, 247, 0.651),
    #4099ffb6,
    #0077ff75
  );
}
.home-header .title {
  font-size: 28px;
  font-family: "wenzang", "仿宋", "微软雅黑";
  color: #fff;
}

/* el 自身样式 */
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.menu-username {
  margin-right: 8px;
}

/* icon */
.home-icon {
  color: #409aff;
  margin-right: 0.5em;
}
</style>
