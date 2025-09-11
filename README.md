# AI Governance Tool - LLM Enhanced Version

An interactive strategic decision-making game for AI governance with AI-powered narrative analysis. This enhanced version uses state-of-the-art language models to transform technical analysis into professional, readable strategic assessments.

## 🚀 Features

### 🤖 AI-Enhanced Analysis
- **LLM-Powered Narratives**: Strategic analysis enhanced by Qwen2.5-72B, Llama-3.1-70B, and other state-of-the-art models
- **Professional Reporting**: Raw technical analysis transformed into polished, readable strategic assessments
- **Free Integration**: Uses Hugging Face's free API tier (1000 requests/month)
- **Smart Pre-loading**: AI models warm up during gameplay for instant results
- **Graceful Fallback**: Works perfectly with or without AI enhancement

### 📚 Rich Educational Content
- **Detailed Descriptions**: Each mechanism includes comprehensive real-world context, historical examples, and current implementations
- **Research Links**: Direct access to academic papers, policy documents, and expert analysis from leading institutions
- **Evidence-Based**: All content derived from authoritative AI governance research and policy frameworks
- **Real-World Examples**: Current initiatives like G7 Hiroshima Process, EU AI Act, and US regulatory frameworks

### 🎯 Comprehensive Strategy Building
- **9 Strategic Postures**: From laissez-faire to defensive accelerationism, cooperative development to strategic advantage
- **12 Institutional Frameworks**: International bodies, regulators, research organizations, emergency response hubs
- **13 Regulatory Mechanisms**: Licensing, transparency reports, liability frameworks, sector-specific prohibitions
- **7 Technical Controls**: Hardware verification, export controls, cloud enforcement, compute caps

### 🔬 Advanced Simulation
- **Monte Carlo Analysis**: 1000+ iteration statistical modeling for robust outcome predictions
- **Synergy Detection**: Automatically identifies complementary and contradictory mechanism combinations
- **Resource Constraints**: Realistic budget ($80B-$200B) and political capital modeling
- **Evidence-Based Effectiveness**: Success rates derived from academic research and expert assessment

## Data Sources

The tool integrates data from the `AI_Governance_Mapping.csv` file, which includes:

- **Academic Literature**: Research papers, policy analyses, and theoretical frameworks
- **Real-World Examples**: Current implementations and historical precedents  
- **Impact Assessments**: Quantitative ratings and qualitative analysis
- **Implementation Details**: Costs, political requirements, and feasibility assessments

## File Structure

```
AI-Governance-Tool/
├── index.html              # Main application interface
├── app.js                  # Core application logic and simulation engine
├── styles.css              # Styling and responsive design
├── csv-parser.js           # CSV data integration module
├── AI_Governance_Mapping.csv # Comprehensive governance data
├── test-browser.html       # Browser compatibility testing
└── README.md              # This documentation
```

## 🎮 How to Play

### Quick Start (No Setup Required)
1. Visit: **https://jack-stennett.github.io/AI-Governance-Tool-LLM-Enabled**
2. Check "Enhance analysis with AI" on the first page (optional)
3. Start building your AI governance strategy!

### Full AI Enhancement Setup
1. **Get Free API Key** (recommended): Visit https://huggingface.co/settings/tokens
2. **Enter API Key**: Paste it on the first page for unlimited AI-enhanced analysis
3. **Choose Model**: Select Qwen2.5-72B-Instruct (recommended) or Llama-3.1-70B

## How to Use

### Basic Workflow
1. **Select Difficulty**: Choose Easy ($200B, 20 PC), Medium ($120B, 12 PC), or Hard ($80B, 8 PC)
2. **Choose Strategic Posture**: Pick one macro-approach (free of charge)
3. **Build Your Portfolio**: Select institutional, regulatory, and technical options within budget
4. **Review Requirements**: Ensure posture-specific requirements are met
5. **Lock In**: Finalize your selections
6. **Analyze Outcomes**: Roll individual results or run Monte Carlo simulations

### Key Concepts
- **Budget**: Financial resources in billions of dollars
- **Political Capital (PC)**: Political feasibility and support required
- **Temperature**: Environmental favorability slider (0-100%)
- **Requirements**: Mandatory combinations for certain postures
- **Synergies**: Complementary options that enhance effectiveness
- **Contradictions**: Conflicting options that reduce overall success

### Advanced Features
- **Search**: Use the search box to find specific governance mechanisms
- **Export**: Download your build configuration for sharing or analysis  
- **Help Modal**: Access detailed instructions and explanations
- **Reset**: Clear all selections and start over

## Browser Requirements

### Minimum Requirements
- **Modern Browser**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **JavaScript**: ES6 support (async/await, modules, arrow functions)
- **CSS**: Custom properties, flexbox, grid layout
- **APIs**: Fetch, localStorage, canvas (for charts)

### Recommended
- **Screen Size**: 1024x768 or larger for optimal experience
- **Network**: Local server for full CSV data integration
- **JavaScript Enabled**: Required for all interactive features

## Technical Implementation

### Architecture
- **Frontend-Only**: Pure HTML, CSS, and JavaScript - no backend required
- **Modular Design**: Separate modules for CSV parsing, UI rendering, and simulation
- **Progressive Enhancement**: Graceful fallback if CSV loading fails
- **Responsive Layout**: CSS Grid and Flexbox for adaptive design

### Data Integration
- **CSV Parser**: Custom implementation with error handling and fallbacks  
- **Dynamic Rendering**: Options populated from CSV data with rich metadata
- **Tooltip System**: Enhanced with full descriptions, literature links, and examples
- **Search Engine**: Real-time filtering across names, descriptions, and metadata

### Simulation Engine
- **Scoring Model**: Multi-factor success probability calculation
- **Monte Carlo**: 1000-iteration statistical analysis  
- **Visualization**: Canvas-based outcome distribution charts
- **Export Format**: JSON with timestamp, configuration, and results

## Customization

### Adding New Options
1. Edit `AI_Governance_Mapping.csv` with new entries
2. Follow the existing column structure and data format
3. Refresh the browser to see changes (may require server restart)

### Modifying Scoring
- Edit the `evaluateOnce()` function in `app.js`
- Adjust base scores, penalties, and bonuses as needed
- Update synergy and contradiction definitions in `SPEC` object

### Styling Changes
- Modify CSS custom properties in `:root` for color themes
- Adjust responsive breakpoints in media queries
- Customize tooltip appearance and behavior

## Accessibility

- **Keyboard Navigation**: Full support with visible focus indicators
- **Screen Readers**: Semantic HTML and ARIA labels
- **High Contrast**: Automatic adaptation for high contrast preferences  
- **Responsive Text**: Scalable fonts and layouts
- **Color Independence**: Information conveyed through multiple visual cues

## License & Attribution

This tool is designed for educational and research purposes. The underlying governance data synthesizes research from multiple academic and policy sources. Users should verify information independently for any practical applications.

For questions, issues, or contributions, please refer to the project repository or contact the maintainers.

---

**Version**: 4.0  
**Last Updated**: 2025-01-01  
**Browser Tested**: Chrome, Firefox, Safari, Edge
