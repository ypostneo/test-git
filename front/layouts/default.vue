<template>
  <v-app>
    <NavBar />
    <v-row no-gutters>
      <v-col cols="12" md="3">
        <login-form />
      </v-col>
      <v-col cols="12" md="9">
        <nuxt />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import LoginForm from "~/components/LoginForm";
import NavBar from "~/components/NavBar";

export default {
  name: "DefaultLayout",
  components: {
    LoginForm,
    NavBar,
  },
  head() {
    return {
      title: "MAIN",
    };
  },
  computed: {
    // name() {
    //   return this.$store.state.posts.name;
    // },
  },
  methods: {
    // onChangeName() {
    //   this.$store.commit("posts/bye");
    // },
  },
};
</script>

<style scoped>
a {
  display: inline-block;
  text-decoration: none;
  color: inherit;
}
</style>
