import { db } from '../js/db.js';

export const PublicRequest = {
    render: () => `
        <div class="min-h-screen bg-[#fff5f5] pb-32 relative overflow-hidden font-inter">
            <!-- Decorative Background Orbs -->
            <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ffdad6] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 -z-10 translate-x-1/3 -translate-y-1/3"></div>
            <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ffe4e4] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 -z-10 -translate-x-1/3 translate-y-1/3"></div>

            <div class="pt-28 pb-12 px-6 text-center">
                <div class="max-w-4xl mx-auto animate-fade-in">
                    <p class="text-[#af101a] text-[10px] font-black uppercase tracking-[0.4em] mb-4">Community Alert</p>
                    <h1 class="text-6xl md:text-8xl font-black font-outfit uppercase tracking-tighter leading-none text-[#271816]">Public <span class="text-[#af101a]/20">Request</span></h1>
                    <p class="text-slate-500 font-medium max-w-2xl mx-auto mt-6">Broadcast your emergency to the entire community. Verified donors will be notified instantly.</p>
                </div>
            </div>

            <div class="max-w-4xl mx-auto px-6 relative z-20 animate-slide-up" style="animation-delay: 0.2s">
                <div class="bg-white rounded-[48px] shadow-2xl p-8 md:p-16 border border-white">
                    <form id="public-request-form" class="space-y-10">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div class="space-y-3">
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Blood Group Required</label>
                                <select id="b-group" class="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 outline-none focus:ring-2 focus:ring-[#af101a] font-black uppercase tracking-widest" required>
                                    <option value="">Select Group</option>
                                    <option>A+</option><option>A-</option>
                                    <option>B+</option><option>B-</option>
                                    <option>O+</option><option>O-</option>
                                    <option>AB+</option><option>AB-</option>
                                </select>
                            </div>
                            <div class="space-y-3">
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Bags Needed</label>
                                <input type="number" id="b-bags" class="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 outline-none focus:ring-2 focus:ring-[#af101a] font-bold" value="1" min="1" required>
                            </div>
                            <div class="space-y-3">
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Hospital Name</label>
                                <input type="text" id="b-hospital-name" class="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 outline-none focus:ring-2 focus:ring-[#af101a] font-bold" placeholder="Enter Hospital Name" required>
                            </div>
                            <div class="space-y-3">
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Hospital Address</label>
                                <input type="text" id="b-hospital-address" class="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 outline-none focus:ring-2 focus:ring-[#af101a] font-bold" placeholder="Full Hospital Address" required>
                            </div>
                            <div class="space-y-3">
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Request Type</label>
                                <select id="b-type" class="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 outline-none focus:ring-2 focus:ring-[#af101a] font-black uppercase tracking-widest" required>
                                    <option value="Emergency">Emergency Alert</option>
                                    <option value="Planned">Planned Surgery</option>
                                    <option value="Routine">Routine Checkup</option>
                                </select>
                            </div>
                            <div class="space-y-3">
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Patient Full Name</label>
                                <input type="text" id="b-pname" class="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 outline-none focus:ring-2 focus:ring-[#af101a] font-bold" placeholder="Patient's Name" required>
                            </div>
                            <div class="col-span-full space-y-3">
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Test Report Verification (Required)</label>
                                <input type="file" id="b-report" class="hidden" accept=".pdf,image/*" required>
                                <button type="button" onclick="document.getElementById('b-report').click()" class="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] p-12 hover:border-[#af101a]/50 transition-all flex flex-col items-center gap-4 group">
                                    <span class="material-symbols-outlined text-4xl text-slate-300">upload_file</span>
                                    <span id="pub-report-name" class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Medical Report (PDF/JPG)</span>
                                </button>
                            </div>
                            <div class="col-span-full space-y-3">
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Emergency Reason</label>
                                <textarea id="b-reason" class="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-6 outline-none focus:ring-2 focus:ring-[#af101a] font-bold h-32 transition-all resize-none" placeholder="Provide details of the emergency..." required></textarea>
                            </div>
                            <div class="col-span-full flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                <input type="checkbox" id="b-wheelchair" class="w-6 h-6 text-[#af101a] rounded-lg border-slate-200">
                                <label for="b-wheelchair" class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Wheelchair Assistance Required</label>
                            </div>
                        </div>

                        <div class="pt-8 flex flex-col md:flex-row gap-6">
                            <button type="button" onclick="window.history.back()" class="flex-1 py-6 font-black text-slate-400 uppercase tracking-[0.3em] text-[10px] border border-slate-100 rounded-[24px] hover:bg-slate-50 transition-all">Go Back</button>
                            <button id="pub-submit-btn" type="submit" class="flex-[2] py-6 font-black text-white bg-[#af101a] rounded-[24px] shadow-2xl hover:shadow-[0_20px_50px_rgba(175,16,26,0.3)] active:scale-95 transition-all uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4">
                                Broadcast Public Request
                                <span class="material-symbols-outlined text-sm">campaign</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            ${window.UserNavbar ? window.UserNavbar() : ''}
        </div>
    `,
    afterRender: () => {
        const fileInput = document.getElementById('b-report');
        const fileNameDisp = document.getElementById('pub-report-name');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    fileNameDisp.textContent = `File Attached: ${e.target.files[0].name}`;
                    fileNameDisp.classList.replace('text-slate-400', 'text-[#af101a]');
                }
            });
        }

        const form = document.getElementById('public-request-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const btn = document.getElementById('pub-submit-btn');
                btn.innerHTML = '<span class="material-symbols-outlined animate-spin text-sm">sync</span> BROADCASTING...';
                btn.disabled = true;

                const user = JSON.parse(localStorage.getItem('bloodpulse_user') || '{}');

                const appeal = {
                    requester_id: user.id || null,
                    requester_name: user.full_name || 'Public Guest',
                    patient_name: document.getElementById('b-pname').value,
                    blood_group: document.getElementById('b-group').value,
                    bags_needed: parseInt(document.getElementById('b-bags').value),
                    hospital_location: document.getElementById('b-hospital-name').value + ', ' + document.getElementById('b-hospital-address').value,
                    required_date: new Date().toISOString().split('T')[0],
                    requires_wheelchair: document.getElementById('b-wheelchair').checked,
                    status: 'Pending'
                };

                const { error } = await db.from('requests').insert([appeal]);

                if (error) {
                    alert('Submission Error: ' + error.message);
                    btn.innerHTML = 'Broadcast Public Request <span class="material-symbols-outlined text-sm">campaign</span>';
                    btn.disabled = false;
                } else {
                    window.showToast('Public Request Broadcasted to All Donors!', 'success');
                    setTimeout(() => window.goTo('/choice'), 2000);
                }
            });
        }
    }
};



