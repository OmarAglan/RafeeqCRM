### **AI-Driven Development Roadmap: Scalable ERP Front-End**

**How to Use This Roadmap:**
Present each "Task & Prompt" to your AI assistant sequentially. The "Context for AI" is crucial—include it in your prompt to give the AI the full picture, which will result in higher-quality, more relevant code and explanations. Do not skip steps.

---

### **Phase 0: The Blueprint (Project Foundation & Architecture)**

**Goal:** Establish a clean, professional, and scalable project structure that will support our long-term vision of a core system with modular add-ons.

**Context for AI:** We are laying the architectural foundation for a large ERP application. The priority is scalability and maintainability. Every file and folder should have a clear purpose. We are moving from a basic structure to one used in enterprise-grade applications.

---

#### **Task 0.1: Refactor Directory Structure**

**Context for AI:** The current directory structure is good for a starter project but will become messy. We need to create a more organized structure that separates concerns cleanly. `features` will house our future add-on modules. `core` will handle app-wide logic like authentication and state. `api` will centralize all communication with our backend.

**▶️ Prompt to AI:**
"Analyze my current React Native (Expo) project structure. Propose and create the boilerplate for a new, scalable directory structure with the following top-level folders in the root directory. Explain the purpose of each folder:
*   `/app` (Unchanged - for Expo Router routes)
*   `/api` (For the centralized API client)
*   `/assets` (Unchanged)
*   `/components` (For simple, globally reusable UI components like `StyledButton`, `Card`, etc.)
*   `/core` (For core application logic, services, and state management setup)
*   `/features` (To house self-contained feature modules, e.g., 'clients', 'inventory')
*   `/hooks` (For custom React hooks)
*   `/navigation` (For navigation-related components and hooks)
*   `/constants` & `/utils` (Unchanged)"

---

#### **Task 0.2: Implement Centralized API Client**

**Context for AI:** We must avoid scattering `fetch` or `axios` calls throughout the UI components. We need a single, centralized API client. This client will use Axios and be configured with an **interceptor**. The interceptor is a critical pattern that will automatically attach the user's authentication token to every outgoing request, keeping our feature code clean and secure.

**▶️ Prompt to AI:**
"Inside the new `/api` directory, create a file named `client.ts`. In this file, generate a robust API client using `axios`. The client must:
1.  Create an Axios instance with a placeholder `baseURL`.
2.  Include an **request interceptor** that looks for an authentication token from a state management solution (we will use Zustand later) and adds it to the request headers as a Bearer token (`Authorization: 'Bearer ${token}'`).
3.  Include a **response interceptor** for basic error handling.
4.  Export the configured Axios instance for use throughout the app."

---

#### **Task 0.3: Set Up State Management**

**Context for AI:** We need a centralized place to manage the application's state, such as the user's login status and data fetched from the API. We have chosen **Zustand** because it is lightweight, simple, and powerful enough for our ERP. We will create a `sessionStore` to handle all authentication-related state.

**▶️ Prompt to AI:**
"Inside the `/core/state` directory, create a file named `sessionStore.ts`. Generate the code for a Zustand store to manage user authentication. The store's initial state should include:
*   `token: null | string`
*   `user: null | object`
*   `status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated'`
The store must also include the following actions:
*   `login(credentials)`: A placeholder function that will eventually call our API. On success, it should set the token, user, and status.
*   `logout()`: A function that clears the token and user, setting the status to 'unauthenticated'.
*   `initialize()`: A function that will check for a token in secure storage to keep the user logged in between sessions."

---

### **Phase 1: The Gateway (Protected Routes & Authentication Flow)**

**Goal:** Secure the application by creating a robust authentication flow. Unauthorized users should never be able to see the main app screens.

**Context for AI:** We will now connect the architectural pieces from Phase 0 to our UI. The central piece of this phase is a custom hook, `useProtectedRoute`, which will act as a guard for our authenticated routes. This is the standard, most robust pattern for handling protected routes with Expo Router.

---

#### **Task 1.1: Create the Protected Route Hook**

**Context for AI:** Instead of putting conditional logic in our layout files, a custom hook is much cleaner and more reusable. This hook will check the authentication status from our `sessionStore` and use `expo-router`'s `useRouter` and `useSegments` to automatically redirect the user to the login screen if they are not authenticated.

