<template>
  <div class="hold-transition login-page">
    <div class="login-box">
      <!-- /.login-logo -->
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <a href="../../index2.html" class="h2"><b>Admin</b>TVZ</a>
        </div>
        <div class="card-body">
          <p class="login-box-msg">Sign in to start your session</p>

          <form>
            <div class="input-group mb-3">
            <input
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors.email }"
              id="email"
              v-model="details.email"
              placeholder="Email"
            />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            <div class="invalid-feedback" v-if="errors.email">
              {{ errors.email[0] }}
            </div>
          </div>

          <div class="input-group mb-3">
            <input
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors.password }"
              id="password"
              v-model="details.password"
              placeholder="Password"
            />
            <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            <div class="invalid-feedback" v-if="errors.password">
              {{ errors.password[0] }}
            </div>
          </div>

            <div class="row">
              <div class="col-8">
                <div class="icheck-primary">
                  <input type="checkbox" id="remember">
                  <label for="remember">
                    Remember Me
                  </label>
                </div>
              </div>
              <!-- /.col -->
              <div class="col-4">
                <button type="button" @click="adminLogin" class="btn btn-primary btn-block">Sign In</button>
              </div>
              <!-- /.col -->
            </div>
          </form>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->
    </div>
    <!-- /.login-box -->
     <NoFooter />
  </div>
</template>

<script>
import NoHeader from '@/components/admin/NoHeader.vue'
import NoFooter from '@/components/admin/NoFooter.vue'
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
components: {
    NoFooter
  },
  data: function() {
    return {
      details: {
        email: null,
        password: null
      }
    };
  },

  computed: {
    ...mapGetters(["errors"])
  },

  mounted() {
    this.$store.commit("setErrors", {});
  },
created () {
    this.$emit('update:headerNavebar', NoHeader)
  },

  methods: {
    ...mapActions("auth", ["sendAdminLoginRequest"]),

    adminLogin: function() {
      this.sendAdminLoginRequest(this.details).then(() => {
        
      //Redirect to the exact page unless it was clicked
        // if (this.$route.query.from != null) {
        //     this.$router.replace(this.$route.query.from)
        //   } else {
            this.$router.push({ name: "AdminUserPanel" });
          // }
      });
    }
  }
};
</script>
