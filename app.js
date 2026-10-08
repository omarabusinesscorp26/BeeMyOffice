const serviceItems = [
  { icon: "⌂", name: "Virtual Premium Lounge", description: "A polished virtual office presence, without the overhead.", detail: "Professional support and flexible workspace access for your next big idea.", category: "OFFICE" },
  { icon: "♙", name: "Dedicated Team Support", description: "Good people who get to know your business.", detail: "A friendly, reliable extension of your team for the work that keeps you moving.", category: "PEOPLE" },
  { icon: "✳", name: "Business Support Services", description: "Practical help for the work behind the work.", detail: "Keep everyday admin, coordination and business essentials in good hands.", category: "SUPPORT" },
  { icon: "▣", name: "Function Room Access", description: "A professional space for getting together.", detail: "Book a welcoming room for focused work, thoughtful meetings and events.", category: "SPACE" },
  { icon: "▤", name: "Premium Office Support", description: "Thoughtful office support, on your terms.", detail: "Flexible office services that give your business a more professional home base.", category: "OFFICE" },
  { icon: "⌖", name: "Business Address Services", description: "A professional address for your business.", detail: "Build a trusted business presence with mail-related support and renewal reminders.", category: "PRESENCE" },
  { icon: "✓", name: "Licensing Support", description: "Help keeping the paperwork on track.", detail: "Organized assistance with licensing documents, applications and renewal dates.", category: "COMPLIANCE" },
  { icon: "▧", name: "Bookkeeping", description: "Clear, considered books you can feel good about.", detail: "Stay on top of monthly records, receipts and reports with a dedicated team.", category: "FINANCE" },
  { icon: "⌗", name: "Accounting Software", description: "The tools to make the numbers make sense.", detail: "Get help setting up and making the most of your accounting software.", category: "FINANCE" },
  { icon: "◈", name: "Full Business Suite", description: "A thoughtfully connected support system.", detail: "Bring the services, people and tools your business needs together in one place.", category: "ALL-IN-ONE" }
];
const serviceCategoryGroups = [
  { id: "office", title: "Office & Workspace", filterLabel: "Office & Workspace", icon: "⌂", serviceNames: ["Virtual Premium Lounge", "Function Room Access", "Premium Office Support", "Business Address Services"] },
  { id: "business", title: "Business & Team Support", filterLabel: "Business Support", icon: "♙", serviceNames: ["Dedicated Team Support", "Business Support Services"] },
  { id: "compliance", title: "Compliance & Licensing", filterLabel: "Compliance", icon: "✓", serviceNames: ["Licensing Support"] },
  { id: "finance", title: "Finance & Accounting", filterLabel: "Finance", icon: "▧", serviceNames: ["Bookkeeping", "Accounting Software"] },
  { id: "complete", title: "Complete Solution", filterLabel: "Complete Solution", icon: "◈", serviceNames: ["Full Business Suite"] }
];
const serviceInformation = {
  "virtual-premium-lounge": {
    included: ["A professional business presence", "Flexible virtual office support", "A tailored introduction to available options"],
    benefits: ["Build credibility without a full-time office", "Keep business essentials in one place"],
    options: ["Flexible support plan", "Scope and pricing discussed in a consultation"]
  },
  "function-room-access": {
    included: ["Access options for meetings and gatherings", "Help choosing a room setup", "Booking coordination"],
    benefits: ["Meet clients in a professional setting", "Choose space to suit the occasion"],
    options: ["Room and schedule options confirmed on request", "Request a quote for your preferred setup"]
  },
  "premium-office-support": {
    included: ["Practical office coordination", "Support shaped around your workflow", "A clear plan for ongoing needs"],
    benefits: ["Spend less time on office tasks", "Get support that can adapt as you grow"],
    options: ["One-time or ongoing support, scoped to your needs", "Request a tailored quote"]
  },
  "business-address-services": {
    included: ["Business address support options", "Mail-related assistance", "Guidance on renewal reminders"],
    benefits: ["Present a professional business address", "Keep address-related tasks organized"],
    options: ["Address support options discussed during consultation", "Request a quote"]
  },
  "dedicated-team-support": {
    included: ["A dedicated point of contact", "Support aligned with your priorities", "Regular check-ins as needed"],
    benefits: ["Work with a team that gets to know your business", "Add capacity without building every role in-house"],
    options: ["Flexible scope based on your needs", "Request a tailored quote"]
  },
  "business-support-services": {
    included: ["Help with day-to-day business coordination", "Practical administrative assistance", "A support plan shaped around your workload"],
    benefits: ["Make more room for important work", "Keep recurring tasks moving"],
    options: ["Individual tasks or ongoing support", "Request a tailored quote"]
  },
  "licensing-support": {
    included: ["Document and application assistance", "Renewal date organization", "Practical guidance on next steps"],
    benefits: ["Keep licensing tasks on track", "Reduce the administrative load"],
    options: ["Support based on your licensing requirements", "Request a quote"]
  },
  bookkeeping: {
    included: ["Monthly records and receipt organization", "Bookkeeping support", "Reports based on the agreed scope"],
    benefits: ["Keep financial records more organized", "Get a clearer view of business activity"],
    options: ["Ongoing support options discussed in a consultation", "Request a tailored quote"]
  },
  "accounting-software": {
    included: ["Help selecting or setting up accounting software", "Setup and workflow guidance", "Support using the tools day to day"],
    benefits: ["Make routine financial admin easier", "Get more value from your software"],
    options: ["Setup support or ongoing guidance", "Software and service costs quoted separately where applicable"]
  },
  "full-business-suite": {
    included: ["Office and workspace support", "Business and team support", "Compliance and licensing assistance", "Finance and accounting support"],
    benefits: ["Coordinate essential services through one team", "Build a joined-up support plan that can grow"],
    options: ["A tailored all-in-one plan", "Scope and pricing confirmed after consultation"]
  }
};
const consultationCalLink = "omara-pay-oti7xv/15min";
const consultationCalUrl = `https://cal.com/${consultationCalLink}`;

const crmLeads = [];

const modules = {
  overview: { title: "Overview", subtitle: "Here’s a little look at what’s happening in your business." },
  crm: { title: "CRM pipeline", subtitle: "A clear view of the good conversations moving your business forward." },
  services: { title: "My services", subtitle: "Your business essentials, thoughtfully taken care of." },
  requests: { title: "Service requests", subtitle: "Keep up with requests and the latest from your support team." },
  documents: { title: "Documents", subtitle: "Your business documents, organized and close at hand." },
  bookings: { title: "Bookings", subtitle: "Plan your next meeting, room booking or consultation." },
  billing: { title: "Billing & invoices", subtitle: "A simple overview of your invoices and payments." },
  team: { title: "Your team", subtitle: "Meet the people who are here to help your business grow." },
  notifications: { title: "Notifications", subtitle: "Important updates from your business support team." },
  profile: { title: "Your profile", subtitle: "Manage your workspace contact details." },
  search: { title: "Search your workspace", subtitle: "Find a service, request, document or CRM conversation." }
};

const pageContent = document.querySelector(".public-view");
const platformContent = document.querySelector(".platform-view");
const toast = document.querySelector(".toast");
const dashboardContent = document.querySelector("#dashboard-content");
const routeHost = document.querySelector("#public-route");
let toastTimer;
let activeModule = "overview";
let chatReturnFocus = null;
const demoRequests = [];
const demoNotifications = [];
const demoTeam = [];
const demoDocuments = [];
const demoBookings = [];
let latestAppSuccess = null;
let inquirySaved = false;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3200);
}
function renderServices() {
  const grid = document.querySelector("#services-grid");
  if (!grid) return;
  grid.innerHTML = serviceCategoryGroups.slice(0, 4).map((group) => {
    const services = serviceItems
      .filter((service) => serviceGroupFor(service).id === group.id)
      .sort((left, right) => group.serviceNames.indexOf(left.name) - group.serviceNames.indexOf(right.name));
    return `<article class="home-service-category reveal">
      <span class="home-service-icon" aria-hidden="true">${escapeHtml(group.icon)}</span>
      <h3>${escapeHtml(group.title)}</h3>
      <ul>${services.map((service) => `<li><a href="#/service/${encodeURIComponent(service.slug || serviceSlug(service.name))}">${escapeHtml(service.name)}</a></li>`).join("")}</ul>
    </article>`;
  }).join("");
  observeReveals(grid);
}

