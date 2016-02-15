import request from 'superagent'
import api from 'meta/api'

export const INCREASE_REPUTATION = 'INCREASE_REPUTATION'

export function increaseReputationByUpvote() {
  request
    .patch(api.reputation.increase.by.upvote)
    .send({userId: userId, postId: postId})
    .withCredentials()
    .set('Accept', 'application/json')
    .end((error, response) => {
      if (error) { }
    })
}

// export function increaseReputationByUpvote() {
//   return {
//     type: INCREASE_REPUTATION
//   }
// }
