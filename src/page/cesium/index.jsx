import React from 'react'
import Cesium from 'cesium/Build/Cesium/Cesium.js'
// import 'cesium/Build/Cesium/Widgets/widgets.css'
import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
//我们刚才所说的如何让Cesium知道静态资源在哪里的API
import buildModuleUrl from "cesium/Source/Core/buildModuleUrl"
//导入必须的样式表
import "cesium/Source/Widgets/widgets.css";
class CesiumMap extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        new Cesium.Viewer('ytmap',{
            geocoder:false,
            homeButton:false,
            sceneModePicker:false,
            baseLayerPicker:false,
            navigationHelpButton:false,
            animation:false,
            creditContainer:"credit",
            timeline:false,
            fullscreenButton:false,
            vrButton:false,
        });
    }
    render(){
        return (
            <div id="ytmap"></div>
        )
    }
}
export default CesiumMap;