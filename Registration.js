import { db } from '../js/db.js';

export const Registration = {
    render: () => `
        <div class="bg-[#fbf9f8] text-slate-900 font-inter min-h-screen relative overflow-x-hidden flex flex-col items-center">
            <!-- Form Progress Bar (Sticky) -->
            <div class="fixed top-0 left-0 w-full h-1 z-[100] bg-slate-100">
                <div id="form-progress" class="h-full bg-gradient-to-r from-[#af101a] to-[#ff4d4d] w-0 transition-all duration-500 shadow-[0_0_10px_rgba(175,16,26,0.5)]"></div>
            </div>

            <!-- Background Decorative Orbs -->
            <div class="fixed top-[-5%] left-[-5%] w-[40%] h-[40%] bg-[#af101a]/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
            <div class="fixed bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full -z-10 animate-pulse" style="animation-delay: 2s"></div>

            ${window.PublicNavbar()}

            <main class="w-full max-w-4xl px-4 py-8 relative z-10">
                <!-- Header Section -->
                <div class="text-center mb-12 animate-slide-up">
                    <span class="inline-block px-4 py-1.5 bg-[#af101a]/10 text-[#af101a] text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">Join the Pulse</span>
                    <h1 class="text-5xl md:text-6xl font-black text-slate-900 mb-6 font-outfit tracking-tighter uppercase leading-none">Become a <span class="text-[#af101a]">Life Saver</span></h1>
                    <p class="max-w-xl mx-auto text-slate-500 text-sm font-medium leading-relaxed">
                        Complete your medical profile to join the campus blood donation network. Your information is secure and helps save lives in critical moments.
                    </p>
                </div>

                <!-- Main Form Card -->
                <div class="bg-white/80 backdrop-blur-xl border border-white rounded-[48px] shadow-[0_40px_100px_-20px_rgba(175,16,26,0.1)] p-8 md:p-16 relative overflow-hidden animate-fade-in">
                    <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#af101a] via-[#ff4d4d] to-[#af101a]"></div>
                    
                    <form id="registration-form" class="space-y-16">
                        <!-- Step 1: Personal Profile -->
                        <section>
                            <div class="flex items-center justify-between mb-12 border-b border-slate-50 pb-8 flex-wrap gap-8">
                                <div class="flex items-center gap-6">
                                    <div class="w-14 h-14 rounded-2xl bg-slate-900 shadow-xl flex items-center justify-center text-white">
                                        <span class="material-symbols-outlined text-2xl font-fill">badge</span>
                                    </div>
                                    <div>
                                        <h2 class="text-2xl font-black text-slate-900 font-outfit uppercase tracking-tighter">Primary Profile</h2>
                                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Basic Identification</p>
                                    </div>
                                </div>
                                
                                <!-- Profile Photo Upload -->
                                <div class="flex flex-col items-center gap-4">
                                    <input type="file" id="profile-image-input" class="hidden" accept="image/*">
                                    <div id="preview-container" class="relative group cursor-pointer" onclick="document.getElementById('profile-image-input').click()">
                                        <div class="w-24 h-24 rounded-3xl border-4 border-slate-50 bg-slate-100 overflow-hidden shadow-inner flex items-center justify-center group-hover:border-[#af101a]/20 transition-all">
                                            <img id="avatar-preview" src="https://api.dicebear.com/7.x/avataaars/svg?seed=newuser" class="w-full h-full object-cover">
                                            <div class="absolute inset-0 bg-[#af101a]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span class="material-symbols-outlined text-white text-3xl">photo_camera</span>
                                            </div>
                                        </div>
                                        <button type="button" id="remove-photo" class="hidden absolute -top-2 -right-2 bg-slate-900 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-xl hover:bg-[#af101a] transition-all">
                                            <span class="material-symbols-outlined text-xs">close</span>
                                        </button>
                                    </div>
                                    <p id="photo-status" class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Update Photo</p>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div class="md:col-span-2 group">
                                    <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">Full Name</label>
                                    <input id="reg-fullname" class="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] focus:bg-white transition-all outline-none font-bold placeholder:text-slate-300" placeholder="John Doe" required type="text"/>
                                </div>
                                <div class="group">
                                    <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">Date of Birth</label>
                                    <input id="reg-dob" class="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] focus:bg-white transition-all outline-none font-bold" required type="date"/>
                                </div>
                                <div class="group relative">
                                    <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">Blood Group</label>
                                    <select id="reg-bloodgroup" class="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] focus:bg-white transition-all outline-none font-bold appearance-none cursor-pointer" required>
                                        <option disabled selected value="">Select Group</option>
                                        <option value="A+">A Positive (A+)</option>
                                        <option value="A-">A Negative (A-)</option>
                                        <option value="B+">B Positive (B+)</option>
                                        <option value="B-">B Negative (B-)</option>
                                        <option value="AB+">AB Positive (AB+)</option>
                                        <option value="AB-">AB Negative (AB-)</option>
                                        <option value="O+">O Positive (O+)</option>
                                        <option value="O-">O Negative (O-)</option>
                                    </select>
                                    <span class="material-symbols-outlined absolute right-4 bottom-4 text-slate-400 pointer-events-none">expand_more</span>
                                </div>
                                <div class="group relative">
                                    <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">Confirm Blood Group</label>
                                    <select id="reg-bloodgroup-confirm" class="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] focus:bg-white transition-all outline-none font-bold appearance-none cursor-pointer" required>
                                        <option disabled selected value="">Confirm Group</option>
                                        <option value="A+">A Positive (A+)</option>
                                        <option value="A-">A Negative (A-)</option>
                                        <option value="B+">B Positive (B+)</option>
                                        <option value="B-">B Negative (B-)</option>
                                        <option value="AB+">AB Positive (AB+)</option>
                                        <option value="AB-">AB Negative (AB-)</option>
                                        <option value="O+">O Positive (O+)</option>
                                        <option value="O-">O Negative (O-)</option>
                                    </select>
                                    <span class="material-symbols-outlined absolute right-4 bottom-4 text-slate-400 pointer-events-none">expand_more</span>
                                </div>
                                <div class="group">
                                    <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">Email Address</label>
                                    <input id="reg-email" class="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] focus:bg-white transition-all outline-none font-bold placeholder:text-slate-300" placeholder="name@domain.com" required type="email"/>
                                </div>
                                <div class="group">
                                    <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">Recovery Email (Optional)</label>
                                    <input id="reg-recovery-email" class="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] focus:bg-white transition-all outline-none font-bold placeholder:text-slate-300" placeholder="backup@domain.com" type="email"/>
                                </div>
                                <div class="group">
                                    <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">Primary Phone</label>
                                    <input id="reg-phone" class="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] focus:bg-white transition-all outline-none font-bold placeholder:text-slate-300" placeholder="+880 1XXX-XXXXXX" required type="tel"/>
                                </div>
                                <div class="group">
                                    <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">Recovery Phone (Emergency)</label>
                                    <input id="reg-recovery-phone" class="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] focus:bg-white transition-all outline-none font-bold placeholder:text-slate-300" placeholder="+880 1XXX-XXXXXX" required type="tel"/>
                                </div>
                                <div class="group relative">
                                    <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">Password</label>
                                    <input id="reg-password" class="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] focus:bg-white transition-all outline-none font-bold placeholder:text-slate-300 pr-12" placeholder="Min. 6 characters" required type="password"/>
                                    <button type="button" onclick="window.toggleRegPass('reg-password')" class="absolute right-4 bottom-4 text-slate-400 hover:text-[#af101a]">
                                        <span class="material-symbols-outlined text-xl" id="reg-password-icon">visibility</span>
                                    </button>
                                </div>
                                <div class="group relative">
                                    <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">Confirm Password</label>
                                    <input id="reg-confirm-password" class="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] focus:bg-white transition-all outline-none font-bold placeholder:text-slate-300 pr-12" placeholder="Repeat password" required type="password"/>
                                    <button type="button" onclick="window.toggleRegPass('reg-confirm-password')" class="absolute right-4 bottom-4 text-slate-400 hover:text-[#af101a]">
                                        <span class="material-symbols-outlined text-xl" id="reg-confirm-password-icon">visibility</span>
                                    </button>
                                </div>
                            </div>
                        </section>

                        <!-- Step 2: Occupation -->
                        <section>
                            <div class="flex items-center gap-6 mb-12 border-b border-slate-50 pb-8">
                                <div class="w-14 h-14 rounded-2xl bg-[#af101a] shadow-xl flex items-center justify-center text-white">
                                    <span class="material-symbols-outlined text-2xl font-fill">work</span>
                                </div>
                                <div>
                                    <h2 class="text-2xl font-black text-slate-900 font-outfit uppercase tracking-tighter">Your Occupation</h2>
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Student or Civilian</p>
                                </div>
                            </div>

                            <div class="mb-10">
                                <label class="block text-[10px] font-black text-slate-400 mb-6 uppercase tracking-widest ml-1">Current Designation</label>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label class="relative flex cursor-pointer rounded-3xl border border-slate-100 bg-slate-50/50 p-6 hover:bg-slate-100 transition-all items-center gap-4 group">
                                        <input checked class="sr-only peer" name="statusToggle" type="radio" value="student"/>
                                        <div class="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 peer-checked:bg-[#af101a] peer-checked:text-white transition-all">
                                            <span class="material-symbols-outlined text-2xl">school</span>
                                        </div>
                                        <div class="flex flex-col">
                                            <span class="font-black text-slate-900 uppercase tracking-tighter text-sm">Student</span>
                                            <span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Campus Member</span>
                                        </div>
                                        <div class="absolute inset-0 ring-2 ring-[#af101a] rounded-3xl opacity-0 peer-checked:opacity-100 transition-all"></div>
                                    </label>

                                    <label class="relative flex cursor-pointer rounded-3xl border border-slate-100 bg-slate-50/50 p-6 hover:bg-slate-100 transition-all items-center gap-4 group">
                                        <input class="sr-only peer" name="statusToggle" type="radio" value="civilian"/>
                                        <div class="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 peer-checked:bg-[#af101a] peer-checked:text-white transition-all">
                                            <span class="material-symbols-outlined text-2xl">person_pin</span>
                                        </div>
                                        <div class="flex flex-col">
                                            <span class="font-black text-slate-900 uppercase tracking-tighter text-sm">Civilian</span>
                                            <span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">External Donor</span>
                                        </div>
                                        <div class="absolute inset-0 ring-2 ring-[#af101a] rounded-3xl opacity-0 peer-checked:opacity-100 transition-all"></div>
                                    </label>
                                </div>
                            </div>
                            
                            <div id="occupational-fields" class="bg-slate-50/80 rounded-[32px] p-8 border border-white shadow-inner">
                                <!-- Dynamic fields injected here -->
                            </div>
                        </section>

                        <!-- Step 3: Donation History -->
                        <section>
                            <div class="flex items-center gap-6 mb-12 border-b border-slate-50 pb-8">
                                <div class="w-14 h-14 rounded-2xl bg-slate-900 shadow-xl flex items-center justify-center text-white">
                                    <span class="material-symbols-outlined text-2xl font-fill">health_and_safety</span>
                                </div>
                                <div>
                                    <h2 class="text-2xl font-black text-slate-900 font-outfit uppercase tracking-tighter">Donation History</h2>
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Previous Records</p>
                                </div>
                            </div>

                            <div class="bg-slate-50/80 p-8 rounded-[32px] border border-white">
                                <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
                                    <div>
                                        <h3 class="text-sm font-black text-slate-900 uppercase tracking-tighter">Last Donation</h3>
                                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">When was your last time?</p>
                                    </div>
                                    <label class="flex items-center gap-3 px-4 py-2 bg-white rounded-xl shadow-sm cursor-pointer hover:bg-slate-50 transition-all">
                                        <input type="checkbox" id="never-donated" class="w-5 h-5 rounded border-slate-300 text-[#af101a] focus:ring-[#af101a]">
                                        <span class="text-[10px] font-black text-slate-600 uppercase tracking-widest">Never donated</span>
                                    </label>
                                </div>
                                <div class="relative group">
                                    <input id="last-donation-date" class="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] transition-all outline-none font-bold" required type="date"/>
                                    <div id="date-overlay" class="hidden absolute inset-0 bg-white/60 backdrop-blur-[2px] rounded-2xl flex items-center justify-center pointer-events-none">
                                        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Not Applicable</span>
                                    </div>
                                </div>

                                <div id="donor-stats-fields" class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 transition-all duration-500">
                                    <div class="group">
                                        <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">Times Donated</label>
                                        <input id="reg-times-donated" class="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] outline-none transition-all font-bold" placeholder="e.g. 5" type="number" min="0" value="0"/>
                                    </div>
                                    <div class="group">
                                        <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">Total Bags</label>
                                        <input id="reg-bags-donated" class="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] outline-none transition-all font-bold" placeholder="e.g. 5" type="number" min="0" value="0"/>
                                    </div>
                                </div>

                                <!-- Eligibility Info Injected Here -->
                                <div id="eligibility-info" class="mt-8 hidden">
                                    <div class="p-6 bg-emerald-50 rounded-[24px] border border-emerald-100 flex items-center gap-4">
                                        <div class="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0">
                                            <span class="material-symbols-outlined text-xl">event_available</span>
                                        </div>
                                        <div>
                                            <p class="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Next Eligible Date</p>
                                            <h4 id="eligible-date-text" class="text-lg font-black text-slate-900 font-outfit uppercase tracking-tighter">-- -- --</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <!-- Error Message -->
                        <div id="reg-error" class="hidden rounded-2xl p-6 text-xs font-bold bg-red-50 border border-red-100 text-[#af101a] flex items-center gap-4 animate-shake">
                            <span class="material-symbols-outlined text-xl">warning</span>
                            <span id="reg-error-text" class="uppercase tracking-widest leading-loose"></span>
                        </div>

                        <!-- Submit Area -->
                        <div class="pt-10 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-slate-100">
                            <div class="flex items-center gap-3">
                                <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Secure Data Encryption Active</p>
                            </div>
                            <div class="flex gap-4 w-full md:w-auto">
                                <button class="flex-1 md:flex-none px-10 py-5 font-black text-slate-400 bg-slate-50 rounded-2xl hover:bg-slate-100 uppercase tracking-widest text-xs transition-all" type="button" onclick="window.location.hash = '#/'">Cancel</button>
                                <button id="reg-submit-btn" class="flex-1 md:flex-none px-12 py-5 font-black text-white bg-gradient-to-r from-[#af101a] to-[#86000d] rounded-2xl hover:shadow-[0_20px_40px_-10px_rgba(175,16,26,0.4)] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-xl shadow-red-500/20" type="submit">
                                    Join Network
                                    <span class="material-symbols-outlined text-lg">verified</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="mt-12 text-center">
                    <p class="text-xs text-slate-400 font-bold uppercase tracking-widest">
                        Already a member? <a href="#/login" class="text-[#af101a] hover:underline">Log in here</a>
                    </p>
                </div>
            </main>

            ${window.GlobalFooter()}
        </div>
    `,
    afterRender: () => {
        const form = document.getElementById('registration-form');
        const container = document.getElementById('occupational-fields');
        const radios = document.getElementsByName('statusToggle');
        const neverDonatedCheck = document.getElementById('never-donated');
        const donationDateInput = document.getElementById('last-donation-date');
        const dateOverlay = document.getElementById('date-overlay');
        const eligibilityInfo = document.getElementById('eligibility-info');
        const eligibleDateText = document.getElementById('eligible-date-text');
        const errorDiv = document.getElementById('reg-error');
        const errorText = document.getElementById('reg-error-text');
        const progressBar = document.getElementById('form-progress');
        
        const photoInput = document.getElementById('profile-image-input');
        const photoPreview = document.getElementById('avatar-preview');
        const removePhotoBtn = document.getElementById('remove-photo');
        const photoStatus = document.getElementById('photo-status');
        const nameInput = document.getElementById('reg-fullname');
        let base64Avatar = null;

        // Password Toggle Logic
        window.toggleRegPass = (id) => {
            const input = document.getElementById(id);
            const icon = document.getElementById(id + '-icon');
            if (input.type === 'password') {
                input.type = 'text';
                icon.textContent = 'visibility_off';
            } else {
                input.type = 'password';
                icon.textContent = 'visibility';
            }
        };

        // Form Progress Logic
        const updateProgress = () => {
            const inputs = form.querySelectorAll('input[required], select[required]');
            let filled = 0;
            inputs.forEach(input => {
                if (input.value && input.value !== '') filled++;
            });
            const progress = (filled / inputs.length) * 100;
            progressBar.style.width = `${progress}%`;
        };
        form.addEventListener('input', updateProgress);

        // Photo Upload Handling
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 2 * 1024 * 1024) {
                    alert('Image size should be less than 2MB');
                    photoInput.value = '';
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    base64Avatar = event.target.result;
                    photoPreview.src = base64Avatar;
                    removePhotoBtn.classList.remove('hidden');
                    photoStatus.textContent = 'PHOTO UPLOADED';
                    photoStatus.classList.add('text-[#af101a]');
                };
                reader.readAsDataURL(file);
            }
        });

        // Dynamic Avatar Seed
        nameInput.addEventListener('input', (e) => {
            if (!base64Avatar) {
                const seed = e.target.value.trim() || 'newuser';
                photoPreview.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
            }
        });

        removePhotoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            base64Avatar = null;
            photoInput.value = '';
            photoPreview.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(nameInput.value || 'newuser')}`;
            removePhotoBtn.classList.add('hidden');
            photoStatus.textContent = 'UPDATE PHOTO';
            photoStatus.classList.remove('text-[#af101a]');
        });

        const bdData = {
            Dhaka: ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail"],
            Rangpur: ["Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"],
            Rajshahi: ["Bogra", "Chapai Nawabganj", "Joypurhat", "Naogaon", "Natore", "Pabna", "Rajshahi", "Sirajganj"],
            Chittagong: ["Bandarban", "Brahmanbaria", "Chandpur", "Chittagong", "Comilla", "Cox's Bazar", "Feni", "Khagrachari", "Lakshmipur", "Noakhali", "Rangamati"],
            Sylhet: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"],
            Khulna: ["Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
            Barisal: ["Barguna", "Barisal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"],
            Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"]
        };

        const renderStudentFields = () => {
            container.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                    <div class="group">
                        <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">Department</label>
                        <input id="reg-dept" class="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] outline-none transition-all font-bold" placeholder="e.g. CSE" required type="text"/>
                    </div>
                    <div class="group">
                        <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">Student ID</label>
                        <input id="reg-inst-id" class="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] outline-none transition-all font-bold" placeholder="e.g. 2102010" required type="text"/>
                    </div>
                    <div class="group relative">
                        <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">Residential Status</label>
                        <select id="reg-residential" class="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] outline-none transition-all appearance-none font-bold cursor-pointer" required>
                            <option value="Residential">Residential</option>
                            <option value="Non-Residential">Non-Residential</option>
                        </select>
                        <span class="material-symbols-outlined absolute right-4 bottom-4 text-slate-400 pointer-events-none">expand_more</span>
                    </div>
                    <div class="group">
                        <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">Batch</label>
                        <input id="reg-batch" class="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] outline-none transition-all font-bold" placeholder="e.g. 21" required type="text"/>
                    </div>
                </div>
            `;
            updateProgress();
        };

        const renderCivilianFields = () => {
            container.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                    <div class="col-span-1 md:col-span-2 group">
                        <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">NID / Birth Certificate Number</label>
                        <input id="reg-nid" class="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] outline-none transition-all font-bold" placeholder="Enter NID or Birth Certificate ID" required type="text"/>
                    </div>
                    <div class="group relative">
                        <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">Division</label>
                        <select id="reg-division" class="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] outline-none transition-all appearance-none font-bold cursor-pointer" required>
                            <option value="" disabled selected>Select Division</option>
                            ${Object.keys(bdData).map(div => `<option value="${div}">${div}</option>`).join('')}
                        </select>
                        <span class="material-symbols-outlined absolute right-4 bottom-4 text-slate-400 pointer-events-none">expand_more</span>
                    </div>
                    <div class="group relative">
                        <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">District (Zila)</label>
                        <select id="reg-district" class="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] outline-none transition-all appearance-none font-bold cursor-pointer" required>
                            <option value="" disabled selected>Select District</option>
                        </select>
                        <span class="material-symbols-outlined absolute right-4 bottom-4 text-slate-400 pointer-events-none">expand_more</span>
                    </div>
                    <div class="group">
                        <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">Upazila</label>
                        <input id="reg-upazila" class="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] outline-none transition-all font-bold" placeholder="e.g. Saidpur" required type="text"/>
                    </div>
                    <div class="group">
                        <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">Village Name</label>
                        <input id="reg-village" class="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] outline-none transition-all font-bold" placeholder="Enter Village Name" required type="text"/>
                    </div>
                    <div class="col-span-1 md:col-span-2 group">
                        <label class="block text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest ml-1 group-focus-within:text-[#af101a]">Occupation</label>
                        <input id="reg-occupation" class="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 focus:ring-2 focus:ring-[#af101a] outline-none transition-all font-bold" placeholder="e.g. Service Holder, Business, etc." required type="text"/>
                    </div>
                </div>
            `;
            
            // Re-attach Division/District dependency
            const divSelect = document.getElementById('reg-division');
            const distSelect = document.getElementById('reg-district');
            
            divSelect.addEventListener('change', (e) => {
                const division = e.target.value;
                const districts = bdData[division] || [];
                distSelect.innerHTML = '<option value="" disabled selected>Select District</option>' + 
                    districts.map(d => `<option value="${d}">${d}</option>`).join('');
                updateProgress();
            });

            distSelect.addEventListener('change', updateProgress);

            updateProgress();
        };

        // Eligibility Calculation
        donationDateInput.addEventListener('change', (e) => {
            if (e.target.value) {
                const lastDate = new Date(e.target.value);
                const nextDate = new Date(lastDate);
                nextDate.setMonth(nextDate.getMonth() + 4); // Standard 4 months gap
                
                eligibleDateText.textContent = nextDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                eligibilityInfo.classList.remove('hidden');
                eligibilityInfo.classList.add('animate-fade-in');
            } else {
                eligibilityInfo.classList.add('hidden');
            }
        });

        // Initial render
        renderStudentFields();

        // Listeners
        radios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === 'student') renderStudentFields();
                else renderCivilianFields();
            });
        });

        neverDonatedCheck.addEventListener('change', (e) => {
            const statsFields = document.getElementById('donor-stats-fields');
            donationDateInput.disabled = e.target.checked;
            donationDateInput.required = !e.target.checked;
            dateOverlay.classList.toggle('hidden', !e.target.checked);
            
            if (e.target.checked) {
                donationDateInput.value = '';
                eligibilityInfo.classList.add('hidden');
                statsFields.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
                setTimeout(() => statsFields.classList.add('hidden'), 300);
            } else {
                statsFields.classList.remove('hidden');
                setTimeout(() => statsFields.classList.remove('opacity-0', 'pointer-events-none', 'scale-95'), 10);
            }
            updateProgress();
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            errorDiv.classList.add('hidden');
            
            const submitBtn = document.getElementById('reg-submit-btn');
            const originalBtnHtml = submitBtn.innerHTML;

            try {
                const fullName = nameInput.value;
                const dob = document.getElementById('reg-dob').value;
                const bloodGroup = document.getElementById('reg-bloodgroup').value;
                const bloodGroupConfirm = document.getElementById('reg-bloodgroup-confirm').value;
                const email = document.getElementById('reg-email').value;
                const recoveryEmail = document.getElementById('reg-recovery-email').value;
                const phone = document.getElementById('reg-phone').value;
                const recoveryPhone = document.getElementById('reg-recovery-phone').value;
                const password = document.getElementById('reg-password').value;
                const confirmPassword = document.getElementById('reg-confirm-password').value;
                const occupational_designation = form.querySelector('input[name="statusToggle"]:checked').value;
                const last_donation_date = neverDonatedCheck.checked ? null : donationDateInput.value;
                const timesDonated = parseInt(document.getElementById('reg-times-donated').value) || 0;
                const bagsDonated = parseInt(document.getElementById('reg-bags-donated').value) || 0;

                // Collect dynamic fields
                const extraData = {};
                if (occupational_designation === 'student') {
                    extraData.department = document.getElementById('reg-dept')?.value;
                    extraData.student_id = document.getElementById('reg-inst-id')?.value;
                    extraData.residential_status = document.getElementById('reg-residential')?.value;
                    extraData.batch = document.getElementById('reg-batch')?.value;
                } else {
                    extraData.nid_birth_id = document.getElementById('reg-nid')?.value;
                    extraData.division = document.getElementById('reg-division')?.value;
                    extraData.district = document.getElementById('reg-district')?.value;
                    extraData.upazila = document.getElementById('reg-upazila')?.value;
                    extraData.village = document.getElementById('reg-village')?.value;
                    extraData.occupation = document.getElementById('reg-occupation')?.value;
                }

                // Enhanced Validation
                if (!bloodGroup) throw new Error('PLEASE SELECT YOUR BLOOD GROUP');
                if (bloodGroup !== bloodGroupConfirm) throw new Error('BLOOD GROUPS DO NOT MATCH');
                if (password !== confirmPassword) throw new Error('PASSWORDS DO NOT MATCH');
                if (password.length < 6) throw new Error('PASSWORD MUST BE AT LEAST 6 CHARACTERS');
                
                // Age Validation (Must be 18+)
                const birthDate = new Date(dob);
                const age = new Date().getFullYear() - birthDate.getFullYear();
                if (age < 18) throw new Error('YOU MUST BE AT LEAST 18 YEARS OLD TO REGISTER');

                submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin text-lg">sync</span> CREATING ACCOUNT...';
                submitBtn.disabled = true;

                // Rank Calculation Logic (numeric: 1, 2, 3, 4)
                let rank = 4;
                if (timesDonated >= 15 || bagsDonated >= 15) rank = 1;
                else if (timesDonated >= 10 || bagsDonated >= 10) rank = 2;
                else if (timesDonated >= 5 || bagsDonated >= 5) rank = 3;

                // 1. Try db Registration if configured
                if (db) {
                    const { data: authData, error: authError } = await db.auth.signUp({
                        email: email,
                        password: password,
                    });

                    if (authError) throw authError;

                    if (authData.user) {
                        const { error: profileError } = await db
                            .from('profiles')
                            .insert([
                                {
                                    id: authData.user.id,
                                    full_name: fullName,
                                    email: email,
                                    phone: phone,
                                    recovery_email: recoveryEmail,
                                    recovery_phone: recoveryPhone,
                                    blood_group: bloodGroup,
                                    role: 'donor',
                                    rank: rank,
                                    times_donated: timesDonated,
                                    bags_donated: bagsDonated,
                                    last_donation_date: last_donation_date,
                                    occupational_designation: occupational_designation,
                                    dob: dob,
                                    avatar_url: base64Avatar, // Ideally upload to storage, but using base64 for now
                                    ...extraData
                                }
                            ]);

                        if (profileError) throw profileError;

                        localStorage.setItem('bloodpulse_token', authData.session?.access_token || 'pending_verify');
                        localStorage.setItem('bloodpulse_role', 'donor');
                        localStorage.setItem('bloodpulse_user', JSON.stringify({ ...authData.user, full_name: fullName, role: 'donor' }));

                        submitBtn.innerHTML = 'REGISTRATION SUCCESSFUL!';
                        submitBtn.classList.replace('bg-gradient-to-r', 'bg-emerald-500');
                        setTimeout(() => { window.goTo('/choice'); }, 1200);
                        return;
                    }
                }

                // 2. Fallback to LocalStorage simulation
                setTimeout(() => {
                    const newUser = { 
                        id: Date.now(), 
                        full_name: fullName, 
                        email: email, 
                        recovery_email: recoveryEmail,
                        phone: phone,
                        recovery_phone: recoveryPhone,
                        dob: dob,
                        blood_group: bloodGroup,
                        role: 'Donor',
                        rank: rank,
                        times_donated: timesDonated,
                        bags_donated: bagsDonated,
                        last_donation_date: last_donation_date,
                        occupational_designation: occupational_designation,
                        last_visited: new Date().toISOString(),
                        avatar: base64Avatar || photoPreview.src,
                        ...extraData
                    };

                    localStorage.setItem('bloodpulse_token', 'mock_token_' + Date.now());
                    localStorage.setItem('bloodpulse_user', JSON.stringify(newUser));
                    localStorage.setItem('bloodpulse_role', 'Donor');
                    
                    const existingDonors = JSON.parse(localStorage.getItem('bloodpulse_donors') || '[]');
                    existingDonors.push(newUser);
                    localStorage.setItem('bloodpulse_donors', JSON.stringify(existingDonors));

                    submitBtn.innerHTML = 'REGISTRATION SUCCESSFUL!';
                    submitBtn.classList.replace('bg-gradient-to-r', 'bg-emerald-500');
                    setTimeout(() => { window.goTo('/choice'); }, 1200);
                }, 2000);
                
            } catch (err) {
                errorText.textContent = err.message;
                errorDiv.classList.remove('hidden');
                errorDiv.classList.add('animate-shake');
                setTimeout(() => errorDiv.classList.remove('animate-shake'), 500);
                
                submitBtn.innerHTML = originalBtnHtml;
                submitBtn.disabled = false;
                errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
};


