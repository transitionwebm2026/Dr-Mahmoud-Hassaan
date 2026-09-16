import type { SVGProps } from "react";

/**
 * lucide-react ships generic icons only (brand marks like Instagram and
 * Facebook were removed for trademark reasons). These two are drawn in the
 * same stroke style/size as lucide icons so they sit seamlessly next to
 * them wherever social links are rendered.
 */

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

/**
 * Unlike Instagram/Facebook above, WhatsApp's mark reads clearly only as a
 * solid glyph — an outline version of it is not recognizable at small sizes
 * — so this one is filled (`fill="currentColor"`) instead of stroked.
 */
export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      {...props}
    >
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.14.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.759-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.554 0-11.891 5.336-11.893 11.893-.001 2.096.549 4.14 1.595 5.945l-1.696 6.19 6.336-1.652c1.746.943 3.71 1.444 5.71 1.444h.005c6.554 0 11.891-5.336 11.893-11.893.001-3.181-1.237-6.169-3.487-8.412-2.242-2.244-5.229-3.475-8.463-3.475zm.006 21.783c-1.858 0-3.678-.5-5.271-1.446l-.378-.224-3.708.966.995-3.612-.246-.372c-1.037-1.647-1.583-3.553-1.582-5.514.002-5.712 4.65-10.358 10.365-10.358 2.767 0 5.366 1.079 7.32 3.036 1.955 1.957 3.032 4.559 3.031 7.328-.002 5.714-4.649 10.359-10.526 10.359z" />
    </svg>
  );
}
