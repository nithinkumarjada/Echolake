import {
  Award,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  Github,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Newspaper,
  ServerCog,
  Sparkles,
  Trophy
} from "lucide-react";

export const profile = {
  name: "Nithin Kumar Jada",
  roles: ["Data Engineer", "Software Engineer", "Full Stack Developer", "Cloud Engineer"],
  tagline:
    "I design reliable data platforms, cloud-native applications, and analytics systems that turn complex business workflows into measurable outcomes.",
  location: "United States",
  phone: "+1 (000) 000-0000",
  email: "nithin@example.com",
  resume: "/resume/Nithin_SDE.pdf",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nithin-kumar-jada", icon: Linkedin },
    { label: "GitHub", href: "https://github.com/nithin-kumar-jada", icon: Github },
    { label: "Email", href: "mailto:nithin@example.com", icon: Mail },
    { label: "LeetCode", href: "https://leetcode.com", icon: Code2 },
    { label: "Medium", href: "https://medium.com", icon: Newspaper }
  ],
  contactMethods: [
    { label: "Email", value: "nithin@example.com", icon: Mail },
    { label: "Phone", value: "+1 (000) 000-0000", icon: Phone },
    { label: "Location", value: "United States", icon: MapPin },
    { label: "LinkedIn", value: "linkedin.com/in/nithin-kumar-jada", icon: Linkedin }
  ]
};

export const stats = [
  { label: "Years Experience", value: "5+", icon: BriefcaseBusiness },
  { label: "Projects Completed", value: "28", icon: Layers3 },
  { label: "Certifications", value: "10", icon: Award },
  { label: "GitHub Contributions", value: "1.8k", icon: Github },
  { label: "Problems Solved", value: "450+", icon: Trophy },
  { label: "Technologies Mastered", value: "42", icon: Sparkles }
];

export const expertise = [
  "Batch and streaming data pipelines",
  "Lakehouse architecture",
  "Cloud migration and platform modernization",
  "Full-stack product development",
  "CI/CD, observability, and automation",
  "Analytics engineering and business intelligence"
];

export const careerTimeline = [
  {
    year: "2026",
    title: "Cloud-first Data Platform Lead",
    body: "Focused on scalable data products, quality gates, and reusable engineering patterns for analytics teams."
  },
  {
    year: "2024",
    title: "Software and Data Engineering",
    body: "Built full-stack workflows, APIs, and ETL systems that improved reporting speed and operational reliability."
  },
  {
    year: "2022",
    title: "Graduate Engineering Foundation",
    body: "Deepened distributed systems, database, cloud, and applied software engineering fundamentals."
  }
];

export const skillGroups = [
  {
    title: "Programming Languages",
    icon: Code2,
    skills: [
      { name: "Python", level: 94 },
      { name: "Java", level: 86 },
      { name: "SQL", level: 95 },
      { name: "JavaScript", level: 88 },
      { name: "TypeScript", level: 84 }
    ]
  },
  {
    title: "Data Engineering",
    icon: Database,
    skills: [
      { name: "Apache Spark", level: 91 },
      { name: "Kafka", level: 86 },
      { name: "Airflow", level: 89 },
      { name: "dbt", level: 83 },
      { name: "Snowflake", level: 88 },
      { name: "Databricks", level: 87 },
      { name: "Hadoop", level: 78 }
    ]
  },
  {
    title: "Cloud Platforms",
    icon: Cloud,
    skills: [
      { name: "AWS", level: 90 },
      { name: "Azure", level: 82 },
      { name: "GCP", level: 76 }
    ]
  },
  {
    title: "Databases",
    icon: ServerCog,
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "MySQL", level: 84 },
      { name: "MongoDB", level: 80 },
      { name: "DynamoDB", level: 79 },
      { name: "Redshift", level: 86 }
    ]
  },
  {
    title: "DevOps",
    icon: Layers3,
    skills: [
      { name: "Docker", level: 87 },
      { name: "Kubernetes", level: 78 },
      { name: "Jenkins", level: 77 },
      { name: "GitHub Actions", level: 88 },
      { name: "Terraform", level: 81 }
    ]
  },
  {
    title: "Frontend",
    icon: Sparkles,
    skills: [
      { name: "React", level: 88 },
      { name: "Angular", level: 77 },
      { name: "HTML5", level: 92 },
      { name: "CSS3", level: 90 },
      { name: "Tailwind CSS", level: 89 }
    ]
  }
];

