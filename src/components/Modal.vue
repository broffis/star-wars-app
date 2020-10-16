<template>
  <div class="modal" role="document">
    <header v-if="showHeader" class="modal__header">
      <h3 class="modal__heading">
        {{ headerText }}
      </h3>
      <button
        type="button"
        class="modal__close icon"
        aria-label="Close modal"
        data-modal="toggle"
        data-target="#modal"
        @click="closeModal"
      >
        <!-- <i class="fas fa-times"></i> -->
        <i class="fas fa-times-circle"></i>
        
      </button>
    </header>
    <slot name="modal-body">
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime illo
        totam ad non iure laudantium cumque ullam accusantium atque quis minus
        reiciendis, ab architecto, expedita vero quam necessitatibus quia at.
      </p>
    </slot>
    <slot name="modal-footer" />
  </div>
</template>

<script>
export default {
  name: 'Modal',

  props: {
    headerText: {
      type: String,
      default: ''
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>
