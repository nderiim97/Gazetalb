# GazetaLB - Gazeta Shqipe 🇦🇱

Platform i kompletë për një gazetë në gjuhën shqipe me mundësi administrimi dhe publikimi të artikujve.

## Karakteristikat Kryesore

- ✅ **Autentifikimi me Google** - Login si admin
- ✅ **Dashboard Administrimi** - Menaxhim i plotë i artikujve
- ✅ **Rubrikat e Ndara** - Lajme, Sport, Ekonomi
- ✅ **Publikim i Artikujve** - Interface e lehtë për të publikuar
- ✅ **Responsive Design** - Punon në celular, tablet, desktop
- ✅ **Database** - Ruajtje e sigurt e të dhënave

## Struktura e Projektit

```
Gazetalb/
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── components/     # Komponenta React
│   │   ├── pages/          # Faqet kryesore
│   │   ├── admin/          # Dashboard administrimi
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                 # Backend (Node.js)
│   ├── routes/             # API endpoints
│   ├── models/             # Database models
│   ├── middleware/         # Authentication
│   ├── server.js
│   └── package.json
└── README.md
```

## Setup & Instalimi

### Përsiata
- Node.js 16+
- npm ose yarn
- Git

### Hapat e Instalimit

1. **Clone repo**
```bash
git clone https://github.com/nderiim97/Gazetalb.git
cd Gazetalb
```

2. **Instalo dependencies**
```bash
npm install
```

3. **Setup .env files**
```bash
# server/.env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
DATABASE_URL=your_database_url
PORT=5000
JWT_SECRET=your_jwt_secret

# client/.env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_API_URL=http://localhost:5000
```

4. **Nis aplikacionin**
```bash
npm run dev
```

## Rubrikat (Kategorit)

- 📰 **Lajme** - Lajmet e përditshme
- ⚽ **Sport** - Njoftime sportive
- 💼 **Ekonomi** - Lajme ekonomike

## Teknologjia

**Frontend:**
- React 18
- React Router
- Tailwind CSS
- Google OAuth 2.0
- Axios

**Backend:**
- Node.js
- Express
- MongoDB
- JWT Authentication
- Google OAuth 2.0

## Licensa

MIT License
