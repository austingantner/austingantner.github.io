/*
 * Author: Austin Gantner
 */

var Site = angular.module('Site',[]);

// This allows us to change what template page is shown in the ng-view
Site.config(function($routeProvider, $locationProvider) {
    $routeProvider
            .when('', {title : 'Home - Austin Gantner', templateUrl: 'home.html'})
            .when('/home', {title : 'Home - Austin Gantner', templateUrl: 'home.html'})
            .when('/resume', {title : 'Resume - Austin Gantner', templateUrl: 'resume.html'})
            .when('/faded', {title : 'Faded - Austin Gantner', templateUrl: 'faded.html'})
            .when('/hw4', {title : 'HW4 - Austin Gantner', templateUrl: 'hw4.html'})
            .when('/hw5', {redirectTo: '/hw6'})// opps, accidentally turned it in as assignment 5
            .when('/hw5HQ', {redirectTo: '/hw6HQ'})
            .when('/hw6', {title : 'HW6 - Austin Gantner', templateUrl: 'hw6.html'})
            .when('/hw7', {title : 'HW7 - Austin Gantner', templateUrl: 'hw7.html'})
            .when('/hw6HQ', {title : 'HW6HQ - Austin Gantner', templateUrl: 'hw6HQ.html'})
            .otherwise({redirectTo: '/home'});
});

// This allows us to change the document title when the route is changed (page is changed)
Site.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function(newVal, oldVal) {
        if (oldVal !== newVal) {
            document.title = $route.current.title;
        }
    });
}]);

// Information regarding directives can be found at: docs.angularjs.org/guide/directive
Site.directive("slideShow", function($timeout) {
    return{
        restrict: 'A',
        template: '<img ng-repeat="slide in slides" ng-src="{{slide.img}}" class="thumbnail slide {{slide.active}}">',
        scope: {},
        link: function(scope, elem, attrs) {
            scope.slides = [
                {img: '', active: ''},
                {img: 'me1.png', active: ''},
                {img: 'me2.png', active: ''},
                {img: 'me3.png', active: ''},
                {img: 'me4.png', active: ''}
            ];
            scope.activeSlide = 0;
            $timeout(function incrementSlide() {
                scope.slides[scope.activeSlide].active = '';
                scope.activeSlide++;
                if (scope.activeSlide >= scope.slides.length) {
                    scope.activeSlide = 1; //skip the blank
                }
                scope.slides[scope.activeSlide].active = 'showSlide';
                $timeout(incrementSlide, 6000);
            }, 250);
        }
    };
});
