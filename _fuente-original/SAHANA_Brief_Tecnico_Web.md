# SAHANA SRL | Brief Técnico para Desarrollo Web

## Para: Programador/Desarrollador
## Objetivo: Web que capture leads B2B y posicione en Google
## Plazo: 2-3 semanas

---

## I. CONTEXTO COMERCIAL (LEER PRIMERO)

**Empresa:** Aserradero mayorista ubicado en zona rural (RN 14, Pedernal, Entre Ríos)

**Clientes actuales:** Corralones, constructoras, fabricantes de muebles (B2B)

**Problema a resolver:** 
- 70% de ventas en 2 clientes = muy concentrado
- Necesitan 2 clientes nuevos/mes
- Capacidad de producción sobrada

**Solución:** Web que funcione como herramienta de venta, NO solo como catálogo

**Diferencial:** Calidad probada + responsabilidad + buen servicio (no precio)

**No prometan:** Mejor precio, mejor calidad del mercado, velocidad sin consultar

---

## II. ARQUITECTURA DE SITIO (ESTRUCTURA)

```
sahana.com.ar/
├── / (HOME)
├── /productos/
│   ├── /productos/tablas-eucalipto/
│   ├── /productos/tableros-alistonados/
│   ├── /productos/revestimientos/
│   ├── /productos/machimbre/
│   ├── /productos/decks/
│   ├── /productos/tirantes/
│   ├── /productos/escalones/
│   ├── /productos/subproductos/ (chip, aserrín)
│   └── /productos/otros/
├── /sobre-nosotros/
├── /blog/ (luego)
├── /contacto/
├── /especificaciones/ (opcional)
└── /sitemap.xml
```

---

## III. PÁGINAS REQUERIDAS

### 1. HOME (Landing Page)

**Estructura:**

```
HEADER (Sticky)
├── Logo SAHANA (200x50px, nuevo)
├── Menú horizontal: Productos | Sobre Nosotros | Contacto
├── Botón CTA: "SOLICITAR PRESUPUESTO" (rojo, siempre visible)
└── WhatsApp flotante (esquina inferior derecha)

HERO (Sección 1)
├── Imagen grande: Planta/proceso (1920x600px mínimo, WEBP)
├── Texto overlay: 
│   "Eucalipto de Calidad A"
│   "Responsabilidad en cada entrega"
│   Botón: "Ver Productos" + "Contactanos"
└── Animación sutil (fade-in)

PROPUESTA DE VALOR (Sección 2)
├── Título: "¿Por qué elegir SAHANA?"
├── 3 cards:
│   1. Icono (calidad) + "Calidad Comprobada" + texto 80 chars
│   2. Icono (reloj) + "Cumplimiento Seguro" + texto 80 chars
│   3. Icono (manos) + "Responsabilidad Total" + texto 80 chars
└── Fondo: Blanco o gris muy claro

PRODUCTOS DESTACADOS (Sección 3)
├── Título: "Nuestros Productos"
├── Grid 3-4 columnas (mobile: 1 columna)
│   ├── Imagen del producto (400x300px WEBP)
│   ├── Nombre corto
│   ├── 1-2 líneas descripción
│   ├── Botón: "Ver detalles" → enlaza a /productos/[slug]/
│   └── Badge: "Stock disponible" o "Bajo demanda"
└── Botón al final: "Ver todos →"

TESTIMONIOS O LOGROS (Sección 4) - OPCIONAL FASE 1
├── "Desde 2000 sirviendo a..."
├── 3 números destacados:
│   - "1000+ pedidos entregados"
│   - "300+ clientes satisfechos"
│   - "20+ años de experiencia"
└── Imagen con equipo de fondo (desaturada)

CALL TO ACTION PRINCIPAL (Sección 5)
├── Fondo de color (verde SAHANA o azul empresa)
├── Título grande: "¿Necesitas madera de calidad?"
├── Descripción: "Llamamos en 24 horas. Presupuesto sin compromiso."
├── Input de teléfono: "Ingresa tu número"
├── Botón: "SOLICITAR PRESUPUESTO"
└── Alternativa: "O escribe en WhatsApp" → link a wa.me

FOOTER
├── Logo + "Desde 2000"
├── Secciones: Productos (links) | Empresa | Contacto | Legal
├── Teléfono: +54 9 3442 40-5400
├── Email: contacto@sahana.com.ar
├── Direccion: Ruta 14 Km 222, Pedernal, E.Ríos
├── Horarios: Lun-Vie 7:00-12:00 y 14:00-18:00
├── Links sociales: Instagram | Facebook | LinkedIn (cuando activos)
├── Copyright + "Desenvolvido por [Nombre]"
└── Cookies banner (simple)
```

