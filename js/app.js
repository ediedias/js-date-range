const dateRangeInput = document.getElementById('date-range-input');
const calendarContainer = document.getElementById('calendar-container');

// Toggle calendar display on input click
dateRangeInput.addEventListener('click', (event) => {
     calendarContainer.style.display = calendarContainer.style.display === 'none' ? 'block' : 'none';
     event.stopPropagation();
});

document.addEventListener('click', (event) => {
     if (!calendarContainer.contains(event.target) && event.target !== dateRangeInput) {
          calendarContainer.style.display = 'none';
     }
});

document.addEventListener('keydown', (event) => {
     if (event.key === 'Escape') {
          calendarContainer.style.display = 'none';
     }
})

// Get the current month and year
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let startDate = null;
let endDate = null;

// Render the initial calendar
renderCalendar(currentMonth, currentYear);

function renderCalendar(month, year) {
     calendarContainer.innerHTML = ''; // Clear any previous content

     const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

     // Create a header for the month and year
     const header = document.createElement('div');
     header.classList.add('calendar-header');

     const prevButton = document.createElement('button');
     prevButton.textContent = '<';
     prevButton.addEventListener('click', () => changeMonth('prev'));

     const nextButton = document.createElement('button');
     nextButton.textContent = '>';
     nextButton.addEventListener('click', () => changeMonth('next'));

     const monthYear = document.createElement('span');
     monthYear.textContent = `${monthNames[month]} ${year}`;

     header.appendChild(prevButton);
     header.appendChild(monthYear);
     header.appendChild(nextButton);     
     calendarContainer.appendChild(header);

     // Create a grid layout for days of the week
     const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
     const daysRow = document.createElement('div');
     daysRow.classList.add('calendar-days-row');

     daysOfWeek.forEach(day => {
          const dayElem = document.createElement('span');
          dayElem.classList.add('calendar-day');
          dayElem.textContent = day;
          daysRow.appendChild(dayElem);
     });
     calendarContainer.appendChild(daysRow);

     // Create the dates grid
     const datesGrid = document.createElement('div');
     datesGrid.classList.add('calendar-dates-grid');

     // Find the first dayof the month and the number of days in the month
     const firstDayOfMonth = new Date(year, month, 1).getDay();
     const daysInMonth = new Date(year, month + 1, 0).getDate();

     // Add blank spaces for days before the first day of the month
     for (let i = 0; i< firstDayOfMonth; i++) {
          const blankday = document.createElement('span');
          blankday.classList.add('calendar-date');
          datesGrid.appendChild(blankday);
     }

     // Populate the dates for the month
     for (let day = 1; day <= daysInMonth; day++) {
          const dateElem = document.createElement('span');
          dateElem.classList.add('calendar-date');
          dateElem.textContent = day;
          datesGrid.appendChild(dateElem);
     }

     calendarContainer.appendChild(datesGrid);
     addDateClickListeners();
     if (startDate && endDate) markRange();
}

function changeMonth(direction) {
     // Adjust the month and year based on the direction
     if (direction === 'prev') {
          currentMonth--;
          if (currentMonth < 0) {
               currentMonth = 11;
               currentYear--;
          }
     } else if (direction === 'next') {
          currentMonth++;
          if (currentMonth > 11) {
               currentMonth = 0;
               currentYear++;
          }
     }
     renderCalendar(currentMonth, currentYear);
}



function clearSelection() {
     startDate = null;
     endDate = null;
     const dateElements = document.querySelectorAll('.calendar-date');
     dateElements.forEach(elem => elem.classList.remove('selected', 'in-range'));
     dateRangeInput.value = '';
}

function updateInput() {
     if (startDate && endDate) {
         dateRangeInput.value = `${startDate.toDateString()} - ${endDate.toDateString()}`;
     }
}

function handleDateClick(event) {
     const clickedDay = parseInt(event.target.textContent);
     const clickedDate = new Date(currentYear, currentMonth, clickedDay);

     if (!startDate || (startDate && endDate)) {
          // Reset the selection if there's already a range 
          clearSelection();         
          startDate = clickedDate;
          event.target.classList.add('selected');
     } else if (clickedDate < startDate) {
          // If the clicked date is before the start date, update the start date
          clearSelection();
          startDate = clickedDate;
          event.target.classList.add('selected');
     } else {
          // Set the end date and mark the range
          endDate = clickedDate;
          markRange();          
     }
     updateInput();
}

function markRange() {
     const dateElements = document.querySelectorAll('.calendar-date');
     dateElements.forEach(elem => {
          const date = new Date(currentYear, currentMonth, parseInt(elem.textContent));

          if (startDate && endDate) {
               if (date > startDate && date < endDate) {
                    elem.classList.add('in-range');
               }

               if (date.getTime() === startDate.getTime() || date.getTime() === endDate.getTime()) {
                    elem.classList.add('selected');
               }
          }
     });

}

function addDateClickListeners() {
     const dateElements = document.querySelectorAll('.calendar-date');
     dateElements.forEach(elem => elem.addEventListener('click', handleDateClick));
}

