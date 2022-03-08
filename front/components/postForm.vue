<template>
  <v-card class="out-box">
    <v-container>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-textarea
          v-model="content"
          outlined
          auto-grow
          clearable
          label="어떤일이 일어나고 있나요?"
          :hide-details="hideDetails"
          :success-messages="successMessages"
          :success="success"
          :rules="rules"
          :error="error"
          @input="onChangeTextarea"
        />
        <input ref="imageInput" type='file' multiple hidden @change="onChangeImages">
        <v-btn type="button" @click="onClickImageUpload">이미지 업로드</v-btn>
          <div v-for="(p, i) in imagePaths" :key="p" class="img-box">
            <img :src="`http://localhost:3085/${p}`" :alt="p">
          <div>
            <v-btn type="button" @click="onRemoveImage(i)">제거</v-btn>
          </div>
        </div>
        <!-- <div v-for="(p, i) in imagePaths" :key="p" style="display: inline-block">
            <img :src="`http://localhost:3085/${p}`" :alt="p" style="width: 200px">
            <div>
              <button @click="onRemoveImage(i)" type="button">제거</button>
            </div>
          </div> -->
        <v-btn type="submit" color="green" absolute right>작성</v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PostForm",
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
          return !!replaceV || "내용을 입력해주세요.";
        },
      ],
      error: false,
    };
  },
  computed: {
    ...mapState("users", ["me"]),
    ...mapState('posts', ['imagePaths'])
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
          .dispatch("posts/add", {
            content: this.content,
          })
          .then(() => {
            this.content = "";
            this.hideDetails = false;
            this.success = true;
            this.successMessages = "게시글 등록 성공!";
            this.error = false;
          })
          .catch(() => {});
      }
    },
    onClickImageUpload() {
        this.$refs.imageInput.click();
      },
      onChangeImages(e) {
        console.log("프론트",e.target.files);
        const imageFormData = new FormData();
        //유사배열일때
        [].forEach.call(e.target.files, (f) => {
          imageFormData.append('image', f);   // { image: [file1, file2] }
        });
        this.$store.dispatch('posts/uploadImages', imageFormData);
      },
      onRemoveImage(index) {
        this.$store.commit('posts/removeImagePath', index);
      }
  },
};
</script>
<style scoped>
.out-box {
  margin-bottom: 20px;
}
.img-box {
  display: inline-block;
  width: 200px;
  height: auto;
  border:1px solid #666666;
}
.img-box img{
  width:100%;
}
</style>
