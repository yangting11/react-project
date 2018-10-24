import React from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/legend';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
// import '../home/leaflet-heat';
import {tiledMapLayer} from 'esri-leaflet';
import {antPath} from 'leaflet-ant-path';
import { Table, Divider, Tag , Button, Popconfirm, message} from 'antd';

// import { homedir } from 'os';
let map;
let diversionGroup = L.layerGroup({})
var myIcon = L.icon({
    iconUrl: '/images/marker-icon.png',
    iconSize: [20, 30],
    iconAnchor: [0, 0],
    popupAnchor: [6, 0],
    shadowUrl:'/images/marker-shadow.png',
    shadowSize:[20,30],
    shadowAnchor:[4,10]
});


class Home extends React.Component{
    componentDidMount(){
        
        // var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
 
        // mapboxgl.accessToken = 'pk.eyJ1IjoieWFuZ3RpbmcxMjI3IiwiYSI6ImNqbTRqNzc5YzNrbHMzdnA0cDV0MXdydmwifQ.jJQyHbELL0qcBFMMQb1Xcw';
        // var map = new mapboxgl.Map({
        // container: 'mymap',
        // style: 'mapbox://styles/mapbox/streets-v10'
        // });
        map = L.map('mymap', { zoomControl:false , preferCanvas:true, attributionControl:false}).setView([29.353,121.77], 11);
        tiledMapLayer({
            url: 'http://122.227.159.86:6080/arcgis/rest/services/%E9%AB%98%E4%BA%AE%E7%89%88%E7%94%B5%E5%AD%90%E5%9C%B0%E5%9B%BE/%E8%B1%A1%E5%B1%B1%E9%AB%98%E4%BA%AE%E5%9C%B0%E5%9B%BE/MapServer',
            maxZoom: 15,
            minZoom: 8,
            attribution: '<span id="refdiv"></span>GS(2017)508号'
        }).addTo(map);
        map.on('click',this.onMapClick)
        alert(map.getCenter())
        L.circle([29.343,121.77], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(map).bindPopup('<div>yangting</div>');
        // let marker = L.marker([29.353,121.77]).addTo(map);
        var marker = L.marker([29.353,121.77],{icon:myIcon}).addTo(map)
            .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
        marker.on('popupopen',function(){
            alert(1)
        })
        marker.bindTooltip("my tooltip text").openTooltip();
        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
        //画多边形
        var imageUrl = 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
        imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
        

        var videoUrl = 'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
        videoBounds = [[ 29.353,121.77], [ 29.453,121.78]];
        L.videoOverlay(videoUrl, videoBounds ).addTo(map);

        L.imageOverlay(imageUrl, imageBounds).addTo(map);
        L.polygon([
            [29.353,121.77],
            [29.43,121.77],
            [29.353,122.77]
        ]).addTo(map);

        var latlngs = [
            [29.43,122.123],
            [29.33,123.123],
            [29.23,121.123],
            [28.93,122.123],
        ]
        L.polyline(latlngs,{color:'red',width:'10px'}).addTo(map)
        let route2 = [[29.4805297852,121.724304199], [29.4592895508,122.5290527]]
        let path2 = antPath(route2,
            {"delay":2000,"dashArray":[10,20],"weight":5,"color":"#f00","pulseColor":"green","paused":false}
        );
        diversionGroup.addLayer(path2).addTo(map);

        // let data = {
            
        // }


        

        // geoJSON操作对象数组 
        // L.geoJSON(data,{
        //     style:function(feature){
        //         return {color:feature.properties.color};
        //     }
        // }).bindPopup(function(layer){
        //     return layer.feature.properties.description;
        // }).addTo(map);
        
    }
    confirm(e) {
        console.log(e);
        message.success('Click on Yes');
      }

      cancel(e) {
        console.log(e);
        message.error('Click on No');
      }
    onMapClick(e){
        alert('点击地图'+e.latlng)
    }
    deletaction(key){
        alert('点击删除');
        console.log(key);
    }
    getOption(){
        let option = {
            backgroundColor: 'transparent',
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
        var columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <div>{text}11</div>,  //text为获取到的参数
          }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            render: text => <div>{text}-岁</div>,  //text为获取到的参数
          }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: text => <div>{text}</div>,  //text为获取到的参数
          }, {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: text => (
              <span>
                {text.map(textitem => <Tag color="blue" key={textitem}>{textitem}</Tag>)}
              </span>
            ),
          }, {
            title: 'Action',
            key: 'action',
            render: (text, record,index) => (
              <span>
                <div>Invite {record.name}</div>
                <Divider type="vertical" />
                {/* <a href="javascript:;" >Delete</a> */}
                <Popconfirm title="Are you sure delete this task?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                    <Button type="danger" size="small" onClick={()=>this.deletaction(index)}>删除</Button>
                </Popconfirm>
                
              </span>
            ),
          }];
          
          var data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
          }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
          }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
          }];
        return (
            <div>
                <div id="mymap" style={{width:'100%',height:'400px'}}></div>
                <ReactEchartsCore
                echarts={echarts}
                option={this.getOption()}
                notMerge={true}
                lazyUpdate={true}
                theme={"theme_name"}
                onChartReady={this.onChartReadyCallback}
                style={{height:'300px',width:'100%'}}
                opts={{renderer: 'svg'}} />
                <Table columns={columns} dataSource={data} />
            </div>
            )
    }
}

export default Home



