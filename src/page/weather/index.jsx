import React from 'react'
import ReactEcharts from 'echarts-for-react';
import './weather.scss'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {Table} from 'antd'
import {tiledMapLayer} from 'esri-leaflet';
import {antPath} from 'leaflet-ant-path';
const dataSource = [{
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
  }, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  }, {
    key: '3',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  }, {
    key: '4',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  }];
  
  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  }];

var map;
var myIcon = L.icon({
    iconUrl: '/images/marker-icon.png',
    iconSize: [20, 30],
    // iconAnchor: [15, 30],
    // popupAnchor: [6, 0],
    // shadowUrl:'/images/marker-shadow.png',
    // shadowSize:[5,10],
    // shadowAnchor:[4,10]
});
class Weather extends React.Component{
    componentDidMount(){
         map = L.map('mymap').setView([29.353,121.77], 11);
         map.zoomDelta = 0.1
         map.oomSnap = 0.1
         tiledMapLayer({
            url: 'http://122.227.159.86:6080/arcgis/rest/services/%E9%AB%98%E4%BA%AE%E7%89%88%E7%94%B5%E5%AD%90%E5%9C%B0%E5%9B%BE/%E8%B1%A1%E5%B1%B1%E9%AB%98%E4%BA%AE%E5%9C%B0%E5%9B%BE/MapServer',
            maxZoom: 15,
            minZoom: 8,
            attribution: '<span id="refdiv"></span>GS(2017)508号'
        }).addTo(map);
        var marker = L.marker([29.353,121.77],{icon:myIcon}).addTo(map).bindPopup("<li>你是不是</li>")
        map.on('click',function(e){
            alert(e.latlng)
        })
        marker.on('click',function(e){
            // console.log('marker')
            let lat_click = e.latlng.lat;
            switch(lat_click){
                case 29.353 :
                    alert(true);
                    break;
                default:
                    alert(false);
                    break;
            }
        })
        let diversionGroup = L.layerGroup({})
<<<<<<< HEAD
        L.marker([29.4592895508,121.9290527],{icon:myIcon}).addTo(map).bindPopup('<div>这个地方是随机的</div>')
=======
>>>>>>> b51d832f08a10afb62c013f3eca8cb3eeeec0b7b
        let path2 = antPath([[29.353,121.77], [29.4592895508,121.9290527]],
            {"delay":1000,"dashArray":[10,20],"weight":5,"color":"#f00","pulseColor":"green","paused":false}
        );
        diversionGroup.addLayer(path2).addTo(map);

    }
    getOption(){
        let option = {
            // backgroundColor: 'aqua',
            legned:{

            },
            tooltip:{

            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        };   
        return option
    }
    render(){
        return (
            <div className="weather">
                <div className="weatherLeft" id="mymap"></div>
                <div className="weatherRight" style={{position:'relative'}}>
                    <div style={{position:'absolute',width:'100%'}}>
                        <div style={{width:'30%',borderRadius:'10px',height:'260px',position:'relative',float:'left'}}>
                            <div style={{position:'absolute',borderRadius:'100%',top:'10%',left:'10%',width:'100px',height:'100px',boxShadow:'0 0 50px #f60 inset', textAlign:'center',lineHeight:'100px'}}>12w</div>
                            <div style={{position:'absolute',borderRadius:'100%',top:'45%',left:'30%',width:'100px',height:'100px',boxShadow:'0 0 50px yellow inset', textAlign:'center',lineHeight:'100px'}}>15w</div>
                            <div style={{position:'absolute',borderRadius:'100%',top:'25%',left:'60%',width:'100px',height:'100px',boxShadow:'0 0 50px blue inset', textAlign:'center',lineHeight:'100px'}}>15w</div>
                        </div>
                        <div style={{width:'70%',borderRadius:'10px',height:'260px',position:'relative',float:'left'}}>
                            <Table dataSource={dataSource} columns={columns} pagination={false}/>
                        </div>
                        <div style={{width:'100%',borderRadius:'10px',height:'300px',position:'relative',float:'left',background:'aqua'}}>
                            <ReactEcharts option={this.getOption()} notMerge={true} lazyUpdate={true} theme={"theme_name"}/>
                        </div>
                        <div style={{width:'25%',borderRadius:'10px',background:'#f60',height:'200px',position:'relative',float:'left'}}>
                            
                        </div>
                        <div style={{width:'25%',borderRadius:'10px',background:'green',height:'200px',position:'relative',float:'left'}}>
                            
                        </div>
                        <div style={{width:'25%',borderRadius:'10px',background:'yellow',height:'200px',position:'relative',float:'left'}}>
                        
                        </div>
                        <div style={{width:'25%',borderRadius:'10px',background:'blue',height:'200px',position:'relative',float:'left'}}>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Weather