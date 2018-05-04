<template>
<b-card v-bind:title="user.name"
  v-bind:img-src="image"
  img-alt="Image"
  img-top
  tag="article"
  style="max-width: 14rem;"
  class="mb-2 mx-auto">
  <p class="card-text">
    {{ user.real_name }}
    <a v-bind:href="mailTo">{{ user.profile.email }}</a>
  </p>
</b-card>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "UserCard",
  props: ["user_id"],
  computed: {
    user: function(){
      return this.users.find(function(row){
        if (row.id === this.user_id){ return true }
      }.bind(this))
    },
    image: function(){
      if (this.user.profile.image_original === undefined){
        return this.user.profile.image_512;
      }
      else {
        return this.user.profile.image_original;
      }
    },
    mailTo: function(){
      return "mailto:" + this.user.profile.email;
    },
    ...mapGetters(["users"])
  }
}
</script>

<style>

</style>
