// Create Task
export const createTask = async (payload) => {
  const jsonPayload = JSON.stringify(payload);
  try {
    const response = await fetch("/api/newtask", {
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

// My Task
export const myTask = async (token, pageno) => {
  try {
    const response = await fetch(
      `/api/mytask?pageno=${pageno}`,
      {
        method: "GET",
        headers: {
          cookie: `token=${token}`,
          "Content-Type": "application/json", // Set correct content type for JSON data
        },
      }
    );
    const { status } = response;
    const data = await response.json();
    data.status = status;

    return data;
  } catch (e) {
    return e;
  }
};

// delete Task
export const deleteTask = async (payload) => {
  const jsonPayload = JSON.stringify(payload);
  try {
    const response = await fetch("/api/deletetask", {
      method: "POST",
      headers: {
        // cookie: `token=${token}`,
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

// Update task
export const updateTask = async (payload) => {
  const jsonPayload = JSON.stringify(payload);
  try {
    const response = await fetch("/api/updatetask", {
      method: "POST",
      headers: {
        // cookie: `token=${token}`,
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
