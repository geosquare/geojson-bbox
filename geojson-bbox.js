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
