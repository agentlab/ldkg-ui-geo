import React from 'react';
import { MapboxScene, PointLayer, LayerEvent, Popup, SceneContext, SceneEvent, useSceneValue } from '@antv/l7-react';
import { IMapConfig, Scene } from '@antv/l7';
import { Mapbox } from '@antv/l7-maps';
import { Map } from 'mapbox-gl';

const myData = [
  /*{
    '@id': 'reqs:_Yyudi38d898',
    title: 'Устройство 123',
    centroid: [37.530822, 55.702952],
    severity: 0,
    solved: 100,
  },
  {
    '@id': 'reqs:_Yyudi38d8a8',
    title: 'Устройство 124',
    centroid: [37.684344, 55.766025],
    severity: 1000,
    solved: 1000,
  },
  {
    '@id': 'reqs:_Yyudi38d89e',
    title: 'Устройство 125',
    centroid: [37.517320, 55.929671],
    severity: 900,
    solved: 1100,
  },
  {
    '@id': 'reqs:_Yyudi38d89e',
    title: 'Устройство 126',
    centroid: [37.540030, 55.799077],
    severity: 800,
    solved: 100,
  },
  {
    '@id': 'reqs:_Yyudi38d89e',
    title: 'Устройство 127',
    centroid: [37.585170, 55.762014],
    severity: 500,
    solved: 2100,
  },
  {
    '@id': 'reqs:_Yyudi38d89e',
    title: 'Устройство 128',
    centroid: [37.640381, 55.759512],
    severity: 900,
    solved: 1000,
  },
  {
    '@id': 'reqs:_Yyudi38d89e',
    title: 'Устройство 129',
    centroid: [37.637084, 55.756016],
    severity: 1500,
    solved: 500,
  },
  {
    '@id': 'reqs:_Yyudi38d89e',
    title: 'Устройство 130',
    centroid: [37.621022, 55.760636],
    severity: 900,
    solved: 2100,
  },
  {
    '@id': 'reqs:_Yyudi38d89e',
    title: 'Устройство 131',
    centroid: [37.612317, 55.759659],
    severity: 100,
    solved: 200,
  },
  {
    '@id': 'reqs:_Yyudi38d89e',
    title: 'Устройство 132',
    centroid: [37.612919, 55.761452],
    severity: 300,
    solved: 2000,
  },
  {
    '@id': 'reqs:_Yyudi38d89e',
    title: 'Устройство 133',
    centroid: [37.610548, 55.754279],
    severity: 2900,
    solved: 1100,
  }*/
  {
    '@id': 'reqs:_Yyudi38d898',
    title: 'Устройство 123',
    centroid: [67.559146, 67.638266],
    severity: 0,
    solved: 100,
  },
  {
    '@id': 'reqs:_Yyudi38d8a8',
    title: 'Устройство 124',
    centroid: [67.550338, 67.643067],
    severity: 1000,
    solved: 1000,
  },
  {
    '@id': 'reqs:_Yyudi38d89e',
    title: 'Устройство 125',
    centroid: [67.559005, 67.639291],
    severity: 900,
    solved: 1100,
  },
  {
    '@id': 'reqs:_Yyudi38d89e',
    title: 'Устройство 126',
    centroid: [67.558371, 67.639633],
    severity: 800,
    solved: 100,
  },
  {
    '@id': 'reqs:_Yyudi38d89e',
    title: 'Устройство 127',
    centroid: [67.557556, 67.639909],
    severity: 500,
    solved: 2100,
  },
  {
    '@id': 'reqs:_Yyudi38d89e',
    title: 'Устройство 128',
    centroid: [67.555795, 67.640366],
    severity: 900,
    solved: 1000,
  },
  {
    '@id': 'reqs:_Yyudi38d89e',
    title: 'Устройство 129',
    centroid: [67.555243, 67.641102],
    severity: 1500,
    solved: 500,
  },
  {
    '@id': 'reqs:_Yyudi38d89e',
    title: 'Устройство 130',
    centroid: [67.554658, 67.641345],
    severity: 900,
    solved: 2100,
  },
  {
    '@id': 'reqs:_Yyudi38d89e',
    title: 'Устройство 131',
    centroid: [67.554265, 67.64172],
    severity: 100,
    solved: 200,
  },
  {
    '@id': 'reqs:_Yyudi38d89e',
    title: 'Устройство 132',
    centroid: [67.55365, 67.642021],
    severity: 300,
    solved: 2000,
  },
  {
    '@id': 'reqs:_Yyudi38d89e',
    title: 'Устройство 133',
    centroid: [67.553012, 67.642323],
    severity: 2900,
    solved: 1100,
  },
];