function openPage(pageName) {
  const showPlatform = pageName === "platform";
  pageContent.hidden = showPlatform;
  platformContent.hidden = !showPlatform;
  document.body.classList.toggle("in-platform", showPlatform);
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (showPlatform) animateCounters(platformContent);
  closeMobileMenu();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function serviceSlug(name) {
  return name.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function setBackendStatus(connected, message = "") {
  const indicator = document.querySelector("#backend-indicator");
  if (!indicator) return;
  indicator.textContent = connected ? "MYSQL CONNECTED" : "DATABASE OFFLINE";
  indicator.classList.toggle("backend-online", connected);
  indicator.title = connected
    ? "The PHP API and MySQL service catalog are connected."
    : message || "Run the PHP server and configure MySQL to enable database-backed inquiries.";
}

function backendFailureMessage(error) {
  if (window.location.protocol === "file:") {
    return "Start the site with the PHP development server to connect to the MySQL database.";
  }
  if (error instanceof SyntaxError) {
    return "The PHP API returned an invalid response. Check that PHP is running and the API endpoint is configured.";
  }
  return error instanceof Error ? error.message : "Unable to connect to the PHP API.";
}

async function loadServiceCatalog() {
  try {
    const response = await fetch("api.php?resource=services", {
      headers: { Accept: "application/json" },
      credentials: "same-origin"
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || `Service catalog request failed (${response.status}).`);
    }
    if (!Array.isArray(result.data)) {
      throw new Error("The service catalog response is invalid.");
    }

    const catalog = result.data.map((service) => ({
      icon: String(service.icon || "✳"),
      name: String(service.name),
      description: String(service.description),
      detail: String(service.description),
      category: String(service.category),
      slug: String(service.slug)
    }));
    serviceItems.splice(0, serviceItems.length, ...catalog);
    renderServices();
    setBackendStatus(true);
  } catch (error) {
    setBackendStatus(false, backendFailureMessage(error));
  }
}

function routeHash(path) {
  const nextHash = `#${path.startsWith("/") ? path : `/${path}`}`;
  if (window.location.hash !== nextHash) window.location.hash = nextHash;
  else renderRoute();
}

function publicPageFrame(eyebrow, title, lead, content) {
  return `<section class="route-page shell">
    <a class="route-back" href="#/home">← Back to home</a>
    <div class="route-heading"><span class="eyebrow"><span class="eyebrow-dot"></span>${eyebrow}</span><h1>${title}</h1><p>${lead}</p></div>
    ${content}
  </section>`;
}

function serviceGroupFor(service) {
  const slug = service.slug || serviceSlug(service.name);
  const knownGroup = serviceCategoryGroups.find((group) => group.serviceNames.includes(service.name));
  if (knownGroup) return knownGroup;
  const category = String(service.category || "").toLowerCase();
  if (["office", "space", "presence"].some((term) => category.includes(term))) return serviceCategoryGroups[0];
  if (["compliance", "licensing"].some((term) => category.includes(term))) return serviceCategoryGroups[2];
  if (["finance", "account"].some((term) => category.includes(term))) return serviceCategoryGroups[3];
  if (["all-in-one", "complete"].some((term) => category.includes(term)) || slug === "full-business-suite") return serviceCategoryGroups[4];
  return serviceCategoryGroups[1];
}

function renderServiceCard(service, index) {
  const slug = service.slug || serviceSlug(service.name);
  const group = serviceGroupFor(service);
  const fullSuite = slug === "full-business-suite";
  const includedServices = fullSuite
    ? `<ul class="suite-includes">${serviceCategoryGroups.slice(0, 4).flatMap((category) => category.serviceNames).map((name) => `<li>${escapeHtml(name)}</li>`).join("")}</ul>`
    : "";
  return `<article class="route-service-card${fullSuite ? " route-service-card-featured" : ""}">
    ${fullSuite ? '<span class="suite-badge">ALL-IN-ONE</span>' : ""}
    <span class="service-icon" aria-hidden="true">${escapeHtml(service.icon || group.icon)}</span>
    <small>${escapeHtml(group.title)}</small>
    <h2>${escapeHtml(service.name)}</h2>
    <p>${escapeHtml(service.description)}</p>
    ${includedServices}
    <div class="service-card-actions">
      <a class="button ${fullSuite ? "button-dark" : "button-quiet"}" href="#/service/${encodeURIComponent(slug)}">${fullSuite ? "Explore Full Suite" : "View Details"} <span aria-hidden="true">↗</span></a>
      ${fullSuite ? "" : `<a class="button button-dark" href="#/contact/booking?service=${encodeURIComponent(slug)}">Book Now <span aria-hidden="true">↗</span></a>`}
    </div>
  </article>`;
}

function publicServicesPage() {
  const filters = [
    { id: "all", label: "All Services" },
    ...serviceCategoryGroups.map((group) => ({ id: group.id, label: group.filterLabel }))
  ].map((filter, index) => `<button class="service-filter${index === 0 ? " active" : ""}" type="button" data-service-filter="${filter.id}" aria-pressed="${index === 0}">${escapeHtml(filter.label)}</button>`).join("");
  const groups = serviceCategoryGroups.map((group) => {
    const services = serviceItems
      .filter((service) => serviceGroupFor(service).id === group.id)
      .sort((left, right) => {
        const leftIndex = group.serviceNames.indexOf(left.name);
        const rightIndex = group.serviceNames.indexOf(right.name);
        return (leftIndex < 0 ? Number.MAX_SAFE_INTEGER : leftIndex) - (rightIndex < 0 ? Number.MAX_SAFE_INTEGER : rightIndex);
      });
    if (services.length === 0) return "";
    return `<section class="service-category-section" data-category-group="${group.id}" aria-labelledby="service-category-${group.id}">
      <div class="service-category-heading"><span class="service-category-mark" aria-hidden="true">${escapeHtml(group.icon)}</span><div><h2 id="service-category-${group.id}">${escapeHtml(group.title)}</h2><p>${services.length} ${services.length === 1 ? "service" : "services"} to support your business</p></div></div>
      <div class="route-services-grid">${services.map(renderServiceCard).join("")}</div>
    </section>`;
  }).join("");
  return publicPageFrame("BUSINESS SERVICES, THOUGHTFULLY CONNECTED", "Our Services", "Flexible business solutions designed to help your business work smarter and grow faster.", `
    <div class="services-intro"><p>Choose the individual support that fits your needs today, or bring everything together with our all-in-one Full Business Suite. Every plan starts with a conversation and is tailored to your business.</p></div>
    <nav class="service-filter-nav" aria-label="Filter services by category">${filters}</nav>
    <p class="service-filter-status" data-service-filter-status aria-live="polite">${serviceItems.length} services</p>
    <div class="service-category-list">${groups}</div>
    <div class="route-cta"><div><h2>Need help choosing?</h2><p>Tell us what your business needs and we’ll help you find the right fit.</p></div><a class="button button-dark" href="#/contact/booking">Book a consultation <span aria-hidden="true">↗</span></a></div>`);
}

function publicServicePage(index) {
  const service = serviceItems.find((item) => (item.slug || serviceSlug(item.name)) === String(index)) || serviceItems[Number(index)];
  if (!service) return publicNotFoundPage();
  const serviceNumber = String(serviceItems.indexOf(service) + 1).padStart(2, "0");
  const slug = service.slug || serviceSlug(service.name);
  const group = serviceGroupFor(service);
  const information = serviceInformation[slug] || {
    included: [service.description, "A practical plan shaped around your business"],
    benefits: ["Support that fits your priorities", "A clear next step for your business"],
    options: ["Flexible scope discussed during consultation", "Request a tailored quote"]
  };
  const list = (items) => `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  const packageRows = information.options.map((option) => `<li>${escapeHtml(option)}</li>`).join("");
  return publicPageFrame(`${serviceNumber} / ${escapeHtml(group.title)}`, escapeHtml(service.name), escapeHtml(service.description), `
    <section class="service-detail-page">
      <div class="service-detail-copy">
        <h2>What’s included</h2>${list(information.included)}
        <h3>How this helps</h3>${list(information.benefits)}
        <h3>Options &amp; pricing</h3><p>Request a quote. We’ll confirm availability, scope and pricing with you before you decide.</p><ul>${packageRows}</ul>
        <div class="route-action-row"><a class="button button-gold" href="#/contact/booking?service=${encodeURIComponent(slug)}">Book This Service <span aria-hidden="true">↗</span></a><a class="text-link" href="#/services">Browse all services <span>↗</span></a></div>
      </div>
      <aside class="service-detail-aside"><span class="service-icon" aria-hidden="true">${escapeHtml(service.icon || group.icon)}</span><small>${escapeHtml(group.title)}</small><strong>${escapeHtml(service.name)}</strong><p>${escapeHtml(service.detail || service.description)}</p><a href="#/contact?service=${encodeURIComponent(slug)}">Request a quote <span aria-hidden="true">↗</span></a></aside>
    </section>`);
}

function contactPage(query) {
  const requestedService = query.get("service") || "";
  const serviceValue = requestedService === "consultation" ? "" : requestedService;
  const isBookingFlow = query.get("booking") === "1";
  const hasSelectedService = serviceItems.some((service) => (service.slug || serviceSlug(service.name)) === serviceValue);
  const selectedService = serviceItems.find((service) => (service.slug || serviceSlug(service.name)) === serviceValue);
  const placeholderSelected = hasSelectedService ? "" : "selected";
  const serviceOptions = serviceItems.map((service) => `<option value="${escapeHtml(service.slug || serviceSlug(service.name))}" ${serviceValue === (service.slug || serviceSlug(service.name)) ? "selected" : ""}>${escapeHtml(service.name)}</option>`).join("");
  const packageField = isBookingFlow
    ? `<label>What would you like to discuss?<select name="package_option" required><option value="" disabled selected hidden>Choose an option</option><option value="Request a tailored quote">Request a tailored quote</option><option value="Discuss options during my consultation">Discuss options during my consultation</option></select></label>`
    : "";
  const pageTitle = isBookingFlow && selectedService ? `Book ${escapeHtml(selectedService.name)}` : "A good next step starts with a conversation.";
  const pageLead = isBookingFlow
    ? "Choose a service and an option, share your details, then choose a consultation time in the calendar."
    : "Tell us a little about your business. Our team will help you figure out what support makes sense.";
  return publicPageFrame(isBookingFlow ? "SERVICE BOOKING" : "LET’S TALK", pageTitle, pageLead, `
    <form class="route-form contact-form-layout contact-form-with-calendar" data-form="contact">
      <div class="contact-form-fields">
        <div class="form-grid"><label>Your name<input name="name" autocomplete="name" required placeholder="Your name"></label><label>Work email<input name="email" type="email" autocomplete="email" required placeholder="you@yourbusiness.com"></label></div>
        <label>Where did you see our ad?<select name="ad_source"><option value="" disabled selected hidden>Choose a platform</option><option value="facebook">Facebook</option><option value="instagram">Instagram</option><option value="tiktok">TikTok</option><option value="linkedin">LinkedIn</option><option value="youtube">YouTube</option><option value="x">X</option><option value="whatsapp">WhatsApp</option><option value="other-social-media">Other social media</option><option value="other">Other</option></select></label>
        <label>What can we help with?<select name="service" required><option value="" disabled hidden ${placeholderSelected}>Choose a service</option>${serviceOptions}</select></label>
        ${packageField}
        <label>Your response / inquiry details<textarea name="message" rows="5" maxlength="${isBookingFlow ? 4800 : 5000}" required placeholder="What caught your interest, and what would you like to know?"></textarea></label>
        <button class="button button-dark" type="submit">Send your inquiry <span aria-hidden="true">↗</span></button>
        <div class="form-honeypot visually-hidden" aria-hidden="true"><label>Leave this field empty<input name="website" tabindex="-1" autocomplete="off"></label></div>
        <p class="form-note">Your inquiry is sent securely to Bee My Office and saved to its database. It will not be marked as sent unless the server confirms it.</p>
        <p class="form-message" aria-live="polite"></p>
      </div>
      <section class="contact-booking-panel" data-contact-booking aria-label="Consultation booking calendar">
        <div class="cal-booking-heading"><span>CONSULTATION</span></div>
        <div class="cal-booking-embed" id="contact-consultation-cal" aria-label="Cal.com appointment calendar"></div>
        <p class="form-note">Choose a time here while you fill in your inquiry. Booking confirmation is managed by Cal.com.</p>
      </section>
    </form>`);
}

function letsTalkPage() {
  const faqs = [
    ["How quickly will you respond?", "We’ll get back to you during our business hours as soon as possible."],
    ["Do I need to know which service I need?", "No. Tell us what you’re trying to accomplish and we’ll help you identify the right service."],
    ["Can I book a consultation instead?", "Yes. You can schedule a consultation directly from our Book a Consultation page."],
    ["Can I ask about multiple services?", "Absolutely. You can include multiple services or questions in one inquiry."]
  ].map(([question, answer]) => `<details><summary>${escapeHtml(question)}<span>+</span></summary><p>${escapeHtml(answer)}</p></details>`).join("");

  return `<div class="lets-talk-page">
    <section class="lets-talk-hero shell">
      <span class="eyebrow"><span class="eyebrow-dot"></span> LET’S TALK</span>
      <h1>Have a question?<br><span>Let’s figure it out together.</span></h1>
      <p>Tell us a little about your business, what you’re working on, or what kind of support you’re looking for. We’ll help you find the right next step.</p>
    </section>
    <section class="lets-talk-inquiry section-pad">
      <div class="shell lets-talk-inquiry-grid">
        <div class="lets-talk-intro">
          <span class="eyebrow"><span class="eyebrow-dot"></span> YOUR MESSAGE</span>
          <h2>Tell us what<br>you need.</h2>
          <p>Whether you have a question, need help choosing a service, or simply want to learn more about Bee My Office, send us a message.</p>
          <aside class="lets-talk-reassurance"><span aria-hidden="true">✳</span><p><strong>Not sure which service is right for you?</strong><br>That’s okay. We’ll help you figure it out.</p></aside>
        </div>
        <form class="route-form lets-talk-form" data-form="contact" data-inquiry-kind="message">
          <div class="form-grid"><label>Full Name <span aria-hidden="true">*</span><input name="name" autocomplete="name" required maxlength="120" placeholder="Enter your name"></label><label>Business Name <span class="optional-label">(optional)</span><input name="business_name" autocomplete="organization" maxlength="160" placeholder="Enter your business name"></label></div>
          <div class="form-grid"><label>Work Email <span aria-hidden="true">*</span><input name="email" type="email" autocomplete="email" required maxlength="254" placeholder="you@yourbusiness.com"></label><label>Phone Number <span class="optional-label">(optional)</span><input name="phone" type="tel" autocomplete="tel" maxlength="40" placeholder="+63 XXX XXX XXXX"></label></div>
          <label>What can we help you with? <span aria-hidden="true">*</span><select name="inquiry_topic" required><option value="" selected disabled>Select a topic</option><option>Office &amp; Workspace</option><option>Business &amp; Team Support</option><option>Finance &amp; Accounting</option><option>Compliance &amp; Licensing</option><option>General Inquiry</option><option>I’m not sure yet</option><option>Something else</option></select></label>
          <label>Message <span aria-hidden="true">*</span><textarea name="message" rows="6" maxlength="4000" required placeholder="Tell us a little about what you need..."></textarea></label>
          <button class="button button-gold" type="submit">Send message <span aria-hidden="true">→</span></button>
          <div class="form-honeypot visually-hidden" aria-hidden="true"><label>Leave this field empty<input name="website" tabindex="-1" autocomplete="off"></label></div>
          <p class="form-note">Your message is sent securely and saved so our team can respond.</p>
          <p class="form-message" aria-live="polite"></p>
        </form>
      </div>
    </section>
    <section class="direct-contact-section section-pad shell">
      <div class="direct-contact-heading"><span class="eyebrow"><span class="eyebrow-dot"></span> HERE FOR YOU</span><h2>Prefer to talk directly?</h2></div>
      <div class="direct-contact-list">
        <div><span class="contact-detail-icon" aria-hidden="true">✉</span><small>EMAIL</small><a href="mailto:support@omarapay.com">support@omarapay.com</a></div>
        <div><span class="contact-detail-icon" aria-hidden="true">⌕</span><small>PHONE</small><span>+63 XXX XXX XXXX</span></div>
        <div><span class="contact-detail-icon" aria-hidden="true">⌖</span><small>OFFICE</small><span>77, Westria Residences, West Ave, Quezon City, Metro Manila</span></div>
        <div><span class="contact-detail-icon" aria-hidden="true">◷</span><small>BUSINESS HOURS</small><span>Monday – Friday<br>9:00 AM – 5:00 PM</span></div>
      </div>
    </section>
    <section class="not-sure-section">
      <div class="shell not-sure-inner">
        <div><span class="eyebrow eyebrow-light"><span class="eyebrow-dot"></span> WE’LL HELP YOU FIND YOUR WAY</span><h2>Not sure where to start?</h2><p>You don’t need to know exactly what service you need. Tell us what you’re trying to accomplish, and we’ll help you find the right solution.</p></div>
        <div class="not-sure-actions"><a class="button button-gold" href="#/contact/booking">Book a consultation <span aria-hidden="true">→</span></a><a class="button button-outline-light" href="#/services">Explore our services <span aria-hidden="true">→</span></a></div>
      </div>
    </section>
    <section class="route-faq-section section-pad">
      <div class="shell lets-talk-faq-grid">
        <div class="faq-intro"><span class="eyebrow"><span class="eyebrow-dot"></span> GOOD QUESTION</span><h2>Before you<br><span>reach out.</span></h2></div>
        <div class="route-faq lets-talk-faq">${faqs}</div>
      </div>
    </section>
    <section class="lets-talk-final-cta section-pad shell">
      <div><span class="eyebrow"><span class="eyebrow-dot"></span> A GOOD PLACE TO BEGIN</span><h2>Let’s make things easier.</h2><p>Good business support starts with a conversation.</p></div>
      <a class="button button-dark" href="#/contact/booking">Book a consultation <span aria-hidden="true">→</span></a>
    </section>
  </div>`;
}

function consultationBookingPage(inquiryWasSaved, requestedService = "") {
  const message = inquiryWasSaved
    ? "Your inquiry is saved. Choose a time below to book your consultation."
    : "Choose an available time below to book your consultation.";
  const selectedService = serviceItems.find((service) => (service.slug || serviceSlug(service.name)) === requestedService);
  const serviceOptions = serviceItems.map((service) => {
    const slug = service.slug || serviceSlug(service.name);
    return `<option value="${escapeHtml(slug)}" ${selectedService === service ? "selected" : ""}>${escapeHtml(service.name)}</option>`;
  }).join("");
  const inquiryHref = selectedService
    ? `#/contact?service=${encodeURIComponent(selectedService.slug || serviceSlug(selectedService.name))}`
    : "#/contact";
  return publicPageFrame("CONSULTATION BOOKING", "Choose a time that works for you.", message, `
    <section class="booking-service-picker" aria-label="Choose a service for your consultation">
      <label for="booking-service">What would you like to discuss?
        <select id="booking-service" data-booking-service>
          <option value="">Choose a service (optional)</option>${serviceOptions}
        </select>
      </label>
      <p>We’ll add your choice to the inquiry form so our team can prepare for your consultation.</p>
      <a class="button button-quiet" data-service-inquiry-link href="${inquiryHref}">Add details to your inquiry <span aria-hidden="true">↗</span></a>
    </section>
    <section class="cal-booking-shell" aria-label="Consultation booking">
      <div class="cal-booking-heading"><span>CONSULTATION</span></div>
      <div class="cal-booking-embed" id="consultation-cal" aria-label="Cal.com appointment calendar"></div>
      <p class="form-note">Availability and booking confirmation are managed by Cal.com.</p>
    </section>
    <a class="text-link cal-booking-back" href="#/home">Back to the website <span aria-hidden="true">↗</span></a>`);
}

function mountConsultationCalendar(selector = "#consultation-cal") {
  const calendar = document.querySelector(selector);
  if (!calendar || calendar.dataset.calMounted === "true") return;
  calendar.dataset.calMounted = "true";

  (function (CalWindow, scriptUrl, initCommand) {
    const queueCall = (target, args) => target.q.push(args);
    const document = CalWindow.document;
    CalWindow.Cal = CalWindow.Cal || function () {
      const cal = CalWindow.Cal;
      const args = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        const script = document.createElement("script");
        script.src = scriptUrl;
        script.async = true;
        document.head.append(script);
        cal.loaded = true;
      }
      if (args[0] === initCommand) {
        const api = function () { queueCall(api, arguments); };
        const namespace = args[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          queueCall(cal.ns[namespace], args);
          queueCall(cal, ["initNamespace", namespace]);
        } else {
          queueCall(cal, args);
        }
        return;
      }
      queueCall(cal, args);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  window.Cal("init", { origin: "https://app.cal.com" });
  window.Cal("inline", {
    elementOrSelector: selector,
    calLink: consultationCalLink,
    config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" }
  });
  window.Cal("ui", {
    hideEventTypeDetails: false,
    layout: "month_view"
  });
}

function publicNotFoundPage() {
  return publicPageFrame("BEE MY OFFICE", "We couldn’t find that page.", "The link may have moved. Head back to the services and we’ll help you find your way.", `<a class="button button-dark" href="#/services">Explore services <span aria-hidden="true">↗</span></a>`);
}

function renderPublicRoute(path, query) {
  const routeHost = document.querySelector("#public-route");
  const sections = pageContent.querySelectorAll(":scope > section");
  const footer = pageContent.querySelector(":scope > footer");
  if (footer && footer.previousElementSibling !== routeHost) footer.before(routeHost);

  sections.forEach((section) => { section.hidden = true; });
  routeHost.hidden = false;
  pageContent.hidden = false;
  platformContent.hidden = true;
  document.body.classList.remove("in-platform");

  if (path === "/home" || path === "/") {
    sections.forEach((section) => { section.hidden = false; });
    renderServices();
    routeHost.hidden = true;
    document.title = "Bee My Office — Your Premium Business Support Hub";
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveNav("home");
    return;
  }

  let markup;
  if (path === "/services") markup = publicServicesPage();
  else if (path === "/about") markup = publicPageFrame("A LITTLE ABOUT US", "Big ambitions. Meet the backup.", "Bee My Office brings together the people, practical support and professional services that help your business run smoothly and grow with confidence.", `<div class="route-copy-card"><h2>Good work starts with good support.</h2><p>Running a business takes more than a good idea. It takes a hundred little things, done well, every day. We support entrepreneurs, small businesses and organizations with dedicated assistance, office solutions, bookkeeping, licensing support and the tools to stay organized.</p><p>Choose the services that make sense today and build on them as your business grows. Our goal is simple: make it easier to run a business you’re proud of.</p><a class="button button-gold" href="#/services">Meet our services <span>↗</span></a></div>`);
  else if (path === "/how-it-works") markup = publicPageFrame("SIMPLE AS THAT", "Good things happen when you get support.", "A thoughtful, straightforward start. A team that gets to know your business. More time for the work you love.", `<div class="route-steps"><article><span>01</span><h2>Tell us what you need</h2><p>Start with a conversation. We’ll listen and learn what would make your workday better.</p></article><article><span>02</span><h2>We make a plan together</h2><p>Choose practical support to match your priorities. No one-size-fits-all package required.</p></article><article><span>03</span><h2>Get back to your big ideas</h2><p>We’ll take care of the behind-the-scenes work and stay in your corner as you grow.</p></article></div><a class="button button-gold" href="#/contact">Book a conversation <span>↗</span></a>`);
  else if (path === "/contact") markup = letsTalkPage();
  else if (path === "/contact/booking") {
    const bookingQuery = new URLSearchParams(query);
    if (!bookingQuery.has("service")) bookingQuery.set("service", "consultation");
    bookingQuery.set("booking", "1");
    markup = contactPage(bookingQuery);
    inquirySaved = false;
  }
  else if (path === "/contact/success") {
    if (inquirySaved) {
      inquirySaved = false;
      const service = escapeHtml(query.get("service") || "business support");
      markup = publicPageFrame("MESSAGE SENT", "Thanks for getting in touch.", `Your inquiry about ${service} was saved successfully. The Bee My Office team can follow up using the details you provided.`, `<div class="route-cta"><a class="button button-dark" href="#/home">Back to home <span aria-hidden="true">↗</span></a><a class="text-link" href="#/contact">Send another inquiry <span>↗</span></a></div>`);
    } else {
      markup = publicPageFrame("NOT CONFIRMED", "Your inquiry hasn’t been sent.", "There is no saved inquiry to confirm. Please send the contact form and wait for the server to confirm it.", `<a class="button button-dark" href="#/contact">Return to the contact form <span aria-hidden="true">↗</span></a>`);
    }
  }
  else if (path === "/faq") markup = publicPageFrame("GOOD QUESTION", "A few things you might be wondering.", "Here are some helpful answers about how Bee My Office works.", `<div class="route-faq"><details open><summary>Who is Bee My Office for?<span>+</span></summary><p>We support entrepreneurs, small businesses and growing organizations that want a dependable team for the work behind their business.</p></details><details><summary>Can I choose only the services I need?<span>+</span></summary><p>Yes. Start with one service or combine a few. We’ll shape the support around your priorities and adjust as your business changes.</p></details><details><summary>How do I get started?<span>+</span></summary><p>Book a conversation, tell us what’s taking up your time and we’ll help you agree on a practical next step.</p></details><details><summary>Will I have a dedicated point of contact?<span>+</span></summary><p>Yes. A real support team will get to know your business and be available to help along the way.</p></details></div><a class="button button-dark" href="#/contact">Ask us a question <span>↗</span></a>`);
  else if (path === "/privacy") markup = publicPageFrame("THE IMPORTANT DETAILS", "Privacy policy", "A simple prototype privacy notice.", `<div class="route-copy-card"><h2>Inquiry information</h2><p>When the PHP/MySQL backend is configured, contact inquiries are saved to the Bee My Office database so the team can respond. Do not submit confidential or sensitive information through this prototype.</p><h2>Production privacy notice</h2><p>A deployed service needs a complete privacy policy that explains actual collection, use, retention, security, third-party processors and contact details. This sample is not legal advice.</p><a class="text-link" href="#/contact">Ask us about the platform <span>↗</span></a></div>`);
  else if (path === "/terms") markup = publicPageFrame("THE IMPORTANT DETAILS", "Terms & conditions", "A simple prototype terms notice.", `<div class="route-copy-card"><h2>Preview only</h2><p>This website and its client platform are an interactive design prototype. Demo data, sample availability, service details and AI responses are illustrative only and do not create a service agreement.</p><h2>Before launch</h2><p>A production business should replace this sample with reviewed terms covering scope, fees, service delivery, cancellations, liability and applicable law.</p><a class="text-link" href="#/contact">Talk with our team <span>↗</span></a></div>`);
  else if (path.startsWith("/service/")) markup = publicServicePage(path.slice("/service/".length));
  else markup = publicNotFoundPage();

  routeHost.innerHTML = markup;
  if (path === "/contact/booking") mountConsultationCalendar();
  if (path === "/contact/booking") mountConsultationCalendar("#contact-consultation-cal");
  const heading = routeHost.querySelector("h1");
  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
    document.title = path === "/contact" ? "Let’s Talk — Bee My Office" : `${heading.textContent.trim()} — Bee My Office`;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  setActiveNav(path);
  updateNavOnScroll();
  closeMobileMenu();
}

function setActiveNav(path) {
  const navPath = path === "/services" || path.startsWith("/service/") ? "/services"
    : path === "/about" ? "/about"
      : path === "/how-it-works" ? "/how-it-works"
        : "/home";
  document.querySelectorAll(".nav-link[href^='#/']").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${navPath}`);
  });
}

function renderRoute() {
  const rawRoute = window.location.hash.slice(1);
  const [pathWithQuery, queryString = ""] = rawRoute.split("?");
  const routeAliases = {
    top: "/home", services: "/services", about: "/about",
    "how-it-works": "/how-it-works", contact: "/contact", faq: "/faq"
  };
  const requestedPath = pathWithQuery || "/home";
  const path = routeAliases[requestedPath] || requestedPath;
  const query = new URLSearchParams(queryString);
  renderPublicRoute(path, query);
}

function observeReveals(root = document) {
  const elements = root.querySelectorAll(".reveal:not([data-observed])");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -25px 0px" });
  elements.forEach((element) => {
    element.dataset.observed = "true";
    observer.observe(element);
  });
}

function animateCounters(root = document) {
  root.querySelectorAll("[data-count]:not([data-counted])").forEach((counter) => {
    counter.dataset.counted = "true";
    const target = Number(counter.dataset.count);
    const duration = 700;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      counter.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

function closeMobileMenu() {
  const nav = document.querySelector(".nav-links");
  const toggle = document.querySelector(".menu-toggle");
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open navigation");
}

function crmBoard() {
  const stages = ["New lead", "Contacted", "Qualified", "Proposal"];
  const totalValue = crmLeads.reduce((sum, lead) => sum + (Number(String(lead.value).replace(/[^\d.]/g, "")) || 0), 0);
  return `<div class="module-summary">
    <div class="summary-tile"><small>OPEN OPPORTUNITIES</small><strong>${crmLeads.length}</strong><span>Current preview pipeline</span></div>
    <div class="summary-tile"><small>PIPELINE VALUE</small><strong>₱${totalValue.toLocaleString("en-PH")}</strong><span>Across ${crmLeads.length} conversations</span></div>
    <div class="summary-tile"><small>FOLLOW-UPS DUE</small><strong>0</strong><span>No follow-ups recorded</span></div>
  </div>
  <div class="pipeline">${stages.map((stage) => {
    const stageLeads = crmLeads.filter((lead) => lead.stage === stage);
    return `<section class="pipeline-stage" data-stage="${stage}" aria-label="${stage} leads">
      <h3>${stage}<span>${stageLeads.length}</span></h3>
      ${stageLeads.length === 0 ? `<p class="stage-empty">No leads yet.</p>` : stageLeads.map((lead) => `<article class="lead-card" draggable="true" tabindex="0" data-lead="${escapeHtml(lead.name)}" aria-label="${escapeHtml(lead.name)}, ${stage}">
        <strong>${escapeHtml(lead.name)}</strong><small>${escapeHtml(lead.contact)}</small><footer><span>${escapeHtml(lead.value)}</span><i>${escapeHtml(lead.owner)}</i><button type="button" data-move-lead="${escapeHtml(lead.name)}" aria-label="Move ${escapeHtml(lead.name)} to the next CRM stage">→</button></footer>
      </article>`).join("")}
    </section>`;
  }).join("")}</div>
  <p class="module-empty">Tip: drag a lead card, use its arrow button, or focus a card and press ← / → to change its stage.</p>`;
}

const tableModules = {
  services: {
    headers: ["SERVICE", "STATUS", "NEXT UPDATE", "TEAM"],
    rows: []
  },
  documents: {
    headers: ["DOCUMENT", "CATEGORY", "UPDATED", "ACCESS"],
    rows: []
  },
  bookings: {
    headers: ["BOOKING", "DATE & TIME", "LOCATION", "STATUS"],
    rows: []
  },
  billing: {
    headers: ["INVOICE", "ISSUED", "DUE DATE", "AMOUNT", "STATUS"],
    rows: []
  },
  team: {
    headers: ["TEAM MEMBER", "ROLE", "EMAIL", "STATUS"],
    rows: []
  }
};

function renderTable(moduleName) {
  const moduleData = moduleName === "documents"
    ? { ...tableModules.documents, rows: demoDocuments.map((document) => [document.name, document.category, document.updated, document.access]) }
    : moduleDataFor(moduleName);
  const rowsData = moduleData.rows;
  const rows = rowsData.map((cells) => `<tr>${cells.map((cell, index) => {
    if (index === cells.length - 1 && ["Active", "Confirmed", "Pending", "Paid", "Online", "Available"].includes(cell)) {
      const variant = ["Pending"].includes(cell) ? "pending" : "";
      return `<td><span class="table-status ${variant}">${cell}</span></td>`;
    }
    const content = index === 0 ? `<strong>${cell}</strong>` : cell;
    return `<td>${content}</td>`;
  }).join("")}</tr>`).join("");
  const filters = moduleName === "services"
    ? `<label class="visually-hidden" for="module-filter">Filter service status</label><select class="module-filter" id="module-filter" data-filter-column="1"><option value="">All statuses</option><option>Active</option><option>Coming soon</option></select>`
    : `<label class="visually-hidden" for="module-filter">Filter ${moduleName}</label><select class="module-filter" id="module-filter" data-filter-column="${Math.max(0, moduleData.headers.length - 1)}"><option value="">All ${moduleName}</option>${[...new Set(rowsData.map((row) => row[row.length - 1]))].map((value) => `<option>${escapeHtml(value)}</option>`).join("")}</select>`;
  return `<div class="module-toolbar">
    <input class="module-search" type="search" placeholder="Search ${moduleName}..." aria-label="Search ${moduleName}">
    ${filters}
  </div>
  ${rowsData.length
    ? `<div class="module-table-wrap"><table class="module-table"><thead><tr>${moduleData.headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`
    : `<div class="empty-state module-empty-state"><span>✳</span><strong>Nothing here yet</strong><p>No ${escapeHtml(moduleName)} have been added to this preview.</p></div>`}`;
}

function moduleDataFor(moduleName) {
  if (moduleName === "services") {
    return { headers: tableModules.services.headers, rows: [] };
  }
  if (moduleName === "bookings") {
    return {
      headers: tableModules.bookings.headers,
      rows: demoBookings.map((booking) => [booking.title, `${booking.date} · ${booking.time}`, booking.location, booking.status])
    };
  }
  if (moduleName === "team") {
    return { headers: tableModules.team.headers, rows: demoTeam.map((member) => [member.name, member.role, member.email, "Online"]) };
  }
  return tableModules[moduleName];
}

function notificationsMarkup() {
  return demoNotifications.length
    ? `<div class="notification-list">${demoNotifications.map((notification, index) => `<article class="notification-card ${notification.read ? "notification-read" : ""}">
    <span class="notification-symbol" aria-hidden="true">${notification.read ? "✓" : "✳"}</span><div><strong>${escapeHtml(notification.title)}</strong><p>${escapeHtml(notification.detail)}</p></div>
    <button type="button" data-action="read-notification" data-notification-index="${index}" ${notification.read ? "disabled" : ""}>${notification.read ? "Read" : "Mark read"}</button>
  </article>`).join("")}</div>`
    : `<div class="empty-state module-empty-state"><span>✳</span><strong>No notifications</strong><p>Updates will appear here when there is account activity.</p></div>`;
}

function profileMarkup() {
  return `<div class="empty-state module-empty-state"><span>♙</span><strong>No profile connected</strong><p>Sign in to view or manage a workspace profile.</p><a href="#/home">Return home <span>↗</span></a></div>`;
}

function searchMarkup() {
  return `<label class="search-label" for="workspace-search">Search across your workspace</label>
    <input class="module-search global-search-input" id="workspace-search" data-global-search type="search" placeholder="Try a service, client or document..." autocomplete="off">
    <div class="global-search-results" aria-live="polite"><p class="search-empty">Start typing to see matching services, requests, documents and CRM leads.</p></div>`;
}

function requestsContent() {
  return `<div class="module-toolbar"><input class="module-search" type="search" placeholder="Search requests..." aria-label="Search requests"><button class="button button-dark dashboard-action" data-action="new-request">+ New request</button></div>
  ${demoRequests.length
    ? `<div class="request-list">${demoRequests.map((request, index) => `<article class="request-card"><span aria-hidden="true">✳</span><div><strong>${escapeHtml(request.title)}</strong><small>Submitted ${escapeHtml(request.submitted)} · Assigned to ${escapeHtml(request.assigned)}</small></div><i class="table-status ${request.status === "In progress" ? "pending" : ""}">${escapeHtml(request.status)}</i><button type="button" data-action="request-details" data-request-index="${index}">Details ↗</button></article>`).join("")}</div>`
    : `<div class="empty-state module-empty-state"><span>↗</span><strong>No service requests</strong><p>There are no requests in this preview yet.</p></div>`}`;
}

function moduleMarkup(moduleName) {
  const config = modules[moduleName] || modules.overview;
  let content;
  if (moduleName === "overview") return dashboardMarkup;
  if (moduleName === "crm") content = crmBoard();
  else if (moduleName === "requests") content = requestsContent();
  else if (moduleName === "notifications") content = notificationsMarkup();
  else if (moduleName === "profile") content = profileMarkup();
  else if (moduleName === "search") content = searchMarkup();
  else content = renderTable(moduleName);

  const actionNames = {
    crm: "Add lead", services: "Browse services", requests: "New request",
    bookings: "Request a booking", team: "Invite a teammate",
    documents: "Upload document", billing: "Download statement",
    notifications: "Mark all read", search: "Search"
  };
  const action = moduleName === "search" || moduleName === "profile" || (moduleName === "notifications" && demoNotifications.length === 0)
    ? ""
    : `<button class="button button-dark dashboard-action" data-action="module-action" data-module-action="${moduleName}">${actionNames[moduleName]} <span aria-hidden="true">↗</span></button>`;
  return `<div class="module-page"><div class="module-title-row"><div><span class="dash-date">BEE MY OFFICE WORKSPACE PREVIEW</span><h1>${config.title}</h1><p>${config.subtitle}</p></div>${action}</div>${content}</div>`;
}

const dashboardMarkup = dashboardContent.innerHTML;

function appFormField(label, name, type = "text", placeholder = "", required = true) {
  const requiredAttribute = required ? "required" : "";
  return `<label>${label}<input name="${name}" type="${type}" ${type === "email" ? `autocomplete="email"` : ""} placeholder="${placeholder}" ${requiredAttribute}></label>`;
}

function appSelectField(label, name, options) {
  return `<label>${label}<select name="${name}" required><option value="">Choose one</option>${options.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join("")}</select></label>`;
}

function appActionConfig(action, query) {
  if (action === "request-details") {
    const index = Number(query.get("id"));
    const request = demoRequests[index];
    if (!request) return { title: "Request not found", module: "requests", body: `<p class="module-empty">That request is no longer available.</p>` };
    return {
      title: request.title,
      module: "requests",
      body: `<div class="route-copy-card request-detail-view"><span class="table-status ${request.status === "In progress" ? "pending" : ""}">${escapeHtml(request.status)}</span><h2>Request details</h2><p>${escapeHtml(request.description)}</p><dl><div><dt>Submitted</dt><dd>${escapeHtml(request.submitted)}</dd></div><div><dt>Assigned to</dt><dd>${escapeHtml(request.assigned)}</dd></div></dl><button class="button button-dark" type="button" data-open-chat>Message your support team <span aria-hidden="true">↗</span></button></div>`
    };
  }

  const requestedService = query.get("service") || "";
  const selectedService = serviceItems.find((service) => (service.slug || serviceSlug(service.name)) === requestedService);
  const serviceSelect = `<label>Service<select name="service" required><option value="">Choose a service</option>${serviceItems.map((service) => `<option value="${escapeHtml(service.slug || serviceSlug(service.name))}" ${service === selectedService ? "selected" : ""}>${escapeHtml(service.name)}</option>`).join("")}</select></label>`;
  const configs = {
    "new-request": {
      title: "New service request", module: "requests", button: "Submit request",
      description: "Tell your support team what you need. We’ll add it to your request list in this preview.",
      fields: `${serviceSelect}${appFormField("Request title", "title", "text", "What do you need help with?")}<label>Details<textarea name="details" rows="4" required placeholder="Share any helpful details..."></textarea></label>`
    },
    "new-booking": {
      title: "Request a booking", module: "bookings", button: "Request this time",
      description: "Choose a space and time. This preview adds the booking to your workspace list.",
      fields: `${appSelectField("Booking type", "location", ["Meeting Room B", "Virtual Premium Lounge", "Consultation", "Office support"])}<div class="form-grid">${appFormField("Date", "date", "date")} ${appFormField("Start time", "time", "time")}</div>${appFormField("Meeting or booking name", "title", "text", "e.g. Client planning session")}`
    },
    "invite-member": {
      title: "Invite a teammate", module: "team", button: "Add teammate to preview",
      description: "Add a teammate record to this temporary, local preview.",
      fields: `<div class="form-grid">${appFormField("Name", "name", "text", "Teammate name")}${appFormField("Work email", "email", "email", "teammate@business.com")}</div>${appSelectField("Workspace role", "role", ["Finance user", "Staff user", "Viewer"])}`
    },
    "upload-document": {
      title: "Add a document", module: "documents", button: "Add to documents",
      description: "Choose a file and category to add a document record to this preview.",
      fields: `<label>Document file<input name="file" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg" required></label>${appSelectField("Category", "category", ["Finance", "Business", "Licensing", "Bookings"])}`
    },
    "add-lead": {
      title: "Add a CRM lead", module: "crm", button: "Add lead to pipeline",
      description: "Capture a new business conversation and add it to your CRM pipeline.",
      fields: `<div class="form-grid">${appFormField("Business name", "name", "text", "Business name")}${appFormField("Contact and industry", "contact", "text", "e.g. Alex · Retail")}</div><div class="form-grid">${appFormField("Opportunity value", "value", "text", "₱25,000")}${appSelectField("Pipeline stage", "stage", ["New lead", "Contacted", "Qualified", "Proposal"])}</div>`
    },
    "service-catalog": {
      title: "Browse available services", module: "services", button: "",
      description: "Explore the support available to your workspace.",
      fields: ""
    },
  };
  return configs[action] || { title: "Page not found", module: activeModule, description: "", fields: "", button: "" };
}

function showAppAction(action, query = new URLSearchParams(), focusHeading = true) {
  const config = appActionConfig(action, query);
  activeModule = config.module;
  document.querySelectorAll(".side-link").forEach((link) => link.classList.toggle("active", link.dataset.module === config.module));
  document.querySelector("#breadcrumb-page").textContent = config.title;
  document.querySelector(".app-sidebar").classList.remove("sidebar-open");

  if (config.title === "Page not found") {
    dashboardContent.innerHTML = `<div class="module-page"><div class="module-title-row"><div><span class="dash-date">BEE MY OFFICE WORKSPACE PREVIEW</span><h1 tabindex="-1">Page not found</h1><p>This preview page isn’t available.</p></div><a class="button button-quiet" href="#/app/${activeModule}">← Back to ${modules[activeModule].title.toLowerCase()}</a></div></div>`;
    if (focusHeading) dashboardContent.querySelector("h1").focus({ preventScroll: true });
    document.title = `Page not found — Bee My Office`;
    return;
  }

  if (action === "service-catalog") {
    const cards = serviceItems.map((service) => `<article class="route-service-card"><span class="service-icon" aria-hidden="true">${escapeHtml(service.icon)}</span><small>${escapeHtml(service.category)}</small><h2>${escapeHtml(service.name)}</h2><p>${escapeHtml(service.description)}</p><button class="button button-dark" type="button" data-action="request-service" data-service-slug="${escapeHtml(service.slug || serviceSlug(service.name))}">Request this service <span aria-hidden="true">↗</span></button></article>`).join("");
    dashboardContent.innerHTML = `<div class="module-page"><div class="module-title-row"><div><span class="dash-date">BEE MY OFFICE WORKSPACE PREVIEW</span><h1 tabindex="-1">${config.title}</h1><p>${config.description}</p></div><a class="button button-quiet" href="#/app/services">← My services</a></div><div class="route-services-grid">${cards}</div></div>`;
    if (focusHeading) dashboardContent.querySelector("h1").focus({ preventScroll: true });
    document.title = `${config.title} — Bee My Office`;
    return;
  }

  if (action === "request-details") {
    dashboardContent.innerHTML = `<div class="module-page"><div class="module-title-row"><div><span class="dash-date">SERVICE REQUEST</span><h1 tabindex="-1">${escapeHtml(config.title)}</h1><p>${config.description || ""}</p></div><a class="button button-quiet" href="#/app/requests">← All requests</a></div>${config.body}</div>`;
    if (focusHeading) dashboardContent.querySelector("h1").focus({ preventScroll: true });
    document.title = `${config.title} — Bee My Office`;
    return;
  }

  if (action === "download-statement") {
    downloadStatement();
    routeHash("/app/billing");
    return;
  }

  dashboardContent.innerHTML = `<div class="module-page"><div class="module-title-row"><div><span class="dash-date">BEE MY OFFICE WORKSPACE PREVIEW</span><h1 tabindex="-1">${config.title}</h1><p>${config.description}</p></div><a class="button button-quiet" href="#/app/${config.module}">← Back to ${modules[config.module].title.toLowerCase()}</a></div><form class="route-form app-form" data-form="${action}">${config.fields}<button class="button button-dark" type="submit">${config.button} <span aria-hidden="true">↗</span></button><p class="form-note">Preview only: changes are held in this browser session and are not sent to a server.</p><p class="form-message" aria-live="polite"></p></form></div>`;
  if (focusHeading) {
    const heading = dashboardContent.querySelector("h1");
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
  document.title = `${config.title} — Bee My Office`;
}

function showAppSuccess(title, description, moduleName) {
  latestAppSuccess = { title, description, module: moduleName };
  routeHash(`/app/success?module=${encodeURIComponent(moduleName)}`);
}

function renderAppSuccess(query) {
  const moduleName = modules[query.get("module")] ? query.get("module") : "overview";
  const config = modules[moduleName];
  const success = latestAppSuccess?.module === moduleName ? latestAppSuccess : null;
  const title = success?.title || "Your update is ready.";
  const description = success?.description || "Your update has been added to this preview session.";
  activeModule = moduleName;
  document.querySelectorAll(".side-link").forEach((link) => link.classList.toggle("active", link.dataset.module === moduleName));
  document.querySelector("#breadcrumb-page").textContent = "Complete";
  document.querySelector(".app-sidebar").classList.remove("sidebar-open");
  dashboardContent.innerHTML = `<section class="module-page route-success app-success" tabindex="-1"><span class="success-mark">✓</span><span class="eyebrow"><span class="eyebrow-dot"></span> PREVIEW UPDATED</span><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p><a class="button button-dark" href="#/app/${moduleName}">Back to ${escapeHtml(config.title.toLowerCase())} <span aria-hidden="true">↗</span></a></section>`;
  dashboardContent.querySelector("h1").focus({ preventScroll: true });
  document.title = `${title} — Bee My Office`;
}

function handleModuleAction(moduleName) {
  const actions = {
    crm: "add-lead",
    services: "service-catalog",
    requests: "new-request",
    bookings: "new-booking",
    team: "invite-member",
    documents: "upload-document",
    billing: "download-statement"
  };
  if (moduleName === "notifications") {
    demoNotifications.forEach((notification) => { notification.read = true; });
    showModule("notifications");
    showToast("You’re all caught up.");
    return;
  }
  if (actions[moduleName]) routeHash(`/app/action/${actions[moduleName]}`);
}

function downloadStatement() {
  const invoices = moduleDataFor("billing").rows;
  if (invoices.length === 0) {
    showToast("There are no invoices to download.");
    return;
  }
  const rows = [["Invoice", "Issued", "Due date", "Amount", "Status"], ...invoices];
  const csv = rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "bee-my-office-invoices.csv";
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast("Your invoice statement has been downloaded.");
}

function renderSearchResults(value) {
  const resultsHost = dashboardContent.querySelector(".global-search-results");
  if (!resultsHost) return;
  const query = value.trim().toLowerCase();
  if (!query) {
    resultsHost.innerHTML = `<p class="search-empty">Start typing to see matching services, requests, documents and CRM leads.</p>`;
    return;
  }
  const results = [
    ...serviceItems.map((service) => ({ title: service.name, detail: service.description, href: `#/app/action/service-catalog`, type: "SERVICE" })),
    ...demoRequests.map((request, index) => ({ title: request.title, detail: `${request.status} · ${request.assigned}`, href: `#/app/action/request-details?id=${index}`, type: "REQUEST" })),
    ...demoDocuments.map((document) => ({ title: document.name, detail: `${document.category} · ${document.updated}`, href: "#/app/documents", type: "DOCUMENT" })),
    ...crmLeads.map((lead) => ({ title: lead.name, detail: `${lead.contact} · ${lead.value}`, href: "#/app/crm", type: "CRM LEAD" }))
  ].filter((result) => `${result.title} ${result.detail} ${result.type}`.toLowerCase().includes(query));
  resultsHost.innerHTML = results.length
    ? results.map((result) => `<a class="search-result" href="${result.href}"><span class="search-result-type">${result.type}</span><span><strong>${escapeHtml(result.title)}</strong><small>${escapeHtml(result.detail)}</small></span><i aria-hidden="true">↗</i></a>`).join("")
    : `<p class="search-empty">No matches yet. Try a service name, client or document.</p>`;
}

function moveLeadToNextStage(leadName, direction = 1) {
  const stages = ["New lead", "Contacted", "Qualified", "Proposal"];
  const lead = crmLeads.find((item) => item.name === leadName);
  if (!lead) return;
  const currentIndex = stages.indexOf(lead.stage);
  const nextIndex = Math.max(0, Math.min(stages.length - 1, currentIndex + direction));
  if (nextIndex === currentIndex) {
    showToast(direction > 0 ? "This lead is already at the last demo stage." : "This lead is already at the first demo stage.");
    return;
  }
  lead.stage = stages[nextIndex];
  showModule("crm");
  showToast(`${lead.name} moved to ${lead.stage}.`);
}

function showModule(moduleName, focusHeading = true) {
  const config = modules[moduleName];
  if (!config) return;
  activeModule = moduleName;
  document.querySelectorAll(".side-link").forEach((link) => link.classList.toggle("active", link.dataset.module === moduleName));
  document.querySelector("#breadcrumb-page").textContent = config.title;
  document.querySelector(".app-sidebar").classList.remove("sidebar-open");
  if (moduleName === "overview") {
    dashboardContent.innerHTML = dashboardMarkup;
    animateCounters(dashboardContent);
    const chart = dashboardContent.querySelector(".chart-plot");
    if (chart) requestAnimationFrame(() => chart.classList.add("is-visible"));
  } else {
    dashboardContent.innerHTML = moduleMarkup(moduleName);
  }
  if (focusHeading) {
    const heading = dashboardContent.querySelector("h1");
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
      document.title = `${config.title} — Bee My Office`;
    }
  }
}

function addChatMessage(text, type) {
  const conversation = document.querySelector(".chat-conversation");
  const message = document.createElement("div");
  message.className = `chat-message ${type === "user" ? "user-message" : "ai-message"}`;
  const bubble = document.createElement("p");
  bubble.textContent = text;
  if (type === "ai") {
    const icon = document.createElement("span");
    icon.className = "chat-message-icon";
    icon.textContent = "✳";
    message.append(icon);
  }
  message.append(bubble);
  conversation.append(message);
  conversation.scrollIntoView({ block: "end", behavior: "smooth" });
}

function sendChatMessage(text) {
  const message = text.trim();
  if (!message) return;
  addChatMessage(message, "user");
  const suggested = document.querySelector(".suggested-prompts");
  if (suggested) suggested.hidden = true;
  window.setTimeout(() => {
    addChatMessage("This visual prototype isn’t connected to an AI service yet. In the full platform, Ask Ara can help with requests, summaries and business follow-ups.", "ai");
  }, 500);
}

function updateNavOnScroll() {
  if (!platformContent.hidden) return;
  const header = document.querySelector(".site-header");
  const isPublicRoute = !routeHost.hidden;
  header.classList.toggle("scrolled", isPublicRoute || window.scrollY > 12);
  if (isPublicRoute) return;
  const sections = ["services", "about", "how-it-works", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const current = sections.find((section) => {
    const bounds = section.getBoundingClientRect();
    return bounds.top <= 130 && bounds.bottom > 130;
  });
  if (current) {
    const routeBySection = { services: "/services", about: "/about", "how-it-works": "/how-it-works" };
    document.querySelectorAll(".nav-link[href^='#/']").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${routeBySection[current.id] || "home"}`);
    });
  } else if (window.scrollY < 250) {
    document.querySelectorAll(".nav-link[href^='#/']").forEach((link) => link.classList.toggle("active", link.getAttribute("href") === "#/home"));
  }
}

renderServices();
observeReveals();
animateCounters();
window.addEventListener("scroll", updateNavOnScroll, { passive: true });
updateNavOnScroll();
window.addEventListener("hashchange", renderRoute);
window.addEventListener("load", renderRoute, { once: true });
if (document.readyState === "complete") renderRoute();
loadServiceCatalog();

document.addEventListener("click", (event) => {
  const serviceFilter = event.target.closest("[data-service-filter]");
  if (serviceFilter) {
    const selectedCategory = serviceFilter.dataset.serviceFilter;
    routeHost.querySelectorAll("[data-service-filter]").forEach((button) => {
      const isSelected = button === serviceFilter;
      button.classList.toggle("active", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });
    routeHost.querySelectorAll("[data-category-group]").forEach((group) => {
      group.hidden = selectedCategory !== "all" && group.dataset.categoryGroup !== selectedCategory;
    });
    const count = selectedCategory === "all"
      ? serviceItems.length
      : serviceItems.filter((service) => serviceGroupFor(service).id === selectedCategory).length;
    const status = routeHost.querySelector("[data-service-filter-status]");
    status.textContent = `${count} ${count === 1 ? "service" : "services"}`;
    return;
  }

  const viewTrigger = event.target.closest("[data-view]");
  if (viewTrigger) {
    routeHash(viewTrigger.dataset.view === "platform" ? "/platform" : "/home");
    return;
  }

  const moduleTrigger = event.target.closest("[data-module]");
  if (moduleTrigger) {
    routeHash(`/app/${moduleTrigger.dataset.module}`);
    return;
  }

  const chatTrigger = event.target.closest("[data-open-chat], [data-open-ai]");
  if (chatTrigger) {
    const chat = document.querySelector(".ai-chat");
    chatReturnFocus = chatTrigger;
    chat.hidden = false;
    chat.querySelector("input").focus();
    return;
  }

  if (event.target.closest(".chat-close")) {
    document.querySelector(".ai-chat").hidden = true;
    chatReturnFocus?.focus();
    return;
  }

  const serviceButton = event.target.closest("[data-service]");
  if (serviceButton) {
    routeHash(`/service/${serviceButton.dataset.service}`);
    return;
  }

  const moveLeadButton = event.target.closest("[data-move-lead]");
  if (moveLeadButton) {
    moveLeadToNextStage(moveLeadButton.dataset.moveLead);
    return;
  }

  const action = event.target.closest("[data-action]");
  if (action) {
    const actionName = action.dataset.action;
    if (actionName === "new-request") routeHash("/app/action/new-request");
    else if (actionName === "request-details") routeHash(`/app/action/request-details?id=${action.dataset.requestIndex}`);
    else if (actionName === "module-action") handleModuleAction(action.dataset.moduleAction);
    else if (actionName === "request-service") routeHash(`/app/action/new-request?service=${encodeURIComponent(action.dataset.serviceSlug)}`);
    else if (actionName === "read-notification") {
      const notification = demoNotifications[Number(action.dataset.notificationIndex)];
      if (notification) notification.read = true;
      showModule("notifications");
    } else if (actionName === "mark-all-read") {
      demoNotifications.forEach((notification) => { notification.read = true; });
      showModule("notifications");
      showToast("You’re all caught up.");
    } else if (actionName === "download-statement") downloadStatement();
    else if (actionName === "back-module") routeHash(`/app/${action.dataset.module}`);
    else if (actionName === "mark-inquiry-read") showToast("All notifications are up to date.");
  }
});

document.querySelector(".menu-toggle").addEventListener("click", (event) => {
  const toggle = event.currentTarget;
  const expanded = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!expanded));
  toggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
  document.querySelector(".nav-links").classList.toggle("open", !expanded);
});

document.querySelectorAll(".nav-links a").forEach((link) => link.addEventListener("click", closeMobileMenu));

document.querySelector(".chat-input").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector("input");
  sendChatMessage(input.value);
  input.value = "";
});

document.querySelectorAll(".suggested-prompts button").forEach((button) => {
  button.addEventListener("click", () => sendChatMessage(button.textContent));
});

document.addEventListener("input", (event) => {
  if (event.target.matches("[data-global-search]")) {
    renderSearchResults(event.target.value);
    return;
  }
  if (!event.target.matches(".module-search")) return;
  const query = event.target.value.trim().toLowerCase();
  const tableRows = dashboardContent.querySelectorAll(".module-table tbody tr");
  tableRows.forEach((row) => row.hidden = !row.textContent.toLowerCase().includes(query));
  const leads = dashboardContent.querySelectorAll(".lead-card");
  leads.forEach((lead) => lead.hidden = !lead.textContent.toLowerCase().includes(query));
  const requests = dashboardContent.querySelectorAll(".request-card");
  requests.forEach((request) => request.hidden = !request.textContent.toLowerCase().includes(query));
});

document.addEventListener("change", (event) => {
  if (event.target.matches("[data-booking-service]")) {
    const selectedService = event.target.value;
    const inquiryLink = routeHost.querySelector("[data-service-inquiry-link]");
    inquiryLink.href = selectedService ? `#/contact?service=${encodeURIComponent(selectedService)}` : "#/contact";
    return;
  }
  if (event.target.matches("[data-filter-column]")) {
    const column = Number(event.target.dataset.filterColumn);
    const filter = event.target.value.toLowerCase();
    dashboardContent.querySelectorAll(".module-table tbody tr").forEach((row) => {
      const cell = row.cells[column];
      row.hidden = Boolean(filter && cell && !cell.textContent.toLowerCase().includes(filter));
    });
  }
});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-form]");
  if (!form) return;
  event.preventDefault();
  const values = new FormData(form);
  const formType = form.dataset.form;
  if (formType === "contact") {
    const isMessageInquiry = form.dataset.inquiryKind === "message";
    const serviceSlugValue = String(values.get("service") || "");
    const messageDetails = String(values.get("message") || "").trim();
    const inquiry = {
      name: String(values.get("name") || "").trim(),
      email: String(values.get("email") || "").trim(),
      service_slug: isMessageInquiry ? "" : serviceSlugValue,
      ad_source: String(values.get("ad_source") || ""),
      message: isMessageInquiry
        ? [
          `Inquiry topic: ${String(values.get("inquiry_topic") || "")}`,
          values.get("business_name") ? `Business name: ${String(values.get("business_name")).trim()}` : "",
          values.get("phone") ? `Phone number: ${String(values.get("phone")).trim()}` : "",
          messageDetails
        ].filter(Boolean).join("\n\n")
        : [
        values.get("package_option") ? `Package preference: ${String(values.get("package_option"))}` : "",
        messageDetails
      ].filter(Boolean).join("\n\n"),
      website: String(values.get("website") || "")
    };
    const submitButton = form.querySelector('button[type="submit"]');
    const message = form.querySelector(".form-message");
    submitButton.disabled = true;
    submitButton.textContent = "Sending…";
    message.textContent = "";
    let apiChecked = false;
    fetch("api.php?resource=inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(inquiry)
    }).then(async (response) => {
      const result = await response.json();
      apiChecked = true;
      setBackendStatus(response.status !== 503, result.error || "");
      if (!response.ok) throw new Error(result.error || `Inquiry could not be saved (${response.status}).`);
      if (!result.data || !result.data.id) throw new Error("The server did not confirm that the inquiry was saved.");
      inquirySaved = true;
      setBackendStatus(true);
      if (isMessageInquiry) {
        routeHost.innerHTML = `<section class="route-page shell message-success-page"><div class="route-heading"><span class="eyebrow"><span class="eyebrow-dot"></span> MESSAGE RECEIVED</span><h1>Message received.</h1><p>Thanks for reaching out. We’ll get back to you as soon as possible.</p></div><a class="button button-dark" href="#/home">Back to Home <span aria-hidden="true">↗</span></a></section>`;
        const heading = routeHost.querySelector("h1");
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        message.textContent = "Your inquiry is saved. You can choose a consultation time in the calendar beside this form.";
        submitButton.disabled = true;
        submitButton.textContent = "Inquiry saved";
      }
    }).catch((error) => {
      message.textContent = `${backendFailureMessage(error)} Your inquiry has not been sent.`;
      if (!apiChecked) setBackendStatus(false, backendFailureMessage(error));
      submitButton.disabled = false;
      submitButton.innerHTML = isMessageInquiry ? 'Send message <span aria-hidden="true">→</span>' : 'Send your inquiry <span aria-hidden="true">↗</span>';
    });
    return;
  }
  if (formType === "new-request") {
    demoRequests.unshift({
      title: String(values.get("title")).trim(),
      submitted: "Just now",
      assigned: "Client services",
      status: "In progress",
      description: String(values.get("details")).trim()
    });
    showAppSuccess("Request added to your preview.", "Your support team has a new service request to review.", "requests");
    return;
  }
  if (formType === "new-booking") {
    demoBookings.unshift({
      title: String(values.get("title")).trim(),
      date: String(values.get("date")),
      time: String(values.get("time")),
      location: String(values.get("location")),
      status: "Pending"
    });
    showAppSuccess("Booking request added.", "Your booking appears in the preview as pending confirmation.", "bookings");
    return;
  }
  if (formType === "invite-member") {
    demoTeam.push({ name: String(values.get("name")).trim(), email: String(values.get("email")).trim(), role: String(values.get("role")) });
    showAppSuccess("Teammate added to the preview.", "The new teammate now appears in your workspace team list.", "team");
    return;
  }
  if (formType === "upload-document") {
    const file = values.get("file");
    if (!(file instanceof File) || !file.name) {
      showToast("Choose a document before continuing.");
      return;
    }
    demoDocuments.unshift({ name: file.name, category: String(values.get("category")), updated: "Just now", access: "Workspace" });
    showAppSuccess("Document added to the preview.", `${file.name} appears in your workspace document list. The file itself is not uploaded to a server.`, "documents");
    return;
  }
  if (formType === "add-lead") {
    crmLeads.unshift({
      name: String(values.get("name")).trim(),
      contact: String(values.get("contact")).trim(),
      value: String(values.get("value")).trim(),
      owner: "JD",
      stage: String(values.get("stage"))
    });
    showAppSuccess("Lead added to the pipeline.", "The lead is now in your CRM preview.", "crm");
    return;
  }
});

