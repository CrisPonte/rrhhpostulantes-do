# 🚀 mi-proyecto  
Bootstrap con GSD + Anti-Chaotic (selectivo) en Antigravity IDE  
Windows 10 Setup

---

## 📌 Objetivo

Este proyecto está configurado para trabajar en Antigravity IDE utilizando:

- ✅ Get Shit Done for Antigravity (GSD) como sistema base (spec-driven workflow).
- ✅ Anti-Chaotic como complemento (skills y workflows seleccionados).
- ❌ No se mezclan ambos completos para evitar conflictos.

---

## 🧠 Filosofía

| Rol | Sistema |
|------|----------|
| Base metodológica | GSD |
| Workflows extra | Anti-Chaotic (selectivo) |
| Reglas principales | PROJECT_RULES.md (GSD) |
| QA / Debug / Docs | Workflows Anti-Chaotic |

---

## 🖥 Requisitos

- Git
- Node.js
- Antigravity IDE

Verificar:

```
git --version
node --version
npm --version
npx --version
```

---

## 🧭 Flujo Principal (GSD)

```
/new-project
/plan 1
/execute 1
/verify 1
```

---

## 🔧 Workflows Complementarios

| Situación | Comando |
|------------|----------|
| Bug complejo | /ac-debug |
| Generar tests | /ac-gen-tests |
| Documentación | /ac-documentation |

---

## 🏁 Commit inicial

```
git add .
git commit -m "bootstrap: GSD base + Anti-Chaotic selective"
```

---

## 🔎 Referencias

GSD:
https://github.com/toonight/get-shit-done-for-antigravity

Anti-Chaotic:
https://github.com/kienhaminh/anti-chaotic


## Configuración inicial en nuevo servidor

1. Clonar el repositorio
2. Crear archivo .env en la raíz con:

APP_UID=$(id -u ubuntu) incluir el número
APP_GID=$(id -g ubuntu) incluir el número
PORT=5000 (puerto de la api)
DOMAIN=...rrhhpostulantes.duckdns.org
LETSENCRYPT_EMAIL=...pepe@gmail.com

3. Ejecutar:

docker compose up -d --build