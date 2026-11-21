
import AIChatbot from "./components/AIChatbot";
import "./App.css";
import { useEffect, useState } from "react";
import AccountAccess from "./components/AccountAccess";
import { supabase } from "./lib/supabaseClient";

import {
  ArrowRight,
  CalendarDays,
  Gem,
  Heart,
  ShieldCheck,
  Sparkles,
  Menu,
  X,
  MapPin,
  MessageCircle,
  ExternalLink,
  Phone,
} from "lucide-react";

import { FaInstagram, FaFacebook } from "react-icons/fa";

const services = [
  {
    number: "01",
    title: "Bridal Makeup",
    description: "Beautiful bridal looks for your most unforgettable moments.",
    image: "photo-1487412947147-5cebf100ffc2",
  },
  {
    number: "02",
    title: "Professional Makeup",
    description: "Refined makeup for parties, celebrations and special occasions.",
    image: "photo-1522337360788-8b13dee7a37e",
  },
  {
    number: "03",
    title: "Skin Care",
    description: "Personalized beauty treatments for a fresh, radiant look.",
    image: "photo-1570172619644-dfd03ed5d881",
  },
  {
    number: "04",
    title: "Hair Styling",
    description: "Elegant hairstyles and professional hair care.",
    image: "photo-1560066984-138dadb4c035",
  },
  {
    number: "05",
    title: "Mehendi",
    description: "Beautiful traditional designs for your special celebrations.",
    image: "photo-1610992015732-2449b76344bc",
  },
  {
    number: "06",
    title: "Beauty Packages",
    description: "Thoughtfully combined services for your complete makeover.",
    image: "photo-1600948836101-f9ffda59d250",
  },
];

const gallery = [
  "photo-1534528741775-53994a69daeb",
  "photo-1524504388940-b1c1722653e1",
  "photo-1529139574466-a303027c1d8b",
];

