import { db } from '../js/db.js';

export const Contact = {
    render: () => `
        <div class="bg-slate-50 min-h-screen flex flex-col">
            ${window.PublicNavbar()}

            <main class="flex-1 w-full max-w-7xl mx-auto px-6 py-16">
                <!-- Header Section -->
                <div class="text-center mb-16 animate-fade-in">
                    <div class="inline-block px-4 py-1 bg-red-50 text-[#af101a] text-[10px] font-black rounded-full uppercase tracking-[0.2em] mb-4">Official Institutional Contacts</div>
                    <h1 class="text-5xl font-black text-slate-900 font-outfit tracking-tighter mb-4">Get in Touch with BAUST</h1>
                    <p class="text-lg text-slate-500 font-bold max-w-2xl mx-auto">Connecting donors, students, and patients within the Saidpur Cantonment community.</p>
                </div>

                <!-- Contact Information Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 animate-slide-up">
                    <!-- Location Card -->
                    <div class="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 group">
                        <div class="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-[#af101a] mb-6 group-hover:bg-[#af101a] group-hover:text-white transition-all duration-500">
                            <span class="material-symbols-outlined text-3xl">location_on</span>
                        </div>
                        <h3 class="text-xl font-black text-slate-900 mb-2 uppercase tracking-wider">Our Location</h3>
                        <p id="contact-address" class="text-slate-500 font-bold leading-relaxed">
                            <span class="inline-block w-24 h-4 bg-slate-100 rounded animate-pulse"></span>
                        </p>
                    </div>

                    <!-- Phone Card -->
                    <div class="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 group">
                        <div class="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-[#af101a] mb-6 group-hover:bg-[#af101a] group-hover:text-white transition-all duration-500">
                            <span class="material-symbols-outlined text-3xl">phone_in_talk</span>
                        </div>
                        <h3 class="text-xl font-black text-slate-900 mb-2 uppercase tracking-wider">Call Us</h3>
                        <div id="contact-phones" class="space-y-1">
                            <span class="inline-block w-32 h-4 bg-slate-100 rounded animate-pulse"></span>
                        </div>
                    </div>

                    <!-- Email Card -->
                    <div class="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 group">
                        <div class="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-[#af101a] mb-6 group-hover:bg-[#af101a] group-hover:text-white transition-all duration-500">
                            <span class="material-symbols-outlined text-3xl">mail</span>
                        </div>
                        <h3 class="text-xl font-black text-slate-900 mb-2 uppercase tracking-wider">Email Us</h3>
                        <p id="contact-email" class="text-slate-500 font-bold leading-relaxed">
                            <span class="inline-block w-40 h-4 bg-slate-100 rounded animate-pulse"></span>
                        </p>
                        <p class="text-slate-400 font-bold text-xs mt-1">Official University Correspondence</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <!-- Contact Form -->
                    <div class="bg-white rounded-[50px] p-12 lg:p-16 border border-slate-200 shadow-2xl">
                        <h2 class="text-3xl font-black text-slate-900 font-outfit mb-4">Send us a Message</h2>
                        <p class="text-slate-500 font-bold mb-10">Whether you're a donor or need blood, we're here to help.</p>
                        
                        <form id="contact-form" class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                                    <input id="msg-name" type="text" placeholder="Your Name" class="w-full bg-slate-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-[#af101a] transition-all font-bold text-slate-700 outline-none">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email</label>
                                    <input id="msg-email" type="email" placeholder="email@example.com" class="w-full bg-slate-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-[#af101a] transition-all font-bold text-slate-700 outline-none">
                                </div>
                            </div>
                            <div class="space-y-2">
                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Message</label>
                                <textarea id="msg-body" rows="4" placeholder="How can we assist you?" class="w-full bg-slate-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-[#af101a] transition-all font-bold text-slate-700 outline-none resize-none"></textarea>
                            </div>
                            <div id="form-status" class="hidden text-sm font-black text-center py-3 rounded-2xl"></div>
                            <button type="submit" id="contact-submit" class="bg-[#af101a] text-white font-black py-4 px-10 rounded-2xl hover:bg-[#86000d] transition-all transform active:scale-95 shadow-lg shadow-red-500/20 uppercase tracking-widest text-sm w-full flex items-center justify-center gap-2">
                                <span class="material-symbols-outlined text-lg">send</span>
                                Submit Request
                            </button>
                        </form>
                    </div>

                    <!-- Campus Map / Founder Section -->
                    <div class="space-y-8">
                        <div class="bg-slate-900 rounded-[50px] p-12 text-white relative overflow-hidden group">
                            <div class="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                            <h2 class="text-3xl font-black font-outfit mb-6 relative z-10 uppercase tracking-tighter">Campus Location</h2>
                            <div class="aspect-video bg-slate-800 rounded-3xl overflow-hidden relative z-10 border border-white/5">
                                <iframe 
                                    class="w-full h-full grayscale"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.630017124353!2d88.93282271502!3d25.75034688364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2cc81452a8a81%3A0x6b306473f32c3f1d!2sBAUST!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd" 
                                    allowfullscreen="" 
                                    loading="lazy">
                                </iframe>
                            </div>
                            <p class="mt-6 text-slate-400 font-bold text-sm">Located within the secure perimeter of Saidpur Cantonment, serving the military and civilian community.</p>
                        </div>

                        <!-- Developer Info -->
                        <div class="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl flex items-center gap-6">
                            <div id="founder-initials" class="w-20 h-20 rounded-full bg-red-50 flex-shrink-0 flex items-center justify-center text-[#af101a] font-black text-2xl">NS</div>
                            <div>
                                <h4 class="text-xl font-black text-slate-900 uppercase tracking-tight">Nasim Uddin Shawrab</h4>
                                <p class="text-slate-500 font-bold text-sm">Lead Developer & Platform Founder</p>
                                <p class="text-[#af101a] font-black text-[10px] uppercase tracking-widest mt-1">BAUST CSE DEPARTMENT</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            ${window.GlobalFooter()}
        </div>
    `,
    afterRender: async () => {
        // Fetch live from db platform_settings
        try {
            const { data: settings } = await db
                .from('platform_settings')
                .select('address, phone, email, map_url, founder_name, founder_role')
                .eq('id', 'config')
                .single();

            if (settings) {
                const addrEl = document.getElementById('contact-address');
                const phoneEl = document.getElementById('contact-phones');
                const emailEl = document.getElementById('contact-email');
                const mapIframe = document.querySelector('iframe');
                const founderName = document.querySelector('h4.text-xl.font-black');
                const founderRole = document.querySelector('p.text-slate-500.font-bold');
                const founderInitial = document.getElementById('founder-initials');

                if (addrEl && settings.address) {
                    addrEl.innerHTML = settings.address.replace(/\n/g, '<br>');
                }
                if (phoneEl && settings.phone) {
                    phoneEl.innerHTML = `<p class="text-slate-500 font-bold text-sm">Help-Line: ${settings.phone}</p>`;
                }
                if (emailEl && settings.email) {
                    emailEl.textContent = settings.email;
                }
                if (mapIframe && settings.map_url) {
                    mapIframe.src = settings.map_url;
                }
                if (founderName && settings.founder_name) {
                    founderName.textContent = settings.founder_name;
                    if (founderInitial) {
                        const initials = settings.founder_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                        founderInitial.textContent = initials;
                    }
                }
                if (founderRole && settings.founder_role) {
                    founderRole.textContent = settings.founder_role;
                }
            }
        } catch (e) {
            console.warn('Could not load contact settings from db:', e);
        }

        // Subscribe to real-time updates (Polling for MSSQL)
        if (window._currentSettingsSub) {
            clearInterval(window._currentSettingsSub);
            window._currentSettingsSub = null;
        }

        window._currentSettingsSub = setInterval(async () => {
            try {
                const { data: settings } = await db.from('platform_settings').select('address, phone, email, map_url, founder_name, founder_role').eq('id', 'config').single();
                if (settings) {
                    const addrEl = document.getElementById('contact-address');
                    const phoneEl = document.getElementById('contact-phones');
                    const emailEl = document.getElementById('contact-email');
                    const mapIframe = document.querySelector('iframe');
                    const founderName = document.querySelector('h4.text-xl.font-black');
                    const founderRole = document.querySelector('p.text-slate-500.font-bold');
                    const founderInitial = document.getElementById('founder-initials');

                    if (addrEl && settings.address) addrEl.innerHTML = settings.address.replace(/\n/g, '<br>');
                    if (phoneEl && settings.phone) phoneEl.innerHTML = `<p class="text-slate-500 font-bold text-sm">Help-Line: ${settings.phone}</p>`;
                    if (emailEl && settings.email) emailEl.textContent = settings.email;
                    if (mapIframe && settings.map_url) mapIframe.src = settings.map_url;
                    if (founderName && settings.founder_name) {
                        founderName.textContent = settings.founder_name;
                        if (founderInitial) {
                            const initials = settings.founder_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                            founderInitial.textContent = initials;
                        }
                    }
                    if (founderRole && settings.founder_role) founderRole.textContent = settings.founder_role;
                }
            } catch(e) {}
        }, 30000);

        // Contact form submission (saves to db notifications table as a message)
        const form = document.getElementById('contact-form');
        if (form) {
            form.onsubmit = async (e) => {
                e.preventDefault();
                const btn = document.getElementById('contact-submit');
                const status = document.getElementById('form-status');
                const name = document.getElementById('msg-name').value.trim();
                const email = document.getElementById('msg-email').value.trim();
                const body = document.getElementById('msg-body').value.trim();

                if (!name || !email || !body) return;

                btn.innerHTML = '<span class="material-symbols-outlined animate-spin">sync</span> Sending...';
                btn.disabled = true;

                const { error } = await db.from('notifications').insert({
                    user_id: null,
                    title: `📩 Contact: ${name}`,
                    message: `From: ${email}\n\n${body}`,
                    type: 'contact_message'
                });

                if (error) {
                    status.textContent = 'Failed to send. Please try again.';
                    status.className = 'text-sm font-black text-center py-3 rounded-2xl bg-red-50 text-red-500';
                } else {
                    status.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
                    status.className = 'text-sm font-black text-center py-3 rounded-2xl bg-emerald-50 text-emerald-600';
                    form.reset();
                }
                status.classList.remove('hidden');
                btn.innerHTML = '<span class="material-symbols-outlined text-lg">send</span> Submit Request';
                btn.disabled = false;
            };
        }
    }
};


