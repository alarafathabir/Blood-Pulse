import { db } from '../js/db.js';
import { GlobalState } from '../js/dynamic.js';

export const Home = {
    render: () => {
        const isLoggedIn = !!localStorage.getItem('bloodpulse_token');
        
        return `
        <div class="font-inter antialiased min-h-screen w-full overflow-x-hidden bg-white text-slate-900">
            ${window.PublicNavbar()}

            <!-- Hero Section with Background Image -->
            <section class="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden">
                <!-- Background Image Layer -->
                <div class="absolute inset-0 z-0">
                    <img src="/public/images/home_bg.jpg" class="w-full h-full object-cover" alt="Hero Background">
                    <div class="absolute inset-0 bg-slate-950/50"></div>
                </div>

                <div class="relative z-20 w-full max-w-7xl mx-auto px-6 pt-20 text-center flex flex-col items-center animate-fade-in">
                    
                    <h1 class="font-outfit text-6xl md:text-8xl font-black text-white max-w-5xl mb-8 tracking-tighter leading-[0.85] drop-shadow-2xl">
                        ${GlobalState.get('hero_title') || 'Give the gift of life.'}
                    </h1>
                    
                    <p class="text-lg md:text-xl text-white/80 max-w-2xl mb-12 font-medium leading-relaxed drop-shadow-lg">
                        ${GlobalState.get('hero_subtitle') || 'Every drop counts. Join our network of heroes and ensure that medical precision meets human empathy when it matters most.'}
                    </p>

                    <div class="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
                        ${isLoggedIn ? `
                            <button class="w-full sm:w-auto bg-[#af101a] text-white font-black px-12 py-5 rounded-3xl shadow-[0_20px_50px_rgba(175,16,26,0.4)] hover:bg-[#86000d] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-xs" onclick="document.getElementById('stories-section').scrollIntoView({behavior: 'smooth'})">
                                <span>See Our Stories</span>
                                <span class="material-symbols-outlined">auto_stories</span>
                            </button>
                        ` : `
                            <button class="w-full sm:w-auto bg-[#af101a] text-white font-black px-12 py-5 rounded-3xl shadow-[0_20px_50px_rgba(175,16,26,0.4)] hover:bg-[#86000d] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-xs" onclick="window.goTo('/register')">
                                <span>Register As Donor</span>
                                <span class="material-symbols-outlined">arrow_forward</span>
                            </button>
                        `}
                        <button class="w-full sm:w-auto bg-white/10 backdrop-blur-xl text-white border border-white/20 font-black px-12 py-5 rounded-3xl shadow-2xl hover:bg-white hover:text-[#af101a] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center uppercase tracking-widest text-xs" onclick="window.goTo('${isLoggedIn ? '/search' : '/login'}')">
                            Request Blood
                        </button>
                    </div>

                    <!-- Floating Stats (Hero Bottom) -->
                    <div class="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-5xl">
                        <div class="bg-white/10 backdrop-blur-2xl border border-white/10 p-6 rounded-[32px] text-center">
                            <div id="stat-donors" class="text-3xl font-black text-white mb-1 tracking-tighter">0</div>
                            <div class="text-[9px] font-black text-white/50 uppercase tracking-widest">Active Donors</div>
                        </div>
                        <div class="bg-white/10 backdrop-blur-2xl border border-white/10 p-6 rounded-[32px] text-center">
                            <div id="stat-requests" class="text-3xl font-black text-white mb-1 tracking-tighter">0</div>
                            <div class="text-[9px] font-black text-white/50 uppercase tracking-widest">Live Appeals</div>
                        </div>
                        <div class="bg-white/10 backdrop-blur-2xl border border-white/10 p-6 rounded-[32px] text-center">
                            <div class="text-3xl font-black text-white mb-1 tracking-tighter">100%</div>
                            <div class="text-[9px] font-black text-white/50 uppercase tracking-widest">Verified</div>
                        </div>
                        <div class="bg-white/10 backdrop-blur-2xl border border-white/10 p-6 rounded-[32px] text-center">
                            <div class="text-3xl font-black text-white mb-1 tracking-tighter">24/7</div>
                            <div class="text-[9px] font-black text-white/50 uppercase tracking-widest">Emergency</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Mission Section -->
            <section class="w-full py-32 bg-white">
                <div class="max-w-7xl mx-auto px-6">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div class="relative">
                            <div class="absolute -top-10 -left-10 w-40 h-40 bg-red-50 rounded-full blur-3xl opacity-60"></div>
                            <div class="relative z-10 space-y-8">
                                <div class="inline-block px-4 py-1 bg-red-50 text-[#af101a] text-[10px] font-black rounded-full uppercase tracking-[0.3em]">Our Mission</div>
                                <h2 class="font-outfit text-5xl md:text-6xl font-black text-slate-900 leading-[0.95] tracking-tighter">Precision in Care,<br>Empathy in Service.</h2>
                                <p class="text-slate-600 font-medium text-lg leading-relaxed max-w-xl">
                                    BAUST Blood Pulse was established to bridge the gap between donors and those in urgent need. We combine institutional reliability with the warmth of voluntary service.
                                </p>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                                    <div class="flex items-start gap-4">
                                        <div class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                                            <span class="material-symbols-outlined text-[#af101a]">verified_user</span>
                                        </div>
                                        <div>
                                            <h4 class="font-black text-slate-900 text-xs uppercase tracking-widest mb-1">Secure Network</h4>
                                            <p class="text-[11px] text-slate-500 font-medium uppercase tracking-widest">Verified Identities only</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-4">
                                        <div class="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                                            <span class="material-symbols-outlined text-[#af101a]">bolt</span>
                                        </div>
                                        <div>
                                            <h4 class="font-black text-slate-900 text-xs uppercase tracking-widest mb-1">Instant Alerts</h4>
                                            <p class="text-[11px] text-slate-500 font-medium uppercase tracking-widest">Real-time emergency sync</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="relative group">
                            <div class="absolute inset-0 bg-[#af101a] rounded-[56px] rotate-3 scale-[1.02] opacity-5 group-hover:rotate-6 transition-transform duration-700"></div>
                            <div class="relative aspect-square bg-slate-100 rounded-[56px] overflow-hidden shadow-2xl border border-slate-200">
                                <img src="/public/images/blood.gif" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-12">
                                    <p class="text-white text-xs font-black uppercase tracking-[0.4em]">Every Drop Counts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Committee Section -->
            <section class="w-full py-32 bg-[#fbf9f8]">
                <div class="max-w-7xl mx-auto px-6">
                    <div class="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div>
                            <div class="inline-block px-4 py-1 bg-slate-200 text-slate-600 text-[10px] font-black rounded-full uppercase tracking-[0.3em] mb-4">Leadership</div>
                            <h2 class="text-5xl font-black text-slate-900 font-outfit tracking-tighter">Command Committee</h2>
                        </div>
                        <p class="text-slate-500 font-medium max-w-xs text-sm">The visionaries behind the campus-wide blood donation movement.</p>
                    </div>
                    <div id="home-committee-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <!-- Committee members injected here -->
                    </div>
                </div>
            </section>

            <!-- Donor Stories -->
            <section id="stories-section" class="w-full py-32 bg-white relative overflow-hidden">
                <div class="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-[100px] -mr-48 -mt-48 opacity-40"></div>
                <div class="max-w-7xl mx-auto px-6 relative z-10">
                    <div class="text-center mb-20">
                        <div class="inline-block px-4 py-1 bg-[#af101a]/10 text-[#af101a] text-[10px] font-black rounded-full uppercase tracking-[0.3em] mb-4">Voices of Impact</div>
                        <h2 class="text-5xl font-black text-slate-900 font-outfit tracking-tighter mb-4">Hero Chronicles</h2>
                        <p class="text-slate-500 font-bold text-sm uppercase tracking-widest">Real stories from our life-saving community.</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="home-stories-grid"></div>
                </div>
            </section>

            <!-- Gallery -->
            <section class="w-full py-32 bg-[#0f172a] text-white">
                <div class="max-w-7xl mx-auto px-6">
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
                        <div class="lg:col-span-8">
                            <h2 class="text-5xl font-black font-outfit tracking-tighter uppercase mb-4 leading-none">Community<br>Impact Gallery</h2>
                            <p class="text-slate-400 font-medium text-lg">Capturing moments of hope and collective action across the campus.</p>
                        </div>
                        <div class="lg:col-span-4 flex lg:justify-end">
                            <a id="home-facebook-link" href="#" target="_blank" class="inline-flex items-center gap-4 px-10 py-5 bg-[#1877F2] text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all">
                                <svg class="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
                                Facebook Hub
                            </a>
                        </div>
                    </div>
                    
                    <div id="home-gallery-grid" class="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <!-- Dynamic images injected here -->
                    </div>
                </div>
            </section>

            ${window.GlobalFooter()}
        </div>
        `;
    },
    afterRender: async () => {
        const renderHomeData = async () => {
            const storiesGrid = document.getElementById('home-stories-grid');
            const galleryGrid = document.getElementById('home-gallery-grid');
            const committeeGrid = document.getElementById('home-committee-grid');
            const donorEl = document.getElementById('stat-donors');
            const reqEl = document.getElementById('stat-requests');
            const fbLink = document.getElementById('home-facebook-link');

            try {
                // 1. Stats from MSSQL
                const { data: profileStats } = await db.from('profiles').select('count');
                const { data: requestStats } = await db.from('requests').select('count');
                
                if (donorEl) donorEl.textContent = profileStats && profileStats[0] ? profileStats[0].count.toLocaleString() : '0';
                if (reqEl) reqEl.textContent = requestStats && requestStats[0] ? requestStats[0].count.toLocaleString() : '0';

                // 2. Committee Members from MSSQL
                const { data: members } = await db.from('committee').select('*').order('created_at', { ascending: true });
                if (committeeGrid) {
                    if (members && members.length > 0) {
                        committeeGrid.innerHTML = members.map(m => `
                            <div class="bg-white p-8 rounded-[40px] border border-slate-100 text-center hover:shadow-2xl transition-all group hover:-translate-y-2">
                                <div class="w-24 h-24 mx-auto rounded-[32px] overflow-hidden mb-6 border-4 border-slate-50 shadow-lg group-hover:rotate-6 transition-all duration-500">
                                    <img src="${m.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=af101a&color=fff`}" class="w-full h-full object-cover">
                                </div>
                                <h4 class="font-black text-slate-900 uppercase tracking-tighter text-sm">${m.name}</h4>
                                <p class="text-[9px] font-black text-[#af101a] uppercase tracking-[0.2em] mt-2">${m.role}</p>
                            </div>
                        `).join('');
                    } else {
                        committeeGrid.innerHTML = `
                            <div class="col-span-full py-12 text-center opacity-30">
                                <p class="text-[10px] font-black uppercase tracking-widest">Leadership data pending</p>
                            </div>
                        `;
                    }
                }

                // 3. Success Stories from MSSQL
                const { data: stories } = await db.from('stories').select('*').eq('status', 'Approved').order('created_at', { ascending: false }).limit(2);
                if (storiesGrid) {
                    if (stories && stories.length > 0) {
                        storiesGrid.innerHTML = stories.map(s => `
                            <div class="bg-[#fbf9f8] rounded-[48px] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-700 group">
                                <div class="p-10 space-y-6">
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
                                            <img src="${s.author_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(s.author_name)}&background=af101a&color=fff`}" class="w-full h-full object-cover">
                                        </div>
                                        <div>
                                            <h4 class="font-black text-slate-900 text-xs tracking-widest uppercase">${s.author_name}</h4>
                                            <p class="text-[9px] text-[#af101a] font-black uppercase tracking-widest mt-1">${s.location || 'Donor'}</p>
                                        </div>
                                    </div>
                                    <p class="text-slate-600 font-medium leading-relaxed italic text-sm">"${s.content}"</p>
                                </div>
                            </div>
                        `).join('') + `
                            <div onclick="window.goTo('/stories')" class="bg-[#af101a] rounded-[48px] p-10 flex flex-col items-center justify-center text-center text-white shadow-2xl hover:scale-[1.02] transition-all cursor-pointer group">
                                <div class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                                    <span class="material-symbols-outlined text-3xl">arrow_forward</span>
                                </div>
                                <h3 class="text-2xl font-black font-outfit uppercase tracking-tighter View All<br>Chronicles</h3>
                            </div>
                        `;
                    } else {
                        storiesGrid.innerHTML = `
                            <div class="col-span-full py-20 text-center bg-slate-50 rounded-[48px] border-2 border-dashed border-slate-200">
                                <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">No chronicles shared yet</p>
                            </div>
                        `;
                    }
                }

                // 4. Gallery from MSSQL
                const { data: gallery } = await db.from('gallery').select('*').limit(4);
                if (galleryGrid) {
                    if (gallery && gallery.length > 0) {
                        galleryGrid.innerHTML = gallery.map(g => `
                            <div class="aspect-square bg-slate-800 rounded-[40px] overflow-hidden group shadow-2xl border border-white/10">
                                <img src="${g.url}" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">
                            </div>
                        `).join('');
                    } else {
                        galleryGrid.innerHTML = `
                            <div class="col-span-full py-20 text-center bg-white/5 rounded-[40px] border-2 border-dashed border-white/10">
                                <span class="material-symbols-outlined text-4xl text-white/20 mb-4">image_not_supported</span>
                                <p class="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Gallery data pending</p>
                            </div>
                        `;
                    }
                }

                // 5. Facebook Link from Global Settings
                if (fbLink) fbLink.href = GlobalState.get('facebook_url') || '#';

            } catch (error) {
                console.error('Home Page Sync Error:', error);
            }
        };

        await renderHomeData();

        // Polling for real-time feel with MSSQL
        if (window._homeSub) clearInterval(window._homeSub);
        window._homeSub = setInterval(renderHomeData, 20000);
        
        // Navigation transparency logic
        const navWrapper = document.getElementById('nav-wrapper');
        const handleScroll = () => {
            if (window.scrollY > 100) {
                if (navWrapper) navWrapper.classList.add('nav-scrolled');
            } else {
                if (navWrapper) navWrapper.classList.remove('nav-scrolled');
            }
        };
        // window.addEventListener('scroll', handleScroll);
    }
};
