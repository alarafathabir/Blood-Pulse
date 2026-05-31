export const DonorSearch = {
    render: () => `
        <div class="bg-slate-50 text-slate-900 font-inter min-h-screen flex">
            <!-- Sidebar (Synchronized with Dashboard) -->
            <nav class="hidden lg:flex flex-col h-screen w-64 border-r bg-white divide-y divide-slate-100 p-4 space-y-2 sticky top-0">
                <div class="pb-6 pt-2">
                    <div class="flex items-center space-x-3 mb-6">
                        <div class="w-10 h-10 rounded-full bg-red-700 text-white flex items-center justify-center font-bold">A</div>
                        <div>
                            <h2 class="text-xl font-black text-red-700">Admin Panel</h2>
                            <p class="text-xs text-slate-500">Blood Pulse Management</p>
                        </div>
                    </div>
                    <button onclick="document.querySelector('input[type=text]')?.focus()" class="w-full bg-red-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-red-800 transition-all shadow-md">
                        <span class="material-symbols-outlined text-sm">search</span>
                        Quick Search
                    </button>
                </div>
                <div class="flex-1 py-4 space-y-1">
                    <a class="flex items-center space-x-3 px-4 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition-all" href="#/dashboard">
                        <span class="material-symbols-outlined">dashboard</span>
                        <span>Dashboard</span>
                    </a>
                    <a class="flex items-center space-x-3 px-4 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition-all" href="#/notifications">
                        <span class="material-symbols-outlined">notifications</span>
                        <span>Notifications</span>
                        <span class="ml-auto bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full">3</span>
                    </a>
                    <a class="flex items-center space-x-3 px-4 py-3 bg-red-50 text-red-700 font-bold rounded-lg transition-all" href="#/donor-search">
                        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">person_search</span>
                        <span>Donor Search</span>
                    </a>
                    <a class="flex items-center space-x-3 px-4 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition-all" href="#/users">
                        <span class="material-symbols-outlined">person_search</span>
                        <span>User Profiles</span>
                    </a>
                    <a class="flex items-center space-x-3 px-4 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition-all" href="#/">
                        <span class="material-symbols-outlined">home</span>
                        <span>View Website</span>
                    </a>
                </div>
                <div class="pt-4">
                    <a class="flex items-center space-x-3 px-4 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition-all" href="#/login">
                        <span class="material-symbols-outlined">logout</span>
                        <span>Logout</span>
                    </a>
                </div>
            </nav>

            <!-- Main Content -->
            <main class="flex-1 flex flex-col min-w-0 bg-slate-50 animate-fade-in overflow-y-auto">
                <!-- Admin Top Navbar -->
                <div class="sticky top-0 z-20 bg-white border-b border-slate-100 shadow-sm px-8 py-3 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="hidden lg:flex items-center gap-2 text-xs text-slate-400 font-bold">
                            <span>Blood Pulse</span>
                            <span class="material-symbols-outlined text-xs">chevron_right</span>
                            <span class="text-red-700">Donor Search</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <a href="#/notifications" class="relative w-9 h-9 rounded-full hover:bg-red-50 flex items-center justify-center text-slate-500 hover:text-red-600 transition-colors" title="Notifications">
                            <span class="material-symbols-outlined text-[20px]">notifications</span>
                            <span class="absolute top-0.5 right-0.5 w-4 h-4 bg-red-600 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">3</span>
                        </a>
                        <div class="w-px h-6 bg-slate-100"></div>
                        <div class="flex items-center gap-2 cursor-pointer" onclick="goTo('/login')">
                            <div class="w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center text-xs font-black">A</div>
                            <span class="hidden md:inline text-xs font-black text-slate-800">Admin</span>
                        </div>
                    </div>
                </div>
                <div class="p-8 max-w-7xl mx-auto w-full space-y-10">
                    <div>
                        <h1 class="text-4xl font-manrope font-bold text-slate-900">Advanced Donor Search</h1>
                        <p class="text-lg text-slate-600 mt-2">Locate and coordinate with compatible donors across the medical network.</p>
                    </div>

                    <!-- Filter Bar -->
                    <section class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col lg:flex-row items-center gap-6">
                        <div class="flex-1 w-full relative">
                            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">location_on</span>
                            <input type="text" placeholder="Enter City, Hospital, or Zip..." class="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-medium">
                        </div>
                        <div class="flex gap-2 flex-wrap">
                            <button class="px-4 py-2 rounded-lg bg-red-700 text-white font-bold text-sm">O+</button>
                            <button class="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:border-red-700">O-</button>
                            <button class="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:border-red-700">A+</button>
                            <button class="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:border-red-700">A-</button>
                            <button class="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:border-red-700">B+</button>
                            <button class="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:border-red-700">B-</button>
                        </div>
                        <button class="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-md">
                            <span class="material-symbols-outlined">search</span>
                            Run Query
                        </button>
                    </section>

                    <!-- Results Layout -->
                    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                        <!-- Donor List -->
                        <div class="xl:col-span-8 space-y-6">
                            <div class="flex items-center justify-between">
                                <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <span class="material-symbols-outlined text-blue-600">person_search</span>
                                    Matching Active Donors
                                </h2>
                                <span id="results-count" class="text-xs font-bold text-slate-400 uppercase">Found 0 Results</span>
                            </div>

                            <div id="donors-grid" class="space-y-6">
                                <!-- Results Injected Here -->
                                <div class="py-20 text-center opacity-20">
                                    <span class="material-symbols-outlined text-5xl animate-spin">sync</span>
                                </div>
                            </div>
                        </div>

                        <!-- Map / Location Sidebar -->
                        <div class="xl:col-span-4 space-y-6">
                            <div class="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[600px]">
                                <div class="bg-slate-200 flex-1 relative flex items-center justify-center text-slate-400 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover opacity-50 grayscale" alt="Mock Map">
                                    <div class="absolute inset-0 bg-slate-900/10"></div>
                                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                        <span class="material-symbols-outlined text-red-700 text-[48px] animate-bounce">location_on</span>
                                        <div class="bg-white px-3 py-1 rounded-lg shadow-xl border border-slate-200 mt-2">
                                            <span class="text-xs font-bold">Network Map Active</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="p-6 bg-white border-t border-slate-100">
                                    <h3 class="font-bold text-slate-900 mb-2 uppercase text-[10px] tracking-widest">Location Insights</h3>
                                    <p class="text-xs text-slate-500 leading-relaxed font-medium">
                                        Your local MSSQL medical network is currently monitoring active donor locations. Search results are prioritized by availability and distance.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `,
    afterRender: async () => {
        const grid = document.getElementById('donors-grid');
        const countEl = document.getElementById('results-count');
        const searchInput = document.querySelector('input[placeholder*="Enter City"]');
        const searchBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Run Query')) || document.querySelector('button.bg-slate-900');
        const bloodBtns = document.querySelectorAll('button.rounded-lg');

        let currentBloodGroup = '';

        const fetchDonors = async (query = '', bloodGroup = '') => {
            grid.innerHTML = '<div class="py-20 text-center opacity-20"><span class="material-symbols-outlined text-5xl animate-spin">sync</span></div>';
            
            try {
                let request = db.from('profiles').select('*');
                
                if (bloodGroup) {
                    request = request.eq('blood_group', bloodGroup);
                }
                
                const { data: donors, error } = await request.order('full_name', { ascending: true });

                if (error || !donors || donors.length === 0) {
                    grid.innerHTML = `
                        <div class="bg-white rounded-2xl p-12 text-center border border-slate-100">
                            <span class="material-symbols-outlined text-4xl text-slate-200 mb-4">search_off</span>
                            <p class="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No donors found in MSSQL matching these criteria</p>
                        </div>
                    `;
                    if (countEl) countEl.textContent = 'Found 0 Results';
                    return;
                }

                // Client side filter for query (Simulating text search)
                const filtered = donors.filter(d => 
                    d.full_name?.toLowerCase().includes(query.toLowerCase()) || 
                    d.district?.toLowerCase().includes(query.toLowerCase()) ||
                    d.upazila?.toLowerCase().includes(query.toLowerCase()) ||
                    d.village?.toLowerCase().includes(query.toLowerCase())
                );

                if (countEl) countEl.textContent = `Found ${filtered.length} Results`;

                grid.innerHTML = filtered.map(d => `
                    <div class="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500 group">
                        <div class="flex justify-between items-start">
                            <div class="flex items-center gap-4">
                                <div class="w-14 h-14 rounded-2xl bg-red-50 text-[#af101a] flex items-center justify-center text-xl font-black border-2 border-white shadow-md">${d.blood_group || '?'}</div>
                                <div>
                                    <h3 class="text-xl font-black text-slate-900 font-outfit tracking-tighter">${d.full_name}</h3>
                                    <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1">
                                        <span class="material-symbols-outlined text-[14px]">location_on</span>
                                        ${d.district || 'District'}, ${d.upazila || 'Upazila'}, ${d.village || 'Village'}
                                    </p>
                                </div>
                            </div>
                            <div class="flex flex-col items-end gap-1">
                                <span class="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-1">
                                    <span class="material-symbols-outlined text-[12px]">verified</span> ${d.role || 'Donor'}
                                </span>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4 mt-6">
                            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Contact</span>
                                <span class="text-xs font-bold text-slate-700">${d.phone || 'HIDDEN'}</span>
                            </div>
                            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Status</span>
                                <span class="text-xs font-bold ${d.is_available === false ? 'text-red-500' : 'text-emerald-600'} uppercase">${d.is_available === false ? 'Busy' : 'Available'}</span>
                            </div>
                        </div>
                        <div class="flex gap-2 mt-6">
                            <a href="tel:${d.phone}" class="flex-1 bg-[#af101a] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#86000d] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                                <span class="material-symbols-outlined text-sm">call</span>
                                Call Now
                            </a>
                        </div>
                    </div>
                `).join('');
            } catch (err) {
                console.error('Donor Fetch Error:', err);
            }
        };

        // Blood Group Button Listeners
        bloodBtns.forEach(btn => {
            btn.onclick = () => {
                bloodBtns.forEach(b => b.classList.remove('bg-red-700', 'text-white'));
                bloodBtns.forEach(b => b.classList.add('bg-white', 'text-slate-600', 'border-slate-200'));
                
                btn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');
                btn.classList.add('bg-red-700', 'text-white');
                
                currentBloodGroup = btn.textContent.trim();
                fetchDonors(searchInput.value, currentBloodGroup);
            };
        });

        if (searchBtn) {
            searchBtn.onclick = () => fetchDonors(searchInput.value, currentBloodGroup);
        }

        searchInput.onkeyup = (e) => {
            if (e.key === 'Enter') fetchDonors(searchInput.value, currentBloodGroup);
        };

        fetchDonors();
    }
};


