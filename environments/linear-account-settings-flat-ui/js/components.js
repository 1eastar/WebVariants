// ============================================================
// components.js — Reusable UI components
// ============================================================

const Components = {

    // Icons are copied from webarena-infinity/svg/outlined and kept inline so
    // this app can run from its own static server root.
    icon(name, className = 'action-icon') {
        const paths = {
            disconnect: '<path d="M832.6 191.4c-84.6-84.6-221.5-84.6-306 0l-96.9 96.9 51 51 96.9-96.9c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204l-96.9 96.9 51.1 51.1 96.9-96.9c84.4-84.6 84.4-221.5-.1-306.1zM446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l96.9-96.9-51.1-51.1-96.9 96.9c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l96.9-96.9-51-51-96.8 97zM260.3 209.4a8.03 8.03 0 0 0-11.3 0L209.4 249a8.03 8.03 0 0 0 0 11.3l554.4 554.4c3.1 3.1 8.2 3.1 11.3 0l39.6-39.6c3.1-3.1 3.1-8.2 0-11.3L260.3 209.4z"/>',
            logout: '<path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z"/>',
            save: '<path d="M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840zM512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"/>',
            mail: '<path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"/>',
            plus: '<path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"/><path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8Z"/>',
            key: '<path d="M608 112c-167.9 0-304 136.1-304 304 0 70.3 23.9 135 63.9 186.5L255.8 713.6l-62.3-62.3c-3.148-3.08-8.252-3.08-11.4 0l-39.8 39.8c-3.08 3.148-3.08 8.252 0 11.4l62.3 62.3-44.9 44.9-62.3-62.3c-3.148-3.08-8.252-3.08-11.4 0l-39.8 39.8c-3.08 3.148-3.08 8.252 0 11.4l110.3 111.2c3.1 3.1 8.2 3.1 11.3 0l253.6-253.6A304.1 304.1 0 0 0 608 720c167.9 0 304-136.1 304-304S775.9 112 608 112m161.2 465.2C726.2 620.3 668.9 644 608 644s-118.2-23.7-161.2-66.8C403.7 534.2 380 476.9 380 416s23.7-118.2 66.8-161.2c43-43.1 100.3-66.8 161.2-66.8s118.2 23.7 161.2 66.8c43.1 43 66.8 100.3 66.8 161.2s-23.7 118.2-66.8 161.2"/>',
            api: '<path d="M917.7 148.8l-42.4-42.4c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1.8-5.7 2.3l-76.1 76.1a199.27 199.27 0 0 0-112.1-34.3c-51.2 0-102.4 19.5-141.5 58.6L432.3 308.7a8.03 8.03 0 0 0 0 11.3L704 591.7c1.6 1.6 3.6 2.3 5.7 2.3 2 0 4.1-.8 5.7-2.3l101.9-101.9c68.9-69 77-175.7 24.3-253.5l76.1-76.1c3.1-3.2 3.1-8.3 0-11.4zM769.1 441.7l-59.4 59.4-186.8-186.8 59.4-59.4c24.9-24.9 58.1-38.7 93.4-38.7 35.3 0 68.4 13.7 93.4 38.7 24.9 24.9 38.7 58.1 38.7 93.4 0 35.3-13.8 68.4-38.7 93.4zm-190.2 105a8.03 8.03 0 0 0-11.3 0L501 613.3 410.7 523l66.7-66.7c3.1-3.1 3.1-8.2 0-11.3L441 408.6a8.03 8.03 0 0 0-11.3 0L363 475.3l-43-43a7.85 7.85 0 0 0-5.7-2.3c-2 0-4.1.8-5.7 2.3L206.8 534.2c-68.9 69-77 175.7-24.3 253.5l-76.1 76.1a8.03 8.03 0 0 0 0 11.3l42.4 42.4c1.6 1.6 3.6 2.3 5.7 2.3s4.1-.8 5.7-2.3l76.1-76.1c33.7 22.9 72.9 34.3 112.1 34.3 51.2 0 102.4-19.5 141.5-58.6l101.9-101.9c3.1-3.1 3.1-8.2 0-11.3l-43-43 66.7-66.7c3.1-3.1 3.1-8.2 0-11.3l-36.6-36.2zM441.7 769.1a131.32 131.32 0 0 1-93.4 38.7c-35.3 0-68.4-13.7-93.4-38.7a131.32 131.32 0 0 1-38.7-93.4c0-35.3 13.7-68.4 38.7-93.4l59.4-59.4 186.8 186.8-59.4 59.4z"/>',
            delete: '<path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"/>',
            groupRemove: '<path d="M888 784H664c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h224c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM373.5 510.4c-.9-8.7-1.4-17.5-1.4-26.4 0-15.9 1.5-31.4 4.3-46.5.7-3.6-1.2-7.3-4.5-8.8-13.6-6.1-26.1-14.5-36.9-25.1a127.54 127.54 0 0 1-38.7-95.4c.9-32.1 13.8-62.6 36.3-85.6 24.7-25.3 57.9-39.1 93.2-38.7 31.9.3 62.7 12.6 86 34.4 7.9 7.4 14.7 15.6 20.4 24.4 2 3.1 5.9 4.4 9.3 3.2 17.6-6.1 36.2-10.4 55.3-12.4 5.6-.6 8.8-6.6 6.3-11.6-32.5-64.3-98.9-108.7-175.7-109.9-110.9-1.7-203.3 89.2-203.3 199.9 0 62.8 28.9 118.8 74.2 155.5-31.8 14.7-61.1 35-86.5 60.4-54.8 54.7-85.8 126.9-87.8 204a8 8 0 0 0 8 8.2h56.1c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5 29.4-29.4 65.4-49.8 104.7-59.7 3.9-1 6.5-4.7 6-8.7zM824 484c0-109.4-87.9-198.3-196.9-200C516.3 282.3 424 373.2 424 484c0 62.8 29 118.8 74.2 155.5a300.95 300.95 0 0 0-86.4 60.4C357 754.6 326 826.8 324 903.8a8 8 0 0 0 8 8.2h56c4.3 0 7.9-3.4 8-7.7 1.9-58 25.4-112.3 66.7-153.5C505.8 707.7 563 684 624 684c110.4 0 200-89.5 200-200zm-109.5 90.5C690.3 598.7 658.2 612 624 612s-66.3-13.3-90.5-37.5a127.26 127.26 0 0 1-37.5-91.8c.3-32.8 13.4-64.5 36.3-88 24-24.6 56.1-38.3 90.4-38.7 33.9-.3 66.8 12.9 91 36.6 24.8 24.3 38.4 56.8 38.4 91.4-.1 34.2-13.4 66.3-37.6 90.5z"/>'
        };
        return `<svg class="${className}" aria-hidden="true" focusable="false" viewBox="0 0 1024 1024">${paths[name] || paths.delete}</svg>`;
    },

    // ---- Custom Dropdown ----
    dropdown(id, currentValue, options, extraClass = '') {
        const escaped = (currentValue || '').replace(/"/g, '&quot;');
        const menuId = `${id}-menu`;
        return `
            <div class="custom-dropdown ${extraClass}" id="${id}" data-value="${escaped}">
                <div class="dropdown-display">
                    <span class="dropdown-value">${currentValue || 'Select...'}</span>
                    <button class="dropdown-trigger" type="button" data-dropdown-id="${id}" aria-haspopup="listbox" aria-controls="${menuId}" aria-expanded="false" aria-label="Open ${id.replace(/^pref-/, '').replace(/-/g, ' ')} menu">
                        <span class="dropdown-arrow">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4.427 6.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 6H4.604a.25.25 0 00-.177.427z"/></svg>
                        </span>
                    </button>
                </div>
                <div class="dropdown-menu" id="${menuId}" role="listbox">
                    ${options.map(opt => `
                        <button class="dropdown-item ${opt === currentValue ? 'selected' : ''}" type="button" role="option" aria-selected="${opt === currentValue ? 'true' : 'false'}"
                             data-dropdown-id="${id}"
                             data-value="${opt.replace(/"/g, '&quot;')}">
                            ${opt}
                            ${opt === currentValue ? '<svg class="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/></svg>' : ''}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    },

    // ---- Toggle Switch ----
    toggle(id, checked, label = '') {
        return `
            <div class="toggle-row">
                ${label ? `<span class="toggle-label">${label}</span>` : ''}
                <button class="toggle-switch ${checked ? 'active' : ''}" id="${id}" type="button" data-toggle-id="${id}" role="switch" aria-checked="${checked ? 'true' : 'false'}">
                    <div class="toggle-knob"></div>
                </button>
            </div>
        `;
    },

    // ---- Section Header ----
    sectionHeader(title, subtitle = '') {
        return `
            <div class="section-header">
                <h2 class="section-title">${title}</h2>
                ${subtitle ? `<p class="section-subtitle">${subtitle}</p>` : ''}
            </div>
        `;
    },

    // ---- Setting Row ----
    settingRow(label, description, controlHtml) {
        return `
            <div class="setting-row">
                <div class="setting-info">
                    <div class="setting-label">${label}</div>
                    ${description ? `<div class="setting-description">${description}</div>` : ''}
                </div>
                <div class="setting-control">
                    ${controlHtml}
                </div>
            </div>
        `;
    },

    // ---- Avatar ----
    avatar(user, size = 'medium') {
        const sizeClass = `avatar-${size}`;
        if (user.avatarUrl) {
            return `<div class="avatar ${sizeClass}" style="background-image: url('${user.avatarUrl}')"></div>`;
        }
        const initials = (user.fullName || user.name || 'U')
            .split(' ')
            .map(w => w[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
        return `<div class="avatar ${sizeClass}" style="background-color: ${user.avatarColor || '#5E6AD2'}">${initials}</div>`;
    },

    // ---- Workspace Avatar ----
    workspaceAvatar(ws) {
        const initial = ws.name.charAt(0).toUpperCase();
        return `<div class="workspace-avatar" style="background-color: ${ws.avatarColor || '#5E6AD2'}">${initial}</div>`;
    },

    // ---- Modal ----
    modal(id, title, bodyHtml, footerHtml = '', size = '') {
        return `
            <div class="modal-overlay" id="${id}">
                <div class="modal ${size}">
                    <div class="modal-header">
                        <h3 class="modal-title">${title}</h3>
                        <button class="modal-close" type="button" data-action="closeModal" aria-label="Close modal">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"/></svg>
                        </button>
                    </div>
                    <div class="modal-body">${bodyHtml}</div>
                    ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
                </div>
            </div>
        `;
    },

    // ---- Inline Edit Field ----
    inlineEditField(id, label, value, actionName) {
        return `
            <div class="inline-field" id="${id}">
                <div class="inline-field-label">${label}</div>
                <div class="inline-field-value-row">
                    <span class="inline-field-value">${value || 'Not set'}</span>
                    <button class="inline-edit-btn" type="button" data-action="${actionName}" title="Edit ${label}">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L3.463 11.1a.25.25 0 00-.064.108l-.537 1.88 1.88-.537a.25.25 0 00.108-.064l8.61-8.61a.25.25 0 000-.354L12.427 2.487z"/></svg>
                    </button>
                </div>
            </div>
        `;
    },

    // ---- Notification Channel Card ----
    notificationChannelCard(channel, label, icon, settings) {
        const enabled = settings.enabled;
        const dotClass = enabled ? 'dot-active' : 'dot-inactive';
        return `
            <div class="notification-channel-card" data-channel="${channel}">
                <div class="channel-header">
                    <div class="channel-icon">${icon}</div>
                    <div class="channel-info">
                        <div class="channel-name">${label}</div>
                        <div class="channel-status-dot ${dotClass}"></div>
                    </div>
                    <button class="channel-expand-trigger" type="button" data-action="toggleChannelExpand" data-channel="${channel}" aria-expanded="false" aria-label="Toggle ${label} notification settings">
                        <svg class="channel-expand-arrow" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"/></svg>
                    </button>
                </div>
            </div>
        `;
    },

    // ---- Status Badge ----
    statusBadge(text, type = 'default') {
        return `<span class="status-badge status-badge-${type}">${text}</span>`;
    },

    // ---- Time Ago ----
    timeAgo(dateStr) {
        if (!dateStr) return 'Never';
        const date = new Date(dateStr);
        const now = new Date('2026-03-06T10:00:00Z');
        const diffMs = now - date;
        const diffMin = Math.floor(diffMs / 60000);
        const diffHr = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHr / 24);

        if (diffMin < 1) return 'Just now';
        if (diffMin < 60) return `${diffMin}m ago`;
        if (diffHr < 24) return `${diffHr}h ago`;
        if (diffDay < 7) return `${diffDay}d ago`;
        if (diffDay < 30) return `${Math.floor(diffDay / 7)}w ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    },

    formatDate(dateStr) {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    },

    formatDateTime(dateStr) {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    },

    // ---- Provider Icon ----
    providerIcon(provider) {
        const icons = {
            github: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
            gitlab: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 01-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 014.82 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0118.6 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.51L23 13.45a.84.84 0 01-.35.94z"/></svg>',
            slack: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>',
            figma: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zM8.148 24c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.014 4.539-4.588 4.539zm-.001-7.509a3.023 3.023 0 00-3.019 3.019c0 1.665 1.354 3.019 3.019 3.019 1.665 0 3.019-1.354 3.019-3.019V16.49H8.147zM8.148 15.02a4.488 4.488 0 01-4.49-4.49c0-2.476 2.014-4.49 4.49-4.49h4.588v8.98H8.148zm0-7.51a3.023 3.023 0 00-3.019 3.019c0 1.665 1.354 3.019 3.019 3.019h3.117V7.51H8.148zM15.852 15.02h-4.588v-8.98h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm0-7.51h-3.117v5.96h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-2.941-3.019-2.941z"/></svg>',
            google: '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>'
        };
        return icons[provider] || '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>';
    },

    // ---- Device Icon ----
    deviceIcon(deviceType) {
        if (deviceType === 'mobile') {
            return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>';
        }
        if (deviceType === 'tablet') {
            return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>';
        }
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>';
    },

    // ---- Notification Channel Icons ----
    channelIcon(channel) {
        const icons = {
            desktop: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
            mobile: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
            email: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
            slack: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"/></svg>'
        };
        return icons[channel] || '';
    }
};
