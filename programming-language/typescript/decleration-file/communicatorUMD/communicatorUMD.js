(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === "object" && module.exports) {
    // CommonJs
    module.exports = factory();
  } else {
    // Browser Global
    root.communicatorModularUMD = factory();
  }
})(this, function() {
  function greet(message) {
    return `<h1>${message}</h1>`;
  }

  var otherFunctions = {
    goodbye: function() {
      return "<h1>Goodbye!</h1>";
    },
  };

  return {
    greet,
    otherFunctions,
  };
});
