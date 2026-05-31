export const MyHistory = {
    render: () => `
        <div class="min-h-screen bg-[#fff5f5] pb-32 relative overflow-hidden">
            ${window.UserNavbar()}
            <!-- Decorative Background Orbs -->
            <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ffdad6] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 -z-10 translate-x-1/3 -translate-y-1/3"></div>
            <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ffe4e4] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 -z-10 -translate-x-1/3 translate-y-1/3"></div>

            <!-- Header Section -->
            <div class="py-12 px-6">
                <div class="max-w-4xl mx-auto text-center animate-fade-in">
                    <p class="text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-2">
                        <span class="w-10 h-0.5 bg-emerald-600"></span> YOUR IMPACT
                    </p>
                    <h1 class="text-6xl md:text-8xl font-black font-outfit uppercase tracking-tighter leading-none text-[#271816]">Donation <span class="text-emerald-600/20">Log</span></h1>
                </div>
            </div>

            <!-- History List -->
            <div class="max-w-4xl mx-auto px-6 relative z-20 animate-slide-up" style="animation-delay: 0.2s">
                <div id="history-full-list" class="space-y-6">
                    <!-- History cards injected here -->
                </div>

                <!-- Empty State -->
                <div id="full-history-empty" class="hidden py-32 text-center bg-white/20 rounded-[48px] border border-dashed border-slate-200">
                    <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span class="material-symbols-outlined text-4xl text-slate-200">history_edu</span>
                    </div>
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">No donation records found in your journey</p>
                </div>
            </div>

            ${window.UserFloatingActions()}
        </div>
    `,
    afterRender: () => {
        const list = document.getElementById('history-full-list');
        const empty = document.getElementById('full-history-empty');

        // Mock data
        const data = [
            { id: 1, date: '2023-12-15', location: 'Apollo Hospitals', bags: 1, impact: '3 lives saved', type: 'Whole Blood', health_status: 'Perfect' },
            { id: 2, date: '2023-08-20', location: 'Red Crescent Center', bags: 1, impact: '1 life saved', type: 'Platelets', health_status: 'Good' },
            { id: 3, date: '2023-04-10', location: 'City Blood Bank', bags: 1, impact: '3 lives saved', type: 'Whole Blood', health_status: 'Perfect' }
        ];

        if (!data.length) {
            empty.classList.remove('hidden');
            list.innerHTML = '';
            return;
        }

        empty.classList.add('hidden');
        list.innerHTML = data.map((item, index) => `
            <div class="bg-white/70 backdrop-blur-xl rounded-[48px] p-8 md:p-12 border border-white shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden animate-slide-up" style="animation-delay: ${0.1 * index}s">
                <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-emerald-100/50 transition-colors"></div>
                
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                    <div class="flex items-center gap-8">
                        <div class="w-20 h-20 rounded-[32px] bg-emerald-600 text-white flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                            <span class="material-symbols-outlined text-4xl">done_all</span>
                        </div>
                        <div>
                            <div class="flex items-center gap-3 mb-1">
                                <h3 class="text-2xl font-black text-[#271816] font-outfit uppercase tracking-tighter">${item.location}</h3>
                                <span class="px-3 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded-full uppercase tracking-widest border border-emerald-100">${item.type}</span>
                            </div>
                            <p class="text-xs font-black text-slate-400 uppercase tracking-widest">${item.date}</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-12 border-l border-slate-100 pl-8 md:border-l-0 md:pl-0">
                        <div class="text-center">
                            <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Health Status</p>
                            <p class="text-sm font-black text-emerald-600 uppercase">${item.health_status}</p>
                        </div>
                        <div class="text-center">
                            <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Impact Created</p>
                            <p class="text-sm font-black text-[#271816] uppercase">${item.impact}</p>
                        </div>
                        <button class="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-[#271816] hover:text-white transition-all flex items-center justify-center">
                            <span class="material-symbols-outlined">workspace_premium</span>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
};


