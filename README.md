# InterviewGPT

InterviewGPT is an AI-driven interview assistant that helps users prepare for job interviews by generating questions based on job descriptions and analyzing responses. This application uses Express.js for the backend, Next.js for the frontend, MongoDB for data storage, and integrates with the Gemini AI API for generating questions and analyzing answers.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- Generate interview questions based on a given job description.
- Record audio responses using the microphone.
- Transcribe audio responses to text.
- Analyze transcribed responses to provide feedback.
- Save and retrieve interview sessions from a MongoDB database.
- Google OAuth for user authentication.

## Tech Stack
- **Frontend:** Next.js
- **Backend:** Express.js
- **Database:** MongoDB
- **AI Integration:** Gemini AI API for question generation and response analysis
- **Authentication:** Google OAuth

## Installation

### Prerequisites
- Node.js
- MongoDB
- Gemini AI API key
- Google OAuth credentials

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/shaikhazrath/InterviewGPT-Gemini
   ```

2. **Install dependencies for the server:**
   ```bash
   cd server
   npm install
   ```

3. **Install dependencies for the frontend:**
   ```bash
   cd ../interview-prep
   npm install
   ```

4. **Set up environment variables for the server:**
   Create a `.env` file in the `server` directory and add your credentials:
   ```env
   DB=
   GOOGLE_OAUTH=
   JWT_SEC=
   GEMINI_API=
   ```

5. **Set up environment variables for the frontend:**
   Create a `.env` file in the `interview-prep` directory and add your credentials:
   ```env
   NEXT_PUBLIC_API=
   NEXT_PUBLIC_GOOGLE_AUTH=
   ```

6. **Start the backend server:**
   ```bash
   cd ../server
   npm run dev
   ```

7. **Start the frontend server:**
   ```bash
   cd ../interview-prep
   npm run dev
   ```

## Usage
1. Open your browser and go to `http://localhost:3000`.
2. Sign in using Google OAuth.
3. Enter the job description in the provided form and click "Start Interview".
4. Answer the generated questions using your microphone.
5. The application will transcribe and analyze your responses, providing feedback.


## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
