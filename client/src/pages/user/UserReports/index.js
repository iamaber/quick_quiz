import React, { useEffect, useLayoutEffect } from 'react'
import PageTitle from"../../../components/PageTitle";
import { Table} from "antd";
import { getAllReportsByUser } from '../../../apicalls/reports';
import moment from 'moment';



function UserReports() {
    const [reportData,setReportData]=React.useState([])
    const columns = [{
        title : 'Exam Name',
        dataIndex : 'examName',
        render : (text,record) => <>
          {record.exam.name}
        </>
    },
    {
        title : 'Date',
        dataIndex : 'Date',
        render : (text,record) => <>
          moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")
        </>
        
    },
    
    {
        title : 'Total Marks',
        dataIndex : 'Total Marks',
        render : (text,record) => <>
          {record.exam.totalMarks}
        </>
    },
    {
        title : 'Passing Marks',
        dataIndex : 'Passing Marks',
        render : (text,record) => <>
          {record.result.PassingMarks.length}
        </>
    },
    {
        title : 'Obtained Marks',
        dataIndex : 'Obtained Marks',
        render : (text,record) => <>
          {record.result.correctAnswers.length}
        </>
    },
    {
        title : 'Verdict',
        dataIndex : 'verdict',
        render : (text,record) => <>
          {record.result.verdict}
        </>
    },
    ];

    const getData= async() =>{
        try {
            const reponse = await getAllReportsByUser();
            if(response.success){
                setReportData(response.data);
            }else{
                message.error(response.message);
            }
        } catch (error) {
            message.error(response.message);
        }
    } ;
    useEffect(() => {
        getData();

    },[])
  return (
    <div>
      <PageTitle title = "Reports" />
      <div className="divider"></div>
      <Table columns={columns} dataSource={reportsData} />

    </div>
  )
}

export default UserReports
