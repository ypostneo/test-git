<template>
  <v-list>
    <v-col
      v-for="user in users"
      :key="user.id"
      cols="12"
      md="4"
      style="display: inline-block"
    >
      <v-list-item>
        <v-list-item-avatar color="indigo">
          <span class="white--text">{{ user.nickname[0] }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ user.nickname }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn class="ma-2" text icon @click="remove(user.id)">
            <v-icon>mdi-minus-circle-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-col>
  </v-list>
</template>

<script>
export default {
  name: "FollowList",
  props: {
    users: {
      type: Array,
      required: true,
    },
    remove: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped>
.del-btn {
  padding: 0;
  min-width: none;
}
</style>
