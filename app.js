/* ── PUBLIC RUNTIME ROUTER & EVENT LISTENERS ────────────────────────────── *//* ── APPLICATION SYNCHRONIZATION BOOTSTRAPPING DRIVE ─────────────────────── */
window.addEventListener("DOMContentLoaded", async () => {
  await loadAllFlatFileData(); // Pull raw records from server JSON storage maps
  buildAnnouncementTicker();
  navigateTo("home");
});

function buildAnnouncementTicker() {
  const textTrack = document.getElementById("ticker-text");
  if (!textTrack || announcementsData.length === 0) return;
  const mergedStr = announcementsData.join("     ✦     ");
  textTrack.innerHTML = `${mergedStr}&nbsp;&nbsp;&nbsp;&nbsp;${mergedStr}`;
}

function toggleDropdown(id, show) {
  document.getElementById(id).style.display = show ? "block" : "none";
}

function navigateTo(pageKey) {
  currentPage = pageKey;
  window.scrollTo(0, 0);

  document.querySelectorAll(".nav-link-btn").forEach(btn => {
      if(btn.getAttribute("data-page") === pageKey) btn.classList.add("active");
      else btn.classList.remove('active');
  });

  const viewTarget = document.getElementById("app-view");
  if (!viewTarget) return;
  
  switch (pageKey) {
      case "home": viewTarget.innerHTML = renderHomePage(); break;
      case "about": viewTarget.innerHTML = renderAboutPage(); break;
      case "principal": viewTarget.innerHTML = renderPrincipalPage(); break;
      case "vision": viewTarget.innerHTML = renderVisionPage(); break;
      case "achievements": viewTarget.innerHTML = renderAchievementsPage(); break;
      case "syllabus": viewTarget.innerHTML = renderSyllabusPage(); break;
      case "timetable": viewTarget.innerHTML = renderTimetablePage(); break;
      case "gallery": viewTarget.innerHTML = renderGalleryPage(); break;
      case "admissions": viewTarget.innerHTML = renderAdmissionsPage(); break;
      case "fees": viewTarget.innerHTML = renderFeesPage(); break;
      case "contact": viewTarget.innerHTML = renderContactPage(); break;
      case "login": viewTarget.innerHTML = renderLoginPage(); break;
      default: viewTarget.innerHTML = renderHomePage();
  }
}

/* ── REUSABLE RENDERING UTILITIES ────────────────────────────────────────── */
function makeSectionHeader(title, subtitle, isLight = false) {
  return `
      <div class="section-header">
          <p class="${isLight ? 'light' : ''}">${subtitle}</p>
          <h2>${title}</h2>
          <div class="line"></div>
      </div>
  `;
}

function makePageBanner(title, subtitle) {
  return `
      <div class="page-banner">
          <div class="page-banner-circle-1"></div>
          <div class="page-banner-circle-2"></div>
          <p>${subtitle}</p>
          <h1>${title}</h1>
      </div>
  `;
}

function openLightbox(id) {
  let img = galleryData.find(g => g.id === id);
  if (!img) return;
  let modal = document.getElementById("global-modal");
  modal.innerHTML = `
      <div class="modal-frame" onclick="event.stopPropagation()">
          <img src="${img.url}" alt="${img.title}" style="width:100%; display:block;">
          <div style="padding:1rem 1.2rem; display:flex; justify-content:space-between; align-items:center;">
              <div><p style="font-weight:700; color:var(--navy); margin:0;">${img.title}</p><span class="tag">${img.cat}</span></div>
              <button onclick="closeModal()" style="background:var(--red); color:#fff; border:none; border-radius:50%; width:32px; height:32px; cursor:pointer;">×</button>
          </div>
      </div>
  `;
  modal.style.display = "flex";
}

function closeModal() { document.getElementById("global-modal").style.display = "none"; }

/* ── DOM COMPONENT MARKUP INJECTIONS ─────────────────────────────────────── */
function renderHomePage() {
  const stats = [{n:"25+",l:"Years of Excellence"},{n:"3500+",l:"Alumni Worldwide"},{n:"100%",l:"SSLC Pass Rate 2024"},{n:"48",l:"Qualified Faculty"}];
  let statsHtml = stats.map(s => `<div><div class="stat-num">${s.n}</div><div class="stat-label">${s.l}</div></div>`).join('');
  let galleryPreviewHtml = galleryData.slice(0,6).map(g => `
      <div class="img-thumb-frame" onclick="openLightbox(${g.id})"><img src="${g.url}"></div>
  `).join('');

  return `
      <div class="hero-banner">
          <div class="hero-container"><h1>Shakespeare Ideal Matriculation School</h1><p>Nurturing Young Minds with Knowledge, Values & Excellence.</p></div>
      </div>
      <div class="stats-bar"><div class="stats-grid">${statsHtml}</div></div>
      <div style="max-width:960px; margin:4rem auto; padding:0 2rem;">
          ${makeSectionHeader("School Life in Pictures", "Gallery Highlights")}
          <div class="gallery-grid-preview">${galleryPreviewHtml}</div>
      </div>
  `;
}

function renderAboutPage() { return `${makePageBanner("About Our School", "Our Story")}`; }
function renderPrincipalPage() { return `${makePageBanner("About Our Principal", "Leadership")}`; }
function renderVisionPage() { return `${makePageBanner("Vision & Mission", "Purpose")}`; }
function renderAchievementsPage() { return `${makePageBanner("Achievements & Awards", "Pride")}`; }
function renderSyllabusPage() { return `${makePageBanner("Syllabus Profiles", "Academics")}`; }
function renderTimetablePage() { return `${makePageBanner("Time Table Matrix", "Schedule")}`; }
function renderGalleryPage() {
  return `
      ${makePageBanner("School Gallery", "Memories")}
      <div style="max-width:960px; margin:3rem auto; padding:0 2rem; display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:14px;">
          ${galleryData.map(g => `<div class="card" onclick="openLightbox(${g.id})"><img src="${g.url}" style="width:100%; object-fit:cover;"></div>`).join('')}
      </div>
  `;
}
function renderFeesPage() { return `${makePageBanner("Fees Structure", "Tally")}`; }
  function renderAdmissionsPage() { return `${makePageBanner("Admissions", "Enroll")}`; }
function renderContactPage() { return `${makePageBanner("Contact Us", "Reach Out")}`; }

