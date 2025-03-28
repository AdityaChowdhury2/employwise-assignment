# Assignment Groupware

A user management application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. This project demonstrates CRUD operations for managing users, including pagination, form handling, and API integration.

## Features

- **User Management**: Add, update, delete, and view users.
- **Pagination**: Efficiently navigate through large datasets.
- **Responsive Design**: Built with Tailwind CSS for a mobile-friendly UI.
- **API Integration**: Fetch and manipulate user data from a REST API.
- **Dark Mode Support**: Dynamic theming based on user preferences.

## Project Structure

.
├── .env # Environment variables
├── next.config.ts # Next.js configuration
├── .gitignore # Git ignore file
├── package.json # Project dependencies
├── postcss.config.mjs # PostCSS configuration
├── src/ # Source code
│ ├── app/ # Next.js app directory
│ │ ├── users/[page]/ # User management pages
│ │ └── globals.css # Global styles
│ ├── components/ # Reusable UI components
│ ├── interface/ # TypeScript interfaces
│ └── lib/ # API utilities
└── public/ # Static assets

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/assignment-groupware.git
   cd assignment-groupware
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```env
    NEXT_PUBLIC_API_URL=https://api.example.com
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.
