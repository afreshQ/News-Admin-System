<template>
  <el-table
    :data="postLists"
    style="width: 100%;margin-top:30px">
    <el-table-column
      label="Id"
      width="40">
      <template slot-scope="item">
        <span>{{item.row.id}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="标题"
      width="500">
      <template slot-scope="item">
        <span>{{item.row.title}}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="缩略图"
      width="200">
      <template slot-scope="item">
        <span>
            <img class="thumbnail" :src="item.row.cover[0].url" alt="">
        </span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
          postLists:[]
      }
    },
    created(){
        this.getPostsList()
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },

       //获取全部文章
      getPostsList(){
          this.$axios({
              url:'/post',
              method:'get',
          }).then(res=>{
              let {data}=res.data;

              console.log(data);
              this.postLists=data;
          })
      }
    }
  }
</script>

<style lang="less" scoped>
el-table{
    margin-top: 30px;
}
.thumbnail{
    width: 100%;
    height: 100px;
    object-fit: cover;
}
</style>