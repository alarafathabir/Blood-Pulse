import { db } from '../js/db.js';

export const UpdateProfile = {
    render: () => {
        return `
            <div class="min-h-screen bg-[#fbf9f8] pb-32 relative overflow-hidden font-inter pt-32">
                <!-- High-Impact Background -->
                <div class="fixed top-0 right-0 w-[50%] h-[50%] bg-[#af101a]/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
                <div class="fixed bottom-0 left-0 w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full -z-10 animate-pulse" style="animation-delay: 2s"></div>

                <!-- Navigation Header -->
                <header class="fixed top-0 left-0 w-full z-[100] px-12 py-8 flex justify-between items-center backdrop-blur-md bg-white/30 border-b border-white/20">
                    <button onclick="window.goToPanel()" class="flex items-center gap-4 group">
                        <div class="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-slate-400 group-hover:text-[#af101a] group-hover:rotate-[-10deg] transition-all">
                            <span class="material-symbols-outlined">arrow_back</span>
                        </div>
                        <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-900 transition-colors">Back to Panel</span>
                    </button>
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-[#af101a] rounded-xl flex items-center justify-center text-white shadow-lg">
                            <span class="material-symbols-outlined text-sm">security</span>
                        </div>
                        <p class="text-[9px] font-black text-slate-900 uppercase tracking-widest">Secure Profile Sync</p>
                    </div>
                </header>

                <main class="max-w-7xl mx-auto px-6 relative z-20">
                    <div id="profile-loader" class="flex flex-col items-center justify-center py-40 animate-pulse">
                        <div class="w-16 h-16 border-4 border-[#af101a]/20 border-t-[#af101a] rounded-full animate-spin mb-6"></div>
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Syncing Pulse Identity...</p>
                    </div>

                    <div id="profile-content" class="hidden grid grid-cols-1 lg:grid-cols-12 gap-12 animate-fade-in">
                        <!-- Left Sidebar: Visual Identity -->
                        <div class="lg:col-span-4 space-y-8">
                            <div class="bg-white p-12 rounded-[56px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] text-center relative overflow-hidden border border-white">
                                <div class="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-[#af101a] to-[#86000d]"></div>
                                
                                <div class="relative z-10">
                                    <div class="w-32 h-32 rounded-[40px] bg-white p-1 shadow-2xl mx-auto mb-6 relative group cursor-pointer" onclick="document.getElementById('profile-image-input').click()">
                                        <img id="avatar-preview" src="" class="w-full h-full rounded-[38px] object-cover transition-transform duration-700 group-hover:scale-110">
                                        <div class="absolute inset-0 bg-black/40 rounded-[38px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                            <span class="material-symbols-outlined">photo_camera</span>
                                        </div>
                                        <input type="file" id="profile-image-input" class="hidden" accept="image/*">
                                    </div>
                                    <h2 id="display-name" class="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none">...</h2>
                                    <p id="display-rank" class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-3">Verified Donor</p>
                                    
                                    <div class="mt-10 pt-10 border-t border-slate-50 grid grid-cols-2 gap-4">
                                        <div>
                                            <p class="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Blood Group</p>
                                            <p id="display-blood" class="text-xl font-black text-[#af101a] uppercase">...</p>
                                        </div>
                                        <div>
                                            <p class="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Bags Donated</p>
                                            <p id="display-bags" class="text-xl font-black text-slate-900 uppercase">0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Progress Navigator -->
                            <div class="bg-white/50 backdrop-blur-xl rounded-[48px] p-8 border border-white space-y-4">
                                <button type="button" onclick="window.scrollToSection('identity')" class="w-full flex items-center gap-4 p-4 rounded-3xl hover:bg-white transition-all group">
                                    <div class="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#af101a] group-hover:text-white transition-all">
                                        <span class="material-symbols-outlined text-sm">person</span>
                                    </div>
                                    <span class="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900">Identity</span>
                                </button>
                                <button type="button" onclick="window.scrollToSection('location')" class="w-full flex items-center gap-4 p-4 rounded-3xl hover:bg-white transition-all group">
                                    <div class="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#af101a] group-hover:text-white transition-all">
                                        <span class="material-symbols-outlined text-sm">map</span>
                                    </div>
                                    <span class="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900">Location</span>
                                </button>
                                <button type="button" onclick="window.scrollToSection('occupation')" class="w-full flex items-center gap-4 p-4 rounded-3xl hover:bg-white transition-all group">
                                    <div class="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#af101a] group-hover:text-white transition-all">
                                        <span class="material-symbols-outlined text-sm">work</span>
                                    </div>
                                    <span class="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900">Status</span>
                                </button>
                            </div>
                        </div>

                        <!-- Right Content -->
                        <div class="lg:col-span-8 space-y-12">
                            <form id="update-profile-form" class="space-y-12">
                                <!-- Section 1: Identity -->
                                <section id="identity" class="bg-white p-12 lg:p-16 rounded-[64px] border border-white shadow-xl space-y-10">
                                    <div class="flex items-center gap-6 mb-8">
                                        <div class="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white">
                                            <span class="material-symbols-outlined">badge</span>
                                        </div>
                                        <h3 class="text-2xl font-black text-slate-900 uppercase tracking-tighter">Identity</h3>
                                    </div>
                                    
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div class="md:col-span-2 space-y-3">
                                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Full Legal Name</label>
                                            <input id="upd-fullname" class="w-full bg-slate-50 border border-slate-100 rounded-[28px] px-8 py-6 text-slate-900 focus:ring-4 focus:ring-[#af101a]/5 focus:border-[#af101a]/20 transition-all outline-none font-bold text-base shadow-sm" required type="text"/>
                                        </div>
                                        <div class="space-y-3">
                                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Date of Birth</label>
                                            <input id="upd-dob" class="w-full bg-slate-50 border border-slate-100 rounded-[28px] px-8 py-6 text-slate-900 focus:ring-4 focus:ring-[#af101a]/5 focus:border-[#af101a]/20 transition-all outline-none font-bold text-base shadow-sm" required type="date"/>
                                        </div>
                                        <div class="space-y-3">
                                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Blood Group (Locked)</label>
                                            <div class="relative group">
                                                <input id="upd-bloodgroup" class="w-full bg-slate-100 border border-slate-100 rounded-[28px] px-8 py-6 text-slate-400 outline-none font-bold text-base cursor-not-allowed shadow-sm" readonly type="text"/>
                                                <button type="button" onclick="window.openBloodRequestModal()" class="absolute right-6 top-1/2 -translate-y-1/2 text-[9px] font-black text-[#af101a] uppercase tracking-widest hover:underline">Request Change</button>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <!-- Section 2: Location (Unified) -->
                                <section id="location" class="bg-white p-12 lg:p-16 rounded-[64px] border border-white shadow-xl space-y-10">
                                    <div class="flex items-center gap-6 mb-8">
                                        <div class="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white">
                                            <span class="material-symbols-outlined">map</span>
                                        </div>
                                        <h3 class="text-2xl font-black text-slate-900 uppercase tracking-tighter">Location</h3>
                                    </div>
                                    
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div class="space-y-3">
                                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Division</label>
                                            <input id="upd-division" class="w-full bg-slate-50 border border-slate-100 rounded-[28px] px-8 py-6 text-slate-900 focus:ring-4 focus:ring-[#af101a]/5 transition-all outline-none font-bold text-base" placeholder="e.g. Rangpur" type="text"/>
                                        </div>
                                        <div class="space-y-3">
                                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">District</label>
                                            <input id="upd-district" class="w-full bg-slate-50 border border-slate-100 rounded-[28px] px-8 py-6 text-slate-900 focus:ring-4 focus:ring-[#af101a]/5 transition-all outline-none font-bold text-base" placeholder="e.g. Dinajpur" type="text" required/>
                                        </div>
                                        <div class="space-y-3">
                                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Upazila</label>
                                            <input id="upd-upazila" class="w-full bg-slate-50 border border-slate-100 rounded-[28px] px-8 py-6 text-slate-900 focus:ring-4 focus:ring-[#af101a]/5 transition-all outline-none font-bold text-base" placeholder="e.g. Saidpur" type="text" required/>
                                        </div>
                                        <div class="space-y-3">
                                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Village / Specific Area</label>
                                            <input id="upd-village" class="w-full bg-slate-50 border border-slate-100 rounded-[28px] px-8 py-6 text-slate-900 focus:ring-4 focus:ring-[#af101a]/5 transition-all outline-none font-bold text-base" placeholder="e.g. Campus Area" type="text" required/>
                                        </div>
                                    </div>
                                </section>

                                <!-- Section 3: Occupation & Status -->
                                <section id="occupation" class="bg-white p-12 lg:p-16 rounded-[64px] border border-white shadow-xl space-y-10">
                                    <div class="flex items-center gap-6 mb-8">
                                        <div class="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                                            <span class="material-symbols-outlined">work</span>
                                        </div>
                                        <h3 class="text-2xl font-black text-slate-900 uppercase tracking-tighter">Status</h3>
                                    </div>
                                    
                                    <div class="mb-10">
                                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <label class="relative flex cursor-pointer rounded-3xl border border-slate-100 bg-slate-50/50 p-6 hover:bg-slate-100 transition-all items-center gap-4 group">
                                                <input class="sr-only peer" name="statusToggle" type="radio" value="student" id="upd-toggle-student"/>
                                                <div class="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 peer-checked:bg-[#af101a] peer-checked:text-white transition-all">
                                                    <span class="material-symbols-outlined text-2xl">school</span>
                                                </div>
                                                <div class="flex flex-col text-left">
                                                    <span class="font-black text-slate-900 uppercase tracking-tighter text-sm">Student</span>
                                                    <span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Campus Member</span>
                                                </div>
                                                <div class="absolute inset-0 ring-2 ring-[#af101a] rounded-3xl opacity-0 peer-checked:opacity-100 transition-all"></div>
                                            </label>

                                            <label class="relative flex cursor-pointer rounded-3xl border border-slate-100 bg-slate-50/50 p-6 hover:bg-slate-100 transition-all items-center gap-4 group">
                                                <input class="sr-only peer" name="statusToggle" type="radio" value="civilian" id="upd-toggle-civilian"/>
                                                <div class="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 peer-checked:bg-[#af101a] peer-checked:text-white transition-all">
                                                    <span class="material-symbols-outlined text-2xl">person_pin</span>
                                                </div>
                                                <div class="flex flex-col text-left">
                                                    <span class="font-black text-slate-900 uppercase tracking-tighter text-sm">Civilian</span>
                                                    <span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">External Donor</span>
                                                </div>
                                                <div class="absolute inset-0 ring-2 ring-[#af101a] rounded-3xl opacity-0 peer-checked:opacity-100 transition-all"></div>
                                            </label>
                                        </div>
                                    </div>

                                    <div id="dynamic-occupational-fields" class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <!-- Occupational specific fields (ID, Dept) injected here -->
                                    </div>
                                </section>

                                <!-- Section 4: Stats -->
                                <section id="stats" class="bg-slate-900 p-12 lg:p-16 rounded-[64px] border border-white/10 shadow-2xl space-y-10 text-white">
                                    <div class="flex items-center gap-6 mb-8">
                                        <div class="w-14 h-14 rounded-2xl bg-[#af101a] flex items-center justify-center text-white">
                                            <span class="material-symbols-outlined">monitoring</span>
                                        </div>
                                        <h3 class="text-2xl font-black uppercase tracking-tighter">Donation Track</h3>
                                    </div>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div class="space-y-3">
                                            <label class="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Times Donated</label>
                                            <input id="upd-times-donated" class="w-full bg-white/5 border border-white/10 rounded-[28px] px-8 py-6 text-white outline-none font-bold text-base" type="number" min="0"/>
                                        </div>
                                        <div class="space-y-3">
                                            <label class="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Total Bags</label>
                                            <input id="upd-bags-donated" class="w-full bg-white/5 border border-white/10 rounded-[28px] px-8 py-6 text-white outline-none font-bold text-base" type="number" min="0"/>
                                        </div>
                                    </div>
                                </section>

                                <div id="upd-status-bar" class="hidden rounded-[32px] p-8 animate-zoom-in shadow-2xl"></div>

                                <button id="upd-submit-btn" class="w-full px-20 py-8 bg-[#af101a] text-white rounded-[40px] font-black text-xs uppercase tracking-[0.4em] shadow-2xl shadow-red-500/20 hover:bg-red-700 transition-all active:scale-95 flex items-center justify-center gap-4" type="submit">
                                    Commit Pulse Changes
                                    <span class="material-symbols-outlined">verified</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </main>

                <!-- Blood Group Modal -->
                <div id="blood-request-modal" class="fixed inset-0 z-[2000] hidden flex items-center justify-center p-4">
                    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onclick="window.closeBloodRequestModal()"></div>
                    <div class="bg-white rounded-[48px] w-full max-w-lg shadow-2xl relative z-10 overflow-hidden animate-zoom-in border border-white">
                        <div class="p-10">
                            <h2 class="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2 text-center">Change Request</h2>
                            <p class="text-[10px] font-black text-slate-400 mb-10 text-center uppercase tracking-widest">Administrative approval required</p>
                            
                            <div class="space-y-6">
                                <select id="req-new-group" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold outline-none">
                                    <option value="A+">A+</option><option value="A-">A-</option>
                                    <option value="B+">B+</option><option value="B-">B-</option>
                                    <option value="O+">O+</option><option value="O-">O-</option>
                                    <option value="AB+">AB+</option><option value="AB-">AB-</option>
                                </select>
                                <textarea id="req-reason" rows="3" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-medium outline-none" placeholder="Reason for change..."></textarea>
                                <button onclick="window.submitBloodRequest()" id="req-submit-btn" class="w-full bg-[#af101a] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl">Submit to Registry</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    afterRender: async () => {
        const userSession = JSON.parse(localStorage.getItem('bloodpulse_user') || '{}');
        const userId = userSession.id;
        if (!userId) { window.goTo('/login'); return; }

        const loader = document.getElementById('profile-loader');
        const content = document.getElementById('profile-content');
        const form = document.getElementById('update-profile-form');
        const dynamicContainer = document.getElementById('dynamic-occupational-fields');
        const toggles = document.getElementsByName('statusToggle');
        const photoInput = document.getElementById('profile-image-input');
        const photoPreview = document.getElementById('avatar-preview');
        const submitBtn = document.getElementById('upd-submit-btn');
        const statusBar = document.getElementById('upd-status-bar');

        let profileData = null;

        window.scrollToSection = (id) => document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'center' });

        const renderOccupationalFields = (type, data = {}) => {
            if (type === 'student') {
                dynamicContainer.innerHTML = `
                    <div class="space-y-3">
                        <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Department</label>
                        <input id="upd-dept" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold" value="${data.department || ''}" placeholder="e.g. CSE"/>
                    </div>
                    <div class="space-y-3">
                        <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Student ID</label>
                        <input id="upd-sid" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold" value="${data.student_id || ''}" placeholder="ID Number"/>
                    </div>
                `;
            } else {
                dynamicContainer.innerHTML = `
                    <div class="space-y-3 md:col-span-2">
                        <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">NID/Birth ID</label>
                        <input id="upd-nid" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold" value="${data.nid_birth_id || ''}" placeholder="ID Number"/>
                    </div>
                `;
            }
        };

        const loadProfile = async () => {
            const { data, error } = await db.from('profiles').select('*').eq('id', userId).single();
            if (error) { loader.innerHTML = `<p class='text-red-500'>Profile not found.</p>`; return; }
            profileData = data;
            
            document.getElementById('upd-fullname').value = data.full_name || '';
            document.getElementById('upd-dob').value = data.dob ? data.dob.split('T')[0] : '';
            document.getElementById('upd-bloodgroup').value = data.blood_group || '';
            document.getElementById('upd-division').value = data.division || '';
            document.getElementById('upd-district').value = data.district || '';
            document.getElementById('upd-upazila').value = data.upazila || '';
            document.getElementById('upd-village').value = data.village || '';
            document.getElementById('upd-times-donated').value = data.times_donated || 0;
            document.getElementById('upd-bags-donated').value = data.bags_donated || 0;
            
            document.getElementById('display-name').innerText = data.full_name || '...';
            document.getElementById('display-blood').innerText = data.blood_group || '...';
            document.getElementById('display-bags').innerText = data.bags_donated || 0;
            
            const designation = data.occupational_designation === 'civilian' ? 'civilian' : 'student';
            document.getElementById(`upd-toggle-${designation}`).checked = true;
            renderOccupationalFields(designation, data);

            photoPreview.src = data.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.full_name}`;
            loader.classList.add('hidden'); content.classList.remove('hidden');
        };

        await loadProfile();

        [...toggles].forEach(radio => radio.addEventListener('change', (e) => renderOccupationalFields(e.target.value, profileData)));

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerText = 'SYNCHRONIZING...';

            const designation = form.querySelector('input[name="statusToggle"]:checked').value;
            const updates = {
                full_name: document.getElementById('upd-fullname').value,
                dob: document.getElementById('upd-dob').value,
                division: document.getElementById('upd-division').value,
                district: document.getElementById('upd-district').value,
                upazila: document.getElementById('upd-upazila').value,
                village: document.getElementById('upd-village').value,
                times_donated: parseInt(document.getElementById('upd-times-donated').value) || 0,
                bags_donated: parseInt(document.getElementById('upd-bags-donated').value) || 0,
                occupational_designation: designation,
                updated_at: new Date().toISOString()
            };

            if (designation === 'student') {
                updates.department = document.getElementById('upd-dept')?.value;
                updates.student_id = document.getElementById('upd-sid')?.value;
                updates.nid_birth_id = null;
            } else {
                updates.nid_birth_id = document.getElementById('upd-nid')?.value;
                updates.department = null; updates.student_id = null;
            }

            const { error } = await db.from('profiles').update(updates).eq('id', userId);
            if (error) {
                statusBar.className = "bg-red-500 text-white p-6 rounded-3xl mt-8 block";
                statusBar.innerText = "Error: " + error.message;
            } else {
                statusBar.className = "bg-emerald-500 text-white p-6 rounded-3xl mt-8 block";
                statusBar.innerText = "Identity Synchronized with Pulse Network.";
                localStorage.setItem('bloodpulse_user', JSON.stringify({ ...userSession, ...updates }));
                setTimeout(() => window.goToPanel(), 2000);
            }
            submitBtn.disabled = false;
            submitBtn.innerText = 'COMMIT PULSE CHANGES';
        });

        window.openBloodRequestModal = () => document.getElementById('blood-request-modal').classList.remove('hidden');
        window.closeBloodRequestModal = () => document.getElementById('blood-request-modal').classList.add('hidden');
        window.submitBloodRequest = async () => {
            const newGroup = document.getElementById('req-new-group').value;
            const reason = document.getElementById('req-reason').value;
            if (!reason) { alert('Please provide a reason.'); return; }
            const { error } = await db.from('blood_group_requests').insert({
                user_id: userId,
                current_group: profileData.blood_group,
                requested_group: newGroup,
                reason: reason,
                status: 'pending'
            });
            if (!error) { alert('Request submitted to security registry.'); window.closeBloodRequestModal(); }
        };
    }
};


