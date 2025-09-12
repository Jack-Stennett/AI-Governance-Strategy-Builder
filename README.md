# AI Governance Strategy Builder

An interactive strategic decision-making game for AI governance. Build comprehensive strategies to navigate the complex challenges of artificial intelligence development and deployment through evidence-based simulation and analysis.

## 🚀 Features

### 📊 Strategic Analysis
- **Comprehensive Simulation**: Monte Carlo analysis with 1000+ iteration statistical modeling
- **Professional Reporting**: Clear, readable strategic assessments and outcome predictions
- **Real-Time Feedback**: Immediate analysis of strategy effectiveness and trade-offs

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
- **Synergy Detection**: Automatically identifies complementary and contradictory mechanism combinations
- **Resource Constraints**: Realistic pre-FTX collapse budget ($120B-$400B) and political capital modeling
- **Outcome Visualization**: Canvas-based charts showing probability distributions and success rates

## Data Sources

The tool integrates data from a relatively comprehensive custom-made datasets, which include:

- **Academic Literature References**: Research papers, policy analyses, and theoretical frameworks
- **Real-World Examples**: Current implementations and historical precedents
- **Potential Challenges**: Reasons that these governance ideas could go wrong

## File Structure

```
AI-Governance-Strategy-Builder/
├── index.html              # Main application interface
├── src/
│   ├── app.js              # Core application logic and simulation engine
│   ├── styles.css          # Styling and responsive design
│   └── csv-parser.js       # CSV data integration module
├── assets/                 # Data and static resources
├── narratives.csv          # Comprehensive governance data
├── synergies.csv          # Strategy interaction data
└── README.md              # This documentation
```

## 🎮 How to Play

### Quick Start (No Setup Required)
1. Visit: **https://jack-stennett.github.io/AI-Governance-Strategy-Builder**
2. Select your difficulty level and strategic approach
3. Start building your AI governance strategy!

## How to Use

### Basic Workflow
1. **Select Difficulty**: Choose Easy ($300B, 24 PC), Medium ($220B, 20 PC), or Hard ($120B, 16 PC)
2. **Choose Strategic Posture**: Pick one macro-approach
3. **Build Your Portfolio**: Select institutional, regulatory, and technical options within budget
4. **Analyze Outcomes**: Find your results with a custom outcome generator

### Key Concepts
- **Budget**: Financial resources in billions of dollars
- **Political Capital (PC)**: Political feasibility and support required
- **Requirements**: Mandatory combinations for certain postures
- **Synergies**: Complementary options that enhance effectiveness
- **Contradictions**: Conflicting options that reduce overall success

### Advanced Features
- **Export**: Download your build configuration for sharing or analysis  
- **Help Modal**: Access detailed instructions and explanations with links to external references

### Requirements
- **Modern Browser**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **JavaScript**: ES6 support (async/await, modules, arrow functions)
- **CSS**: Custom properties, flexbox, grid layout
- **APIs**: Fetch, localStorage, canvas (for charts)

### Recommended
- **Screen Size**: 1024x768 or larger for optimal experience; works on a portable telephone
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
1. Edit `narratives.csv` and `synergies.csv` with new entries
2. Follow the existing column structure and data format
3. Refresh the browser to see changes

### Modifying Scoring
- Edit the `evaluateOnce()` function in `src/app.js`
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
