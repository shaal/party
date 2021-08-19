export const linkifyOptions = {
  formatHref: function (href: string, type: any) {
    if (type === 'hashtag') {
      href = '/topics/' + href.slice(1)
    }
    return href
  }
}