**▶️ Prompt to AI:**
"Inside the `/navigation` directory, create a custom React hook named `useProtectedRoute.ts`. This hook should:
1.  Import and use our `sessionStore` from Zustand.
2.  Use a `useEffect` hook to monitor the `status` from the store.
3.  Get the current route using `useSegments` from `expo-router`.
4.  If the `status` is `'unauthenticated'` and the user is not already on the `/login` route, it should use `router.replace('/login')` to redirect them.
5.  If the `status` is `'authenticated'` and the user is on the `/login` route, it should redirect them to the main app screen (e.g., `/`)."

---

#### **Task 1.2: Integrate the Hook and Finalize Login**

**Context for AI:** Now we will apply our guard hook to the root layout to protect all routes within the `(tabs)` group. We will also update the login screen UI to use our `sessionStore` to perform the login action.

**▶️ Prompt to AI:**
"Make the following two modifications:
1.  In the root layout file, `app/_layout.tsx`, call the `useProtectedRoute()` hook at the top of the `RootLayout` component.
2.  Refactor `app/login.tsx`. When the 'Login' button is pressed, it should now call the `login()` action from our `sessionStore`. For this MVP, you can mock a successful login by hardcoding a fake token and user data in the `login` action itself. Also, display a loading indicator based on the `status` from the `sessionStore`."

---

### **Phase 2: The Proof of Concept (First Read-Only Feature)**

**Goal:** To prove the entire architecture works by building one simple, end-to-end, read-only feature module: a "Clients" list.

**Context for AI:** This is the most important phase. We are building our first "add-on" module. It will live in its own self-contained directory under `/features`. This module will have its own state, screens, and components, proving our modular architecture is viable. We are focusing on a read-only feature to keep the MVP scope tight.

---

#### **Task 2.1: Scaffold the "Clients" Feature**

**Context for AI:** We need to create the file structure for our new `clients` feature. All files related to clients will live here.

**▶️ Prompt to AI:**
"Inside the `/features` directory, create a new folder named `clients`. Inside `/features/clients`, create the following sub-directories and empty files:
*   `/api`: `index.ts` (for client-specific API functions)
*   `/components`: `ClientListItem.tsx`
*   `/screens`: `ClientListScreen.tsx`
*   `/state`: `clientStore.ts`"

---

#### **Task 2.2: Build the Client State & API**

**Context for AI:** Similar to the session store, the `clientStore` will manage all state related to clients, including the data itself and loading/error states. The API functions will fetch the data from our backend.

**▶️ Prompt to AI:**
"Populate the files created in the previous step:
1.  In `/features/clients/api/index.ts`, create a function `getClients()` that uses our main API client to make a GET request to `/api/clients`.
2.  In `/features/clients/state/clientStore.ts`, generate a new Zustand store. It should have state for `clients: []`, `isLoading: false`, and `error: null`. It needs a `fetchClients` action that calls the `getClients()` API function and manages the `isLoading` and `error` states correctly."

---

#### **Task 2.3: Develop the UI and Integrate Navigation**

**Context for AI:** Now we'll build the UI for our feature. The `ClientListScreen` will use the `clientStore` to get its data and will render a list of clients. We will then hook this new screen into our main drawer navigator, replacing the placeholder "Dashboard".

**▶️ Prompt to AI:**
"Generate the code for the following:
1.  **`ClientListItem.tsx` component:** This should be a simple presentational component that accepts a `client` object as a prop and displays the client's name and email in a styled `Pressable` card.
2.  **`ClientListScreen.tsx` screen:** This screen component should:
    *   Call the `fetchClients` action from `clientStore` inside a `useEffect` hook.
    *   Subscribe to the `clients`, `isLoading`, and `error` state from the store.
    *   Display a loading indicator if `isLoading` is true.
    *   Display an error message if `error` is not null.
    *   Render a `FlatList` of clients using the `ClientListItem` component.
3.  **Finally, modify `app/(tabs)/_layout.tsx`:** Change the `Drawer.Screen` that was for 'dashboard' or 'explore'. It should now point to our new `ClientListScreen` file, have the name 'clients', and the drawer label 'Clients'."