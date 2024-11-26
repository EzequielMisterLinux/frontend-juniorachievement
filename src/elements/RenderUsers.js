import getUsers from "../services/getAllUsers";

const RenderUsers = () => {
  try {
    let formAllUsers = document.getElementById("formAllUsers");
    formAllUsers.textContent = ""

    const getAllUsers = async () => {
      const getUsersAll = await getUsers();
      let users = getUsersAll.users;


      const userElement = document.createElement("table");
      userElement.className =
        "table-auto border-collapse border border-gray-300 dark:border-gray-700 w-full text-left text-gray-900 dark:text-gray-100";
      userElement.innerHTML = `
        <thead class="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th class="border border-gray-300 dark:border-gray-700 px-4 py-2">Foto</th>
            <th class="border border-gray-300 dark:border-gray-700 px-4 py-2">Nombre</th>
            <th class="border border-gray-300 dark:border-gray-700 px-4 py-2">Apellido</th>
            <th class="border border-gray-300 dark:border-gray-700 px-4 py-2 hidden md:table-cell">Correo</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      `;


      const tbody = userElement.querySelector("tbody");
      tbody.textContent = ""
      users.forEach((user) => {
        const row = `
          <tr>
            <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">
              <img
                src="${import.meta.env.VITE_API_IMG}/${user.image}"
                alt="${user.nombre}"
                class="rounded-full h-16 w-16 object-cover"
              />
            </td>
            <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">${user.nombre}</td>
            <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">${user.apellido}</td>
            <td class="border border-gray-300 dark:border-gray-700 px-4 py-2 hidden md:table-cell">${user.email}</td>
          </tr>
        `;
        tbody.innerHTML += row;
      });

      formAllUsers.appendChild(userElement);
    };

    getAllUsers();
  } catch (error) {
    console.error(error);
  }
};

export default RenderUsers;
