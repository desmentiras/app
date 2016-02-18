export const API_ENDPOINT = '//api.localhost'

export default {
  user: {
    authenticate: `${API_ENDPOINT}/user/authenticate`,
    me: `${API_ENDPOINT}/me`
  },
  posts: {
    getMostRecent: `${API_ENDPOINT}/posts`,
    getById(id) {
      return `${API_ENDPOINT}/posts/${id}`
    },
    upvoteById(id) {
      return `${API_ENDPOINT}/posts/${id}/upvote`
    },
    downvoteById(id) {
      return `${API_ENDPOINT}/posts/${id}/downvote`
    }
  },
  links: {
    getInfo(url) {
      return `${API_ENDPOINT}/links/?url=${url}`
    }
  }
}
