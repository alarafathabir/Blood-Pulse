import { db } from '../js/db.js';

export const Community = {
    render: () => {
        return `
        <div class="font-inter antialiased min-h-screen w-full overflow-x-hidden bg-[#fbf9f8] text-slate-900 relative">
            ${window.PublicNavbar()}
            
            <!-- Dynamic Background Elements -->
            <div class="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
                <div class="absolute top-0 right-0 w-[50%] h-[50%] bg-[#af101a]/5 blur-[150px] rounded-full animate-pulse"></div>
                <div class="absolute bottom-0 left-0 w-[40%] h-[40%] bg-emerald-500/5 blur-[150px] rounded-full"></div>
            </div>

            <main class="max-w-7xl mx-auto px-6 pt-40 pb-32 space-y-32 relative z-10">
                
                <!-- Premium Hero Section (Light Theme) -->
                <header class="animate-fade-in text-center relative">
                    <div class="inline-flex items-center gap-3 px-4 py-2 bg-[#af101a]/5 border border-[#af101a]/10 rounded-full mb-8">
                        <span class="w-2 h-2 rounded-full bg-[#af101a] animate-pulse"></span>
                        <span class="text-[10px] font-black uppercase tracking-[0.5em] text-[#af101a]">Community Infrastructure</span>
                    </div>
                    <h1 class="text-7xl md:text-9xl font-black text-[#86000d] font-outfit uppercase tracking-tighter leading-[0.85] mb-8">Our <span class="text-slate-300">Network</span></h1>
                    <p class="text-slate-500 font-bold text-sm md:text-base max-w-2xl mx-auto uppercase tracking-[0.2em] leading-relaxed">Cultivating a resilient blood donation culture through regional leadership and technological excellence.</p>
                </header>

                <!-- Premium Statistics Hub (Light Theme) -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up">
                    <div class="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl shadow-slate-200/50 text-center group hover:border-[#af101a]/20 transition-all duration-500">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 group-hover:text-[#af101a] transition-colors">Total Network</p>
                        <p class="text-5xl font-black text-slate-900 font-outfit" id="comm-total">...</p>
                    </div>
                    <div class="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl shadow-slate-200/50 text-center group hover:border-emerald-500/20 transition-all duration-500">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 group-hover:text-emerald-500 transition-colors">Verified Leaders</p>
                        <p class="text-5xl font-black text-emerald-600 font-outfit" id="comm-leaders">...</p>
                    </div>
                    <div class="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl shadow-slate-200/50 text-center group hover:border-amber-500/20 transition-all duration-500">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 group-hover:text-amber-500 transition-colors">Home Page</p>
                        <p class="text-2xl font-black uppercase tracking-widest mt-2 font-outfit text-amber-600" id="comm-status">...</p>
                    </div>
                    <div class="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl shadow-slate-200/50 text-center group hover:border-blue-500/20 transition-all duration-500">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 group-hover:text-blue-500 transition-colors">Global Reach</p>
                        <p class="text-2xl font-black text-blue-600 uppercase tracking-widest mt-2 font-outfit" id="comm-reach">...</p>
                    </div>
                </div>

                <!-- Executive Registry -->
                <div class="space-y-16 animate-slide-up">
                    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-8 border-[#af101a] pl-8">
                        <div>
                            <h2 class="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">Executive <span class="text-slate-300">Board</span></h2>
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-4">Official leadership managing the BAUST blood donation infrastructure</p>
                        </div>
                    </div>
                    
                    <div id="committee-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <!-- Committee injected here via database -->
                        <div class="col-span-full py-32 text-center">
                            <div class="w-12 h-12 border-4 border-slate-100 border-t-[#af101a] rounded-full animate-spin mx-auto mb-6"></div>
                            <p class="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Synchronizing Registry...</p>
                        </div>
                    </div>
                </div>

                <!-- Premium Mission Statement (Light Theme) -->
                <section class="bg-white p-20 rounded-[80px] border border-[#ffdad6] shadow-2xl shadow-red-900/5 relative overflow-hidden group">
                    <div class="absolute top-0 right-0 w-96 h-96 bg-[#af101a]/5 rounded-full blur-[100px] -mr-48 -mt-48 transition-all group-hover:bg-[#af101a]/10 duration-1000"></div>
                    <div class="relative z-10 max-w-3xl space-y-8">
                        <h2 class="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">Building a <span class="text-[#af101a] italic text-4xl block md:inline mt-2 md:mt-0">Legacy of Care</span></h2>
                        <p class="text-slate-600 font-bold text-lg leading-relaxed">Blood Pulse is the standard for institutional blood donation management. We bridge the gap between medical urgency and community readiness by providing a verified, high-trust ecosystem for every patient and donor.</p>
                        <div class="pt-8 flex flex-wrap gap-12">
                            <div class="space-y-2">
                                <p class="text-3xl font-black text-[#af101a] font-outfit">24/7</p>
                                <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Critical Support</p>
                            </div>
                            <div class="w-px h-12 bg-slate-100 hidden md:block"></div>
                            <div class="space-y-2">
                                <p class="text-3xl font-black text-[#af101a] font-outfit">Verified</p>
                                <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Identity Check</p>
                            </div>
                            <div class="w-px h-12 bg-slate-100 hidden md:block"></div>
                            <div class="space-y-2">
                                <p class="text-3xl font-black text-[#af101a] font-outfit">Real-Time</p>
                                <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Network Pulse</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            ${window.GlobalFooter()}
        </div>
        `;
    },
    afterRender: async () => {
        const renderData = async () => {
            const grid = document.getElementById('committee-grid');
            const totalEl = document.getElementById('comm-total');
            const leadersEl = document.getElementById('comm-leaders');
            const statusEl = document.getElementById('comm-status');
            const reachEl = document.getElementById('comm-reach');

            try {
                // 1. Fetch Real-time Statistics from MSSQL
                const { data: profileStats } = await db.from('profiles').select('count');
                const memberCount = profileStats && profileStats[0] ? profileStats[0].count : 0;
                if (totalEl) totalEl.textContent = memberCount.toLocaleString();

                const { data: leaderStats } = await db.from('committee').select('count');
                const leaderCount = leaderStats && leaderStats[0] ? leaderStats[0].count : 0;
                if (leadersEl) leadersEl.textContent = leaderCount;

                // 2. Fetch Platform Configuration
                const { data: settings } = await db.from('platform_settings').select('*').eq('id', 'config').single();
                if (statusEl && settings) {
                    statusEl.textContent = settings.emergency_mode ? 'Critical' : 'Live';
                    statusEl.className = `text-2xl font-black uppercase tracking-widest mt-2 font-outfit ${settings.emergency_mode ? 'text-red-600' : 'text-amber-600'}`;
                }
                if (reachEl && settings) {
                    reachEl.textContent = settings.address ? settings.address.split(',').pop().trim() : 'District Wide';
                }

                // 3. Fetch Committee Registry
                const { data: members, error } = await db.from('committee').select('*').order('created_at', { ascending: true });
                if (error) throw error;

                if (grid) {
                    if (members && members.length > 0) {
                        grid.innerHTML = members.map(m => `
                            <div class="bg-white p-12 rounded-[64px] border border-slate-100 text-center space-y-8 group hover:border-[#af101a]/20 hover:shadow-2xl hover:shadow-[#af101a]/5 transition-all duration-700 relative overflow-hidden">
                                <div class="absolute top-0 right-0 w-24 h-24 bg-[#af101a]/5 rounded-bl-full group-hover:bg-[#af101a]/10 transition-all"></div>
                                
                                <div class="relative">
                                    <img src="${m.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=af101a&color=fff`}" 
                                         class="w-32 h-32 rounded-[48px] mx-auto border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-500 object-cover">
                                    <div class="absolute -bottom-2 right-1/2 translate-x-1/2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                                        <span class="material-symbols-outlined text-white text-[14px]">verified</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 class="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-3">${m.name}</h3>
                                    <p class="text-[10px] font-black text-[#af101a]/60 uppercase tracking-[0.4em]">${m.role}</p>
                                </div>
                                
                                <div class="pt-4 flex justify-center">
                                    <div class="px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-[9px] font-black text-emerald-600 uppercase tracking-widest">Verified Leadership</div>
                                </div>
                            </div>
                        `).join('');
                    } else {
                        grid.innerHTML = '<div class="col-span-full py-32 text-center opacity-30 uppercase tracking-[0.5em] text-[10px] font-black border-2 border-dashed border-slate-100 rounded-[80px]">Board Data Sync Pending</div>';
                    }
                }
            } catch (err) {
                console.error('Community Sync Error:', err);
            }
        };

        await renderData();

        // Real-time Polling for MSSQL Synchronization
        if (window._commSub) clearInterval(window._commSub);
        window._commSub = setInterval(renderData, 20000);
    }
};


