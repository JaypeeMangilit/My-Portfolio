// ============================================================================
//  PERSONAL DETAILS — EDIT THIS FILE
//  ----------------------------------------------------------------------------
//  Every value marked TODO is a placeholder. Replace it with your own details
//  before you share the site. Nothing here is invented for you, and no
//  personal data is collected by the website itself.
// ============================================================================

export interface SocialLink {
  label: string
  href: string
  /** Tells the footer which icon to draw. */
  kind: 'facebook' | 'email' | 'phone'
}

export interface Project {
  title: string
  description: string
  url: string
  /** Path to a screenshot inside /public. Leave empty to show a placeholder. */
  screenshot: string
}

export const site = {
  // TODO: Your full name. Used in the navbar, hero, about section, and footer.
  name: 'Jaypee G. Mangilit',

  role: 'Full-Stack Web Developer',
  specialization: 'Custom Web Applications and Management Systems',

  tagline: 'BUILDING DIGITAL SOLUTIONS THAT MAKE WORK SIMPLER.',

  intro:
    "I'm a full stack web developer focused on building practical, reliable, and user-friendly web applications and management systems that help schools, businesses, and organizations improve their operations.",

  // TODO: Add more paragraphs by adding another string to this array.
  about: [
    "I'm a Jaypee G. Mangilit, a full stack web developer who enjoys creating systems that solve real-world problems. I focus on developing custom web applications, database-driven solutions, and management systems that make everyday processes more efficient.",
  ],

  // TODO: Your city/country, or set to '' to hide the row.
  location: 'Rosario, Philippines',

  // TODO: Contact details — these are placeholders until you fill them in.
  email: 'jaypeemangilit001@gmail.com',
  phone: '+63994 067 7270',
  facebook: 'https://www.facebook.com/jaypee.mangilit.92',

  // Your photo, already optimized into /public/my-picture.jpg.
  picture: '/my-picture.jpg',

  // TODO: Add, remove, or edit links. Set href to '#' to hide a link.
  socials: [
    { label: 'Email', href: 'mailto:jaypeemangilit001@gmail.com', kind: 'email' },
    { label: 'Facebook', href: 'https://www.facebook.com/jaypee.mangilit.92', kind: 'facebook' },
    { label: 'Phone', href: 'tel:+639940677270', kind: 'phone' },
  ] as SocialLink[],

  // TODO: Edit these projects, or add more following the same shape.
  projects: [
    {
      title: 'MTCGS Finance Management System',
      description:
        'A web-based finance management system built to help an organization keep its financial records and day-to-day transactions organized and easy to access.',
      url: 'https://finance.mtcgsportal.com',
      screenshot: '/Finance-Screenshot.jfif',
    },
    {
      title: 'Patnubay Student Portal',
      description:
        'An online student portal that gives students and staff a central place to access school information and routine academic services.',
      url: 'https://patnubaystudentportal.info',
      screenshot: '/StudentPortal-Screenshot.jfif',
    },
  ] as Project[],
}
