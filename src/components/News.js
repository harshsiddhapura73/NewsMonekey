import React, { Component } from 'react'
import NewsItem from './NewsItem'
import imageNotAvailable from './image not found.png'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        country : "in",
        pageSize : 8,
        category : 'general',
    }

    static propTypes = {
        country :PropTypes.string,
        pageSize: PropTypes.number,
        category : PropTypes.string,
    }

    capitalizeFirstLetter =(string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

       constructor(props){
        super(props);
        console.log("hello guys");
        this.state = {
            articles : [],
            loading : false,
            page :1,
            totalResults: 0,
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async updateNews(){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5ee19a8659044f7ba725a9bf8ce85659&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedata = await data.json()
        this.props.setProgress(70);
        this.setState({
            articles : parsedata.articles,
            totalResults : parsedata.totalResults,
            loading : false,
        })
        this.props.setProgress(100);
    }

    async componentDidMount(){
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({page:this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5ee19a8659044f7ba725a9bf8ce85659&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedata = await data.json()
        this.setState({
            articles : this.state.articles.concat(parsedata.articles),
            totalResults : parsedata.totalResults,
            loading : false,
        })
      };


  render() {
    return (
        <>
            <h1 className='text-center mx-3'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
            {this.state.loading && <Spinner/>}

            <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
            >
                <div className='container my-3'>
                    <div className='row'>
                
                        {this.state.articles.map((element)=>{
                            return <div className='col-md-4' key={element.url}>
                                <NewsItem title={element.title?element.title.slice(0,50):""} description={element.description?element.description.slice(0,100):""} imageUrl={element.urlToImage?element.urlToImage:imageNotAvailable} 
                                newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name}/>
                            </div> 
                        })}     
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
  }
}

export default News