document.querySelector(".sidebar-toggle").addEventListener("click", () => {
  const sidebar = document.querySelector(".app-sidebar");
  sidebar.classList.toggle("sidebar-open");
  document.querySelector(".sidebar-toggle").setAttribute("aria-expanded", String(sidebar.classList.contains("sidebar-open")));
});

let draggedLead;
document.addEventListener("dragstart", (event) => {
  const lead = event.target.closest(".lead-card");
  if (!lead) return;
  draggedLead = lead;
  event.dataTransfer.effectAllowed = "move";
});
document.addEventListener("dragover", (event) => {
  const stage = event.target.closest(".pipeline-stage");
  if (!stage) return;
  event.preventDefault();
  stage.classList.add("drag-over");
});
document.addEventListener("dragleave", (event) => {
  const stage = event.target.closest(".pipeline-stage");
  if (stage && !stage.contains(event.relatedTarget)) stage.classList.remove("drag-over");
});
document.addEventListener("drop", (event) => {
  const stage = event.target.closest(".pipeline-stage");
  if (!stage || !draggedLead) return;
  event.preventDefault();
  stage.classList.remove("drag-over");
  stage.append(draggedLead);
  const count = stage.querySelectorAll(".lead-card").length;
  stage.querySelector("h3 span").textContent = String(count);
  const origin = document.querySelectorAll(".pipeline-stage");
  origin.forEach((column) => {
    const heading = column.querySelector("h3 span");
    heading.textContent = String(column.querySelectorAll(".lead-card").length);
  });
  const leadName = draggedLead.dataset.lead;
  const lead = crmLeads.find((item) => item.name === leadName);
  if (lead) lead.stage = stage.dataset.stage;
  showToast(`${leadName} moved to ${stage.dataset.stage}.`);
  draggedLead = null;
});

