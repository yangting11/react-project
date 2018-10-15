import React from 'react'
import L from 'leaflet'
import '../../assets/js/leaflet.ChineseTmsProviders.js'
import 'leaflet/dist/leaflet.css';
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
    // state={
    //     layer:satellite
    // }
    componentDidMount(){
        var map = L.map("map", {
            center: [31.59, 120.29],
            zoom: 12,
            layers: [normalm],
            zoomControl: false
        });
        
        // L.control.layers(baseLayers, null).addTo(map);
        // L.control.zoom({
        //     zoomInTitle: '放大',
        //     zoomOutTitle: '缩小'
        // }).addTo(map);
    }
    render(){
        return (
            <div>
                <div id="map" style={{width:'100%',height:'100%'}}></div>
            </div>
        )
    }
}

export default Chinesetms