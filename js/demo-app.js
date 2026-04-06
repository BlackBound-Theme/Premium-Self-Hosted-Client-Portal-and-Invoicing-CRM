let currentUser = null;

function fillCredentials(email, pass) {
    document.getElementById('login-email').value = email;
    document.getElementById('login-password').value = pass;
}

function handleDemoLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-password').value;

    if (DEMO_USERS[email] && pass === 'password') {
        currentUser = { email, ...DEMO_USERS[email] };
        sessionStorage.setItem('vaultcrm_demo_user', JSON.stringify(currentUser));
        window.location.href = 'dashboard.html';
    } else {
        document.getElementById('login-error').classList.remove('hidden');
    }
    return false;
}

function requireAuth() {
    const stored = sessionStorage.getItem('vaultcrm_demo_user');
    if (!stored) { window.location.href = 'index.html'; return null; }
    currentUser = JSON.parse(stored);
    return currentUser;
}

function demoLogout() {
    sessionStorage.removeItem('vaultcrm_demo_user');
    window.location.href = 'index.html';
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style:'currency', currency:'USD' }).format(amount);
}

function statusBadgeClass(status) {
    const map = { paid:'emerald', sent:'cyan', draft:'slate', overdue:'rose', cancelled:'gray', active:'emerald', completed:'cyan', on_hold:'amber', archived:'slate' };
    return map[status] || 'slate';
}

function renderBadge(text, color) {
    const colors = {
        emerald: 'bg-emerald-500/10 text-emerald-400',
        cyan: 'bg-cyan-500/10 text-cyan-400',
        rose: 'bg-rose-500/10 text-rose-400',
        amber: 'bg-amber-500/10 text-amber-400',
        slate: 'bg-slate-500/10 text-slate-400',
        gray: 'bg-gray-500/10 text-gray-400',
        vault: 'bg-indigo-500/10 text-indigo-400'
    };
    return `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border border-current/10 ${colors[color] || colors.slate}">${text}</span>`;
}

function priorityColor(p) {
    return { urgent:'rose', high:'amber', medium:'vault', low:'emerald' }[p] || 'vault';
}

function populateSidebar(user) {
    const nav = document.getElementById('sidebar-nav');
    if (!nav) return;

    const links = [
        { href:'dashboard.html', label:'Dashboard', icon:'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { href:'projects.html', label:'Projects', icon:'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7' },
        { href:'kanban.html', label:'Kanban Board', icon:'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
        { href:'invoices.html', label:'Invoices', icon:'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z' },
        { href:'assets.html', label:'Asset Hub', icon:'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' }
    ];

    if (user.role === 'admin') {
        links.splice(1, 0, { href:'clients.html', label:'Clients', icon:'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' });
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    nav.innerHTML = links.map(l => {
        const isActive = currentPage === l.href;
        const cls = isActive
            ? 'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-indigo-500/10 border-l-2 border-indigo-500'
            : 'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200';
        return `<a href="${l.href}" class="${cls}"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="${l.icon}"/></svg>${l.label}</a>`;
    }).join('');

    const userInfo = document.getElementById('sidebar-user');
    if (userInfo) {
        userInfo.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">${user.name.charAt(0).toUpperCase()}</div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-white truncate">${user.name}</p>
                    <p class="text-xs text-slate-500 truncate">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                </div>
                <button onclick="demoLogout()" class="p-1.5 text-slate-500 hover:text-rose-400 transition-colors" title="Logout">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                </button>
            </div>`;
    }
}

function initMobileSidebar() {
    const toggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('portal-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (!toggle || !sidebar) return;
    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
        overlay?.classList.toggle('hidden');
    });
    overlay?.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    });
}
