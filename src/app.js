// AI Governance Strategy Builder - 6-Page Flow with Budget & Evaluation

// Difficulty levels
const DIFFICULTY_LEVELS = {
  optimist: { 
    label: 'Optimist Mode (95°)', 
    temp: 95,
    desc: 'We live in the optimistic world where AI safety is manageable. With proper coordination and reasonable precautions, we can navigate this transition successfully. Multiple approaches can work, and humanity has broad margin for error.' 
  },
  realist: { 
    label: 'Realist Mode (70°)', 
    temp: 70,
    desc: 'We face a challenging but manageable path. AI safety requires serious effort and coordination, but multiple strategies could succeed if executed well. Some mistakes are tolerable, but vigilance is essential.' 
  },
  pessimist: { 
    label: 'Pessimist Mode (35°)', 
    temp: 35,
    desc: 'We live in a precarious world where AI development is fraught with dangers. Only careful, well-executed strategies have a chance of success. Most approaches will fail without exceptional coordination and foresight.' 
  },
  yudkowskyite: { 
    label: 'Yudkowskyite Mode (5°)', 
    temp: 5,
    desc: 'We live in the Yudkowskyian world where AI alignment is extraordinarily difficult. There is only a narrow path that can lead us to existential safety. Most strategies lead to failure, and humanity must thread the needle perfectly.' 
  }
};

// Resource levels
const RESOURCE_LEVELS = {
  high: {
    label: 'High Commitment Scenario',
    budget: 400,
    pc: 40,
    desc: '$400B Budget • 40 Political Capital. Major powers have recognized AI as the defining challenge of our time. Unprecedented international cooperation has emerged, similar to wartime mobilization. Public support is strong across democracies.'
  },
  medium: {
    label: 'Moderate Commitment Scenario', 
    budget: 240,
    pc: 24,
    desc: '$240B Budget • 24 Political Capital. Some countries are taking AI governance seriously, but progress is hampered by competing priorities and disagreements. International cooperation exists but is fragmented and inconsistent.'
  },
  low: {
    label: 'Low Commitment Scenario',
    budget: 160,
    pc: 16, 
    desc: '$160B Budget • 16 Political Capital. Most governments are distracted by short-term crises. AI safety is viewed as a luxury or future problem. You must work within severe constraints and limited international cooperation.'
  }
};

// Costs for all mechanisms
const COSTS = {
  institutions: {
    self: {usd_billion: 0, pc: 0},
    benefits: {usd_billion: 20, pc: 4},
    corp: {usd_billion: 5, pc: 1},
    iaisa: {usd_billion: 35, pc: 6},
    ipccai: {usd_billion: 15, pc: 3},
    unfccc: {usd_billion: 10, pc: 3},
    incident: {usd_billion: 10, pc: 2},
    regulator: {usd_billion: 10, pc: 2},
    coord: {usd_billion: 15, pc: 3},
    domestic: {usd_billion: 0, pc: 0},
    cern: {usd_billion: 40, pc: 6},
    embed: {usd_billion: 5, pc: 1}
  },
  mechanisms: {
    auditor: {usd_billion: 5, pc: 2},
    liability: {usd_billion: 10, pc: 2},
    whistle: {usd_billion: 2, pc: 1},
    market: {usd_billion: 15, pc: 2},
    frontier: {usd_billion: 0, pc: 1},
    predeploy: {usd_billion: 10, pc: 2},
    transparency: {usd_billion: 5, pc: 2},
    prohibit: {usd_billion: 5, pc: 3},
    incidentreg: {usd_billion: 5, pc: 2},
    modelreg: {usd_billion: 5, pc: 2},
    standards: {usd_billion: 5, pc: 1},
    staged: {usd_billion: 5, pc: 3},
    licensing: {usd_billion: 15, pc: 3}
  },
  controls: {
    energy: {usd_billion: 10, pc: 1},
    killswitch: {usd_billion: 2, pc: 1},
    export: {usd_billion: 5, pc: 5},
    hwverify: {usd_billion: 20, pc: 2},
    cloudenf: {usd_billion: 15, pc: 2},
    computecaps: {usd_billion: 25, pc: 3},
    swverify: {usd_billion: 10, pc: 2}
  }
};

