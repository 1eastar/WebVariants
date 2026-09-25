// ============================================================
// components.js — Reusable UI components for Gmail Accounts & Contacts
// ============================================================

const Components = {

    iconMap: {
        add: 'plus',
        apartment: 'apartment',
        arrow_downward: 'sort-descending',
        arrow_upward: 'sort-ascending',
        cake: 'gift',
        calendar_today: 'calendar',
        campaign: 'alert',
        cancel: 'close-circle',
        check: 'check',
        check_circle: 'check-circle',
        chevron_left: 'left',
        chevron_right: 'right',
        close: 'close',
        cloud_download: 'cloud-download',
        cloud_upload: 'cloud-upload',
        contacts: 'contacts',
        delete: 'delete',
        done: 'check',
        download: 'download',
        edit: 'edit',
        email: 'mail',
        error: 'close-circle',
        expand_more: 'caret-down',
        help_outline: 'info',
        history: 'history',
        import_export: 'swap',
        info: 'info',
        label: 'tag',
        label_off: 'disconnect',
        language: 'link',
        link: 'link',
        location_on: 'environment',
        lock: 'lock',
        mail: 'mail',
        map: 'environment',
        menu: 'menu',
        merge_type: 'merge-cells',
        people: 'group',
        person_add: 'user-add',
        person_remove: 'user-delete',
        person_off: 'user-delete',
        person_outline: 'user',
        phone: 'phone',
        play_circle: 'youtube',
        save: 'save',
        schedule: 'history',
        search: 'search',
        settings: 'setting',
        shop: 'shopping',
        shopping_cart: 'shopping',
        star: 'star',
        star_border: 'star',
        supervisor_account: 'group',
        sync: 'sync',
        warning: 'warning'
    },

    escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    },

    escapeAttr(str) {
        return this.escapeHtml(str);
    },

    formatDate(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        const now = new Date();
        const diff = now - d;
        const days = Math.floor(diff / 86400000);
        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return d.toLocaleDateString('en-US', { weekday: 'long' });
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    },

    formatDateTime(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
            ' ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    },

    timeAgo(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        const now = new Date();
        const diff = Math.floor((now - d) / 1000);
        if (diff < 60) return 'just now';
        if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
        if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
        if (diff < 2592000) return Math.floor(diff / 86400) + 'd ago';
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    },

    avatar(name, color, size) {
        size = size || 40;
        const initials = (name || '?').split(' ').map(w => w[0] || '').join('').toUpperCase().slice(0, 2);
        const fontSize = Math.round(size * 0.4);
        return `<div class="avatar" style="width:${size}px;height:${size}px;background:${color || '#757575'};font-size:${fontSize}px;line-height:${size}px;">${this.escapeHtml(initials)}</div>`;
    },

    icon(name, cls) {
        const className = cls ? ` ${this.escapeAttr(cls)}` : '';
        return `<span class="material-icons${className}" aria-hidden="true">${this.escapeHtml(name)}</span>`;
    },

    svgIcon(name, cls) {
        const fileName = this.iconMap[name];
        const className = cls ? ` ${this.escapeAttr(cls)}` : '';
        if (fileName) {
            return `<img class="svg-icon${className}" src="icons/outlined/${fileName}.svg" alt="" aria-hidden="true" focusable="false">`;
        }
        return this.icon(name, cls);
    },

    srOnly(text) {
        return `<span class="sr-only">${this.escapeHtml(text)}</span>`;
    },

    badge(count, cls) {
        if (!count) return '';
        return `<span class="badge ${cls || ''}">${count}</span>`;
    },

    dropdown(id, options, selected, placeholder) {
        const selectedOpt = options.find(o => o.value === selected);
        const displayText = selectedOpt ? selectedOpt.label : (placeholder || 'Select...');
        let html = `<div class="custom-dropdown" id="${id}">`;
        html += `<button type="button" class="dropdown-trigger" data-dropdown="${id}" aria-haspopup="listbox" aria-expanded="false" aria-label="${this.escapeAttr(placeholder || id)}: ${this.escapeAttr(displayText)}">`;
        html += `<span class="dropdown-text">${this.escapeHtml(displayText)}</span>`;
        html += this.icon('expand_more', 'dropdown-arrow');
        html += `</button>`;
        html += `<div class="dropdown-menu" id="${id}-menu" role="listbox">`;
        for (const opt of options) {
            const isSelected = opt.value === selected ? ' selected' : '';
            html += `<button type="button" class="dropdown-item${isSelected}" data-value="${this.escapeAttr(opt.value)}" data-dropdown-id="${id}" role="option" aria-selected="${opt.value === selected ? 'true' : 'false'}">`;
            if (opt.icon) html += this.icon(opt.icon, 'dropdown-item-icon');
            html += `<span>${this.escapeHtml(opt.label)}</span>`;
            if (opt.value === selected) html += this.icon('check', 'checkmark');
            html += `</button>`;
        }
        html += `</div></div>`;
        return html;
    },

    toggle(id, label, checked, description) {
        return `<div class="toggle-row" id="${id}-row">
            <div class="toggle-info">
                <span class="toggle-label">${this.escapeHtml(label)}</span>
                ${description ? `<div class="toggle-description">${this.escapeHtml(description)}</div>` : ''}
            </div>
            <label class="toggle-switch">
                <input type="checkbox" id="${id}" data-toggle="${id}" aria-label="${this.escapeAttr(label)}" ${checked ? 'checked' : ''}>
                <span class="toggle-slider"></span>
            </label>
        </div>`;
    },

    textInput(id, label, value, placeholder, required, type) {
        type = type || 'text';
        return `<div class="form-field">
            <label class="form-label" for="${id}">${this.escapeHtml(label)}${required ? ' <span class="required">*</span>' : ''}</label>
            <input type="${type}" class="form-input" id="${id}" value="${this.escapeAttr(value || '')}"
                placeholder="${this.escapeAttr(placeholder || '')}" ${required ? 'required' : ''}>
        </div>`;
    },

    textarea(id, label, value, placeholder, rows) {
        return `<div class="form-field">
            <label class="form-label" for="${id}">${this.escapeHtml(label)}</label>
            <textarea class="form-textarea" id="${id}" rows="${rows || 3}"
                placeholder="${this.escapeAttr(placeholder || '')}">${this.escapeHtml(value || '')}</textarea>
        </div>`;
    },

    button(text, action, cls, icon) {
        return `<button type="button" class="btn ${cls || 'btn-secondary'}" data-action="${action}" aria-label="${this.escapeAttr(text)}">
            ${icon ? this.icon(icon, 'btn-icon') : ''}
            ${this.escapeHtml(text)}
        </button>`;
    },

    modal(id, title, bodyHtml, footerHtml) {
        return `<div class="modal-overlay" id="${id}">
            <div class="modal">
                <div class="modal-header">
                    <h2 class="modal-title">${this.escapeHtml(title)}</h2>
                    <button type="button" class="modal-close" data-action="close-modal" data-modal="${id}" aria-label="Close modal">
                        ${this.icon('close')}
                    </button>
                </div>
                <div class="modal-body">${bodyHtml}</div>
                ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
            </div>
        </div>`;
    },

    toast(message, type) {
        type = type || 'info';
        const iconMap = { success: 'check_circle', error: 'error', warning: 'warning', info: 'info' };
        return `<div class="toast toast-${type}">
            ${this.icon(iconMap[type] || 'info', 'toast-icon')}
            <span class="toast-message">${this.escapeHtml(message)}</span>
            <button type="button" class="toast-close" data-action="dismiss-toast" aria-label="Dismiss notification">
                ${this.icon('close')}
            </button>
        </div>`;
    },

    emptyState(icon, title, description, actionText, action) {
        let html = `<div class="empty-state">`;
        html += this.icon(icon, 'empty-state-icon');
        html += `<h3 class="empty-state-title">${this.escapeHtml(title)}</h3>`;
        html += `<p class="empty-state-description">${this.escapeHtml(description)}</p>`;
        if (actionText && action) {
            html += `<button class="btn btn-primary btn-icon-only" data-action="${action}" aria-label="${this.escapeAttr(actionText)}" title="${this.escapeAttr(actionText)}">${this.svgIcon('add', 'btn-icon')}</button>`;
        }
        html += `</div>`;
        return html;
    },

    searchBar(id, value, placeholder) {
        const label = placeholder || 'Search';
        return `<div class="search-bar" id="${id}">
            ${this.icon('search', 'search-icon')}
            <input type="text" class="search-input" id="${id}-input"
                value="${this.escapeAttr(value || '')}"
                placeholder="" aria-label="${this.escapeAttr(label)}">
            ${value ? `<button type="button" class="search-clear" data-action="clear-search" aria-label="Clear search">${this.icon('close')}</button>` : ''}
        </div>`;
    },

    pagination(page, totalPages, total) {
        if (totalPages <= 1) return '';
        const start = (page - 1) * AppState.pageSize + 1;
        const end = Math.min(page * AppState.pageSize, total);
        let html = `<div class="pagination">`;
        html += `<span class="pagination-info">${start}-${end} of ${total}</span>`;
        html += `<button type="button" class="pagination-btn" data-action="prev-page" aria-label="Previous page" ${page <= 1 ? 'disabled' : ''}>`;
        html += `${this.icon('chevron_left')}</button>`;
        html += `<button type="button" class="pagination-btn" data-action="next-page" aria-label="Next page" ${page >= totalPages ? 'disabled' : ''}>`;
        html += `${this.icon('chevron_right')}</button>`;
        html += `</div>`;
        return html;
    },

    statusBadge(status) {
        const colors = {
            active: 'badge-success',
            pending: 'badge-warning',
            expired: 'badge-error',
            linked: 'badge-success',
            unlinked: 'badge-neutral'
        };
        return `<span class="status-badge ${colors[status] || 'badge-neutral'}">${this.escapeHtml(status)}</span>`;
    },

    contactCard(contact, selected) {
        const name = contact.firstName + ' ' + contact.lastName;
        const isSelected = selected ? ' contact-selected' : '';
        return `<div class="contact-card${isSelected}" data-contact-id="${contact.id}">
            <div class="contact-card-avatar">
                ${this.avatar(name, contact.avatarColor, 36)}
            </div>
            <div class="contact-card-info">
                <button type="button" class="text-hit-target contact-card-name" data-action="select-contact" data-contact-id="${contact.id}" aria-label="Open contact ${this.escapeAttr(name.trim() || contact.email)}">${this.escapeHtml(name.trim() || contact.email)}</button>
                <div class="contact-card-email">${this.escapeHtml(contact.email)}</div>
            </div>
            <div class="contact-card-actions">
                <button type="button" class="icon-btn contact-star ${contact.isStarred ? 'starred' : ''}"
                    data-action="toggle-star" data-contact-id="${contact.id}" title="${contact.isStarred ? 'Unstar' : 'Star'}" aria-label="${contact.isStarred ? 'Unstar' : 'Star'} contact">
                    ${this.icon(contact.isStarred ? 'star' : 'star_border')}
                </button>
            </div>
        </div>`;
    },

    otherContactCard(contact) {
        return `<div class="contact-card other-contact-card" data-other-id="${contact.id}">
            <div class="contact-card-avatar">
                ${this.avatar(contact.name || contact.email, '#9E9E9E', 36)}
            </div>
            <div class="contact-card-info">
                <div class="contact-card-name">${this.escapeHtml(contact.name || contact.email)}</div>
                <div class="contact-card-email">${this.escapeHtml(contact.email)}</div>
                <div class="contact-card-meta">${this.escapeHtml(contact.interactionCount + ' interactions')}</div>
            </div>
            <div class="contact-card-actions">
                <button type="button" class="icon-btn" data-action="move-to-contacts" data-other-id="${contact.id}" title="Add to contacts">
                    ${this.icon('person_add')}
                </button>
                <button type="button" class="icon-btn" data-action="delete-other-contact" data-other-id="${contact.id}" title="Delete">
                    ${this.icon('delete')}
                </button>
            </div>
        </div>`;
    },

    labelChip(label) {
        return `<span class="label-chip" style="background:${label.color}20;color:${label.color};border:1px solid ${label.color}40;">
            ${this.escapeHtml(label.name)}
        </span>`;
    },

    confirmDialog(title, message, confirmText, confirmAction, cancelAction) {
        const body = `<p class="confirm-message">${this.escapeHtml(message)}</p>`;
        const confirmIcon = confirmAction === 'confirm-remove-delegate'
            ? 'person_remove'
            : (confirmText === 'Delete' ? 'delete' : (confirmText === 'Remove' ? 'close' : 'check'));
        const footer = `
            <button class="btn btn-danger btn-icon-only" data-action="${confirmAction}" aria-label="${this.escapeAttr(confirmText || 'Confirm')}" title="${this.escapeAttr(confirmText || 'Confirm')}">${this.svgIcon(confirmIcon)}</button>
        `;
        return this.modal('confirm-modal', title, body, footer);
    }
};
