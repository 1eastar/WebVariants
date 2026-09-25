const Components = {
  escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  },

  escapeAttr(str) {
    return Components.escapeHtml(str);
  },

  icon(name) {
    return '<span class="ui-icon ui-icon-' + Components.escapeAttr(name) + '" aria-hidden="true"></span>';
  },

  hitTarget(content) {
    return '<span class="interaction-hit">' + content + '</span>';
  },

  actionIcon(action, label) {
    const byAction = {
      'do-search': 'search',
      'new-invoice': 'plus',
      'new-quote': 'plus',
      'new-credit-note': 'plus',
      'new-repeating': 'plus',
      'new-theme': 'plus',
      'new-reminder': 'plus',
      'save-invoice': 'save',
      'save-invoice-draft': 'save',
      'save-invoice-submit': 'send',
      'save-invoice-approve': 'check',
      'save-quote': 'save',
      'save-quote-draft': 'save',
      'save-quote-send': 'send',
      'save-credit-note': 'save',
      'save-cn-draft': 'save',
      'save-cn-approve': 'check',
      'save-repeating': 'save',
      'save-repeating-new': 'save',
      'save-settings': 'save',
      'save-theme': 'save',
      'save-theme-new': 'plus',
      'save-reminder': 'save',
      'save-reminder-new': 'plus',
      'cancel-form': 'close',
      'close-modal': 'close',
      'close-toast': 'close',
      'edit-invoice': 'edit',
      'edit-quote': 'edit',
      'edit-credit-note': 'edit',
      'edit-theme': 'edit',
      'edit-reminder': 'edit',
      'delete-invoice': 'delete',
      'delete-quote': 'delete',
      'delete-credit-note': 'delete',
      'delete-theme': 'delete',
      'delete-reminder': 'delete',
      'delete-repeating': 'delete',
      'confirm-delete-invoice': 'delete',
      'remove-payment': 'delete',
      'remove-line': 'delete',
      'approve-invoice': 'check',
      'approve-credit-note': 'check',
      'submit-for-approval': 'send',
      'send-invoice': 'send',
      'send-quote': 'send',
      'mark-sent': 'send',
      'accept-quote': 'check-circle',
      'decline-quote': 'close-circle',
      'void-invoice': 'stop',
      'confirm-void-invoice': 'stop',
      'copy-invoice': 'copy',
      'copy-quote': 'copy',
      'create-cn-from-invoice': 'credit-note',
      'invoice-from-quote': 'file-add',
      'show-add-payment': 'dollar-circle',
      'confirm-add-payment': 'dollar-circle',
      'show-allocate-cn': 'credit-card',
      'confirm-allocate-cn': 'credit-card',
      'set-default-theme': 'check-circle',
      'add-line': 'plus',
      'prev-page': 'left',
      'next-page': 'left'
    };
    if (byAction[action]) return byAction[action];
    const text = (label || '').toLowerCase();
    if (text.includes('delete') || text.includes('remove')) return 'delete';
    if (text.includes('edit')) return 'edit';
    if (text.includes('save')) return 'save';
    if (text.includes('approve') || text.includes('accept') || text.includes('confirm')) return 'check';
    if (text.includes('send') || text.includes('submit')) return 'send';
    if (text.includes('copy')) return 'copy';
    if (text.includes('cancel') || text.includes('close') || text.includes('decline')) return 'close';
    if (text.includes('payment') || text.includes('pay')) return 'dollar-circle';
    if (text.includes('credit note')) return 'credit-note';
    if (text.includes('credit')) return 'credit-card';
    if (text.includes('new') || text.includes('add') || text.includes('create')) return 'plus';
    return '';
  },

  actionShortText(action, label) {
    if (['new-credit-note', 'new-repeating', 'new-theme', 'new-reminder'].includes(action)) return '';
    const short = {
      'new-invoice': 'Invoice',
      'new-quote': 'Quote',
      'save-invoice-draft': 'Draft',
      'save-quote-draft': 'Draft',
      'save-cn-draft': 'Draft',
      'save-invoice-submit': 'Submit',
      'save-invoice-approve': 'OK',
      'save-quote-send': 'Send',
      'save-cn-approve': 'OK',
      'save-theme-new': 'Theme',
      'save-reminder-new': 'Reminder',
      'add-line': 'Line',
      'invoice-from-quote': 'Inv'
    };
    if (short[action]) return short[action];
    const text = label || '';
    if (/^New /.test(text)) return text.replace(/^New\s+/, '').split(/\s+/).map(w => w[0]).join('').slice(0, 4);
    if (/^Add /.test(text) || /^Create /.test(text)) return text.replace(/^(Add|Create)\s+/, '').split(/\s+/)[0];
    return '';
  },

  actionContent(action, label) {
    const icon = Components.actionIcon(action, label);
    if (!icon) return Components.escapeHtml(label || '');
    const shortText = Components.actionShortText(action, label);
    return Components.icon(icon) + (shortText ? '<span class="btn-short-label">' + Components.escapeHtml(shortText) + '</span>' : '');
  },

  formatCurrency(amount, currency) {
    const c = currency || 'AUD';
    const curr = CURRENCIES.find(cu => cu.code === c);
    const sym = curr ? curr.symbol : '$';
    if (amount < 0) return '-' + sym + Math.abs(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return sym + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + (dateStr.includes('T') ? '' : 'T00:00:00'));
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  },

  formatDateFull(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + (dateStr.includes('T') ? '' : 'T00:00:00'));
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  },

  formatDateTime(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const hrs = d.getHours();
    const mins = String(d.getMinutes()).padStart(2, '0');
    const ampm = hrs >= 12 ? 'PM' : 'AM';
    const hr12 = hrs % 12 || 12;
    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear() + ', ' + hr12 + ':' + mins + ' ' + ampm;
  },

  todayStr() {
    return new Date().toISOString().split('T')[0];
  },

  statusBadge(status) {
    const labels = {
      draft: 'Draft',
      awaiting_approval: 'Awaiting Approval',
      awaiting_payment: 'Awaiting Payment',
      overdue: 'Overdue',
      paid: 'Paid',
      voided: 'Voided',
      deleted: 'Deleted',
      sent: 'Sent',
      accepted: 'Accepted',
      declined: 'Declined',
      invoiced: 'Invoiced',
      active: 'Active'
    };
    const classes = {
      draft: 'badge-draft',
      awaiting_approval: 'badge-awaiting',
      awaiting_payment: 'badge-awaiting',
      overdue: 'badge-overdue',
      paid: 'badge-paid',
      voided: 'badge-voided',
      deleted: 'badge-voided',
      sent: 'badge-sent',
      accepted: 'badge-accepted',
      declined: 'badge-declined',
      active: 'badge-active'
    };
    return '<span class="status-badge ' + (classes[status] || 'badge-draft') + '">' + (labels[status] || status) + '</span>';
  },

  dropdown(id, options, selectedValue, placeholder, extraClass) {
    const selected = options.find(o => o.value === selectedValue);
    const displayText = selected ? Components.escapeHtml(selected.label) : (placeholder || 'Select...');
    const menuId = id + '-menu';
    let html = '<div class="custom-dropdown ' + (extraClass || '') + '" id="' + id + '" data-testid="' + id + '">';
    html += '<button type="button" class="dropdown-trigger strict-hit" data-dropdown="' + id + '" aria-haspopup="listbox" aria-controls="' + menuId + '" aria-expanded="false">';
    html += '<span class="interaction-hit">';
    html += '<span class="dropdown-text">' + displayText + '</span>';
    html += '<span class="dropdown-arrow">&#9662;</span>';
    html += '</span></button>';
    html += '<div class="dropdown-menu" id="' + menuId + '" role="listbox">';
    options.forEach(opt => {
      const isActive = opt.value === selectedValue ? ' active' : '';
      const ariaSelected = opt.value === selectedValue ? 'true' : 'false';
      html += '<button type="button" class="dropdown-item strict-hit' + isActive + '" role="option" aria-selected="' + ariaSelected + '" data-value="' + Components.escapeHtml(opt.value) + '" data-dropdown-id="' + id + '"><span class="interaction-hit">' + Components.escapeHtml(opt.label) + '</span></button>';
    });
    html += '</div></div>';
    return html;
  },

  searchableDropdown(id, options, selectedValue, placeholder) {
    const selected = options.find(o => o.value === selectedValue);
    const displayText = selected ? Components.escapeHtml(selected.label) : '';
    const menuId = id + '-menu';
    let html = '<div class="custom-dropdown searchable-dropdown" id="' + id + '" data-testid="' + id + '">';
    html += '<input type="text" class="dropdown-search-input" id="' + id + '-input" data-searchable-dropdown="' + id + '" placeholder="' + (placeholder || 'Search...') + '" value="' + displayText + '" autocomplete="off" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="' + menuId + '" />';
    html += '<div class="dropdown-menu" id="' + menuId + '" role="listbox">';
    options.forEach(opt => {
      const isActive = opt.value === selectedValue ? ' active' : '';
      const ariaSelected = opt.value === selectedValue ? 'true' : 'false';
      html += '<button type="button" class="dropdown-item strict-hit' + isActive + '" role="option" aria-selected="' + ariaSelected + '" data-value="' + Components.escapeHtml(opt.value) + '" data-dropdown-id="' + id + '"><span class="interaction-hit">' + Components.escapeHtml(opt.label) + '</span></button>';
    });
    html += '</div></div>';
    return html;
  },

  toggle(id, checked, label) {
    let html = '<div class="toggle-row" data-testid="' + id + '">';
    html += '<span class="toggle-label">' + Components.escapeHtml(label) + '</span>';
    html += '<span class="toggle-switch" role="switch" aria-checked="' + (checked ? 'true' : 'false') + '">';
    html += '<input type="checkbox" id="' + id + '" aria-label="' + Components.escapeAttr(label) + '" ' + (checked ? 'checked' : '') + ' />';
    html += '<span class="toggle-slider"></span>';
    html += '</span></div>';
    return html;
  },

  textInput(id, value, placeholder, type) {
    return '<input type="' + (type || 'text') + '" class="form-input" id="' + id + '" data-testid="' + id + '" value="' + Components.escapeHtml(value || '') + '" placeholder="' + Components.escapeHtml(placeholder || '') + '" />';
  },

  dateInput(id, value) {
    return '<input type="text" class="form-input date-input" id="' + id + '" data-testid="' + id + '" value="' + Components.escapeHtml(value || '') + '" placeholder="YYYY-MM-DD" pattern="\\d{4}-\\d{2}-\\d{2}" />';
  },

  textarea(id, value, placeholder, rows) {
    return '<textarea class="form-textarea" id="' + id + '" data-testid="' + id + '" placeholder="' + Components.escapeHtml(placeholder || '') + '" rows="' + (rows || 3) + '">' + Components.escapeHtml(value || '') + '</textarea>';
  },

  button(label, action, style, extraAttrs) {
    const cls = style === 'primary' ? 'btn btn-primary' : style === 'danger' ? 'btn btn-danger' : style === 'success' ? 'btn btn-success' : 'btn btn-secondary';
    const content = Components.actionContent(action, label);
    const iconOnly = content.indexOf('btn-short-label') === -1 && content.indexOf('ui-icon') !== -1;
    return '<button type="button" class="' + cls + ' icon-ui-btn strict-hit' + (iconOnly ? ' icon-only' : '') + '" data-action="' + action + '" aria-label="' + Components.escapeAttr(label) + '" title="' + Components.escapeAttr(label) + '"' + (extraAttrs || '') + '>' + Components.hitTarget(content) + '</button>';
  },

  iconButton(icon, action, title, extraAttrs) {
    const label = title || action;
    const mapped = Components.actionIcon(action, label);
    return '<button type="button" class="btn-icon icon-ui-btn icon-only strict-hit" data-action="' + action + '" title="' + Components.escapeHtml(label) + '" aria-label="' + Components.escapeAttr(label) + '"' + (extraAttrs || '') + '>' + Components.hitTarget(mapped ? Components.icon(mapped) : icon) + '</button>';
  },

  modal(id, title, bodyHtml, footerHtml) {
    let html = '<div class="modal-backdrop" id="' + id + '-backdrop">';
    html += '<div class="modal" id="' + id + '">';
    html += '<div class="modal-header"><h3>' + Components.escapeHtml(title) + '</h3>';
    html += '<button type="button" class="modal-close icon-ui-btn icon-only strict-hit" data-action="close-modal" data-modal-id="' + id + '" aria-label="Close modal" title="Close modal">' + Components.hitTarget(Components.icon('close')) + '</button></div>';
    html += '<div class="modal-body">' + bodyHtml + '</div>';
    if (footerHtml) html += '<div class="modal-footer">' + footerHtml + '</div>';
    html += '</div></div>';
    return html;
  },

  toast(message, type) {
    const cls = type === 'error' ? 'toast-error' : type === 'warning' ? 'toast-warning' : 'toast-success';
    return '<div class="toast ' + cls + '"><span class="toast-message">' + Components.escapeHtml(message) + '</span><button class="toast-close icon-ui-btn icon-only strict-hit" data-action="close-toast" aria-label="Dismiss notification" title="Dismiss notification">' + Components.hitTarget(Components.icon('close')) + '</button></div>';
  },

  showToast(message, type) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const div = document.createElement('div');
    div.innerHTML = Components.toast(message, type || 'success');
    container.appendChild(div.firstChild);
    setTimeout(() => {
      const toast = container.querySelector('.toast');
      if (toast) toast.remove();
    }, 4000);
  },

  emptyState(icon, title, message, actionLabel, actionName) {
    let html = '<div class="empty-state">';
    html += '<div class="empty-icon">' + icon + '</div>';
    html += '<h3>' + Components.escapeHtml(title) + '</h3>';
    html += '<p>' + Components.escapeHtml(message) + '</p>';
    if (actionLabel) {
      html += Components.button(actionLabel, actionName, 'primary');
    }
    html += '</div>';
    return html;
  },

  confirmDialog(title, message, confirmAction, confirmLabel) {
    const body = '<p>' + Components.escapeHtml(message) + '</p>';
    const footer = Components.button(confirmLabel || 'Confirm', confirmAction, 'danger');
    return Components.modal('confirmModal', title, body, footer);
  },

  pagination(currentPage, totalItems, pageSize) {
    const totalPages = Math.ceil(totalItems / pageSize);
    if (totalPages <= 1) return '';
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItems);
    let html = '<div class="pagination">';
    html += '<span class="pagination-info">Showing ' + start + '-' + end + ' of ' + totalItems + '</span>';
    html += '<button type="button" class="btn-icon icon-ui-btn icon-only strict-hit pagination-prev" data-action="prev-page" aria-label="Previous page" title="Previous page"' + (currentPage <= 1 ? ' disabled' : '') + '>' + Components.hitTarget(Components.icon('left')) + '</button>';
    html += '<button type="button" class="btn-icon icon-ui-btn icon-only strict-hit pagination-next" data-action="next-page" aria-label="Next page" title="Next page"' + (currentPage >= totalPages ? ' disabled' : '') + '>' + Components.hitTarget(Components.icon('left')) + '</button>';
    html += '</div>';
    return html;
  },

  tabs(tabs, activeTab) {
    let html = '<div class="tabs">';
    tabs.forEach(tab => {
      const active = tab.id === activeTab ? ' active' : '';
      const count = tab.count !== undefined ? ' <span class="tab-count">(' + tab.count + ')</span>' : '';
      html += '<button type="button" class="tab strict-hit' + active + '" data-action="switch-tab" data-tab="' + tab.id + '">' + Components.hitTarget(Components.escapeHtml(tab.label) + count) + '</button>';
    });
    html += '</div>';
    return html;
  },

  tableHeader(columns) {
    let html = '<thead><tr>';
    columns.forEach(col => {
      const style = col.width ? ' style="width:' + col.width + '"' : '';
      const cls = col.align ? ' class="text-' + col.align + '"' : '';
      html += '<th' + style + cls + '>' + Components.escapeHtml(col.label) + '</th>';
    });
    html += '</tr></thead>';
    return html;
  },

  avatar(name) {
    const initials = (name || '?').split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
    const colors = ['#1a73e8', '#e8710a', '#0d652d', '#b31412', '#7b1fa2', '#00796b', '#c2185b', '#455a64'];
    const hash = name ? name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) : 0;
    const color = colors[hash % colors.length];
    return '<div class="avatar" style="background:' + color + '">' + initials + '</div>';
  }
};
