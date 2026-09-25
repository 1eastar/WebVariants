const Components = {
    icons: {
        filter: '<path d="M880.1 154H143.9c-24.5 0-39.8 26.7-27.5 48L349 597.4V838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V597.4L907.7 202c12.2-21.3-3.1-48-27.6-48zM603.4 798H420.6V642h182.9v156zm9.6-236.6l-9.5 16.6h-183l-9.5-16.6L212.7 226h598.6L613 561.4z"/>',
        plus: '<path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"/><path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8Z"/>',
        save: '<path d="M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840zM512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"/>',
        'filled-save': '<path d="M893.3 293.3L730.7 130.7c-12-12-28.3-18.7-45.3-18.7H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 176h256v112H384V176zm128 554c-79.5 0-144-64.5-144-144s64.5-144 144-144 144 64.5 144 144-64.5 144-144 144zm0-224c-44.2 0-80 35.8-80 80s35.8 80 80 80 80-35.8 80-80-35.8-80-80-80z"/>',
        'user-add': '<path d="M678.3 642.4c24.2-13 51.9-20.4 81.4-20.4h.1c3 0 4.4-3.6 2.2-5.6a371.67 371.67 0 0 0-103.7-65.8c-.4-.2-.8-.3-1.2-.5C719.2 505 759.6 431.7 759.6 349c0-137-110.8-248-247.5-248S264.7 212 264.7 349c0 82.7 40.4 156 102.6 201.1-.4.2-.8.3-1.2.5-44.7 18.9-84.8 46-119.3 80.6a373.42 373.42 0 0 0-80.4 119.5A373.6 373.6 0 0 0 137 888.8a8 8 0 0 0 8 8.2h59.9c4.3 0 7.9-3.5 8-7.8 2-77.2 32.9-149.5 87.6-204.3C357 628.2 432.2 597 512.2 597c56.7 0 111.1 15.7 158 45.1a8.1 8.1 0 0 0 8.1.3zM512.2 521c-45.8 0-88.9-17.9-121.4-50.4A171.2 171.2 0 0 1 340.5 349c0-45.9 17.9-89.1 50.3-121.6S466.3 177 512.2 177s88.9 17.9 121.4 50.4A171.2 171.2 0 0 1 683.9 349c0 45.9-17.9 89.1-50.3 121.6C601.1 503.1 558 521 512.2 521zM880 759h-84v-84c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v84h-84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h84v84c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-84h84c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"/>',
        'check-circle': '<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"/>',
        'filled-check-circle': '<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"/>',
        'close-circle': '<path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64Zm0 76c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372Zm128.013 198.826c.023.007.042.018.083.059l45.02 45.019c.04.04.05.06.058.083a.118.118 0 0 1 0 .07c-.007.022-.018.041-.059.082L557.254 512l127.861 127.862a.268.268 0 0 1 .05.06l.009.023a.118.118 0 0 1 0 .07c-.007.022-.018.041-.059.082l-45.019 45.02c-.04.04-.06.05-.083.058a.118.118 0 0 1-.07 0c-.022-.007-.041-.018-.082-.059L512 557.254 384.14 685.115c-.042.041-.06.052-.084.059a.118.118 0 0 1-.07 0c-.022-.007-.041-.018-.082-.059l-45.02-45.019c-.04-.04-.05-.06-.058-.083a.118.118 0 0 1 0-.07c.007-.022.018-.041.059-.082L466.745 512l-127.86-127.86a.268.268 0 0 1-.05-.061l-.009-.023a.118.118 0 0 1 0-.07c.007-.022.018-.041.059-.082l45.019-45.02c.04-.04.06-.05.083-.058a.118.118 0 0 1 .07 0c.022.007.041.018.082.059L512 466.745l127.862-127.86c.04-.041.06-.052.083-.059a.118.118 0 0 1 .07 0Z"/>',
        calendar: '<path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"/>',
        'calendar-off': '<path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"/><path d="M176 176l672 672" fill="none" stroke="currentColor" stroke-width="76" stroke-linecap="round"/>',
        check: '<path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"/>',
        profile: '<path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656zM492 400h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zM340 368a40 40 0 1 0 80 0 40 40 0 1 0-80 0zm0 144a40 40 0 1 0 80 0 40 40 0 1 0-80 0zm0 144a40 40 0 1 0 80 0 40 40 0 1 0-80 0z"/>',
        read: '<path d="M928 161H699.2c-49.1 0-97.1 14.1-138.4 40.7L512 233l-48.8-31.3A255.2 255.2 0 0 0 324.8 161H96c-17.7 0-32 14.3-32 32v568c0 17.7 14.3 32 32 32h228.8c49.1 0 97.1 14.1 138.4 40.7l44.4 28.6c1.3.8 2.8 1.3 4.3 1.3s3-.4 4.3-1.3l44.4-28.6C602 807.1 650.1 793 699.2 793H928c17.7 0 32-14.3 32-32V193c0-17.7-14.3-32-32-32zM324.8 721H136V233h188.8c35.4 0 69.8 10.1 99.5 29.2l48.8 31.3 6.9 4.5v462c-47.6-25.6-100.8-39-155.2-39zm563.2 0H699.2c-54.4 0-107.6 13.4-155.2 39V298l6.9-4.5 48.8-31.3c29.7-19.1 64.1-29.2 99.5-29.2H888v488zM396.9 361H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm223.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c0-4.1-3.2-7.5-7.1-7.5H627.1c-3.9 0-7.1 3.4-7.1 7.5zM396.9 501H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm416 0H627.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5z"/>',
        'play-circle': '<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm144.1 454.9L437.7 677.8a8.02 8.02 0 0 1-12.7-6.5V353.7a8 8 0 0 1 12.7-6.5L656.1 506a7.9 7.9 0 0 1 0 12.9z"/>',
        'filled-play-circle': '<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm144.1 454.9L437.7 677.8a8.02 8.02 0 0 1-12.7-6.5V353.7a8 8 0 0 1 12.7-6.5L656.1 506a7.9 7.9 0 0 1 0 12.9z"/>',
        send: '<path d="M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2-8.5 2.1-13.8 10.7-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-0.9 3.7-0.5 7.6 1.2 10.9 3.9 7.9 13.5 11.1 21.5 7.2l836.5-417c3.1-1.5 5.6-4.1 7.2-7.1 3.9-8 0.7-17.6-7.2-21.6zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-0.8 4.2-2.6 5-5 1.4-4.2-0.8-8.7-5-10.2L221.1 403 171 198.2l628 314.9-628.2 313.2z"/>',
        edit: '<path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"/>',
        eye: '<path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"/>',
        right: '<path d="M869 487.8L491.2 159.9c-5.2-4.5-13.2-.8-13.2 6v80.2c0 4.6 2 9 5.5 12L765.1 504H128c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h637.1L483.5 825.9a15.95 15.95 0 0 0-5.5 12V918c0 6.8 8 10.5 13.2 6l377.8-327.9c3.5-3 5.5-7.4 5.5-12V499.8c0-4.6-2-9-5.5-12z"/>',
        close: '<path d="M799.855 166.312c.023.007.043.018.084.059l57.69 57.69c.041.041.052.06.059.084a.118.118 0 0 1 0 .069c-.007.023-.018.042-.059.083L569.926 512l287.703 287.703c.041.04.052.06.059.083a.118.118 0 0 1 0 .07c-.007.022-.018.042-.059.083l-57.69 57.69c-.041.041-.06.052-.084.059a.118.118 0 0 1-.069 0c-.023-.007-.042-.018-.083-.059L512 569.926 224.297 857.629c-.04.041-.06.052-.083.059a.118.118 0 0 1-.07 0c-.022-.007-.042-.018-.083-.059l-57.69-57.69c-.041-.041-.052-.06-.059-.084a.118.118 0 0 1 0-.069c.007-.023.018-.042.059-.083L454.073 512 166.371 224.297c-.041-.04-.052-.06-.059-.083a.118.118 0 0 1 0-.07c.007-.022.018-.042.059-.083l57.69-57.69c.041-.041.06-.052.084-.059a.118.118 0 0 1 .069 0c.023.007.042.018.083.059L512 454.073l287.703-287.702c.04-.041.06-.052.083-.059a.118.118 0 0 1 .07 0Z"/>'
    },

    // ---- Icon UI helpers
    escAttr(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    },

    icon(name, variant, className) {
        const iconClass = className || 'ui-icon';
        const key = variant === 'filled' ? `filled-${name}` : name;
        const path = this.icons[key] || this.icons[name] || '';
        return `<svg class="${iconClass}" viewBox="0 0 1024 1024" aria-hidden="true" focusable="false">${path}</svg>`;
    },

    iconText(name, text, variant) {
        return `${this.icon(name, variant)}<span class="compact-action-text">${text}</span>`;
    },

    dropdownLabel(id, fallback) {
        const labels = {
            jobTypeFilter: 'Filter jobs by job type',
            jobLocationFilter: 'Filter jobs by location',
            jobLabelFilter: 'Filter jobs by school label',
            eventTypeFilter: 'Filter events by type',
            profileVisibility: 'Profile visibility',
            addRoleDropdown: 'Add preferred job role',
            addLocationDropdown: 'Add preferred location',
            careerCommunity: 'Career community',
            expectedGradDate: 'Expected graduation date',
            schedCategory: 'Appointment category',
            schedType: 'Appointment type',
            schedStaff: 'Staff member',
            schedMedium: 'Appointment medium',
            postAudience: 'Post audience'
        };
        return labels[id] || fallback || id;
    },

    // ---- Avatar
    avatar(name, color, size) {
        const sizeClass = size || 'medium';
        const initials = (name || 'U').split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
        return `<div class="avatar avatar-${sizeClass}" style="background-color: ${color || '#5E6AD2'}">${initials}</div>`;
    },

    // ---- Custom Dropdown
    dropdown(id, currentValue, options, placeholder) {
        const displayVal = currentValue || placeholder || 'Select...';
        const label = this.dropdownLabel(id, placeholder);
        return `
            <div class="custom-dropdown" id="${id}" data-value="${this.escAttr(currentValue || '')}">
                <button type="button" class="dropdown-trigger" data-dropdown-id="${id}" aria-haspopup="listbox" aria-expanded="false" aria-label="${this.escAttr(`${label}: ${displayVal}`)}">
                    <span class="dropdown-value">${displayVal}</span>
                    <span class="dropdown-arrow"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>
                </button>
                <div class="dropdown-menu" role="listbox" aria-label="${this.escAttr(label)} options">
                    ${options.map(opt => `
                        <button type="button" class="dropdown-item ${opt === currentValue ? 'selected' : ''}"
                             data-dropdown-id="${id}"
                             data-value="${this.escAttr(opt)}"
                             role="option"
                             aria-selected="${opt === currentValue ? 'true' : 'false'}"
                             aria-label="${this.escAttr(`${opt || 'Any'}${opt === currentValue ? ', selected' : ''}`)}">
                            ${opt}
                            ${opt === currentValue ? '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' : ''}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    },

    // ---- Toggle Switch
    toggle(id, checked) {
        return `
            <button type="button" class="toggle-switch ${checked ? 'active' : ''}" id="${id}" data-toggle-id="${id}" role="switch" aria-checked="${checked ? 'true' : 'false'}">
                <div class="toggle-knob"></div>
            </button>
        `;
    },

    // ---- Checkbox
    checkbox(id, checked, label) {
        return `
            <button type="button" class="checkbox-row" data-checkbox-id="${id}" role="checkbox" aria-checked="${checked ? 'true' : 'false'}">
                <div class="custom-checkbox ${checked ? 'checked' : ''}" id="${id}">
                    ${checked ? '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>' : ''}
                </div>
                <span class="checkbox-label">${label}</span>
            </button>
        `;
    },

    // ---- Tag/Chip
    tag(text, removable, removeAction) {
        return `
            <span class="tag">
                ${text}
                ${removable ? `<button class="tag-remove" data-action="${removeAction}" data-value="${text.replace(/"/g, '&quot;')}">&times;</button>` : ''}
            </span>
        `;
    },

    // ---- Status Badge
    statusBadge(text, type) {
        return `<span class="status-badge status-${type || 'default'}">${text}</span>`;
    },

    // ---- Search Input
    searchInput(id, placeholder, value) {
        const labels = {
            jobSearch: 'Search jobs, companies, keywords, locations, and roles',
            employerSearch: 'Search employers by name, industry, or location',
            eventSearch: 'Search events by title, employer, type, or location',
            qaSearch: 'Search questions, advice, companies, and answers'
        };
        return `
            <div class="search-input-wrapper" role="search" aria-label="${this.escAttr(labels[id] || placeholder || 'Search')}">
                <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/><path d="M11 11L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                <input type="text" class="search-input" id="${id}" placeholder="${placeholder || 'Search...'}" value="${this.escAttr(value || '')}" autocomplete="off" aria-label="${this.escAttr(labels[id] || placeholder || 'Search')}" />
            </div>
        `;
    },

    // ---- Modal
    modal(id, title, bodyHtml, footerHtml, size) {
        return `
            <div class="modal-overlay" id="${id}">
                <div class="modal ${size || ''}">
                    <div class="modal-header">
                        <h3 class="modal-title">${title}</h3>
                        <button type="button" class="modal-close" data-action="closeModal" aria-label="Close modal">&times;</button>
                    </div>
                    <div class="modal-body">${bodyHtml}</div>
                    ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
                </div>
            </div>
        `;
    },

    // ---- Empty State
    emptyState(icon, title, subtitle) {
        return `
            <div class="empty-state">
                <div class="empty-state-icon">${icon || ''}</div>
                <h3 class="empty-state-title">${title}</h3>
                ${subtitle ? `<p class="empty-state-subtitle">${subtitle}</p>` : ''}
            </div>
        `;
    },

    // ---- Button
    btn(text, action, variant, disabled, extraAttrs) {
        return `<button type="button" class="btn btn-${variant || 'primary'}" data-action="${action}" ${disabled ? 'disabled' : ''} ${extraAttrs || ''}>${text}</button>`;
    },

    // ---- Time formatting
    timeAgo(dateStr) {
        if (!dateStr) return 'Never';
        const date = new Date(dateStr);
        const now = new Date('2026-03-07T10:00:00Z');
        const diffMs = now - date;
        const diffMin = Math.floor(diffMs / 60000);
        if (diffMin < 0) return 'Just now';
        if (diffMin < 1) return 'Just now';
        if (diffMin < 60) return `${diffMin}m ago`;
        const diffHrs = Math.floor(diffMin / 60);
        if (diffHrs < 24) return `${diffHrs}h ago`;
        const diffDays = Math.floor(diffHrs / 24);
        if (diffDays < 7) return `${diffDays}d ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== 2026 ? 'numeric' : undefined });
    },

    formatDate(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr + 'T00:00:00');
        return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    },

    formatDateShort(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr + 'T00:00:00');
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    },

    // ---- Truncate text
    truncate(text, maxLen) {
        if (!text) return '';
        if (text.length <= maxLen) return text;
        return text.substring(0, maxLen) + '...';
    },

    // ---- Tab Bar
    tabBar(tabs, activeTab, tabAction) {
        return `
            <div class="tab-bar">
                ${tabs.map(t => `
                    <button class="tab-item ${t.id === activeTab ? 'active' : ''}" data-action="${tabAction}" data-tab="${t.id}">
                        ${t.label}
                        ${t.count !== undefined ? `<span class="tab-count">${t.count}</span>` : ''}
                    </button>
                `).join('')}
            </div>
        `;
    },

    // ---- Filter Chips
    filterChips(options, active, action) {
        return `
            <div class="filter-chips">
                ${options.map(opt => `
                    <button class="filter-chip ${opt === active ? 'active' : ''}" data-action="${action}" data-value="${opt.replace(/"/g, '&quot;')}">${opt}</button>
                `).join('')}
            </div>
        `;
    },

    // ---- Card
    card(content, extraClass) {
        return `<div class="card ${extraClass || ''}">${content}</div>`;
    },

    // ---- Notification dot
    notificationDot(count) {
        if (!count || count <= 0) return '';
        return `<span class="notification-dot">${count > 99 ? '99+' : count}</span>`;
    },

    // ---- Typeahead input
    typeaheadInput(id, placeholder, suggestions, selectedValues, addAction, removeAction) {
        return `
            <div class="typeahead-container" id="${id}-container">
                <div class="typeahead-tags">
                    ${(selectedValues || []).map(v => Components.tag(v, true, removeAction)).join('')}
                </div>
                <div class="typeahead-input-wrapper">
                    <input type="text" class="typeahead-input" id="${id}" placeholder="${placeholder || 'Type to search...'}" autocomplete="off" data-typeahead-id="${id}" />
                    <div class="typeahead-suggestions" id="${id}-suggestions">
                        ${(suggestions || []).map(s => `
                            <button type="button" class="typeahead-suggestion" data-action="${addAction}" data-value="${s.replace(/"/g, '&quot;')}">${s}</button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    // ---- Pagination info
    paginationInfo(showing, total) {
        return `<div class="pagination-info">Showing ${showing} of ${total} results</div>`;
    },

    // ---- Section header
    sectionHeader(title, subtitle) {
        return `
            <div class="section-header">
                <h2 class="section-title">${title}</h2>
                ${subtitle ? `<p class="section-subtitle">${subtitle}</p>` : ''}
            </div>
        `;
    }
};
