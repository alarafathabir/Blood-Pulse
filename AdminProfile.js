import { db } from '../js/db.js';

export const AdminProfile = {
    render: () => {
        return `
        <div class="flex min-h-screen bg-[#020617] text-slate-200 font-inter selection:bg-[#af101a] selection:text-white">
            ${window.AdminSidebar('/admin-profile')}

            <!-- Animated Background -->
            <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div class="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#af101a]/10 blur-[120px] rounded-full animate-pulse"></div>
                <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full animate-pulse" style="animation-delay: 2s"></div>
            </div>

            <main class="flex-1 pt-20 pb-20 px-12 relative z-10 max-w-7xl">
                <div class="space-y-10">
                    
                    <!-- Hero Header -->
                    <div class="space-y-4 animate-fade-in">
                        <div class="flex items-center gap-4">
                            <h1 class="text-7xl font-black text-white font-outfit uppercase tracking-tighter leading-none">Master <span class="text-[#af101a]">Pulse</span></h1>
                            <div class="px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                                <span class="text-[9px] font-black uppercase tracking-widest text-emerald-500">Authorized Access</span>
                            </div>
                        </div>
                        <p class="text-slate-500 font-bold text-sm uppercase tracking-widest max-w-xl">Centralized node for administrative identity, security protocols, and system-wide authorization management.</p>
                    </div>

                    <!-- Main Identity Grid -->
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        
                        <!-- Profile Card -->
                        <div class="lg:col-span-8 bg-slate-900/50 backdrop-blur-3xl rounded-[48px] border border-slate-800 shadow-2xl overflow-hidden animate-slide-up" style="animation-delay: 0.2s">
                            <div class="p-12 space-y-12">
                                <div class="flex flex-col md:flex-row items-center gap-10">
                                    <div class="relative group">
                                        <div class="w-44 h-44 rounded-[40px] overflow-hidden border-8 border-slate-800 shadow-2xl transition-all duration-700 group-hover:rotate-6 group-hover:scale-105">
                                            <img id="admin-avatar-preview" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" class="w-full h-full object-cover">
                                        </div>
                                        <button onclick="document.getElementById('admin-avatar-upload').click()" class="absolute -bottom-4 -right-4 bg-[#af101a] text-white w-14 h-14 rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center">
                                            <span class="material-symbols-outlined">linked_camera</span>
                                        </button>
                                        <input type="file" id="admin-avatar-upload" class="hidden" accept="image/*">
                                    </div>
                                    <div class="text-center md:text-left space-y-2">
                                        <h2 id="admin-display-name" class="text-4xl font-black text-white uppercase tracking-tighter">Master Admin</h2>
                                        <div class="flex flex-wrap justify-center md:justify-start gap-3">
                                            <span class="px-4 py-1.5 bg-slate-800 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-400 border border-slate-700">Root Access</span>
                                            <span class="px-4 py-1.5 bg-[#af101a]/10 rounded-full text-[9px] font-black uppercase tracking-widest text-[#af101a] border border-[#af101a]/20">Core Auditor</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div class="group/field">
                                        <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-2 block group-focus-within/field:text-[#af101a] transition-colors">Global Name Tag</label>
                                        <div class="relative">
                                            <span class="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-[#af101a] transition-colors text-xl">badge</span>
                                            <input type="text" id="admin-name" class="w-full bg-slate-950/50 border border-slate-800 rounded-2xl pl-16 pr-8 py-5 text-sm font-bold text-white focus:ring-2 focus:ring-[#af101a] transition-all outline-none" placeholder="Master Admin">
                                        </div>
                                    </div>
                                    <div class="group/field">
                                        <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-2 block group-focus-within/field:text-[#af101a] transition-colors">Broadcast Email</label>
                                        <div class="relative">
                                            <span class="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-[#af101a] transition-colors text-xl">alternate_email</span>
                                            <input type="email" id="admin-email" class="w-full bg-slate-950/50 border border-slate-800 rounded-2xl pl-16 pr-8 py-5 text-sm font-bold text-white focus:ring-2 focus:ring-[#af101a] transition-all outline-none" placeholder="admin@gmail.com">
                                        </div>
                                    </div>
                                    <div class="group/field">
                                        <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-2 block group-focus-within/field:text-[#af101a] transition-colors">Encrypted Phone</label>
                                        <div class="relative">
                                            <span class="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-[#af101a] transition-colors text-xl">contact_phone</span>
                                            <input type="text" id="admin-phone" class="w-full bg-slate-950/50 border border-slate-800 rounded-2xl pl-16 pr-8 py-5 text-sm font-bold text-white focus:ring-2 focus:ring-[#af101a] transition-all outline-none" placeholder="+880...">
                                        </div>
                                    </div>
                                    <div class="group/field">
                                        <label class="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-2 block group-focus-within/field:text-emerald-500 transition-colors">Authorization Level</label>
                                        <div class="relative">
                                            <span class="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500/50 text-xl">verified_user</span>
                                            <div class="w-full bg-emerald-500/5 border border-emerald-500/20 rounded-2xl pl-16 pr-8 py-5 text-xs font-black text-emerald-500 uppercase tracking-widest">
                                                Super Administrator (Root)
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="pt-8 flex flex-col sm:flex-row gap-4">
                                    <button id="save-admin-profile" class="flex-1 bg-[#af101a] text-white py-6 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-red-500/20 hover:bg-[#86000d] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                                        <span class="material-symbols-outlined text-xl">sync_saved_locally</span>
                                        Commit Identity Sync
                                    </button>
                                    <button onclick="window.goTo('/dashboard')" class="px-10 bg-slate-800/50 text-slate-400 py-6 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] hover:text-white hover:bg-slate-800 transition-all">
                                        Discard
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Sidebar Stats -->
                        <div class="lg:col-span-4 space-y-8 animate-slide-up" style="animation-delay: 0.3s">
                            
                            <!-- Session Health -->
                            <div class="bg-slate-900/80 backdrop-blur-xl p-8 rounded-[40px] border border-slate-800 shadow-xl relative overflow-hidden group">
                                <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                                <h3 class="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8">Session Integrity</h3>
                                <div class="space-y-6">
                                    <div class="flex items-center justify-between">
                                        <span class="text-xs font-bold text-slate-400">Connection Status</span>
                                        <span class="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Encrypted</span>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <span class="text-xs font-bold text-slate-400">Server Latency</span>
                                        <span class="text-[10px] font-black text-emerald-500 uppercase tracking-widest">24ms</span>
                                    </div>
                                    <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div class="w-[98%] h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Security Protocol -->
                            <div class="bg-[#af101a]/5 backdrop-blur-xl p-8 rounded-[40px] border border-[#af101a]/20 shadow-xl group hover:bg-[#af101a]/10 transition-all">
                                <div class="w-14 h-14 bg-[#af101a] text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-red-500/20 group-hover:rotate-12 transition-transform">
                                    <span class="material-symbols-outlined text-3xl">security</span>
                                </div>
                                <h3 class="text-xl font-black text-white font-outfit uppercase tracking-tighter mb-2">Master Key</h3>
                                <p class="text-xs font-medium text-slate-500 leading-relaxed mb-6">Rotate your security credentials and manage multi-factor authentication nodes.</p>
                                <button class="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all">Rotate Protocol</button>
                            </div>

                            <!-- System Stats -->
                            <div class="bg-slate-900/80 backdrop-blur-xl p-8 rounded-[40px] border border-slate-800 shadow-xl">
                                <h3 class="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8">Admin Metrics</h3>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="p-4 bg-slate-950/50 rounded-3xl border border-slate-800 text-center">
                                        <p id="stat-approvals" class="text-2xl font-black text-white">0</p>
                                        <p class="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">Approvals</p>
                                    </div>
                                    <div class="p-4 bg-slate-950/50 rounded-3xl border border-slate-800 text-center">
                                        <p id="stat-sessions" class="text-2xl font-black text-white">1</p>
                                        <p class="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">Active Hubs</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </main>

            <!-- Success Overlay -->
            <div id="success-overlay" class="fixed inset-0 z-[2000] bg-[#020617]/90 backdrop-blur-2xl flex flex-col items-center justify-center hidden animate-fade-in">
                <div class="relative">
                    <div class="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                        <span class="material-symbols-outlined text-white text-6xl">sync_saved_locally</span>
                    </div>
                </div>
                <h2 class="text-4xl font-black text-white font-outfit mt-12 uppercase tracking-tighter">Sync Complete</h2>
                <p class="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-4">Master Identity Matrix Synchronized</p>
            </div>
        </div>
        `;
    },
    afterRender: async () => {
        const userSession = JSON.parse(localStorage.getItem('bloodpulse_user') || '{}');
        
        // Fetch fresh data from db
        const { data: userProfile, error: fetchError } = await db
            .from('profiles')
            .select('*')
            .eq('id', userSession.id)
            .single();

        const user = userProfile || userSession;

        // Populate fields
        const nameInput = document.getElementById('admin-name');
        const emailInput = document.getElementById('admin-email');
        const phoneInput = document.getElementById('admin-phone');
        const displayName = document.getElementById('admin-display-name');
        const avatarPreview = document.getElementById('admin-avatar-preview');

        nameInput.value = user.full_name || '';
        emailInput.value = user.email || '';
        phoneInput.value = user.phone || '';
        displayName.textContent = user.full_name || 'Master Admin';
        if (user.avatar_url) avatarPreview.src = user.avatar_url;

        // Fetch Metrics
        const { count: approvalCount } = await db
            .from('requests')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'Approved');
        
        document.getElementById('stat-approvals').textContent = approvalCount || 0;

        // Save Logic
        document.getElementById('save-admin-profile').addEventListener('click', async () => {
            const btn = document.getElementById('save-admin-profile');
            const overlay = document.getElementById('success-overlay');
            
            btn.innerHTML = '<span class="material-symbols-outlined animate-spin">sync</span> Synchronizing...';
            btn.disabled = true;

            const updates = {
                full_name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                updated_at: new Date()
            };

            const { error } = await db.from('profiles').update(updates).eq('id', user.id);

            if (error) {
                alert('Profile update failed: ' + error.message);
                btn.innerHTML = '<span class="material-symbols-outlined text-xl">sync_saved_locally</span> Commit Identity Sync';
                btn.disabled = false;
            } else {
                localStorage.setItem('bloodpulse_user', JSON.stringify({ ...user, ...updates }));
                displayName.textContent = updates.full_name;
                
                // Show Success Overlay
                overlay.classList.remove('hidden');
                
                setTimeout(() => {
                    overlay.classList.add('hidden');
                    btn.innerHTML = '<span class="material-symbols-outlined text-xl">sync_saved_locally</span> Commit Identity Sync';
                    btn.disabled = false;
                }, 2000);
            }
        });

        // Avatar Upload
        document.getElementById('admin-avatar-upload').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const avatarPreview = document.getElementById('admin-avatar-preview');
            avatarPreview.style.opacity = '0.5';

            try {
                const fileExt = file.name.split('.').pop();
                const fileName = `${user.id}-${Date.now()}.${fileExt}`;
                const filePath = `avatars/${fileName}`;

                // 1. Upload to db Storage
                const { error: uploadError } = await db.storage
                    .from('avatars')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                // 2. Get Public URL
                const { data: { publicUrl } } = db.storage
                    .from('avatars')
                    .getPublicUrl(filePath);

                // 3. Update Profile Table
                const { error: updateError } = await db
                    .from('profiles')
                    .update({ avatar_url: publicUrl })
                    .eq('id', user.id);

                if (updateError) throw updateError;

                // 4. Update UI and LocalStorage
                avatarPreview.src = publicUrl;
                const currentUser = JSON.parse(localStorage.getItem('bloodpulse_user') || '{}');
                localStorage.setItem('bloodpulse_user', JSON.stringify({ ...currentUser, avatar_url: publicUrl }));
                
                // Show success toast (using main.js global toast if available or standard alert)
                if (window.showToast) {
                    window.showToast('Identity Visual Sync Complete', 'success');
                }
            } catch (err) {
                console.error(err);
                alert('Avatar update failed: ' + err.message);
            } finally {
                avatarPreview.style.opacity = '1';
            }
        });

        if (window.startAdminTopbarClock) window.startAdminTopbarClock();
    }
};


