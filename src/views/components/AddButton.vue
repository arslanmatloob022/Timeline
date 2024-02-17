<template>
  <button class="AddButton">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "AddButton",
};
</script>
<style scoped>
.AddButton {
  background-color: #82d616;
  padding: 4px 10px;
  border: none;
  border-radius: 6px;
  color: #ffffff;
  cursor: pointer;
  transition: all ease-in-out 0.2s;
}
.AddButton:hover {
  transform: scale(1.009);
  box-shadow: 0 0 1px 2px #82d61640;
}
</style>
