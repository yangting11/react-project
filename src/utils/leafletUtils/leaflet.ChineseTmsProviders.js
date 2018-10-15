
L.TileLayer.ChinaProvider = L.TileLayer.extend({

    initialize: function(type, options) { // (type, Object)
        var providers = L.TileLayer.ChinaProvider.providers;

        var parts = type.split('.');

        var providerName = parts[0];
        var mapName = parts[1];
        var mapType = parts[2];

        var url = providers[providerName][mapName][mapType];
        options.subdomains = providers[providerName].Subdomains;

        L.TileLayer.prototype.initialize.call(this, url, options);
    }
});

L.TileLayer.ChinaProvider.providers = {
    TianDiTu: {
        Normal: {
            Map: "http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}",
            Annotion: "http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}"
        },
        Satellite: {
            Map: "http://t{s}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}",
            Annotion: "http://t{s}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}"
        },
        Terrain: {
            Map: "http://t{s}.tianditu.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}",
            Annotion: "http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}"
        },
        Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    },

    GaoDe: {
        Normal: {
            Map: 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
            RealRoad: 'http://tm.amap.com/trafficengine/mapabc/traffictile?v=1.0&;t=1&x={x}&y={y}&z={z}'
        },
        Satellite: {
            Map: 'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
            Annotion: 'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
        },
        Subdomains: ["1", "2", "3", "4"]
    },

    Google: {
        Terrain: {
            Map: "http://www.google.cn/maps/vt?lyrs=t@189&gl=cn&x={x}&y={y}&z={z}"
        },
        Normal: {
            Map: "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
        },
        Satellite: {
            Map: "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
        },
        Subdomains: []
    },

    Geoq: {
        Normal: {
            Map: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
            Color: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetColor/MapServer/tile/{z}/{y}/{x}",
            PurplishBlue: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
            Gray: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
            Warm: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}",
            Cold: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetCold/MapServer/tile/{z}/{y}/{x}"
        },
        Subdomains: []
    }
};

L.tileLayer.chinaProvider = function(type, options) {
    return new L.TileLayer.ChinaProvider(type, options);
};


/**
 * 腾讯地图
 */
L.TencentLayer = L.TileLayer.extend({
    options: {
      subdomains: [0, 1, 2]
    },

    //type: ROADMAP(普通地图), RealROADMAP(路网), SATELLITE(卫星), TERRAIN(地形)
    //如果实现HYBRID效果则需要叠加RealROADMAP和SATELLITE两个图层
    initialize: function(type, options) {
      L.Util.setOptions(this, options);

      this._type = type || 'ROADMAP';
    },

    getTileUrl: function(tilePoint) {

      this._url =
        "http://rt{s}.map.gtimg.com/realtimerender?z={z}&x={x}&y={y}&type=vector&style={t}";

      var urlArgs = {
        z: tilePoint.z,
        x: tilePoint.x,
        y: Math.pow(2, tilePoint.z) - 1 - tilePoint.y
      };

      switch (this._type) {
        case 'ROADMAP':
          this._url = this._url.replace('{t}', 0);
          break;
        case 'RealROADMAP':
          this.url = "http://rt{s}.map.qq.com/rtt/?z={z}&x={x}&y={y}&style={t}"
          this._url = this._url.replace('{t}', 1);
          break;
        case 'SATELLITE':
          this._url = "http://p{s}.map.gtimg.com/sateTiles/{z}/{x16}/{y16}/{x}_{y}.jpg";
          urlArgs.x16 = Math.floor(tilePoint.x / 16);
          urlArgs.y16 = Math.floor((Math.pow(2, tilePoint.z) - 1 - tilePoint.y) / 16);
          break;
        case 'TERRAIN':
          this._url = "http://p{s}.map.gtimg.com/demTiles/{z}/{x16}/{y16}/{x}_{y}.jpg";
          urlArgs.x16 = Math.floor(tilePoint.x / 16);
          urlArgs.y16 = Math.floor((Math.pow(2, tilePoint.z) - 1 - tilePoint.y) / 16);
      }

      return L.Util.template(this._url, L.extend(urlArgs, this.options, {
        s: this._getSubdomain(tilePoint)
      }));
    }
  });

  L.tencentLayer = function(key, options) {
    return new L.TencentLayer(key, options);
  };


  // 瓦片白条的时候处理
// (function(){
var originalInitTile = L.GridLayer.prototype._initTile
L.GridLayer.include({
    _initTile: function (tile) {
        originalInitTile.call(this, tile);

        var tileSize = this.getTileSize();

        tile.style.width = tileSize.x + 1 + 'px';
        tile.style.height = tileSize.y + 1 + 'px';
    }
});
// })()