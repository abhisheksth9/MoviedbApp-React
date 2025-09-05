import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_KEY } from "../services/api";

function PersonDetails() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [personCredits, setPersonCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Acting");
  const [sortOrder, setSortOrder] = useState("desc"); // default newest first


  useEffect(() => {
    const fetchPersonData = async () => {
      try {
        // Person details
        const res = await fetch(
          `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setPerson(data);

        // Person credits
        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${API_KEY}&language=en-US`
        );
        const creditsData = await creditsRes.json();
        setPersonCredits(creditsData);
      } catch (err) {
        console.error("Error fetching person data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonData();
  }, [id]);

  if (loading) return <div className="text-center text-lg mt-10">Loading...</div>;
  if (!person || person.success === false)
    return (
      <div className="text-center text-red-500 text-lg mt-10">
        Person not found
      </div>
    );

  // ✅ Group credits by department & specific jobs
  const groupedCredits = {};

  personCredits?.cast?.forEach((credit) => {
    if (!groupedCredits["Acting"]) groupedCredits["Acting"] = [];
    groupedCredits["Acting"].push(credit);
  });

  personCredits?.crew?.forEach((credit) => {
    let dept = credit.department;

    if (dept === "Directing") dept = "Director";
    else if (dept === "Production") dept = "Producer";
    else if (dept === "Writing") {
      if (credit.job === "Story") dept = "Story";
      else if (credit.job === "Screenplay") dept = "Screenplay";
      else if (credit.job === "Lyricist") dept = "Lyricist";
      else dept = "Writer"; // fallback
    } else if (dept === "Sound" && credit.job === "Lyricist") {
      dept = "Lyricist";
    }

    if (!groupedCredits[dept]) groupedCredits[dept] = [];
    groupedCredits[dept].push(credit);
  });

  const tabs = Object.keys(groupedCredits);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Person Info */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {person.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
            alt={person.name}
            className="w-full md:w-1/3 h-auto object-cover"
          />
        ) : (
          <div className="w-full md:w-1/3 h-80 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
            No Image Available
          </div>
        )}

        <div className="p-6 flex-1">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            {person.name}
          </h1>

          <p className="text-gray-700 mb-6 italic">
            {person.biography || "No biography available."}
          </p>

          <ul className="space-y-2 text-gray-800">
            <li>
              <span className="font-semibold">Born:</span>{" "}
              {person.birthday || "N/A"}{" "}
              {person.place_of_birth ? `in ${person.place_of_birth}` : ""}
            </li>
            <li>
              <span className="font-semibold">Known For:</span>{" "}
              {person.known_for_department || "N/A"}
            </li>
            {person.deathday && (
              <li>
                <span className="font-semibold">Died:</span>{" "}
                {person.deathday}
              </li>
            )}
          </ul>
      </div>
    </div>

      {/* Tabs */}
      <div className="mt-10">
      {/* Tab Navigation */}
      <div className="flex gap-4 border-b overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold whitespace-nowrap ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Credits Section */}
      <div className="mt-6">
        {/* Sort Controls */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Credits</h2>
          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Sort: {sortOrder === "desc" ? "Newest → Oldest" : "Oldest → Newest"}
          </button>
        </div>

        {/* Credit List */}
        <div className="divide-y divide-gray-200">
          {groupedCredits[activeTab]
            .slice()
            .sort((a, b) => {
              const dateA = new Date(a.release_date || a.first_air_date || "1900-01-01");
              const dateB = new Date(b.release_date || b.first_air_date || "1900-01-01");
              return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
            })
            .map((credit) => (
              <Link
                to={`/movie/${credit.id}`}
                key={credit.credit_id}
                className="flex items-center gap-4 py-3 hover:bg-gray-50 transition"
              >
                {/* Poster Thumbnail */}
                {credit.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${credit.poster_path}`}
                    alt={credit.title || credit.name}
                    className="w-16 h-24 object-cover rounded shadow-sm flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-24 bg-gray-200 flex items-center justify-center text-xs text-gray-500 rounded">
                    No Image
                  </div>
                )}

                {/* Credit Info */}
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">
                    {credit.title || credit.name}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {(credit.release_date || credit.first_air_date || "").split("-")[0] || "N/A"}
                  </span>
                  <span className="italic text-gray-700 text-sm">
                    {credit.job || credit.character || "N/A"}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default PersonDetails;
