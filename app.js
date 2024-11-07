// Generate time blocks dynamically
const timeline = document.getElementById('timeline');
const timeBlocks = [];
const startHour = 9;  // 9 AM
const endHour = 17;   // 5 PM

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

    // Create time block
    const block = document.createElement('div');
    block.classList.add('time-block', 'free');
    block.dataset.time = `${startTimeText} - ${endTimeText}`;
    block.innerText = `${startTimeText} - ${endTimeText} - Free`;
    block.addEventListener('click', () => {
      block.classList.toggle('busy');
      block.classList.toggle('free');
      const statusText = block.classList.contains('busy') ? 'Busy' : 'Free';
      block.innerText = `${startTimeText} - ${endTimeText} - ${statusText}`;
      saveSchedule();
    });
    timeline.appendChild(block);
    timeBlocks.push(block);
  });
}

// Save schedule to LocalStorage
function saveSchedule() {
  const schedule = timeBlocks.map(block => block.classList.contains('busy'));
  localStorage.setItem('schedule', JSON.stringify(schedule));
}

// Load schedule from LocalStorage
function loadSchedule() {
  const schedule = JSON.parse(localStorage.getItem('schedule'));
  if (schedule) {
    schedule.forEach((isBusy, index) => {
      const block = timeBlocks[index];
      const timeRange = block.dataset.time;
      const statusText = isBusy ? 'Busy' : 'Free';
      block.classList.toggle('busy', isBusy);
      block.classList.toggle('free', !isBusy);
      block.innerText = `${timeRange} - ${statusText}`;
    });
  }
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

document.getElementById('export-btn').addEventListener('click', generateImage);

document.getElementById('reset-btn').addEventListener('click', () => {
  timeBlocks.forEach(block => {
    block.classList.remove('busy');
    block.classList.add('free');
    const timeRange = block.dataset.time;
    block.innerText = `${timeRange} - Free`;
  });
  saveSchedule();
});

// Load the schedule on page load
window.onload = loadSchedule;
