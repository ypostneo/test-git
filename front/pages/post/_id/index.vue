<template>
  <v-container v-if="post">
    <post-card :post="post" />
  </v-container>
  <v-container v-else>
    <p>해당하는 아이디의 게시글이 없습니다.</p>
  </v-container>
</template>

<script>
import PostCard from "~/components/PostCard";
export default {
  name: "PostPage",
  components: {
    PostCard,
  },
  computed: {
    post() {
      return this.$store.state.posts.mainPosts.find(
        (v) => v.id === parseInt(this.$route.params.id, 10)
      );
    },
  },
};
</script>

<style>
</style>