function buildAnnouncementTicker() {
  const textTrack = document.getElementById("ticker-text");
  const mergedStr = announcementsData.join("     ✦     ");
  textTrack.innerHTML = `${mergedStr}&nbsp;&nbsp;&nbsp;&nbsp;${mergedStr}`;
}

function toggleDropdown(id, show) {
  document.getElementById(id).style.display = show ? "block" : "none";
}

function navigateTo(pageKey) {
  currentPage = pageKey;
  window.scrollTo(0, 0);

  document.querySelectorAll(".nav-link-btn").forEach(btn => {
      if(btn.getAttribute("data-page") === pageKey) btn.classList.add("active");
      else btn.classList.remove('active');
  });

  const viewTarget = document.getElementById("app-view");
  
  switch (pageKey) {
      case "home": viewTarget.innerHTML = renderHomePage(); break;
      case "about": viewTarget.innerHTML = renderAboutPage(); break;
      case "principal": viewTarget.innerHTML = renderPrincipalPage(); break;
      case "vision": viewTarget.innerHTML = renderVisionPage(); break;
      case "achievements": viewTarget.innerHTML = renderAchievementsPage(); break;
      case "syllabus": viewTarget.innerHTML = renderSyllabusPage(); break;
      case "timetable": viewTarget.innerHTML = renderTimetablePage(); break;
      case "gallery": viewTarget.innerHTML = renderGalleryPage(); break;
      case "admissions": viewTarget.innerHTML = renderAdmissionsPage(); break;
      case "fees": viewTarget.innerHTML = renderFeesPage(); break;
      case "contact": viewTarget.innerHTML = renderContactPage(); break;
      case "login": viewTarget.innerHTML = renderLoginPage(); break;
      default: viewTarget.innerHTML = renderHomePage();
  }
}

/* ── DOM COMPONENT ELEMENT GENERATORS (PUBLIC COMPONENTS) ────────────────── */
function makeSectionHeader(title, subtitle, isLight = false) {
  return `
      <div class="section-header">
          <p class="${isLight ? 'light' : ''}">${subtitle}</p>
          <h2 class="${isLight ? 'light' : ''}">${title}</h2>
          <div class="line"></div>
      </div>
  `;
}

function makePageBanner(title, subtitle) {
  return `
      <div class="page-banner">
          <div class="page-banner-circle-1"></div>
          <div class="page-banner-circle-2"></div>
          <p>${subtitle}</p>
          <h1>${title}</h1>
      </div>
  `;
}

function openLightbox(id) {
  let img = galleryData.find(g => g.id === id);
  if (!img) return;
  let modal = document.getElementById("global-modal");
  modal.innerHTML = `
      <div class="modal-frame" onclick="event.stopPropagation()">
          <img src="${img.url}" alt="${img.title}" style="width:100%; display:block;">
          <div style="padding:1rem 1.2rem; display:flex; justify-content:space-between; align-items:center;">
              <div>
                  <p style="font-weight:700; color:var(--navy); margin:0; font-size:15px;">${img.title}</p>
                  <span class="tag">${img.cat}</span>
              </div>
              <button onclick="closeModal()" style="background:var(--red); color:#fff; border:none; border-radius:50%; width:32px; height:32px; cursor:pointer; font-size:18px; display:flex; align-items:center; justify-content:center;">×</button>
          </div>
      </div>
  `;
  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("global-modal").style.display = "none";
}

