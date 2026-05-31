export const MyStories = {
    render: () => {
        return `
        <div class="flex min-h-screen bg-[#f8fafc]">
            ${window.AdminSidebar()}
            <main class="flex-1 p-10 pt-28 max-w-6xl mx-auto">
                <header class="mb-12 flex justify-between items-end animate-fade-in">
                    <div>
                        <p class="text-[10px] font-black text-[#af101a] uppercase tracking-[0.4em] mb-2">Personal Archive</p>
                        <h1 class="text-5xl font-black text-slate-900 font-outfit uppercase tracking-tighter">My <span class="text-slate-300">Stories</span></h1>
                    </div>
                    <button onclick="window.goToPanel()" class="px-8 py-3 bg-white border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2">
                        <span class="material-symbols-outlined text-sm">add_circle</span>
                        Share New
                    </button>
                </header>

                <div id="stories-empty" class="hidden bg-white rounded-[48px] p-20 border border-slate-100 text-center shadow-sm">
                    <div class="w-24 h-24 bg-red-50 text-[#af101a] rounded-full flex items-center justify-center mx-auto mb-8">
                        <span class="material-symbols-outlined text-4xl">history_edu</span>
                    </div>
                    <h2 class="text-2xl font-black text-slate-900 font-outfit uppercase tracking-tight mb-4">No Stories Found</h2>
                    <p class="text-slate-400 text-sm max-w-xs mx-auto font-medium leading-relaxed">You haven't shared any journeys yet. Your memories help inspire others to donate.</p>
                </div>

                <div id="stories-list" class="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up">
                    <!-- Stories will be rendered here -->
                </div>
            </main>
        </div>
        `;
    },
    afterRender: () => {
        const STORIES_KEY = 'bloodpulse_stories';
        
        const render = () => {
            const list = document.getElementById('stories-list');
            const empty = document.getElementById('stories-empty');
            const user = JSON.parse(localStorage.getItem('bloodpulse_user') || '{}');
            const allStories = JSON.parse(localStorage.getItem(STORIES_KEY) || '[]');
            
            // Filter only this user's stories
            const stories = allStories.filter(s => s.author === (user.full_name || 'Donor'));

            if (stories.length === 0) {
                if (empty) empty.classList.remove('hidden');
                if (list) list.innerHTML = '';
                return;
            }

            if (empty) empty.classList.add('hidden');
            if (list) {
                list.innerHTML = stories.map(s => `
                    <div class="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm group hover:shadow-xl transition-all duration-500">
                        ${s.image ? `
                            <div class="h-48 overflow-hidden">
                                <img src="${s.image}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                            </div>
                        ` : `
                            <div class="h-32 bg-red-50 flex items-center justify-center">
                                <span class="material-symbols-outlined text-red-200 text-5xl italic opacity-10">water_drop</span>
                            </div>
                        `}
                        <div class="p-8">
                            <div class="flex justify-between items-start mb-6">
                                <span class="px-3 py-1 bg-slate-50 text-[9px] font-black text-slate-400 rounded-full uppercase tracking-widest border border-slate-100">
                                    ${new Date(s.date).toLocaleDateString('en-GB')}
                                </span>
                                <button onclick="window.deleteStory(${s.id})" class="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                    <span class="material-symbols-outlined text-sm">delete</span>
                                </button>
                            </div>
                            <p class="text-slate-600 font-medium italic leading-relaxed mb-4">"${s.content}"</p>
                        </div>
                    </div>
                `).join('');
            }
        };

        window.deleteStory = (id) => {
            if (confirm('Permanently delete this story?')) {
                const stories = JSON.parse(localStorage.getItem(STORIES_KEY) || '[]');
                const filtered = stories.filter(s => s.id !== id);
                localStorage.setItem(STORIES_KEY, JSON.stringify(filtered));
                render();
            }
        };

        render();
    }
};


