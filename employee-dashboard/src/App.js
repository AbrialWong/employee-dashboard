/* eslint-disable array-callback-return */
import './App.css';
import React,{useEffect, useState} from 'react';
import { 
  UploadOutlined, 
  UserOutlined, 
  VideoCameraOutlined, 
  AntDesignOutlined,
  EditOutlined,
  RestOutlined
} from '@ant-design/icons';
import { 
  Layout, 
  Menu, 
  Avatar,
  Typography,
  InputNumber,
  Table
} from 'antd';
import { useDispatch, useSelector} from 'react-redux';
import {
  LOAD_EMPLOYEES
} from "./actionTypes"
import { isEmpty } from "lodash"

const { Sider } = Layout;
const { Title } = Typography;

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
    dataIndex: 'employee_name',
    render: (name) => { 
      return name
    }, 
    responsive: ['md'],
  },
  {
    title: 'Login',
    dataIndex: 'employee_name',
    render: (user) => { 
      let userName = user.split(' ').join('_123') ;
      return userName
    },     
    responsive: ['lg'],
  },
  {
    title: 'Salary',
    dataIndex: 'employee_salary',
    sortDirections: ['ascend'],
    sorter: (a, b) => a.employee_salary - b.employee_salary,
    render: (salary) => { 
      return salary
    }, 
    responsive: ['lg'],
  },
  {
    title: 'Action',
    dataIndex: '',
    key: '',
    render: () => (
      <span>
        <EditOutlined style={{
            paddingRight: '30px',
          }}  />
        <RestOutlined  />
      </span>
    ),
  },
];


export const App = () => {
  const dispatch = useDispatch();
  const employeeList = useSelector(state=> state.dashboard.data)

  const [data, setData] = useState([]);
  const [min, setMin] = useState();
  const [max, setMax] = useState();

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  useEffect(() => {
    if(!isEmpty(employeeList)){
      let empArr = Object.values(employeeList);
      if(min && max){
        empArr = empArr.filter(a=> a.employee_salary >= min && a.employee_salary <= max)
      }else{
        empArr = employeeList;
      }
      setData(empArr)
    }else{
      setData([])
    }
  }, [employeeList, setData, min, max]);

  const fetchEmployeeList = async () => {
    const response = await fetch("http://dummy.restapiexample.com/api/v1/employees")
    .then((response) => response.json())
    .then((res) => {
      dispatch({ type: LOAD_EMPLOYEES, payload: res.data });
      return res.data
    });
  };


  return(
    <>
    <div className="root">
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
            items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
              (icon, index) => ({
                key: String(index + 1),
                icon: React.createElement(icon),
                label: `Function ${index + 1}`,
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
            />
          </div>

          {/* <Header
            className="site-layout-sub-header-background"
            style={{
              padding: 0,
            }}
          /> */}
          {/* <Content
            style={{
              margin: '24px 16px 0',
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              content
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Ant Design ©2018 Created by Ant UED
          </Footer> */}
        </Layout>
      </div>
</div>
    </>
  )
}

// export default App;

