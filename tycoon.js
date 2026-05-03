const clickLevels = [
  { name: "Local Outreach", value: 1, cost: 0 },
  { name: "Youth Night", value: 5, cost: 75 },
  { name: "Sunday Service", value: 25, cost: 500 },
  { name: "Regional Conference", value: 100, cost: 3500 },
  { name: "Famous Church", value: 500, cost: 18000 },
  { name: "Arena Crusade", value: 2500, cost: 95000 }
];

const droppers = [
  {
    id: "invite-requests",
    name: "Invite Requests",
    cost: 60,
    income: 1,
    copy: "Church inbox starts filling up."
  },
  {
    id: "travel-team",
    name: "Travel Team",
    cost: 300,
    income: 6,
    copy: "Flights, hotels, and Sundays stay organized."
  },
  {
    id: "media-clips",
    name: "Media Clips",
    cost: 1500,
    income: 30,
    copy: "Short clips keep new invitations moving."
  },
  {
    id: "conference-circuit",
    name: "Conference Circuit",
    cost: 9000,
    income: 180,
    copy: "Youth and leader events stack the calendar."
  },
  {
    id: "global-crusade-calendar",
    name: "Global Crusade Calendar",
    cost: 50000,
    income: 1200,
    copy: "Nations, arenas, and outreach nights."
  }
];

const characterStages = [
  {
    minLevel: 0,
    src: "assets/tycoon-character-starter-720.png",
    alt: "Starter pixel art evangelist holding a microphone and Bible"
  },
  {
    minLevel: 3,
    src: "assets/tycoon-character-conference-720.png",
    alt: "Conference speaker pixel art evangelist holding a microphone"
  },
  {
    minLevel: 4,
    src: "assets/tycoon-character-senior-pastor-720.png",
    alt: "Senior pastor pixel art evangelist with diamond details holding a microphone and Bible"
  },
  {
    minLevel: 5,
    src: "assets/tycoon-character-god-tier-720.png",
    alt: "God tier pixel art evangelist with a glowing halo, microphone, and Bible"
  }
];

const state = {
  money: 0,
  totalEarned: 0,
  clickLevel: 0,
  ownedDroppers: new Set()
};

const elements = {
  money: document.querySelector("#money"),
  perClick: document.querySelector("#per-click"),
  perSecond: document.querySelector("#per-second"),
  tierName: document.querySelector("#tier-name"),
  clickLevelName: document.querySelector("#click-level-name"),
  preachValue: document.querySelector("#preach-value"),
  preachButton: document.querySelector("#preach-button"),
  buyClickUpgrade: document.querySelector("#buy-click-upgrade"),
  nextUpgradeName: document.querySelector("#next-upgrade-name"),
  tierProgressLabel: document.querySelector("#tier-progress-label"),
  tierProgressValue: document.querySelector("#tier-progress-value"),
  tierMeterFill: document.querySelector("#tier-meter-fill"),
  levelList: document.querySelector("#level-list"),
  dropperList: document.querySelector("#dropper-list"),
  activityList: document.querySelector("#activity-list"),
  characterImages: document.querySelectorAll("[data-character-image]")
};

const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(Math.floor(value));

const getPerSecond = () =>
  droppers.reduce((total, dropper) => total + (state.ownedDroppers.has(dropper.id) ? dropper.income : 0), 0);

const getCharacterStage = () =>
  characterStages.reduce((active, stage) => (state.clickLevel >= stage.minLevel ? stage : active), characterStages[0]);

const renderCharacter = () => {
  const stage = getCharacterStage();

  elements.characterImages.forEach((image) => {
    if (image.getAttribute("src") !== stage.src) {
      image.setAttribute("src", stage.src);
    }

    image.setAttribute("alt", stage.alt);
  });
};

const addActivity = (message, label = "Update") => {
  const item = document.createElement("li");
  item.innerHTML = `<span>${label}</span>${message}`;
  elements.activityList.prepend(item);

  while (elements.activityList.children.length > 6) {
    elements.activityList.lastElementChild.remove();
  }
};

const createFloat = (amount, event) => {
  const float = document.createElement("div");
  float.className = "click-float";
  float.textContent = `+${formatMoney(amount)}`;
  float.style.left = `${event.clientX}px`;
  float.style.top = `${event.clientY}px`;
  document.body.append(float);
  float.addEventListener("animationend", () => float.remove(), { once: true });
};

