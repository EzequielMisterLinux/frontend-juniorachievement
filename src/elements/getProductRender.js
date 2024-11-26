import deleteProductByID from "../services/deleteProductApi";
import fetchProductos from "../services/fetchProductsApi";
import updateProductById from "../services/updateProductById";
import Swal from "sweetalert2";
import { Howl } from "howler";
import confetti from "canvas-confetti";
import { Modal } from 'flowbite';
import RenderBodypage from "../pages/BodyPageRender";
import FormularioParaCrearProducto from "./addProductoRender";
import RenderUsers from "./RenderUsers";
import FormularioParaCrearUsuario from "./addNewUserRender";


let currentPage = 1;
const limit = 7;


const createSoundEffects = () => ({
    warning: new Howl({ src: ["../../warning.mp3"], volume: 0.5 }),
    success: new Howl({ src: ["../../success.mp3"], volume: 0.5 })
});


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


const renderTableStructure = () => {
    RenderBodypage()

    

    const app = document.getElementById("app");
    if (!app) return;
    
    app.innerHTML = `
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">Nombre</th>
                        <th scope="col" class="px-6 py-3 hidden md:table-cell">Descripción</th>
                        <th scope="col" class="px-6 py-3 hidden md:table-cell">Precio</th>
                        <th scope="col" class="px-6 py-3 hidden md:table-cell">Disponibilidad</th>
                        <th scope="col" class="px-6 py-3 hidden md:table-cell">Imagen</th>
                        <th scope="col" class="px-6 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody id="tbody-products"></tbody>
            </table>
        </div>
        <div id="pagination-controls" class="flex justify-center mt-4"></div>
        ${renderModals()}
    `;
};


