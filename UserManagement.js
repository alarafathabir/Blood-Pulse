import { db } from '../js/db.js';

export const UserManagement = {
    render: () => `
        <style>
            @keyframes backdrop-fade {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .edit-mode .view-state { display: none; }
            .view-mode .edit-state { display: none; }
            .edit-mode .edit-only-flex { display: flex !important; }
            .glass-card {
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(226, 232, 240, 0.8);
            }
            .stitch-surface { background-color: #fff8f7; color: #271816; }
            .stitch-primary { background-color: #af101a; color: #ffffff; }
            .stitch-primary-text { color: #af101a; }
            .stitch-secondary { background-color: #005faf; color: #ffffff; }
            .shimmer {
                background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
            }
            @keyframes shimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
        </style>
        <div class="bg-slate-50 text-slate-900 font-inter h-screen flex overflow-hidden">
            <!-- Sidebar -->
            <nav class="hidden lg:flex flex-col h-full w-64 border-r bg-white divide-y divide-slate-100 p-4 space-y-2 shrink-0">
                <div class="pb-6 pt-2">
                    <div class="flex items-center space-x-3 mb-6">
                        <div id="sidebar-admin-avatar" class="w-10 h-10 rounded-full bg-red-700 text-white flex items-center justify-center font-bold uppercase">A</div>
                        <div>
                            <h2 class="text-xl font-black text-red-700">Admin Panel</h2>
                            <p class="text-xs text-slate-500">Pulse Control Hub</p>
                        </div>
                    </div>
                    <button onclick="window.goTo('/new-user')" class="w-full bg-red-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-red-800 transition-all shadow-md">
                        <span class="material-symbols-outlined text-sm">add</span>
                        Provision User
                    </button>
                </div>
                <div class="flex-1 py-4 space-y-1">
                    <a class="flex items-center space-x-3 px-4 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition-all" href="#/dashboard">
                        <span class="material-symbols-outlined">dashboard</span>
                        <span>Dashboard</span>
                    </a>
                    <a class="flex items-center space-x-3 px-4 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition-all" href="#/notifications">
                        <span class="material-symbols-outlined">notifications</span>
                        <span>Activity Feed</span>
                    </a>
                    <a class="flex items-center space-x-3 px-4 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition-all" href="#/donor-search">
                        <span class="material-symbols-outlined">person_search</span>
                        <span>Public Directory</span>
                    </a>
                    <a class="flex items-center space-x-3 px-4 py-3 bg-red-50 text-red-700 font-bold rounded-lg transition-all" href="#/users">
                        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">manage_accounts</span>
                        <span>Identity Matrix</span>
                    </a>
                    <a class="flex items-center space-x-3 px-4 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition-all" href="#/">
                        <span class="material-symbols-outlined">home</span>
                        <span>Public Portal</span>
                    </a>
                </div>
                <div class="pt-4 border-t">
                    <button onclick="window.handleLogout()" class="w-full flex items-center space-x-3 px-4 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-lg transition-all">
                        <span class="material-symbols-outlined">logout</span>
                        <span>Terminate Session</span>
                    </button>
                </div>
            </nav>

            <!-- Main Content Area -->
            <main class="flex-1 flex min-w-0 h-full relative flex-col">
                <!-- Admin Top Navbar -->
                <div class="sticky top-0 z-20 bg-white border-b border-slate-100 shadow-sm px-8 py-3 flex items-center justify-between shrink-0">
                    <div class="flex items-center gap-3">
                        <div class="hidden lg:flex items-center gap-2 text-xs text-slate-400 font-bold">
                            <span>Control Plane</span>
                            <span class="material-symbols-outlined text-xs">chevron_right</span>
                            <span class="text-red-700 uppercase tracking-widest">Identity Management</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-6">
                        <div class="flex items-center gap-3">
                             <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                             <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Sync: Active</span>
                        </div>
                        <div class="w-px h-6 bg-slate-100"></div>
                        <div class="flex items-center gap-3">
                            <div id="top-admin-avatar" class="w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center text-xs font-black uppercase">A</div>
                            <span id="top-admin-name" class="hidden md:inline text-xs font-black text-slate-800">Admin Console</span>
                        </div>
                    </div>
                </div>

                <div class="flex-1 flex min-w-0 h-full relative overflow-hidden">
                <!-- Left Scrollable Master View -->
                    <div class="flex-1 overflow-y-auto p-8 lg:p-12 space-y-12 stitch-surface">
                        <!-- Header Section -->
                        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 class="text-4xl font-manrope font-extrabold text-[#271816]">Pulse Identity Matrix</h1>
                                <p class="text-[15px] text-[#5b403d] mt-2 font-medium">Authoritative control over all network participants and donor records.</p>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="relative group">
                                    <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#8f6f6c] group-focus-within:text-[#af101a] transition-colors">search</span>
                                    <input type="text" id="user-search-input" placeholder="Search by name, email, or group..." class="pl-12 pr-6 py-4 bg-white border border-[#e4beba] rounded-2xl focus:ring-4 focus:ring-[#af101a]/5 focus:border-[#af101a] outline-none w-80 text-sm font-bold text-[#271816] shadow-sm transition-all placeholder:text-slate-300">
                                </div>
                                <button id="refresh-users" class="w-12 h-12 rounded-2xl border border-[#e4beba] bg-white flex items-center justify-center text-[#8f6f6c] hover:text-[#af101a] hover:bg-[#ffe9e7] transition-all shadow-sm">
                                    <span class="material-symbols-outlined">sync</span>
                                </button>
                            </div>
                        </div>

                        <!-- Statistics Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="glass-card p-8 rounded-[32px] flex flex-col justify-between relative overflow-hidden border-none shadow-xl shadow-red-500/5">
                                <div class="relative z-10 flex justify-between items-start">
                                    <div>
                                        <span class="text-[10px] font-black text-[#5b403d] uppercase tracking-widest block mb-2 opacity-60">Network Size</span>
                                        <span id="stat-total-users" class="text-5xl font-black text-[#271816]">...</span>
                                    </div>
                                    <div class="w-14 h-14 rounded-2xl bg-[#af101a] flex items-center justify-center text-white shadow-lg shadow-red-500/30">
                                        <span class="material-symbols-outlined text-3xl">groups</span>
                                    </div>
                                </div>
                            </div>
                            <div class="glass-card p-8 rounded-[32px] flex flex-col justify-between relative overflow-hidden border-none shadow-xl shadow-blue-500/5">
                                <div class="relative z-10 flex justify-between items-start">
                                    <div>
                                        <span class="text-[10px] font-black text-[#5b403d] uppercase tracking-widest block mb-2 opacity-60">Elite Donors</span>
                                        <span id="stat-elite-donors" class="text-5xl font-black text-[#271816]">...</span>
                                    </div>
                                    <div class="w-14 h-14 rounded-2xl bg-[#005faf] flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                                        <span class="material-symbols-outlined text-3xl">verified</span>
                                    </div>
                                </div>
                            </div>
                            <div class="glass-card p-8 rounded-[32px] flex flex-col justify-between relative overflow-hidden border-none shadow-xl shadow-amber-500/5">
                                <div class="relative z-10 flex justify-between items-start">
                                    <div>
                                        <span class="text-[10px] font-black text-[#ba1a1a] uppercase tracking-widest block mb-2">Pending Actions</span>
                                        <span id="stat-pending-verify" class="text-5xl font-black text-[#271816]">...</span>
                                    </div>
                                    <div class="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
                                        <span class="material-symbols-outlined text-3xl">pending_actions</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Dynamic Content Containers -->
                        <div id="users-loading-state" class="hidden flex flex-col items-center justify-center py-20 animate-pulse">
                            <div class="w-20 h-20 border-4 border-[#af101a]/10 border-t-[#af101a] rounded-full animate-spin mb-6"></div>
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Streaming Identity Data...</p>
                        </div>

                        <div id="users-grid-container" class="space-y-16">
                             <!-- Donors Section -->
                             <section class="space-y-8">
                                <div class="flex items-center justify-between border-b border-[#e4beba]/40 pb-6">
                                    <div class="flex items-center gap-4">
                                        <div class="w-10 h-10 rounded-xl bg-[#ffe9e7] flex items-center justify-center text-[#af101a]">
                                            <span class="material-symbols-outlined">volunteer_activism</span>
                                        </div>
                                        <h2 class="text-2xl font-manrope font-black text-[#271816] uppercase tracking-tighter">Verified Donors</h2>
                                    </div>
                                    <span id="count-donors" class="text-[10px] font-black text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100">...</span>
                                </div>
                                <div id="donors-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
                                    <!-- Dynamic Donors -->
                                </div>
                             </section>

                             <!-- Requesters Section -->
                             <section class="space-y-8 pb-20">
                                <div class="flex items-center justify-between border-b border-[#e4beba]/40 pb-6">
                                    <div class="flex items-center gap-4">
                                        <div class="w-10 h-10 rounded-xl bg-[#e8f1ff] flex items-center justify-center text-[#005faf]">
                                            <span class="material-symbols-outlined">emergency</span>
                                        </div>
                                        <h2 class="text-2xl font-manrope font-black text-[#271816] uppercase tracking-tighter">Blood Requesters</h2>
                                    </div>
                                    <span id="count-requesters" class="text-[10px] font-black text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100">...</span>
                                </div>
                                <div id="requesters-grid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
                                    <!-- Dynamic Requesters -->
                                </div>
                             </section>
                        </div>
                    </div>

                    <!-- Right Detail Panel -->
                    <div id="panel-overlay" class="fixed inset-0 bg-[#3e2c2a]/40 backdrop-blur-sm z-[1000] hidden transition-opacity opacity-0 pointer-events-none"></div>
                    
                    <div id="right-panel" class="fixed inset-y-0 right-0 z-[1100] w-full max-w-[500px] bg-[#fff8f7] shadow-[-20px_0_60px_rgba(0,0,0,0.1)] border-l border-[#e4beba] transform translate-x-full transition-transform duration-500 flex flex-col h-full overflow-hidden">
                        
                        <!-- Panel Empty State -->
                        <div id="panel-empty-state" class="flex-1 flex flex-col items-center justify-center p-16 text-center opacity-60">
                             <div class="w-32 h-32 bg-slate-100 rounded-[48px] flex items-center justify-center text-slate-300 mb-8 border border-slate-200">
                                <span class="material-symbols-outlined text-6xl">manage_accounts</span>
                             </div>
                             <h3 class="text-2xl font-manrope font-black text-[#271816] uppercase tracking-tighter">No Identity Selected</h3>
                             <p class="text-sm text-[#5b403d] mt-4 font-medium leading-relaxed uppercase tracking-widest max-w-xs mx-auto">Access a profile from the matrix to manage secure credentials.</p>
                        </div>

                        <!-- Panel Content State -->
                        <div id="panel-content-state" class="hidden flex-col h-full view-mode overflow-y-auto">
                            <!-- Banner -->
                            <div class="h-40 bg-gradient-to-br from-[#af101a] to-[#86000d] relative overflow-hidden shrink-0">
                                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                                <button id="close-panel" class="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-xl z-30 border border-white/20">
                                    <span class="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            <div class="px-10">
                                <!-- Avatar Reveal -->
                                <div class="relative -mt-20 mb-8 inline-block z-30 group/avatar">
                                    <div class="w-40 h-40 rounded-[48px] border-[6px] border-[#fff8f7] shadow-2xl overflow-hidden bg-white relative">
                                        <img id="modal-img" src="" class="w-full h-full object-cover transition-transform duration-700 group-hover/avatar:scale-110" alt="Profile Image">
                                        <div id="edit-photo-overlay" class="absolute inset-0 bg-[#271816]/60 hidden items-center justify-center cursor-pointer opacity-0 group-hover/avatar:opacity-100 transition-opacity edit-only-flex backdrop-blur-sm">
                                            <span class="material-symbols-outlined text-white text-4xl">photo_camera</span>
                                        </div>
                                    </div>
                                    <div id="verified-badge" class="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-emerald-100 border-[6px] border-[#fff8f7] flex items-center justify-center text-emerald-700 shadow-xl" title="Network Verified">
                                        <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">verified</span>
                                    </div>
                                </div>

                                <!-- View State -->
                                <div class="view-state space-y-8 animate-fade-in pb-20">
                                    <div>
                                        <h2 id="modal-name" class="text-4xl font-manrope font-black text-[#271816] tracking-tighter leading-none">...</h2>
                                        <div class="flex flex-wrap items-center gap-4 mt-4">
                                            <div class="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                                                <span class="material-symbols-outlined text-sm">alternate_email</span>
                                                <span id="modal-email">...</span>
                                            </div>
                                            <span id="modal-role-badge" class="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">...</span>
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="glass-card p-6 rounded-3xl flex flex-col justify-between shadow-sm">
                                            <span class="block text-[10px] font-black text-[#8f6f6c] uppercase tracking-widest mb-2 opacity-60">Blood Matrix</span>
                                            <span id="modal-group" class="text-4xl font-black text-[#af101a] tracking-tighter">...</span>
                                        </div>
                                        <div class="glass-card p-6 rounded-3xl flex flex-col justify-between shadow-sm">
                                            <span class="block text-[10px] font-black text-[#8f6f6c] uppercase tracking-widest mb-2 opacity-60">Contribution Rank</span>
                                            <span id="modal-rank" class="text-4xl font-black text-[#005faf] tracking-tighter">...</span>
                                        </div>
                                    </div>

                                    <!-- Extended Info -->
                                    <div class="space-y-6 border-y border-[#e4beba]/40 py-8">
                                        <div class="flex items-start gap-4">
                                            <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                                                <span class="material-symbols-outlined text-xl">call</span>
                                            </div>
                                            <div>
                                                <span class="block text-[9px] font-black text-[#8f6f6c] uppercase tracking-widest mb-1">Primary Communications</span>
                                                <span id="modal-phone" class="text-base font-bold text-[#271816] tracking-tight">...</span>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-4">
                                            <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                                                <span class="material-symbols-outlined text-xl">location_on</span>
                                            </div>
                                            <div>
                                                <span class="block text-[9px] font-black text-[#8f6f6c] uppercase tracking-widest mb-1">Geographic Coordinates</span>
                                                <span id="modal-location" class="text-base font-bold text-[#271816] tracking-tight">...</span>
                                            </div>
                                        </div>
                                        <div class="flex items-start gap-4">
                                            <div class="w-10 h-10 rounded-xl bg-[#ffe9e7] flex items-center justify-center text-[#af101a] shrink-0">
                                                <span class="material-symbols-outlined text-xl">event_available</span>
                                            </div>
                                            <div>
                                                <span class="block text-[9px] font-black text-[#af101a] uppercase tracking-widest mb-1">Last Transmission Date</span>
                                                <span id="modal-donation" class="text-base font-bold text-[#271816] tracking-tight">...</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex gap-4">
                                        <button id="enter-edit-mode" class="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#af101a] transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3">
                                            <span class="material-symbols-outlined text-lg">settings_suggest</span>
                                            Override Profile
                                        </button>
                                        <button id="delete-user" class="w-16 bg-white text-[#ba1a1a] border border-[#e4beba] rounded-2xl hover:bg-red-50 transition-all flex items-center justify-center shadow-sm" title="Purge Record">
                                            <span class="material-symbols-outlined">delete_forever</span>
                                        </button>
                                    </div>
                                </div>

                                <!-- Edit State (Form) -->
                                <div class="edit-state space-y-6 animate-fade-in pb-20">
                                    <div class="flex items-center justify-between mb-8 border-b border-[#e4beba]/40 pb-4">
                                        <h2 class="text-2xl font-manrope font-black text-[#271816] uppercase tracking-tighter">Manual Override</h2>
                                        <span class="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">Write Mode</span>
                                    </div>
                                    
                                    <div class="space-y-6">
                                        <div class="space-y-2">
                                            <label class="text-[10px] font-black text-[#8f6f6c] uppercase tracking-widest ml-1">Identity Label (Full Name)</label>
                                            <input type="text" id="edit-name" class="w-full px-6 py-4 bg-white border border-[#e4beba] rounded-2xl focus:ring-4 focus:ring-[#af101a]/5 focus:border-[#af101a] outline-none transition-all font-bold text-slate-900 text-sm shadow-sm">
                                        </div>
                                        <div class="space-y-2">
                                            <label class="text-[10px] font-black text-[#8f6f6c] uppercase tracking-widest ml-1">Network Address (Email)</label>
                                            <input type="email" id="edit-email" class="w-full px-6 py-4 bg-white border border-[#e4beba] rounded-2xl focus:ring-4 focus:ring-[#af101a]/5 focus:border-[#af101a] outline-none transition-all font-bold text-slate-900 text-sm shadow-sm">
                                        </div>
                                        <div class="grid grid-cols-2 gap-4">
                                            <div class="space-y-2">
                                                <label class="text-[10px] font-black text-[#8f6f6c] uppercase tracking-widest ml-1">Comms (Phone)</label>
                                                <input type="text" id="edit-phone" class="w-full px-6 py-4 bg-white border border-[#e4beba] rounded-2xl focus:ring-4 focus:ring-[#af101a]/5 focus:border-[#af101a] outline-none transition-all font-bold text-slate-900 text-sm shadow-sm">
                                            </div>
                                            <div class="space-y-2">
                                                <label class="text-[10px] font-black text-[#8f6f6c] uppercase tracking-widest ml-1">District / City</label>
                                                <input type="text" id="edit-location" class="w-full px-6 py-4 bg-white border border-[#e4beba] rounded-2xl focus:ring-4 focus:ring-[#af101a]/5 focus:border-[#af101a] outline-none transition-all font-bold text-slate-900 text-sm shadow-sm">
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-2 gap-4">
                                            <div class="space-y-2">
                                                <label class="text-[10px] font-black text-[#8f6f6c] uppercase tracking-widest ml-1">Blood Signature</label>
                                                <select id="edit-group" class="w-full px-6 py-4 bg-white border border-[#e4beba] rounded-2xl focus:ring-4 focus:ring-[#af101a]/5 focus:border-[#af101a] outline-none transition-all font-bold text-slate-900 text-sm shadow-sm appearance-none cursor-pointer">
                                                    <option value="O+">O+</option><option value="O-">O-</option><option value="A+">A+</option><option value="A-">A-</option>
                                                    <option value="B+">B+</option><option value="B-">B-</option><option value="AB+">AB+</option><option value="AB-">AB-</option>
                                                </select>
                                            </div>
                                            <div class="space-y-2">
                                                <label class="text-[10px] font-black text-[#8f6f6c] uppercase tracking-widest ml-1">Privilege Level</label>
                                                <select id="edit-role" class="w-full px-6 py-4 bg-white border border-[#e4beba] rounded-2xl focus:ring-4 focus:ring-[#af101a]/5 focus:border-[#af101a] outline-none transition-all font-bold text-slate-900 text-sm shadow-sm appearance-none cursor-pointer">
                                                    <option value="donor">Verified Donor</option>
                                                    <option value="requester">Authorized Requester</option>
                                                    <option value="admin">System Administrator</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-2 gap-4">
                                            <div class="space-y-2">
                                                <label class="text-[10px] font-black text-[#8f6f6c] uppercase tracking-widest ml-1">Donated Bags</label>
                                                <input type="number" id="edit-bags" class="w-full px-6 py-4 bg-white border border-[#e4beba] rounded-2xl focus:ring-4 focus:ring-[#af101a]/5 focus:border-[#af101a] outline-none transition-all font-bold text-slate-900 text-sm shadow-sm">
                                            </div>
                                            <div class="space-y-2">
                                                <label class="text-[10px] font-black text-[#8f6f6c] uppercase tracking-widest ml-1">Donor Rank (1-4)</label>
                                                <input type="number" id="edit-rank-num" min="1" max="4" class="w-full px-6 py-4 bg-white border border-[#e4beba] rounded-2xl focus:ring-4 focus:ring-[#af101a]/5 focus:border-[#af101a] outline-none transition-all font-bold text-slate-900 text-sm shadow-sm">
                                            </div>
                                        </div>
                                        <div class="space-y-2">
                                            <label class="text-[10px] font-black text-[#8f6f6c] uppercase tracking-widest ml-1">Last Known Transaction</label>
                                            <input type="date" id="edit-donation" class="w-full px-6 py-4 bg-white border border-[#e4beba] rounded-2xl focus:ring-4 focus:ring-[#af101a]/5 focus:border-[#af101a] outline-none transition-all font-bold text-slate-900 text-sm shadow-sm">
                                        </div>
                                    </div>

                                    <div class="flex gap-4 pt-6">
                                        <button id="save-edit" class="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#af101a] transition-all shadow-xl shadow-slate-900/10">Synchronize Changes</button>
                                        <button id="cancel-edit" class="flex-1 bg-white text-slate-400 border border-slate-200 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `,
    afterRender: async () => {
        // UI Components
        const donorsGrid = document.getElementById('donors-grid');
        const requestersGrid = document.getElementById('requesters-grid');
        const searchInput = document.getElementById('user-search-input');
        const refreshBtn = document.getElementById('refresh-users');
        const loadingState = document.getElementById('users-loading-state');
        const gridContainer = document.getElementById('users-grid-container');

        // Panel Components
        const rightPanel = document.getElementById('right-panel');
        const panelOverlay = document.getElementById('panel-overlay');
        const emptyState = document.getElementById('panel-empty-state');
        const contentState = document.getElementById('panel-content-state');
        const closePanelBtn = document.getElementById('close-panel');

        // Stats Components
        const statTotal = document.getElementById('stat-total-users');
        const statElite = document.getElementById('stat-elite-donors');
        const statPending = document.getElementById('stat-pending-verify');
        const countDonors = document.getElementById('count-donors');
        const countRequesters = document.getElementById('count-requesters');

        // Modal View Elements
        const modalName = document.getElementById('modal-name');
        const modalEmail = document.getElementById('modal-email');
        const modalRoleBadge = document.getElementById('modal-role-badge');
        const modalGroup = document.getElementById('modal-group');
        const modalRank = document.getElementById('modal-rank');
        const modalImg = document.getElementById('modal-img');
        const modalPhone = document.getElementById('modal-phone');
        const modalLocation = document.getElementById('modal-location');
        const modalDonation = document.getElementById('modal-donation');
        const verifiedBadge = document.getElementById('verified-badge');

        // Modal Edit Elements
        const editName = document.getElementById('edit-name');
        const editEmail = document.getElementById('edit-email');
        const editPhone = document.getElementById('edit-phone');
        const editLocation = document.getElementById('edit-location');
        const editGroup = document.getElementById('edit-group');
        const editRole = document.getElementById('edit-role');
        const editBags = document.getElementById('edit-bags');
        const editRankNum = document.getElementById('edit-rank-num');
        const editDonation = document.getElementById('edit-donation');

        // Action Buttons
        const enterEditBtn = document.getElementById('enter-edit-mode');
        const cancelEditBtn = document.getElementById('cancel-edit');
        const saveEditBtn = document.getElementById('save-edit');
        const deleteBtn = document.getElementById('delete-user');

        let allUsers = [];
        let currentUserId = null;

        // --- Core Logic ---

        const fetchUsers = async () => {
            loadingState.classList.remove('hidden');
            gridContainer.classList.add('hidden');

            const { data, error } = await db
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Fetch Error:', error);
                return;
            }

            allUsers = data;
            renderAll(data);
            updateStats(data);

            loadingState.classList.add('hidden');
            gridContainer.classList.remove('hidden');
        };

        const updateStats = (users) => {
            statTotal.innerText = users.length;
            statElite.innerText = users.filter(u => u.rank <= 2).length;
            statPending.innerText = users.filter(u => !u.phone || !u.blood_group).length; // Mock pending check
            countDonors.innerText = `${users.filter(u => u.role === 'donor').length} Identities`;
            countRequesters.innerText = `${users.filter(u => u.role === 'requester').length} Identities`;
        };

        const renderGrid = (container, users) => {
            if (users.length === 0) {
                container.innerHTML = `<div class="col-span-full py-10 text-center opacity-30 font-black uppercase text-[10px] tracking-widest border-2 border-dashed border-slate-200 rounded-3xl">Zero Signals Detected</div>`;
                return;
            }

            container.innerHTML = users.map(u => `
                <div class="user-card group glass-card rounded-[40px] p-4 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer border-transparent hover:border-[#ffe9e7]" onclick="window.openUserPanel('${u.id}')">
                    <div class="aspect-square rounded-[32px] overflow-hidden mb-5 relative">
                        <img src="${u.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.full_name}`}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                            <span class="text-[10px] font-black text-white uppercase tracking-widest">Access Profile</span>
                        </div>
                        <div class="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg">
                            <span class="text-xs font-black text-[#af101a]">${u.blood_group || '??'}</span>
                        </div>
                    </div>
                    <div class="px-2 pb-2">
                        <h3 class="text-sm font-black text-[#271816] truncate uppercase tracking-tighter">${u.full_name || 'Incognito User'}</h3>
                        <div class="flex items-center justify-between mt-3">
                             <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">${u.district || 'Location Unknown'}</p>
                             <div class="w-1.5 h-1.5 rounded-full ${u.role === 'admin' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-emerald-500'}"></div>
                        </div>
                    </div>
                </div>
            `).join('');
        };

        const renderAll = (users) => {
            const donors = users.filter(u => u.role === 'donor' || u.role === 'admin');
            const requesters = users.filter(u => u.role === 'requester');
            renderGrid(donorsGrid, donors);
            renderGrid(requestersGrid, requesters);
        };

        window.openUserPanel = (id) => {
            currentUserId = id;
            const user = allUsers.find(u => u.id === id);
            if (!user) return;

            // Update View
            modalName.innerText = user.full_name || 'Incognito';
            modalEmail.innerText = user.email || 'No Signal';
            modalGroup.innerText = user.blood_group || '??';
            modalRank.innerText = `Lvl ${user.rank || 4}`;
            modalImg.src = user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.full_name}`;
            modalPhone.innerText = user.phone || 'Communication Offline';
            modalLocation.innerText = user.district || 'Coordinates Missing';
            modalDonation.innerText = user.last_donation_date ? new Date(user.last_donation_date).toLocaleDateString() : 'No Record';

            // Role Badge Style
            modalRoleBadge.innerText = user.role;
            const roleColors = {
                admin: 'bg-red-700 text-white',
                donor: 'bg-[#ffe9e7] text-[#af101a]',
                requester: 'bg-[#e8f1ff] text-[#005faf]'
            };
            modalRoleBadge.className = `text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${roleColors[user.role] || 'bg-slate-100'}`;

            // Pre-populate Edit
            editName.value = user.full_name || '';
            editEmail.value = user.email || '';
            editPhone.value = user.phone || '';
            editLocation.value = user.district || '';
            editGroup.value = user.blood_group || 'O+';
            editRole.value = user.role || 'donor';
            editBags.value = user.bags_donated || 0;
            editRankNum.value = user.rank || 4;
            editDonation.value = user.last_donation_date ? user.last_donation_date.split('T')[0] : '';

            // Toggle Panel
            emptyState.classList.add('hidden');
            contentState.classList.remove('hidden');
            contentState.classList.add('flex');
            contentState.classList.remove('edit-mode');
            contentState.classList.add('view-mode');

            rightPanel.classList.remove('translate-x-full');
            panelOverlay.classList.remove('hidden');
            setTimeout(() => panelOverlay.classList.add('opacity-100'), 10);
            panelOverlay.classList.add('pointer-events-auto');
        };

        const closePanel = () => {
            rightPanel.classList.add('translate-x-full');
            panelOverlay.classList.remove('opacity-100');
            panelOverlay.classList.remove('pointer-events-auto');
            setTimeout(() => {
                panelOverlay.classList.add('hidden');
                contentState.classList.add('hidden');
                emptyState.classList.remove('hidden');
            }, 500);
        };

        // --- Event Listeners ---

        closePanelBtn.addEventListener('click', closePanel);
        panelOverlay.addEventListener('click', closePanel);

        refreshBtn.addEventListener('click', fetchUsers);

        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = allUsers.filter(u => 
                u.full_name?.toLowerCase().includes(term) || 
                u.email?.toLowerCase().includes(term) || 
                u.blood_group?.toLowerCase().includes(term)
            );
            renderAll(filtered);
        });

        enterEditBtn.addEventListener('click', () => {
            contentState.classList.remove('view-mode');
            contentState.classList.add('edit-mode');
        });

        cancelEditBtn.addEventListener('click', () => {
            contentState.classList.remove('edit-mode');
            contentState.classList.add('view-mode');
        });

        saveEditBtn.addEventListener('click', async () => {
            saveEditBtn.disabled = true;
            saveEditBtn.innerText = 'SYNCING...';

            const updates = {
                full_name: editName.value,
                email: editEmail.value,
                phone: editPhone.value,
                district: editLocation.value,
                blood_group: editGroup.value,
                role: editRole.value,
                bags_donated: parseInt(editBags.value),
                rank: parseInt(editRankNum.value),
                last_donation_date: editDonation.value || null,
                updated_at: new Date().toISOString()
            };

            const { error } = await db
                .from('profiles')
                .update(updates)
                .eq('id', currentUserId);

            if (error) {
                alert('Override Failed: ' + error.message);
                saveEditBtn.disabled = false;
                saveEditBtn.innerText = 'Synchronize Changes';
            } else {
                alert('Identity Matrix Updated Successfully.');
                saveEditBtn.disabled = false;
                saveEditBtn.innerText = 'Synchronize Changes';
                await fetchUsers(); // Refresh Grid
                window.openUserPanel(currentUserId); // Refresh Details View
            }
        });

        deleteBtn.addEventListener('click', async () => {
            if (confirm('CRITICAL: This will permanently purge this user from the Pulse cloud and revoke all access. Proceed?')) {
                const { error } = await db
                    .from('profiles')
                    .delete()
                    .eq('id', currentUserId);

                if (error) {
                    alert('Purge Failure: ' + error.message);
                } else {
                    alert('Identity Purged Successfully.');
                    closePanel();
                    await fetchUsers();
                }
            }
        });

        // Sidebar Sync
        const user = JSON.parse(localStorage.getItem('bloodpulse_user') || '{}');
        document.getElementById('sidebar-admin-avatar').innerText = user.full_name?.[0] || 'A';
        document.getElementById('top-admin-avatar').innerText = user.full_name?.[0] || 'A';
        document.getElementById('top-admin-name').innerText = user.full_name || 'Admin Console';

        window.handleLogout = () => {
            localStorage.clear();
            window.goTo('/login');
        };

        // Initial Load
        await fetchUsers();
    }
};


