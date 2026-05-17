/* ── IN-MEMORY LIVE APPLICATION STATE DRAWN FROM FLAT FILES ────────────────── */
let galleryData = [];
let feesData = [];
let syllabusData = [];
let announcementsData = [];
let studentsData = []; // New local file dataset
let teachersData = []; // New local file dataset

/* ── RE-SYNCHRONIZE DATA WITH LOCAL SERVER CONFIGURATIONS ──────────────────── */
async function loadAllFlatFileData() {
  try {
    galleryData = await fetch('/api/data/gallery').then(r => r.json());
    feesData = await fetch('/api/data/fees').then(r => r.json());
    syllabusData = await fetch('/api/data/syllabus').then(r => r.json());
    announcementsData = await fetch('/api/data/announcements').then(r => r.json());
    studentsData = await fetch('/api/data/students').then(r => r.json());
    teachersData = await fetch('/api/data/teachers').then(r => r.json());
  } catch (err) {
    console.error("Error synchronization stack with flat files:", err);
  }
}

async function saveFlatFileData(fileName, dataset) {
  await fetch(`/api/data/${fileName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataset)
  });
}

let currentPage = "home";
let currentAdminSection = "dashboard";
let currentSyllabusTab = 0;
let currentGalleryFilter = "All";