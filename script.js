// Danh sách thành phố + offset UTC
const cities = [
  { name: "🇻🇳 Hanoi (GMT+7)", offset: 7 },
  { name: "🇯🇵 Tokyo (GMT+9)", offset: 9 },
  { name: "🇺🇸 New York (GMT-5)", offset: -5 },
  { name: "🇬🇧 London (GMT+0)", offset: 0 },
  { name: "🇦🇺 Sydney (GMT+10)", offset: 10 },
  { name: "🇫🇷 Paris (GMT+1)", offset: 1 }
];

const container = document.getElementById("clock-container");

// Tạo khung cho từng city
cities.forEach(city => {
  const div = document.createElement("div");
  div.className = "clock-card";
  div.innerHTML = `
    <div class="city">${city.name}</div>
    <div class="time" id="city-${city.offset}">--:--:--</div>
  `;
  container.appendChild(div);
});

// Hàm định dạng 12h AM/PM
function formatTime(hours, minutes, seconds) {
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // nếu =0 thì thành 12
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} ${ampm}`;
}

// Hàm cập nhật giờ
function updateClocks() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);

  cities.forEach(city => {
    const cityTime = new Date(utc + (3600000 * city.offset));
    const h = cityTime.getHours();
    const m = cityTime.getMinutes();
    const s = cityTime.getSeconds();
    document.getElementById(`city-${city.offset}`).textContent = formatTime(h, m, s);
  });
}

setInterval(updateClocks, 1000);
updateClocks();