**SEO (Home):**
- Title: "SAHANA SRL | Aserradero de Eucalipto en Entre Ríos"
- Meta description: "Madera de calidad A. Tablas secas y verdes, tableros, revestimientos. Entregas a todo el país. Consulta sin compromiso."
- H1: "Eucalipto de Calidad Comprobada"
- Schema: Organization + LocalBusiness

---

### 2. PÁGINA DE PRODUCTO (Template Dinámico)

**URL estructura:** `/productos/[slug-del-producto]/`

**Contenido dinámico (datos en JSON o base de datos simple):**

```json
{
  "slug": "tablas-eucalipto-verdes",
  "nombre": "Tablas Verdes de Eucalipto",
  "categoria": "Maderas Base",
  "imagen_hero": "tablas-verdes-hero.webp",
  "descripcion_corta": "Eucalipto verde recién aserrado. Ideal para galpones, estructuras temporales, palets.",
  "descripcion_larga": "[HTML con párrafos]",
  "especificaciones": {
    "tipos_disponibles": ["25x75mm", "38x75mm", "50x75mm"],
    "unidad_venta": "Pie",
    "stock": "disponible",
    "humedad": "Verde (sin secar)",
    "certificacion": "N/A"
  },
  "usos": [
    "Galpones de pollos",
    "Estructuras ganaderas",
    "Encofrados",
    "Pallets de construcción"
  ],
  "imagenes": ["foto1.webp", "foto2.webp", "foto3.webp"],
  "cta_texto": "Solicitar Presupuesto",
  "seo_title": "Tabla Verde Eucalipto - Medidas y Precios | SAHANA",
  "seo_description": "Tabla verde de eucalipto de calidad A. 25x75mm a 50x75mm. Stock disponible. Entregas a todo el país.",
  "keywords": ["tabla verde", "eucalipto", "aserradero", "precio"]
}
```

**Estructura visual página producto:**

```
HEADER (igual que home)

BREADCRUMB
├── Inicio > Productos > Tablas Verdes

HERO
├── Imagen grande (800x500px) con opción de zoom/galería
├── Galería thumbnails lateral (3 imágenes)

CONTENIDO PRINCIPAL (2 columnas en desktop, 1 en mobile)

COLUMNA IZQUIERDA (70%)
├── H1: "Tablas Verdes de Eucalipto"
├── Párrafo intro (150 caracteres máximo)
├── Sección: "Especificaciones"
│   ├── Tabla con: Medidas | Unidad | Humedad | Estado
│   └── Nota: "Consultar otras medidas"
├── Sección: "Ideal para"
│   └── Listado de 4-6 usos con iconos
├── Sección: "Descripción completa"
│   └── Párrafos + fotos incrustadas
└── Sección: "¿Cómo compramos aquí?"
    ├── Paso 1: Consulta medidas disponibles
    ├── Paso 2: Recibe presupuesto en 24hs
    ├── Paso 3: Coordina envío
    └── Paso 4: ¡Listo!

COLUMNA DERECHA (30%) - CONVERSIÓN
├── Box "Solicitar Presupuesto" (sticky en scroll)
│   ├── Título: "¿Quieres este producto?"
│   ├── Precio: "Consultar" (botón)
│   ├── Botón grande: "SOLICITAR PRESUPUESTO"
│   ├── O alternativa: "WHATSAPP" (verde)
│   └── Nota pequeña: "Respuesta en máximo 24hs"
├── Contacto rápido:
│   ├── Teléfono: +54 9 3442 40-5400
│   ├── Email: contacto@sahana.com.ar
│   └── Horarios (siempre visibles)
└── Trust signals:
    ├── "Desde 2000"
    ├── "Certificado X"
    └── "3★★★★★ Google"

PRODUCTOS RELACIONADOS (Sección 6)
├── "También te puede interesar"
├── Grid 3 productos similares
└── Botón: "Ver más productos"

FOOTER
```

