import { revalidateTag, revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookPayload = {
  _type: string
  _id: string
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET

    // Allow bypassing signature check ONLY if secret is not set in environment (for local dev/testing)
    let body: WebhookPayload | null = null
    let isValidSignature = false

    if (secret) {
      const result = await parseBody<WebhookPayload>(
        req,
        secret,
        true // Add delay to allow CDN to update
      )
      body = result.body
      isValidSignature = !!result.isValidSignature
    } else {
      // In local dev without secret, parse JSON directly
      body = await req.json()
      isValidSignature = true
    }

    if (!isValidSignature || !body) {
      return new Response('Invalid signature', { status: 401 })
    }

    const type = body._type
    const tagsToRevalidate: string[] = []
    const pathsToRevalidate: string[] = []

    // Map document type to cache tags & paths
    switch (type) {
      case 'siteSettings':
        tagsToRevalidate.push('siteSettings')
        pathsToRevalidate.push('/')
        pathsToRevalidate.push('/about')
        pathsToRevalidate.push('/experience')
        pathsToRevalidate.push('/gallery')
        pathsToRevalidate.push('/reviews')
        pathsToRevalidate.push('/contact')
        break
      case 'seoSettings':
        tagsToRevalidate.push('seo')
        pathsToRevalidate.push('/')
        pathsToRevalidate.push('/about')
        pathsToRevalidate.push('/experience')
        pathsToRevalidate.push('/gallery')
        pathsToRevalidate.push('/reviews')
        pathsToRevalidate.push('/contact')
        break
      case 'contactSettings':
        tagsToRevalidate.push('contact')
        pathsToRevalidate.push('/')
        pathsToRevalidate.push('/contact')
        pathsToRevalidate.push('/reviews') // page shows contact info in CTA/footer
        break
      case 'homepage':
        tagsToRevalidate.push('homepage')
        pathsToRevalidate.push('/')
        break
      case 'heroSlide':
        tagsToRevalidate.push('hero')
        pathsToRevalidate.push('/')
        break
      case 'review':
        tagsToRevalidate.push('reviews')
        pathsToRevalidate.push('/')
        pathsToRevalidate.push('/reviews')
        break
      case 'galleryImage':
        tagsToRevalidate.push('gallery')
        pathsToRevalidate.push('/')
        pathsToRevalidate.push('/gallery')
        break
      case 'showcaseEvent':
        tagsToRevalidate.push('showcase')
        pathsToRevalidate.push('/')
        pathsToRevalidate.push('/experience')
        break
      default:
        // Generic fallback: revalidate the home page
        pathsToRevalidate.push('/')
    }

    // Perform revalidation using the required 2-argument signature for this Next.js version
    tagsToRevalidate.forEach((tag) => revalidateTag(tag, 'max'))
    pathsToRevalidate.forEach((path) => revalidatePath(path))

    return NextResponse.json({
      revalidated: true,
      tags: tagsToRevalidate,
      paths: pathsToRevalidate,
      timestamp: Date.now(),
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return new Response((err as Error).message, { status: 500 })
  }
}
