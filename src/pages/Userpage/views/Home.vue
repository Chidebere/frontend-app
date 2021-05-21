<template>
  <div class="login mt-5">
    <div class="content-wrapper">
      <section class="content">
        <div class="container">
          <div class="card m-2">
            <div class="card-header">
              All Members
            </div>
            <div class="card-body col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

              <div class="row">
                <div v-for="(user, index) in paginatedUsers.slice(0, 4)" :key="index" class="card col-md-3 mb-2">
                  <img v-if="!user.pic" class="card-img-top" src="/assets/img/user.png" width="50px;">
                  <img v-else class="card-img-top" :src="'/storage/profile/' + user.pic" width="50px;">
                  <div class="card-body" style="text-align: center;">
                    <p class="card-text" style="font-weight: 600;">{{user.name}}</p>
                    <router-link :to="{ name: 'ProfileDetail', params: {username: user.username }}" class="btn btn-primary">View profile</router-link>
                  </div>
                </div>

              </div>

            </div>

            <div class="card-footer pb-0 pt-0">
              <b-row>
                <b-col class="my-2">
                  <b-pagination @change="onPageChanged" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" first-text="First" prev-text="Prev" next-text="Next" last-text="Last" class="my-0" align="center" />
                </b-col>
              </b-row>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  namespaced: true,
  data: function () {
    return {
      users: [],
      paginatedUsers: [],
      currentPage: 1,
      perPage: 4,
      totalRows: "",
    };
  },

  methods: {
    getUsers: function () {
      axios
        .get(process.env.VUE_APP_API_URL + "getAllUserData")
        .then((response) => {
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
  },

  created() {
    this.getUsers();
    this.paginate(this.perPage, 0);
  },
};
</script>