<template>
  <div>
      <span class="breadCrumbs">{{breadCrumbs}}</span>
  </div>
</template>

<script>
export default {
    computed:{
        breadCrumbs(){
        let breadCrumbstr='';

        this.$route.matched.forEach(element => {
            breadCrumbstr+=element.meta+' / '
        });
                
        return breadCrumbstr;
        }
    }
    
}
</script>

<style lang="less" scoped>
.breadCrumbs{
    font-size: 20px;
    font-weight: 600;
}
</style>