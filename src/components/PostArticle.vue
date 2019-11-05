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
         <vue-editor 
            v-model="form.content"
            :useCustomImageHandler="true"
            @image-added="imgUpload"
            :editorToolbar="customToolbar"
            ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
import {VueEditor} from 'vue2-editor';
export default {
  components:{
    VueEditor
  },
  data() {
    return {
      form: {
        title: "",
        categories:[],
        type:'',
        content:''
      },

      //这里是获取到的全部分类
      categoryList:[],

      //富文本配置
      customToolbar: [["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["image", "code-block"]]
    };
  },
  created(){
      this.$axios({
          url:'/category',
          method:'get'
      }).then(res=>{
          let {data}=res.data;
          
          //忽略关注和热点这两个栏目
          data.forEach(element => {
            if(element.id!=0 && element.id!=999){
              this.categoryList.push(element);
            }
          });
          // console.log(this.categoryList);
          // this.categoryList=data;
      })
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      
    },

    imgUpload(file, Editor, cursorLocation, resetUploader){
      
      //把选择的文件转成二进制
      let Imgdata=new FormData();
      Imgdata.append('file',file);

      this.$axios({
        url:'/upload',
        method:'post',
        data:Imgdata
       
      }).then(res=>{
        let {message,data}=res.data;
        console.log(message);
        
        let url=this.$axios.defaults.baseURL + data.url;

        //插入光标所在的位置
        Editor.insertEmbed(cursorLocation, "image", url);

        //重置上传图片的功能
        resetUploader();
        
      })
    }
  }
};
</script>

<style lang="less" scoped>
.el-form{
    margin-top: 30px;
}
</style>