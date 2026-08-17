/**
 * Sanity image CDN helpers.
 *
 * `sanity-utils.ts` returns `image.asset->url`, which is the *original* upload —
 * portrait phone photos, typically 1536x2048. Every grid thumbnail on the site
 * displays them in a landscape `aspect-[4/3]` box under `object-cover`, so the
 * browser was downloading a tall image and throwing away roughly 40% of its
 * pixels to letterbox-crop it.
 *
 * Asking Sanity for the crop instead means those pixels are never sent. On the
 * /gallery LCP image this took the optimized AVIF from 89 KB to 60 KB.
 *
 * `fit=crop` centre-crops, which is what `object-cover` was already doing, so
 * the visible framing does not change. (Sanity can honour a per-asset hotspot
 * via `crop=focalpoint` + `fp-x`/`fp-y`, but the GROQ queries do not select
 * hotspot data and no asset in the dataset sets one.)
 */

/** Width to request from Sanity for a 4:3 thumbnail, in px. */
const THUMB_WIDTH = 1200

/**
 * Returns `url` cropped to 4:3 by the Sanity CDN, sized for a grid thumbnail.
 *
 * Next's optimizer still resizes and re-encodes the result per `sizes`, so this
 * only removes the wasted pixels — it does not fix the final delivered width.
 * Pass the untouched URL through for anything that is not a 4:3 box.
 */
export function thumbnail4x3(url: string): string {
  if (!url) return url
  // Asset URLs are query-less today; keep the append correct if that changes.
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}w=${THUMB_WIDTH}&h=${Math.round(
    (THUMB_WIDTH * 3) / 4
  )}&fit=crop&auto=format`
}