/* ── MAIN CLIENT INTERFACE PLATFORM PAGE RENDERS ───────────────────────── */
function renderHomePage() {
  const stats = [{n:"25+",l:"Years of Excellence"},{n:"3500+",l:"Alumni Worldwide"},{n:"100%",l:"SSLC Pass Rate 2024"},{n:"48",l:"Qualified Faculty"}];
  const features = [
      {icon:"📚",title:"Quality Education",desc:"Comprehensive curriculum aligned with Tamil Nadu Matriculation Board standards with modern teaching methods."},
      {icon:"🏆",title:"Excellence in Sports",desc:"State-level sports facilities and trained coaches to nurture champions in athletics, cricket, and more."},
      {icon:"🔬",title:"Modern Laboratories",desc:"Well-equipped Physics, Chemistry, Biology, and Computer labs for hands-on learning experiences."},
      {icon:"🎭",title:"Cultural Activities",desc:"Vibrant cultural programs, annual day celebrations, and arts competitions to nurture creative talent."},
      {icon:"🚌",title:"Safe Transportation",desc:"GPS-enabled school buses covering major routes with trained drivers ensuring student safety."},
      {icon:"🌟",title:"Holistic Development",desc:"NCC, Scouts, Yoga, and personality development programs to shape complete individuals."},
  ];

  let statsHtml = stats.map(s => `<div><div class="stat-num">${s.n}</div><div class="stat-label">${s.l}</div></div>`).join('');
  let featuresHtml = features.map(f => `
      <div class="card interactive-card">
          <div style="font-size:36px; margin-bottom:12px;">${f.icon}</div>
          <h3 style="font-family:'Playfair Display',serif; color:var(--navy); font-size:17px; margin:0 0 8px;">${f.title}</h3>
          <p style="color:var(--gray); font-size:13px; line-height:1.7; margin:0;">${f.desc}</p>
      </div>
  `).join('');

  let galleryPreviewHtml = galleryData.slice(0,6).map(g => `
      <div class="img-thumb-frame" onclick="openLightbox(${g.id})">
          <img src="${g.url}" alt="${g.title}">
          <div class="img-thumb-caption"><span>${g.title}</span></div>
      </div>
  `).join('');

  let noticesHtml = announcementsData.map(a => `
      <div class="notice-row">
          <div class="notice-dot"></div>
          <span class="notice-text">${a}</span>
      </div>
  `).join('');

  return `
      <div class="hero-banner">
          <div style="position:absolute; top:-80px; right:-80px; width:400px; height:400px; border-radius:50%; background:rgba(245,166,35,0.08);"></div>
          <div style="position:absolute; bottom:-60px; left:-60px; width:300px; height:300px; border-radius:50%; background:rgba(255,255,255,0.05);"></div>
          <div class="hero-container">
              <div class="hero-badge"><span>Est. 2000 • TN Matric Board Affiliated</span></div>
              <h1>Shakespeare Ideal<br><span style="color:var(--gold);">Matriculation School</span></h1>
              <p>Nurturing Young Minds with Knowledge, Values & Excellence since 2000. Shaping tomorrow's leaders in a caring, disciplined environment.</p>
              <div class="flex-center-wrap">
                  <button class="btn btn-primary" onclick="navigateTo('admissions')">Apply for Admission 2025</button>
                  <button class="btn btn-ghost" onclick="navigateTo('about')">Explore Our School</button>
              </div>
          </div>
      </div>
      <div class="stats-bar"><div class="stats-grid">${statsHtml}</div></div>
      
      <div class="split-grid-960">
          <div>
              <p style="color:var(--teal); font-weight:700; letter-spacing:2px; font-size:12px; text-transform:uppercase; margin-bottom:8px;">Welcome to Our School</p>
              <h2 style="font-family:'Playfair Display',serif; color:var(--navy); font-size:clamp(22px,3.5vw,32px); margin:0 0 1rem; line-height:1.3;">A Legacy of Academic Excellence & Values</h2>
              <p style="color:var(--gray); line-height:1.8; font-size:14px; margin-bottom:1rem;">Shakespeare Ideal Matriculation School has been a beacon of quality education in our community for over two decades. We believe in nurturing every child's unique potential through a blend of rigorous academics, sports, arts, and moral education.</p>
              <p style="color:var(--gray); line-height:1.8; font-size:14px; margin-bottom:1.5rem;">Our dedicated faculty and modern infrastructure create an environment where students thrive academically and personally, emerging as confident, compassionate citizens ready for life's challenges.</p>
              <div style="display:flex; gap:12px; flex-wrap:wrap;">
                  <button class="btn btn-primary btn-small" onclick="navigateTo('about')">Read More</button>
                  <button class="btn btn-outline btn-small" onclick="navigateTo('principal')">Meet Our Principal</button>
              </div>
          </div>
          <div class="features-grid-list">
              <div class="welcome-badge-card" style="background:var(--tealLight); border-left:4px solid var(--teal);">
                  <div style="font-size:24px; margin-bottom:6px;">🌱</div><div style="font-weight:600; color:var(--darkText); font-size:13px;">Caring Environment</div>
              </div>
              <div class="welcome-badge-card" style="background:var(--goldLight); border-left:4px solid var(--gold);">
                  <div style="font-size:24px; margin-bottom:6px;">🎓</div><div style="font-weight:600; color:var(--darkText); font-size:13px;">Dedicated Teachers</div>
              </div>
              <div class="welcome-badge-card" style="background:#F0E6FF; border-left:4px solid var(--purple);">
                  <div style="font-size:24px; margin-bottom:6px;">🏫</div><div style="font-weight:600; color:var(--darkText); font-size:13px;">Modern Facilities</div>
              </div>
              <div class="welcome-badge-card" style="background:#FFE8E8; border-left:4px solid var(--red);">
                  <div style="font-size:24px; margin-bottom:6px;">🎨</div><div style="font-weight:600; color:var(--darkText); font-size:13px;">Co-curricular Focus</div>
              </div>
          </div>
      </div>

      <div class="features-bg-pane">
          <div style="max-width:960px; margin:0 auto;">
              ${makeSectionHeader("Why Choose Shakespeare Ideal?", "Our Strengths")}
              <div class="cards-responsive-grid">${featuresHtml}</div>
          </div>
      </div>

      <div style="max-width:960px; margin:4rem auto; padding:0 2rem; box-sizing:border-box;">
          ${makeSectionHeader("School Life in Pictures", "Gallery Highlights")}
          <div class="gallery-grid-preview">${galleryPreviewHtml}</div>
          <div style="text-align:center;"><button class="btn btn-primary" onclick="navigateTo('gallery')">View Full Gallery →</button></div>
      </div>

      <div class="notice-board-section">
          <div class="notice-board-container">
              ${makeSectionHeader("Notice Board", "Latest Updates", true)}
              <div style="display:grid; gap:12px;">${noticesHtml}</div>
          </div>
      </div>

      <div class="cta-banner">
          <h2 style="font-family:'Playfair Display',serif; color:var(--navy); font-size:clamp(22px,4vw,32px); margin:0 0 0.8rem;">Ready to Join Our School Family?</h2>
          <p style="color:var(--gray); margin:0 0 1.5rem; font-size:15px;">Admissions for 2025-26 are now open. Secure your child's bright future today.</p>
          <div class="flex-center-wrap">
              <button class="btn btn-primary" onclick="navigateTo('admissions')">Apply for Admission</button>
              <button class="btn btn-outline" onclick="navigateTo('contact')">Contact Us</button>
          </div>
      </div>
  `;
}

