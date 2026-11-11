import {
  Atom,
  Boxes,
  Braces,
  CalendarDays,
  ClipboardList,
  Code2,
  Database,
  FileCode,
  FileCode2,
  FolderKanban,
  GraduationCap,
  Landmark,
  Palette,
  PenTool,
  Rocket,
  SearchCheck,
  Server,
  Terminal,
  TestTube2,
  type LucideIcon,
} from 'lucide-react'

export interface Service {
  title: string
  description: string
  icon: LucideIcon
}

export interface Technology {
  name: string
  description: string
  icon: LucideIcon
}

export interface ProcessStep {
  title: string
  description: string
  icon: LucideIcon
}

export const services: Service[] = [
  {
    title: 'Student Portal Development',
    description:
      "Custom online portals for students, parents, and staff, built around your school's enrollment, grading, and communication workflows.",
    icon: GraduationCap,
  },
  {
    title: 'Student Information Systems',
    description:
      'Centralized records for student profiles, enrollment, attendance, and academic tracking.',
    icon: ClipboardList,
  },
  {
    title: 'Finance Management Systems',
    description:
      'Systems for tracking transactions, fees, and financial records with clear, organized reporting.',
    icon: Landmark,
  },
  {
    title: 'Information Management Systems',
    description:
      'Organize institutional data, documents, and workflows in one searchable, role-based system.',
    icon: FolderKanban,
  },
  {
    title: 'Booking and Reservation Systems',
    description:
      'Online scheduling and reservation tools for rooms, equipment, services, and events.',
    icon: CalendarDays,
  },
  {
    title: 'Inventory Management Systems',
    description:
      'Track stock, supplies, and assets with issue and return workflows and low-stock alerts.',
    icon: Boxes,
  },
  {
    title: 'Custom Web Application Development',
    description:
      'Tailored web applications designed and built from scratch to fit your exact business process.',
    icon: Code2,
  },
  {
    title: 'Database and Backend Development',
    description:
      'Reliable database design and API/backend development that keep your application fast and secure.',
    icon: Database,
  },
]

export const technologies: Technology[] = [
  { name: 'HTML', description: 'Semantic, accessible page structure', icon: FileCode2 },
  { name: 'CSS', description: 'Responsive, maintainable styling', icon: Palette },
  { name: 'JavaScript', description: 'Interactive front-end behaviour', icon: Braces },
  { name: 'TypeScript', description: 'Type-safe application code', icon: FileCode },
  { name: 'React', description: 'Component-driven user interfaces', icon: Atom },
  { name: 'Node.js', description: 'Server-side APIs and services', icon: Server },
  { name: 'PHP', description: 'Server-side web development', icon: Terminal },
  { name: 'SQL Server', description: 'Relational data storage and reporting', icon: Database },
]

export const processSteps: ProcessStep[] = [
  {
    title: 'Requirement Gathering',
    description:
      'We discuss your goals, your users, and the exact workflow the system needs to support.',
    icon: SearchCheck,
  },
  {
    title: 'Planning and Design',
    description:
      'I map out the structure, screens, and database before writing any code.',
    icon: PenTool,
  },
  {
    title: 'Development and Testing',
    description:
      'The system is built in stages and tested against real scenarios, not just ideal ones.',
    icon: TestTube2,
  },
  {
    title: 'Deployment and Support',
    description:
      'I launch the system, hand it over, and stay available for fixes and improvements.',
    icon: Rocket,
  },
]
