"use client";

import React, { useEffect, useState } from "react";
import { styles } from './styles';
import { Advocate } from "./models/advocate";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [like, setLike] = React.useState("");
  const [loading, setLoading] = useState(false);

  // TODO - I left out error handling on fetch because I think ideally it would navigate to a /error page to inform the user. For this exercise I just ran out of time.
  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.results);
      });
    });
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch(`/api/advocates?like=${like}`);
    const json = await response.json();
    setAdvocates(json.results || []);
    setLoading(false);
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gray-50 p-8">
      {/* TODO - This header needs to stay sticky up top, along with the form and the headers */}
      <h1 className="text-4xl font-bold mb-6" style={styles}>Solace Advocates</h1>
      <form onSubmit={handleSearch} className="w-full flex max-w-md gap-2">
        <input
          type="text"
          value={like}
          onChange={(e) => setLike(e.target.value)}
          placeholder="Search advocates…"
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="submit"
          className="rounded-lg bg-teal-600 px-4 py-2 text-white font-medium hover:bg-teal-950 focus:outline-none focus:ring-teal-500"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="mt-6 w-full px-8">
        <div className="flex bg-gray-100 text-sm font-semibold text-gray-700">
          <div className="flex-1 px-4 py-3">First Name</div>
          <div className="flex-1 px-4 py-3">Last Name</div>
          <div className="flex-1 px-4 py-3">City</div>
          <div className="flex-1 px-4 py-3">Degree</div>
          <div className="flex-[2] px-4 py-3">Specialties</div>
          <div className="flex-1 px-4 py-3">Years of Experience</div>
          <div className="flex-1 px-4 py-3">Phone</div>
        </div>

        <div className="divide-y"></div>
        {advocates && advocates.length > 0 ? (
         advocates.map((advocate) => (
            <div
              key={advocate.id}
              className="flex hover:bg-gray-50 text-sm text-gray-800"
            >
              <div className="flex-1 px-4 py-3">
                {advocate.firstName}
              </div>
              <div className="flex-1 px-4 py-3">{advocate.lastName}</div>
              <div className="flex-1 px-4 py-3">
                {advocate.city}
              </div>
               <div className="flex-1 px-4 py-3">
                {advocate.degree}
              </div>
              <div className="flex-[2] px-2 py-3">
               <ul className="list-disc list-inside space-y-1">
                {advocate.specialties?.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
              </div>
               <div className="flex-1 px-4 py-3">
                {advocate.yearsOfExperience}
              </div>
              <div className="flex-1 px-4 py-3">
                {advocate.phoneNumber}
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <p className="mt-4 text-sm text-gray-500 text-center">
              No results found
            </p>
          )
        )}
      </div>
    </main>
  );
}
