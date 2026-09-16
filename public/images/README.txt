Drop real photos in this folder and the site picks them up automatically —
no code changes needed.

Homepage hero background: hero-doctor.jpg
  IMPORTANT: this is currently a GENERIC STOCK PHOTO, used as a temporary
  stand-in — it is NOT a real photo of Dr. Mahmoud Hassan. Replace it with
  his actual photo as soon as one is available (see CREDITS.md for the
  current placeholder's source, so you can remove the credit line once
  it's swapped out).

  Recommended for the real photo: portrait orientation, high-resolution
  (at least 1600x2000px), well-lit, with some empty space around the
  head/shoulders so the text overlay on top stays readable. Just overwrite
  this same file (keep the name hero-doctor.jpg, or update the `photoSrc`
  prop passed to <Hero /> in components/Hero.tsx if you use a different
  name/extension).

About page hero background: about-hero-doctor.jpg
  Same idea as hero-doctor.jpg above (missing = placeholder shown
  automatically), but page-specific per the "Universal Hero Structure"
  pattern — swap this one without touching the homepage's photo.

About page "message from the doctor" portrait: about-doctor.jpg
  Portrait-ish crop (roughly 4:5), shown beside the personal message on
  /about. Also falls back to the placeholder automatically until added.

Services page hero background: services-hero-doctor.jpg
  Same idea as hero-doctor.jpg — page-specific, falls back to the
  placeholder automatically until added.

Videos page hero background: videos-hero-doctor.jpg
  Same idea as hero-doctor.jpg — page-specific, falls back to the
  placeholder automatically until added.

Articles page hero background: articles-hero-doctor.jpg
  Same idea as hero-doctor.jpg — page-specific, falls back to the
  placeholder automatically until added.

Footer "designed by" badge logo: logo-01.png
  Small mark shown in the Transition agency credit badge at the bottom of
  the footer (links to https://transitioneg.com/). Until this file exists,
  the badge just shows without a logo (falls back gracefully, no broken
  image icon). Small square/roughly-square logo works best, ~40x40px+.
