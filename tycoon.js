const clickLevels = [
  { name: "Local Youth Group", value: 1, cost: 0 },
  { name: "Motion Students", value: 5, cost: 75 },
  { name: "Celebration Church", value: 25, cost: 500 },
  { name: "Gateway Church", value: 100, cost: 3500 },
  { name: "Transformation Church", value: 500, cost: 18000 },
  { name: "Elevation Church", value: 2500, cost: 95000 }
];

const droppers = [
  {
    id: "invite-requests",
    name: "Highlands Students Invites",
    cost: 60,
    income: 1,
    copy: "Student ministry invitations start coming in."
  },
  {
    id: "travel-team",
    name: "Forward Conference",
    cost: 300,
    income: 6,
    copy: "Student conference momentum picks up."
  },
  {
    id: "media-clips",
    name: "Passion Conference Clips",
    cost: 1500,
    income: 30,
    copy: "Message clips keep new invites moving."
  },
  {
    id: "conference-circuit",
    name: "VOUS Conference Circuit",
    cost: 9000,
    income: 180,
    copy: "Leader and young adult events stack the calendar."
  },
  {
    id: "global-crusade-calendar",
    name: "Gateway Conference Calendar",
    cost: 50000,
    income: 1200,
    copy: "Large church conference invitations go national."
  }
];

const boosts = [
  {
    id: "message-archive",
    name: "Sermon Clip Vault",
    cost: 250,
    type: "clickMultiplier",
    value: 1.5,
    copy: "Every click earns 1.5x honorariums."
  },
  {
    id: "booking-crm",
    name: "Booking CRM",
    cost: 1200,
    type: "passiveMultiplier",
    value: 2,
    copy: "All passive systems produce 2x faster."
  },
  {
    id: "prayer-team",
    name: "Prayer Team",
    cost: 6500,
    type: "clickMultiplier",
    value: 2,
    copy: "Preaching clicks double again."
  },
  {
    id: "road-manager",
    name: "Road Manager",
    cost: 26000,
    type: "passiveMultiplier",
    value: 3,
    copy: "Passive conference income triples."
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
  ownedDroppers: new Set(),
  ownedBoosts: new Set()
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
  boostList: document.querySelector("#boost-list"),
  activityList: document.querySelector("#activity-list"),
  characterImages: document.querySelectorAll("[data-character-image]")
};

const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(Math.floor(value));

const getBoostMultiplier = (type) =>
  boosts.reduce((multiplier, boost) => {
    if (boost.type !== type || !state.ownedBoosts.has(boost.id)) return multiplier;
    return multiplier * boost.value;
  }, 1);

const getClickValue = () => Math.floor(clickLevels[state.clickLevel].value * getBoostMultiplier("clickMultiplier"));

const getPerSecond = () =>
  Math.floor(
    droppers.reduce((total, dropper) => total + (state.ownedDroppers.has(dropper.id) ? dropper.income : 0), 0) *
      getBoostMultiplier("passiveMultiplier")
  );

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

const renderBoosts = () => {
  elements.boostList.innerHTML = "";

  boosts.forEach((boost) => {
    const isOwned = state.ownedBoosts.has(boost.id);
    const card = document.createElement("div");
    card.className = `shop-card ${isOwned ? "is-owned" : ""}`;
    card.innerHTML = `
      <div>
        <span class="card-meta">${boost.type === "clickMultiplier" ? "Click boost" : "Passive boost"} / ${boost.value}x</span>
        <div class="card-title">${boost.name}</div>
        <p class="card-copy">${boost.copy}</p>
      </div>
      <button class="buy-button ${isOwned ? "is-owned" : ""}" type="button" ${isOwned || state.money < boost.cost ? "disabled" : ""}>
        ${isOwned ? "Active" : formatMoney(boost.cost)}
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => buyBoost(boost));
    elements.boostList.append(card);
  });
};

const render = () => {
  const currentLevel = clickLevels[state.clickLevel];
  const nextLevel = clickLevels[state.clickLevel + 1];
  const perSecond = getPerSecond();
  const clickValue = getClickValue();

  elements.money.textContent = formatMoney(state.money);
  elements.perClick.textContent = formatMoney(clickValue);
  elements.perSecond.textContent = `${formatMoney(perSecond)}/s`;
  elements.tierName.textContent = currentLevel.name;
  elements.clickLevelName.textContent = currentLevel.name;
  elements.preachValue.textContent = `+${formatMoney(clickValue)} honorarium`;

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
  renderBoosts();
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

function buyBoost(boost) {
  if (state.ownedBoosts.has(boost.id) || state.money < boost.cost) return;

  state.money -= boost.cost;
  state.ownedBoosts.add(boost.id);
  addActivity(`${boost.name} is active.`, "Boost");
  render();
}

let pressTimeout;

const pulseClicker = () => {
  clearTimeout(pressTimeout);
  elements.preachButton.classList.add("is-pressing");
  pressTimeout = setTimeout(() => {
    elements.preachButton.classList.remove("is-pressing");
  }, 150);
};

elements.preachButton.addEventListener("click", (event) => {
  const currentLevel = clickLevels[state.clickLevel];
  const clickValue = getClickValue();
  pulseClicker();
  earn(clickValue);
  createFloat(clickValue, event);
  addActivity(`Spoke at ${currentLevel.name} for ${formatMoney(clickValue)}.`, "Honorarium");
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
