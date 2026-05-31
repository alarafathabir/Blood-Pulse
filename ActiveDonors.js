export const ActiveDonors = {
    render: () => `
        <style>
            .stitch-surface { background-color: #fff8f7; color: #271816; }
            .glass-card {
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(226, 232, 240, 0.8);
            }
            .blood-btn.active {
                background-color: #af101a;
                color: white;
                border-color: #af101a;
            }
        </style>
        <div class="stitch-surface font-inter min-h-screen animate-fade-in relative overflow-hidden flex flex-col">
            <!-- Background Elements -->
            <div class="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#ffdad6] rounded-full mix-blend-multiply filter blur-[120px] opacity-40 -z-10 pointer-events-none"></div>

            <header class="w-full px-6 py-4 flex justify-between items-center z-50 bg-white/60 backdrop-blur-xl border-b border-[#e4beba]/50 sticky top-0">
                <div class="flex items-center gap-4">
                    <button onclick="goTo('/donor-type')" class="w-10 h-10 rounded-full bg-white border border-[#e4beba] flex items-center justify-center text-[#5b403d] hover:bg-[#fff0ef] transition-colors shadow-sm">
                        <span class="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 class="text-xl font-extrabold text-[#271816] font-manrope tracking-tight">Active Donors</h1>
                </div>
                <div class="bg-[#ffe2de] text-[#930010] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md">Urgent Search</div>
            </header>

            <main class="flex-1 max-w-5xl w-full mx-auto p-6 md:p-8 space-y-8 relative z-10 animate-fade-in">
                <!-- Search Mode Toggle -->
                <div class="bg-white rounded-2xl p-2 flex border border-[#e4beba] shadow-sm max-w-md mx-auto">
                    <button class="flex-1 py-3 text-sm font-bold rounded-xl bg-[#fff8f7] text-[#af101a] transition-all shadow-sm flex justify-center items-center gap-2">
                        <span class="material-symbols-outlined text-[18px]">bloodtype</span> By Blood Group
                    </button>
                    <button class="flex-1 py-3 text-sm font-bold rounded-xl text-[#5b403d] hover:bg-slate-50 transition-all flex justify-center items-center gap-2">
                        <span class="material-symbols-outlined text-[18px]">location_on</span> By Area
                    </button>
                </div>

                <!-- Blood Group Selection -->
                <div class="bg-white rounded-3xl p-6 shadow-md border border-[#ffdad6]">
                    <h2 class="text-sm font-black text-[#5b403d] uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span class="material-symbols-outlined text-[#af101a] text-[18px]">search</span>
                        Select Blood Group
                    </h2>
                    <div class="grid grid-cols-4 md:grid-cols-8 gap-3">
                        <button class="blood-btn active py-4 rounded-2xl font-black text-lg border-2 border-[#e4beba] hover:border-[#af101a] transition-all flex flex-col items-center justify-center gap-1 shadow-sm">O+</button>
                        <button class="blood-btn py-4 rounded-2xl font-black text-lg bg-white text-[#5b403d] border-2 border-[#e4beba] hover:border-[#af101a] hover:text-[#af101a] transition-all flex flex-col items-center justify-center gap-1 shadow-sm">O-</button>
                        <button class="blood-btn py-4 rounded-2xl font-black text-lg bg-white text-[#5b403d] border-2 border-[#e4beba] hover:border-[#af101a] hover:text-[#af101a] transition-all flex flex-col items-center justify-center gap-1 shadow-sm">A+</button>
                        <button class="blood-btn py-4 rounded-2xl font-black text-lg bg-white text-[#5b403d] border-2 border-[#e4beba] hover:border-[#af101a] hover:text-[#af101a] transition-all flex flex-col items-center justify-center gap-1 shadow-sm">A-</button>
                        <button class="blood-btn py-4 rounded-2xl font-black text-lg bg-white text-[#5b403d] border-2 border-[#e4beba] hover:border-[#af101a] hover:text-[#af101a] transition-all flex flex-col items-center justify-center gap-1 shadow-sm">B+</button>
                        <button class="blood-btn py-4 rounded-2xl font-black text-lg bg-white text-[#5b403d] border-2 border-[#e4beba] hover:border-[#af101a] hover:text-[#af101a] transition-all flex flex-col items-center justify-center gap-1 shadow-sm">B-</button>
                        <button class="blood-btn py-4 rounded-2xl font-black text-lg bg-white text-[#5b403d] border-2 border-[#e4beba] hover:border-[#af101a] hover:text-[#af101a] transition-all flex flex-col items-center justify-center gap-1 shadow-sm">AB+</button>
                        <button class="blood-btn py-4 rounded-2xl font-black text-lg bg-white text-[#5b403d] border-2 border-[#e4beba] hover:border-[#af101a] hover:text-[#af101a] transition-all flex flex-col items-center justify-center gap-1 shadow-sm">AB-</button>
                    </div>
                </div>

                <!-- Results List -->
                <div class="space-y-4">
                    <div class="flex justify-between items-end mb-2">
                        <h3 class="text-xl font-extrabold text-[#271816] font-manrope">Active O+ Donors</h3>
                        <span class="text-xs font-bold text-[#5b403d]">3 Highly Experienced</span>
                    </div>

                    <!-- Donor Card 1 -->
                    <div class="glass-card rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden border-[#e4beba]">
                        <div class="absolute top-0 left-0 w-1.5 h-full bg-[#af101a]"></div>
                        <div class="flex items-center gap-5 w-full md:w-auto">
                            <!-- Locked Avatar -->
                            <div class="w-16 h-16 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400 relative">
                                <span class="material-symbols-outlined text-[32px]">person</span>
                                <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center text-white border-2 border-white">
                                    <span class="material-symbols-outlined text-[12px]">lock</span>
                                </div>
                            </div>
                            <div>
                                <div class="flex items-center gap-2 mb-1">
                                    <h4 class="text-lg font-extrabold text-[#271816]">Michael T.</h4>
                                    <span class="bg-[#e8f0fe] text-[#1a73e8] px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">Student</span>
                                </div>
                                <div class="flex items-center gap-3 text-sm font-medium text-[#5b403d]">
                                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-[#af101a]">bloodtype</span> O+</span>
                                    <span class="text-slate-300">|</span>
                                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-emerald-600">event_available</span> Last Donated: 4 mo ago</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex flex-col items-center md:items-end gap-2 w-full md:w-auto">
                            <span class="text-[10px] text-slate-500 font-bold bg-slate-100 px-3 py-1 rounded-full flex items-center gap-1 mb-1">
                                <span class="material-symbols-outlined text-[12px]">shield_lock</span> Details hidden until admin approval
                            </span>
                            <button onclick="alert('Request sent! Admin will review and provide donor details shortly.')" class="w-full md:w-auto px-6 py-3 rounded-xl bg-[#af101a] text-white font-bold hover:bg-[#86000d] transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
                                <span class="material-symbols-outlined text-[18px]">send</span> Send Request
                            </button>
                        </div>
                    </div>

                    <!-- Donor Card 2 -->
                    <div class="glass-card rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden border-[#e4beba]">
                        <div class="flex items-center gap-5 w-full md:w-auto pl-1.5">
                            <!-- Locked Avatar -->
                            <div class="w-16 h-16 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400 relative">
                                <span class="material-symbols-outlined text-[32px]">person</span>
                                <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center text-white border-2 border-white">
                                    <span class="material-symbols-outlined text-[12px]">lock</span>
                                </div>
                            </div>
                            <div>
                                <div class="flex items-center gap-2 mb-1">
                                    <h4 class="text-lg font-extrabold text-[#271816]">David W.</h4>
                                    <span class="bg-[#f3f4f6] text-[#4b5563] px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">Civilian</span>
                                </div>
                                <div class="flex items-center gap-3 text-sm font-medium text-[#5b403d]">
                                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-[#af101a]">bloodtype</span> O+</span>
                                    <span class="text-slate-300">|</span>
                                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-emerald-600">event_available</span> Last Donated: 6 mo ago</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex flex-col items-center md:items-end gap-2 w-full md:w-auto">
                            <span class="text-[10px] text-slate-500 font-bold bg-slate-100 px-3 py-1 rounded-full flex items-center gap-1 mb-1">
                                <span class="material-symbols-outlined text-[12px]">shield_lock</span> Details hidden until admin approval
                            </span>
                            <button onclick="alert('Request sent! Admin will review and provide donor details shortly.')" class="w-full md:w-auto px-6 py-3 rounded-xl bg-white text-[#af101a] border border-[#af101a] font-bold hover:bg-[#fff8f7] transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2">
                                <span class="material-symbols-outlined text-[18px]">send</span> Send Request
                            </button>
                        </div>
                    </div>

                    <!-- Donor Card 3 -->
                    <div class="glass-card rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden border-[#e4beba]">
                        <div class="flex items-center gap-5 w-full md:w-auto pl-1.5">
                            <!-- Locked Avatar -->
                            <div class="w-16 h-16 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400 relative">
                                <span class="material-symbols-outlined text-[32px]">person</span>
                                <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center text-white border-2 border-white">
                                    <span class="material-symbols-outlined text-[12px]">lock</span>
                                </div>
                            </div>
                            <div>
                                <div class="flex items-center gap-2 mb-1">
                                    <h4 class="text-lg font-extrabold text-[#271816]">Jennifer K.</h4>
                                    <span class="bg-[#f3f4f6] text-[#4b5563] px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">Civilian</span>
                                </div>
                                <div class="flex items-center gap-3 text-sm font-medium text-[#5b403d]">
                                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-[#af101a]">bloodtype</span> O+</span>
                                    <span class="text-slate-300">|</span>
                                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-amber-600">event_available</span> Last Donated: 1 yr ago</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex flex-col items-center md:items-end gap-2 w-full md:w-auto">
                            <span class="text-[10px] text-slate-500 font-bold bg-slate-100 px-3 py-1 rounded-full flex items-center gap-1 mb-1">
                                <span class="material-symbols-outlined text-[12px]">shield_lock</span> Details hidden until admin approval
                            </span>
                            <button onclick="alert('Request sent! Admin will review and provide donor details shortly.')" class="w-full md:w-auto px-6 py-3 rounded-xl bg-white text-[#af101a] border border-[#af101a] font-bold hover:bg-[#fff8f7] transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2">
                                <span class="material-symbols-outlined text-[18px]">send</span> Send Request
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `,
    afterRender: () => {
        // Simple interactivity for blood group buttons
        const btns = document.querySelectorAll('.blood-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                btns.forEach(b => {
                    b.classList.remove('active');
                    b.classList.add('bg-white', 'text-[#5b403d]');
                    b.style.backgroundColor = '';
                    b.style.color = '';
                });
                const target = e.currentTarget;
                target.classList.add('active');
                target.classList.remove('bg-white', 'text-[#5b403d]');
            });
        });
    }
};


