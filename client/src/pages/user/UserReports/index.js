import React, { useEffect } from 'react';
import { Table, message } from "antd";
import PageTitle from "../../../components/PageTitle";
import { getAllReportsByUser } from '../../../apicalls/reports';
import moment from 'moment';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function UserReports() {
  const [reportData, setReportData] = React.useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const columns = [
    // Your column definitions here
  ];

  const getData = async () => {
    try {
      const response = await getAllReportsByUser();
      if (response.success) {
        setReportData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title="Reports" />
      <div className="divider"></div>
      <Table columns={columns} dataSource={reportData} />
    </div>
  );
}

export default UserReports;

