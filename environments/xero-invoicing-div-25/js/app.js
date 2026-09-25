const App = {
  _divLevel: 25,
  _openDropdownId: null,
  _formLineItems: [],
  _formPrefix: '',
  _currentPage: 1,
  _pageSize: 25,
  _tabsByView: {
    invoices: 'all',
    quotes: 'all',
    'credit-notes': 'all'
  },
  _tabOptionsByView: {
    invoices: ['all', 'draft', 'awaiting_approval', 'awaiting_payment', 'overdue', 'paid'],
    quotes: ['all', 'draft', 'sent', 'accepted', 'declined'],
    'credit-notes': ['all', 'draft', 'awaiting_payment', 'paid']
  },

  init() {
    AppState.init();
    AppState.subscribe(() => App.render());
    window.addEventListener('hashchange', () => { App.parseRoute(); App.render(); });
    document.addEventListener('click', (e) => App.handleClick(e));
    document.addEventListener('change', (e) => App.handleChange(e));
    document.addEventListener('input', (e) => App.handleInput(e));
    document.addEventListener('keydown', (e) => App.handleKeydown(e));
    document.addEventListener('scroll', () => App._positionOpenDropdown(), true);
    window.addEventListener('resize', () => App._positionOpenDropdown());
    App._connectSSE();
    App.parseRoute();
    App.render();
    AppState._pushStateToServer();
  },

  parseRoute() {
    const hash = window.location.hash || '#/dashboard';
    const parts = hash.replace('#/', '').split('/');
    const view = parts[0] || 'dashboard';

    const validViews = ['dashboard', 'invoices', 'quotes', 'credit-notes', 'repeating-invoices', 'settings', 'templates', 'reminders', 'search'];
    if (validViews.includes(view)) {
      AppState.currentView = view;
      AppState.currentSubView = parts[1] || '';
      AppState.currentId = parts[2] || parts[1] || null;
    } else {
      AppState.currentView = 'dashboard';
      AppState.currentSubView = '';
      AppState.currentId = null;
    }

    if (view === 'invoices' && parts[1] === 'new') {
      AppState.currentSubView = 'new';
      AppState.currentId = null;
    } else if (view === 'invoices' && parts[1] === 'edit' && parts[2]) {
      AppState.currentSubView = 'edit';
      AppState.currentId = parts[2];
    } else if (view === 'invoices' && parts[1] && parts[1] !== 'new' && parts[1] !== 'edit') {
      AppState.currentSubView = 'detail';
      AppState.currentId = parts[1];
    }

    if (view === 'quotes' && parts[1] === 'new') {
      AppState.currentSubView = 'new';
    } else if (view === 'quotes' && parts[1] === 'edit' && parts[2]) {
      AppState.currentSubView = 'edit';
      AppState.currentId = parts[2];
    } else if (view === 'quotes' && parts[1] && parts[1] !== 'new' && parts[1] !== 'edit') {
      AppState.currentSubView = 'detail';
      AppState.currentId = parts[1];
    }

    if (view === 'credit-notes' && parts[1] === 'new') {
      AppState.currentSubView = 'new';
    } else if (view === 'credit-notes' && parts[1] === 'edit' && parts[2]) {
      AppState.currentSubView = 'edit';
      AppState.currentId = parts[2];
    } else if (view === 'credit-notes' && parts[1] && parts[1] !== 'new' && parts[1] !== 'edit') {
      AppState.currentSubView = 'detail';
      AppState.currentId = parts[1];
    }

    if (view === 'repeating-invoices' && parts[1] === 'new') {
      AppState.currentSubView = 'new';
    } else if (view === 'repeating-invoices' && parts[1] === 'edit' && parts[2]) {
      AppState.currentSubView = 'edit';
      AppState.currentId = parts[2];
    } else if (view === 'repeating-invoices' && parts[1] && parts[1] !== 'new' && parts[1] !== 'edit') {
      AppState.currentSubView = 'detail';
      AppState.currentId = parts[1];
    }

    if (view === 'templates' && parts[1] === 'new') {
      AppState.currentSubView = 'new';
    } else if (view === 'templates' && parts[1] === 'edit' && parts[2]) {
      AppState.currentSubView = 'edit';
      AppState.currentId = parts[2];
    }

    if (view === 'reminders' && parts[1] === 'new') {
      AppState.currentSubView = 'new';
    } else if (view === 'reminders' && parts[1] === 'edit' && parts[2]) {
      AppState.currentSubView = 'edit';
      AppState.currentId = parts[2];
    }

    App._syncCurrentTabForView(AppState.currentView);
    AppState.selectedIds = new Set();
    App._currentPage = 1;
  },

  navigate(route) {
    AppState.searchResults = null;
    AppState.searchQuery = '';
    window.location.hash = '#/' + route;
  },

  render() {
    const sidebar = document.getElementById('sidebarNav');
    if (sidebar) sidebar.innerHTML = Views.renderSidebar();

    const content = document.getElementById('contentWrapper');
    if (!content) return;

    let html = '';
    const view = AppState.currentView;
    const sub = AppState.currentSubView;

    if (AppState.searchResults !== null) {
      html = Views.renderSearchResults(AppState.searchResults);
    } else if (view === 'dashboard') {
      html = Views.renderDashboard();
    } else if (view === 'invoices') {
      if (sub === 'new') {
        html = Views.renderInvoiceForm(null);
      } else if (sub === 'edit' && AppState.currentId) {
        html = Views.renderInvoiceForm(AppState.getInvoiceById(AppState.currentId));
      } else if (sub === 'detail' && AppState.currentId) {
        html = Views.renderInvoiceDetail(AppState.getInvoiceById(AppState.currentId));
      } else {
        html = Views.renderInvoiceList();
      }
    } else if (view === 'quotes') {
      if (sub === 'new') {
        html = Views.renderQuoteForm(null);
      } else if (sub === 'edit' && AppState.currentId) {
        html = Views.renderQuoteForm(AppState.getQuoteById(AppState.currentId));
      } else if (sub === 'detail' && AppState.currentId) {
        html = Views.renderQuoteDetail(AppState.getQuoteById(AppState.currentId));
      } else {
        html = Views.renderQuoteList();
      }
    } else if (view === 'credit-notes') {
      if (sub === 'new') {
        html = Views.renderCreditNoteForm(null);
      } else if (sub === 'edit' && AppState.currentId) {
        html = Views.renderCreditNoteForm(AppState.getCreditNoteById(AppState.currentId));
      } else if (sub === 'detail' && AppState.currentId) {
        html = Views.renderCreditNoteDetail(AppState.getCreditNoteById(AppState.currentId));
      } else {
        html = Views.renderCreditNoteList();
      }
    } else if (view === 'repeating-invoices') {
      if (sub === 'new') {
        html = Views.renderRepeatingInvoiceForm(null);
      } else if (sub === 'edit' && AppState.currentId) {
        html = Views.renderRepeatingInvoiceForm(AppState.getRepeatingInvoiceById(AppState.currentId));
      } else {
        html = Views.renderRepeatingInvoiceList();
      }
    } else if (view === 'settings') {
      html = Views.renderSettings();
    } else if (view === 'templates') {
      if (sub === 'new') {
        html = Views.renderThemeForm(null);
      } else if (sub === 'edit' && AppState.currentId) {
        html = Views.renderThemeForm(AppState.getBrandingThemeById(AppState.currentId));
      } else {
        html = Views.renderTemplates();
      }
    } else if (view === 'reminders') {
      if (sub === 'new') {
        html = Views.renderReminderForm(null);
      } else if (sub === 'edit' && AppState.currentId) {
        html = Views.renderReminderForm(AppState.invoiceReminders.find(r => r.id === AppState.currentId));
      } else {
        html = Views.renderReminders();
      }
    }

    content.innerHTML = html;

    // Modal overlay
    const modalContainer = document.getElementById('modalContainer');
    if (modalContainer) {
      if (AppState.modalState) {
        modalContainer.innerHTML = AppState.modalState;
        modalContainer.style.display = 'block';
      } else {
        modalContainer.innerHTML = '';
        modalContainer.style.display = 'none';
      }
    }

    // Update form totals after render
    this._updateFormTotals();
  },

  // ---- Click handler ----
  handleClick(e) {
    const target = e.target;
    if (!(target instanceof Element)) return;

    // Close dropdowns on outside click
    const dropdown = target.closest('.custom-dropdown');
    if (!dropdown && App._openDropdownId) {
      App._closeAllDropdowns();
    }

    // Route links
    const routeEl = target.closest('[data-route]');
    if (routeEl) {
      e.preventDefault();
      const route = routeEl.dataset.route;
      const tab = routeEl.dataset.tab;
      if (tab) App._setTabForRoute(route, tab);
      App.navigate(route);
      return;
    }

    // Dropdown trigger
    const ddTrigger = target.closest('[data-dropdown]');
    if (ddTrigger) {
      e.preventDefault();
      e.stopPropagation();
      const ddId = ddTrigger.dataset.dropdown;
      App._toggleDropdown(ddId);
      return;
    }

    // Dropdown item
    const ddItem = target.closest('.dropdown-item[data-value]');
    if (ddItem) {
      e.preventDefault();
      e.stopPropagation();
      const ddId = ddItem.dataset.dropdownId;
      const value = ddItem.dataset.value;
      App._handleDropdownSelect(ddId, value);
      return;
    }

    // Checkbox
    const checkbox = target.closest('.row-checkbox');
    if (checkbox) {
      const id = checkbox.dataset.checkId;
      App._setChecked(checkbox, !App._isChecked(checkbox));
      if (AppState.selectedIds.has(id)) {
        AppState.selectedIds.delete(id);
      } else {
        AppState.selectedIds.add(id);
      }
      App.render();
      return;
    }

    const divCheck = target.closest('[data-div-check]');
    if (divCheck) {
      App._setChecked(divCheck, !App._isChecked(divCheck));
    }

    // Actions
    const actionEl = target.closest('[data-op], [data-action]');
    if (actionEl) {
      // Don't close modal from clicks inside the modal that bubble to backdrop
      const action = actionEl.dataset.op || actionEl.dataset.action;
      if (action === 'close-modal' && actionEl.classList.contains('modal-backdrop') && target.closest('.modal')) {
        return;
      }
      e.preventDefault();
      App.handleAction(action, actionEl);
      return;
    }
  },

  handleAction(action, el) {
    const id = el ? el.dataset.id : null;

    switch (action) {
      // Navigation
      case 'new-invoice': App.navigate('invoices/new'); break;
      case 'new-quote': App.navigate('quotes/new'); break;
      case 'new-credit-note': App.navigate('credit-notes/new'); break;
      case 'new-repeating': App.navigate('repeating-invoices/new'); break;
      case 'new-theme': App.navigate('templates/new'); break;
      case 'new-reminder': App.navigate('reminders/new'); break;

      case 'view-invoice': App.navigate('invoices/' + id); break;
      case 'view-quote': App.navigate('quotes/' + id); break;
      case 'view-credit-note': App.navigate('credit-notes/' + id); break;
      case 'view-repeating': App.navigate('repeating-invoices/edit/' + id); break;

      case 'edit-invoice': App.navigate('invoices/edit/' + id); break;
      case 'edit-quote': App.navigate('quotes/edit/' + id); break;
      case 'edit-credit-note': App.navigate('credit-notes/edit/' + id); break;
      case 'edit-theme': App.navigate('templates/edit/' + id); break;
      case 'edit-reminder': App.navigate('reminders/edit/' + id); break;

      case 'back-to-invoices': App.navigate('invoices'); break;
      case 'back-to-quotes': App.navigate('quotes'); break;
      case 'back-to-credit-notes': App.navigate('credit-notes'); break;
      case 'cancel-form': window.history.back(); break;

      // Tab switching
      case 'switch-tab':
        App._setCurrentTabForView(AppState.currentView, el.dataset.tab);
        App._currentPage = 1;
        App.render();
        break;

      // Invoice actions
      case 'approve-invoice': AppState.approveInvoice(id); Components.showToast('Invoice approved'); break;
      case 'submit-for-approval': AppState.submitForApproval(id); Components.showToast('Submitted for approval'); break;
      case 'send-invoice': AppState.sendInvoice(id); Components.showToast('Invoice sent'); break;
      case 'mark-sent': AppState.markInvoiceSent(id); Components.showToast('Marked as sent'); break;
      case 'void-invoice':
        AppState.modalState = Components.confirmDialog('Void Invoice', 'Are you sure you want to void this invoice? This cannot be undone.', 'confirm-void-invoice', 'Void');
        App.render();
        break;
      case 'confirm-void-invoice':
        AppState.voidInvoice(AppState.currentId);
        AppState.modalState = null;
        Components.showToast('Invoice voided');
        App.render();
        break;
      case 'delete-invoice':
        AppState.modalState = Components.confirmDialog('Delete Invoice', 'Are you sure you want to delete this invoice?', 'confirm-delete-invoice', 'Delete');
        App.render();
        break;
      case 'confirm-delete-invoice':
        AppState.deleteInvoice(AppState.currentId);
        AppState.modalState = null;
        App.navigate('invoices');
        Components.showToast('Invoice deleted');
        break;
      case 'copy-invoice': {
        const copy = AppState.copyInvoice(id);
        if (copy) { App.navigate('invoices/' + copy.id); Components.showToast('Invoice copied'); }
        break;
      }
      case 'create-cn-from-invoice': {
        const inv = AppState.getInvoiceById(id);
        if (inv) {
          App.navigate('credit-notes/new');
          // Store context for pre-filling
          App._prefillCN = { contactId: inv.contactId, reference: 'Re: ' + inv.number, lineItems: JSON.parse(JSON.stringify(inv.lineItems)), taxMode: inv.taxMode };
        }
        break;
      }

      // Payment
      case 'show-add-payment': {
        const inv = AppState.getInvoiceById(id);
        if (inv) { AppState.modalState = Views.renderPaymentModal(inv); App.render(); }
        break;
      }
      case 'confirm-add-payment': {
        const invId = el.dataset.invoiceId;
        const date = App._getValue('pay-date');
        const amount = parseFloat(App._getValue('pay-amount'));
        const reference = App._getValue('pay-reference');
        const accountId = App._getDropdownValue('pay-account') || 'acc_090';
        if (!date || isNaN(amount) || amount <= 0) {
          Components.showToast('Please enter a valid date and amount', 'error');
          break;
        }
        AppState.addPayment(invId, { date, amount, reference, accountId });
        AppState.modalState = null;
        Components.showToast('Payment recorded');
        break;
      }
      case 'remove-payment': {
        const invId = el.dataset.invoiceId;
        const payId = el.dataset.paymentId;
        AppState.removePayment(invId, payId);
        Components.showToast('Payment removed');
        break;
      }

      // Save invoice
      case 'save-invoice-draft': App._saveInvoice('draft'); break;
      case 'save-invoice-submit': App._saveInvoice('awaiting_approval'); break;
      case 'save-invoice-approve': App._saveInvoice('awaiting_payment'); break;
      case 'save-invoice': App._updateInvoice(el.dataset.id); break;

      // Quote actions
      case 'send-quote': AppState.sendQuote(id); Components.showToast('Quote sent'); break;
      case 'accept-quote': AppState.acceptQuote(id); Components.showToast('Quote accepted'); break;
      case 'decline-quote': AppState.declineQuote(id); Components.showToast('Quote declined'); break;
      case 'delete-quote': AppState.deleteQuote(id); App.navigate('quotes'); Components.showToast('Quote deleted'); break;
      case 'copy-quote': {
        const copy = AppState.copyQuote(id);
        if (copy) { App.navigate('quotes/' + copy.id); Components.showToast('Quote copied'); }
        break;
      }
      case 'invoice-from-quote': {
        const inv = AppState.createInvoiceFromQuote(id);
        if (inv) { App.navigate('invoices/' + inv.id); Components.showToast('Invoice created from quote'); }
        break;
      }
      case 'save-quote-draft': App._saveQuote('draft'); break;
      case 'save-quote-send': App._saveQuote('sent'); break;
      case 'save-quote': App._updateQuote(el.dataset.id); break;

      // Credit note actions
      case 'approve-credit-note': AppState.approveCreditNote(id); Components.showToast('Credit note approved'); break;
      case 'delete-credit-note': AppState.deleteCreditNote(id); App.navigate('credit-notes'); Components.showToast('Credit note deleted'); break;
      case 'show-allocate-cn': {
        const cn = AppState.getCreditNoteById(id);
        if (cn) { AppState.modalState = Views.renderAllocateModal(cn); App.render(); }
        break;
      }
      case 'confirm-allocate-cn': {
        const cnId = el.dataset.cnId;
        const invoiceId = App._getDropdownValue('alloc-invoice');
        const amount = parseFloat(App._getValue('alloc-amount'));
        if (!invoiceId || isNaN(amount) || amount <= 0) {
          Components.showToast('Select an invoice and enter a valid amount', 'error');
          break;
        }
        AppState.allocateCreditNote(cnId, invoiceId, amount);
        AppState.modalState = null;
        Components.showToast('Credit allocated');
        break;
      }
      case 'save-cn-draft': App._saveCreditNote('draft'); break;
      case 'save-cn-approve': App._saveCreditNote('awaiting_payment'); break;
      case 'save-credit-note': App._updateCreditNote(el.dataset.id); break;

      // Repeating invoice
      case 'save-repeating-new': App._saveRepeating(null); break;
      case 'save-repeating': App._saveRepeating(el.dataset.id); break;
      case 'delete-repeating':
        AppState.deleteRepeatingInvoice(id);
        Components.showToast('Repeating invoice deleted');
        break;

      // Settings
      case 'save-settings': App._saveSettings(); break;

      // Branding themes
      case 'save-theme-new': App._saveTheme(null); break;
      case 'save-theme': App._saveTheme(el.dataset.id); break;
      case 'set-default-theme': AppState.setDefaultTheme(id); Components.showToast('Default theme updated'); break;
      case 'delete-theme': AppState.deleteBrandingTheme(id); Components.showToast('Theme deleted'); break;

      // Reminders
      case 'toggle-reminder': AppState.toggleReminder(id); break;
      case 'delete-reminder': AppState.deleteReminder(id); Components.showToast('Reminder deleted'); break;
      case 'save-reminder-new': App._saveReminder(null); break;
      case 'save-reminder': App._saveReminder(el.dataset.id); break;

      // Modal
      case 'close-modal':
        AppState.modalState = null;
        App.render();
        break;

      // Toast
      case 'close-toast':
        el.closest('.toast').remove();
        break;

      // Line items
      case 'add-line': App._addLine(el.dataset.prefix); break;
      case 'remove-line': App._removeLine(el.dataset.prefix, parseInt(el.dataset.lineIdx)); break;

      // Search
      case 'do-search': App._doSearch(); break;
      case 'clear-search':
        AppState.searchResults = null;
        AppState.searchQuery = '';
        App._setValue('searchInput', '');
        App.render();
        break;

      // Select all
      case 'select-all': {
        const checkAll = el.querySelector('[data-div-check]') || el;
        // Toggle all visible
        const rows = document.querySelectorAll('.row-checkbox');
        rows.forEach(r => {
          if (App._isChecked(checkAll)) {
            AppState.selectedIds.add(r.dataset.checkId);
          } else {
            AppState.selectedIds.delete(r.dataset.checkId);
          }
        });
        App.render();
        break;
      }
    }
  },

  // ---- Change handler ----
  handleChange(e) {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.id && target.id.startsWith('toggle-rem-')) {
      const remId = target.dataset.id;
      if (remId) AppState.toggleReminder(remId);
    }
    // Settings toggles
    if (target.id === 'set-show-tax' || target.id === 'set-show-disc' || target.id === 'set-show-code') {
      // Will be saved on "Save Settings" click
    }
    if (target.matches('[data-div-check]')) {
      const switchWrap = target.closest('.toggle-switch');
      if (switchWrap) {
      }
    }
  },

  // ---- Input handler ----
  handleInput(e) {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.classList.contains('div-input')) {
      target.dataset.value = App._getElementValue(target);
    }

    // Searchable dropdown filtering
    if (target.dataset.searchableDropdown) {
      const ddId = target.dataset.searchableDropdown;
      const dd = document.getElementById(ddId);
      const menu = document.getElementById(ddId + '-menu');
      if (menu) {
        const q = App._getElementValue(target).toLowerCase();
        menu.style.display = 'block';
        App._openDropdownId = ddId;
        App._positionDropdownMenu(ddId);
        if (dd) {
          const trigger = dd.querySelector('.dropdown-trigger');
        }
        const items = menu.querySelectorAll('.dropdown-item');
        items.forEach(item => {
          item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
      }
    }

    // Recalculate line item totals on any numeric input
    if (target.id && (target.id.includes('-qty-') || target.id.includes('-price-') || target.id.includes('-disc-'))) {
      App._updateFormTotals();
    }
  },

  // ---- Keydown handler ----
  handleKeydown(e) {
    const target = e.target;
    if (e.key === 'Enter' && e.target.id === 'searchInput') {
      e.preventDefault();
      App._doSearch();
    }

    if (target instanceof HTMLElement && target.classList.contains('div-input') && !target.classList.contains('div-textarea') && e.key === 'Enter') {
      e.preventDefault();
      target.blur();
    }

    if (target instanceof HTMLElement) {
      const roleTarget = target.closest('[data-op], [data-action]');
      if (roleTarget instanceof HTMLElement) {
        const nativeInteractive = roleTarget.matches('[contenteditable="true"]');
        if (!nativeInteractive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          roleTarget.click();
          return;
        }
      }
    }

    if (e.key === 'Escape') {
      if (AppState.modalState) {
        AppState.modalState = null;
        App.render();
      }
      App._closeAllDropdowns();
    }
  },

  // ---- Dropdown helpers ----
  _toggleDropdown(ddId) {
    const dd = document.getElementById(ddId);
    const trigger = dd ? dd.querySelector('.dropdown-trigger') : null;
    const input = dd ? dd.querySelector('.dropdown-search-input') : null;
    const menu = document.getElementById(ddId + '-menu');
    if (!menu) return;
    if (App._openDropdownId === ddId) {
      menu.style.display = 'none';
      App._openDropdownId = null;
    } else {
      App._closeAllDropdowns();
      menu.style.display = 'block';
      App._positionDropdownMenu(ddId);
      App._openDropdownId = ddId;
    }
  },

  _closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu').forEach(m => {
      m.style.display = 'none';
      m.style.position = '';
      m.style.left = '';
      m.style.top = '';
      m.style.width = '';
      m.style.maxHeight = '';
      m.style.marginTop = '';
    });
    App._openDropdownId = null;
  },

  _positionOpenDropdown() {
    if (App._openDropdownId) App._positionDropdownMenu(App._openDropdownId);
  },

  _positionDropdownMenu(ddId) {
    const dd = document.getElementById(ddId);
    const menu = document.getElementById(ddId + '-menu');
    if (!dd || !menu || menu.style.display === 'none') return;
    const anchor = dd.querySelector('.dropdown-trigger') || dd.querySelector('.dropdown-search-input') || dd;
    const rect = anchor.getBoundingClientRect();
    const minHeight = 120;
    const preferredHeight = dd.classList.contains('compact-dropdown') ? 200 : 260;
    const below = window.innerHeight - rect.bottom - 8;
    const above = rect.top - 8;
    const useAbove = below < minHeight && above > below;
    const maxHeight = Math.max(minHeight, Math.min(preferredHeight, useAbove ? above : below));
    menu.style.position = 'fixed';
    menu.style.left = Math.max(8, rect.left) + 'px';
    menu.style.width = Math.max(rect.width, 180) + 'px';
    menu.style.top = (useAbove ? Math.max(8, rect.top - maxHeight - 2) : Math.min(window.innerHeight - 8, rect.bottom + 2)) + 'px';
    menu.style.maxHeight = maxHeight + 'px';
    menu.style.marginTop = '0';
  },

  _viewFromRoute(route) {
    return (route || '').split('/')[0];
  },

  _setTabForRoute(route, tab) {
    App._setCurrentTabForView(App._viewFromRoute(route), tab);
  },

  _setCurrentTabForView(view, tab) {
    const options = App._tabOptionsByView[view];
    if (!options) return;
    const next = options.includes(tab) ? tab : 'all';
    App._tabsByView[view] = next;
    AppState.currentTab = next;
  },

  _syncCurrentTabForView(view) {
    const options = App._tabOptionsByView[view];
    if (!options) return;
    const saved = App._tabsByView[view] || 'all';
    AppState.currentTab = options.includes(saved) ? saved : 'all';
  },

  _handleDropdownSelect(ddId, value) {
    // Update trigger text
    const dd = document.getElementById(ddId);
    if (dd) {
      const trigger = dd.querySelector('.dropdown-trigger .dropdown-text');
      const input = dd.querySelector('.dropdown-search-input');
      const item = dd.querySelector('.dropdown-item[data-value="' + value + '"]');
      const label = item ? item.textContent : value;
      dd.dataset.value = value;
      if (trigger) trigger.textContent = label;
      if (input) App._setElementValue(input, label);
      // Mark active
      dd.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
      if (item) {
        item.classList.add('active');
      }
    }
    App._closeAllDropdowns();

    // Handle item selection for line items (auto-fill description/price)
    if (ddId.match(/^(inv|quo|cn|rep)-item-\d+$/)) {
      const parts = ddId.split('-');
      const prefix = parts[0];
      const idx = parts[2];
      const selectedItem = AppState.getItemById(value);
      if (selectedItem) {
        const descEl = document.getElementById(prefix + '-desc-' + idx);
        const priceEl = document.getElementById(prefix + '-price-' + idx);
        const accDd = document.getElementById(prefix + '-acc-' + idx);
        const taxDd = document.getElementById(prefix + '-tax-' + idx);
        if (descEl && !App._getElementValue(descEl)) App._setElementValue(descEl, selectedItem.description);
        if (priceEl && parseFloat(App._getElementValue(priceEl)) === 0) App._setElementValue(priceEl, selectedItem.unitPrice);
        if (accDd) App._setDropdownValue(prefix + '-acc-' + idx, selectedItem.accountId);
        if (taxDd) App._setDropdownValue(prefix + '-tax-' + idx, selectedItem.taxRateId);
        App._updateFormTotals();
      }
    }
  },

  _getDropdownValue(ddId) {
    const dd = document.getElementById(ddId);
    if (!dd) return '';
    const active = dd.querySelector('.dropdown-item.active');
    return active ? active.dataset.value : (dd.dataset.value || '');
  },

  _setDropdownValue(ddId, value) {
    const dd = document.getElementById(ddId);
    if (!dd) return;
    dd.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
    const item = dd.querySelector('.dropdown-item[data-value="' + value + '"]');
    if (item) {
      item.classList.add('active');
      dd.dataset.value = value;
      const trigger = dd.querySelector('.dropdown-trigger .dropdown-text');
      if (trigger) trigger.textContent = item.textContent;
      const input = dd.querySelector('.dropdown-search-input');
      if (input) App._setElementValue(input, item.textContent);
    }
  },

  _getElementValue(el) {
    if (!el) return '';
    if (el.dataset && (el.dataset.value !== undefined || el.classList.contains('div-input'))) {
      return (el.textContent || '').trim();
    }
    return el.value || '';
  },

  _setElementValue(el, value) {
    if (!el) return;
    const next = value == null ? '' : String(value);
    if (el.dataset && (el.dataset.value !== undefined || el.classList.contains('div-input'))) {
      el.dataset.value = next;
      el.textContent = next;
    } else {
      el.value = next;
    }
  },

  _getValue(id) {
    return App._getElementValue(document.getElementById(id));
  },

  _setValue(id, value) {
    App._setElementValue(document.getElementById(id), value);
  },

  _isChecked(el) {
    return !!(el && (el.matches('input[type=checkbox]') ? el.checked : el.dataset && el.dataset.checked === 'true'));
  },

  _setChecked(el, checked) {
    if (!el) return;
    if (el.matches('input[type=checkbox]')) { el.checked = checked; return; }
    if (!el.dataset) return;
    el.dataset.checked = checked ? 'true' : 'false';
    el.classList.toggle('checked', checked);
  },

  // ---- Line item management ----
  _addLine(prefix) {
    const container = document.getElementById(prefix + '-line-items');
    if (!container) return;
    // Re-render the form to add a new line
    const currentLines = App._collectLineItems(prefix);
    currentLines.push({ id: AppState.generateLineItemId(), itemId: '', description: '', quantity: 1, unitPrice: 0, discountPercent: 0, accountId: 'acc_200', taxRateId: 'tax_gst', trackingRegion: '', trackingDept: '' });
    App._reRenderLineItems(prefix, currentLines);
  },

  _removeLine(prefix, idx) {
    const currentLines = App._collectLineItems(prefix);
    if (currentLines.length <= 1) return;
    currentLines.splice(idx, 1);
    App._reRenderLineItems(prefix, currentLines);
  },

  _reRenderLineItems(prefix, lineItems) {
    const container = document.getElementById(prefix + '-line-items');
    if (!container) return;
    // Save and restore by re-rendering just the line items section
    const isRepeating = prefix === 'rep';
    if (isRepeating) {
      container.innerHTML = App._buildRepLineItemsHtml(lineItems, prefix);
    } else {
      container.innerHTML = App._buildLineItemsHtml(lineItems, prefix);
    }
    App._updateFormTotals();
  },

  _buildLineItemsHtml(lineItems, prefix) {
    if ((App._divLevel >= 25 && prefix === 'cn') || (App._divLevel >= 75 && prefix === 'inv')) {
    const itemOpts = [{ value: '', label: '-- Select Item --' }].concat(AppState.items.filter(i => i.isSold).map(i => ({ value: i.id, label: i.code + ' - ' + i.description })));
    const accountOpts = AppState.getRevenueAccounts().map(a => ({ value: a.id, label: a.code + ' - ' + a.name }));
    const taxOpts = AppState.getOutputTaxRates().map(t => ({ value: t.id, label: t.name + ' (' + t.rate + '%)' }));
    const regionOpts = [{ value: '', label: 'None' }].concat(AppState.trackingCategories.find(tc => tc.id === 'track_region') ? AppState.trackingCategories.find(tc => tc.id === 'track_region').options.map(o => ({ value: o.id, label: o.name })) : []);
    const deptOpts = [{ value: '', label: 'None' }].concat(AppState.trackingCategories.find(tc => tc.id === 'track_dept') ? AppState.trackingCategories.find(tc => tc.id === 'track_dept').options.map(o => ({ value: o.id, label: o.name })) : []);

    let html = '<div class="div-table data-table editable-table"><div class="table-head"><div class="table-row">';
    html += '<div class="table-cell table-header-cell">Item</div><div class="table-cell table-header-cell">Description</div><div class="table-cell table-header-cell col-narrow">Qty</div><div class="table-cell table-header-cell col-narrow">Price</div><div class="table-cell table-header-cell col-narrow">Disc %</div><div class="table-cell table-header-cell">Account</div><div class="table-cell table-header-cell">Tax</div><div class="table-cell table-header-cell">Region</div><div class="table-cell table-header-cell">Department</div><div class="table-cell table-header-cell col-narrow text-right">Amount</div><div class="table-cell table-header-cell"></div></div></div><div class="table-body">';
    lineItems.forEach((li, idx) => {
      const amt = li.quantity * li.unitPrice * (1 - (li.discountPercent || 0) / 100);
      html += '<div class="line-item-row" data-line-idx="' + idx + '">';
      html += '<div class="table-cell">' + Components.dropdown(prefix + '-item-' + idx, itemOpts, li.itemId || '', 'Item', 'compact-dropdown') + '</div>';
      html += '<div class="table-cell">' + Components.textInput(prefix + '-desc-' + idx, li.description, 'Description') + '</div>';
      html += '<div class="table-cell">' + Components.textInput(prefix + '-qty-' + idx, li.quantity, '', 'number') + '</div>';
      html += '<div class="table-cell">' + Components.textInput(prefix + '-price-' + idx, li.unitPrice, '', 'number') + '</div>';
      html += '<div class="table-cell">' + Components.textInput(prefix + '-disc-' + idx, li.discountPercent || 0, '', 'number') + '</div>';
      html += '<div class="table-cell">' + Components.dropdown(prefix + '-acc-' + idx, accountOpts, li.accountId, 'Account', 'compact-dropdown') + '</div>';
      html += '<div class="table-cell">' + Components.dropdown(prefix + '-tax-' + idx, taxOpts, li.taxRateId, 'Tax', 'compact-dropdown') + '</div>';
      html += '<div class="table-cell">' + Components.dropdown(prefix + '-region-' + idx, regionOpts, li.trackingRegion || '', 'Region', 'compact-dropdown') + '</div>';
      html += '<div class="table-cell">' + Components.dropdown(prefix + '-dept-' + idx, deptOpts, li.trackingDept || '', 'Dept', 'compact-dropdown') + '</div>';
      html += '<div class="table-cell text-right line-amount">' + Components.formatCurrency(amt) + '</div>';
      html += '<div class="table-cell"><div class="btn-icon btn-remove-line" data-op="remove-line" data-prefix="' + prefix + '" data-line-idx="' + idx + '">&times;</div></div>';
      html += '</div>';
    });
    html += '</div></div>';
    html += '<div class="btn btn-secondary btn-sm" data-op="add-line" data-prefix="' + prefix + '">+ Add Line</div>';
    return html;
    }
    const itemOpts = [{ value: '', label: '-- Select Item --' }].concat(AppState.items.filter(i => i.isSold).map(i => ({ value: i.id, label: i.code + ' - ' + i.description })));
    const accountOpts = AppState.getRevenueAccounts().map(a => ({ value: a.id, label: a.code + ' - ' + a.name }));
    const taxOpts = AppState.getOutputTaxRates().map(t => ({ value: t.id, label: t.name + ' (' + t.rate + '%)' }));
    const regionOpts = [{ value: '', label: 'None' }].concat(AppState.trackingCategories.find(tc => tc.id === 'track_region') ? AppState.trackingCategories.find(tc => tc.id === 'track_region').options.map(o => ({ value: o.id, label: o.name })) : []);
    const deptOpts = [{ value: '', label: 'None' }].concat(AppState.trackingCategories.find(tc => tc.id === 'track_dept') ? AppState.trackingCategories.find(tc => tc.id === 'track_dept').options.map(o => ({ value: o.id, label: o.name })) : []);

    let html = '<table class="data-table editable-table"><thead><tr>';
    html += '<th>Item</th><th>Description</th><th class="col-narrow">Qty</th><th class="col-narrow">Price</th><th class="col-narrow">Disc %</th><th>Account</th><th>Tax</th><th>Region</th><th>Department</th><th class="col-narrow text-right">Amount</th><th></th></tr></thead><tbody>';
    lineItems.forEach((li, idx) => {
      const amt = li.quantity * li.unitPrice * (1 - (li.discountPercent || 0) / 100);
      html += '<tr class="line-item-row" data-line-idx="' + idx + '">';
      html += '<td>' + Components.dropdown(prefix + '-item-' + idx, itemOpts, li.itemId || '', 'Item', 'compact-dropdown') + '</td>';
      html += '<td><input type="text" class="form-input compact" id="' + prefix + '-desc-' + idx + '" value="' + Components.escapeHtml(li.description) + '" placeholder="Description" /></td>';
      html += '<td><input type="number" class="form-input compact text-right" id="' + prefix + '-qty-' + idx + '" value="' + li.quantity + '" min="0" step="0.01" /></td>';
      html += '<td><input type="number" class="form-input compact text-right" id="' + prefix + '-price-' + idx + '" value="' + li.unitPrice + '" min="0" step="0.01" /></td>';
      html += '<td><input type="number" class="form-input compact text-right" id="' + prefix + '-disc-' + idx + '" value="' + (li.discountPercent || 0) + '" min="0" max="100" step="0.01" /></td>';
      html += '<td>' + Components.dropdown(prefix + '-acc-' + idx, accountOpts, li.accountId, 'Account', 'compact-dropdown') + '</td>';
      html += '<td>' + Components.dropdown(prefix + '-tax-' + idx, taxOpts, li.taxRateId, 'Tax', 'compact-dropdown') + '</td>';
      html += '<td>' + Components.dropdown(prefix + '-region-' + idx, regionOpts, li.trackingRegion || '', 'Region', 'compact-dropdown') + '</td>';
      html += '<td>' + Components.dropdown(prefix + '-dept-' + idx, deptOpts, li.trackingDept || '', 'Dept', 'compact-dropdown') + '</td>';
      html += '<td class="text-right line-amount">' + Components.formatCurrency(amt) + '</td>';
      html += '<td><button class="btn-icon btn-remove-line" data-action="remove-line" data-prefix="' + prefix + '" data-line-idx="' + idx + '">&times;</button></td>';
      html += '</tr>';
    });
    html += '</tbody></table>';
    html += '<button class="btn btn-secondary btn-sm" data-action="add-line" data-prefix="' + prefix + '">+ Add Line</button>';
    return html;
  },

  _buildRepLineItemsHtml(lineItems, prefix) {
    if (App._divLevel >= 50) {
    const itemOpts = [{ value: '', label: '-- Select --' }].concat(AppState.items.filter(i => i.isSold).map(i => ({ value: i.id, label: i.code + ' - ' + i.description })));
    const accountOpts = AppState.getRevenueAccounts().map(a => ({ value: a.id, label: a.code + ' - ' + a.name }));
    const taxOpts = AppState.getOutputTaxRates().map(t => ({ value: t.id, label: t.name + ' (' + t.rate + '%)' }));

    let html = '<div class="div-table data-table editable-table"><div class="table-head"><div class="table-row">';
    html += '<div class="table-cell table-header-cell">Item</div><div class="table-cell table-header-cell">Description</div><div class="table-cell table-header-cell col-narrow">Qty</div><div class="table-cell table-header-cell col-narrow">Price</div><div class="table-cell table-header-cell">Account</div><div class="table-cell table-header-cell">Tax</div><div class="table-cell table-header-cell"></div></div></div><div class="table-body">';
    lineItems.forEach((li, idx) => {
      html += '<div class="line-item-row" data-line-idx="' + idx + '">';
      html += '<div class="table-cell">' + Components.dropdown(prefix + '-item-' + idx, itemOpts, li.itemId || '', 'Item', 'compact-dropdown') + '</div>';
      html += '<div class="table-cell">' + Components.textInput(prefix + '-desc-' + idx, li.description) + '</div>';
      html += '<div class="table-cell">' + Components.textInput(prefix + '-qty-' + idx, li.quantity, '', 'number') + '</div>';
      html += '<div class="table-cell">' + Components.textInput(prefix + '-price-' + idx, li.unitPrice, '', 'number') + '</div>';
      html += '<div class="table-cell">' + Components.dropdown(prefix + '-acc-' + idx, accountOpts, li.accountId, 'Account', 'compact-dropdown') + '</div>';
      html += '<div class="table-cell">' + Components.dropdown(prefix + '-tax-' + idx, taxOpts, li.taxRateId, 'Tax', 'compact-dropdown') + '</div>';
      html += '<div class="table-cell"><div class="btn-icon btn-remove-line" data-op="remove-line" data-prefix="' + prefix + '" data-line-idx="' + idx + '">&times;</div></div>';
      html += '</div>';
    });
    html += '</div></div>';
    html += '<div class="btn btn-secondary btn-sm" data-op="add-line" data-prefix="' + prefix + '">+ Add Line</div>';
    return html;
    }
    const itemOpts = [{ value: '', label: '-- Select --' }].concat(AppState.items.filter(i => i.isSold).map(i => ({ value: i.id, label: i.code + ' - ' + i.description })));
    const accountOpts = AppState.getRevenueAccounts().map(a => ({ value: a.id, label: a.code + ' - ' + a.name }));
    const taxOpts = AppState.getOutputTaxRates().map(t => ({ value: t.id, label: t.name + ' (' + t.rate + '%)' }));

    let html = '<table class="data-table editable-table"><thead><tr>';
    html += '<th>Item</th><th>Description</th><th class="col-narrow">Qty</th><th class="col-narrow">Price</th><th>Account</th><th>Tax</th><th></th></tr></thead><tbody>';
    lineItems.forEach((li, idx) => {
      html += '<tr class="line-item-row" data-line-idx="' + idx + '">';
      html += '<td>' + Components.dropdown(prefix + '-item-' + idx, itemOpts, li.itemId || '', 'Item', 'compact-dropdown') + '</td>';
      html += '<td><input type="text" class="form-input compact" id="' + prefix + '-desc-' + idx + '" value="' + Components.escapeHtml(li.description) + '" /></td>';
      html += '<td><input type="number" class="form-input compact text-right" id="' + prefix + '-qty-' + idx + '" value="' + li.quantity + '" min="0" step="0.01" /></td>';
      html += '<td><input type="number" class="form-input compact text-right" id="' + prefix + '-price-' + idx + '" value="' + li.unitPrice + '" min="0" step="0.01" /></td>';
      html += '<td>' + Components.dropdown(prefix + '-acc-' + idx, accountOpts, li.accountId, 'Account', 'compact-dropdown') + '</td>';
      html += '<td>' + Components.dropdown(prefix + '-tax-' + idx, taxOpts, li.taxRateId, 'Tax', 'compact-dropdown') + '</td>';
      html += '<td><button class="btn-icon btn-remove-line" data-action="remove-line" data-prefix="' + prefix + '" data-line-idx="' + idx + '">&times;</button></td>';
      html += '</tr>';
    });
    html += '</tbody></table>';
    html += '<button class="btn btn-secondary btn-sm" data-action="add-line" data-prefix="' + prefix + '">+ Add Line</button>';
    return html;
  },

  _collectLineItems(prefix) {
    const rows = document.querySelectorAll('#' + prefix + '-line-items .line-item-row');
    const items = [];
    rows.forEach((row, idx) => {
      items.push({
        id: AppState.generateLineItemId(),
        itemId: App._getDropdownValue(prefix + '-item-' + idx),
        description: App._getValue(prefix + '-desc-' + idx),
        quantity: parseFloat(App._getValue(prefix + '-qty-' + idx)) || 0,
        unitPrice: parseFloat(App._getValue(prefix + '-price-' + idx)) || 0,
        discountPercent: parseFloat(App._getValue(prefix + '-disc-' + idx)) || 0,
        accountId: App._getDropdownValue(prefix + '-acc-' + idx) || 'acc_200',
        taxRateId: App._getDropdownValue(prefix + '-tax-' + idx) || 'tax_gst',
        trackingRegion: App._getDropdownValue(prefix + '-region-' + idx) || '',
        trackingDept: App._getDropdownValue(prefix + '-dept-' + idx) || ''
      });
    });
    return items;
  },

  _calcTotals(lineItems, taxMode) {
    let subtotal = 0;
    let taxTotal = 0;
    lineItems.forEach(li => {
      const lineAmt = li.quantity * li.unitPrice * (1 - (li.discountPercent || 0) / 100);
      const taxRate = AppState.getTaxRateById(li.taxRateId);
      const rate = taxRate ? taxRate.rate / 100 : 0;
      if (taxMode === 'inclusive') {
        const excl = lineAmt / (1 + rate);
        subtotal += excl;
        taxTotal += lineAmt - excl;
      } else if (taxMode === 'exclusive') {
        subtotal += lineAmt;
        taxTotal += lineAmt * rate;
      } else {
        subtotal += lineAmt;
      }
    });
    return { subtotal: Math.round(subtotal * 100) / 100, taxTotal: Math.round(taxTotal * 100) / 100, total: Math.round((subtotal + taxTotal) * 100) / 100 };
  },

  _updateFormTotals() {
    ['inv', 'quo', 'cn'].forEach(prefix => {
      const container = document.getElementById(prefix + '-totals');
      if (!container) return;
      const taxModeVal = App._getDropdownValue(prefix + '-tax-mode') || 'exclusive';
      const lineItems = App._collectLineItems(prefix);
      const totals = App._calcTotals(lineItems, taxModeVal);
      container.innerHTML = '<div class="total-row"><div>Subtotal</div><div>' + Components.formatCurrency(totals.subtotal) + '</div></div>' +
        '<div class="total-row"><div>Tax</div><div>' + Components.formatCurrency(totals.taxTotal) + '</div></div>' +
        '<div class="total-row total-main"><div>Total</div><div>' + Components.formatCurrency(totals.total) + '</div></div>';
    });
  },

  // ---- Save helpers ----
  _saveInvoice(status) {
    const contactId = App._getDropdownValue('inv-contact');
    if (!contactId) { Components.showToast('Please select a contact', 'error'); return; }
    const date = App._getValue('inv-date');
    const dueDate = App._getValue('inv-due-date');
    const reference = App._getValue('inv-reference');
    const currency = App._getDropdownValue('inv-currency') || 'AUD';
    const themeId = App._getDropdownValue('inv-theme') || 'theme_standard';
    const taxMode = App._getDropdownValue('inv-tax-mode') || 'exclusive';
    const title = App._getValue('inv-title');
    const summary = App._getValue('inv-summary');
    const lineItems = App._collectLineItems('inv');
    const totals = App._calcTotals(lineItems, taxMode);

    const inv = AppState.createInvoice({
      contactId, status, date, dueDate, reference, currency,
      brandingThemeId: themeId, taxMode, lineItems, title, summary,
      ...totals
    });
    if (status === 'awaiting_payment') {
      inv.sentAt = new Date().toISOString();
    }
    App.navigate('invoices/' + inv.id);
    Components.showToast('Invoice created');
  },

  _updateInvoice(id) {
    const contactId = App._getDropdownValue('inv-contact');
    if (!contactId) { Components.showToast('Please select a contact', 'error'); return; }
    const date = App._getValue('inv-date');
    const dueDate = App._getValue('inv-due-date');
    const reference = App._getValue('inv-reference');
    const currency = App._getDropdownValue('inv-currency') || 'AUD';
    const themeId = App._getDropdownValue('inv-theme') || 'theme_standard';
    const taxMode = App._getDropdownValue('inv-tax-mode') || 'exclusive';
    const title = App._getValue('inv-title');
    const summary = App._getValue('inv-summary');
    const lineItems = App._collectLineItems('inv');
    const totals = App._calcTotals(lineItems, taxMode);

    AppState.updateInvoice(id, {
      contactId, date, dueDate, reference, currency,
      brandingThemeId: themeId, taxMode, lineItems, title, summary,
      ...totals
    });
    App.navigate('invoices/' + id);
    Components.showToast('Invoice saved');
  },

  _saveQuote(status) {
    const contactId = App._getDropdownValue('quo-contact');
    if (!contactId) { Components.showToast('Please select a contact', 'error'); return; }
    const date = App._getValue('quo-date');
    const expiryDate = App._getValue('quo-expiry-date');
    const reference = App._getValue('quo-reference');
    const currency = App._getDropdownValue('quo-currency') || 'AUD';
    const themeId = App._getDropdownValue('quo-theme') || 'theme_standard';
    const taxMode = App._getDropdownValue('quo-tax-mode') || 'exclusive';
    const title = App._getValue('quo-title');
    const summary = App._getValue('quo-summary');
    const terms = App._getValue('quo-terms');
    const lineItems = App._collectLineItems('quo');
    const totals = App._calcTotals(lineItems, taxMode);

    const quo = AppState.createQuote({
      contactId, status, date, expiryDate, reference, currency,
      brandingThemeId: themeId, taxMode, lineItems, title, summary, terms, ...totals
    });
    if (status === 'sent') quo.sentAt = new Date().toISOString();
    AppState.notify();
    App.navigate('quotes/' + quo.id);
    Components.showToast('Quote created');
  },

  _updateQuote(id) {
    const contactId = App._getDropdownValue('quo-contact');
    if (!contactId) { Components.showToast('Please select a contact', 'error'); return; }
    const date = App._getValue('quo-date');
    const expiryDate = App._getValue('quo-expiry-date');
    const reference = App._getValue('quo-reference');
    const currency = App._getDropdownValue('quo-currency') || 'AUD';
    const themeId = App._getDropdownValue('quo-theme') || 'theme_standard';
    const taxMode = App._getDropdownValue('quo-tax-mode') || 'exclusive';
    const title = App._getValue('quo-title');
    const summary = App._getValue('quo-summary');
    const terms = App._getValue('quo-terms');
    const lineItems = App._collectLineItems('quo');
    const totals = App._calcTotals(lineItems, taxMode);

    AppState.updateQuote(id, {
      contactId, date, expiryDate, reference, currency,
      brandingThemeId: themeId, taxMode, lineItems, title, summary, terms, ...totals
    });
    App.navigate('quotes/' + id);
    Components.showToast('Quote saved');
  },

  _saveCreditNote(status) {
    const contactId = App._getDropdownValue('cn-contact');
    if (!contactId) { Components.showToast('Please select a contact', 'error'); return; }
    const date = App._getValue('cn-date');
    const reference = App._getValue('cn-reference');
    const taxMode = App._getDropdownValue('cn-tax-mode') || 'exclusive';
    const lineItems = App._collectLineItems('cn');
    const totals = App._calcTotals(lineItems, taxMode);

    const cn = AppState.createCreditNote({ contactId, status, date, reference, taxMode, lineItems, ...totals });
    App.navigate('credit-notes/' + cn.id);
    Components.showToast('Credit note created');
  },

  _updateCreditNote(id) {
    const contactId = App._getDropdownValue('cn-contact');
    if (!contactId) { Components.showToast('Please select a contact', 'error'); return; }
    const date = App._getValue('cn-date');
    const reference = App._getValue('cn-reference');
    const taxMode = App._getDropdownValue('cn-tax-mode') || 'exclusive';
    const lineItems = App._collectLineItems('cn');
    const totals = App._calcTotals(lineItems, taxMode);

    AppState.updateCreditNote(id, { contactId, date, reference, taxMode, lineItems, ...totals });
    App.navigate('credit-notes/' + id);
    Components.showToast('Credit note saved');
  },

  _saveRepeating(id) {
    const contactId = App._getDropdownValue('rep-contact');
    if (!contactId) { Components.showToast('Please select a contact', 'error'); return; }
    const data = {
      contactId,
      frequency: App._getDropdownValue('rep-frequency') || 'monthly',
      startDate: App._getValue('rep-start-date'),
      nextDate: App._getValue('rep-next-date'),
      endDate: App._getValue('rep-end-date'),
      saveAs: App._getDropdownValue('rep-save-as') || 'draft',
      brandingThemeId: App._getDropdownValue('rep-theme') || 'theme_standard',
      taxMode: App._getDropdownValue('rep-tax-mode') || 'exclusive',
      reference: App._getValue('rep-reference'),
      status: 'active',
      lineItems: App._collectLineItems('rep')
    };

    if (id) {
      AppState.updateRepeatingInvoice(id, data);
      Components.showToast('Repeating invoice updated');
    } else {
      AppState.createRepeatingInvoice(data);
      Components.showToast('Repeating invoice created');
    }
    App.navigate('repeating-invoices');
  },

  _saveSettings() {
    AppState.updateInvoiceSettings({
      invoicePrefix: App._getValue('set-inv-prefix'),
      invoiceNextNumber: parseInt(App._getValue('set-inv-next')) || 1,
      creditNotePrefix: App._getValue('set-cn-prefix'),
      creditNoteNextNumber: parseInt(App._getValue('set-cn-next')) || 1,
      quotePrefix: App._getValue('set-quo-prefix'),
      quoteNextNumber: parseInt(App._getValue('set-quo-next')) || 1,
      defaultDueDate: {
        type: App._getDropdownValue('set-due-type') || 'daysAfterInvoice',
        days: parseInt(App._getValue('set-due-days')) || 30
      },
      defaultTaxMode: App._getDropdownValue('set-tax-mode') || 'exclusive',
      showTaxColumn: App._isChecked(document.getElementById('set-show-tax')),
      showDiscountColumn: App._isChecked(document.getElementById('set-show-disc')),
      showItemCode: App._isChecked(document.getElementById('set-show-code'))
    });
    AppState._nextInvoiceNum = parseInt(App._getValue('set-inv-next')) || AppState._nextInvoiceNum;
    AppState._nextQuoteNum = parseInt(App._getValue('set-quo-next')) || AppState._nextQuoteNum;
    AppState._nextCreditNoteNum = parseInt(App._getValue('set-cn-next')) || AppState._nextCreditNoteNum;
    AppState.notify();
    Components.showToast('Settings saved');
  },

  _saveTheme(id) {
    const name = App._getValue('theme-name').trim();
    if (!name) { Components.showToast('Theme name is required', 'error'); return; }
    const data = {
      name,
      paymentTerms: App._getValue('theme-payment-terms'),
      termsAndConditions: App._getValue('theme-terms'),
      showTaxNumber: App._isChecked(document.getElementById('theme-show-tax')),
      showPaymentAdvice: App._isChecked(document.getElementById('theme-show-advice'))
    };
    if (id) {
      AppState.updateBrandingTheme(id, data);
      Components.showToast('Theme updated');
    } else {
      AppState.createBrandingTheme(data);
      Components.showToast('Theme created');
    }
    App.navigate('templates');
  },

  _saveReminder(id) {
    const data = {
      timing: App._getDropdownValue('rem-timing') || 'before',
      days: parseInt(App._getValue('rem-days')) || 7,
      subject: App._getValue('rem-subject'),
      body: App._getValue('rem-body'),
      includeInvoicePdf: App._isChecked(document.getElementById('rem-incl-pdf')),
      includeSummary: App._isChecked(document.getElementById('rem-incl-summary'))
    };
    if (id) {
      AppState.updateReminder(id, data);
      Components.showToast('Reminder updated');
    } else {
      AppState.addReminder(data);
      Components.showToast('Reminder added');
    }
    App.navigate('reminders');
  },

  _doSearch() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    const q = App._getElementValue(input).trim();
    if (!q) {
      AppState.searchResults = null;
    } else {
      AppState.searchQuery = q;
      AppState.searchResults = AppState.search(q);
    }
    App.render();
  },

  // ---- SSE ----
  _connectSSE() {
    const evtSource = new EventSource('/api/events');
    evtSource.onmessage = (e) => {
      if (e.data === 'reset') {
        AppState.resetToSeedData();
        App.navigate('dashboard');
      }
    };
  }
};

window.addEventListener('DOMContentLoaded', () => App.init());
