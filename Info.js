export const Info = {
    render: () => `
        <div class="bg-slate-50 min-h-screen flex flex-col">
            ${window.PublicNavbar()}

            <main class="flex-1 w-full max-w-4xl mx-auto px-6 py-16">
                <article class="prose prose-slate max-w-none space-y-12">
                    <div class="text-center space-y-4 mb-16">
                        <div class="inline-block px-4 py-1 bg-red-50 text-[#af101a] text-xs font-black rounded-full uppercase tracking-[0.3em]">Institutional Mission</div>
                        <h1 class="text-6xl font-black text-[#86000d] font-outfit tracking-tighter leading-none">Purpose of Blood Pulse</h1>
                        <p class="text-xl text-slate-500 font-medium">Empowering the BAUST community through rapid, reliable, and compassionate blood donation coordination.</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div class="space-y-6">
                            <h2 class="text-3xl font-black text-slate-900 font-outfit">Bridging the Gap</h2>
                            <p class="text-slate-600 leading-relaxed font-medium">
                                Blood Pulse was conceived at Bangladesh Army University of Science and Technology (BAUST) to address the critical challenge of finding compatible blood donors during emergencies. 
                                Our mission is to digitalize the campus donor network, ensuring that no request goes unanswered and every drop of life is managed with precision and empathy.
                            </p>
                        </div>
                        <div class="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                            <div class="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-[#af101a] mb-6">
                                <span class="material-symbols-outlined text-3xl">hub</span>
                            </div>
                            <h3 class="text-xl font-black text-slate-900 mb-2 font-outfit">Core Objective</h3>
                            <p class="text-sm text-slate-500 font-bold">To create a centralized, real-time database of BAUST students and staff who are willing to donate, making the process faster and more transparent than ever before.</p>
                        </div>
                    </div>

                    <div class="bg-[#86000d] text-white rounded-[50px] p-12 shadow-2xl relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                        <h2 class="text-3xl font-black mb-8 font-outfit tracking-tight">Why Choose Blood Pulse?</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="space-y-2">
                                <h4 class="font-black text-red-200 uppercase tracking-widest text-xs">Verified Network</h4>
                                <p class="text-sm opacity-80 leading-relaxed font-medium">Every member in our community is a verified student or staff member of BAUST, ensuring trust and security.</p>
                            </div>
                            <div class="space-y-2">
                                <h4 class="font-black text-red-200 uppercase tracking-widest text-xs">Rapid Response</h4>
                                <p class="text-sm opacity-80 leading-relaxed font-medium">Our emergency contact cards allow anyone to reach out to community heads instantly when seconds matter.</p>
                            </div>
                            <div class="space-y-2">
                                <h4 class="font-black text-red-200 uppercase tracking-widest text-xs">Data Privacy</h4>
                                <p class="text-sm opacity-80 leading-relaxed font-medium">We prioritize donor privacy, revealing contact details only to registered members or authorized requests.</p>
                            </div>
                            <div class="space-y-2">
                                <h4 class="font-black text-red-200 uppercase tracking-widest text-xs">Institutional Pride</h4>
                                <p class="text-sm opacity-80 leading-relaxed font-medium">A project built by BAUST students, for the BAUST community, embodying our spirit of service and excellence.</p>
                            </div>
                        </div>
                    </div>

                </article>
            </main>

            ${window.GlobalFooter()}
        </div>
    `
};


