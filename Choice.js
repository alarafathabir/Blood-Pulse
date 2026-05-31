export const Choice = {
    render: () => `
        <div class="min-h-screen bg-[#f8fafc] font-inter flex flex-col justify-center items-center px-6 relative overflow-hidden">
            <!-- Decorative Background Elements -->
            <div class="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#af101a]/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
            <div class="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full -z-10 animate-pulse" style="animation-delay: 2s"></div>

            <div class="max-w-4xl w-full text-center space-y-16 relative z-10">
                <div class="space-y-6 animate-fade-in flex flex-col items-center">
                    <div class="inline-flex items-center gap-3 px-4 py-2 bg-[#af101a]/10 border border-[#af101a]/20 rounded-full mb-4">
                        <span class="w-2 h-2 rounded-full bg-[#af101a] animate-pulse"></span>
                        <span class="text-[9px] font-black uppercase tracking-[0.4em] text-[#af101a]">Authentication Verified</span>
                    </div>
                    <h1 class="text-6xl md:text-8xl font-black text-slate-900 font-outfit uppercase tracking-tighter leading-none">Your <span class="text-slate-300">Choice</span></h1>
                    <p class="text-slate-400 font-bold uppercase tracking-widest text-[10px]">What would you like to explore today?</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-10 animate-slide-up">
                    <!-- Option 1: Search -->
                    <div onclick="goTo('/search')" class="bg-white rounded-[56px] p-12 border border-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group text-center flex flex-col items-center">
                        <div class="w-24 h-24 rounded-3xl bg-red-50 flex items-center justify-center text-[#af101a] mb-10 group-hover:bg-[#af101a] group-hover:text-white transition-all duration-500 shadow-sm border border-red-100">
                            <span class="material-symbols-outlined text-5xl">person_search</span>
                        </div>
                        <h2 class="text-3xl font-black text-slate-900 font-outfit uppercase tracking-tighter mb-4">Find Donors</h2>
                        <p class="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">Access the real-time radar and scan the community for life-savers.</p>
                        <div class="mt-10 flex items-center gap-2 text-[#af101a] font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                            Scan Network <span class="material-symbols-outlined text-sm">radar</span>
                        </div>
                    </div>

                    <!-- Option 2: Panel -->
                    <div onclick="window.goToPanel()" class="bg-slate-900 rounded-[56px] p-12 shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group text-center flex flex-col items-center border border-white/5 relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-48 h-48 bg-[#af101a]/20 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-[#af101a]/40 transition-all"></div>
                        <div class="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-10 group-hover:bg-white group-hover:text-slate-900 transition-all duration-500">
                            <span class="material-symbols-outlined text-5xl">dashboard_customize</span>
                        </div>
                        <h2 class="text-3xl font-black text-white font-outfit uppercase tracking-tighter mb-4">My Dashboard</h2>
                        <p class="text-[11px] text-white/40 font-bold uppercase tracking-widest leading-relaxed">Manage your donor profile, post emergency appeals, and share stories.</p>
                        <div class="mt-10 flex items-center gap-2 text-[#af101a] font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                            Open Panel <span class="material-symbols-outlined text-sm">dock</span>
                        </div>
                    </div>
                </div>

                <div class="pt-8 animate-fade-in" style="animation-delay: 0.5s">
                    <button onclick="handleLogout()" class="px-8 py-4 text-[9px] font-black text-slate-400 border border-slate-200 rounded-full uppercase tracking-[0.3em] hover:bg-slate-100 hover:text-[#af101a] transition-all">Terminate Session</button>
                </div>
            </div>
        </div>
    `,
    afterRender: () => {
        const token = localStorage.getItem('bloodpulse_token');
        if (!token) window.goTo('/login');
    }
};


