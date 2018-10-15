import React from 'react'
import L from 'leaflet'
import '../../assets/js/leaflet.ChineseTmsProviders.js'
import 'leaflet/dist/leaflet.css';
import './index.scss'
var map

var normalm = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
    maxZoom: 18,
    minZoom: 5
});
var imgm = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {
    maxZoom: 18,
    minZoom: 5
});
var imga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {
    maxZoom: 18,
    minZoom: 5
});

// var normal = L.layerGroup([normalm]),
//     image = L.layerGroup([imgm, imga]);

// var baseLayers = {
//     "地图": normal,
//     "影像": image,
// }
class Chinesetms extends React.Component{
    state={
        layer:normalm,
        chooseflag:false,
        classNameStr:'',
        selected:{
            img:'0 -120px',
            name:'卫星'
        },
        item:[
            {name: normalm, text: "卫星", img: "0 -120px"},
            {name: imgm, text: "地形", img: "0 -60px"},
            {name: imga, text: "交通", img: "0 0"}
        ]
    }
    componentDidMount(){
        map = L.map("map", {
            center: [31.59, 120.29],
            zoom: 12,
            layers: this.state.layer,
            zoomControl: false
        });
        
        // L.control.layers(baseLayers, null).addTo(map);
        L.control.zoom({
            zoomInTitle: '放大',
            zoomOutTitle: '缩小'
        }).addTo(map);
    }
    showall(e){
        this.setState({
            chooseflag:true,
            classNameStr:"showClass"
        })
    }
    chooseItem(e,index){
        if(this.state.item[index].name !== this.state.layer){
            map.addLayer(this.state.item[index].name)
            map.removeLayer(this.state.layer);
            let data = { img: this.state.item[index].img, name:this.state.item[index].text }
            this.setState({
                selected: data,
                chooseflag:false,
                layer: this.state.item[index].name,
            })
        }
    }
    closeall(e){
        this.setState({
            chooseflag:false,
            classNameStr:""
        })
    }
    render(){
        return (
            <div>
                <div id="map" style={{width: "100%",height: "calc(100vh - 56px)"}}></div>
                <div className={this.state.classNameStr}>
                    {this.state.chooseflag
                    ?<div className="items" onMouseLeave={e=>{this.closeall(e)}}>
                        <div className="item item1" onClick={e=>{this.chooseItem(e,0)}}><span>卫星</span></div>
                        <div className="item item2" onClick={e=>{this.chooseItem(e,1)}}><span>地形</span></div>
                        <div className="item item3" onClick={e=>{this.chooseItem(e,2)}}><span>交通</span></div>
                    </div>
                    :<div className="selected" style={{backgroundPosition: this.state.selected.img}} onMouseOver={e=>{this.showall(e)}}>
                        <span>{this.state.selected.name}</span>
                    </div>}
                </div>
            </div>
        )
    }
}

export default Chinesetms