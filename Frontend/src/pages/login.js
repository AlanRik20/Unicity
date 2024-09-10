export function LoginPage() {
  const $container = document.createElement("div");

  $container.innerHTML = `
<div class="flex justify-center items-center h-screen ">
  <div class=" p-8 rounded-lg shadow-lg w-full max-w-md">
    <h2 class="text-2xl font-bold text-center mb-6">Registro</h2>
    <form id="loginForm" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Nombre</label>
        <input type="text" id="name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Ingresa tu nombre" required>
      </div>
     
        <label class="block text-sm font-medium text-black-700">Contraseña</label>
        <input type="password" id="password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Ingresa tu contraseña" required>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Iniciar Sesión
        </button>
        <p class="text-blue-800">¿No tiene una cuenta? 
        
        <a href="/register" class="text-lg hover:underline transition-colors duration-200 ${
          location.pathname === "/register" ? "text-pink-700" : ""
        }">Registrarse</a>
        </p>
      </div>
      </div>
    </form>
    <p id="message" class="text-red-600"></p>
  </div>
</div>

    `;
  $container
    .querySelector("#loginForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const username = document.getElementById("name").value;
      const password = document.getElementById("password").value;

      if (!username || !password) {
        document.getElementById("message").innerText =
          "Por favor, completa todos los campos.";
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          document.getElementById("message").innerText =
            "Credenciales inválidas";
          return;
        }

        const data = await response.json();
        console.log(data);
        window.location.href = "/home";
      } catch (error) {
        console.error("Error:", error);
      }
    });

  return $container;
}