function renderAboutPage() {
  const milestones = [
      {yr:"2000",t:"Foundation",d:"School founded with a vision to provide quality education to rural and semi-urban children."},
      {yr:"2005",t:"First Batch",d:"First SSLC batch achieves 98% pass rate, establishing academic credibility."},
      {yr:"2010",t:"Expansion",d:"New science block and computer lab added; strength reaches 800 students."},
      {yr:"2015",t:"Sports Excellence",d:"State-level cricket and athletics teams formed; multiple district championships."},
      {yr:"2020",t:"Silver Jubilee",d:"20 years of excellence; 3000+ alumni across India and abroad."},
      {yr:"2024",t:"100% SSLC",d:"Historic 100% pass with 85% distinction in SSLC Board Examinations."},
  ];

  let facts = [["Students",">1200"],["Teachers","48"],["Classrooms","36"],["Labs","5"],["Library","Yes"],["Play Grounds","3"],["Buses","8 Routes"],["Pass Rate","100% (2024)"]];
  let factsHtml = facts.map(f => `<div class="quick-facts-table-row"><span style="color:rgba(255,255,255,0.75);">${f[0]}</span><span style="font-weight:700; color:var(--gold);">${f[1]}</span></div>`).join('');
  
  let milestonesHtml = milestones.map((m, i) => `
      <div class="timeline-node">
          <div class="timeline-dot-marker" style="background:${i%2===0?'var(--teal)':'var(--gold)'}; box-shadow:0 0 0 3px ${i%2===0?'var(--teal)':'var(--gold)'}40;"></div>
          <div style="display:flex; gap:12px; align-items:baseline; margin-bottom:4px;">
              <span style="background:var(--gold); color:var(--navyDark); font-size:11px; font-weight:800; padding:2px 10px; border-radius:20px;">${m.yr}</span>
              <span style="font-weight:700; color:var(--navy); font-size:15px;">${m.t}</span>
          </div>
          <p style="color:var(--gray); font-size:13px; line-height:1.7; margin:0;">${m.d}</p>
      </div>
  `).join('');

  return `
      ${makePageBanner("About Our School", "Our Story")}
      <div class="content-sidebar-layout">
          <div>
              <h2 style="font-family:'Playfair Display',serif; color:var(--navy); font-size:26px; margin:0 0 1rem;">Shakespeare Ideal Matriculation School</h2>
              <p style="color:var(--gray); line-height:1.85; font-size:14px; margin-bottom:1rem;">Shakespeare Ideal Matriculation School was established in 2000 with the noble vision of providing high-quality education accessible to every child. Located in a serene, pollution-free environment, our school stands as a temple of learning where knowledge meets character.</p>
              <p style="color:var(--gray); line-height:1.85; font-size:14px; margin-bottom:1rem;">Affiliated to the Tamil Nadu Matriculation Board, we offer education from LKG to Class X with a strong emphasis on academic excellence, co-curricular development, and moral values. Our school is recognized as one of the leading Matric schools in the district.</p>
              <p style="color:var(--gray); line-height:1.85; font-size:14px; margin-bottom:1.5rem;">We believe every child is unique and gifted. Our faculty of 48 experienced teachers employs innovative teaching methodologies tailored to nurture each student's individual strengths, ensuring no child is left behind.</p>
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:1.5rem;">
                  <div style="background:var(--light); border-radius:8px; padding:0.8rem 1rem;">
                      <div style="font-size:20px; margin-bottom:4px;">📍</div><div style="font-size:11px; color:var(--gray); text-transform:uppercase; letter-spacing:1px;">Location</div><div style="font-weight:600; color:var(--darkText); font-size:13px;">Anna Nagar, Chennai – 600 040</div>
                  </div>
                  <div style="background:var(--light); border-radius:8px; padding:0.8rem 1rem;">
                      <div style="font-size:20px; margin-bottom:4px;">🏫</div><div style="font-size:11px; color:var(--gray); text-transform:uppercase; letter-spacing:1px;">Type</div><div style="font-weight:600; color:var(--darkText); font-size:13px;">Tamil Nadu Matric Board</div>
                  </div>
                  <div style="background:var(--light); border-radius:8px; padding:0.8rem 1rem;">
                      <div style="font-size:20px; margin-bottom:4px;">📅</div><div style="font-size:11px; color:var(--gray); text-transform:uppercase; letter-spacing:1px;">Established</div><div style="font-weight:600; color:var(--darkText); font-size:13px;">Year 2000</div>
                  </div>
                  <div style="background:var(--light); border-radius:8px; padding:0.8rem 1rem;">
                      <div style="font-size:20px; margin-bottom:4px;">👦</div><div style="font-size:11px; color:var(--gray); text-transform:uppercase; letter-spacing:1px;">Medium</div><div style="font-weight:600; color:var(--darkText); font-size:13px;">Tamil & English Medium</div>
                  </div>
              </div>
          </div>
          <div>
              <div class="card" style="background:linear-gradient(135deg, var(--navy), var(--navyLight)); color:#fff;">
                  <h3 style="font-family:'Playfair Display',serif; color:var(--gold); margin:0 0 1rem; font-size:18px;">Quick Facts</h3>
                  ${factsHtml}
              </div>
          </div>
      </div>
      <div style="max-width:960px; margin:0 auto 4rem; padding:0 2rem; box-sizing:border-box;">
          <h3 style="font-family:'Playfair Display',serif; color:var(--navy); font-size:22px; margin-bottom:1.5rem; text-align:center;">Our Journey Through the Years</h3>
          <div class="timeline-track">
              <div class="timeline-line-bar"></div>
              ${milestonesHtml}
          </div>
      </div>
  `;
}

function renderPrincipalPage() {
  return `
      ${makePageBanner("About Our Principal", "Leadership")}
      <div class="principal-grid">
          <div style="text-align:center;">
              <div style="width:200px; height:200px; border-radius:50%; background:linear-gradient(135deg, var(--navy), var(--teal)); display:flex; align-items:center; justify-content:center; font-size:80px; margin:0 auto 1rem; box-shadow:0 8px 30px var(--shadow);">👩‍🏫</div>
              <h2 style="font-family:'Playfair Display',serif; color:var(--navy); font-size:22px; margin:0 0 4px;">Dr. Meenakshi Sundaram</h2>
              <p style="color:var(--teal); font-weight:600; font-size:13px; margin:0 0 1rem;">M.Sc., M.Ed., Ph.D. — Principal</p>
              <div style="background:var(--goldLight); border-radius:10px; padding:1rem; border:1px solid rgba(245,166,35,0.5);">
                  <div style="display:flex; justify-content:between; padding:6px 0; border-bottom:1px solid rgba(245,166,35,0.3); font-size:13px;"><span style="color:var(--gray);">Experience</span><span style="font-weight:600; color:var(--navyDark)">28 Years</span></div>
                  <div style="display:flex; justify-content:between; padding:6px 0; border-bottom:1px solid rgba(245,166,35,0.3); font-size:13px;"><span style="color:var(--gray);">Qualification</span><span style="font-weight:600; color:var(--navyDark)">Ph.D. in Education</span></div>
                  <div style="display:flex; justify-content:between; padding:6px 0; border-bottom:1px solid rgba(245,166,35,0.3); font-size:13px;"><span style="color:var(--gray);">Specialization</span><span style="font-weight:600; color:var(--navyDark)">Child Psychology</span></div>
                  <div style="display:flex; justify-content:between; padding:6px 0; font-size:13px;"><span style="color:var(--gray);">Awards</span><span style="font-weight:600; color:var(--navyDark)">3 State Awards</span></div>
              </div>
          </div>
          <div>
              <span class="tag">A Message from the Principal</span>
              <h3 style="font-family:'Playfair Display',serif; color:var(--navy); font-size:24px; margin:1rem 0;">Shaping Futures, Inspiring Lives</h3>
              <p style="color:var(--gray); line-height:1.85; font-size:14px; margin-bottom:1rem; font-style:italic; border-left:4px solid var(--gold); padding-left:1rem;">
                  "Education is not merely about acquiring knowledge; it is about cultivating wisdom, building character, and inspiring students to discover their highest potential."
              </p>
              <p style="color:var(--gray); line-height:1.85; font-size:14px; margin-bottom:1rem;">
                  Dr. Meenakshi Sundaram brings 28 years of rich experience in education management, curriculum development, and child psychology. She joined Shakespeare Ideal Matriculation School in 2012 and has since transformed it into one of the most sought-after schools in the region.
              </p>
              <p style="color:var(--gray); line-height:1.85; font-size:14px; margin-bottom:1rem;">
                  Under her visionary leadership, the school achieved 100% SSLC pass results consecutively for the past 5 years. She is a strong advocate for student-centered learning, and has introduced several innovative programs including the "Learning by Doing" science curriculum and the "Shakespeare Reads" literacy drive.
              </p>
              <p style="color:var(--gray); line-height:1.85; font-size:14px; margin-bottom:1.5rem;">
                  She has received the Best Principal Award from the State Government in 2018 and 2022, and was recognized by the National Council for Educational Research for her contributions to rural education.
              </p>
              <div style="display:flex; gap:10px; flex-wrap:wrap;">
                  <span class="tag" style="background:rgba(27,58,107,0.1); color:var(--navy);">Ph.D. Education</span>
                  <span class="tag">Child Psychologist</span>
                  <span class="tag" style="background:rgba(245,166,35,0.1); color:var(--goldDark);">State Award Winner</span>
                  <span class="tag" style="background:rgba(124,58,237,0.1); color:var(--purple);">TN Best Principal 2022</span>
              </div>
          </div>
      </div>
  `;
}

