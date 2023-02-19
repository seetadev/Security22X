<template>
  <div class="card-container">
    <md-card>
        <md-card-header>
          <div class="md-title">{{ title }}</div>
        </md-card-header>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "titlecard",
  props: ['title'],
  props: {
    title: String,
  },
};
</script>

<style lang="scss" scoped>
.card-container {
  padding-top: 10px;
  margin: auto;
  width: 200px;
  visibility: hidden;
}
</style>