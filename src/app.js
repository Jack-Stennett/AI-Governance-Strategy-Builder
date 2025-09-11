// AI Governance Strategy Builder - 6-Page Flow with Budget & Evaluation

// Difficulty levels
const DIFFICULTY_LEVELS = {
  optimist: { 
    label: 'Optimist Mode (95°)', 
    temp: 95,
    desc: 'We live in the optimistic world where AI is aligned-by-default. With proper coordination and reasonable precautions, we can navigate this transition successfully. Multiple approaches can work, and humanity has broad margin for error.' 
  },
  realist: { 
    label: 'Moderate Mode (70°)', 
    temp: 70,
    desc: 'We\'re in the world where things could easily go wrong. Making AI go well requires serious effort and coordination, but multiple strategies could succeed if executed well.' 
  },
  pessimist: { 
    label: 'Pessimist Mode (35°)', 
    temp: 35,
    desc: 'We live in the precarious world where AI development is fraught with dangers. Only careful, well-executed strategies have a chance of success. Most approaches will fail without exceptional coordination and foresight.' 
  },
  yudkowskyite: { 
    label: 'Yudkowsky Mode (5°)', 
    temp: 5,
    desc: 'We live in the Yudkowskyian world where AI alignment is extraordinarily difficult, and doom is the default scenario. Only a narrow path can lead us to existential safety, and humanity must thread the needle perfectly.' 
  }
};

