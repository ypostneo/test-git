<template>
  <v-container v-if="!me">
    <v-card>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-container>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="이메일"
            type="email"
            required
          />
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="비밀번호"
            type="password"
            required
          />
          <v-btn color="green" type="submit" :disabled="!valid">로그인</v-btn>
          <v-btn nuxt to="/signup">회원가입</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
  <v-container v-else>
    <v-card>
      <v-container>
        <p>{{ me.nickname }}님 로그인되었습니다.</p>
        <v-btn @click="onLogOut">로그아웃</v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "이메일은 필수입니다.",
        (v) => /.+@.+/.test(v) || "유효하지 않은 이메일 입니다.",
      ],
      passwordRules: [(v) => !!v || "비밀번호를 입력하세요."],
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
  },
  methods: {
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('users/logIn', {
            email: this.email,
            password: this.password,
          });
        }
      },
      onLogOut() {
        this.$store.dispatch('users/logOut');
      },
    },
};
</script>

<style>
</style>
