import React, { useEffect, useLayoutEffect } from 'react'
import PageTitle from"../../../components/PageTitle";
import { Table} from "antd";
import { getAllReports } from '../../../apicalls/reports';
import moment from 'moment';



function AdminReports() {
    const [reportData,setReportData]=React.useState([])
    const [filters, setfilters] = React.useState({
      examName : "",
      username : "",

    })
    const columns = [{
        title : 'Exam Name',
        dataIndex : 'examName',
        render : (text,record) => <>
          {record.exam.name}
        </>
    },
    {
        title : 'User Name',
        dataIndex : 'UserName',
        render : (text,record) => <>
          {record.user.name}
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

    const getData= async(tempfilters) =>{
        try {
            const reponse = await getAllReports(tempfilters);
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
        getData(filterss);

    },[])
  return (
    <div>
      <PageTitle title = "Reports" />

      <div className="divider"></div>
      <div className="flex">
      <div className= "flex gap">
        <input type="text" placeholder="Exam" />
        value={filters.examName}
        onChange= {(e) => setfilters({...filters,examName : e.target.value})}
        <input type="text" placeholder="User" />
        value={filters.userName}
        onChange= {(e) => setfilters({...filters,userName : e.target.value})}
        
        <button className = "primary-outlined-btn">
          onClick() = [() => {
            setfilters({
              examName: "",
              userName :"",
            })
               getData (
                examName : "",
                userName : "",
               );
          ]
        >
          Clear 
        </button>


        <button className = "primary-contained-btn">
          onClick() = getData(filters)
          Search
        </button>
        </div>
      </div>
      <Table columns={columns} dataSource={reportsData} />

    </div>
  )
}

export default AdminReports
