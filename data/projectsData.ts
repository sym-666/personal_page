interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'A sport tracker app',
    description: `Track your sports activities and monitor your performance with our intuitive sport tracker app.Link : https://puppygoapp.com/`,
    imgSrc: '/static/images/sport-tracker.png',
    href: '/projects/sport-tracker',
  },
  {
    title: 'AI Intelligent Drug Detection Platform',
    description: `An AI-powered platform designed to detect and analyze drug interactions, providing insights for safer medication management. Link : https://sym-666.github.io/medicine/`,
    imgSrc: '/static/images/drug.png',
    href: '/projects/drug-detection',
  },
  {
    title: 'Open-source Tdesign(a tencent UI library) project',
    description: `An open-source project aimed at creating a modern design system for building responsive and accessible web applications.`,
    imgSrc: '/static/images/Tdesign.png',
    href: '/projects/Tdesign',
  },
  {
    title: 'cbaldur——a Nuclear fusion computing platform',
    description: `Cbaldur is a cutting-edge nuclear fusion computing platform designed to simulate and analyze fusion reactions, providing valuable insights for researchers and scientists in the field of nuclear energy. Link: https://cbaldur.fusim.cn/ `,
    imgSrc: '/static/images/cbaldur.png',
    href: '/projects/cbaldur',
  },
]

export default projectsData
