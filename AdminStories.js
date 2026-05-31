import { db } from '../js/db.js';

export const AdminStories = {
    render: () => {
        return `
        <div class="flex min-h-screen bg-[#f8fafc]">
            ${window.AdminSidebar()}

            <main class="flex-1 p-10 pt-20 max-w-7xl mx-auto space-y-12 relative">
                <header class="animate-fade-in flex justify-between items-end">
                    <div>
                        <p class="text-[10px] font-black text-[#af101a] uppercase tracking-[0.4em] mb-2">Impact Verification</p>
                        <h1 class="text-6xl font-black text-slate-900 font-outfit tracking-tighter uppercase leading-none">Story <span class="text-slate-200">Curation</span></h1>
                        <p class="text-slate-400 font-bold text-sm mt-4 uppercase tracking-widest leading-relaxed">Review and approve donor impact journeys to inspire the network.</p>
                    </div>
                </header>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8" id="stories-grid">
                    <!-- Stories will be injected here -->
                </div>

                <div id="no-stories" class="hidden bg-white p-20 rounded-[48px] border border-dashed border-slate-200 text-center">
                    <div class="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <span class="material-symbols-outlined text-4xl text-slate-300">auto_stories</span>
                    </div>
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">All journeys curated — No pending stories</p>
                </div>
            </main>
        </div>
        `;
    },
    afterRender: async () => {
        const renderStories = async () => {
            const grid = document.getElementById('stories-grid');
            const empty = document.getElementById('no-stories');

            grid.innerHTML = '<div class="col-span-full text-center py-20 opacity-50 uppercase tracking-widest text-xs animate-pulse">Scanning Grid...</div>';

            try {
                const { data: stories, error } = await db
                    .from('stories')
                    .select('*')
                    .eq('status', 'Pending')
                    .order('created_at', { ascending: false });
                
                if (error) throw error;

                if (stories.length === 0) {
                    grid.innerHTML = '';
                    empty.classList.remove('hidden');
                    return;
                }

                empty.classList.add('hidden');
                grid.innerHTML = stories.map(s => `
                    <div class="bg-white rounded-[48px] border border-slate-100 p-12 space-y-8 group hover:shadow-2xl hover:shadow-slate-200/50 transition-all relative overflow-hidden">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-5">
                                <div class="w-16 h-16 rounded-[24px] overflow-hidden border-4 border-slate-50 shadow-sm">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${s.author_name}" class="w-full h-full object-cover">
                                </div>
                                <div>
                                    <h3 class="text-slate-900 font-black uppercase tracking-tighter text-lg">${s.author_name}</h3>
                                    <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest">${new Date(s.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <span class="px-5 py-2 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest border border-amber-100">Verification Pending</span>
                        </div>
                        
                        <div class="relative">
                            <span class="material-symbols-outlined absolute -left-6 -top-6 text-slate-100 text-6xl -z-0">format_quote</span>
                            <p class="text-slate-600 text-sm leading-relaxed font-medium relative z-10">${s.content}</p>
                        </div>

                        <div class="flex gap-4 pt-4 relative z-10">
                            <button onclick="window.manageStory('${s.id}', 'Approved')" class="flex-1 bg-emerald-500 text-white py-5 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:scale-[1.02] transition-all active:scale-95 shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2">
                                <span class="material-symbols-outlined text-sm">verified</span> Approve Journey
                            </button>
                            <button onclick="window.manageStory('${s.id}', 'Rejected')" class="px-8 bg-slate-50 text-slate-400 py-5 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all active:scale-95 flex items-center justify-center gap-2">
                                <span class="material-symbols-outlined text-sm">delete</span>
                            </button>
                        </div>
                    </div>
                `).join('');
            } catch (err) {
                grid.innerHTML = '<div class="col-span-full text-red-500 text-center py-20 uppercase font-black text-xs">Sync Failure</div>';
            }
        };

        window.manageStory = async (id, status) => {
            const { error } = await db.from('stories').update({ status }).eq('id', id);
            if (!error) {
                alert(`Story ${status}! Network updated.`);
                renderStories();
            }
        };

        await renderStories();

        // Real-time Subscription (Polling for MSSQL)
        if (window._storiesSub) {
            clearInterval(window._storiesSub);
            window._storiesSub = null;
        }
        window._storiesSub = setInterval(() => {
            renderStories();
        }, 15000);
    }
};


