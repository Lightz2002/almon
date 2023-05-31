import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const baseUri = axios.create({
  baseURL: "https://almon.ryankenidy.site/api",
});

/* Auth */
export async function getToken() {
  const token = await AsyncStorage.getItem("token");
  return "Bearer " + token;
}

export async function getResetPasswordToken() {
  const token = await AsyncStorage.getItem("forgetPasswordToken");
  return token;
}

export async function login(credentials) {
  try {
    return await baseUri.post("/login", {
      ...credentials,
      validateStatus: function (status) {
        return status === 201;
      },
    });
  } catch (e) {
    throw e;
  }
}

export async function register(credentials) {
  try {
    return await baseUri.post("/register", {
      ...credentials,
      validateStatus: function (status) {
        return status === 201;
      },
    });
  } catch (e) {
    throw e;
  }
}

export async function validateForgetPassword(credentials) {
  try {
    return await baseUri.post("/validate-forget-password", {
      ...credentials,
      validateStatus: function (status) {
        return status === 201;
      },
    });
  } catch (e) {
    throw e;
  }
}

export async function sendForgetPasswordEmail(credentials) {
  try {
    return await baseUri.post("/send-forget-password-email", {
      ...credentials,
      validateStatus: function (status) {
        return status === 201;
      },
    });
  } catch (e) {
    throw e;
  }
}

export async function resetPassword(credentials) {
  try {
    const resetPasswordToken = await getResetPasswordToken();
    return await baseUri.post("/reset-password", {
      ...credentials,
      reset_password_token: resetPasswordToken,
      validateStatus: function (status) {
        return status === 201;
      },
    });
  } catch (e) {
    throw e;
  }
}

/* Users */
export async function getUsers() {
  try {
    const token = await getToken();
    return await baseUri.get("/users", {
      headers: {
        Authorization: token,
      },
    });
  } catch (e) {
    throw e;
  }
}

export async function profile() {
  try {
    const token = await getToken();
    return await baseUri.get("/profile", {
      headers: {
        Authorization: token,
      },
    });
  } catch (e) {
    throw e;
  }
}

export async function updateUser(credentials, userId) {
  try {
    const token = await getToken();
    return await baseUri.post(
      `/users/${userId}`,
      {
        ...credentials,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (e) {
    throw e;
  }
}

export async function updateSalary(monthlySalary) {
  try {
    const token = await getToken();
    return await baseUri.post(
      "/update-salary",
      {
        ...monthlySalary,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (e) {
    throw e;
  }
}

/* Transaction */
export async function expenseBudgetInfo() {
  try {
    const token = await getToken();
    return await baseUri.get("/expense/budget-info", {
      headers: {
        Authorization: token,
      },
    });
  } catch (e) {
    throw e;
  }
}

export async function transactionList() {
  try {
    const token = await getToken();
    return await baseUri.get("/transaction", {
      headers: {
        Authorization: token,
      },
    });
  } catch (e) {
    throw e;
  }
}

export async function transactionGet(transactionId) {
  try {
    const token = await getToken();
    return await baseUri.get(`/transaction/${transactionId}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (e) {
    throw e;
  }
}

export async function transactionCreate(transaction) {
  try {
    const token = await getToken();
    return await baseUri.post(
      "/transaction",
      {
        ...transaction,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (e) {
    throw e;
  }
}

export async function transactionEdit(transactionId, transaction) {
  try {
    const token = await getToken();
    return await baseUri.put(
      `/transaction/${transactionId}`,
      {
        ...transaction,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (e) {
    throw e;
  }
}

export async function expenseSummary() {
  try {
    const token = await getToken();
    return await baseUri.get("/expense/summary", {
      headers: {
        Authorization: token,
      },
    });
  } catch (e) {
    throw e;
  }
}

/* transaction - category */
export async function transactionCategory() {
  try {
    const token = await getToken();
    return await baseUri.get("/transaction-category", {
      headers: {
        Authorization: token,
      },
    });
  } catch (e) {
    throw e;
  }
}

/* security questions */
export async function getSecurityQuestion() {
  try {
    return await baseUri.get("/security-question");
  } catch (e) {
    throw e;
  }
}

/* Allocations */
export async function generateAllocation(userId) {
  try {
    const token = await getToken();
    return await baseUri.post(
      `/expense-allocation/generate/${userId}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (e) {
    throw e;
  }
}

export async function getAllocation(userId) {
  try {
    const token = await getToken();
    return await baseUri.get(`/expense-allocation/list/${userId}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (e) {
    throw e;
  }
}
