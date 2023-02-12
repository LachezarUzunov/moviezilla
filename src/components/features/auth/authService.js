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

  if (response.status === 400) {
    const error = await response.json();
    throw new Error(error.message);
  }
  if (response.status === 201) {
    const user = await response.json();
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
};

// Login user
const login = async (user) => {
  const response = await fetch(`${APP_URL}/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    const error = await response.json();
    throw new Error(error.message);
  }
  if (response.status === 200) {
    const user = await response.json();
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("list");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
