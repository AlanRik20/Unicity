export function RegisterPage() {
    const $container = document.createElement('div')
    
    $container.innerHTML = `
  <div class="flex justify-center items-center h-screen">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 class="text-2xl font-bold text-center mb-6">Registro</h2>
          <form id="registerForm" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nombre</label>
              <input type="text" id="name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Ingresa tu nombre" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input type="email" id="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Ingresa tu correo" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Contraseña</label>
              <input type="password" id="password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Ingresa tu contraseña" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">telefono</label>
              <input type="text" id="telefono" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Confirma tu contraseña" required>
            </div>
            <div>
              <button type="submit" class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Registrarse
              </button>
            </div>
          </form>
          <p id="message" class="text-red-600"></p>
        </div>
      </div>

    `
    $container.querySelector("#registerForm").addEventListener('submit', async function (event) {
      event.preventDefault();

      const username = document.getElementById('name').value;
      const correo = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const telefono = document.getElementById('telefono').value;
      const divError = document.getElementById('message')

      // Validación básica
      try {
          // Realizamos la solicitud al servidor
          const response = await fetch('http://localhost:3000/registerUser', {
              method: 'POST',
              credentials: 'include', // Importante para enviar las cookies de sesión
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ username, correo, password, telefono })
          });

          if (response.ok) {
              // Si la respuesta es exitosa, redirigimos a la página de login
              window.location.href = 'index.html';
          } else {
              const data = await response.json();
              divError.innerText = data.message || 'Credenciales inválidas';
              divError.classList.add('bg-danger', 'text-white', 'text-center', 'rounded', 'p-2', 'mt-3');
          }

      } catch (error) {
          console.error('Error en la solicitud:', error);
          divError.innerText = 'Error en la solicitud';
      }
  });

    return $container
}