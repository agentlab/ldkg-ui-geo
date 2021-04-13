/* eslint-disable no-eval */
import { MapboxScene, LineLayer, PointLayer } from '@antv/l7-react';
import React from 'react';

export const Map2 = function Map() {
  const [data, setData] = React.useState();
  const [dotData, setDotData] = React.useState();
  const [flydata, setFlydata] = React.useState();
  React.useEffect(() => {
    const fetchData = async () => {
      const [world, dot, flyline] = await Promise.all([
        fetch('https://gw.alipayobjects.com/os/basement_prod/dbd008f1-9189-461c-88aa-569357ffc07d.json').then((d) =>
          d.json(),
        ),
        fetch('https://gw.alipayobjects.com/os/basement_prod/4472780b-fea1-4fc2-9e4b-3ca716933dc7.json').then((d) =>
          d.text(),
        ),
        fetch('https://gw.alipayobjects.com/os/basement_prod/a5ac7bce-181b-40d1-8a16-271356264ad8.json').then((d) =>
          d.text(),
        ),
      ]);
      setData(world);
      const dotData = eval(dot);
      setDotData(dotData);
      const flydata = eval(flyline).map((item: any) => {
        const latlng1 = item.from.split(',').map((e: any) => {
          return e * 1;
        });
        const latlng2 = item.to.split(',').map((e: any) => {
          return e * 1;
        });
        return { coord: [latlng1, latlng2] };
      });
      setFlydata(flydata);
    };
    fetchData();
  }, []);
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
              map={{
                pitch: 40,
                center: [73.438, 40.16797],
                zoom: 2.51329,
                style: {
                  version: 8,
                  sprite: 'https://lzxue.github.io/font-glyphs/sprite/sprite',
                  glyphs: 'https://gw.alipayobjects.com/os/antvdemo/assets/mapbox/glyphs/{fontstack}/{range}.pbf',
                  sources: {},
                  layers: [
                    {
                      id: 'background',
                      type: 'background',
                      paint: {
                        'background-color': '#2b2b3a',
                      },
                    },
                  ],
                },
              }}
              option={{ logoVisible: false }}>
              {data && (
                <LineLayer
                  key={'1'}
                  source={{ data }}
                  color={{ values: '#41fc9d' }}
                  size={{ values: 0.5 }}
                  style={{
                    opacity: 0.4,
                  }}
                  shape={{ values: 'line' }}
                />
              )}
              {dotData && (
                <PointLayer
                  key={'2'}
                  source={{
                    data: dotData,
                    parser: {
                      type: 'json',
                      x: 'lng',
                      y: 'lat',
                    },
                  }}
                  shape={{ values: 'circle' }}
                  color={{ values: '#ffed11' }}
                  animate={{ enable: true }}
                  size={{ values: 40 }}
                  style={{
                    opacity: 1.0,
                  }}
                />
              )}
              {flydata && (
                <LineLayer
                  key={'3'}
                  source={{
                    data: flydata,
                    parser: {
                      type: 'json',
                      coordinates: 'coord',
                    },
                  }}
                  color={{ values: '#ff6b34' }}
                  shape={{ values: 'arc3d' }}
                  size={{ values: 2 }}
                  active={{ option: true }}
                  animate={{
                    interval: 2,
                    trailLength: 2,
                    duration: 1,
                  }}
                  style={{
                    opacity: 1,
                  }}
                />
              )}
            </MapboxScene>
          </div>
        </div>
      </div>
    </div>
  );
};
