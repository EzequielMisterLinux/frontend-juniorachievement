import { Modal } from "flowbite";
import FormularioParaCrearUsuario from "./src/elements/addNewUserRender";
import FormularioParaCrearProducto from "./src/elements/addProductoRender";
import {initializeProductos} from "./src/elements/getProductRender";
import RenderUsers from "./src/elements/RenderUsers";

import authService from "./src/services/loginApi";
import "./style.css";
import "flowbite";

document.addEventListener('DOMContentLoaded', () => {
    const loginAccess = document.getElementById("login");
    if (!loginAccess) return;


    loginAccess.innerHTML = `
        <div class="max-w-sm mx-auto">
            <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
            </div>
            <div class="mb-5">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div class="flex items-start mb-5">
                <div class="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                </div>
                <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
            </div>
            <div id="error-message" class="text-red-500 mb-4 hidden"></div>
            <button id="loginbtn" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
        </div>
    `;


    const initializeApp = async () => {
        const isLoggedUser = sessionStorage.getItem("token");
        
        if (isLoggedUser === "true") {
            loginAccess.textContent = "";
            
            await initializeProductos();
            FormularioParaCrearProducto()
            FormularioParaCrearUsuario()
            RenderUsers()
            
        }
    };


    const loginBtn = document.getElementById("loginbtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                const emailUser = document.getElementById("email").value;
                const passUser = document.getElementById("password").value;
                
                await authService.login(emailUser, passUser);
                
                await initializeProductos();
                FormularioParaCrearProducto()
                FormularioParaCrearUsuario()
                RenderUsers()
                loginAccess.textContent = "";
                

                window.history.pushState({}, '', '/dashboard');
                window.dispatchEvent(new Event('popstate'));
                window.location.reload();
            } catch (error) {
                const errorMessage = document.getElementById("error-message");
                if (errorMessage) {
                    errorMessage.textContent = "Login failed. Please check your credentials.";
                    errorMessage.classList.remove("hidden");
                }
                console.error("Login error:", error);
            }
        });
    }


    const logout = document.getElementById("logout");
    if (logout) {
        logout.addEventListener("click", async () => {
            try {
                localStorage.clear();
                sessionStorage.clear();
                await authService.logout();

                
                window.history.pushState({}, '', '/login');
                window.dispatchEvent(new Event('popstate'));
                window.location.reload();
            } catch (error) {
                console.error("Logout error:", error);
            }
        });
    }


    initializeApp().catch(console.error);
});


var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
    
});