function renderVisionPage() {
  const values = [
      {icon:"🌟",title:"Excellence",desc:"Pursuing the highest academic standards while making education joyful and meaningful for every learner."},
      {icon:"🤝",title:"Integrity",desc:"Building honest, ethical individuals who lead with integrity and compassion in all walks of life."},
      {icon:"💡",title:"Innovation",desc:"Embracing modern teaching methods and technology to prepare students for the 21st century."},
      {icon:"🌱",title:"Growth",desc:"Fostering continuous growth — academic, physical, emotional, and spiritual — in every student."},
      {icon:"🤗",title:"Inclusivity",desc:"Creating a safe, welcoming environment where every child feels valued, respected, and included."},
      {icon:"🌍",title:"Responsibility",desc:"Nurturing responsible citizens who care for their community, nation, and the environment."},
  ];
  
  let colors = [ "var(--gold)", "var(--navy)", "var(--teal)", "var(--green)", "var(--orange)", "var(--purple)" ];
  let valuesHtml = values.map((v, i) => `
      <div class="card" style="border-left:4px solid ${colors[i]};">
          <div style="font-size:32px; margin-bottom:8px;">${v.icon}</div>
          <h4 style="color:var(--navy); font-weight:700; margin:0 0 6px; font-size:15px;">${v.title}</h4>
          <p style="color:var(--gray); font-size:13px; line-height:1.7; margin:0;">${v.desc}</p>
      </div>
  `).join('');

  return `
      ${makePageBanner("Vision & Mission", "Our Purpose")}
      <div style="max-width:900px; margin:3rem auto; padding:0 2rem; box-sizing:border-box;">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:2rem; margin-bottom:3rem;">
              <div class="card" style="border-top:5px solid var(--navy); text-align:center; padding:2rem;">
                  <div style="font-size:48px; margin-bottom:1rem;">🔭</div>
                  <h2 style="font-family:'Playfair Display',serif; color:var(--navy); font-size:22px; margin:0 0 1rem;">Our Vision</h2>
                  <p style="color:var(--gray); line-height:1.85; font-size:14px; margin:0;">To be a centre of excellence that transforms young minds into thoughtful, compassionate leaders who contribute positively to society while achieving their personal best.</p>
              </div>
              <div class="card" style="border-top:5px solid var(--gold); text-align:center; padding:2rem;">
                  <div style="font-size:48px; margin-bottom:1rem;">🎯</div>
                  <h2 style="font-family:'Playfair Display',serif; color:var(--navy); font-size:22px; margin:0 0 1rem;">Our Mission</h2>
                  <p style="color:var(--gray); line-height:1.85; font-size:14px; margin:0;">To provide holistic, child-centered education that nurtures intellectual curiosity, moral values, physical well-being, and creative expression — preparing every student for life's challenges and opportunities.</p>
              </div>
          </div>
          ${makeSectionHeader("Our Core Values", "What We Stand For")}
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1rem;">${valuesHtml}</div>
      </div>
  `;
}

function renderAchievementsPage() {
  const ach = [
      {cat:"Academics",items:["100% SSLC Pass Rate — 2020, 2021, 2022, 2023, 2024","District Topper in Maths — 3 consecutive years","State Rank 5 in Science Olympiad 2023","Best School Award — District Education Dept 2022"]},
      {cat:"Sports",items:["State Level Cricket Champions 2023","District Athletics Gold — 5 events in 2024","Inter-school Kabaddi Champions 2022","Yoga Championship — State Level Winners 2023"]},
      {cat:"Cultural",items:["Best Drama Award — Zonals 2023","First Prize Folk Dance — District Level","Best Choir Award — Annual Competitions","Art Exhibition — State Selection 2024"]},
      {cat:"Special Recognition",items:["Best Principal Award — State Govt 2022","ISO 9001:2015 Certified School","Green School Award — District Level","Best Infrastructure Award 2023"]},
  ];

  let borderColors = ["var(--gold)", "var(--teal)", "var(--purple)", "var(--navy)"];
  let icons = ["🎓", "🏆", "🎭", "⭐"];

  let achHtml = ach.map((a, i) => {
      let itemsList = a.items.map(item => `
          <li style="padding:8px 0; border-bottom:1px solid var(--border); font-size:13px; color:var(--gray); display:flex; gap:8px; align-items:flex-start;">
              <span style="color:var(--gold); flex-shrink:0; margin-top:2px;">✦</span>${item}
          </li>
      `).join('');

      return `
          <div class="card" style="border-top:4px solid ${borderColors[i]};">
              <h3 style="font-family:'Playfair Display',serif; color:var(--navy); font-size:18px; margin:0 0 1rem; display:flex; align-items:center; gap:8px;">
                  <span>${icons[i]}</span>${a.cat}
              </h3>
              <ul style="margin:0; padding:0; list-style:none;">${itemsList}</ul>
          </div>
      `;
  }).join('');

  return `
      ${makePageBanner("Achievements & Awards", "Our Pride")}
      <div style="max-width:960px; margin:3rem auto; padding:0 2rem; box-sizing:border-box;">
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(380px, 1fr)); gap:1.5rem;">${achHtml}</div>
      </div>
  `;
}

