// ─── State ───────────────────────────────────────────────────────────────────

const DEFAULT_DATA = {
  version: 2,
  income: [
    { id: 'i1', name: 'Net Salary', amount: 3668, active: true },
    { id: 'i2', name: 'Other Income', amount: 1785, active: true },
    { id: 'i3', name: 'Child Benefit', amount: 105, active: true }
  ],
  bills: [
    // ── Due 1st ──────────────────────────────────────────────
    { id: 'b1',  name: 'Mortgage',                          amount: 2150.21, category: 'Housing',       dueDay: 1,  active: true },
    { id: 'b2',  name: 'Council Tax',                       amount: 355.00,  category: 'Housing',       dueDay: 1,  active: true },
    { id: 'b3',  name: 'TV Licence',                        amount: 14.95,   category: 'Subscriptions', dueDay: 1,  active: true },
    { id: 'b4',  name: 'Work Lottery (weekly × 52÷12)',     amount: 4.33,    category: 'Lottery',       dueDay: 1,  active: true },
    { id: 'b5',  name: 'Singing Lessons',                   amount: 0,       category: 'Healthcare',    dueDay: 1,  active: true },
    { id: 'b6',  name: 'Cleaner (fortnightly × 26÷12)',     amount: 97.50,   category: 'Other',         dueDay: 1,  active: true },
    // Shopping moved to Expenses — track actual weekly spend there
    { id: 'b8',  name: 'Netball - Poppy',                   amount: 8.00,    category: 'Healthcare',    dueDay: 1,  active: true },
    { id: 'b9',  name: 'Netball - Cherry',                  amount: 8.00,    category: 'Healthcare',    dueDay: 1,  active: true },
    { id: 'b10', name: 'Bear Food',                         amount: 12.50,   category: 'Pets',          dueDay: 1,  active: true },
    { id: 'b11', name: 'Bear Insurance (Animal Friends)',    amount: 19.60,   category: 'Pets',          dueDay: 1,  active: true },
    { id: 'b12', name: 'WisePay Meal Top-up',               amount: 45.00,   category: 'Food',          dueDay: 1,  active: true },
    // ── Due 3rd ──────────────────────────────────────────────
    { id: 'b13', name: 'Apple iCloud',                      amount: 2.99,    category: 'Subscriptions', dueDay: 3,  active: true },
    // ── Due 5th ──────────────────────────────────────────────
    { id: 'b14', name: 'Royal London Insurance - Cherry',   amount: 19.61,   category: 'Insurance',     dueDay: 5,  active: true },
    { id: 'b15', name: 'Royal London Insurance - Mike',     amount: 36.27,   category: 'Insurance',     dueDay: 5,  active: true },
    // ── Due 7th ──────────────────────────────────────────────
    { id: 'b16', name: 'Sky & Netflix',                     amount: 46.00,   category: 'Subscriptions', dueDay: 7,  active: true },
    // ── Due 8th ──────────────────────────────────────────────
    { id: 'b17', name: 'Digital Saver',                     amount: 150.00,  category: 'Savings',       dueDay: 8,  active: true },
    // ── Due 9th ──────────────────────────────────────────────
    { id: 'b18', name: 'Postcode Lottery',                  amount: 12.50,   category: 'Lottery',       dueDay: 9,  active: true },
    { id: 'b19', name: 'PSL Alloy Wheels',                  amount: 39.90,   category: 'Transport',     dueDay: 9,  active: true },
    // ── Due 10th ─────────────────────────────────────────────
    { id: 'b20', name: 'Octopus Energy',                    amount: 254.00,  category: 'Utilities',     dueDay: 10, active: true },
    // ── Due 14th ─────────────────────────────────────────────
    { id: 'b21', name: 'Broadband (Virgin Media)',           amount: 39.90,   category: 'Utilities',     dueDay: 14, active: true },
    // ── Due 15th ─────────────────────────────────────────────
    { id: 'b22', name: 'Southern Water',                    amount: 118.63,  category: 'Utilities',     dueDay: 15, active: true },
    { id: 'b23', name: 'Legal & General Life Insurance',     amount: 17.40,   category: 'Insurance',     dueDay: 15, active: true },
    // ── Due 16th ─────────────────────────────────────────────
    { id: 'b24', name: 'PSL Paint Protection',              amount: 39.90,   category: 'Transport',     dueDay: 16, active: true },
    // ── Due 23rd ─────────────────────────────────────────────
    { id: 'b25', name: 'O2 Mobile - Cherry',                amount: 41.30,   category: 'Utilities',     dueDay: 23, active: true },
    { id: 'b26', name: 'O2 Mobile - Poppy',                 amount: 12.74,   category: 'Utilities',     dueDay: 23, active: true },
    // ── Due 27th ─────────────────────────────────────────────
    { id: 'b27', name: 'Household Insurance (MBNA)',         amount: 332.68,  category: 'Insurance',     dueDay: 27, active: true },
    // ── Due 31st ─────────────────────────────────────────────
    { id: 'b28', name: 'Natwest Black',                     amount: 36.00,   category: 'Other',         dueDay: 31, active: true },
  ],
  loans: [
    {
      id: 'l1',
      name: 'Motorhome Loan',
      originalAmount: 20000,
      currentBalance: 20000,
      monthlyPayment: 417,
      interestRate: 0,
      startDate: '2026-06',
      active: true
    },
    {
      id: 'l2',
      name: 'Savings Repayment',
      originalAmount: 13000,
      currentBalance: 13000,
      monthlyPayment: 271,
      interestRate: 0,
      startDate: '2026-06',
      active: true
    }
  ],
  savingsGoals: [],
  monthly: {}
};

