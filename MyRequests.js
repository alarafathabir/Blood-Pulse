export const MyRequests = {
    render: () => `
        <div class="min-h-screen bg-[#fff5f5] pb-32 relative overflow-hidden">
            ${window.UserNavbar()}
            <!-- Decorative Background Orbs -->
            <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ffdad6] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 -z-10 translate-x-1/3 -translate-y-1/3"></div>
            <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ffe4e4] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 -z-10 -translate-x-1/3 translate-y-1/3"></div>

            <!-- Header Section -->
            <div class="py-12 px-6">
                <div class="max-w-4xl mx-auto text-center animate-fade-in">
                    <p class="text-[#af101a] text-[10px] font-black uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-2">
                        <span class="w-10 h-0.5 bg-[#af101a]"></span> ALL REQUESTS
                    </p>
                    <h1 class="text-6xl md:text-8xl font-black font-outfit uppercase tracking-tighter leading-none text-[#271816]">Active <span class="text-[#af101a]/20">Alerts</span></h1>
                </div>
            </div>

            <!-- Requests List -->
            <div class="max-w-4xl mx-auto px-6 relative z-20 animate-slide-up" style="animation-delay: 0.2s">
                <div id="requests-full-list" class="space-y-6">
                    <!-- Cards injected here -->
                </div>

                <!-- Empty State -->
                <div id="full-requests-empty" class="hidden py-32 text-center bg-white/20 rounded-[48px] border border-dashed border-slate-200">
                    <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span class="material-symbols-outlined text-4xl text-slate-200">campaign</span>
                    </div>
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">You haven't posted any blood requests yet</p>
                </div>
            </div>

            ${window.UserFloatingActions()}
        </div>
    `,
    afterRender: () => {
        const list = document.getElementById('requests-full-list');
        const empty = document.getElementById('full-requests-empty');

        // Mock data
        const data = [
            { id: 1, blood_group: 'O+', bags: 2, hospital: 'Dhaka Medical College', status: 'Urgent', date: '2024-05-04', patients: 'Rahman Khan', phone: '01700000000', location: 'Dhaka, Bangladesh' },
            { id: 2, blood_group: 'A-', bags: 1, hospital: 'Evercare Hospital', status: 'In Progress', date: '2024-04-28', patients: 'Fatima Ahmed', phone: '01800000000', location: 'Chittagong, Bangladesh' },
            { id: 3, blood_group: 'B+', bags: 4, hospital: 'Square Hospital', status: 'Completed', date: '2024-03-15', patients: 'Kashem Ali', phone: '01900000000', location: 'Dhaka, Bangladesh' }
        ];

        if (!data.length) {
            empty.classList.remove('hidden');
            list.innerHTML = '';
            return;
        }

        empty.classList.add('hidden');
        list.innerHTML = data.map((req, index) => `
            <div class="bg-white/70 backdrop-blur-xl rounded-[48px] p-8 md:p-12 border border-white shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden animate-slide-up" style="animation-delay: ${0.1 * index}s">
                <div class="absolute top-0 right-0 w-64 h-64 bg-red-50/50 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-red-100/50 transition-colors"></div>
                
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                    <div class="flex items-center gap-8">
                        <div class="w-20 h-20 rounded-[32px] bg-[#af101a] text-white flex flex-col items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <span class="text-2xl font-black">${req.blood_group}</span>
                            <span class="text-[10px] font-black uppercase opacity-60">Group</span>
                        </div>
                        <div>
                            <div class="flex items-center gap-3 mb-1">
                                <h3 class="text-2xl font-black text-[#271816] font-outfit uppercase tracking-tighter">${req.hospital}</h3>
                                <span class="px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${req.status === 'Urgent' ? 'bg-red-600 text-white animate-pulse' : req.status === 'Completed' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}">${req.status}</span>
                            </div>
                            <div class="flex flex-wrap gap-4 mt-2">
                                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <span class="material-symbols-outlined text-[14px]">person</span> Patient: ${req.patients}
                                </p>
                                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <span class="material-symbols-outlined text-[14px]">location_on</span> ${req.location}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-12 border-l border-slate-100 pl-8 md:border-l-0 md:pl-0">
                        <div class="text-center">
                            <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Quantity</p>
                            <p class="text-lg font-black text-[#af101a]">${req.bags} Bags</p>
                        </div>
                        <div class="text-center">
                            <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Date Posted</p>
                            <p class="text-sm font-black text-slate-600">${req.date}</p>
                        </div>
                        <div class="flex flex-col gap-2">
                            <button class="px-6 py-3 bg-[#271816] text-white text-[9px] font-black rounded-xl uppercase tracking-widest hover:bg-[#af101a] transition-all">Manage</button>
                            <button class="px-6 py-3 border border-slate-100 text-slate-400 text-[9px] font-black rounded-xl uppercase tracking-widest hover:bg-slate-50 transition-all">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
};


