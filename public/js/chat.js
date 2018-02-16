/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 69);
/******/ })
/************************************************************************/
/******/ ({

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(70);


/***/ }),

/***/ 70:
/***/ (function(module, exports) {


var app = new Vue({
    el: '#app',
    data: {
        messages: [],
        usersInRoom: []
    },
    methods: {
        addMessage: function addMessage(message) {
            console.log('message added');

            // Add message
            this.messages.push({
                message: message.message,
                user: JSON.parse(message.user)
            });
            // console.log(message);
            // console.log(JSON.parse(message.user).avatar);
            // To the database
            axios.post('/messages', message);

            var log = document.getElementById('chat-log');
            log.scrollTop = log.scrollHeight;
        }
    },
    created: function created() {
        var _this = this;

        axios.get('/messages').then(function (response) {
            console.log('data is: ', response.data[0].user.avatar);
            _this.messages = response.data;
        });

        Echo.join('chatroom').here(function (users) {
            _this.usersInRoom = users;
        }).joining(function (user) {
            _this.usersInRoom.push(user);
        }).leaving(function (user) {
            _this.usersInRoom = _this.usersInRoom.filter(function (u) {
                return u != user;
            });
        }).listen('MessagePosted', function (e) {
            _this.messages.push({
                message: e.message.message,
                user: e.user
            });
            console.log(e);
            var log = document.getElementById('chat-log');
            log.scrollTop = log.scrollHeight;
        });
    }
});

window.onload = function () {
    var log = document.getElementById('chat-log');
    log.scrollTop = log.scrollHeight;
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTE5YWMwMzAxNmFiN2YwNTk3MDIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jaGF0LmpzIl0sIm5hbWVzIjpbImFwcCIsIlZ1ZSIsImVsIiwiZGF0YSIsIm1lc3NhZ2VzIiwidXNlcnNJblJvb20iLCJtZXRob2RzIiwiYWRkTWVzc2FnZSIsIm1lc3NhZ2UiLCJjb25zb2xlIiwibG9nIiwicHVzaCIsInVzZXIiLCJKU09OIiwicGFyc2UiLCJheGlvcyIsInBvc3QiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic2Nyb2xsVG9wIiwic2Nyb2xsSGVpZ2h0IiwiY3JlYXRlZCIsImdldCIsInRoZW4iLCJyZXNwb25zZSIsImF2YXRhciIsIkVjaG8iLCJqb2luIiwiaGVyZSIsInVzZXJzIiwiam9pbmluZyIsImxlYXZpbmciLCJmaWx0ZXIiLCJ1IiwibGlzdGVuIiwiZSIsIndpbmRvdyIsIm9ubG9hZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVEQSxJQUFNQSxNQUFNLElBQUlDLEdBQUosQ0FBUTtBQUNoQkMsUUFBSSxNQURZO0FBRWhCQyxVQUFNO0FBQ0ZDLGtCQUFVLEVBRFI7QUFFTEMscUJBQWE7QUFGUixLQUZVO0FBTWhCQyxhQUFTO0FBQ1BDLGtCQURPLHNCQUNJQyxPQURKLEVBQ2E7QUFDbEJDLG9CQUFRQyxHQUFSLENBQVksZUFBWjs7QUFFQTtBQUNBLGlCQUFLTixRQUFMLENBQWNPLElBQWQsQ0FBbUI7QUFDZkgseUJBQVNBLFFBQVFBLE9BREY7QUFFZkksc0JBQU1DLEtBQUtDLEtBQUwsQ0FBV04sUUFBUUksSUFBbkI7QUFGUyxhQUFuQjtBQUlBO0FBQ0E7QUFDQTtBQUNBRyxrQkFBTUMsSUFBTixDQUFXLFdBQVgsRUFBd0JSLE9BQXhCOztBQUVBLGdCQUFJRSxNQUFNTyxTQUFTQyxjQUFULENBQXdCLFVBQXhCLENBQVY7QUFDQVIsZ0JBQUlTLFNBQUosR0FBZ0JULElBQUlVLFlBQXBCO0FBQ0Q7QUFoQk0sS0FOTztBQXdCaEJDLFdBeEJnQixxQkF3Qk47QUFBQTs7QUFDTk4sY0FBTU8sR0FBTixDQUFVLFdBQVYsRUFBdUJDLElBQXZCLENBQTRCLG9CQUFZO0FBQ3RDZCxvQkFBUUMsR0FBUixDQUFZLFdBQVosRUFBd0JjLFNBQVNyQixJQUFULENBQWMsQ0FBZCxFQUFpQlMsSUFBakIsQ0FBc0JhLE1BQTlDO0FBQ0Usa0JBQUtyQixRQUFMLEdBQWdCb0IsU0FBU3JCLElBQXpCO0FBQ0gsU0FIRDs7QUFLQXVCLGFBQUtDLElBQUwsQ0FBVSxVQUFWLEVBQ0tDLElBREwsQ0FDVSxVQUFDQyxLQUFELEVBQVc7QUFDYixrQkFBS3hCLFdBQUwsR0FBbUJ3QixLQUFuQjtBQUNILFNBSEwsRUFJS0MsT0FKTCxDQUlhLFVBQUNsQixJQUFELEVBQVU7QUFDZixrQkFBS1AsV0FBTCxDQUFpQk0sSUFBakIsQ0FBc0JDLElBQXRCO0FBQ0gsU0FOTCxFQU9LbUIsT0FQTCxDQU9hLFVBQUNuQixJQUFELEVBQVU7QUFDZixrQkFBS1AsV0FBTCxHQUFtQixNQUFLQSxXQUFMLENBQWlCMkIsTUFBakIsQ0FBd0I7QUFBQSx1QkFBS0MsS0FBS3JCLElBQVY7QUFBQSxhQUF4QixDQUFuQjtBQUNILFNBVEwsRUFVS3NCLE1BVkwsQ0FVWSxlQVZaLEVBVTZCLFVBQUNDLENBQUQsRUFBTztBQUM1QixrQkFBSy9CLFFBQUwsQ0FBY08sSUFBZCxDQUFtQjtBQUNmSCx5QkFBUzJCLEVBQUUzQixPQUFGLENBQVVBLE9BREo7QUFFZkksc0JBQU11QixFQUFFdkI7QUFGTyxhQUFuQjtBQUlBSCxvQkFBUUMsR0FBUixDQUFZeUIsQ0FBWjtBQUNBLGdCQUFJekIsTUFBTU8sU0FBU0MsY0FBVCxDQUF3QixVQUF4QixDQUFWO0FBQ0FSLGdCQUFJUyxTQUFKLEdBQWdCVCxJQUFJVSxZQUFwQjtBQUNILFNBbEJMO0FBb0JIO0FBbERlLENBQVIsQ0FBWjs7QUFxREFnQixPQUFPQyxNQUFQLEdBQWdCLFlBQVc7QUFDdkIsUUFBSTNCLE1BQU1PLFNBQVNDLGNBQVQsQ0FBd0IsVUFBeEIsQ0FBVjtBQUNBUixRQUFJUyxTQUFKLEdBQWdCVCxJQUFJVSxZQUFwQjtBQUNILENBSEQsQyIsImZpbGUiOiJqcy9jaGF0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNjkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDExOWFjMDMwMTZhYjdmMDU5NzAyIiwiXG5jb25zdCBhcHAgPSBuZXcgVnVlKHtcbiAgICBlbDogJyNhcHAnLFxuICAgIGRhdGE6IHtcbiAgICAgICAgbWVzc2FnZXM6IFtdLFxuXHQgICAgdXNlcnNJblJvb206IFtdXG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICBhZGRNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ21lc3NhZ2UgYWRkZWQnKTtcblxuICAgICAgICAvLyBBZGQgbWVzc2FnZVxuICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZS5tZXNzYWdlLFxuICAgICAgICAgICAgdXNlcjogSlNPTi5wYXJzZShtZXNzYWdlLnVzZXIpXG4gICAgICAgIH0pXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnBhcnNlKG1lc3NhZ2UudXNlcikuYXZhdGFyKTtcbiAgICAgICAgLy8gVG8gdGhlIGRhdGFiYXNlXG4gICAgICAgIGF4aW9zLnBvc3QoJy9tZXNzYWdlcycsIG1lc3NhZ2UpXG5cbiAgICAgICAgdmFyIGxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGF0LWxvZycpXG4gICAgICAgIGxvZy5zY3JvbGxUb3AgPSBsb2cuc2Nyb2xsSGVpZ2h0O1xuICAgICAgfVxuICAgIH0sXG4gICAgY3JlYXRlZCgpIHtcbiAgICAgICAgYXhpb3MuZ2V0KCcvbWVzc2FnZXMnKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBpczogJyxyZXNwb25zZS5kYXRhWzBdLnVzZXIuYXZhdGFyKTtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZXMgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICB9KTtcblxuICAgICAgICBFY2hvLmpvaW4oJ2NoYXRyb29tJylcbiAgICAgICAgICAgIC5oZXJlKCh1c2VycykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXNlcnNJblJvb20gPSB1c2Vyc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luaW5nKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51c2Vyc0luUm9vbS5wdXNoKHVzZXIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5sZWF2aW5nKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51c2Vyc0luUm9vbSA9IHRoaXMudXNlcnNJblJvb20uZmlsdGVyKHUgPT4gdSAhPSB1c2VyKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAubGlzdGVuKCdNZXNzYWdlUG9zdGVkJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogZS51c2VyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgdmFyIGxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGF0LWxvZycpXG4gICAgICAgICAgICAgICAgbG9nLnNjcm9sbFRvcCA9IGxvZy5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICB9KTtcblxuICAgIH1cbn0pO1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGF0LWxvZycpXG4gICAgbG9nLnNjcm9sbFRvcCA9IGxvZy5zY3JvbGxIZWlnaHQ7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NoYXQuanMiXSwic291cmNlUm9vdCI6IiJ9