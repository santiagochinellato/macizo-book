# MacizoDigital — Generador de Presentaciones

Sistema de presentaciones digitales (presupuestos, propuestas, informes) configuradas 100% desde JSON.

## Flujo de uso

1. **Codex** completa la plantilla en `config/templates/presentation-template.json` (ver `docs/GUIA-JSON-PARA-CODEX.md`).
2. **Admin** (`/admin`) — login con usuario/contraseña → arrastrar JSON → publicar.
3. **Cliente** recibe URL `/p/{slug}` + código de 6 caracteres → ingresa código → ve la presentación.

La raíz `/` no lista proyectos; solo muestra instrucciones de acceso privado.

## Variables de entorno

Copiá `.env.example` a `.env.local` y completá:

| Variable | Descripción |
|----------|-------------|
| `BLOB_READ_WRITE_TOKEN` | Token de Vercel Blob (Storage → Blob en el dashboard) |
| `ADMIN_USERNAME` | Usuario del panel admin |
| `ADMIN_PASSWORD` | Contraseña del panel admin |
| `SESSION_SECRET` | Secreto para cookies (mín. 16 chars). `openssl rand -base64 32` |

En Vercel, agregá las mismas variables en **Settings → Environment Variables**.

## Desarrollo local

```bash
npm install
cp .env.example .env.local
# Completar variables en .env.local
npm run dev
```

Sin `BLOB_READ_WRITE_TOKEN`, las presentaciones en `config/presentations/` siguen visibles en `/p/{slug}` **sin código** (útil para desarrollo).

Con Blob configurado, las presentaciones publicadas requieren código de acceso.

## Migrar JSON locales a Blob

```bash
npm run migrate:blob
```

Muestra URL y código de acceso por cada archivo migrado. Guardá los códigos de forma segura.

## Rutas

| Ruta | Acceso |
|------|--------|
| `/` | Público — landing sin listado |
| `/p/[slug]` | Código de acceso (si está en registry de Blob) |
| `/admin/login` | Login MacizoDigital |
| `/admin` | Lista de proyectos |
| `/admin/new` | Subir JSON |

## Estructura

- `config/templates/presentation-template.json` — plantilla para Codex
- `config/presentations/` — ejemplos locales / fallback dev
- `src/types/presentation.ts` — contrato TypeScript
- `src/lib/presentation-schema.ts` — validación Zod al publicar
- `src/lib/presentation-store.ts` — Vercel Blob + registry

## Deploy en Vercel

1. Conectar repo y crear store **Blob**.
2. Agregar variables de entorno.
3. Ejecutar `npm run migrate:blob` localmente (o subir desde `/admin/new`).
4. Compartir a cada cliente su URL y código.
