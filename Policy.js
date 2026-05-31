export const Policy = {
    render: () => `
        <div class="bg-slate-50 min-h-screen flex flex-col w-full overflow-x-hidden">
            ${window.PublicNavbar()}

            <main class="flex-1 w-full max-w-5xl mx-auto px-6 py-16">
                <div class="space-y-16">
                    <div class="text-center space-y-4">
                        <div class="inline-block px-4 py-1 bg-red-50 text-[#af101a] text-[10px] font-black rounded-full uppercase tracking-[0.3em] mb-4">Official Governance</div>
                        <h1 class="text-6xl font-black text-[#86000d] font-outfit tracking-tighter leading-none">TERMS AND CONDITIONS</h1>
                        <p class="text-slate-500 font-bold text-lg">Legal Framework & Community Safety Protocols at BAUST.</p>
                    </div>

                    <!-- Introduction -->
                    <section class="bg-white rounded-[40px] p-12 border border-slate-200 shadow-sm">
                        <p class="text-slate-600 leading-relaxed font-medium">
                            Welcome to <strong>BAUST Blood Pulse</strong>. By accessing or using this platform, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions. This platform is an institutional initiative designed for the BAUST community to coordinate life-saving blood donations. <strong>Unauthorized use is strictly prohibited.</strong>
                        </p>
                    </section>

                    <!-- Article 1: Data Protection & Anti-Piracy -->
                    <section class="bg-white rounded-[40px] p-12 border border-slate-200 shadow-sm space-y-8">
                        <div class="flex items-center gap-4">
                            <div class="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-[#af101a]">
                                <span class="material-symbols-outlined text-3xl">policy</span>
                            </div>
                            <h2 class="text-3xl font-black text-slate-900 font-outfit">1. Data Sovereignty & Anti-Piracy</h2>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-600 text-sm leading-relaxed font-medium">
                            <p>
                                <strong>1.1 Prohibition of Scraping:</strong> Any attempt to use automated systems (bots, spiders, scrapers) to extract member data, contact numbers, or profile information is a direct violation of our security protocol.
                            </p>
                            <p>
                                <strong>1.2 Civil & Criminal Liability:</strong> Data piracy is a punishable offense under the Digital Security Act of Bangladesh. BAUST reserves the right to initiate criminal proceedings against any individual or entity found harvesting data from this platform.
                            </p>
                        </div>
                    </section>

                    <!-- Article 2: Misuse of Personal Information -->
                    <section class="bg-[#1f1412] text-white rounded-[40px] p-12 shadow-2xl space-y-8 relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
                        <div class="flex items-center gap-4">
                            <div class="w-14 h-14 rounded-2xl bg-[#af101a] flex items-center justify-center">
                                <span class="material-symbols-outlined text-3xl text-white">gavel</span>
                            </div>
                            <h2 class="text-3xl font-black font-outfit text-white">2. Strict Anti-Harassment Clause</h2>
                        </div>
                        <div class="space-y-6">
                            <p class="text-red-100 opacity-80 leading-relaxed font-bold">
                                Member contact numbers are protected assets. Their use is restricted exclusively to verified medical emergencies within the BAUST community.
                            </p>
                            <div class="space-y-4">
                                <div class="p-6 bg-white/5 rounded-2xl border border-white/10">
                                    <h4 class="text-red-500 font-black text-xs uppercase tracking-widest mb-2">Zero Tolerance</h4>
                                    <p class="text-sm opacity-80">Harassment, "cold-calling," or using member numbers for personal/commercial purposes will result in an immediate <strong>Permanent Ban</strong> and reporting to the BAUST Proctorial Body.</p>
                                </div>
                                <div class="p-6 bg-white/5 rounded-2xl border border-white/10">
                                    <h4 class="text-red-500 font-black text-xs uppercase tracking-widest mb-2">Access Logging</h4>
                                    <p class="text-sm opacity-80">Our system performs high-precision logging of every interaction with a donor's contact details. We track the Timestamp, User Identity, and Intent of every view.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Article 3: Identity & Verity -->
                    <section class="bg-white rounded-[40px] p-12 border border-slate-200 shadow-sm space-y-8">
                        <div class="flex items-center gap-4">
                            <div class="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                                <span class="material-symbols-outlined text-3xl">verified_user</span>
                            </div>
                            <h2 class="text-3xl font-black text-slate-900 font-outfit">3. Truthfulness & Identity</h2>
                        </div>
                        <p class="text-slate-600 leading-relaxed font-medium">
                            Users must provide accurate, current, and complete information during registration. Impersonation of medical professionals, BAUST administrators, or other students is a major breach of conduct. 
                            <strong>Misinformation kills.</strong> Spreading fake blood appeals or creating fraudulent requests will lead to legal prosecution.
                        </p>
                    </section>

                    <!-- Article 4: Liability Waiver -->
                    <section class="bg-slate-100 rounded-[40px] p-12 border border-slate-200 space-y-8">
                        <h2 class="text-3xl font-black text-slate-900 font-outfit">4. Limitation of Liability</h2>
                        <p class="text-slate-500 text-sm font-bold leading-relaxed italic">
                            BAUST Blood Pulse is a coordination platform. We do not perform medical procedures, blood testing, or storage. 
                            Users acknowledge that the donation process itself is a direct interaction between the donor and the medical facility. 
                            BAUST Blood Pulse is not liable for any complications arising from the medical donation process.
                        </p>
                    </section>

                    <!-- Acceptance -->
                    <div class="text-center py-12">
                        <p class="text-slate-400 font-bold text-xs uppercase tracking-[0.3em]">
                            Last Updated: May 2024 • BAUST Administrative Council
                        </p>
                    </div>
                </div>
            </main>

            ${window.GlobalFooter()}
        </div>
    `
};


