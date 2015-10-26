!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.bbox=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(gj) {
  var coords, bbox;
  if (!gj.hasOwnProperty('type')) return;
  coords = getCoordinatesDump(gj);
  bbox = [ Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY,];
  return coords.reduce(function(prev,coord) {
    return [
      Math.min(coord[0], prev[0]),
      Math.min(coord[1], prev[1]),
      Math.max(coord[0], prev[2]),
      Math.max(coord[1], prev[3])
    ];
  }, bbox);
};

function getCoordinatesDump(gj) {
  var coords;
  if (gj.type == 'Point') {
    coords = [gj.coordinates];
  } else if (gj.type == 'LineString' || gj.type == 'MultiPoint') {
    coords = gj.coordinates;
  } else if (gj.type == 'Polygon' || gj.type == 'MultiLineString') {
    coords = gj.coordinates.reduce(function(dump,part) {
      return dump.concat(part);
    }, []);
  } else if (gj.type == 'MultiPolygon') {
    coords = gj.coordinates.reduce(function(dump,poly) {
      return dump.concat(poly.reduce(function(points,part) {
        return points.concat(part);
      },[]));
    },[]);
  } else if (gj.type == 'Feature') {
    coords =  getCoordinatesDump(gj.geometry);
  } else if (gj.type == 'GeometryCollection') {
    coords = gj.geometries.reduce(function(dump,g) {
      return dump.concat(getCoordinatesDump(g));
    },[]);
  } else if (gj.type == 'FeatureCollection') {
    coords = gj.features.reduce(function(dump,f) {
      return dump.concat(getCoordinatesDump(f));
    },[]);
  }
  return coords;
}

},{}]},{},[1])(1)
});


//# sourceMappingURL=geojson-bbox.js.map