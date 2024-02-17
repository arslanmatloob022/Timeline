import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const SweetAlertPlugin = {
  install(Vue) {
    Vue.prototype.$swal = Swal;
  },
};

export default SweetAlertPlugin;
