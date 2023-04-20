import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("users", () => {
  // User variable, if you are not logged in, then is null, otherwise it will have the user info
  const user = ref(null);
  const errorMessage = ref("");
  const loading = ref(false);
  const loadingUser = ref(false);

  // Validating email
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async (credentials) => {
    const { email, password } = credentials;

    // Validating email
    if (!validateEmail(email)) {
      return (errorMessage.value = "Email is invalid");
    }

    //Validating password
    if (!password.length) {
      return (errorMessage.value = "Password cannot be empty");
    }

    loading.value = true;

    // Checking that the email and password are correct
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    //if we do not have an error then it means that we are authenticated
    if (error) {
      loading.value = false;
      return (errorMessage.value = error.message);
    }

    console.log({ data });

    const { data: existingUser } = await supabase
      .from("users")
      .select()
      .eq("email", email)
      .maybeSingle();

    user.value = {
      username: existingUser.username,
      hospital: existingUser.hospital,
      email: existingUser.email,
      id: existingUser.id,
    };

    loading.value = false;
    errorMessage.value = "";
    // console.log(user.value);
  };

  // Input validation
  const handleSignup = async (credentials) => {
    const { email, password, username } = credentials;

    if (!validateEmail(email)) {
      return (errorMessage.value = "Email is invalid");
    }

    if (username.length < 4) {
      return (errorMessage.value = "username length is too short");
    }

    if (password.length < 6) {
      return (errorMessage.value = "Password length is too short");
    }

    loading.value = true;

    // Validate if the user exists
    const { data: userWithUsername } = await supabase
      .from("users")
      .select()
      .eq("username", username)
      .maybeSingle();

    // Error in case user exists
    if (userWithUsername) {
      loading.value = false;
      return (errorMessage.value = "User already exists");
    }

    // Validating if the email already exists
    const { data: userWithEmail } = await supabase
      .from("users")
      .select()
      .eq("email", email)
      .maybeSingle();

    // Error in case email exists, to the front-end
    if (userWithEmail) {
      loading.value = false;
      return (errorMessage.value = "Email is already registered");
    }

    errorMessage.value = "";

    // Signup the user
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      loading.value = false;
      return (errorMessage.value = error.message);
    }

    // Adding the user to the db
    await supabase.from("users").insert({
      username,
      email,
    });

    // Retrieve the information from the user
    const { data: newUser } = await supabase
      .from("users")
      .select()
      .eq("email", email)
      .maybeSingle();

    // Set user to the value created
    if (newUser) {
      console.log("it exists");
      user.value = {
        email: newUser.email,
        username: newUser.username,
        hospital: newUser.hospital,
        id: newUser.id,
      };
    } else {
      console.log("there was an error ");
      user.value = null;
      errorMessage.value = "User not found";
    }

    loading.value = false;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    user.value = null;
  };

  const getUser = async () => {
    loadingUser.value = true;
    const { data } = await supabase.auth.getUser();

    if (!data.user) return (user.value = null);

    if (!data.user) {
      loadingUser.value = false;
      return (user.value = null);
    }

    const { data: userWithEmail } = await supabase
      .from("users")
      .select()
      .eq("email", data.user.email)
      .single();

    user.value = {
      username: userWithEmail.username,
      hospital: userWithEmail.hospital,
      email: userWithEmail.email,
      id: userWithEmail.id,
    };
    // loading.value = false;
    loadingUser.value = false;
  };

  const clearErrorMessage = () => {
    errorMessage.value = "";
  };

  return {
    user,
    errorMessage,
    loading,
    loadingUser,
    handleLogin,
    handleSignup,
    handleLogout,
    getUser,
    clearErrorMessage,
  };
});
