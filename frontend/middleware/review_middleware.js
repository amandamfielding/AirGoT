import {
  receiveReviews,
  receiveReview,
  removeReview,
  FETCH_REVIEWS,
  CREATE_REVIEW,
  DELETE_REVIEW
} from '../actions/reviews_actions';

import {
  createReview,
  deleteReview,
  fetchReviews
} from '../util/reviews_api_util';

const ReviewMiddleware = store => next => action => {
  const successFetchAll = data => store.dispatch(receiveReviews(data));
  const successFetch = data => store.dispatch(receiveReview(data));
  const successDelete = data => store.dispatch(removeReview(data));

  switch (action.type) {
    case FETCH_REVIEWS:
      fetchReviews(action.placeId,successFetchAll);
      return next(action);
    case CREATE_REVIEW:
      createReview(action.review,successFetch);
      return next(action);
    case DELETE_REVIEW:
      deleteReview(action.id,successDelete);
      return next(action);
    default:
      return next(action);
  }
};

export default ReviewMiddleware;