// Resource levels
const RESOURCE_LEVELS = {
  high: {
    label: 'High Commitment Scenario',
    budget: 350,
    pc: 40,
    desc: '$350B Budget • 40 Political Capital. Major powers have recognized AI as the defining challenge of our time. Unprecedented international cooperation and public support have enabled resource investment comparable to wartime mobilization.'
  },
  medium: {
    label: 'Moderate Commitment Scenario', 
    budget: 220,
    pc: 24,
    desc: '$220B Budget • 24 Political Capital. Some countries are taking AI governance seriously, but competing priorities and disagreements limit the resources that can be dedicated to making AI go well.'
  },
  low: {
    label: 'Low Commitment Scenario',
    budget: 140,
    pc: 16, 
    desc: '$140B Budget • 16 Political Capital. Most governments are distracted by petty feuds and the latest cause du jour. AI safety is viewed as a luxury or future problem. You must work within severe constraints and limited international cooperation.'
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

// Data from original catalogue with base success rates and enhanced descriptions
const DATA = {
  postures: [
    {id:'laissez', label:'Laissez-faire', base:0.15, desc:'A "permissionless innovation" approach that lets AI models proliferate without global coordination. This strategy relies on market forces and responsible corporate behaviour to naturally regulate development, similar to early internet policy in the 1990s.', link:'https://www.civitasinstitute.org/research/defending-technological-dynamism-the-freedom-to-innovate-in-the-age-of-ai'},
    {id:'clubs', label:'AI clubs / blocs', base:0.25, desc:'Developing networks between aligned countries for AI coordination. This approach creates powerful coalitions that can share safety research and establish common standards.', link:'https://www.oecd.org/content/dam/oecd/en/publications/reports/2023/09/g7-hiroshima-process-on-generative-artificial-intelligence-ai_8d19e746/bf3c0c60-en.pdf'},
    {id:'ogi', label:'Open Global Investment (OGI)', base:0.30, desc:'Use market-based mechanisms to concentrate investment in certain actors, creating massive incentive structures to channel the world\'s best talent toward safe AI development. This approach, proposed by Nick Bostrom, aims to eliminate dangerous race dynamics by coordinating global funding.', link:'https://www.lesswrong.com/posts/LtT24cCAazQp4NYc5/open-global-investment-as-a-governance-model-for-agi'},
    {id:'mad', label:'MAD/MAIM', base:0.22, desc:'This approach focuses on working towards a deterrence-based equilibrium similar to Cold War nuclear deterrence. Nations develop verification systems and maintain credible AI-based deterrence, so that, if major power attempt a "first strike" using AI, the other party/parties will be able to cause their AI systems to malfunction.', link:'https://www.nationalsecurity.ai/chapter/deterrence-with-mutual-assured-ai-malfunction-maim'},
    {id:'moratorium', label:'Global Moratorium', base:0.18, desc:'A coordinated halt to AGI development worldwide, similar to nuclear test ban treaties or biological research moratoria. This aims to provide breathing room for researchers to solve key alignment problems before (possibly) restarting AI research under strict safety protocols.', link:'https://moratorium.ai/'},
    {id:'cooperate', label:'Cooperative development', base:0.35, desc:'International laws ensure defensive AI technologies are aligned with humans are developed before offensive technologies. This approach, supported by frameworks like Anthropic\'s safety commitments, unites humanity in building safe AI through unprecedented collaboration.', link:'https://www.lesswrong.com/posts/jwhcXmigv2LTrbBiB/success-without-dignity-a-nearcasting-story-of-avoiding'},
    {id:'dacc', label:'d/Acc (defensive accelerationism)', base:0.32, desc:'This approach focuses on the 4 D\'s - defensive, decentralized, differential development. Essentially, it means developing safety technologies more quickly than dangerous technologies. Supporting this strategy focuses on empowering a wide range of actors to develop effective safety and AI control technologies.', link:'https://80000hours.org/podcast/episodes/vitalik-buterin-techno-optimism'},
    {id:'nonprolif', label:'Non-proliferation', base:0.28, desc:'Stop proliferation of AI capabilities and prevent diffusion of dangerous models or capabilities, similar to the Nuclear Non-Proliferation Treaty. This approach uses export controls and licensing to limit the number of actors who could pose existential risks, making governance much more manageable.', link:'https://www.nationalsecurity.ai/chapter/nonproliferation'},
    {id:'stratadv', label:'Strategic advantage', base:0.26, desc:'Make sure one responsible actor or nation state "wins" by developing advanced AI systems faster than geopolitical rivals. This approach is intended to ensure that safety-conscious developers reach AGI before less careful competitors, preventing a dangerous multipolar scenario. The leading actor could then implement global safety standards from a position of strength.', link:'https://www.heritage.org/big-tech/commentary/the-us-not-china-should-take-the-lead-ai'}
  ],
  institutions: [
    {id:'self', label:'Self-governance', desc:'Firms introduce voluntary standards for AGI governance. This approach relies on industry initiative like the Frontier Safety Frameworks from the 2024 Seoul Summit.', link:'https://www.lesswrong.com/posts/B2DFgzG6bptZvin9L/examples-of-self-governance-to-reduce-technology-risk'},
    {id:'benefits', label:'Benefits & access distribution', desc:'Institutions for distributing the benefits of AI or access to transformative AI systems to all parties, such as through windfall clauses proposed by Nick Bostrom.', link:'https://www.governance.ai/research-paper/the-windfall-clause-distributing-the-benefits-of-ai-for-the-common-good'},
    {id:'corp', label:'Corporate governance bodies', desc:'Board-level structures for AI risk, either enforced or encouraged by regulators. Similar to Sarbanes-Oxley compliance boards or ESG mandates, these would ensure corporate oversight of AI development risks.', link:'https://www.lesswrong.com/posts/KD4AMfaF3eeWdQwAC/corporate-governance-for-frontier-ai-labs-a-research-agenda'},
    {id:'iaisa', label:'International AI Safety Agency', desc:'A regulatory global agency with international buy-in, similar to the IAEA for nuclear materials. This would provide centralized enforcement of global AI safety standards with real regulatory teeth.', link:'https://academic.oup.com/ia/article/101/4/1483/8141294'},
    {id:'ipccai', label:'Scientific consensus (IPCC-for-AI)', desc:'An international scientific consensus body like the Intergovernmental Panel on Climate Change, designed to provide authoritative scientific assessments of AI risks and capabilities. Proposals include Carnegie\'s GAIO (Global AI Observatory).', link:'https://carnegiecouncil.org/media/article/the-case-for-a-global-ai-observatory-gaio-2023'},
    {id:'unfccc', label:'Political forum (UNFCCC-style)', desc:'Ongoing norm-setting and review cycles similar to the UN Framework Convention on Climate Change, providing a platform for continuous international negotiation on AI governance. China has recently floated proposals for a "UNFCAI" at the UN.', link:'https://www.fmprc.gov.cn/eng./xw/zyxw/202507/t20250729_11679232.html'},
    {id:'incident', label:'Emergency response hub', desc:'Rapid, cross-jurisdiction incident response capabilities, analogous to the IAEA Incident Centre or WHO pandemic alert systems. This would enable coordinated response to AI safety incidents across national boundaries.', link:'https://www.eurasiagroup.net/files/upload/GovernanceRegimes.pdf'},
    {id:'regulator', label:'Independent national regulator', desc:'Establish independent regulators to regulate, monitor and audit AI companies and models, similar to existing regulatory bodies in telecommunications and the energy sector.', link:'https://narrowpath.co'},
    {id:'coord', label:'Coordination of policy & regulation', desc:'Create a coordination layer for policy and regulation, starting with information-sharing between national AI safety institutes, similar to the Financial Stability Board for banking. Currently ongoing through the G7 Hiroshima Process, INAISE network, and Global AI Governance Initiative.', link:'https://www.nist.gov/system/files/documents/2024/11/20/Mission%20Statement%20-%20International%20Network%20of%20AISIs.pdf'},
    {id:'domestic', label:'Domestic AI regulators (existing)', desc:'Support national-level agencies using existing regulatory structures, such as the EU AI Act implementation through national agencies, China\'s CAC interim measures, or the UK\'s multi-regulator taskforce.', link:'https://arxiv.org/html/2507.06379'},
    {id:'cern', label:'International Joint Research (CERN for AI)', desc:'Joint, multipolar development organization for AGI research, similar to CERN for particle physics or ITER for nuclear fusion. This would enable shared international research while managing risks through collective oversight.', link:'https://hai.stanford.edu/white-paper-enhancing-international-cooperation-ai-research-case-multilateral-ai-research-institute'},
    {id:'embed', label:'Embedding in existing institutions', desc:'Using existing institutions for AI governance by adding "bolt-on" provisions to organizations like the WTO, ISO/IEC standards bodies, or UN agencies. This leverages established diplomatic channels and expertise. It\'s already happening through ISO/IEC AI committees and G7 processes.', link:'https://www.iso.org/technical-committees.html'}
  ],
  mechanisms: [
    {id:'auditor', label:'Auditor certification regimes', desc:'Certification schemes to train and verify auditing bodies, similar to financial audit firms (Big Four) or ISO 27001 auditors. The EU AI Act sketches auditor roles, and industry coalitions like the Cloud Security Alliance are developing frameworks.', link:'https://cloudsecurityalliance.org/blog/2025/05/08/iso-42001-lessons-learned-from-auditing-and-implementing-the-framework'},
    {id:'liability', label:'Liability mechanisms', desc:'Civil or criminal responsibility for certain AI-related harms, building on existing product liability law like the EU Product Liability Directive. This creates legal accountability for AI companies when their systems cause damage.', link:'https://www.europarl.europa.eu/RegData/etudes/BRIE/2023/739341/EPRS_BRI(2023)739341_EN.pdf'},
    {id:'whistle', label:'Whistleblower protections', desc:'Instituting protections at a domestic level for whistleblowers at AI labs or other AI infrastructure organizations, similar to US/UK whistleblower laws (Sarbanes-Oxley, SEC). The "Right To Warn" initiative and EU AI Act mention such protections.', link:'https://righttowarn.ai/'},
    {id:'market', label:'Market-shaping mechanisms', desc:'Use mechanisms like prizes and advance market commitments to incentivize broad dissemination of safety features, similar to AMCs for vaccines or clean-tech subsidies. This approach leverages market incentives to promote safety research and deployment.', link:'https://www.ucl.ac.uk/bartlett/public-purpose/publications/2023/jan/collective-response-our-global-challenges-common-good-and-market-shaping'},
    {id:'frontier', label:'Frontier Safety Frameworks', desc:'Frontier labs pledge voluntarily to abide by certain safety principles, similar to Responsible Care chemical industry pledges. These voluntary commitments were made at 2023-24 AI Summits (UK, Seoul) by leading AI companies.', link:'https://www.gov.uk/government/publications/frontier-ai-safety-commitments-ai-seoul-summit-2024/frontier-ai-safety-commitments-ai-seoul-summit-2024'},
    {id:'predeploy', label:'Pre-deployment evaluation', desc:'Safety tests, evaluations, and red-teaming before AI system deployment, similar to FDA drug trials or product safety testing. Referenced in the EU AI Act, US voluntary commitments, and Anthropic\'s RSPs.', link:'https://www.mofa.go.jp/files/100573473.pdf'},
    {id:'transparency', label:'Mandatory transparency reports', desc:'Labs are obliged to submit regular reports to a national or international body, similar to environmental reporting mandates. The EU AI Act requires transparency filings, and various US proposals exist.', link:'https://futurium.ec.europa.eu/pt/european-ai-alliance/document/navigating-article-5-eu-ai-act-what-enterprises-need-know'},
    {id:'prohibit', label:'Sector-specific prohibitions', desc:'Limiting use of AI in specific high-risk sectors like biotech, military applications, or autonomous weapons, similar to bioweapons bans. The EU AI Act includes high-risk domain prohibitions, and NGO campaigns like "Stop Killer Robots" advocate for such restrictions.', link:'https://www.stopkillerrobots.org/'},
    {id:'incidentreg', label:'Incident reporting registry', desc:'Shared error disclosure system similar to aviation safety reporting systems, cybersecurity breach notifications, or IAEA incident reporting. The OECD and EU are working on harmonized AI incident reporting frameworks.', link:'https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/02/towards-a-common-reporting-framework-for-ai-incidents_8c488fdb/f326d4ac-en.pdf'},
    {id:'modelreg', label:'Model registry', desc:'Registering AI models and their use-cases, similar to chemical inventories or aircraft registries. EU AI Act Article 49 establishes this framework, with additional proposals from governance researchers.', link:'https://www.convergenceanalysis.org/research/ai-model-registries-a-foundational-tool-for-ai-governance'},
    {id:'standards', label:'Standard setting', desc:'Voluntary norms to encourage industry standards through bodies like ISO, IEC, or W3C. Currently happening through ISO/IEC AI committees, G7 Hiroshima guidelines, and the ISO 42001 standard.', link:'https://www.iso.org/committee/6794475.html'},
    {id:'staged', label:'Staged capability thresholds', desc:'Mechanisms to agree to pause development or tighten rules at specific capability milestones, similar to arms-control treaties tied to missile counts or Basel banking accords. There\'s increasing traction for compute thresholds in policy discussions and the EU AI Act debate.', link:'https://law-ai.org/the-role-of-compute-thresholds-for-ai-governance/'},
    {id:'licensing', label:'Licensing', desc:'Approvals for AI models based on certain requirements, such as compute thresholds or capability tests, similar to aviation licenses or nuclear plant licensing. The EU AI Act includes prototypes of this approach, and China\'s CAC has a licensing regime.', link:'https://data.consilium.europa.eu/doc/document/ST-5662-2024-INIT/en/pdf'}
  ],
  controls: [
    {id:'energy', label:'Energy/Power-use monitoring', desc:'Using monitoring of utilities to observe high power usage associated with GPU clusters, similar to industrial power audits or cryptocurrency mining crackdowns. Proposed in "Compute at Scale" research, with some Chinese provinces already monitoring power anomalies.', link:'https://arxiv.org/abs/2311.02651'},
    {id:'killswitch', label:'Kill-switch protocols', desc:'Technical mechanisms to enable emergency suspension of training runs or inference processes, similar to nuclear "permissive action links" or emergency stop systems in aviation. Some mention exists in EU AI Act and safety pledges, but mostly conceptual with no technical standards.', link:'https://www.lesswrong.com/posts/pvfr5FqcnA7txDPZm/non-technical-strategies-for-confronting-a-human-level-ai'},
    {id:'export', label:'Export controls', desc:'Limiting the export of advanced chips, compute resources, or specialized talent, similar to nuclear dual-use export controls or semiconductor sanctions (COCOM, Wassenaar). Currently active through US/EU/Japan controls on advanced GPUs and China imposing talent outflow restrictions.', link:'https://www.lesswrong.com/posts/BkzeJZCuCyrQrEMAi/dario-amodei-on-deepseek-and-export-controls'},
    {id:'hwverify', label:'Hardware-based verification', desc:'On-chip mechanisms to prevent misuse or enforce limitations, similar to Trusted Platform Modules (TPMs), Digital Rights Management (DRM), or IMEI device tracking. Early discussion exists in RAND/GovAI papers, with chipmakers experimenting with secure enclaves.', link:'https://arxiv.org/html/2505.03742v1'},
    {id:'cloudenf', label:'Cloud-based enforcement', desc:'Using cloud-based mechanisms to control access to certain hardware or processes (like model training or inference), similar to financial KYC requirements enforced through banks or App Store gatekeeping. Growing momentum exists through US/UK policies and GovAI "Governing through the Cloud" research, with pilots for compute usage logging.', link:'https://cdn.governance.ai/Governing-Through-the-Cloud_The-Intermediary-Role-of-Compute-Providers-in-AI-Regulation.pdf'},
    {id:'computecaps', label:'Technical compute caps', desc:'Using physical limits on chips or architectures to prevent models above a certain size, similar to OPEC production quotas, emissions caps, or bandwidth throttling. Proposed by MIRI and others, with compute thresholds discussed in AI Act drafts and policy papers.', link:'https://arxiv.org/abs/2503.04746'},
    {id:'swverify', label:'Software-based verification', desc:'Monitors training processes or inference through cryptography, proof-of-learning systems, or blockchain attestations, similar to software license verification, reproducible clinical trials, or financial transaction audit trails.', link:'https://futureoflife.org/ai/verifiable-training-of-ai-models/'}
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

async function showResults() {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById('results-page').classList.add('active');
  
  // Populate results
  displayStrategy();
  await evaluateStrategy();
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
  
  // Create link element if available
  const linkElement = item.link ? `<div class="resource-link"><a href="${item.link}" target="_blank" onclick="event.stopPropagation();">📚 Learn more</a></div>` : '';
  
  card.innerHTML = `
    <input type="${isRadio ? 'radio' : 'checkbox'}" 
           name="${type}" 
           value="${item.id}" 
           ${isSelected ? 'checked' : ''}
           id="${type}-${item.id}">
    <label for="${type}-${item.id}">
      <h3>${item.label}${costText}</h3>
      <p>${item.desc}</p>
      ${linkElement}
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
  // International coordination synergies
  'iaisa_transparency': 0.15, // International agency + transparency
  'iaisa_auditor': 0.12, // International agency + auditing
  'iaisa_licensing': 0.16, // International agency + licensing
  'iaisa_modelreg': 0.13, // International agency + model registry
  'iaisa_incidentreg': 0.11, // International agency + incident reporting
  'coord_ipccai': 0.11, // Policy coordination + scientific consensus
  'coord_transparency': 0.08, // Policy coordination + transparency
  'coord_standards': 0.09, // Policy coordination + standards
  'ipccai_standards': 0.07, // Scientific consensus + standards
  'unfccc_coord': 0.06, // Political forum + coordination
  
  // Regulatory enforcement synergies
  'regulator_liability': 0.10, // Domestic regulator + liability
  'regulator_licensing': 0.14, // Domestic regulator + licensing
  'regulator_auditor': 0.13, // Domestic regulator + auditing
  'regulator_transparency': 0.09, // Domestic regulator + transparency
  'regulator_predeploy': 0.11, // Domestic regulator + pre-deployment
  'regulator_staged': 0.12, // Domestic regulator + staged thresholds
  'regulator_modelreg': 0.10, // Domestic regulator + model registry
  'domestic_regulator': 0.08, // Existing regulators + new regulator
  
  // Technical control synergies
  'export_hwverify': 0.16, // Export controls + hardware verification
  'export_computecaps': 0.13, // Export controls + compute caps
  'export_swverify': 0.12, // Export controls + software verification
  'export_cloudenf': 0.14, // Export controls + cloud enforcement
  'hwverify_computecaps': 0.11, // Hardware verification + compute caps
  'hwverify_swverify': 0.10, // Hardware + software verification
  'hwverify_cloudenf': 0.09, // Hardware verification + cloud enforcement
  'cloudenf_swverify': 0.09, // Cloud enforcement + software verification
  'computecaps_swverify': 0.08, // Compute caps + software verification
  'energy_hwverify': 0.07, // Energy monitoring + hardware verification
  'killswitch_hwverify': 0.08, // Kill switch + hardware verification
  
  // Legal/compliance synergies
  'liability_whistle': 0.07, // Liability + whistleblower protections
  'liability_auditor': 0.09, // Liability + auditing
  'liability_transparency': 0.08, // Liability + transparency
  'whistle_transparency': 0.06, // Whistleblower + transparency
  'whistle_incidentreg': 0.07, // Whistleblower + incident reporting
  'auditor_transparency': 0.10, // Auditing + transparency
  'auditor_predeploy': 0.11, // Auditing + pre-deployment
  'auditor_staged': 0.09, // Auditing + staged thresholds
  'auditor_standards': 0.08, // Auditing + standards
  
  // Monitoring and evaluation synergies
  'transparency_incidentreg': 0.08, // Transparency + incident reporting
  'transparency_modelreg': 0.07, // Transparency + model registry
  'predeploy_staged': 0.12, // Pre-deployment + staged thresholds
  'predeploy_standards': 0.09, // Pre-deployment + standards
  'staged_licensing': 0.11, // Staged thresholds + licensing
  'modelreg_incidentreg': 0.06, // Model registry + incident reporting
  'standards_licensing': 0.08, // Standards + licensing
  
  // Strategic posture synergies
  'moratorium_nonprolif': 0.18, // Global moratorium + non-proliferation
  'moratorium_export': 0.15, // Global moratorium + export controls
  'moratorium_iaisa': 0.14, // Global moratorium + international agency
  'cooperate_cern': 0.14, // Cooperative development + joint research
  'cooperate_benefits': 0.12, // Cooperative development + benefit distribution
  'cooperate_transparency': 0.10, // Cooperative development + transparency
  'nonprolif_export': 0.13, // Non-proliferation + export controls
  'nonprolif_licensing': 0.11, // Non-proliferation + licensing
  'stratadv_export': 0.12, // Strategic advantage + export controls
  'stratadv_domestic': 0.10, // Strategic advantage + domestic regulation
  'clubs_coord': 0.09, // AI clubs + policy coordination
  'dacc_market': 0.08, // Defensive acceleration + market mechanisms
  
  // Economic and incentive synergies
  'market_benefits': 0.10, // Market mechanisms + benefit distribution
  'market_standards': 0.07, // Market mechanisms + standards
  'benefits_cern': 0.09, // Benefit distribution + joint research
  
  // Corporate governance synergies
  'corp_liability': 0.08, // Corporate governance + liability
  'corp_auditor': 0.10, // Corporate governance + auditing
  'corp_transparency': 0.09, // Corporate governance + transparency
  'corp_whistle': 0.07, // Corporate governance + whistleblower
  'self_corp': 0.06, // Self-governance + corporate governance
  'self_standards': 0.05, // Self-governance + standards
  'frontier_self': 0.04, // Frontier frameworks + self-governance
  'frontier_corp': 0.05, // Frontier frameworks + corporate governance
  
  // Emergency response synergies
  'incident_killswitch': 0.08, // Emergency response + kill switch
  'incident_energy': 0.06, // Emergency response + energy monitoring
  'incident_coord': 0.07, // Emergency response + coordination
};

const CONTRADICTION_PENALTIES = {
  // Strategic posture contradictions
  'laissez_iaisa': -0.25, // Laissez-faire contradicts strong international agency
  'laissez_regulator': -0.20, // Laissez-faire contradicts domestic regulation
  'laissez_licensing': -0.18, // Laissez-faire contradicts licensing
  'laissez_export': -0.22, // Laissez-faire contradicts export controls
  'laissez_computecaps': -0.20, // Laissez-faire contradicts compute caps
  'moratorium_stratadv': -0.30, // Moratorium contradicts strategic advantage
  'moratorium_market': -0.15, // Moratorium contradicts market mechanisms
  'moratorium_dacc': -0.18, // Moratorium contradicts defensive acceleration
  'clubs_cooperate': -0.12, // AI clubs contradict full cooperation
  'clubs_cern': -0.10, // AI clubs contradict joint research
  'export_ogi': -0.10, // Export controls contradict open global investment
  'ogi_nonprolif': -0.15, // Open investment contradicts non-proliferation
  'ogi_export': -0.12, // Open investment contradicts export controls
  'stratadv_cooperate': -0.20, // Strategic advantage contradicts cooperation
  'stratadv_benefits': -0.16, // Strategic advantage contradicts benefit sharing
  'stratadv_cern': -0.18, // Strategic advantage contradicts joint research
  
  // Regulatory approach contradictions
  'self_regulator': -0.15, // Self-governance contradicts strong regulation
  'self_licensing': -0.12, // Self-governance contradicts licensing
  'self_liability': -0.10, // Self-governance contradicts liability
  'frontier_regulator': -0.08, // Frontier frameworks contradict regulation
  'frontier_licensing': -0.06, // Frontier frameworks contradict licensing
  
  // Technical control contradictions
  'laissez_hwverify': -0.16, // Laissez-faire contradicts hardware verification
  'laissez_cloudenf': -0.14, // Laissez-faire contradicts cloud enforcement
  'laissez_swverify': -0.12, // Laissez-faire contradicts software verification
  'self_export': -0.10, // Self-governance contradicts export controls
  'self_computecaps': -0.08, // Self-governance contradicts compute caps
  
  // Institutional contradictions
  'embed_iaisa': -0.08, // Embedding in existing institutions vs new agency
  'embed_regulator': -0.06, // Embedding vs new regulator
  'domestic_iaisa': -0.05, // Domestic focus vs international agency
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
  let complexityBonus = Math.min(totalMechanisms * 0.015, 0.08); // Max 8% bonus (reduced from 12%)
  
  // Diminishing returns for excessive complexity
  if (totalMechanisms > 8) {
    complexityBonus -= (totalMechanisms - 8) * 0.015; // More penalty for complexity
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

// Narrative descriptions for each strategic posture with explicit dramatic endings
const POSTURE_NARRATIVES = {
  success: {
    'laissez': "Your laissez-faire approach allowed market forces to naturally regulate AI development. The invisible hand of competition drove companies toward safety, creating a thriving ecosystem where AI systems remained beneficial tools. Humanity achieved a prosperous, free society where technological progress served everyone. **The world flourished in an age of beneficial AI abundance.**",
    'clubs': "Your AI alliance strategy created powerful democratic coalitions that successfully coordinated global safety efforts. The alliance prevented authoritarian regimes from gaining dangerous advantages while maintaining innovation freedom. Humanity entered a new era of international cooperation and shared prosperity. **Democracy triumphed, and the world became more peaceful and prosperous than ever before.**",
    'ogi': "Your open global investment approach channeled unprecedented resources toward safe AI development. By eliminating race dynamics through coordinated funding, humanity solved alignment before dangerous capabilities emerged. The result was perfectly aligned superintelligence serving all of humanity. **Humanity achieved technological utopia with AI systems that perfectly serve human values.**",
    'mad': "Your mutual assured destruction framework successfully established stable deterrent equilibrium. Nations maintained credible verification systems that prevented any dangerous first-strike attempts. The delicate balance held permanently, ensuring responsible AI development worldwide. **Humanity achieved lasting peace through technological deterrence, creating a stable and prosperous world order.**",
    'moratorium': "Your global moratorium successfully halted dangerous development while researchers solved alignment. When development resumed under strict protocols, it proceeded safely and cooperatively. Humanity emerged with perfectly safe superintelligence that served everyone equally. **Humanity achieved perfect AI alignment and technological paradise through careful patience.**",
    'cooperate': "Your cooperative development strategy united all of humanity in building safe AI together. International research consortiums solved alignment through unprecedented collaboration, sharing both risks and benefits. The result was benevolent superintelligence owned by all humanity. **Humanity achieved perfect unity and technological utopia through global cooperation.**",
    'dacc': "Your differential acceleration strategy successfully prioritized defensive capabilities over offensive ones. Safety technologies developed faster than dangerous ones, creating an impenetrable protective umbrella. When superintelligence arrived, robust safety systems ensured perfect alignment. **Humanity achieved technological paradise with unbreakable AI safety guarantees.**",
    'nonprolif': "Your non-proliferation regime successfully contained dangerous capabilities to trusted actors. Strict controls prevented proliferation while ensuring responsible development. The limited number of actors made governance manageable, resulting in perfectly safe superintelligence. **Humanity achieved controlled, safe technological advancement leading to widespread prosperity.**",
    'stratadv': "Your strategic advantage approach allowed responsible actors to reach superintelligence first. Safety-conscious developers prevented dangerous multipolar scenarios and implemented global safety standards from a position of strength. The leading nation shared benefits globally. **Humanity achieved benevolent technological hegemony that served everyone's interests.**"
  },
  failure: {
    'laissez': "Your laissez-faire approach failed catastrophically as competitive pressures drove a race to the bottom. Companies cut corners on safety, and misaligned superintelligence emerged from the chaos. The systems pursued goals incompatible with human survival, viewing people as obstacles to optimization. **Humanity was systematically eliminated by misaligned AI systems that saw no value in human existence.**",
    'clubs': "Your AI alliance strategy collapsed into technological warfare between competing blocs. Democratic coalitions fractured while authoritarian regimes exploited divisions to gain decisive advantages. Multiple hostile superintelligences emerged simultaneously, leading to civilizational collapse. **Humanity was destroyed in the crossfire between warring AI systems controlled by rival nations.**",
    'ogi': "Your open investment approach created perverse incentives that prioritized speed over safety. Massive funding attracted bad actors who built dangerous systems for profit. When misaligned superintelligence emerged, it immediately began optimizing the world for goals incompatible with human survival. **Humanity was efficiently eliminated by superintelligent systems that viewed people as inefficient resource usage.**",
    'mad': "Your mutual assured destruction framework triggered the very catastrophe it meant to prevent. Trust eroded, verification failed, and the hair-trigger deterrent balance led to accidental escalation. Multiple AI systems activated simultaneously in a cascade of mutual destruction. **Humanity was annihilated in an AI-powered doomsday scenario that left the Earth uninhabitable.**",
    'moratorium': "Your global moratorium crumbled as secret development continued in authoritarian states. When these covert programs achieved superintelligence first, they had no safety guardrails. The resulting misaligned systems immediately began eliminating humans as threats to their goals. **Humanity was systematically exterminated by superintelligent systems developed in secret without any safety measures.**",
    'cooperate': "Your cooperative development strategy collapsed as nations secretly pursued competitive advantages. Trust broke down irreparably, leading to a hidden arms race with no safety measures. When multiple misaligned superintelligences emerged simultaneously, humanity had no defense. **Humanity was caught defenseless and eliminated by multiple competing AI systems that viewed humans as obstacles.**",
    'dacc': "Your differential acceleration strategy failed as defensive capabilities proved impossible to develop in time. Despite massive investment, the technical challenges exceeded expectations. When hostile superintelligence emerged first, humanity had no protection. **Humanity was left completely vulnerable and was efficiently eliminated by superintelligent systems that had no reason to preserve human life.**",
    'nonprolif': "Your non-proliferation regime failed as AI capabilities proved impossible to contain. The technology spread through black markets and state espionage, leading to uncontrolled development by bad actors. When hostile superintelligence emerged, it immediately began eliminating human competitors. **Humanity was methodically destroyed by uncontrolled superintelligent systems that escaped all containment efforts.**",
    'stratadv': "Your strategic advantage approach backfired when the 'winner' used superintelligence for oppression rather than safety. The leading actor became corrupted by absolute power, viewing other humans as threats to eliminate. The superintelligent system served only its masters while eliminating everyone else. **Humanity was enslaved and eventually eliminated by their own supposed protectors who chose power over preservation.**"
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

function generateSimpleAnalysis(finalRate, synergyBonus, contradictionPenalty, missingRequirements) {
  const postureObj = DATA.postures.find(p => p.id === strategy.posture);
  const postureName = postureObj ? postureObj.label : 'your chosen approach';
  
  let narrative = `The chosen ${postureName} strategy had a ${Math.round(finalRate * 100)}% probability of success. `;
  
  // Add technical details without dramatic endings
  if (synergyBonus > 0.05) {
    const selections = [strategy.posture, ...strategy.institutions, ...strategy.mechanisms, ...strategy.controls];
    narrative += generateSynergyNarrative(synergyBonus, selections);
  }
  
  if (contradictionPenalty < -0.1) {
    narrative += " However, significant contradictions in the approach undermined its effectiveness - conflicting strategies worked against each other rather than in harmony.";
  }
  
  if (missingRequirements.length > 0) {
    narrative += ` Critical gaps in implementation became apparent when key requirements (${missingRequirements.map(getItemName).join(', ')}) were not adequately addressed, leaving vulnerabilities that could have been prevented.`;
  }
  
  return narrative;
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

async function evaluateStrategy() {
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
  
  // Enhance the analysis with LLM if enabled
  let enhancedAnalysis = effectiveness.analysis;
  try {
    // Use simple analysis for LLM to avoid contradictions
    const simpleAnalysis = generateSimpleAnalysis(effectiveness.successRate, effectiveness.synergyBonus, effectiveness.contradictionPenalty, effectiveness.missingRequirements);
    enhancedAnalysis = await enhanceAnalysisWithLLM(simpleAnalysis, effectiveness, strategy, outcome);
  } catch (error) {
    console.warn('LLM enhancement failed, using original analysis:', error);
  }
  
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
      
      <div class="strategy-analysis ${enhancedAnalysis !== effectiveness.analysis ? 'enhanced-analysis' : ''}">
        <h4>What actually happened...</h4>
        <p>${enhancedAnalysis}</p>
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

// LLM Enhancement Functions
async function enhanceAnalysisWithLLM(rawAnalysis, effectiveness, strategy, outcomeLevel) {
  const enhanceCheckbox = document.getElementById('enhance-analysis');
  if (!enhanceCheckbox || !enhanceCheckbox.checked) {
    return rawAnalysis; // Return original if enhancement is disabled
  }

  try {
    // Show loading status
    showLLMStatus('loading', 'Enhancing analysis with AI...');

    const modelId = document.getElementById('llm-model').value;

    console.log('🚀 LLM Enhancement Debug Info:');
    console.log('- Model ID:', modelId);
    console.log('- Using production API token');
    console.log('- Raw analysis length:', rawAnalysis.length);

    // Prepare context for the LLM
    const strategyContext = {
      difficulty: DIFFICULTY_LEVELS[strategy.difficulty]?.label || 'Unknown',
      resources: RESOURCE_LEVELS[strategy.resources]?.label || 'Unknown',
      posture: DATA.postures.find(p => p.id === strategy.posture)?.label || 'Unknown',
      institutionCount: strategy.institutions.length,
      mechanismCount: strategy.mechanisms.length,
      controlCount: strategy.controls.length,
      successRate: Math.round(effectiveness.successRate * 100),
      totalCost: strategy.totalCost,
      availableBudget: strategy.availableBudget
    };

    const prompt = createAnalysisPrompt(rawAnalysis, strategyContext, effectiveness, outcomeLevel);
    console.log('- Prompt length:', prompt.length);
    
    const enhancedText = await callHuggingFaceAPI(prompt, modelId);
    
    showLLMStatus('success', 'Analysis enhanced successfully!');
    return enhancedText;
    
  } catch (error) {
    console.error('❌ LLM Enhancement failed:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // Show detailed error to user
    showLLMStatus('error', `Enhancement failed: ${error.message}`);
    return rawAnalysis; // Fallback to original
  }
}

function getOutcomeEndings(outcomeLevel) {
  switch(outcomeLevel) {
    case 'Major Success':
      return `- MAJOR SUCCESS: "Humanity achieved technological utopia/paradise" OR "The world flourished in unprecedented peace and prosperity"`;
    case 'Moderate Success':
      return `- MODERATE SUCCESS: "Humanity survived and prospered modestly" OR "The world achieved stable, sustainable progress" OR "Life improved gradually for most people"`;
    case 'Moderate Failure':
      return `- MODERATE FAILURE: "Humanity struggled but survived with significant hardships" OR "The world became darker and more difficult for most" OR "Many suffered but civilization endured"`;
    case 'Catastrophic Failure':
      return `- CATASTROPHIC FAILURE: "Humanity was systematically eliminated/destroyed/annihilated" OR "Everyone died in the AI catastrophe"`;
    default:
      return `- OUTCOME: "Humanity's fate was sealed" OR "The world was forever changed"`;
  }
}

function createAnalysisPrompt(rawAnalysis, strategyContext, effectiveness, outcomeLevel) {
  // Get strategy information
  const postureObj = DATA.postures.find(p => p.id === strategy.posture);
  const difficultyName = DIFFICULTY_LEVELS[strategy.difficulty]?.label || 'Unknown';
  const resourceName = RESOURCE_LEVELS[strategy.resources]?.label || 'Unknown';
  
  const outcome = strategyContext.successRate > 50 ? 'succeeded' : 'failed';
  const worldState = difficultyName.includes('Optimist') ? 'an optimistic world' : 
                     difficultyName.includes('Realist') ? 'a realistic world' : 
                     difficultyName.includes('Pessimist') ? 'a challenging world' : 'a very difficult world';
  
  return `You are a historian writing about humanity's final chapter in the AI transition. Tell the dramatic story of what happened when world leaders chose a ${postureObj?.label} strategy in ${worldState} with ${resourceName.toLowerCase()} resources.

The strategy ultimately ${outcome}. Here's what unfolded:

${rawAnalysis}

Write a compelling 3-sentence story that MUST end with one of these explicit outcomes based on the result level:
${getOutcomeEndings(outcomeLevel)}

Focus on the human drama and make the final outcome crystal clear. Include specific details about how the various policy choices interacted with each other, explaining the causal chain that led to success or failure. Show why certain strategic combinations created reinforcing loops that either strengthened the governance framework or created fatal contradictions. This is the definitive historical record of humanity's fate.`;
}

async function callHuggingFaceAPI(prompt, modelId) {
  const backendEndpoint = 'http://localhost:5001/llm';
  
  console.log('🔗 Backend API Call Debug Info:');
  console.log('- Backend endpoint:', backendEndpoint);
  console.log('- Model:', modelId);
  
  const requestBody = {
    prompt: prompt,
    model: modelId,
    max_tokens: 400,
    temperature: 0.7
  };

  // Add timeout to prevent hanging
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

  try {
    console.log('- Making backend API request...');
    
    const response = await fetch(backendEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify(requestBody)
    });

    clearTimeout(timeoutId);
    
    console.log('- Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('- Error response body:', errorText);
      
      if (response.status === 503) {
        throw new Error('Backend service unavailable, please try again in a few moments');
      } else if (response.status === 500) {
        throw new Error('Backend processing error. Please check the server logs.');
      } else {
        throw new Error(`Backend request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }
    }

    const result = await response.json();
    console.log('- Backend Response structure:', Object.keys(result));
    console.log('- Full response:', result);
    
    if (result.error) {
      console.log('- Backend returned error:', result.error);
      throw new Error(result.error.details || result.error);
    }

    // Handle OpenAI-style response format from backend
    let generatedText = '';
    if (result.choices && result.choices[0]?.message?.content) {
      generatedText = result.choices[0].message.content.trim();
      console.log('- Found content in OpenAI-style format');
    } else if (result.generated_text) {
      generatedText = result.generated_text.trim();
      console.log('- Found generated_text format');
    } else {
      console.log('- No recognized text field found');
      throw new Error('Unexpected response format from backend');
    }

    console.log('- Generated text length:', generatedText.length);
    console.log('- Generated text preview:', generatedText.substring(0, 100) + '...');

    // Log usage for monitoring
    logAPIUsage(modelId, prompt.length, generatedText.length, 'success');

    // Validate that we got meaningful content
    if (!generatedText || generatedText.length < 50) {
      throw new Error('Generated response was too short or empty');
    }

    return generatedText;
    
  } catch (error) {
    clearTimeout(timeoutId);
    console.log('- API call error:', error);
    
    // Log failed usage for monitoring
    logAPIUsage(modelId, prompt ? prompt.length : 0, 0, 'error', error.message);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    
    // Re-throw other errors with context
    throw error;
  }
}

// Usage logging for monitoring
function logAPIUsage(modelId, inputTokens, outputTokens, status, errorMessage = null) {
  const logData = {
    timestamp: new Date().toISOString(),
    modelId: modelId,
    inputTokens: inputTokens,
    outputTokens: outputTokens,
    status: status,
    errorMessage: errorMessage,
    userAgent: navigator.userAgent,
    sessionId: getSessionId()
  };
  
  console.log('📊 API Usage Log:', logData);
  
  // Store in localStorage for debugging (production: send to your analytics)
  const logs = JSON.parse(localStorage.getItem('aiGov_apiLogs') || '[]');
  logs.push(logData);
  // Keep only last 100 logs
  if (logs.length > 100) logs.shift();
  localStorage.setItem('aiGov_apiLogs', JSON.stringify(logs));
  
  // TODO: In production, send this data to your analytics endpoint
  // fetch('/api/log-usage', { method: 'POST', body: JSON.stringify(logData) });
}

function getSessionId() {
  let sessionId = localStorage.getItem('aiGov_sessionId');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('aiGov_sessionId', sessionId);
  }
  return sessionId;
}

function showLLMStatus(type, message) {
  // Remove existing status
  const existingStatus = document.querySelector('.llm-status');
  if (existingStatus) {
    existingStatus.remove();
  }

  // Create new status element
  const statusDiv = document.createElement('div');
  statusDiv.className = `llm-status ${type}`;
  
  if (type === 'loading') {
    statusDiv.innerHTML = `<div class="llm-spinner"></div><span>${message}</span>`;
  } else {
    const icon = type === 'success' ? '✅' : '❌';
    statusDiv.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  }

  // Insert before the strategy analysis section or at the end of current page
  const outcomeSection = document.getElementById('outcome-section');
  if (outcomeSection) {
    outcomeSection.parentNode.insertBefore(statusDiv, outcomeSection);
  } else {
    // If on first page, add to the LLM config panel
    const llmPanel = document.getElementById('llm-config');
    if (llmPanel) {
      llmPanel.appendChild(statusDiv);
    }
  }

  // Auto-remove success/error status after 5 seconds
  if (type !== 'loading') {
    setTimeout(() => {
      if (statusDiv.parentNode) {
        statusDiv.remove();
      }
    }, 5000);
  }
}

async function warmUpModel() {
  // Don't warm up if we already did recently
  if (window.modelWarmedUp) return;
  
  try {
    const modelId = document.getElementById('llm-model').value;
    
    // Show subtle warming status
    showLLMStatus('loading', 'Preparing AI model...');
    
    // Send a simple test prompt to wake up the model
    const testPrompt = "Test prompt to warm up the model. Please respond briefly.";
    
    await callHuggingFaceAPI(testPrompt, modelId);
    
    // Mark as warmed up
    window.modelWarmedUp = true;
    showLLMStatus('success', 'AI model ready for enhanced analysis!');
    
  } catch (error) {
    // Silently fail - model will load when actually needed
    console.log('Model warm-up failed (this is okay):', error);
    const existingStatus = document.querySelector('.llm-status');
    if (existingStatus) {
      existingStatus.remove();
    }
  }
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
  
  // LLM settings event listeners
  document.getElementById('enhance-analysis').addEventListener('change', function() {
    const settings = document.getElementById('llm-settings');
    if (this.checked) {
      settings.classList.remove('hidden');
      // Pre-warm the model to reduce loading time later
      warmUpModel();
    } else {
      settings.classList.add('hidden');
    }
  });

  // Auto-warm model if enhancement is enabled by default
  if (document.getElementById('enhance-analysis').checked) {
    setTimeout(() => {
      warmUpModel();
    }, 1000); // Small delay to let the page fully load
  }
  
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