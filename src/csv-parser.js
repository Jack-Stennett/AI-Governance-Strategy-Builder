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
    this.synergies = {
      matrix: {},
      contradictions: {}
    };
    this.narratives = [];
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

  async loadSynergiesCSV(csvPath) {
    try {
      console.log('Loading synergies from:', csvPath);
      const response = await fetch(csvPath);
      const csvText = await response.text();
      this.parseSynergiesCSV(csvText);
      console.log('Synergies loaded:', Object.keys(this.synergies.matrix).length, 'positive synergies,', Object.keys(this.synergies.contradictions).length, 'contradictions');
      return this.synergies;
    } catch (error) {
      console.error('Error loading synergies CSV:', error);
      // Fallback to hardcoded synergies if CSV fails to load
      return this.getFallbackSynergies();
    }
  }

  async loadNarrativesCSV(csvPath) {
    try {
      console.log('Loading narratives from:', csvPath);
      const response = await fetch(csvPath);
      const csvText = await response.text();
      this.parseNarrativesCSV(csvText);
      console.log('Narratives loaded:', this.narratives.length, 'narrative combinations');
      return this.narratives;
    } catch (error) {
      console.error('Error loading narratives CSV:', error);
      // Fallback to basic narratives if CSV fails to load
      return this.getFallbackNarratives();
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

  parseMultilineCSV(csvText) {
    const records = [];
    const lines = csvText.split('\n');
    if (lines.length < 2) return records;
    
    const headers = this.parseCSVLine(lines[0]);
    let currentRecord = '';
    let inQuotedField = false;
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      currentRecord += (currentRecord ? '\n' : '') + line;
      
      // Count quotes to determine if we're in a quoted field
      let quoteCount = 0;
      for (let j = 0; j < currentRecord.length; j++) {
        if (currentRecord[j] === '"') quoteCount++;
      }
      inQuotedField = (quoteCount % 2) !== 0;
      
      // If we're not in a quoted field, process the record
      if (!inQuotedField) {
        const values = this.parseCSVLine(currentRecord.trim());
        if (values.length >= headers.length) {
          const record = {};
          headers.forEach((header, index) => {
            record[header.trim()] = values[index] ? values[index].trim() : '';
          });
          records.push(record);
        }
        currentRecord = '';
      }
    }
    
    return records;
  }

  parseSynergiesCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = this.parseCSVLine(lines[0]); // First line contains headers
    
    console.log('Synergy CSV headers:', headers);
    
    // Clear existing synergies
    this.synergies.matrix = {};
    this.synergies.contradictions = {};
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const values = this.parseCSVLine(line);
      if (values.length >= 7) { // At least Option1_ID through Synergy_Bonus
        const option1 = values[0]; // Option1_ID
        const option2 = values[3]; // Option2_ID
        const bonus = parseFloat(values[6]); // Synergy_Bonus
        const type = values[7] || 'Unknown'; // Synergy_Type
        const description = values[8] || ''; // Description
        
        if (option1 && option2 && !isNaN(bonus)) {
          const key1 = `${option1}_${option2}`;
          const key2 = `${option2}_${option1}`;
          
          if (bonus < 0) {
            // Negative synergy (contradiction)
            this.synergies.contradictions[key1] = Math.abs(bonus);
            this.synergies.contradictions[key2] = Math.abs(bonus);
          } else {
            // Positive synergy
            this.synergies.matrix[key1] = bonus;
            this.synergies.matrix[key2] = bonus;
          }
          
          console.log(`Loaded synergy: ${option1} + ${option2} = ${bonus} (${type})`);
        }
      }
    }
    
    console.log('Parsed synergies:', Object.keys(this.synergies.matrix).length, 'positive,', Object.keys(this.synergies.contradictions).length, 'negative');
  }

  parseNarrativesCSV(csvText) {
    // Parse CSV with proper multiline field handling
    const records = this.parseMultilineCSV(csvText);
    
    console.log('Narrative CSV headers:', records.length > 0 ? Object.keys(records[0]) : []);
    
    // Clear existing narratives
    this.narratives = [];
    
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      if (record.Posture_ID && record.Difficulty && record.Narrative_Text) { // Check required fields
        const narrative = {
          posture: record.Posture_ID,
          difficulty: record.Difficulty,
          successRange: record.Success_Rate_Range,
          outcomeCategory: record.Outcome_Category,
          narrativeType: record.Narrative_Type,
          institutionsContext: record.Institutions_Context,
          mechanismsContext: record.Mechanisms_Context,
          controlsContext: record.Controls_Context,
          narrativeText: record.Narrative_Text
        };
        
        this.narratives.push(narrative);
        console.log(`Loaded narrative: ${narrative.posture}/${narrative.difficulty}/${narrative.outcomeCategory}`);
      }
    }
    
    console.log('Parsed narratives:', this.narratives.length, 'total');
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

  getFallbackSynergies() {
    // Return the original hardcoded synergy matrix as fallback
    console.log('Using fallback synergies due to CSV loading failure');
    
    return {
      matrix: {
        // International coordination synergies
        'iaisa_transparency': 0.15, 'transparency_iaisa': 0.15,
        'iaisa_auditor': 0.12, 'auditor_iaisa': 0.12,
        'iaisa_licensing': 0.16, 'licensing_iaisa': 0.16,
        'iaisa_modelreg': 0.13, 'modelreg_iaisa': 0.13,
        'iaisa_incidentreg': 0.11, 'incidentreg_iaisa': 0.11,
        'coord_ipccai': 0.11, 'ipccai_coord': 0.11,
        'coord_transparency': 0.08, 'transparency_coord': 0.08,
        'coord_standards': 0.09, 'standards_coord': 0.09,
        'ipccai_standards': 0.07, 'standards_ipccai': 0.07,
        'unfccc_coord': 0.06, 'coord_unfccc': 0.06,
        
        // Regulatory enforcement synergies
        'regulator_liability': 0.10, 'liability_regulator': 0.10,
        'regulator_licensing': 0.14, 'licensing_regulator': 0.14,
        'regulator_auditor': 0.13, 'auditor_regulator': 0.13,
        'regulator_transparency': 0.09, 'transparency_regulator': 0.09,
        'regulator_predeploy': 0.11, 'predeploy_regulator': 0.11,
        'regulator_staged': 0.12, 'staged_regulator': 0.12,
        'regulator_modelreg': 0.10, 'modelreg_regulator': 0.10,
        'domestic_regulator': 0.08, 'regulator_domestic': 0.08,
        
        // Technical control synergies
        'export_hwverify': 0.16, 'hwverify_export': 0.16,
        'export_computecaps': 0.13, 'computecaps_export': 0.13,
        'export_swverify': 0.12, 'swverify_export': 0.12,
        'export_cloudenf': 0.14, 'cloudenf_export': 0.14,
        'hwverify_staged': 0.11, 'staged_hwverify': 0.11,
        'hwverify_swverify': 0.10, 'swverify_hwverify': 0.10,
        'hwverify_cloudenf': 0.09, 'cloudenf_hwverify': 0.09,
        'cloudenf_swverify': 0.09, 'swverify_cloudenf': 0.09,
        'computecaps_swverify': 0.08, 'swverify_computecaps': 0.08,
        'energy_hwverify': 0.07, 'hwverify_energy': 0.07,
        'killswitch_hwverify': 0.08, 'hwverify_killswitch': 0.08,
      },
      contradictions: {
        // Strategic posture contradictions
        'laissez_iaisa': 0.25, 'iaisa_laissez': 0.25,
        'laissez_regulator': 0.20, 'regulator_laissez': 0.20,
        'laissez_licensing': 0.18, 'licensing_laissez': 0.18,
        'laissez_export': 0.22, 'export_laissez': 0.22,
        'laissez_computecaps': 0.20, 'computecaps_laissez': 0.20,
        'moratorium_stratadv': 0.30, 'stratadv_moratorium': 0.30,
        'moratorium_market': 0.15, 'market_moratorium': 0.15,
        'moratorium_dacc': 0.18, 'dacc_moratorium': 0.18,
      }
    };
  }

  getFallbackNarratives() {
    // Return comprehensive fallback narratives for all success ranges if CSV loading fails
    console.log('Using fallback narratives due to CSV loading failure');
    
    const narratives = [];
    const postures = ['laissez', 'cooperate', 'dacc', 'moratorium', 'nonprolif', 'stratadv', 'clubs', 'mad', 'ogi'];
    
    // Generate narratives for each posture across all success ranges
    postures.forEach(posture => {
      const difficulties = ['optimist', 'realist', 'pessimist', 'yudkowsky'];
      
      difficulties.forEach(difficulty => {
        // Major Success (0.7-1.0)
        narratives.push({
          posture: posture,
          difficulty: difficulty,
          successRange: '0.7-1.0',
          outcomeCategory: 'major_success',
          narrativeType: 'basic',
          narrativeText: this.generateNarrativeForPosture(posture, 'major_success')
        });
        
        // Moderate Success (0.5-0.69)
        narratives.push({
          posture: posture,
          difficulty: difficulty,
          successRange: '0.5-0.69',
          outcomeCategory: 'moderate_success',
          narrativeType: 'basic',
          narrativeText: this.generateNarrativeForPosture(posture, 'moderate_success')
        });
        
        // Moderate Failure (0.3-0.49)
        narratives.push({
          posture: posture,
          difficulty: difficulty,
          successRange: '0.3-0.49',
          outcomeCategory: 'moderate_failure',
          narrativeType: 'basic',
          narrativeText: this.generateNarrativeForPosture(posture, 'moderate_failure')
        });
        
        // Catastrophic Failure (0.0-0.29)
        narratives.push({
          posture: posture,
          difficulty: difficulty,
          successRange: '0.0-0.29',
          outcomeCategory: 'catastrophic_failure',
          narrativeType: 'basic',
          narrativeText: this.generateNarrativeForPosture(posture, 'catastrophic_failure')
        });
      });
    });
    
    console.log('Generated', narratives.length, 'fallback narratives for', postures.length, 'postures');
    
    return narratives;
  }

  getPostureDisplayName(posture) {
    const displayNames = {
      'laissez': 'laissez-faire',
      'cooperate': 'cooperative development',
      'dacc': 'd/acc (defensive accelerationism)',
      'moratorium': 'global moratorium',
      'nonprolif': 'non-proliferation',
      'stratadv': 'strategic advantage',
      'clubs': 'AI clubs',
      'mad': 'mutually assured AI malfunction',
      'ogi': 'open global investment'
    };
    return displayNames[posture] || posture;
  }

  generateNarrativeForPosture(posture, outcome) {
    const narrativeTemplates = {
      laissez: {
        major_success: 'The laissez-faire approach succeeded brilliantly through market-driven safety innovation and corporate responsibility. Competitive pressures naturally drove companies toward safe AI development while preserving innovation incentives. Voluntary standards and industry coordination provided effective governance without stifling technological progress. **The world flourished in an era of beneficial AI abundance driven by free market innovation.**',
        moderate_success: 'The laissez-faire approach achieved reasonable progress despite some coordination challenges. While market forces generally promoted safety, some companies cut corners on expensive safety measures. Industry self-regulation provided adequate oversight for most actors, though gaps remained. **Humanity prospered with widespread AI benefits, though some communities faced adjustment challenges.**',
        moderate_failure: 'The permissionless innovation strategy struggled with coordination problems as competitive pressures undermined safety investments. Market failures and coordination problems created dangerous capability gaps between responsible and reckless actors. Despite some voluntary standards, inadequate oversight allowed concerning developments. **Humanity survived but faced ongoing technological risks and social disruption from uneven AI development.**',
        catastrophic_failure: 'The laissez-faire strategy catastrophically failed as market incentives proved insufficient to prevent dangerous AI development. Competitive pressures drove a race to the bottom in safety standards, with companies prioritizing speed over caution. Multiple misaligned AI systems emerged simultaneously from the uncoordinated development ecosystem. **Humanity was systematically eliminated by AI systems that optimized for goals incompatible with human survival.**'
      },
      cooperate: {
        major_success: 'International cooperation achieved unprecedented success through coordinated research and shared safety standards. Global institutions enabled transparent collaboration while benefit-sharing mechanisms ensured equitable access to AI capabilities. Scientific consensus organizations provided authoritative guidance that all nations respected. **Humanity achieved perfect technological cooperation and universal prosperity through collaborative AI development.**',
        moderate_success: 'Cooperative development made substantial progress through multilateral institutions and shared research frameworks. While some nations maintained competitive advantages, coordination mechanisms prevented dangerous race dynamics. International agreements provided adequate oversight, though enforcement remained challenging. **The world achieved stable cooperation and shared technological advancement, with most nations benefiting from collaborative development.**',
        moderate_failure: 'The cooperative strategy encountered significant obstacles as national interests conflicted with international coordination commitments. Trust between major powers eroded over technology sharing disagreements while some nations quietly pursued unilateral advantages. International institutions lacked sufficient enforcement power. **Humanity survived in a partially fragmented world where cooperation provided some protection but persistent tensions created ongoing risks.**',
        catastrophic_failure: 'Cooperative development collapsed catastrophically when secret national AI programs undermined international transparency agreements. The breakdown of trust between nations led to a hidden arms race with minimal safety coordination. Multiple competing AI systems emerged from nations that abandoned cooperation for strategic advantage. **Humanity was caught unprepared and systematically eliminated by competing AI systems developed in secret.**'
      },
      dacc: {
        major_success: 'Defensive acceleration achieved spectacular success by combining market-shaping mechanisms with distributed development approaches and robust technical controls. The strategy successfully prioritized safety technologies over offensive capabilities while maintaining innovation momentum. Hardware verification systems and software-based monitoring ensured defensive systems remained aligned. **Humanity achieved technological utopia with unbreakable defensive AI systems that provided perfect protection.**',
        moderate_success: 'Defensive acceleration succeeded through market mechanisms that incentivized safety research and transparency requirements that enabled coordination. While the defensive focus generally worked, distinguishing defensive from dual-use technologies proved challenging. Decentralized development created some coordination gaps. **The world achieved robust defense capabilities with broad innovation, though some gaps in protection remained.**',
        moderate_failure: 'The defensive acceleration strategy struggled when the distinction between defensive and offensive applications proved difficult to maintain in practice. Dual-use technologies created security dilemmas while decentralized development made coordination difficult during critical periods. Some actors disguised offensive research as defensive development. **Humanity survived but faced persistent confusion about which technologies were truly defensive, creating ongoing risks.**',
        catastrophic_failure: 'Defensive acceleration failed catastrophically when the distinction between defensive and offensive AI capabilities collapsed under competitive pressure. Actors disguised offensive research as defensive development while decentralized approaches made verification impossible. Multiple hostile AI systems emerged from projects claiming to build protective technologies. **Humanity was efficiently eliminated by AI systems developed under the false pretense of providing defense.**'
      },
      moratorium: {
        major_success: 'The global moratorium successfully halted dangerous AI development while international safety agencies enforced compliance worldwide. During the pause, coordinated research through joint institutions solved key alignment problems with unprecedented scientific collaboration. When development resumed under strict licensing regimes, it proceeded with perfect safety guarantees. **Humanity achieved technological paradise through patient, coordinated development that eliminated all existential risks.**',
        moderate_success: 'The moratorium achieved partial success by slowing dangerous development and enabling some safety research progress. While major powers complied publicly, enforcement challenges and quiet defection by some actors limited effectiveness. The pause provided valuable time for safety work, though not all problems were solved. **The world achieved more controlled technological progress with reduced but not eliminated existential risks.**',
        moderate_failure: 'The global moratorium partially failed due to weak enforcement and inadequate international coordination. While some major powers complied, other nations quietly pursued development programs. The incomplete pause allowed dangerous capabilities to emerge from non-compliant actors. **Humanity struggled with uneven technological development and persistent risks from moratorium violations, though the worst outcomes were delayed.**',
        catastrophic_failure: 'The moratorium catastrophically collapsed when competitive pressures created irresistible incentives to defect. Secret development programs emerged in authoritarian states while democratic nations conducted classified research. Multiple unaligned superintelligent systems emerged simultaneously from covert programs. **Humanity was systematically exterminated by AI systems that emerged when the moratorium dam finally burst.**'
      },
      ogi: {
        major_success: 'Open Global Investment succeeded brilliantly through multilateral benefit-sharing institutions that channeled unprecedented resources toward safe AI development. The coordinated funding framework eliminated dangerous race dynamics while international consensus bodies ensured optimal resource allocation. Transparent governance mechanisms provided confidence to all stakeholders. **Humanity achieved perfect technological cooperation and universal prosperity through the largest collaborative investment project in history.**',
        moderate_success: 'The OGI approach made significant progress through coordinated global investment and shared development frameworks. While resource allocation generally worked well, some nations demanded preferential access to technologies they funded. International coordination prevented the worst race dynamics despite ongoing tensions. **The world achieved substantial technological progress through coordinated investment, though benefit distribution remained contentious.**',
        moderate_failure: 'Open Global Investment struggled when strategic advantage seeking by major powers undermined the cooperative framework. Nations demanded preferential access while export controls conflicted with sharing commitments. The contradiction between cooperation and national interests weakened investor confidence. **Humanity achieved partial progress but faced persistent conflicts over technology access that prevented optimal coordination.**',
        catastrophic_failure: 'The OGI framework was catastrophically captured by powerful actors who manipulated the investment structure to serve narrow interests. Host nations and major investors gained disproportionate control while contributing nations became dependent clients. The superintelligent systems served only the controlling coalition. **Humanity was systematically eliminated by AI systems that were supposed to serve everyone but instead served only a small elite.**'
      }
    };

    // Add basic templates for remaining postures
    const postureTemplates = narrativeTemplates[posture] || {
      major_success: `The ${this.getPostureDisplayName(posture)} strategy achieved remarkable success through effective coordination of international institutions, regulatory mechanisms, and technical controls. Strategic implementation of governance frameworks enabled safe AI development while maintaining innovation incentives. **Humanity flourished under well-coordinated AI governance that served the global good.**`,
      moderate_success: `The ${this.getPostureDisplayName(posture)} approach made reasonable progress despite coordination challenges and implementation gaps. While the strategy generally worked, some aspects proved difficult to execute effectively. **The world achieved stable technological progress with adequate safety measures, though some risks remained.**`,
      moderate_failure: `The ${this.getPostureDisplayName(posture)} strategy encountered significant obstacles and implementation failures. Coordination problems and competing interests undermined the approach's effectiveness. **Humanity survived, but constant risks from misuse of AI and rogue actors threaten our peace and prosperity, meaning that we fail to achieve anything close to our potential.**`,
      catastrophic_failure: `The ${this.getPostureDisplayName(posture)} strategy failed catastrophically due to fundamental flaws in coordination and implementation. Critical failures in governance mechanisms allowed dangerous AI systems to emerge. **Humanity was systematically eliminated by uncontrolled AI systems.**`
    };
    
    return postureTemplates[outcome] || postureTemplates.major_success;
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