**SEO página producto:**
- Title: "[Producto] - Precios y Medidas | SAHANA"
- H1: Nombre del producto
- H2: Cada sección importante
- Schema: Product + Offer (si tienen precios)
- Alt text: Todas las imágenes

---

### 3. PÁGINA "SOBRE NOSOTROS"

**Contenido:**

```
HERO
├── Título: "Nuestra Historia"
├── Texto: "Desde 2000 transformamos eucalipto en madera de calidad"
└── Imagen: Planta o equipo antiguo/actual (comparación)

HISTORIA (Sección 1)
├── Párrafo principal: 200-300 palabras
├── Puntos clave:
│   - Año fundación (2000)
│   - Evolución: Servicios forestales → Aserradero
│   - Crecimiento
│   - Hitos importantes
└── 1-2 fotos históricas (si existen)

VALORES (Sección 2)
├── 3-4 cards:
│   1. Calidad: "Verificamos cada tabla"
│   2. Responsabilidad: "Compromisos cumplidos"
│   3. Eficiencia: "Procesos modernos"
│   4. Sostenibilidad: "Eucalipto certificado" (si aplica)

EQUIPO (Sección 3) - OPCIONAL
├── Pueden ser fotos anónimas (planta) o personas (si aceptan)
├── "Conoce nuestro equipo"
├── 3-4 fotos con nombres y roles clave

NUESTROS CLIENTES (Sección 4) - OPCIONAL
├── Logos de 5-6 clientes importantes (SIN identificarlos por nombre)
├── Texto: "Confían en nosotros"

PROCESO (Sección 5)
├── Infografía simple (4-5 pasos):
│   1. Seleccionar (eucalipto premium)
│   2. Aserrar (maquinaria moderna)
│   3. Secar (control de humedad)
│   4. Clasificar (control de calidad)
│   5. Entregar (logística confiable)

CTA
├── "¿Necesitas madera de calidad?"
├── Botón: "Solicitar Presupuesto"

SEO:
- Title: "Nosotros | SAHANA SRL - Aserradero desde 2000"
- Meta: "Conoce la historia de SAHANA. Más de 20 años transformando eucalipto..."
- H1: "Nuestra Historia"
```

---

### 4. PÁGINA CONTACTO

**Estructura:**

