interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'A sport tracker app',
    description: `Track your sports activities and monitor your performance with our intuitive sport tracker app.`,
    imgSrc: '/static/images/sport-tracker.png',
    href: '/projects/sport-tracker',
  },
  {
    title: 'AI Intelligent Drug Detection Platform',
    description: `An AI-powered platform designed to detect and analyze drug interactions, providing insights for safer medication management.`,
    imgSrc: '/static/images/drug.png',
    href: '/projects/drug-detection',
  },
]

export default projectsData
