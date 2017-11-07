"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

        _this.times = {};
        _this.state = {
            display: '',
            results: []
        };

        _this.running = false;
        _this.laps = [];
        return _this;
    }

    _createClass(Stopwatch, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.reset();
        }
    }, {
        key: "reset",
        value: function reset() {
            this.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };

            this.print();
        }
    }, {
        key: "print",
        value: function print() {
            this.setState({
                display: this.format(this.times)
            });
        }
    }, {
        key: "format",
        value: function format(times) {
            return pad0(times.minutes) + ":" + pad0(times.seconds) + ":" + pad0(Math.floor(times.miliseconds));
        }
    }, {
        key: "start",
        value: function start() {
            var _this2 = this;

            if (!this.running) {
                this.running = true;
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }
        }
    }, {
        key: "step",
        value: function step() {
            if (!this.running) return;
            this.calculate();
            this.print();
        }
    }, {
        key: "lap",
        value: function lap() {
            var results = this.state.results;

            results.push(this.format(this.times));

            this.setState({
                results: results
            });
        }
    }, {
        key: "clearList",
        value: function clearList() {
            this.setState({ results: [] });
        }
    }, {
        key: "calculate",
        value: function calculate() {
            this.times.miliseconds += 1;
            if (this.times.miliseconds >= 100) {
                this.times.seconds += 1;
                this.times.miliseconds = 0;
            }
            if (this.times.seconds >= 60) {
                this.times.minutes += 1;
                this.times.seconds = 0;
            }
        }
    }, {
        key: "stop",
        value: function stop() {
            this.running = false;
            clearInterval(this.watch);
        }
    }, {
        key: "render",
        value: function render() {
            var liResults = this.state.results.map(function (item, i) {
                return React.createElement(
                    "li",
                    { key: i },
                    item
                );
            });

            return React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                    "div",
                    { className: "stopwatch" },
                    React.createElement(
                        "div",
                        { className: "controls" },
                        React.createElement(
                            "a",
                            { href: "#", className: "button start", onClick: this.start.bind(this) },
                            "Start"
                        ),
                        React.createElement(
                            "a",
                            { href: "#", className: "button stop", onClick: this.stop.bind(this) },
                            "Stop"
                        ),
                        React.createElement(
                            "a",
                            { href: "#", className: "button reset", onClick: this.reset.bind(this) },
                            "Reset"
                        ),
                        React.createElement(
                            "a",
                            { href: "#", className: "button lap", onClick: this.lap.bind(this) },
                            "Results"
                        ),
                        React.createElement(
                            "a",
                            { href: "#", className: "button clearList", onClick: this.clearList.bind(this) },
                            "ClearList"
                        )
                    ),
                    this.state.display
                ),
                React.createElement(
                    "ul",
                    { className: "results" },
                    liResults
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('Stopwatch'));
