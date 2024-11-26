import AgregarUsuarios from "../services/addNewUser";
import Swal from "sweetalert2";
import { Howl } from "howler";
import confetti from "canvas-confetti";
import RenderUsers from "./RenderUsers";

const FormularioParaCrearUsuario = () => {
    const initializeForm = () => {
        try {
            let formularioUsuario = document.getElementById("addNewUser");
            if (!formularioUsuario) return;
            
            formularioUsuario.className = "p-8";

            formularioUsuario.innerHTML = `
                <form id="usuario-form" class="max-w-sm mx-auto">
                    <div class="mb-5">
                        <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                        <input type="text" id="nombre" name="nombre" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese su nombre" required />
                    </div>

                    <div class="mb-5">
                        <label for="apellido" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
                        <input type="text" id="apellido" name="apellido" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese su apellido" required />
                    </div>

                    <div class="mb-5">
                        <label for="edad" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Edad</label>
                        <input type="number" id="edad" name="edad" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese su edad" required />
                    </div>

                    <div class="mb-5">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
                        <input type="email" id="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nombre@ejemplo.com" required />
                    </div>

                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                        <input type="password" id="password" name="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required />
                    </div>

                    <div class="mb-5">
                        <label for="dropzone-file5" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Foto de perfil</label>
                        <div class="relative">
                            <div id="dropzone-container5" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div id="preview-container5" class="absolute inset-0 flex items-center justify-center">
                                    <img id="image-preview5" class="max-w-full max-h-full object-contain rounded-lg hidden" alt="Vista previa"/>
                                </div>
                                
                                <div id="upload-interface5" class="flex flex-col items-center justify-center p-6 text-center">
                                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span class="font-semibold">Click para subir</span> o arrastra y suelta
                                    </p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG o GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file5" name="imagen" type="file" class="hidden" accept="image/*" />
                            </div>
                            <button type="button" id="remove-image5" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hidden hover:bg-red-600 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="mb-5 content-center justify-center">
                        <button type="submit" id="btnagregar" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Crear Usuario
                        </button>
                    </div>
                </form>
            `;

            setupImageHandling();
            setupFormSubmission();
        } catch (error) {
            console.error("Error en la inicialización del formulario:", error);
        }
    };

    const setupImageHandling = () => {
        const dropzoneContainer = document.getElementById("dropzone-container5");
        const dropzoneFileInput = document.getElementById("dropzone-file5");
        const imagePreview = document.getElementById("image-preview5");
        const uploadInterface = document.getElementById("upload-interface5");
        const removeImageButton = document.getElementById("remove-image5");

        if (!dropzoneContainer || !dropzoneFileInput || !imagePreview || !uploadInterface || !removeImageButton) return;

        const handleFile = (file) => {
            if (file && file.type.startsWith('image/')) {
                
                if (file.size > 5 * 1024 * 1024) {
                    Swal.fire({
                        title: "Error",
                        text: "La imagen es demasiado grande. El tamaño máximo es 5MB",
                        icon: "error"
                    });
                    return;
                }

                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreview.src = e.target.result;
                    imagePreview.classList.remove('hidden');
                    uploadInterface.classList.add('hidden');
                    removeImageButton.classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            }
        };

        removeImageButton.addEventListener('click', (e) => {
            e.stopPropagation();
            imagePreview.src = '';
            imagePreview.classList.add('hidden');
            uploadInterface.classList.remove('hidden');
            removeImageButton.classList.add('hidden');
            dropzoneFileInput.value = '';
        });

        dropzoneFileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) handleFile(file);
        });

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropzoneContainer.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropzoneContainer.addEventListener(eventName, () => {
                dropzoneContainer.classList.add('border-blue-500', 'bg-blue-50', 'dark:bg-gray-600');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropzoneContainer.addEventListener(eventName, () => {
                dropzoneContainer.classList.remove('border-blue-500', 'bg-blue-50', 'dark:bg-gray-600');
            }, false);
        });

        dropzoneContainer.addEventListener('drop', (e) => {
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
        }, false);

        dropzoneContainer.addEventListener('click', () => {
            dropzoneFileInput.click();
        });
    
    };

    const setupFormSubmission = () => {
        const form = document.getElementById("usuario-form");
        const sound = new Howl({
            src: ["../../success.mp3"],
            volume: 0.5,
        });

        if (!form) return;

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            try {
                
                Swal.fire({
                    title: "Creando usuario...",
                    text: "Por favor espere",
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                const formData = new FormData();
                
                
                const nombre = form.querySelector('#nombre').value;
                const apellido = form.querySelector('#apellido').value;
                const edad = form.querySelector('#edad').value;
                const email = form.querySelector('#email').value;
                const password = form.querySelector('#password').value;
                const fileInput = document.getElementById("dropzone-file5");

                formData.append('nombre', nombre);
                formData.append('apellido', apellido);
                formData.append('edad', edad);
                formData.append('email', email);
                formData.append('password', password);
                
                if (fileInput && fileInput.files[0]) {
                    formData.append("image", fileInput.files[0]); 
                }

                const response = await AgregarUsuarios(formData);
                const data = await response.json();

                
                Swal.close();

                if (response.ok) {
                    sound.play();
                    lanzarConfetti();
                    
                    Swal.fire({
                        title: "¡Usuario creado!",
                        text: "El usuario se ha registrado exitosamente",
                        icon: "success"
                    });

                    RenderUsers()
                    

                    form.reset();
                    const imagePreview = document.getElementById("image-preview5");
                    const uploadInterface = document.getElementById("upload-interface5");
                    const removeImageButton = document.getElementById("remove-image5");
                    
                    if (imagePreview && uploadInterface && removeImageButton) {
                        imagePreview.src = '';
                        imagePreview.classList.add('hidden');
                        uploadInterface.classList.remove('hidden');
                        removeImageButton.classList.add('hidden');
                    }
                } else {
                    throw new Error(data.msg || 'Error al crear el usuario');
                }
            } catch (error) {
                console.error("Error al crear el usuario:", error);
                Swal.fire({
                    title: "Error",
                    text: error.message || "Hubo un problema al crear el usuario",
                    icon: "error"
                });
            }
        });
    };

    const lanzarConfetti = () => {
        confetti({
            particleCount: 100,
            startVelocity: 30,
            spread: 360,
            origin: {
                x: Math.random(),
                y: Math.random() - 0.2
            }
        });
    };

    
    setTimeout(initializeForm, 0);

    return null;
};

export default FormularioParaCrearUsuario;