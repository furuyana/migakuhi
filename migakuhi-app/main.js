// main.js - ミガクヒ 日替わりタスク・進捗ロジック

// 例の習慣リスト
const morningTasks = [
  "白湯を飲む",
  "顔を洗う・保湿する",
  "鏡を見て笑顔チェック",
  "今日の自分を褒める"
];

const nightTasks = [
  "メイクを丁寧に落とす",
  "フェイスマッサージをする",
  "肩を回して深呼吸",
  "明日の服を準備する"
];

const specialTasks = [
  { task: "眉毛を整える", video: "https://www.youtube.com/watch?v=_4x1zxkFsKM" },
  { task: "姿勢を正すストレッチ", video: "https://www.youtube.com/watch?v=0MrmvTnMsJQ" },
  { task: "頭皮マッサージをする", video: "https://www.youtube.com/watch?v=ngI8U6jXTL8" },
  { task: "口角を上げる表情筋トレ", video: "https://www.youtube.com/watch?v=guRdV4L6OAs" },
  { task: "首肩ストレッチ", video: "https://www.youtube.com/watch?v=bt7aFHMI3q4" }
];

const totalDays = 30;

function loadTasks() {
  const today = getTodayIndex();
  document.getElementById("day-number").textContent = today + 1;

  renderTaskList("morning-tasks", morningTasks);
  renderTaskList("night-tasks", nightTasks);

  const special = specialTasks[today % specialTasks.length];
  document.getElementById("special-task").textContent = special.task;
  document.getElementById("video-link").href = special.video;

  updateProgress(today);
}

function renderTaskList(elementId, tasks) {
  const ul = document.getElementById(elementId);
  ul.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = getCheckedStatus(elementId + index);

    checkbox.addEventListener("change", () => {
      saveCheckedStatus(elementId + index, checkbox.checked);
      if (checkbox.checked) {
        li.classList.add("checked");
      } else {
        li.classList.remove("checked");
      }
    });

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(task));
    if (checkbox.checked) li.classList.add("checked");
    ul.appendChild(li);
  });
}

function saveCheckedStatus(key, value) {
  localStorage.setItem(key, value);
}

function getCheckedStatus(key) {
  return localStorage.getItem(key) === "true";
}

function getTodayIndex() {
  const start = localStorage.getItem("startDate");
  let startDate = start ? new Date(start) : new Date();

  if (!start) {
    localStorage.setItem("startDate", startDate.toISOString());
  }

  const now = new Date();
  const diff = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
  return Math.min(diff, totalDays - 1);
}

function updateProgress(day) {
  const stars = "\u2605".repeat(day + 1) + "\u2606".repeat(totalDays - day - 1);
  document.getElementById("progress").textContent = `${day + 1}/${totalDays}日習慣程度: ${stars}`;
}

window.addEventListener("load", loadTasks);
