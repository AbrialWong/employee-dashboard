/* eslint-disable array-callback-return */
import './css/styles.css';
import React,{useEffect, useState} from 'react';
import { 
  UploadOutlined, 
  UserOutlined, 
  VideoCameraOutlined, 
  AntDesignOutlined,
  EditOutlined,
  RestOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { 
  Layout, 
  Menu, 
  Avatar,
  Typography,
  InputNumber,
  Table,
  Modal,
  Button,
  Input,
  Divider,
  Form,
  notification
} from 'antd';
import { useDispatch, useSelector} from 'react-redux';
import {
  LOAD_EMPLOYEES,
  SELECT_EMPLOYEE,
  DELETE_EMPLOYEE,
} from "./actionTypes"
import { isEmpty } from "lodash"

const { Sider } = Layout;
const { Title } = Typography;




export const App = () => {
  const dispatch = useDispatch();
  const employeeList = useSelector(state=> state.dashboard.data)
  const selected = useSelector(state=> state.dashboard.selected)
  const deleted = useSelector(state=>state.dashboard.deleted)

  const [data, setData] = useState([]);
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [open, setOpen] = useState(false);
  const [rowColor, setRowColor] = useState(null);

  console.log("deleted exist", deleted)

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  useEffect(() => {
    if(!isEmpty(employeeList)){
      let empArr = Object.values(employeeList);
      if((min && max) || deleted){
        if(min && max){
        empArr = empArr.filter(a=> a.salary >= min && a.salary <= max)
        }
        if(deleted && deleted.status === "success"){
          // print out notification message
          const args = {
            description: deleted.message,
            duration: 3,
          };
          notification.success(args);

        // populate remaining records
         empArr = empArr.filter(b=> b.id != deleted.data) 
        }
      } 
      else {
        empArr = employeeList;
      }
      setData(empArr)
    }else{
      setData([])
    }
  }, [employeeList, setData, min, max, deleted]);

  const fetchEmployeeList = async () => {

    // hardcode data
    const response = [
      {"id":1,"full_name":"Tiger Nixon","salary":320800,"login_id":"Tiger_Nixon","profile_image":""},
      {"id":2,"full_name":"Garrett Winters","salary":170750,"login_id":"Garrett_Winters","profile_image":""},
      {"id":3,"full_name":"Ashton Cox","salary":86000,"login_id":"Ashton_Cox","profile_image":""},
      {"id":4,"full_name":"Cedric Kelly","salary":433060,"login_id":"Cedric_Kelly","profile_image":""},
      {"id":5,"full_name":"Airi Satou","salary":162700,"login_id":"Airi_Satou","profile_image":""}
    ]
    dispatch({ type: LOAD_EMPLOYEES, payload: response });     
  };

  const handleCancel = () => {
    setOpen(false);
  };


  const columns = [
    {
      title: '',
      dataIndex: '',
      key: '',
      render: () => (
        <span>
          <AntDesignOutlined />
        </span>
      ),
    },
    {
      title: 'Id',
      dataIndex: 'id',
      render: (id) => { 
        return ( 
          <> 
            {id}
          </> 
        ); 
      },
    },
    {
      title: 'Name',
      dataIndex: 'full_name',
      render: (name) => { 
        return name
      }, 
      responsive: ['md'],
    },
    {
      title: 'Login',
      dataIndex: 'login_id',
      render: (user) => { 
        return user
      },     
      responsive: ['lg'],
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      sortDirections: ['ascend'],
      sorter: (a, b) => a.salary - b.salary,
      render: (salary) => { 
        return salary
      }, 
      responsive: ['lg'],
    },
    {
      title: 'Action',
      dataIndex: '',
      key: '',
      render: (record) => (
        <span>
          <RestOutlined  
            onClick={async (e)=>{
              e.stopPropagation()              
              const deleteRec = await fetch('https://dummy.restapiexample.com/api/v1/delete/' + record.id, {
                method: 'DELETE',
              })
              .then(res => res.json())
              .then(res => {
                dispatch({ type: DELETE_EMPLOYEE, payload: res });
                return res
              })
            }}
          />
        </span>
      ),
    },
  ];
  return(
    <>
    <div className="root">
      <Modal
          header={null}
          open={open}
          footer={ null}
          width={1000}
          closable={null}
        >
        {/* header */}
        <div className="modalDiv">
        <CloseOutlined onClick={handleCancel} />
        <Title level={5} className="modalTitle">Details of Record</Title>
        </div>
        <Divider/>

        {/* content */}
        <div className="modalContent">
          <Title level={3}>Employee Id {selected.id}</Title>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item label="Name">
             {selected.full_name}
            </Form.Item>
            <Form.Item label="Login ID">
              {selected.login_id}
            </Form.Item>
            <Form.Item label="Salary">
              {selected.salary}
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <div className="slider">
        <Layout>
        {/* left hand side sider */}
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            // console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            // console.log(collapsed, type);
          }}
        >
        {/* Image & text */}
        <div className="sliderImg">
          {/* Image */}
          <Avatar
            size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 100,
              xl: 140,
              xxl: 100,
            }}
            icon={<AntDesignOutlined />}
          />
          {/* Text */}
          <Title level={4}>long user name</Title>
        </div>
        {/* Navigation links */}
        <div className="sliderNav">
          <Menu
            mode="inline"
            defaultSelectedKeys={['4']}
            items={[UserOutlined].map(
              (icon, index) => ({
                key: String(index + 1),
                icon: React.createElement(icon),
                label: "Dashboard",

              }),
              
            )}
          />
        </div>
        </Sider>
        </Layout>
      </div>
      {/* content */}
      <div className="content">
        <Layout>
          {/* user key in min/max amount */}
          <div className="contentDiv">
            {/* min amount */}
            <InputNumber
              addonBefore={<><UserOutlined /></>}
              prefix={
                <>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:"bolder"}}>Minimum salary</div>
                    <div style={{fontSize:"smaller"}}>Enter Amount</div>
                  </div>
                  <div style={{paddingLeft:"10px"}}>$</div>
                </>
              }
              style={{
                width: '45%',
              }}
              onChange={(event)=>{
                setMin(event)
              }}
            />
            - 
            {/* max amount */}
            <InputNumber
              prefix={
                <>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:"bolder"}}>Maximum salary</div>
                    <div style={{fontSize:"smaller"}}>Enter Amount</div>
                  </div>
                  <div style={{paddingLeft:"10px"}}>$</div>
                </>
              }
              style={{
                width: '50%',
              }}
              onChange={(event)=>{
                setMax(event)
              }}            
            />
          </div>
          {/* Dashboard */}
          <div>
            {/* header */}
            <Title 
              level={3} 
              className="contentTitle"
            >
              Employee
            </Title>
            {/* Datatable */}
            <Table 
              columns={columns} 
              dataSource={data} 
              pagination={{ pageSize: 5, total: 20, showSizeChanger: true }} 
              rowClassName={(record) => record.id === selected.id ? 'table-row-light': 'table-row-none'}
              onRow={(record, rowIndex) => {
                  return {
                    onClick: () => {
                      dispatch({ type: SELECT_EMPLOYEE, payload: record });
                      setOpen(true);
                    }
                  }
    
              }}
            />
          </div>
        </Layout>
      </div>
    </div>
    </>
  )
}

// export default App;

