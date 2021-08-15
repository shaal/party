export const getTopics = (postBody: string) => {
  var regexp = /\B\#\w\w+\b/g
  var result = postBody.match(regexp)
  if (result) {
    var arr = result.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) == index
    })

    return arr
  } else {
    return null
  }
}