// Data from original catalogue with base success rates
const DATA = {
  postures: [
    {id:'laissez', label:'Laissez-faire', base:0.28, desc:'Let models proliferate, no global action.'},
    {id:'clubs', label:'AI clubs / blocs', base:0.40, desc:'Networks among aligned countries.'},
    {id:'ogi', label:'Open Global Investment (OGI)', base:0.43, desc:'Market mechanisms to concentrate investment.'},
    {id:'mad', label:'MAD/MAIM', base:0.38, desc:'Deterrence-based equilibrium.'},
    {id:'moratorium', label:'Global Moratorium', base:0.26, desc:'Halt AGI development.'},
    {id:'cooperate', label:'Cooperative development', base:0.52, desc:'Defensive AI before offensive, by treaty.'},
    {id:'dacc', label:'D/Acc', base:0.46, desc:'Differential acceleration of defensive capability.'},
    {id:'nonprolif', label:'Non-proliferation', base:0.45, desc:'Stop diffusion of dangerous capabilities.'},
    {id:'stratadv', label:'Strategic advantage', base:0.42, desc:'Ensure one actor "wins".'}
  ],
  institutions: [
    {id:'self', label:'Self-governance', desc:'Firms adopt voluntary standards.'},
    {id:'benefits', label:'Benefits & access distribution', desc:'Equitable distribution of TAI benefits.'},
    {id:'corp', label:'Corporate governance bodies', desc:'Board-level AI risk structures.'},
    {id:'iaisa', label:'International AI Safety Agency', desc:'Global regulator enforcing standards.'},
    {id:'ipccai', label:'Scientific consensus (IPCC-for-AI)', desc:'International consensus organisation.'},
    {id:'unfccc', label:'Political forum (UNFCCC-style)', desc:'Ongoing negotiation & review.'},
    {id:'incident', label:'Emergency response hub', desc:'Rapid cross-jurisdiction incident response.'},
    {id:'regulator', label:'Independent national regulator', desc:'Domestic regulator with audit powers.'},
    {id:'coord', label:'Coordination of policy & regulation', desc:'Harmonise evals, red-team, info-sharing.'},
    {id:'domestic', label:'Domestic AI regulators (existing)', desc:'Existing national agencies.'},
    {id:'cern', label:'International Joint Research (CERN for AI)', desc:'Joint, multipolar R&D venture.'},
    {id:'embed', label:'Embedding in existing institutions', desc:'Bolt-on provisions to existing bodies.'}
  ],
  mechanisms: [
    {id:'auditor', label:'Auditor certification regimes', desc:'Train/verify auditing bodies.'},
    {id:'liability', label:'Liability mechanisms', desc:'Civil/criminal responsibility for harms.'},
    {id:'whistle', label:'Whistleblower protections', desc:'Protect insiders at labs or infra orgs.'},
    {id:'market', label:'Market-shaping mechanisms', desc:'Prizes, AMCs to incentivise safety.'},
    {id:'frontier', label:'Frontier Safety Frameworks', desc:'Voluntary pledges by frontier labs.'},
    {id:'predeploy', label:'Pre-deployment evaluation', desc:'Safety tests, evals, red teaming.'},
    {id:'transparency', label:'Mandatory transparency reports', desc:'Regular reporting to a body.'},
    {id:'prohibit', label:'Sector-specific prohibitions', desc:'Limit use in biotech, military, etc.'},
    {id:'incidentreg', label:'Incident reporting registry', desc:'Shared error disclosure portal.'},
    {id:'modelreg', label:'Model registry', desc:'Register models / use-cases.'},
    {id:'standards', label:'Standard setting', desc:'Voluntary norms committees.'},
    {id:'staged', label:'Staged capability thresholds', desc:'Pause/tighten at milestones.'},
    {id:'licensing', label:'Licensing', desc:'Approvals based on compute/capability tests.'}
  ],
  controls: [
    {id:'energy', label:'Energy/Power-use monitoring', desc:'Utility monitoring as proxy for compute.'},
    {id:'killswitch', label:'Kill-switch protocols', desc:'Emergency suspension of training/inference.'},
    {id:'export', label:'Export controls', desc:'Restrict chips, compute, talent transfers.'},
    {id:'hwverify', label:'Hardware-based verification', desc:'On-chip mechanisms to enforce limits.'},
    {id:'cloudenf', label:'Cloud-based enforcement', desc:'Provider-side gates, policy checks, logging.'},
    {id:'computecaps', label:'Technical compute caps', desc:'Architectural limits preventing large models.'},
    {id:'swverify', label:'Software-based verification', desc:'Crypto / proof-of-learning monitors.'}
  ]
};

// Global state to store selections across pages
const strategy = {
  difficulty: null,
  resources: null,
  posture: null,
  institutions: [],
  mechanisms: [],
  controls: [],
  // Budget tracking
  totalCost: 0,
  totalPoliticalCost: 0,
  availableBudget: 0,
  availablePC: 0
};

// Page management
let currentPage = 1;

function showPage(pageNum) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Show target page
  document.getElementById(`page${pageNum}`).classList.add('active');
  
  // Update progress bar
  document.querySelectorAll('.progress-step').forEach((step, index) => {
    step.classList.toggle('active', index + 1 <= pageNum);
    step.classList.toggle('completed', index + 1 < pageNum);
  });
  
  currentPage = pageNum;
  
  // Update budget display if we're past resource selection
  if (pageNum > 2) {
    updateBudgetDisplay();
  }
}

