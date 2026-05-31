import { db } from '../js/db.js';

export const SendRequest = {
    render: () => {
        return `
        <div class="min-h-screen bg-[#f8fafc] pb-32 relative overflow-hidden font-inter">
            ${window.UserNavbar()}
            <!-- Decorative Background Orbs -->
            <div class="fixed top-0 right-0 w-[600px] h-[600px] bg-[#af101a]/5 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
            <div class="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 animate-pulse" style="animation-delay: 2s"></div>

            <div class="pb-12 px-6">
                <div class="max-w-4xl mx-auto">
                    <!-- Donor Mini Profile Header -->
                    <div id="donor-preview-header" class="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 mb-12 border border-white shadow-xl animate-fade-in flex items-center justify-between">
                        <div class="flex items-center gap-6">
                            <div class="w-20 h-20 bg-slate-100 rounded-3xl animate-pulse"></div>
                            <div class="space-y-2">
                                <div class="w-32 h-4 bg-slate-100 rounded animate-pulse"></div>
                                <div class="w-48 h-8 bg-slate-100 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Emergency Form -->
                    <div class="bg-white rounded-[48px] shadow-2xl p-8 md:p-16 animate-slide-up relative overflow-hidden">
                        <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#af101a] to-[#86000d]"></div>
                        
                        <div class="flex items-center gap-4 mb-12">
                            <div class="w-16 h-16 rounded-3xl bg-red-50 text-[#af101a] flex items-center justify-center shadow-sm">
                                <span class="material-symbols-outlined text-3xl">emergency_share</span>
                            </div>
                            <div>
                                <h2 class="text-3xl font-black text-slate-900 font-outfit uppercase tracking-tighter">Emergency Details</h2>
                                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">All fields are mandatory for verification</p>
                            </div>
                        </div>

                        <form id="emergency-full-form" class="space-y-10">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div class="space-y-3">
                                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Patient Full Name</label>
                                    <input type="text" id="p-name" class="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 outline-none focus:ring-4 focus:ring-[#af101a]/5 focus:border-[#af101a]/30 font-bold transition-all" placeholder="Enter patient name" required>
                                </div>
                                <div class="space-y-3">
                                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Blood Bags Needed</label>
                                    <input type="number" id="p-bags" class="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 outline-none focus:ring-4 focus:ring-[#af101a]/5 focus:border-[#af101a]/30 font-bold transition-all" value="1" min="1" required>
                                </div>
                                <div class="space-y-3">
                                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Hospital Name</label>
                                    <input type="text" id="p-hospital-name" class="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 outline-none focus:ring-4 focus:ring-[#af101a]/5 focus:border-[#af101a]/30 font-bold transition-all" placeholder="Enter Hospital Name" required>
                                </div>
                                <div class="space-y-3">
                                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Hospital Address</label>
                                    <input type="text" id="p-address" class="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 outline-none focus:ring-4 focus:ring-[#af101a]/5 focus:border-[#af101a]/30 font-bold transition-all" placeholder="Full address & ward info" required>
                                </div>
                                <div class="space-y-3">
                                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Request Urgency</label>
                                    <select id="p-urgency" class="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 outline-none focus:ring-4 focus:ring-[#af101a]/5 focus:border-[#af101a]/30 font-black uppercase tracking-widest cursor-pointer" required>
                                        <option value="Emergency">Emergency (Immediate)</option>
                                        <option value="Scheduled">Scheduled Surgery</option>
                                        <option value="Planned">Planned Donation</option>
                                    </select>
                                </div>
                                <div class="space-y-3">
                                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Date Required</label>
                                    <input type="date" id="p-date" class="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 outline-none focus:ring-4 focus:ring-[#af101a]/5 focus:border-[#af101a]/30 font-bold transition-all" required>
                                </div>
                                
                                <div class="col-span-full space-y-3">
                                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Medical Documents (Test Report)</label>
                                    <div class="relative group">
                                        <input type="file" id="p-report" class="hidden" accept=".pdf,image/*">
                                        <button type="button" onclick="document.getElementById('p-report').click()" class="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] p-12 hover:border-[#af101a]/50 transition-all flex flex-col items-center gap-4 group-hover:bg-slate-100/50">
                                            <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-300 group-hover:text-[#af101a] transition-colors">
                                                <span class="material-symbols-outlined text-4xl">cloud_upload</span>
                                            </div>
                                            <div class="text-center">
                                                <p id="report-name" class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Upload Verification Document (Optional)</p>
                                                <p class="text-[8px] font-bold text-slate-300 uppercase mt-1">PDF or Image (Max 2MB)</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div class="col-span-full space-y-3">
                                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Essential Reason / Notes</label>
                                    <textarea id="p-notes" class="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-6 outline-none focus:ring-4 focus:ring-[#af101a]/5 focus:border-[#af101a]/30 font-bold h-32 transition-all resize-none" placeholder="Provide context for the donor..." required></textarea>
                                </div>
                            </div>

                            <div class="pt-8 flex flex-col md:flex-row gap-6">
                                <button type="button" onclick="window.history.back()" class="flex-1 py-6 font-black text-slate-400 uppercase tracking-[0.3em] text-[10px] border border-slate-100 rounded-[24px] hover:bg-slate-50 transition-all">Cancel Request</button>
                                <button id="submit-req-btn" type="submit" class="flex-[2] py-6 font-black text-white bg-[#af101a] rounded-[24px] shadow-2xl hover:shadow-[0_20px_50px_rgba(175,16,26,0.3)] active:scale-95 transition-all uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4">
                                    Submit Emergency Request
                                    <span class="material-symbols-outlined text-sm">send</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
        `;
    },
    afterRender: async () => {
        const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
        const donorId = urlParams.get('id');
        const header = document.getElementById('donor-preview-header');

        if (!donorId) { window.goTo('/search'); return; }

        // Fetch Donor Details
        const { data: donor, error } = await db.from('profiles').select('*').eq('id', donorId).single();
        
        if (error || !donor) {
            header.innerHTML = `<p class="text-xs font-black text-red-500 uppercase">Error: Signal Lost</p>`;
        } else {
            header.innerHTML = `
                <div class="flex items-center gap-6">
                    <div class="relative">
                        <div class="w-20 h-20 rounded-3xl overflow-hidden border-2 border-[#af101a] shadow-lg">
                            <img src="${donor.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${donor.full_name}`}" class="w-full h-full object-cover">
                        </div>
                        <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-[#af101a] text-white rounded-xl border-2 border-white flex items-center justify-center text-[10px] font-black">
                            ${donor.blood_group}
                        </div>
                    </div>
                    <div>
                        <p class="text-[9px] font-black text-[#af101a] uppercase tracking-[0.3em] mb-1">Sending Request To</p>
                        <h2 class="text-3xl font-black text-slate-900 font-outfit uppercase tracking-tighter">${donor.full_name}</h2>
                        <p class="text-xs font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                            <span class="material-symbols-outlined text-[14px]">location_on</span> ${donor.district || 'Verified'}, ${donor.division || 'Member'}
                        </p>
                    </div>
                </div>
                <div class="hidden md:flex flex-col items-end">
                    <span class="px-4 py-2 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded-full uppercase tracking-widest border border-emerald-100">Verified Donor</span>
                    <p class="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-2">${donor.times_donated || 0} Successful Gifts</p>
                </div>
            `;
        }

        const fileInput = document.getElementById('p-report');
        const fileNameDisp = document.getElementById('report-name');
        fileInput?.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                fileNameDisp.textContent = `Attached: ${e.target.files[0].name}`;
                fileNameDisp.classList.replace('text-slate-400', 'text-[#af101a]');
            }
        });

        const form = document.getElementById('emergency-full-form');
        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('submit-req-btn');
            const user = JSON.parse(localStorage.getItem('bloodpulse_user') || '{}');
            
            btn.innerHTML = '<span class="material-symbols-outlined animate-spin text-sm">sync</span> VERIFYING & SENDING...';
            btn.disabled = true;

            const requestData = {
                requester_id: user.id || null,
                donor_id: donor.id,
                donor_name: donor.full_name,
                requester_name: user.full_name || 'Guest',
                patient_name: document.getElementById('p-name').value,
                blood_group: donor.blood_group,
                bags_needed: parseInt(document.getElementById('p-bags').value),
                hospital_location: `${document.getElementById('p-hospital-name').value}, ${document.getElementById('p-address').value}`,
                required_date: document.getElementById('p-date').value,
                contact_phone: user.phone || '',
                status: 'Pending'
            };

            const { error: insertError } = await db.from('requests').insert([requestData]);

            if (insertError) {
                alert('Error sending request: ' + insertError.message);
                btn.innerHTML = 'Retry Submission';
                btn.disabled = false;
            } else {
                const toast = document.createElement('div');
                toast.className = 'fixed top-12 left-1/2 -translate-x-1/2 z-[3000] bg-emerald-600 text-white px-10 py-5 rounded-[24px] shadow-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-4';
                toast.innerHTML = '<span class="material-symbols-outlined">verified</span> REQUEST BROADCASTED SUCCESSFULLY!';
                document.body.appendChild(toast);
                
                setTimeout(() => {
                    toast.remove();
                    window.goTo('/search');
                }, 2500);
            }
        });
    }
};


