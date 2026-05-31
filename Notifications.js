import { db } from '../js/db.js';

export const Notifications = {
    render: () => {
        const isAdmin = localStorage.getItem('bloodpulse_role') === 'admin';

        if (isAdmin) {
            return `
            <div class="flex min-h-screen bg-[#f8fafc]">
                ${window.AdminSidebar()}
                <main class="flex-1 p-10 max-w-7xl mx-auto">
                    <header class="mb-16 animate-fade-in flex flex-col md:flex-row justify-between items-end gap-6">
                        <div class="space-y-4">
                            <div class="inline-flex items-center gap-3 px-4 py-2 bg-slate-900 rounded-full">
                                <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                <span class="text-[9px] font-black uppercase tracking-[0.4em] text-white">System Monitor Active</span>
                            </div>
                            <h1 class="text-6xl md:text-8xl font-black text-slate-900 font-outfit uppercase tracking-tighter leading-none">Activity <span class="text-slate-200">Matrix</span></h1>
                        </div>
                        <div class="flex gap-4">
                            <button onclick="window.location.reload()" class="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-[#af101a] transition-all shadow-sm">
                                <span class="material-symbols-outlined">sync</span>
                            </button>
                        </div>
                    </header>

                    <div id="admin-notif-feed" class="grid grid-cols-1 gap-6 animate-slide-up">
                        <!-- Logs injected here -->
                    </div>
                    
                    <div id="admin-empty" class="hidden flex flex-col items-center justify-center py-40 bg-white rounded-[56px] border border-slate-100 shadow-xl">
                        <div class="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mb-8">
                            <span class="material-symbols-outlined text-4xl text-slate-200">history_toggle_off</span>
                        </div>
                        <h3 class="text-2xl font-black text-slate-900 font-outfit uppercase tracking-tighter mb-2">System Static</h3>
                        <p class="text-sm font-medium text-slate-400">No recent network activity detected.</p>
                    </div>
                </main>
            </div>
            `;
        }

        return `
        <div class="min-h-screen bg-[#f8fafc] pb-40 relative overflow-hidden">
            ${window.UserNavbar()}
            <!-- Decorative Background Elements -->
            <div class="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#af101a]/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
            <div class="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full -z-10 animate-pulse" style="animation-delay: 2s"></div>

            <div class="max-w-4xl mx-auto px-6 relative z-10">
                <header class="text-center mb-20 animate-fade-in space-y-4">
                    <div class="inline-flex items-center gap-3 px-4 py-2 bg-[#af101a]/10 border border-[#af101a]/20 rounded-full mb-4">
                        <span class="w-2 h-2 rounded-full bg-[#af101a] animate-pulse"></span>
                        <span class="text-[9px] font-black uppercase tracking-[0.4em] text-[#af101a]">Network Alerts Live</span>
                    </div>
                    <h1 class="text-6xl md:text-8xl font-black font-outfit uppercase tracking-tighter leading-none text-slate-900">Pulse <span class="text-slate-200">Alerts</span></h1>
                </header>

                <div class="bg-white rounded-[56px] shadow-2xl shadow-slate-200/50 border border-white overflow-hidden animate-slide-up">
                    <div class="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                        <h2 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Recent Activity Matrix</h2>
                        <button onclick="window.location.reload()" class="text-[10px] font-black text-[#af101a] hover:underline uppercase tracking-widest">Refresh Feed</button>
                    </div>

                    <div id="user-notif-feed" class="divide-y divide-slate-50">
                        <!-- Notifications Injected Here -->
                    </div>

                    <div id="user-empty" class="hidden flex flex-col items-center justify-center py-40">
                        <div class="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mb-8">
                            <span class="material-symbols-outlined text-4xl text-slate-200">notifications_off</span>
                        </div>
                        <h3 class="text-2xl font-black text-slate-900 font-outfit uppercase tracking-tighter mb-2">All Quiet</h3>
                        <p class="text-sm font-medium text-slate-400">No new alerts for your pulse profile.</p>
                    </div>
                </div>
            </div>

        </div>
        `;
    },
    afterRender: async () => {
        const isAdmin = localStorage.getItem('bloodpulse_role') === 'admin';
        const user = JSON.parse(localStorage.getItem('bloodpulse_user') || '{}');

        // Utility: Format Time
        const formatTime = (dateStr) => {
            if (!dateStr) return 'Unknown';
            const date = new Date(dateStr);
            const now = new Date();
            const diff = (now - date) / 1000;
            if (diff < 60) return 'Just now';
            if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
            if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
            return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
        };

        const renderUserFeed = (notifs) => {
            const feed = document.getElementById('user-notif-feed');
            const empty = document.getElementById('user-empty');
            if (!feed) return;
            
            if (!notifs || notifs.length === 0) {
                empty?.classList.remove('hidden');
                feed.innerHTML = '';
                return;
            }

            empty?.classList.add('hidden');
            feed.innerHTML = notifs.map(n => {
                const color = n.type === 'alert' ? 'bg-red-50 text-[#af101a]' :
                    n.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                        'bg-blue-50 text-blue-600';
                const icon = n.type === 'alert' ? 'emergency' :
                    n.type === 'success' ? 'verified' :
                        'campaign';

                const msg = n.message || '';
                let phoneMatch = msg.match(/Contact:\s*([\s\d+\-()]{5,})/i) || msg.match(/(\+?88)?01[3-9]\d{8}/);
                let phone = phoneMatch ? (phoneMatch[1] || phoneMatch[0]).trim() : null;

                return `
                    <div class="p-10 flex flex-col md:flex-row gap-8 hover:bg-slate-50/50 transition-all group cursor-pointer relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-24 h-24 bg-slate-50/50 rounded-full -mr-12 -mt-12 group-hover:bg-[#af101a]/5 transition-all"></div>
                        <div class="w-16 h-16 rounded-[28px] ${color} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                            <span class="material-symbols-outlined text-3xl">${icon}</span>
                        </div>
                        <div class="flex-1 relative z-10">
                            <div class="flex justify-between items-start mb-2">
                                <h3 class="text-xl font-black text-slate-900 uppercase tracking-tighter group-hover:text-[#af101a] transition-colors">${n.title}</h3>
                                <span class="text-[9px] font-black text-slate-300 uppercase tracking-widest">${formatTime(n.created_at)}</span>
                            </div>
                            <p class="text-sm font-medium text-slate-400 leading-relaxed max-w-xl mb-6">${msg.split(/Contact:/i)[0].trim()}</p>
                            
                            ${phone ? `
                            <div class="flex flex-wrap gap-4">
                                <a href="tel:${phone}" class="px-8 py-3.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#af101a] transition-all shadow-xl hover:-translate-y-1">
                                    <span class="material-symbols-outlined text-sm">phone_in_talk</span>
                                    Voice Call
                                </a>
                                <a href="https://wa.me/${phone.startsWith('0') ? '88' + phone : phone}" target="_blank" class="px-8 py-3.5 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-xl hover:-translate-y-1">
                                    <span class="material-symbols-outlined text-sm">chat</span>
                                    WhatsApp
                                </a>
                            </div>
                            ` : `
                            <div class="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                <span class="material-symbols-outlined text-xs">no_accounts</span>
                                No Contact Found
                            </div>
                            `}
                        </div>
                    </div>
                `;
            }).join('');
        };

        const loadNotifications = async () => {
            if (isAdmin) {
                const feed = document.getElementById('admin-notif-feed');
                const empty = document.getElementById('admin-empty');

                const { data: profiles } = await db.from('profiles').select('*').order('created_at', { ascending: false }).limit(5);
                const { data: requests } = await db.from('requests').select('*').order('created_at', { ascending: false }).limit(5);
                const { data: stories } = await db.from('stories').select('*').order('created_at', { ascending: false }).limit(5);

                const allEvents = [
                    ...(profiles || []).map(p => ({ ...p, eventType: 'USER', icon: 'person_add', action: 'New Registration', details: `${p.full_name} joined the network.`, color: 'bg-blue-50 text-blue-600' })),
                    ...(requests || []).map(r => ({ ...r, eventType: 'REQUEST', icon: 'emergency', action: 'New Blood Appeal', details: `Request for ${r.blood_group} by ${r.requester_name}.`, color: 'bg-red-50 text-[#af101a]' })),
                    ...(stories || []).map(s => ({ ...s, eventType: 'STORY', icon: 'auto_stories', action: 'Story Published', details: `New story shared by ${s.author_name}.`, color: 'bg-emerald-50 text-emerald-600' }))
                ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                if (!feed) return;
                if (allEvents.length === 0) {
                    empty?.classList.remove('hidden');
                    feed.innerHTML = '';
                    return;
                }
                empty?.classList.add('hidden');
                feed.innerHTML = allEvents.map(ev => `
                    <div class="bg-white p-10 rounded-[48px] border border-slate-50 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex items-center justify-between group">
                        <div class="flex items-center gap-8">
                            <div class="w-16 h-16 rounded-[24px] ${ev.color} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                                <span class="material-symbols-outlined text-3xl">${ev.icon}</span>
                            </div>
                            <div>
                                <div class="flex items-center gap-4 mb-2">
                                    <h3 class="text-xl font-black text-slate-900 uppercase tracking-tighter">${ev.action}</h3>
                                    <span class="px-4 py-1.5 rounded-full bg-slate-50 text-slate-400 text-[8px] font-black uppercase tracking-widest border border-slate-100">${ev.eventType}</span>
                                </div>
                                <p class="text-[11px] font-medium text-slate-400 uppercase tracking-widest">${ev.details}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-[10px] font-black text-slate-300 uppercase tracking-widest">${formatTime(ev.created_at)}</p>
                        </div>
                    </div>
                `).join('');
            } else {
                if (!user.id) return;
                const { data: directNotifs, error } = await db
                    .from('notifications')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(20);

                if (error || !directNotifs || directNotifs.length === 0) {
                    const { data: matchedReqs } = await db
                        .from('requests')
                        .select('*, profiles(phone)')
                        .eq('blood_group', user.blood_group || 'O+')
                        .eq('status', 'Approved')
                        .neq('requester_id', user.id)
                        .order('created_at', { ascending: false })
                        .limit(5);

                    const finalNotifs = (matchedReqs || []).map(r => ({
                        title: 'Emergency Match',
                        message: `Urgent ${r.blood_group} needed at ${r.hospital_location}. Contact: ${r.contact_phone || r.profiles?.phone || 'No contact'}`,
                        type: 'alert',
                        created_at: r.created_at
                    }));
                    renderUserFeed(finalNotifs);
                } else {
                    renderUserFeed(directNotifs);
                }
            }
        };

        await loadNotifications();

        // Real-time Subscriptions (Polling for MSSQL)
        if (window._notifSub) {
            clearInterval(window._notifSub);
            window._notifSub = null;
        }

        // Poll every 5 seconds for new data
        window._notifSub = setInterval(() => {
            loadNotifications();
        }, 5000);
    }
};


