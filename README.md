# 🐾 AdoptaPet

## 📌 Descripción

**AdoptaPet** es una aplicación web desarrollada para facilitar el proceso de adopción responsable de mascotas.

El proyecto permite visualizar diferentes mascotas disponibles para adopción, consultar información sobre cada una y enviar una solicitud de adopción mediante un formulario.

El objetivo principal es crear una plataforma sencilla, amigable y fácil de utilizar para conectar a personas interesadas en adoptar con mascotas que necesitan un hogar.

## 🎯 Objetivo del proyecto

Desarrollar una aplicación web que permita presentar mascotas disponibles para adopción y facilitar el registro de solicitudes de personas interesadas en brindarles un hogar.

## 🐶 Funcionalidades

* 🏠 Página principal de AdoptaPet.
* 🐾 Visualización de mascotas disponibles.
* 🐶 Perfiles individuales de las mascotas.
* 📷 Fotografías de Max, Luna y Toby.
* ❤️ Botón para iniciar el proceso de adopción.
* 📝 Formulario de solicitud de adopción.
* 👤 Registro del nombre del solicitante.
* 📧 Registro del correo electrónico.
* 📱 Registro del número de teléfono.
* 🏠 Selección del tipo de vivienda.
* 💭 Registro del motivo de adopción.
* 🐾 Selección automática de la mascota desde su perfil.
* 🎉 Confirmación después de enviar la solicitud.

## 💻 Tecnologías utilizadas

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Git**
* **GitHub**

## 📂 Estructura principal

```text
adoptapet/
│
├── public/
│   ├── luna1.png
│   ├── max.jpg
│   └── toby1.jpeg
│
├── src/
│   └── app/
│       ├── adopcion/
│       │   └── page.tsx
│       │
│       ├── mascotas/
│       │   ├── luna/
│       │   ├── max/
│       │   └── toby/
│       │
│       └── page.tsx
│
├── package.json
├── README.md
└── ...
```

## ⚙️ Instalación y ejecución

Para ejecutar el proyecto de manera local, primero se deben instalar las dependencias:

```bash
npm install
```

Después se inicia el servidor de desarrollo:

```bash
npm run dev
```

Finalmente, se puede abrir el proyecto desde el navegador en:

```text
http://localhost:3000
```

## 🐾 Mascotas disponibles

Actualmente el proyecto presenta tres mascotas:

| Mascota | Tipo     |
| ------- | -------- |
| Max     | 🐶 Perro |
| Luna    | 🐱 Gata  |
| Toby    | 🐶 Perro |

Cada mascota cuenta con su propio perfil y un botón para iniciar el proceso de adopción.

## ❤️ Proceso de adopción

El usuario puede ingresar al perfil de una mascota y seleccionar la opción **"Quiero adoptar"**.

El sistema lo dirige al formulario de adopción y selecciona automáticamente la mascota correspondiente.

Después de completar los datos requeridos, el usuario puede enviar la solicitud y recibe un mensaje de confirmación.

## 👩‍💻 Proyecto académico

**AdoptaPet** fue desarrollado como un proyecto académico para aplicar conocimientos de desarrollo web, utilizando tecnologías modernas para la creación de interfaces y navegación entre diferentes páginas.

---

🐾 **AdoptaPet — Una oportunidad para encontrar un nuevo hogar.**
