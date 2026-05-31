import { db } from '../js/db.js';

export const Login = {
    render: () => `
        <div class="bg-slate-50 text-slate-900 font-inter min-h-screen flex flex-col items-center">
            ${window.PublicNavbar()}
            <div class="max-w-md w-full">
                <div class="text-center mb-10">
                    <div class="text-3xl font-extrabold tracking-tight text-red-700 cursor-pointer mb-2" onclick="goTo('/')">Blood Pulse</div>
                    <p class="text-slate-600">Access your donor dashboard or request blood.</p>
                </div>

                <div class="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 relative overflow-hidden animate-fade-in">
                    <div class="absolute top-0 left-0 w-full h-1 bg-red-700"></div>
                    
                    <form id="login-form" class="space-y-6">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Email Address</label>
                            <input id="login-email" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none" placeholder="afif@gmail.com" required type="email"/>
                        </div>
                        
                        <div>
                            <div class="flex justify-between items-center mb-1">
                                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                                <a href="#" class="text-xs font-bold text-red-600 hover:text-red-700">Forgot?</a>
                            </div>
                            <input id="login-password" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none" placeholder="••••••••" required type="password"/>
                        </div>

                        <div class="flex items-center gap-2">
                            <input type="checkbox" id="remember" class="w-4 h-4 text-red-600 border-slate-300 rounded focus:ring-red-500">
                            <label for="remember" class="text-sm text-slate-600">Remember me for 30 days</label>
                        </div>

                        <!-- Inline error (no more alert) -->
                        <div id="login-error" class="hidden rounded-lg p-3 text-sm text-center bg-red-50 border border-red-200 text-red-700">
                            <span class="material-symbols-outlined text-sm align-middle mr-1">error</span>
                            <span id="login-error-text"></span>
                        </div>

                        <button class="w-full py-4 font-bold text-white bg-red-700 rounded-lg hover:bg-red-800 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2" type="submit">
                            Sign In
                            <span class="material-symbols-outlined text-sm">login</span>
                        </button>
                    </form>

                    <div class="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p class="text-sm text-slate-600">
                            Don't have an account? 
                            <a href="#/register" class="text-red-700 font-bold hover:underline">Register Now</a>
                        </p>
                    </div>
                </div>
                
                <div class="mt-8 text-center">
                    <a href="#/" class="text-slate-500 hover:text-slate-700 flex items-center justify-center gap-2 text-sm font-medium">
                        <span class="material-symbols-outlined text-sm">arrow_back</span>
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
    `,
    afterRender: () => {
        const form = document.getElementById('login-form');
        const emailInput = document.getElementById('login-email');
        const passwordInput = document.getElementById('login-password');
        const errorDiv = document.getElementById('login-error');
        const errorText = document.getElementById('login-error-text');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            errorDiv.classList.add('hidden');
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin text-[20px]">sync</span> Logging in...';
            submitBtn.disabled = true;

            try {
                // 1. Try db Auth first if configured
                if (db) {
                    const { data, error } = await db.auth.signInWithPassword({
                        email: email,
                        password: password,
                    });

                    if (!error && data.user) {
                        // Fetch profile data
                        const { data: profile } = await db
                            .from('profiles')
                            .select('*')
                            .eq('id', data.user.id)
                            .single();

                        const user = { 
                            ...data.user, 
                            ...profile, 
                            account_role: profile?.role || 'donor', 
                            last_visited: new Date().toISOString() 
                        };
                        
                        localStorage.setItem('bloodpulse_token', data.session.access_token);
                        localStorage.setItem('bloodpulse_role', user.account_role.toLowerCase());
                        localStorage.setItem('bloodpulse_user', JSON.stringify(user));

                        if (user.account_role.toLowerCase() === 'admin') {
                            window.replaceTo('/dashboard');
                        } else {
                            window.replaceTo('/choice');
                        }
                        return;
                    }
                    
                    // If db is configured but user not found/password wrong, and it's NOT the hardcoded admin, show error
                    if (email.toLowerCase() !== 'admin@gmail.com') {
                        throw new Error(error?.message || "Invalid credentials");
                    }
                }

                // 2. Fallback to LocalStorage/Hardcoded for Dev
                setTimeout(() => {
                    const isAdmin = email.toLowerCase() === 'admin@gmail.com';
                    
                    if (isAdmin && password !== 'admin123') {
                        errorText.textContent = "Invalid Admin Credentials";
                        errorDiv.classList.remove('hidden');
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        return;
                    }

                    const role = isAdmin ? 'admin' : 'donor';
                    
                    // Check if real registered donor
                    const donors = JSON.parse(localStorage.getItem('bloodpulse_donors') || '[]');
                    const foundDonor = donors.find(d => d.email === email);
                    
                    let user;
                    if (foundDonor) {
                        user = { ...foundDonor, account_role: 'donor', last_visited: new Date().toISOString() };
                    } else if (isAdmin) {
                        user = { id: 'admin_root', name: 'Master Admin', email: email, account_role: 'admin', last_visited: new Date().toISOString() };
                    } else {
                        errorText.textContent = "User not found. Please register.";
                        errorDiv.classList.remove('hidden');
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        return;
                    }
                    
                    // Store token and user data
                    localStorage.setItem('bloodpulse_token', 'mock_token_' + Date.now());
                    localStorage.setItem('bloodpulse_role', user.account_role.toLowerCase());
                    localStorage.setItem('bloodpulse_user', JSON.stringify(user));

                    // Dynamic Redirection based on role
                    if (user.account_role.toLowerCase() === 'admin') {
                        window.replaceTo('/dashboard');
                    } else {
                        window.replaceTo('/choice');
                    }
                }, 500);
            } catch (err) {
                errorText.textContent = err.message;
                errorDiv.classList.remove('hidden');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
};


