
const plugins = localStorage.getItem("axiom_plugins");

window.axiomAPI = {
    
    addSidebarIcon: function(material_symbol, url, use_proxy, tooltip) {
        try {
            const pluginArea = document.getElementById("plugin-area");
            if (!pluginArea) {
                console.error('Plugin area element not found');
                return 1;
            }

            const newPlugin = document.createElement("div");
            newPlugin.classList.add("sidebar-item");
            newPlugin.title = tooltip || 'Plugin';
            
            newPlugin.onclick = () => {
                if (typeof open_page === 'function') {
                    open_page(url, use_proxy);
                } else {
                    console.error('open_page function not found');
                    if (!use_proxy) {
                        window.open(url, '_blank');
                    }
                }
            };
            
            newPlugin.innerHTML = `<span class="material-symbols-outlined">${material_symbol}</span>`;
            pluginArea.appendChild(newPlugin);
            
            console.log(`Plugin sidebar icon added: ${material_symbol}`);
            return 0;
        } catch (e) {
            console.error('Error adding sidebar icon:', e);
            return 1;
        }
    },
    
    addTab: function(name, url) {
        try {
            if (typeof createTab === 'function') {
                createTab(name, url);
                console.log(`Tab created: ${name} -> ${url}`);
                return 0;
            } else {
                console.error('createTab function not found');
                return 1;
            }
        } catch (e) {
            console.error('Error creating tab:', e);
            return 1;
        }
    },

    getAllTabs: function() {
        try {
            const tabs = document.querySelectorAll('.tab');
            return Array.from(tabs).map(tab => ({
                id: tab.id,
                title: tab.querySelector('p').textContent,
                active: tab.classList.contains('active'),
                element: tab
            }));
        } catch (e) {
            console.error('Error getting tabs:', e);
            return [];
        }
    },

    getActiveTab: function() {
        try {
            const activeTab = document.querySelector('.tab.active');
            if (!activeTab) return null;
            
            return {
                id: activeTab.id,
                title: activeTab.querySelector('p').textContent,
                iframe: document.getElementById(activeTab.id + '-frame'),
                element: activeTab
            };
        } catch (e) {
            console.error('Error getting active tab:', e);
            return null;
        }
    },

    switchToTab: function(tabId) {
        try {
            const tab = document.getElementById(tabId);
            if (tab && tab.onclick) {
                tab.onclick();
                return 0;
            }
            return 1;
        } catch (e) {
            console.error('Error switching tab:', e);
            return 1;
        }
    },

    closeTab: function(tabId) {
        try {
            if (typeof removeTab === 'function') {
                removeTab(tabId);
                return 0;
            }
            return 1;
        } catch (e) {
            console.error('Error closing tab:', e);
            return 1;
        }
    },

    renameTab: function(tabId, newName) {
        try {
            const tab = document.getElementById(tabId);
            if (!tab) return 1;
            
            const titleElement = tab.querySelector('p');
            if (titleElement) {
                titleElement.textContent = newName;
                return 0;
            }
            return 1;
        } catch (e) {
            console.error('Error renaming tab:', e);
            return 1;
        }
    },

    duplicateTab: function(tabId) {
        try {
            const tab = document.getElementById(tabId);
            if (!tab) return 1;
            
            const iframe = document.getElementById(tabId + '-frame');
            if (!iframe) return 1;
            
            const url = iframe.src;
            const title = tab.querySelector('p').textContent + ' (Copy)';
            
            return this.addTab(title, url);
        } catch (e) {
            console.error('Error duplicating tab:', e);
            return 1;
        }
    },

    getTabContent: function(tabId) {
        try {
            const iframe = document.getElementById(tabId + '-frame');
            if (!iframe) return null;
            
            return {
                url: iframe.src,
                document: iframe.contentDocument,
                window: iframe.contentWindow,
                title: iframe.contentDocument?.title || 'Unknown'
            };
        } catch (e) {
            console.error('Error getting tab content:', e);
            return null;
        }
    },

    injectCSS: function(tabId, css) {
        try {
            const iframe = document.getElementById(tabId + '-frame');
            if (!iframe || !iframe.contentDocument) return 1;
            
            const style = iframe.contentDocument.createElement('style');
            style.textContent = css;
            iframe.contentDocument.head.appendChild(style);
            
            console.log(`CSS injected into tab ${tabId}`);
            return 0;
        } catch (e) {
            console.error('Error injecting CSS:', e);
            return 1;
        }
    },

    injectJS: function(tabId, js) {
        try {
            const iframe = document.getElementById(tabId + '-frame');
            if (!iframe || !iframe.contentWindow) return 1;
            
            iframe.contentWindow.eval(js);
            console.log(`JavaScript injected into tab ${tabId}`);
            return 0;
        } catch (e) {
            console.error('Error injecting JavaScript:', e);
            return 1;
        }
    },

    executeInTab: function(tabId, func) {
        try {
            const iframe = document.getElementById(tabId + '-frame');
            if (!iframe || !iframe.contentWindow) return 1;
            
            const result = iframe.contentWindow.eval(`(${func.toString()})()`);
            return result;
        } catch (e) {
            console.error('Error executing function in tab:', e);
            return null;
        }
    },

    toggleSidebar: function() {
        try {
            if (typeof toggleSidebarPosition === 'function') {
                toggleSidebarPosition();
                return 0;
            }
            return 1;
        } catch (e) {
            console.error('Error toggling sidebar:', e);
            return 1;
        }
    },

    openAppSidebar: function(appId, url, title) {
        try {
            if (typeof toggleAppSidebar === 'function') {
                toggleAppSidebar(appId, url, title);
                return 0;
            }
            return 1;
        } catch (e) {
            console.error('Error opening app sidebar:', e);
            return 1;
        }
    },

    closeAppSidebar: function() {
        try {
            if (typeof closeAppSidebar === 'function') {
                closeAppSidebar();
                return 0;
            }
            return 1;
        } catch (e) {
            console.error('Error closing app sidebar:', e);
            return 1;
        }
    },


    addTheme: function(themeKey, themeData) {
        try {
            if (!themeKey || typeof themeKey !== 'string') {
                console.error('Theme key must be a non-empty string');
                return 1;
            }
            
            if (!themeData || typeof themeData !== 'object') {
                console.error('Theme data must be an object');
                return 1;
            }
            
            if (!themeData.name) {
                themeData.name = themeKey.charAt(0).toUpperCase() + themeKey.slice(1);
            }
            
            if (window.themeManager && typeof window.themeManager.addTheme === 'function') {
                window.themeManager.addTheme(themeKey, themeData);
                return 0;
            } else {
                console.error('ThemeManager not available');
                return 1;
            }
        } catch (e) {
            console.error('Failed to add theme:', e);
            return 1;
        }
    },

    removeTheme: function(themeKey) {
        try {
            if (window.themeManager && typeof window.themeManager.removeTheme === 'function') {
                return window.themeManager.removeTheme(themeKey) ? 0 : 1;
            } else {
                console.error('ThemeManager not available');
                return 1;
            }
        } catch (e) {
            console.error('Failed to remove theme:', e);
            return 1;
        }
    },

    getCurrentTheme: function() {
        try {
            if (window.themeManager && typeof window.themeManager.getCurrentTheme === 'function') {
                return window.themeManager.getCurrentTheme();
            } else {
                console.error('ThemeManager not available');
                return null;
            }
        } catch (e) {
            console.error('Failed to get current theme:', e);
            return null;
        }
    },

    applyCustomCSS: function(css) {
        try {
            const existingStyle = document.getElementById('axiom-plugin-custom-css');
            if (existingStyle) {
                existingStyle.textContent = css;
            } else {
                const style = document.createElement('style');
                style.id = 'axiom-plugin-custom-css';
                style.textContent = css;
                document.head.appendChild(style);
            }
            return 0;
        } catch (e) {
            console.error('Error applying custom CSS:', e);
            return 1;
        }
    },

 
    openMiniplayer: function(url, title) {
        try {
            sessionStorage.setItem('miniplayer', url);
            if (title) {
                const miniplayerTitle = document.getElementById('miniplayerTitle');
                if (miniplayerTitle) miniplayerTitle.textContent = title;
            }
            console.log(`Miniplayer opened: ${url}`);
            return 0;
        } catch (e) {
            console.error('Error opening miniplayer:', e);
            return 1;
        }
    },

    closeMiniplayer: function() {
        try {
            if (typeof closeMiniPlayer === 'function') {
                closeMiniPlayer();
                return 0;
            }
            sessionStorage.removeItem('miniplayer');
            return 0;
        } catch (e) {
            console.error('Error closing miniplayer:', e);
            return 1;
        }
    },

    setMiniplayerPosition: function(position) {
        try {
            const validPositions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
            if (!validPositions.includes(position)) {
                console.error('Invalid miniplayer position');
                return 1;
            }
            
            if (typeof setMiniPlayerPosition === 'function') {
                setMiniPlayerPosition(position);
                return 0;
            }
            return 1;
        } catch (e) {
            console.error('Error setting miniplayer position:', e);
            return 1;
        }
    },

    storage: {
        set: function(key, value) {
            try {
                localStorage.setItem(`axiom_plugin_${key}`, JSON.stringify(value));
                return 0;
            } catch (e) {
                console.error('Error setting storage:', e);
                return 1;
            }
        },
        
        get: function(key) {
            try {
                const value = localStorage.getItem(`axiom_plugin_${key}`);
                return value ? JSON.parse(value) : null;
            } catch (e) {
                console.error('Error getting storage:', e);
                return null;
            }
        },
        
        remove: function(key) {
            try {
                localStorage.removeItem(`axiom_plugin_${key}`);
                return 0;
            } catch (e) {
                console.error('Error removing storage:', e);
                return 1;
            }
        },
        
        clear: function() {
            try {
                const keys = Object.keys(localStorage).filter(key => key.startsWith('axiom_plugin_'));
                keys.forEach(key => localStorage.removeItem(key));
                return 0;
            } catch (e) {
                console.error('Error clearing plugin storage:', e);
                return 1;
            }
        }
    },

    events: {
        listeners: {},
        
        on: function(event, callback) {
            if (!this.listeners[event]) {
                this.listeners[event] = [];
            }
            this.listeners[event].push(callback);
            console.log(`Event listener added for: ${event}`);
        },
        
        off: function(event, callback) {
            if (this.listeners[event]) {
                this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
            }
        },
        
        emit: function(event, data) {
            if (this.listeners[event]) {
                this.listeners[event].forEach(callback => {
                    try {
                        callback(data);
                    } catch (e) {
                        console.error(`Error in event listener for ${event}:`, e);
                    }
                });
            }
        }
    },

    notify: function(message, type = 'info', duration = 3000) {
        try {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--glass-background);
                backdrop-filter: var(--glass-blur);
                border: 1px solid var(--glass-border);
                border-radius: var(--border-radius);
                padding: 12px 16px;
                color: var(--color-text-primary);
                font-family: inherit;
                font-size: 14px;
                z-index: 10000;
                max-width: 300px;
                word-wrap: break-word;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
            `;
            
            if (type === 'error') {
                notification.style.borderColor = '#ef4444';
                notification.style.background = 'rgba(239, 68, 68, 0.1)';
            } else if (type === 'success') {
                notification.style.borderColor = '#10b981';
                notification.style.background = 'rgba(16, 185, 129, 0.1)';
            } else if (type === 'warning') {
                notification.style.borderColor = '#f59e0b';
                notification.style.background = 'rgba(245, 158, 11, 0.1)';
            }
            
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.opacity = '1';
                notification.style.transform = 'translateX(0)';
            }, 10);
            
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, duration);
            
            return 0;
        } catch (e) {
            console.error('Error showing notification:', e);
            return 1;
        }
    },

    addContextMenuItem: function(label, callback, condition) {
        try {
            if (!window.axiomContextMenu) {
                window.axiomContextMenu = [];
                this.initContextMenu();
            }
            
            window.axiomContextMenu.push({
                label: label,
                callback: callback,
                condition: condition || (() => true)
            });
            
            return 0;
        } catch (e) {
            console.error('Error adding context menu item:', e);
            return 1;
        }
    },

    initContextMenu: function() {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            
            const existingMenu = document.getElementById('axiom-context-menu');
            if (existingMenu) existingMenu.remove();
            
            const menu = document.createElement('div');
            menu.id = 'axiom-context-menu';
            menu.style.cssText = `
                position: fixed;
                background: var(--glass-background);
                backdrop-filter: var(--glass-blur);
                border: 1px solid var(--glass-border);
                border-radius: var(--border-radius);
                padding: 8px 0;
                min-width: 150px;
                z-index: 10001;
                font-family: inherit;
                font-size: 14px;
            `;
            
            window.axiomContextMenu
                .filter(item => item.condition())
                .forEach(item => {
                    const menuItem = document.createElement('div');
                    menuItem.textContent = item.label;
                    menuItem.style.cssText = `
                        padding: 8px 16px;
                        cursor: pointer;
                        transition: background 0.2s ease;
                        color: var(--color-text-primary);
                    `;
                    
                    menuItem.onmouseover = () => {
                        menuItem.style.background = 'var(--color-surface-hover)';
                    };
                    
                    menuItem.onmouseout = () => {
                        menuItem.style.background = 'transparent';
                    };
                    
                    menuItem.onclick = () => {
                        item.callback(e);
                        menu.remove();
                    };
                    
                    menu.appendChild(menuItem);
                });
            
            menu.style.left = e.pageX + 'px';
            menu.style.top = e.pageY + 'px';
            
            document.body.appendChild(menu);

            setTimeout(() => {
                document.addEventListener('click', () => menu.remove(), { once: true });
            }, 10);
        });
    },

    addKeyboardShortcut: function(key, callback, description) {
        try {
            if (!window.axiomShortcuts) {
                window.axiomShortcuts = new Map();
                this.initKeyboardHandler();
            }
            
            window.axiomShortcuts.set(key.toLowerCase(), {
                callback: callback,
                description: description || 'Plugin shortcut'
            });
            
            console.log(`Keyboard shortcut added: ${key}`);
            return 0;
        } catch (e) {
            console.error('Error adding keyboard shortcut:', e);
            return 1;
        }
    },

    initKeyboardHandler: function() {
        document.addEventListener('keydown', (e) => {
            const key = (e.ctrlKey ? 'ctrl+' : '') + 
                      (e.altKey ? 'alt+' : '') + 
                      (e.shiftKey ? 'shift+' : '') + 
                      e.key.toLowerCase();
            
            const shortcut = window.axiomShortcuts.get(key);
            if (shortcut) {
                e.preventDefault();
                try {
                    shortcut.callback(e);
                } catch (error) {
                    console.error(`Error executing shortcut ${key}:`, error);
                }
            }
        });
    },


    validatePlugin: function(pluginUrl) {
        try {
            new URL(pluginUrl);
            return true;
        } catch (e) {
            return false;
        }
    },

    listLoadedPlugins: function() {
        try {
            const scripts = document.querySelectorAll('script');
            const pluginScripts = Array.from(scripts).filter(script => {
                const textContent = script.textContent || '';
                return textContent.includes('axiomAPI') || 
                       (plugins && script.src && plugins.includes(script.src));
            });
            return pluginScripts.map(script => ({
                src: script.src || 'inline',
                id: script.id || 'anonymous',
                loaded: true
            }));
        } catch (e) {
            console.error('Error listing plugins:', e);
            return [];
        }
    },

    getSystemInfo: function() {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
        };
    },

    createFloatingPanel: function(content, options = {}) {
        try {
            const panel = document.createElement('div');
            const panelId = 'axiom-panel-' + Math.random().toString(36).substr(2, 9);
            panel.id = panelId;
            
            panel.style.cssText = `
                position: fixed;
                background: var(--glass-background);
                backdrop-filter: var(--glass-blur);
                border: 1px solid var(--glass-border);
                border-radius: var(--border-radius);
                box-shadow: var(--box-shadow-normal);
                z-index: 9999;
                min-width: ${options.width || '300px'};
                min-height: ${options.height || '200px'};
                top: ${options.top || '50px'};
                left: ${options.left || '50px'};
                resize: both;
                overflow: auto;
            `;
            
            if (options.title) {
                const header = document.createElement('div');
                header.style.cssText = `
                    background: var(--color-surface);
                    padding: 12px 16px;
                    border-bottom: 1px solid var(--glass-border);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: move;
                    user-select: none;
                `;
                
                header.innerHTML = `
                    <span style="color: var(--color-text-primary); font-weight: 600;">${options.title}</span>
                    <span onclick="document.getElementById('${panelId}').remove()" 
                          style="cursor: pointer; color: var(--color-text-primary); font-size: 18px;">×</span>
                `;
                
                panel.appendChild(header);
                // no way in hell this works without jquery ui
                this.makeDraggable(panel, header);
            }
            
       
            const contentDiv = document.createElement('div');
            contentDiv.style.padding = '16px';
            contentDiv.innerHTML = content;
            panel.appendChild(contentDiv);
            
            document.body.appendChild(panel);
            
            return {
                id: panelId,
                element: panel,
                close: () => panel.remove(),
                update: (newContent) => contentDiv.innerHTML = newContent
            };
        } catch (e) {
            console.error('Error creating floating panel:', e);
            return null;
        }
    },

    makeDraggable: function(element, handle) {
        let isDragging = false;
        let currentX, currentY, initialX, initialY, xOffset = 0, yOffset = 0;

        handle.addEventListener('mousedown', (e) => {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            isDragging = true;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                xOffset = currentX;
                yOffset = currentY;
                element.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }
};

function loadPlugins() {
    if (!plugins) {
        console.log('No plugins found in localStorage');
        return;
    }
    
    const pluginUrls = plugins.split(",").filter(plugin => plugin.trim()); 

    if (pluginUrls.length === 0) {
        console.log('No valid plugin URLs found');
        return;
    }
    
    console.log(`Loading ${pluginUrls.length} plugins...`);
    
    pluginUrls.forEach((plugin, index) => {
        const trimmedPlugin = plugin.trim();
        if (!trimmedPlugin) return;
        
        try {
            new URL(trimmedPlugin);
            
            const script = document.createElement('script');
            script.setAttribute('data-plugin-url', trimmedPlugin);
            script.setAttribute('data-plugin-index', index);
            
            // Enhanced fetch with better error handling
            fetch(trimmedPlugin)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(contents => {
                    script.textContent = contents;
                    
                    script.onload = () => {
                        console.log(`✓ Successfully loaded plugin: ${trimmedPlugin}`);
                        window.axiomAPI.events.emit('pluginLoaded', {
                            url: trimmedPlugin,
                            index: index
                        });
                    };
                    
                    document.body.appendChild(script);
                })
                .catch(error => {
                    console.error(`✗ Failed to load plugin: ${trimmedPlugin}`, error);
                    window.axiomAPI.events.emit('pluginError', {
                        url: trimmedPlugin,
                        error: error.message,
                        index: index
                    });
                });
            
        } catch (urlError) {
            console.error(`Invalid plugin URL: ${trimmedPlugin}`, urlError);
            window.axiomAPI.events.emit('pluginError', {
                url: trimmedPlugin,
                error: 'Invalid URL format',
                index: index
            });
        }
    });
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadPlugins();
        window.axiomAPI.events.emit('apiReady');
    });
} else {
    loadPlugins();
    window.axiomAPI.events.emit('apiReady');
}

window.reloadPlugins = function() {
    console.log('Reloading plugins...');
    
    const existingPluginScripts = document.querySelectorAll('script[data-plugin-url]');
    existingPluginScripts.forEach(script => script.remove());
    
    window.axiomAPI.storage.clear();
    
    loadPlugins();
    
    window.axiomAPI.events.emit('pluginsReloaded');
};