const renderLevels = () => {
  elements.levelList.innerHTML = "";

  clickLevels.forEach((level, index) => {
    const isOwned = index <= state.clickLevel;
    const isNext = index === state.clickLevel + 1;
    const card = document.createElement("div");
    card.className = `shop-card ${isOwned ? "is-owned" : ""} ${isNext ? "is-next" : ""}`;
    card.innerHTML = `
      <div>
        <span class="card-meta">Level ${index + 1} / ${formatMoney(level.value)} per click</span>
        <div class="card-title">${level.name}</div>
        <p class="card-copy">${index === 0 ? "Starter preaching invite." : `Upgrade cost: ${formatMoney(level.cost)}.`}</p>
      </div>
      <button class="buy-button ${isOwned ? "is-owned" : ""}" type="button" ${!isNext || state.money < level.cost ? "disabled" : ""}>
        ${isOwned ? "Owned" : isNext ? formatMoney(level.cost) : "Locked"}
      </button>
    `;

    const button = card.querySelector("button");
    if (isNext) button.addEventListener("click", buyClickUpgrade);
    elements.levelList.append(card);
  });
};

const renderDroppers = () => {
  elements.dropperList.innerHTML = "";

  droppers.forEach((dropper) => {
    const isOwned = state.ownedDroppers.has(dropper.id);
    const card = document.createElement("div");
    card.className = `shop-card ${isOwned ? "is-owned" : ""}`;
    card.innerHTML = `
      <div>
        <span class="card-meta">+${formatMoney(dropper.income)} per second</span>
        <div class="card-title">${dropper.name}</div>
        <p class="card-copy">${dropper.copy}</p>
      </div>
      <button class="buy-button ${isOwned ? "is-owned" : ""}" type="button" ${isOwned || state.money < dropper.cost ? "disabled" : ""}>
        ${isOwned ? "Running" : formatMoney(dropper.cost)}
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => buyDropper(dropper));
    elements.dropperList.append(card);
  });
};

const render = () => {
  const currentLevel = clickLevels[state.clickLevel];
  const nextLevel = clickLevels[state.clickLevel + 1];
  const perSecond = getPerSecond();

  elements.money.textContent = formatMoney(state.money);
  elements.perClick.textContent = formatMoney(currentLevel.value);
  elements.perSecond.textContent = `${formatMoney(perSecond)}/s`;
  elements.tierName.textContent = currentLevel.name;
  elements.clickLevelName.textContent = currentLevel.name;
  elements.preachValue.textContent = `+${formatMoney(currentLevel.value)} honorarium`;

  if (nextLevel) {
    elements.nextUpgradeName.textContent = nextLevel.name;
    elements.buyClickUpgrade.textContent = `Buy for ${formatMoney(nextLevel.cost)}`;
    elements.buyClickUpgrade.disabled = state.money < nextLevel.cost;
  } else {
    elements.nextUpgradeName.textContent = "Maxed Out";
    elements.buyClickUpgrade.textContent = "Max Level";
    elements.buyClickUpgrade.disabled = true;
  }

  if (nextLevel) {
    const progress = Math.max(0, Math.min(1, state.money / nextLevel.cost));
    elements.tierProgressLabel.textContent = `Next: ${nextLevel.name}`;
    elements.tierProgressValue.textContent = `${formatMoney(state.money)} / ${formatMoney(nextLevel.cost)}`;
    elements.tierMeterFill.style.width = `${progress * 100}%`;
  } else {
    elements.tierProgressLabel.textContent = "Top speaking tier reached";
    elements.tierProgressValue.textContent = formatMoney(state.money);
    elements.tierMeterFill.style.width = "100%";
  }

  renderCharacter();
  renderLevels();
  renderDroppers();
};

const earn = (amount) => {
  state.money += amount;
  state.totalEarned += amount;
};

function buyClickUpgrade() {
  const nextLevel = clickLevels[state.clickLevel + 1];
  if (!nextLevel || state.money < nextLevel.cost) return;

  state.money -= nextLevel.cost;
  state.clickLevel += 1;
  addActivity(`Click power upgraded to ${nextLevel.name}.`, "Upgrade");
  render();
}

function buyDropper(dropper) {
  if (state.ownedDroppers.has(dropper.id) || state.money < dropper.cost) return;

  state.money -= dropper.cost;
  state.ownedDroppers.add(dropper.id);
  addActivity(`${dropper.name} is now producing honorariums.`, "Dropper");
  render();
}

elements.preachButton.addEventListener("click", (event) => {
  const currentLevel = clickLevels[state.clickLevel];
  earn(currentLevel.value);
  createFloat(currentLevel.value, event);
  addActivity(`Spoke at ${currentLevel.name} for ${formatMoney(currentLevel.value)}.`, "Honorarium");
  render();
});

elements.buyClickUpgrade.addEventListener("click", buyClickUpgrade);

setInterval(() => {
  const perSecond = getPerSecond();
  if (!perSecond) return;

  earn(perSecond);
  render();
}, 1000);

addActivity("Your first invitation just opened.", "Start");
render();
