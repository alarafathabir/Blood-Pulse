export const MyProfile = {
    render: () => `
        <style>
            .stitch-surface { background-color: #fcfaf9; color: #1f1412; }
            .stitch-primary { background-color: #af101a; color: #ffffff; }
            .glass-card {
                background: rgba(255, 255, 255, 0.85);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(226, 232, 240, 0.9);
                box-shadow: 0 10px 40px -10px rgba(0,0,0,0.05);
            }

            /* Clean Fade Transition */
            .fade-in-slide {
                animation: fadeSlideUp 0.8s ease-out forwards;
            }
            @keyframes fadeSlideUp {
                0% { opacity: 0; transform: translateY(15px); }
                100% { opacity: 1; transform: translateY(0); }
            }

            /* Modals & Transitions */
            .modal-enter { animation: zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            .modal-exit { animation: zoomOut 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            
            @keyframes zoomIn {
                0% { transform: scale(0.95); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
            @keyframes zoomOut {
                0% { transform: scale(1); opacity: 1; }
                100% { transform: scale(0.95); opacity: 0; }
            }

            /* Timeline Overhaul */
            .timeline-item::before {
                content: '';
                position: absolute;
                left: -31px;
                top: 0;
                height: 100%;
                width: 2px;
                background-color: #e4beba;
            }
            .timeline-item:last-child::before { display: none; }
            .timeline-dot {
                position: absolute;
                left: -38px;
                top: 6px;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background-color: #af101a;
                border: 4px solid #fff;
                box-shadow: 0 0 0 1px #af101a;
                z-index: 10;
            }
            .timeline-dot.pending {
                background-color: #f59e0b;
                box-shadow: 0 0 0 1px #f59e0b;
                animation: pulse-ring 2s infinite;
            }
            @keyframes pulse-ring {
                0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
                70% { box-shadow: 0 0 0 6px rgba(245, 158, 11, 0); }
                100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
            }
            
            /* Slide Up Animation for Bottom Sheet */
            .slide-up-enter { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            .slide-up-exit { animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            
            @keyframes slideUp {
                0% { transform: translateY(100%); opacity: 0; }
                100% { transform: translateY(0); opacity: 1; }
            }
            @keyframes slideDown {
                0% { transform: translateY(0); opacity: 1; }
                100% { transform: translateY(100%); opacity: 0; }
            }
            
            .profile-pic-container:hover .pic-overlay { opacity: 1; }
            
            /* Donor Rank Badges */
            .badge-gold {
                background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
                color: #5c3300;
                border: 1px solid #ffe866;
            }
            
            /* Emergency Decoration */
            .emergency-pulse {
                box-shadow: 0 0 0 0 rgba(175, 16, 26, 0.4);
                animation: red-pulse 2s infinite;
            }
            @keyframes red-pulse {
                0% { box-shadow: 0 0 0 0 rgba(175, 16, 26, 0.4); }
                70% { box-shadow: 0 0 0 15px rgba(175, 16, 26, 0); }
                100% { box-shadow: 0 0 0 0 rgba(175, 16, 26, 0); }
            }
        </style>

        <div class="stitch-surface font-inter min-h-screen pb-24 animate-fade-in relative overflow-hidden flex flex-col items-center">
            ${window.UserNavbar()}
            <div class="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#ffdad6] rounded-full mix-blend-multiply filter blur-[150px] opacity-30 -z-10"></div>
            <div class="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-[#e0e7ff] rounded-full mix-blend-multiply filter blur-[150px] opacity-40 -z-10"></div>


            <main class="w-full max-w-4xl px-6 space-y-12 relative z-10">
                
                <!-- Hero Section with Simple Fade -->
                <div class="text-center md:text-left pt-2 pb-4 fade-in-slide">
                    <h1 id="hero-bio-text" class="text-4xl md:text-5xl lg:text-6xl font-black font-playfair tracking-tight leading-tight text-[#af101a] italic drop-shadow-sm">
                        "A single drop of your blood is a beacon of hope."
                    </h1>
                </div>

                <!-- Profile Identity Card -->
                <div class="bg-white rounded-[40px] p-8 md:p-10 shadow-xl flex flex-col md:flex-row items-center md:items-start gap-10 relative overflow-hidden border border-slate-100">
                    <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#fff0ef] to-transparent rounded-bl-full opacity-50 -z-0"></div>

                    <div class="relative group profile-pic-container z-10 shrink-0">
                        <div class="w-40 h-40 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl bg-slate-100 relative transition-transform duration-500 glow-red">
                            <img id="main-profile-img" alt="User profile photo" class="w-full h-full object-cover" src="shawrab.jpeg" onerror="this.src='https://ui-avatars.com/api/?name=Nasim+Shawrab&background=af101a&color=fff&size=300'"/>
                            
                            <div class="pic-overlay absolute inset-0 bg-[#1f1412]/70 opacity-0 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                                <button id="view-img-btn" class="w-full max-w-[100px] py-2 bg-white/20 hover:bg-white/40 border border-white/50 rounded-full text-white text-xs font-bold transition-colors flex items-center justify-center gap-1">
                                    <span class="material-symbols-outlined text-[14px]">visibility</span> View
                                </button>
                                <label for="direct-file-upload" class="w-full max-w-[100px] py-2 bg-[#af101a] hover:bg-[#86000d] rounded-full text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer">
                                    <span class="material-symbols-outlined text-[14px]">edit</span> Change
                                </label>
                                <input type="file" id="direct-file-upload" hidden accept="image/*" />
                            </div>
                        </div>
                    </div>

                    <div class="flex-1 text-center md:text-left z-10 w-full">
                        <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-2">
                            <h2 class="text-4xl font-black text-[#1f1412] font-outfit">Nasim Uddin Shawrab</h2>
                            
                            <!-- Golden Active Donor Badge (1st Place) -->
                            <div class="p-[2px] rounded-full shadow-lg inline-block self-center md:self-auto badge-gold relative overflow-hidden">
                                <div class="absolute inset-0 bg-white/30 skew-x-12 translate-x-[-100%] animate-[shimmer_3s_infinite]"></div>
                                <div class="px-5 py-2 rounded-full flex items-center gap-2 relative z-10">
                                    <span class="material-symbols-outlined text-[18px]">workspace_premium</span>
                                    <span class="font-black text-xs uppercase tracking-widest">1st Active Donor</span>
                                </div>
                            </div>
                            <style>@keyframes shimmer { 100% { transform: translateX(200%); } }</style>
                        </div>
                        
                        <p class="text-slate-500 font-medium mb-6">"Dedicated to saving lives since 2024."</p>
                        
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 border-t border-slate-100 pt-6">
                            <div>
                                <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Blood Group</span>
                                <span class="text-xl font-black text-[#af101a]">AB+</span>
                            </div>
                            <div>
                                <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Total Donations</span>
                                <span class="text-xl font-black text-[#1f1412]">1 Bag</span>
                            </div>
                            <div>
                                <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Last Updated</span>
                                <span class="text-lg font-bold text-[#1f1412]">18 Mar 2026</span>
                            </div>
                            <div>
                                <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Lives Saved</span>
                                <span class="text-xl font-black text-emerald-600">1+</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Personal Information Section (Dynamic) -->
                <div class="bg-white rounded-[40px] p-8 md:p-10 shadow-sm border border-slate-200">
                    <div class="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-8 pb-6 border-b border-slate-100">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-2xl bg-[#ffe9e7] flex items-center justify-center text-[#af101a] relative">
                                <span class="material-symbols-outlined">clinical_notes</span>
                                <span class="material-symbols-outlined absolute -top-1 -right-1 text-[12px] bg-white rounded-full p-0.5">bloodtype</span>
                            </div>
                            <div>
                                <h2 class="text-2xl font-black text-[#1f1412] font-outfit">Personal Information</h2>
                                <p class="text-sm font-medium text-slate-500">Manage your private details. Fields adapt based on your status.</p>
                            </div>
                        </div>
                        <div class="w-full md:w-64">
                            <label class="text-[10px] font-black text-[#af101a] uppercase tracking-widest block mb-1 ml-1">Status / Role</label>
                            <select id="user-status-select" class="w-full px-5 py-3 bg-[#ffe9e7] text-[#86000d] border border-[#ffdad6] rounded-xl outline-none font-bold appearance-none cursor-pointer">
                                <option value="student" selected>Student Profile</option>
                                <option value="civilian">Civilian Profile</option>
                            </select>
                        </div>
                    </div>

                    <form id="update-profile-form" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- BIO / Thought -->
                        <div class="space-y-2 md:col-span-2">
                            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Bio / Donor Philosophy (Max 30 Words)</label>
                            <textarea id="bio-input" rows="2" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#af101a] outline-none font-semibold text-[#1f1412] resize-y">A single drop of your blood is a beacon of hope.</textarea>
                            <p class="text-[10px] text-slate-400 font-bold ml-1">This thought will be displayed beautifully at the top of your profile.</p>
                        </div>

                        <!-- Common Fields -->
                        <div class="space-y-2">
                            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                            <input type="text" value="Nasim Uddin Shawrab" required class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#af101a] outline-none font-semibold text-[#1f1412]">
                        </div>
                        <div class="space-y-2">
                            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Contact Number</label>
                            <input type="text" value="01601239046" required class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#af101a] outline-none font-semibold text-[#1f1412]">
                        </div>
                        <div class="space-y-2">
                            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                            <input type="email" value="nasim.shawrab@baust.edu" readonly class="w-full px-5 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl outline-none font-semibold text-slate-400">
                        </div>
                        <div class="space-y-2">
                            <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Last Donation Date</label>
                            <input type="date" value="2026-03-18" required class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#af101a] outline-none font-semibold text-[#1f1412]">
                        </div>

                        <!-- Dynamic Student Fields -->
                        <div id="student-fields" class="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Institute Name</label>
                                <input type="text" value="BAUST" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-semibold text-[#1f1412]">
                            </div>
                            <div class="space-y-2">
                                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Department</label>
                                <input type="text" value="CSE" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-semibold text-[#1f1412]">
                            </div>
                            <div class="space-y-2">
                                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Section</label>
                                <input type="text" value="A" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-semibold text-[#1f1412]">
                            </div>
                            <div class="space-y-2">
                                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Roll / ID Number</label>
                                <input type="text" value="0802420205101050" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-semibold text-[#1f1412]">
                            </div>
                            <div class="space-y-2 md:col-span-2">
                                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Batch / Semester</label>
                                <input type="text" value="Batch 19" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-500 outline-none font-semibold text-[#1f1412]">
                            </div>
                        </div>

                        <!-- Dynamic Civilian Fields -->
                        <div id="civilian-fields" class="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 hidden">
                            <div class="space-y-2">
                                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Workplace / Institute</label>
                                <input type="text" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-emerald-500 outline-none font-semibold text-[#1f1412]">
                            </div>
                            <div class="space-y-2">
                                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">NID / Birth Certificate No.</label>
                                <input type="text" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-emerald-500 outline-none font-semibold text-[#1f1412]">
                            </div>
                            <div class="space-y-2 md:col-span-2">
                                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Permanent Address</label>
                                <input type="text" placeholder="House/Road No." class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-emerald-500 outline-none font-semibold text-[#1f1412]">
                            </div>
                            <div class="space-y-2">
                                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Village</label>
                                <input type="text" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-emerald-500 outline-none font-semibold text-[#1f1412]">
                            </div>
                            <div class="space-y-2">
                                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Post Office</label>
                                <input type="text" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-emerald-500 outline-none font-semibold text-[#1f1412]">
                            </div>
                            <div class="space-y-2">
                                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Upozilla</label>
                                <input type="text" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-emerald-500 outline-none font-semibold text-[#1f1412]">
                            </div>
                            <div class="space-y-2">
                                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Zilla (District)</label>
                                <input type="text" class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-emerald-500 outline-none font-semibold text-[#1f1412]">
                            </div>
                            <div class="space-y-2 md:col-span-2">
                                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Division</label>
                                <select class="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-emerald-500 outline-none font-semibold text-[#1f1412] appearance-none">
                                    <option>Dhaka</option><option>Chattogram</option><option>Sylhet</option><option>Rajshahi</option><option>Khulna</option><option>Barishal</option><option>Rangpur</option><option>Mymensingh</option>
                                </select>
                            </div>
                        </div>

                        <div class="md:col-span-2 pt-6 flex justify-end">
                            <button type="submit" class="px-10 py-4 rounded-full font-black bg-[#af101a] text-white hover:bg-[#86000d] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 glow-red">
                                Update Details
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Redesigned Demand Status (Emergency Decor) -->
                <div class="bg-[#fff0ef] p-6 md:p-8 rounded-[32px] border-2 border-[#af101a] flex flex-col gap-4 shadow-lg emergency-pulse relative overflow-hidden">
                    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
                    
                    <div class="flex items-center gap-3 relative z-10">
                        <div class="bg-[#af101a] text-white px-4 py-1.5 rounded-full font-black tracking-widest uppercase text-xs shadow-md">EMERGENCY</div>
                        <p class="text-[#86000d] font-outfit font-black text-2xl">Matches Found in System</p>
                    </div>
                    
                    <p class="text-[#5b403d] text-sm leading-relaxed font-medium relative z-10 max-w-3xl">
                        Your <strong>AB+ (AB Positive)</strong> blood type matches an urgent request from <strong>Jannatul Ferdousi</strong> at Saidpur Central Hospital. AB+ is the universal recipient but highly valued for plasma. 1 Bag is needed immediately.
                    </p>
                </div>

                <!-- Compact Quick Donation Form -->
                <div class="bg-white rounded-[40px] p-8 shadow-sm border border-slate-200">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-12 h-12 rounded-2xl bg-[#ffe9e7] flex items-center justify-center text-[#af101a] relative">
                            <span class="material-symbols-outlined">add_task</span>
                            <span class="material-symbols-outlined absolute -top-1 -right-1 text-[12px] bg-white rounded-full p-0.5">bloodtype</span>
                        </div>
                        <div>
                            <h2 class="text-xl font-black text-[#1f1412] font-outfit">Log Recent Donation</h2>
                            <p class="text-xs font-medium text-slate-500">Quickly update your history without writing a full story.</p>
                        </div>
                    </div>
                    
                    <form id="quick-log-form" class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div class="space-y-2">
                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Date</label>
                            <input type="date" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 text-sm font-semibold">
                        </div>
                        <div class="space-y-2 md:col-span-2">
                            <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Hospital / Location</label>
                            <input type="text" placeholder="Where did you donate?" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 text-sm font-semibold">
                        </div>
                        <button type="submit" class="w-full py-3 bg-[#af101a] hover:bg-[#86000d] text-white rounded-xl font-bold transition-all shadow-md active:scale-95 glow-red">
                            Submit Log
                        </button>
                    </form>
                </div>

                <!-- Publish Blood Story Form -->
                <div class="bg-gradient-to-br from-white to-slate-50 rounded-[40px] p-8 md:p-10 shadow-sm border border-slate-200">
                    <div class="flex items-center gap-4 mb-8">
                        <div class="w-12 h-12 rounded-2xl bg-[#ffe9e7] flex items-center justify-center text-[#af101a] relative">
                            <span class="material-symbols-outlined">auto_stories</span>
                            <span class="material-symbols-outlined absolute -top-1 -right-1 text-[12px] bg-white rounded-full p-0.5">favorite</span>
                        </div>
                        <div>
                            <h2 class="text-2xl font-black text-[#1f1412] font-outfit">Submit Blood Story (Optional)</h2>
                            <p class="text-sm font-medium text-slate-500">Write a detailed letter about your donation experience to inspire others.</p>
                        </div>
                    </div>

                    <form id="story-form" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2 md:col-span-1">
                                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Date of Incident</label>
                                <input type="date" class="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-[#1f1412] font-medium shadow-sm">
                            </div>
                            <div class="space-y-2 md:col-span-1">
                                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Hospital / Location</label>
                                <input type="text" placeholder="e.g. City General Hospital ER" class="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-[#1f1412] font-medium shadow-sm">
                            </div>
                            <div class="space-y-2 md:col-span-2">
                                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">The Story (1000 - 1500 words)</label>
                                <div class="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden focus-within:border-blue-500 transition-colors">
                                    <textarea rows="6" placeholder="Dear community, it started as a normal Tuesday evening..." class="w-full px-5 py-4 outline-none font-playfair text-lg text-slate-800 leading-relaxed resize-y"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-end pt-2">
                            <button type="submit" class="px-8 py-4 rounded-full font-black bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 active:scale-95 flex items-center justify-center gap-2">
                                <span class="material-symbols-outlined text-[20px]">send</span> Submit for Publication
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Professional Donation Timeline -->
                <div class="pt-8">
                    <h2 class="text-3xl font-black text-[#1f1412] font-outfit mb-12 flex items-center gap-3">
                        <span class="material-symbols-outlined text-3xl text-[#af101a]">route</span>
                        Donation History
                    </h2>
                    
                    <div class="pl-12 relative space-y-12">
                        <!-- Pending Admin Approval Template -->
                        <div class="timeline-item relative group hidden" id="pending-donation-item">
                            <div class="timeline-dot pending"></div>
                            <div class="bg-white p-6 rounded-[24px] shadow-sm border-2 border-amber-200/50 relative">
                                <div class="absolute top-4 right-6 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                                    <span class="material-symbols-outlined text-[12px] animate-spin">sync</span> Pending Admin Review
                                </div>
                                <h3 class="font-black text-[#1f1412] text-xl font-outfit mb-1">New Donation Logged</h3>
                                <p class="text-sm text-slate-500 font-medium mb-4" id="pending-date">Today</p>
                                <p class="text-slate-600 font-medium leading-relaxed">
                                    Your recent donation record at <strong id="pending-hospital">Hospital</strong> is under review. Once accepted by the admin, it will be permanently added to your verified Donation History.
                                </p>
                            </div>
                        </div>

                        <!-- Timeline Item 1 -->
                        <div class="timeline-item relative group">
                            <div class="timeline-dot"></div>
                            <div class="bg-white p-6 md:p-8 rounded-[32px] shadow-sm border border-slate-100 relative">
                                <div class="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div>
                                        <h3 class="font-black text-[#1f1412] text-2xl font-outfit mb-1">St. Jude's Medical Center</h3>
                                        <p class="text-sm text-slate-500 font-bold tracking-wide">12 OCT 2023</p>
                                    </div>
                                    <div class="text-emerald-700 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-1 self-start">
                                        <span class="material-symbols-outlined text-[14px]">verified</span> Verified Success
                                    </div>
                                </div>
                                <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                                    <div>
                                        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Location</span>
                                        <p class="text-sm font-bold text-slate-700">Seattle, Downtown Ward</p>
                                    </div>
                                    <div>
                                        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Units Provided</span>
                                        <p class="text-sm font-bold text-slate-700 text-[#af101a]">2 Bags</p>
                                    </div>
                                </div>
                                <div class="mt-5">
                                    <p class="text-slate-600 leading-relaxed font-playfair text-lg italic border-l-4 border-slate-200 pl-4">
                                        "Severe accident trauma in the ER. The surgical team urgently needed 2 units of O- to stabilize the young patient before entering the OR. It was a race against time."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Motive Line Footer -->
                <div class="text-center pt-8 pb-12">
                    <p class="text-[10px] font-black text-[#af101a] uppercase tracking-[0.4em] opacity-40">
                        — The blood you give today gives someone another tomorrow —
                    </p>
                </div>
            </main>

            <!-- Notification Modal -->
            <div id="noti-modal" class="fixed inset-0 z-[100] hidden flex flex-col justify-end">
                <div id="noti-backdrop" class="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 transition-opacity duration-300"></div>
                <div id="noti-content" class="w-full max-w-lg mx-auto bg-white rounded-t-[32px] shadow-2xl h-[80vh] relative z-10 flex flex-col border-t border-slate-200 translate-y-full transition-transform duration-500">
                    <div class="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-white rounded-t-[32px]">
                        <div>
                            <h2 class="text-xl font-bold tracking-tight text-black font-outfit">Notifications</h2>
                            <p id="noti-status-text" class="text-xs font-bold text-[#af101a]">1 Unread Message</p>
                        </div>
                        <button id="close-noti" class="text-slate-500 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full font-bold transition-colors flex items-center gap-1">
                            <span class="material-symbols-outlined text-[18px]">arrow_back_ios</span> Back
                        </button>
                    </div>
                    <div id="noti-list-container" class="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-white">
                        <!-- Real Match Notification -->
                        <div class="bg-[#af101a] text-white p-5 rounded-2xl shadow-lg border border-red-500 cursor-pointer hover:bg-[#86000d] transition-colors">
                            <div class="flex justify-between items-start mb-2">
                                <div class="flex items-center gap-2 font-black text-sm uppercase tracking-widest">
                                    <span class="material-symbols-outlined text-red-200">emergency</span> URGENT MATCH
                                </div>
                                <span class="text-[10px] text-red-200 font-bold">New</span>
                            </div>
                            <p class="font-bold text-lg leading-tight mb-2">Jannatul Ferdousi needs AB+ blood.</p>
                            <p class="text-sm opacity-90 border-l-2 border-red-400 pl-3 italic">
                                "Critical request at Saidpur Central Hospital. Your AB+ profile is a direct match."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Image Viewer Modal (Fixed) -->
            <div id="img-viewer-modal" class="fixed inset-0 z-[100] hidden flex flex-col items-center justify-center bg-black/95 backdrop-blur-md">
                <div class="absolute top-0 left-0 w-full p-6 flex justify-start z-50">
                    <button onclick="document.getElementById('img-viewer-modal').classList.add('hidden')" class="text-white hover:text-red-400 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-colors flex items-center gap-2 font-bold shadow-lg">
                        <span class="material-symbols-outlined">arrow_back</span> Back to Profile
                    </button>
                </div>
                <!-- Image source will be dynamically injected via JS -->
                <img id="full-viewer-img" src="" alt="Full View" class="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl modal-enter shadow-2xl relative z-40 mt-12">
            </div>

            <!-- Image Editor Modal -->
            <div id="img-editor-modal" class="fixed inset-0 z-[100] hidden flex flex-col justify-end pointer-events-none">
                <div id="img-editor-backdrop" class="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" onclick="document.getElementById('img-editor-modal').classList.add('hidden')"></div>
                <div class="w-full max-w-lg mx-auto bg-white rounded-t-[40px] shadow-2xl relative z-10 p-8 pointer-events-auto border-t border-slate-200">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-black font-outfit">Update Photo</h3>
                        <button onclick="document.getElementById('img-editor-modal').classList.add('hidden')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full font-bold text-slate-600 flex items-center gap-1 transition-colors">
                            <span class="material-symbols-outlined text-sm">close</span> Cancel
                        </button>
                    </div>
                    <div class="relative w-full aspect-square bg-slate-900 rounded-3xl overflow-hidden mb-8 flex items-center justify-center">
                        <img src="shawrab.jpeg" alt="Crop View" class="w-full h-full object-cover opacity-60">
                        <div class="absolute inset-8 border-4 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] rounded-full"></div>
                    </div>
                    <div class="flex justify-between gap-4">
                        <input type="file" id="actual-btn" hidden accept="image/*" />
                        <label for="actual-btn" class="flex-1 py-4 bg-slate-100 rounded-full font-bold text-slate-600 flex justify-center items-center gap-2 hover:bg-slate-200 transition-colors cursor-pointer">
                            <span class="material-symbols-outlined">folder_open</span> Choose File
                        </label>
                        <button id="apply-crop-btn" class="w-20 bg-emerald-500 hover:bg-emerald-600 rounded-full flex justify-center items-center text-white shadow-lg transition-colors">
                            <span class="material-symbols-outlined text-2xl">check</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    afterRender: () => {
        const notiBtn = document.getElementById('noti-btn');
        const notiModal = document.getElementById('noti-modal');
        const closeNoti = document.getElementById('close-noti');
        const backdrop = document.getElementById('noti-backdrop');
        const content = document.getElementById('noti-content');

        // View Image Modal Logic
        const viewImgBtn = document.getElementById('view-img-btn');
        const viewerModal = document.getElementById('img-viewer-modal');
        const mainImg = document.getElementById('main-profile-img');
        const viewerImg = document.getElementById('full-viewer-img');

        viewImgBtn?.addEventListener('click', () => {
            viewerImg.src = mainImg.src;
            viewerModal.classList.remove('hidden');
        });

        // Dynamic Student/Civilian Switcher
        const statusSelect = document.getElementById('user-status-select');
        const studentFields = document.getElementById('student-fields');
        const civilianFields = document.getElementById('civilian-fields');
        
        statusSelect?.addEventListener('change', (e) => {
            if(e.target.value === 'student') {
                studentFields?.classList.remove('hidden');
                civilianFields?.classList.add('hidden');
            } else {
                studentFields?.classList.add('hidden');
                civilianFields?.classList.remove('hidden');
            }
        });

        // Notification Helper
        const notiList = document.getElementById('noti-list-container');
        const notiBadge = document.getElementById('noti-count-badge');
        const notiStatusText = document.getElementById('noti-status-text');
        let unreadCount = 1;

        const addNotification = (title, message, type = 'system') => {
            unreadCount++;
            if (notiBadge) notiBadge.innerText = unreadCount;
            if (notiStatusText) notiStatusText.innerText = unreadCount + " Unread Messages";
            
            const newNoti = document.createElement('div');
            newNoti.className = type === 'urgent' 
                ? "bg-[#af101a] text-white p-5 rounded-2xl shadow-lg border border-red-500 animate-fade-in"
                : "bg-slate-50 p-5 rounded-2xl text-slate-800 border border-slate-200 shadow-sm animate-fade-in";
            
            newNoti.innerHTML = `
                <div class="flex justify-between items-start mb-2">
                    <div class="flex items-center gap-2 font-black text-sm uppercase tracking-widest ${type === 'system' ? 'text-emerald-600' : ''}">
                        <span class="material-symbols-outlined">${type === 'urgent' ? 'emergency' : 'check_circle'}</span> ${title}
                    </div>
                    <span class="text-[10px] text-slate-400 font-bold">Just Now</span>
                </div>
                <p class="font-bold mb-1">${message}</p>
            `;
            
            if (notiList) notiList.prepend(newNoti);
        };

        // Modal Control logic
        notiBtn?.addEventListener('click', () => {
            notiModal.classList.remove('hidden');
            setTimeout(() => {
                backdrop.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            }, 10);
        });

        const closeNotiModal = () => {
            backdrop.style.opacity = '0';
            content.style.transform = 'translateY(100%)';
            setTimeout(() => {
                notiModal.classList.add('hidden');
            }, 300);
        };
        closeNoti?.addEventListener('click', closeNotiModal);
        backdrop?.addEventListener('click', closeNotiModal);

        // Editable Bio Logic
        const updateForm = document.getElementById('update-profile-form');
        const bioInput = document.getElementById('bio-input');
        const heroBioText = document.getElementById('hero-bio-text');

        updateForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            addNotification("Profile Updated", "Your bio and personal details have been saved.", "system");
            // Update Hero text with custom bio
            if(bioInput.value.trim() !== '') {
                heroBioText.innerText = '"' + bioInput.value + '"';
                // Trigger animation replay
                heroBioText.parentElement.classList.remove('fade-in-slide');
                void heroBioText.parentElement.offsetWidth; // trigger reflow
                heroBioText.parentElement.classList.add('fade-in-slide');
            }
        });

        // Quick Donation Log Logic
        document.getElementById('quick-log-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            addNotification("Donation Logged", "Your recent donation is now pending admin review.", "system");
            
            const pendingTemplate = document.getElementById('pending-donation-item');
            if (pendingTemplate) {
                pendingTemplate.classList.remove('hidden');
                const hospitalInput = e.target.querySelector('input[placeholder="Where did you donate?"]');
                const dateInput = e.target.querySelector('input[type="date"]');
                
                if (hospitalInput && hospitalInput.value) document.getElementById('pending-hospital').innerText = hospitalInput.value;
                if (dateInput && dateInput.value) document.getElementById('pending-date').innerText = dateInput.value;
                
                e.target.reset();
                pendingTemplate.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });

        // Story Submission
        document.getElementById('story-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Your 1500-word story has been submitted for publication review!");
            e.target.reset();
        });

        let tempImageSrc = null;

        // Direct File Picker Interaction (from profile overlay)
        document.getElementById('direct-file-upload')?.addEventListener('change', (e) => {
            if(e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    tempImageSrc = event.target.result;
                    // Update the preview image inside the mock editor
                    const editorImg = document.querySelector('#img-editor-modal img');
                    if (editorImg) editorImg.src = tempImageSrc;
                    
                    // Show the editor modal
                    document.getElementById('img-editor-modal').classList.remove('hidden');
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });

        // Native File Picker Interaction (from within crop modal)
        document.getElementById('actual-btn')?.addEventListener('change', (e) => {
            if(e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    tempImageSrc = event.target.result;
                    const editorImg = document.querySelector('#img-editor-modal img');
                    if (editorImg) editorImg.src = tempImageSrc;
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
        
        document.getElementById('apply-crop-btn')?.addEventListener('click', () => {
            if (tempImageSrc) {
                // Update the main profile picture
                document.getElementById('main-profile-img').src = tempImageSrc;
            }
            alert("Profile picture updated successfully!");
            document.getElementById('img-editor-modal').classList.add('hidden');
        });
    }
};


