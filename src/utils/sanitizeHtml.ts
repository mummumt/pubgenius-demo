import sanitizeHtml from 'sanitize-html'

export const sanitize = (dirty: string) =>
  sanitizeHtml(dirty, {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'img', 'iframe'],
    allowedAttributes: {
      a: ['href'],
      img: ['src'],
      allowedSchemes: ['data', 'http', 'https'],
      iframe: ['source', 'width', 'height', 'src', 'title', 'frameborder'],
    },
    allowedIframeHostnames: ['www.youtube.com'],
  })
