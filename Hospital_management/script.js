const hospitals = [];
const doctors = [];
const patients = [];
const appointments = [];

// 📌 Hospital Registration
function registerHospital() {
  const name = document.getElementById('hospital-name').value;
  const location = document.getElementById('hospital-location').value;
  hospitals.push({ name, location, departments: [], revenue: 0 });
  updateHospitalSelect();
  alert(`Hospital ${name} registered.`);
}

// 📌 Doctor Registration
function registerDoctor() {
  const name = document.getElementById('doctor-name').value;
  const qualifications = document.getElementById('doctor-qualifications').value;
  const specs = document.getElementById('doctor-specializations').value.split(',');
  const experience = parseInt(document.getElementById('doctor-experience').value);
  const hospital = document.getElementById('hospital-select').value;
  const fee = parseFloat(document.getElementById('consultation-fee').value);

  doctors.push({ name, qualifications, specs, experience, hospital, fee, revenue: 0, bookings: 0 });
  updateDoctorSelect();
  alert(`Doctor ${name} registered.`);
}

// 📌 Patient Registration
function registerPatient() {
  const name = document.getElementById('patient-name').value;
  const gender = document.getElementById('patient-gender').value;
  const dob = document.getElementById('patient-dob').value;
  const id = document.getElementById('patient-id').value;

  patients.push({ name, gender, dob, id, history: [] });
  updatePatientSelect();
  alert(`Patient ${name} registered.`);
}

// 📌 Appointment Booking
function bookAppointment() {
  const patientId = document.getElementById('patient-select').value;
  const doctorName = document.getElementById('doctor-select').value;
  const datetime = document.getElementById('booking-time').value;
  const fee = parseFloat(document.getElementById('booking-fee').value);

  const doctor = doctors.find(d => d.name === doctorName);
  const patient = patients.find(p => p.id === patientId);

  // Check for conflicting slots
  const conflict = appointments.some(a => a.doctor === doctorName && a.datetime === datetime);
  if (conflict) return alert("Time slot already booked!");

  appointments.push({ patient: patientId, doctor: doctorName, hospital: doctor.hospital, datetime, fee });
  doctor.revenue += 0.6 * fee;
  doctor.bookings += 1;

  const hospital = hospitals.find(h => h.name === doctor.hospital);
  hospital.revenue += 0.4 * fee;

  patient.history.push({ doctor: doctorName, hospital: doctor.hospital, datetime, fee });
  alert("Appointment booked.");
}

// 📌 Dashboards
function showHospitalDashboard() {
  const output = hospitals.map(h => {
    const doctorList = doctors.filter(d => d.hospital === h.name).map(d => `🧑‍⚕️ ${d.name}`).join(', ');
    return `🏥 ${h.name} → Revenue: ₹${h.revenue.toFixed(2)} | Doctors: ${doctorList}`;
  }).join('<br>');
  document.getElementById('report-output').innerHTML = output;
}

function showDoctorDashboard() {
  const output = doctors.map(d => {
    return `👨‍⚕️ ${d.name} → Earnings: ₹${d.revenue.toFixed(2)} | Consultations: ${d.bookings} | Hospital: ${d.hospital}`;
  }).join('<br>');
  document.getElementById('report-output').innerHTML = output;
}

function showPatientHistory() {
  const output = patients.map(p => {
    const records = p.history.map(h => `Visited Dr. ${h.doctor} at ${h.hospital} on ${h.datetime} (₹${h.fee})`).join('<br>');
    return `<b>${p.name}</b>:<br>${records}`;
  }).join('<hr>');
  document.getElementById('report-output').innerHTML = output;
}

// 🔄 Update dropdowns
function updateHospitalSelect() {
  const select = document.getElementById('hospital-select');
  select.innerHTML = hospitals.map(h => `<option value="${h.name}">${h.name}</option>`).join('');
}
function updateDoctorSelect() {
  const select = document.getElementById('doctor-select');
  select.innerHTML = doctors.map(d => `<option value="${d.name}">${d.name}</option>`).join('');
}
function updatePatientSelect() {
  const select = document.getElementById('patient-select');
  select.innerHTML = patients.map(p => `<option value="${p.id}">${p.name} (${p.id})</option>`).join('');
}