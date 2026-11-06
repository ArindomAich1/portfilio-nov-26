// Single source of truth for every string on the site.
// Facts come from portfolio.txt (resume + old site + updates). Do not add anything that is not there.
// Fields marked TODO are unknown; leave them undefined and the UI hides them.
import type { Achievement, Education, MinorProject, Project, Role, SkillGroup } from './types'

export const profile = {
  name: 'Arindom Aich',
  role: 'Ph.D. Scholar, CSE',
  affiliation: 'IIT Kharagpur',
  statement:
    'Researcher at IIT Kharagpur working across Artificial Intelligence, IoT and Computer Networks. Previously spent 2+ years building Generative AI and backend systems in industry.',
  summary: [
    'Ph.D. scholar in Computer Science and Engineering and Project Research Assistant at IIT Kharagpur, with 2+ years of industry experience in Generative AI and backend development: Java, Spring Boot, Python, FastAPI, LLM and RAG pipelines.',
    'Delivered products across Fashion Tech, Real Estate and Personal Wellness, and led cross-functional teams from development through deployment.',
  ],
  location: 'Kharagpur, India',
  coords: '22.31°N 87.31°E',
  timeZone: 'Asia/Kolkata',
  email: 'arindomaich2@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/arindomaich/',
    github: 'https://github.com/ArindomAich1',
    cv: '/Arindom_Aich_CV.pdf',
    scholar: undefined as string | undefined, // TODO: Google Scholar profile
    orcid: undefined as string | undefined, // TODO: ORCID
  },
}

export const facts = [
  { value: '2+', label: 'years in industry' },
  { value: '1', label: 'patent published' },
  { value: 'GATE', label: 'CS 2024 qualified' },
  { value: 'Ph.D.', label: 'scholar, IIT Kharagpur' },
]

export const interests = [
  {
    key: 'ai',
    title: 'Artificial Intelligence',
    body: 'LLM integration, retrieval-augmented generation, hybrid and vector search, multimodal pipelines.',
  },
  {
    key: 'iot',
    title: 'Internet of Things',
    body: 'Internet of Medical Things, QoS for connected devices, Cloud and Fog offloading.',
  },
  {
    key: 'net',
    title: 'Computer Networks',
    body: 'Software-Defined Networking, OpenFlow QoS, 5G network slicing and simulation.',
  },
] as const

export const currentPosition = {
  title: 'Project Research Assistant',
  org: 'CoE for Unified AI-Enabled Craft Ecosystem Platform',
  institute: 'IIT Kharagpur',
  since: '2026',
  description: undefined as string | undefined, // TODO: role description
}

export const priorResearch = [
  {
    title: 'Ensuring QoS in Internet of Medical Things using Software-Defined Networking',
    context: 'MeitY-funded project',
    certificate: 'https://drive.google.com/file/d/1j3U_Yz3KqK9YUQ2vEV5D5uqsRCphnam7/view?usp=sharing',
    body: 'Contributed to research on QoS for hospital IoMT networks with SDN; co-developed the resulting published patent.',
    stack: ['React', 'TypeScript', 'Redux', 'MySQL', 'Python', 'Cassandra'],
  },
  {
    title: 'Advancements in 5G simulation',
    context: 'C-DAC Pune',
    body: 'Built 5G simulation environments with Open5GS and UERANSIM; validated slice isolation and performance end-to-end.',
    stack: ['Open5GS', 'UERANSIM', 'Python', 'Ubuntu'],
  },
]

export const patent = {
  title: 'IoMT based hospital network system with OpenFlow QoS support and Cloud/FOG offloading',
  applicationNo: '202331068011',
  status: 'Patent published',
  context: 'Co-developed during MeitY-funded research',
}

