/* ============================================================
   components.js — Reusable UI component factories
   ============================================================ */

const Components = {

    // ── Dropdown ──
    dropdown(id, currentValue, options, extraClass) {
        const cls = extraClass ? `custom-dropdown ${extraClass}` : 'custom-dropdown';
        const storedValue = typeof App !== 'undefined' && App._dropdownValues && Object.prototype.hasOwnProperty.call(App._dropdownValues, id)
            ? App._dropdownValues[id]
            : currentValue;
        const optionValues = options.map(opt => (typeof opt === 'object' ? opt.value : opt));
        const hasEmptyOption = optionValues.some(v => v === '');
        const hasCurrentValue = optionValues.some(v => String(v) === String(storedValue));
        const normalizedOptions = !hasEmptyOption
            ? [{ value: '', label: 'Select...' }, ...options]
            : [...options];
        const selectedLabel = hasCurrentValue || !storedValue
            ? (normalizedOptions.find(opt => String(typeof opt === 'object' ? opt.value : opt) === String(storedValue)) || normalizedOptions[0] || '')
            : { value: storedValue, label: storedValue };
        const selectedText = typeof selectedLabel === 'object' ? selectedLabel.label : selectedLabel;
        if (typeof App !== 'undefined' && App._dropdownOptions) {
            App._dropdownOptions[id] = normalizedOptions.map(opt => ({
                value: typeof opt === 'object' ? opt.value : opt,
                label: typeof opt === 'object' ? opt.label : opt
            }));
        }
        return `<div class="${cls}" data-dd-box="${this.escAttr(id)}">
            <div class="dropdown-select" id="${this.escAttr(id)}" data-op="toggle-dd" data-dd="${this.escAttr(id)}" data-dd-value="${this.escAttr(storedValue || '')}">
                <span>${this.esc(selectedText || 'Select...')}</span><span style="float:right;color:var(--text-tertiary)">&#9662;</span>
            </div>
        </div>`;
    },

    // ── Toggle Switch ──
    toggle(id, checked, label) {
        const checkedAttr = checked ? ' checked' : '';
        const activeClass = checked ? ' active' : '';
        return `<div class="toggle-row" data-toggle-row="${this.escAttr(id)}">
            <span class="toggle-label" inert>${this.esc(label || '')}</span>
            <span class="toggle-switch${activeClass}">
                <input type="checkbox" class="toggle-input" id="${this.escAttr(id)}" data-toggle-id="${this.escAttr(id)}"${checkedAttr}>
                <span class="toggle-knob"></span>
            </span>
        </div>`;
    },

    // ── Modal ──
    modal(id, title, bodyHtml, footerHtml, size) {
        const sizeClass = size ? ` modal-${size}` : '';
        return `<div class="modal-overlay" data-modal-id="${id}">
            <div class="modal${sizeClass}">
                <div class="modal-header">
                    <div class="poor-heading poor-heading-2">${this.esc(title)}</div>
                    <button class="modal-close" data-action="close-modal">&times;</button>
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
                <div class="poor-heading poor-heading-2">${this.esc(title)}</div>
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
        const removeBtn = removable ? ` <button type="button" class="tag-remove" data-action="remove-tag" data-patient-id="${patientId}" data-tag="${this.escAttr(tag)}">&times;</button>` : '';
        const starred = tag.startsWith('*') ? ' tag-starred' : '';
        return `<span class="patient-tag${starred}"><span class="patient-tag-text" inert>${this.esc(tag)}</span>${removeBtn}</span>`;
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
        const headHtml = headers.map(h => `<div class="data-table-cell data-table-heading"><span class="column-heading" inert>${this.esc(h)}</span></div>`).join('');
        const bodyHtml = rows.map(row => {
            const cells = row.map(cell => `<div class="data-table-cell">${cell}</div>`).join('');
            return `<div class="data-table-row">${cells}</div>`;
        }).join('');
        return `<div class="data-table" ${id ? `id="${id}"` : ''} style="--cols:${headers.length}">
            <div class="data-table-head"><div class="data-table-row">${headHtml}</div></div>
            <div class="data-table-body">${bodyHtml}</div>
        </div>`;
    },

    // ── Search Input ──
    searchInput(id, placeholder, value) {
        return `<div class="search-box">
            <span class="search-icon">&#128269;</span>
            <input type="text" class="search-input" id="${id}" value="${this.escAttr(value || '')}">
        </div>`;
    },

    // ── Button ──
    button(label, action, type, extra) {
        const cls = type ? `btn btn-${type}` : 'btn';
        const extraAttrs = extra || '';
        return `<button class="${cls}" data-action="${action}" ${extraAttrs}>${label}</button>`;
    },

    // ── Tabs ──
    tabs(items, activeId) {
        return `<div class="tabs">${items.map(item =>
            `<button type="button" class="tab${item.id === activeId ? ' active' : ''}" data-action="switch-tab" data-tab="${item.id}">${this.esc(item.label)}</button>`
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
            <span class="vital-label" inert>${this.esc(label)}</span>
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
