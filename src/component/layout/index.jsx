import React from 'react'
import '../../component/layout/layout.scss'
import { Layout, Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'
const { Header, Content, Footer, Sider } = Layout;

class LayoutItem extends React.Component{
    render(){
        return (
            <div style={{height:'100%'}}>
                <Layout>
                    <Sider breakpoint="lg" collapsedWidth="0" onBreakpoint={(broken) => { console.log(broken); }} onCollapse={(collapsed, type) => { console.log(collapsed, type); }}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <div style={{width:'100%',height:'40px',lineHeight:'40px',color:'#fff', fontSize:'20px', textAlign:'left', marginLeft:'40px'}}>
                            nihao
                        </div>
                        
                        <Menu.Item key="1">
                            <Link to="/home">
                                <Icon type="user" />
                                <span className="nav-text">nav 1</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/login">
                                <Icon type="video-camera" />
                                <span className="nav-text">nav 2</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                        <Icon type="upload" />
                        <span className="nav-text">nav 3</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                        <Icon type="user" />
                        <span className="nav-text">nav 4</span>
                        </Menu.Item>
                    </Menu>
                    </Sider>
                    <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0' }}>
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