let state = {
  data: JSON.parse(JSON.stringify(DEFAULT_DATA)),
  sha: null,
  currentMonth: monthKey(new Date()),
  activeTab: 'dashboard',
  syncing: false,
  syncError: null,
  dirty: false
};

let syncTimer = null;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }
function monthKey(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`; }
function fmt(n) { return '£' + Number(n || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmtShort(n) { return '£' + Number(n || 0).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 }); }

function monthLabel(key) {
  const [y, m] = key.split('-');
  return new Date(y, m - 1, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

function getMonthly(key) {
  if (!state.data.monthly[key]) {
    state.data.monthly[key] = { paidBills: [], expenses: [], paidLoans: [] };
  }
  return state.data.monthly[key];
}

function totalIncome() {
  return state.data.income.filter(i => i.active).reduce((s, i) => s + Number(i.amount), 0);
}
function totalBills() {
  return state.data.bills.filter(b => b.active).reduce((s, b) => s + Number(b.amount), 0);
}
function totalLoanPayments() {
  return state.data.loans.filter(l => l.active).reduce((s, l) => s + Number(l.monthlyPayment), 0);
}
function totalExpenses(key) {
  return getMonthly(key).expenses.reduce((s, e) => s + Number(e.amount), 0);
}
function surplus(key) {
  return totalIncome() - totalBills() - totalLoanPayments() - totalExpenses(key);
}

// ─── Loan Calculations ────────────────────────────────────────────────────────
//
// currentBalance is the single source of truth.
// It reduces when you tick a monthly payment OR record an overpayment.
// Unticking a month adds the payment back.
// Overpayments are stored with date for your records and cannot be undone.
// % paid, remaining balance, and months left all derive from currentBalance.

function loanCurrentBalance(loan) {
  return Math.max(0, Number(loan.currentBalance || 0));
}

function loanTotalOverpayments(loan) {
  return (loan.overpayments || []).reduce((s, p) => s + Number(p.amount), 0);
}

function loanMonthsRemaining(loan) {
  const bal = loanCurrentBalance(loan);
  const pmt = Number(loan.monthlyPayment);
  if (!pmt || bal <= 0) return 0;
  return Math.ceil(bal / pmt);
}

function loanPayoffDate(loan) {
  const months = loanMonthsRemaining(loan);
  if (!months || months <= 0) return 'Paid off ✓';
  // Use whichever is later: today or start date
  let base = new Date();
  if (loan.startDate) {
    const [y, m] = loan.startDate.split('-').map(Number);
    const start = new Date(y, m - 1, 1);
    if (start > base) base = start;
  }
  base.setMonth(base.getMonth() + months);
  return base.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

// ─── Persistence ─────────────────────────────────────────────────────────────

function saveLocal() {
  localStorage.setItem('budget_data', JSON.stringify(state.data));
  localStorage.setItem('budget_sha', state.sha || '');
}

function loadLocal() {
  const d = localStorage.getItem('budget_data');
  const sha = localStorage.getItem('budget_sha');
  if (d) { state.data = JSON.parse(d); state.sha = sha || null; return true; }
  return false;
}

function scheduleSyncToGitHub() {
  state.dirty = true;
  clearTimeout(syncTimer);
  updateSyncStatus();
  syncTimer = setTimeout(syncToGitHub, 4000);
}

async function syncToGitHub() {
  if (!GitHub.isConfigured()) return;
  state.syncing = true;
  state.syncError = null;
  updateSyncStatus();
  try {
    state.sha = await GitHub.saveData(state.data, state.sha);
    state.dirty = false;
    saveLocal();
  } catch (e) {
    state.syncError = e.message;
  }
  state.syncing = false;
  updateSyncStatus();
}

function updateSyncStatus() {
  const el = document.getElementById('sync-status');
  if (!el) return;
  if (state.syncing) { el.textContent = '⟳ Syncing…'; el.className = 'sync syncing'; }
  else if (state.syncError) { el.textContent = '⚠ Sync error'; el.title = state.syncError; el.className = 'sync error'; }
  else if (state.dirty) { el.textContent = '● Unsaved'; el.className = 'sync dirty'; }
  else { el.textContent = '✓ Saved'; el.className = 'sync saved'; }
}

function mutate(fn) {
  fn();
  saveLocal();
  scheduleSyncToGitHub();
  render();
}

// ─── Navigation ──────────────────────────────────────────────────────────────

function navigate(tab) {
  state.activeTab = tab;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('#bottom-nav button').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  const page = document.getElementById('page-' + tab);
  if (page) page.classList.add('active');
  render();
}

// ─── Render ──────────────────────────────────────────────────────────────────

function render() {
  const tab = state.activeTab;
  if (tab === 'dashboard') renderDashboard();
  if (tab === 'income') renderIncome();
  if (tab === 'bills') renderBills();
  if (tab === 'expenses') renderExpenses();
  if (tab === 'loans') renderLoans();
  if (tab === 'savings') renderSavings();
  updateSyncStatus();
}

// ── Dashboard ────────────────────────────────────────────────────────────────

function renderDashboard() {
  const mk = state.currentMonth;
  const mo = getMonthly(mk);
  const income = totalIncome();
  const bills = totalBills();
  const loans = totalLoanPayments();
  const expenses = totalExpenses(mk);
  const committed = bills + loans;
  const remaining = income - committed;
  const net = income - committed - expenses;
  const paidCount = mo.paidBills.length;
  const billCount = state.data.bills.filter(b => b.active).length;
  const paidLoansCount = mo.paidLoans.length;
  const loanCount = state.data.loans.filter(l => l.active).length;

  const surplusClass = net >= 0 ? 'positive' : 'negative';
  const surplusIcon = net >= 0 ? '▲' : '▼';

  const savingsRows = state.data.savingsGoals.map(g => {
    const saved = Number(g.saved || 0);
    const target = Number(g.target);
    const pct = Math.min(100, Math.round((saved / target) * 100));
    const monthly = Number(g.monthly || 0);
    const needed = target - saved;
    const months = monthly > 0 ? Math.ceil(needed / monthly) : null;
    const byDate = months != null ? (() => { const d = new Date(); d.setMonth(d.getMonth() + months); return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }); })() : '—';
    return `
      <div class="savings-row">
        <div class="savings-name">${esc(g.name)}</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        <div class="savings-meta">${fmtShort(saved)} of ${fmtShort(target)} · On track: ${byDate}</div>
      </div>`;
  }).join('');

  document.getElementById('page-dashboard').innerHTML = `
    <div class="page-header">
      <h2>${monthLabel(mk)}</h2>
      <div class="month-nav">
        <button onclick="changeMonth(-1)">‹</button>
        <button onclick="changeMonth(1)" ${mk >= monthKey(new Date()) ? 'disabled' : ''}>›</button>
      </div>
    </div>

    <div class="card card-highlight ${surplusClass}">
      <div class="card-label">Monthly Surplus</div>
      <div class="card-big">${surplusIcon} ${fmt(Math.abs(net))}</div>
      <div class="card-sub">${net >= 0 ? 'Ahead of plan' : 'Over budget'}</div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-label">Total Income</div>
        <div class="card-value positive">${fmt(income)}</div>
      </div>
      <div class="card">
        <div class="card-label">Committed</div>
        <div class="card-value">${fmt(committed)}</div>
        <div class="card-tiny">Bills + Loans</div>
      </div>
      <div class="card">
        <div class="card-label">Remaining (pre-spend)</div>
        <div class="card-value ${remaining >= 0 ? 'positive' : 'negative'}">${fmt(remaining)}</div>
      </div>
      <div class="card">
        <div class="card-label">One-off Spend</div>
        <div class="card-value">${fmt(expenses)}</div>
      </div>
    </div>

    <div class="card">
      <div class="section-title">Bill & Loan Progress</div>
      <div class="progress-row">
        <span>Bills paid: ${paidCount}/${billCount}</span>
        <div class="progress-bar"><div class="progress-fill" style="width:${billCount ? Math.round(paidCount/billCount*100) : 0}%"></div></div>
      </div>
      <div class="progress-row">
        <span>Loans paid: ${paidLoansCount}/${loanCount}</span>
        <div class="progress-bar"><div class="progress-fill" style="width:${loanCount ? Math.round(paidLoansCount/loanCount*100) : 0}%"></div></div>
      </div>
    </div>

    <div class="card">
      <div class="section-title">Monthly Breakdown</div>
      <div class="breakdown-row"><span>Income</span><span class="positive">${fmt(income)}</span></div>
      <div class="breakdown-row"><span>Bills</span><span>− ${fmt(bills)}</span></div>
      <div class="breakdown-row"><span>Loan Repayments</span><span>− ${fmt(loans)}</span></div>
      <div class="breakdown-row"><span>One-off Expenses</span><span>− ${fmt(expenses)}</span></div>
      <div class="breakdown-row total"><span>Net Surplus</span><span class="${surplusClass}">${fmt(net)}</span></div>
    </div>

    ${state.data.savingsGoals.length ? `<div class="card"><div class="section-title">Savings Goals</div>${savingsRows}</div>` : ''}
  `;
}

function changeMonth(dir) {
  const [y, m] = state.currentMonth.split('-').map(Number);
  const d = new Date(y, m - 1 + dir, 1);
  state.currentMonth = monthKey(d);
  render();
}

// ── Income ───────────────────────────────────────────────────────────────────

function renderIncome() {
  const rows = state.data.income.map(i => `
    <div class="list-item ${i.active ? '' : 'inactive'}">
      <div class="item-main">
        <div class="item-name">${esc(i.name)}</div>
        <div class="item-amount">${fmt(i.amount)}<span class="item-freq"> /mo</span></div>
      </div>
      <div class="item-actions">
        <button class="btn-icon" onclick="toggleIncome('${i.id}')">${i.active ? '✓' : '○'}</button>
        <button class="btn-icon" onclick="editIncome('${i.id}')">✎</button>
        <button class="btn-icon danger" onclick="deleteIncome('${i.id}')">✕</button>
      </div>
    </div>`).join('');

  document.getElementById('page-income').innerHTML = `
    <div class="page-header">
      <h2>Income</h2>
      <button class="btn-add" onclick="addIncome()">+ Add</button>
    </div>
    <div class="card card-total">
      <div class="card-label">Total Monthly Income</div>
      <div class="card-big positive">${fmt(totalIncome())}</div>
    </div>
    <div class="list">${rows || '<div class="empty">No income sources yet</div>'}</div>
    <p class="hint">Tap ✓/○ to include/exclude from calculations. Tap ✎ to edit amounts.</p>
  `;
}

function addIncome() {
  showModal('Add Income Source', `
    <label>Name</label><input id="m-name" placeholder="e.g. Freelance Income">
    <label>Monthly Amount (£)</label><input id="m-amount" type="number" min="0" step="0.01" placeholder="0.00">
  `, () => {
    const name = val('m-name'), amount = parseFloat(val('m-amount'));
    if (!name || isNaN(amount)) return alert('Please fill all fields');
    mutate(() => state.data.income.push({ id: uid(), name, amount, active: true }));
    closeModal();
  });
}

function editIncome(id) {
  const item = state.data.income.find(i => i.id === id);
  showModal('Edit Income Source', `
    <label>Name</label><input id="m-name" value="${esc(item.name)}">
    <label>Monthly Amount (£)</label><input id="m-amount" type="number" min="0" step="0.01" value="${item.amount}">
  `, () => {
    const name = val('m-name'), amount = parseFloat(val('m-amount'));
    if (!name || isNaN(amount)) return alert('Please fill all fields');
    mutate(() => { item.name = name; item.amount = amount; });
    closeModal();
  });
}

function toggleIncome(id) {
  mutate(() => { const i = state.data.income.find(x => x.id === id); if (i) i.active = !i.active; });
}

function deleteIncome(id) {
  if (!confirm('Delete this income source?')) return;
  mutate(() => { state.data.income = state.data.income.filter(i => i.id !== id); });
}

// ── Bills ────────────────────────────────────────────────────────────────────

const BILL_CATS = ['Housing', 'Utilities', 'Insurance', 'Transport', 'Subscriptions', 'Food', 'Healthcare', 'Savings', 'Pets', 'Lottery', 'Other'];

function renderBills() {
  const mk = state.currentMonth;
  const mo = getMonthly(mk);
  const bills = state.data.bills;
  const totalPaid = bills.filter(b => b.active && mo.paidBills.includes(b.id)).reduce((s, b) => s + Number(b.amount), 0);

  const rows = [...bills].sort((a, b) => (a.dueDay || 1) - (b.dueDay || 1)).map(b => {
    const paid = mo.paidBills.includes(b.id);
    return `
      <div class="list-item ${paid ? 'paid' : ''} ${b.active ? '' : 'inactive'}">
        <button class="tick-btn ${paid ? 'ticked' : ''}" onclick="toggleBillPaid('${b.id}', '${mk}')">
          ${paid ? '✓' : '○'}
        </button>
        <div class="item-main">
          <div class="item-name">${esc(b.name)}<span class="item-cat"> · ${b.category}</span></div>
          <div class="item-amount">${fmt(b.amount)}<span class="item-freq"> due ${b.dueDay ? ordinal(b.dueDay) : 'monthly'}</span></div>
        </div>
        <div class="item-actions">
          <button class="btn-icon" onclick="editBill('${b.id}')">✎</button>
          <button class="btn-icon danger" onclick="deleteBill('${b.id}')">✕</button>
        </div>
      </div>`;
  }).join('');

  document.getElementById('page-bills').innerHTML = `
    <div class="page-header">
      <h2>Bills <span class="month-badge">${monthLabel(mk)}</span></h2>
      <button class="btn-add" onclick="addBill()">+ Add</button>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-label">Total Bills</div>
        <div class="card-value">${fmt(totalBills())}</div>
      </div>
      <div class="card">
        <div class="card-label">Paid This Month</div>
        <div class="card-value positive">${fmt(totalPaid)}</div>
      </div>
    </div>
    <div class="list">${rows || '<div class="empty">No recurring bills yet. Add your first bill.</div>'}</div>
    <p class="hint">Tap ○ to mark a bill as paid. Bills reset automatically each month.</p>
  `;
}

function toggleBillPaid(billId, mk) {
  mutate(() => {
    const mo = getMonthly(mk);
    const idx = mo.paidBills.indexOf(billId);
    if (idx >= 0) mo.paidBills.splice(idx, 1);
    else mo.paidBills.push(billId);
  });
}

function addBill() {
  const catOpts = BILL_CATS.map(c => `<option>${c}</option>`).join('');
  showModal('Add Recurring Bill', `
    <label>Name</label><input id="m-name" placeholder="e.g. Netflix">
    <label>Monthly Amount (£)</label><input id="m-amount" type="number" min="0" step="0.01" placeholder="0.00">
    <label>Category</label><select id="m-cat">${catOpts}</select>
    <label>Due Day of Month</label><input id="m-due" type="number" min="1" max="31" placeholder="1">
  `, () => {
    const name = val('m-name'), amount = parseFloat(val('m-amount'));
    const category = val('m-cat'), dueDay = parseInt(val('m-due')) || 1;
    if (!name || isNaN(amount)) return alert('Please fill name and amount');
    mutate(() => state.data.bills.push({ id: uid(), name, amount, category, dueDay, active: true }));
    closeModal();
  });
}

function editBill(id) {
  const b = state.data.bills.find(x => x.id === id);
  const catOpts = BILL_CATS.map(c => `<option ${c === b.category ? 'selected' : ''}>${c}</option>`).join('');
  showModal('Edit Bill', `
    <label>Name</label><input id="m-name" value="${esc(b.name)}">
    <label>Monthly Amount (£)</label><input id="m-amount" type="number" min="0" step="0.01" value="${b.amount}">
    <label>Category</label><select id="m-cat">${catOpts}</select>
    <label>Due Day of Month</label><input id="m-due" type="number" min="1" max="31" value="${b.dueDay || 1}">
  `, () => {
    const name = val('m-name'), amount = parseFloat(val('m-amount'));
    const category = val('m-cat'), dueDay = parseInt(val('m-due')) || 1;
    if (!name || isNaN(amount)) return alert('Please fill name and amount');
    mutate(() => { b.name = name; b.amount = amount; b.category = category; b.dueDay = dueDay; });
    closeModal();
  });
}

function deleteBill(id) {
  const b = state.data.bills.find(x => x.id === id);
  if (!confirm(`⚠️ Delete "${b.name}"?\n\nAmount: ${fmt(b.amount)}/month\nCategory: ${b.category}\n\nThis is permanent and cannot be undone. Only delete if this bill no longer exists — use the ✎ edit button to change the amount instead.`)) return;
  mutate(() => { state.data.bills = state.data.bills.filter(x => x.id !== id); });
}

function ordinal(n) {
  const s = ['th','st','nd','rd'], v = n % 100;
  return n + (s[(v-20)%10] || s[v] || s[0]);
}

// ── Expenses ─────────────────────────────────────────────────────────────────

const EXP_CATS = ['Food & Drink', 'Shopping', 'Transport', 'Entertainment', 'Health & Beauty', 'Household', 'Kids', 'Other'];

function renderExpenses() {
  const mk = state.currentMonth;
  const mo = getMonthly(mk);
  const expenses = mo.expenses || [];

  const rows = [...expenses].reverse().map(e => `
    <div class="list-item">
      <div class="item-main">
        <div class="item-name">${esc(e.description)}<span class="item-cat"> · ${e.category}</span></div>
        <div class="item-meta">${e.date}</div>
      </div>
      <div class="item-amount-right">
        <span class="item-amount">${fmt(e.amount)}</span>
        <button class="btn-icon danger" onclick="deleteExpense('${e.id}', '${mk}')">✕</button>
      </div>
    </div>`).join('');

  document.getElementById('page-expenses').innerHTML = `
    <div class="page-header">
      <h2>Expenses <span class="month-badge">${monthLabel(mk)}</span></h2>
      <button class="btn-add" onclick="addExpense('${mk}')">+ Add</button>
    </div>
    <div class="card card-total">
      <div class="card-label">Total One-off Spend</div>
      <div class="card-big">${fmt(totalExpenses(mk))}</div>
    </div>
    <div class="list">${rows || '<div class="empty">No expenses logged for this month.</div>'}</div>
  `;
}

function addExpense(mk) {
  const today = new Date().toISOString().slice(0, 10);
  const catOpts = EXP_CATS.map(c => `<option>${c}</option>`).join('');
  showModal('Add Expense', `
    <label>Description</label><input id="m-desc" placeholder="e.g. Tesco shop">
    <label>Amount (£)</label><input id="m-amount" type="number" min="0" step="0.01" placeholder="0.00">
    <label>Category</label><select id="m-cat">${catOpts}</select>
    <label>Date</label><input id="m-date" type="date" value="${today}">
  `, () => {
    const description = val('m-desc'), amount = parseFloat(val('m-amount'));
    const category = val('m-cat'), date = val('m-date');
    if (!description || isNaN(amount)) return alert('Please fill description and amount');
    mutate(() => {
      const mo = getMonthly(mk);
      mo.expenses.push({ id: uid(), description, amount, category, date });
    });
    closeModal();
  });
}

function deleteExpense(id, mk) {
  if (!confirm('Delete this expense?')) return;
  mutate(() => {
    const mo = getMonthly(mk);
    mo.expenses = mo.expenses.filter(e => e.id !== id);
  });
}

// ── Loans ────────────────────────────────────────────────────────────────────

function renderLoans() {
  const mk = state.currentMonth;
  const mo = getMonthly(mk);

  const rows = state.data.loans.map(l => {
    const paid = mo.paidLoans.includes(l.id);
    const orig = Number(l.originalAmount);
    const cur = loanCurrentBalance(l);
    const extra = loanTotalOverpayments(l);
    const paidOff = orig - cur;
    const pct = Math.min(100, Math.round((paidOff / orig) * 100));
    const months = loanMonthsRemaining(l);
    const payoff = loanPayoffDate(l);

    return `
      <div class="card loan-card">
        <div class="loan-header">
          <div>
            <div class="loan-name">${esc(l.name)}</div>
            <div class="loan-meta">Started ${l.startDate} · ${l.interestRate ? l.interestRate + '% APR' : 'No interest'} · Balance auto-calculated</div>
          </div>
          <div class="item-actions">
            <button class="btn-icon" onclick="editLoan('${l.id}')">✎</button>
            <button class="btn-icon danger" onclick="deleteLoan('${l.id}')">✕</button>
          </div>
        </div>
        <div class="loan-stats">
          <div class="loan-stat">
            <div class="stat-val">${fmt(orig)}</div>
            <div class="stat-label">Original</div>
          </div>
          <div class="loan-stat">
            <div class="stat-val negative">${fmt(cur)}</div>
            <div class="stat-label">Remaining</div>
          </div>
          <div class="loan-stat">
            <div class="stat-val">${fmt(l.monthlyPayment)}</div>
            <div class="stat-label">Per Month</div>
          </div>
          <div class="loan-stat">
            <div class="stat-val">${months > 0 ? months + ' mo' : '✓'}</div>
            <div class="stat-label">Left</div>
          </div>
        </div>
        <div class="loan-progress">
          <div class="progress-bar large"><div class="progress-fill" style="width:${pct}%"></div></div>
          <div class="progress-labels"><span>${pct}% paid off · ${fmt(paidOff)} cleared</span><span>Payoff: ${payoff}</span></div>
        </div>
        ${extra > 0 ? `
        <div class="extra-pmt-tag">
          ＋ ${fmt(extra)} in overpayments across ${(l.overpayments||[]).length} payment${(l.overpayments||[]).length > 1 ? 's' : ''}
          <div style="margin-top:5px;font-size:10px;opacity:0.85">
            ${(l.overpayments||[]).map(p => `${monthLabel(p.date)}: ${fmt(p.amount)}`).join(' · ')}
          </div>
        </div>` : ''}
        <button class="tick-full ${paid ? 'ticked' : ''}" onclick="toggleLoanPaid('${l.id}', '${mk}')">
          ${paid ? '✓ Payment noted this month' : '○ Note payment made this month'}
        </button>
        <button class="extra-pmt-btn" onclick="makeExtraPayment('${l.id}')">＋ Make an overpayment</button>
      </div>`;
  }).join('');

  document.getElementById('page-loans').innerHTML = `
    <div class="page-header">
      <h2>Loans</h2>
      <button class="btn-add" onclick="addLoan()">+ Add</button>
    </div>
    <div class="card card-total">
      <div class="card-label">Total Monthly Repayments</div>
      <div class="card-big">${fmt(totalLoanPayments())}</div>
    </div>
    ${rows || '<div class="card"><div class="empty">No loans added yet.</div></div>'}
  `;
}

function toggleLoanPaid(loanId, mk) {
  mutate(() => {
    const mo = getMonthly(mk);
    const idx = mo.paidLoans.indexOf(loanId);
    const loan = state.data.loans.find(l => l.id === loanId);
    if (!loan) return;
    if (idx >= 0) {
      // Unticking — add the monthly payment back to balance
      mo.paidLoans.splice(idx, 1);
      loan.currentBalance = Math.min(Number(loan.originalAmount), Number(loan.currentBalance) + Number(loan.monthlyPayment));
    } else {
      // Ticking — reduce balance by monthly payment
      mo.paidLoans.push(loanId);
      loan.currentBalance = Math.max(0, Number(loan.currentBalance) - Number(loan.monthlyPayment));
    }
  });
}

function addLoan() {
  const today = new Date().toISOString().slice(0, 7);
  showModal('Add Loan', `
    <label>Loan Name</label><input id="m-name" placeholder="e.g. Car Finance">
    <label>Original Amount (£)</label><input id="m-orig" type="number" min="0" step="0.01" placeholder="0.00">
    <label>Current Balance (£)</label><input id="m-bal" type="number" min="0" step="0.01" placeholder="0.00">
    <label>Monthly Payment (£)</label><input id="m-pmt" type="number" min="0" step="0.01" placeholder="0.00">
    <label>Interest Rate (% APR, optional)</label><input id="m-rate" type="number" min="0" step="0.1" placeholder="0">
    <label>Start Date (Month/Year)</label><input id="m-start" type="month" value="${today}">
  `, () => {
    const name = val('m-name');
    const originalAmount = parseFloat(val('m-orig'));
    const currentBalance = parseFloat(val('m-bal'));
    const monthlyPayment = parseFloat(val('m-pmt'));
    const interestRate = parseFloat(val('m-rate')) || 0;
    const startDate = val('m-start');
    if (!name || isNaN(originalAmount) || isNaN(currentBalance) || isNaN(monthlyPayment)) return alert('Please fill all required fields');
    mutate(() => state.data.loans.push({ id: uid(), name, originalAmount, currentBalance, monthlyPayment, interestRate, startDate, active: true }));
    closeModal();
  });
}

function editLoan(id) {
  const l = state.data.loans.find(x => x.id === id);
  showModal('Edit Loan', `
    <label>Loan Name</label><input id="m-name" value="${esc(l.name)}">
    <label>Original Amount (£)</label><input id="m-orig" type="number" min="0" step="0.01" value="${l.originalAmount}">
    <label>Current Balance (£)</label><input id="m-bal" type="number" min="0" step="0.01" value="${l.currentBalance}">
    <label>Monthly Payment (£)</label><input id="m-pmt" type="number" min="0" step="0.01" value="${l.monthlyPayment}">
    <label>Interest Rate (% APR)</label><input id="m-rate" type="number" min="0" step="0.1" value="${l.interestRate || 0}">
    <label>Start Date</label><input id="m-start" type="month" value="${l.startDate}">
  `, () => {
    const name = val('m-name');
    const originalAmount = parseFloat(val('m-orig'));
    const currentBalance = parseFloat(val('m-bal'));
    const monthlyPayment = parseFloat(val('m-pmt'));
    const interestRate = parseFloat(val('m-rate')) || 0;
    const startDate = val('m-start');
    if (!name || isNaN(originalAmount) || isNaN(currentBalance) || isNaN(monthlyPayment)) return alert('Please fill all required fields');
    mutate(() => { l.name = name; l.originalAmount = originalAmount; l.currentBalance = currentBalance; l.monthlyPayment = monthlyPayment; l.interestRate = interestRate; l.startDate = startDate; });
    closeModal();
  });
}

function deleteLoan(id) {
  const l = state.data.loans.find(x => x.id === id);
  if (loanCurrentBalance(l) > 0) {
    alert(`🔒 "${l.name}" cannot be deleted yet.\n\nRemaining balance: ${fmt(loanCurrentBalance(l))}\n\nLoans are locked until fully paid off to protect your records. Once the balance reaches £0 you will be able to remove it.`);
    return;
  }
  if (!confirm(`"${l.name}" is fully paid off — well done! Remove it from your records?`)) return;
  mutate(() => { state.data.loans = state.data.loans.filter(x => x.id !== id); });
}

function makeExtraPayment(id) {
  const l = state.data.loans.find(x => x.id === id);
  const cur = loanCurrentBalance(l);
  const extra = loanTotalOverpayments(l);
  const months = loanMonthsRemaining(l);
  showModal(`Overpayment — ${esc(l.name)}`, `
    <div style="background:#e6f9f2;border:1px solid #0a9e6e;border-radius:10px;padding:12px;margin-bottom:16px;font-size:13px;color:#0a2a3a;line-height:1.7">
      <div>Current balance: <strong>${fmt(cur)}</strong></div>
      <div>Regular payment: <strong>${fmt(l.monthlyPayment)}/mo</strong></div>
      <div>Months remaining: <strong>${months}</strong></div>
      ${extra > 0 ? `<div>Total overpaid to date: <strong>${fmt(extra)}</strong></div>` : ''}
    </div>
    <label>Overpayment amount (£)</label>
    <input id="m-extra" type="number" min="1" step="0.01" placeholder="0.00">
    <p style="font-size:12px;color:#5a8ea8;margin-top:10px">Permanently stored — reduces your balance and shortens your payoff date immediately. Cannot be undone.</p>
  `, () => {
    const amount = parseFloat(val('m-extra'));
    if (isNaN(amount) || amount <= 0) return alert('Please enter a valid amount');
    if (amount > cur) return alert('Overpayment cannot exceed the remaining balance of ' + fmt(cur));
    mutate(() => {
      if (!l.overpayments) l.overpayments = [];
      l.overpayments.push({ date: state.currentMonth, amount });
      l.currentBalance = Math.max(0, Number(l.currentBalance) - amount);
    });
    closeModal();
  });
}

// ── Savings ──────────────────────────────────────────────────────────────────

function renderSavings() {
  const net = surplus(state.currentMonth);
  const rows = state.data.savingsGoals.map(g => {
    const saved = Number(g.saved || 0);
    const target = Number(g.target);
    const monthly = Number(g.monthly || 0);
    const needed = Math.max(0, target - saved);
    const pct = Math.min(100, Math.round((saved / target) * 100));
    const months = monthly > 0 ? Math.ceil(needed / monthly) : null;
    const byDate = months != null ? (() => { const d = new Date(); d.setMonth(d.getMonth() + months); return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }); })() : 'Set a monthly amount';

    return `
      <div class="card savings-card">
        <div class="savings-top">
          <div>
            <div class="loan-name">${esc(g.name)}</div>
            <div class="loan-meta">Target: ${fmt(target)} · Saved: ${fmt(saved)}</div>
          </div>
          <div class="item-actions">
            <button class="btn-icon" onclick="editGoal('${g.id}')">✎</button>
            <button class="btn-icon danger" onclick="deleteGoal('${g.id}')">✕</button>
          </div>
        </div>
        <div class="loan-progress">
          <div class="progress-bar large"><div class="progress-fill green" style="width:${pct}%"></div></div>
          <div class="progress-labels"><span>${pct}% saved</span><span>${fmt(needed)} to go</span></div>
        </div>
        <div class="savings-footer">
          <div>Saving <strong>${fmt(monthly)}/mo</strong> → reach by <strong>${byDate}</strong></div>
          <button class="btn-sm" onclick="addToSavings('${g.id}')">+ Add funds</button>
        </div>
      </div>`;
  }).join('');

  document.getElementById('page-savings').innerHTML = `
    <div class="page-header">
      <h2>Savings Goals</h2>
      <button class="btn-add" onclick="addGoal()">+ Add</button>
    </div>
    <div class="card card-total">
      <div class="card-label">Available Monthly Surplus</div>
      <div class="card-big ${net >= 0 ? 'positive' : 'negative'}">${fmt(net)}</div>
    </div>
    ${rows || '<div class="card"><div class="empty">No savings goals yet. Add a goal to start planning.</div></div>'}
  `;
}

function addGoal() {
  showModal('Add Savings Goal', `
    <label>Goal Name</label><input id="m-name" placeholder="e.g. Holiday to Greece">
    <label>Target Amount (£)</label><input id="m-target" type="number" min="0" step="0.01" placeholder="0.00">
    <label>Monthly Saving (£)</label><input id="m-monthly" type="number" min="0" step="0.01" placeholder="0.00">
    <label>Already Saved (£)</label><input id="m-saved" type="number" min="0" step="0.01" placeholder="0.00">
  `, () => {
    const name = val('m-name'), target = parseFloat(val('m-target'));
    const monthly = parseFloat(val('m-monthly')) || 0;
    const saved = parseFloat(val('m-saved')) || 0;
    if (!name || isNaN(target)) return alert('Please fill name and target');
    mutate(() => state.data.savingsGoals.push({ id: uid(), name, target, monthly, saved }));
    closeModal();
  });
}

function editGoal(id) {
  const g = state.data.savingsGoals.find(x => x.id === id);
  showModal('Edit Savings Goal', `
    <label>Goal Name</label><input id="m-name" value="${esc(g.name)}">
    <label>Target Amount (£)</label><input id="m-target" type="number" min="0" step="0.01" value="${g.target}">
    <label>Monthly Saving (£)</label><input id="m-monthly" type="number" min="0" step="0.01" value="${g.monthly || 0}">
    <label>Amount Saved So Far (£)</label><input id="m-saved" type="number" min="0" step="0.01" value="${g.saved || 0}">
  `, () => {
    const name = val('m-name'), target = parseFloat(val('m-target'));
    const monthly = parseFloat(val('m-monthly')) || 0;
    const saved = parseFloat(val('m-saved')) || 0;
    if (!name || isNaN(target)) return alert('Please fill name and target');
    mutate(() => { g.name = name; g.target = target; g.monthly = monthly; g.saved = saved; });
    closeModal();
  });
}

function addToSavings(id) {
  const g = state.data.savingsGoals.find(x => x.id === id);
  showModal(`Add to "${g.name}"`, `
    <label>Amount to add (£)</label><input id="m-amount" type="number" min="0" step="0.01" placeholder="0.00">
  `, () => {
    const amount = parseFloat(val('m-amount'));
    if (isNaN(amount) || amount <= 0) return alert('Please enter a valid amount');
    mutate(() => { g.saved = (Number(g.saved) + amount); });
    closeModal();
  });
}

function deleteGoal(id) {
  if (!confirm('Delete this savings goal?')) return;
  mutate(() => { state.data.savingsGoals = state.data.savingsGoals.filter(g => g.id !== id); });
}

// ─── Modal ───────────────────────────────────────────────────────────────────

let modalCallback = null;

function showModal(title, body, onSave) {
  modalCallback = onSave;
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = body;
  document.getElementById('modal-overlay').classList.add('active');
  setTimeout(() => {
    const first = document.querySelector('#modal-body input, #modal-body select');
    if (first) first.focus();
  }, 100);
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.getElementById('modal-save').style.display = '';
  document.getElementById('modal-cancel').textContent = 'Cancel';
  modalCallback = null;
}

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function esc(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ─── Settings Menu ───────────────────────────────────────────────────────────

function showSettingsMenu() {
  const savedDisplay = document.getElementById('modal-save').style.display;
  showModal('Settings', `
    <div style="display:flex;flex-direction:column;gap:10px;margin-top:4px">
      <button onclick="closeModal();showSetup()" style="width:100%;padding:14px;border-radius:12px;border:1.5px solid #b8dcea;background:#f0f8fc;color:#0a2a3a;font-size:14px;font-weight:600;text-align:left">🔗 Change GitHub Connection</button>
      <button onclick="closeModal();loadBillsFromDefault()" style="width:100%;padding:14px;border-radius:12px;border:1.5px solid #b8dcea;background:#f0f8fc;color:#0a2a3a;font-size:14px;font-weight:600;text-align:left">📋 Load Pre-set Bills (replaces current bill list)</button>
      <button onclick="closeModal();loadIncomeFromDefault()" style="width:100%;padding:14px;border-radius:12px;border:1.5px solid #b8dcea;background:#f0f8fc;color:#0a2a3a;font-size:14px;font-weight:600;text-align:left">💰 Reset Income to Defaults</button>
      <button onclick="if(confirm('Wipe ALL data and start fresh?')){closeModal();localStorage.clear();state.data=JSON.parse(JSON.stringify(DEFAULT_DATA));saveLocal();scheduleSyncToGitHub();render();}" style="width:100%;padding:14px;border-radius:12px;border:1.5px solid #e8c0c0;background:#fdf5f5;color:#d64045;font-size:14px;font-weight:600;text-align:left">🗑 Reset All Data</button>
    </div>
  `, null);
  document.getElementById('modal-save').style.display = 'none';
  document.getElementById('modal-cancel').textContent = 'Close';
}

function loadBillsFromDefault() {
  if (!confirm('Replace your current bill list with the 28 pre-loaded bills?')) return;
  mutate(() => { state.data.bills = JSON.parse(JSON.stringify(DEFAULT_DATA.bills)); });
}

function loadIncomeFromDefault() {
  if (!confirm('Replace your income with the defaults (Salary, Other Income, Child Benefit)?')) return;
  mutate(() => { state.data.income = JSON.parse(JSON.stringify(DEFAULT_DATA.income)); });
}

// ─── Setup ───────────────────────────────────────────────────────────────────

function showSetup(error = null) {
  const overlay = document.getElementById('setup-overlay');
  overlay.classList.add('active');
  if (error) {
    document.getElementById('setup-error').textContent = error;
    document.getElementById('setup-error').style.display = 'block';
  }
}

async function submitSetup() {
  const token = document.getElementById('setup-token').value.trim();
  const repo = document.getElementById('setup-repo').value.trim() || 'budget-data';
  if (!token) { alert('Please enter your GitHub token'); return; }

  document.getElementById('setup-btn').textContent = 'Connecting…';
  document.getElementById('setup-btn').disabled = true;

  GitHub.configure(token, repo);
  try {
    const { data, sha } = await GitHub.loadData();
    if (data) {
      state.data = data;
      state.sha = sha;
      saveLocal();
    } else {
      state.sha = await GitHub.saveData(state.data, null);
      saveLocal();
    }
    document.getElementById('setup-overlay').classList.remove('active');
    render();
  } catch (e) {
    GitHub.clear();
    document.getElementById('setup-btn').textContent = 'Connect';
    document.getElementById('setup-btn').disabled = false;
    document.getElementById('setup-error').textContent = 'Error: ' + e.message;
    document.getElementById('setup-error').style.display = 'block';
  }
}

// ─── Init ────────────────────────────────────────────────────────────────────

async function init() {
  // No service worker — always load fresh from server
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister()));
    if (caches) caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
  }

  const hasLocal = loadLocal();
  const hasGitHub = GitHub.load();

  if (!hasGitHub) {
    if (hasLocal) render();
    showSetup();
    return;
  }

  render();

  try {
    const { data, sha } = await GitHub.loadData();
    if (data) {
      state.data = data;
      state.sha = sha;
      saveLocal();
      render();
    }
  } catch (e) {
    state.syncError = e.message;
    updateSyncStatus();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#bottom-nav button').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.tab));
  });

  document.getElementById('modal-save').addEventListener('click', () => {
    if (modalCallback) modalCallback();
  });
  document.getElementById('modal-cancel').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  });

  document.getElementById('sync-btn').addEventListener('click', () => {
    clearTimeout(syncTimer);
    syncToGitHub();
  });

  document.getElementById('settings-btn').addEventListener('click', () => {
    showSettingsMenu();
  });

  navigate('dashboard');
  init();
});
