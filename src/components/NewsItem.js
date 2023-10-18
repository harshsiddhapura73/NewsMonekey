import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
   let {title, description, imageUrl, newsUrl, author, publishedAt, source} = this.props;
    return (
        <div className='my-3'>
            
            <div className="card">
                <img className="card-img-top" src={imageUrl} alt="Card  cap" />
                <span className="badge badge-pill badge-danger" style={{top: "-7px",position: "absolute",right: "-10px"}}>{source}</span>
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(publishedAt).toLocaleString()}</small></p>
                    <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">Read more</a>
                </div>
            </div>
        </div>
    )
  }
}

export default NewsItem
