const clickLevels = [
  { name: "Local Youth Group", value: 1, cost: 0 },
  { name: "Motion Students", value: 5, cost: 75 },
  { name: "Celebration Church", value: 25, cost: 500 },
  { name: "Gateway Church", value: 100, cost: 3500 },
  { name: "Transformation Church", value: 500, cost: 18000 },
  { name: "Elevation Church", value: 2500, cost: 95000 }
];

const buildings = [
  {
    id: "invite-desk",
    name: "Invite Desk",
    baseCost: 55,
    baseIncome: 1,
    maxLevel: 8,
    costGrowth: 1.72,
    incomeGrowth: 1.65,
    requireRep: 0,
    copy: "Tracks calls, DMs, and open student ministry dates."
  },
  {
    id: "media-team",
    name: "Media Team",
    baseCost: 260,
    baseIncome: 5,
    maxLevel: 7,
    costGrowth: 1.82,
    incomeGrowth: 1.72,
    requireRep: 4,
    copy: "Clips sermons so churches keep finding the ministry."
  },
  {
    id: "travel-coordinator",
    name: "Travel Coordinator",
    baseCost: 1250,
    baseIncome: 22,
    maxLevel: 7,
    costGrowth: 1.9,
    incomeGrowth: 1.78,
    requireRep: 10,
    copy: "Handles routes, flights, lodging, and weekly follow-up."
  },
  {
    id: "booking-office",
    name: "Booking Office",
    baseCost: 5200,
    baseIncome: 95,
    maxLevel: 6,
    costGrowth: 2,
    incomeGrowth: 1.86,
    requireRep: 24,
    copy: "Turns warm invitations into confirmed ministry weekends."
  },
  {
    id: "conference-circuit",
    name: "Conference Circuit",
    baseCost: 21000,
    baseIncome: 420,
    maxLevel: 5,
    costGrowth: 2.1,
    incomeGrowth: 1.95,
    requireRep: 55,
    copy: "Stacks youth, leader, and young adult conference dates."
  },
  {
    id: "global-outreach-hub",
    name: "Global Outreach Hub",
    baseCost: 90000,
    baseIncome: 2100,
    maxLevel: 4,
    costGrowth: 2.25,
    incomeGrowth: 2,
    requireRep: 110,
    copy: "Coordinates national and global outreach opportunities."
  }
];

const boosts = [
  {
    id: "sermon-clip-vault",
    name: "Sermon Clip Vault",
    cost: 250,
    requireRep: 0,
    type: "clickMultiplier",
    value: 1.5,
    copy: "Click honorariums earn 1.5x."
  },
  {
    id: "booking-crm",
    name: "Booking CRM",
    cost: 1200,
    requireRep: 6,
    type: "passiveMultiplier",
    value: 2,
    copy: "All buildout income runs 2x faster."
  },
  {
    id: "testimony-reels",
    name: "Testimony Reels",
    cost: 4200,
    requireRep: 14,
    type: "eventMultiplier",
    value: 1.5,
    copy: "Speaking calendar payouts increase by 1.5x."
  },
  {
    id: "intercession-team",
    name: "Intercession Team",
    cost: 9500,
    requireRep: 28,
    type: "reputationMultiplier",
    value: 1.5,
    copy: "Events and objectives award 1.5x reputation."
  },
  {
    id: "road-manager",
    name: "Road Manager",
    cost: 26000,
    requireRep: 50,
    type: "passiveMultiplier",
    value: 3,
    copy: "Buildout income triples again."
  },
  {
    id: "stadium-production",
    name: "Stadium Production",
    cost: 85000,
    requireRep: 95,
    type: "clickMultiplier",
    value: 2,
    copy: "Preaching clicks double again."
  }
];

