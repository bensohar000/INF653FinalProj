# INF653 Final Project — US States REST API

A Node.js REST API for US States data built with Express and MongoDB. Serves state data from a local JSON file and augments it with fun facts stored in a MongoDB Atlas database.

---

## Live Demo

https://inf653finalproj.onrender.com/

---

## Tech Stack

- Node.js
- Express 5
- MongoDB Atlas
- Mongoose
- dotenv

---

## Project Structure

```
INF653FinalProj/
├── config/
│   └── db.js               # MongoDB connection
├── controllers/
│   └── statesController.js # Route handler logic
├── middleware/
│   └── verifyState.js      # Validates :state URL parameter
├── model/
│   └── States.js           # Mongoose schema for fun facts
├── routes/
│   └── stateRoutes.js      # All /states routes
├── views/
│   ├── index.html          # Root HTML page
│   └── 404.html            # 404 error page
├── statesData.json         # Static US states data
├── .env                    # Environment variables (not committed)
├── .gitignore
├── package.json
└── server.js               # Entry point
```

---

## Getting Started

### Prerequisites

- Node.js installed
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the project root:
```
DATABASE_URI=mongodb+srv://your-user:your-pass@cluster0.xxxxx.mongodb.net/statesDB
PORT=3500
```

4. Start the server:
```bash
node server.js
```

The API will be running at `http://localhost:3500`

---

## API Endpoints

### GET Requests

| Endpoint | Description |
|---|---|
| `/states/` | Returns all 50 states data |
| `/states/?contig=true` | Returns contiguous states only (excludes AK and HI) |
| `/states/?contig=false` | Returns non-contiguous states only (AK and HI) |
| `/states/:state` | Returns data for a single state (ex: `/states/KS`) |
| `/states/:state/funfact` | Returns a random fun fact for the state |
| `/states/:state/capital` | Returns the state name and capital city |
| `/states/:state/nickname` | Returns the state name and nickname |
| `/states/:state/population` | Returns the state name and population |
| `/states/:state/admission` | Returns the state name and admission date |

### POST Requests

| Endpoint | Description |
|---|---|
| `/states/:state/funfact` | Adds one or more fun facts for a state |

Request body must include a `funfacts` array:
```json
{
  "funfacts": ["Fun fact one.", "Fun fact two."]
}
```

### PATCH Requests

| Endpoint | Description |
|---|---|
| `/states/:state/funfact` | Updates a specific fun fact by index |

Request body must include `index` (1-based) and `funfact`:
```json
{
  "index": 1,
  "funfact": "Updated fun fact text."
}
```

### DELETE Requests

| Endpoint | Description |
|---|---|
| `/states/:state/funfact` | Deletes a specific fun fact by index |

Request body must include `index` (1-based):
```json
{
  "index": 1
}
```

---

## Deployment

This project is deployed on [Render](https://render.com).

1. Push your code to GitHub (ensure `.env` is in `.gitignore`)
2. Create a new Render project and import from GitHub
3. Add your environment variables in Render under Settings → Environment Variables:
   - `DATABASE_URI`
   - `PORT`

---

## Author

Harrison Bensouda — INF653 Back End Web Development