```
HERO
├── Título: "Contactanos"
├── Subtítulo: "Presupuestos sin compromiso. Respuesta en 24 horas."

CONTENIDO (2 columnas: desktop, 1 mobile)

COLUMNA 1: FORMULARIO (60%)
├── Título: "Solicita tu Presupuesto"
├── Campos:
│   1. Nombre completo (required, text)
│   2. Email (required, email) 
│   3. Teléfono (required, tel, +54 formato)
│   4. Empresa (optional, text)
│   5. Producto de interés (required, select)
│      - Tablas verdes
│      - Tablas secas
│      - Tableros
│      - [resto]
│      - Otro (especificar)
│   6. Descripción (required, textarea)
│      Placeholder: "Escribe qué necesitas. Ej: 5000 pies de tabla verde 25x75..."
│   7. Medidas específicas (optional, text)
│   8. Cantidad (optional, text)
│   9. Checkbox: "He leído y acepto los términos"
│   10. Checkbox: "Deseo recibir info de productos"
├── Botón: "ENVIAR PRESUPUESTO"
├── Nota: "Alguien del equipo te contactará en máximo 24 horas"
└── Loading state + Success message

COLUMNA 2: CONTACTO DIRECTO (40%)
├── Título: "Contacto Directo"
├── Teléfono (con link tel:)
│   Comercial: +54 9 3442 40-5400
├── WhatsApp (botón verde directo a wa.me)
├── Email: contacto@sahana.com.ar
├── Horarios:
│   Lun-Vie: 7:00-12:00 y 14:00-18:00
│   Sab-Dom: Cerrado
├── Ubicación:
│   Ruta 14 Km 222, Pedernal, E.Ríos, Argentina
├── Mapa (embebido Google Maps con pin)
│   - Mostrar ubicación exacta
│   - Indicar RN 14
│   - Distancia desde AMBA (~600km)

FOOTER

SEO:
- Title: "Contactanos | SAHANA SRL - Aserradero"
- Meta: "Solicita presupuesto sin compromiso. Teléfono, WhatsApp, email."
```

**Funcionalidad Formulario:**
- Validación frontend: emails, teléfono formato argentino
- Mensaje de éxito: "Gracias. Alguien te contactará pronto."
- Envío backend a: contacto@sahana.com.ar + CC dueño
- Guardar en base de datos simple (CSV o JSON)
- Email automático al cliente: "Recibimos tu consulta"
- Integración con Google Analytics (event tracking)

---

### 5. PÁGINA BLOG (FASE 2 - No necesario ahora)

**Estructura:**

```
/blog/
├── Listado de posts (paginado, 6 por página)
├── Buscador
└── Categorías

/blog/[slug-del-post]/
├── Título (H1)
├── Fecha, autor, categoría
├── Imagen destacada
├── Contenido (markdown convertido a HTML)
├── Tabla de contenidos (si post > 800 palabras)
├── Relacionados al final
```

**Para después, no urgente.**

---

## IV. ESPECIFICACIONES TÉCNICAS

### Stack Recomendado

**Opción 1 (Simple, rápido):**
- Next.js 14 + React
- Tailwind CSS
- PostgreSQL o Supabase (libre)
- Vercel (hosting, deploy automático)
- SendGrid o Brevo (emails transaccionales)

**Opción 2 (Más control):**
- React + Node.js
- Express
- MongoDB o PostgreSQL
- Netlify o Heroku (hosting)

**Opción 3 (Ultrasimple):**
- HTML/CSS/JS vanilla + Formspree (formularios)
- Hosting: Netlify gratis
- Manejo: Archivo JSON para productos

**RECOMENDACIÓN:** Opción 1 (Next.js). Es rápido, escalable, y fácil de mantener.

### Velocidad y Performance

**Targets (Google PageSpeed):**
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

**Checklist:**
- ✅ Imágenes optimizadas WEBP (máx 100KB)
- ✅ Lazy loading en imágenes bajo el fold
- ✅ Minify CSS/JS
- ✅ Compresión gzip
- ✅ CDN para assets
- ✅ Caché de navegador (1 mes)
- ✅ No más de 3 scripts externos
- ✅ Fonts: 1-2 máximo (Google Fonts, preload)

### Mobile-First

- ✅ Diseño responsive desde 320px
- ✅ Touch targets mínimo 44x44px
- ✅ Viewport meta tag
- ✅ Menú hamburguesa en mobile
- ✅ Botones CTA grandes en mobile
- ✅ Textos legibles (mínimo 16px)

### Accesibilidad (WCAG AA)

