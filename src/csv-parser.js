// CSV Parser to load and integrate AI Governance Mapping data
class CSVParser {
  constructor() {
    this.data = [];
    this.categories = {
      postures: [],
      institutions: [],
      mechanisms: [],
      controls: []
    };
  }

  async loadCSV(csvPath) {
    try {
      const response = await fetch(csvPath);
      const csvText = await response.text();
      this.parseCSV(csvText);
      this.processData();
      return this.categories;
    } catch (error) {
      console.error('Error loading CSV:', error);
      // Fallback to hardcoded data if CSV fails to load
      return this.getFallbackData();
    }
  }

  parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = this.parseCSVLine(lines[1]); // Skip first descriptive row, parse headers properly
    
    console.log('Headers found:', headers);
    
    for (let i = 2; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const values = this.parseCSVLine(line);
      if (values.length > 0 && values[0]) { // At least category should exist
        const row = {};
        headers.forEach((header, index) => {
          row[header.trim()] = values[index] ? values[index].trim() : '';
        });
        this.data.push(row);
        console.log('Parsed row:', row.Category, row.Idea);
      }
    }
    console.log('Total rows parsed:', this.data.length);
  }

  parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.replace(/"/g, ''));
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.replace(/"/g, ''));
    return result;
  }

  processData() {
    this.data.forEach(row => {
      const category = row.Category;
      const idea = row.Idea;
      const description = row.Description;
      const examples = row.Examples;
      const literatureExamples = row['Literature examples'];
      const scope = row['Scope (Global vs. National)'];
      const failureModes = row['Failure modes'];
      const currentEquivalent = row['Closest current/ historical equivalent'];
      const currentProgress = row['Current progress'];
      const impactRating = row['Impact Rating'];
      const notes = row['Notes on ratings'];

      // Skip empty ideas
      if (!idea || idea.trim() === '') return;

      // Generate unique ID from idea name
      const id = this.generateId(idea);

      const item = {
        id: id,
        label: idea,
        desc: description,
        examples: examples,
        literature: literatureExamples,
        scope: scope,
        failureModes: failureModes,
        currentEquivalent: currentEquivalent,
        currentProgress: currentProgress,
        impactRating: parseFloat(impactRating) || 0,
        notes: notes,
        fullDescription: this.buildFullDescription(row)
      };

      // Categorize based on the Category field
      if (category.includes('Strategic Postures')) {
        this.categories.postures.push(item);
      } else if (category.includes('Institutional Architectures')) {
        this.categories.institutions.push(item);
      } else if (category.includes('Regulatory/Legal')) {
        this.categories.mechanisms.push(item);
      } else if (category.includes('Technical & Infrastructural')) {
        this.categories.controls.push(item);
      }
    });
  }

  generateId(name) {
    return name.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '')
      .substring(0, 12);
  }

  buildFullDescription(row) {
    let desc = `<strong>${row.Idea}</strong><br><br>`;
    desc += `<strong>Description:</strong> ${row.Description}<br><br>`;
    
    if (row.Examples) {
      desc += `<strong>Examples:</strong> ${row.Examples}<br><br>`;
    }
    
    if (row['Literature examples']) {
      desc += `<strong>Literature:</strong> <a href="${row['Literature examples']}" target="_blank" rel="noopener">${row['Literature examples']}</a><br><br>`;
    }
    
    if (row['Scope (Global vs. National)']) {
      desc += `<strong>Scope:</strong> ${row['Scope (Global vs. National)']}<br><br>`;
    }
    
    if (row['Failure modes']) {
      desc += `<strong>Failure modes:</strong> ${row['Failure modes']}<br><br>`;
    }
    
    if (row['Closest current/ historical equivalent']) {
      desc += `<strong>Historical equivalent:</strong> ${row['Closest current/ historical equivalent']}<br><br>`;
    }
    
    if (row['Current progress']) {
      desc += `<strong>Current progress:</strong> ${row['Current progress']}<br><br>`;
    }

    if (row['Impact Rating']) {
      desc += `<strong>Impact Rating:</strong> ${row['Impact Rating']}<br><br>`;
    }

    return desc;
  }

  getFallbackData() {
    // Return the original hardcoded data structure as fallback
    return {
      postures: [
        {id:'laissez', label:'Laissez-faire', base:0.18, desc:'Let models proliferate, no global action.'},
        {id:'clubs', label:'AI clubs / blocs', base:0.30, desc:'Networks among aligned countries.'},
        {id:'ogi', label:'Open Global Investment (OGI)', base:0.33, desc:'Market mechanisms to concentrate investment.'},
        {id:'mad', label:'MAD/MAIM', base:0.28, desc:'Deterrence-based equilibrium.'},
        {id:'moratorium', label:'Global Moratorium', base:0.16, desc:'Halt AGI development.'},
        {id:'cooperate', label:'Cooperative development', base:0.42, desc:'Defensive AI before offensive, by treaty.'},
        {id:'dacc', label:'D/Acc', base:0.36, desc:'Differential acceleration of defensive capability.'},
        {id:'nonprolif', label:'Non-proliferation', base:0.35, desc:'Stop diffusion of dangerous capabilities.'},
        {id:'stratadv', label:'Strategic advantage', base:0.32, desc:'Ensure one actor "wins".'}
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
  }
}

// Export for use in main app
window.CSVParser = CSVParser;