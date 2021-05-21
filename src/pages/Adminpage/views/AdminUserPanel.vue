<template>
  <div class="hold-transition sidebar-mini">
    <div class="wrapper">
      <HeaderSideBar />

      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Users</h1>
              </div>
              
            </div>
          </div><!-- /.container-fluid -->
        </section>
        
         <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
         <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">User Lists</h3>

                <div class="card-tools">
                  <div class="input-group input-group-sm" style="width: 150px;">
                   <button class="btn btn-lg btn btn-block btn-primary" type="button" data-toggle="modal" data-target="#modal-default"><i class="nav-icon fas fa-plus"></i> Add User</button>
                  </div>
                </div>

              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(user, index) in paginatedUsers.slice(0, 10)" :key="index">
                      <td>
                        <div class="col-md-2">
                          <img v-if="!user.pic" src="/assets/img/user.png" class="rounded-circle" width="50px;">
                          <img v-else :src="'/storage/profile/' + user.pic" class="rounded-circle" width="50px;">
                          {{user.name}}
                        </div>
                      </td>
                      <td>{{user.email}}</td>
                      <td>
                        <span class="badge badge-success" v-if="user.pvt == 0">Public</span>
                        <span class="badge badge-warning" v-else>Private</span>
                        </td>
                      <td>
                        <!-- <router-link :to="{ name: 'ViewUserDetails', params: {userId: user.id}}"><span class="badge badge-info" title="View User" style="color: #fff; padding: 5px;"><i class="nav-icon fas fa-eye"></i></span></router-link> | -->
                        <router-link :to="{ name: 'EditUserDetails', params: {userId: user.id}}"><span class="badge badge-info" title="Edit User" style="color: #fff; padding: 5px;"><i class="nav-icon fas fa-edit"></i></span></router-link> |
                         <span @click="deleteUserDetails(user.id)" class="badge badge-danger" title="Delete User" style="color: #fff; padding: 5px;"><i class="nav-icon fas fa-trash"></i></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
              <div class="card-footer pb-0 pt-0">
                <b-row>
                  <b-col class="my-2">
                    <b-pagination @change="onPageChanged" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" first-text="First" prev-text="Prev" next-text="Next" last-text="Last" class="my-0" align="center" />
                  </b-col>
                </b-row>
              </div>
            </div>
            <!-- /.card -->
          </div>
        </div>
        <!-- /.row -->
        <!-- /.content -->
      </div>
    </section>
      </div>
      <!-- /.content-wrapper -->

      <Footer />
    </div>

    <div class="modal fade" id="modal-default">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Create New User</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            
              <form>
                <div class="form-group">
                  <label for="email">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.name }"
                    id="name"
                    v-model="details.name"
                    placeholder="Enter name"
                  />
                  <div class="invalid-feedback" v-if="errors.name">
                    {{ errors.name[0] }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="email">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors.email }"
                    id="email"
                    v-model="details.email"
                    placeholder="Enter email"
                  />
                  <div class="invalid-feedback" v-if="errors.email">
                    {{ errors.email[0] }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    :class="{ 'is-invalid': errors.password }"
                    id="password"
                    v-model="details.password"
                    placeholder="Password"
                  />
                  <div class="invalid-feedback" v-if="errors.password">
                    {{ errors.password[0] }}
                  </div>
                </div>

                <div class="form-group">
                  <label for="bio">Bio</label>
                  <textarea
                    rows="3"
                    class="form-control"
                    :class="{ 'is-invalid': errors.bio }"
                    id="bio"
                    v-model="details.bio"
                    placeholder="Enter your Bio"
                  ></textarea>
                  <div class="invalid-feedback" v-if="errors.bio">
                    {{ errors.bio[0] }}
                  </div>
                </div>
                
                 <div class="modal-footer justify-content-between">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="button" @click="CreateUser" class="btn btn-primary">Save changes</button>
                </div>
              </form>

            </div>
           
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->
  </div>
</template>


<script>
import HeaderSideBar from "@/components/admin/HeaderSideBar.vue";
import Footer from "@/components/admin/Footer.vue";
import axios from 'axios'
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AdminUserPanel",
  components: {
    HeaderSideBar,
    Footer,
  },
   data: function () {
    return {
      details: {
        name: null,
        email: null,
        password: null,
        bio: null,
      },

      users: [],
      paginatedUsers: [],
      currentPage: 1,
      perPage: 10,
      totalRows: "",
    };
  },
  methods: {
    getUsers: function () {
      axios.get(process.env.VUE_APP_API_URL + "allusers")
        .then((response) => {
          // console.log(response);
          this.users = response.data;
          this.paginatedUsers = response.data;
          this.totalRows = response.data.length;
        })
        .catch(function (error) {
          console.log(error.message);
        });
    },
    paginate(pageSize, pageNumber) {
      const itemsToParse = this.users;
      this.paginatedUsers = itemsToParse.slice(
        pageNumber * pageSize,
        (pageNumber + 1) * pageSize
      );
    },
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1);
    },

    deleteUserDetails(userId) {
       axios
        .delete(process.env.VUE_APP_API_URL + "allusers/" + userId)
        .then((response) => {
          console.log(response);
         this.getUsers();
         this.makeToast();
        })
        .catch(function (error) {
          console.log(error.message);
        });
    },
     makeToast() {
      this.$bvToast.toast("Delete was successful", {
        title: "Success",
        variant: "success",
        solid: true,
      });
    },
     makeToast2() {
      this.$bvToast.toast("Account creation was successful", {
        title: "Success",
        variant: "success",
        solid: true,
      });
    },

     ...mapActions("auth", ["sendCreateUserRequest"]),

    CreateUser: function() {
      this.sendCreateUserRequest(this.details).then(() => {
        this.getUsers();
        this.makeToast2();
      });
    }
  },

 computed: {
    ...mapGetters(["errors"])
  },

  mounted() {
    this.$store.commit("setErrors", {});
  },
  created() {
    this.getUsers();
    this.paginate(this.perPage, 0);
  },
};
</script>
