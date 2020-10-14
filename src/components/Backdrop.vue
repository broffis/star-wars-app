<template>
  <div class="backdrop" @click="close" />
</template>

<script>
export default {
  name: "Backdrop",

  methods: {
    close() {
      this.$emit('close');
    }
  }

}
</script>
