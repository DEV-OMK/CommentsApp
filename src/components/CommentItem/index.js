// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, onDeleteComment, onLikeComment} = props
  const {
    id,
    name,
    comment,
    isLiked,
    initialContainerClassNames,
    date,
  } = commentDetails

  const likeTextClass = isLiked ? 'liked-button' : ''
  const likeIconUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onClickLike = () => {
    onLikeComment(id)
  }

  const onClickDelete = () => {
    onDeleteComment(id)
  }

  return (
    <li className="comment-container">
      <div className="container-1">
        <div className={initialContainerClassNames}>{name.slice(0, 1)}</div>
        <div className="comment-text-container">
          <div className="name-container">
            <p className="name">{name}</p>
            <p className="date">{formatDistanceToNow(date)}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="button-container">
        <div className="like-button-container">
          <img src={likeIconUrl} className="like-icon" alt="like" />
          <button
            className={`button-1 ${likeTextClass}`}
            type="button"
            onClick={onClickLike}
          >
            Like
          </button>
        </div>
        <button
          type="button"
          className="button-1"
          data-testid="delete"
          onClick={onClickDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="delete-icon"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
