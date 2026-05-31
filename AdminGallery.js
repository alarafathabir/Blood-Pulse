import { db } from '../js/db.js';

export const AdminGallery = {
    render: () => {
        return `
        <div class="flex min-h-screen bg-[#f8fafc]">
            ${window.AdminSidebar()}

            <main class="flex-1 p-10 pt-20 max-w-7xl mx-auto space-y-12 relative">
                <!-- Background Decorative Orbs -->
                <div class="fixed top-0 right-0 w-[50%] h-[50%] bg-[#af101a]/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
                
                <header class="flex justify-between items-end animate-fade-in">
                    <div>
                        <p class="text-[10px] font-black text-[#af101a] uppercase tracking-[0.4em] mb-2">Media & Outreach</p>
                        <h1 class="text-6xl font-black text-slate-900 font-outfit tracking-tighter uppercase leading-none">Community <span class="text-slate-300">Gallery</span></h1>
                        <p class="text-slate-400 font-bold text-sm mt-4 uppercase tracking-widest">Manage visual stories and impact moments shared by the community.</p>
                    </div>
                </header>

                <!-- Add New Media Card -->
                <div class="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm animate-slide-up" style="animation-delay: 0.1s">
                    <h3 class="text-xl font-black text-slate-900 font-outfit uppercase tracking-tighter mb-8 flex items-center gap-3">
                        <span class="material-symbols-outlined text-[#af101a]">add_photo_alternate</span>
                        Upload New Moment
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div class="md:col-span-8">
                            <label class="text-[9px] font-black text-slate-300 uppercase tracking-widest block ml-2 mb-2">Select Image File</label>
                            <div class="relative group">
                                <input type="file" id="gallery-file-input" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
                                <div class="w-full bg-slate-50 p-6 rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 font-bold text-xs flex items-center justify-between group-hover:border-[#af101a]/30 transition-all">
                                    <span id="file-name-display">Choose an image from your computer...</span>
                                    <span class="material-symbols-outlined">upload_file</span>
                                </div>
                            </div>
                        </div>
                        <div class="md:col-span-4 flex items-end">
                            <button id="publish-moment-btn" class="w-full py-6 bg-slate-900 text-white rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-[#af101a] shadow-xl transition-all disabled:opacity-50">Publish Moment</button>
                        </div>
                    </div>
                </div>

                <!-- Gallery Grid -->
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-slide-up" style="animation-delay: 0.2s" id="admin-gallery-grid">
                    <!-- Gallery items injected here -->
                </div>
            </main>

            <!-- Success Toast -->
            <div id="gallery-toast" class="fixed bottom-12 right-12 bg-slate-900 text-white px-10 py-5 rounded-[28px] shadow-2xl translate-y-32 opacity-0 transition-all duration-500 flex items-center gap-4 z-[1000]">
                <div class="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span class="material-symbols-outlined text-sm font-black">check_circle</span>
                </div>
                <p class="text-[10px] font-black uppercase tracking-widest" id="gallery-toast-msg">Moment Published</p>
            </div>
        </div>
        `;
    },
    afterRender: async () => {
        const grid = document.getElementById('admin-gallery-grid');
        const publishBtn = document.getElementById('publish-moment-btn');
        const fileInput = document.getElementById('gallery-file-input');
        const fileNameDisplay = document.getElementById('file-name-display');

        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) fileNameDisplay.textContent = file.name;
        };

        const showToast = (msg) => {
            const toast = document.getElementById('gallery-toast');
            const msgEl = document.getElementById('gallery-toast-msg');
            if (msgEl) msgEl.textContent = msg;
            if (toast) {
                toast.classList.remove('translate-y-32', 'opacity-0');
                setTimeout(() => toast.classList.add('translate-y-32', 'opacity-0'), 3000);
            }
        };

        const fetchGallery = async () => {
            const { data, error } = await db.from('gallery').select('*').order('created_at', { ascending: false });
            if (error) {
                console.error('Gallery Fetch Error:', error);
                return;
            }
            renderGallery(data || []);
        };

        const renderGallery = (items) => {
            grid.innerHTML = items.map((item) => `
                <div class="group relative aspect-square rounded-[40px] overflow-hidden border border-white shadow-sm hover:shadow-2xl transition-all duration-700">
                    <img src="${item.url}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <button onclick="window.removeGalleryItem('${item.id}')" class="absolute top-6 right-6 w-12 h-12 bg-white/20 hover:bg-red-500 text-white rounded-2xl backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all active:scale-90">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            `).join('');
        };

        publishBtn.onclick = async () => {
            const file = fileInput.files[0];
            if (!file) return alert('Please select a file first.');
            
            publishBtn.disabled = true;
            publishBtn.textContent = 'UPLOADING...';

            try {
                // 1. Upload to storage
                const fileName = `${Date.now()}-${file.name}`;
                const { data: uploadData, error: uploadError } = await db.storage
                    .from('gallery')
                    .upload(`gallery/${fileName}`, file);

                if (uploadError) throw uploadError;

                // 2. Get Public URL
                const { data: urlData } = db.storage.from('gallery').getPublicUrl(`gallery/${fileName}`);
                const url = urlData.publicUrl;

                // 3. Save to gallery table in MSSQL
                const { error: dbError } = await db.from('gallery').insert([{ url }]);
                if (dbError) throw dbError;

                fileInput.value = '';
                fileNameDisplay.textContent = 'Choose an image from your computer...';
                showToast('MOMENT ADDED TO GALLERY');
                fetchGallery();
            } catch (err) {
                alert('Operation failed: ' + err.message);
            } finally {
                publishBtn.disabled = false;
                publishBtn.textContent = 'PUBLISH MOMENT';
            }
        };

        window.removeGalleryItem = async (id) => {
            if (confirm('Permanently remove this moment from the public gallery?')) {
                const { error } = await db.from('gallery').delete().eq('id', id);
                if (error) {
                    alert('Deletion failed');
                } else {
                    showToast('MOMENT PURGED');
                    fetchGallery();
                }
            }
        };

        fetchGallery();
    }
};


