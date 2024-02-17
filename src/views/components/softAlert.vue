<template>
  <div
    v-if="notification"
    class="notification"
    :style="{ backgroundColor: notification.color }"
  >
    <span class="notification-icon">{{ notification.icon }}</span>
    <span class="notification-text">{{ notification.message }}</span>
  </div>
</template>

<script>
export default {
  computed: {
    notification() {
      return this.$store.state.notification;
    },
  },
};
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 10px;
  left: 10px;
  padding: 15px;
  border-radius: 5px;
  color: #fff;
  display: flex;
  align-items: center;
  max-width: 300px;
}

.notification-icon {
  margin-right: 10px;
}

/* You can add more styles as needed */
</style>
