<template>
  <main class="main">
    <h1 class="align-center">測試</h1>
    <h2 class="align-center">{{ count }}</h2>
    <div class="align-center">
      <button class="btn" @click.prevent="increaseCount(1)">增加</button>
      <button class="btn" @click.prevent="decreaseCount(1)">減少</button>
    </div>
  </main>
</template>

<script>
export default {
  data: () => ({
    count: 0,
  }),
  methods: {
    increaseCount(num) {
      this.count += num;
    },
    decreaseCount(num) {
      this.count -= num;
    },
  },
};
</script>

<style>
.align-center {
  text-align: center;
}
</style>