function updateBudgetDisplay() {
  // Calculate total costs
  let totalCost = 0;
  let totalPC = 0;
  
  [...strategy.institutions, ...strategy.mechanisms, ...strategy.controls].forEach(itemId => {
    const cost = getCost(itemId);
    if (cost) {
      totalCost += cost.usd_billion;
      totalPC += cost.pc;
    }
  });
  
  strategy.totalCost = totalCost;
  strategy.totalPoliticalCost = totalPC;
  
  // Determine budget status
  const budgetOverspent = totalCost > strategy.availableBudget;
  const pcOverspent = totalPC > strategy.availablePC;
  const isOverBudget = budgetOverspent || pcOverspent;
  const isWarning = (totalCost > strategy.availableBudget * 0.8) || (totalPC > strategy.availablePC * 0.8);
  
  // Update any budget displays on current page
  const budgetDisplays = document.querySelectorAll('.budget-display');
  budgetDisplays.forEach(display => {
    // Remove existing classes
    display.classList.remove('warning', 'over-budget');
    
    // Add appropriate class
    if (isOverBudget) {
      display.classList.add('over-budget');
    } else if (isWarning) {
      display.classList.add('warning');
    }
    
    let warningMessage = '';
    if (isOverBudget) {
      warningMessage = '<div style="color: var(--danger-color); font-size: 0.8rem; text-align: center; margin-top: 0.5rem;">⚠️ OVER BUDGET - Remove some selections</div>';
    } else if (isWarning) {
      warningMessage = '<div style="color: var(--warning-color); font-size: 0.8rem; text-align: center; margin-top: 0.5rem;">⚠️ Approaching budget limits</div>';
    }
    
    display.innerHTML = `
      <span ${budgetOverspent ? 'style="color: var(--danger-color);"' : ''}>Budget: $${totalCost}B / $${strategy.availableBudget}B</span>
      <span ${pcOverspent ? 'style="color: var(--danger-color);"' : ''}>Political Capital: ${totalPC} / ${strategy.availablePC} PC</span>
      ${warningMessage}
    `;
  });
  
  // Update affordability of all option cards
  updateOptionAffordability();
}

function isAffordable(itemId) {
  const cost = getCost(itemId);
  if (!cost) return true;
  
  const newTotalCost = strategy.totalCost + cost.usd_billion;
  const newTotalPC = strategy.totalPoliticalCost + cost.pc;
  
  return newTotalCost <= strategy.availableBudget && newTotalPC <= strategy.availablePC;
}

function updateOptionAffordability() {
  // Update all option cards based on current affordability
  const allCards = document.querySelectorAll('.option-card');
  allCards.forEach(card => {
    const itemId = card.getAttribute('data-id');
    const checkbox = card.querySelector('input[type="checkbox"]');
    
    if (checkbox && !checkbox.checked) {
      // Only check affordability for unselected checkboxes
      const affordable = isAffordable(itemId);
      card.classList.toggle('unaffordable', !affordable);
      
      if (!affordable) {
        // Add cost warning
        const cost = getCost(itemId);
        let warningText = card.querySelector('.cost-warning');
        if (!warningText) {
          warningText = document.createElement('div');
          warningText.className = 'cost-warning';
          card.querySelector('label').appendChild(warningText);
        }
        warningText.textContent = `Cannot afford: $${cost.usd_billion}B, ${cost.pc} PC`;
      } else {
        // Remove cost warning if it exists
        const warningText = card.querySelector('.cost-warning');
        if (warningText) {
          warningText.remove();
        }
      }
    }
  });
}

function getCost(itemId) {
  // Check all cost categories
  for (const category of ['institutions', 'mechanisms', 'controls']) {
    if (COSTS[category][itemId]) {
      return COSTS[category][itemId];
    }
  }
  return null;
}

function showResults() {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById('results-page').classList.add('active');
  
  // Populate results
  displayStrategy();
  evaluateStrategy();
}

// Populate difficulty page
function populateDifficultyPage() {
  const grid = document.getElementById('difficulty-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  Object.entries(DIFFICULTY_LEVELS).forEach(([key, difficulty]) => {
    const card = document.createElement('div');
    card.className = `option-card ${strategy.difficulty === key ? 'selected' : ''}`;
    card.setAttribute('data-id', key);
    
    card.innerHTML = `
      <input type="radio" name="difficulty" value="${key}" ${strategy.difficulty === key ? 'checked' : ''} id="difficulty-${key}">
      <label for="difficulty-${key}">
        <h3>${difficulty.label}</h3>
        <p>${difficulty.desc}</p>
      </label>
    `;
    
    const input = card.querySelector('input');
    input.addEventListener('change', () => {
      strategy.difficulty = key;
      // Update all cards
      grid.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      // Enable next button
      document.getElementById('next-to-page2').disabled = false;
    });
    
    grid.appendChild(card);
  });
}

// Populate resources page
function populateResourcesPage() {
  const grid = document.getElementById('resources-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  Object.entries(RESOURCE_LEVELS).forEach(([key, resource]) => {
    const card = document.createElement('div');
    card.className = `option-card ${strategy.resources === key ? 'selected' : ''}`;
    card.setAttribute('data-id', key);
    
    card.innerHTML = `
      <input type="radio" name="resources" value="${key}" ${strategy.resources === key ? 'checked' : ''} id="resources-${key}">
      <label for="resources-${key}">
        <h3>${resource.label}</h3>
        <p>${resource.desc}</p>
      </label>
    `;
    
    const input = card.querySelector('input');
    input.addEventListener('change', () => {
      strategy.resources = key;
      strategy.availableBudget = resource.budget;
      strategy.availablePC = resource.pc;
      // Update all cards
      grid.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      // Enable next button
      document.getElementById('next-to-page3').disabled = false;
    });
    
    grid.appendChild(card);
  });
}

