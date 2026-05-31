import { db } from '../js/db.js';

export const AdminMessages = {
    render: () => {
        return `
        <div class="flex min-h-screen bg-[#f8fafc]">
            ${window.AdminSidebar ? window.AdminSidebar('/admin-messages') : ''}
            <main class="flex-1 p-10 pt-20 max-w-7xl mx-auto">
                <header class="mb-16 animate-fade-in flex flex-col md:flex-row justify-between items-end gap-6">
                    <div class="space-y-4">
                        <div class="inline-flex items-center gap-3 px-4 py-2 bg-emerald-950 rounded-full">
                            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span class="text-[9px] font-black uppercase tracking-[0.4em] text-white">Live Inbox Active</span>
                        </div>
                        <h1 class="text-6xl md:text-8xl font-black text-slate-900 font-outfit uppercase tracking-tighter leading-none">Inbound <span class="text-slate-200">Inbox</span></h1>
                        <p class="text-slate-500 font-bold text-sm uppercase tracking-widest">Real-time messages from the contact portal</p>
                    </div>
                    <div class="flex gap-4">
                        <button onclick="window.location.reload()" class="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-all shadow-sm">
                            <span class="material-symbols-outlined">sync</span>
                        </button>
                    </div>
                </header>

                <div id="messages-feed" class="grid grid-cols-1 gap-6 animate-slide-up">
                    <div class="col-span-full py-20 flex flex-col items-center justify-center opacity-20">
                        <span class="material-symbols-outlined text-8xl animate-spin">sync</span>
                        <p class="mt-4 font-black uppercase tracking-widest text-[10px]">Syncing with Pulse Network...</p>
                    </div>
                </div>
                
                <div id="messages-empty" class="hidden flex flex-col items-center justify-center py-40 bg-white rounded-[56px] border border-slate-100 shadow-xl">
                    <div class="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mb-8">
                        <span class="material-symbols-outlined text-4xl text-slate-200">mail_outline</span>
                    </div>
                    <h3 class="text-2xl font-black text-slate-900 font-outfit uppercase tracking-tighter mb-2">Inbox Empty</h3>
                    <p class="text-sm font-medium text-slate-400">No inbound messages detected from the public site.</p>
                </div>
            </main>
        </div>
        `;
    },
    afterRender: async () => {
        const feed = document.getElementById('messages-feed');
        const empty = document.getElementById('messages-empty');

        const renderMessages = (messages) => {
            if (!messages || messages.length === 0) {
                feed.innerHTML = '';
                empty.classList.remove('hidden');
                return;
            }
            empty.classList.add('hidden');
            feed.innerHTML = messages.map(msg => {
                const date = new Date(msg.created_at).toLocaleString();
                const senderMatch = msg.message.match(/From: (.*)\n/);
                const senderEmail = senderMatch ? senderMatch[1] : 'Unknown';
                const body = msg.message.split('\n\n')[1] || msg.message;

                return `
                <div class="bg-white p-12 rounded-[56px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-8">
                        <span class="text-[9px] font-black text-slate-300 uppercase tracking-widest">${date}</span>
                    </div>
                    <div class="flex flex-col md:flex-row gap-12">
                        <div class="md:w-1/3 space-y-6">
                            <div class="flex items-center gap-4">
                                <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <span class="material-symbols-outlined text-2xl">contact_mail</span>
                                </div>
                                <div>
                                    <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest">Inbound From</h4>
                                    <p class="font-black text-slate-900 uppercase tracking-tighter text-lg">${msg.title.replace('📩 Contact: ', '')}</p>
                                </div>
                            </div>
                            <div class="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Reply Address</p>
                                <a href="mailto:${senderEmail}" class="text-sm font-bold text-emerald-600 hover:underline break-all">${senderEmail}</a>
                            </div>
                        </div>
                        <div class="flex-1 space-y-6">
                            <div>
                                <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Message Body</p>
                                <div class="text-slate-600 font-medium leading-relaxed text-lg bg-slate-50/50 p-8 rounded-[40px] border border-slate-100/50 whitespace-pre-wrap">${body}</div>
                            </div>
                            <div class="flex justify-end gap-4">
                                <button onclick="window.deleteMessage('${msg.id}')" class="px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">Dismiss</button>
                                <a href="mailto:${senderEmail}?subject=Re: Blood Pulse Contact" class="px-8 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Send Response</a>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }).join('');
        };

        const loadMessages = async () => {
            const { data, error } = await db
                .from('notifications')
                .select('*')
                .eq('type', 'contact_message')
                .order('created_at', { ascending: false });

            if (!error) renderMessages(data);
        };

        window.deleteMessage = async (id) => {
            if (confirm('Permanently delete this message?')) {
                const { error } = await db.from('notifications').delete().eq('id', id);
                if (!error) {
                    if (window.showToast) window.showToast('Message deleted', 'success');
                    await loadMessages();
                }
            }
        };

        // Real-time subscription (Polling for MSSQL)
        if (window._messageSub) {
            clearInterval(window._messageSub);
            window._messageSub = null;
        }
        window._messageSub = setInterval(() => {
            loadMessages();
        }, 10000);

        await loadMessages();
    }
};


