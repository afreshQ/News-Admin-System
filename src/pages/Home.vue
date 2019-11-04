<template>
  <el-container class="container">
    <el-header>
      <el-row type="flex" justify="space-around" align="center">
        <el-col class="logo" :span="8">
          <h1>News 后台管理系统</h1>
        </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="8" class="userInfo">
          <el-avatar class="avatar" shape="square" :size="50" :src="$axios.defaults.baseURL+userInfo.head_img"></el-avatar>
          <div class="nickname">{{userInfo.nickname}}</div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              class="el-menu-vertical-demo"
              :default-active="defaultActive"
            >
              <el-menu-item index="1" @click="toMain('/')">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </el-menu-item>
              <el-menu-item index="2" @click="toMain('/postlist')">
                <i class="el-icon-s-platform"></i>
                <span slot="title">文章列表</span>
              </el-menu-item>
              <el-menu-item index="3" @click="toMain('/postarticle')">
                <i class="el-icon-s-promotion"></i>
                <span slot="title">发布文章</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <BreadCrumbs/>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import BreadCrumbs from '../components/BreadCrumbs';
export default {
  components:{
    BreadCrumbs
  },
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("user")),
      defaultActive:this.$route.path=='/postlist'?'2':this.$route.path=='/postarticle'?'3':'1'
    };
  },
  methods: {
    toMain(path){
      if(path!=this.$route.path)
        this.$router.push(path)
      }
  },

  created() {
    // console.log(this.userInfo);
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.el-header {
  background-color: #409eff;
  color: #333;
  text-align: center;
  line-height: 60px;
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .logo {
    display: flex;
    justify-content: flex-start;
    h1 {
      color: #fff;
    }
  }
  .userInfo {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .avatar {

      margin-right: 15px;
    }
    .nickname{
      color: #fff;
      font-weight: 600;
    }
  }
}

.el-aside {
  background-color: #a0cfff;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>