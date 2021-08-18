export function layerData() {
  let featureLayerData = [
    {
      geometry: {
        spatialReference: {
          wkid: 4490,
        },
        rings: [
          [
            [118.32726501758756, 32.292284108430444],
            [118.32792410236654, 32.292284108430444],
            [118.32791874395369, 32.29214478969668],
            [118.32725965917471, 32.292139431283836],
            [118.32726501758756, 32.292284108430444],
          ],
        ],
        type: "polygon",
      },
      symbol: {
        type: "esriSFS",
        color: [150, 150, 150, 51],
        outline: {
          type: "esriSLS",
          color: [50, 50, 50, 255],
          width: 2,
          style: "esriSLSSolid",
        },
        style: "esriSFSSolid",
      },
      attributes: {
        id:26
      },
    },
  ];

  return featureLayerData;
}
