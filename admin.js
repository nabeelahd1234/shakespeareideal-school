/* ── ADMIN LOGIN PORTAL VIEWS ───────────────────────────────────────────── */
function renderLoginPage() {
    return `
        <div class="login-screen-bg">
            <div class="login-card">
                <div style="text-align:center; margin-bottom:1.5rem;">
                    <div style="width:64px; height:64px; border-radius:50%; background:linear-gradient(135deg, var(--navy), var(--teal)); display:flex; align-items:center; justify-content:center; font-size:28px; margin:0 auto 1rem;">🔐</div>
                    <h2 style="font-family:'Playfair Display',serif; color:var(--navy); margin:0; font-size:22px;">Admin Portal</h2>
                    <p style="color:var(--gray); font-size:13px; margin-top:6px;">Shakespeare Ideal School Panel</p>
                </div>
                <div style="margin-bottom:1rem;">
                    <label style="display:block; font-weight:700; color:var(--darkText); font-size:12px; margin-bottom:6px;">Username</label>
                    <input type="text" id="admin-user" class="login-input-element" onkeydown="if(event.key==='Enter') executeLogin()">
                </div>
                <div style="margin-bottom:1rem;">
                    <label style="display:block; font-weight:700; color:var(--darkText); font-size:12px; margin-bottom:6px;">Password</label>
                    <input type="password" id="admin-pass" class="login-input-element" onkeydown="if(event.key==='Enter') executeLogin()">
                </div>
                <p id="login-error-msg" style="color:var(--red); font-size:12px; margin-bottom:0.8rem; text-align:center; display:none;"></p>
                <button onclick="executeLogin()" class="login-submit-action">Login to Admin →</button>
            </div>
        </div>
    `;
  }
  
  function executeLogin() {
    let u = document.getElementById("admin-user").value;
    let p = document.getElementById("admin-pass").value;
    let errMsg = document.getElementById("login-error-msg");
  
    if (u === "admin" && p === "shakespeare@123") {
        document.getElementById("public-layout").style.display = "none";
        document.getElementById("admin-layout").style.display = "block";
        switchAdminSection("dashboard");
    } else {
        errMsg.innerText = "Invalid credentials.";
        errMsg.style.display = "block";
    }
  }
  
  function logoutAdmin() {
    document.getElementById("admin-layout").style.display = "none";
    document.getElementById("public-layout").style.display = "block";
    navigateTo("home");
  }
  
  /* ── ADMIN INTERFACE PANEL NAVIGATION ROUTER ──────────────────────────────── */
  function switchAdminSection(sectionKey) {
    currentAdminSection = sectionKey;
    document.querySelectorAll(".admin-nav-item").forEach(btn => {
        if(btn.getAttribute("data-sec") === sectionKey) btn.classList.add("active");
        else btn.classList.remove("active");
    });
  
    let paneTitle = document.getElementById("admin-section-title");
    let adminView = document.getElementById("admin-panel-view");
    paneTitle.innerText = sectionKey.toUpperCase();
  
    switch(sectionKey) {
        case "dashboard": renderAdminDashboard(adminView); break;
        case "gallery": renderAdminGallery(adminView); break;
        case "fees": renderAdminFees(adminView); break;
        case "syllabus": renderAdminSyllabus(adminView); break;
        case "announcements": renderAdminAnnouncements(adminView); break;
        case "students": renderAdminStudents(adminView); break;
        case "teachers": renderAdminTeachers(adminView); break;
    }
  }
  
  function renderAdminDashboard(target) {
    target.innerHTML = `
        <div class="admin-dash-summary-row" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
            <div class="admin-dash-stat-card" style="border-top:4px solid var(--teal);" onclick="switchAdminSection('gallery')"><h3>🖼️ ${galleryData.length}</h3><p>Gallery Items</p></div>
            <div class="admin-dash-stat-card" style="border-top:4px solid var(--navy);" onclick="switchAdminSection('students')"><h3>👨‍🎓 ${studentsData.length}</h3><p>Students</p></div>
            <div class="admin-dash-stat-card" style="border-top:4px solid var(--purple);" onclick="switchAdminSection('teachers')"><h3>👩‍🏫 ${teachersData.length}</h3><p>Teachers List</p></div>
            <div class="admin-dash-stat-card" style="border-top:4px solid var(--gold);" onclick="switchAdminSection('announcements')"><h3>📢 ${announcementsData.length}</h3><p>Notices</p></div>
        </div>
    `;
  }
  
  /* ── IMAGE GALLERY MODULE: LOCAL FILE UPLOADS IMPLEMENTATION ─────────────── */
  function renderAdminGallery(target) {
    let imagesHtml = galleryData.map(g => `
        <div class="card" style="padding:0; overflow:hidden;">
            <img src="${g.url}" style="width:100%; aspect-ratio:4/3; object-fit:cover; display:block;">
            <div style="padding:0.8rem;">
                <p style="font-weight:600; color:var(--navy); font-size:13px; margin:0 0 4px;">${g.title}</p>
                <span class="tag">${g.cat}</span>
                <div style="display:flex; gap:6px; margin-top:0.6rem;">
                    <button class="btn btn-outline btn-small" onclick="launchGalleryForm(${g.id})">Edit</button>
                    <button class="btn btn-danger btn-small" onclick="deleteGalleryItem(${g.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
  
    target.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
            <p style="color:var(--gray); font-size:13px; margin:0;">${galleryData.length} images in flat file storage</p>
            <button class="btn btn-primary btn-small" onclick="launchGalleryForm(null)">+ Upload Local Image</button>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:1rem;">${imagesHtml}</div>
    `;
  }
  
  function launchGalleryForm(id = null) {
    let item = galleryData.find(g => g.id === id) || {title:"", url:"", cat:"Events"};
    let modal = document.getElementById("global-modal");
  
    modal.innerHTML = `
        <div class="modal-admin-frame" onclick="event.stopPropagation()">
            <h3>${id !== null ? 'Edit Image Profile' : 'Upload Local Image File'}</h3>
            <div class="form-input-group"><label>Image Title</label><input type="text" id="form-g-title" value="${item.title}"></div>
            <div class="form-input-group">
                <label>Select From Computer Storage</label>
                <input type="file" id="form-g-file" accept="image/*">
            </div>
            <div class="form-input-group">
                <label>Category</label>
                <select id="form-g-cat">
                    <option ${item.cat==='Events'?'selected':''}>Events</option>
                    <option ${item.cat==='Sports'?'selected':''}>Sports</option>
                    <option ${item.cat==='Academics'?'selected':''}>Academics</option>
                </select>
            </div>
            <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:1rem;">
                <button class="btn btn-outline btn-small" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary btn-small" onclick="commitGalleryForm(${id})">Process Save</button>
            </div>
        </div>
    `;
    modal.style.display = "flex";
  }
  
  async function commitGalleryForm(id) {
    let title = document.getElementById("form-g-title").value;
    let cat = document.getElementById("form-g-cat").value;
    let fileInput = document.getElementById("form-g-file");
    let finalUrl = galleryData.find(g => g.id === id)?.url || "";
  
    if (fileInput.files.length > 0) {
        let formData = new FormData();
        formData.append('image', fileInput.files[0]);
        let res = await fetch('/api/upload', { method: 'POST', body: formData }).then(r => r.json());
        finalUrl = res.url;
    }
  
    if (!title || !finalUrl) return alert("Title and Image File selection required");
  
    if (id === null) {
        galleryData.push({ id: Date.now(), title, url: finalUrl, cat });
    } else {
        let entry = galleryData.find(g => g.id === id);
        if(entry) { entry.title = title; entry.url = finalUrl; entry.cat = cat; }
    }
  
    await saveFlatFileData('gallery', galleryData);
    closeModal();
    switchAdminSection("gallery");
  }
  
  function deleteGalleryItem(id) {
    if(confirm("Delete this element from flat file?")) {
        galleryData = galleryData.filter(g => g.id !== id);
        saveFlatFileData('gallery', galleryData).then(() => switchAdminSection("gallery"));
    }
  }
  
  /* ── STUDENT DETAILS MODULE MANIPULATION LAYOUT (CRUD) ───────────────────── */
  function renderAdminStudents(target) {
    let trs = studentsData.map(s => `
        <tr>
            <td><strong>${s.rollNo}</strong></td>
            <td>${s.name}</td>
            <td>Class ${s.classGrade}</td>
            <td>${s.guardian}</td>
            <td>
                <button class="btn btn-outline btn-small" onclick="launchStudentForm(${s.id})">Edit</button>
                <button class="btn btn-danger btn-small" onclick="deleteStudent(${s.id})">Delete</button>
            </td>
        </tr>
    `).join('');
  
    target.innerHTML = `
        <div style="display:flex; justify-content:between; align-items:center; margin-bottom:1rem;">
            <h4>Student Roster Records</h4>
            <button class="btn btn-primary btn-small" onclick="launchStudentForm(null)">+ Add Student Details</button>
        </div>
        <div class="card"><table class="data-table"><thead><tr><th>Roll No</th><th>Name</th><th>Grade</th><th>Guardian</th><th>Actions</th></tr></thead><tbody>${trs}</tbody></table></div>
    `;
  }
  
  function launchStudentForm(id = null) {
    let s = studentsData.find(x => x.id === id) || {name:"", rollNo:"", classGrade:"", guardian:""};
    let modal = document.getElementById("global-modal");
    modal.innerHTML = `
        <div class="modal-admin-frame" onclick="event.stopPropagation()">
            <h3>Student Detail Configuration</h3>
            <div class="form-input-group"><label>Full Name</label><input type="text" id="s-name" value="${s.name}"></div>
            <div class="form-input-group"><label>Roll Number ID</label><input type="text" id="s-roll" value="${s.rollNo}"></div>
            <div class="form-input-group"><label>Class Grade</label><input type="text" id="s-grade" value="${s.classGrade}"></div>
            <div class="form-input-group"><label>Guardian Mobile/Name</label><input type="text" id="s-guard" value="${s.guardian}"></div>
            <button class="btn btn-primary" onclick="commitStudentForm(${id})">Save Student Profile</button>
        </div>
    `;
    modal.style.display = "flex";
  }
  
  async function commitStudentForm(id) {
    let name = document.getElementById("s-name").value;
    let rollNo = document.getElementById("s-roll").value;
    let classGrade = document.getElementById("s-grade").value;
    let guardian = document.getElementById("s-guard").value;
  
    if (id === null) {
        studentsData.push({ id: Date.now(), name, rollNo, classGrade, guardian });
    } else {
        let entry = studentsData.find(x => x.id === id);
        if(entry) Object.assign(entry, { name, rollNo, classGrade, guardian });
    }
    await saveFlatFileData('students', studentsData);
    closeModal();
    switchAdminSection("students");
  }
  
  function deleteStudent(id) {
    if(confirm("Permanently wipe record?")) {
        studentsData = studentsData.filter(x => x.id !== id);
        saveFlatFileData('students', studentsData).then(() => switchAdminSection("students"));
    }
  }
  
  /* ── TEACHER DETAILS MODULE MANIPULATION LAYOUT (CRUD) ───────────────────── */
  function renderAdminTeachers(target) {
    let trs = teachersData.map(t => `
        <tr>
            <td><strong>${t.name}</strong></td>
            <td><span class="tag">${t.subject}</span></td>
            <td>${t.email}</td>
            <td>
                <button class="btn btn-outline btn-small" onclick="launchTeacherForm(${t.id})">Edit</button>
                <button class="btn btn-danger btn-small" onclick="deleteTeacher(${t.id})">Delete</button>
            </td>
        </tr>
    `).join('');
  
    target.innerHTML = `
        <div style="display:flex; justify-content:between; align-items:center; margin-bottom:1rem;">
            <h4>Faculty & Staff Records</h4>
            <button class="btn btn-primary btn-small" onclick="launchTeacherForm(null)">+ Add Teacher Entry</button>
        </div>
        <div class="card"><table class="data-table"><thead><tr><th>Name</th><th>Department Core</th><th>Email Channel</th><th>Actions</th></tr></thead><tbody>${trs}</tbody></table></div>
    `;
  }
  
  function launchTeacherForm(id = null) {
    let t = teachersData.find(x => x.id === id) || {name:"", subject:"", email:""};
    let modal = document.getElementById("global-modal");
    modal.innerHTML = `
        <div class="modal-admin-frame" onclick="event.stopPropagation()">
            <h3>Faculty Configuration</h3>
            <div class="form-input-group"><label>Teacher Name</label><input type="text" id="t-name" value="${t.name}"></div>
            <div class="form-input-group"><label>Core Specialization Subject</label><input type="text" id="t-subj" value="${t.subject}"></div>
            <div class="form-input-group"><label>Email Address</label><input type="email" id="t-email" value="${t.email}"></div>
            <button class="btn btn-primary" onclick="commitTeacherForm(${id})">Save Profile</button>
        </div>
    `;
    modal.style.display = "flex";
  }
  
  async function commitTeacherForm(id) {
    let name = document.getElementById("t-name").value;
    let subject = document.getElementById("t-subj").value;
    let email = document.getElementById("t-email").value;
  
    if (id === null) {
        teachersData.push({ id: Date.now(), name, subject, email });
    } else {
        let entry = teachersData.find(x => x.id === id);
        if(entry) Object.assign(entry, { name, subject, email });
    }
    await saveFlatFileData('teachers', teachersData);
    closeModal();
    switchAdminSection("teachers");
  }
  
  function deleteTeacher(id) {
    if(confirm("Remove instructor profile from file?")) {
        teachersData = teachersData.filter(x => x.id !== id);
        saveFlatFileData('teachers', teachersData).then(() => switchAdminSection("teachers"));
    }
  }
  
  /* ── PRESERVED LEGACY CRUDS LINKED INTO FLAT STORAGE SYNCS ───────────────── */
  function renderAdminFees(t) {
    t.innerHTML = `<div class="card"><h4>Fees Management Dashboard</h4><p>Flat storage linked records tally: <strong>${feesData.length} entries</strong>.</p></div>`;
  }
  function renderAdminSyllabus(t) {
    t.innerHTML = `<div class="card"><h4>Syllabus Profiles Control</h4><p>Total mapped course profiles: <strong>${syllabusData.length} entries</strong>.</p></div>`;
  }
  function renderAdminAnnouncements(t) {
    t.innerHTML = `<div class="card"><h4>Active Notice Configuration</h4><p>Live ticker entries count: <strong>${announcementsData.length} announcements</strong>.</p></div>`;
  }