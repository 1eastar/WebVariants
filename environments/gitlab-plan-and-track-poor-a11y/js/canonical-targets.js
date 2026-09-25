/* Stable cross-variant interaction metadata. No roles, labels, or styles. */
(function () {
    'use strict';

    const VERSION = 1;
    const PREFIX = 'gpt';
    const EXPANDED_SELECTS = new Set(['board-list-type', 'board-list-ref']);
    const DATA_KEYS = [
        'route', 'id', 'issueId', 'epicId', 'labelId', 'boardId', 'listId',
        'cadenceId', 'filter', 'value', 'field', 'direction', 'type', 'tab',
        'page', 'index', 'color'
    ];
    const INTERACTIVE_SELECTOR = [
        '[data-action]', '[data-op]', '[data-route]', '[data-dropdown-trigger]',
        '[data-dropdown-item]', '[data-dd]', '[data-color]', '[data-until]',
        '[data-div-check]', '.issue-row', 'button', 'a[href]',
        'input:not([type="hidden"])', 'select', 'textarea',
        '[contenteditable="true"]', '[role="button"]',
        '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    function hash(value) {
        let result = 0x811c9dc5;
        for (const character of String(value)) {
            result ^= character.charCodeAt(0);
            result = Math.imul(result, 0x01000193);
        }
        return (result >>> 0).toString(36).padStart(7, '0').slice(0, 7);
    }

    function token(value) {
        const original = String(value);
        const readable = original.normalize('NFKD').toLowerCase()
            .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 38) || 'empty';
        return `${readable}-${hash(original)}`;
    }

    function numberFor(key, offset) {
        let value = 0;
        for (const character of key) value = (value * 33 + character.charCodeAt(0)) % 800000;
        return String(value + offset).padStart(6, '0');
    }

    function baseId(kind, name) {
        const key = `${kind}:${name}`;
        const offset = kind === 'action' ? 100000 : 1000000;
        return `${PREFIX}-${numberFor(key, offset)}-${token(name).replace(/-[^-]+$/, '')}`;
    }

    function dataSuffix(element, names) {
        const parts = [];
        for (const name of names || DATA_KEYS) {
            const value = element.dataset[name];
            if (value !== undefined && value !== '') {
                parts.push(`${name.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}-${token(value)}`);
            }
        }
        return parts.length ? `--${parts.join('--')}` : '';
    }

    function dropdownName(element) {
        return element.dataset.dropdownTrigger || element.dataset.dropdownItem || element.dataset.dd || null;
    }

    function actionDescriptor(element) {
        if (element.dataset.route !== undefined) {
            const name = 'navigate';
            let instance = '';
            if (element.classList.contains('nav-item')) instance = 'sidebar';
            else if (element.classList.contains('breadcrumb-link')) instance = 'breadcrumb';
            else if (element.dataset.action === 'cancel-form') instance = 'cancel';
            else if (element.classList.contains('sidebar-link')) instance = 'related';
            else if (element.classList.contains('todo-target')) instance = 'todo-target';
            else if (element.classList.contains('top-bar-btn')) instance = 'topbar';
            return {
                id: baseId('action', name) + dataSuffix(element, ['route']) + (instance ? `--instance-${instance}` : ''),
                key: `action:${name}`, defaultTag: 'button', interaction: 'click', replay: 'direct'
            };
        }

        const operation = element.dataset.action || element.dataset.op;
        if (operation && operation !== 'toggle-dd' && operation !== 'choose-dd') {
            const isCheck = operation === 'toggle-label-filter' ||
                element.matches('input[type="checkbox"], input[type="radio"], [data-div-check]');
            let suffix = dataSuffix(element);
            if (operation === 'close-modal') {
                suffix += element.classList.contains('modal-close') ? '--instance-header' : '--instance-footer';
            }
            return {
                id: baseId('action', operation) + suffix,
                key: `action:${operation}`,
                defaultTag: isCheck ? 'input' : 'button',
                interaction: isCheck ? 'check' : 'click', replay: isCheck && element.tagName !== 'INPUT' ? 'custom-toggle' : 'direct'
            };
        }

        const ddName = dropdownName(element);
        const isTrigger = element.dataset.dropdownTrigger !== undefined || element.dataset.op === 'toggle-dd';
        const isItem = element.dataset.dropdownItem !== undefined || element.dataset.op === 'choose-dd';
        if (ddName && EXPANDED_SELECTS.has(ddName) && isTrigger) {
            return {
                id: baseId('field', ddName), key: `field:${ddName}`,
                defaultTag: 'select', interaction: 'select_option', replay: 'custom-select'
            };
        }
        if (ddName && (isTrigger || isItem)) {
            const name = isTrigger ? 'dropdown-trigger' : 'dropdown-item';
            const value = isItem ? (element.dataset.value ?? element.dataset.ddValue ?? '') : '';
            return {
                id: baseId('action', name) + `--dropdown-${token(ddName)}` + (isItem ? `--value-${token(value)}` : ''),
                key: `action:${name}:${ddName}`,
                defaultTag: 'button', interaction: 'click', replay: 'direct'
            };
        }

        if (element.matches('.issue-row[data-issue-id]')) {
            return {
                id: baseId('action', 'open-issue-row') + `--issue-id-${token(element.dataset.issueId)}`,
                key: 'action:open-issue-row', defaultTag: 'div', interaction: 'click', replay: 'direct'
            };
        }
        if (element.dataset.color !== undefined) {
            return {
                id: baseId('action', 'select-color') + `--color-${token(element.dataset.color)}`,
                key: 'action:select-color', defaultTag: 'button', interaction: 'click', replay: 'direct'
            };
        }
        if (element.classList.contains('snooze-option')) {
            const options = Array.from(element.parentElement.querySelectorAll('.snooze-option'));
            return {
                id: baseId('action', 'select-snooze-duration') + `--instance-${options.indexOf(element) + 1}`,
                key: 'action:select-snooze-duration', defaultTag: 'button', interaction: 'click', replay: 'direct'
            };
        }
        if (element.classList.contains('toast-close') || element.classList.contains('toast-action')) {
            const name = element.classList.contains('toast-close') ? 'close-toast' : 'toast-action';
            return {
                id: baseId('action', name), key: `action:${name}`,
                defaultTag: 'button', interaction: 'click', replay: 'direct'
            };
        }
        if (element.id && element.tagName === 'BUTTON') {
            return {
                id: baseId('action', element.id), key: `action:${element.id}`,
                defaultTag: 'button', interaction: 'click', replay: 'direct'
            };
        }
        if (element.matches('a[href]')) {
            const href = element.getAttribute('href');
            return {
                id: baseId('action', 'open-link') + `--href-${token(href)}`,
                key: 'action:open-link', defaultTag: 'a', interaction: 'click', replay: 'direct'
            };
        }
        return null;
    }

    function fieldName(element) {
        if (element.dataset.divCheck !== undefined) return element.dataset.field || element.id || element.getAttribute('name');
        if (element.dataset.toggle !== undefined) return element.dataset.toggle;
        if (element.id) return element.id;
        if (element.getAttribute('name')) return element.getAttribute('name');
        if (element.classList.contains('modal-assignee-cb')) return 'modal-assignee';
        if (element.classList.contains('modal-label-cb')) return 'modal-label';
        return null;
    }

    function fieldDescriptor(element) {
        if (!element.matches('input, select, textarea, [contenteditable="true"], [data-div-check]')) return null;
        if (element.matches('input[type="hidden"]') || element.dataset.action || element.dataset.op) return null;
        const name = fieldName(element);
        if (!name) return null;
        const type = (element.getAttribute('type') || '').toLowerCase();
        const isChoice = type === 'checkbox' || type === 'radio' || element.dataset.divCheck !== undefined;
        const isSelect = element.tagName === 'SELECT';
        let suffix = '';
        if ((type === 'radio' || (!element.id && isChoice)) && element.value !== undefined) {
            suffix = `--value-${token(element.value)}`;
        }
        return {
            id: baseId('field', name) + suffix,
            key: `field:${name}`,
            defaultTag: isChoice || element.dataset.divCheck !== undefined ? 'input' : element.tagName.toLowerCase(),
            interaction: isSelect ? 'select_option' : isChoice ? 'check' : 'fill',
            replay: element.dataset.divCheck !== undefined ? 'custom-toggle' : 'direct'
        };
    }

    function setMetadata(element, descriptor) {
        element.dataset.canonicalTargetId = descriptor.id;
        element.dataset.canonicalKey = descriptor.key;
        element.dataset.canonicalDefaultTag = descriptor.defaultTag;
        element.dataset.canonicalRenderedTag = element.tagName.toLowerCase();
        element.dataset.canonicalInteraction = descriptor.interaction;
        element.dataset.canonicalReplay = descriptor.replay;
        element.dataset.canonicalVersion = String(VERSION);
        delete element.dataset.canonicalUnmapped;
    }

    function annotateOption(option, owner) {
        if (!owner.dataset.canonicalTargetId) return;
        const value = option.value;
        option.dataset.canonicalTargetId = `${owner.dataset.canonicalTargetId}--option-${token(value)}`;
        option.dataset.canonicalOwnerId = owner.dataset.canonicalTargetId;
        option.dataset.canonicalOptionValue = String(value);
        option.dataset.canonicalKey = `${owner.dataset.canonicalKey}:option`;
        option.dataset.canonicalDefaultTag = 'option';
        option.dataset.canonicalRenderedTag = 'option';
        option.dataset.canonicalInteraction = 'select_option_value';
        option.dataset.canonicalReplay = 'native-option';
        option.dataset.canonicalVersion = String(VERSION);
    }

    function annotateExpandedOption(element) {
        const name = dropdownName(element);
        if (!name || !EXPANDED_SELECTS.has(name)) return false;
        const owner = Array.from(document.querySelectorAll('[data-canonical-target-id]'))
            .find(candidate => candidate.dataset.canonicalKey === `field:${name}`);
        if (!owner) return false;
        const value = element.dataset.value ?? element.dataset.ddValue ?? '';
        element.dataset.canonicalTargetId = `${owner.dataset.canonicalTargetId}--option-${token(value)}`;
        element.dataset.canonicalOwnerId = owner.dataset.canonicalTargetId;
        element.dataset.canonicalOptionValue = String(value);
        element.dataset.canonicalKey = `${owner.dataset.canonicalKey}:option`;
        element.dataset.canonicalDefaultTag = 'option';
        element.dataset.canonicalRenderedTag = element.tagName.toLowerCase();
        element.dataset.canonicalInteraction = 'select_option_value';
        element.dataset.canonicalReplay = 'custom-option';
        element.dataset.canonicalVersion = String(VERSION);
        delete element.dataset.canonicalUnmapped;
        return true;
    }

    function fingerprint(element) {
        return [element.id, element.dataset.action, element.dataset.op, element.dataset.route,
            element.dataset.testid, element.getAttribute('name'), element.getAttribute('type'),
            Array.from(element.classList).sort().join('.')].filter(Boolean).join('|') || element.tagName.toLowerCase();
    }

    function markUnmapped(element) {
        element.dataset.canonicalTargetId = `${PREFIX}-999999-unmapped--${token(fingerprint(element))}`;
        element.dataset.canonicalKey = 'unmapped';
        element.dataset.canonicalDefaultTag = element.tagName.toLowerCase();
        element.dataset.canonicalRenderedTag = element.tagName.toLowerCase();
        element.dataset.canonicalInteraction = 'unknown';
        element.dataset.canonicalReplay = 'unmapped';
        element.dataset.canonicalVersion = String(VERSION);
        element.dataset.canonicalUnmapped = 'true';
    }

    function annotateElement(element) {
        if (!(element instanceof Element)) return;
        if ((element.dataset.dropdownItem !== undefined || element.dataset.op === 'choose-dd') && annotateExpandedOption(element)) return;
        const descriptor = actionDescriptor(element) || fieldDescriptor(element);
        if (!descriptor) { markUnmapped(element); return; }
        setMetadata(element, descriptor);
        if (element.tagName === 'SELECT') Array.from(element.options).forEach(option => annotateOption(option, element));
    }

    function disambiguate() {
        const groups = new Map();
        document.querySelectorAll('[data-canonical-target-id]').forEach(element => {
            const id = element.dataset.canonicalTargetId;
            if (!groups.has(id)) groups.set(id, []);
            groups.get(id).push(element);
        });
        groups.forEach(elements => {
            if (elements.length < 2) return;
            elements.forEach((element, index) => {
                element.dataset.canonicalTargetId += `--instance-${index + 1}`;
                if (element.tagName === 'SELECT') Array.from(element.options).forEach(option => annotateOption(option, element));
            });
        });
    }

    function annotate(root) {
        const scope = root && root.querySelectorAll ? root : document;
        if (scope instanceof Element && scope.matches(INTERACTIVE_SELECTOR)) annotateElement(scope);
        scope.querySelectorAll(INTERACTIVE_SELECTOR).forEach(annotateElement);
        disambiguate();
        annotateAliases();
    }

    function aliases(element) {
        try { return JSON.parse(element.dataset.canonicalAliases || '[]'); } catch (_error) { return []; }
    }

    function addAlias(element, descriptor) {
        const current = aliases(element).filter(alias => alias.id !== descriptor.id);
        current.push({ ...descriptor, replay: 'alias' });
        element.dataset.canonicalAliases = JSON.stringify(current);
    }

    function annotateAliases() {
        const modal = document.getElementById('modalOverlay');
        const header = modal && modal.querySelector('.modal-close[data-canonical-target-id]');
        if (header) {
            const footerId = baseId('action', 'close-modal') + '--instance-footer';
            const hasFooter = Array.from(modal.querySelectorAll('[data-canonical-target-id]'))
                .some(element => element.dataset.canonicalTargetId === footerId);
            if (hasFooter) {
                const remaining = aliases(header).filter(alias => alias.id !== footerId);
                if (remaining.length) header.dataset.canonicalAliases = JSON.stringify(remaining);
                else delete header.dataset.canonicalAliases;
            } else addAlias(header, {
                id: footerId, key: 'action:close-modal', defaultTag: 'button', interaction: 'click'
            });
        }

        document.querySelectorAll('.nav-item[data-route][data-canonical-target-id]').forEach(sidebar => {
            const route = sidebar.dataset.route;
            const cancelId = baseId('action', 'navigate') + `--route-${token(route)}--instance-cancel`;
            const hasCancel = Array.from(document.querySelectorAll('[data-canonical-target-id]'))
                .some(element => element.dataset.canonicalTargetId === cancelId);
            if (!hasCancel) addAlias(sidebar, {
                id: cancelId, key: 'action:navigate', defaultTag: 'button', interaction: 'click'
            });
        });
    }

    function resolve(targetId) {
        const direct = Array.from(document.querySelectorAll('[data-canonical-target-id]'))
            .filter(element => element.dataset.canonicalTargetId === targetId);
        if (direct.length > 1) throw new Error(`Canonical target ID is not unique: ${targetId}`);
        if (direct.length === 1) return direct[0];
        const indirect = Array.from(document.querySelectorAll('[data-canonical-aliases]'))
            .filter(element => aliases(element).some(alias => alias.id === targetId));
        if (indirect.length > 1) throw new Error(`Canonical alias is not unique: ${targetId}`);
        return indirect[0] || null;
    }

    function optionTarget(ownerId, value) {
        return Array.from(document.querySelectorAll('[data-canonical-owner-id][data-canonical-option-value]'))
            .find(element => element.dataset.canonicalOwnerId === ownerId &&
                String(element.dataset.canonicalOptionValue) === String(value)) || null;
    }

    function replayPlan(targetId, requested) {
        const target = resolve(targetId);
        if (!target) return { ready: false, reason: 'target-not-rendered', targetId };
        const action = requested || {};
        const value = action.value !== undefined ? action.value : action.option;
        if (target.dataset.canonicalInteraction === 'select_option' && target.dataset.canonicalReplay === 'custom-select') {
            return { ready: true, kind: 'expanded-custom-select', steps: [
                { action: 'click', targetId }, { action: 'click-option', ownerId: targetId, value }
            ] };
        }
        if ((action.action === 'check' || action.action === 'uncheck') && target.dataset.canonicalReplay === 'custom-toggle') {
            return { ready: true, kind: 'expanded-custom-toggle', steps: [{ action: 'click', targetId }] };
        }
        return { ready: true, kind: 'direct', steps: [{ ...action, targetId }] };
    }

    function audit() {
        annotate(document);
        const targets = Array.from(document.querySelectorAll('[data-canonical-target-id]'));
        const counts = new Map();
        targets.forEach(element => counts.set(element.dataset.canonicalTargetId,
            (counts.get(element.dataset.canonicalTargetId) || 0) + 1));
        return {
            version: VERSION, targetCount: targets.length, uniqueTargetCount: counts.size,
            duplicates: Array.from(counts).filter(([, count]) => count > 1),
            unmapped: targets.filter(element => element.dataset.canonicalUnmapped === 'true')
                .map(element => ({ targetId: element.dataset.canonicalTargetId, fingerprint: fingerprint(element) })),
            aliases: Array.from(document.querySelectorAll('[data-canonical-aliases]'))
                .flatMap(element => aliases(element).map(alias => ({ ...alias, resolvedBy: element.dataset.canonicalTargetId })))
        };
    }

    let scheduled = false;
    const observer = new MutationObserver(() => {
        if (scheduled) return;
        scheduled = true;
        queueMicrotask(() => { scheduled = false; annotate(document); });
    });
    window.CanonicalTargets = Object.freeze({ version: VERSION, prefix: PREFIX, annotate, resolve, optionTarget, replayPlan, audit });
    document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.documentElement, { childList: true, subtree: true });
        annotate(document);
    });
}());
