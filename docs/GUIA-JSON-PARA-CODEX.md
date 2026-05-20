# Guía JSON para Codex — MacizoDigital Presentaciones

Usá esta guía junto con la plantilla en `config/templates/presentation-template.json` para generar propuestas completas.

## Prompt sugerido para Codex

```
Completá presentation-template.json para el cliente [NOMBRE].
Industria: [RUBRO].
Proyecto: [descripción breve del alcance].
Moneda: USD.
Incluí métricas convincentes en book-section, 3 fases en roadmap,
ítems de pricing con totales correctos, y paleta acorde al rubro.
No modifiques el campo "version" (debe ser 2).
El "slug" debe ser kebab-case único (ej: acme-corp).
Iconos: solo nombres válidos de Lucide React (ver lista abajo).
Imágenes: rutas bajo /public/ o URLs https completas.
```

## Campos obligatorios (raíz)

| Campo | Regla |
|-------|-------|
| `slug` | kebab-case, minúsculas, único (`nombre-cliente`) |
| `version` | Siempre `2` |
| `agency` | `name`, `tagline`, `website`, `email` |
| `client` | `name`, `contact.name` |
| `meta` | `type`, `number`, `title`, `date`, `status`, `currency`, `language` |
| `screens` | Al menos 1 pantalla |

## meta.type

- `presupuesto` — cotización formal
- `propuesta` — propuesta comercial (más común)
- `informe` — informe o diagnóstico
- `estrategia` — plan estratégico

## meta.status

`borrador` · `enviado` · `aprobado` · `rechazado`

## Tipos de pantalla (`screens[].type`)

| Tipo | Cuándo usarlo |
|------|----------------|
| `book-section` | Narrativa visual con tarjetas (texto, imagen, métrica). Ideal para Presentación y La Solución. |
| `design-system` | Paleta, tipografías y principios de diseño. |
| `roadmap` | Fases del proyecto, tecnologías y requisitos del cliente. |
| `pricing` | Tabla de inversión, planes de pago y términos. |
| `closing` | Pantalla final con CTA. |
| `overview` | Resumen ejecutivo con objetivos (opcional si usás book-section). |
| `product` | Arquitectura y features del producto. |
| `mockups` | Galería de imágenes / portfolio visual. |

### Ocultar una pantalla

```json
"enabled": false
```

Si omitís `enabled`, la pantalla se muestra.

## book-section — tarjetas (`cards`)

| `type` | Campos clave |
|--------|----------------|
| `text` | `heading`, `body`; opcional: `eyebrow`, `bullets`, `accent`, `span` |
| `image` | `src`, `alt`; opcional: `badge`, `caption`, `detail`, `span` |
| `metric` | `value`, `label`; opcional: `icon`, `description`, `span` |
| `wireframe` | `src`, `alt`, `title`; opcional: `description`, `span` |

### Valores de `span` (ancho en grilla)

- `1x1` — cuarto de ancho
- `half` — mitad
- `2x1` — dos tercios
- `3x1` — ancho completo

## Iconos Lucide válidos

Usá el nombre exacto del ícono en PascalCase. Ejemplos frecuentes:

`Globe`, `Zap`, `Search`, `TrendingUp`, `MapPin`, `ShieldCheck`, `Smartphone`, `Target`, `Accessibility`, `LayoutDashboard`, `Check`, `Star`, `Users`, `Clock`, `Mail`, `Phone`

Lista completa: https://lucide.dev/icons/

## Imágenes

- Rutas locales: `/logos/cliente/archivo.png` (archivo en `public/logos/cliente/`)
- URLs externas: `https://...`
- Siempre incluir `alt` descriptivo

## pricing — coherencia de totales

- `subtotal` = suma de `items[].total`
- `total` = `subtotal` - `discount` (si hay descuento)
- Verificar que los números coincidan antes de subir

## Fechas

Formato ISO: `YYYY-MM-DD` (ej: `2026-05-20`)

## Referencia completa

Ver ejemplo real en `config/presentations/ciudad-oeste.json`.

## Checklist antes de subir al admin

- [ ] `slug` en kebab-case y coincide con el nombre del cliente
- [ ] `meta.number` y `meta.title` actualizados
- [ ] Totales de pricing coherentes
- [ ] Iconos existen en Lucide
- [ ] Rutas de imágenes válidas
- [ ] Al menos: presentación (book-section), roadmap, pricing, closing
- [ ] JSON válido (sin comas finales, comillas dobles)

## Qué NO incluir en el JSON

- **Código de acceso** — se genera automáticamente al publicar en el panel admin
- Comentarios (`//`) — JSON no los admite
- Campos inventados fuera del schema