function randomFloat(min: number, max: number) {
  return min + (max - min) * Math.random();
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const MapContext = React.createContext<any>({});

export function MapContextProvider({ children }: any): JSX.Element {
  const [mapConfig, setMapConfig] = React.useState<Partial<IMapConfig>>({
    center: [67.559146, 67.638266], //[37.620810, 55.763082],
    pitch: 64.88,
    style: 'light',
    zoom: 15.63,
  });
  const [data, setData] = React.useState<any[]>(myData);

  return (
    <MapContext.Provider
      value={{
        mapConfig,
        setMapConfig,
        data,
        setData,
      }}>
      {children}
    </MapContext.Provider>
  );
}

export const Map1Layers = () => {
  const { mapConfig, setMapConfig, data, setData } = React.useContext(MapContext);
  const scene = (useSceneValue() as unknown) as Scene; //React.useContext(SceneContext);

  const [popupInfo, setPopupInfo] = React.useState<{
    lnglat: number[];
    feature: any;
  }>();

  /*React.useEffect(() => {
        if (scene && scene.getCenter) {
            console.log('getCenter', scene.getCenter());
            const m = scene.map as Mapbox;
            console.log('m', m);
            //const lnglat = scene.getCenter();
            //mapConfig.center = [lnglat.lng, lnglat.lat];
            //mapConfig.pitch = scene.getPitch();
            //mapConfig.zoom = scene.getZoom();
            //setMapConfig(mapConfig);
        }
    });*/

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (scene && scene.getCenter) {
        console.log('getCenter', scene.getCenter());
        const mb = scene.map as Mapbox;
        console.log('mb', mb);
        /*const lnglat = scene.getCenter();
                mapConfig.center = [lnglat.lng, lnglat.lat];
                mapConfig.pitch = scene.getPitch();
                mapConfig.zoom = scene.getZoom();
                setMapConfig(mapConfig);*/
      }
      /*data.forEach((d: { severity: number; solved: number; }) => {
                d.severity += getRandomInt(-100, 100);
                d.solved += getRandomInt(-100, 100);
            });
            setData([...data]);*/
    }, 5000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  function showPopup(args: any): void {
    setPopupInfo({
      lnglat: args.lngLat,
      feature: args.feature,
    });
  }

  return (
    <>
      <SceneEvent
        type='mapmove'
        handler={(pp) => {
          console.log(pp);
        }}
      />
      <SceneEvent
        type='zoomchange'
        handler={(tt) => {
          console.log(tt);
        }}
      />
      {popupInfo && (
        <Popup lnglat={popupInfo.lnglat}>
          <div style={{ textAlign: 'left' }}>
            <a href={popupInfo.feature['@id']}>{popupInfo.feature.title}</a>
            <ul
              style={{
                margin: 0,
                paddingInlineStart: '20px',
              }}>
              <li>Активные: {popupInfo.feature.severity}</li>
              <li>Решенные: {popupInfo.feature.solved}</li>
            </ul>
          </div>
        </Popup>
      )}
      {data && [
        <PointLayer
          key={'2'}
          options={{
            autoFit: true,
          }}
          source={{
            data,
            parser: {
              type: 'json',
              coordinates: 'centroid',
            },
          }}
          scale={{
            values: {
              severity: {
                type: 'linear',
              },
            },
          }}
          color={{
            values: '#b10026',
          }}
          shape={{
            values: 'circle',
          }}
          active={{
            option: {
              color: '#0c2c84',
            },
          }}
          size={{
            field: 'severity',
            values: [5, 60],
          }}
          animate={{
            enable: true,
          }}
          style={{
            opacity: 0.6,
          }}>
          <LayerEvent type='mousemove' handler={showPopup} />
        </PointLayer>,
        <PointLayer
          key={'3'}
          options={{
            autoFit: true,
          }}
          source={{
            data,
            parser: {
              type: 'json',
              coordinates: 'centroid',
            },
          }}
          color={{
            field: 'solved',
            values: [
              '#094D4A',
              '#146968',
              '#1D7F7E',
              '#289899',
              '#34B6B7',
              '#4AC5AF',
              '#5FD3A6',
              '#7BE39E',
              '#A1EDB8',
              '#CEF8D6',
            ],
          }}
          shape={{
            values: 'cylinder',
          }}
          size={{
            field: 'solved',
            values: (level) => [1, 2, level / 10],
          }}
          style={{
            opacity: 1.0,
          }}></PointLayer>,
      ]}
    </>
  );
};

export const Map1 = /*React.memo(*/ function Map() {
  const { mapConfig } = React.useContext(MapContext);
  return (
    <div style={{ height: 800, width: 1200 }}>
      <div
        style={{
          display: 'flex; flex: 1 1 0%',
          height: '100%',
          //position: 'absolute',
          outline: 'none',
          overflow: 'hidden',
        }}>
        <div style={{ flex: '0 0 auto', position: 'relative', outline: 'none', height: '100%', width: '100%' }}>
          <div
            style={{
              minHeight: '100%',
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              position: 'relative',
            }}>
            <MapboxScene
              map={mapConfig}
              option={{ logoVisible: false }}
              //style={{
              //  position: 'absolute',
              //  top: 0,
              //  left: 0,
              //  right: 0,
              //  bottom: 0,
              //}}
            >
              <Map1Layers />
            </MapboxScene>
          </div>
        </div>
      </div>
    </div>
  );
}; /*)*/
