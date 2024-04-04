export const loginUser = async (payload) => {
  const jsonPayload = JSON.stringify(payload);
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set correct content type for JSON data
      },
      body: jsonPayload,
    });
    const { status } = response;
    const data = await response.json();
    data.status = status;

    return data;
  } catch (e) {
    return e;
  }
};

// Register User

export const registerUser = async (payload) => {
  const jsonPayload = JSON.stringify(payload);
  try {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set correct content type for JSON data
      },
      body: jsonPayload,
    });
    const { status } = response;
    const data = await response.json();
    data.status = status;
    return data;
  } catch (e) {
    return e;
  }
};

// Logout a user

export const logoutUser = async (payload) => {
  const jsonPayload = JSON.stringify(payload);
  try {
    const response = await fetch("http://localhost:3000/api/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set correct content type for JSON data
      },
      body: jsonPayload,
    });
    const { status } = response;
    const data = await response.json();
    data.status = status;
    return data;
  } catch (e) {
    return e;
  }
};

// Get User

export const myProfile = async (payload) => {
  const jsonPayload = JSON.stringify(payload);
  console.log(process.env.HOST_DOMAIN);
  try {
    const response = await fetch("api/myprofile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set correct content type for JSON data
      },
      body: jsonPayload,
    });
    const { status } = response;
    const data = await response.json();
    data.status = status;
    return data;
  } catch (e) {
    return e;
  }
};

//Add Label

export const addNewLabel = async (payload) => {
  const jsonPayload = JSON.stringify(payload);
  try {
    const response = await fetch("http://localhost:3000/api/addlabel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set correct content type for JSON data
      },
      body: jsonPayload,
    });
    const { status } = response;
    const data = await response.json();
    data.status = status;
    return data;
  } catch (e) {
    return e;
  }
};
