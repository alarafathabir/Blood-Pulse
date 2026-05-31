import { db } from '../js/db.js';

export const Dashboard = {
    render: () => {
        const user = JSON.parse(localStorage.getItem('bloodpulse_user') || '{}');
        return `
        <div class="flex min-h-screen bg-slate-900">
            ${window.AdminSidebar()}

            <main class="flex-1 p-10 pt-20 max-w-7xl mx-auto space-y-12 relative">
                <!-- Background Decorative Orbs -->
                <div class="fixed top-0 right-0 w-[50%] h-[50%] bg-[#af101a]/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>
                <div class="fixed bottom-0 left-0 w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full -z-10 animate-pulse" style="animation-delay: 2s"></div>

                <!-- Page Hero -->
                <header class="animate-fade-in">
                    <div class="flex items-center gap-3 mb-4">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        <span class="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">System Status: All Systems Optimal</span>
                    </div>
                    <h1 class="text-6xl font-black text-white font-outfit tracking-tighter uppercase leading-none">Pulse <span class="text-[#af101a]">Core</span></h1>
                    <p class="text-slate-500 font-bold text-sm mt-4 uppercase tracking-widest">Welcome back, <span class="text-white">${user.full_name || 'Master Admin'}</span></p>
                </header>

                <!-- KPI Grid -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8 animate-slide-up" style="animation-delay: 0.1s">
                    <div class="bg-slate-800 p-10 rounded-[48px] shadow-2xl border border-slate-700 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                        <div class="relative z-10">
                            <div class="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6">
                                <span class="material-symbols-outlined">group</span>
                            </div>
                            <p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Total Network</p>
                            <p id="kpi-users" class="text-5xl font-black text-white tracking-tighter">--</p>
                            <div class="mt-6 flex items-center gap-2 text-emerald-500">
                                <span class="material-symbols-outlined text-sm">trending_up</span>
                                <span class="text-[10px] font-black uppercase">Live Count</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-slate-800 p-10 rounded-[48px] shadow-2xl border border-slate-700 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                        <div class="relative z-10">
                            <div class="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-amber-500/20">
                                <span class="material-symbols-outlined">pending_actions</span>
                            </div>
                            <p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Pending Appeals</p>
                            <p id="kpi-pending" class="text-5xl font-black text-white tracking-tighter">--</p>
                            <div class="mt-6 flex items-center gap-2 text-amber-500">
                                <span class="material-symbols-outlined text-sm">emergency</span>
                                <span class="text-[10px] font-black uppercase">Needs Action</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-slate-800 p-10 rounded-[48px] shadow-2xl border border-slate-700 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                        <div class="relative z-10">
                            <div class="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-500/20">
                                <span class="material-symbols-outlined">verified</span>
                            </div>
                            <p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Approved Cases</p>
                            <p id="kpi-donations" class="text-5xl font-black text-white tracking-tighter">--</p>
                            <div class="mt-6 flex items-center gap-2 text-emerald-500">
                                <span class="material-symbols-outlined text-sm">favorite</span>
                                <span class="text-[10px] font-black uppercase">Lives Impacted</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-slate-950 p-10 rounded-[48px] shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 border border-slate-800">
                        <div class="absolute inset-0 bg-gradient-to-br from-[#af101a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div class="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div class="flex items-center gap-2 mb-6">
                                    <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                                    <p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Emergency Protocol</p>
                                </div>
                                <h3 class="text-2xl font-black text-white font-outfit uppercase tracking-tighter leading-none mb-2">Mass Alert<br>System</h3>
                                <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">Broadcast to all donors instantly</p>
                            </div>
                            <button id="alert-btn" onclick="window.initializeAlert(event)" class="mt-8 w-full bg-[#af101a] text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#86000d] transition-all active:scale-95 flex items-center justify-center gap-2">
                                <span class="material-symbols-outlined text-sm">campaign</span>
                                Initialize Alert
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-slide-up" style="animation-delay: 0.2s">
                    <div class="lg:col-span-8 space-y-12">
                        <!-- Verification Queue -->
                        <section class="space-y-8">
                            <div class="flex justify-between items-end">
                                <div>
                                    <h2 class="text-2xl font-black text-white font-outfit uppercase tracking-tighter">Verification Queue</h2>
                                    <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Blood appeals awaiting admin action</p>
                                </div>
                                <button onclick="window.goTo('/admin-requests')" class="text-[10px] font-black text-[#af101a] uppercase tracking-widest hover:underline underline-offset-4">View All →</button>
                            </div>

                            <div id="queue-empty" class="hidden bg-slate-800 p-12 rounded-[40px] border border-dashed border-slate-700 text-center">
                                <span class="material-symbols-outlined text-4xl text-slate-700">inbox</span>
                                <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-4">Queue Clear — No Pending Appeals</p>
                            </div>

                            <div class="bg-slate-800 rounded-[40px] border border-slate-700 shadow-2xl overflow-hidden" id="queue-table-wrapper">
                                <div class="overflow-x-auto">
                                    <table class="w-full text-left">
                                        <thead>
                                            <tr class="bg-slate-900 border-b border-slate-700">
                                                <th class="px-8 py-5 text-[9px] font-black text-slate-500 uppercase tracking-widest">Patient / Group</th>
                                                <th class="px-8 py-5 text-[9px] font-black text-slate-500 uppercase tracking-widest">Hospital</th>
                                                <th class="px-8 py-5 text-[9px] font-black text-slate-500 uppercase tracking-widest">Date</th>
                                                <th class="px-8 py-5 text-[9px] font-black text-slate-500 uppercase tracking-widest text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody id="admin-requests-list" class="divide-y divide-slate-700"></tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                        <!-- Donor Preview -->
                        <section class="space-y-8">
                            <div class="flex justify-between items-end">
                                <div>
                                    <h2 class="text-2xl font-black text-white font-outfit uppercase tracking-tighter">Core Network</h2>
                                    <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Recently active verified donors</p>
                                </div>
                                <button onclick="window.goTo('/admin-donors')" class="text-[10px] font-black text-[#af101a] uppercase tracking-widest hover:underline underline-offset-4">Manage →</button>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="admin-users-list"></div>
                        </section>
                    </div>

                    <div class="lg:col-span-4 space-y-12">
                        <!-- Distribution -->
                        <section class="bg-slate-950 rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden border border-slate-800">
                            <div class="absolute top-0 right-0 w-64 h-64 bg-[#af101a]/10 rounded-full blur-3xl"></div>
                            <div class="relative z-10">
                                <h3 class="text-lg font-black font-outfit uppercase tracking-tighter mb-2">Supply Distribution</h3>
                                <p class="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-10">Blood group breakdown</p>
                                <div id="supply-bars" class="space-y-6"></div>
                            </div>
                        </section>

                        <!-- System Activity -->
                        <section class="space-y-8">
                            <h3 class="text-lg font-black text-white font-outfit uppercase tracking-tighter">System Activity</h3>
                            <div id="activity-log" class="space-y-6 relative">
                                <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800"></div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
        `;
    },
    afterRender: async () => {
        const token = localStorage.getItem('bloodpulse_token');
        if (!token) { window.goTo('/login'); return; }

        const renderAll = async () => {
            // Fetch real data from db
            const { data: donors } = await db.from('profiles').select('*').order('created_at', { ascending: false });
            const { data: requests } = await db.from('requests').select('*').order('created_at', { ascending: false });

            const finalDonors = donors || [];
            const finalRequests = requests || [];
            
            // KPIs
            document.getElementById('kpi-users').textContent    = finalDonors.length;
            document.getElementById('kpi-pending').textContent  = finalRequests.filter(r => r.status === 'Pending').length;
            document.getElementById('kpi-donations').textContent = finalRequests.filter(r => r.status === 'Approved').length;

            // Queue (Pending Requests)
            const pending = finalRequests.filter(r => r.status === 'Pending').slice(0, 5);
            const tbody   = document.getElementById('admin-requests-list');
            const empty   = document.getElementById('queue-empty');
            const wrapper = document.getElementById('queue-table-wrapper');

            if (pending.length === 0) {
                empty?.classList.remove('hidden');
                wrapper?.classList.add('hidden');
            } else {
                empty?.classList.add('hidden');
                wrapper?.classList.remove('hidden');
                tbody.innerHTML = pending.map(r => `
                    <tr class="hover:bg-slate-900/50 transition-all group">
                        <td class="px-8 py-5">
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-xl bg-red-950/30 flex items-center justify-center font-black text-[#af101a] text-xs border border-red-900/50">${r.blood_group}</div>
                                <div>
                                    <p class="text-sm font-black text-white uppercase tracking-tighter">${r.patient_name || r.requester_name}</p>
                                    ${r.requires_wheelchair ? `
                                        <div class="flex items-center gap-1.5 mt-1">
                                            <span class="material-symbols-outlined text-[12px] text-[#af101a]">accessible</span>
                                            <span class="text-[8px] font-black text-[#af101a] uppercase tracking-widest">Wheelchair Needed</span>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        </td>
                        <td class="px-8 py-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">${r.hospital_location}</td>
                        <td class="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">${new Date(r.created_at).toLocaleDateString()}</td>
                        <td class="px-8 py-5 text-right">
                            <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                <button onclick="window.dashApprove('${r.id}', 'Approved')" class="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"><span class="material-symbols-outlined text-sm">check</span></button>
                                <button onclick="window.dashApprove('${r.id}', 'Rejected')" class="w-10 h-10 bg-slate-950 text-white rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shadow-black/20"><span class="material-symbols-outlined text-sm">close</span></button>
                            </div>
                        </td>
                    </tr>
                `).join('');
            }

            // Core Network (Recent Donors)
            document.getElementById('admin-users-list').innerHTML = finalDonors.slice(0, 4).map(u => `
                <div class="bg-slate-800 p-6 rounded-[32px] border border-slate-700 flex items-center justify-between hover:shadow-2xl hover:border-slate-600 transition-all">
                    <div class="flex items-center gap-4">
                        <img src="${u.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.full_name)}&background=af101a&color=fff`}" class="w-12 h-12 rounded-2xl object-cover">
                        <div>
                            <h4 class="text-sm font-black text-white uppercase tracking-tighter">${u.full_name}</h4>
                            <p class="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">${u.department || 'BAUST'} • ${u.role || 'Donor'}</p>
                        </div>
                    </div>
                    <p class="text-lg font-black text-[#af101a] font-outfit">${u.blood_group}</p>
                </div>
            `).join('');

            // Supply Distribution
            const groups = ['O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-'];
            const total  = finalDonors.length || 1;
            document.getElementById('supply-bars').innerHTML = groups.map((g, i) => {
                const n   = finalDonors.filter(d => d.blood_group === g).length;
                const pct = Math.round((n / total) * 100);
                if (n === 0 && finalDonors.length > 0) return '';
                return `
                    <div>
                        <div class="flex justify-between text-[10px] font-black uppercase mb-2"><span>Group ${g}</span><span>${pct}%</span></div>
                        <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div class="h-full bg-[#af101a] rounded-full transition-all duration-1000" style="width: ${pct}%"></div>
                        </div>
                    </div>
                `;
            }).join('');

            // Unified Activity Log (Live Timeline)
            const activityEvents = [
                ...(finalDonors || []).slice(0, 3).map(u => ({
                    icon: 'person_add',
                    color: 'blue',
                    label: 'New Member',
                    body: `${u.full_name} joined the network`,
                    time: u.created_at
                })),
                ...(finalRequests || []).slice(0, 3).map(r => ({
                    icon: r.status === 'Approved' ? 'verified' : 'emergency',
                    color: r.status === 'Approved' ? 'emerald' : 'amber',
                    label: r.status === 'Approved' ? 'Appeal Approved' : 'New Appeal',
                    body: `${r.patient_name || r.requester_name} needs ${r.blood_group}`,
                    time: r.created_at
                }))
            ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);

            document.getElementById('activity-log').innerHTML = activityEvents.map(l => `
                <div class="relative flex gap-6 group">
                    <div class="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-700 z-10 flex items-center justify-center shrink-0 group-hover:border-${l.color}-500 transition-colors shadow-lg">
                        <span class="w-1.5 h-1.5 rounded-full bg-${l.color === 'emerald' ? 'emerald-500' : l.color === 'amber' ? 'amber-500' : 'blue-500'}"></span>
                    </div>
                    <div>
                        <p class="text-xs font-black text-white uppercase tracking-tighter">${l.label}</p>
                        <p class="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">${l.body}</p>
                        <p class="text-[8px] text-slate-600 font-black uppercase tracking-widest mt-2">${new Date(l.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                </div>
            `).join('');
        };

        window.dashApprove = async (id, status) => {
            const { error } = await db.from('requests').update({ status }).eq('id', id);
            if (!error) {
                if (window.showToast) window.showToast(`Appeal ${status} successfully`, 'success');
                renderAll();
            } else {
                alert('Action failed: ' + error.message);
            }
        };

        window.initializeAlert = () => {
            if (confirm('Broadcast emergency alert to all donors via Mass Alert System?')) {
                if (window.showToast) window.showToast('MASS ALERT DISPATCHED TO ALL DONORS', 'alert');
            }
        };

        await renderAll();

        // Set up real-time listener (Polling for MSSQL)
        if (window._dashSub) {
            clearInterval(window._dashSub);
            window._dashSub = null;
        }
        window._dashSub = setInterval(() => {
            renderAll();
        }, 5000);
    }
};


