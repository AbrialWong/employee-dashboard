/* eslint-disable array-callback-return */
import './css/styles.css';
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
  Table,
  Modal,
  Button,
  Input
} from 'antd';
import { useDispatch, useSelector} from 'react-redux';
import {
  LOAD_EMPLOYEES,
  SELECT_EMPLOYEE
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
      // let userName = user + '_123';
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
  const selected = useSelector(state=> state.dashboard.selected)

  const [data, setData] = useState([]);
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [open, setOpen] = useState(false);


  useEffect(() => {
    fetchEmployeeList();
  }, []);

  useEffect(() => {
    if(!isEmpty(employeeList)){
      let empArr = Object.values(employeeList);
      if(min && max){
        empArr = empArr.filter(a=> a.salary >= min && a.salary <= max)
      } else {
        empArr = employeeList;
      }
      setData(empArr)
    }else{
      setData([])
    }
  }, [employeeList, setData, min, max]);

  const fetchEmployeeList = async () => {
    const response = await fetch("https://nphc-hr.free.beeceptor.com/employees")
    .then((response) => response.json())
    .then((res) => {
      console.log("dash-2", res);

      dispatch({ type: LOAD_EMPLOYEES, payload: res });
      return res
    });
  };

  const handleOk = () => {
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   setOpen(false);
    // }, 3000);
    setOpen(false);

  };

  const handleCancel = () => {
    setOpen(false);
  };


  console.log("dash-1", selected);

  return(
    <>
    <div className="root">
      <Modal
          header={[
            <Button key="submit" type="primary" 
            // loading={loading} 
            onClick={handleOk}>
              test
            </Button>,
          ]}
          open={open}
          title="Edit"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={ null
            //[
          //   <Button key="submit" type="primary" 
          //   // loading={loading} 
          //   onClick={handleOk}>
          //     Save
          //   </Button>,
          // ]
          }
        >
          <Title level={3}>Employee Id {selected.id}</Title>
          {/* Name input */}
          <div 
            style={{
              width: '100%',
            }}
          >
            <Input
                prefix={
                  <>
                    <div>
                      <div style={{color:"lightgrey", fontWeight:"smaller"}}>Name</div>
                      <Title level={4}>{selected.full_name}</Title>
                    </div>                
                  </>
                }
            />
          </div>
          {/* login input */}
          <div 
              style={{
                width: '100%',
              }}
          >
            <Input
              prefix={
                <>
                  <div>
                      <div style={{color:"lightgrey",fontWeight:"smaller"}}>Login</div>
                      <Title level={4}>{selected.login_id}</Title>
                    </div>                
                  </>
              }
            />
          </div>
          {/* Salary Input */}
          <div 
              style={{
                width: '100%',
                backgroundColor:"lightgreen"
              }}
          >
            <Input
              prefix={
                <>
                  <div>
                    <div style={{color:"lightgrey", fontWeight:"smaller"}}>Salary</div>
                    <Title level={4}>{'S$'}{selected.salary}</Title>
                  </div>                
                </>
              }
            />
          </div>
          <Button key="submit" type="primary"  style={{ width: '100%',}}
              onClick={handleOk}>
              Save
          </Button>,
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
              onRow={(record, rowIndex) => {
                console.log("rowData-1", record)
                  return {
                    onClick: () => {
                      console.log("rowData-1.1", record)
                      dispatch({ type: SELECT_EMPLOYEE, payload: record });
                      setOpen(true)
                    }
                  }
    
              }}
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

