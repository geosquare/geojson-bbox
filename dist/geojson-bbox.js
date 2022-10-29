(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.bbox = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
