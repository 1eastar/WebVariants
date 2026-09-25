/* components.js — Reusable UI components for GitLab Plan & Track */
/* eslint-disable */

const Components = {
    icons: {
        plus: '<path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"/><path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8Z"/>',
        search: '<path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"/>',
        filter: '<path d="M880.1 154H143.9c-24.5 0-39.8 26.7-27.5 48L349 597.4V838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V597.4L907.7 202c12.2-21.3-3.1-48-27.6-48zM603.4 798H420.6V642h182.9v156zm9.6-236.6l-9.5 16.6h-183l-9.5-16.6L212.7 226h598.6L613 561.4z"/>',
        user: '<path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"/>',
        tag: '<path d="M938 458.8l-29.6-312.6c-1.5-16.2-14.4-29-30.6-30.6L565.2 86h-.4c-3.2 0-5.7 1-7.6 2.9L88.9 557.2a9.96 9.96 0 0 0 0 14.1l363.8 363.8c1.9 1.9 4.4 2.9 7.1 2.9s5.2-1 7.1-2.9l468.3-468.3c2-2.1 3-5 2.8-8zM459.7 834.7L189.3 564.3 589 164.6 836 188l23.4 247-399.7 399.7zM680 256c-48.5 0-88 39.5-88 88s39.5 88 88 88 88-39.5 88-88-39.5-88-88-88zm0 120c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/>',
        calendar: '<path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"/>',
        bell: '<path d="M816 768h-24V428c0-141.1-104.3-257.7-240-277.1V112c0-22.1-17.9-40-40-40s-40 17.9-40 40v38.9c-135.7 19.4-240 136-240 277.1v340h-24c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h216c0 61.8 50.2 112 112 112s112-50.2 112-112h216c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM512 888c-26.5 0-48-21.5-48-48h96c0 26.5-21.5 48-48 48zM304 768V428c0-55.6 21.6-107.8 60.9-147.1S456.4 220 512 220c55.6 0 107.8 21.6 147.1 60.9S720 372.4 720 428v340H304z"/>',
        bellOff: '<path d="M816 768h-24V428c0-141.1-104.3-257.7-240-277.1V112c0-22.1-17.9-40-40-40s-40 17.9-40 40v38.9c-135.7 19.4-240 136-240 277.1v340h-24c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h216c0 61.8 50.2 112 112 112s112-50.2 112-112h216c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM512 888c-26.5 0-48-21.5-48-48h96c0 26.5-21.5 48-48 48zM304 768V428c0-55.6 21.6-107.8 60.9-147.1S456.4 220 512 220c55.6 0 107.8 21.6 147.1 60.9S720 372.4 720 428v340H304z"/><path d="M176 176l672 672" fill="none" stroke="currentColor" stroke-width="76" stroke-linecap="round"/>',
        sort: '<path d="M839.6 433.8L749 150.5a9.24 9.24 0 0 0-8.9-6.5h-77.4c-4.1 0-7.6 2.6-8.9 6.5l-91.3 283.3c-.3.9-.5 1.9-.5 2.9 0 5.1 4.2 9.3 9.3 9.3h56.4c4.2 0 7.8-2.8 9-6.8l17.5-61.6h89l17.3 61.5c1.1 4 4.8 6.8 9 6.8h61.2c1 0 1.9-.1 2.8-.4 2.4-.8 4.3-2.4 5.5-4.6 1.1-2.2 1.3-4.7.6-7.1zM663.3 325.5l32.8-116.9h6.3l32.1 116.9h-71.2zm143.5 492.9H677.2v-.4l132.6-188.9c1.1-1.6 1.7-3.4 1.7-5.4v-36.4c0-5.1-4.2-9.3-9.3-9.3h-204c-5.1 0-9.3 4.2-9.3 9.3v43c0 5.1 4.2 9.3 9.3 9.3h122.6v.4L587.7 828.9a9.35 9.35 0 0 0-1.7 5.4v36.4c0 5.1 4.2 9.3 9.3 9.3h211.4c5.1 0 9.3-4.2 9.3-9.3v-43a9.2 9.2 0 0 0-9.2-9.3zM416 702h-76V172c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v530h-76c-6.7 0-10.5 7.8-6.3 13l112 141.9a8 8 0 0 0 12.6 0l112-141.9c4.1-5.2.4-13-6.3-13z"/>',
        edit: '<path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"/>',
        delete: '<path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"/>',
        save: '<path d="M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840zM512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"/>',
        close: '<path d="M799.855 166.312c.023.007.043.018.084.059l57.69 57.69c.041.041.052.06.059.084a.118.118 0 0 1 0 .069c-.007.023-.018.042-.059.083L569.926 512l287.703 287.703c.041.04.052.06.059.083a.118.118 0 0 1 0 .07c-.007.022-.018.042-.059.083l-57.69 57.69c-.041.041-.06.052-.084.059a.118.118 0 0 1-.069 0c-.023-.007-.042-.018-.083-.059L512 569.926 224.297 857.629c-.04.041-.06.052-.083.059a.118.118 0 0 1-.07 0c-.022-.007-.042-.018-.083-.059l-57.69-57.69c-.041-.041-.052-.06-.059-.084a.118.118 0 0 1 0-.069c.007-.023.018-.042.059-.083L454.073 512 166.371 224.297c-.041-.04-.052-.06-.059-.083a.118.118 0 0 1 0-.07c.007-.022.018-.042.059-.083l57.69-57.69c.041-.041.06-.052.084-.059a.118.118 0 0 1 .069 0c.023.007.042.018.083.059L512 454.073l287.703-287.702c.04-.041.06-.052.083-.059a.118.118 0 0 1 .07 0Z"/>',
        check: '<path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"/>',
        undo: '<path d="M511.4 124C290.5 124.3 112 303 112 523.9c0 128 60.2 242 153.8 315.2l-37.5 48c-4.1 5.3-.3 13 6.3 12.9l167-.8c5.2 0 9-4.9 7.7-9.9L369.8 727a8 8 0 0 0-14.1-3L315 776.1c-10.2-8-20-16.7-29.3-26a318.64 318.64 0 0 1-68.6-101.7C200.4 609 192 567.1 192 523.9s8.4-85.1 25.1-124.5c16.1-38.1 39.2-72.3 68.6-101.7 29.4-29.4 63.6-52.5 101.7-68.6C426.9 212.4 468.8 204 512 204s85.1 8.4 124.5 25.1c38.1 16.1 72.3 39.2 101.7 68.6 29.4 29.4 52.5 63.6 68.6 101.7 16.7 39.4 25.1 81.3 25.1 124.5s-8.4 85.1-25.1 124.5a318.64 318.64 0 0 1-68.6 101.7c-7.5 7.5-15.3 14.5-23.4 21.2a7.93 7.93 0 0 0-1.2 11.1l39.4 50.5c2.8 3.5 7.9 4.1 11.4 1.3C854.5 760.8 912 649.1 912 523.9c0-221.1-179.4-400.2-400.6-399.9z"/>',
        number: '<path d="M872 394c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8H708V152c0-4.4-3.6-8-8-8h-64c-4.4 0-8 3.6-8 8v166H400V152c0-4.4-3.6-8-8-8h-64c-4.4 0-8 3.6-8 8v166H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h168v236H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h168v166c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V706h228v166c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V706h164c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8H708V394h164zM628 630H400V394h228v236z"/>'
    },

    icon(name, label) {
        const path = this.icons[name] || this.icons.more || '';
        return '<svg class="ui-icon" viewBox="0 0 1024 1024" aria-hidden="true" focusable="false">'+path+'</svg>' + (label ? '<span class="icon-text">'+this.escapeHtml(label)+'</span>' : '');
    },

    escapeHtml(str) {
        if (str == null) return '';
        return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
    },

    escapeAttr(str) {
        return this.escapeHtml(str);
    },

    formatDate(iso) {
        if (!iso) return '—';
        const d = new Date(iso);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    },

    formatDateShort(iso) {
        if (!iso) return '—';
        const d = new Date(iso);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    },

    formatDateTime(iso) {
        if (!iso) return '—';
        const d = new Date(iso);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    },

    timeAgo(iso) {
        if (!iso) return '';
        const now = new Date();
        const d = new Date(iso);
        const seconds = Math.floor((now - d) / 1000);
        if (seconds < 60) return 'just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return minutes + 'm ago';
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return hours + 'h ago';
        const days = Math.floor(hours / 24);
        if (days < 30) return days + 'd ago';
        const months = Math.floor(days / 30);
        return months + 'mo ago';
    },

    formatDuration(seconds) {
        if (!seconds || seconds <= 0) return '0m';
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        if (h > 0 && m > 0) return h + 'h ' + m + 'm';
        if (h > 0) return h + 'h';
        return m + 'm';
    },

    parseDuration(str) {
        if (!str) return 0;
        let total = 0;
        const mo = str.match(/(\d+)\s*mo/); if (mo) total += parseInt(mo[1]) * 576000;
        const w = str.match(/(\d+)\s*w/); if (w) total += parseInt(w[1]) * 144000;
        const d = str.match(/(\d+)\s*d/); if (d) total += parseInt(d[1]) * 28800;
        const h = str.match(/(\d+)\s*h/); if (h) total += parseInt(h[1]) * 3600;
        const m = str.match(/(\d+)\s*m(?!o)/); if (m) total += parseInt(m[1]) * 60;
        return total;
    },

    avatar(user, size) {
        size = size || 32;
        if (!user) return '<span class="avatar" style="width:'+size+'px;height:'+size+'px;background:#ccc"></span>';
        const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2);
        return '<span class="avatar" style="width:'+size+'px;height:'+size+'px;font-size:'+(size*0.4)+'px;background:'+this.escapeAttr(user.avatarColor || '#6b4fbb')+'" title="'+this.escapeAttr(user.name)+'" data-testid="avatar-'+this.escapeAttr(user.id)+'">'+this.escapeHtml(initials)+'</span>';
    },

    labelBadge(label) {
        if (!label) return '';
        const scopedClass = label.scoped ? ' label-badge-scoped' : '';
        if (label.scoped) {
            const parts = label.title.split('::');
            return '<span class="label-badge'+scopedClass+'" style="--label-bg:'+this.escapeAttr(label.color)+';--label-text:'+this.escapeAttr(label.textColor)+'" data-testid="label-'+this.escapeAttr(label.id)+'" data-label-id="'+this.escapeAttr(label.id)+'">'
                + '<span class="label-scope">'+this.escapeHtml(parts[0])+'</span>'
                + '<span class="label-value">'+this.escapeHtml(parts.slice(1).join('::'))+'</span>'
                + '</span>';
        }
        return '<span class="label-badge" style="--label-bg:'+this.escapeAttr(label.color)+';--label-text:'+this.escapeAttr(label.textColor)+'" data-testid="label-'+this.escapeAttr(label.id)+'" data-label-id="'+this.escapeAttr(label.id)+'">'+this.escapeHtml(label.title)+'</span>';
    },

    healthBadge(status) {
        if (!status) return '';
        const map = { on_track: { text: 'On track', cls: 'health-on-track' }, needs_attention: { text: 'Needs attention', cls: 'health-needs-attention' }, at_risk: { text: 'At risk', cls: 'health-at-risk' } };
        const h = map[status];
        if (!h) return '';
        return '<span class="health-badge '+h.cls+'" data-testid="health-'+status+'">'+h.text+'</span>';
    },

    statusBadge(status) {
        const cls = status === 'open' ? 'status-open' : 'status-closed';
        const icon = status === 'open' ? '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="2"/></svg>' : '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 16A8 8 0 108 0a8 8 0 000 16zm3.78-9.72a.75.75 0 00-1.06-1.06L7 8.94 5.28 7.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.25-4.25z"/></svg>';
        return '<span class="status-badge '+cls+'">'+icon+' '+this.escapeHtml(status.charAt(0).toUpperCase() + status.slice(1))+'</span>';
    },

    progressBar(completed, total) {
        if (total === 0) return '<div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div><span class="progress-text">0%</span>';
        const pct = Math.round((completed / total) * 100);
        return '<div class="progress-bar"><div class="progress-fill" style="width:'+pct+'%"></div></div><span class="progress-text">'+pct+'%</span>';
    },

    dropdown(id, options, selectedValue, placeholder) {
        placeholder = placeholder || 'Select...';
        const selected = options.find(o => o.value === selectedValue);
        const displayText = selected ? selected.label : placeholder;
        let html = '<div class="custom-dropdown" id="'+this.escapeAttr(id)+'" data-dropdown="'+this.escapeAttr(id)+'" data-testid="dropdown-'+this.escapeAttr(id)+'">';
        html += '<button type="button" class="dropdown-trigger" data-dropdown-trigger="'+this.escapeAttr(id)+'" data-placeholder="'+this.escapeAttr(placeholder)+'" aria-haspopup="listbox"><span class="dropdown-text">'+this.escapeHtml(displayText)+'</span><svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 16 16"><path fill="currentColor" d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"/></svg></button>';
        html += '<div class="dropdown-menu" id="'+this.escapeAttr(id)+'-menu" style="display:none" role="listbox">';
        if (placeholder) {
            html += '<button type="button" role="option" class="dropdown-item'+(selectedValue == null ? ' selected' : '')+'" data-dropdown-item="'+this.escapeAttr(id)+'" data-value="" aria-selected="'+(selectedValue == null ? 'true' : 'false')+'">'+this.escapeHtml(placeholder)+'</button>';
        }
        options.forEach(opt => {
            html += '<button type="button" role="option" class="dropdown-item'+(opt.value === selectedValue ? ' selected' : '')+'" data-dropdown-item="'+this.escapeAttr(id)+'" data-value="'+this.escapeAttr(opt.value)+'" aria-selected="'+(opt.value === selectedValue ? 'true' : 'false')+'">'+this.escapeHtml(opt.label)+'</button>';
        });
        html += '</div></div>';
        return html;
    },

    toggle(id, checked, label, description) {
        let html = '<div class="toggle-row" data-testid="toggle-'+this.escapeAttr(id)+'">';
        html += '<label class="toggle-switch"><input type="checkbox" id="'+this.escapeAttr(id)+'" data-toggle="'+this.escapeAttr(id)+'"'+(checked ? ' checked' : '')+'><span class="toggle-slider"></span></label>';
        html += '<div class="toggle-label-wrap"><span class="toggle-label">'+this.escapeHtml(label)+'</span>';
        if (description) html += '<span class="toggle-desc">'+this.escapeHtml(description)+'</span>';
        html += '</div></div>';
        return html;
    },

    textInput(id, value, placeholder, label) {
        let html = '<div class="form-group">';
        if (label) html += '<label for="'+this.escapeAttr(id)+'" class="form-label">'+this.escapeHtml(label)+'</label>';
        html += '<input type="text" class="form-input" id="'+this.escapeAttr(id)+'" data-testid="input-'+this.escapeAttr(id)+'" value="'+this.escapeAttr(value || '')+'" placeholder="'+this.escapeAttr(placeholder || '')+'">';
        html += '</div>';
        return html;
    },

    textarea(id, value, placeholder, label, rows) {
        let html = '<div class="form-group">';
        if (label) html += '<label for="'+this.escapeAttr(id)+'" class="form-label">'+this.escapeHtml(label)+'</label>';
        html += '<textarea class="form-textarea" id="'+this.escapeAttr(id)+'" data-testid="textarea-'+this.escapeAttr(id)+'" placeholder="'+this.escapeAttr(placeholder || '')+'" rows="'+(rows||4)+'">'+this.escapeHtml(value || '')+'</textarea>';
        html += '</div>';
        return html;
    },

    dateInput(id, value, label) {
        let html = '<div class="form-group">';
        if (label) html += '<label for="'+this.escapeAttr(id)+'" class="form-label">'+this.escapeHtml(label)+'</label>';
        html += '<input type="text" class="form-input date-input" id="'+this.escapeAttr(id)+'" data-testid="date-'+this.escapeAttr(id)+'" value="'+this.escapeAttr(value || '')+'" placeholder="YYYY-MM-DD">';
        html += '</div>';
        return html;
    },

    numberInput(id, value, label, min, max) {
        let html = '<div class="form-group">';
        if (label) html += '<label for="'+this.escapeAttr(id)+'" class="form-label">'+this.escapeHtml(label)+'</label>';
        html += '<input type="number" class="form-input" id="'+this.escapeAttr(id)+'" data-testid="number-'+this.escapeAttr(id)+'" value="'+this.escapeAttr(value != null ? value : '')+'"';
        if (min != null) html += ' min="'+min+'"';
        if (max != null) html += ' max="'+max+'"';
        html += '></div>';
        return html;
    },

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

    confirm(message, onConfirm) {
        this.showModal('Confirm', '<p>' + this.escapeHtml(message) + '</p>', '<button class="btn btn-primary icon-only" data-action="confirm-modal" aria-label="Confirm">'+this.icon('check')+'</button>');
        Components._confirmCallback = onConfirm;
    },

    confirmDanger(message, onConfirm) {
        this.showModal('Confirm', '<p>' + this.escapeHtml(message) + '</p>', '<button class="btn btn-danger icon-only" data-action="confirm-modal" aria-label="Delete">'+this.icon('delete')+'</button>');
        Components._confirmCallback = onConfirm;
    },

    _confirmCallback: null,

    showToast(message, actionText, actionCallback, duration) {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = '<span class="toast-message">' + this.escapeHtml(message) + '</span>' + (actionText ? '<button class="toast-action">' + this.escapeHtml(actionText) + '</button>' : '') + '<button class="toast-close icon-only" aria-label="Dismiss notification">'+this.icon('close')+'</button>';
        container.appendChild(toast);
        const remove = () => { toast.classList.add('toast-exit'); setTimeout(() => toast.remove(), 300); };
        toast.querySelector('.toast-close').addEventListener('click', remove);
        if (actionText && actionCallback) {
            toast.querySelector('.toast-action').addEventListener('click', () => { actionCallback(); remove(); });
        }
        setTimeout(remove, duration || 5000);
        setTimeout(() => toast.classList.add('toast-enter'), 10);
    },

    colorSwatch(color, selected) {
        return '<button class="color-swatch'+(selected ? ' selected' : '')+'" data-color="'+this.escapeAttr(color)+'" style="background:'+this.escapeAttr(color)+'" data-testid="swatch-'+this.escapeAttr(color)+'"></button>';
    },

    emptyState(icon, title, description, actionHtml) {
        return '<div class="empty-state"><div class="empty-icon">'+icon+'</div><h3>'+this.escapeHtml(title)+'</h3><p>'+this.escapeHtml(description)+'</p>'+(actionHtml || '')+'</div>';
    },

    pagination(currentPage, totalItems, pageSize) {
        const totalPages = Math.ceil(totalItems / pageSize);
        if (totalPages <= 1) return '';
        const start = (currentPage - 1) * pageSize + 1;
        const end = Math.min(currentPage * pageSize, totalItems);
        let html = '<div class="pagination" data-testid="pagination">';
        html += '<span class="pagination-info">Showing '+start+'–'+end+' of '+totalItems+'</span>';
        html += '<div class="pagination-buttons">';
        html += '<button class="btn btn-sm icon-only" data-action="prev-page" aria-label="Previous page"'+(currentPage <= 1 ? ' disabled' : '')+'>&laquo;</button>';
        // Show page numbers
        const maxPages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPages/2));
        let endPage = Math.min(totalPages, startPage + maxPages - 1);
        if (endPage - startPage < maxPages - 1) startPage = Math.max(1, endPage - maxPages + 1);
        for (let p = startPage; p <= endPage; p++) {
            html += '<button class="btn btn-sm'+(p === currentPage ? ' btn-primary' : '')+'" data-action="goto-page" data-page="'+p+'">'+p+'</button>';
        }
        html += '<button class="btn btn-sm icon-only" data-action="next-page" aria-label="Next page"'+(currentPage >= totalPages ? ' disabled' : '')+'>&raquo;</button>';
        html += '</div></div>';
        return html;
    },

    // Standard color palette for labels
    labelColors: ['#cc0000','#d9534f','#f0ad4e','#5bc0de','#69d100','#428bca','#7b68ee','#1aaa55','#dc3545','#6f42c1','#20c997','#17a2b8','#6c757d','#61dafb','#68a063','#ff6f61','#336791','#ff9900','#fbca04','#7057ff','#ee0701','#0e8a16','#d876e3','#b60205','#e11d48','#795548','#b91c1c','#ec4899','#0284c7','#84cc16']
};