export const experience: Role[] = [
  {
    title: 'Project Research Assistant',
    org: 'CoE for Unified AI-Enabled Craft Ecosystem Platform, IIT Kharagpur',
    place: 'Kharagpur',
    start: '2026', // TODO: exact start month
    end: 'Present',
    current: true,
    bullets: [],
  },
  {
    title: 'Software Development Engineer 1',
    org: 'Octopi Labs India Pvt. Ltd.',
    place: 'Bengaluru',
    start: 'Sep 2024',
    end: 'Jun 2026',
    bullets: [
      'Built scalable backend services using Spring Boot (Java) and FastAPI (Python) for GenAI and transactional systems.',
      'Designed REST and WebSocket APIs supporting real-time, high-frequency workloads.',
      'Developed and integrated LLM pipelines (Mistral, LLaMA, Gemini, OpenAI) for automation and personalization.',
      'Optimized database queries and backend workflows, cutting average API response latency by ~40%.',
    ],
    stack: ['Java', 'Spring Boot', 'Hibernate', 'FastAPI', 'MySQL', 'Docker', 'React', 'GenAI'],
    projects: ['aiRen', 'Coremax', 'Gasolina', 'Marola.Life'],
    certificate: {
      label: 'Experience certificate',
      href: 'https://drive.google.com/file/d/1tiC0eKx6IkIQmqvlhWyTg0JluE3idHAT/view?usp=sharing',
    },
  },
  {
    title: 'Software Development Intern',
    org: 'Octopi Labs India Pvt. Ltd.',
    place: 'Bengaluru',
    start: 'Mar 2024',
    end: 'Aug 2024',
    bullets: [
      'Developed backend services using Spring Boot and Hibernate for production applications.',
      'Integrated DocuSign APIs to enable multi-party digital agreement workflows.',
      'Designed and developed APIs for broker–tenant–institution interactions, improving automation.',
    ],
    stack: ['Java', 'Spring Boot', 'Hibernate', 'MySQL', 'Docker', 'React'],
    projects: ['Rent-savvy'],
    certificate: {
      label: 'Internship certificate',
      href: 'https://drive.google.com/file/d/1k_RiUS-rTvhi9oO6dC49MnAy2DXw1SEC/view?usp=sharing',
    },
  },
  {
    title: 'Intern',
    org: 'C-DAC Pune',
    place: 'Pune',
    start: 'Jul 2023',
    end: 'Aug 2023',
    bullets: [
      'Built and tested 5G simulation environments using Open5GS and UERANSIM.',
      'Executed end-to-end validation across multiple slices, ensuring isolation and performance.',
      'Simulated real-world traffic to evaluate latency, reliability and resource allocation.',
    ],
    stack: ['Open5GS', 'UERANSIM', 'Python', 'Ubuntu'],
    projects: ['Advancements in 5G simulation'],
    certificate: {
      label: 'Internship certificate',
      href: 'https://drive.google.com/file/d/1Sjk2brBP4S74lPEUxQC8HkvrQ3mvA9SU/view?usp=sharing',
    },
  },
  {
    title: 'Web Development Intern',
    org: 'Navalogy Club',
    start: 'Apr 2023',
    end: 'Jun 2023',
    summary: 'Built IoMT application interfaces.',
    bullets: [],
    stack: ['React', 'Redux Toolkit'],
    projects: ['Ensuring QoS in IoMT'],
  },
]

export const projects: Project[] = [
  {
    name: 'DocuVerse',
    domain: 'Retrieval-Augmented Generation',
    tagline: 'Full-stack RAG application with multi-stage retrieval and real-time streaming.',
    stack: ['Python', 'FastAPI', 'React', 'NVIDIA NIM', 'MySQL', 'Pinecone', 'Redis', 'AWS S3'],
    bullets: [
      'Developed a RAG-based full-stack app with FastAPI and React, streaming answers in real time over SSE.',
      'Built multi-stage retrieval: LLaMA query expansion, hybrid vector search and FlashRank reranking.',
      'Implemented a “small-to-big” chunking strategy combining Pinecone and MySQL for better context relevance.',
      'Used Redis locks to handle concurrent sessions and prevent data conflicts.',
    ],
    pipeline: [
      { label: 'Query', note: 'user' },
      { label: 'LLaMA', note: 'query expansion' },
      { label: 'Hybrid search', note: 'Pinecone + MySQL' },
      { label: 'FlashRank', note: 'rerank' },
      { label: 'SSE', note: 'stream answer' },
    ],
  },
  {
    name: 'aiRen Style',
    domain: 'Fashion Tech',
    tagline: 'AI-based fashion e-commerce platform with personalized stylists and virtual try-ons.',
    stack: ['Java', 'Spring Boot', 'Google Cloud Vision', 'Gemini', 'Vector Search', 'MySQL', 'MongoDB', 'AWS S3'],
    bullets: [
      'Built an asynchronous GenAI pipeline in Spring Boot for multi-stage AI fashion generation workflows.',
      'Integrated Google Cloud Vision and Gemini (text, multimodal, image) for face/body detection, parallelized content generation and virtual try-on.',
      'Mapped generated outputs to real-world products using semantic search and Vision APIs.',
      'Designed dual storage: MySQL for transactions, MongoDB for vector search, AWS S3 for assets.',
    ],
    pipeline: [
      { label: 'Photo', note: 'upload' },
      { label: 'Cloud Vision', note: 'face / body' },
      { label: 'Gemini', note: 'text · multimodal · image' },
      { label: 'Semantic match', note: 'MongoDB vectors' },
      { label: 'Try-on', note: 'result' },
    ],
  },
  {
    name: 'Marola.Life',
    domain: 'Personal Wellness',
    tagline: 'Backend for a digital content platform with a multi-level commission structure.',
    stack: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'AWS S3', 'Stripe', 'Wise', 'Firebase FCM'],
    bullets: [
      'Built the backend for an MLM-based digital content platform in Spring Boot.',
      'Designed a multi-level commission engine on MySQL; kept concurrent wallet transactions atomic with Redis distributed locking.',
      'Integrated Stripe (subscriptions) and Wise (cross-border payouts) for financial workflows.',
      'Managed the digital content lifecycle (audio, video, blogs) through scalable storage pipelines.',
    ],
    pipeline: [
      { label: 'Stripe', note: 'subscription' },
      { label: 'Commission', note: 'MySQL engine' },
      { label: 'Redis lock', note: 'atomic' },
      { label: 'Wallet', note: 'ledger' },
      { label: 'Wise', note: 'payout' },
    ],
  },
]

