# GenAI-Powered Financial Assistant for Better Investing Decisions

[![License: CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](LICENSE)


## Project Overview

This project aims to develop a GenAI-powered financial assistant to empower individuals, especially in India, to make better investment decisions. Recognizing the low financial literacy levels and the growing number of new investors, this platform provides accessible financial guidance through conversational AI.  Our solution bridges the advice gap by offering personalized support, from answering basic investment questions to analyzing financial products and market data, all at a scale that manual methods cannot achieve.

**Key Features:**

*   **AI-Powered Financial Question Resolver:**  An AI chatbot acts as a financial teacher, answering user queries and providing educational insights.
*   **PDF Policy Risk Analyzer:**  Users can upload financial policy PDFs, and AI will analyze them to identify potential risks and unfavorable clauses.
*   **Budget Planner:**  A tool to track income and expenses, offering spending suggestions (optional, with privacy controls).
*   **Live Share Market Data & Analysis:** Real-time share market tracking, AI-driven analysis of specific shares based on user queries, and recommendations based on price and risk preferences.
*   **Financial Advice Section:**  Curated educational content and resources on investing.
*   **Data Analysis Dashboard:**  Visualizations and insights into share market data.
*   **User Authentication & Personalization:**  Login/Registration with financial literacy level assessment to tailor AI responses.

**Target Audience:**

Primarily aimed at new and existing investors in India with varying levels of financial literacy seeking guidance and tools to make informed investment decisions.

## Project Structure (Frontend - React)

The frontend of this project is built using React with Vite and Tailwind CSS. The codebase is structured to promote maintainability, scalability, and feature-based organization.

### **Architechture**

![Screenshot_19-3-2025_165332_www mermaidchart com](https://github.com/user-attachments/assets/1a71781a-c3fa-4f3c-ac39-d2e58d8b5c01)

```
src/
├── assets/
│   ├── images/
│   ├── icons/
│   └── styles/
│       └── index.css        # Global styles or imports
│       └── tailwind.css     # Tailwind directives (if needed to customize)
├── components/             # Reusable UI components (atoms, molecules, organisms)
│   ├── common/             # Very generic components (Buttons, Inputs, etc.)
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.module.css # Or Tailwind classes directly
│   │   ├── Input/
│   │   │   ├── Input.jsx
│   │   │   └── Input.module.css
│   │   └── ...
│   ├── layout/             # Layout components (Header, Footer, Navbar, etc.)
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.module.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.module.css
│   │   └── ...
│   └── ui/                 # More specific UI components (Cards, Modals, etc.)
│       ├── FinancialInfoCard/
│       │   ├── FinancialInfoCard.jsx
│       │   └── FinancialInfoCard.module.css
│       ├── ...
├── contexts/              # React Contexts for state management (if needed)
│   ├── AuthContext.js
│   └── ThemeContext.js
├── features/              # Feature-based folders (Pages and related components)
│   ├── auth/                # Login, Register features
│   │   ├── components/      # Auth-specific components
│   │   │   ├── LoginForm/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── LoginForm.module.css
│   │   │   └── RegisterForm/
│   │   │       ├── RegisterForm.jsx
│   │   │       └── RegisterForm.module.css
│   │   ├── pages/           # Auth pages
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   └── services/        # Auth related API calls/services
│   │       └── authService.js
│   ├── budgetPlanner/       # Budget Planner Feature
│   │   ├── components/
│   │   ├── pages/
│   │   │   └── BudgetPlannerPage.jsx
│   │   └── services/
│   ├── chatAI/             # Financial Question Resolver & Share Analysis Chat
│   │   ├── components/
│   │   │   ├── ChatInterface/
│   │   │   │   ├── ChatInterface.jsx
│   │   │   │   └── ChatInterface.module.css
│   │   │   ├── MessageBubble/
│   │   │   │   ├── MessageBubble.jsx
│   │   │   │   └── MessageBubble.module.css
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── FinancialQuestionResolverPage.jsx
│   │   │   └── ShareDataAnalysisPage.jsx
│   │   └── services/
│   │       └── aiChatService.js
│   ├── dataAnalysis/       # Live Share Tracking & Data Analysis
│   │   ├── components/
│   │   ├── pages/
│   │   │   └── LiveShareTrackingPage.jsx
│   │   └── services/
│   │       └── marketDataService.js
│   ├── pdfRiskAnalysis/     # PDF Risk Analysis Feature
│   │   ├── components/
│   │   │   ├── PDFUploadForm/
│   │   │   │   ├── PDFUploadForm.jsx
│   │   │   │   └── PDFUploadForm.module.css
│   │   │   ├── RiskAnalysisResults/
│   │   │   │   ├── RiskAnalysisResults.jsx
│   │   │   │   └── RiskAnalysisResults.module.css
│   │   │   └── ...
│   │   ├── pages/
│   │   │   └── PDFRiskAnalysisPage.jsx
│   │   └── services/
│   │       └── pdfAnalysisService.js
│   └── home/               # Home Page Feature
│       ├── components/
│       ├── pages/
│       │   └── HomePage.jsx
│       └── services/
├── hooks/                 # Custom React Hooks
│   └── useAuth.js
├── pages/                 # Top-level pages (if not feature-grouped, can be moved to features)
│   ├── AboutPage.jsx
│   ├── TermsAndConditionsPage.jsx
│   └── ...
├── routes/                # Routing configuration (if using React Router)
│   └── AppRoutes.jsx
├── services/              # Global API service or utilities (can be feature-specific too)
│   └── api.js             # General API client setup (e.g., using axios or fetch)
├── utils/                 # Utility functions (formatters, helpers, etc.)
│   └── helpers.js
├── App.jsx                # Main App component
├── index.css              # Global CSS (if needed beyond Tailwind)
├── index.html             # HTML entry point
└── main.jsx               # React entry point
```

## Setup Instructions

Follow these steps to set up the frontend project locally:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Ramharsh-aidev/Community-Project.git
    cd FinoAddWise
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

    This will start the Vite development server. Open your browser and navigate to the address shown in the console (usually `http://localhost:5173`).

## Naming Conventions

To maintain code consistency and readability, please adhere to the following naming conventions:

*   **Folders:** `lowercase`, `singular`, `kebab-case` (e.g., `components`, `user-profiles`, `pdf-risk-analysis`).
*   **Files:**
    *   **React Components:** `PascalCase` with `.jsx` extension (e.g., `LoginForm.jsx`, `FinancialInfoCard.jsx`).
    *   **React Hooks:** `camelCase` starting with `use` and `.js` extension (e.g., `useAuth.js`, `useFormValidation.js`).
    *   **Services/Utils:** `camelCase` with `.js` extension (e.g., `authService.js`, `helpers.js`).
    *   **Pages:** `PascalCase` followed by `Page` and `.jsx` extension (e.g., `HomePage.jsx`, `FinancialQuestionResolverPage.jsx`).
*   **Variables and Functions:** `camelCase` (e.g., `userName`, `handleSubmit`).
*   **CSS Class Names:** `kebab-case` (e.g., `main-header`, `submit-button`).
*   **Component File Structure:**  For each component, create a folder with the component name, containing:
    *   `ComponentName.jsx`: The main React component file.
    *   `ComponentName.module.css` (or similar):  CSS Modules file for component-specific styling (or use Tailwind CSS utility classes directly in JSX).

## Contributing Guidelines

We encourage contributions to this project! To ensure a smooth collaborative process, please follow these guidelines:

1.  **Branching:**
    *   Create a new branch for each feature, bug fix, or improvement. Use descriptive branch names: `feature/add-budget-planner`, `fix/login-form-validation`, `refactor/api-service`.
    *   Base your branch off the `main` branch.

    ```bash
    git checkout main
    git pull origin main
    git checkout -b feature/your-feature-name
    ```

2.  **Code Style:**
    *   Follow the established naming conventions (see above).
    *   Write clean, well-commented code.
    *   Use consistent formatting (Prettier is recommended - configure your editor for automatic formatting on save).
    *   Adhere to React best practices.

3.  **Commits:**
    *   Make small, focused commits.
    *   Write clear and concise commit messages. Use the imperative mood (e.g., "Add login form", not "Adding login form").
    *   Reference any relevant issue numbers in your commit messages (e.g., `Fix: Resolved issue #123 - Login form validation error`).

4.  **Pull Requests:**
    *   When your feature or fix is ready, create a pull request (PR) to merge your branch into the `main` branch.
    *   Provide a clear title and description for your PR, summarizing the changes and their purpose.
    *   Include screenshots or screen recordings if your PR introduces UI changes.
    *   Request reviews from team members.
    *   Be responsive to feedback and address review comments.

5.  **Communication:**
    *   Use [Project Communication Channel - e.g., Slack, Discord, etc.] for team communication, discussions, and updates.
    *   Clearly communicate your progress, any roadblocks you encounter, and your plans.

## License  
This project is licensed under the **CC BY-NC-SA 4.0 License**.  

You are free to:  
- **Share** — Copy and redistribute the material in any medium or format.  
- **Adapt** — Remix, transform, and build upon the material.  

**Under the following terms:**  
- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made.  
- **NonCommercial** — You may not use the material for commercial purposes.  
- **ShareAlike** — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.  

---
