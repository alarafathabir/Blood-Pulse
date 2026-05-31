export const Directory = {
    render: () => `
        <div class="bg-slate-50 text-slate-900 font-inter min-h-screen flex flex-col">
            <nav id="main-nav" class="bg-[#af101a] sticky top-0 z-50 shadow-lg border-b border-[#86000d]">
                <div class="flex justify-between items-center px-6 max-w-7xl mx-auto w-full">
                    <div class="flex items-center gap-4 cursor-pointer group active:scale-110 transition-transform" onclick="goTo('/')">
                        <img src="logo.png" alt="Blood Pulse Logo" class="w-16 h-16 object-contain filter drop-shadow-md">
                        <h1 class="text-4xl brand-text text-white hidden lg:flex">Blood Pulse</h1>
                    </div>
                    <div class="hidden md:flex space-x-8 items-center">
                        <a class="text-sm font-black text-white/70 hover:text-white transition-all py-2 uppercase tracking-widest" href="#/">Home</a>
                        <a class="text-sm font-black text-white/70 hover:text-white transition-all py-2 uppercase tracking-widest" href="#/contact">Contact Us</a>
                        <a class="text-sm font-black text-white/70 hover:text-white transition-all py-2 uppercase tracking-widest" href="#/learn-more">Learn More</a>
                        <a class="text-sm font-black text-white/70 hover:text-white transition-all py-2 uppercase tracking-widest" href="#/community">Community</a>
                        <a class="text-sm font-black text-white/70 hover:text-white transition-all py-2 uppercase tracking-widest" href="#/info">Info</a>
                    </div>
                </div>
            </nav>

            <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full animate-fade-in">
                <!-- Page Header -->
                <div class="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div class="flex-1">
                        <div class="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-red-100">
                            <span class="material-symbols-outlined text-xs">admin_panel_settings</span>
                            Admin Access Only
                        </div>
                        <h1 class="text-4xl font-manrope font-bold text-slate-900 mb-2">Donor Search Directory</h1>
                        <p class="text-lg text-slate-600 max-w-2xl">Locate compatible active and passive blood donors. Access is strictly limited to medical administrators and verified emergency coordinators.</p>
                    </div>
                </div>

                <!-- Search & Filters -->
                <section class="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                    <div class="lg:col-span-4 flex flex-col gap-2">
                        <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Search Area</label>
                        <div class="relative">
                            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">location_on</span>
                            <input class="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-red-500 outline-none transition-all font-medium" placeholder="Enter city, hospital, or zip code" type="text"/>
                        </div>
                    </div>
                    <div class="lg:col-span-8 flex flex-col gap-2">
                        <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Blood Group Eligibility</label>
                        <div class="flex flex-wrap gap-2">
                            <button class="px-5 py-2.5 rounded-full border-2 border-red-700 bg-red-700 text-white font-bold shadow-md transition-all flex items-center gap-1">O+ <span class="material-symbols-outlined text-[16px]">check</span></button>
                            <button class="px-5 py-2.5 rounded-full border border-slate-200 bg-white text-slate-600 font-bold hover:border-red-700 hover:text-red-700 transition-all">O-</button>
                            <button class="px-5 py-2.5 rounded-full border border-slate-200 bg-white text-slate-600 font-bold hover:border-red-700 hover:text-red-700 transition-all">A+</button>
                            <button class="px-5 py-2.5 rounded-full border border-slate-200 bg-white text-slate-600 font-bold hover:border-red-700 hover:text-red-700 transition-all">A-</button>
                            <button class="px-5 py-2.5 rounded-full border border-slate-200 bg-white text-slate-600 font-bold hover:border-red-700 hover:text-red-700 transition-all">B+</button>
                            <button class="px-5 py-2.5 rounded-full border border-slate-200 bg-white text-slate-600 font-bold hover:border-red-700 hover:text-red-700 transition-all">B-</button>
                            <button class="px-5 py-2.5 rounded-full border border-slate-200 bg-white text-slate-600 font-bold hover:border-red-700 hover:text-red-700 transition-all">AB+</button>
                            <button class="px-5 py-2.5 rounded-full border border-slate-200 bg-white text-slate-600 font-bold hover:border-red-700 hover:text-red-700 transition-all">AB-</button>
                        </div>
                    </div>
                </section>

                <!-- Results -->
                <div class="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                    <div class="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Donor Card 1 -->
                        <div class="bg-white rounded-2xl border-2 border-blue-500 p-6 flex flex-col gap-4 shadow-lg relative overflow-hidden transition-all hover:-translate-y-1">
                            <div class="flex justify-between items-start">
                                <div class="flex items-center gap-3">
                                    <div class="w-12 h-12 rounded-full bg-red-700 text-white flex items-center justify-center text-xl font-bold">O+</div>
                                    <div>
                                        <h3 class="text-xl font-bold text-slate-900">Marcus Johnson</h3>
                                        <div class="flex items-center gap-1 text-slate-500 text-sm mt-0.5">
                                            <span class="material-symbols-outlined text-[14px]">location_on</span>
                                            Seattle General Area (2.4 mi)
                                        </div>
                                    </div>
                                </div>
                                <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">Active Donor</span>
                            </div>
                            <div class="grid grid-cols-2 gap-4 mt-2">
                                <div class="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                    <span class="block text-xs font-bold text-slate-400 mb-1 uppercase">Last Donation</span>
                                    <span class="block font-bold text-slate-700">3 Months Ago</span>
                                </div>
                                <div class="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                    <span class="block text-xs font-bold text-slate-400 mb-1 uppercase">Verified</span>
                                    <span class="block font-bold text-emerald-600 flex items-center gap-1">
                                        <span class="material-symbols-outlined text-[16px]">verified</span> Yes
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Donor Card 2 -->
                        <div class="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col gap-4 shadow-md hover:-translate-y-1 transition-all">
                            <div class="flex justify-between items-start">
                                <div class="flex items-center gap-3">
                                    <div class="w-12 h-12 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xl font-bold">O+</div>
                                    <div>
                                        <h3 class="text-xl font-bold text-slate-900">Sarah Jenkins</h3>
                                        <div class="flex items-center gap-1 text-slate-500 text-sm mt-0.5">
                                            <span class="material-symbols-outlined text-[14px]">location_on</span>
                                            Bellevue Clinic (5.1 mi)
                                        </div>
                                    </div>
                                </div>
                                <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider">Passive Donor</span>
                            </div>
                            <div class="grid grid-cols-2 gap-4 mt-2">
                                <div class="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                    <span class="block text-xs font-bold text-slate-400 mb-1 uppercase">Last Donation</span>
                                    <span class="block font-bold text-slate-400">14 Months Ago</span>
                                </div>
                                <div class="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                    <span class="block text-xs font-bold text-slate-400 mb-1 uppercase">Response Rate</span>
                                    <span class="block font-bold text-slate-700">Moderate</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Details Sidebar -->
                    <aside class="xl:col-span-4">
                        <div class="sticky top-24 bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden flex flex-col">
                            <div class="h-32 bg-blue-500 relative flex items-end p-6">
                                <div class="absolute -bottom-10 right-6 w-20 h-20 rounded-full border-4 border-white bg-red-700 text-white flex items-center justify-center text-3xl font-black shadow-lg">O+</div>
                            </div>
                            <div class="p-6 pt-12 flex flex-col gap-6">
                                <div>
                                    <div class="flex items-center gap-2 mb-1">
                                        <h2 class="text-2xl font-bold text-slate-900">Marcus Johnson</h2>
                                        <span class="material-symbols-outlined text-blue-600" style="font-variation-settings: 'FILL' 1;">verified</span>
                                    </div>
                                    <p class="text-slate-500 font-medium">ID: #BP-8842-O</p>
                                </div>
                                <div class="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-4">
                                    <div class="flex items-start gap-3">
                                        <span class="material-symbols-outlined text-slate-400">call</span>
                                        <div>
                                            <span class="block text-xs font-bold text-slate-400 uppercase">Emergency Contact</span>
                                            <span class="block font-bold text-slate-900">+1 (555) 019-2834</span>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <span class="material-symbols-outlined text-slate-400">mail</span>
                                        <div>
                                            <span class="block text-xs font-bold text-slate-400 uppercase">Email Address</span>
                                            <span class="block font-bold text-slate-900">m.johnson@securemail.org</span>
                                        </div>
                                    </div>
                                </div>
                                <button class="w-full py-4 bg-red-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-red-800 transition-all shadow-lg active:scale-95" onclick="goTo('/login')">
                                    <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">bloodtype</span>
                                    Request Blood Direct
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <footer class="bg-white border-t border-slate-200 py-12 px-6">
                <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div class="flex flex-col gap-2 text-center md:text-left">
                        <div class="font-bold text-slate-900 text-xl">Blood Pulse</div>
                        <p class="text-sm text-slate-500">Precision in Care, Empathy in Service.</p>
                    </div>
                    <p class="text-sm text-slate-500">© 2024 Blood Pulse. Precision in Care, Empathy in Service.</p>
                </div>
            </footer>
        </div>
    `
};


