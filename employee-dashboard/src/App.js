import './App.css';
import React from 'react';
import { 
  UploadOutlined, 
  UserOutlined, 
  VideoCameraOutlined, 
  AntDesignOutlined,
  EditOutlined 
} from '@ant-design/icons';
import { 
  Layout, 
  Menu, 
  Avatar,
  Typography,
  InputNumber,
  Table
} from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const columns = [
  {
    title: 'Id',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'age',
    key: 'age',
    responsive: ['md'],
  },
  {
    title: 'Login',
    dataIndex: 'address',
    key: 'address',
    responsive: ['lg'],
  },
  {
    title: 'Salary',
    dataIndex: 'address',
    key: 'address',
    responsive: ['lg'],
  },
  {
    title: 'Action',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
];

export const App = () => {
  return(
    <>
      <Layout style={{height:"100vh"}}>
        {/* left hand side sider */}
        <Sider
          style={{width:"60vh"}}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          {/* Image & text */}
          <div>
            {/* Image */}
            <Avatar
              size={{
                xs: 24,
                sm: 32,
                md: 40,
                lg: 64,
                xl: 80,
                xxl: 100,
              }}
              icon={<AntDesignOutlined />}
            />
            {/* Text */}
            <Title level={3} className="site-layout-sub-header-background">long user name</Title>
          </div>

          {/* Navigation links */}
          <div>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['4']}
              items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
                (icon, index) => ({
                  key: String(index + 1),
                  icon: React.createElement(icon),
                  label: `nav ${index + 1}`,
                }),
              )}
            />
          </div>
        </Sider>
        {/* content */}
        <Layout>
          {/* user key in min/max amount */}
          <div>
            {/* min amount */}
            <InputNumber
              addonBefore={<UserOutlined />}
              prefix="$"
              style={{
                width: '30%',
              }}
            />
            - 
            {/* max amount */}
            <InputNumber
              prefix="$"
              style={{
                width: '30%',
              }}
            />
          </div>
          {/* Dashboard */}
<div>
  {/* header */}
  <Title level={3} className="site-layout-sub-header-background">Employee</Title>
  {/* Datatable */}
  <Table columns={columns} dataSource={data} />
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
      </Layout>
    </>
  )
}

// export default App;

