import { db } from '../js/db.js';

export const AdminSettings = {
    render: () => {
        return `
        <div class="flex min-h-screen bg-[#f8fafc]">
            ${window.AdminSidebar()}
            <main class="flex-1 p-10 pt-20 max-w-6xl mx-auto space-y-12">
                <header class="animate-fade-in">
                    <p class="text-[10px] font-black text-[#af101a] uppercase tracking-[0.4em] mb-2">Platform Configuration</p>
                    <h1 class="text-5xl font-black text-slate-900 font-outfit uppercase tracking-tighter">Command <span class="text-slate-300">Settings</span></h1>
                </header>

                <div class="grid grid-cols-1 gap-12">
                    <!-- Dynamic Hero Control -->
                    <section class="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-10">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-[#af101a]/10 text-[#af101a] flex items-center justify-center">
                                    <span class="material-symbols-outlined">campaign</span>
                                </div>
                                <h2 class="text-xl font-black text-slate-900 uppercase tracking-tighter">Hero Branding</h2>
                            </div>
                            <button id="save-hero-btn" class="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Update Headlines</button>
                        </div>
                        <div class="grid grid-cols-1 gap-6">
                            <div class="space-y-2">
                                <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-4">Main Title</label>
                                <input type="text" id="admin-hero-title" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-sm outline-none">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-4">Sub-headline</label>
                                <textarea id="admin-hero-subtitle" class="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-4 font-medium text-sm outline-none resize-none h-24"></textarea>
                            </div>
                        </div>
                    </section>

                    <!-- General Settings -->
                    <section class="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-10">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <span class="material-symbols-outlined">contact_support</span>
                                </div>
                                <h2 class="text-xl font-black text-slate-900 uppercase tracking-tighter">Core Contact info</h2>
                            </div>
                            <button id="save-settings-btn" class="px-8 py-3 bg-[#af101a] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-red-500/20 hover:scale-105 transition-all">Synchronize Settings</button>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="space-y-6">
                                <div class="space-y-2"><label class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-4">Address</label><input type="text" id="admin-address" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-sm outline-none"></div>
                                <div class="space-y-2"><label class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-4">Help-line</label><input type="text" id="admin-phone" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-sm outline-none"></div>
                                <div class="space-y-2"><label class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-4">Official Email</label><input type="text" id="admin-email" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-sm outline-none"></div>
                                <div class="space-y-2"><label class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-4">Google Maps Embed URL</label><input type="text" id="admin-map" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-sm outline-none" placeholder="https://www.google.com/maps/embed?..."></div>
                            </div>
                            <div class="space-y-6">
                                <div class="space-y-2">
                                    <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-4">Footer Mission</label>
                                    <textarea id="admin-footer-desc" class="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-5 font-medium text-sm outline-none resize-none leading-relaxed h-24"></textarea>
                                </div>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="space-y-2">
                                        <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-4">Founder Name</label>
                                        <input type="text" id="admin-founder-name" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-sm outline-none">
                                    </div>
                                    <div class="space-y-2">
                                        <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest px-4">Founder Role</label>
                                        <input type="text" id="admin-founder-role" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-sm outline-none">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Committee -->
                    <section class="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-10">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><span class="material-symbols-outlined">groups</span></div>
                                <h2 class="text-xl font-black text-slate-900 uppercase tracking-tighter">Executive Committee</h2>
                            </div>
                            <button id="add-member-btn" class="px-8 py-3 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">Add Executive</button>
                        </div>
                        <div id="admin-members-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
                    </section>

                    <!-- News -->
                    <section class="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-10">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center"><span class="material-symbols-outlined">newspaper</span></div>
                                <h2 class="text-xl font-black text-slate-900 uppercase tracking-tighter">Broadcasting Hub</h2>
                            </div>
                            <button id="add-news-btn" class="px-8 py-3 bg-amber-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">New Broadcast</button>
                        </div>
                        <div id="admin-news-list" class="grid grid-cols-1 md:grid-cols-2 gap-8"></div>
                    </section>

                    <!-- Data Management -->
                    <section class="bg-slate-900 p-10 lg:p-16 rounded-[64px] shadow-2xl relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-96 h-96 bg-[#af101a]/10 blur-[120px] rounded-full"></div>
                        <div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                            <div>
                                <h2 class="text-4xl font-black text-white font-outfit uppercase tracking-tighter mb-4">System Intelligence <span class="text-slate-500">& Cleanup</span></h2>
                                <p class="text-slate-400 text-sm max-w-lg leading-relaxed uppercase tracking-widest font-bold">Perform sensitive data operations. These actions are permanent and affect the entire pulse network synchronization.</p>
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
                                <button onclick="window.bulkDelete('requests')" class="px-8 py-5 bg-white/5 border border-white/10 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-[#af101a] transition-all flex items-center justify-center gap-3">
                                    <span class="material-symbols-outlined text-sm">campaign</span> Clear Appeals
                                </button>
                                <button onclick="window.bulkDelete('stories')" class="px-8 py-5 bg-white/5 border border-white/10 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-[#af101a] transition-all flex items-center justify-center gap-3">
                                    <span class="material-symbols-outlined text-sm">history_edu</span> Clear Stories
                                </button>
                                <button onclick="window.bulkDelete('notifications')" class="px-8 py-5 bg-white/5 border border-white/10 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-[#af101a] transition-all flex items-center justify-center gap-3">
                                    <span class="material-symbols-outlined text-sm">notifications_off</span> Clear Alerts
                                </button>
                                <button onclick="window.bulkDelete('all')" class="px-8 py-5 bg-red-600 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-900/40 flex items-center justify-center gap-3">
                                    <span class="material-symbols-outlined text-sm">dangerous</span> Wipe Data
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
        `;
    },
    afterRender: async () => {
        // Load Settings
        const loadSettings = async () => {
            const { data } = await db.from('platform_settings').select('*').eq('id', 'config').single();
            if (data) {
                document.getElementById('admin-hero-title').value = data.hero_title || '';
                document.getElementById('admin-hero-subtitle').value = data.hero_subtitle || '';
                document.getElementById('admin-address').value = data.address || '';
                document.getElementById('admin-phone').value = data.phone || '';
                document.getElementById('admin-email').value = data.email || '';
                document.getElementById('admin-footer-desc').value = data.footer_description || '';
                document.getElementById('admin-map').value = data.map_url || '';
                document.getElementById('admin-founder-name').value = data.founder_name || 'Nasim Uddin Shawrab';
                document.getElementById('admin-founder-role').value = data.founder_role || 'Lead Developer & Platform Founder';
            }
        };

        // Save Hero
        document.getElementById('save-hero-btn').onclick = async () => {
            const updates = {
                hero_title: document.getElementById('admin-hero-title').value,
                hero_subtitle: document.getElementById('admin-hero-subtitle').value,
                updated_at: new Date()
            };
            const { error } = await db.from('platform_settings').update(updates).eq('id', 'config');
            if (!error) alert('Hero Content Updated!');
        };

        // Save General
        document.getElementById('save-settings-btn').onclick = async () => {
            const btn = document.getElementById('save-settings-btn');
            const originalText = btn.innerText;
            btn.innerText = 'Synchronizing...';
            btn.disabled = true;

            const updates = {
                id: 'config',
                address: document.getElementById('admin-address').value,
                phone: document.getElementById('admin-phone').value,
                email: document.getElementById('admin-email').value,
                footer_description: document.getElementById('admin-footer-desc').value,
                map_url: document.getElementById('admin-map').value,
                founder_name: document.getElementById('admin-founder-name').value,
                founder_role: document.getElementById('admin-founder-role').value,
                updated_at: new Date()
            };
            
            const { error } = await db.from('platform_settings').upsert(updates);
            
            if (error) {
                console.error('Sync Error:', error);
                alert('Sync Failed: ' + error.message);
            } else {
                alert('Contact Info Synchronized!');
            }

            btn.innerText = originalText;
            btn.disabled = false;
        };

        // Committee Logic
        const renderMembers = async () => {
            const { data: members } = await db.from('committee').select('*').order('created_at', { ascending: true });
            const list = document.getElementById('admin-members-list');
            if (list) {
                list.innerHTML = (members || []).map(m => `
                    <div class="bg-slate-50 p-6 rounded-[32px] border border-slate-100 flex items-center gap-4 group">
                        <div class="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm">
                            <img src="${m.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=af101a&color=fff`}" class="w-full h-full object-cover">
                        </div>
                        <div class="flex-1">
                            <p class="text-[10px] font-black text-slate-900 uppercase tracking-tighter">${m.name}</p>
                            <p class="text-[8px] font-black text-[#af101a] uppercase tracking-widest">${m.role}</p>
                        </div>
                        <button onclick="window.deleteCommitteeMember('${m.id}')" class="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100">
                            <span class="material-symbols-outlined text-sm">delete</span>
                        </button>
                    </div>
                `).join('');
            }
        };

        window.deleteCommitteeMember = async (id) => {
            if (confirm('Permanently remove this executive?')) {
                await db.from('committee').delete().eq('id', id);
                renderMembers();
            }
        };

        document.getElementById('add-member-btn').onclick = async () => {
            const name = prompt('Executive Name:');
            const role = prompt('Designation (e.g. President):');
            const image_url = prompt('Profile Image URL (Optional):');
            if (name && role) {
                await db.from('committee').insert({ name, role, image_url });
                renderMembers();
            }
        };

        // News Logic
        const renderNews = async () => {
            const { data: news } = await db.from('news').select('*').order('created_at', { ascending: false });
            const list = document.getElementById('admin-news-list');
            if (list) {
                list.innerHTML = (news || []).map(n => `
                    <div class="bg-slate-50 p-8 rounded-[32px] border border-slate-100 relative group">
                        <h4 class="text-sm font-black text-slate-900 uppercase mb-2">${n.title}</h4>
                        <p class="text-xs text-slate-500 line-clamp-2">${n.body}</p>
                        <button onclick="window.deleteNewsItem('${n.id}')" class="absolute top-6 right-6 w-10 h-10 bg-white rounded-xl shadow-sm text-red-400 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center hover:text-red-600">
                            <span class="material-symbols-outlined text-lg">delete</span>
                        </button>
                    </div>
                `).join('');
            }
        };

        window.deleteNewsItem = async (id) => {
            if (confirm('Delete this broadcast?')) {
                await db.from('news').delete().eq('id', id);
                renderNews();
            }
        };

        document.getElementById('add-news-btn').onclick = async () => {
            const title = prompt('Broadcast Title:');
            const body = prompt('Content Body:');
            if (title && body) {
                await db.from('news').insert({ title, body });
                renderNews();
            }
        };

        window.bulkDelete = async (type) => {
            const warning = type === 'all' 
                ? "DANGER: You are about to wipe ALL requests, stories, and notifications. This cannot be undone. Continue?"
                : `Are you sure you want to permanently delete all ${type}?`;
            
            if (!confirm(warning)) return;
            if (type === 'all' && !confirm("FINAL CONFIRMATION: Are you absolutely sure?")) return;

            try {
                if (type === 'requests' || type === 'all') await db.from('requests').delete().neq('status', 'PROTECTED_NONE');
                if (type === 'stories' || type === 'all') await db.from('stories').delete().neq('status', 'PROTECTED_NONE');
                if (type === 'notifications' || type === 'all') await db.from('notifications').delete().neq('type', 'SYSTEM_RESERVED_PROTECTION');
                if (type === 'all') {
                    await db.from('profiles').update({ donation_dates: [] }).neq('full_name', 'SYSTEM_RESERVED_PROTECTION');
                    await db.from('gallery').delete().neq('url', 'SYSTEM_RESERVED_PROTECTION');
                }
                
                alert("Data cleanup successful.");
                window.location.reload();
            } catch (err) {
                alert("Operation failed: " + err.message);
            }
        };

        loadSettings();
        renderMembers();
        renderNews();
    }
};


