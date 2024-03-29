import { acceptHMRUpdate, defineStore } from "pinia";
import { ref, computed } from "vue";
import { useStorage } from "@vueuse/core";

export const useUserSession = defineStore("userSession", () => {
  const token = useStorage("token", "");
  const code = useStorage("code", "");

  const user = ref(
    {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      role: "",
      profileImage: "",
      jobPosition: "",
      mobileNo: "",
      phoneNo: "",
      password: "",
      company: 0,
      department: "",
      is_superuser: "",
    } || undefined
  );

  const loading = ref(true);

  const isLoggedIn = computed(
    () => token.value !== undefined && token.value !== ""
  );

  function setUser(newUser) {
    user.value = newUser;
  }

  function setToken(newToken) {
    token.value = newToken;
  }

  function setCode(newCode) {
    code.value = newCode;
  }

  function setLoading(newLoading) {
    loading.value = newLoading;
  }

  async function logoutUser() {
    console.log("user logout fun called");
    token.value = undefined;
    code.value = undefined;
    user.value = undefined;
    isLoggedIn.value = false;
    window.localStorage.setItem("token", "");
  }

  return {
    user,
    code,
    token,
    isLoggedIn,
    loading,
    logoutUser,
    setUser,
    setToken,
    setCode,
    setLoading,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserSession, import.meta.hot));
}
