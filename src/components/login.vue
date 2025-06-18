<template>
  <div style="margin-top: 15%">
    <el-row :gutter="12">
      <el-col :span="7" :offset="8">
        <el-card shadow="always">
          <el-row :gutter="20">
            <el-col :span="18" :offset="3" typeof="email">
              <div class="grid-content bg-purple">
                <el-input
                    size="small"
                    v-model="loginVM.email"
                    type="email"
                    placeholder="Loginni kiriting">
                </el-input>
                <el-input style="margin-top: 15px;" placeholder="Parolingizni kiriting" v-model="loginVM.password"
                          size="small"
                          show-password>
                </el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 15px;">
            <el-col :span="24">
              <el-col :span="12">
                <el-checkbox v-model="checked">Eslab qolish</el-checkbox>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" @click="login" plain>Primary</el-button>
              </el-col>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import {userApiUrls} from "@/constants";
import AccountService from "@/acoount/account-service";

export default {
  name: `Login`,
  data() {
    return {
      loginVM: {
        email: '',
        password: ''


      }, checked: false
    }
  },
  methods: {
    login() {
      try {
        axios.post(userApiUrls.login, this.loginVM).then(res => {
          console.log(res)
          let data = res.data;
          if (data.success) {
            if (this.checked) {
              localStorage.setItem("refresh_token", data.data.refresh_token);
              localStorage.setItem("refresh_token_date", data.data.jwt_expire_refresh_token);
            } else {
              sessionStorage.setItem("refresh_token", data.data.refresh_token);
              sessionStorage.setItem("refresh_token_date", data.data.jwt_expire_refresh_token);
            }
            new AccountService(this.$route, this.$store).retrieveAccount()
            this.$router.push('/')
          } else alert(data.message);
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}

</script>


<style scoped>

</style>