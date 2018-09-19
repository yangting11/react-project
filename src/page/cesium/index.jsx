import React from 'react'
class CesiumMap extends React.Component{
    // constructor(props){
    //     super(props)
    // }
    // componentDidMount(){
    //     new Cesium.Viewer('ytmap',{
    //         geocoder:false,
    //         homeButton:false,
    //         sceneModePicker:false,
    //         baseLayerPicker:false,
    //         navigationHelpButton:false,
    //         animation:false,
    //         creditContainer:"credit",
    //         timeline:false,
    //         fullscreenButton:false,
    //         vrButton:false,
    //     });
    // }
    render(){
        return (
            <div id="ytmap">cesium</div>
        )
    }
}
export default CesiumMap;