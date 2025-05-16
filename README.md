# ⚡ LRU integrated ZipURL 

> A lightning-fast, minimalistic URL shortener powered by **Next.js (App Router)**, **Redis**, **MongoDB**, and styled with **shadcn/ui**.

---

## ✨ Features

- 🔗 **Instant URL Shortening** – create compact, shareable links in milliseconds  
- 🧠 **LRU Cache with Redis** – fastest access to the most recently used URLs  
- 💾 **Persistent Storage** with MongoDB  
- 🧼 **Beautiful UI** built using `shadcn/ui` and TailwindCSS  
- 📊 **Analytics Ready** – track clicks, expiry, and more (planned)  
- 🛡️ Secure & reliable with proper validations  

---

## 🚀 Tech Stack

| Layer          | Tech                                                |
|----------------|-----------------------------------------------------|
| Frontend       | [Next.js App Router](https://nextjs.org/docs/app), [shadcn/ui](https://ui.shadcn.com), TailwindCSS |
| Backend/API    | Next.js API Routes (in `app/api`), TypeScript       |
| Caching        | [Redis](https://redis.io/) with LRU logic           |
| Database       | [MongoDB](https://www.mongodb.com)                  |
| Auth (Optional)| NextAuth.js (if added)                               |

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/zipurl.git
cd zipurl
npm install
```

---

## 🛠️ Environment Setup

Create a `.env.local` file in the root and add:

```env
MONGODB_URI=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 🧪 Run Locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
├── src/
│   ├── app/           # Next.js App Router pages & API routes
│   ├── components/    # Reusable UI components (shadcn)
│   ├── lib/           # DB and Redis logic
│   ├── utils/         # Helpers like URL validation, ID generation
│   ├── styles/        # Tailwind config and global CSS
│   └── public/        # Static assets
```

---

## 📈 Roadmap

- [x] LRU caching with Redis  
- [x] Unique short URL generation  
- [x] Stylish shadcn UI  
- [ ] Analytics dashboard  
- [ ] URL expiration support  
- [ ] User accounts with history  

---

## 🧠 Behind the Name

**ZipURL** = _Zip it down to the essentials._  
It's fast. It's smart. It's short. Just like your new links.

---

## 🤝 Contributing

Contributions are welcome!  
Fork it, star it, and open a PR. Let’s make the fastest URL shortener better together.
