// (function(window) {
//   var defaultMessage = "Hello";
//   if (typeof window.communicatorGlobal === "undefined") {
//     window.communicatorGlobal = function(message) {
//       if (typeof message === "undefined") {
//         message = defaultMessage;
//       }

//       return `<h1>${message}</h1>`;
//     };
//   }
// })(window);

// (function(window) {
//   function communicatorGlobal() {
//     var _communicatorGlobal = {};
//     _communicatorGlobal.greet = function(message) {
//       return `<h1>${message}</h1>`;
//     };

//     return _communicatorGlobal;
//   }

//   if (typeof window.communicatorGlobal === "undefined") {
//     window.communicatorGlobal = communicatorGlobal();
//   }
// })(window);

(function(window) {
  function communicatorGlobal() {
    var _communicatorGlobal = {};
    _communicatorGlobal.Settings = function(message) {
      this.message = message;
    };


    _communicatorGlobal.settings = new _communicatorGlobal.Settings("default");
    _communicatorGlobal.greet = function() {
      return `<h1>${_communicatorGlobal.settings.message}</h1>`;
    }

    return _communicatorGlobal;
  }

  if (typeof window.communicatorGlobal === "undefined") {
    window.communicatorGlobal = communicatorGlobal();
  }
})(window);
