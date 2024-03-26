<template>
  <div>
    <Contractors></Contractors>
  </div>
</template>

<script>
import Contractors from "../components/models/Contractors.vue";

export default {
  name: "authors-table",
  data() {
    return {};
  },
  components: {
    Contractors,
  },
  methods: {},
  mounted() {},
  computed: {},
};
</script>
<style scoped>
.action-btn {
  background-color: #82d616;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.inputField {
  width: 100%;
  padding: 4px 14px;
  border-radius: 8px;
  border: 1px solid #cccccc;
}
.inputField:focus {
  border: 2px solid #82d616; /* Change the border color when in focus */
  outline: none; /* Remove the default focus outline */
  box-shadow: 0 0 5px #82d61670;
}
.inputField:active {
  background-color: #f8f9fa;
}
.dropdownOptions {
  border-radius: 8px;
}
</style>
