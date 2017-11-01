class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.running = false;
        this.display = display;
        this.reset();
        this.laps = [];
        this.results = results;
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        }
        this.display.innerText = this.format(this.times);
    }

    print() {
        this.display.innerText = this.format(this.times);
	}

	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    lap() {
        const li = document.createElement('li');
        li.innerText = this.format(this.times);
        this.results.appendChild(li);
    }

    clearList() {
        deleteLaps(this.results);
    }

    calculate() {
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

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }


    function pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }

    function deleteLaps(node) {
        while (node.lastChild)
            node.removeChild(node.lastChild);
    }

    render() {
        return (
            <div className="container">
                <div className="stopwatch">
                    <div className="controls">
                        <a href="#" className="button start" onClick={this.start.bind(this)}>Start</a>
                        <a href="#" className="button stop" onClick={this.stop.bind(this)}>Stop</a>
                        <a href="#" className="button reset" onClick={this.reset.bind(this)}>Reset</a>
                        <a href="#" className="button lap"  onClick={this.lap.bind(this)}>Results</a>
                        <a href="#" className="button clearList" onClick={this.clearList.bind(this)}>ClearList</a>
                  </div>
                </div>
                  <ul className="results"></ul>   
            </div>
              
        );
    }
}


ReactDOM.render(
  <Stopwatch />,
  document.getElementById('Stopwatch')
);













