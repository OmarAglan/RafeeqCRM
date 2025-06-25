### **ERP Front-End MVP: Detailed Plan**

#### **1. MVP Vision & Core Philosophy**

The goal of this MVP is **not** to build the entire ERP. The goal is to build a **rock-solid, scalable foundation** that validates our core architectural choices and delivers the first, essential user journey. Every decision should serve this principle: **"Build the skeleton, not just a single limb."**

#### **2. Core MVP Objectives**

By the end of this MVP, we must achieve the following:
1.  **Seamless Authentication:** A user can securely log in and out, and their session state is managed robustly across the app.
2.  **Validated Navigation:** The drawer-based navigation works flawlessly, providing a clear structure for future modules.
3.  **Core Feature Demonstration:** Implement **one** simple, read-only ERP feature to prove the entire data flow from API to user screen.
4.  **Architectural Proof:** Confirm that our state management, API layer, and component structure can support future complexity and add-on modules.

#### **3. Scope Definition: What's IN vs. What's OUT**

Clear boundaries are essential to prevent scope creep.

| ✅ **IN SCOPE (Must-Haves)**                                  | ❌ **OUT OF SCOPE (For V2+)**                                |
| :---------------------------------------------------------- | :-------------------------------------------------------- |
| **Authentication Flow** (Login, Logout, Session Persistence) | The actual paid add-on system (we will build the *foundation* for it) |
| **State Management** (Using Zustand or Redux Toolkit)      | Complex forms for creating or editing data (e.g., New Invoice) |
| **API Integration Layer** (A centralized `api.ts` service)  | Advanced user roles and permissions (all MVP users are the same) |
| **Navigation** (Drawer with Home & one feature screen)        | Offline capabilities and data synchronization            |
| **Theming** (Light/Dark mode support)                         | Push notifications and real-time alerts                  |
| **One Read-Only Module:** A "Client List" page.             | Full-text search and advanced data filtering             |
| **Basic Loading & Error States** (Spinners, error messages)   | Analytics, performance monitoring, or automated testing  |
| **Fully Responsive UI** for Web and Mobile                   | User profile editing or password change screens           |

#### **4. Phase-Based Execution Plan**

This breaks the work into manageable, sequential chunks.

**Phase 1: The Bedrock (Project Foundation & Architecture) - 1-2 Weeks**
*   **Goal:** Set up the non-UI skeleton of the app.
*   **Tasks:**
    1.  **Finalize Directory Structure:** Create a clean, scalable structure.
        *   `/api`: For the centralized Axios API client.
        *   `/components`: For globally shared, simple components (buttons, inputs).
        *   `/core`: For core app logic, state management setup, and auth services.
        *   `/features`: To house self-contained feature modules (our future add-ons). The "Clients" feature will be the first one here.
        *   `/navigation`: To hold any custom navigation logic.
        *   `/hooks`, `/constants`, etc.
    2.  **Implement State Management:** Choose and set up **Zustand**. It's simpler than Redux for an MVP but powerful enough to scale. Create the initial "stores" for user session (`sessionStore`) and for our first feature (`clientStore`).
    3.  **Build the API Client:** Create a service using `axios`. Configure it to:
        *   Use the base URL from an environment variable.
        *   Set up an **interceptor** that automatically adds the authentication token to every outgoing request. This is a critical pattern for scalability.
        *   Handle token refresh logic if necessary.

**Phase 2: The Gateway (Authentication Flow) - 1 Week**
*   **Goal:** Enable users to securely enter and exit the application.
*   **Tasks:**
    1.  **Connect UI to State:** Link the `login.tsx` screen to the `sessionStore`. On successful login from the API, store the user's data and auth token in Zustand.
    2.  **Implement Protected Routes:** This is the most crucial step. Configure the root navigator (`app/_layout.tsx`) to check the `sessionStore`.
        *   If a user token exists, show the `(tabs)` (Drawer) layout.
        *   If no token exists, redirect them immediately to the `/login` screen.
    3.  **Build the Logout Feature:** Create a button in the drawer that calls a `logout()` function in the `sessionStore`. This function should clear the token from storage and redirect the user back to the login screen.

**Phase 3: The Proof of Concept (First Feature: "Clients") - 2 Weeks**
*   **Goal:** Demonstrate a complete, end-to-end data flow for a real ERP feature.
*   **Tasks:**
    1.  **Create the Feature Module:** Inside `/features/clients/`, create the necessary files:
        *   `screens/ClientListScreen.tsx`
        *   `screens/ClientDetailScreen.tsx`
        *   `components/ClientListItem.tsx`
    2.  **Define API Endpoints:** In your `api.ts` service, add functions like `getClients()` and `getClientById(id)`.
    3.  **Connect State to API:** In your `clientStore`, create functions that call the API functions and store the results (the list of clients) and loading/error states.
    4.  **Build the UI:**
        *   **Client List:** The `ClientListScreen` will get its data from the `clientStore`. It will display a list of clients using the `ClientListItem` component. Tapping an item will navigate to the `ClientDetailScreen`.
        *   **Client Detail:** This screen will take a client ID from the route, fetch the specific client's data (if not already loaded), and display all their information.
    5.  **Integrate into Navigation:** Replace the "Dashboard" screen in the drawer navigator with this new "Clients" screen. Repurpose the "Home" screen to be a simple welcome dashboard.

**Phase 4: The Quality Gate (Polishing & Testing) - 1 Week**
*   **Goal:** Ensure the MVP is stable, usable, and professional.
*   **Tasks:**
    1.  **Implement Loading/Error States:** Go through every screen and ensure a loading spinner is shown while fetching data and a user-friendly error message is displayed if an API call fails.
    2.  **Responsiveness Check:** Rigorously test the layout on a small phone, a tablet, and a wide web browser. Fix all UI bugs.
    3.  **Code Cleanup:** Remove all `console.log` statements, add comments to complex logic, and ensure consistent formatting.
    4.  **Manual Test Plan:** Write and execute a simple QA checklist covering every feature. (e.g., "1. User can log in. 2. User is redirected on failed login...").

---