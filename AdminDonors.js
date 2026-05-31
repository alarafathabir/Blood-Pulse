import { db } from '../js/db.js';

export const AdminDonors = {
    render: () => {
        const sidebar = typeof window.AdminSidebar === 'function' ? window.AdminSidebar() : '';
        
        return `
        <style>
            .glass-card {
                background: rgba(15, 23, 42, 0.6);
                backdrop-filter: blur(16px);
                border: 1px solid rgba(51, 65, 85, 0.5);
            }
            .matrix-surface { background-color: #020617; color: #f1f5f9; }
            .edit-mode .view-state { display: none; }
            .view-mode .edit-state { display: none; }
            
            @keyframes slide-in-right {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
            .panel-animate { animation: slide-in-right 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
            
            .admin-content-offset { padding-top: 4rem; }
            .sticky-header-offset { top: 4rem; }

            /* Custom scrollbar for dark mode */
            ::-webkit-scrollbar { width: 8px; }
            ::-webkit-scrollbar-track { background: #020617; }
            ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
            ::-webkit-scrollbar-thumb:hover { background: #334155; }
        </style>

        <div class="flex min-h-screen matrix-surface font-inter overflow-hidden relative">
            <!-- Animated Background Decor -->
            <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div class="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#af101a]/5 blur-[120px] rounded-full animate-pulse"></div>
                <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full animate-pulse" style="animation-delay: 2s"></div>
            </div>

            ${sidebar}

            <main class="flex-1 flex flex-col min-w-0 h-screen relative admin-content-offset z-10">
                <!-- Top Header -->
                <div class="sticky sticky-header-offset z-20 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50 px-8 py-6 flex items-center justify-between shrink-0">
                    <div>
                        <p class="text-[9px] font-black text-[#af101a] uppercase tracking-[0.4em] mb-1">Central Identity Control</p>
                        <h1 class="text-3xl font-black text-white font-outfit tracking-tighter uppercase leading-none">Donor <span class="text-slate-700">Matrix</span></h1>
                    </div>
                    <div class="flex items-center gap-6">
                        <div class="flex items-center gap-3 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
                             <div class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                             <span class="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Network Operational</span>
                        </div>
                    </div>
                </div>

                <div class="flex-1 flex overflow-hidden">
                    <!-- Left: Donor Grid Master -->
                    <div class="flex-1 overflow-y-auto p-8 lg:p-12 space-y-12">
                        <!-- Stats & Search Row -->
                        <div class="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
                            <div class="flex gap-4">
                                <div class="glass-card px-8 py-4 rounded-3xl flex items-center gap-4 border-slate-800">
                                    <div class="w-10 h-10 rounded-xl bg-[#af101a]/20 text-[#af101a] flex items-center justify-center border border-[#af101a]/30">
                                        <span class="material-symbols-outlined text-xl">groups</span>
                                    </div>
                                    <div>
                                        <p class="text-[8px] font-black text-slate-500 uppercase tracking-widest">Network Size</p>
                                        <p class="text-xl font-black text-white" id="stat-total">0</p>
                                    </div>
                                </div>
                                <div class="glass-card px-8 py-4 rounded-3xl flex items-center gap-4 border-slate-800">
                                    <div class="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                                        <span class="material-symbols-outlined text-xl">verified</span>
                                    </div>
                                    <div>
                                        <p class="text-[8px] font-black text-slate-500 uppercase tracking-widest">Elite Donors</p>
                                        <p class="text-xl font-black text-white" id="stat-elite">0</p>
                                    </div>
                                </div>
                            </div>

                            <div class="relative group w-full lg:w-96">
                                <span class="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#af101a] transition-colors">search</span>
                                <input type="text" id="donor-search" placeholder="FILTER IDENTITY MATRIX..." class="w-full bg-slate-900/50 border border-slate-800 rounded-2xl pl-16 pr-6 py-4 text-[10px] font-black uppercase tracking-widest outline-none text-white focus:ring-4 focus:ring-[#af101a]/10 transition-all">
                            </div>
                        </div>

                        <!-- Grid -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6" id="donor-master-grid"></div>
                    </div>

                    <!-- Right: Identity Detail Panel Overlay -->
                    <div id="panel-overlay" class="fixed inset-0 bg-[#020617]/80 backdrop-blur-md z-[1000] hidden transition-opacity opacity-0"></div>
                    
                    <!-- Right: Identity Detail Panel -->
                    <div id="right-panel" class="fixed inset-y-0 right-0 z-[1100] w-full max-w-[500px] bg-slate-950/90 backdrop-blur-2xl shadow-[-20px_0_60px_rgba(0,0,0,0.5)] border-l border-slate-800 transform translate-x-full transition-transform duration-500 flex flex-col h-full overflow-hidden">
                        
                        <!-- Panel Empty State -->
                        <div id="panel-empty-state" class="flex-1 flex flex-col items-center justify-center p-16 text-center">
                             <div class="w-32 h-32 bg-slate-900 rounded-[48px] flex items-center justify-center text-slate-700 mb-8 border border-slate-800">
                                <span class="material-symbols-outlined text-6xl">person_search</span>
                             </div>
                             <h3 class="text-2xl font-manrope font-black text-white uppercase tracking-tighter">Zero Focus</h3>
                             <p class="text-[9px] text-slate-500 mt-4 font-black leading-relaxed uppercase tracking-[0.2em] max-w-xs mx-auto">Select a node from the matrix to manage authoritative donor credentials.</p>
                        </div>

                        <!-- Panel Content State -->
                        <div id="panel-content-state" class="hidden flex-col h-full view-mode overflow-y-auto">
                            <!-- Banner -->
                            <div class="h-40 bg-gradient-to-br from-[#af101a] to-[#86000d] relative overflow-hidden shrink-0">
                                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                                <button onclick="window.closeDonorPanel()" class="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-xl z-30 border border-white/20">
                                    <span class="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            <div class="px-10">
                                <!-- Avatar -->
                                <div class="relative -mt-20 mb-8 inline-block z-30">
                                    <div class="w-40 h-40 rounded-[48px] border-[6px] border-slate-950 shadow-2xl overflow-hidden bg-slate-900 relative">
                                        <img id="modal-img" src="" class="w-full h-full object-cover" alt="Profile">
                                    </div>
                                    <div id="verified-badge" class="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-emerald-500 text-white border-[6px] border-slate-950 flex items-center justify-center shadow-xl">
                                        <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">verified</span>
                                    </div>
                                </div>

                                <!-- View State -->
                                <div class="view-state space-y-8 animate-fade-in pb-20">
                                    <div>
                                        <h2 id="modal-name" class="text-4xl font-manrope font-black text-white tracking-tighter leading-none">...</h2>
                                        <div class="flex flex-wrap items-center gap-4 mt-4">
                                            <div class="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                                                <span class="material-symbols-outlined text-sm">alternate_email</span>
                                                <span id="modal-email" class="text-slate-300">...</span>
                                            </div>
                                            <span id="modal-role-badge" class="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg bg-[#af101a]/10 text-[#af101a] border border-[#af101a]/20">Verified Donor</span>
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="glass-card p-6 rounded-3xl flex flex-col justify-between shadow-sm">
                                            <span class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 opacity-60">Blood Matrix</span>
                                            <span id="modal-group" class="text-4xl font-black text-[#af101a] tracking-tighter">...</span>
                                        </div>
                                        <div class="glass-card p-6 rounded-3xl flex flex-col justify-between shadow-sm">
                                            <span class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 opacity-60">Success Rank</span>
                                            <span id="modal-rank" class="text-4xl font-black text-blue-500 tracking-tighter">...</span>
                                        </div>
                                    </div>

                                    <!-- Info List -->
                                    <div class="space-y-6 border-y border-slate-800 py-8">
                                        <div class="flex items-start gap-4">
                                            <div class="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-500 shrink-0 border border-slate-800">
                                                <span class="material-symbols-outlined text-xl">call</span>
                                            </div>
                                            <div>
                                                <span class="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Comms Protocol</span>
                                                <span id="modal-phone" class="text-base font-bold text-slate-200 tracking-tight">...</span>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-4">
                                            <div class="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-500 shrink-0 border border-slate-800">
                                                <span class="material-symbols-outlined text-xl">location_on</span>
                                            </div>
                                            <div>
                                                <span class="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Regional Sector</span>
                                                <span id="modal-location" class="text-base font-bold text-slate-200 tracking-tight">...</span>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-4">
                                            <div class="w-10 h-10 rounded-xl bg-[#af101a]/10 flex items-center justify-center text-[#af101a] shrink-0 border border-[#af101a]/20">
                                                <span class="material-symbols-outlined text-xl">water_drop</span>
                                            </div>
                                            <div>
                                                <span class="block text-[9px] font-black text-[#af101a] uppercase tracking-widest mb-1">Life Support Volume</span>
                                                <span id="modal-donated" class="text-base font-bold text-slate-200 tracking-tight">... Units</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex gap-4">
                                        <button onclick="window.enterEditMode()" class="flex-1 bg-white text-black py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#af101a] hover:text-white transition-all shadow-xl flex items-center justify-center gap-3">
                                            <span class="material-symbols-outlined text-lg">edit_square</span>
                                            Override Identity
                                        </button>
                                        <button id="modal-delete-btn" class="w-16 bg-slate-900 text-red-500 border border-slate-800 rounded-2xl hover:bg-red-950 transition-all flex items-center justify-center">
                                            <span class="material-symbols-outlined">delete_forever</span>
                                        </button>
                                    </div>
                                </div>

                                <!-- Edit State -->
                                <div class="edit-state space-y-6 animate-fade-in pb-20">
                                    <div class="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                                        <h2 class="text-2xl font-manrope font-black text-white uppercase tracking-tighter">Node Override</h2>
                                        <span class="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border border-amber-500/20">Active Write</span>
                                    </div>
                                    
                                    <form id="edit-user-form" class="space-y-6">
                                        <div class="space-y-2">
                                            <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Legal Designation (Name)</label>
                                            <input type="text" id="edit-name" class="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-4 focus:ring-[#af101a]/20 outline-none font-bold text-sm text-white" required>
                                        </div>

                                        <div class="grid grid-cols-2 gap-4">
                                            <div class="space-y-2">
                                                <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Comms Email</label>
                                                <input type="email" id="edit-email" class="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-4 focus:ring-[#af101a]/20 outline-none font-bold text-sm text-white" required>
                                            </div>
                                            <div class="space-y-2">
                                                <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Comms Phone</label>
                                                <input type="text" id="edit-phone" class="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-4 focus:ring-[#af101a]/20 outline-none font-bold text-sm text-white">
                                            </div>
                                        </div>

                                        <div class="grid grid-cols-2 gap-4">
                                            <div class="space-y-2">
                                                <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Regional Sector (District)</label>
                                                <input type="text" id="edit-location" class="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-4 focus:ring-[#af101a]/20 outline-none font-bold text-sm text-white">
                                            </div>
                                            <div class="space-y-2">
                                                <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Privilege Level (Role)</label>
                                                <select id="edit-role" class="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-4 focus:ring-[#af101a]/20 outline-none font-bold text-sm text-white appearance-none">
                                                    <option value="user">Verified Donor</option>
                                                    <option value="admin">Matrix Admin</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="grid grid-cols-2 gap-4">
                                            <div class="space-y-2">
                                                <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Blood Signature</label>
                                                <select id="edit-group" class="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-4 focus:ring-[#af101a]/20 outline-none font-bold text-sm text-white appearance-none">
                                                    <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                                                    <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                                                </select>
                                            </div>
                                            <div class="space-y-2">
                                                <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Priority Rank (1-4)</label>
                                                <input type="number" id="edit-rank" min="1" max="4" class="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-4 focus:ring-[#af101a]/20 outline-none font-bold text-sm text-white">
                                            </div>
                                        </div>

                                        <div class="grid grid-cols-2 gap-4">
                                            <div class="space-y-2">
                                                <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Total Impact (Donations)</label>
                                                <input type="number" id="edit-donated" class="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-4 focus:ring-[#af101a]/20 outline-none font-bold text-sm text-white">
                                            </div>
                                            <div class="space-y-2">
                                                <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Last Transaction</label>
                                                <input type="date" id="edit-last-donation" class="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-4 focus:ring-[#af101a]/20 outline-none font-bold text-sm text-white uppercase">
                                            </div>
                                        </div>

                                        <div class="space-y-2">
                                            <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Photo Node URL (Avatar)</label>
                                            <input type="text" id="edit-avatar" class="w-full px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl focus:ring-4 focus:ring-[#af101a]/20 outline-none font-bold text-sm text-white" placeholder="https://...">
                                        </div>
                                        
                                        <div class="flex gap-4 pt-6">
                                            <button type="submit" class="flex-1 bg-[#af101a] text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl shadow-[#af101a]/20">Sync Changes</button>
                                            <button type="button" onclick="window.cancelEditMode()" class="flex-1 bg-slate-800 text-slate-400 border border-slate-700 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-700 transition-all">Abort</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        `;
    },
    afterRender: async () => {
        let currentEditingId = null;
        let allDonors = [];

        // Cache elements
        const rightPanel = document.getElementById('right-panel');
        const panelOverlay = document.getElementById('panel-overlay');
        const emptyState = document.getElementById('panel-empty-state');
        const contentState = document.getElementById('panel-content-state');

        const renderDonors = async (filter = '') => {
            const grid = document.getElementById('donor-master-grid');
            if (!grid) return;

            grid.innerHTML = '<div class="col-span-full text-center py-20 opacity-30 font-black uppercase text-[10px] tracking-[0.5em] animate-pulse">Syncing Matrix Signal...</div>';

            try {
                const { data: donors, error } = await db.from('profiles').select('*').order('created_at', { ascending: false });
                if (error) throw error;

                allDonors = donors;
                const filtered = donors.filter(d => 
                    (d.full_name || '').toLowerCase().includes(filter.toLowerCase()) || 
                    (d.blood_group || '').toLowerCase().includes(filter.toLowerCase()) ||
                    (d.district || '').toLowerCase().includes(filter.toLowerCase())
                );

                const totalStat = document.getElementById('stat-total');
                const eliteStat = document.getElementById('stat-elite');
                if (totalStat) totalStat.textContent = donors.length;
                if (eliteStat) eliteStat.textContent = donors.filter(d => (d.rank || 4) <= 2).length;

                if (filtered.length === 0) {
                    grid.innerHTML = '<div class="col-span-full py-20 text-center opacity-30 font-black uppercase text-[10px] tracking-widest border-2 border-dashed border-slate-800 rounded-[40px]">No Matching Signal Detected</div>';
                    return;
                }

                grid.innerHTML = filtered.map(d => `
                    <div class="group glass-card rounded-[40px] p-4 hover:bg-slate-900 hover:shadow-[0_0_40px_rgba(175,16,26,0.1)] hover:-translate-y-2 transition-all duration-500 cursor-pointer border-transparent hover:border-slate-700" onclick="window.openDonorPanel('${d.id}')">
                        <div class="aspect-square rounded-[32px] overflow-hidden mb-5 relative">
                            <img src="${d.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${d.full_name}`}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                            <div class="absolute top-4 right-4 w-10 h-10 bg-slate-950/80 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/5">
                                <span class="text-xs font-black text-[#af101a]">${d.blood_group || '??'}</span>
                            </div>
                        </div>
                        <div class="px-2 pb-2">
                            <h3 class="text-sm font-black text-white truncate uppercase tracking-tighter">${d.full_name || 'Anonymous Node'}</h3>
                            <div class="flex items-center justify-between mt-3">
                                 <p class="text-[9px] font-black text-slate-500 uppercase tracking-widest">${d.district || 'Location Unknown'}</p>
                                 <div class="w-1.5 h-1.5 rounded-full ${d.times_donated >= 5 ? 'bg-[#af101a] shadow-[0_0_10px_#af101a]' : 'bg-slate-800'}"></div>
                            </div>
                        </div>
                    </div>
                `).join('');
            } catch (err) {
                console.error('Grid Render Error:', err);
                grid.innerHTML = '<div class="col-span-full text-red-500 text-center py-20 uppercase font-black text-xs">Node Connection Failure</div>';
            }
        };

        window.openDonorPanel = async (id) => {
            currentEditingId = id;
            
            try {
                const { data: donor, error } = await db.from('profiles').select('*').eq('id', id).single();
                if (error || !donor) throw new Error('Identity Retrieval Failure');

                // Cache update
                const idx = allDonors.findIndex(d => d.id === id);
                if (idx !== -1) allDonors[idx] = donor;

                // Populate UI
                document.getElementById('modal-img').src = donor.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${donor.full_name}`;
                document.getElementById('modal-name').innerText = donor.full_name || 'Incognito Node';
                document.getElementById('modal-email').innerText = donor.email || 'Signal Lost';
                document.getElementById('modal-group').innerText = donor.blood_group || '??';
                document.getElementById('modal-rank').innerText = `Lvl ${donor.rank || 4}`;
                document.getElementById('modal-phone').innerText = donor.phone || 'Comms Offline';
                document.getElementById('modal-location').innerText = donor.district || 'Coordinates Missing';
                document.getElementById('modal-donated').innerText = donor.times_donated || 0;

                const roleBadge = document.getElementById('modal-role-badge');
                if (roleBadge) {
                    roleBadge.innerText = donor.role === 'admin' ? 'Matrix Admin' : 'Verified Donor';
                    roleBadge.className = donor.role === 'admin' 
                        ? 'text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg bg-[#af101a] text-white'
                        : 'text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg bg-[#af101a]/10 text-[#af101a] border border-[#af101a]/20';
                }

                // Populate Form
                document.getElementById('edit-name').value = donor.full_name || '';
                document.getElementById('edit-email').value = donor.email || '';
                document.getElementById('edit-phone').value = donor.phone || '';
                document.getElementById('edit-location').value = donor.district || '';
                document.getElementById('edit-role').value = donor.role || 'user';
                document.getElementById('edit-group').value = donor.blood_group || 'A+';
                document.getElementById('edit-rank').value = donor.rank || 4;
                document.getElementById('edit-donated').value = donor.times_donated || 0;
                document.getElementById('edit-avatar').value = donor.avatar_url || '';
                document.getElementById('edit-last-donation').value = donor.last_donation_date ? donor.last_donation_date.split('T')[0] : '';

                // Panel Transitions
                emptyState.classList.add('hidden');
                contentState.classList.remove('hidden');
                contentState.classList.add('flex');
                window.cancelEditMode();

                rightPanel.classList.remove('translate-x-full');
                panelOverlay.classList.remove('hidden');
                setTimeout(() => panelOverlay.classList.add('opacity-100'), 10);
            } catch (err) {
                alert(err.message);
            }
        };

        window.closeDonorPanel = () => {
            if (!rightPanel) return;
            rightPanel.classList.add('translate-x-full');
            panelOverlay.classList.remove('opacity-100');
            setTimeout(() => {
                panelOverlay.classList.add('hidden');
                contentState.classList.add('hidden');
                emptyState.classList.remove('hidden');
            }, 500);
        };

        window.enterEditMode = () => {
            contentState.classList.remove('view-mode');
            contentState.classList.add('edit-mode');
        };

        window.cancelEditMode = () => {
            contentState.classList.remove('edit-mode');
            contentState.classList.add('view-mode');
        };

        const form = document.getElementById('edit-user-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerText;
                btn.innerText = 'SYNCHRONIZING...';
                btn.disabled = true;

                try {
                    const updates = {
                        full_name: document.getElementById('edit-name').value,
                        email: document.getElementById('edit-email').value,
                        phone: document.getElementById('edit-phone').value,
                        district: document.getElementById('edit-location').value,
                        role: document.getElementById('edit-role').value,
                        blood_group: document.getElementById('edit-group').value,
                        rank: parseInt(document.getElementById('edit-rank').value) || 4,
                        times_donated: parseInt(document.getElementById('edit-donated').value) || 0,
                        avatar_url: document.getElementById('edit-avatar').value,
                        last_donation_date: document.getElementById('edit-last-donation').value || null,
                        updated_at: new Date().toISOString()
                    };

                    const { error, count } = await db.from('profiles').update(updates).eq('id', currentEditingId).select('*', { count: 'exact', head: true });
                    if (error) throw error;
                    
                    if (count === 0) {
                        throw new Error('Sync Interrupted: No record found or permission denied by RLS.');
                    }

                    alert('Authoritative record synchronized successfully.');
                    await renderDonors();
                    await window.openDonorPanel(currentEditingId);
                } catch (err) {
                    alert('Sync Failure: ' + err.message);
                } finally {
                    btn.innerText = originalText;
                    btn.disabled = false;
                }
            });
        }

        const deleteBtn = document.getElementById('modal-delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', async () => {
                if (confirm('CRITICAL: Purge this identity node?')) {
                    const { error } = await db.from('profiles').delete().eq('id', currentEditingId);
                    if (!error) {
                        alert('Identity purged.');
                        window.closeDonorPanel();
                        renderDonors();
                    }
                }
            });
        }

        const searchInput = document.getElementById('donor-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => renderDonors(e.target.value));
        }

        panelOverlay.addEventListener('click', window.closeDonorPanel);

        // Initial Load
        renderDonors();
    }
};


