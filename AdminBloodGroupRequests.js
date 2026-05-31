import { db } from '../js/db.js';

export const AdminBloodGroupRequests = {
    render: () => {
        return `
        <div class="flex min-h-screen bg-slate-900">
            ${window.AdminSidebar()}

            <main class="flex-1 p-10 pt-28 max-w-7xl mx-auto space-y-12 relative">
                <div class="fixed top-0 right-0 w-[50%] h-[50%] bg-amber-500/10 blur-[120px] rounded-full -z-10"></div>
                
                <header class="animate-fade-in flex justify-between items-end">
                    <div>
                        <h1 class="text-6xl font-black text-white font-outfit tracking-tighter uppercase leading-none">Security <span class="text-amber-500">Sync</span></h1>
                        <p class="text-slate-500 font-bold text-sm mt-4 uppercase tracking-widest">Verify and authorize critical blood group changes</p>
                    </div>
                    <button onclick="window.bulkAuthorizeChanges()" class="px-8 py-4 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all flex items-center gap-3">
                        <span class="material-symbols-outlined text-sm">done_all</span> Authorize All Pending
                    </button>
                </header>

                <div id="requests-loader" class="flex flex-col items-center justify-center py-20">
                    <div class="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-4"></div>
                    <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Fetching Security Registry...</p>
                </div>

                <div class="grid grid-cols-1 gap-8 hidden" id="bg-requests-list">
                    <!-- Requests will be injected here -->
                </div>

                <div id="no-bg-requests" class="hidden bg-slate-800 p-20 rounded-[48px] border border-dashed border-slate-700 text-center">
                    <span class="material-symbols-outlined text-6xl text-slate-700">sync_alt</span>
                    <p class="text-sm font-black text-slate-500 uppercase tracking-widest mt-6">Registry Clean — No Pending Identity Changes</p>
                </div>
            </main>
        </div>
        `;
    },
    afterRender: () => {
        const fetchRequests = async () => {
            const list = document.getElementById('bg-requests-list');
            const empty = document.getElementById('no-bg-requests');
            const loader = document.getElementById('requests-loader');

            try {
                const { data, error } = await db
                    .from('blood_group_requests')
                    .select('*')
                    .eq('status', 'Pending')
                    .order('created_at', { ascending: false });

                if (error) throw error;

                loader.classList.add('hidden');

                if (!data || data.length === 0) {
                    list.innerHTML = '';
                    list.classList.add('hidden');
                    empty.classList.remove('hidden');
                    return;
                }

                empty.classList.add('hidden');
                list.classList.remove('hidden');
                list.innerHTML = data.map(n => `
                    <div class="bg-slate-800 rounded-[48px] border border-slate-700 p-10 flex flex-col lg:flex-row gap-10 hover:border-amber-500/50 transition-all group">
                        <div class="lg:w-1/3 space-y-6">
                            <div class="flex items-center gap-4">
                                <div class="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-700 flex items-center justify-center text-[#af101a] font-black text-xl">
                                    ${n.new_group}
                                </div>
                                <div>
                                    <h3 class="text-white font-black uppercase tracking-tighter text-lg">${n.user_name}</h3>
                                    <p class="text-[10px] text-slate-500 font-black uppercase tracking-widest">Requested on ${new Date(n.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div class="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50">
                                    <p class="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Old Group</p>
                                    <p class="text-lg font-black text-slate-400">${n.old_group}</p>
                                </div>
                                <div class="bg-[#af101a]/10 p-4 rounded-2xl border border-[#af101a]/20">
                                    <p class="text-[8px] font-black text-[#af101a] uppercase tracking-widest mb-1">New Group</p>
                                    <p class="text-lg font-black text-[#af101a]">${n.new_group}</p>
                                </div>
                            </div>
                        </div>

                        <div class="lg:w-2/3 flex flex-col justify-between">
                            <div class="space-y-4">
                                <h4 class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Reason for Change</h4>
                                <div class="bg-slate-900 p-6 rounded-3xl text-slate-400 text-sm leading-relaxed border border-slate-700 italic">
                                    "${n.reason || 'No reason provided.'}"
                                </div>
                            </div>

                            <div class="flex gap-4 mt-8">
                                <button onclick="window.authorizeChange('${n.id}', 'Approved', '${n.user_id}', '${n.new_group}')" class="flex-1 bg-emerald-500 text-white py-5 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center gap-2">
                                    <span class="material-symbols-outlined text-sm">verified</span> Authorize Change
                                </button>
                                <button onclick="window.authorizeChange('${n.id}', 'Rejected', '${n.user_id}', '${n.new_group}')" class="flex-1 bg-slate-950 text-white py-5 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-950 hover:text-red-500 transition-all active:scale-95 flex items-center justify-center gap-2 border border-slate-700">
                                    <span class="material-symbols-outlined text-sm">block</span> Reject Request
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            } catch (err) {
                console.error('Fetch Error:', err);
                loader.innerHTML = `<p class="text-red-500 font-bold uppercase tracking-widest">Failed to load registry: ${err.message}</p>`;
            }
        };

        window.authorizeChange = async (reqId, status, userId, newGroup) => {
            try {
                // 1. Update Request Status
                const { error: reqError } = await db
                    .from('blood_group_requests')
                    .update({ status: status })
                    .eq('id', reqId);

                if (reqError) throw reqError;

                if (status === 'Approved') {
                    // 2. Update User Profile
                    const { error: profError } = await db
                        .from('profiles')
                        .update({ blood_group: newGroup })
                        .eq('id', userId);

                    if (profError) throw profError;
                }

                // 3. Create Notification for User
                await db.from('notifications').insert({
                    user_id: userId,
                    title: `Identity Update ${status}`,
                    message: `Your request to change blood group to ${newGroup} has been ${status.toLowerCase()}.`,
                    type: 'security'
                });

                alert(`Identity Change ${status}! Pulse Registry updated.`);
                fetchRequests();
            } catch (err) {
                console.error('Authorization Error:', err);
                alert(`Security Authorization Failed: ${err.message}`);
            }
        };

        window.bulkAuthorizeChanges = async () => {
            if (!confirm('Are you sure you want to authorize ALL pending identity changes?')) return;
            
            try {
                const { data: pending, error: fetchError } = await db
                    .from('blood_group_requests')
                    .select('*')
                    .eq('status', 'Pending');

                if (fetchError) throw fetchError;

                if (!pending || pending.length === 0) {
                    alert('No pending changes to authorize.');
                    return;
                }

                for (const req of pending) {
                    await window.authorizeChange(req.id, 'Approved', req.user_id, req.new_group);
                }

                alert(`Successfully authorized ${pending.length} identity changes.`);
                fetchRequests();
            } catch (err) {
                console.error('Bulk Auth Error:', err);
                alert(`Bulk Authorization Failed: ${err.message}`);
            }
        };

        fetchRequests();
    }
};


