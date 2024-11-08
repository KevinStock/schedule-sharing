// app.js

const timeline = document.getElementById('timeline');
const timeBlocksData = [];
const startHour = 8;  // 8 AM
const endHour = 17;   // 5 PM

// Generate time blocks data
for (let hour = startHour; hour < endHour; hour++) {
  ['00', '30'].forEach(minute => {
    const startHour24 = hour;
    const startMinute = parseInt(minute);

    // Calculate end time
    let endHour24 = startHour24;
    let endMinute = startMinute + 30;
    if (endMinute >= 60) {
      endMinute -= 60;
      endHour24 += 1;
    }

    // Format start time
    const startHour12 = startHour24 % 12 || 12;
    const startAmPm = startHour24 >= 12 ? 'PM' : 'AM';
    const startMinuteStr = startMinute.toString().padStart(2, '0');
    const startTimeText = `${startHour12}:${startMinuteStr} ${startAmPm}`;

    // Format end time
    const endHour12 = endHour24 % 12 || 12;
    const endAmPm = endHour24 >= 12 ? 'PM' : 'AM';
    const endMinuteStr = endMinute.toString().padStart(2, '0');
    const endTimeText = `${endHour12}:${endMinuteStr} ${endAmPm}`;

    // Save time block data
    timeBlocksData.push({
      startTimeText,
      endTimeText,
      busy: false
    });
  });
}

// Render time blocks
function renderTimeBlocks() {
  timeline.innerHTML = ''; // Clear existing blocks
  let i = 0;
  while (i < timeBlocksData.length) {
    if (timeBlocksData[i].busy) {
      // Merge consecutive busy blocks
      let start = i;
      let end = i;
      while (end + 1 < timeBlocksData.length && timeBlocksData[end + 1].busy) {
        end++;
      }
      const block = document.createElement('div');
      block.classList.add('time-block', 'busy');
      block.innerText = `${timeBlocksData[start].startTimeText} - ${timeBlocksData[end].endTimeText} - Busy`;
      block.style.gridRow = `${start + 1} / ${end + 2}`;

      // Capture the current values of start and end
      const startIndex = start;
      const endIndex = end;

      block.addEventListener('click', () => {
        for (let j = startIndex; j <= endIndex; j++) {
          timeBlocksData[j].busy = false;
        }
        saveSchedule();
        renderTimeBlocks();
      });
      timeline.appendChild(block);
      i = end + 1;
    } else {
      // Free block
      const block = document.createElement('div');
      block.classList.add('time-block', 'free');
      block.innerText = `${timeBlocksData[i].startTimeText} - ${timeBlocksData[i].endTimeText} - Free`;
      block.style.gridRow = `${i + 1} / ${i + 2}`;

      // Capture the current value of i
      const index = i;

      block.addEventListener('click', () => {
        timeBlocksData[index].busy = true;
        saveSchedule();
        renderTimeBlocks();
      });
      timeline.appendChild(block);
      i++;
    }
  }
}

// Save schedule to LocalStorage
function saveSchedule() {
  const schedule = timeBlocksData.map(block => block.busy);
  localStorage.setItem('schedule', JSON.stringify(schedule));
}

// Load schedule from LocalStorage
function loadSchedule() {
  const schedule = JSON.parse(localStorage.getItem('schedule'));
  if (schedule) {
    schedule.forEach((isBusy, index) => {
      timeBlocksData[index].busy = isBusy;
    });
  }
  renderTimeBlocks();
}

// Reset schedule
function resetSchedule() {
  timeBlocksData.forEach(block => {
    block.busy = false;
  });
  saveSchedule();
  renderTimeBlocks();
}

// Generate image of the schedule
function generateImage() {
  const scheduleElement = document.getElementById('schedule');
  html2canvas(scheduleElement, { backgroundColor: null }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'schedule.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

// app.js

// Function to set the current date
function setCurrentDate() {
  const dateElement = document.getElementById('current-date');
  const now = new Date();
  const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });
  const day = now.getDate();
  const month = now.toLocaleDateString('en-US', { month: 'long' });
  const year = now.getFullYear();
  const formattedDate = `${weekday}, ${day} ${month} ${year}`;
  dateElement.innerText = formattedDate;
}

document.getElementById('export-btn').addEventListener('click', generateImage);
document.getElementById('reset-btn').addEventListener('click', resetSchedule);

// Load the schedule and set the date on page load
window.onload = function() {
  loadSchedule();
  setCurrentDate();
};