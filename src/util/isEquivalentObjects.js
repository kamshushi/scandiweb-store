const isEquivalentObjects = (a, b) => {
  // Create arrays of property names
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different, objects are not equivalent
  if (aProps.length !== bProps.length) {
    return false;
  }

  // If values of same property in both objects are not equal, objects are not equivalent
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  return true;
};

export default isEquivalentObjects;
