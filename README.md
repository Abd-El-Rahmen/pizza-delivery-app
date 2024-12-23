# Pizza Delivery App

This is a full-stack **Pizza Delivery Application** built with **React**, **Tailwind CSS**, **Redux**, **Express (Node.js)**, and **MongoDB**. The project provides a complete pizza delivery experience, including user authentication, order management, cart system, and an admin dashboard for managing orders and pizza items.

## Technologies Used

- **Frontend:**
  - **React**: JavaScript library for building dynamic and responsive user interfaces.
  - **Tailwind CSS**: A utility-first CSS framework for rapid UI design.
  - **Redux**: A state management library for managing global state, especially for the cart and user authentication.
  
- **Backend:**
  - **Express (Node.js)**: A minimal and flexible Node.js framework for handling server-side logic and APIs.
  
- **Database:**
  - **MongoDB**: A NoSQL database used to store user, pizza, and order information.

## Pages and Views

### Authentication:
1. **Login Page**: Users can log in with their registered credentials (email and password).
2. **Register Page**: New users can sign up by providing their details such as email and password.

### User Views:
1. **Home Page**: The landing page showcasing featured pizzas, deals, and promotions.
2. **Pizza Listing Page**: Users can browse available pizzas and add them to their cart.
3. **Cart Page**: A page where users can view and manage their cart items, including quantity changes and item removal.
4. **Checkout Page**: Users review their order, input delivery details, and confirm the purchase.
5. **Order Confirmation Page**: Users can view their order status and confirmation details.

### Admin Panel:
1. **Admin Dashboard**: The main page where the admin can overview key metrics such as total orders, active users, etc.
2. **Orders Management**: Admins can view all placed orders, mark them as processed, or delete them.
3. **Pizza Management**: Admins can manage pizzas (Add, Edit, Delete pizza items).
4. **User Management**: Admins can view and manage registered users, including banning or editing their information.

## Features

- **User Authentication**: Users can register, log in, and manage their account details.
- **Cart System**: Users can add pizzas to the cart, modify quantities, and remove items before checkout.
- **Order Management**: Admins can track and manage customer orders (view, process, delete).
- **Pizza Management**: Admins can manage pizza items, including adding new pizzas, updating existing ones, or removing them from the menu.
- **Order Confirmation**: After placing an order, users receive a confirmation page with their order details.
- **Admin Dashboard**: Admins can oversee the order and pizza status, and manage users and orders efficiently.
- **Mobile-Responsive**: The application is fully responsive and optimized for mobile devices using Tailwind CSS.

## Setup Instructions

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use a cloud database like MongoDB Atlas)

### Running the Application Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pizza-delivery-app.git
   cd pizza-delivery-app