- ✅ Alt text en todas las imágenes
- ✅ Contraste texto/fondo (4.5:1 mínimo)
- ✅ Headings en orden (H1, H2, H3...)
- ✅ Formularios con labels
- ✅ Link text descriptivo
- ✅ ARIA labels donde sea necesario

---

## V. DATOS Y CONTENIDO

### Colores de Marca

```
Color Primario: Verde SAHANA (o azul)
  - Hex: #2D5016 (verde oscuro, sugerencia)
  - Uso: Botones, headings principales, hover

Color Secundario:
  - Hex: #8B7355 (madera, sugerencia)
  - Uso: Acentos, borders

Neutros:
  - Texto: #1F2937 (gris oscuro)
  - Fondo secundario: #F9FAFB (gris muy claro)
  - Borders: #E5E7EB (gris claro)

White: #FFFFFF
```

### Tipografía

- Headings: 1 fuente moderna (Inter, Poppins, Playfair Display)
- Body: 1 fuente legible (Inter, Open Sans, Roboto)
- Sizes:
  - H1: 48px (desktop), 32px (mobile)
  - H2: 36px (desktop), 24px (mobile)
  - H3: 24px, 20px
  - Body: 16px / 1.6 line-height

### Imágenes Necesarias

**Dimensiones optimizadas (usar WEBP):**

| Sección | Dimensión | Cantidad | Formato |
|---------|-----------|----------|---------|
| Hero | 1920x600px | 1 | WEBP + JPG fallback |
| Productos home | 400x300px | 4-6 | WEBP |
| Producto detail | 800x600px | 3-5 | WEBP |
| Sobre nosotros | 800x600px | 3-4 | WEBP |
| Footer logo | 200x50px | 1 | PNG |

**Tienen fotos profesionales:** Usar contenido de Haro Studio

---

## VI. FUNCIONALIDADES CRÍTICAS

### 1. Formulario de Presupuesto

**Validaciones:**
- Nombre: Mínimo 3 caracteres
- Email: Validar RFC completo
- Teléfono: Validar +54 9 XXXX-XXXXXX
- Descripción: Mínimo 10 caracteres

**Envío:**
```
Para: contacto@sahana.com.ar
Asunto: "Nueva consulta - [Nombre cliente]"
CC: Dueño (si tiene email)
Respuesta automática al cliente: "Gracias, te contactaremos en 24hs"
Guardar en DB: Nombre, Email, Teléfono, Empresa, Producto, Descripción, Fecha
```

### 2. WhatsApp Flotante

**Elemento:**
```html
Icono WhatsApp en esquina inferior derecha (fixed)
Click → Abre: https://wa.me/5493442405400?text=Hola%20SAHANA,%20quisiera%20consultar%20sobre...
```

### 3. Google Analytics

**Implementar:**
```
gtag.config('GA_ID');
Eventos a trackear:
  - Hacer click en "Solicitar Presupuesto"
  - Enviar formulario (success/error)
  - Hacer click en teléfono
  - Hacer click en WhatsApp
  - Hacer click en producto (ver más)
  - Scroll hasta CTA principal
```

### 4. Google Business Profile Integration

**Mostrar en footer:**
- Rating de Google (dinámico si es posible, sino estático)
- Link a perfil Google
- "Ver reseñas en Google"

---

## VII. SEO TÉCNICO

### Meta Tags Obligatorios

**Home:**
```html
<title>SAHANA SRL | Aserradero de Eucalipto en Entre Ríos</title>
<meta name="description" content="Madera de calidad A. Tablas secas y verdes, tableros, revestimientos. Entregas a todo el país. Consulta sin compromiso.">
<meta name="keywords" content="aserradero, eucalipto, tabla, Entre Ríos">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#2D5016">
<link rel="canonical" href="https://sahana.com.ar/">
```

