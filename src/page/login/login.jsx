import React from 'react'
import './login.css'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'yyyy',
            password:'yyyy'
        }
    }
    changevalue(e){
        let tagname = e.target.name;
        this.setState({
            [tagname]:e.target.value
        })
    }
    render(){
        return (
            <div className="login_pane">
                <input className="inputClass" name="username" type="text" placeholder="请输入用户名" value={this.state.username} onChange={(e)=>{this.changevalue(e)}}></input>
                <input className="inputClass" name="password" type="password" placeholder="请输入密码" value={this.state.password} onChange={(e)=>{this.changevalue(e)}}></input>
            </div>
        )
    }
}
export default Login