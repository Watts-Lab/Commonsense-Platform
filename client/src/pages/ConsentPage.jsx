import React from "react";

import Landing from "../components/Landing";
import Header from "../partials/Header";

function ConsentPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <main className="mx-auto p-3 max-w-3xl pb-14">
        <Landing />
      </main>
    </div>
  );
}

export default ConsentPage;
