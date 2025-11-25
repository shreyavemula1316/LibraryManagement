# Library Management

A small Library Management System project containing a Node.js/Express backend API for managing books, users, loans, and reservations.

This repository currently contains the backend service in the `backend/` folder. The backend implements:

- User and admin authentication (JWT in HTTP-only cookies)
- Book catalog CRUD
- Loan issuance and returns (with fine calculation)
- Reservation queue with prioritized fulfillment
- Role-based protected routes for admins and staff

For detailed documentation of the API, setup, environment variables and examples, see:

  backend/README.md

Quick start (backend)

1. Open a terminal and change into the backend folder:

```powershell
cd "c:\Users\shrey\Documents\weekly projects\Library Management System\backend"
```

2. Install dependencies:

```powershell
npm install
```

3. Copy `.env.example` to `.env` and set required values (MongoDB URI, JWT secret):

```powershell
copy .env.example .env
# then edit .env
```

4. Start the backend:

```powershell
npm start
```

The backend server listens on the port set in `.env` (default 5000). See `backend/README.md` for full API documentation, endpoint examples, and advanced notes.

Repository layout (high level)

```
Library Management/
├── backend/         # Node.js Express API (main project)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── validations/
│   ├── utils/
│   └── README.md    # Detailed backend docs
├── .gitignore       # workspace-level ignores
└── README.md        # (this file)
```

Contributing

If you plan to contribute, please:

- Run the API locally and exercise the endpoints listed in `backend/README.md`.
- Open issues for bugs or feature requests.
- Send a PR with a clear description and tests where possible.

License

ISC

---
