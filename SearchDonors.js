import { db } from '../js/db.js';

export const SearchDonors = {
    render: () => {
        return `
        <div class="min-h-screen bg-[#f8fafc] text-slate-900 font-inter pb-32 relative overflow-x-hidden">
            ${window.UserNavbar()}
            <!-- Decorative Background Elements -->
            <div class="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#af101a]/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
            <div class="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full -z-10 animate-pulse" style="animation-delay: 2s"></div>

            <main class="max-w-7xl mx-auto px-6 space-y-12 relative z-10">
                <!-- Editorial Header -->
                <header class="animate-fade-in flex flex-col items-center text-center space-y-6">
                    <div class="inline-flex items-center gap-3 px-4 py-2 bg-[#af101a]/10 border border-[#af101a]/20 rounded-full">
                        <span class="w-2 h-2 rounded-full bg-[#af101a] animate-ping"></span>
                        <span class="text-[10px] font-black uppercase tracking-[0.4em] text-[#af101a]">Live Network Hub</span>
                    </div>
                    <h1 class="text-6xl md:text-8xl font-black font-outfit uppercase tracking-tighter leading-none text-slate-900">
                        Find <span class="text-slate-300">Donors</span>
                    </h1>
                    <p class="max-w-2xl mx-auto text-slate-500 text-sm font-medium leading-relaxed">
                        Access our real-time network of verified life-savers. Filter by blood group, department, or location to find an immediate match.
                    </p>
                </header>

                <!-- Search & Filters Container -->
                <div class="bg-white/70 backdrop-blur-3xl border border-white rounded-[56px] shadow-2xl shadow-slate-200/50 p-8 lg:p-12 animate-slide-up">
                    <div class="space-y-8">
                        <!-- Main Search Bar -->
                        <div class="relative group">
                            <span class="material-symbols-outlined absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#af101a] transition-colors">search</span>
                            <input type="text" id="global-search" placeholder="SEARCH BY NAME, DEPT, BATCH, OR LOCATION..." class="w-full bg-slate-50/50 border border-slate-100 rounded-[32px] pl-20 pr-8 py-8 text-xs font-black uppercase tracking-widest outline-none focus:border-[#af101a]/30 focus:ring-4 focus:ring-[#af101a]/5 transition-all text-slate-900">
                        </div>

                        <!-- Advanced Filters -->
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div class="relative">
                                <select id="filter-blood" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer focus:border-[#af101a]/30">
                                    <option value="">Blood Group (All)</option>
                                    <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                                    <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                                </select>
                                <span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">expand_more</span>
                            </div>

                            <div class="relative">
                                <select id="filter-division" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer focus:border-[#af101a]/30">
                                    <option value="">All Divisions</option>
                                    <option>Dhaka</option><option>Rangpur</option><option>Rajshahi</option>
                                    <option>Chittagong</option><option>Sylhet</option><option>Khulna</option>
                                    <option>Barisal</option><option>Mymensingh</option>
                                </select>
                                <span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">expand_more</span>
                            </div>

                            <div class="relative">
                                <select id="filter-availability" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer focus:border-[#af101a]/30">
                                    <option value="">Availability (All)</option>
                                    <option value="active">Active (Available)</option>
                                    <option value="passive">Passive (On Break)</option>
                                </select>
                                <span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">check_circle</span>
                            </div>

                            <div class="relative">
                                <select id="filter-status" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer focus:border-[#af101a]/30">
                                    <option value="">User Type (All)</option>
                                    <option value="student">Student</option>
                                    <option value="civilian">Civilian</option>
                                </select>
                                <span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">school</span>
                            </div>

                            <button onclick="window.clearFilters()" class="w-full py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#af101a] transition-all active:scale-95 flex items-center justify-center gap-2">
                                <span class="material-symbols-outlined text-sm">filter_list_off</span>
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Results Grid -->
                <div class="space-y-6">
                    <div class="flex items-center justify-between px-4">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Detected <span id="result-count" class="text-slate-900">0</span> Profiles</p>
                        <div class="flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <p class="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Real-time Sync Active</p>
                        </div>
                    </div>

                    <div id="search-results-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <!-- Donor Cards Injected Here -->
                    </div>

                    <!-- Empty State -->
                    <div id="search-empty" class="hidden flex flex-col items-center justify-center py-32 text-center animate-fade-in">
                        <div class="w-24 h-24 bg-slate-100 rounded-[32px] flex items-center justify-center mb-8">
                            <span class="material-symbols-outlined text-4xl text-slate-300">person_search</span>
                        </div>
                        <h3 class="text-2xl font-black text-slate-900 font-outfit uppercase tracking-tighter mb-2">No Donors Found</h3>
                        <p class="text-sm font-medium text-slate-400">Try adjusting your filters or search keywords.</p>
                    </div>
                </div>
            </main>

        </div>
        `;
    },
    afterRender: async () => {
        const resultsGrid = document.getElementById('search-results-grid');
        const emptyState = document.getElementById('search-empty');
        const resultCount = document.getElementById('result-count');

        const fetchDonors = async () => {
            const isAdmin = localStorage.getItem('bloodpulse_role') === 'admin';
            const query = document.getElementById('global-search').value.toLowerCase();
            const blood = document.getElementById('filter-blood').value;
            const division = document.getElementById('filter-division').value;
            const status = document.getElementById('filter-status').value;
            const availability = document.getElementById('filter-availability').value;

            resultsGrid.innerHTML = `
                <div class="col-span-full py-20 flex flex-col items-center justify-center space-y-6 animate-pulse">
                    <div class="w-12 h-12 border-4 border-slate-100 border-t-[#af101a] rounded-full animate-spin"></div>
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Scanning Pulse Network...</p>
                </div>
            `;

            try {
                let dbQuery = db.from('profiles').select('*');

                if (blood) dbQuery = dbQuery.eq('blood_group', blood);
                if (division) dbQuery = dbQuery.eq('division', division);
                if (status) dbQuery = dbQuery.eq('occupational_designation', status);

                const { data: donors, error } = await dbQuery;
                if (error) throw error;

                // Client-side filtering for keywords and availability
                const filtered = donors.filter(d => {
                    const matchText = [
                        d.full_name,
                        d.department,
                        d.batch,
                        d.district,
                        d.village,
                        d.occupational_designation
                    ].join(' ').toLowerCase();

                    // Availability logic: Active = no donation in 90 days, Passive = donated within 90 days
                    const lastDonation = d.last_donation_date ? new Date(d.last_donation_date) : null;
                    const daysSinceDonation = lastDonation ? (new Date() - lastDonation) / (1000 * 60 * 60 * 24) : 999;
                    const isEligible = daysSinceDonation >= 90;

                    const matchesQuery = !query || matchText.includes(query);
                    const matchesAvailability = !availability ||
                        (availability === 'active' && isEligible) ||
                        (availability === 'passive' && !isEligible);

                    return matchesQuery && matchesAvailability;
                });

                resultCount.textContent = filtered.length;

                if (filtered.length === 0) {
                    resultsGrid.innerHTML = '';
                    emptyState.classList.remove('hidden');
                    return;
                }

                emptyState.classList.add('hidden');
                resultsGrid.innerHTML = filtered.map(d => {
                    const lastDonation = d.last_donation_date ? new Date(d.last_donation_date) : null;
                    const daysSinceDonation = lastDonation ? Math.floor((new Date() - lastDonation) / (1000 * 60 * 60 * 24)) : 999;
                    const isEligible = daysSinceDonation >= 90;

                    return `
                        <div class="bg-white p-10 rounded-[56px] border border-slate-50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                            <!-- Background Pulse -->
                            <div class="absolute top-0 right-0 w-32 h-32 bg-[#af101a]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                            
                            <div class="relative z-10 flex flex-col h-full">
                                <div class="flex justify-between items-start mb-8">
                                    <div class="relative shrink-0">
                                        <img src="${d.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${d.full_name}`}" class="w-20 h-20 rounded-[28px] object-cover border-4 border-slate-50 shadow-lg">
                                        <div class="absolute -bottom-2 -right-2 w-6 h-6 rounded-lg border-4 border-white ${isEligible ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}"></div>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-4xl font-black text-[#af101a] font-outfit leading-none mb-1">${d.blood_group}</p>
                                        <p class="text-[9px] font-black text-slate-300 uppercase tracking-widest">Blood Type</p>
                                    </div>
                                </div>

                                <h3 class="text-xl font-black text-slate-900 uppercase tracking-tighter mb-1 line-clamp-1 group-hover:text-[#af101a] transition-colors">${d.full_name}</h3>
                                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <span class="material-symbols-outlined text-[14px]">location_on</span>
                                    ${d.district || 'Verified'}, ${d.division || 'Member'}
                                </p>

                                <div class="space-y-3 mb-10 flex-1">
                                    <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div>
                                            <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Impact</p>
                                            <p class="text-xs font-black text-slate-900 font-outfit">${d.times_donated || 0} Donations</p>
                                        </div>
                                        <div class="w-1 h-8 bg-slate-200 rounded-full"></div>
                                        <div class="text-right">
                                            <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                            <p class="text-xs font-black ${isEligible ? 'text-emerald-600' : 'text-amber-600'} font-outfit uppercase">${isEligible ? 'Ready' : 'Resting'}</p>
                                        </div>
                                    </div>
                                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2 italic text-center">
                                        ${d.department ? `Dept: ${d.department}` : (d.occupation || 'Community Donor')}
                                    </p>
                                </div>

                                <div class="flex gap-3">
                                    ${isAdmin ? `
                                        <a href="tel:${d.phone || '#'}" class="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 hover:bg-[#af101a] transition-all">
                                            <span class="material-symbols-outlined text-sm">phone_in_talk</span>
                                            Call Now
                                        </a>
                                        <a href="https://wa.me/${d.phone || '#'}" target="_blank" class="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-700 transition-all shadow-lg">
                                            <span class="material-symbols-outlined text-sm">chat</span>
                                        </a>
                                    ` : `
                                        <button onclick="window.goTo('/send-request?id=${d.id}')" class="flex-1 py-4 bg-[#af101a] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-red-500/20 hover:bg-[#86000d] hover:scale-105 transition-all active:scale-95">
                                            Send Request
                                        </button>
                                        <button onclick="window.goTo('/send-request?id=${d.id}')" class="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-black transition-all active:scale-95 shadow-lg">
                                            <span class="material-symbols-outlined text-sm">phone_in_talk</span>
                                        </button>
                                    `}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');

            } catch (err) {
                console.error(err);
                resultsGrid.innerHTML = '<div class="col-span-full text-red-500 text-center py-20 uppercase font-black text-xs">Radar Sync Failure</div>';
            }
        };

        // Event Listeners
        document.getElementById('global-search').addEventListener('input', fetchDonors);
        document.getElementById('filter-blood').addEventListener('change', fetchDonors);
        document.getElementById('filter-division').addEventListener('change', fetchDonors);
        document.getElementById('filter-status').addEventListener('change', fetchDonors);
        document.getElementById('filter-availability').addEventListener('change', fetchDonors);

        window.clearFilters = () => {
            document.getElementById('global-search').value = '';
            document.getElementById('filter-blood').value = '';
            document.getElementById('filter-division').value = '';
            document.getElementById('filter-status').value = '';
            document.getElementById('filter-availability').value = '';
            fetchDonors();
        };

        fetchDonors();
    }
};


