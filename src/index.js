import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import * as serviceWorker from './serviceWorker';


/*
* Header de l'application :
* titre
* */
class Header extends React.Component {

    render() {

        return (
            <header className="timer-app__header">
                <h1>timer react</h1>
            </header>
        )
    }
}

/*
* Footer de l'application :
* prénom et nom
* */
class Footer extends React.Component {

    render() {

        return (
            <footer className="timer-app__footer">
                <p>Charline Laporte m2devA</p>
            </footer>
        )
    }
}

/*
* Main de l'application :
* container des deux timer
* */
class Main extends React.Component {

    render() {

        return (
            <main className="timer-app__main">
                <TimerContainer time={8} ingredient={"pasta"}/>
                <TimerContainer time={4} ingredient={"sauce"}/>
            </main>
        )
    }
}


/*
* Container des timer de l'application :
* container des deux timer
* */
class TimerContainer extends React.Component {
    constructor(props) {
        super(props);

        this.time = props.time;
        this.ingredient = props.ingredient;

        this.ww = window.innerWidth;
        this.wh = window.innerHeight;

        this.randomCircles()
    }

    randomCircles() {

        this.$circles = [];
        let delay = 0.10;

        for (let i = 0; i < 20; i++) {
            this.$circles.push(<circle cx={this.randomPosition()} cy={this.randomPosition()} r={this.randomRadius()} fill={this.randomColor()} style={{transitionDelay: (delay * i) + "s"}}></circle>)
        }
    }

    randomPosition() {
        return (Math.random() * 100) + "%"
    }

    randomRadius() {
        return (Math.random() * (0.025 - 0.005) + 0.005) * this.ww
    }

    randomColor() {

        let colors = [
            "#6fc0c6",
            "#ccf0c2",
            "#c0ddc5",
            "#fdb33f",
            "#fdb33f",
            "#674f72",
            "#bf81c3",
            "#e5638f",
            "#1ecfc6"
        ];

        let randomIndex = Math.trunc(Math.random() * (colors.length));

        return colors[randomIndex]
    }

    render() {

        return (
            <section className="timer-app__container">

                <svg className="timer-app__bg">{this.$circles}</svg>

                <div className="timer-app__circle">
                    <div className="timer-app__progress"></div>
                    <Timer time={this.time}/>
                </div>

                <div className="timer-app__title">
                    <h2>{this.ingredient} !</h2>
                </div>

            </section>
        )
    }
}


/*
* Timer de l'application :
* texte qui change
* */
class Timer extends React.Component {

    constructor(props) {
        super(props);

        // les variables que l'on récupère
        this.time = Number(props.time);

        // pour l'animation de la progression
        this.timeTotal = this.time * 60;

        // prépare le state + convertit le temps récupéré en secondes
        this.state = {
            count: this.timeTotal
        }
    }

    componentDidMount() {

        // lance le timer
        this.timer = setInterval(
            this.tick.bind(this),
            1000
        );

        // récupère le container du timer
        this.$container = ReactDOM.findDOMNode(this).parentNode.parentNode
    }

    componentWillUnmount() {

        // efface le timer
        clearImmediate(this.timer)
    }

    tick() {

        // augmente la progression
        let scale =  (this.timeTotal - this.state.count + 1) / this.timeTotal;
        this.$container.querySelector(".timer-app__progress").style.transform = "scale("+scale+")";

        // si fini on ajoute la class au container pour afficher l'écran de fin
        if (this.state.count <= 0) this.$container.classList.add("timer-app__container--complete");

        // si non fini on continue le timer
        else {

            // change l'état
            this.setState({
                count: this.state.count - 1
            })
        }
    }

    render() {

        // calcule les minutes et secondes à afficher
        let minutes = Math.trunc(this.state.count / 60);
        let secondes = this.state.count % 60 >= 10 ? this.state.count % 60 : "0" + this.state.count % 60;

        return <p className="timer-app__time">{minutes} : {secondes}</p>
    }
}


/*
* App :
* */
class App extends React.Component {

    render() {

        return (
            <div className="timer-app__wrapper">
                <Header/>
                <Main/>
                <Footer/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('timer-app'));