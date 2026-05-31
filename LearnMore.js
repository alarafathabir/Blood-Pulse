export const LearnMore = {
    render: () => `
        <div class="bg-slate-50 min-h-screen flex flex-col">
            ${window.PublicNavbar()}

            <main class="flex-1 w-full max-w-4xl mx-auto px-6 py-16">
                <div class="space-y-16">
                    <div class="text-center space-y-4">
                        <div class="inline-block px-4 py-1 bg-[#af101a] text-white text-[10px] font-black rounded-full uppercase tracking-[0.3em] mb-4">Educational Resource</div>
                        <h1 class="text-5xl font-black text-[#86000d] font-outfit tracking-tighter">Everything You Need to Know</h1>
                        <p class="text-slate-500 font-medium text-lg">Knowledge is the first step to becoming a hero. Learn about the science and impact of blood donation.</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 text-center hover:shadow-xl transition-all duration-300">
                            <div class="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-[#af101a] mx-auto mb-6">
                                <span class="material-symbols-outlined text-3xl">health_and_safety</span>
                            </div>
                            <h3 class="text-xl font-black text-slate-900 mb-4 font-outfit">Health Benefits</h3>
                            <p class="text-sm text-slate-500 font-bold leading-relaxed">Donating blood helps maintain iron levels, improves cardiovascular health, and triggers new blood cell production.</p>
                        </div>

                        <div class="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 text-center hover:shadow-xl transition-all duration-300">
                            <div class="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-[#af101a] mx-auto mb-6">
                                <span class="material-symbols-outlined text-3xl">biotech</span>
                            </div>
                            <h3 class="text-xl font-black text-slate-900 mb-4 font-outfit">The Science</h3>
                            <p class="text-sm text-slate-500 font-bold leading-relaxed">Learn about different blood types (A, B, AB, O) and how antigens determine compatibility between donors and recipients.</p>
                        </div>

                        <div class="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 text-center hover:shadow-xl transition-all duration-300">
                            <div class="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-[#af101a] mx-auto mb-6">
                                <span class="material-symbols-outlined text-3xl">volunteer_activism</span>
                            </div>
                            <h3 class="text-xl font-black text-slate-900 mb-4 font-outfit">The Impact</h3>
                            <p class="text-sm text-slate-500 font-bold leading-relaxed">One single bag of blood can save up to three lives. Your contribution has a ripple effect of hope across the community.</p>
                        </div>
                    </div>

                    <!-- Benefits Table -->
                    <div class="bg-white rounded-[50px] overflow-hidden border border-slate-200 shadow-2xl space-y-0 group">
                        <div class="bg-gradient-to-r from-[#af101a] to-[#86000d] p-12 text-center relative overflow-hidden">
                            <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                            <h2 class="text-4xl font-black text-white font-outfit relative z-10">The Benefits of Giving</h2>
                            <p class="text-red-100 font-bold mt-2 relative z-10 opacity-80 uppercase tracking-[0.2em] text-[10px]">Your Health. Our Mission.</p>
                        </div>
                        
                        <div class="p-8 lg:p-12">
                            <div class="grid grid-cols-1 gap-4">
                                ${[
                                    { icon: 'favorite', title: 'Cardiovascular Health', desc: 'Reduces the risk of heart attacks and strokes by effectively managing iron levels in your bloodstream.' },
                                    { icon: 'refresh', title: 'New Cell Production', desc: 'Triggers your body to produce fresh, healthy red blood cells within just 48 hours of donation.' },
                                    { icon: 'medical_services', title: 'Free Health Screening', desc: 'Every donation includes a mini-physical checkup including blood pressure and hemoglobin testing.' },
                                    { icon: 'psychology', title: 'Psychological Wellness', desc: 'The satisfaction of saving 3 lives per donation significantly reduces stress and boosts mental health.' }
                                ].map(b => `
                                    <div class="flex flex-col md:flex-row items-start md:items-center gap-6 p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:bg-white hover:border-[#af101a]/20 hover:shadow-xl transition-all duration-500 group/item">
                                        <div class="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#af101a] group-hover/item:bg-[#af101a] group-hover/item:text-white transition-all duration-500 flex-shrink-0">
                                            <span class="material-symbols-outlined text-3xl">${b.icon}</span>
                                        </div>
                                        <div class="flex-1">
                                            <h4 class="text-xl font-black text-slate-900 font-outfit mb-2 group-hover/item:text-[#af101a] transition-colors">${b.title}</h4>
                                            <p class="text-slate-500 font-bold text-sm leading-relaxed">${b.desc}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Compatibility Table -->
                    <div class="bg-white rounded-[50px] p-12 border border-slate-200 shadow-sm space-y-10">
                        <div class="text-center">
                            <h2 class="text-3xl font-black text-slate-900 font-outfit">Blood Type Compatibility</h2>
                            <p class="text-slate-500 font-medium mt-2">Find out who you can help and who can help you.</p>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full text-center border-collapse">
                                <thead>
                                    <tr class="bg-slate-50 rounded-2xl overflow-hidden">
                                        <th class="py-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Blood Type</th>
                                        <th class="py-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#af101a]">Can Give To</th>
                                        <th class="py-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#af101a]">Can Receive From</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100">
                                    ${[
                                        { type: 'A+', give: 'A+, AB+', take: 'A+, A-, O+, O-' },
                                        { type: 'A-', give: 'A+, A-, AB+, AB-', take: 'A-, O-' },
                                        { type: 'B+', give: 'B+, AB+', take: 'B+, B-, O+, O-' },
                                        { type: 'B-', give: 'B+, B-, AB+, AB-', take: 'B-, O-' },
                                        { type: 'AB+', give: 'AB+ ONLY', take: 'ALL GROUPS (Universal)' },
                                        { type: 'AB-', give: 'AB+, AB-', take: 'AB-, A-, B-, O-' },
                                        { type: 'O+', give: 'O+, A+, B+, AB+', take: 'O+, O-' },
                                        { type: 'O-', give: 'ALL GROUPS (Universal)', take: 'O- ONLY' }
                                    ].map(b => `
                                        <tr class="hover:bg-red-50/30 transition-colors">
                                            <td class="py-4 px-4 font-black text-[#af101a] text-lg">${b.type}</td>
                                            <td class="py-4 px-4 text-slate-700 text-xs font-black uppercase tracking-widest">${b.give}</td>
                                            <td class="py-4 px-4 text-slate-700 text-xs font-black uppercase tracking-widest">${b.take}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                        <div class="p-6 bg-red-50 rounded-3xl border border-red-100">
                            <p class="text-[10px] font-black text-[#af101a] uppercase tracking-[0.2em] mb-2 text-center">Important Note</p>
                            <p class="text-xs text-slate-600 font-medium text-center leading-relaxed">Type <span class="font-black">O Negative</span> is the universal donor, meaning their blood can be given to patients of any blood type. Type <span class="font-black">AB Positive</span> is the universal recipient, meaning they can receive blood from any donor.</p>
                        </div>
                    </div>

                    <div class="bg-white rounded-[50px] p-12 border border-slate-200 shadow-sm space-y-8">
                        <h2 class="text-3xl font-black text-slate-900 font-outfit">Frequently Asked Questions</h2>
                        <div class="space-y-6">
                            <details class="group border-b border-slate-100 pb-4">
                                <summary class="list-none flex justify-between items-center cursor-pointer font-black text-[#af101a] uppercase tracking-wider text-sm">
                                    Who can donate blood?
                                    <span class="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <p class="mt-4 text-slate-600 font-medium">Anyone between 18-65 years old, weighing at least 50kg, and in good general health can typically donate.</p>
                            </details>

                            <details class="group border-b border-slate-100 pb-4">
                                <summary class="list-none flex justify-between items-center cursor-pointer font-black text-[#af101a] uppercase tracking-wider text-sm">
                                    How long does it take?
                                    <span class="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <p class="mt-4 text-slate-600 font-medium">The actual donation takes about 10 minutes, but the entire process (registration, screening, rest) takes about 45-60 minutes.</p>
                            </details>

                            <details class="group">
                                <summary class="list-none flex justify-between items-center cursor-pointer font-black text-[#af101a] uppercase tracking-wider text-sm">
                                    Is it safe?
                                    <span class="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <p class="mt-4 text-slate-600 font-medium">Yes. All equipment is sterile and used only once. Our medical team ensures your safety throughout the entire procedure.</p>
                            </details>
                        </div>
                    </div>

                    <div class="text-center">
                        <button onclick="goTo('/register')" class="px-10 py-4 bg-[#af101a] text-white rounded-full font-black text-sm uppercase tracking-widest shadow-xl hover:bg-[#86000d] transition-all glow-red">Start Your Journey Today</button>
                    </div>
                </div>
            </main>

            ${window.GlobalFooter()}
        </div>
    `
};


