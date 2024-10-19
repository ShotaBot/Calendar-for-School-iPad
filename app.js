const calendarContainer = document.getElementById('calendar');
const monthYear = document.getElementById('monthYear');
const eventForm = document.getElementById('eventForm');
const eventTitleInput = document.getElementById('eventTitle');
const eventColorInput = document.getElementById('eventColor');
const addEventButton = document.getElementById('addEventButton');

let currentDate = new Date();
let events = {};

// イベントを追加する関数
function addEvent(date, title, color) {
    if (!events[date]) {
        events[date] = [];
    }
    events[date].push({ title, color });
    renderCalendar(); // イベント追加後にカレンダーを再描画
}

// カレンダーを描画する関数
function renderCalendar() {
    calendarContainer.innerHTML = ''; // カレンダーをクリア
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYear.textContent = `${year}年 ${month + 1}月`;
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // 曜日の名前を表示
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    weekdays.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        calendarContainer.appendChild(dayElement);
    });

    // 空白の日を表示
    for (let i = 0; i < firstDay.getDay(); i++) {
        calendarContainer.appendChild(document.createElement('div')); // 空白
    }

    // 各日付を表示
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dateString = `${year}-${month + 1}-${day}`;
        const dayElement = document.createElement('div');
        
        const dayOfWeek = new Date(year, month, day).getDay();
        let dayClass = '';
        if (dayOfWeek === 0) {
            dayClass = 'red';
        } else if (dayOfWeek === 6) {
            dayClass = 'blue';
        }

        dayElement.className = `day ${dayClass}`;
        dayElement.textContent = day;
        dayElement.onclick = () => showEventForm(dateString);

        // イベントがある場合は表示
        if (events[dateString]) {
            const eventList = document.createElement('div');
            eventList.style.fontSize = 'small';
            eventList.innerHTML = `<strong>イベント:</strong><br>${events[dateString].map(event => `<span style="color:${event.color}">${event.title}</span>`).join('<br>')}`;
            dayElement.appendChild(eventList);
        }

        calendarContainer.appendChild(dayElement);
    }
}

// イベント入力フォームを表示する関数
function showEventForm(date) {
    eventForm.style.display = 'block';
    addEventButton.onclick = () => {
        const title = eventTitleInput.value;
        const color = eventColorInput.value;
        addEvent(date, title, color);
        eventTitleInput.value = '';
        eventForm.style.display = 'none'; // フォームを非表示
    };
}

// 月の切り替え機能
document.getElementById('prevMonthButton').onclick = function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
};

document.getElementById('nextMonthButton').onclick = function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
};

// 初期表示
renderCalendar();