document.addEventListener("keydown", (event) => {
  const lead = event.target.closest(".lead-card");
  if (!lead || event.target.closest("button")) return;
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault();
    moveLeadToNextStage(lead.dataset.lead, event.key === "ArrowRight" ? 1 : -1);
  }
});

document.addEventListener("change", (event) => {
  if (event.target.matches('input[type="file"][name="file"]')) {
    const uploadedFileName = event.target.files && event.target.files[0] ? event.target.files[0].name : "";
    const message = event.target.closest("form")?.querySelector(".form-message");
    if (message) message.textContent = uploadedFileName ? `${uploadedFileName} selected. It will only be listed in this preview.` : "";
  }
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    routeHash("/app/search");
    window.setTimeout(() => dashboardContent.querySelector("[data-global-search]")?.focus(), 0);
  }
  if (event.key === "Escape") {
    const chat = document.querySelector(".ai-chat");
    const sidebar = document.querySelector(".app-sidebar");
    if (!chat.hidden) {
      chat.hidden = true;
      chatReturnFocus?.focus();
    }
    if (sidebar.classList.contains("sidebar-open")) {
      sidebar.classList.remove("sidebar-open");
      document.querySelector(".sidebar-toggle").setAttribute("aria-expanded", "false");
      document.querySelector(".sidebar-toggle").focus();
    }
    if (document.querySelector(".nav-links").classList.contains("open")) {
      closeMobileMenu();
      document.querySelector(".menu-toggle").focus();
    }
  }
});
