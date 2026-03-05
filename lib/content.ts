export type Language = "en" | "dv"

// Admin credentials - change these values to update login credentials
export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin369"
}

export interface SiteContent {
  nav: {
    brand: string
    links: { label: string; href: string }[]
    adminLogin: string
    languageLabel: string
  }
  hero: {
    title: string
    subtitle: string
    cta: string
    image: string
  }
  about: {
    sectionTag: string
    title: string
    description: string
    image: string
  }
  features: {
    sectionTag: string
    title: string
    items: { title: string; description: string }[]
  }
  careers: {
    sectionTag: string
    title: string
    subtitle: string
    positions: { id: string; title: string; department: string; location: string; type: string; description: string }[]
  }
  successStories: {
    sectionTag: string
    title: string
    subtitle: string
    items: { id: string; client: string; title: string; description: string; image: string; result: string }[]
  }
  team: {
    sectionTag: string
    title: string
    subtitle: string
    members: { name: string; role: string; bio: string; image: string }[]
  }
  services: {
    sectionTag: string
    title: string
    items: { title: string; description: string }[]
  }
  clients: {
    sectionTag: string
    title: string
    subtitle: string
    logos: { name: string; image: string }[]
  }
  testimonials: {
    sectionTag: string
    title: string
    subtitle: string
    items: { quote: string; author: string; role: string }[]
  }
  contact: {
    sectionTag: string
    title: string
    subtitle: string
    fields: { name: string; company: string; designation: string; phone: string; email: string; message: string }
    submit: string
  }
  footer: {
    companyName: string
    address: string
    email: string
    phone: string
    copyright: string
  }
}

