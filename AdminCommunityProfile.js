import { db } from '../js/db.js';

export const AdminCommunityProfile = {
    render: () => {
        return `
        <div class="flex min-h-screen bg-[#f8fafc]">
            ${window.AdminSidebar ? window.AdminSidebar('/admin-community-profile') : ''}
            <main class="flex-1 p-10 pt-20 max-w-7xl mx-auto space-y-12">
                <header class="animate-fade-in flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <div class="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 text-blue-600 rounded-full mb-4">
                            <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                            <span class="text-[9px] font-black uppercase tracking-[0.4em]">Community Registry</span>
                        </div>
                        <h1 class="text-6xl md:text-8xl font-black text-slate-900 font-outfit uppercase tracking-tighter leading-none">Community <span class="text-slate-200">Profile</span></h1>
                        <p class="text-slate-500 font-bold text-sm mt-4 uppercase tracking-widest">Manage the BAUST Blood Donation Executive Board</p>
                    </div>
                    <div class="flex gap-4">
                        <button onclick="window.addCommitteeMember()" class="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center gap-3">
                            <span class="material-symbols-outlined text-xl">person_add</span>
                            New Executive
                        </button>
                    </div>
                </header>

                <!-- Facebook Configuration -->
                <section class="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <span class="material-symbols-outlined">link</span>
                        </div>
                        <h2 class="text-xl font-black text-slate-900 uppercase tracking-tighter">Social Connectivity</h2>
                    </div>
                    <div class="flex flex-col md:flex-row gap-6 items-end">
                        <div class="flex-1 space-y-2">
                            <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Facebook Page URL</label>
                            <input id="admin-fb-url" type="url" placeholder="https://facebook.com/..." class="w-full bg-slate-50 p-6 rounded-3xl border border-slate-100 text-slate-900 text-sm font-bold focus:bg-white focus:border-blue-500/50 outline-none transition-all">
                        </div>
                        <button id="save-fb-btn" onclick="window.saveFbUrl()" class="px-10 py-6 bg-blue-600 text-white rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-105 transition-all">
                            Update URL
                        </button>
                    </div>
                </section>

                <!-- Members List -->
                <div class="space-y-6">
                    <div class="flex items-center justify-between">
                        <h2 class="text-2xl font-black text-slate-900 font-outfit uppercase tracking-tighter">Executive Board</h2>
                        <span id="member-count" class="px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">0 Members</span>
                    </div>
                    
                    <div id="committee-feed" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <!-- Members Injected Here -->
                    </div>
                </div>
            </main>

            <!-- Modal for Member -->
            <div id="member-modal" class="fixed inset-0 z-[1000] hidden flex items-center justify-center p-4">
                <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onclick="window.closeMemberModal()"></div>
                <div class="bg-white w-full max-w-2xl rounded-[56px] border border-slate-100 shadow-2xl relative z-10 p-12 overflow-hidden max-h-[90vh] overflow-y-auto">
                    <h2 class="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-8">Member <span class="text-slate-200">Identity</span></h2>
                    <form id="member-form" class="space-y-8">
                        <div class="grid grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                                <input id="m-name" placeholder="Name" class="w-full bg-slate-50 p-6 rounded-3xl border border-slate-100 text-sm font-bold outline-none focus:border-blue-500/30" required>
                            </div>
                            <div class="space-y-2">
                                <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Role/Designation</label>
                                <input id="m-role" placeholder="e.g. President" class="w-full bg-slate-50 p-6 rounded-3xl border border-slate-100 text-sm font-bold outline-none focus:border-blue-500/30" required>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Phone Number</label>
                                <input id="m-phone" placeholder="017..." class="w-full bg-slate-50 p-6 rounded-3xl border border-slate-100 text-sm font-bold outline-none focus:border-blue-500/30" required>
                            </div>
                            <div class="space-y-2">
                                <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Blood Group</label>
                                <select id="m-blood" class="w-full bg-slate-50 p-6 rounded-3xl border border-slate-100 text-sm font-bold outline-none focus:border-blue-500/30">
                                    <option value="O+">O+</option><option value="O-">O-</option>
                                    <option value="A+">A+</option><option value="A-">A-</option>
                                    <option value="B+">B+</option><option value="B-">B-</option>
                                    <option value="AB+">AB+</option><option value="AB-">AB-</option>
                                </select>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Department/Institution</label>
                            <input id="m-dept" placeholder="Dept. of CSE, BAUST" class="w-full bg-slate-50 p-6 rounded-3xl border border-slate-100 text-sm font-bold outline-none focus:border-blue-500/30" required>
                        </div>
                        <div class="space-y-2">
                            <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Photo URL</label>
                            <input id="m-image" placeholder="https://..." class="w-full bg-slate-50 p-6 rounded-3xl border border-slate-100 text-sm font-bold outline-none focus:border-blue-500/30">
                        </div>
                        <button type="submit" class="w-full py-6 bg-slate-900 text-white rounded-[28px] font-black text-[10px] uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
                            Synchronize Identity
                        </button>
                    </form>
                </div>
            </div>
        </div>
        `;
    },
    afterRender: async () => {
        const feed = document.getElementById('committee-feed');
        const countEl = document.getElementById('member-count');
        const fbInput = document.getElementById('admin-fb-url');

        const loadSettings = async () => {
            const { data } = await db.from('platform_settings').select('facebook_url').eq('id', 'config').single();
            if (data && fbInput) fbInput.value = data.facebook_url || '';
        };

        const loadMembers = async () => {
            const { data, error } = await db.from('committee').select('*').order('created_at', { ascending: true });
            if (error) return;
            
            if (countEl) countEl.textContent = `${data.length} Members`;
            
            feed.innerHTML = data.map(m => `
                <div class="bg-white p-10 rounded-[56px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group text-center space-y-6">
                    <div class="relative inline-block">
                        <img src="${m.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=af101a&color=fff`}" 
                             class="w-28 h-28 rounded-[40px] mx-auto border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-500 object-cover">
                        <div class="absolute -bottom-2 -right-2 w-10 h-10 bg-red-600 border-4 border-white rounded-2xl flex items-center justify-center text-white text-[10px] font-black">${m.blood_group || '??'}</div>
                    </div>
                    <div>
                        <h3 class="text-xl font-black text-slate-900 uppercase tracking-tighter">${m.name}</h3>
                        <p class="text-[9px] font-black text-blue-600 uppercase tracking-widest mt-1">${m.role}</p>
                        <p class="text-[9px] font-bold text-slate-400 mt-1">${m.department || 'BAUST'}</p>
                    </div>
                    <div class="flex items-center justify-center gap-3">
                        <button onclick="window.deleteMember('${m.id}')" class="w-12 h-12 bg-slate-50 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all flex items-center justify-center">
                            <span class="material-symbols-outlined text-lg">delete</span>
                        </button>
                        <a href="https://wa.me/${m.phone?.startsWith('0') ? '88'+m.phone : m.phone}" target="_blank" class="flex-1 py-3 bg-emerald-600 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg">
                            <span class="material-symbols-outlined text-sm">chat</span> WhatsApp
                        </a>
                    </div>
                </div>
            `).join('');
        };

        window.saveFbUrl = async () => {
            const btn = document.getElementById('save-fb-btn');
            btn.innerHTML = 'Syncing...';
            const { error } = await db.from('platform_settings').upsert({ id: 'config', facebook_url: fbInput.value });
            if (error) alert('Error: ' + error.message);
            else if (window.showToast) window.showToast('Facebook URL Updated', 'success');
            btn.innerHTML = 'Update URL';
        };

        window.addCommitteeMember = () => {
            document.getElementById('member-modal').classList.remove('hidden');
            document.getElementById('member-form').reset();
        };

        window.closeMemberModal = () => document.getElementById('member-modal').classList.add('hidden');

        document.getElementById('member-form').onsubmit = async (e) => {
            e.preventDefault();
            const payload = {
                name: document.getElementById('m-name').value,
                role: document.getElementById('m-role').value,
                phone: document.getElementById('m-phone').value,
                blood_group: document.getElementById('m-blood').value,
                department: document.getElementById('m-dept').value,
                image_url: document.getElementById('m-image').value || null
            };

            const { error } = await db.from('committee').insert(payload);
            if (!error) {
                window.closeMemberModal();
                await loadMembers();
                if (window.showToast) window.showToast('Member added successfully', 'success');
            } else {
                alert('Sync failed: ' + error.message);
            }
        };

        window.deleteMember = async (id) => {
            if (confirm('Permanently remove this member?')) {
                const { error } = await db.from('committee').delete().eq('id', id);
                if (!error) await loadMembers();
            }
        };

        await loadSettings();
        await loadMembers();
    }
};


