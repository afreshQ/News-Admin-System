<template>
  <div>
    <el-table :data="postLists" style="width: 100%;margin-top:30px">
      <el-table-column label="Id" width="40">
        <template slot-scope="item">
          <span>{{item.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="500">
        <template slot-scope="item">
          <span>{{item.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="缩略图" width="200">
        <template slot-scope="item">
          <span>
            <img class="thumbnail" :src="item.row.cover[0].url" alt />
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination 
    class="pagination" 
    :background="true"  
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :page-sizes="[3, 5, 10]"
    :page-size="pageSize"
    layout="sizes, prev, pager, next"
    :total="11"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postLists: [],

      pageSize:3,
      pageIndex:1
    };
  },
  created() {
    this.getPostsList();
  },
  watch:{
      pageSize(){
          this.getPostsList();
      },
      pageIndex(){
          this.getPostsList();
      }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    //获取全部文章
    getPostsList(pageIndex) {
      this.$axios({
        url: "/post",
        method: "get",
        params:{
            pageSize:this.pageSize,
            pageIndex:this.pageIndex
        }
      }).then(res => {
        let { data } = res.data;

        // console.log(data);
        this.postLists = data;
      });
    },

    handleSizeChange(pageSize){
        this.pageSize=pageSize;
    },


    handleCurrentChange(pageNum){
        // console.log(pageNum);
        this.pageIndex=pageNum;
        // this.getPostsList(pageNum)
    }
  }
};
</script>

<style lang="less" scoped>
el-table {
  margin-top: 30px;
}
.thumbnail {
  width: 100%;
  height: 100px;
  object-fit: cover;
}
.pagination{
    margin-top: 30px;
}
</style>

