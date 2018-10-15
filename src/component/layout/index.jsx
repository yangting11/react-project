import React from 'react'
import '../../component/layout/layout.css'
import { Layout, Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'
// import MenuItem from 'antd/lib/menu/MenuItem';
const { Header, Content, Footer, Sider } = Layout;

class LayoutItem extends React.Component{
    render(){
        return (
            <div style={{height:'100vh'}}>
                <Layout>
                    <Sider breakpoint="lg" collapsedWidth="0" onBreakpoint={(broken) => { console.log(broken); }} onCollapse={(collapsed, type) => { console.log(collapsed, type); }}>
                    <div className="logo" style={{color:'#fff', height:'60px',textAlign:'left',lineHeight:'60px',marginLeft:'30px'}}>11111111111111</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to="/home">
                                <Icon type="user" />
                                <span className="nav-text">nav 1</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/weather">
                                <Icon type="video-camera" />
                                <span className="nav-text">nav 2</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/chinesetms">
                                <Icon type="upload" />
                                <span className="nav-text">nav 3</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                        <Icon type="user" />
                        <span className="nav-text">nav 4</span>
                        </Menu.Item>
                    </Menu>
                    </Sider>
                    <Layout>
                    <Header style={{ background: '#102534', padding: 0 }} >
                        <div style={{float:'right',marginRight:'40px'}}>
                        <Icon type="poweroff" theme="outlined" style={{fontSize:'20px',color:'#fff'}}/>
                        </div>
                    </Header>
                    <Content style={{ margin: '24px 16px 0',height: "calc(100vh - 150px)", overflowY:'scroll' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default LayoutItem