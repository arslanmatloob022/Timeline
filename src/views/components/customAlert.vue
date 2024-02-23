<template>
  <div class="custom-modal" v-if="show">
    <div class="modal-content">
      <div class="modal-body">
        <i :class="alertData.icon" class="icon"></i>
        <h4>{{ alertData.alertTitle }}</h4>
        <p>{{ alertData.alertDescription }}</p>
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
    alertData: {
      icon: {
        type: String,
        default: "fa:bell",
      },
      alertTitle: {
        type: String,
        default: "Modal Title",
      },
      alertDescription: {
        type: String,
        default: "This is Alert Description",
      },
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
  width: 25%;
  background-color: #fff;
  padding: 8px;
  border-radius: 32px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.icon {
  margin: 24px;
  font-size: 56px;
  color: orangered;
}

.modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
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
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-bottom: 1px solid #ccc;
}

.modal-footer {
  display: flex;
  justify-content: space-around;
}

.action-btn {
  background-color: #9c1111;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
