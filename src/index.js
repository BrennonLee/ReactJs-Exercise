import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import './vendor/bootstrap/css/bootstrap.min.css';
import './vendor/bootstrap/css/ie10-viewport-bug-workaround.css';
import './vendor/bootstrap/js/ie10-viewport-bug-workaround.js';


class Footer extends React.Component{

    render() {
        return(
            <footer className="footer">
                <p>&copy; 2017 Carimus, Inc.</p>
            </footer>
        )
    }
}

function ShowGif(props){

    const images = [];

    props.url.forEach((url) => {
        images.push(<img className='gif-entry page-class' src={url} alt='' />)
    });

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="gif-entry" id="GIFS">
                    {images}
                </div>
            </div>
        </div>
    )
}

class Loader extends React.Component{

    render() {
        return(
            <div className="row">
                <div className="col-md-12 text-center">
                    <div className="loader" id="loader" />
                </div>
            </div>
        )
    }
}




function Trending(props){

        return(
            <a className="btn btn-info" onClick={props.onClick}>
                <span className="glyphicon glyphicon-sunglasses"/>
                Trending
            </a>
        )
}

function Random(props) {

        return(
            <a className="btn btn-primary" onClick={props.onClick}>
                <span className="glyphicon glyphicon-random" />
                Random
            </a>

        )
}


class Base extends React.Component {

    constructor() {
        super();
        this.state = {
            API_key : 'dc6zaTOxFJmzC',
            loader: false,
            gif_url: Array(1).fill(null),
            user_search: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.setState({user_search: event.target.value});
    }

    getRandom(url) {

        axios.get(url)
            .then(res => {

                // const gif_url = res.data.data.image_original_url;
                this.setState({
                    loader: true,
                    gif_url : Array(1).fill(res.data.data.image_original_url)
                });

                this.setState({
                    loader: false,
            });

        });
    }

    getTrending(url) {

        axios.get(url)
            .then(res => {
                // console.log(res);

                this.setState({
                    loader: true,
                    gif_url : Array(res.data.data.length).fill(null),
                });

                for( let i=0; i<res.data.data.length; i++){
                    this.state.gif_url[i] = res.data.data[i].images.fixed_height.url;
                }
                // console.log(this.state.gif_url);

                this.setState({
                    loader: false,
            });
        });
    }

    getInput(key,url, query) {
        // console.log("You are searching for " + query);
        axios.get(url + query + "&api_key=" + key)
            .then(res => {
                // console.log(res);

                this.setState({
                    loader: true,
                    gif_url : Array(res.data.data.length).fill(null),
                });

                for( let i=0; i<res.data.data.length; i++){
                    this.state.gif_url[i] = res.data.data[i].images.fixed_height.url;
                }
                // console.log(this.state.gif_url);

                this.setState({
                    loader: false,
                });
            });
    }

    render() {

        const randomUrl = 'http://api.giphy.com/v1/gifs/random?api_key=' + this.state.API_key; //URL for Random
        const trendingUrl = "http://api.giphy.com/v1/gifs/trending?api_key=" + this.state.API_key; //URL for Trending
        const searchUrl = "http://api.giphy.com/v1/gifs/search?q="; //URL for User Search

        return(
            <div className="container">
                <div className="header clearfix" >
                    <h3 className="text-muted">Exercise: Frontend - React JS</h3>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="well">
                            <div className="row">
                                <div className="col-sm-7">
                                    {/*<Input onClick ={() => this.getInput(searchUrl, this.state.user_search)}/>*/}
                                    <div className="input-group">
                                        <input type="text" className="form-control" value={this.state.user_search}
                                               placeholder="Search for..." id="query" onChange={this.handleChange}/>
                                        <span className="input-group-btn">
                                            <button className="btn btn-secondary" type="button" onClick={() => this.getInput(this.state.API_key,searchUrl, this.state.user_search)}>Go!</button>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-sm-5">
                                    <div className="btn-group btn-group-justified">
                                        <Random  API_key={this.state.API_key} onClick={() =>this.getRandom(randomUrl)}/>
                                        <Trending API_key={this.state.API_key} onClick={()=>this.getTrending(trendingUrl)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.loader ? <Loader /> : null}


                <ShowGif url={this.state.gif_url}/>

                <Footer />

            </div>

        )
    }
}

ReactDOM.render(<Base />, document.getElementById("root"));