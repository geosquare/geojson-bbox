var expect = require('chai').expect,
  bbox = require('../');
describe('Tests for all geojson types', function() {
  it('Point', function() {
    expect(
      bbox({type: 'Point', coordinates: [10,20]})
    ).to.be.instanceOf(Array)
    .that.to.have.length(4)
    .that.to.deep.equal([10, 20, 10, 20]);
  });
  it('LineString', function() {
    expect(
      bbox({
        type: 'LineString', 
        coordinates: [[30, 10], [10, 30], [40, 40]]
      })
    ).to.be.instanceOf(Array)
    .that.to.have.length(4)
    .that.to.deep.equal([10, 10, 40, 40]);
  });
  it('Polygon', function() {
    expect(
      bbox({
        type: 'Polygon', 
        coordinates: [
          [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
        ]
      })
    ).to.be.instanceOf(Array)
    .that.to.have.length(4)
    .that.to.deep.equal([10, 10, 40, 40]);
  });
  it('Polygon with hole', function() {
    expect(
      bbox({
        type: 'Polygon', 
        coordinates: [ 
          [[35, 10], [45, 45], [15, 40], [10, 20], [35, 10]], 
          [[20, 30], [35, 35], [30, 20], [20, 30]]
        ]
      })
    ).to.be.instanceOf(Array)
    .that.to.have.length(4)
    .that.to.deep.equal([10, 10, 45, 45]);
  });
  it('MultiPoint', function() {
    expect(
      bbox({
        type: 'MultiPoint', 
        coordinates: [
          [10, 40], [40, 30], [20, 20], [30, 10]
        ]
      })
    ).to.be.instanceOf(Array)
    .that.to.have.length(4)
    .that.to.deep.equal([10, 10, 40, 40]);
  });
  it('MultiLineString', function() {
    expect(
      bbox({
        type: 'MultiLineString', 
        coordinates: [
          [[10, 10], [20, 20], [10, 40]], 
          [[40, 40], [30, 30], [40, 20], [30, 10]]
        ]
      })
    ).to.be.instanceOf(Array)
    .that.to.have.length(4)
    .that.to.deep.equal([10, 10, 40, 40]);
  });
  it('MultiPolygon', function() {
    expect(
      bbox({
        type: 'MultiPolygon', 
        coordinates: [
          [
            [[30, 20], [45, 40], [10, 40], [30, 20]]
          ], 
          [
            [[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]
          ]  
        ]
      })
    ).to.be.instanceOf(Array)
    .that.to.have.length(4)
    .that.to.deep.equal([5, 5, 45, 40]);
  });
  it('MultiPolygon with hole', function() {
    expect(
      bbox({
        type: 'MultiPolygon', 
        coordinates: [
          [
            [[40, 40], [20, 45], [45, 30], [40, 40]]
          ], 
          [
            [[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]], 
            [[30, 20], [20, 15], [20, 25], [30, 20]]
          ]
        ]
      })
    ).to.be.instanceOf(Array)
    .that.to.have.length(4)
    .that.to.deep.equal([10, 5, 45, 45]);
  });
  it('GeometryCollection', function() {
    expect(
      bbox({
        "type": "GeometryCollection",
        "geometries": [
          { "type": "Point",
            "coordinates": [100.0, 0.0]
            },
          { "type": "LineString",
            "coordinates": [ [101.0, 0.0], [102.0, 1.0] ]
            }
        ]
      })
    ).to.be.instanceOf(Array)
    .that.to.have.length(4)
    .that.to.deep.equal([100, 0, 102, 1]);
  });
  it('Feature', function() {
    expect(
      bbox({
        type: 'Feature',
        geometry: {
          type: 'LineString', 
          coordinates: [
            [10, 40], [40, 30], [20, 20], [30, 10]
          ]
        }
      })
    ).to.be.instanceOf(Array)
    .that.to.have.length(4)
    .that.to.deep.equal([10, 10, 40, 40]);
  });
  it('FeatureCollection', function() {
    debugger;
    expect(
      bbox({
        "type": "FeatureCollection",
        "features": [
          { "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
            "properties": {"prop0": "value0"}
            },
          { "type": "Feature",
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
                ]
              },
            "properties": {
              "prop0": "value0",
              "prop1": 0.0
              }
            },
          { "type": "Feature",
             "geometry": {
               "type": "Polygon",
               "coordinates": [
                 [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
                   [100.0, 1.0], [100.0, 0.0] ]
                 ]
             },
             "properties": {
               "prop0": "value0",
               "prop1": {"this": "that"}
               }
             }
        ]
      })
    ).to.be.instanceOf(Array)
    .that.to.have.length(4)
    .that.to.deep.equal([100, 0, 105, 1]);
  });
});
