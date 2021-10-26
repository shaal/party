import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const ContentSecurityPolicy = `
    block-all-mixed-content;
    font-src assets.devparty.io;
  `

  return new Response(null, {
    headers: {
      ...Object.fromEntries(req.headers),
      'Content-Security-Policy': ContentSecurityPolicy.replace(/\n/g, ''),
      'Referrer-Policy':
        'origin-when-cross-origin, strict-origin-when-cross-origin',
      'Permissions-Policy': 'interest-cohort=()',
      'X-middleware-next': '1',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-DNS-Prefetch-Control': 'on',
      'Strict-Transport-Security':
        'max-age=31536000; includeSubDomains; preload'
    }
  })
}
