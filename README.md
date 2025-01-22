# Full Stack Blog App

A dynamic and responsive blog application built with **Next.js** and **MongoDB**. This application features a robust backend for administrative tasks and an intuitive frontend for users to explore and interact with blog content.

---

## Features

### User Frontend
- **Explore Blogs**: Browse a collection of blogs sorted by categories or latest updates.
- **Search Functionality**: Search for blogs by keywords.
- **Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.
- **Comment System**: Engage with blogs by adding comments.

### Admin Backend
- **Dashboard**: Overview of blog stats such as total posts, comments, and active users.
- **Blog Management**: Create, update, delete, and publish blog posts.
- **Comment Moderation**: Review and manage user comments.
- **User Management**: View and manage registered users.

---

## Technologies Used

### Frontend
- **Next.js**: For server-side rendering and dynamic routing.
- **Tailwind CSS / CSS Modules**: For styling the application.

### Backend
- **MongoDB**: Database for storing blog posts, user data, and comments.
- **Mongoose**: ODM library for MongoDB.
- **Node.js**: Backend runtime environment.

### Additional Tools
- **JWT (JSON Web Tokens)**: For secure authentication.
- **Formik & Yup**: For form handling and validation.
- **React Query / SWR**: For data fetching and state management.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/blog-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd blog-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Access the application at `http://localhost:3000`.

---

## Folder Structure

```plaintext
blog-app/
|-- components/       # Reusable React components
|-- pages/            # Next.js pages (frontend and API routes)
|-- public/           # Static assets
|-- styles/           # Global and modular CSS
|-- utils/            # Utility functions and helpers
|-- models/           # Mongoose models
|-- middleware/       # Authentication and request handlers
|-- package.json      # Project dependencies and scripts
```

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **MongoDB Documentation**: [https://www.mongodb.com/docs](https://www.mongodb.com/docs)
- **Tailwind CSS Documentation**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
