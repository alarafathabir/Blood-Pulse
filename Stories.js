export const Stories = {
    render: () => `
        <div class="bg-slate-50 min-h-screen flex flex-col">
            ${window.PublicNavbar()}

            <main class="flex-1 w-full max-w-7xl mx-auto px-6 py-16">
                <div class="text-center mb-16">
                    <div class="inline-block px-4 py-1 bg-red-50 text-[#af101a] text-[10px] font-black rounded-full uppercase tracking-[0.3em] mb-4">Voices of Life</div>
                    <h1 class="text-5xl font-black text-[#86000d] font-outfit tracking-tighter mb-4">Donor & Recipient Stories</h1>
                    <p class="text-slate-500 max-w-2xl mx-auto font-medium">Real experiences from our BAUST community heroes.</p>
                </div>

                <div id="stories-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div class="col-span-full py-20 flex flex-col items-center justify-center opacity-20">
                        <span class="material-symbols-outlined text-4xl animate-spin text-[#af101a]">sync</span>
                    </div>
                </div>
            </main>

            ${window.GlobalFooter()}
        </div>
    `,
    afterRender: async () => {
        const grid = document.getElementById('stories-grid');
        if (!grid) return;

        try {
            const { data: stories, error } = await db
                .from('stories')
                .select('*')
                .eq('status', 'Approved')
                .order('created_at', { ascending: false });

            if (error || !stories || stories.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full py-24 text-center bg-white rounded-[60px] border-2 border-dashed border-slate-100 shadow-sm">
                        <span class="material-symbols-outlined text-5xl text-slate-200 mb-4">auto_stories</span>
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">No success stories published yet</p>
                    </div>
                `;
                return;
            }

            grid.innerHTML = stories.map(s => `
                <div class="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                    <div class="h-56 overflow-hidden bg-slate-100">
                        <img src="${s.image_url || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600'}" 
                             class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div class="p-10 space-y-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center overflow-hidden border border-white">
                                <img src="${s.author_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(s.author_name)}&background=af101a&color=fff`}" />
                            </div>
                            <div>
                                <h4 class="font-black text-slate-900 text-sm tracking-tighter">${s.author_name}</h4>
                                <p class="text-[9px] text-slate-400 font-black uppercase tracking-widest">${s.location || 'Donor'}</p>
                            </div>
                        </div>
                        <h3 class="text-xl font-black text-slate-900 font-outfit leading-tight tracking-tight">${s.title || 'Saving a Life'}</h3>
                        <p class="text-xs text-slate-500 leading-relaxed font-medium">
                            "${s.content}"
                        </p>
                    </div>
                </div>
            `).join('') + `
                <div onclick="window.goToPanel()" class="bg-[#af101a] rounded-[40px] p-10 flex flex-col items-center justify-center text-center text-white shadow-xl hover:scale-[1.02] transition-all cursor-pointer group">
                    <div class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                        <span class="material-symbols-outlined text-3xl">edit_square</span>
                    </div>
                    <h3 class="text-2xl font-black font-outfit mb-4 uppercase tracking-tighter">Share Your Story</h3>
                    <p class="text-xs opacity-70 mb-8 font-bold uppercase tracking-widest">Help inspire others with your journey.</p>
                    <button class="px-8 py-3 bg-white text-[#af101a] rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg">Submit Now</button>
                </div>
            `;
        } catch (err) {
            console.error('Stories Fetch Error:', err);
        }
    }
};


