import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {
    name: '',
    comment: '',
    commentsList: [],
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const initialContainerClassNames = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
      ]
    }`
    if (name !== '' && comment !== '') {
      this.setState(prevState => {
        const newComment = {
          id: uuidv4(),
          name,
          comment,
          initialContainerClassNames,
          isLiked: false,
          date: new Date(),
        }

        return {
          name: '',
          comment: '',
          commentsList: [...prevState.commentsList, newComment],
        }
      })
    }
  }

  onDeleteComment = id => {
    const {commentsList} = this.state
    const filteredCommentsList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({commentsList: filteredCommentsList})
  }

  onLikeComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachItem => {
        if (eachItem.id === id) {
          const newItem = {...eachItem, isLiked: !eachItem.isLiked}
          return newItem
        }
        return eachItem
      }),
    }))
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  render() {
    const {name, comment, commentsList} = this.state

    return (
      <div className="bg-container">
        <div className="header-container">
          <div className="header-text-container">
            <h1 className="title">Comments</h1>
            <div className="image-container-xs">
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                className="comment-image"
                alt="comment"
              />
            </div>
            <p className="caption">Say something about 4.0 Technologies</p>
            <form onSubmit={this.onAddComment}>
              <input
                type="text"
                className="input-name"
                value={name}
                placeholder="Your Name"
                onChange={this.onChangeName}
              />
              <textarea
                type="text"
                value={comment}
                className="input-comment"
                placeholder="Your Comment"
                cols="auto"
                rows="4"
                onChange={this.onChangeComment}
              >
                Your Comment
              </textarea>
              <button type="submit" className="button">
                Add Comment
              </button>
            </form>
          </div>
          <div className="image-container-lg">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              className="comment-image"
              alt="comment"
            />
          </div>
        </div>
        <hr />
        <p className="comment-count">
          <span className="count">{commentsList.length}</span> Comments
        </p>
        <ul className="comments-container">
          {commentsList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              commentDetails={eachComment}
              onDeleteComment={this.onDeleteComment}
              onLikeComment={this.onLikeComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
