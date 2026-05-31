export const News = {
    render: () => `
        <div class="bg-slate-50 min-h-screen flex flex-col">
            ${window.PublicNavbar()}

            <main class="flex-1 w-full max-w-7xl mx-auto px-6 py-16">
                <div class="text-center mb-16">
                    <div class="inline-block px-4 py-1 bg-red-50 text-[#af101a] text-[10px] font-black rounded-full uppercase tracking-[0.3em] mb-4">Global Watch</div>
                    <h1 class="text-5xl font-black text-[#86000d] font-outfit tracking-tighter mb-4">International Blood News</h1>
                    <p class="text-slate-500 max-w-2xl mx-auto font-medium">Tracking the global and national blood demand and crisis landscapes.</p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <!-- International Crisis -->
                    <article class="space-y-8">
                        <div class="aspect-video rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
                            <img src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover" />
                        </div>
                        <div class="space-y-4">
                            <h2 class="text-3xl font-black text-slate-900 font-outfit">International Blood Demand Crisis</h2>
                            <p class="text-slate-600 leading-relaxed font-medium">
                                Worldwide, health systems are facing an unprecedented shortage of voluntary blood donors. The World Health Organization (WHO) reports that 118.5 million blood donations are collected globally, but this only meets a fraction of the demand in low-income regions. The post-pandemic era has seen a 15% drop in regular donor participation, creating a "silent crisis" in surgical and trauma care.
                            </p>
                        </div>
                    </article>

                    <!-- Bangladesh Crisis -->
                    <article class="space-y-8">
                        <div class="aspect-video rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
                            <img src="https://images.unsplash.com/photo-1542884748-2b87b36c6b90?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover" />
                        </div>
                        <div class="space-y-4">
                            <h2 class="text-3xl font-black text-[#af101a] font-outfit">The Bangladesh Context (BD)</h2>
                            <p class="text-slate-600 leading-relaxed font-medium">
                                In Bangladesh, the demand for blood spikes during the dengue season, where thousands of platelets are required daily. Hospitals in Dhaka and surrounding regions like Saidpur often report a 40% gap between demand and supply. Professional blood donation systems are still evolving, leaving a massive responsibility on campus networks like BAUST to bridge the life-saving gap through voluntary student contributions.
                            </p>
                        </div>
                    </article>
                </div>

                <!-- Latest Updates Feed -->
                <div class="mt-24 space-y-10">
                    <h3 class="text-2xl font-black text-slate-900 font-outfit border-b border-slate-200 pb-4">Latest Bulletins</h3>
                    <div id="news-grid" class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <!-- Bulletins Injected Here -->
                    </div>
                </div>
            </main>

            ${window.GlobalFooter()}
        </div>
    `,
    afterRender: async () => {
        const grid = document.getElementById('news-grid');
        if (!grid) return;

        try {
            const { data: news, error } = await db.from('news').select('*').order('created_at', { ascending: false });
            
            if (error || !news || news.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full py-12 text-center bg-white rounded-[40px] border-2 border-dashed border-slate-100">
                        <p class="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">No news bulletins posted yet</p>
                    </div>
                `;
                return;
            }

            grid.innerHTML = news.map(n => `
                <div class="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                    <h4 class="font-black text-slate-900 text-lg mb-3 tracking-tighter">${n.title}</h4>
                    <p class="text-xs text-slate-500 font-medium leading-relaxed">${n.body}</p>
                    <p class="text-[8px] font-black text-slate-300 uppercase mt-4">${new Date(n.created_at).toLocaleDateString()}</p>
                </div>
            `).join('');
        } catch (err) {
            console.error('News Fetch Error:', err);
        }
    }
};


