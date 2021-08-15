export const getTopics = (postBody: string) => {
  var regexp = /\B\#\w\w+\b/g
  var result = postBody.match(regexp)
  return result
}
