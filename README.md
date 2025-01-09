# Job Posting Application

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (version 14 or later)
- npm (version 6 or later)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MehmetUstek/jobposting.git
   cd jobposting
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Running the Application on Development

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To build the application for production, run:

```bash
npm run build
```

### Running the Production Build

After building the application, you can start the production server with:

```bash
npm start
```

### Testing

To run tests, if any are set up, use:

```bash
npm test
```

## Project Structure

- **`src/app`**: Contains the main application components and styles.
- **`src/modals`**: Contains TypeScript interfaces for data models.
- **`src/pages`**: Contains the Next.js pages, including API routes.
- **`src/pages/api`**: Contains API endpoints for fetching data.
- **`src/pages/dashboard.tsx`**: The main dashboard page for viewing freelancers.
- **`src/pages/portfolio.tsx`**: The portfolio page for viewing freelancer posts and comments.
