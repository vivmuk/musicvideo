# Venice Music Video Studio

An AI-powered cinematic video generation application using Venice AI.

## Features

- **Theme-to-Prompt**: Convert simple themes into detailed cinematic prompts using Venice AI's LLM.
- **Video Generation**: Queue video generation tasks with customizable parameters (model, aspect ratio, duration, resolution).
- **Real-time Monitoring**: Track the status of your video generation requests.
- **Media Gallery**: View and download your generated videos.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Lucide Icons, Axios.
- **Backend**: Node.js, Express, Axios.
- **AI API**: Venice AI (Chat & Video Generation).

## Prerequisites

- Node.js (v18 or higher)
- Venice AI API Key (Get one at [venice.ai](https://venice.ai))

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Music Video Creation"
   ```

2. **Install Dependencies**
   
   Install root dependencies (server):
   ```bash
   npm install
   ```

   Install client dependencies:
   ```bash
   cd client
   npm install
   cd ..
   ```

3. **Environment Variables**
   
   Create a `.env` file in the root directory based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Venice AI API Key:
   ```env
   VENICE_API_KEY=your_actual_api_key_here
   PORT=3001
   NODE_ENV=development
   ```

4. **Run the Application**

   **Development Mode:**
   
   Start the backend server:
   ```bash
   npm start
   ```
   
   In a new terminal, start the frontend:
   ```bash
   cd client
   npm run dev
   ```

   **Production Mode:**
   
   Build the frontend:
   ```bash
   cd client
   npm run build
   cd ..
   ```
   
   Start the server:
   ```bash
   NODE_ENV=production npm start
   ```

## Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t venice-video-studio .
   ```

2. **Run the container**
   ```bash
   docker run -p 3001:3001 --env-file .env venice-video-studio
   ```

## Project Structure

- `server.js`: Express server entry point.
- `routes/`: API routes for Venice AI integration.
- `middleware/`: Authentication and validation middleware.
- `client/`: React frontend application.
- `public/`: Static assets and redirect.

## License

MIT
