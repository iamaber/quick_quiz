const { default: axiosInstance } = require(".");
const payload = { /* your payload data */ };

const response = await axios.post("/api/reports/add-report", payload);


//add report
export const addReport = async () =>{
    try {

        const response = await axiosInstance.post("/api/report/add-reports",payload);
        return response.data;
        
    } catch (error) {
        return error.response.data;
        
    }
}
//get all reports
export const getAllReport = async () =>{
    try {

        const response = await axiosInstance.post("/api/reports/get-all-reports");
        return response.data;
        
    } catch (error) {
        return error.response.data;
        
    }
}
//get all reports by user
export const getAllReportByUser = async () =>{
    try {

        const response = await axiosInstance.post("/api/reports/get-all-reports-by-user");
        return response.data;
        
    } catch (error) {
        return error.response.data;
        
    }
}