function renderSyllabusPage() {
  let tabsHtml = syllabusData.map((s, i) => `
      <button onclick="switchSyllabusTab(${i})" style="padding:8px 18px; border-radius:20px; border:2px solid ${currentSyllabusTab===i?'var(--navy)':'var(--border)'}; background:${currentSyllabusTab===i?'var(--navy)':'var(--white)'}; color:${currentSyllabusTab===i?'var(--white)':'var(--gray)'}; font-family:'Poppins',sans-serif; font-weight:600; font-size:13px; cursor:pointer;">
          ${s.classes}
      </button>
  `).join('');

  let currentSyllabus = syllabusData[currentSyllabusTab] || syllabusData[0];
  let activeCardHtml = '';
  
  if (currentSyllabus) {
      let subjectsTags = currentSyllabus.subjects.split(",").map(sub => `<span class="tag" style="margin-right:6px; margin-bottom:6px;">${sub.trim()}</span>`).join('');
      activeCardHtml = `
          <div class="card">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
                  <div>
                      <p style="color:var(--teal); font-weight:700; font-size:11px; letter-spacing:2px; text-transform:uppercase; margin:0 0 6px;">Classes</p>
                      <h3 style="font-family:'Playfair Display',serif; color:var(--navy); font-size:24px; margin:0 0 0.5rem;">${currentSyllabus.classes}</h3>
                      <p style="color:var(--gray); font-size:13px; margin:0;"><strong>Board:</strong> ${currentSyllabus.board}</p>
                  </div>
                  <div style="background:var(--tealLight); border-radius:8px; padding:1rem;">
                      <p style="color:var(--teal); font-weight:700; font-size:11px; letter-spacing:2px; text-transform:uppercase; margin:0 0 8px;">Core Subjects</p>
                      <div style="display:flex; flex-wrap:wrap;">${subjectsTags}</div>
                  </div>
              </div>
              <div style="margin-top:1.5rem; background:var(--goldLight); border-radius:8px; padding:1rem; border:1px solid rgba(245,166,35,0.4);">
                  <p style="color:var(--goldDark); font-weight:700; font-size:11px; letter-spacing:2px; text-transform:uppercase; margin:0 0 8px;">Extra Curricular Activities</p>
                  <p style="color:var(--darkText); font-size:13px; margin:0; line-height:1.7;">${currentSyllabus.extra}</p>
              </div>
          </div>
      `;
  }

  let rowsHtml = syllabusData.map((s, i) => `
      <tr style="background:${i%2===0?'var(--lightGray)':'var(--white)'}; border-bottom:1px solid var(--border);">
          <td style="font-weight:700; color:var(--navy);">${s.classes}</td>
          <td style="color:var(--gray);">${s.board}</td>
          <td style="color:var(--gray);">${s.subjects}</td>
          <td style="color:var(--gray);">${s.extra}</td>
      </tr>
  `).join('');

  return `
      ${makePageBanner("Syllabus & Courses", "Academics")}
      <div style="max-width:900px; margin:3rem auto; padding:0 2rem; box-sizing:border-box;">
          <div style="display:flex; gap:8px; margin-bottom:2rem; flex-wrap:wrap; justify-content:center;">${tabsHtml}</div>
          ${activeCardHtml}
          
          <div style="margin-top:2rem;">
              <h3 style="font-family:'Playfair Display',serif; color:var(--navy); font-size:20px; margin:0 0 1rem;">All Classes at a Glance</h3>
              <div class="responsive-table-scroll">
                  <table class="data-table">
                      <thead>
                          <tr><th>Classes</th><th>Board</th><th>Subjects</th><th>Activities</th></tr>
                      </thead>
                      <tbody>${rowsHtml}</tbody>
                  </table>
              </div>
          </div>
      </div>
  `;
}

function switchSyllabusTab(idx) {
  currentSyllabusTab = idx;
  navigateTo("syllabus");
}

function renderTimetablePage() {
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const periods = ["8:00 – 8:45","8:45 – 9:30","9:30 – 10:15","Break","10:30 – 11:15","11:15 – 12:00","Lunch","1:00 – 1:45","1:45 – 2:30"];
  
  let matrixHtml = '';
  matrixHtml += `<div style="background:var(--navy); color:#white; padding:10px 8px; font-weight:700; border-radius:4px; color:#fff;">Period / Day</div>`;
  days.forEach(d => {
      matrixHtml += `<div style="background:var(--navy); color:#white; padding:10px 6px; font-weight:700; text-align:center; border-radius:4px; color:#fff;">${d}</div>`;
  });

  periods.forEach(p => {
      let isSpecial = p.includes("Break") || p.includes("Lunch");
      matrixHtml += `<div style="background:${isSpecial?'var(--goldLight)':'var(--lightGray)'}; padding:10px 8px; font-weight:${isSpecial?700:500}; color:var(--darkText); border-radius:4px; font-size:11px;">${p}</div>`;
      
      days.forEach(d => {
          matrixHtml += `
              <div style="background:${isSpecial?'var(--goldLight)':'var(--white)'}; border:1px solid var(--border); padding:10px 6px; text-align:center; color:var(--gray); border-radius:4px; font-size:11px;">
                  ${p.includes("Break") ? "☕ Break" : p.includes("Lunch") ? "🍱 Lunch" : "—"}
              </div>
          `;
      });
  });

  return `
      ${makePageBanner("School Time Table", "Academic Schedule")}
      <div style="max-width:960px; margin:3rem auto; padding:0 2rem; box-sizing:border-box;">
          <div class="card">
              <div style="display:grid; grid-template-columns:120px repeat(6, 1fr); gap:2px; font-size:12px;">
                  ${matrixHtml}
              </div>
              <p style="color:var(--gray); font-size:12px; margin-top:1rem; text-align:center;">* Detailed class-wise timetable available at the school office and on the notice board.</p>
          </div>
      </div>
  `;
}

