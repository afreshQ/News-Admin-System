<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="栏目">
      <el-checkbox-group v-model="form.categories">
        <el-checkbox
          v-for="(item,index) of categoryList"
          :key="index"
          :label="item.id"
        >{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="类型">
      <el-radio-group v-model="form.type">
        <el-radio :label="1">文章</el-radio>
        <el-radio :label="2">视频</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="封面">
      <el-form-item>
        <el-upload
          :file-list="form.cover"
          :action="$axios.defaults.baseURL + '/upload/'"
          list-type="picture-card"
          :on-success="coverUploaded"
          :on-remove="coverRemoved"
          :headers="{Authorization:token}"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
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
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      postId:this.$route.query.id,

      form: {
        title: "",
        categories: [],
        type: "",
        cover: [],
        content: ""
      },

      //这里是获取到的全部分类
      categoryList: [],

      //富文本配置
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"]
      ],

      token: localStorage.getItem("token")
    };
  },
  created() {
    
    this.$axios({
      url: "/category",
      method: "get"
    }).then(res => {
      let { data } = res.data;

      //忽略关注和热点这两个栏目
      data.forEach(element => {
        if (element.id != 0 && element.id != 999) {
          this.categoryList.push(element);
        }
      });
    });


      console.log(this.postId);
    // 判断有没有id传过来,有就代表是编辑页
    if(this.postId){
      //请求数据
      this.$axios({
        url:'/post/'+this.postId,
        method:'get'
      }).then(res=>{
        console.log(res.data);
        let {data}=res.data;

        //改成能渲染到页面的[id1，id2]
        let newCategories=[];
        data.categories.forEach(element => {
          newCategories.push(element.id)
        });
        data.categories=newCategories;

        //图片加上基准路径
        data.cover.forEach(element=>{
          element.url=this.$axios.defaults.baseURL+element.url;
        })
        
        //富文本只能识别p编辑，所以这里把div替换p
        data.content.replace(/div/g,'p');

        //赋值给form
        this.form=data;

        console.log(this.form);
        
      })
    }
  },
  methods: {
    onSubmit() {
      //我们上传的时候只要[{id:0},{id:1}]这中，所以要先把内容转换一下
      let newArr = [];
      this.form.categories.forEach(element => {
        newArr.push({
          id: element
        });
      });
      this.form.categories = newArr;

      console.log(this.form);

      this.$axios({
        url: this.postId?"/post_update/"+this.postId:"/post",
        method: "post",
        data: this.form
      }).then(res => {
        // console.log(res.data);

        let {message}=res.data;
        console.log(message);
        
      });
    },

    //富文本图片上传
    imgUpload(file, Editor, cursorLocation, resetUploader) {
      //把选择的文件转成二进制
      let Imgdata = new FormData();
      Imgdata.append("file", file);

      this.$axios({
        url: "/upload",
        method: "post",
        data: Imgdata
      }).then(res => {
        let { message, data } = res.data;
        console.log(message);

        let url = this.$axios.defaults.baseURL + data.url;

        //插入光标所在的位置
        Editor.insertEmbed(cursorLocation, "image", url);

        //重置上传图片的功能
        resetUploader();
      });
    },

    // 文件上传成功时的钩子
    coverUploaded(res) {
      // console.log(res.data);
      //把获取到id，url放到数组中，用作预览
      this.form.cover.push({
        id: res.data.id,
        url: this.$axios.defaults.baseURL + res.data.url
      });

      // console.log(this.form);
    },

    //文件列表移除文件时的钩子
    coverRemoved(file,fileList) {
      this.form.cover=fileList;
    }
  }
};
</script>

<style lang="less" scoped>
.el-form {
  margin-top: 30px;
}
</style>