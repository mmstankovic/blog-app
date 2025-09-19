# 📝 Blog App

A full-stack blog application built with React, featuring:

- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Client-side routing with React Router
- ✅ Image uploads directly to Cloudinary
- ✅ REST API powered by `json-server`, both locally and via Render.com

---

## 🚀 Getting Started (Local Development)

### 1. Install dependencies

```bash
npm install
```

### 2. Create a `.env` file

Copy the example environment file:

```bash
cp .env.example .env
```

Then update the `.env` file as needed. For local development, the default API endpoint is:

```env
REACT_APP_API_URL=http://localhost:5000
```

If you're using Cloudinary for image uploads, also include:

```env
REACT_APP_CLOUD_NAME=your_cloud_name
REACT_APP_UPLOAD_PRESET=your_upload_preset
```

> ⚠️ The `.env` file is ignored via `.gitignore` and should not be committed.

---

## 🧪 Run the local API server (`json-server`)

This app uses `json-server` as a mock backend. To start it:

```bash
npm run server
```

It will be available at:

```
http://localhost:5000
```

---

## 💻 Run the React development server

In another terminal tab or window:

```bash
npm start
```

The app will be available at:

```
http://localhost:3000
```

---

## 🖼️ Cloudinary Integration (Optional)

The app supports uploading images directly to Cloudinary from the browser.

### Steps:

1. Create a free account at [Cloudinary](https://cloudinary.com)
2. Go to **Settings > Upload > Upload presets**, and create a new preset
   - Name it (e.g., `blog_uploads`)
   - Set it to **unsigned**
3. Add the following variables to your `.env` file:

```env
REACT_APP_CLOUD_NAME=your_cloud_name
REACT_APP_UPLOAD_PRESET=your_upload_preset
```

> 🔄 Restart the React dev server after modifying `.env`.

---