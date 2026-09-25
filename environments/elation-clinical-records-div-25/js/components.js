/* ============================================================
   components.js — Reusable UI component factories
   ============================================================ */

const Components = {

    _isConverted(tier) {
        return typeof App !== 'undefined' && App._divConversionLevel >= tier;
    },

    _dropdownTier(id) {
        if (id === 'pref-note-format') return 25;
        if (['problem-status', 'vax-record-type', 'vitals-temp-unit', 'note-format', 'note-category', 'apt-note-format'].includes(id)) return 50;
        if (['vax-site', 'vax-ordered-by', 'vax-recall', 'vax-program', 'vax-funded-by', 'vitals-height-unit'].includes(id)) return 100;
        return 75;
    },

    _toggleTier(id) {
        if (id && id.startsWith('mips-')) return 100;
        if (id === 'pref-coded-assessments') return 25;
        if (id === 'pref-dx-in-print' || id === 'vax-is-injectable' || id === 'vax-not-send-registry') return 50;
        return 75;
    },

    _buttonTier(action) {
        if (action === 'close-modal' || action === 'confirm-delete') return 100;
        if ([
            'add-problem', 'new-visit-note', 'add-vaccination', 'add-vitals',
            'new-template', 'add-category', 'save-problem', 'save-vaccination',
            'save-vitals', 'save-template'
        ].includes(action)) return 25;
        if ([
            'create-visit-note', 'save-edit-problem', 'save-problem-and-add',
            'save-vaccination-and-add', 'save-vitals-and-add', 'save-edit-template',
            'save-edit-category', 'save-appointment-type', 'save-tag',
            'save-billing-item', 'show-add-block', 'show-add-billing', 'sign-visit-note',
            'save-category'
        ].includes(action)) return 50;
        return 75;
    },

    // ── Dropdown (native until its conversion tier) ──
    dropdown(id, currentValue, options, extraClass) {
        const cls = extraClass ? `custom-dropdown ${extraClass}` : 'custom-dropdown';
        if (!this._isConverted(this._dropdownTier(id))) {
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
        }

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
        if (this._isConverted(this._toggleTier(id))) {
            const activeClass = checked ? ' active' : '';
            const knobStyle = checked ? ' style="transform: translateX(18px)"' : '';
            return `<div class="toggle-row" id="${this.escAttr(id)}" data-op="toggle-sw" data-sw="${this.escAttr(id)}" data-sw-on="${checked ? 'true' : 'false'}">
                <div class="toggle-label">${this.esc(label || '')}</div>
                <div class="toggle-switch${activeClass}">
                    <div class="toggle-knob"${knobStyle}></div>
                </div>
            </div>`;
        }
        const checkedAttr = checked ? ' checked' : '';
        const activeClass = checked ? ' active' : '';
        return `<label class="toggle-row" for="${this.escAttr(id)}">
            <span class="toggle-label">${this.esc(label || '')}</span>
            <span class="toggle-switch${activeClass}">
                <input type="checkbox" class="toggle-input" id="${this.escAttr(id)}" data-toggle-id="${this.escAttr(id)}"${checkedAttr}>
                <span class="toggle-knob" aria-hidden="true"></span>
            </span>
        </label>`;
    },

    // ── Modal ──
    modal(id, title, bodyHtml, footerHtml, size) {
        const sizeClass = size ? ` modal-${size}` : '';
        const closeControl = this._isConverted(75)
            ? '<div class="modal-close" data-op="close-modal">&times;</div>'
            : '<button class="modal-close" data-action="close-modal" aria-label="Close modal">&times;</button>';
        return `<div class="modal-overlay" data-modal-id="${id}">
            <div class="modal${sizeClass}">
                <div class="modal-header">
                    <h2>${this.esc(title)}</h2>
                    ${closeControl}
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
        const removeBtn = !removable ? '' : this._isConverted(50)
            ? ` <div class="tag-remove" data-op="remove-tag" data-patient-id="${patientId}" data-tag="${this.escAttr(tag)}">&times;</div>`
            : ` <button type="button" class="tag-remove" data-action="remove-tag" data-patient-id="${patientId}" data-tag="${this.escAttr(tag)}" aria-label="Remove tag ${this.escAttr(tag)}">&times;</button>`;
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
            <span class="search-icon">&#128269;</span>
            <input type="text" class="search-input" id="${id}" placeholder="${this.escAttr(placeholder || 'Search...')}" value="${this.escAttr(value || '')}">
        </div>`;
    },

    // ── Button ──
    button(label, action, type, extra) {
        const cls = type ? `btn btn-${type}` : 'btn';
        const extraAttrs = extra || '';
        if (this._isConverted(this._buttonTier(action))) {
            return `<div class="${cls}" data-op="${action}" ${extraAttrs}>${label}</div>`;
        }
        return `<button class="${cls}" data-action="${action}" ${extraAttrs}>${label}</button>`;
    },

    // ── Tabs ──
    tabs(items, activeId) {
        if (this._isConverted(25)) {
            return `<div class="tabs">${items.map(item =>
                `<div class="tab${item.id === activeId ? ' active' : ''}" data-op="switch-tab" data-tab="${item.id}">${this.esc(item.label)}</div>`
            ).join('')}</div>`;
        }
        return `<div class="tabs" role="tablist">${items.map(item =>
            `<button type="button" role="tab" class="tab${item.id === activeId ? ' active' : ''}" aria-selected="${item.id === activeId ? 'true' : 'false'}" data-action="switch-tab" data-tab="${item.id}">${this.esc(item.label)}</button>`
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
