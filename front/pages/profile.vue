<template>
  <div>
    <v-container v-if="me">
      <v-card class="out-box">
        <v-container>
          <v-subheader>{{ me.nickname }} 님의 프로필</v-subheader>
          <v-form v-model="valid" @submit.prevent="onChangeNickname">
            <v-text-field
              v-model="nickname"
              label="닉네임"
              required
              :rules="nicknameRules"
            />
            <v-btn color="blue" dark type="submit">수정</v-btn>
          </v-form>
        </v-container>
      </v-card>
      <v-card class="out-box">
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <follow-list :users="followingList" :remove="removeFollowing" />
          <v-btn
            v-if="hasMoreFollowing"
            style="width: 100%"
            color="blue"
            dark
            @click="loadMoreFollowings"
          >
            더보기
          </v-btn>
        </v-container>
      </v-card>
      <v-card class="out-box">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <follow-list :users="followerList" :remove="removeFollower" />
          <v-btn
            v-if="hasMoreFollower"
            style="width: 100%"
            color="blue"
            dark
            @click="loadMoreFollowers"
          >
            더보기
          </v-btn>
        </v-container>
      </v-card>
    </v-container>
    <v-container v-else>
      <v-subheader>로그인이 필요한 페이지 입니다.</v-subheader>
    </v-container>
  </div>
</template>

<script>
import FollowList from "~/components/FollowList";

export default {
  name: "UserProfile",
  components: {
    FollowList,
  },
  middleware: "authenticated",
  data() {
    return {
      valid: false,
      nickname: "",
      nicknameRules: [
        (v) => {
          const replaceV = v.replace(/(\s*)/g, "");
          return !!replaceV || "닉네임을 입력하세요.";
        },
      ],
    };
  },
  fetch({ store }) {
    store.dispatch("users/loadFollwers");
    store.dispatch("users/loadFollwings");
  },
  head() {
    return {
      title: "프로필",
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    followerList() {
      return this.$store.state.users.followerList;
    },
    followingList() {
      return this.$store.state.users.followingList;
    },
    hasMoreFollowing() {
      return this.$store.state.users.hasMoreFollowing;
    },
    hasMoreFollower() {
      return this.$store.state.users.hasMoreFollower;
    },
  },
  methods: {
    onChangeNickname(value) {
      this.$store.dispatch("users/changeNickname", {
        nickname: this.nickname,
      });
    },
    removeFollowing(id) {
      this.$store.dispatch("users/removeFollowing", { id });
    },
    removeFollower(id) {
      this.$store.dispatch("users/removeFollower", { id });
    },
    loadMoreFollowings() {
      this.$store.dispatch("users/loadFollwings");
    },
    loadMoreFollowers() {
      this.$store.dispatch("users/loadFollwers");
    },
  },
};
</script>

<style scoped>
.out-box {
  margin-bottom: 20px;
}
</style>>
