import React from 'react'
import './login.scss'
import Axios from 'axios'
import history from '../../history.js'
import {Button, Input, Icon, Alert} from 'antd'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
			password:'',
			visible:false,
			type:'',
			message:''
        }
    }
    componentDidMount(){
        var WIDTH = window.innerWidth;
        var HEIGHT = window.innerHeight;
        var POINT = 35;
	
	var canvas = document.getElementById('Mycanvas');
	canvas.width = WIDTH,
	canvas.height = HEIGHT;
	var context = canvas.getContext('2d');
	context.strokeStyle = '#fff';//'rgba(0,0,0,0.04)',
	context.strokeWidth = 1,
	context.fillStyle = '#fff';//'rgba(0,0,0,0.08)';
	var circleArr = [];

	//线条：开始xy坐标，结束xy坐标，线条透明度
	function Line (x, y, _x, _y, o) {
		this.beginX = x,
		this.beginY = y,
		this.closeX = _x,
		this.closeY = _y,
		this.o = o;
	}
	//点：圆心xy坐标，半径，每帧移动xy的距离
	function Circle (x, y, r, moveX, moveY) {
		this.x = x,
		this.y = y,
		this.r = r,
		this.moveX = moveX,
		this.moveY = moveY;
	}
	//生成max和min之间的随机数
	function num (max, _min) {
		var min = arguments[1] || 0;
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	// 绘制原点
	function drawCricle (cxt, x, y, r, moveX, moveY) {
		var circle = new Circle(x, y, r, moveX, moveY)
		cxt.beginPath()
		cxt.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI)
		cxt.closePath()
		cxt.fill();
		return circle;
	}
	//绘制线条
	function drawLine (cxt, x, y, _x, _y, o) {
		var line = new Line(x, y, _x, _y, o)
		cxt.beginPath()
		cxt.strokeStyle = 'rgba(0,0,0,0.005)'
		cxt.moveTo(line.beginX, line.beginY)
		cxt.lineTo(line.closeX, line.closeY)
		cxt.closePath()
		cxt.stroke();

	}
	//初始化生成原点
	function init () {
		circleArr = [];
		for (var i = 0; i < POINT; i++) {
			circleArr.push(drawCricle(context, num(WIDTH), num(HEIGHT), num(15, 2), num(10, -10)/40, num(10, -10)/40));
		}
		draw();
	}

	//每帧绘制
	function draw () {
		context.clearRect(0,0,canvas.width, canvas.height);
		for (var i = 0; i < POINT; i++) {
			drawCricle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r);
		}
		for (var i = 0; i < POINT; i++) {
			for (var j = 0; j < POINT; j++) {
				if (i + j < POINT) {
					var A = Math.abs(circleArr[i+j].x - circleArr[i].x),
						B = Math.abs(circleArr[i+j].y - circleArr[i].y);
					var lineLength = Math.sqrt(A*A + B*B);
					var C = 1/lineLength*7-0.009;
					var lineOpacity = C > 0.03 ? 0.03 : C;
					if (lineOpacity > 0) {
						drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[i+j].x, circleArr[i+j].y, lineOpacity);
					}
				}
			}
		}
	}

	//调用执行
	window.onload = function () {
		init();
		setInterval(function () {
			for (var i = 0; i < POINT; i++) {
				var cir = circleArr[i];
				cir.x += cir.moveX;
				cir.y += cir.moveY;
				if (cir.x > WIDTH) cir.x = 0;
				else if (cir.x < 0) cir.x = WIDTH;
				if (cir.y > HEIGHT) cir.y = 0;
				else if (cir.y < 0) cir.y = HEIGHT;
				
			}
			draw();
		}, 16);
	}
    }
    changevalue(e,tag){
        this.setState({
            [tag]:e.target.value
        })
	}
	handleClose(){

	}
    loginAction(e){
		if(this.state.username == "" || this.state.password == ""){
			this.setState({
				visible:true,
				type:'error',
				message:'账号密码不能为空'
			})
			setTimeout(()=>{
				this.setState({
					visible:false
				})
			},1000)
			return false
		}
		var params = new URLSearchParams();
		params.append('name',this.state.username);
		params.append('password',this.state.password);
		Axios.post('/login/login',params).then(response=>{
			if(response.data.status){
				console.log(response)
				this.setState({
					visible:true,
					type:'success',
					message:response.data.message
				})
				// window.location.href="/home"
				history.push('/home')
			}else{
				this.setState({
					visible:true,
					type:'error',
					message:response.data.message
				})
			}
		}).catch(error=>{
			this.setState({
				visible:true,
				type:'error',
				message:'数据请求失败'
			})
		})
		setTimeout(()=>{
			this.setState({
				visible:false
			})
		},1000)
    }
    render(){
        return (
            <div className="login_pane">
                <canvas id="Mycanvas"></canvas>
                <div className="inputform">
                    <p style={{textAlign:'center'}}>您好，请登陆！<span style={{color:'#f00'}}>♥</span></p>
                    <Input className="inputClass" placeholder="请输入用户名" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.state.username} onChange={(e)=>{this.changevalue(e,'username')}} />
                    <Input className="inputClass" placeholder="请输入密码" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.state.password} onChange={(e)=>{this.changevalue(e,'password')}} />
                    <Button type="primary" className="loginBtnClass" onClick={(e)=>{this.loginAction(e)}}>登陆</Button>
				</div>
				{(function(obj){
						if(obj.state.visible){
							if(obj.state.type == 'success'){
								return (<Alert className="alertClass" message={obj.state.message} type="success"  showIcon   />)
							}else{
								return (<Alert className="alertClass" message={obj.state.message} type="error" showIcon  />)
							}
						}
					})(this)}
            </div>
        )
    }
}
export default Login