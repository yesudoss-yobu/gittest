import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Navbar from "./components/Navbar";
import Disable from "./components/Disable";
import Retry from "./components/Retry";
import "./components/Styles.css";
import Paginated from "./components/Paginated";
import Infinite from "./components/Infinite";
import PlaceHolder from "./components/PlaceHolder";
import { QueryClient, QueryClientProvider } from "react-query";
import Crud from "./components/Crud";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Disable />} />
          <Route path="/retries" element={<Retry />} />
          <Route path="/paginated" element={<Paginated />} />
          <Route path="/infinite" element={<Infinite />} />
          <Route path="/placeholder" element={<PlaceHolder />} />
          <Route path="/crud" element={<Crud />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
