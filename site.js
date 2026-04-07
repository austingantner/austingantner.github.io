/*
 * Author: Austin Gantner
 */

var Site = angular.module("Site", []);

// This allows us to change what template page is shown in the ng-view
Site.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when("", { title: "Home - Austin Gantner", templateUrl: "home.html" })
    .when("/home", { title: "Home - Austin Gantner", templateUrl: "home.html" })
    .when("/faded", {
      title: "Faded - Austin Gantner",
      templateUrl: "faded.html",
    })
    .otherwise({ redirectTo: "/home" });
});

// This allows us to change the document title when the route is changed (page is changed)
Site.run([
  "$rootScope",
  "$route",
  function ($rootScope, $route) {
    $rootScope.$on("$routeChangeSuccess", function (newVal, oldVal) {
      if (oldVal !== newVal) {
        document.title = $route.current.title;
      }
    });
  },
]);
