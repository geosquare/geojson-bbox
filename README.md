# geojson-bbox
Calculates extent/bbox for a given valid geojson object. When passed a valid geojson returns an array of [bounding box](http://geojson.org/geojson-spec.html#bounding-boxes) 
## installation

```
npm install geojson-bbox
```

## usage
 
```javascript
var bbox = require('geojson-bbox');
var feature = { 
  type: 'Feature',
  geometry: {
    type: 'LineString', 
    coordinates: [
      [10, 40], [40, 30], [20, 20], [30, 10]
    ]
  }
};
var extent = bbox(feature); 
// extent is array 
// [10, 10, 40, 40]
```

## developing
Once you run
 
```npm isntall```

then for running test 

```npm run test```

to create build

```npm run build```

## license
This project is licensed under the terms of the MIT license.
