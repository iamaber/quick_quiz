const { default: axiosInstance } = require(".");

// Add report
export const addReport = async (payload) => {  // Corrected 'playload' to 'payload'
  try {
    const response = await axiosInstance.post("/api/reports/add-reports", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Get all reports
export const getAllReports = async (filters) => {
  try {
    const response = await axiosInstance.post("/api/reports/get-all-reports", filters);  // Corrected endpoint path
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Get all reports by user
export const getAllReportsByUser = async () => {
  try {
    const response = await axiosInstance.post("/api/reports/get-all-reports-by-user");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
