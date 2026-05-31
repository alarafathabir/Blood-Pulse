export const DonorType = {
    render: () => `
        <style>
            .stitch-surface { background-color: #fff8f7; color: #271816; }
            .glass-card {
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(226, 232, 240, 0.8);
            }
        </style>
        <div class="stitch-surface font-inter min-h-screen animate-fade-in relative overflow-hidden flex flex-col items-center justify-center p-6">
            <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div class="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#ffdad6] rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
                <div class="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#d4e3ff] rounded-full mix-blend-multiply filter blur-[100px] opacity-30"></div>
            </div>

            <header class="absolute top-0 w-full px-8 py-6 flex justify-between items-center z-50">
                <button onclick="goTo('/panel')" class="w-12 h-12 rounded-full bg-white border border-[#e4beba] flex items-center justify-center text-[#5b403d] hover:bg-[#fff0ef] transition-colors shadow-sm">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
            </header>

            <div class="max-w-4xl w-full text-center space-y-12 z-10 animate-fade-in">
                <div class="space-y-4">
                    <h1 class="text-4xl md:text-5xl font-extrabold text-[#271816] font-manrope tracking-tight">Select Donor Type</h1>
                    <p class="text-lg text-[#5b403d] font-medium max-w-2xl mx-auto">Choose the type of donor you are looking for based on your emergency level.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Active Donor -->
                    <div onclick="goTo('/active-donors')" class="bg-white rounded-[32px] p-8 cursor-pointer group hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-[#af101a] relative overflow-hidden text-left flex flex-col justify-between min-h-[300px]">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-[#ffe9e7] rounded-bl-[100px] -z-0 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                        <div class="z-10">
                            <div class="w-16 h-16 rounded-2xl bg-[#af101a] flex items-center justify-center text-white mb-6 shadow-md">
                                <span class="material-symbols-outlined text-3xl">local_hospital</span>
                            </div>
                            <h2 class="text-2xl font-extrabold text-[#271816] font-manrope mb-3">Active Donor</h2>
                            <p class="text-[#5b403d] font-medium text-sm leading-relaxed mb-6">
                                Donors who are currently on standby and have donated multiple times. Best for urgent blood requests. 
                            </p>
                        </div>
                        <div class="z-10 flex items-center gap-2 text-[#af101a] font-bold group-hover:gap-4 transition-all">
                            Proceed to Search <span class="material-symbols-outlined text-sm">arrow_forward</span>
                        </div>
                    </div>

                    <!-- Passive Donor -->
                    <div class="bg-white rounded-[32px] p-8 cursor-pointer group hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-[#005faf] relative overflow-hidden text-left flex flex-col justify-between min-h-[300px]">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-[#d4e3ff] rounded-bl-[100px] -z-0 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                        <div class="z-10">
                            <div class="w-16 h-16 rounded-2xl bg-[#005faf] flex items-center justify-center text-white mb-6 shadow-md">
                                <span class="material-symbols-outlined text-3xl">volunteer_activism</span>
                            </div>
                            <h2 class="text-2xl font-extrabold text-[#271816] font-manrope mb-3">Passive Donor</h2>
                            <p class="text-[#5b403d] font-medium text-sm leading-relaxed mb-6">
                                Registered members who are willing to donate but are not actively on standby. Best for planned procedures.
                            </p>
                        </div>
                        <div class="z-10 flex items-center gap-2 text-[#005faf] font-bold group-hover:gap-4 transition-all">
                            Proceed to Search <span class="material-symbols-outlined text-sm">arrow_forward</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
};


