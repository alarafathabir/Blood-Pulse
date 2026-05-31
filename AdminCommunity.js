import { db } from '../js/db.js';

export const AdminCommunity = {
    render: () => {
        const sidebar = window.AdminSidebar ? window.AdminSidebar('/admin-community') : '';
        return `
        <div class="flex min-h-screen bg-slate-900">
            ${sidebar}

            <main class="flex-1 p-10 pt-20 max-w-7xl mx-auto space-y-12 relative">
                <div class="fixed top-0 right-0 w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>
                
                <header class="animate-fade-in flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <p class="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-2">Engagement Hub</p>
                        <h1 class="text-6xl font-black text-white font-outfit tracking-tighter uppercase leading-none">Community <span class="text-emerald-500">Culture</span></h1>
                        <p class="text-slate-500 font-bold text-sm mt-4 uppercase tracking-widest leading-relaxed">Orchestrate the local blood donation movement and manage leadership</p>
                    </div>
                    <button onclick="window.addCommunityMember()" class="px-8 py-5 bg-emerald-500 text-white rounded-[32px] font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-4">
                        <span class="material-symbols-outlined text-xl">person_add</span>
                        Register New Leader
                    </button>
                </header>

                <!-- Statistics Overview (Live from DB) -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up">
                    <div class="bg-slate-800/50 p-10 rounded-[48px] border border-slate-700/50 text-center group hover:border-white/20 transition-all">
                        <p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-3 group-hover:text-white transition-colors">Total Network</p>
                        <p class="text-4xl font-black text-white font-outfit" id="comm-total">...</p>
                    </div>
                    <div class="bg-slate-800/50 p-10 rounded-[48px] border border-slate-700/50 text-center group hover:border-emerald-500/20 transition-all">
                        <p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-3 group-hover:text-emerald-500 transition-colors">Verified Leaders</p>
                        <p class="text-4xl font-black text-emerald-500 font-outfit" id="comm-leaders">...</p>
                    </div>
                    <div class="bg-slate-800/50 p-10 rounded-[48px] border border-slate-700/50 text-center group hover:border-amber-500/20 transition-all">
                        <p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-3 group-hover:text-amber-500 transition-colors">Home Page</p>
                        <p class="text-xl font-black uppercase tracking-widest mt-2 font-outfit" id="comm-homepage">...</p>
                    </div>
                    <div class="bg-slate-800/50 p-10 rounded-[48px] border border-slate-700/50 text-center group hover:border-blue-500/20 transition-all">
                        <p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-3 group-hover:text-blue-500 transition-colors">Global Reach</p>
                        <p class="text-xl font-black text-blue-500 uppercase tracking-widest mt-2 font-outfit" id="comm-reach">...</p>
                    </div>
                </div>

                <div class="space-y-8 animate-slide-up">
                    <div class="flex items-center justify-between px-6 border-l-4 border-emerald-500">
                        <div>
                            <h2 class="text-2xl font-black text-white uppercase tracking-tighter">Executive Committee</h2>
                            <p class="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mt-1">Management of official leadership profiles appearing on the public portal</p>
                        </div>
                    </div>
                    
                    <div id="committee-loading" class="flex justify-center py-20">
                        <div class="flex flex-col items-center gap-4 opacity-30">
                            <div class="w-10 h-10 border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin"></div>
                            <p class="text-[9px] font-black text-white uppercase tracking-[0.5em]">Syncing Registry...</p>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="committee-grid"></div>
                </div>
            </main>

            <!-- Add Leader Modal -->
            <div id="leader-modal" class="fixed inset-0 z-[1000] hidden flex items-center justify-center p-4">
                <div class="absolute inset-0 bg-slate-900/90 backdrop-blur-2xl" onclick="window.closeLeaderModal()"></div>
                <div class="bg-slate-800 w-full max-w-xl rounded-[64px] border border-slate-700 shadow-2xl relative z-10 p-12 overflow-hidden">
                    <div class="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    
                    <div class="relative z-10">
                        <h2 class="text-4xl font-black text-white uppercase tracking-tighter mb-4">Executive <span class="text-emerald-500">Registry</span></h2>
                        <p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-10 leading-relaxed">This leader will be instantly visible on the <span class="text-emerald-500">Public Community Portal</span></p>
                        
                        <form id="leader-form" class="space-y-6">
                            <div class="space-y-3">
                                <label class="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6">Full Name</label>
                                <input id="leader-name" placeholder="E.g. Nasim Uddin Shawrab" class="w-full bg-slate-900 p-6 rounded-[32px] border border-slate-700 text-white text-sm font-bold outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-700" required>
                            </div>
                            <div class="space-y-3">
                                <label class="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6">Designation / Role</label>
                                <input id="leader-role" placeholder="E.g. Club President" class="w-full bg-slate-900 p-6 rounded-[32px] border border-slate-700 text-white text-sm font-bold outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-700" required>
                            </div>
                            <div class="space-y-3">
                                <label class="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6">Profile Image URL</label>
                                <input id="leader-image" placeholder="Paste link to profile photo" class="w-full bg-slate-900 p-6 rounded-[32px] border border-slate-700 text-white text-sm font-bold outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-700">
                            </div>
                            <div class="pt-4 flex gap-4">
                                <button type="button" onclick="window.closeLeaderModal()" class="flex-1 py-6 bg-slate-700/30 text-slate-400 rounded-[32px] font-black text-[10px] uppercase tracking-widest hover:bg-slate-700 transition-all">Cancel</button>
                                <button type="submit" id="submit-leader-btn" class="flex-[2] py-6 bg-emerald-500 text-white rounded-[32px] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3">
                                    <span class="material-symbols-outlined">verified</span>
                                    Commit Registry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        `;
    },
    afterRender: async () => {
        const render = async () => {
            const loading = document.getElementById('committee-loading');
            const commGrid = document.getElementById('committee-grid');
            
            // Stats Elements
            const totalEl = document.getElementById('comm-total');
            const leadersEl = document.getElementById('comm-leaders');
            const homePageEl = document.getElementById('comm-homepage');
            const reachEl = document.getElementById('comm-reach');

            try {
                // 1. Fetch Real-time Stats from MSSQL
                const { data: profileStats } = await db.from('profiles').select('count');
                const memberCount = profileStats && profileStats[0] ? profileStats[0].count : 0;
                if (totalEl) totalEl.textContent = memberCount.toLocaleString();

                const { data: leaderStats } = await db.from('committee').select('count');
                const leaderCount = leaderStats && leaderStats[0] ? leaderStats[0].count : 0;
                if (leadersEl) leadersEl.textContent = leaderCount;

                // 2. Fetch Registry Data
                const { data: committee, error } = await db
                    .from('committee')
                    .select('*')
                    .order('created_at', { ascending: true });

                const { data: settings } = await db.from('platform_settings').select('*').eq('id', 'config').single();

                if (homePageEl && settings) {
                    homePageEl.textContent = settings.emergency_mode ? 'Critical' : 'Live';
                    homePageEl.className = `text-xl font-black uppercase tracking-widest mt-2 font-outfit ${settings.emergency_mode ? 'text-red-500' : 'text-amber-500'}`;
                }
                if (reachEl && settings) {
                    reachEl.textContent = settings.address ? settings.address.split(',').pop().trim() : 'District Wide';
                }

                if (loading) loading.classList.add('hidden');

                if (error) throw error;

                const members = committee || [];
                
                if (commGrid) {
                    if (members.length === 0) {
                        commGrid.innerHTML = '<div class="col-span-full py-24 border-2 border-dashed border-slate-800 rounded-[64px] text-center text-slate-700 text-[10px] font-black uppercase tracking-[0.5em]">Registry Is Empty</div>';
                    } else {
                        commGrid.innerHTML = members.map(m => `
                            <div class="bg-slate-800/40 p-10 rounded-[64px] border border-slate-700/50 group hover:border-emerald-500/30 transition-all duration-700 text-center space-y-8 relative overflow-hidden backdrop-blur-sm">
                                <div class="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full group-hover:bg-emerald-500/10 transition-all"></div>
                                
                                <div class="relative">
                                    <img src="${m.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=10b981&color=fff`}" 
                                         class="w-32 h-32 rounded-[48px] mx-auto border-4 border-slate-700 group-hover:border-emerald-500/20 transition-all object-cover shadow-2xl"
                                         onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=10b981&color=fff'">
                                    <div class="absolute -bottom-2 right-1/2 translate-x-1/2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-slate-800 flex items-center justify-center">
                                        <span class="material-symbols-outlined text-white text-[14px]">verified</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 class="text-white font-black uppercase tracking-tighter text-xl leading-none mb-3">${m.name}</h3>
                                    <p class="text-[10px] font-black text-emerald-500/60 uppercase tracking-[0.3em]">${m.role}</p>
                                </div>

                                <div class="flex flex-col gap-3 pt-4 border-t border-slate-700/30">
                                    <div class="px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-full text-[9px] font-black text-emerald-500/80 uppercase tracking-widest">Global visibility active</div>
                                    <button onclick="window.removeMember('${m.id}')" class="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] hover:text-red-500 transition-colors py-2">Deregister Leader</button>
                                </div>
                            </div>
                        `).join('');
                    }
                }
            } catch (err) {
                console.error('Community Admin Sync Error:', err);
                if (commGrid) commGrid.innerHTML = '<div class="col-span-full text-center text-red-500/50 text-[10px] font-black uppercase tracking-widest py-20">Database Synchronization Failure</div>';
            }
        };

        window.addCommunityMember = () => {
            document.getElementById('leader-modal')?.classList.remove('hidden');
            document.getElementById('leader-name').value = '';
            document.getElementById('leader-role').value = '';
            document.getElementById('leader-image').value = '';
        };
        
        window.closeLeaderModal = () => document.getElementById('leader-modal')?.classList.add('hidden');

        const form = document.getElementById('leader-form');
        if (form) {
            form.onsubmit = async (e) => {
                e.preventDefault();
                const btn = document.getElementById('submit-leader-btn');
                const originalText = btn.innerHTML;
                
                btn.innerHTML = '<span class="material-symbols-outlined animate-spin text-sm">sync</span> Processing...';
                btn.disabled = true;

                const name = document.getElementById('leader-name').value.trim();
                const role = document.getElementById('leader-role').value.trim();
                const imageUrl = document.getElementById('leader-image').value.trim();

                const { error } = await db.from('committee').insert({
                    name,
                    role,
                    image_url: imageUrl || null
                });

                if (error) {
                    alert('Registry commit failed: ' + error.message);
                } else {
                    window.closeLeaderModal();
                    await render();
                }

                btn.innerHTML = originalText;
                btn.disabled = false;
            };
        }

        window.removeMember = async (id) => {
            if (!confirm('Permanently deregister this leader from the official registry?')) return;
            const { error } = await db.from('committee').delete().eq('id', id);
            if (error) {
                alert('Deregistration failed: ' + error.message);
            } else {
                await render();
            }
        };

        await render();

        // Real-time Pulse (MSSQL Synchronization)
        if (window._adminCommSub) clearInterval(window._adminCommSub);
        window._adminCommSub = setInterval(render, 15000);
    }
};