// Create option cards for strategy pages
function createOptionCard(item, type, isSelected = false) {
  const card = document.createElement('div');
  card.className = `option-card ${isSelected ? 'selected' : ''}`;
  card.setAttribute('data-id', item.id);
  
  const isRadio = type === 'postures';
  
  // Get cost information
  let costText = '';
  if (!isRadio) {
    const cost = getCost(item.id);
    if (cost && (cost.usd_billion > 0 || cost.pc > 0)) {
      costText = ` ($${cost.usd_billion}B, ${cost.pc} PC)`;
    } else {
      costText = ' (Free)';
    }
  }
  
  card.innerHTML = `
    <input type="${isRadio ? 'radio' : 'checkbox'}" 
           name="${type}" 
           value="${item.id}" 
           ${isSelected ? 'checked' : ''}
           id="${type}-${item.id}">
    <label for="${type}-${item.id}">
      <h3>${item.label}${costText}</h3>
      <p>${item.desc}</p>
    </label>
  `;
  
  // Handle selection
  const input = card.querySelector('input');
  input.addEventListener('change', () => {
    if (isRadio) {
      // Radio button - update posture
      strategy.posture = item.id;
      // Update all cards in this category
      card.parentElement.querySelectorAll('.option-card').forEach(c => {
        c.classList.remove('selected');
      });
      card.classList.add('selected');
      // Enable next button
      document.getElementById('next-to-page4').disabled = false;
    } else {
      // Checkbox - update arrays
      const category = strategy[type];
      if (input.checked) {
        // Check if we can afford this selection
        const cost = getCost(item.id);
        const newTotalCost = strategy.totalCost + (cost ? cost.usd_billion : 0);
        const newTotalPC = strategy.totalPoliticalCost + (cost ? cost.pc : 0);
        
        if (newTotalCost <= strategy.availableBudget && newTotalPC <= strategy.availablePC) {
          // Can afford - proceed with selection
          if (!category.includes(item.id)) {
            category.push(item.id);
          }
          card.classList.add('selected');
        } else {
          // Cannot afford - prevent selection and show warning
          input.checked = false;
          
          // Create temporary warning popup
          const warning = document.createElement('div');
          warning.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--danger-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 10000;
            text-align: center;
            font-weight: bold;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
          `;
          
          if (newTotalCost > strategy.availableBudget && newTotalPC > strategy.availablePC) {
            warning.textContent = `Cannot afford ${item.label}: Exceeds both budget ($${cost.usd_billion}B needed) and political capital (${cost.pc} PC needed)`;
          } else if (newTotalCost > strategy.availableBudget) {
            warning.textContent = `Cannot afford ${item.label}: Exceeds budget by $${newTotalCost - strategy.availableBudget}B`;
          } else {
            warning.textContent = `Cannot afford ${item.label}: Exceeds political capital by ${newTotalPC - strategy.availablePC} PC`;
          }
          
          document.body.appendChild(warning);
          setTimeout(() => {
            if (warning.parentNode) {
              warning.parentNode.removeChild(warning);
            }
          }, 3000);
        }
      } else {
        // Unchecking - always allowed
        const index = category.indexOf(item.id);
        if (index > -1) {
          category.splice(index, 1);
        }
        card.classList.remove('selected');
      }
      // Update budget display
      updateBudgetDisplay();
    }
  });
  
  return card;
}

// Populate strategy pages
function populatePosturesPage() {
  const grid = document.getElementById('postures-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  DATA.postures.forEach(posture => {
    const card = createOptionCard(posture, 'postures', strategy.posture === posture.id);
    grid.appendChild(card);
  });
}

function populateInstitutionsPage() {
  const grid = document.getElementById('institutions-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  DATA.institutions.forEach(institution => {
    const card = createOptionCard(institution, 'institutions', strategy.institutions.includes(institution.id));
    grid.appendChild(card);
  });
  
  // Update affordability after populating
  setTimeout(() => updateOptionAffordability(), 0);
}

function populateMechanismsPage() {
  const grid = document.getElementById('mechanisms-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  DATA.mechanisms.forEach(mechanism => {
    const card = createOptionCard(mechanism, 'mechanisms', strategy.mechanisms.includes(mechanism.id));
    grid.appendChild(card);
  });
  
  // Update affordability after populating
  setTimeout(() => updateOptionAffordability(), 0);
}

function populateControlsPage() {
  const grid = document.getElementById('controls-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  DATA.controls.forEach(control => {
    const card = createOptionCard(control, 'controls', strategy.controls.includes(control.id));
    grid.appendChild(card);
  });
  
  // Update affordability after populating
  setTimeout(() => updateOptionAffordability(), 0);
}

function displayStrategy() {
  const summaryDiv = document.getElementById('strategy-summary');
  
  const postureObj = DATA.postures.find(p => p.id === strategy.posture);
  const institutionObjs = DATA.institutions.filter(i => strategy.institutions.includes(i.id));
  const mechanismObjs = DATA.mechanisms.filter(m => strategy.mechanisms.includes(m.id));
  const controlObjs = DATA.controls.filter(c => strategy.controls.includes(c.id));
  
  summaryDiv.innerHTML = `
    <div class="strategy-section">
      <h3>Strategic Posture</h3>
      <div class="selected-item">${postureObj ? postureObj.label : 'None selected'}</div>
    </div>
    
    <div class="strategy-section">
      <h3>Institutional Architectures (${institutionObjs.length} selected)</h3>
      <div class="selected-items">
        ${institutionObjs.map(i => `<div class="selected-item">${i.label}</div>`).join('')}
      </div>
    </div>
    
    <div class="strategy-section">
      <h3>Regulatory/Legal Mechanisms (${mechanismObjs.length} selected)</h3>
      <div class="selected-items">
        ${mechanismObjs.map(m => `<div class="selected-item">${m.label}</div>`).join('')}
      </div>
    </div>
    
    <div class="strategy-section">
      <h3>Technical Controls (${controlObjs.length} selected)</h3>
      <div class="selected-items">
        ${controlObjs.map(c => `<div class="selected-item">${c.label}</div>`).join('')}
      </div>
    </div>
  `;
}

// Advanced strategy effectiveness calculation system
const SYNERGY_MATRIX = {
  // Strong synergies between complementary mechanisms
  'iaisa_transparency': 0.15, // International agency + transparency
  'iaisa_auditor': 0.12, // International agency + auditing
  'regulator_liability': 0.10, // Domestic regulator + liability
  'regulator_licensing': 0.14, // Domestic regulator + licensing
  'export_hwverify': 0.16, // Export controls + hardware verification
  'export_computecaps': 0.13, // Export controls + compute caps
  'hwverify_computecaps': 0.11, // Hardware verification + compute caps
  'cloudenf_swverify': 0.09, // Cloud enforcement + software verification
  'predeploy_staged': 0.12, // Pre-deployment + staged thresholds
  'transparency_incident': 0.08, // Transparency + incident reporting
  'whistle_liability': 0.07, // Whistleblower + liability
  'market_benefits': 0.10, // Market mechanisms + benefit distribution
  'coord_ipccai': 0.11, // Policy coordination + scientific consensus
  'moratorium_nonprolif': 0.18, // Global moratorium + non-proliferation
  'cooperate_cern': 0.14, // Cooperative development + joint research
};

const CONTRADICTION_PENALTIES = {
  // Conflicting approaches that reduce effectiveness
  'laissez_iaisa': -0.25, // Laissez-faire contradicts strong international agency
  'laissez_regulator': -0.20, // Laissez-faire contradicts domestic regulation
  'moratorium_stratadv': -0.30, // Moratorium contradicts strategic advantage
  'moratorium_market': -0.15, // Moratorium contradicts market mechanisms
  'clubs_cooperate': -0.12, // AI clubs contradict full cooperation
  'export_ogi': -0.10, // Export controls contradict open global investment
};

const POSTURE_REQUIREMENTS = {
  // Required mechanisms for specific postures to be effective
  'moratorium': ['iaisa', 'export', 'hwverify'], // Global moratorium needs enforcement
  'cooperate': ['cern', 'coord', 'transparency'], // Cooperation needs shared infrastructure
  'nonprolif': ['export', 'regulator', 'licensing'], // Non-proliferation needs controls
  'stratadv': ['export', 'domestic'], // Strategic advantage needs domestic control
  'mad': ['killswitch', 'hwverify'], // MAD needs reliable controls
};

function calculateStrategyEffectiveness() {
  const posture = DATA.postures.find(p => p.id === strategy.posture);
  if (!posture) return { successRate: 0, analysis: 'No strategic posture selected' };
  
  // Start with base success rate from posture
  let baseRate = posture.base;
  
  // Apply temperature effect (environmental favorability)
  const temp = DIFFICULTY_LEVELS[strategy.difficulty].temp;
  const tempModifier = (temp / 100) * 0.3 - 0.15; // -0.15 to +0.15
  let adjustedRate = baseRate + tempModifier;
  
  // Calculate synergy bonuses
  let synergyBonus = 0;
  const allSelections = [strategy.posture, ...strategy.institutions, ...strategy.mechanisms, ...strategy.controls];
  
  // Check for synergies between all pairs
  for (let i = 0; i < allSelections.length; i++) {
    for (let j = i + 1; j < allSelections.length; j++) {
      const key1 = `${allSelections[i]}_${allSelections[j]}`;
      const key2 = `${allSelections[j]}_${allSelections[i]}`;
      const bonus = SYNERGY_MATRIX[key1] || SYNERGY_MATRIX[key2] || 0;
      synergyBonus += bonus;
    }
  }
  
  // Calculate contradiction penalties
  let contradictionPenalty = 0;
  for (let i = 0; i < allSelections.length; i++) {
    for (let j = i + 1; j < allSelections.length; j++) {
      const key1 = `${allSelections[i]}_${allSelections[j]}`;
      const key2 = `${allSelections[j]}_${allSelections[i]}`;
      const penalty = CONTRADICTION_PENALTIES[key1] || CONTRADICTION_PENALTIES[key2] || 0;
      contradictionPenalty += penalty;
    }
  }
  
  // Check requirements fulfillment
  let requirementPenalty = 0;
  const requirements = POSTURE_REQUIREMENTS[strategy.posture] || [];
  const missingRequirements = requirements.filter(req => !allSelections.includes(req));
  requirementPenalty = missingRequirements.length * -0.08; // -8% per missing requirement
  
  // Complexity bonus - more comprehensive strategies get bonus up to a point
  const totalMechanisms = strategy.institutions.length + strategy.mechanisms.length + strategy.controls.length;
  let complexityBonus = Math.min(totalMechanisms * 0.02, 0.12); // Max 12% bonus
  
  // Diminishing returns for excessive complexity
  if (totalMechanisms > 10) {
    complexityBonus -= (totalMechanisms - 10) * 0.01;
  }
  
  // Calculate final success rate
  const finalRate = Math.max(0, Math.min(1, 
    adjustedRate + synergyBonus + contradictionPenalty + requirementPenalty + complexityBonus
  ));
  
  return {
    successRate: finalRate,
    baseRate: baseRate,
    tempModifier: tempModifier,
    synergyBonus: synergyBonus,
    contradictionPenalty: contradictionPenalty,
    requirementPenalty: requirementPenalty,
    complexityBonus: complexityBonus,
    missingRequirements: missingRequirements,
    analysis: generateAnalysis(finalRate, synergyBonus, contradictionPenalty, missingRequirements)
  };
}

function runMonteCarloSimulation(trials = 1000) {
  const effectiveness = calculateStrategyEffectiveness();
  const successRate = effectiveness.successRate;
  
  let successes = 0;
  const outcomes = [];
  
  for (let i = 0; i < trials; i++) {
    const roll = Math.random();
    const success = roll < successRate;
    if (success) successes++;
    outcomes.push(success);
  }
  
  // Calculate confidence intervals
  const successRatio = successes / trials;
  const standardError = Math.sqrt(successRatio * (1 - successRatio) / trials);
  const margin = 1.96 * standardError; // 95% confidence interval
  
  return {
    trials: trials,
    successes: successes,
    successRatio: successRatio,
    confidenceInterval: {
      lower: Math.max(0, successRatio - margin),
      upper: Math.min(1, successRatio + margin)
    },
    effectiveness: effectiveness
  };
}

// Narrative descriptions for each strategic posture
const POSTURE_NARRATIVES = {
  success: {
    'laissez': "Your laissez-faire approach allowed market forces to naturally regulate AI development! The invisible hand of competition drove companies toward safety, and decentralized innovation prevented any single catastrophic failure point. While some concerning incidents occurred, the distributed nature of development meant risks remained manageable.",
    'clubs': "Your AI alliance strategy created powerful coalitions that successfully coordinated safety efforts! Democratic nations formed effective governance blocs, sharing safety research and establishing common standards. The alliance structure prevented authoritarian regimes from gaining dangerous advantages while maintaining innovation.",
    'ogi': "Your open global investment approach channeled resources toward safe AI development! By creating massive incentive structures, you concentrated the world's best talent and resources on solving alignment. The coordinated funding eliminated the dangerous race dynamics that previously plagued AI development.",
    'mad': "Your mutual assured destruction framework successfully established a stable deterrent equilibrium! Nations developed verification systems and maintained credible AI-based deterrence, preventing any actor from attempting a first-strike scenario. The delicate balance held, keeping humanity safe through strategic stability.",
    'moratorium': "Your global moratorium successfully halted dangerous AI development worldwide! International enforcement mechanisms prevented any nation or company from secretly advancing toward AGI. This breathing room allowed researchers to solve key alignment problems before development resumed under strict safety protocols.",
    'cooperate': "Your cooperative development strategy united humanity in building safe AI together! International research consortiums solved alignment challenges through unprecedented collaboration. By sharing both the risks and benefits, nations avoided competitive pressures that might have led to cutting corners on safety.",
    'dacc': "Your differential acceleration strategy successfully prioritized defensive AI capabilities! By investing heavily in AI safety, monitoring, and defensive systems before allowing advanced capabilities, you created a protective umbrella. When AGI finally arrived, robust safety systems were already in place to manage the risks.",
    'nonprolif': "Your non-proliferation regime successfully contained dangerous AI capabilities! Like nuclear non-proliferation, strict export controls and monitoring prevented the spread of advanced AI systems. This limited the number of actors who could pose existential risks, making governance much more manageable.",
    'stratadv': "Your strategic advantage approach allowed a responsible actor to secure AGI first! By ensuring that safety-conscious developers reached AGI before less careful competitors, you prevented a dangerous multipolar scenario. The leading actor used their position responsibly, implementing global safety standards from a position of strength."
  },
  failure: {
    'laissez': "Your laissez-faire approach failed to prevent a catastrophic race to the bottom. Without coordination mechanisms, competitive pressures drove companies to cut corners on safety. Multiple labs rushed toward AGI simultaneously, and the lack of oversight led to a preventable disaster when alignment problems proved more severe than anticipated.",
    'clubs': "Your AI alliance strategy collapsed due to competing national interests. Democratic coalitions fractured under pressure, while authoritarian regimes exploited the divisions. The alliance structure created an 'us vs them' dynamic that accelerated dangerous competition rather than enabling cooperation on safety.",
    'ogi': "Your open global investment approach created perverse incentives that prioritized speed over safety. The massive funding attracted opportunistic actors who made grand promises but delivered rushed, dangerous systems. The concentration of resources paradoxically increased rather than decreased competitive pressures.",
    'mad': "Your mutual assured destruction framework collapsed catastrophically. The verification systems proved inadequate, trust eroded between nations, and the hair-trigger nature of the deterrent balance led to an accidental escalation. What was meant to preserve stability instead created the very conflict it sought to prevent.",
    'moratorium': "Your global moratorium fell apart due to enforcement failures and defection incentives. Secret development continued in multiple countries, while the public halt gave these covert programs decisive advantages. When AGI emerged from these shadow projects, there were no safety guardrails in place.",
    'cooperate': "Your cooperative development strategy foundered on the rocks of national sovereignty and competitive advantage. Countries paid lip service to cooperation while secretly advancing their own programs. The shared research became a cover for intelligence gathering, and trust broke down irreparably.",
    'dacc': "Your differential acceleration strategy failed because defensive capabilities proved harder to develop than offensive ones. Despite massive investment in safety research, the technical challenges exceeded expectations. When powerful AI systems emerged, the promised safety infrastructure wasn't ready, leaving humanity exposed.",
    'nonprolif': "Your non-proliferation regime crumbled under the pressure of dual-use technology and enforcement challenges. Unlike nuclear technology, AI capabilities proved impossible to contain - the same techniques had too many legitimate applications. The proliferation you sought to prevent occurred anyway, but now in an adversarial environment.",
    'stratadv': "Your strategic advantage approach backfired when the 'winner' proved less responsible than anticipated. The chosen leader became corrupted by power, used their AGI advantage for authoritarian control rather than global safety, and established a permanent technological dictatorship that served their interests rather than humanity's."
  }
};

function generateSynergyNarrative(synergyBonus, allSelections) {
  if (synergyBonus <= 0.05) return "";
  
  const synergies = [];
  const selections = [strategy.posture, ...strategy.institutions, ...strategy.mechanisms, ...strategy.controls];
  
  // Find the strongest synergies to highlight
  let maxSynergy = 0;
  let bestPair = null;
  
  for (let i = 0; i < selections.length; i++) {
    for (let j = i + 1; j < selections.length; j++) {
      const key1 = `${selections[i]}_${selections[j]}`;
      const key2 = `${selections[j]}_${selections[i]}`;
      const bonus = SYNERGY_MATRIX[key1] || SYNERGY_MATRIX[key2] || 0;
      if (bonus > maxSynergy) {
        maxSynergy = bonus;
        bestPair = [selections[i], selections[j]];
      }
    }
  }
  
  if (bestPair) {
    const name1 = getItemName(bestPair[0]);
    const name2 = getItemName(bestPair[1]);
    return ` Your ${name1} successfully synergized with ${name2} to significantly enhance governance effectiveness, creating a multiplicative effect that was greater than the sum of its parts.`;
  }
  
  return "";
}

function getItemName(id) {
  // Find the human-readable name for an item ID
  const allItems = [...DATA.postures, ...DATA.institutions, ...DATA.mechanisms, ...DATA.controls];
  const item = allItems.find(item => item.id === id);
  return item ? item.label : id;
}

function generateAnalysis(finalRate, synergyBonus, contradictionPenalty, missingRequirements) {
  const postureObj = DATA.postures.find(p => p.id === strategy.posture);
  const postureName = postureObj ? postureObj.label : 'your chosen approach';
  
  let narrative = "";
  
  // Main outcome narrative based on success/failure and posture
  if (finalRate > 0.5) {
    narrative += POSTURE_NARRATIVES.success[strategy.posture] || `Your ${postureName} strategy was broadly successful in managing AI risks and ensuring humanity's safe transition to the AGI era.`;
  } else {
    narrative += POSTURE_NARRATIVES.failure[strategy.posture] || `Your ${postureName} strategy ultimately failed to prevent catastrophic outcomes, leaving humanity vulnerable to the risks of uncontrolled AI development.`;
  }
  
  // Add synergy narrative
  narrative += generateSynergyNarrative(synergyBonus, [strategy.posture, ...strategy.institutions, ...strategy.mechanisms, ...strategy.controls]);
  
  // Add failure modes or additional context
  if (contradictionPenalty < -0.1) {
    narrative += " However, significant contradictions in your approach undermined its effectiveness - conflicting strategies worked against each other rather than in harmony.";
  }
  
  if (missingRequirements.length > 0) {
    narrative += ` Critical gaps in implementation became apparent when key requirements (${missingRequirements.map(getItemName).join(', ')}) were not adequately addressed, leaving vulnerabilities that could have been prevented.`;
  }
  
  return narrative;
}

function evaluateStrategy() {
  const outcomeDiv = document.getElementById('outcome-section');
  
  // Run Monte Carlo simulation
  const simulation = runMonteCarloSimulation(1000);
  const effectiveness = simulation.effectiveness;
  const successRate = effectiveness.successRate;
  const successPercent = Math.round(successRate * 100);
  
  // Determine outcome category based on success rate
  let outcome, description, imageFile, outcomeClass;
  
  if (successRate >= 0.7) {
    outcome = 'Major Success';
    description = 'Your strategy achieved outstanding results, successfully navigating humanity through the AI transition with minimal casualties and maximum benefit.';
    imageFile = 'spectacular_success.jpg';
    outcomeClass = 'success-high';
  } else if (successRate >= 0.5) {
    outcome = 'Moderate Success';
    description = 'Your strategy generally succeeded in managing AI risks, though some challenges and setbacks occurred along the way.';
    imageFile = 'mild_success.jpg';
    outcomeClass = 'success-moderate';
  } else if (successRate >= 0.3) {
    outcome = 'Moderate Failure';
    description = 'Your strategy fell short of preventing significant AI-related harms, though it may have prevented even worse outcomes.';
    imageFile = 'mild_failure.jpg';
    outcomeClass = 'failure-moderate';
  } else {
    outcome = 'Catastrophic Failure';
    description = 'Your strategy failed catastrophically, leading to severe consequences for humanity in the AI transition.';
    imageFile = 'spectacular_failure.jpg';
    outcomeClass = 'failure-high';
  }
  
  const totalSelections = strategy.institutions.length + strategy.mechanisms.length + strategy.controls.length;
  const confidenceInterval = simulation.confidenceInterval;
  
  outcomeDiv.innerHTML = `
    <div class="outcome-card ${outcomeClass}">
      <img src="${imageFile}" alt="${outcome}" class="outcome-image" onerror="this.style.display='none'">
      <h3>${outcome}</h3>
      <p>${description}</p>
      
      <div class="effectiveness-metrics">
        <div class="primary-metric">
          <span class="metric-label">Success Probability</span>
          <span class="metric-value">${successPercent}%</span>
          <div class="confidence-interval">
            95% CI: ${Math.round(confidenceInterval.lower * 100)}% - ${Math.round(confidenceInterval.upper * 100)}%
          </div>
        </div>
        
        <div class="detailed-metrics">
          <div class="metric">
            <span class="metric-label">Base Strategy Rate:</span>
            <span class="metric-value neutral">${Math.round(effectiveness.baseRate * 100)}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">Environmental Modifier:</span>
            <span class="metric-value ${effectiveness.tempModifier >= 0 ? 'positive' : 'negative'}">${effectiveness.tempModifier >= 0 ? '+' : ''}${Math.round(effectiveness.tempModifier * 100)}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">Synergy Bonus:</span>
            <span class="metric-value ${effectiveness.synergyBonus > 0 ? 'positive' : 'neutral'}">+${Math.round(effectiveness.synergyBonus * 100)}%</span>
          </div>
          ${effectiveness.contradictionPenalty < 0 ? `
          <div class="metric">
            <span class="metric-label">Contradiction Penalty:</span>
            <span class="metric-value negative">${Math.round(effectiveness.contradictionPenalty * 100)}%</span>
          </div>` : ''}
          ${effectiveness.requirementPenalty < 0 ? `
          <div class="metric">
            <span class="metric-label">Missing Requirements:</span>
            <span class="metric-value negative">${Math.round(effectiveness.requirementPenalty * 100)}%</span>
          </div>` : ''}
          <div class="metric">
            <span class="metric-label">Complexity Bonus:</span>
            <span class="metric-value ${effectiveness.complexityBonus >= 0 ? 'positive' : 'negative'}">${effectiveness.complexityBonus >= 0 ? '+' : ''}${Math.round(effectiveness.complexityBonus * 100)}%</span>
          </div>
        </div>
      </div>
      
      <div class="simulation-results">
        <h4>Monte Carlo Analysis (1,000 trials)</h4>
        <div class="sim-stat">
          <span class="sim-label">Successful Outcomes:</span>
          <span class="sim-value">${simulation.successes} / ${simulation.trials}</span>
        </div>
      </div>
      
      <div class="strategy-analysis">
        <h4>Strategic Analysis</h4>
        <p>${effectiveness.analysis}</p>
      </div>
      
      <div class="outcome-stats">
        <div class="stat">
          <span class="stat-label">Total Mechanisms:</span>
          <span class="stat-value">${totalSelections}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Strategic Approach:</span>
          <span class="stat-value">${DATA.postures.find(p => p.id === strategy.posture)?.label || 'None'}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Difficulty:</span>
          <span class="stat-value">${DIFFICULTY_LEVELS[strategy.difficulty]?.label || 'None'}</span>
        </div>
      </div>
    </div>
  `;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  
  // Populate all pages
  populateDifficultyPage();
  populateResourcesPage();
  populatePosturesPage();
  populateInstitutionsPage();
  populateMechanismsPage();
  populateControlsPage();
  
  // Navigation event listeners
  document.getElementById('next-to-page2').addEventListener('click', () => showPage(2));
  document.getElementById('back-to-page1').addEventListener('click', () => showPage(1));
  document.getElementById('next-to-page3').addEventListener('click', () => showPage(3));
  document.getElementById('back-to-page2').addEventListener('click', () => showPage(2));
  document.getElementById('next-to-page4').addEventListener('click', () => showPage(4));
  document.getElementById('back-to-page3').addEventListener('click', () => showPage(3));
  document.getElementById('next-to-page5').addEventListener('click', () => showPage(5));
  document.getElementById('back-to-page4').addEventListener('click', () => showPage(4));
  document.getElementById('next-to-page6').addEventListener('click', () => showPage(6));
  document.getElementById('back-to-page5').addEventListener('click', () => showPage(5));
  document.getElementById('complete-strategy').addEventListener('click', () => showResults());
  
  document.getElementById('start-over').addEventListener('click', () => {
    // Reset strategy
    strategy.difficulty = null;
    strategy.resources = null;
    strategy.posture = null;
    strategy.institutions = [];
    strategy.mechanisms = [];
    strategy.controls = [];
    strategy.totalCost = 0;
    strategy.totalPoliticalCost = 0;
    strategy.availableBudget = 0;
    strategy.availablePC = 0;
    
    // Repopulate pages and go to page 1
    populateDifficultyPage();
    populateResourcesPage();
    populatePosturesPage();
    populateInstitutionsPage();
    populateMechanismsPage();
    populateControlsPage();
    showPage(1);
    
    // Disable next buttons
    document.getElementById('next-to-page2').disabled = true;
    document.getElementById('next-to-page3').disabled = true;
    document.getElementById('next-to-page4').disabled = true;
  });
  
});