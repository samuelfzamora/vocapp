# VocApp

VocApp es una aplicación web progresiva (PWA) para aprender vocabulario italiano–español mediante repetición activa y refuerzo de errores.

No pretende sustituir cursos ni aplicaciones completas de aprendizaje de idiomas, sino servir como una herramienta sencilla y eficaz para **memorizar y consolidar vocabulario**.

🔗 **Demo:** https://samuelfzamora.github.io/vocapp/

---

## ✨ Características

- Quiz de vocabulario Italiano → Español y Español → Italiano
- Selección múltiple con feedback inmediato
- Repetición inteligente de palabras falladas
- Progreso guardado localmente (sin login)
- Modo “sólo palabras falladas”
- Funciona offline
- Instalable como app (PWA)
- Pensada para uso en móvil

---

## 🎯 Enfoque y visión

VocApp se centra exclusivamente en el **aprendizaje de vocabulario por repetición**.

Existen muchas aplicaciones excelentes y gratuitas para aprender italiano de forma integral (gramática, pronunciación, conversación, etc.).  
Este proyecto **no compite con ellas**, sino que las complementa, ofreciendo una herramienta ligera y directa para reforzar el léxico.

La visión del proyecto es:
- Crecer progresivamente por niveles (B1 → B2 → C1)
- Mantener la simplicidad
- Priorizar la utilidad real sobre la complejidad

---

## 🛠️ Tecnologías utilizadas

- Vue 3
- Vite
- JavaScript (ES Modules)
- PWA (Service Worker + Manifest)
- LocalStorage
- GitHub Pages

---

## 🚀 Desarrollo local

Clona el repositorio y ejecuta:

```bash
npm install
npm run dev

```

La aplicación local estará disponible en http://localhost:5173.

---

## 📦 Build para producción

npm run build

Para GitHub Pages, el contenido generado se publica desde la carpeta docs/

## 📁 Estructura del proyecto

```text
/public
  ├─ vocab.json
  ├─ sw.js
  ├─ manifest.json
  ├─ icon-192.png
  └─ icon-512.png
/src
  ├─ components
  ├─ services
  └─ App.vue

```  


## 🗺️ Roadmap


- ✅ Quiz básico IT ↔ ES
- ✅ Repetición de palabras falladas
- ✅ Persistencia local sin login
- ✅ PWA offline
- ⏹️ Ampliación de vocabulario a nivel B2
- ⏹️ Clasificación por nivel (B1 / B2 / C1)
- ⏹️ Mejora de UI/UX (interfaz y experiencia de usuario)
- ⏹️ Estadísticas más detalladas



## 🤝 Contribuciones

Cualquiera puede:
- Usar la aplicación
- Modificar el código
- Adaptarla a otros idiomas
- Ampliar el vocabulario
- Mejorar la interfaz

Las contribuciones son bienvenidas mediante forks y pull requests.

## 📄 Licencia

Este proyecto se distribuye bajo la licencia MIT.

Puedes usarlo, modificarlo y redistribuirlo libremente, incluso para otros proyectos.