const APP_URL = "/api/users";

// Register user
const register = async (userData) => {
  const response = await fetch(APP_URL, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 201) {
    const user = await response.json();
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
  // return response.data;
};

const authService = {
  register,
};

export default authService;
