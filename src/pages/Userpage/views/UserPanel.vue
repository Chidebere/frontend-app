<template>
  <div class="login mt-5">
    <div class="content-wrapper">
      <section class="content">
        <div class="container">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="card m-2">
              <div class="card-header">
                Following
              </div>
              <div class="card-body col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Photo</th>
                      <th scope="col">Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(following, i) in paginatedFollowings.slice(0, 4)" :key="i">
                      <td>
                        <div class="col-md-2">
                          <img v-if="!following.pic" src="/assets/img/user.png" class="rounded-circle" width="50px;">
                          <img v-else :src="'/storage/profile/' + following.pic" class="rounded-circle" width="50px;">
                        </div>
                      </td>
                      <td>{{following.name}}</td>
                      <td>
                        <router-link :to="{ name: 'ProfileDetail', params: {username: following.username }}" class="btn btn-primary">View profile</router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
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

          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="card m-2">
              <div class="card-header">
                Followers
              </div>
              <div class="card-body col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Photo</th>
                      <th scope="col">Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(follower, i) in paginatedFollowers.slice(0, 4)" :key="i">
                      <td>
                        <div class="col-md-2">
                          <img v-if="!follower.pic" src="/assets/img/user.png" class="rounded-circle" width="50px;">
                          <img v-else :src="'/storage/profile/' + follower.pic" class="rounded-circle" width="50px;">
                        </div>
                      </td>
                      <td>{{follower.name}}</td>
                      <td>
                        <router-link :to="{ name: 'ProfileDetail', params: {username: follower.username }}" class="btn btn-primary">View profile</router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card-footer pb-0 pt-0">
                <b-row>
                  <b-col class="my-2">
                    <b-pagination @change="onPageChanged2" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" first-text="First" prev-text="Prev" next-text="Next" last-text="Last" class="my-0" align="center" />
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>

          <!-- <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="card m-2">
                        <div class="card-header">
                         My Followers
                        </div>
                        <div class="card-body col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            
                        </div>
                    </div>
                </div> -->
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  props: ["username"],
  data: function () {
    return {
      followings: [],
      followers: [],
      paginatedFollowings: [],
      paginatedFollowers: [],
      currentPage: 1,
      perPage: 4,
      totalRows: "",

      currentPage2: 1,
      perPage2: 4,
      totalRows2: "",
    };
  },
  computed: {
    ...mapGetters("auth", ["user"]),
  },
  methods: {
    getFollowings: function () {
      axios
        .get(process.env.VUE_APP_API_URL + "getAllFollowings", {
          params: {
            userId: this.user.id,
          },
        })
        .then((response) => {
          this.followings = response.data;
          this.paginatedFollowings = response.data;
          this.totalRows = response.data.length;
        })
        .catch(function (error) {
          console.log(error.message);
        });
    },

    getFollowers: function () {
      axios
        .get(process.env.VUE_APP_API_URL + "getAllFollowers", {
          params: {
            userId: this.user.id,
          },
        })
        .then((response) => {
          this.followers = response.data;
          this.paginatedFollowers = response.data;
          this.totalRows2 = response.data.length;
        })
        .catch(function (error) {
          console.log(error.message);
        });
    },

    paginate(pageSize, pageNumber) {
      const itemsToParse = this.followings;
      this.paginatedFollowings = itemsToParse.slice(
        pageNumber * pageSize,
        (pageNumber + 1) * pageSize
      );
    },
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1);
    },

    paginate2(pageSize2, pageNumber2) {
      const itemsToParse2 = this.followers;
      this.paginatedFollowers = itemsToParse2.slice(
        pageNumber2 * pageSize2,
        (pageNumber2 + 1) * pageSize2
      );
    },
    onPageChanged2(page) {
      this.paginate2(this.perPage2, page - 1);
    },
  },
  created() {
    this.getFollowings();
    this.getFollowers();
  },
};
</script>