### Schema.org (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SAHANA SRL",
  "url": "https://sahana.com.ar",
  "logo": "https://sahana.com.ar/logo.webp",
  "description": "Aserradero de eucalipto desde 2000",
  "foundingDate": "2000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ruta 14 Km 222",
    "addressLocality": "Pedernal",
    "addressRegion": "Entre Ríos",
    "postalCode": "E3203",
    "addressCountry": "AR"
  },
  "telephone": "+549-3442-40-5400",
  "email": "contacto@sahana.com.ar",
  "sameAs": [
    "https://instagram.com/",
    "https://facebook.com/"
  ]
}
```

### Sitemap XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sahana.com.ar/</loc>
    <lastmod>2024-02-15</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://sahana.com.ar/productos/</loc>
    <lastmod>2024-02-15</lastmod>
    <priority>0.8</priority>
  </url>
  [...]
</urlset>
```

### robots.txt

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /private

Sitemap: https://sahana.com.ar/sitemap.xml
```

---

## VIII. CHECKLIST ANTES DE LANZAR

### Funcional
- ✅ Formulario de contacto envía emails
- ✅ WhatsApp flotante abre chat
- ✅ Links internos funcionan (no 404s)
- ✅ Links externos abren en nueva pestaña
- ✅ Búsqueda en Google Maps funciona
- ✅ Galería de imágenes funciona
- ✅ Mobile view: botones grandes y clickeables

### Performance
- ✅ Página home carga en < 3 segundos
- ✅ Imágenes optimizadas (< 100KB cada una)
- ✅ Lazy loading implementado
- ✅ CSS/JS minificados
- ✅ Google PageSpeed: Mínimo 75/100 en mobile

### SEO
- ✅ Title y Meta description en todas las páginas
- ✅ H1 único por página
- ✅ Alt text en imágenes
- ✅ Sitemap.xml existe
- ✅ robots.txt configurado
- ✅ Schema.org implementado
- ✅ Canonical tags correctos

### Seguridad
- ✅ HTTPS activado
- ✅ Formulario protegido contra spam (reCAPTCHA o similar)
- ✅ Emails verificados
- ✅ No hay datos sensibles en código

### Accesibilidad
- ✅ Contraste texto/fondo adecuado
- ✅ Menú navegable con keyboard
- ✅ Alt text descriptivo
- ✅ Headings en orden

---

## IX. POST-LANZAMIENTO

### Integraciones que haremos después
1. **Google Business Profile:** Vinculación automática
2. **Google Analytics 4:** Tracking de eventos
3. **Búsqueda Google:** Enviar sitemap, pedir indexación
4. **Email marketing:** Secuencia de bienvenida (newsletter)

### Mantenimiento
- Actualizar stock de productos (1x semana)
- Publicar blog posts (2-3/mes en Fase 2)
- Responder consultas (24hs máximo)
- Revisar Google Analytics (1x mes)

---

## X. PREGUNTAS ANTES DE EMPEZAR

1. ¿Qué dominio usamos? → **sahana.com.ar** (revisar que esté disponible y renovado)
2. ¿Hosting? → **Recomiendo: Vercel (Next.js) o Netlify (estático)**
3. ¿Base de datos?** → Consultas guardadas en JSON o PostgreSQL simple
4. ¿Email sender?** → SendGrid gratis ($15/1000 emails) o Brevo (25 free/día)
5. ¿Presupuesto de desarrollo?** → Realista si es tu esposo (tiempo). Sino $2-3k USD
6. ¿Cómo mantenemos contenido?** → Panel admin simple o modificar archivos JSON

---

## RESUMEN PARA EL PROGRAMADOR

> "Necesitamos una web que funcione como herramienta de venta B2B, no solo catálogo. Focus: formulario de presupuesto claro, Google indexable, rápido en mobile, y que guarde datos de clientes. Tech: Next.js recomendado. Timeline: 2-3 semanas. Pausa: debo hacer preguntas del punto X antes de tirar código."

---

**Documento validado por:** Estrategia Digital + SEO
**Última actualización:** Febrero 2025
**Revisar antes de codear:** Responder sección X
