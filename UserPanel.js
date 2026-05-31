import { db } from '../js/db.js';

export const UserPanel = {
    render: () => {
        return `
        <style>
            .panel-card { background: white; border: 1px solid #f1f5f9; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
            @keyframes pulse-red { 0%,100%{box-shadow:0 0 0 0 rgba(175,16,26,0.2)} 70%{box-shadow:0 0 0 10px rgba(175,16,26,0)} }
            .pulse-red { animation: pulse-red 2s infinite; }
        </style>

        <!-- Loader -->
        <div id="user-panel-loader" class="fixed inset-0 z-[3000] bg-white flex flex-col items-center justify-center transition-opacity duration-700">
            <div class="relative w-20 h-20">
                <div class="w-20 h-20 border-4 border-slate-100 rounded-full"></div>
                <div class="w-20 h-20 border-4 border-t-[#af101a] rounded-full animate-spin absolute top-0 left-0"></div>
                <span class="material-symbols-outlined text-[#af101a] text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">water_drop</span>
            </div>
            <p class="mt-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">Syncing Pulse Network...</p>
        </div>

        <div class="min-h-screen bg-[#f8fafc] font-inter pb-40 relative overflow-hidden">
            ${window.UserNavbar()}
            <!-- Decorative Background Elements -->
            <div class="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#af101a]/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
            <div class="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full -z-10 animate-pulse" style="animation-delay: 2s"></div>

            <div class="max-w-6xl mx-auto px-6 space-y-12 relative z-10">
                
                <!-- Hero Section -->
                <div class="bg-white rounded-[56px] p-10 lg:p-16 shadow-2xl shadow-slate-200/50 relative overflow-hidden animate-fade-in group border border-white">
                    <div class="absolute top-0 right-0 w-80 h-80 bg-[#af101a]/5 rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-1000"></div>
                    
                    <div class="flex flex-col lg:flex-row items-center lg:items-start gap-12 relative z-10">
                        <div class="relative shrink-0">
                            <div class="w-44 h-44 rounded-[48px] border-8 border-slate-50 shadow-2xl overflow-hidden pulse-red">
                                <img id="user-avatar" src="" alt="avatar" class="w-full h-full object-cover">
                            </div>
                            <div class="absolute -bottom-2 -right-2 w-14 h-14 bg-[#af101a] rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-xl">
                                <span class="material-symbols-outlined text-2xl">verified</span>
                            </div>
                        </div>

                        <div class="flex-1 text-center lg:text-left space-y-6">
                            <div class="space-y-2">
                                <p class="text-[10px] font-black text-[#af101a] uppercase tracking-[0.4em]">Life-Saver Rank</p>
                                <h1 class="text-6xl md:text-7xl font-black text-slate-900 font-outfit tracking-tighter leading-none">
                                    <span id="user-name">Donor</span>
                                </h1>
                            </div>

                            <div class="flex flex-wrap justify-center lg:justify-start gap-4">
                                <div class="px-6 py-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                                    <span class="w-2 h-2 rounded-full bg-[#af101a]"></span>
                                    <span id="user-blood-group" class="text-[10px] font-black text-slate-900 uppercase tracking-widest">--</span>
                                </div>
                                <div id="user-rank-badge" class="px-6 py-3 rounded-2xl bg-slate-900 text-white flex items-center gap-3">
                                    <span class="material-symbols-outlined text-[14px]">military_tech</span>
                                    <span class="text-[10px] font-black uppercase tracking-widest">Level --</span>
                                </div>
                                <div id="user-status-badge" class="px-6 py-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-3">
                                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span class="text-[10px] font-black uppercase tracking-widest">Ready</span>
                                </div>
                            </div>

                            <div class="bg-slate-50/50 p-8 rounded-[32px] border border-slate-100 relative group/bio">
                                <p id="user-bio-display" class="text-lg font-medium text-slate-500 italic leading-relaxed">"One drop of blood can create a sea of hope."</p>
                                <textarea id="user-bio-edit" class="hidden w-full bg-transparent text-lg font-medium text-slate-900 italic leading-relaxed outline-none resize-none border-b-2 border-[#af101a] pb-2" rows="2"></textarea>
                                <button id="edit-bio-btn" class="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#af101a] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all active:scale-95 shadow-lg shadow-[#af101a]/20">
                                    <span class="material-symbols-outlined text-sm">edit_note</span>
                                    <span id="edit-bio-text">Update Bio</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Stats & Actions Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <!-- Actions -->
                    <div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div onclick="goTo('/search')" class="bg-white p-10 rounded-[48px] border border-slate-50 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group">
                            <div class="w-16 h-16 rounded-2xl bg-red-50 text-[#af101a] flex items-center justify-center mb-8 group-hover:bg-[#af101a] group-hover:text-white transition-all">
                                <span class="material-symbols-outlined text-3xl">radar</span>
                            </div>
                            <h3 class="text-2xl font-black text-slate-900 font-outfit uppercase tracking-tighter mb-2">Scan Radar</h3>
                            <p class="text-sm font-medium text-slate-400">Find and connect with available donors in your area instantly.</p>
                        </div>

                        <div onclick="window.openRequestModal()" class="bg-[#af101a] p-10 rounded-[48px] shadow-2xl shadow-[#af101a]/20 hover:-translate-y-2 transition-all duration-500 cursor-pointer group text-white">
                            <div class="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-8 border border-white/20">
                                <span class="material-symbols-outlined text-3xl">campaign</span>
                            </div>
                            <h3 class="text-2xl font-black font-outfit uppercase tracking-tighter mb-2">Post Appeal</h3>
                            <p class="text-sm font-medium text-white/60">Broadcast an emergency blood request to the entire network.</p>
                        </div>
                    </div>

                    <!-- Side Stats -->
                    <div class="lg:col-span-4 bg-white p-10 rounded-[48px] border border-slate-50 shadow-xl space-y-8">
                        <h4 class="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Lifetime Impact</h4>
                        <div class="space-y-6">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-4">
                                    <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                        <span class="material-symbols-outlined text-xl">history</span>
                                    </div>
                                    <p class="text-[10px] font-black text-slate-900 uppercase tracking-widest">Donations</p>
                                </div>
                                <p id="stat-donated" class="text-2xl font-black text-slate-900 font-outfit">0</p>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-4">
                                    <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                        <span class="material-symbols-outlined text-xl">water_drop</span>
                                    </div>
                                    <p class="text-[10px] font-black text-slate-900 uppercase tracking-widest">Bags Shared</p>
                                </div>
                                <p id="stat-bags" class="text-2xl font-black text-slate-900 font-outfit">0</p>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-4">
                                    <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                        <span class="material-symbols-outlined text-xl">outpatient</span>
                                    </div>
                                    <p class="text-[10px] font-black text-slate-900 uppercase tracking-widest">Appeals</p>
                                </div>
                                <p id="stat-requests" class="text-2xl font-black text-slate-900 font-outfit">0</p>
                            </div>
                        </div>
                        <button onclick="goTo('/update-profile')" class="w-full py-5 bg-slate-50 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-100 hover:bg-slate-900 hover:text-white transition-all">
                            Complete Profile
                        </button>
                    </div>
                </div>

                <!-- Tabs Section -->
                <section class="animate-slide-up" style="animation-delay: 0.3s">
                    <div class="bg-white rounded-[56px] overflow-hidden border border-slate-50 shadow-2xl shadow-slate-200/50">
                        <div class="bg-slate-50/50 p-3 rounded-[32px] border border-slate-100 flex gap-2">
                            <button onclick="window.switchTab('activity')" id="tab-btn-activity" class="flex-1 py-4 px-6 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all bg-[#af101a] text-white shadow-xl shadow-[#af101a]/20">Activity Matrix</button>
                            <button onclick="window.switchTab('requests')" id="tab-btn-requests" class="flex-1 py-4 px-6 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all text-slate-400 hover:text-slate-900">My Appeals</button>
                            <button onclick="window.switchTab('stories')" id="tab-btn-stories" class="flex-1 py-4 px-6 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all text-slate-400 hover:text-slate-900">Stories</button>
                            <button onclick="window.switchTab('donations')" id="tab-btn-donations" class="flex-1 py-4 px-6 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all text-slate-400 hover:text-slate-900">Logs</button>
                        </div>

                        <div class="p-8 lg:p-12">
                            <!-- Tab Content: Activity Matrix (NEW) -->
                            <div id="tab-content-activity" class="space-y-6">
                                <div id="user-activity-feed" class="space-y-4"></div>
                                <div id="activity-empty" class="hidden text-center py-20">
                                    <span class="material-symbols-outlined text-5xl text-slate-100 mb-4 block">history</span>
                                    <p class="text-[10px] font-black text-slate-300 uppercase tracking-widest">No recent activity detected.</p>
                                </div>
                            </div>

                            <!-- Tab Content: Stories -->
                            <div id="tab-content-stories" class="space-y-10">
                                <div class="bg-slate-50/50 p-8 rounded-[40px] border border-slate-100">
                                    <textarea id="story-input" rows="3" placeholder="SHARE YOUR EXPERIENCE..." class="w-full bg-white border border-slate-100 rounded-3xl px-8 py-6 font-bold text-sm outline-none focus:border-[#af101a]/30 resize-none mb-6"></textarea>
                                    <div class="flex justify-between items-center">
                                        <label class="cursor-pointer text-slate-400 hover:text-[#af101a] transition-colors flex items-center gap-3">
                                            <input type="file" id="story-file-input" accept="image/*" class="hidden">
                                            <span class="material-symbols-outlined">image</span>
                                            <span class="text-[9px] font-black uppercase tracking-widest">Attach Media</span>
                                        </label>
                                        <button id="post-story-btn" class="bg-[#af101a] text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#af101a]/20 hover:scale-105 transition-all">Publish Story</button>
                                    </div>
                                </div>
                                <div id="my-stories-list" class="grid grid-cols-1 md:grid-cols-2 gap-8"></div>
                                <div id="stories-empty" class="hidden text-center py-20">
                                    <span class="material-symbols-outlined text-5xl text-slate-100 mb-4 block">history_edu</span>
                                    <p class="text-[10px] font-black text-slate-300 uppercase tracking-widest">Your story history is empty.</p>
                                </div>
                            </div>

                            <!-- Tab Content: Donations -->
                            <div id="tab-content-donations" class="hidden space-y-10">
                                <div class="flex flex-col md:flex-row justify-between items-center gap-8 bg-slate-50 p-10 rounded-[40px] border border-slate-100">
                                    <div class="text-center md:text-left">
                                        <h4 class="text-2xl font-black text-slate-900 font-outfit uppercase tracking-tighter">Record Donation</h4>
                                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Keep your network status accurate</p>
                                    </div>
                                    <div class="flex gap-4">
                                        <input type="date" id="new-donation-date" class="bg-white border border-slate-100 rounded-2xl px-6 py-4 font-bold text-sm outline-none focus:border-[#af101a]">
                                        <button onclick="window.logDonation()" class="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-[#af101a] transition-all">Update Log</button>
                                    </div>
                                </div>
                                <div id="donation-dates-list" class="space-y-4"></div>
                                <div id="donations-empty" class="hidden text-center py-20">
                                    <span class="material-symbols-outlined text-5xl text-slate-100 mb-4 block">calendar_today</span>
                                    <p class="text-[10px] font-black text-slate-300 uppercase tracking-widest">No recent donations logged.</p>
                                </div>
                            </div>

                            <!-- Tab Content: Requests -->
                            <div id="tab-content-requests" class="hidden space-y-8">
                                <div id="user-requests-list" class="space-y-6"></div>
                                <div id="requests-empty" class="hidden text-center py-20">
                                    <span class="material-symbols-outlined text-5xl text-slate-100 mb-4 block">campaign</span>
                                    <p class="text-[10px] font-black text-slate-300 uppercase tracking-widest">No active appeals detected.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <!-- Appeal Modal -->
            <div id="request-modal" class="fixed inset-0 z-[2000] hidden flex items-center justify-center p-6">
                <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onclick="window.closeRequestModal()"></div>
                <div class="bg-white rounded-[56px] w-full max-w-xl shadow-2xl relative z-10 overflow-hidden animate-zoom-in">
                    <div class="h-2 bg-[#af101a]"></div>
                    <div class="p-12 lg:p-16">
                        <div class="flex justify-between items-start mb-10">
                            <div>
                                <h2 class="text-4xl font-black text-slate-900 font-outfit uppercase tracking-tighter">New Appeal</h2>
                                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Broadcast to the network</p>
                            </div>
                            <button onclick="window.closeRequestModal()" class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#af101a] hover:text-white transition-all">
                                <span class="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form id="blood-request-form" class="space-y-6">
                            <input type="text" id="req-patient" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 font-bold text-sm outline-none focus:border-[#af101a]/30" placeholder="Patient Full Name" required>
                            <div class="grid grid-cols-2 gap-6">
                                <select id="req-bloodgroup" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 font-bold text-sm outline-none cursor-pointer" required>
                                    <option value="">Blood Group</option>
                                    <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                                    <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                                </select>
                                <input type="number" id="req-bags" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 font-bold text-sm outline-none" placeholder="Bags" value="1" min="1" required>
                            </div>
                            <input type="text" id="req-hospital" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 font-bold text-sm outline-none focus:border-[#af101a]/30" placeholder="Hospital & Ward Address" required>
                            <input type="date" id="req-date" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 font-bold text-sm outline-none cursor-pointer" required>
                            <div class="flex items-center gap-3 px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl group/check">
                                <input type="checkbox" id="req-wheelchair" class="w-5 h-5 rounded-lg border-2 border-slate-200 text-[#af101a] focus:ring-[#af101a] transition-all cursor-pointer">
                                <label for="req-wheelchair" class="text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-pointer group-hover/check:text-slate-900 transition-colors">Wheelchair Assistance Required</label>
                            </div>
                            <button type="submit" class="w-full py-6 font-black text-white bg-[#af101a] rounded-[28px] text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-[#af101a]/20 hover:scale-[1.02] transition-all">Broadcast Emergency</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
        `;
    },
    afterRender: async () => {
        const loader = document.getElementById('user-panel-loader');
        const token = localStorage.getItem('bloodpulse_token');
        const userSession = JSON.parse(localStorage.getItem('bloodpulse_user') || '{}');

        if (!token || !userSession.id) { window.goTo('/login'); return; }

        // Helper: Format Date
        const formatDate = (dateStr) => {
            if (!dateStr) return 'N/A';
            return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        };

        const formatTime = (dateStr) => {
            const date = new Date(dateStr);
            const now = new Date();
            const diff = (now - date) / 1000;
            if (diff < 60) return 'Just now';
            if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
            if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
            return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
        };

        // ── 1. Fetch Profile ──────────────────────────────
        const fetchProfile = async () => {
            const { data: profile, error } = await db.from('profiles').select('*').eq('id', userSession.id).single();
            if (error || !profile) return;

            document.getElementById('user-name').textContent = profile.full_name;
            document.getElementById('user-blood-group').textContent = profile.blood_group;
            document.getElementById('user-avatar').src = profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.full_name}`;
            document.getElementById('user-bio-display').textContent = profile.bio ? `"${profile.bio}"` : '"No bio set yet."';
            document.getElementById('stat-donated').textContent = profile.times_donated || 0;
            document.getElementById('stat-bags').textContent = profile.bags_donated || 0;

            const rankBadge = document.getElementById('user-rank-badge');
            const level = profile.times_donated >= 15 ? 'Gold' : profile.times_donated >= 10 ? 'Silver' : profile.times_donated >= 5 ? 'Bronze' : 'Member';
            rankBadge.innerHTML = `<span class="material-symbols-outlined text-[14px]">military_tech</span> <span class="text-[10px] font-black uppercase tracking-widest">${level} Level</span>`;
            
            if (level === 'Gold') rankBadge.className = "px-6 py-3 rounded-2xl bg-amber-400 text-amber-950 flex items-center gap-3 shadow-lg shadow-amber-400/20";
            else if (level === 'Silver') rankBadge.className = "px-6 py-3 rounded-2xl bg-slate-300 text-slate-800 flex items-center gap-3";
            else if (level === 'Bronze') rankBadge.className = "px-6 py-3 rounded-2xl bg-orange-400 text-orange-950 flex items-center gap-3";

            // Availability Status
            const statusBadge = document.getElementById('user-status-badge');
            const lastDonation = profile.last_donation_date ? new Date(profile.last_donation_date) : null;
            const daysSince = lastDonation ? (new Date() - lastDonation) / (1000 * 60 * 60 * 24) : 999;
            if (daysSince < 90) {
                statusBadge.className = "px-6 py-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-3";
                statusBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-500"></span> <span class="text-[10px] font-black uppercase tracking-widest">Resting</span>`;
            }

            loader?.classList.add('opacity-0');
            setTimeout(() => loader?.classList.add('hidden'), 700);
        };

        // ── 2. Handle Bio Edit ────────────────────────────
        const editBtn = document.getElementById('edit-bio-btn');
        const bioDisplay = document.getElementById('user-bio-display');
        const bioEdit = document.getElementById('user-bio-edit');
        let isEditing = false;

        editBtn.onclick = async () => {
            isEditing = !isEditing;
            if (isEditing) {
                bioEdit.value = bioDisplay.textContent.replace(/"/g, '');
                bioDisplay.classList.add('hidden');
                bioEdit.classList.remove('hidden');
                bioEdit.focus();
                document.getElementById('edit-bio-text').textContent = 'Confirm Changes';
            } else {
                const newBio = bioEdit.value.trim();
                const { error } = await db.from('profiles').update({ bio: newBio }).eq('id', userSession.id);
                if (!error) {
                    bioDisplay.textContent = `"${newBio}"`;
                    bioDisplay.classList.remove('hidden');
                    bioEdit.classList.add('hidden');
                    document.getElementById('edit-bio-text').textContent = 'Update Bio';
                }
            }
        };

        // ── 3. Activity Feed ──────────────────────────────
        const renderActivity = async () => {
            const feed = document.getElementById('user-activity-feed');
            const empty = document.getElementById('activity-empty');
            const { data: notifs, error } = await db.from('notifications').select('*').eq('user_id', userSession.id).order('created_at', { ascending: false }).limit(10);

            if (!notifs || notifs.length === 0) { empty.classList.remove('hidden'); feed.innerHTML = ''; return; }
            empty.classList.add('hidden');
            feed.innerHTML = notifs.map(n => {
                const msg = n.message || '';
                let phoneMatch = msg.match(/Contact:\s*([\s\d+\-()]{5,})/i);
                let phone = phoneMatch ? phoneMatch[1].trim() : null;

                // Legacy/Smart Support: If no 'Contact:' prefix, look for any phone-like sequence in alerts
                if (!phone && n.type === 'alert') {
                    const smartMatch = msg.match(/(\+?\d[\s\d\-()]{8,}\d)/);
                    if (smartMatch) phone = smartMatch[1].trim();
                }

                return `
                    <div class="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 space-y-4 hover:bg-white transition-all group">
                        <div class="flex items-start gap-5">
                            <div class="w-12 h-12 rounded-2xl ${n.type === 'alert' ? 'bg-red-50 text-[#af101a]' : 'bg-emerald-50 text-emerald-600'} flex items-center justify-center shrink-0">
                                <span class="material-symbols-outlined text-2xl">${n.type === 'alert' ? 'emergency' : 'verified'}</span>
                            </div>
                            <div class="flex-1">
                                <div class="flex justify-between items-start mb-1">
                                    <h4 class="text-sm font-black text-slate-900 uppercase tracking-tighter">${n.title}</h4>
                                    <span class="text-[8px] font-black text-slate-300 uppercase tracking-widest">${formatTime(n.created_at)}</span>
                                </div>
                                <p class="text-xs text-slate-500 font-medium leading-relaxed">${msg.split(/Contact:/i)[0].trim()}</p>
                            </div>
                        </div>
                        
                        ${phone ? `
                        <div class="flex gap-3 pt-2">
                            <a href="tel:${phone}" class="flex-1 py-3 bg-slate-900 text-white rounded-xl text-[8px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#af101a] transition-all">
                                <span class="material-symbols-outlined text-xs">phone_in_talk</span>
                                Call Requester
                            </a>
                            <a href="https://wa.me/${phone}" target="_blank" class="flex-1 py-3 bg-emerald-600 text-white rounded-xl text-[8px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all">
                                <span class="material-symbols-outlined text-xs">chat</span>
                                WhatsApp
                            </a>
                        </div>
                        ` : ''}
                    </div>
                `;
            }).join('');
        };

        // ── 4. Handle Appeals ─────────────────────────────
        window.openRequestModal = () => document.getElementById('request-modal').classList.remove('hidden');
        window.closeRequestModal = () => document.getElementById('request-modal').classList.add('hidden');

        document.getElementById('blood-request-form').onsubmit = async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            btn.textContent = 'BROADCASTING...';
            btn.disabled = true;

            const appeal = {
                requester_id: userSession.id,
                requester_name: userSession.full_name,
                patient_name: document.getElementById('req-patient').value,
                blood_group: document.getElementById('req-bloodgroup').value,
                bags_needed: parseInt(document.getElementById('req-bags').value),
                hospital_location: document.getElementById('req-hospital').value,
                required_date: document.getElementById('req-date').value,
                requires_wheelchair: document.getElementById('req-wheelchair').checked,
                status: 'Pending'
            };

            const { error } = await db.from('requests').insert([appeal]);
            if (error) { alert("Error: " + error.message); }
            else {
                window.closeRequestModal();
                renderAppeals();
                e.target.reset();
            }
            btn.textContent = 'Broadcast Emergency';
            btn.disabled = false;
        };

        const renderAppeals = async () => {
            const list = document.getElementById('user-requests-list');
            const empty = document.getElementById('requests-empty');
            const { data: reqs, error } = await db.from('requests').select('*').eq('requester_id', userSession.id).order('created_at', { ascending: false });

            document.getElementById('stat-requests').textContent = reqs?.length || 0;

            if (!reqs || reqs.length === 0) { empty.classList.remove('hidden'); list.innerHTML = ''; return; }
            empty.classList.add('hidden');
            list.innerHTML = reqs.map(r => `
                <div class="bg-slate-50/50 p-8 rounded-[40px] border border-slate-100 space-y-6 hover:bg-white transition-all group">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-5">
                            <div class="w-16 h-16 rounded-[24px] bg-white border border-slate-100 flex items-center justify-center font-black text-[#af101a] font-outfit text-xl shadow-sm">${r.blood_group}</div>
                            <div>
                                <h4 class="text-xl font-black text-slate-900 uppercase tracking-tighter">${r.patient_name}</h4>
                                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">${r.hospital_location}</p>
                            </div>
                        </div>
                        <span class="px-6 py-2 text-[9px] font-black uppercase tracking-widest rounded-2xl border ${r.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}">${r.status}</span>
                    </div>
                    
                    ${r.donor_id && r.status === 'Approved' ? `
                    <div class="bg-white/50 p-6 rounded-3xl space-y-4 border border-slate-100">
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 rounded-xl bg-[#af101a]/5 text-[#af101a] flex items-center justify-center">
                                <span class="material-symbols-outlined text-lg">volunteer_activism</span>
                            </div>
                            <div>
                                <p class="text-[8px] font-black text-slate-300 uppercase tracking-widest">Matched Donor</p>
                                <p class="text-[10px] font-black text-slate-900 uppercase tracking-tighter">${r.donor_name}</p>
                            </div>
                        </div>
                        <div class="flex gap-3" id="donor-actions-${r.id}">
                            <div class="animate-pulse h-10 w-full bg-slate-100 rounded-xl"></div>
                        </div>
                    </div>
                    ` : r.donor_name ? `
                    <div class="bg-white/50 p-4 rounded-2xl flex items-center gap-4 border border-slate-100 opacity-60">
                        <div class="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center">
                            <span class="material-symbols-outlined text-lg">person</span>
                        </div>
                        <div>
                            <p class="text-[8px] font-black text-slate-300 uppercase tracking-widest">Target Donor</p>
                            <p class="text-[10px] font-black text-slate-900 uppercase tracking-tighter">${r.donor_name}</p>
                        </div>
                    </div>
                    ` : `
                    <div class="bg-slate-100/50 p-4 rounded-2xl flex items-center gap-4 border border-slate-50">
                        <div class="w-10 h-10 rounded-xl bg-slate-200 text-slate-400 flex items-center justify-center">
                            <span class="material-symbols-outlined text-lg">public</span>
                        </div>
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">General Network Broadcast</p>
                    </div>
                    `}

                    <div class="flex items-center justify-between pt-4 border-t border-slate-100 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                        <span>Required: ${formatDate(r.required_date)}</span>
                        <span>Appeal ID: ${r.id.slice(0, 8)}</span>
                    </div>
                </div>
            `).join('');

            // Post-render: Fetch donor phones for approved requests
            reqs.filter(r => r.donor_id && r.status === 'Approved').forEach(async r => {
                const { data: donor } = await db.from('profiles').select('phone').eq('id', r.donor_id).single();
                const container = document.getElementById(`donor-actions-${r.id}`);
                if (container && donor?.phone) {
                    container.innerHTML = `
                        <a href="tel:${donor.phone}" class="flex-1 py-3.5 bg-slate-900 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#af101a] transition-all shadow-lg">
                            <span class="material-symbols-outlined text-xs">phone_in_talk</span>
                            Call Donor
                        </a>
                        <a href="https://wa.me/${donor.phone}" target="_blank" class="flex-1 py-3.5 bg-emerald-600 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg">
                            <span class="material-symbols-outlined text-xs">chat</span>
                            WhatsApp
                        </a>
                    `;
                } else if (container) {
                    container.innerHTML = `<p class="text-[8px] font-black text-slate-400 uppercase tracking-widest">Contact not available</p>`;
                }
            });
        };

        // ── 4. Handle Stories ─────────────────────────────
        const renderStories = async () => {
            const list = document.getElementById('my-stories-list');
            const empty = document.getElementById('stories-empty');
            const { data: stories, error } = await db.from('stories').select('*').eq('user_id', userSession.id).order('created_at', { ascending: false });

            if (!stories || stories.length === 0) { empty.classList.remove('hidden'); list.innerHTML = ''; return; }
            empty.classList.add('hidden');
            list.innerHTML = stories.map(s => `
                <div class="bg-white p-8 rounded-[40px] border border-slate-50 shadow-sm group hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
                    <div class="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 group-hover:bg-[#af101a]/5 transition-all"></div>
                    <p class="text-sm font-medium text-slate-500 italic leading-relaxed mb-6 line-clamp-3">"${s.content}"</p>
                    <div class="flex items-center justify-between border-t border-slate-50 pt-6">
                        <span class="text-[9px] font-black text-slate-300 uppercase tracking-widest">${formatDate(s.created_at)}</span>
                        <div class="flex items-center gap-2">
                            <span class="px-3 py-1 bg-slate-50 text-slate-400 text-[8px] font-black uppercase tracking-widest rounded-lg">${s.status}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        };

        document.getElementById('post-story-btn').onclick = async () => {
            const content = document.getElementById('story-input').value.trim();
            if (!content) return;
            const { error } = await db.from('stories').insert([{ user_id: userSession.id, author_name: userSession.full_name, content, status: 'Pending' }]);
            if (!error) {
                document.getElementById('story-input').value = '';
                renderStories();
            }
        };

        // ── 5. Handle Donation Logs ────────────────────────
        window.logDonation = async () => {
            const dateInput = document.getElementById('new-donation-date');
            if (!dateInput.value) return;

            const { data: profile } = await db.from('profiles').select('times_donated, bags_donated').eq('id', userSession.id).single();
            const newTimes = (profile?.times_donated || 0) + 1;
            const newBags = (profile?.bags_donated || 0) + 1;

            const { error } = await db.from('profiles').update({ 
                last_donation_date: dateInput.value,
                times_donated: newTimes,
                bags_donated: newBags
            }).eq('id', userSession.id);

            if (!error) {
                dateInput.value = '';
                fetchProfile();
                renderDonationDates();
                alert("Donation logged! Status updated.");
            }
        };

        const renderDonationDates = async () => {
            const list = document.getElementById('donation-dates-list');
            const empty = document.getElementById('donations-empty');
            const { data: profile } = await db.from('profiles').select('last_donation_date, times_donated').eq('id', userSession.id).single();

            if (!profile?.last_donation_date) { empty.classList.remove('hidden'); list.innerHTML = ''; return; }
            empty.classList.add('hidden');
            list.innerHTML = `
                <div class="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 flex items-center justify-between">
                    <div class="flex items-center gap-5">
                        <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#af101a] shadow-sm">
                            <span class="material-symbols-outlined">event_available</span>
                        </div>
                        <div>
                            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last Gift Date</p>
                            <h4 class="text-sm font-black text-slate-900 uppercase tracking-tighter">${formatDate(profile.last_donation_date)}</h4>
                        </div>
                    </div>
                    <p class="text-[9px] font-black text-[#af101a] uppercase tracking-widest bg-red-50 px-4 py-2 rounded-xl">Impact: Life Saved</p>
                </div>
            `;
        };

        // ── 7. Utility: Switch Tabs ───────────────────────
        window.switchTab = (tab) => {
            const tabs = ['activity', 'stories', 'donations', 'requests'];
            tabs.forEach(t => {
                const btn = document.getElementById(`tab-btn-${t}`);
                const content = document.getElementById(`tab-content-${t}`);
                if (t === tab) {
                    btn.className = "flex-1 py-4 px-6 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all bg-[#af101a] text-white shadow-xl shadow-[#af101a]/20";
                    content.classList.remove('hidden');
                } else {
                    btn.className = "flex-1 py-4 px-6 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all text-slate-400 hover:text-slate-900";
                    content.classList.add('hidden');
                }
            });
        };

        // Initial Load
        fetchProfile();
        renderActivity();
        renderAppeals();
        renderStories();
        renderDonationDates();
    }
};


