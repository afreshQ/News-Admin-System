<template>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="栏目">
        <el-checkbox-group v-model="form.categories">
          <el-checkbox v-for="(item,index) of categoryList" :key="index" :label="item.name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio label="文章"></el-radio>
          <el-radio label="视频"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        categories:[],
        type:'',
        content:''
      },

      //这里是获取到的全部分类
      categoryList:[]
    };
  },
  created(){
      this.$axios({
          url:'/category',
          method:'get'
      }).then(res=>{
          let {data}=res.data;

          console.log(data);
          this.categoryList=data;
      })
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      console.log(this.form);
      
    }
  }
};
</script>

<style lang="less" scoped>
.el-form{
    margin-top: 30px;
}
</style>