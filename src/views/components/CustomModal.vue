<template>
  <div class="custom-modal" v-if="show">
    <div class="modal-content" :class="size ? size : 'sm'">
      <div class="modal-header">
        <h4>{{ title }}</h4>
        <!-- <button >Close</button> -->
        <i
          @click="closeModal"
          style="color: #ffffff"
          class="fa fa-close close-btn"
        ></i>
      </div>
      <div class="modal-body">
        <!-- Slot for custom content -->
        <slot></slot>
      </div>
      <div class="modal-footer">
        <slot class="action-btn" name="actions">
          <button class="close-btn" @click="closeModal">Close</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  props: {
    title: {
      type: String,
      default: "Modal Title",
    },
    size: {
      type: String,
      default: "large",
    },
  },
  methods: {
    openModal() {
      this.show = true;
    },
    closeModal() {
      this.show = false;
    },
  },
};
</script>

<style scoped>
.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}

.modal-content {
  background-color: #fff;
  padding: 8px;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.large {
  width: 700px;
}
.small {
  width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
  padding: 8px 16px;
}

.close-btn {
  background-color: #8392ab;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-body {
  padding: 6px 18px;
  border-bottom: 1px solid #ccc;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.action-btn {
  background-color: #82d616;
  color: #fff;
  padding: 8px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
