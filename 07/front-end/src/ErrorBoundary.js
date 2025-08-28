

import React from 'react';
// import App from './App';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
          <button 
            onClick={() => window.location.reload()} 
            style={{ marginTop: '20px', padding: '10px 20px' }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;




// import { ErrorBoundary } from "react-error-boundary";

// function ErrorFallback({ error, resetErrorBoundary }) {
//   return (
//     <div
//       role="alert"
//       style={{
//         background: "linear-gradient(to right, #ffecd2, #fcb69f)",
//         padding: "2rem",
//         borderRadius: "12px",
//         color: "#333",
//       }}
//     >
//       <h2>Something went wrong.</h2>
//       <pre style={{ color: "red" }}>{error.message}</pre>
//       <button onClick={resetErrorBoundary}>Try again</button>
//     </div>
//   );
// }

// export default function AppWrapper() {
//   return (
//     <ErrorBoundary
//       FallbackComponent={ErrorFallback}
//       onReset={() => {
//         // Reset app state if needed
//       }}
//     >
//       <App />
//     </ErrorBoundary>
//   );
// }





// import React from "react";
// import { ErrorBoundary } from "react-error-boundary";
// import App from "./App"; // ✅ Make sure App.js exists in src folder

// // Fallback UI
// function ErrorFallback({ error, resetErrorBoundary }) {
//   return (
//     <div role="alert" style={{ padding: "20px", background: "#fee", color: "#900" }}>
//       <h2>Something went wrong 😢</h2>
//       <pre>{error.message}</pre>
//       <button onClick={resetErrorBoundary}>Try again</button>
//     </div>
//   );
// }

// export default function AppWithErrorBoundary() {
//   return (
//     <ErrorBoundary
//       FallbackComponent={ErrorFallback}
//       onReset={() => {
//         window.location.reload(); // reload on error reset
//       }}
//     >
//       <App />
//     </ErrorBoundary>
//   );
// }
