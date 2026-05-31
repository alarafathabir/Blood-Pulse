import { db } from '../js/db.js';

export const AdminRequests = {
    render: () => {
        return `
        <div class="flex min-h-screen bg-[#f8fafc]">
            ${window.AdminSidebar()}

            <main class="flex-1 p-10 pt-20 max-w-7xl mx-auto space-y-12 relative">
                <header class="flex justify-between items-end animate-fade-in">
                    <div>
                        <p class="text-[10px] font-black text-[#af101a] uppercase tracking-[0.4em] mb-2">Verification Queue</p>
                        <h1 class="text-6xl font-black text-slate-900 font-outfit tracking-tighter uppercase leading-none">Blood <span class="text-slate-300">Appeals</span></h1>
                    </div>
                    <div class="bg-white px-8 py-5 rounded-[32px] border border-slate-100 shadow-sm">
                        <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Queue Status</p>
                        <p class="text-xl font-black text-[#af101a]" id="queue-size-text">Syncing...</p>
                    </div>
                </header>

                <div class="flex gap-3 bg-white p-3 rounded-[32px] border border-slate-100 shadow-sm overflow-x-auto" id="filter-container">
                    <button data-filter="All" class="filter-btn px-8 py-4 bg-[#af101a] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">All Requests</button>
                    <button data-filter="Pending" class="filter-btn px-8 py-4 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Pending</button>
                    <button data-filter="Approved" class="filter-btn px-8 py-4 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Approved</button>
                </div>

                <div class="grid grid-cols-1 gap-6" id="requests-master-list"></div>
            </main>
        </div>
        `;
    },
    afterRender: async () => {
        let currentFilter = 'All';

        const render = async () => {
            const list = document.getElementById('requests-master-list');
            const queueText = document.getElementById('queue-size-text');

            list.innerHTML = '<div class="text-center py-20 opacity-50 uppercase tracking-widest text-xs animate-pulse">Scanning Grid...</div>';

            try {
                let query = db.from('requests').select('*').order('created_at', { ascending: false });
                if (currentFilter !== 'All') query = query.eq('status', currentFilter);

                const { data: requests, error } = await query;
                if (error) throw error;

                queueText.textContent = `${requests.filter(r => r.status === 'Pending').length} Pending`;

                if (requests.length === 0) {
                    list.innerHTML = `<div class="bg-white p-20 rounded-[48px] border border-dashed border-slate-200 text-center"><p class="text-[10px] font-black text-slate-300 uppercase tracking-widest">No entries found</p></div>`;
                    return;
                }

                list.innerHTML = requests.map(r => `
                    <div class="bg-white p-10 rounded-[56px] border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row gap-12 items-center relative overflow-hidden">
                        <div class="absolute top-0 right-0 p-10 flex gap-2">
                            <span class="px-4 py-2 ${r.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' : r.status === 'Rejected' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'} text-[9px] font-black uppercase tracking-widest rounded-full border border-current">${r.status}</span>
                        </div>
                        <div class="w-32 h-32 bg-slate-50 rounded-[40px] flex flex-col items-center justify-center border border-slate-100 shrink-0">
                            <span class="text-4xl font-black text-[#af101a] font-outfit tracking-tighter">${r.blood_group}</span>
                        </div>
                        <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 class="text-xl font-black text-slate-900 uppercase tracking-tighter">${r.patient_name}</h3>
                                <p class="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Requester: ${r.requester_name}</p>
                                ${r.requires_wheelchair ? `
                                    <div class="flex items-center gap-2 mt-4 px-4 py-2 bg-red-50 rounded-xl border border-red-100 w-fit">
                                        <span class="material-symbols-outlined text-sm text-[#af101a]">accessible</span>
                                        <span class="text-[9px] font-black text-[#af101a] uppercase tracking-widest">Wheelchair Required</span>
                                    </div>
                                ` : ''}
                            </div>
                            <div>
                                <p class="text-sm font-black text-slate-900 uppercase tracking-tighter">${r.hospital_location}</p>
                                <p class="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">${new Date(r.required_date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div class="flex gap-3">
                            ${r.status === 'Pending' ? `
                                <button onclick="window.handleRequestAction('${r.id}', 'Approved')" class="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-all shadow-lg shadow-emerald-500/20"><span class="material-symbols-outlined">check</span></button>
                                <button onclick="window.handleRequestAction('${r.id}', 'Rejected')" class="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-red-600 transition-all shadow-lg"><span class="material-symbols-outlined">close</span></button>
                            ` : `
                                <button onclick="window.handleRequestAction('${r.id}', 'Pending')" class="px-6 py-3 border-2 border-slate-100 text-slate-400 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">Restore</button>
                            `}
                            <button onclick="window.handleRequestDelete('${r.id}')" class="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><span class="material-symbols-outlined">delete</span></button>
                        </div>
                    </div>
                `).join('');
            } catch (err) {
                list.innerHTML = '<div class="text-red-500 text-center py-20 uppercase font-black text-xs">Sync Failure</div>';
            }
        };

        window.handleRequestAction = async (id, status) => {
            // 1. Fetch request details to get IDs
            const { data: request } = await db.from('requests').select('*').eq('id', id).single();

            // 2. Update Status
            const { error } = await db.from('requests').update({ status }).eq('id', id);

            if (!error) {
                // 3. Handle Notifications for Approval
                if (status === 'Approved' && request) {
                    const notifications = [];

                    // Notify Requester
                    if (request.requester_id) {
                        let donorPhone = '';
                        if (request.donor_id) {
                            const { data: donorProfile } = await db.from('profiles').select('phone').eq('id', request.donor_id).single();
                            donorPhone = donorProfile?.phone ? ` Contact: ${donorProfile.phone}` : '';
                        }

                        notifications.push({
                            user_id: request.requester_id,
                            title: 'Request Approved!',
                            message: `Your blood appeal for ${request.patient_name} has been verified and matched with a donor.${donorPhone}`,
                            type: 'success'
                        });
                    }

                    // Notify Donor(s)
                    if (request.donor_id) {
                        let phone = request.contact_phone;
                        if (!phone) {
                            const { data: requesterProfile } = await db.from('profiles').select('phone').eq('id', request.requester_id).single();
                            phone = requesterProfile?.phone || 'No contact provided';
                        }

                        notifications.push({
                            user_id: request.donor_id,
                            title: 'Urgent Request!',
                            message: `${request.requester_name} has requested your help for ${request.blood_group} blood at ${request.hospital_location}. Contact: ${phone}`,
                            type: 'alert'
                        });
                    } else {
                        // General Broadcast: Notify ALL donors with the same blood group
                        const { data: matchingDonors } = await db
                            .from('profiles')
                            .select('id')
                            .eq('blood_group', request.blood_group)
                            .neq('id', request.requester_id); // Don't notify the requester

                        if (matchingDonors && matchingDonors.length > 0) {
                            let broadcastPhone = request.contact_phone;
                            if (!broadcastPhone) {
                                const { data: profile } = await db.from('profiles').select('phone').eq('id', request.requester_id).single();
                                broadcastPhone = profile?.phone || 'No contact provided';
                            }

                            matchingDonors.forEach(donor => {
                                notifications.push({
                                    user_id: donor.id,
                                    title: 'Emergency Match!',
                                    message: `A ${request.blood_group} emergency was broadcasted at ${request.hospital_location}. Contact: ${broadcastPhone}`,
                                    type: 'alert'
                                });
                            });
                        }
                    }

                    if (notifications.length > 0) {
                        await db.from('notifications').insert(notifications);
                    }
                }

                alert(`Appeal ${status}! System updated.`);
                render();
            }
        };

        window.handleRequestDelete = async (id) => {
            if (!confirm('Are you sure you want to permanently delete this request? This action cannot be undone.')) return;
            const { error } = await db.from('requests').delete().eq('id', id);
            if (error) alert("Error deleting request: " + error.message);
            else {
                alert("Request permanently deleted.");
                render();
            }
        };

        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentFilter = btn.dataset.filter;
                filterBtns.forEach(b => {
                    b.classList.remove('bg-[#af101a]', 'text-white');
                    b.classList.add('bg-slate-50', 'text-slate-400');
                });
                btn.classList.remove('bg-slate-50', 'text-slate-400');
                btn.classList.add('bg-[#af101a]', 'text-white');
                render();
            });
        });

        render();

        // Real-time Subscription (Polling for MSSQL)
        if (window._adminRequestsSub) {
            clearInterval(window._adminRequestsSub);
            window._adminRequestsSub = null;
        }
        window._adminRequestsSub = setInterval(() => {
            render();
        }, 10000);
    }
};