export const defaultContent: Record<Language, SiteContent> = {
  en: {
    nav: {
      brand: "Systems Solutions",
      links: [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Features", href: "#features" },
        { label: "Careers", href: "#careers" },
        { label: "Success Stories", href: "#success-stories" },
        { label: "Team", href: "#team" },
        { label: "Services", href: "#services" },
        { label: "Clients", href: "#clients" },
        { label: "Contact", href: "#contact" },
      ],
      adminLogin: "Login",
      languageLabel: "Language",
    },
    hero: {
      title: "Why Choose Systems Solutions?",
      subtitle:
        "Business automation through digital transformation; providing end to end IT solutions is Systems Solutions' specialization. Operational process automation unlocks the full potential of a business leading to efficiency and productivity.",
      cta: "To Know More",
      image: "/images/hero-bg.jpg",
    },
    about: {
      sectionTag: "About Us",
      title: "Empowering Businesses: Systems Solutions - Your Trusted IT Partner",
      description:
        "Incepted in the year 2012 in Maldives, Systems Solutions Pvt. Ltd is an innovative software development and consultancy company. Over the last 12 years, we have sculpted a legacy of excellence. In addition to the Maldives, we also have established development hubs in India and in Bhutan. Specialized in business automation and digital transformation, our focus is on pioneering Enterprise Resource Planning solutions and creating custom software marvels. The BSOL ERP SUITE stands as a testament to our competence, a bespoke masterpiece tailored to perfection. Complementing this is our HR-MetricS, a harmonious blend of functionalities that define the pinnacle of Human Capital management.",
      image: "/images/about.jpg",
    },
    features: {
      sectionTag: "Why Us",
      title: "IT Solutions to Work Smarter, Not Harder!",
      items: [
        {
          title: "Proven Track Record",
          description: "We have 12 years strong track record of delivering successful IT solutions to a wide range of clients.",
        },
        {
          title: "Scalability and Growth",
          description: "We're here to support your business as it grows, providing scalable IT solutions and continued support.",
        },
        {
          title: "Multilingual Support",
          description: "Communicate seamlessly with our team, in Dhivehi, English, and other local languages.",
        },
        {
          title: "Commitment to Innovation",
          description: "We are constantly investing in innovation and in emerging technologies to ensure our products stay ahead of the curve.",
        },
        {
          title: "Personalized Service",
          description: "We believe in sustainable relationships with our clients through customized services for their unique requirements.",
        },
        {
          title: "Round Clock Support",
          description: "Step confidently into a world of unwavering support - where our client's needs are handled efficiently & professionally.",
        },
        {
          title: "Tailored Solutions",
          description: "From tourism and hospitality to marine industries and government agencies, we tailor our IT solutions to our client's specific industry.",
        },
        {
          title: "Cutting-Edge Technologies",
          description: "Entrust us to provide cutting-edge solutions that leverage machine learning algorithms to provide IT solutions to stay ahead.",
        },
        {
          title: "Sustainable Solutions",
          description: "We're committed to environmentally friendly practices, offering energy-efficient IT solutions and supporting sustainable development.",
        },
      ],
    },
    careers: {
      sectionTag: "Careers",
      title: "Join Our Team",
      subtitle: "Build Your Future with Systems Solutions",
      positions: [
        {
          id: "1",
          title: "Senior Software Engineer",
          department: "Engineering",
          location: "Male, Maldives",
          type: "Full-time",
          description: "We are looking for an experienced Senior Software Engineer to lead our development team.",
        },
        {
          id: "2",
          title: "Full Stack Developer",
          department: "Engineering",
          location: "Male, Maldives",
          type: "Full-time",
          description: "Join our team to build enterprise-level web applications.",
        },
        {
          id: "3",
          title: "UI/UX Designer",
          department: "Design",
          location: "Male, Maldives",
          type: "Full-time",
          description: "Create beautiful and intuitive user interfaces for our products.",
        },
        {
          id: "4",
          title: "Project Manager",
          department: "Management",
          location: "Male, Maldives",
          type: "Full-time",
          description: "Lead projects and coordinate with clients and development teams.",
        },
      ],
    },
    successStories: {
      sectionTag: "Success Stories",
      title: "Our Success Stories",
      subtitle: "Real Results from Real Clients",
      items: [
        {
          id: "1",
          client: "OBLU Resorts",
          title: "Digital Transformation Journey",
          description: "We helped OBLU Resorts modernize their entire operations with our BSOL ERP solution, resulting in 40% efficiency improvement.",
          image: "/images/clients/oblu.jpg",
          result: "40% Efficiency Increase",
        },
        {
          id: "2",
          client: "HR-MetricS",
          title: "HR Management Revolution",
          description: "Implemented comprehensive HR solutions for Happy Market, automating payroll and attendance tracking.",
          image: "/images/clients/happymarket.jpg",
          result: "99% Payroll Accuracy",
        },
        {
          id: "3",
          client: "BSOL ERP",
          title: "Enterprise Resource Planning",
          description: "Deployed customized ERP solutions for Villa Group, integrating multiple hotel properties into one unified system.",
          image: "/images/clients/villa.jpg",
          result: "50% Time Savings",
        },
        {
          id: "4",
          client: "MediaNET",
          title: "Custom Software Development",
          description: "Built a comprehensive task management system that revolutionized their workflow efficiency.",
          image: "/images/clients/medianet.jpg",
          result: "35% Productivity Boost",
        },
      ],
    },
    team: {
      sectionTag: "Leadership",
      title: "Leading the Charge",
      subtitle: "Meet the Minds behind Systems Solutions",
      members: [
        {
          name: "Ahmed Saeed",
          role: "Chief Executive Officer",
          bio: "A dynamic management professional specialized in business automation, over 2 decades of involvement with software development, and also over 20 years of Management experience, Mr. Saeed is the founder of Systems Solutions Pvt Ltd. He is passionate about delivering quality products and services.",
          image: "/images/team/ceo.jpg",
        },
        {
          name: "Saman Pushpakumara",
          role: "Chief Financial Officer",
          bio: "The rare veteran in accounting with in-depth accounting, and auditing knowledge and experience across various industries, with a proactive approach to problem solving is Mr. Saman. His active contribution provides the much-required accounting strength and value to the solutions SSPL provides.",
          image: "/images/team/cfo.jpg",
        },
        {
          name: "Boobalakrishnan M",
          role: "Chief Technology Officer",
          bio: "A seasoned IT professional obsessed with futuristic technologies, 15+ years forging digital pathways across software development and IT consulting. He plays a pivotal role in every high-quality product we craft that meets the customers' expectations.",
          image: "/images/team/cto.jpg",
        },
      ],
    },
    services: {
      sectionTag: "Services",
      title: "Transform the Workflow",
      items: [
        {
          title: "Software Development",
          description: "Backed with a decade of experience, we craft efficient, agile, and world-class solutions tailored to client's requirements.",
        },
        {
          title: "Web Application Development",
          description: "We provide excellent UI/UX websites, engaging apps, seamless e-commerce solutions and CMS.",
        },
        {
          title: "Mobile Application Development",
          description: "Our Mobile Apps bring a sense of ease of managing on the go. We develop from native iOS and Android to hybrid Apps.",
        },
        {
          title: "IT Consulting Services",
          description: "Our IT consulting experience could transform the client's business with automation, digitalization, with robust security.",
        },
        {
          title: "BSOL - Business Solution (ERP)",
          description: "Choose cloud-based ERP designed for scalability and accessibility, perfect for the unique geographical landscape of Maldives.",
        },
        {
          title: "HR-MetricS (HR & Payroll)",
          description: "HR-MetricS leverages workforce optimization, providing valuable insights and facilitating seamless workforce management.",
        },
      ],
    },
    clients: {
      sectionTag: "Clients",
      title: "Our Clients",
      subtitle: "Witnessing Success Stories",
      logos: [
        { name: "OBLU Resorts", image: "/images/clients/oblu.jpg" },
        { name: "OZEN Life", image: "/images/clients/ozen.jpg" },
        { name: "You & Me Maldives", image: "/images/clients/youandme.jpg" },
        { name: "Cocoon Maldives", image: "/images/clients/cocoon.jpg" },
        { name: "Fushifaru", image: "/images/clients/fushifaru.jpg" },
        { name: "Fun Island", image: "/images/clients/funisland.jpg" },
        { name: "HDFC", image: "/images/clients/hdfc.jpg" },
        { name: "Maldives Stock Exchange", image: "/images/clients/mse.jpg" },
        { name: "Villa Group", image: "/images/clients/villa.jpg" },
        { name: "Alia", image: "/images/clients/alia.jpg" },
        { name: "MIFCO", image: "/images/clients/mifco.jpg" },
        { name: "Medianet", image: "/images/clients/medianet.jpg" },
        { name: "ECM", image: "/images/clients/ecm.jpg" },
        { name: "RCSC Bhutan", image: "/images/clients/rcsc.jpg" },
        { name: "FSM", image: "/images/clients/fsm.jpg" },
        { name: "Flyme", image: "/images/clients/flyme.jpg" },
        { name: "Island Beverages", image: "/images/clients/islandbeverages.jpg" },
        { name: "Happy Market", image: "/images/clients/happymarket.jpg" },
      ],
    },
    testimonials: {
      sectionTag: "Testimonials",
      title: "Client Reviews",
      subtitle: "Why Businesses Choose Us",
      items: [
        {
          quote:
            "During my 19 years of professional HR experience, I have worked with multiple HR software, but I haven't come across anything even closer to the efficiency, user friendliness and very importantly the support HR-MetricS provides. With HR MetricS managing HR is seamless.",
          author: "BALA",
          role: "HR Manager, HAWKS",
        },
        {
          quote:
            "HR-MetricS has significantly improved our productivity and effectiveness & smoothened our HR operation. The support backed with unrestricted customization deserves a WOW! Task management & performance allowance based on the respective employee's task completion rate, turnaround time & goal achievement works fantastic.",
          author: "AZEEZ",
          role: "HR & Admin Manager, MediaNET",
        },
        {
          quote:
            "We are using HR-MetricS since 2017. All our HR processes, especially Leave Management, Attendance and Expatriates Visa etc got simplified. The entire Payroll process is completely automated to a single button press to generate all the detailed payroll reports, Bank Transfer Docs, Income Tax, Pension etc. eliminating all payroll related manual works.",
          author: "SUNIL",
          role: "Chief Technology Officer, Happy Market",
        },
      ],
    },
    contact: {
      sectionTag: "Get in Touch",
      title: "Contact Us",
      subtitle: "Connect with us to schedule a Demo or Consultation related to any IT solution.",
      fields: {
        name: "Name",
        company: "Company",
        designation: "Designation",
        phone: "Phone Number",
        email: "Email ID",
        message: "Your Message",
      },
      submit: "Send Message",
    },
    footer: {
      companyName: "Systems Solutions Pvt Ltd",
      address: "M. Alia Building, 7th Floor, Gandhakoalhi Magu, Male', Maldives.",
      email: "info@solutions.com.mv",
      phone: "+(960) 301 13 55",
      copyright: "Systems Solutions Pvt Ltd. All rights reserved.",
    },
  },
  dv: {
    nav: {
      brand: "Systems Solutions",
      links: [
        { label: "ހޯމް", href: "#home" },
        { label: "އަބައުޓް", href: "#about" },
        { label: "ފީޗާޒް", href: "#features" },
        { label: "ކެރިއާސް", href: "#careers" },
        { label: "ސަކްސެސް ސްޓޯރީސް", href: "#success-stories" },
        { label: "ޓީމް", href: "#team" },
        { label: "ސާރވިސް", href: "#services" },
        { label: "ކްލައިންޓުން", href: "#clients" },
        { label: "ކޮންޓެކްޓް", href: "#contact" },
      ],
      adminLogin: "ލޮގިން",
      languageLabel: "ބަސް",
    },
    hero: {
      title: "Why Choose Systems Solutions?",
      subtitle: "Business automation through digital transformation.",
      cta: "To Know More",
      image: "/images/hero-bg.jpg",
    },
    about: {
      sectionTag: "About Us",
      title: "Empowering Businesses",
      description: "Systems Solutions - Your Trusted IT Partner",
      image: "/images/about.jpg",
    },
    features: {
      sectionTag: "Why Us",
      title: "IT Solutions to Work Smarter, Not Harder!",
      items: [
        { title: "Proven Track Record", description: "12 years of successful IT solutions delivery." },
        { title: "Scalability and Growth", description: "Scalable IT solutions for growing businesses." },
        { title: "Multilingual Support", description: "Support in Dhivehi, English and local languages." },
        { title: "Commitment to Innovation", description: "Constant investment in emerging technologies." },
        { title: "Personalized Service", description: "Customized services for unique requirements." },
        { title: "Round Clock Support", description: "24/7 professional support." },
        { title: "Tailored Solutions", description: "Industry-specific IT solutions." },
        { title: "Cutting-Edge Technologies", description: "Machine learning and advanced technologies." },
        { title: "Sustainable Solutions", description: "Environmentally friendly IT practices." },
      ],
    },
    careers: {
      sectionTag: "ކެރިއާސް",
      title: "އަމިއްލަ ޓީމުގައި ގުޅޭށެވެ",
      subtitle: "ސިސްޓަމްސް ސޮލިއުޝަންސް އެކު ތިޔަ މުސްތަގުބަލް ބިނާ ކުރޭ",
      positions: [
        {
          id: "1",
          title: "ސީނިއާ ސޮފްޓްވެއާ އިންޖިނިއަރ",
          department: "އިންޖިނިއަރިންގ",
          location: "މާލެ، ދިވެހިރާއްޖެ",
          type: "ފުލް-ޓައިމް",
          description: "ތަޖުރިބާ ލިބިފައިވާ ސީނިއާ ސޮފްޓްވެއާ އިންޖިނިއަރެއް ބޭނުންވޭ.",
        },
        {
          id: "2",
          title: "ފުލް ސްޓެކް ޑެވެލޮޕަރ",
          department: "އިންޖިނިއަރިންގ",
          location: "މާލެ، ދިވެހިރާއްޖެ",
          type: "ފުލް-ޓައިމް",
          description: "އެންޓަޕްރައިޒް ލެވެލް ވެބް އެޕްލިކޭޝަން ބިނާ ކުރުމަށް ޓީމުގައި ގުޅޭ.",
        },
        {
          id: "3",
          title: "UI/UX ޑިޒައިނަރ",
          department: "ޑިޒައިން",
          location: "މާލެ، ދިވެހިރާއްޖެ",
          type: "ފުލް-ޓައިމް",
          description: "އެކަށޭނަ ބޭނުންކުރާ ފަސޭހަ އިންޓަރފޭސް ތައް ޑިޒައިން ކުރޭ.",
        },
        {
          id: "4",
          title: "ޕްރޮޖެކްޓް މެނޭޖަރ",
          department: "މެނޭޖްމެންޓް",
          location: "މާލެ، ދިވެހިރާއްޖެ",
          type: "ފުލް-ޓައިމް",
          description: "ޕްރޮޖެކްޓްތައް ލީޑް ކުރުމާއި ކްލައިންޓު އަދި ޓީމްތަކާ އެކު ކޯޑިނޭޓް ކުރޭ.",
        },
      ],
    },
    successStories: {
      sectionTag: "ސަކްސެސް ސްޓޯރީސް",
      title: "އަމިއްލަ ސަކްސެސް ސްޓޯރީސް",
      subtitle: "ހަގީގީ ކްލައިންޓުންނާ ހަގީގީ ނަތީޖާ",
      items: [
        {
          id: "1",
          client: "OBLU ރިސޯޓްސް",
          title: "ޑިޖިޓަލް ޓްރާންސްފޯމޭޝަން",
          description: "BSOL ERP ސޮލިއުޝަން މެދުވެރިކޮށް OBLU ރިސޯޓްސްގެ އޮޕަރޭޝަން މޮޑަނައިޒް ކުރެވި 40% އެފިޝިއެންސީ އިތުރުވި.",
          image: "/images/clients/oblu.jpg",
          result: "40% އެފިޝިއެންސީ އިތުރު",
        },
        {
          id: "2",
          client: "HR-MetricS",
          title: "HR މެނޭޖްމެންޓް ބަދަލު",
          description: "ހެޕީ މާކެޓްއަށް ކޮމްޕްރެހެންސިވް HR ސޮލިއުޝަން ލާގުކުރެވި، ޕޭރޯލް އަދި އެޓެންޑެންސް ޓްރެކިންގ އޮޓޮމޭޓް ކުރެވި.",
          image: "/images/clients/happymarket.jpg",
          result: "99% ޕޭރޯލް ސައްހަތު",
        },
        {
          id: "3",
          client: "BSOL ERP",
          title: "އެންޓަޕްރައިޒް ރިސޯސް ޕްލޭނިންގ",
          description: "ވިލާ ގްރޫޕަށް ކަސްޓަމް ERP ސޮލިއުޝަން ޑިޕްލޯއި ކުރެވި، ގިނަ ހޮޓެލް ޕްރޮޕާޓީ އެކެއް ސިސްޓަމަށް ގުޅުނު.",
          image: "/images/clients/villa.jpg",
          result: "50% ވަގުތު ބައްޗެވުނު",
        },
        {
          id: "4",
          client: "MediaNET",
          title: "ކަސްޓަމް ސޮފްޓްވެއާ ޑެވެލޮޕްމެންޓް",
          description: "ޓާސްކް މެނޭޖްމެންޓް ސިސްޓަމެއް ބިނާ ކުރެވި އެއީ އެކަމުގެ ވޯކްފްލޯ އެފިޝިއެންސީ މުހިންމުކޮށް އިތުރު ކުރި.",
          image: "/images/clients/medianet.jpg",
          result: "35% ޕްރޮޑަކްޓިވިޓީ އިތުރު",
        },
      ],
    },
    team: {
      sectionTag: "Leadership",
      title: "Leading the Charge",
      subtitle: "Meet the Minds behind Systems Solutions",
      members: [
        {
          name: "Ahmed Saeed",
          role: "Chief Executive Officer",
          bio: "Founder of Systems Solutions with 20+ years experience.",
          image: "/images/team/ceo.jpg",
        },
        {
          name: "Saman Pushpakumara",
          role: "Chief Financial Officer",
          bio: "Veteran in accounting with extensive experience.",
          image: "/images/team/cfo.jpg",
        },
        {
          name: "Boobalakrishnan M",
          role: "Chief Technology Officer",
          bio: "15+ years in software development and IT consulting.",
          image: "/images/team/cto.jpg",
        },
      ],
    },
    services: {
      sectionTag: "Services",
      title: "Transform the Workflow",
      items: [
        { title: "Software Development", description: "Efficient and world-class solutions." },
        { title: "Web Application Development", description: "UI/UX websites and e-commerce." },
        { title: "Mobile Application Development", description: "iOS and Android apps." },
        { title: "IT Consulting Services", description: "Business automation and digitalization." },
        { title: "BSOL - ERP", description: "Cloud-based enterprise resource planning." },
        { title: "HR-MetricS", description: "HR and payroll management." },
      ],
    },
    clients: {
      sectionTag: "Clients",
      title: "Our Clients",
      subtitle: "Witnessing Success Stories",
      logos: [
        { name: "OBLU Resorts", image: "/images/clients/oblu.jpg" },
        { name: "OZEN Life", image: "/images/clients/ozen.jpg" },
        { name: "You & Me Maldives", image: "/images/clients/youandme.jpg" },
        { name: "Cocoon Maldives", image: "/images/clients/cocoon.jpg" },
        { name: "Fushifaru", image: "/images/clients/fushifaru.jpg" },
        { name: "Fun Island", image: "/images/clients/funisland.jpg" },
        { name: "HDFC", image: "/images/clients/hdfc.jpg" },
        { name: "Maldives Stock Exchange", image: "/images/clients/mse.jpg" },
        { name: "Villa Group", image: "/images/clients/villa.jpg" },
        { name: "Alia", image: "/images/clients/alia.jpg" },
        { name: "MIFCO", image: "/images/clients/mifco.jpg" },
        { name: "Medianet", image: "/images/clients/medianet.jpg" },
        { name: "ECM", image: "/images/clients/ecm.jpg" },
        { name: "RCSC Bhutan", image: "/images/clients/rcsc.jpg" },
        { name: "FSM", image: "/images/clients/fsm.jpg" },
        { name: "Flyme", image: "/images/clients/flyme.jpg" },
        { name: "Island Beverages", image: "/images/clients/islandbeverages.jpg" },
        { name: "Happy Market", image: "/images/clients/happymarket.jpg" },
      ],
    },
    testimonials: {
      sectionTag: "Testimonials",
      title: "Client Reviews",
      subtitle: "Why Businesses Choose Us",
      items: [
        {
          quote: "HR-MetricS provides excellent efficiency and user friendliness.",
          author: "BALA",
          role: "HR Manager, HAWKS",
        },
        {
          quote: "HR-MetricS significantly improved our productivity.",
          author: "AZEEZ",
          role: "HR & Admin Manager, MediaNET",
        },
        {
          quote: "Complete payroll automation with HR-MetricS.",
          author: "SUNIL",
          role: "CTO, Happy Market",
        },
      ],
    },
    contact: {
      sectionTag: "Get in Touch",
      title: "Contact Us",
      subtitle: "Connect with us for Demo or Consultation.",
      fields: {
        name: "Name",
        company: "Company",
        designation: "Designation",
        phone: "Phone Number",
        email: "Email ID",
        message: "Your Message",
      },
      submit: "Send Message",
    },
    footer: {
      companyName: "Systems Solutions Pvt Ltd",
      address: "M. Alia Building, 7th Floor, Male', Maldives.",
      email: "info@solutions.com.mv",
      phone: "+(960) 301 13 55",
      copyright: "Systems Solutions Pvt Ltd. All rights reserved.",
    },
  },
}
