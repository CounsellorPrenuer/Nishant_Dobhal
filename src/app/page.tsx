import Image from 'next/image'
import {groq} from 'next-sanity'
import {client} from '@/sanity/lib/client'
import {urlFor} from '@/sanity/lib/image'
import {PlansSection} from './components/plans-section'

const query = groq`*[_type == "siteSettings"][0]`

type Settings = Record<string, any>

export default async function Home() {
  const data: Settings = await client.fetch(query)
  const fixedNav = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Packages", href: "#packages" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <main>
      <header className="topbar">
        <div className="container nav">
          <div className="brand">
            {data?.logo && <Image src={urlFor(data.logo).width(64).height(64).url()} alt={data.brandName} width={48} height={48} />}
            <div>
              <h1>{data?.brandName}</h1>
              <p>{data?.tagline}</p>
            </div>
          </div>
          <nav>
            {fixedNav.map((item) => (
              <a key={item.label} href={item.href}>{item.label}</a>
            ))}
          </nav>
        </div>
      </header>

      <section id="home" className="container section homeSection">
        <div className="homeCard">
          <p className="homeKicker">Welcome to</p>
          <h2>{data?.brandName}</h2>
          <p className="homeTagline">{data?.tagline}</p>
          <p className="homeAbout">{data?.about}</p>
          <div className="homeActions">
            <a href="#packages" className="homeBtnPrimary">View Packages</a>
            <a href="#contact" className="homeBtnSecondary">Contact Us</a>
          </div>
        </div>
      </section>

      <section id="about" className="container section aboutSection">
        <h2 className="centerTitle">Meet the Founder</h2>
        <p className="centerSub"><strong>{data?.founder?.name}</strong> — {data?.tagline}</p>
        <div className="founderGrid">
          <article className="founderCard">
            <h3>{data?.founder?.name}</h3>
            <p>{data?.founder?.bio}</p>
            <h4>Credentials & Expertise</h4>
            <ul className="credList">
              <li>Career Counsellor & Corporate Trainer</li>
              <li>20+ Years of Corporate Experience</li>
              <li>Leadership, Soft Skills & Behavioral Training Expert</li>
              <li>Focused on Education to Employability Transformation</li>
            </ul>
          </article>
          <div className="founderImageWrap">
            {data?.founder?.photo && <Image src={urlFor(data.founder.photo).width(700).height(800).url()} alt={data?.founder?.name} width={520} height={620} />}
          </div>
        </div>
      </section>

      <section id="services" className="container section servicesSection">
        <h2 className="centerTitle">Our Services</h2>
        <p className="centerSub">Comprehensive solutions for career clarity, growth, and transformation</p>
        <div className="serviceGrid4">
          {(data?.services || []).map((service: any) => (
            <article key={service.title} className="servicePurpleCard">
              <span className="serviceIcon">✦</span>
              <h4>{service.title}</h4>
              <p><strong>Description</strong></p>
              <p>{service.description}</p>
              <p><strong>Who It Is For</strong></p>
              <ul className="serviceAudienceList">
                {(service.audience || []).map((person: string) => (
                  <li key={`${service.title}-${person}`}>{person}</li>
                ))}
              </ul>
              <p><strong>Mode</strong></p>
              <p>{service.mode}</p>
            </article>
          ))}
        </div>
      </section>

      <PlansSection
        planSectionTitle={data?.planSectionTitle}
        customPlansTitle={data?.customPlansTitle}
        customPlansSubtitle={data?.customPlansSubtitle}
        mentorshipPlans={data?.mentorshipPlans || []}
        customPlans={data?.customPlans || []}
      />

      <section id="testimonials" className="container section testimonialsSection">
        <h2 className="centerTitle">Testimonials</h2>
        <p className="centerSub">What people say about the sessions and outcomes.</p>
        <div className="grid testimonialGrid">
          {(data?.testimonials || []).map((t: any) => (
            <blockquote key={t.author} className="testimonialCard">
              <p>{t.quote}</p>
              <cite>{t.author}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      <section id="contact" className="container section contactSection">
        <h2 className="centerTitle">Ready to Begin Your Transformation?</h2>
        <p className="centerSub">Fill out the form below and we will reach out to schedule your clarity call.</p>
        <div className="contactWrap">
          <form className="contactForm">
            <h3>Send Us a Message</h3>
            <input placeholder="Your name" required />
            <input type="email" placeholder="Your email" required />
            <input placeholder="Phone number" />
            <select defaultValue="">
              <option value="" disabled>Select a purpose</option>
              <option>Career Counselling</option>
              <option>Psychometric Assessment</option>
              <option>Soft Skills Training</option>
              <option>Corporate Training</option>
            </select>
            <textarea placeholder="Message" rows={5} required />
            <button type="submit">Send Message</button>
          </form>
          <div className="contactInfoCol">
            <article className="contactInfoCard">
              <h4>Phone</h4>
              <p>{data?.contact?.phone}</p>
            </article>
            <article className="contactInfoCard">
              <h4>Email</h4>
              <p>{data?.contact?.email}</p>
            </article>
            <article className="contactInfoCard">
              <h4>Location</h4>
              <p>{data?.contact?.address}</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}