const speakingEvents = [
  {
    id: "motion-students-night",
    name: "Motion Students Night",
    requireLevel: 0,
    requireRep: 0,
    duration: 20,
    payout: 120,
    reputation: 4,
    copy: "A starter student ministry invitation."
  },
  {
    id: "forward-conference",
    name: "Forward Conference",
    requireLevel: 1,
    requireRep: 4,
    duration: 35,
    payout: 500,
    reputation: 8,
    copy: "A larger youth conference slot."
  },
  {
    id: "passion-conference",
    name: "Passion Conference",
    requireLevel: 2,
    requireRep: 14,
    duration: 50,
    payout: 1800,
    reputation: 16,
    copy: "A high-visibility college and young adult moment."
  },
  {
    id: "celebration-church",
    name: "Celebration Church",
    requireLevel: 2,
    requireRep: 24,
    duration: 65,
    payout: 5200,
    reputation: 24,
    copy: "A major Sunday ministry opportunity."
  },
  {
    id: "gateway-church",
    name: "Gateway Church",
    requireLevel: 3,
    requireRep: 45,
    duration: 80,
    payout: 14000,
    reputation: 36,
    copy: "A national church invitation."
  },
  {
    id: "transformation-church",
    name: "Transformation Church",
    requireLevel: 4,
    requireRep: 75,
    duration: 95,
    payout: 36000,
    reputation: 52,
    copy: "A culture-shaping ministry weekend."
  },
  {
    id: "elevation-church",
    name: "Elevation Church",
    requireLevel: 5,
    requireRep: 130,
    duration: 120,
    payout: 120000,
    reputation: 90,
    copy: "A top-tier arena-level opportunity."
  }
];

const objectives = [
  {
    id: "first-100",
    title: "Earn first $100",
    copy: "Build early momentum.",
    reward: { money: 50, reputation: 2 },
    isComplete: () => state.totalEarned >= 100
  },
  {
    id: "first-building",
    title: "Buy first building",
    copy: "Start passive income.",
    reward: { money: 120, reputation: 3 },
    isComplete: () => getTotalBuildingLevels() >= 1
  },
  {
    id: "first-event",
    title: "Finish first event",
    copy: "Prove the calendar works.",
    reward: { money: 350, reputation: 5 },
    isComplete: () => state.completedEventCount >= 1
  },
  {
    id: "hundred-per-second",
    title: "Reach $100/s",
    copy: "Make the ministry engine move.",
    reward: { money: 2400, reputation: 14 },
    isComplete: () => getPerSecond() >= 100
  },
  {
    id: "unlock-elevation",
    title: "Unlock Elevation Church",
    copy: "Reach the highest speaking tier.",
    reward: { money: 25000, reputation: 35 },
    isComplete: () => state.clickLevel >= 5
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
  reputation: 0,
  totalEarned: 0,
  clickLevel: 0,
  buildings: Object.fromEntries(buildings.map((building) => [building.id, 0])),
  ownedBoosts: new Set(),
  completedObjectives: new Set(),
  completedEventIds: new Set(),
  completedEventCount: 0,
  activeEvent: null,
  activeTab: "play"
};

const elements = {
  money: document.querySelector("#money"),
  reputation: document.querySelector("#reputation"),
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
  nextAction: document.querySelector("#next-action"),
  coachStrip: document.querySelector("#coach-strip"),
  clickerPanel: document.querySelector(".clicker-panel"),
  eventMeterFill: document.querySelector("#event-meter-fill"),
  activeEvent: document.querySelector("#active-event"),
  objectiveProgress: document.querySelector("#objective-progress"),
  objectiveList: document.querySelector("#objective-list"),
  eventList: document.querySelector("#event-list"),
  levelList: document.querySelector("#level-list"),
  buildingList: document.querySelector("#building-list"),
  boostList: document.querySelector("#boost-list"),
  activityList: document.querySelector("#activity-list"),
  tabButtons: document.querySelectorAll("[data-tab-target]"),
  tabPanels: document.querySelectorAll("[data-tab-panel]"),
  characterImages: document.querySelectorAll("[data-character-image]")
};

const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(Math.floor(value));

const formatNumber = (value) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  }).format(Math.floor(value));

const getBoostMultiplier = (type) =>
  boosts.reduce((multiplier, boost) => {
    if (boost.type !== type || !state.ownedBoosts.has(boost.id)) return multiplier;
    return multiplier * boost.value;
  }, 1);