const renderModals = () => `
    <div id="updateModal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div id="closeupdate" class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-medium text-gray-900 dark:text-white">Actualizar Producto</h3>
                    <button type="button" class="close-modal text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
                <form id="updateProductForm" class="p-4 md:p-5 space-y-4">
                    <div class="mb-5">
                        <label for="nombreUpdate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                        <input type="text" id="nombreUpdate" name="nombre" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-800 dark:text-white" required />
                    </div>
                    <div class="mb-5">
                        <label for="descripcionUpdate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                        <input type="text" id="descripcionUpdate" name="descripcion" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-800 dark:text-white"" required />
                    </div>
                    <div class="mb-5">
                        <label for="precioUpdate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
                        <input type="number" id="precioUpdate" name="precio" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-800 dark:text-white""  required />
                    </div>
                    <div class="mb-5">
                        <label for="disponibilidadUpdate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">Disponibilidad</label>
                        <select id="disponibilidadUpdate" name="disponibilidad" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-800 dark:text-white"">
                            <option value="true">Disponible</option>
                            <option value="false">No disponible</option>
                        </select>
                    </div>
                    <div class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen actual</label>
                        <img id="currentImage" class="h-32 w-32 object-cover mb-2 rounded" src="" alt="Imagen actual" />
                        <label for="imagenUpdate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nueva imagen</label>
                        <input type="file" id="imagenUpdate" name="imagen" accept="image/*" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-800 dark:border-gray-800 dark:text-white"" />
                    </div>
                    <input type="hidden" id="productId" name="productId" />
                    <div class="flex justify-end space-x-4">
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Actualizar</button>
                        <button type="button" class="close-modal text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div id="viewModal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-medium text-gray-900 dark:text-white">Ver Producto</h3>
                    <button type="button" class="close-modal text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
                <div class="max-w-md mx-auto rounded-lg overflow-hidden">
                    <div class="mb-5">
                        <img id="imagenView" class="h-42 w-42 object-cover mb-2 rounded" src="" alt="Imagen del producto" />
                    </div>
                    <div class="p-6 space-y-4">
                        <h2 id="nombreView" class="text-2xl font-semibold text-gray-900 dark:text-white"></h2>
                        <div class="flex items-center space-x-2">
                            <span class="text-lg font-medium text-gray-500 dark:text-gray-400">Precio:</span>
                            <span id="precioView" class="text-2xl font-bold text-red-500 dark:text-red-400"></span>
                        </div>
                        <p id="descripcionView" class="text-gray-700 dark:text-gray-300"></p>
                        <p id="disponibilidadView" class="text-sm font-medium text-green-600 dark:text-green-400"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;



const handleUpdateFormSubmit = async (e, modal) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productId = formData.get('productId');
    const sounds = createSoundEffects();
    

    try {
        await updateProductById(productId, formData);
        modal.hide();
        await renderProductos();
        
        sounds.success.play();
        lanzarConfetti();

        Swal.fire({
            title: "¡Producto actualizado!",
            text: "El producto se actualizó exitosamente",
            icon: "success"
        });
        
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        Swal.fire({
            title: "Error",
            text: "No se pudo actualizar el producto",
            icon: "error"
        });
    }
};


const handleDeleteProduct = async (productId) => {
    const sounds = createSoundEffects();
    sounds.warning.play();

    const result = await Swal.fire({
        title: "¿Está seguro de eliminarlo?",
        text: "¡Esta acción es irreversible!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, borrarlo!"
    });

    if (result.isConfirmed) {
        try {
            await deleteProductByID(productId);
            await renderProductos();
            sounds.success.play();
            lanzarConfetti();
            
            Swal.fire({
                title: "¡Eliminado!",
                text: "El producto se eliminó exitosamente.",
                icon: "success"
            });
        } catch (error) {
            console.error("Error al eliminar:", error);
            Swal.fire({
                title: "Error",
                text: "No se pudo eliminar el producto",
                icon: "error"});
            }
        }
    };
    
    
    const renderProductos = async () => {
        try {
            const data = await fetchProductos(currentPage, limit);
            const { productos, totalPages } = data;
    
            const fila = document.getElementById("tbody-products");
            if (!fila) return;
            
            fila.innerHTML = "";
    
            productos.forEach((item) => {
                const disponibilidadText = item.disponibilidad ? "Sí está disponible" : "No está disponible";
                const row = document.createElement("tr");
                row.className = "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700";
                
                row.innerHTML = `
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        ${item.nombre}
                    </th>
                    <td class="px-6 py-4 hidden md:table-cell">
                        ${item.descripcion}
                    </td>
                    <td class="px-6 py-4 hidden md:table-cell">
                        $${item.precio}
                    </td>
                    <td class="px-6 py-4 hidden md:table-cell">
                        ${disponibilidadText}
                    </td>
                    <td class="px-6 py-4 hidden md:table-cell">
                        <img src="${import.meta.env.VITE_API_IMG}/${item.imagen}" 
                             alt="${item.nombre}" 
                             class="h-20 w-20 object-cover rounded">
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex flex-col sm:flex-row gap-2">
                            <button id="delete-${item._id}" 
                                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                Eliminar
                            </button>
                            <button id="update-${item._id}" 
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Actualizar
                            </button>
                            <button id="view-${item._id}" 
                                    class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                Ver
                            </button>
                        </div>
                    </td>
                `;
                
                fila.appendChild(row);
    
                
                document.getElementById(`delete-${item._id}`).addEventListener("click", () => handleDeleteProduct(item._id));
                document.getElementById(`update-${item._id}`).addEventListener("click", () => handleUpdateClick(item));
                document.getElementById(`view-${item._id}`).addEventListener("click", () => handleViewClick(item));
            });
    
            renderPaginationControls(totalPages);
            setupModals();
    
        } catch (error) {
            console.error("Error al renderizar productos:", error);

        }
    };
    
    
    const setupModals = () => {
        const $updateModal = document.getElementById('updateModal');
        const $viewModal = document.getElementById('viewModal');
        
        const updateModal = new Modal($updateModal, {
            placement: 'center',
            backdrop: 'dynamic',
            closable: true,
        });
    
        const viewModal = new Modal($viewModal, {
            placement: 'center',
            backdrop: 'dynamic',
            closable: true,
        });
    
        
        document.querySelectorAll('.close-modal').forEach(button => {
            button.addEventListener('click', () => {
                updateModal.hide();
                viewModal.hide();
            });
        });
    
        
        const updateForm = document.getElementById('updateProductForm');
        if (updateForm) {
            updateForm.addEventListener('submit', (e) => handleUpdateFormSubmit(e, updateModal));
        }
    
        return { updateModal, viewModal };
    };
    
    
    const handleUpdateClick = (item) => {
        const form = document.getElementById('updateProductForm');
        if (!form) return;
    
        form.nombre.value = item.nombre;
        form.descripcion.value = item.descripcion;
        form.precio.value = item.precio;
        form.disponibilidad.value = item.disponibilidad.toString();
        form.productId.value = item._id;
        
        const currentImage = document.getElementById('currentImage');
        if (currentImage) {
            currentImage.src = `${import.meta.env.VITE_API_IMG}/${item.imagen}`;
        }
    
        const modal = new Modal(document.getElementById('updateModal'));
        modal.show();
    };
    
    
    const handleViewClick = (item) => {
        document.getElementById('nombreView').textContent = item.nombre;
        document.getElementById('descripcionView').textContent = item.descripcion;
        document.getElementById('precioView').textContent = `$${item.precio}`;
        document.getElementById('disponibilidadView').textContent = 
            item.disponibilidad ? "Sí está disponible" : "No está disponible";
        document.getElementById('imagenView').src = `${import.meta.env.VITE_API_IMG}/${item.imagen}`;
    
        const modal = new Modal(document.getElementById('viewModal'));
        modal.show();
    };
    
    
    const renderPaginationControls = (totalPages) => {
        const paginationContainer = document.getElementById("pagination-controls");
        if (!paginationContainer) return;
    
        paginationContainer.innerHTML = "";
    
        if (totalPages > 1) {
            const createPageButton = (pageNum) => {
                const button = document.createElement("button");
                button.textContent = pageNum;
                button.className = `px-4 py-2 mx-1 rounded-lg ${
                    pageNum === currentPage 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`;
                button.addEventListener("click", () => {
                    currentPage = pageNum;
                    renderProductos();
                });
                return button;
            };
    
            
            for (let i = 1; i <= totalPages; i++) {
                paginationContainer.appendChild(createPageButton(i));
            }
        }
    };
    
    
    const initializeProductos = async() => {
        RenderUsers()
        FormularioParaCrearProducto()
        FormularioParaCrearUsuario()
        
      
        renderTableStructure();
        renderProductos();


const closeModalButtons = document.querySelectorAll('.close-modal');

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {

        const updateModal = new Modal(document.getElementById('updateModal'));
        const viewModal = new Modal(document.getElementById('viewModal'));
        updateModal.hide();
        viewModal.hide()
    });
});



        
    };
    
    export {
        initializeProductos,
        renderProductos
    }
    