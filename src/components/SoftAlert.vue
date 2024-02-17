<template>
  <transition name="slide-fade">
    <div
      class="alert text-white font-weight-bold poitionAlter"
      role="alert"
      :class="getClasses(color, dismissible)"
    >
      <span class="alert-icon">
        <i :class="getIcon(icon)" />
      </span>
      <span class="alert-text">
        &nbsp;
        <slot />
      </span>
      <button
        v-if="dismissible"
        type="button"
        class="btn-close d-flex justify-content-center align-items-center"
        data-bs-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true" class="text-lg font-weight-bold">&times;</span>
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: "SoftAlert",
  props: {
    color: {
      type: String,
      default: "success",
    },
    icon: {
      type: String,
      default: "",
    },
    dismissible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getClasses: (color, dismissible) => {
      let colorValue, dismissibleValue;

      colorValue = color ? `alert-${color}` : null;

      dismissibleValue = dismissible ? "alert-dismissible fade show" : null;

      return `${colorValue} ${dismissibleValue}`;
    },
    getIcon: (icon) => (icon ? icon : null),
  },
};
</script>
<style scoped>
.poitionAlter {
  position: absolute;
  bottom: 20px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