function renderGalleryPage() {
  const cats = ["All", ...new Set(galleryData.map(g => g.cat))];
  let filterButtons = cats.map(c => `
      <button onclick="filterGallery('${c}')" style="padding:7px 18px; border-radius:20px; border:2px solid ${currentGalleryFilter===c?'var(--navy)':'var(--border)'}; background:${currentGalleryFilter===c?'var(--navy)':'var(--white)'}; color:${currentGalleryFilter===c?'var(--white)':'var(--gray)'}; font-family:'Poppins',sans-serif; font-weight:600; font-size:12px; cursor:pointer;">
          ${c}
      </button>
  `).join('');

  let filtered = currentGalleryFilter === "All" ? galleryData : galleryData.filter(g => g.cat === currentGalleryFilter);
  let itemsHtml = filtered.map(g => `
      <div class="card" onclick="openLightbox(${g.id})" style="padding:0; overflow:hidden; cursor:pointer; position:relative; aspect-ratio:4/3; border-radius:12px; box-shadow:0 4px 15px var(--shadow);">
          <img src="${g.url}" alt="${g.title}" style="width:100%; height:100%; object-fit:cover; display:block;">
          <div style="position:absolute; bottom:0; left:0; right:0; background:linear-gradient(transparent, rgba(0,0,0,0.75)); padding:1.5rem 0.8rem 0.6rem;">
              <p style="margin:0; color:#fff; font-size:12px; font-weight:600;">${g.title}</p>
              <span class="tag" style="font-size:9px; background:rgba(255,255,255,0.2); color:#fff; border:none; padding:1px 6px;">${g.cat}</span>
          </div>
      </div>
  `).join('');

  return `
      ${makePageBanner("School Gallery", "Memories")}
      <div style="max-width:960px; margin:3rem auto; padding:0 2rem; box-sizing:border-box;">
          <div style="display:flex; gap:8px; margin-bottom:1.5rem; flex-wrap:wrap; justify-content:center;">${filterButtons}</div>
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px,1fr)); gap:14px;">${itemsHtml}</div>
      </div>
  `;
}

function filterGallery(cat) {
  currentGalleryFilter = cat;
  navigateTo("gallery");
}

function renderFeesPage() {
  let rows = feesData.map((f, i) => `
      <tr style="background:${i%2===0?'var(--lightGray)':'var(--white)'}; border-bottom:1px solid var(--border);" onmouseenter="this.style.background='var(--tealLight)'" onmouseleave="this.style.background='${i%2===0?'var(--lightGray)':'var(--white)'}'">
          <td style="padding:12px 16px; font-weight:700; color:var(--navy);">Class ${f.cls}</td>
          <td>₹${f.term.toLocaleString()}</td>
          <td>₹${f.annual.toLocaleString()}</td>
          <td>₹${f.transport.toLocaleString()}</td>
          <td style="font-weight:700; color:var(--teal); font-size:15px;">₹${f.total.toLocaleString()}</td>
      </tr>
  `).join('');

  return `
      ${makePageBanner("School Fees Structure", "Fee Details 2024-25")}
      <div style="max-width:860px; margin:3rem auto; padding:0 2rem; box-sizing:border-box;">
          <div style="background:var(--goldLight); border:1px solid rgba(245,166,35,0.5); border-radius:10px; padding:1rem 1.2rem; margin-bottom:1.5rem; display:flex; gap:12px; align-items:center;">
              <span style="font-size:24px;">ℹ️</span>
              <p style="margin:0; font-size:13px; color:var(--darkText); line-height:1.6;">Fees are payable in 3 terms. Transport fee is additional and optional. Special concession available for siblings and meritorious students. Contact office for details.</p>
          </div>
          <div class="card">
              <div class="responsive-table-scroll">
                  <table class="data-table fees-table">
                      <thead>
                          <tr>
                              <th>Class</th><th>Term Fee (×3)</th><th>Annual Fee</th><th>Transport (Annual)</th><th>Grand Total</th>
                          </tr>
                      </thead>
                      <tbody>${rows}</tbody>
                  </table>
              </div>
          </div>
          
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; margin-top:1.5rem;">
              <div class="card" style="text-align:center; border-top:4px solid var(--teal);">
                  <div style="font-size:28px; margin-bottom:6px;">📅</div><h4 style="color:var(--navy); margin:0 0 4px; font-size:15px;">Term 1</h4><p style="color:var(--gray); font-size:12px; margin:0; line-height:1.5;">April – July (Fee Due: March 31)</p>
              </div>
              <div class="card" style="text-align:center; border-top:4px solid var(--teal);">
                  <div style="font-size:28px; margin-bottom:6px;">📅</div><h4 style="color:var(--navy); margin:0 0 4px; font-size:15px;">Term 2</h4><p style="color:var(--gray); font-size:12px; margin:0; line-height:1.5;">August – November (Fee Due: July 31)</p>
              </div>
              <div class="card" style="text-align:center; border-top:4px solid var(--teal);">
                  <div style="font-size:28px; margin-bottom:6px;">📅</div><h4 style="color:var(--navy); margin:0 0 4px; font-size:15px;">Term 3</h4><p style="color:var(--gray); font-size:12px; margin:0; line-height:1.5;">Dec – March (Fee Due: Nov 30)</p>
              </div>
          </div>
      </div>
  `;
}

