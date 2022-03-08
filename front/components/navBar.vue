<template>
  <nav>
    <v-toolbar dark color="green">
      <v-toolbar-title>
        <nuxt-link to="/">NodeBird</nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-form @submit.prevent="onSearchHashtag">
          <div
            :style="{ display: 'flex', height: '100%', alignItems: 'center' }"
          >
            <v-text-field
              v-model="hashtag"
              label="검색"
              hide-details
              prepend-icon="mdi-magnify"
            />
          </div>
        </v-form>
        <v-btn
          v-if="me"
          text
          nuxt
          to="/profile"
          :style="{ display: 'flex', alignItems: 'center' }"
        >
          <div>프로필</div>
        </v-btn>
        <v-btn
          v-if="!me"
          text
          nuxt
          to="/signup"
          :style="{ display: 'flex', alignItems: 'center' }"
        >
          <div>회원가입</div>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      hashtag: "",
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
  },
  methods: {
    onSearchHashtag() {
      this.$router.push({
        path: `/hashtag/${this.hashtag}`,
      });
      this.hashtag = "";
    },
  },
};
</script>

<style>
</style>