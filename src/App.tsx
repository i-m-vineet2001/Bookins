/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { HotelCard } from "@/components/HotelCard";
import { Filters } from "@/components/Filters";
import { hotels } from "@/data/hotels";
import { Building2, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Hotel } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";

function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Ensures two digits
    const day = String(now.getDate()).padStart(2, '0'); // Ensures two digits
    
    return `${year}-${month}-${day}`;
}

console.log(getCurrentDate()); // Example output: 2025-02-26


// console.log(getCurrentDate());

const fetchHotels = async (setHotel, setLoading, setError) => {
  setLoading(true);
  setError(null);

  const options = {
    method: "GET",
    url: "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels",
    params: {
      dest_id: "-2095904",
      search_type: "CITY",
      arrival_date: getCurrentDate(),
      departure_date: "2025-02-27",
      adults: "1",
      children_age: "0,17",
      room_qty: "1",
      page_number: "1",
      units: "metric",
      temperature_unit: "c",
      languagecode: "en-us",
      currency_code: "INR",
    },
    headers: {
      "x-rapidapi-key": "a54ea6da64msh64cfa166dc77a26p1c41a3jsnec9753ab8b0f",
      "x-rapidapi-host": "booking-com15.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    setHotel(response?.data?.data?.hotels); // Ensure hotels exist
    console.log(response?.data?.data?.hotels); // Ensure hotels exist
    // console.log(response?.data); // Ensure hotels exist
  } catch (error) {
    console.error(error);
    setError("Failed to fetch hotels. Please try again.");
  } finally {
    setLoading(false);
  }
};

function App() {
  const [Allhotel, setHotel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(hotels);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchHotels(setHotel, setLoading, setError);
  }, []);

  const handleSearch = (filters: any) => {
    console.log("Search filters:", filters);
    setSearchResults(hotels);
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...hotels];

    if (filters.priceRange) {
      filtered = filtered.filter((hotel) => {
        const lowestPrice = Math.min(...hotel.prices.map((p) => p.price));
        return (
          lowestPrice >= filters.priceRange[0] &&
          lowestPrice <= filters.priceRange[1]
        );
      });
    }

    if (filters.rating) {
      filtered = filtered.filter((hotel) => hotel.rating >= filters.rating);
    }

    setSearchResults(filtered);
  };

  const toggleFavorite = (hotel: Hotel) => {
    setFavorites((prev) =>
      prev.includes(hotel.id)
        ? prev.filter((id) => id !== hotel.id)
        : [...prev, hotel.id]
    );
  };

  const displayedHotels =
    activeTab === "favorites"
      ? searchResults.filter((hotel) => favorites.includes(hotel.id))
      : searchResults;


    if(!Allhotel){
      return <div>Not found</div>
    }
  return (
    <div id="nav" className=" w-screen bg-white-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b ">
        <div className="container mx-auto px-4 py-4  bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">
                <span>B</span>ookins
              </h1>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <ListFilter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Filters onFilterChange={handleFilterChange} />
              </SheetContent>
              ``
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 ">
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Find and Compare Hotel Prices
          </h2>
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex gap-6">
          {/* Desktop Filters */}
          <div className="hidden lg:block">
            <Filters onFilterChange={handleFilterChange} />
          </div>

          {/* Results Section */}
          <div className="flex-1">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-6"
            >
              <TabsList>
                <TabsTrigger value="all">All Hotels</TabsTrigger>
                <TabsTrigger value="favorites">
                  Favorites ({favorites.length})
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {loading ? (
              <p className="text-center py-12 text-gray-600">
                Loading hotels...
              </p>
            ) : error ? (
              <p className="text-center py-12 text-red-500">{error}</p>
            ) : !Allhotel || Allhotel.length === 0 ? (
              <p className="text-center py-12 text-gray-600">
                No hotels found.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Allhotel?.map((hotel) => (
                  <HotelCard
                    key={hotel?.hotel_id}
                    hotel={hotel}
                    onFavorite={toggleFavorite}
                    isFavorite={favorites.includes(hotel.hotel_id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            © 2024 Bookins. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;


//new code
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useEffect, useState } from "react";
// import { SearchBar } from "@/components/SearchBar";
// import { HotelCard } from "@/components/HotelCard";
// import { Filters } from "@/components/Filters";
// import { Building2, ListFilter } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Hotel } from "@/types";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import axios from "axios";

// function getCurrentDate() {
//   const now = new Date();
//   const year = now.getFullYear();
//   const month = String(now.getMonth() + 1).padStart(2, "0"); // Two-digit month
//   const day = String(now.getDate()).padStart(2, "0"); // Two-digit day
//   return `${year}-${month}-${day}`;
// }

// // Fetch Hotels from API
// const fetchHotels = async (setHotels, setLoading, setError) => {
//   setLoading(true);
//   setError(null);

//   const options = {
//     method: "GET",
//     url: "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels",
//     params: {
//       dest_id: "-2095904",
//       search_type: "CITY",
//       arrival_date: getCurrentDate(),
//       departure_date: "2025-02-27",
//       adults: "1",
//       children_age: "0,17",
//       room_qty: "1",
//       page_number: "1",
//       units: "metric",
//       temperature_unit: "c",
//       languagecode: "en-us",
//       currency_code: "INR",
//     },
//     headers: {
//       "x-rapidapi-key": "a54ea6da64msh64cfa166dc77a26p1c41a3jsnec9753ab8b0f",
//       "x-rapidapi-host": "booking-com15.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     const fetchedHotels = response?.data?.data?.hotels || [];
//     setHotels(fetchedHotels);
//   } catch (error) {
//     console.error("Error fetching hotels:", error);
//     setError("Failed to fetch hotels. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };

// function App() {
//   const [hotels, setHotels] = useState<Hotel[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchResults, setSearchResults] = useState<Hotel[]>([]);
//   const [favorites, setFavorites] = useState<string[]>([]);
//   const [activeTab, setActiveTab] = useState("all");

//   useEffect(() => {
//     fetchHotels(setHotels, setLoading, setError);
//   }, []);

//   useEffect(() => {
//     setSearchResults(hotels); // Set search results when hotels load
//   }, [hotels]);

//   const handleSearch = (filters: any) => {
//     console.log("Search filters:", filters);

//     const filteredResults = hotels.filter((hotel) =>
//       hotel.property?.name.toLowerCase().includes(filters.query.toLowerCase())
//     );

//     setSearchResults(filteredResults);
//   };

//   const handleFilterChange = (filters: any) => {
//     let filtered = [...hotels];

//     if (filters.priceRange) {
//       filtered = filtered.filter((hotel) => {
//         const lowestPrice = Math.min(
//           ...hotel.property?.prices.map((p) => p.price) || [0]
//         );
//         return (
//           lowestPrice >= filters.priceRange[0] &&
//           lowestPrice <= filters.priceRange[1]
//         );
//       });
//     }

//     if (filters.rating) {
//       filtered = filtered.filter(
//         (hotel) => hotel.property?.rating >= filters.rating
//       );
//     }

//     setSearchResults(filtered);
//   };

//   const toggleFavorite = (hotel: Hotel) => {
//     setFavorites((prev) =>
//       prev.includes(hotel.hotel_id)
//         ? prev.filter((id) => id !== hotel.hotel_id)
//         : [...prev, hotel.hotel_id]
//     );
//   };

//   const displayedHotels =
//     activeTab === "favorites"
//       ? searchResults.filter((hotel) => favorites.includes(hotel.hotel_id))
//       : searchResults;

//   return (
//     <div id="nav" className="w-screen bg-white-50">
//       {/* Header */}
//       <header className="sticky top-0 z-50 bg-white border-b">
//         <div className="container mx-auto px-4 py-4 bg-gradient-to-r from-purple-600 to-blue-600">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Building2 className="h-6 w-6 text-primary" />
//               <h1 className="text-2xl font-bold">
//                 <span>B</span>ookins
//               </h1>
//             </div>

//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button variant="outline" size="icon" className="lg:hidden">
//                   <ListFilter className="h-4 w-4" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="left">
//                 <Filters onFilterChange={handleFilterChange} />
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto mb-8">
//           <h2 className="text-3xl font-bold text-center mb-6">
//             Find and Compare Hotel Prices
//           </h2>
//           <SearchBar onSearch={handleSearch} />
//         </div>

//         <div className="flex gap-6">
//           {/* Desktop Filters */}
//           <div className="hidden lg:block">
//             <Filters onFilterChange={handleFilterChange} />
//           </div>

//           {/* Results Section */}
//           <div className="flex-1">
//             <Tabs
//               value={activeTab}
//               onValueChange={setActiveTab}
//               className="mb-6"
//             >
//               <TabsList>
//                 <TabsTrigger value="all">All Hotels</TabsTrigger>
//                 <TabsTrigger value="favorites">
//                   Favorites ({favorites.length})
//                 </TabsTrigger>
//               </TabsList>
//             </Tabs>

//             {loading ? (
//               <p className="text-center py-12 text-gray-600">Loading hotels...</p>
//             ) : error ? (
//               <p className="text-center py-12 text-red-500">{error}</p>
//             ) : displayedHotels.length === 0 ? (
//               <p className="text-center py-12 text-gray-600">No hotels found.</p>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {displayedHotels.map((hotel) => (
//                   <HotelCard
//                     key={hotel.hotel_id}
//                     hotel={hotel}
//                     onFavorite={toggleFavorite}
//                     isFavorite={favorites.includes(hotel.hotel_id)}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;
