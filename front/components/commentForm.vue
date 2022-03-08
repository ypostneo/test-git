<template>
  <v-card class="out-box">
    <v-container>
      <v-form
        ref="form"
        v-model="valid"
        class="comment-form"
        @submit.prevent="onSubmitForm"
      >
        <v-textarea
          v-model="content"
          filled
          auto-grow
          clearable
          label="댓글달기"
          :hide-details="hideDetails"
          :success-messages="successMessages"
          :success="success"
          :rules="rules"
          :error="error"
          @input="onChangeTextarea"
        />
        <v-btn color="green" dark absolute top right type="submit">
          댓글작성
        </v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "CommentForm",
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      valid: false,
      hideDetails: false,
      successMessages: "",
      success: false,
      content: "",
      // rules: [
      //   (v) => !!v || "내용을 입력해주세요.",
      //   (v) => {
      //     const replaceV = v.replace(/(\s*)/g, "");
      //     return replaceV.length >= 5 || "5자리 이상 입력해주세요.";
      //   },
      // ],
      rules: [
        (v) => {
          const replaceV = v.replace(/(\s*)/g, "");
          return !!replaceV || "댓글을 입력해주세요.";
        },
      ],
      error: false,
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
  },
  methods: {
    onChangeTextarea(value) {
      if (value.length) {
        this.hideDetails = false;
        this.success = false;
        this.successMessages = "";
      }
    },
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("posts/addComment", {
            id: Date.now(),
            postId: this.postId,
            content: this.content,
            User: {
              nickname: this.me.nickname,
            },
          })
          .then(() => {
            this.content = "";
            this.hideDetails = false;
            this.success = true;
            this.successMessages = "댓글이 등록 되었습니다.";
            this.error = false;
          })
          .catch(() => {});
      }
    },
  },
};
</script>

<style scoped>
.out-box {
  margin-bottom: 20px;
}
.comment-form {
  position: relative;
}
</style>
