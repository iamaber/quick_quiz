import React, { useEffect } from 'react'; // Added missing import
import PageTitle from "../../../components/PageTitle";
import { Table, message } from "antd"; // Imported 'message' from 'antd'
import { getAllReports } from '../../../apicalls/reports';
import moment from 'moment';

function AdminReports() {
  const [reportData, setReportData] = React.useState([]);
  const [filters, setFilters] = React.useState({
    examName: "",
    userName: "",
  });

  const columns = [
    // ... your column definitions
  ];

  const getData = async (tempFilters) => {
    try {
      const response = await getAllReports(tempFilters);

      if (response.success) {
        setReportData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message); // Fixed: Use 'error.message' instead of 'response.message'
    }
  };

  useEffect(() => {
    getData(filters);
  }, [filters]); // Fixed: Added 'filters' as a dependency for the effect

  return (
    <div>
      <PageTitle title="Reports" />
      <div className="divider"></div>
      <div className="flex">
        <div className="flex gap">
          <input
            type="text"
            placeholder="Exam"
            value={filters.examName}
            onChange={(e) => setFilters({ ...filters, examName: e.target.value })}
          />
          <input
            type="text"
            placeholder="User"
            value={filters.userName}
            onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
          />
          <button
            className="primary-outlined-btn"
            onClick={() => {
              setFilters({
                examName: "",
                userName: "",
              });
            }}
          >
            Clear
          </button>
          <button
            className="primary-contained-btn"
            onClick={() => {
              getData(filters);
            }}
          >
            Search
          </button>
        </div>
      </div>
      <Table columns={columns} dataSource={reportData} /> {/* Fixed: Changed 'reportsData' to 'reportData' */}
    </div>
  );
}

export default AdminReports;
