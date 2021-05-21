<template>
  <div>
    <div class="container">

      <div class="card mt-5">
        <div class="card-header">
          <h3 class="card-title">Profile Detail </h3>
        </div>

        <div class="card">
          <div class="row g-0">
            <div class="col-md-4">
              <img v-if="!userData.pic" class="card-img-top" src="/assets/img/user.png" width="50px;">
              <img v-else class="card-img-top" :src="'/storage/profile/' + userData.pic" width="50px;">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{userData.name}}</h5>
                <p class="card-text" style="text-justify">{{userData.bio}}</p>
                <p class="card-text">
                  <small v-if="userData.pvt == 1" class="text-muted">Private Account</small>
                  <small v-else class="text-muted">Public Account</small>
                </p>

                <b-button v-if="following !== null" @click="UpdateStatusUnfollow(userData.id)" class="float-right" variant="danger">Unfollow</b-button>
                <b-button v-else @click="UpdateStatusFollow(userData.id)" class="float-right" variant="primary">Follow</b-button>

              </div>
            </div>
          </div>
        </div>
      </div>
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
      userData: "",
      following: [],
    };
  },
  computed: {
    ...mapGetters("auth", ["user"]),
  },
  methods: {
    getSpecificUser: function () {
      if (this.user) {
        axios
          .get(process.env.VUE_APP_API_URL + "getSpecificUser", {
            params: {
              username: this.username,
              userId: this.user.id,
            },
          })
          .then((response) => {
            this.userData = response.data.user;
            this.following = response.data.following;
          })
          .catch(function (error) {
            console.log(error.message);
          });
      } else {
        axios
          .get(process.env.VUE_APP_API_URL + "getSpecificUser", {
            params: {
              username: this.username,
              //   userId: this.user.id
            },
          })
          .then((response) => {
            this.userData = response.data.user;
            this.following = response.data.following;
          })
          .catch(function (error) {
            console.log(error.message);
          });
      }
    },

    UpdateStatusFollow(followedUserId) {
      if (this.userData.pvt == 1) {
        this.$router.push({ name: "Login" });
      } else if (!localStorage.getItem("authToken")) {
        if (this.$route.query.from != null) {
          this.$router.replace(this.$route.query.from);
        } else {
          this.$router.push({
            name: "AuthProfileDetail",
            params: { username: this.username },
          });
          // this.$router.push({ name: "UserProfile", params: {username: this.username, status: this.userData.pvt } });
        }
      } else {
        axios
          .get(process.env.VUE_APP_API_URL + "updateFollowStatus", {
            params: {
              userId: this.user.id,
              followedUserId: followedUserId,
            },
          })
          .then((response) => {
            console.log(response);
            this.getSpecificUser();
          })
          .catch(function (error) {
            console.log(error.message);
          });
      }
    },

    UpdateStatusUnfollow(followedUserId) {
      if (this.userData.pvt == 1) {
        this.$router.push({ name: "Login" });
      } else if (!localStorage.getItem("authToken")) {
        if (this.$route.query.from != null) {
          this.$router.replace(this.$route.query.from);
        } else {
          this.$router.push({
            name: "AuthProfileDetail",
            params: { username: this.username },
          });
        }
      } else {
        axios
          .get(process.env.VUE_APP_API_URL + "updateUnfollowStatus", {
            params: {
              userId: this.user.id,
              followedUserId: followedUserId,
            },
          })
          .then((response) => {
            this.getSpecificUser();
            this.userData = response.data;
          })
          .catch(function (error) {
            console.log(error.message);
          });
      }
    },
  },
  created() {
    this.getSpecificUser();
  },
};
</script>