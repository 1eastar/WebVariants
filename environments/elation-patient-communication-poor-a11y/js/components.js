/* ============================================================
   Elation Patient Communication — Reusable UI Components
   ============================================================ */

const Components = {

    escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    escapeAttr(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },

    // ── Date Formatting ─────────────────────────────────────
    formatDate(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        const now = new Date();
        const diff = now - d;
        if (diff < 86400000 && d.getDate() === now.getDate()) {
            return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        }
        if (diff < 604800000) {
            return d.toLocaleDateString('en-US', { weekday: 'short' });
        }
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    },

    formatFullDate(dateStr) {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    },

    formatDateTime(dateStr) {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: 'numeric', minute: '2-digit'
        });
    },

    formatShortDate(dateStr) {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: '2-digit', day: '2-digit', year: 'numeric'
        });
    },

    formatTime(dateStr) {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleTimeString('en-US', {
            hour: 'numeric', minute: '2-digit'
        });
    },

    timeAgo(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        const now = new Date();
        const diff = Math.floor((now - d) / 1000);
        if (diff < 60) return 'just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
        return this.formatDate(dateStr);
    },

    // ── Avatar ──────────────────────────────────────────────
    avatar(name, color, size) {
        size = size || 36;
        const initials = (name || '?').split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
        return `<div class="avatar" style="width:${size}px;height:${size}px;background:${color || '#6B7280'};font-size:${Math.round(size * 0.4)}px">${this.escapeHtml(initials)}</div>`;
    },

    // ── Passport Status Badge ───────────────────────────────
    passportBadge(status) {
        const map = {
            'registered': { cls: 'badge-green', text: 'Registered', icon: '&#x1F310;' },
            'invited': { cls: 'badge-yellow', text: 'Invited', icon: '&#x1F310;' },
            'not_invited': { cls: 'badge-gray', text: 'Not Invited', icon: '&#x1F310;' }
        };
        const m = map[status] || map['not_invited'];
        return `<span class="passport-badge ${m.cls}" data-testid="passport-status-${status}"><span class="passport-icon">${m.icon}</span> ${m.text}</span>`;
    },

    // ── SMS Opt-In Badge ────────────────────────────────────
    smsOptInBadge(status) {
        const map = {
            'opted_in': { cls: 'badge-green', text: 'SMS Opted In' },
            'opted_out': { cls: 'badge-red', text: 'SMS Opted Out' },
            'never': { cls: 'badge-gray', text: 'SMS Not Opted In' }
        };
        const m = map[status] || map['never'];
        return `<span class="sms-badge ${m.cls}" data-testid="sms-status-${status}">${m.text}</span>`;
    },

    // ── Dropdown ────────────────────────────────────────────
    dropdown(id, options, selectedValue, opts) {
        const label = opts?.label || '';
        const placeholder = opts?.placeholder || opts?.emptyLabel || 'Select...';
        const storedValue = typeof App !== 'undefined' && App._dropdownValues && Object.prototype.hasOwnProperty.call(App._dropdownValues, id)
            ? App._dropdownValues[id]
            : selectedValue;
        const normalizedOptions = options.map(opt => ({
            value: typeof opt === 'object' ? opt.value : opt,
            label: typeof opt === 'object' ? opt.label : opt
        }));
        if (!normalizedOptions.some(opt => String(opt.value) === '')) {
            normalizedOptions.unshift({ value: '', label: placeholder });
        }
        const selected = normalizedOptions.find(o => String(o.value) === String(storedValue));
        const display = selected ? selected.label : (storedValue ? String(storedValue) : placeholder);
        if (typeof App !== 'undefined' && App._dropdownOptions) {
            App._dropdownOptions[id] = normalizedOptions;
        }
        let html = '';
        if (label) html += `<span class="form-label" inert>${this.escapeHtml(label)}</span>`;
        html += `<div class="custom-dropdown" id="${id}-wrapper" data-testid="${id}" data-dd-box="${this.escapeAttr(id)}">`;
        html += `<div class="dropdown-select" id="${id}" data-op="toggle-dd" data-dd="${this.escapeAttr(id)}" data-dd-value="${this.escapeAttr(String(storedValue || ''))}"><div class="dropdown-text">${this.escapeHtml(display || placeholder)}</div><div style="float:right;color:var(--color-text-tertiary)">&#9662;</div></div>`;
        html += '</div>';
        return html;
    },

    // ── Custom Toggle ───────────────────────────────────────
    toggle(id, checked, label, description) {
        let html = `<div class="toggle-row" data-testid="${id}">`;
        html += `<div class="toggle-info">`;
        if (label) html += `<div class="toggle-label" inert>${this.escapeHtml(label)}</div>`;
        if (description) html += `<div class="toggle-description" inert>${this.escapeHtml(description)}</div>`;
        html += `</div>`;
        html += `<span class="toggle-switch"><input type="checkbox" id="${id}" ${checked ? 'checked' : ''} data-toggle="${id}"><span class="toggle-slider"></span></span>`;
        html += '</div>';
        return html;
    },

    // ── Text Input ──────────────────────────────────────────
    textInput(id, value, opts) {
        const label = opts?.label || '';
        const type = opts?.type || 'text';
        const required = opts?.required ? ' required' : '';
        let html = '';
        if (label) html += `<span class="form-label" inert>${this.escapeHtml(label)}${opts?.required ? ' <span class="required">*</span>' : ''}</span>`;
        html += `<input type="${type}" id="${id}" class="form-input" value="${this.escapeAttr(value || '')}" data-testid="${id}"${required}>`;
        return html;
    },

    // ── Text Area ───────────────────────────────────────────
    textArea(id, value, opts) {
        const label = opts?.label || '';
        const rows = opts?.rows || 4;
        let html = '';
        if (label) html += `<span class="form-label" inert>${this.escapeHtml(label)}${opts?.required ? ' <span class="required">*</span>' : ''}</span>`;
        html += `<textarea id="${id}" class="form-textarea" rows="${rows}" data-testid="${id}">${this.escapeHtml(value || '')}</textarea>`;
        return html;
    },

    // ── Checkbox ────────────────────────────────────────────
    checkbox(id, checked, label) {
        return `<span class="checkbox-label" data-testid="${id}"><input type="checkbox" id="${id}" ${checked ? 'checked' : ''} data-checkbox="${id}"><span class="checkbox-text" inert>${this.escapeHtml(label)}</span></span>`;
    },

    // ── Radio Group ─────────────────────────────────────────
    radioGroup(name, options, selectedValue) {
        let html = `<div class="radio-group" data-radio-group="${name}">`;
        for (const opt of options) {
            const checked = opt.value === selectedValue ? ' checked' : '';
            html += `<span class="radio-option"><input type="radio" name="${name}" value="${this.escapeAttr(String(opt.value))}"${checked} data-radio="${name}"><span class="radio-text" inert>${this.escapeHtml(opt.label)}</span>`;
            if (opt.description) html += `<span class="radio-description" inert>${this.escapeHtml(opt.description)}</span>`;
            html += '</span>';
        }
        html += '</div>';
        return html;
    },

    // ── Tag ─────────────────────────────────────────────────
    tag(text, opts) {
        const removable = opts?.removable ? `<button type="button" class="tag-remove" data-action="remove-tag" data-tag="${this.escapeAttr(text)}" data-patient="${opts.patientId || ''}">&times;</button>` : '';
        const cls = opts?.cls || '';
        return `<span class="tag ${cls}"><span class="tag-text" inert>${this.escapeHtml(text)}</span>${removable}</span>`;
    },

    // ── Visual Grid (non-table markup) ─────────────────────
    gridSlot(content, className) {
        const cls = className ? ` data-grid-slot ${className}` : ' data-grid-slot';
        return `<div class="${cls.trim()}">${content}</div>`;
    },

    gridRecord(slots, opts) {
        const cls = opts?.className ? `data-grid-record ${opts.className}` : 'data-grid-record';
        const attrs = opts?.attrs ? ` ${opts.attrs}` : '';
        return `<div class="${cls}"${attrs}>${slots.map(slot => {
            if (typeof slot === 'string') return this.gridSlot(slot);
            return this.gridSlot(slot.content || '', slot.className || '');
        }).join('')}</div>`;
    },

    gridTable(headers, recordsHtml, opts) {
        const cls = opts?.className ? `data-grid-table ${opts.className}` : 'data-grid-table';
        const attrs = [
            opts?.testId ? `data-testid="${this.escapeAttr(opts.testId)}"` : '',
            opts?.style ? `style="${this.escapeAttr(opts.style)}"` : ''
        ].filter(Boolean).join(' ');
        const attrText = attrs ? ` ${attrs}` : '';
        const head = this.gridRecord(headers.map(h => ({
            content: h && typeof h === 'object' && h.html !== undefined
                ? h.html
                : `<span inert>${this.escapeHtml(h)}</span>`,
            className: 'data-grid-heading'
        })));
        return `<div class="${cls}"${attrText}><div class="data-grid-head">${head}</div><div class="data-grid-body">${recordsHtml}</div></div>`;
    },

    // ── Info/Warning/Error Boxes ────────────────────────────
    infoBox(text) {
        return `<div class="info-box"><span class="box-icon">i</span> ${this.escapeHtml(text)}</div>`;
    },

    warningBox(text) {
        return `<div class="warning-box"><span class="box-icon">!</span> ${this.escapeHtml(text)}</div>`;
    },

    errorBox(text) {
        return `<div class="error-box"><span class="box-icon">x</span> ${this.escapeHtml(text)}</div>`;
    },

    successBox(text) {
        return `<div class="success-box"><span class="box-icon">&#x2713;</span> ${this.escapeHtml(text)}</div>`;
    },

    // ── Modal ───────────────────────────────────────────────
    showModal(title, bodyHtml, footerHtml) {
        const overlay = document.getElementById('modalOverlay');
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalBody').innerHTML = bodyHtml;
        document.getElementById('modalFooter').innerHTML = footerHtml || '';
        overlay.style.display = 'flex';
    },

    closeModal() {
        document.getElementById('modalOverlay').style.display = 'none';
    },

    confirm(title, message, onConfirm) {
        this.showModal(title, `<p>${this.escapeHtml(message)}</p>`,
            `<button class="btn btn-secondary" data-action="close-modal">Cancel</button>
             <button class="btn btn-primary" data-action="confirm-modal">Confirm</button>`
        );
        window._modalConfirmCallback = onConfirm;
    },

    confirmDanger(title, message, onConfirm) {
        this.showModal(title, `<p>${this.escapeHtml(message)}</p>`,
            `<button class="btn btn-secondary" data-action="close-modal">Cancel</button>
             <button class="btn btn-danger" data-action="confirm-modal">Confirm</button>`
        );
        window._modalConfirmCallback = onConfirm;
    },

    // ── Toast ───────────────────────────────────────────────
    showToast(message, type) {
        type = type || 'info';
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    // ── Empty State ─────────────────────────────────────────
    emptyState(icon, title, text) {
        return `<div class="empty-state"><div class="empty-icon">${icon}</div><div class="poor-heading poor-heading-3">${this.escapeHtml(title)}</div><p>${this.escapeHtml(text)}</p></div>`;
    },

    // ── Pagination ──────────────────────────────────────────
    pagination(page, totalPages, total) {
        if (totalPages <= 1) return '';
        const start = (page - 1) * AppState.patientListPageSize + 1;
        const end = Math.min(page * AppState.patientListPageSize, total);
        let html = `<div class="pagination" data-testid="pagination">`;
        html += `<span class="page-info">${start}-${end} of ${total}</span>`;
        html += `<button class="btn btn-icon" data-action="prev-page" ${page <= 1 ? 'disabled' : ''}>&#x25C0;</button>`;
        html += `<button class="btn btn-icon" data-action="next-page" ${page >= totalPages ? 'disabled' : ''}>&#x25B6;</button>`;
        html += '</div>';
        return html;
    },

    // ── Attachment Display ───────────────────────────────────
    attachment(att) {
        return `<div class="attachment-chip"><span class="attachment-icon">&#x1F4CE;</span><span class="attachment-name">${this.escapeHtml(att.name)}</span><span class="attachment-size">${this.escapeHtml(att.size || '')}</span></div>`;
    }
};