export const minorProjects: MinorProject[] = [
  {
    name: 'Ensuring QoS in IoMT',
    context: 'MeitY-funded · SDN',
    description: 'Quality of Service for Internet of Medical Things networks using Software-Defined Networking.',
    stack: ['React', 'TypeScript', 'Redux', 'MySQL', 'Python', 'Cassandra'],
  },
  {
    name: 'Speaker Identification',
    context: 'Machine Learning',
    description: 'Machine-learning-based speaker recognition.',
    stack: ['Python', 'ML'],
  },
  {
    name: 'Advancements in 5G simulation',
    context: 'C-DAC Pune',
    description: '5G core and RAN simulation with multi-slice validation of isolation, latency and reliability.',
    stack: ['Open5GS', 'UERANSIM', 'Python'],
  },
]

export const skills: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['Java', 'Python', 'C/C++', 'SQL', 'JavaScript', 'TypeScript', 'Matlab', 'Assembly (x86)'],
  },
  {
    label: 'Backend & Frameworks',
    items: ['Spring Boot', 'FastAPI', 'Hibernate', 'Flask', 'React', 'Redux', 'REST', 'WebSockets', 'SSE'],
  },
  {
    label: 'AI / GenAI',
    items: [
      'LLM Integration',
      'RAG',
      'Prompt Engineering',
      'LangChain',
      'Hybrid Search',
      'Vector Search',
      'Reranking',
      'ChromaDB',
      'Streamlit',
    ],
  },
  { label: 'Databases', items: ['MySQL', 'MongoDB', 'Pinecone', 'Redis', 'SQLite', 'Apache Cassandra'] },
  { label: 'Tools & Infra', items: ['Docker', 'AWS S3', 'Git', 'Postman', 'Stripe', 'Firebase FCM'] },
]

export const education: Education[] = [
  {
    school: 'Indian Institute of Technology Kharagpur',
    degree: 'Ph.D., Computer Science and Engineering',
    place: 'Kharagpur, West Bengal',
    start: '2026',
    end: 'Present',
  },
  {
    school: 'Tezpur University',
    degree: 'B.Tech, Computer Science and Engineering',
    place: 'Tezpur, Assam',
    start: 'Nov 2020',
    end: 'Jun 2024',
    score: 'CGPA 8.04',
  },
  {
    school: 'Ramanujan Junior College',
    degree: 'Higher Secondary, AHSEC',
    place: 'Nagaon, Assam',
    start: 'Jun 2017',
    end: 'Jun 2019',
    score: '79.20%',
  },
  {
    school: 'Sankardev Shishu/Vidya Niketan',
    degree: 'HSLC, SEBA',
    place: 'Biswanath Chariali, Assam',
    start: 'Jan 2005',
    end: 'May 2017',
    score: '88.83%',
  },
]

export const achievements: Achievement[] = [
  {
    title: 'GATE CS 2024',
    detail: 'Qualified the Graduate Aptitude Test in Engineering, Computer Science.',
    link: { label: 'Scorecard', href: 'https://drive.google.com/file/d/1vrP5sSSHwvz19G47c0RgR_5rguHnfhyR/view' },
  },
  {
    title: 'Patent published',
    detail: 'Application No. 202331068011 · IoMT hospital network system with OpenFlow QoS and Cloud/Fog offloading.',
  },
  {
    title: 'MeitY-funded research',
    detail: 'Contributed to “Ensuring QoS in Internet of Medical Things using Software-Defined Networking”.',
  },
]

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'publications', label: 'Publications' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof sections)[number]['id']

export const navSections: SectionId[] = ['publications', 'experience', 'projects', 'contact']
