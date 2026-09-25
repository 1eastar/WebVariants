/* ============================================================
   canonical-targets.js — Stable cross-variant interaction IDs

   These attributes are instrumentation only.  In particular, this file does
   not add roles, labels, tabindex values, or visual affordances, so it does
   not undo any of the observation variants.
   ============================================================ */

(function () {
    'use strict';

    const VERSION = 1;
    const PREFIX = 'ecr';

    // The number is the durable part of a control ID.  The slug is retained
    // for auditability and may be read by humans, but must not be renumbered.
    const ACTION_NAMES = [
        'navigate', 'select-patient', 'back-to-list', 'switch-tab',
        'add-problem', 'edit-problem', 'save-problem', 'save-problem-and-add',
        'save-edit-problem', 'change-problem-status', 'export-problem-to-note',
        'select-problem-search', 'add-vaccination', 'save-vaccination',
        'save-vaccination-and-add', 'select-vaccine-search', 'add-vitals',
        'save-vitals', 'save-vitals-and-add', 'new-visit-note',
        'create-visit-note', 'view-note', 'show-add-block', 'add-block-to-note',
        'remove-block', 'show-add-billing', 'save-billing-item',
        'remove-billing', 'save-note-draft', 'sign-visit-note', 'export-careplan',
        'new-template', 'edit-template', 'duplicate-template', 'delete-template',
        'save-template', 'save-edit-template', 'add-category', 'edit-category',
        'remove-category', 'save-category', 'save-edit-category', 'add-tag',
        'remove-tag', 'save-tag', 'edit-appointment-type',
        'save-appointment-type', 'confirm-delete', 'close-modal'
    ];

    const FIELD_NAMES = [
        'patient-search',
        'problem-search', 'problem-title', 'problem-icd10', 'problem-dx-date',
        'problem-status', 'problem-synopsis',
        'vax-name', 'vax-record-type', 'vax-manufacturer', 'vax-lot', 'vax-ndc',
        'vax-expiration', 'vax-is-injectable', 'vax-dose-amount',
        'vax-dose-units', 'vax-series', 'vax-method', 'vax-site',
        'vax-given-on', 'vax-vis-date', 'vax-ordered-by', 'vax-given-by',
        'vax-not-send-registry', 'vax-recall', 'vax-program', 'vax-funded-by',
        'vax-reason', 'vax-notes',
        'vitals-date', 'vitals-sys', 'vitals-dia', 'vitals-hr', 'vitals-rr',
        'vitals-temp', 'vitals-temp-unit', 'vitals-spo2', 'vitals-pain',
        'vitals-weight', 'vitals-weight-unit', 'vitals-height',
        'vitals-height-unit',
        'note-reason', 'note-format', 'note-category', 'note-template',
        'note-date', 'note-block-content',
        'billing-cpt', 'billing-description',
        'template-name', 'template-hpi', 'template-ros', 'template-pe',
        'template-assessment', 'template-cpt', 'template-cpt-desc',
        'template-pos', 'template-billing-notes', 'template-tags',
        'category-name', 'category-mips', 'category-mips-row', 'tag-name',
        'pref-coded-assessments', 'pref-dx-in-print', 'pref-note-format',
        'apt-note-format', 'apt-note-category', 'apt-note-template',
        'note-search'
    ];

    const ACTIONS = Object.fromEntries(ACTION_NAMES.map((name, index) => [name, {
        id: `${PREFIX}-${String(index + 1).padStart(3, '0')}-${name}`,
        key: `action:${name}`,
        name,
        defaultTag: name === 'select-patient' ? 'tr' : 'button',
        interaction: 'click'
    }]));

    const FIELDS = Object.fromEntries(FIELD_NAMES.map((name, index) => [name, {
        id: `${PREFIX}-${String(index + 101).padStart(3, '0')}-${name}`,
        key: `field:${name}`,
        name
    }]));

    const DISCRIMINATORS = [
        'section', 'tab', 'patientId', 'problemId', 'status', 'noteId',
        'blockIdx', 'billingIdx', 'blockType', 'cpId', 'templateId',
        'categoryId', 'aptId', 'tag', 'icd', 'vaxName'
    ];

    const INTERACTIVE_SELECTOR = [
        '[data-action]', '[data-op]', 'button', 'a[href]',
        'input:not([type="hidden"])', 'select', 'textarea',
        '[contenteditable="true"]', '[role="button"]',
        '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    function shortHash(value) {
        let hash = 0x811c9dc5;
        const text = String(value);
        for (let i = 0; i < text.length; i += 1) {
            hash ^= text.charCodeAt(i);
            hash = Math.imul(hash, 0x01000193);
        }
        return (hash >>> 0).toString(36).padStart(7, '0').slice(0, 7);
    }

    function valueToken(value) {
        const original = String(value);
        const readable = original.normalize('NFKD').toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 32) || 'empty';
        return `${readable}-${shortHash(original)}`;
    }

    function appendDiscriminators(baseId, dataset, allowed) {
        const parts = [];
        const names = allowed || DISCRIMINATORS;
        names.forEach(name => {
            if (dataset && dataset[name] !== undefined && dataset[name] !== '') {
                parts.push(`${name.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}-${valueToken(dataset[name])}`);
            }
        });
        return parts.length ? `${baseId}--${parts.join('--')}` : baseId;
    }

    function defaultFieldShape(element, fieldName) {
        const nativeType = (element.getAttribute('type') || '').toLowerCase();
        const isToggle = nativeType === 'checkbox' || nativeType === 'radio' ||
            element.hasAttribute('data-toggle-id') || element.hasAttribute('data-sw') ||
            fieldName === 'category-mips' || fieldName === 'category-mips-row' ||
            fieldName.startsWith('pref-') && fieldName !== 'pref-note-format' ||
            fieldName === 'vax-is-injectable' || fieldName === 'vax-not-send-registry';
        const isSelect = element.tagName === 'SELECT' || element.hasAttribute('data-dd') ||
            element.hasAttribute('data-dropdown-select') ||
            ['problem-status', 'vax-record-type', 'vax-manufacturer',
                'vax-dose-units', 'vax-method', 'vax-site', 'vax-ordered-by',
                'vax-recall', 'vax-program', 'vax-funded-by',
                'vitals-temp-unit', 'vitals-weight-unit', 'vitals-height-unit',
                'note-format', 'note-category', 'note-template',
                'pref-note-format', 'apt-note-format', 'apt-note-category',
                'apt-note-template'].includes(fieldName);
        if (isToggle) return { defaultTag: 'input', interaction: 'check' };
        if (isSelect) return { defaultTag: 'select', interaction: 'select_option' };
        if (element.tagName === 'TEXTAREA' || fieldName === 'note-block-content') {
            return { defaultTag: 'textarea', interaction: 'fill' };
        }
        return { defaultTag: 'input', interaction: 'fill' };
    }

    function fieldNameFor(element) {
        const raw = element.dataset.dd || element.dataset.sw ||
            element.dataset.dropdownSelect || element.dataset.toggleId || element.id;
        if (raw && FIELDS[raw]) return raw;
        if (raw && raw.startsWith('mips-')) return 'category-mips-row';
        if (element.matches('.block-content[data-block-idx]')) return 'note-block-content';
        return null;
    }

    function fieldDescriptor(element) {
        const fieldName = fieldNameFor(element);
        if (!fieldName) return null;
        const definition = FIELDS[fieldName];
        let id = definition.id;
        if (fieldName === 'category-mips-row') {
            const categoryId = (element.id || element.dataset.sw || element.dataset.toggleId || '').replace(/^mips-/, '');
            id = appendDiscriminators(id, { categoryId }, ['categoryId']);
        }
        if (fieldName === 'note-block-content') {
            const noteId = element.closest('[data-modal-id]') &&
                typeof AppState !== 'undefined' && AppState.modalData && AppState.modalData.id;
            id = appendDiscriminators(id, {
                noteId: noteId || '',
                blockIdx: element.dataset.blockIdx
            }, ['noteId', 'blockIdx']);
        }
        return {
            ...definition,
            ...defaultFieldShape(element, fieldName),
            id,
            replay: element.hasAttribute('data-op') && element.dataset.op === 'toggle-dd'
                ? 'custom-select'
                : element.hasAttribute('data-op') && element.dataset.op === 'toggle-sw'
                    ? 'custom-toggle'
                    : 'direct'
        };
    }

    function actionDescriptor(element) {
        const name = element.dataset.action || element.dataset.op;
        if (!name || !ACTIONS[name]) return null;
        const definition = ACTIONS[name];
        let instance = '';
        if (name === 'switch-tab') {
            instance = element.classList.contains('tab') ? 'tab' : 'shortcut';
        } else if (name === 'close-modal') {
            instance = element.classList.contains('modal-close') ? 'header' : 'cancel';
        } else if (name === 'add-problem') {
            instance = element.closest('.empty-state') ? 'empty-state' : 'header';
        }
        const discriminatedId = appendDiscriminators(definition.id, element.dataset);
        return {
            ...definition,
            id: instance ? discriminatedId + '--instance-' + instance : discriminatedId,
            replay: 'direct'
        };
    }

    function setMetadata(element, descriptor) {
        element.dataset.canonicalTargetId = descriptor.id;
        element.dataset.canonicalKey = descriptor.key;
        element.dataset.canonicalDefaultTag = descriptor.defaultTag;
        element.dataset.canonicalRenderedTag = element.tagName.toLowerCase();
        element.dataset.canonicalInteraction = descriptor.interaction;
        element.dataset.canonicalReplay = descriptor.replay || 'direct';
        element.dataset.canonicalVersion = String(VERSION);
        delete element.dataset.canonicalUnmapped;
    }

    function annotateOption(option, owner) {
        const value = option.dataset.ddValue !== undefined ? option.dataset.ddValue : option.value;
        const ownerId = owner.dataset.canonicalTargetId;
        if (!ownerId) return;
        option.dataset.canonicalTargetId = `${ownerId}--option-${valueToken(value)}`;
        option.dataset.canonicalOwnerId = ownerId;
        option.dataset.canonicalOptionValue = String(value);
        option.dataset.canonicalKey = `${owner.dataset.canonicalKey}:option`;
        option.dataset.canonicalDefaultTag = 'option';
        option.dataset.canonicalRenderedTag = option.tagName.toLowerCase();
        option.dataset.canonicalInteraction = 'select_option_value';
        option.dataset.canonicalReplay = option.tagName === 'OPTION' ? 'native-option' : 'custom-option';
        option.dataset.canonicalVersion = String(VERSION);
        delete option.dataset.canonicalUnmapped;
    }

    function annotateProxy(element, owner) {
        const ownerId = owner.dataset.canonicalTargetId;
        if (!ownerId) return false;
        element.dataset.canonicalTargetId = `${ownerId}--proxy-${element.tagName.toLowerCase()}`;
        element.dataset.canonicalOwnerId = ownerId;
        element.dataset.canonicalKey = `${owner.dataset.canonicalKey}:proxy`;
        element.dataset.canonicalDefaultTag = element.tagName.toLowerCase();
        element.dataset.canonicalRenderedTag = element.tagName.toLowerCase();
        element.dataset.canonicalInteraction = owner.dataset.canonicalInteraction;
        element.dataset.canonicalReplay = 'proxy';
        element.dataset.canonicalVersion = String(VERSION);
        delete element.dataset.canonicalUnmapped;
        return true;
    }

    function aliasesFor(element) {
        try {
            return JSON.parse(element.dataset.canonicalAliases || '[]');
        } catch (_error) {
            return [];
        }
    }

    function addAlias(element, descriptor) {
        const aliases = aliasesFor(element).filter(alias => alias.id !== descriptor.id);
        aliases.push({
            id: descriptor.id,
            key: descriptor.key,
            defaultTag: descriptor.defaultTag,
            interaction: descriptor.interaction,
            replay: 'alias'
        });
        element.dataset.canonicalAliases = JSON.stringify(aliases);
    }

    function annotateAliases() {
        document.querySelectorAll('[data-canonical-key="action:select-patient"]').forEach(row => {
            const proxyId = `${row.dataset.canonicalTargetId}--proxy-button`;
            const hasProxy = Array.from(row.querySelectorAll('[data-canonical-target-id]'))
                .some(element => element.dataset.canonicalTargetId === proxyId);
            if (!hasProxy) {
                addAlias(row, {
                    id: proxyId,
                    key: `${row.dataset.canonicalKey}:proxy`,
                    defaultTag: 'button',
                    interaction: 'click'
                });
            }
        });

        const cancelId = `${ACTIONS['close-modal'].id}--instance-cancel`;
        document.querySelectorAll('[data-modal-id]').forEach(modal => {
            const primaryTargets = Array.from(modal.querySelectorAll('[data-canonical-target-id]'));
            const hasCancel = primaryTargets.some(element => element.dataset.canonicalTargetId === cancelId);
            if (hasCancel) return;
            const headerClose = primaryTargets.find(element =>
                element.dataset.canonicalTargetId === `${ACTIONS['close-modal'].id}--instance-header`
            );
            if (headerClose) {
                addAlias(headerClose, {
                    id: cancelId,
                    key: ACTIONS['close-modal'].key,
                    defaultTag: 'button',
                    interaction: 'click'
                });
            }
        });
    }

    function markUnmapped(element) {
        const fingerprint = [
            element.id, element.dataset.action, element.dataset.op,
            element.getAttribute('type'), Array.from(element.classList).sort().join('.')
        ].filter(Boolean).join('|') || element.tagName.toLowerCase();
        element.dataset.canonicalTargetId = `${PREFIX}-999-unmapped--${valueToken(fingerprint)}`;
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

        // Custom options are appended to document.body after the trigger click.
        if (element.matches('[data-op="choose-dd"], [data-op="select-dd"], .dropdown-option[data-dd]')) {
            const owner = document.querySelector(`[data-dd="${CSS.escape(element.dataset.dd || '')}"][data-canonical-target-id]`);
            if (owner) annotateOption(element, owner);
            else markUnmapped(element);
            return;
        }

        const field = fieldDescriptor(element);
        if (field) {
            setMetadata(element, field);
            if (element.tagName === 'SELECT') {
                Array.from(element.options).forEach(option => annotateOption(option, element));
            }
            return;
        }

        const action = actionDescriptor(element);
        if (action) {
            setMetadata(element, action);
            return;
        }

        // The patient-name button intentionally delegates to its actionable row.
        const owner = element.parentElement && element.parentElement.closest('[data-action], [data-op]');
        if (owner && owner !== element) {
            if (!owner.dataset.canonicalTargetId) annotateElement(owner);
            if (annotateProxy(element, owner)) return;
        }

        markUnmapped(element);
    }

    function annotate(root) {
        const scope = root && root.querySelectorAll ? root : document;
        if (scope instanceof Element && scope.matches(INTERACTIVE_SELECTOR)) annotateElement(scope);
        scope.querySelectorAll(INTERACTIVE_SELECTOR).forEach(annotateElement);
        // Options are deliberately handled even though they are not in the main
        // interactive selector used by BrowserGym.
        scope.querySelectorAll('select[data-canonical-target-id]').forEach(select => {
            Array.from(select.options).forEach(option => annotateOption(option, select));
        });
        annotateAliases();
    }

    function resolve(targetId) {
        let matches = Array.from(document.querySelectorAll('[data-canonical-target-id]'))
            .filter(element => element.dataset.canonicalTargetId === targetId);
        if (matches.length === 0) {
            matches = Array.from(document.querySelectorAll('[data-canonical-aliases]'))
                .filter(element => aliasesFor(element).some(alias => alias.id === targetId));
        }
        if (matches.length > 1) {
            throw new Error(`Canonical target ID is not unique in the current DOM: ${targetId}`);
        }
        return matches[0] || null;
    }

    function optionTarget(ownerId, value) {
        return Array.from(document.querySelectorAll('[data-canonical-owner-id][data-canonical-option-value]'))
            .find(element => element.dataset.canonicalOwnerId === ownerId &&
                String(element.dataset.canonicalOptionValue) === String(value)) || null;
    }

    function replayPlan(targetId, action) {
        const target = resolve(targetId);
        if (!target) return { ready: false, reason: 'target-not-rendered', targetId };
        const requested = action || {};
        const value = requested.value !== undefined ? requested.value : requested.option;
        if (target.dataset.canonicalInteraction === 'select_option') {
            if (target.dataset.canonicalReplay === 'custom-select') {
                return {
                    ready: true,
                    kind: 'expanded-custom-select',
                    steps: [
                        { action: 'click', targetId },
                        { action: 'click-option', ownerId: targetId, value }
                    ]
                };
            }
            return { ready: true, kind: 'direct', steps: [{ action: 'select_option', targetId, value }] };
        }
        if (target.dataset.canonicalInteraction === 'check' && target.dataset.canonicalReplay === 'custom-toggle') {
            return { ready: true, kind: 'expanded-custom-toggle', steps: [{ action: 'click', targetId }] };
        }
        return { ready: true, kind: 'direct', steps: [{ ...requested, targetId }] };
    }

    function audit() {
        annotate(document);
        const targets = Array.from(document.querySelectorAll('[data-canonical-target-id]'));
        const counts = new Map();
        targets.forEach(element => counts.set(
            element.dataset.canonicalTargetId,
            (counts.get(element.dataset.canonicalTargetId) || 0) + 1
        ));
        return {
            version: VERSION,
            targetCount: targets.length,
            uniqueTargetCount: counts.size,
            duplicates: Array.from(counts.entries()).filter(([, count]) => count > 1),
            unmapped: targets.filter(element => element.dataset.canonicalUnmapped === 'true')
                .map(element => ({
                    targetId: element.dataset.canonicalTargetId,
                    tag: element.tagName.toLowerCase(),
                    id: element.id,
                    action: element.dataset.action || element.dataset.op || ''
                })),
            aliases: Array.from(document.querySelectorAll('[data-canonical-aliases]'))
                .flatMap(element => aliasesFor(element).map(alias => ({
                    ...alias,
                    resolvedBy: element.dataset.canonicalTargetId
                })))
        };
    }

    const observer = new MutationObserver(records => {
        records.forEach(record => record.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) annotate(node);
        }));
    });

    window.CanonicalTargets = Object.freeze({
        version: VERSION,
        prefix: PREFIX,
        actions: ACTIONS,
        fields: FIELDS,
        annotate,
        resolve,
        optionTarget,
        replayPlan,
        audit
    });

    document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.documentElement, { childList: true, subtree: true });
        annotate(document);
    });
}());
