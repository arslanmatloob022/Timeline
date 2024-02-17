// plugins/notification.js
import NotificationAlert from "@/views/components/softAlert.vue";

const NotificationPlugin = {
  install(Vue) {
    Vue.component("NotificationAlert", NotificationAlert);

    Vue.mixin({
      methods: {
        $notify({ message, color, icon, duration }) {
          this.$store.dispatch("showNotification", {
            message,
            color,
            icon,
            duration,
          });
        },
      },
    });
  },
};

export default NotificationPlugin;
