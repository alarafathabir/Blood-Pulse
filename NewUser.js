export const NewUser = {
    render: () => `
        <style>
            .stitch-surface { background-color: #fff8f7; color: #271816; }
            .stitch-primary { background-color: #af101a; color: #ffffff; }
            .stitch-primary-text { color: #af101a; }
            .glass-card {
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(226, 232, 240, 0.8);
            }
        </style>
        <div class="bg-slate-50 text-slate-900 font-inter h-screen flex overflow-hidden">
            <!-- Sidebar -->
            <nav class="hidden lg:flex flex-col h-full w-64 border-r bg-white divide-y divide-slate-100 p-4 space-y-2 shrink-0">
                <div class="pb-6 pt-2">
                    <div class="flex items-center space-x-3 mb-6">
                        <div class="w-10 h-10 rounded-full bg-red-700 text-white flex items-center justify-center font-bold">A</div>
                        <div>
                            <h2 class="text-xl font-black text-red-700">Admin Panel</h2>
                            <p class="text-xs text-slate-500">Blood Pulse Management</p>
                        </div>
                    </div>
                    <button onclick="goTo('/new-user')" class="w-full bg-red-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-red-800 transition-all shadow-md">
                        <span class="material-symbols-outlined text-sm">add</span>
                        New User
                    </button>
                </div>
                <div class="flex-1 py-4 space-y-1">
                    <a class="flex items-center space-x-3 px-4 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition-all" href="#/dashboard">
                        <span class="material-symbols-outlined">dashboard</span>
                        <span>Dashboard</span>
                    </a>
                    <a class="flex items-center space-x-3 px-4 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition-all" href="#/notifications">
                        <span class="material-symbols-outlined">notifications</span>
                        <span>Notifications</span>
                        <span class="ml-auto bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full">3</span>
                    </a>
                    <a class="flex items-center space-x-3 px-4 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition-all" href="#/donor-search">
                        <span class="material-symbols-outlined">person_search</span>
                        <span>Donor Search</span>
                    </a>
                    <a class="flex items-center space-x-3 px-4 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition-all" href="#/users">
                        <span class="material-symbols-outlined">manage_accounts</span>
                        <span>User Profiles</span>
                    </a>
                    <a class="flex items-center space-x-3 px-4 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition-all" href="#/">
                        <span class="material-symbols-outlined">home</span>
                        <span>View Website</span>
                    </a>
                </div>
                <div class="pt-4">
                    <a class="flex items-center space-x-3 px-4 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition-all" href="#/login">
                        <span class="material-symbols-outlined">logout</span>
                        <span>Logout</span>
                    </a>
                </div>
            </nav>

            <!-- Main Content Area -->
            <main class="flex-1 overflow-y-auto relative flex flex-col">
                <!-- Admin Top Navbar -->
                <div class="sticky top-0 z-20 bg-white border-b border-slate-100 shadow-sm px-8 py-3 flex items-center justify-between shrink-0">
                    <div class="flex items-center gap-3">
                        <div class="hidden lg:flex items-center gap-2 text-xs text-slate-400 font-bold">
                            <span>Blood Pulse</span>
                            <span class="material-symbols-outlined text-xs">chevron_right</span>
                            <span class="text-red-700">New User</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <a href="#/notifications" class="relative w-9 h-9 rounded-full hover:bg-red-50 flex items-center justify-center text-slate-500 hover:text-red-600 transition-colors" title="Notifications">
                            <span class="material-symbols-outlined text-[20px]">notifications</span>
                            <span class="absolute top-0.5 right-0.5 w-4 h-4 bg-red-600 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">3</span>
                        </a>
                        <div class="w-px h-6 bg-slate-100"></div>
                        <div class="flex items-center gap-2 cursor-pointer" onclick="goTo('/login')">
                            <div class="w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center text-xs font-black">A</div>
                            <span class="hidden md:inline text-xs font-black text-slate-800">Admin</span>
                        </div>
                    </div>
                </div>

                <div class="flex-1 p-6 md:p-12 relative flex items-center justify-center">
                <!-- Decorative Elements -->
                <div class="absolute top-0 right-0 w-96 h-96 bg-[#ffdad6] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div class="absolute bottom-0 left-0 w-96 h-96 bg-[#af101a] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
                
                <div class="w-full max-w-3xl glass-card rounded-[32px] p-8 md:p-12 relative z-10 shadow-2xl">
                    <div class="mb-8">
                        <h1 class="text-3xl font-manrope font-extrabold text-[#271816]">Register New User</h1>
                        <p class="text-[#5b403d] mt-2 font-medium">Create a new account manually and assign permissions.</p>
                    </div>

                    <form id="new-user-form" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-[11px] font-black text-[#5b403d] uppercase tracking-widest ml-1">Full Name</label>
                                <input type="text" id="reg-name" required class="w-full px-5 py-4 bg-white/80 border border-[#e4beba] rounded-2xl focus:ring-4 focus:ring-[#ffe2de] focus:border-[#af101a] outline-none transition-all font-semibold text-[#271816]" placeholder="e.g. John Doe">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[11px] font-black text-[#5b403d] uppercase tracking-widest ml-1">Email Address</label>
                                <input type="email" id="reg-email" required class="w-full px-5 py-4 bg-white/80 border border-[#e4beba] rounded-2xl focus:ring-4 focus:ring-[#ffe2de] focus:border-[#af101a] outline-none transition-all font-semibold text-[#271816]" placeholder="john@example.com">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[11px] font-black text-[#5b403d] uppercase tracking-widest ml-1">Temporary Password</label>
                                <input type="password" id="reg-password" required class="w-full px-5 py-4 bg-white/80 border border-[#e4beba] rounded-2xl focus:ring-4 focus:ring-[#ffe2de] focus:border-[#af101a] outline-none transition-all font-semibold text-[#271816]" placeholder="••••••••">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[11px] font-black text-[#5b403d] uppercase tracking-widest ml-1">Phone Number</label>
                                <input type="text" id="reg-phone" class="w-full px-5 py-4 bg-white/80 border border-[#e4beba] rounded-2xl focus:ring-4 focus:ring-[#ffe2de] focus:border-[#af101a] outline-none transition-all font-semibold text-[#271816]" placeholder="+1 234 567 8900">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[11px] font-black text-[#5b403d] uppercase tracking-widest ml-1">Blood Group</label>
                                <select id="reg-group" class="w-full px-5 py-4 bg-white/80 border border-[#e4beba] rounded-2xl focus:ring-4 focus:ring-[#ffe2de] focus:border-[#af101a] outline-none transition-all font-semibold text-[#271816] cursor-pointer appearance-none">
                                    <option value="" disabled selected>Select Blood Group</option>
                                    <option value="O+">O Positive (O+)</option>
                                    <option value="O-">O Negative (O-)</option>
                                    <option value="A+">A Positive (A+)</option>
                                    <option value="A-">A Negative (A-)</option>
                                    <option value="B+">B Positive (B+)</option>
                                    <option value="B-">B Negative (B-)</option>
                                    <option value="AB+">AB Positive (AB+)</option>
                                    <option value="AB-">AB Negative (AB-)</option>
                                </select>
                            </div>
                            <div class="space-y-2">
                                <label class="text-[11px] font-black text-[#5b403d] uppercase tracking-widest ml-1">Account Role</label>
                                <select id="reg-role" required class="w-full px-5 py-4 bg-white/80 border border-[#e4beba] rounded-2xl focus:ring-4 focus:ring-[#ffe2de] focus:border-[#af101a] outline-none transition-all font-semibold text-[#271816] cursor-pointer appearance-none">
                                    <option value="Donor">Blood Donor</option>
                                    <option value="Requester">Blood Requester</option>
                                    <option value="Coordinator">Coordinator / Admin</option>
                                </select>
                            </div>
                            <div class="space-y-2 md:col-span-2">
                                <label class="text-[11px] font-black text-[#5b403d] uppercase tracking-widest ml-1">Location / City</label>
                                <div class="relative">
                                    <span class="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-[#8f6f6c]">location_on</span>
                                    <input type="text" id="reg-location" class="w-full pl-12 pr-5 py-4 bg-white/80 border border-[#e4beba] rounded-2xl focus:ring-4 focus:ring-[#ffe2de] focus:border-[#af101a] outline-none transition-all font-semibold text-[#271816]" placeholder="e.g. New York, USA">
                                </div>
                            </div>
                        </div>

                        <div class="pt-6 border-t border-[#e4beba]/40 flex justify-end gap-4">
                            <button type="button" onclick="window.history.back()" class="px-8 py-4 rounded-2xl font-bold bg-white text-[#5b403d] border border-[#e4beba] hover:bg-[#ffe9e7] transition-all shadow-sm">
                                Cancel
                            </button>
                            <button type="submit" class="px-8 py-4 rounded-2xl font-bold stitch-primary hover:bg-[#86000d] transition-all shadow-lg shadow-[#af101a]/30 active:scale-95 flex items-center gap-2">
                                <span class="material-symbols-outlined text-[20px]">person_add</span>
                                Create User Account
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            </main>
        </div>
    `,
    afterRender: () => {
        const form = document.getElementById('new-user-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Add your backend creation logic here
                alert('User created successfully!');
                window.location.hash = '#/users'; // Redirect back to users list
            });
        }
    }
};