export const experiences = [
  {
    company: "Enterprise Data Platform",
    title: "Data Engineer",
    duration: "2024 - Present",
    impact: "Reduced reporting latency by 62% and improved pipeline reliability with automated quality checks.",
    tech: ["Spark", "Kafka", "Airflow", "Snowflake", "AWS", "dbt"],
    responsibilities: [
      "Designed ELT and streaming pipelines for financial and customer analytics domains.",
      "Implemented reusable orchestration patterns, alerting, and data quality controls.",
      "Partnered with product, BI, and operations teams to convert ambiguous asks into durable data products."
    ]
  },
  {
    company: "Cloud Software Team",
    title: "Software Engineer",
    duration: "2022 - 2024",
    impact: "Shipped internal SaaS workflows that eliminated manual reconciliation and improved release velocity.",
    tech: ["React", "TypeScript", "Java", "PostgreSQL", "Docker", "GitHub Actions"],
    responsibilities: [
      "Built responsive web experiences, REST APIs, and role-based dashboards.",
      "Improved CI/CD quality with automated checks and containerized environments.",
      "Optimized database queries and backend services for high-volume operational workflows."
    ]
  }
];

export const projectCategories = ["All", "Lakehouse", "Data", "Streaming", "AI", "Cloud", "Full Stack"];

export const projects = [
  {
    title: "EchoLake",
    category: "Lakehouse",
    description:
      "Production-style AWS data lakehouse using Apache Iceberg, dbt, Airflow, Terraform, and Athena for synthetic financial analytics.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tech: ["AWS", "Apache Iceberg", "dbt", "Airflow", "Terraform", "Athena"],
    features: [
      "Bronze, silver, and gold medallion layers",
      "Time-travel queries and schema evolution",
      "Great Expectations quality gates"
    ],
    challenges:
      "Coordinated S3, Glue, EMR, Athena, and CI/CD infrastructure into a deployable analytics platform.",
    impact: "Enabled fast Athena query response over large synthetic financial datasets.",
    github: "https://github.com",
    demo: "https://example.com"
  },
  {
    title: "Finance Data Warehouse Platform",
    category: "Data",
    description:
      "A governed warehouse platform for finance reporting, reconciliation, and executive KPI dashboards.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    tech: ["Snowflake", "dbt", "Airflow", "AWS", "Power BI"],
    features: ["Dimensional modeling", "Data quality tests", "Executive metrics layer"],
    challenges: "Unified inconsistent source systems into validated gold-layer reporting tables.",
    impact: "Cut monthly close reporting effort by 40%.",
    github: "https://github.com",
    demo: "https://example.com"
  },
  {
    title: "Real-Time Streaming Analytics Platform",
    category: "Streaming",
    description:
      "Kafka and Spark streaming system for operational event monitoring, alerting, and near-real-time analytics.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    tech: ["Kafka", "Spark", "Databricks", "Delta Lake", "Terraform"],
    features: ["Low-latency ingestion", "Anomaly detection", "Replayable event store"],
    challenges: "Balanced throughput, replayability, and downstream SLA expectations.",
    impact: "Enabled issue detection in minutes instead of hours.",
    github: "https://github.com",
    demo: "https://example.com"
  },
  {
    title: "Customer 360 Data Lake",
    category: "Data",
    description:
      "Lakehouse solution that consolidates customer touchpoints into trusted profile and segmentation datasets.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    tech: ["Databricks", "Delta Lake", "PySpark", "Azure", "dbt"],
    features: ["Identity resolution", "Bronze/silver/gold layers", "Consent-aware marts"],
    challenges: "Handled schema drift and duplicate identity signals across channels.",
    impact: "Improved campaign targeting accuracy by 27%.",
    github: "https://github.com",
    demo: "https://example.com"
  },
  {
    title: "AI-Powered Recommendation System",
    category: "AI",
    description:
      "Recommendation service combining batch feature pipelines, model serving, and product feedback loops.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    tech: ["Python", "FastAPI", "PostgreSQL", "Redis", "AWS"],
    features: ["Feature store", "A/B test hooks", "Explainable recommendations"],
    challenges: "Made model outputs auditable enough for business stakeholders.",
    impact: "Lifted engagement on personalized surfaces by 18%.",
    github: "https://github.com",
    demo: "https://example.com"
  },
  {
    title: "Cloud Migration Project",
    category: "Cloud",
    description:
      "Migration blueprint for legacy workloads into containerized, observable, infrastructure-as-code deployments.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    tech: ["AWS", "Terraform", "Docker", "Kubernetes", "GitHub Actions"],
    features: ["IaC modules", "Blue-green releases", "Centralized monitoring"],
    challenges: "Reduced risk across staged migration waves without breaking service contracts.",
    impact: "Lowered deployment time from days to under one hour.",
    github: "https://github.com",
    demo: "https://example.com"
  },
  {
    title: "Full Stack SaaS Application",
    category: "Full Stack",
    description:
      "Multi-tenant SaaS product with analytics dashboards, secure auth, subscriptions, and admin workflows.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS"],
    features: ["Tenant isolation", "Usage analytics", "Role-based access"],
    challenges: "Designed flexible data boundaries for customers with different workflows.",
    impact: "Delivered a production-ready MVP in six weeks.",
    github: "https://github.com",
    demo: "https://example.com"
  }
];