const getClickValue = () => Math.floor(clickLevels[state.clickLevel].value * getBoostMultiplier("clickMultiplier"));

const getBuildingLevel = (building) => state.buildings[building.id] || 0;

const getBuildingCost = (building) => {
  const level = getBuildingLevel(building);
  if (level >= building.maxLevel) return null;
  return Math.floor(building.baseCost * building.costGrowth ** level);
};

const getBuildingIncome = (building, level = getBuildingLevel(building)) => {
  if (!level) return 0;
  return Math.floor(building.baseIncome * level * building.incomeGrowth ** (level - 1));
};

const getBasePerSecond = () =>
  buildings.reduce((total, building) => total + getBuildingIncome(building), 0);

const getPerSecond = () => Math.floor(getBasePerSecond() * getBoostMultiplier("passiveMultiplier"));

const getTotalBuildingLevels = () =>
  buildings.reduce((total, building) => total + getBuildingLevel(building), 0);

const getEventReward = (event) => ({
  money: Math.floor(event.payout * getBoostMultiplier("eventMultiplier")),
  reputation: Math.floor(event.reputation * getBoostMultiplier("reputationMultiplier"))
});

const getObjectiveReward = (objective) => ({
  money: objective.reward.money || 0,
  reputation: Math.floor((objective.reward.reputation || 0) * getBoostMultiplier("reputationMultiplier"))
});

const getCharacterStage = () =>
  characterStages.reduce((active, stage) => (state.clickLevel >= stage.minLevel ? stage : active), characterStages[0]);

const isBuildingUnlocked = (building) => state.reputation >= building.requireRep;

const isEventUnlocked = (event) => state.clickLevel >= event.requireLevel && state.reputation >= event.requireRep;

const isBoostUnlocked = (boost) => state.reputation >= boost.requireRep;

const getNextAction = () => {
  if (state.activeEvent) {
    const event = speakingEvents.find((item) => item.id === state.activeEvent.id);
    return {
      label: "Live Event",
      text: `${event.name} finishes in ${state.activeEvent.remaining}s. Keep preaching while it runs.`
    };
  }

  const affordableBuilding = buildings.find((building) => {
    const cost = getBuildingCost(building);
    return isBuildingUnlocked(building) && cost !== null && state.money >= cost;
  });
  if (affordableBuilding) {
    return {
      label: "Build Now",
      text: `Upgrade ${affordableBuilding.name} to raise passive income.`
    };
  }

  const readyEvent = speakingEvents.find((event) => isEventUnlocked(event));
  if (readyEvent && state.completedEventCount === 0) {
    return {
      label: "Book Event",
      text: `Start ${readyEvent.name} for ${formatMoney(getEventReward(readyEvent).money)} and reputation.`
    };
  }

  const nextLevel = clickLevels[state.clickLevel + 1];
  if (nextLevel && state.money >= nextLevel.cost) {
    return {
      label: "Upgrade Click",
      text: `Buy ${nextLevel.name} to raise every Preach click.`
    };
  }

  const nextBuilding = buildings.find((building) => {
    const cost = getBuildingCost(building);
    return isBuildingUnlocked(building) && cost !== null;
  });
  if (nextBuilding) {
    return {
      label: "Earn",
      text: `${formatMoney(Math.max(0, getBuildingCost(nextBuilding) - state.money))} until ${nextBuilding.name}.`
    };
  }

  const lockedEvent = speakingEvents.find((event) => !isEventUnlocked(event));
  if (lockedEvent) {
    return {
      label: "Unlock",
      text: `Build reputation toward ${lockedEvent.name}.`
    };
  }

  return {
    label: "Keep Scaling",
    text: "Upgrade buildings, run events, and push toward Elevation Church."
  };
};

const earn = (amount) => {
  state.money += amount;
  state.totalEarned += amount;
};

const addReputation = (amount) => {
  state.reputation += amount;
};

