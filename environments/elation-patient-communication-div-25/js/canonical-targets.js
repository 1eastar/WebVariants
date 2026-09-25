/* Stable, observation-neutral interaction IDs shared by all five variants. */
(function () {
    'use strict';

    const VERSION = 1;
    const PREFIX = 'epc';
    const OPTION_ACTIONS = new Set(['choose-dd', 'select-dd']);
    const DISCRIMINATORS = [
        'route', 'settingsTab', 'patient', 'conversation', 'letter', 'reminder',
        'appointment', 'summary', 'provider', 'category', 'recipient', 'location',
        'code', 'tag', 'page', 'hidden'
    ];
    const INTERACTIVE_SELECTOR = [
        '[data-action]', '[data-op]', '[data-route]', '[data-settings-tab]',
        '[data-patient-select]', '[data-dropdown-select]', '[data-dd]',
        '[data-toggle]', '[data-checkbox]', '[data-radio]',
        'button', 'a[href]', 'input:not([type="hidden"])', 'select', 'textarea',
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
            .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 36) || 'empty';
        return `${readable}-${hash(original)}`;
    }

    function stableNumber(key, offset) {
        let number = 0;
        for (const character of key) number = (number * 33 + character.charCodeAt(0)) % 900000;
        return String(number + offset).padStart(6, '0');
    }

    function baseId(kind, name) {
        const key = `${kind}:${name}`;
        return `${PREFIX}-${stableNumber(key, kind === 'action' ? 100000 : 1000000)}-${token(name).replace(/-[^-]+$/, '')}`;
    }

    function discriminatorSuffix(element, includeValue) {
        const parts = [];
        for (const name of DISCRIMINATORS) {
            const value = element.dataset[name];
            if (value !== undefined && value !== '') parts.push(`${name.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}-${token(value)}`);
        }
        if (includeValue && element.value !== undefined) parts.push(`value-${token(element.value)}`);
        return parts.length ? `--${parts.join('--')}` : '';
    }

    function actionName(element) {
        if (element.dataset.route !== undefined) return `navigate-${element.dataset.route}`;
        if (element.dataset.settingsTab !== undefined) return `settings-tab-${element.dataset.settingsTab}`;
        const name = element.dataset.action || element.dataset.op;
        if (name && !OPTION_ACTIONS.has(name) && name !== 'toggle-dd') return name;
        if (element.id === 'menuToggle') return 'toggle-sidebar';
        if (element.matches('a[href]')) return `open-link-${token(element.getAttribute('href'))}`;
        return null;
    }

    function actionDescriptor(element) {
        const name = actionName(element);
        if (!name) return null;
        let suffix = discriminatorSuffix(element, false);
        if (element.dataset.route !== undefined) {
            suffix += element.classList.contains('nav-item') ? '--instance-sidebar' : '--instance-shortcut';
        }
        if (name === 'close-modal') {
            suffix += element.classList.contains('close-btn') ? '--instance-header' : '--instance-footer';
        }
        if (name === 'close-compose') {
            suffix += element.closest('.compose-header') ? '--instance-header' : '--instance-footer';
        }
        return {
            id: baseId('action', name) + suffix,
            key: `action:${name}`,
            defaultTag: 'button',
            interaction: element.matches('input[type="checkbox"]') ? 'check' : 'click',
            replay: 'direct'
        };
    }

    function fieldIdentity(element) {
        if (element.dataset.patientSelect !== undefined) return `patient-select:${element.dataset.patientSelect}`;
        if (element.dataset.dropdownSelect !== undefined) return element.dataset.dropdownSelect;
        if (element.dataset.dd !== undefined) return element.dataset.dd;
        if (element.dataset.toggle !== undefined) return element.dataset.toggle;
        if (element.dataset.checkbox !== undefined) return element.dataset.checkbox;
        if (element.dataset.radio !== undefined) return element.dataset.radio;
        return element.id || element.getAttribute('name') || null;
    }

    function fieldDescriptor(element) {
        if (!element.matches('input, select, textarea, [contenteditable="true"], [data-dd]')) return null;
        if (element.matches('input[type="hidden"]')) return null;
        if (actionName(element)) return null;
        const name = fieldIdentity(element);
        if (!name) return null;
        const type = (element.getAttribute('type') || '').toLowerCase();
        const isSelect = element.tagName === 'SELECT' || element.dataset.dd !== undefined;
        const isToggle = type === 'checkbox' || type === 'radio';
        let suffix = '';
        if (element.dataset.patientSelect !== undefined) suffix = `--patient-${token(element.dataset.patientSelect)}`;
        if (type === 'radio') suffix += `--value-${token(element.value)}`;
        return {
            id: baseId('field', name) + suffix,
            key: `field:${name}`,
            defaultTag: isSelect ? 'select' : element.tagName.toLowerCase(),
            interaction: isSelect ? 'select_option' : isToggle ? 'check' : 'fill',
            replay: isSelect && element.tagName !== 'SELECT' ? 'custom-select' : 'direct'
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

    function optionValue(option) {
        if (option.dataset.ddValue !== undefined) return option.dataset.ddValue;
        return option.value;
    }

    function annotateOption(option, owner) {
        if (!owner || !owner.dataset.canonicalTargetId) return false;
        const value = optionValue(option);
        option.dataset.canonicalTargetId = `${owner.dataset.canonicalTargetId}--option-${token(value)}`;
        option.dataset.canonicalOwnerId = owner.dataset.canonicalTargetId;
        option.dataset.canonicalOptionValue = String(value);
        option.dataset.canonicalKey = `${owner.dataset.canonicalKey}:option`;
        option.dataset.canonicalDefaultTag = 'option';
        option.dataset.canonicalRenderedTag = option.tagName.toLowerCase();
        option.dataset.canonicalInteraction = 'select_option_value';
        option.dataset.canonicalReplay = option.tagName === 'OPTION' ? 'native-option' : 'custom-option';
        option.dataset.canonicalVersion = String(VERSION);
        delete option.dataset.canonicalUnmapped;
        return true;
    }

    function customOptionOwner(element) {
        const id = element.dataset.dd;
        if (!id) return null;
        return Array.from(document.querySelectorAll('[data-dd][data-canonical-target-id]'))
            .find(candidate => candidate.dataset.dd === id && candidate.dataset.op === 'toggle-dd') || null;
    }

    function fingerprint(element) {
        return [element.id, element.dataset.action, element.dataset.op, element.dataset.route,
            element.dataset.settingsTab, element.dataset.testid, element.getAttribute('name'),
            element.getAttribute('type'), Array.from(element.classList).sort().join('.')]
            .filter(Boolean).join('|') || element.tagName.toLowerCase();
    }

    function markUnmapped(element) {
        const value = fingerprint(element);
        element.dataset.canonicalTargetId = `${PREFIX}-999999-unmapped--${token(value)}`;
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
        if (element.matches('[data-op="choose-dd"], [data-op="select-dd"], .dropdown-option[data-dd]')) {
            if (!annotateOption(element, customOptionOwner(element))) markUnmapped(element);
            return;
        }
        const descriptor = fieldDescriptor(element) || actionDescriptor(element);
        if (descriptor) {
            setMetadata(element, descriptor);
            if (element.tagName === 'SELECT') Array.from(element.options).forEach(option => annotateOption(option, element));
            return;
        }
        markUnmapped(element);
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
        scope.querySelectorAll('select[data-canonical-target-id]').forEach(select =>
            Array.from(select.options).forEach(option => annotateOption(option, select)));
        disambiguate();
        annotateAliases();
    }

    function aliases(element) {
        try { return JSON.parse(element.dataset.canonicalAliases || '[]'); } catch (_error) { return []; }
    }

    function addAlias(element, descriptor) {
        const current = aliases(element).filter(item => item.id !== descriptor.id);
        current.push({ ...descriptor, replay: 'alias' });
        element.dataset.canonicalAliases = JSON.stringify(current);
    }

    function annotateAliases() {
        const overlay = document.getElementById('modalOverlay');
        if (!overlay) return;
        const header = overlay.querySelector('.close-btn[data-canonical-target-id]');
        if (!header) return;
        const footerId = baseId('action', 'close-modal') + '--instance-footer';
        const hasFooter = Array.from(overlay.querySelectorAll('[data-canonical-target-id]'))
            .some(element => element.dataset.canonicalTargetId === footerId);
        if (hasFooter) {
            const remaining = aliases(header).filter(item => item.id !== footerId);
            if (remaining.length) header.dataset.canonicalAliases = JSON.stringify(remaining);
            else delete header.dataset.canonicalAliases;
            return;
        }
        addAlias(header, {
            id: footerId, key: 'action:close-modal', defaultTag: 'button', interaction: 'click'
        });
    }

    function resolve(targetId) {
        const direct = Array.from(document.querySelectorAll('[data-canonical-target-id]'))
            .filter(element => element.dataset.canonicalTargetId === targetId);
        if (direct.length > 1) throw new Error(`Canonical target ID is not unique: ${targetId}`);
        if (direct.length === 1) return direct[0];
        const alias = Array.from(document.querySelectorAll('[data-canonical-aliases]'))
            .filter(element => aliases(element).some(item => item.id === targetId));
        if (alias.length > 1) throw new Error(`Canonical target alias is not unique: ${targetId}`);
        return alias[0] || null;
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
        return { ready: true, kind: 'direct', steps: [{ ...action, targetId }] };
    }

    function audit() {
        annotate(document);
        const targets = Array.from(document.querySelectorAll('[data-canonical-target-id]'));
        const counts = new Map();
        targets.forEach(element => counts.set(element.dataset.canonicalTargetId,
            (counts.get(element.dataset.canonicalTargetId) || 0) + 1));
        return {
            version: VERSION,
            targetCount: targets.length,
            uniqueTargetCount: counts.size,
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

    window.CanonicalTargets = Object.freeze({
        version: VERSION, prefix: PREFIX, annotate, resolve, optionTarget, replayPlan, audit
    });
    document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.documentElement, { childList: true, subtree: true });
        annotate(document);
    });
}());
