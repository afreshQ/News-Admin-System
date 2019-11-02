<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle" >
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="account">
            <el-input type="text" v-model="ruleForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="this.$route.path=='/register'" label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button class="submit" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
  export default {
    data() {
      var checkAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        // console.log(value.length);
        
        setTimeout(() => {
            if (value.length <3 || value.length > 12) {
                callback(new Error('请输入3到12个字符的账号'));
            } else {
                callback();
            }
        }, 500);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          account: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          account: [
            { validator: checkAccount, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
        
              
              //发送登陆请求
            this.$axios({
                url:'/login',
                method:'post',
                data:{
                    username:this.ruleForm.account,
                    password:this.ruleForm.pass
                }
            }).then(res=>{
                let {message}=res.data;
                console.log(message);

                if(message=="登录成功"){
                    this.$message({
                        message: message,
                        type: 'success'
                    });

                let token=res.data.data.token;
                let user=res.data.data.user;

                localStorage.setItem('token',token);
                localStorage.setItem('userId',JSON.stringify(user));

                setTimeout(()=>{
                    this.$router.push('/')
                },1000)
                    
                }else if(message=="用户不存在"){
                    this.$message.error(message);
                }
                
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less" scoped>
.el-form{
    position: absolute;
    top: 200px;
    margin-left: -50px;
    .submit{
        margin-right: 50px;
    }
}
</style>