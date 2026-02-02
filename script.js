const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const createNewBtn = document.getElementById("createNewBtn");
const loverNameInput = document.getElementById("loverName");
const submitNameBtn = document.getElementById("submitName");

const questionText = document.getElementById("questionText");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
let noBtnActivated = false;
const finalText = document.getElementById("finalText");
const copyLinkBtn2 = document.getElementById("copyLinkBtn2");
const restartBtn = document.getElementById("restartBtn");

function getNameFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("name");
}
function getCreatorFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("shared");
  }

function setNameInURL(name) {
  const params = new URLSearchParams(window.location.search);
  params.set("name", name);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", newUrl);
}

function showStep(stepNumber) {
  step1.classList.add("hidden");
  step2.classList.add("hidden");
  step3.classList.add("hidden");

  if (stepNumber === 1) step1.classList.remove("hidden");
  if (stepNumber === 2) step2.classList.remove("hidden");
  if (stepNumber === 3) step3.classList.remove("hidden");
}

function updateQuestion(name) {
  questionText.innerHTML = `${name},<br/> will you be my Valentine? 💘`;
}

function getShareableLink() {
  return window.location.href+"&shared=1";
}

function isCreator() {
    const params = new URLSearchParams(window.location.search);
    return params.get("shared") === "1";
  }



async function copyLink() {
  try {
    await navigator.clipboard.writeText(getShareableLink());
    copyLinkBtn2.innerText = "✅ Link Copied!";
  } catch {
    alert("Copy failed 😅 Please copy from address bar.");
  }
}

// Floating hearts animation
function spawnHearts() {
  const heartsContainer = document.querySelector(".hearts");
  const emojis = ["💖", "💘", "💕", "❤️", "💝"];

  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    const left = Math.random() * 100;
    const duration = 4 + Math.random() * 3; // 4-7s
    const drift = (Math.random() * 160 - 80).toFixed(0) + "px"; // -80..+80

    heart.style.left = left + "vw";
    heart.style.animationDuration = duration + "s";
    heart.style.setProperty("--x", drift);

    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }, 300);
}

spawnHearts();

// Start: if URL has name, skip input
const urlName = getNameFromURL();
const urlCreator = getCreatorFromURL() == "1";
if (urlName && urlName.trim()) {
  const name = urlName.trim();
  showStep(2);
  if (isCreator()) {
    copyLinkBtn2.classList.add("hidden");
  } else {
    copyLinkBtn2.classList.remove("hidden");

  }
  updateQuestion(name);
}

// Submit name
submitNameBtn.addEventListener("click", () => {
  const name = loverNameInput.value.trim();

  if (!name) {
    alert("Enter a name first 😄");
    return;
  }

  setNameInURL(name);
showStep(2);
updateQuestion(name);
});

// No button runs away 😈 (hover + click for mobile)

  function moveNoButton() {
    if (!noBtnActivated) {
      // ✅ first time only: switch from normal to fixed
      const rect = noBtn.getBoundingClientRect();
      noBtn.style.position = "fixed";
      noBtn.style.left = rect.left + "px";
      noBtn.style.top = rect.top + "px";
      noBtn.style.zIndex = "9999";
      noBtnActivated = true;
    }
  
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
  
    const padding = 16;
  
    const viewportWidth = window.visualViewport
      ? window.visualViewport.width
      : window.innerWidth;
  
    const viewportHeight = window.visualViewport
      ? window.visualViewport.height
      : window.innerHeight;
  
    const minX = padding;
    const minY = padding;
  
    const maxX = viewportWidth - btnWidth - padding;
    const maxY = viewportHeight - btnHeight - padding;
  
    const x = Math.floor(minX + Math.random() * (maxX - minX));
    const y = Math.floor(minY + Math.random() * (maxY - minY));
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  }
  
  
  

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton); // mobile friendly

// YES -> Final page
yesBtn.addEventListener("click", () => {
  const name = (getNameFromURL() || loverNameInput.value.trim() || "My Love").trim();

  showStep(3);

  finalText.innerHTML = `
    <img src="celebration-gif.webp" alt="😍" style="width:100%;vertical-align:middle;" />
    <b>${name}</b> 😍<br><br>
    You just made my whole year 🥺✨<br><br>
    <span style="font-size:20px;">I LOVE YOU ❤️</span>
  `;
});

// Copy link buttons
copyLinkBtn2?.addEventListener("click", copyLink);

createNewBtn.addEventListener("click", () => {
    window.location.href = window.location.pathname;
  });
  
