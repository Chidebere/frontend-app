<template>
  <div class="login mt-5">
    <div class="content-wrapper">

      <!-- Main content -->
      <section class="content">
        <div class="container">

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">My Profile</h3>
            </div>

            <!-- /.card-header -->
            <div class="card-body p-0">
              <div class="row">
                <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                  <b-card no-body>
                    <div class="card-body">
                      <div class="profile-header-container">
                        <div class="profile-header-img" align="center">
                          <img v-if="user.pic" :src="'/storage/profile/' + user.pic" class="rounded-circle" alt="..." width="150px;">
                          <img v-else class="rounded-circle" src="/assets/img/user.png" width="150px;" />
                        </div>
                      </div>
                      <b-card-body>
                        <b-card-title style="font-weight: 600; font-size: 17px;">{{user.name}}</b-card-title>
                        <hr>
                        <b-card-sub-title style="font-size: 1.2em; font-weight: 700;" v-if="user.pvt == 1">
                          <b-button @click="switchStatusState(user.pvt)" block variant="info">Private</b-button>
                        </b-card-sub-title>
                        <b-card-sub-title style="font-size: 1.2em; font-weight: 700;" v-else>
                          <b-button @click="switchStatusState(user.pvt)" block variant="success">Public</b-button>
                        </b-card-sub-title>
                      </b-card-body>
                    </div>
                    <!-- <div class="m-2">
                            <a href="" type="button" class="btn btn-info">Edit My Profile</a>
                        </div> -->
                    <b-list-group flush class="ml-2 mr-2">
                      <router-link to="/panel/profile/upload" class="mb-2 btn btn-info">
                        <b-button block variant="warning">Upload Picture</b-button>
                      </router-link>
                      <router-link to="/panel/profile" class="mb-2 btn btn-info">
                        <b-button block variant="warning">Edit My Profile</b-button>
                      </router-link>
                      <router-link to="/panel/profile/change-password" class=" btn btn-info">
                        <b-button block variant="warning">Change Password</b-button>
                      </router-link>
                    </b-list-group>

                    <b-card-footer class="mt-4">
                      <b-button @click="logout" block variant="danger">Sign Out</b-button>
                    </b-card-footer>

                  </b-card>
                </div>
                <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">

                  <div class="card m-2">
                    <div class="card-header">
                      Change your Password
                    </div>

                    <!-- /.card-header -->
                    <div class="card-body col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                      <div v-if="errors" class="bg-red-500 text-white py-2 px-4 pr-0 rounded font-bold mb-4 shadow-lg">
                        <div v-for="(v, k) in errors" :key="k">
                          <p v-for="error in v" :key="error" class="text-sm">
                            {{ error }}
                          </p>
                        </div>
                      </div>

                      <b-form @submit="onSubmit" @reset="onReset">
                        <b-form-group id="input-group-2" label="New Password:" label-for="input-1">
                          <b-form-input type="password" id="input-1" v-model="form.password" placeholder="Enter your new password"></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Confirm Password:" label-for="input-2">
                          <b-form-input type="password" id="input-2" v-model="form.comfirm_password" placeholder="Enter your confirm password"></b-form-input>

                        </b-form-group>

                        <b-button type="submit" class="mr-2" variant="primary">Change Password</b-button>
                        <b-button type="reset" variant="danger">Reset</b-button>
                      </b-form>

                    </div>
                  </div>

                </div>
              </div>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
        </div><!-- /.container-fluid -->
      </section>
      <!-- /.content -->
    </div>

  </div>
</template>



<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  namespaced: true,
  // props: ['username'],
  data: function () {
    return {
      form: {
        password: "",
        comfirm_password: "",
      },
      errors: null,
    };
  },
  computed: {
    ...mapGetters("auth", ["user"]),
  },

  mounted() {
    if (localStorage.getItem("authToken")) {
      this.getUserData();
    }
  },

  methods: {
    onSubmit(event) {
      event.preventDefault();
      // alert(JSON.stringify(this.form))
      const formData = new FormData();
      formData.append("userId", this.user.id);
      formData.append("password", this.form.password);
      formData.append("confirm_password", this.form.confirm_password);

      axios
        .post(process.env.VUE_APP_API_URL + "changeMyPassword", formData)
        .then((response) => {
          console.log(response);
          this.makeToast();
          this.getUserData();
        })
        .catch((e) => {
          this.errors = e.data.errors;
          console.log(e.data.errors);
        });
    },

    switchStatusState(pvt) {
      axios
        .get(process.env.VUE_APP_API_URL + "updateStatus", {
          params: {
            userId: this.user.id,
            pvtStatus: pvt,
          },
        })
        .then((response) => {
          this.makeToast2();
          this.getUserData();
          console.log(response);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    },

    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.password = "";
      this.form.comfirm_password = "";
    },

    makeToast() {
      this.$bvToast.toast("Password changed successfully", {
        title: "Success",
        variant: "success",
        solid: true,
      });
    },
    makeToast2() {
      this.$bvToast.toast("Status changed", {
        title: "Success",
        variant: "success",
        solid: true,
      });
    },

    ...mapActions("auth", ["sendLogoutRequest", "getUserData"]),

    logout() {
      this.sendLogoutRequest();
      this.$router.push("/");
    },
  },
};
</script>