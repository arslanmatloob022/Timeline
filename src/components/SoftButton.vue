<template>
  <button
    class="btn mb-0"
    :class="getClasses(variant, color, size, fullWidth, active)"
  >
    <slot v-if="!loading" />
    <!-- <i  class="fa fa-spinner" style="color: #ffffff"></i> -->
    <div v-else style="display: flex; align-items: center; justify-content: center;">
      <div class="loader">

      </div>
    </div>
    <!-- <img  src="@/assets/logo/icons8-loading.gif" /> -->
    <!-- <p >Loading...</p> -->
  </button>
</template>

<script>
export default {
  name: "SoftButton",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "success",
    },
    size: {
      type: String,
      default: "md",
    },
    variant: {
      type: String,
      default: "fill",
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getClasses: (variant, color, size, fullWidth, active) => {
      let colorValue, sizeValue, fullWidthValue, activeValue;

      // Setting the button variant and color
      if (variant === "gradient") {
        colorValue = `bg-gradient-${color}`;
      } else if (variant === "outline") {
        colorValue = `btn-outline-${color}`;
      } else {
        colorValue = `btn-${color}`;
      }

      sizeValue = size ? `btn-${size}` : null;

      fullWidthValue = fullWidth ? `w-100` : null;

      activeValue = active ? `active` : null;

      return `${colorValue} ${sizeValue} ${fullWidthValue} ${activeValue}`;
    },
  },
};
</script>
<style>
/* HTML: <div class="loader"></div> */
/* HTML: <div class="loader"></div> */
/* HTML: <div class="loader"></div> */
.loader {
  width: 25px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: 
    radial-gradient(farthest-side,#fdfdfd 94%,#0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%,#ffffff);
  -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0);
  animation: l13 1s infinite linear;
}
@keyframes l13{ 
  100%{transform: rotate(1turn)}
}
</style>