export const certifications = [
  "AWS Certified Solutions Architect",
  "AWS Certified Data Engineer",
  "Microsoft Azure Data Engineer Associate",
  "Databricks Lakehouse Fundamentals",
  "SnowPro Core Certification",
  "Google Cloud Professional Data Engineer"
];

export const education = [
  {
    school: "University Graduate Program",
    degree: "Master's in Computer Science",
    gpa: "3.8 / 4.0",
    coursework: ["Distributed Systems", "Database Systems", "Cloud Computing", "Machine Learning"],
    projects: ["Scalable analytics engine", "Cloud-native task platform"],
    achievements: ["Graduate research projects", "Technical leadership in team builds"]
  }
];

export const posts = [
  {
    title: "Designing Data Pipelines Recruiters Can Understand",
    category: "Data Engineering",
    tags: ["Spark", "Airflow", "Architecture"],
    readTime: "6 min",
    featured: true
  },
  {
    title: "Cloud Migration Lessons from Production Systems",
    category: "Cloud",
    tags: ["AWS", "Terraform", "DevOps"],
    readTime: "8 min",
    featured: true
  },
  {
    title: "Building Full-Stack Dashboards with Trustworthy Metrics",
    category: "Full Stack",
    tags: ["React", "PostgreSQL", "Analytics"],
    readTime: "5 min",
    featured: false
  }
];

export const testimonials = [
  {
    quote:
      "Nithin brings rare range: he can reason about data architecture, backend services, and user-facing product quality in the same conversation.",
    name: "Engineering Manager",
    role: "Platform Team"
  },
  {
    quote:
      "He translated a messy analytics workflow into a reliable system with clear ownership, monitoring, and measurable impact.",
    name: "Analytics Lead",
    role: "Business Intelligence"
  },
  {
    quote:
      "A dependable teammate who communicates clearly, ships carefully, and raises the quality bar around him.",
    name: "Senior Engineer",
    role: "Product Engineering"
  }
];
