/* Stable cross-variant interaction metadata. No roles, labels, styles, or app state changes. */
(function () {
    'use strict';

    const VERSION = 1;
    const PREFIX = 'gml';
    const EXPANDED_SELECTS = new Set(['labelParentSelect', 'filterLabel']);
    const VALUE_KEYS = ['emailId', 'messageId', 'labelId', 'filterId', 'category',
        'senderEmail', 'setting', 'star', 'snooze', 'movetoDest', 'movetoLabel'];
    const SELECTOR = [
        '[data-action]', '[data-op]', '[data-route]', '[data-dropdown]', '[data-dropdown-id]',
        '[data-category]', '[data-settings-tab]', '[data-context-action]', '[data-snooze]',
        '[data-color-bg]', '[data-moveto-dest]', '[data-moveto-label]', '[data-star]',
        '[data-email-open-id]', '.email-checkbox', '.email-star', '.email-important',
        'button', 'a[href]', 'input:not([type="hidden"])', 'select', 'textarea',
        '[contenteditable="true"]', '[role="button"]', '[tabindex]:not([tabindex="-1"])'
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
            .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 42) || 'empty';
        return `${readable}-${hash(original)}`;
    }

    function numberFor(key, offset) {
        let value = 0;
        for (const character of key) value = (value * 33 + character.charCodeAt(0)) % 800000;
        return String(value + offset).padStart(6, '0');
    }

    function baseId(kind, name) {
        const key = `${kind}:${name}`;
        return `${PREFIX}-${numberFor(key, kind === 'action' ? 100000 : 1000000)}-${token(name).replace(/-[^-]+$/, '')}`;
    }

    function suffix(element, keys) {
        const parts = [];
        for (const key of keys || VALUE_KEYS) {
            const value = element.dataset[key];
            if (value !== undefined && value !== '') {
                parts.push(`${key.replace(/[A-Z]/g, match => '-' + match.toLowerCase())}-${token(value)}`);
            }
        }
        return parts.length ? `--${parts.join('--')}` : '';
    }

    function contextName(element) {
        if (element.dataset.testid) return `testid-${element.dataset.testid}`;
        if (element.closest('.modal-header')) return 'modal-header';
        if (element.closest('.modal-footer')) return 'modal-footer';
        if (element.closest('.compose-header')) return 'compose-header';
        if (element.closest('.compose-footer')) return 'compose-footer';
        if (element.closest('.email-hover-actions')) return 'email-hover';
        if (element.closest('.email-message-actions')) return 'message-actions';
        if (element.closest('.email-detail-actions')) return 'detail-actions';
        if (element.closest('.label-picker-footer')) return 'label-picker-footer';
        if (element.closest('#contextMenu')) return 'context-menu';
        if (element.closest('#searchOptionsPanel')) return 'search-options';
        return '';
    }

    function actionResult(name, element, extraSuffix, interaction, replay, defaultTag) {
        const context = contextName(element);
        return {
            id: baseId('action', name) + (extraSuffix || '') + (context ? `--instance-${token(context)}` : ''),
            key: `action:${name}`, defaultTag: defaultTag || 'button',
            interaction: interaction || 'click', replay: replay || 'direct'
        };
    }

    function actionDescriptor(element) {
        if (element.dataset.emailOpenId !== undefined) {
            const owner = element.closest('.email-item') || element;
            return actionResult(
                'open-email', owner, suffix(owner, ['emailId']), 'click', 'direct', 'div'
            );
        }
        if (element.dataset.route !== undefined) {
            return actionResult('navigate', element, `--route-${token(element.dataset.route)}`);
        }

        if (element.closest('#searchOptionsPanel')) {
            if (element.id === 'searchOptionsSearchBtn' || element.dataset.action === 'advanced-search') {
                return {
                    id: `${baseId('action', 'advanced-search')}--instance-${token('search-options')}`,
                    key: 'action:advanced-search', defaultTag: 'button', interaction: 'click', replay: 'direct'
                };
            }
            if (element.dataset.action === 'close-search-options' ||
                (element.matches('button') && element.classList.contains('btn-text'))) {
                return {
                    id: `${baseId('action', 'close-search-options')}--instance-${token('search-options')}`,
                    key: 'action:close-search-options', defaultTag: 'button', interaction: 'click', replay: 'direct'
                };
            }
        }

        const operation = element.dataset.action || element.dataset.op;
        if (operation && operation !== 'toggle-dd' && operation !== 'choose-dd') {
            const isChoice = element.matches('input[type="checkbox"], input[type="radio"]');
            return actionResult(operation, element, suffix(element), isChoice ? 'check' : 'click',
                isChoice && element.tagName !== 'INPUT' ? 'custom-toggle' : 'direct', isChoice ? 'input' : 'button');
        }

        const dropdown = element.dataset.dropdown || element.dataset.dropdownId || element.dataset.dd;
        const isTrigger = element.dataset.dropdown !== undefined || element.dataset.op === 'toggle-dd';
        const isItem = element.dataset.dropdownId !== undefined || element.dataset.op === 'choose-dd';
        if (dropdown && (isTrigger || isItem)) {
            if (EXPANDED_SELECTS.has(dropdown)) {
                const ownerId = baseId('field', dropdown);
                if (isTrigger) return {
                    id: ownerId, key: `field:${dropdown}`, defaultTag: 'select',
                    interaction: 'select_option', replay: 'custom-select'
                };
                const value = element.dataset.value ?? element.dataset.ddValue ?? '';
                return {
                    id: `${ownerId}--option-${token(value)}`, key: `field:${dropdown}:option`,
                    defaultTag: 'option', interaction: 'select_option_value', replay: 'custom-option',
                    ownerId, optionValue: String(value)
                };
            }
            if (isTrigger) return actionResult('dropdown-trigger', element, `--dropdown-${token(dropdown)}`);
            const value = element.dataset.value ?? element.dataset.ddValue ?? '';
            return actionResult('dropdown-item', element,
                `--dropdown-${token(dropdown)}--value-${token(value)}`);
        }

        if (element.classList.contains('email-checkbox')) {
            return actionResult('select-email', element, suffix(element, ['emailId']), 'check', 'direct', 'input');
        }
        if (element.matches('input[type="checkbox"][data-label-id]') && element.closest('.label-picker-item')) {
            return actionResult('apply-label', element, suffix(element, ['labelId']), 'check', 'direct', 'input');
        }
        if (element.classList.contains('email-star')) {
            return actionResult('toggle-email-star', element, suffix(element, ['emailId']));
        }
        if (element.classList.contains('email-important')) {
            return actionResult('toggle-email-important', element, suffix(element, ['emailId']));
        }
        if (element.dataset.category !== undefined) {
            return actionResult('switch-category', element, suffix(element, ['category']));
        }
        if (element.dataset.settingsTab !== undefined) {
            return actionResult('switch-settings-tab', element,
                `--settings-tab-${token(element.dataset.settingsTab)}`);
        }
        if (element.dataset.contextAction !== undefined) {
            return actionResult(`context-${element.dataset.contextAction}`, element, suffix(element));
        }
        if (element.dataset.snooze !== undefined) {
            return actionResult('select-snooze', element, `--snooze-${token(element.dataset.snooze)}`);
        }
        if (element.dataset.colorBg !== undefined) {
            return actionResult('select-label-color', element,
                `--background-${token(element.dataset.colorBg)}--foreground-${token(element.dataset.colorFg || '')}`);
        }
        if (element.dataset.movetoDest !== undefined) {
            return actionResult('move-to-destination', element, suffix(element, ['movetoDest']));
        }
        if (element.dataset.movetoLabel !== undefined) {
            return actionResult('move-to-label', element, suffix(element, ['movetoLabel']));
        }
        if (element.dataset.star !== undefined) {
            return actionResult('toggle-star-setting', element, suffix(element, ['star']));
        }
        if (element.id && element.matches('button, [role="button"], [tabindex]')) {
            return actionResult(element.id, element);
        }
        if (element.matches('a[href]')) {
            return actionResult('open-link', element, `--href-${token(element.getAttribute('href'))}`, 'click', 'direct', 'a');
        }
        if (element.matches('button')) {
            const name = element.dataset.testid || Array.from(element.classList).sort().join('.') || 'button';
            return actionResult(name, element);
        }
        return null;
    }

    function fieldDescriptor(element) {
        if (!element.matches('input, select, textarea, [contenteditable="true"]')) return null;
        if (element.matches('input[type="hidden"]') || element.dataset.action || element.dataset.op ||
            element.classList.contains('email-checkbox')) return null;
        const name = element.id || element.getAttribute('name') || element.dataset.testid ||
            element.dataset.field || element.dataset.setting;
        if (!name) return null;
        const type = (element.getAttribute('type') || '').toLowerCase();
        const isChoice = type === 'checkbox' || type === 'radio';
        const isSelect = element.tagName === 'SELECT';
        let extra = '';
        if (isChoice && (!element.id || type === 'radio')) {
            extra = `--value-${token(element.value || element.dataset.setting || '')}`;
        }
        return {
            id: baseId('field', name) + extra,
            key: `field:${name}`, defaultTag: isChoice ? 'input' : element.tagName.toLowerCase(),
            interaction: isSelect ? 'select_option' : isChoice ? 'check' : 'fill', replay: 'direct'
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
        if (descriptor.ownerId) element.dataset.canonicalOwnerId = descriptor.ownerId;
        else delete element.dataset.canonicalOwnerId;
        if (descriptor.optionValue !== undefined) element.dataset.canonicalOptionValue = descriptor.optionValue;
        else if (element.tagName !== 'OPTION') delete element.dataset.canonicalOptionValue;
        delete element.dataset.canonicalUnmapped;
    }

    function annotateOption(option, owner) {
        if (!owner.dataset.canonicalTargetId) return;
        option.dataset.canonicalTargetId = `${owner.dataset.canonicalTargetId}--option-${token(option.value)}`;
        option.dataset.canonicalOwnerId = owner.dataset.canonicalTargetId;
        option.dataset.canonicalOptionValue = String(option.value);
        option.dataset.canonicalKey = `${owner.dataset.canonicalKey}:option`;
        option.dataset.canonicalDefaultTag = 'option';
        option.dataset.canonicalRenderedTag = 'option';
        option.dataset.canonicalInteraction = 'select_option_value';
        option.dataset.canonicalReplay = 'native-option';
        option.dataset.canonicalVersion = String(VERSION);
    }

    function fingerprint(element) {
        return [element.id, element.dataset.testid, element.dataset.action, element.dataset.op,
            element.dataset.route, element.getAttribute('name'), element.getAttribute('type'),
            Array.from(element.classList).sort().join('.')].filter(Boolean).join('|') || element.tagName.toLowerCase();
    }

    function annotateElement(element) {
        if (!(element instanceof Element)) return;
        const descriptor = actionDescriptor(element) || fieldDescriptor(element);
        if (!descriptor) {
            element.dataset.canonicalTargetId = `${PREFIX}-999999-unmapped--${token(fingerprint(element))}`;
            element.dataset.canonicalKey = 'unmapped';
            element.dataset.canonicalDefaultTag = element.tagName.toLowerCase();
            element.dataset.canonicalRenderedTag = element.tagName.toLowerCase();
            element.dataset.canonicalInteraction = 'unknown';
            element.dataset.canonicalReplay = 'unmapped';
            element.dataset.canonicalVersion = String(VERSION);
            element.dataset.canonicalUnmapped = 'true';
            return;
        }
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
        if (scope instanceof Element && scope.matches(SELECTOR)) annotateElement(scope);
        scope.querySelectorAll(SELECTOR).forEach(annotateElement);
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
        const inbox = document.querySelector('.nav-item[data-route="inbox"][data-canonical-target-id]');
        if (inbox && window.location.hash.startsWith('#/settings')) {
            const cancelId = actionResult('cancel-settings', {
                dataset: { testid: 'settings-cancel' }, closest: () => null
            }, '').id;
            const hasCancel = Array.from(document.querySelectorAll('[data-canonical-target-id]'))
                .some(element => element.dataset.canonicalTargetId === cancelId);
            if (!hasCancel) addAlias(inbox, {
                id: cancelId, key: 'action:cancel-settings', defaultTag: 'button', interaction: 'click'
            });
        }

        const modal = document.getElementById('modalOverlay');
        const header = modal && modal.querySelector('.modal-header [data-canonical-target-id]');
        if (header) {
            const footerId = `${baseId('action', 'close-modal')}--instance-${token('modal-footer')}`;
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
    }

    function resolve(targetId) {
        const matches = Array.from(document.querySelectorAll('[data-canonical-target-id]'))
            .filter(element => element.dataset.canonicalTargetId === targetId);
        if (matches.length > 1) throw new Error(`Canonical target ID is not unique: ${targetId}`);
        if (matches.length === 1) return matches[0];
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
