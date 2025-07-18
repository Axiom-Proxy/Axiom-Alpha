class ThemeManager {
  constructor() {
this.themes = {
  // Original dark theme (default)
  'axiom-dark': {
    name: 'Axiom Dark',
    '--color-primary': '#6366f1',
    '--color-secondary': '#8b5cf6',
    '--color-accent': '#06b6d4',
    '--color-success': '#10b981',
    '--color-warning': '#f59e0b',
    '--color-danger': '#ef4444',
    '--color-background': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    '--color-surface': 'rgba(255, 255, 255, 0.08)',
    '--color-surface-hover': 'rgba(255, 255, 255, 0.12)',
    '--color-surface-active': 'rgba(255, 255, 255, 0.16)',
    '--color-text-primary': '#f8fafc',
    '--color-text-secondary': '#cbd5e1',
    '--color-text-muted': '#94a3b8',
    '--glass-background': 'rgba(255, 255, 255, 0.1)',
    '--glass-border': 'rgba(255, 255, 255, 0.2)',
    '--glass-shadow': '0 8px 32px rgba(0, 0, 0, 0.3)',
    'body::before': `
          background: 
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%);
        `
  },

  // Cyberpunk theme
  'cyberpunk': {
    name: 'Cyberpunk',
    '--color-primary': '#ff0080',
    '--color-secondary': '#00ff80',
    '--color-accent': '#8000ff',
    '--color-success': '#00ff00',
    '--color-warning': '#ffff00',
    '--color-danger': '#ff4040',
    '--color-background': 'linear-gradient(135deg, #0a0a0a 0%, #1a0033 50%, #330066 100%)',
    '--color-surface': 'rgba(255, 0, 128, 0.1)',
    '--color-surface-hover': 'rgba(255, 0, 128, 0.15)',
    '--color-surface-active': 'rgba(255, 0, 128, 0.2)',
    '--color-text-primary': '#ff00ff',
    '--color-text-secondary': '#00ffff',
    '--color-text-muted': '#ff0080',
    '--glass-background': 'rgba(255, 0, 255, 0.1)',
    '--glass-border': 'rgba(0, 255, 255, 0.3)',
    '--glass-shadow': '0 8px 32px rgba(255, 0, 128, 0.4)',
    'body::before': `
          background: 
            radial-gradient(circle at 20% 50%, rgba(255, 0, 128, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 255, 128, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(128, 0, 255, 0.4) 0%, transparent 50%);
        `
  },
  // Baka theme
  'baka': {
    name: 'Baka',
    '--color-primary': '#f7dc6f',
    '--color-secondary': '#3498db',
    '--color-accent': '#e74c3c',
    '--color-success': '#2ecc71',
    '--color-warning': '#f1c40f',
    '--color-danger': '#e74c3c',
    '--color-background': 'linear-gradient(135deg, #e74c3c 0%, #3498db 50%, #e74c3c 100%)',
    '--color-surface': 'rgba(247, 220, 111, 0.1)',
    '--color-surface-hover': 'rgba(247, 220, 111, 0.15)',
    '--color-surface-active': 'rgba(247, 220, 111, 0.2)',
    '--color-text-primary': '#f7dc6f',
    '--color-text-secondary': '#3498db',
    '--color-text-muted': '#e74c3c',
    '--glass-background': 'rgba(247, 220, 111, 0.1)',
    '--glass-border': 'rgba(52, 152, 219, 0.3)',
    '--glass-shadow': '0 8px 32px rgba(231, 76, 60, 0.4)',
    'body::before': `
          background: 
            radial-gradient(circle at 20% 50%, rgba(247, 220, 111, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(52, 152, 219, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(231, 76, 60, 0.4) 0%, transparent 50%);
        `
  },
  // Pipkin theme
  'pipkin': {
    name: 'pipipipipipi',
    '--color-primary': '#ff69b4',
    '--color-secondary': '#ff1493',
    '--color-accent': '#ff4500',
    '--color-success': '#32cd32',
    '--color-warning': '#ff8c00',
    '--color-danger': '#ff6347',
    '--color-background': 'linear-gradient(135deg, #ffe4e1 0%, #ffb6c1 50%, #ff69b4 100%)',
    '--color-surface': 'rgba(255, 182, 193, 0.1)',
    '--color-surface-hover': 'rgba(255, 182, 193, 0.15)',
    '--color-surface-active': 'rgba(255, 182, 193, 0.2)',
    '--color-text-primary': '#ff69b4',
    '--color-text-secondary': '#ff1493',
    '--color-text-muted': '#ff69b4',
    '--glass-background': 'rgba(255, 105, 180, 0.1)',
    '--glass-border': 'rgba(255, 20, 147, 0.3)',
    '--glass-shadow': '0 8px 32px rgba(255, 105, 180, 0.4)',
    'body::before': `
          background: 
            radial-gradient(circle at 20% 50%, rgba(255, 105, 180, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 20, 147, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255, 69, 0, 0.4) 0%, transparent 50%);
        `
  },


  // Ocean theme
  'ocean': {
    name: 'Ocean Depths',
    '--color-primary': '#0ea5e9',
    '--color-secondary': '#06b6d4',
    '--color-accent': '#0891b2',
    '--color-success': '#059669',
    '--color-warning': '#d97706',
    '--color-danger': '#dc2626',
    '--color-background': 'linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0369a1 100%)',
    '--color-surface': 'rgba(56, 189, 248, 0.1)',
    '--color-surface-hover': 'rgba(56, 189, 248, 0.15)',
    '--color-surface-active': 'rgba(56, 189, 248, 0.2)',
    '--color-text-primary': '#e0f2fe',
    '--color-text-secondary': '#bae6fd',
    '--color-text-muted': '#7dd3fc',
    '--glass-background': 'rgba(14, 165, 233, 0.1)',
    '--glass-border': 'rgba(56, 189, 248, 0.25)',
    '--glass-shadow': '0 8px 32px rgba(14, 165, 233, 0.3)',
    'body::before': `
          background: 
            radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(8, 145, 178, 0.3) 0%, transparent 50%);
        `
  },

  // Forest theme
  'forest': {
    name: 'Forest Night',
    '--color-primary': '#16a34a',
    '--color-secondary': '#059669',
    '--color-accent': '#0d9488',
    '--color-success': '#22c55e',
    '--color-warning': '#eab308',
    '--color-danger': '#ef4444',
    '--color-background': 'linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)',
    '--color-surface': 'rgba(34, 197, 94, 0.08)',
    '--color-surface-hover': 'rgba(34, 197, 94, 0.12)',
    '--color-surface-active': 'rgba(34, 197, 94, 0.16)',
    '--color-text-primary': '#f0fdf4',
    '--color-text-secondary': '#dcfce7',
    '--color-text-muted': '#bbf7d0',
    '--glass-background': 'rgba(22, 163, 74, 0.1)',
    '--glass-border': 'rgba(34, 197, 94, 0.2)',
    '--glass-shadow': '0 8px 32px rgba(22, 163, 74, 0.3)',
    'body::before': `
          background: 
            radial-gradient(circle at 20% 50%, rgba(22, 163, 74, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(5, 150, 105, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(13, 148, 136, 0.3) 0%, transparent 50%);
        `
  },

  // Sunset theme
  'sunset': {
    name: 'Sunset Dreams',
    '--color-primary': '#f97316',
    '--color-secondary': '#ec4899',
    '--color-accent': '#8b5cf6',
    '--color-success': '#10b981',
    '--color-warning': '#f59e0b',
    '--color-danger': '#ef4444',
    '--color-background': 'linear-gradient(135deg, #451a03 0%, #7c2d12 50%, #ea580c 100%)',
    '--color-surface': 'rgba(249, 115, 22, 0.1)',
    '--color-surface-hover': 'rgba(249, 115, 22, 0.15)',
    '--color-surface-active': 'rgba(249, 115, 22, 0.2)',
    '--color-text-primary': '#fff7ed',
    '--color-text-secondary': '#fed7aa',
    '--color-text-muted': '#fdba74',
    '--glass-background': 'rgba(249, 115, 22, 0.1)',
    '--glass-border': 'rgba(251, 146, 60, 0.25)',
    '--glass-shadow': '0 8px 32px rgba(249, 115, 22, 0.4)',
    'body::before': `
          background: 
            radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(139, 92, 246, 0.4) 0%, transparent 50%);
        `
  },

  // Monochrome theme
  'monochrome': {
    name: 'Monochrome',
    '--color-primary': '#ffffff',
    '--color-secondary': '#d1d5db',
    '--color-accent': '#9ca3af',
    '--color-success': '#ffffff',
    '--color-warning': '#d1d5db',
    '--color-danger': '#6b7280',
    '--color-background': 'linear-gradient(135deg, #000000 0%, #111827 50%, #374151 100%)',
    '--color-surface': 'rgba(255, 255, 255, 0.05)',
    '--color-surface-hover': 'rgba(255, 255, 255, 0.1)',
    '--color-surface-active': 'rgba(255, 255, 255, 0.15)',
    '--color-text-primary': '#ffffff',
    '--color-text-secondary': '#d1d5db',
    '--color-text-muted': '#9ca3af',
    '--glass-background': 'rgba(255, 255, 255, 0.05)',
    '--glass-border': 'rgba(255, 255, 255, 0.1)',
    '--glass-shadow': '0 8px 32px rgba(0, 0, 0, 0.5)',
    'body::before': `
          background: 
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(209, 213, 219, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(156, 163, 175, 0.1) 0%, transparent 50%);
        `
  },

  'graduation': {
    name: 'Graduation',
    '--color-primary': '#8f2e7b', // Violet Vixen
    '--color-secondary': '#c0198a', // Medium Violet Red
    '--color-accent': '#d3c7a2', // Pale Olive
    '--color-success': '#703469', // Ayame Iris
    '--color-warning': '#b25385', // Signal Pink
    '--color-danger': '#dc5b70', // Swiss Chard
    '--color-background': 'linear-gradient(135deg, #703469 0%, #8f2e7b 50%, #c0198a 100%)', // Transition from Ayame Iris to Violet Vixen to Medium Violet Red
    '--color-surface': 'rgba(143, 46, 123, 0.15)', // Semi-transparent primary
    '--color-surface-hover': 'rgba(143, 46, 123, 0.25)',
    '--color-surface-active': 'rgba(143, 46, 123, 0.35)',
    '--color-text-primary': '#f8fafc',
    '--color-text-secondary': '#d3c7a2', // Pale Olive for secondary text
    '--color-text-muted': '#b25385',
    '--glass-background': 'rgba(192, 25, 138, 0.15)',
    '--glass-border': 'rgba(211, 199, 162, 0.3)',
    '--glass-shadow': '0 8px 32px rgba(143, 46, 123, 0.5)',
    'body::before': `
          background: 
            radial-gradient(circle at 20% 50%, rgba(192, 25, 138, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(143, 46, 123, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(211, 199, 162, 0.3) 0%, transparent 50%);
        `
  },

  'mbdtf': {
    name: 'My Beautiful Dark Twisted Fantasy',
    '--color-primary': '#f2274c', // A rich red
    '--color-secondary': '#a5112cff', // A darker, deeper red
    '--color-accent': '#f2e2ce', // Off-white/cream from alternate covers
    '--color-success': '#a01428', // Slightly desaturated red
    '--color-warning': '#b45050', // Lighter red
    '--color-danger': '#6b0a0a', // Almost black-red for danger
    '--color-background': 'linear-gradient(135deg, #120101 0%, #300303 50%, #6b0a0a 100%)', // Deep, dark red gradient
    '--color-surface': 'rgba(180, 40, 40, 0.15)',
    '--color-surface-hover': 'rgba(180, 40, 40, 0.25)',
    '--color-surface-active': 'rgba(180, 40, 40, 0.35)',
    '--color-text-primary': '#f8fafc',
    '--color-text-secondary': '#f2e2ce',
    '--color-text-muted': '#f2274c',
    '--glass-background': 'rgba(140, 20, 20, 0.15)',
    '--glass-border': 'rgba(242, 226, 206, 0.3)',
    '--glass-shadow': '0 8px 32px rgba(180, 40, 40, 0.5)',
    'body::before': `
          background: 
            radial-gradient(circle at 20% 50%, rgba(180, 40, 40, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(140, 20, 20, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(242, 226, 206, 0.3) 0%, transparent 50%);
        `
  },

  'ye': {
    name: 'Ye',
    '--color-primary': '#7A8CA4', // Yankees Blue
    '--color-secondary': '#F2EEE5', // The White in my Eye
    '--color-accent': '#11DA2D', // Lucent Lime
    '--color-success': '#08F42A', // Gladeye
    '--color-warning': '#7A8CA4', // Yankees Blue
    '--color-danger': '#11DA2D', // Lucent Lime
    '--color-background': 'linear-gradient(135deg, #11DA2D 0%, #F2EEE5 50%, #7A8CA4 100%)', // Lucent Lime to The White in my Eye to Yankees Blue
    '--color-surface': 'rgba(122, 140, 164, 0.15)',
    '--color-surface-hover': 'rgba(122, 140, 164, 0.25)',
    '--color-surface-active': 'rgba(122, 140, 164, 0.35)',
    '--color-text-primary': '#F2EEE5',
    '--color-text-secondary': '#F2EEE5',
    '--color-text-muted': '#7A8CA4',
    '--glass-background': 'rgba(122, 140, 164, 0.15)',
    '--glass-border': 'rgba(242, 238, 229, 0.3)',
    '--glass-shadow': '0 8px 32px rgba(122, 140, 164, 0.5)',
    'body::before': `
          background: 
            radial-gradient(circle at 20% 50%, rgba(122, 140, 164, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(242, 238, 229, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(122, 140, 164, 0.3) 0%, transparent 50%);
        `
  }
};

this.currentTheme = this.getStoredTheme();
this.styleElement = null;
this.init();}
  // Get theme from localStorage or default
  getStoredTheme() {
    const stored = localStorage.getItem('axiom_theme');
    return stored && this.themes[stored] ? stored : 'axiom-dark';
  }

  // Save theme to localStorage
  saveTheme(themeKey) {
    localStorage.setItem('axiom_theme', themeKey);
  }

  // Initialize theme manager
  init() {
    this.createStyleElement();
    this.applyTheme(this.currentTheme);
    this.createThemeSelector();
  }

  // Create dynamic style element for theme overrides
  createStyleElement() {
    this.styleElement = document.createElement('style');
    this.styleElement.id = 'theme-manager-styles';
    document.head.appendChild(this.styleElement);
  }

  // Apply theme by updating CSS custom properties
  applyTheme(themeKey) {
    if (!this.themes[themeKey]) {
      console.warn(`Theme "${themeKey}" not found. Using default.`);
      themeKey = 'axiom-dark';
    }

    const theme = this.themes[themeKey];
    const root = document.documentElement;
    
    // Apply CSS custom properties
    Object.entries(theme).forEach(([property, value]) => {
      if (property.startsWith('--')) {
        root.style.setProperty(property, value);
      }
    });

    // Handle special body::before background
    if (theme['body::before']) {
      const backgroundCSS = `
        body::before {
          ${theme['body::before']}
        }
      `;
      this.styleElement.textContent = backgroundCSS;
    }

    this.currentTheme = themeKey;
    this.saveTheme(themeKey);
    
    // Update selector if it exists
    const selector = document.getElementById('theme-selector');
    if (selector) {
      selector.value = themeKey;
    }

    // Trigger custom event for theme change
    document.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme: themeKey, themeData: theme } 
    }));
  }

  // Create theme selector dropdown
  createThemeSelector() {
    const selector = document.createElement('select');
    selector.id = 'theme-selector';
    selector.className = 'theme-selector';
    
    // Add styles for the selector
    const selectorStyles = `
      .theme-selector {
        background: var(--glass-background);
        border: 2px solid var(--glass-border);
        border-radius: var(--border-radius);
        color: var(--color-text-primary);
        font-size: 14px;
        padding: 8px 12px;
        outline: none;
        cursor: pointer;
        backdrop-filter: var(--glass-blur);
        transition: all var(--transition-normal);
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
        background-position: right 8px center;
        background-repeat: no-repeat;
        background-size: 16px;
        padding-right: 40px;
        margin-left: 16px;
      }
      
      .theme-selector:focus {
        border-color: var(--color-primary);
        background-color: var(--color-surface-hover);
        box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
      }
      
      .theme-selector option {
        background: #1e293b;
        color: var(--color-text-primary);
        padding: 8px;
      }
    `;
    
    // Add selector styles
    if (!document.getElementById('theme-selector-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'theme-selector-styles';
      styleEl.textContent = selectorStyles;
      document.head.appendChild(styleEl);
    }

    // Populate options
    Object.entries(this.themes).forEach(([key, theme]) => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = theme.name;
      if (key === this.currentTheme) {
        option.selected = true;
      }
      selector.appendChild(option);
    });


    return null;
  }

  // Get current theme
  getCurrentTheme() {
    return this.currentTheme;
  }

  // Get all available themes
  getAvailableThemes() {
    return Object.keys(this.themes);
  }

  // Add a new theme
  addTheme(key, themeData) {
    this.themes[key] = themeData;
  }

  // Remove a theme
  removeTheme(key) {
    if (key === this.currentTheme) {
      this.applyTheme('axiom-dark');
    }
    delete this.themes[key];
  }
}

  window.ThemeManager = ThemeManager;
  window.themeManager = new ThemeManager();

// Optional: Listen for theme changes
document.addEventListener('themeChanged', (event) => {
  console.log('Theme changed to:', event.detail.theme);
});

// Also make it available immediately as a window property
window.ThemeManager = ThemeManager;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}