# Canonical interaction targets

All five Elation Clinical Records variants load the same
`js/canonical-targets.js` instrumentation. It assigns stable logical target
metadata after every render without adding accessibility or visual cues.

## Recorded action shape

Record at least the following values for every human action:

```json
{
  "target_id": "ecr-105-problem-title",
  "action_type": "fill",
  "value": "Type 2 diabetes mellitus"
}
```

For `select_option`, `check`, `uncheck`, and text actions, retaining the action
argument (`value`, option value, or checked state) is required. A target ID by
itself cannot encode which select option was chosen.

The action target is the closest ancestor carrying
`data-canonical-target-id`. Useful attributes are:

- `data-canonical-target-id`: stable instance target ID
- `data-canonical-key`: logical control family
- `data-canonical-default-tag`: tag used by the default site
- `data-canonical-rendered-tag`: tag used by the current variant
- `data-canonical-interaction`: logical BrowserGym action family
- `data-canonical-replay`: `direct`, `custom-select`, `custom-toggle`, etc.
- `data-canonical-owner-id` and `data-canonical-option-value`: option metadata
- `data-canonical-aliases`: IDs implemented by the same rendered element when
  a variant removed or merged a default control

## ID format

Base IDs use a durable number and an audit slug, for example
`ecr-006-edit-problem`. Repeated records add deterministic discriminators, for
example:

```text
ecr-006-edit-problem--problem-id-prob-001-0abc123
```

The number is immutable. The slug is explanatory. User/data-derived suffixes
contain a readable fragment and a deterministic hash to avoid collisions.

## Replay contract

Do not locate targets with a CSS selector alone. Some icon/small-interaction
controls are merged and therefore expose an alias rather than a second primary
attribute. Resolve through the runtime API:

```js
const element = CanonicalTargets.resolve(targetId);
const plan = CanonicalTargets.replayPlan(targetId, {
  action: actionType,
  value
});
```

`replayPlan` returns a direct one-step action for normal controls. A native
select converted to a div dropdown returns:

```json
{
  "kind": "expanded-custom-select",
  "steps": [
    {"action": "click", "targetId": "..."},
    {"action": "click-option", "ownerId": "...", "value": "..."}
  ]
}
```

After the trigger click, locate the generated option with:

```js
CanonicalTargets.optionTarget(ownerTargetId, optionValue)
```

A checkbox converted to a div switch produces an
`expanded-custom-toggle` click. `resolve` also handles the patient-row and
modal-cancel aliases used by the icon and small-interaction variants.

## Validation

From `webarena-infinity`, run:

```bash
python apps/validate_elation_canonical_targets.py
```

The validator renders every seeded patient tab, every top-level section, all
modal families, search results, and every dropdown option. It fails on an
unmapped target, a duplicate ID in one DOM, metadata drift, or any ID that
cannot be resolved in another variant.

The external BrowserGym human recorder and four-variant replay workflow are
documented in [`../elation_trajectory/README.md`](../elation_trajectory/README.md).
They consume these attributes without changing application behavior or adding
recorder UI to screenshots/accessibility trees.
