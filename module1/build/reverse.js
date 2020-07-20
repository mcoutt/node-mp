"use strict";

var stdin = process.openStdin();

var reverse = function reverse(arr) {
  var getArray = [];

  for (var i = 0; i < arr.length; i++) {
    getArray.push(arr.charAt(i));
  }

  var resAr = getArray.reverse();
  console.log(resAr.join(''));
};

stdin.addListener("data", function (d) {
  reverse(d.toString().trim());
});
