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

              </div>
              <!-- /.card-header -->
              <div class="card-body p-5">

                  <form>
                    <div class="form-group">
                    <label for="email">Name</label>
                    <input
                        type="text"
                        class="form-control"
                        id="name"
                        v-model="details.name"
                        placeholder="Enter name"
                    />
                    </div>
                    <div class="form-group">
                    <label for="email">Email address</label>
                    <input
                        type="email"
                        class="form-control"
                        id="email"
                        v-model="details.email"
                        placeholder="Enter email"
                    />
                    </div>

                    <div class="form-group">
                    <label for="bio">Bio</label>
                    <textarea
                        rows="3"
                        class="form-control"
                        id="bio"
                        v-model="details.bio"
                        placeholder="Enter your Bio"
                    ></textarea>
                    </div>
                    
                    <!-- <div class="modal-footer justify-content-between"> -->
                    <button type="button" @click="UpdateUserDetails" class="btn btn-primary">Save changes</button>
                    <!-- </div> -->
                  </form>
           
              </div>
              <!-- /.card-body -->
            
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

  
  </div>
</template>


<script>
import HeaderSideBar from "@/components/admin/HeaderSideBar.vue";
import Footer from "@/components/admin/Footer.vue";
import axios from 'axios'

export default {
  name: "EditUserDetails",
  props: ['userId'],
  components: {
    HeaderSideBar,
    Footer,
  },
   data: function () {
    return {
      details: {
        name: '',
        email: '',
        bio: '',
      },
    };
  },
  methods: {
      editUserPost: function () {
      axios.get(process.env.VUE_APP_API_URL + "allusers/" + this.userId)
        .then((response) => {
          this.details.name = response.data.name;
          this.details.email = response.data.email;
          this.details.bio = response.data.bio;

        })
        .catch(function (error) {
          console.log(error.message);
        });
    },
    UpdateUserDetails() {
        console.log(this.userId);
       axios
        .put(process.env.VUE_APP_API_URL + "allusers/" + this.userId, {
            'name': this.details.name,
            'email': this.details.email,
            'bio': this.details.bio,
        })
        .then((response) => {
          console.log(response);
         this.editUserPost();
         this.makeToast();
        })
        .catch(function (error) {
          console.log(error.message);
        });
    },
     makeToast() {
      this.$bvToast.toast("Update was successful", {
        title: "Success",
        variant: "success",
        solid: true,
      });
    },
     
  },
  created() {
    this.editUserPost();
  },
};
</script>
