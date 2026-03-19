// ── Calendar logic ────────────────────────────────────────
let currentDate = new Date(2026, 2, 1); // March 2026
let selectedDay = null;
let selectedSlot = null;

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const times = ['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM'];

function renderCal() {
  const grid = document.getElementById('cal-grid');
  const label = document.getElementById('cal-month');
  label.textContent = months[currentDate.getMonth()] + ' ' + currentDate.getFullYear();
  grid.innerHTML = '';
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0).getDate();
  const today = new Date(); today.setHours(0,0,0,0);

  for (let i = 0; i < firstDay; i++) {
    const el = document.createElement('div');
    el.className = 'cal-day empty';
    grid.appendChild(el);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const el = document.createElement('div');
    const thisDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
    const dow = thisDate.getDay();
    const isPast = thisDate < today;
    const isWeekend = dow === 0 || dow === 6;
    if (isPast || isWeekend) {
      el.className = 'cal-day past';
    } else {
      el.className = 'cal-day available';
      el.onclick = () => selectDay(d, el);
    }
    if (d === selectedDay) el.classList.add('selected');
    el.textContent = d;
    grid.appendChild(el);
  }
}

function selectDay(d, el) {
  document.querySelectorAll('.cal-day').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selectedDay = d;
  const dateStr = months[currentDate.getMonth()] + ' ' + d + ', ' + currentDate.getFullYear();
  document.getElementById('selected-date-label').textContent = 'Available times for ' + dateStr;
  renderSlots();
  document.getElementById('time-step').classList.add('visible');
  document.getElementById('form-step').classList.remove('visible');
}

function renderSlots() {
  const grid = document.getElementById('slots-grid');
  grid.innerHTML = '';
  const available = times.filter(() => Math.random() > 0.3);
  available.forEach(t => {
    const el = document.createElement('div');
    el.className = 'slot';
    el.textContent = t;
    el.onclick = () => selectSlot(t, el);
    grid.appendChild(el);
  });
}

function selectSlot(t, el) {
  document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  selectedSlot = t;
  document.getElementById('form-step').classList.add('visible');
  setTimeout(() => document.getElementById('form-step').scrollIntoView({behavior:'smooth', block:'nearest'}), 100);
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth()-1);
  selectedDay = null;
  document.getElementById('time-step').classList.remove('visible');
  document.getElementById('form-step').classList.remove('visible');
  renderCal();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth()+1);
  selectedDay = null;
  document.getElementById('time-step').classList.remove('visible');
  document.getElementById('form-step').classList.remove('visible');
  renderCal();
}

function confirmBooking() {
  document.getElementById('form-step').style.display = 'none';
  document.getElementById('cal-step').style.display = 'none';
  document.getElementById('time-step').style.display = 'none';
  document.getElementById('confirmed-step').style.display = 'block';
}

renderCal();

// ── FAQ ───────────────────────────────────────────────────
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── Scroll reveal ─────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