const instagramUrl = "https://www.instagram.com/moynamondal_24680/";
const facebookUrl = "https://www.facebook.com/share/19Yz2kV2qP/";
const whatsappUrl = "https://wa.me/918116913003";
const phoneUrl = "tel:+918116913003";

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Abhilasha+Ladies+Beauty+Parlour+near+Rabindrapally+Indoor+Stadium+Suri+Birbhum+West+Bengal+731101";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    setCurrentUser(null);
    alert("You have been logged out successfully.");
  };

  return (
    <main>
      {/* NAVIGATION */}
      <nav className="navbar">
        <a className="brand" href="#home" onClick={closeMenu}>
          <img
            src="/images/abhilasha-logo.png"
            alt="Abhilasha Beauty Academy Logo"
            className="brand-logo"
          />
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {["Home", "Services", "About", "Gallery", "Contact"].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} onClick={closeMenu}>
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            className="nav-account-button"
            onClick={() => {
              if (currentUser) {
                handleLogout();
              } else {
                setShowAccount(true);
              }
            }}
          >
            {currentUser ? "Logout" : "Sign In"}
          </button>

          <a className="nav-booking" href="#contact">
            <CalendarDays size={16} />
            Book Appointment
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-overlay" />

        <div className="hero-content">
          <p className="eyebrow">
            <span /> REFINED BEAUTY <span />
          </p>

          <h1>
            Abhilasha
            <br />
            <em>Parlour</em>
          </h1>

          <p className="hero-tagline">
            Look Beautiful <span>•</span> Feel Confident <span>•</span> Be You
          </p>

          <div className="ornament">
            <span />
            ✧
            <span />
          </div>

          <p className="hero-description">
            Discover the art of beauty through personalized care,
            timeless elegance and a touch of luxury.
          </p>

          <div className="hero-buttons">
            <a href="#contact" className="gold-button">
              Book Appointment <ArrowRight size={17} />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="outline-button"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="hero-caption">
          <span>BEAUTY • ELEGANCE • CONFIDENCE</span>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust-strip">
        <div><Sparkles /><span>Expert Professionals</span></div>
        <div><Gem /><span>Premium Experience</span></div>
        <div><Heart /><span>Personalized Care</span></div>
        <div><ShieldCheck /><span>Hygiene & Care</span></div>
      </section>

      {/* SERVICES */}
      <section className="section services-section" id="services">
        <div className="section-heading">
          <p className="eyebrow">THE ART OF SELF-CARE</p>
          <h2>Our Signature <em>Services</em></h2>
          <p>Discover beauty experiences designed around you.</p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-image">
                <img
                  src={`https://images.unsplash.com/${service.image}?auto=format&fit=crop&w=900&q=85`}
                  alt={service.title}
                  loading="lazy"
                />
                <span className="service-index">{service.number}</span>
              </div>

              <div className="service-info">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="#contact">
                  Enquire now <ArrowRight size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1100&q=85"
            alt="Elegant beauty studio interior"
            loading="lazy"
          />
          <div className="image-label">A MOMENT OF ELEGANCE</div>
        </div>

        <div className="about-content">
          <p className="eyebrow">OUR PHILOSOPHY</p>
          <h2>
            Beauty is an art.
            <br />
            <em>Make it yours.</em>
          </h2>

          <p>
            At Abhilasha Ladies Beauty Parlour, we believe every person
            deserves to feel beautiful and confident. Our vision is to
            create a welcoming beauty experience with thoughtful care
            and attention to detail.
          </p>

          <p>
            From everyday beauty rituals to special celebrations,
            let your style tell your story.
          </p>

          <a href="#contact" className="text-link">
            Discover our experience <ArrowRight size={17} />
          </a>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section gallery-section" id="gallery">
        <div className="section-heading">
          <p className="eyebrow">BEAUTY IN EVERY DETAIL</p>
          <h2>The Beauty <em>Gallery</em></h2>
          <p>A glimpse into the world of elegance and style.</p>
        </div>

        <div className="gallery-grid">
          {gallery.map((photo, index) => (
            <div className="gallery-item" key={photo}>
              <img
                src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=900&q=85`}
                alt={`Beauty gallery inspiration ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <p className="eyebrow">YOUR BEAUTY JOURNEY BEGINS HERE</p>
        <h2>It's time to feel <em>beautiful.</em></h2>
        <p>Contact us to enquire about services and appointments.</p>

        <div className="hero-buttons">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="gold-button"
          >
            Enquire on WhatsApp <ArrowRight size={17} />
          </a>

          <a href={phoneUrl} className="outline-button">
            <Phone size={16} /> Call Us
          </a>
        </div>
      </section>

      {/* SOCIAL AND LOCATION */}
      <section className="social-location-section" id="social">
        <div className="section-heading">
          <p className="eyebrow">STAY CONNECTED</p>
          <h2>Connect With <em>Us</em></h2>
          <p>Follow our beauty journey and get in touch with us.</p>
        </div>

        <div className="social-links">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <FaInstagram size={22} />
            <span>Instagram</span>
            <ExternalLink size={15} />
          </a>

          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <FaFacebook size={22} />
            <span>Facebook</span>
            <ExternalLink size={15} />
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <MessageCircle size={22} />
            <span>WhatsApp</span>
            <ExternalLink size={15} />
          </a>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <MapPin size={22} />
            <span>Google Maps</span>
            <ExternalLink size={15} />
          </a>
        </div>

        <div className="location-note">
          <MapPin size={20} />
          <p>
            Near Rabindrapally Indoor Stadium, Suri, Birbhum,
            West Bengal – 731101
          </p>
        </div>

        <div className="location-actions">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Get Directions <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">✧</span>
          <span>
            <strong>Abhilasha</strong>
            <small>LADIES BEAUTY PARLOUR</small>
          </span>
        </a>

        <p>Beauty. Elegance. Confidence.</p>

        <div className="footer-socials">
          <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
            <FaInstagram size={19} />
          </a>
          <a href={facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook">
            <FaFacebook size={19} />
          </a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <MessageCircle size={19} />
          </a>
        </div>

        <span className="footer-line" />

        <p className="footer-address">
          <MapPin size={14} /> Suri, Birbhum, West Bengal
        </p>

        <small>
          © {new Date().getFullYear()} Abhilasha Ladies Beauty Parlour.
          All rights reserved.
        </small>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={whatsappUrl}
        className="floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle size={25} />
      </a>

      {/* ACCOUNT ACCESS */}
      {showAccount && (
        <AccountAccess
          onClose={() => setShowAccount(false)}
          onLogin={(user) => {
            setCurrentUser(user);
          }}
        />
      )}

      {/* AI CHATBOT */}
      <AIChatbot />
    </main>
  );
}

export default App;
