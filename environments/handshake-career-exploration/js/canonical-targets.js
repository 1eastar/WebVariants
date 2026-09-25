/* Stable cross-variant interaction metadata. No roles, labels, styles, or app state changes. */
(function () {
    'use strict';

    const VERSION = 1;
    const PREFIX = 'hce';
    const VALUE_KEYS = ['page', 'employerId', 'postId', 'jobId', 'eventId', 'messageId',
        'appointmentId', 'questionId', 'answerId', 'field', 'tab', 'date', 'time', 'value'];
    const SELECTOR = [
        '[data-action]', '[data-op]', '[data-dropdown-id]', '[data-toggle-id]', '[data-checkbox-id]',
        'button', 'a[href]', 'input:not([type="hidden"])', 'select',
        'textarea', '[contenteditable="true"]', '[role="button"]', '[tabindex]:not([tabindex="-1"])'
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
        if (element.matches('.view-all-comments')) return 'all-comments';
        if (element.closest('.post-actions')) return 'post-actions';
        if (element.closest('.modal-header')) return 'modal-header';
        if (element.closest('.modal-footer')) return 'modal-footer';
        if (element.closest('.job-card')) return 'job-card';
        if (element.closest('.employer-mini-card')) return 'employer-mini-card';
        if (element.closest('.employer-card')) return 'employer-card';
        if (element.closest('.event-card')) return 'event-card';
        if (element.closest('.detail-header')) return 'detail-header';
        if (element.closest('.sidebar')) return 'sidebar';
        return '';
    }

    function actionDescriptor(element) {
        const operation = element.dataset.action || element.dataset.op;
        if (operation) {
            const isChoice = element.matches('input[type="checkbox"], input[type="radio"]');
            const context = contextName(element);
            return {
                id: baseId('action', operation) + suffix(element) + (context ? `--instance-${token(context)}` : ''),
                key: `action:${operation}`, defaultTag: isChoice ? 'input' : 'button',
                interaction: isChoice ? 'check' : 'click',
                replay: isChoice && element.tagName !== 'INPUT' ? 'custom-toggle' : 'direct'
            };
        }

        if (element.dataset.toggleId !== undefined || element.dataset.checkboxId !== undefined) {
            const kind = element.dataset.toggleId !== undefined ? 'toggle' : 'checkbox';
            const name = element.dataset.toggleId || element.dataset.checkboxId;
            return {
                id: baseId('field', name), key: `field:${name}`,
                defaultTag: 'button', interaction: 'check', replay: 'custom-toggle'
            };
        }

        const dropdown = element.dataset.dropdownId;
        if (dropdown !== undefined) {
            const isItem = element.matches('.dropdown-item');
            const name = isItem ? 'dropdown-item' : 'dropdown-trigger';
            const value = element.dataset.value ?? '';
            return {
                id: baseId('action', name) + `--dropdown-${token(dropdown)}` +
                    (isItem ? `--value-${token(value)}` : ''),
                key: `action:${name}:${dropdown}`, defaultTag: 'button', interaction: 'click', replay: 'direct'
            };
        }
        if (element.id && element.matches('button, [role="button"], [tabindex]')) {
            return {
                id: baseId('action', element.id), key: `action:${element.id}`,
                defaultTag: 'button', interaction: 'click', replay: 'direct'
            };
        }
        if (element.matches('a[href]')) {
            return {
                id: baseId('action', 'open-link') + `--href-${token(element.getAttribute('href'))}`,
                key: 'action:open-link', defaultTag: 'a', interaction: 'click', replay: 'direct'
            };
        }
        if (element.matches('button')) {
            const name = Array.from(element.classList).sort().join('.') || 'button';
            const context = contextName(element);
            return {
                id: baseId('action', name) + (context ? `--instance-${token(context)}` : ''),
                key: `action:${name}`, defaultTag: 'button', interaction: 'click', replay: 'direct'
            };
        }
        return null;
    }

    function fieldDescriptor(element) {
        if (!element.matches('input, select, textarea, [contenteditable="true"]')) return null;
        if (element.matches('input[type="hidden"]') || element.dataset.action || element.dataset.op) return null;
        let name = element.id || element.getAttribute('name') || element.dataset.typeaheadId;
        let extra = '';
        if (!name) return null;
        const type = (element.getAttribute('type') || '').toLowerCase();
        const isChoice = type === 'checkbox' || type === 'radio';
        const isSelect = element.tagName === 'SELECT';
        if (isChoice) extra += `--value-${token(element.value || name)}`;
        return {
            id: baseId('field', name) + extra, key: `field:${name}`,
            defaultTag: isChoice ? 'input' : element.tagName.toLowerCase(),
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
        return [element.id, element.dataset.action, element.dataset.op, element.dataset.dropdownId,
            element.getAttribute('name'), element.getAttribute('type'),
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
        document.querySelectorAll('.modal-overlay[id]').forEach(modal => {
            const header = modal.querySelector('.modal-header [data-action="closeModal"], .modal-header [data-op="closeModal"]');
            if (!header || !header.dataset.canonicalTargetId) return;
            const expected = [{
                id: baseId('action', 'closeModal') + `--instance-${token('modal-footer')}`,
                key: 'action:closeModal'
            }];
            for (const descriptor of expected) {
                const hasDirect = Array.from(modal.querySelectorAll('[data-canonical-target-id]'))
                    .some(element => element.dataset.canonicalTargetId === descriptor.id);
                if (!hasDirect) addAlias(header, {
                    ...descriptor, defaultTag: 'button', interaction: 'click'
                });
            }
        });
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
