export const linkifyOptions = {
  formatHref: function (href: string, type: any) {
    if (type === 'hashtag') {
      href = '/topics/' + href.substring(1)
    }
    return href
  }
}