function renderAdmissionsPage() {
  const steps = [
      {n:1,title:"Download Form",desc:"Download or collect the admission form from the school office or this website."},
      {n:2,title:"Fill & Submit",desc:"Complete the form and submit with required documents to the school office."},
      {n:3,title:"Entrance Test",desc:"Students (Classes V and above) appear for a simple entrance assessment."},
      {n:4,title:"Interview",desc:"A brief interaction with the Principal and class teacher."},
      {n:5,title:"Fee Payment",desc:"Pay the admission and term fees to confirm your child's seat."},
      {n:6,title:"Welcome!",desc:"Receive the school uniform kit, books list, and begin the journey!"},
  ];
  const docs = ["Transfer Certificate (for Class II and above)","Birth Certificate / Aadhar Card","Passport size photographs (4 nos.)","Previous class Mark Sheet","Residence Proof","Caste Certificate (if applicable for concession)"];
  
  let stepsHtml = steps.map(s => `
      <div style="display:flex; gap:1rem; align-items:flex-start; margin-bottom:1rem;">
          <div style="width:40px; height:40px; border-radius:50%; background:var(--navy); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:16px; flex-shrink:0;">${s.n}</div>
          <div>
              <h4 style="color:var(--navy); margin:8px 0 4px; font-size:15px;">${s.title}</h4>
              <p style="color:var(--gray); font-size:13px; margin:0; line-height:1.6;">${s.desc}</p>
          </div>
      </div>
  `).join('');

  let docsHtml = docs.map(d => `
      <li style="padding:7px 0; border-bottom:1px solid var(--border); font-size:12px; color:var(--gray); display:flex; gap:8px;">
          <span style="color:var(--teal); flex-shrink:0;">✓</span>${d}
      </li>
  `).join('');

  return `
      ${makePageBanner("Admissions 2025-26", "Join Our Family")}
      <div style="max-width:900px; margin:3rem auto; padding:0 2rem; box-sizing:border-box;">
          <div style="background:linear-gradient(135deg, var(--teal), var(--navy)); border-radius:14px; padding:2rem; color:#fff; text-align:center; margin-bottom:2.5rem;">
              <h2 style="font-family:'Playfair Display',serif; font-size:26px; margin:0 0 8px; color:var(--gold);">Admissions Now Open!</h2>
              <p style="opacity:0.9; font-size:14px; margin-bottom:1rem;">Applications are being accepted for LKG to Class X (subject to seat availability).</p>
              <p style="font-size:13px; opacity:0.8; margin:0;">📅 Last Date: 31st March 2025 &nbsp;|&nbsp; 📞 Call: +91 98765 43210</p>
          </div>
          
          <div class="content-sidebar-layout" style="margin:0; padding:0; width:100%; max-width:100%;">
              <div>
                  <h3 style="font-family:'Playfair Display',serif; color:var(--navy); font-size:22px; margin:0 0 1.5rem;">Admission Process</h3>
                  <div>${stepsHtml}</div>
              </div>
              <div>
                  <div class="card" style="border-top:5px solid var(--gold);">
                      <h4 style="font-family:'Playfair Display',serif; color:var(--navy); font-size:17px; margin:0 0 1rem;">📋 Required Documents</h4>
                      <ul style="margin:0; padding:0; list-style:none;">${docsHtml}</ul>
                      <button class="btn btn-primary" onclick="alert('Please visit the school office or call +91 98765 43210 to get the admission form.')" style="width:100%; margin-top:1rem;">Download Form</button>
                  </div>
              </div>
          </div>
      </div>
  `;
}

function renderContactPage(isSent = false) {
  let mainFormHtml = `
      <h3 style="font-family:'Playfair Display',serif; color:var(--navy); font-size:18px; margin:0 0 1rem;">Send Us a Message</h3>
      <form id="contact-form-el" onsubmit="handleContactSubmit(event)">
          <div class="form-input-group">
              <label>Name</label><input type="text" id="c-name" required>
          </div>
          <div class="form-input-group">
              <label>Email</label><input type="email" id="c-email" required>
          </div>
          <div class="form-input-group">
              <label>Phone</label><input type="tel" id="c-phone">
          </div>
          <div class="form-input-group">
              <label>Subject</label><input type="text" id="c-subject">
          </div>
          <div class="form-input-group">
              <label>Message</label><textarea id="c-msg" rows="4"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%; margin-top:0.5rem;">Send Message →</button>
      </form>
  `;

  let successHtml = `
      <div style="text-align:center; padding:2rem;">
          <div style="font-size:64px; margin-bottom:1rem;">✅</div>
          <h3 style="color:var(--green); font-family:'Playfair Display',serif; margin:0 0 0.5rem;">Message Sent!</h3>
          <p style="color:var(--gray); font-size:14px; margin-bottom:1.5rem;">Thank you for reaching out. We'll get back to you within 24 hours.</p>
          <button class="btn btn-primary btn-small" onclick="resetContactForm()">Send Another</button>
      </div>
  `;

  return `
      ${makePageBanner("Contact Us", "Get in Touch")}
      <div style="max-width:960px; margin:3rem auto; padding:0 2rem; box-sizing:border-box;">
          <div class="content-sidebar-layout" style="margin:0; padding:0; width:100%; max-width:100%; grid-template-columns: 1fr 1.5fr;">
              <div>
                  <h3 style="font-family:'Playfair Display',serif; color:var(--navy); font-size:22px; margin:0 0 1.5rem;">Find Us</h3>
                  <div style="display:flex; gap:12px; margin-bottom:1.2rem; align-items:flex-start;">
                      <div style="width:42px; height:42px; border-radius:50%; background:var(--tealLight); display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0;">📍</div>
                      <div><p style="font-weight:700; color:var(--navy); margin:0 0 2px; font-size:13px;">Address</p><p style="color:var(--gray); margin:0; font-size:13px; line-height:1.6;">123, Shakespeare Road, Anna Nagar, Chennai – 600 040, Tamil Nadu</p></div>
                  </div>
                  <div style="display:flex; gap:12px; margin-bottom:1.2rem; align-items:flex-start;">
                      <div style="width:42px; height:42px; border-radius:50%; background:var(--tealLight); display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0;">📞</div>
                      <div><p style="font-weight:700; color:var(--navy); margin:0 0 2px; font-size:13px;">Phone</p><p style="color:var(--gray); margin:0; font-size:13px; line-height:1.6;">+91 98765 43210 / +91 44 2345 6789</p></div>
                  </div>
                  <div style="display:flex; gap:12px; margin-bottom:1.2rem; align-items:flex-start;">
                      <div style="width:42px; height:42px; border-radius:50%; background:var(--tealLight); display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0;">✉️</div>
                      <div><p style="font-weight:700; color:var(--navy); margin:0 0 2px; font-size:13px;">Email</p><p style="color:var(--gray); margin:0; font-size:13px; line-height:1.6;">info@shakespeakeschool.edu.in</p></div>
                  </div>
                  <div style="display:flex; gap:12px; margin-bottom:1.2rem; align-items:flex-start;">
                      <div style="width:42px; height:42px; border-radius:50%; background:var(--tealLight); display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0;">🕐</div>
                      <div><p style="font-weight:700; color:var(--navy); margin:0 0 2px; font-size:13px;">Office Hours</p><p style="color:var(--gray); margin:0; font-size:13px; line-height:1.6;">Mon – Sat: 8:00 AM – 4:30 PM</p></div>
                  </div>
              </div>
              <div class="card" id="contact-card-box">
                  ${isSent ? successHtml : mainFormHtml}
              </div>
          </div>
      </div>
  `;
}

function handleContactSubmit(e) {
  e.preventDefault();
  document.getElementById("contact-card-box").innerHTML = renderContactPage(true);
}
function resetContactForm() {
  navigateTo("contact");
}