const addActivity = (message, label = "Update") => {
  const item = document.createElement("li");
  item.innerHTML = `<span>${label}</span>${message}`;
  elements.activityList.prepend(item);

  while (elements.activityList.children.length > 8) {
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

const renderCharacter = () => {
  const stage = getCharacterStage();

  elements.characterImages.forEach((image) => {
    if (image.getAttribute("src") !== stage.src) {
      image.setAttribute("src", stage.src);
    }

    image.setAttribute("alt", stage.alt);
  });
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
        <p class="card-copy">${index === 0 ? "Starter invite." : `Upgrade cost: ${formatMoney(level.cost)}.`}</p>
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

const renderBuildings = () => {
  elements.buildingList.innerHTML = "";

  buildings.forEach((building) => {
    const level = getBuildingLevel(building);
    const cost = getBuildingCost(building);
    const isUnlocked = isBuildingUnlocked(building);
    const isMaxed = level >= building.maxLevel;
    const income = getBuildingIncome(building);
    const nextIncome = isMaxed ? income : getBuildingIncome(building, level + 1);
    const canBuy = isUnlocked && !isMaxed && state.money >= cost;
    const card = document.createElement("div");
    card.className = `shop-card build-card ${level ? "is-owned" : ""} ${canBuy ? "is-next" : ""}`;
    card.innerHTML = `
      <div>
        <span class="card-meta">Level ${level} / ${building.maxLevel} / ${formatMoney(income)}/s now</span>
        <div class="card-title">${building.name}</div>
        <p class="card-copy">${building.copy}</p>
        <div class="card-progress">
          <span style="width: ${(level / building.maxLevel) * 100}%"></span>
        </div>
        <p class="card-copy">${isMaxed ? "Maxed out." : `Next: ${formatMoney(nextIncome)}/s. ${isUnlocked ? "" : `Needs ${building.requireRep} reputation.`}`}</p>
      </div>
      <button class="buy-button" type="button" ${!canBuy ? "disabled" : ""}>
        ${isMaxed ? "Max" : isUnlocked ? formatMoney(cost) : "Locked"}
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => buyBuilding(building));
    elements.buildingList.append(card);
  });
};

const renderBoosts = () => {
  elements.boostList.innerHTML = "";

  boosts.forEach((boost) => {
    const isOwned = state.ownedBoosts.has(boost.id);
    const isUnlocked = isBoostUnlocked(boost);
    const canBuy = isUnlocked && !isOwned && state.money >= boost.cost;
    const label = {
      clickMultiplier: "Click",
      passiveMultiplier: "Passive",
      eventMultiplier: "Events",
      reputationMultiplier: "Reputation"
    }[boost.type];
    const card = document.createElement("div");
    card.className = `shop-card ${isOwned ? "is-owned" : ""} ${canBuy ? "is-next" : ""}`;
    card.innerHTML = `
      <div>
        <span class="card-meta">${label} boost / ${boost.value}x</span>
        <div class="card-title">${boost.name}</div>
        <p class="card-copy">${boost.copy} ${isUnlocked ? "" : `Needs ${boost.requireRep} reputation.`}</p>
      </div>
      <button class="buy-button ${isOwned ? "is-owned" : ""}" type="button" ${!canBuy ? "disabled" : ""}>
        ${isOwned ? "Active" : isUnlocked ? formatMoney(boost.cost) : "Locked"}
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => buyBoost(boost));
    elements.boostList.append(card);
  });
};

const renderEvents = () => {
  elements.eventList.innerHTML = "";

  speakingEvents.forEach((event) => {
    const isUnlocked = isEventUnlocked(event);
    const isActive = state.activeEvent?.id === event.id;
    const isComplete = state.completedEventIds.has(event.id);
    const reward = getEventReward(event);
    const canStart = isUnlocked && !state.activeEvent;
    const card = document.createElement("div");
    card.className = `event-card ${isActive ? "is-active" : ""} ${canStart ? "is-next" : ""}`;
    card.innerHTML = `
      <div>
        <span class="card-meta">${event.duration}s / ${formatMoney(reward.money)} / +${formatNumber(reward.reputation)} rep</span>
        <div class="card-title">${event.name}</div>
        <p class="card-copy">${event.copy}</p>
        <p class="card-copy">${isUnlocked ? (isComplete ? "Repeatable after completion." : "Ready when the calendar is open.") : `Needs ${clickLevels[event.requireLevel].name} and ${event.requireRep} reputation.`}</p>
      </div>
      <button class="buy-button" type="button" ${!canStart ? "disabled" : ""}>
        ${isActive ? "Live" : isUnlocked ? "Start" : "Locked"}
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => startEvent(event));
    elements.eventList.append(card);
  });
};

const renderActiveEvent = () => {
  if (!state.activeEvent) {
    elements.activeEvent.innerHTML = `
      <span>No active event</span>
      <strong>Book a date</strong>
      <div class="meter-track"><div class="meter-fill" id="event-meter-fill" style="width: 0%"></div></div>
    `;
    elements.eventMeterFill = elements.activeEvent.querySelector("#event-meter-fill");
    return;
  }

  const event = speakingEvents.find((item) => item.id === state.activeEvent.id);
  const elapsed = event.duration - state.activeEvent.remaining;
  const progress = Math.max(0, Math.min(1, elapsed / event.duration));
  elements.activeEvent.innerHTML = `
    <span>Live now</span>
    <strong>${event.name}</strong>
    <p>${state.activeEvent.remaining}s remaining</p>
    <div class="meter-track"><div class="meter-fill" id="event-meter-fill" style="width: ${progress * 100}%"></div></div>
  `;
  elements.eventMeterFill = elements.activeEvent.querySelector("#event-meter-fill");
};

const renderObjectives = () => {
  const completeCount = state.completedObjectives.size;
  elements.objectiveProgress.textContent = `${completeCount} / ${objectives.length}`;
  elements.objectiveList.innerHTML = "";

  objectives.forEach((objective) => {
    const isComplete = state.completedObjectives.has(objective.id);
    const reward = getObjectiveReward(objective);
    const item = document.createElement("div");
    item.className = `objective-item ${isComplete ? "is-complete" : ""}`;
    item.innerHTML = `
      <span>${isComplete ? "Done" : "Open"}</span>
      <strong>${objective.title}</strong>
      <p>${objective.copy} Reward: ${formatMoney(reward.money)} / +${formatNumber(reward.reputation)} rep.</p>
    `;
    elements.objectiveList.append(item);
  });
};

const renderTabs = () => {
  const panelMap = {
    play: [elements.clickerPanel],
    build: [elements.buildingList.closest(".shop-panel"), elements.levelList.closest(".shop-panel")],
    calendar: [elements.eventList.closest(".calendar-panel")],
    boosts: [elements.boostList.closest(".shop-panel")],
    feed: [elements.activityList.closest(".activity-panel")]
  };

  elements.tabButtons.forEach((button) => {
    const isActive = button.dataset.tabTarget === state.activeTab;
    button.classList.toggle("is-active", isActive);
  });

  Object.entries(panelMap).forEach(([key, panels]) => {
    panels.forEach((panel) => {
      panel.dataset.tabPanel = key;
      panel.classList.toggle("is-tab-active", key === state.activeTab);
    });
  });
};

const render = () => {
  const currentLevel = clickLevels[state.clickLevel];
  const nextLevel = clickLevels[state.clickLevel + 1];
  const perSecond = getPerSecond();
  const clickValue = getClickValue();

  elements.money.textContent = formatMoney(state.money);
  elements.reputation.textContent = formatNumber(state.reputation);
  elements.perClick.textContent = formatMoney(clickValue);
  elements.perSecond.textContent = `${formatMoney(perSecond)}/s`;
  elements.tierName.textContent = currentLevel.name;
  elements.clickLevelName.textContent = currentLevel.name;
  elements.preachValue.textContent = `+${formatMoney(clickValue)} honorarium`;
  const nextAction = getNextAction();
  elements.nextAction.textContent = nextAction.text;
  elements.coachStrip.innerHTML = `<span>${nextAction.label}</span><strong>${nextAction.text}</strong>`;

  if (nextLevel) {
    elements.nextUpgradeName.textContent = nextLevel.name;
    elements.buyClickUpgrade.textContent = `Buy for ${formatMoney(nextLevel.cost)}`;
    elements.buyClickUpgrade.disabled = state.money < nextLevel.cost;
    const progress = Math.max(0, Math.min(1, state.money / nextLevel.cost));
    elements.tierProgressLabel.textContent = `Next: ${nextLevel.name}`;
    elements.tierProgressValue.textContent = `${formatMoney(state.money)} / ${formatMoney(nextLevel.cost)}`;
    elements.tierMeterFill.style.width = `${progress * 100}%`;
  } else {
    elements.nextUpgradeName.textContent = "Maxed Out";
    elements.buyClickUpgrade.textContent = "Max Level";
    elements.buyClickUpgrade.disabled = true;
    elements.tierProgressLabel.textContent = "Top speaking tier reached";
    elements.tierProgressValue.textContent = formatMoney(state.money);
    elements.tierMeterFill.style.width = "100%";
  }

  renderCharacter();
  renderObjectives();
  renderActiveEvent();
  renderEvents();
  renderBuildings();
  renderBoosts();
  renderLevels();
  renderTabs();
};

const checkObjectives = () => {
  let completedAny = false;

  objectives.forEach((objective) => {
    if (state.completedObjectives.has(objective.id) || !objective.isComplete()) return;

    const reward = getObjectiveReward(objective);
    state.completedObjectives.add(objective.id);
    earn(reward.money);
    addReputation(reward.reputation);
    addActivity(`${objective.title} completed. Reward: ${formatMoney(reward.money)} and +${formatNumber(reward.reputation)} rep.`, "Objective");
    completedAny = true;
  });

  return completedAny;
};

function buyClickUpgrade() {
  const nextLevel = clickLevels[state.clickLevel + 1];
  if (!nextLevel || state.money < nextLevel.cost) return;

  state.money -= nextLevel.cost;
  state.clickLevel += 1;
  addActivity(`Click power upgraded to ${nextLevel.name}.`, "Upgrade");
  checkObjectives();
  render();
}

function buyBuilding(building) {
  const cost = getBuildingCost(building);
  if (!isBuildingUnlocked(building) || cost === null || state.money < cost) return;

  state.money -= cost;
  state.buildings[building.id] += 1;
  addActivity(`${building.name} upgraded to level ${getBuildingLevel(building)}.`, "Build");
  checkObjectives();
  render();
}

function buyBoost(boost) {
  if (!isBoostUnlocked(boost) || state.ownedBoosts.has(boost.id) || state.money < boost.cost) return;

  state.money -= boost.cost;
  state.ownedBoosts.add(boost.id);
  addActivity(`${boost.name} is active.`, "Boost");
  checkObjectives();
  render();
}

function startEvent(event) {
  if (!isEventUnlocked(event) || state.activeEvent) return;

  state.activeEvent = {
    id: event.id,
    remaining: event.duration
  };
  addActivity(`${event.name} added to the live calendar.`, "Event");
  render();
}

function completeActiveEvent() {
  if (!state.activeEvent) return;

  const event = speakingEvents.find((item) => item.id === state.activeEvent.id);
  const reward = getEventReward(event);
  earn(reward.money);
  addReputation(reward.reputation);
  state.completedEventIds.add(event.id);
  state.completedEventCount += 1;
  state.activeEvent = null;
  addActivity(`${event.name} completed for ${formatMoney(reward.money)} and +${formatNumber(reward.reputation)} rep.`, "Event");
  checkObjectives();
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
  checkObjectives();
  render();
});

elements.buyClickUpgrade.addEventListener("click", buyClickUpgrade);

elements.tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.activeTab = button.dataset.tabTarget;
    renderTabs();
  });
});

setInterval(() => {
  const perSecond = getPerSecond();
  if (perSecond) earn(perSecond);

  if (state.activeEvent) {
    state.activeEvent.remaining -= 1;
    if (state.activeEvent.remaining <= 0) {
      completeActiveEvent();
    }
  }

  if (perSecond || state.activeEvent) {
    checkObjectives();
    render();
  }
}, 1000);

addActivity("Your first invitation just opened.", "Start");
render();
