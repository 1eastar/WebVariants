/* ============================================================
   components.js — Reusable UI component factories
   ============================================================ */

const Components = {
    iconMap: {
        patients: 'user',
        templates: 'file-text',
        categories: 'folder',
        settings: 'setting',
        chart: 'profile',
        notes: 'snippets',
        vaccinations: 'medicine-box',
        vitals: 'heart',
        careplans: 'solution',
        add: 'plus',
        back: 'arrow-left',
        cancel: 'close',
        close: 'close',
        save: 'save',
        create: 'file-add',
        edit: 'edit',
        duplicate: 'copy',
        delete: 'delete',
        remove: 'delete',
        controlled: 'check-circle',
        resolved: 'close-circle',
        active: 'reload',
        export: 'export',
        view: 'eye',
        billing: 'credit-card',
        sign: 'check',
        tag: 'tag',
        block: 'appstore',
        category: 'folder',
        template: 'file-text',
        vaccination: 'medicine-box',
        vitalsAdd: 'heart',
        search: 'search',
        dropdown: 'caret-down',
        toggle: 'check-square'
    },

    icon(name, extraClass) {
        const safeName = this.escAttr(name || 'more');
        const cls = extraClass ? `ui-icon ${extraClass}` : 'ui-icon';
        return `<img class="${cls}" src="/svg/outlined/${safeName}.svg" alt="" aria-hidden="true">`;
    },

    iconForAction(action, label) {
        const text = String(label || '').toLowerCase();
        if (action === 'back-to-list') return this.iconMap.back;
        if (action === 'close-modal' || text === 'cancel' || text === 'close') return this.iconMap.close;
        if (action === 'confirm-delete' || action === 'delete-template' || action === 'remove-category' || action === 'remove-block' || action === 'remove-billing') return this.iconMap.delete;
        if (action === 'duplicate-template') return this.iconMap.duplicate;
        if (action === 'show-add-block') return this.iconMap.block;
        if (action === 'show-add-billing') return this.iconMap.billing;
        if (action && action.startsWith('save')) return text.includes('add another') ? 'file-add' : this.iconMap.save;
        if (action && action.startsWith('edit')) return this.iconMap.edit;
        if (action && action.startsWith('add')) {
            if (action.includes('vaccination')) return this.iconMap.vaccination;
            if (action.includes('vitals')) return this.iconMap.vitalsAdd;
            if (action.includes('billing')) return this.iconMap.billing;
            if (action.includes('block')) return this.iconMap.block;
            if (action.includes('tag')) return this.iconMap.tag;
            if (action.includes('category')) return this.iconMap.category;
            return this.iconMap.add;
        }
        if (action === 'new-template') return this.iconMap.template;
        if (action === 'new-visit-note' || action === 'create-visit-note') return this.iconMap.notes;
        if (action === 'change-problem-status') {
            if (text.includes('controlled')) return this.iconMap.controlled;
            if (text.includes('resolved')) return this.iconMap.resolved;
            return this.iconMap.active;
        }
        if (action && action.includes('export')) return this.iconMap.export;
        if (action === 'switch-tab' || text.startsWith('view')) return this.iconMap.view;
        if (action === 'sign-visit-note') return this.iconMap.sign;
        if (action === 'save-billing-item') return this.iconMap.billing;
        if (action === 'save-tag') return this.iconMap.tag;
        if (action === 'save-category' || action === 'save-edit-category') return this.iconMap.category;
        if (action === 'save-template' || action === 'save-edit-template') return this.iconMap.template;
        if (action === 'save-appointment-type') return this.iconMap.save;
        return this.iconMap.more || 'more';
    },

    iconButton(label, action, type, extra, iconName, prefix) {
        const cls = type ? `btn btn-${type} icon-button` : 'btn icon-button';
        const extraAttrs = extra || '';
        const safeLabel = this.escAttr(label || action || 'Action');
        return `<button class="${cls}" data-action="${this.escAttr(action)}" aria-label="${safeLabel}" title="${safeLabel}" ${extraAttrs}>${prefix ? `${prefix} ` : ''}${this.icon(iconName || this.iconForAction(action, label))}</button>`;
    },

    // ── Dropdown (native select for AX compatibility) ──
    dropdown(id, currentValue, options, extraClass) {
        const cls = extraClass ? `custom-dropdown ${extraClass}` : 'custom-dropdown';
        const optionValues = options.map(opt => (typeof opt === 'object' ? opt.value : opt));
        const hasEmptyOption = optionValues.some(v => v === '');
        const hasCurrentValue = optionValues.some(v => String(v) === String(currentValue));
        const placeholder = !hasEmptyOption ? '<option value="">Select...</option>' : '';
        const fallbackCurrent = currentValue && !hasCurrentValue
            ? `<option value="${this.escAttr(currentValue)}" selected>${this.esc(currentValue)}</option>`
            : '';
        const optionsHtml = options.map(opt => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const label = typeof opt === 'object' ? opt.label : opt;
            const selected = String(val) === String(currentValue) ? ' selected' : '';
            return `<option value="${this.escAttr(val)}"${selected}>${this.esc(label)}</option>`;
        }).join('');
        return `<div class="${cls}" data-dropdown-id="${id}">
            <select class="dropdown-select" id="${this.escAttr(id)}" data-dropdown-select="${this.escAttr(id)}">
                ${placeholder}
                ${fallbackCurrent}
                ${optionsHtml}
            </select>
        </div>`;
    },

    // ── Toggle Switch ──
    toggle(id, checked, label) {
        const checkedAttr = checked ? ' checked' : '';
        const activeClass = checked ? ' active' : '';
        return `<div class="toggle-row">
            <span class="toggle-label">${this.esc(label || '')}</span>
            <span class="toggle-switch${activeClass}">
                <input type="checkbox" class="toggle-input" id="${this.escAttr(id)}" data-toggle-id="${this.escAttr(id)}" aria-label="${this.escAttr(label || id)}"${checkedAttr}>
                <span class="toggle-knob" aria-hidden="true"></span>
            </span>
        </div>`;
    },

    // ── Modal ──
    modal(id, title, bodyHtml, footerHtml, size) {
        const sizeClass = size ? ` modal-${size}` : '';
        return `<div class="modal-overlay" data-modal-id="${id}">
            <div class="modal${sizeClass}">
                <div class="modal-header">
                    <h2>${this.esc(title)}</h2>
                    <button class="modal-close icon-button" data-action="close-modal" aria-label="Close modal" title="Close modal">${this.icon('close')}</button>
                </div>
                <div class="modal-body">${bodyHtml}</div>
                ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
            </div>
        </div>`;
    },

    // ── Section Header ──
    sectionHeader(title, subtitle, actions) {
        return `<div class="section-header">
            <div class="section-header-text">
                <h2>${this.esc(title)}</h2>
                ${subtitle ? `<p class="section-subtitle">${this.esc(subtitle)}</p>` : ''}
            </div>
            ${actions ? `<div class="section-header-actions">${actions}</div>` : ''}
        </div>`;
    },

    // ── Status Badge ──
    statusBadge(text, type) {
        return `<span class="status-badge status-${type || 'default'}">${this.esc(text)}</span>`;
    },

    // ── Patient Tag ──
    patientTag(tag, removable, patientId) {
        const removeBtn = removable ? ` <button type="button" class="tag-remove icon-button" data-action="remove-tag" data-patient-id="${patientId}" data-tag="${this.escAttr(tag)}" aria-label="Remove tag ${this.escAttr(tag)}" title="Remove tag">${this.icon('close')}</button>` : '';
        const starred = tag.startsWith('*') ? ' tag-starred' : '';
        return `<span class="patient-tag${starred}">${this.esc(tag)}${removeBtn}</span>`;
    },

    // ── Info Box ──
    infoBox(type, message) {
        const icons = { info: 'i', warning: '!', error: '&times;', success: '&#10003;' };
        return `<div class="info-box info-${type}">
            <span class="info-icon">${icons[type] || 'i'}</span>
            <span>${message}</span>
        </div>`;
    },

    // ── Table ──
    table(headers, rows, id) {
        const headHtml = headers.map(h => `<th>${this.esc(h)}</th>`).join('');
        const bodyHtml = rows.map(row => {
            const cells = row.map(cell => `<td>${cell}</td>`).join('');
            return `<tr>${cells}</tr>`;
        }).join('');
        return `<table class="data-table" ${id ? `id="${id}"` : ''}>
            <thead><tr>${headHtml}</tr></thead>
            <tbody>${bodyHtml}</tbody>
        </table>`;
    },

    // ── Search Input ──
    searchInput(id, placeholder, value) {
        return `<div class="search-box">
            <span class="search-icon">${this.icon('search')}</span>
            <input type="text" class="search-input" id="${id}" aria-label="${this.escAttr(placeholder || 'Search')}" placeholder="" value="${this.escAttr(value || '')}">
        </div>`;
    },

    // ── Button ──
    button(label, action, type, extra, prefix) {
        return this.iconButton(label, action, type, extra, null, prefix);
    },

    // ── Tabs ──
    tabs(items, activeId) {
        return `<div class="tabs" role="tablist">${items.map(item =>
            `<button type="button" role="tab" class="tab icon-button${item.id === activeId ? ' active' : ''}" aria-label="${this.escAttr(item.label)}" title="${this.escAttr(item.label)}" aria-selected="${item.id === activeId ? 'true' : 'false'}" data-action="switch-tab" data-tab="${item.id}">${this.icon(this.iconMap[item.id] || 'appstore')}</button>`
        ).join('')}</div>`;
    },

    // ── Empty State ──
    emptyState(message, actionBtn) {
        return `<div class="empty-state">
            <p>${this.esc(message)}</p>
            ${actionBtn || ''}
        </div>`;
    },

    // ── Vitals Display Card ──
    vitalValue(label, value, unit) {
        if (value === null || value === undefined || value === '') return '';
        return `<div class="vital-item">
            <span class="vital-label">${this.esc(label)}</span>
            <span class="vital-value">${this.esc(String(value))}${unit ? ' ' + this.esc(unit) : ''}</span>
        </div>`;
    },

    // ── Date/Time Formatting ──
    formatDate(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    },

    formatDateTime(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    },

    formatDateInput(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toISOString().split('T')[0];
    },

    timeAgo(dateStr) {
        if (!dateStr) return '';
        const now = new Date();
        const d = new Date(dateStr);
        const diffMs = now - d;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 30) return `${diffDays}d ago`;
        return this.formatDate(dateStr);
    },

    // ── Patient Age ──
    calculateAge(dob) {
        const today = new Date();
        const birth = new Date(dob);
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
        return age;
    },

    // ── Escaping ──
    esc(str) {
        if (str === null || str === undefined) return '';
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },

    escAttr(str) {
        if (str === null || str === undefined) return '';
        return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
};
