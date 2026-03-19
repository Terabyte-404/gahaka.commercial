import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, MapPin, Search, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function GahakaCommercial() {
  const [view, setView] = useState("home");

  // SEARCH STATES
  const [search, setSearch] = useState("");

  // RENT FILTERS
  const [rentSearch, setRentSearch] = useState("");
  const [rentCategory, setRentCategory] = useState("All");
  const [rentResidentialType, setRentResidentialType] = useState("All");
  const [rentCommercialType, setRentCommercialType] = useState("All");
  const [rentLandType, setRentLandType] = useState("All");

  // ADMIN AUTH STATE
  const [adminUser, setAdminUser] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [sellSearch, setSellSearch] = useState("");
  const [sellCategory, setSellCategory] = useState("All");
  const [sellResidentialType, setSellResidentialType] = useState("All");
  const [sellCommercialType, setSellCommercialType] = useState("All");
  const [sellLandType, setSellLandType] = useState("All");

  // SLIDESHOW
  const heroImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
    "https://images.unsplash.com/photo-1497366216548-37526070297c",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef"
  ];

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const properties = [
    { id: 1, title: "Modern Apartment", location: "Milimani", price: "45,000/month", type: "Rent", category: "Residential", subType: "Apartments", image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c" },
    { id: 2, title: "Luxury Villa", location: "Kabarak", price: "120,000/month", type: "Rent", category: "Residential", subType: "Villas", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
    { id: 3, title: "Office Space", location: "CBD", price: "85,000/month", type: "Rent", category: "Commercial", subType: "Offices", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36" },
    { id: 4, title: "Warehouse", location: "Industrial Area", price: "60,000/month", type: "Rent", category: "Commercial", subType: "Warehouses", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d" },
    { id: 5, title: "Residential Land", location: "Lanet", price: "3.5M", type: "Sale", category: "Land", subType: "Residential (Buy & Build)", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef" },
    { id: 6, title: "Redevelopment Plot", location: "CBD", price: "18M", type: "Sale", category: "Land", subType: "Redevelopment Land", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef" },
    { id: 7, title: "Agricultural Land", location: "Subukia", price: "2.8M", type: "Sale", category: "Land", subType: "Agricultural", image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30" },
    { id: 8, title: "Family Bungalow", location: "Section 58", price: "90,000/month", type: "Rent", category: "Residential", subType: "Bungalows", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d" },
    { id: 9, title: "Executive Maisonette", location: "Naka Estate", price: "95,000/month", type: "Rent", category: "Residential", subType: "Maisonettes", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9" },
    { id: 10, title: "Modern Bedsitter", location: "Shaabab", price: "15,000/month", type: "Rent", category: "Residential", subType: "Bedsitters", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" },
    { id: 11, title: "Corporate Office Tower", location: "Nakuru CBD", price: "250,000/month", type: "Rent", category: "Commercial", subType: "Offices", image: "https://images.unsplash.com/photo-1497366216548-37526070297c" },
    { id: 12, title: "Logistics Warehouse Hub", location: "Pipeline", price: "180,000/month", type: "Rent", category: "Commercial", subType: "Warehouses", image: "https://images.unsplash.com/photo-1586528116493-a029e9c3f4f5" },
    { id: 13, title: "Prime Residential Plot", location: "Milimani", price: "6.5M", type: "Sale", category: "Land", subType: "Residential (Buy & Build)", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef" },
    { id: 14, title: "Industrial Redevelopment Site", location: "Industrial Area", price: "25M", type: "Sale", category: "Land", subType: "Redevelopment Land", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" },
    { id: 15, title: "Large Scale Farm Land", location: "Subukia Hills", price: "4.2M", type: "Sale", category: "Land", subType: "Agricultural", image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30" }
  ];

  const filterData = (data, type, search, category, residentialType, commercialType, landType) => {
    return data.filter(p => {
      if (p.type !== type) return false;
      if (category !== "All" && p.category !== category) return false;
      if (category === "Residential" && residentialType !== "All" && p.subType !== residentialType) return false;
      if (category === "Commercial" && commercialType !== "All" && p.subType !== commercialType) return false;
      if (category === "Land" && landType !== "All" && p.subType !== landType) return false;
      return (`${p.title} ${p.location}`.toLowerCase().includes(search.toLowerCase()));
    });
  };

  const PropertyGrid = ({ data }) => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map(p => (
        <Card key={p.id} className="bg-gray-900 border-gray-800">
          <img src={p.image} className="h-48 w-full object-cover" />
          <CardContent className="p-4">
            <h3 className="font-bold text-lg">{p.title}</h3>
            <p className="text-gray-400 flex items-center gap-1"><MapPin size={14}/> {p.location}</p>
            <p className="text-xs text-blue-400">{p.category} - {p.subType}</p>
            <p className="text-green-400 font-semibold mt-2">{p.price}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* NAV */}
      <div className="flex justify-between p-4 border-b border-gray-800">
        <h1 className="font-bold">GAHAKA Commercial</h1>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => setView("home")}>Home</Button>
          <Button onClick={() => setView("rent")}>Rent</Button>
          <Button onClick={() => setView("sell")}>Sell</Button>
          <Button onClick={() => setView("listings")}>Listings</Button>
          <Button onClick={() => setView("about")}>About</Button>
          <Button onClick={() => setView("admin")}>Admin</Button>
        </div>
      </div>

      {/* HOME */}
      {view === "home" && (
        <div className="relative w-full h-screen overflow-hidden">

          {/* SLIDESHOW BACKGROUND */}
          {heroImages.map((img, index) => (
            <div
              key={index}
              className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
              style={{
                backgroundImage: `url(${img})`,
                opacity: index === slideIndex ? 1 : 0,
                transform: index === slideIndex ? "scale(1.1)" : "scale(1)"
              }}
            />
          ))}

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-5xl font-bold">GAHAKA Commercial</h1>
            <p className="text-gray-300 mt-2">Premium Real Estate Agency in Nakuru, Kenya</p>

            <div className="mt-4 max-w-2xl text-gray-200">
              <p>
                GAHAKA Commercial is a modern real estate agency connecting buyers,
                sellers, and renters with verified properties across Nakuru and Kenya.
                We specialize in residential homes, commercial spaces, and land investments
                with a focus on trust, transparency, and value.
              </p>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <Facebook /><Instagram /><Twitter /><Linkedin />
            </div>
          </div>
        </div>
      )}

      {/* RENT */}
      {view === "rent" && (
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-4">Rent Properties</h2>

          <div className="flex gap-3 mb-4 flex-wrap">
            <div className="flex items-center bg-gray-900 p-2 rounded">
              <Search />
              <Input value={rentSearch} onChange={e => setRentSearch(e.target.value)} className="bg-transparent border-none" placeholder="Search" />
            </div>
            { ["All","Residential","Commercial","Land"].map(c => (
              <Button key={c} onClick={() => setRentCategory(c)}>{c}</Button>
            ))}
          </div>

          {rentCategory === "Residential" && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {["All","Apartments","Maisonettes","Villas","Bungalows","Bedsitters"].map(t => (
                <Button key={t} onClick={() => setRentResidentialType(t)}>{t}</Button>
              ))}
            </div>
          )}

          {rentCategory === "Commercial" && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {["All","Offices","Warehouses"].map(t => (
                <Button key={t} onClick={() => setRentCommercialType(t)}>{t}</Button>
              ))}
            </div>
          )}

          {rentCategory === "Land" && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {["All","Residential (Buy & Build)","Redevelopment Land","Agricultural"].map(t => (
                <Button key={t} onClick={() => setRentLandType(t)}>{t}</Button>
              ))}
            </div>
          )}

          <PropertyGrid data={filterData(properties, "Rent", rentSearch, rentCategory, rentResidentialType, rentCommercialType, rentLandType)} />
        </div>
      )}

      {/* SELL */}
      {view === "sell" && (
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-4">Properties for Sale</h2>

          <div className="flex gap-3 mb-4 flex-wrap">
            <div className="flex items-center bg-gray-900 p-2 rounded">
              <Search />
              <Input value={sellSearch} onChange={e => setSellSearch(e.target.value)} className="bg-transparent border-none" placeholder="Search" />
            </div>
            { ["All","Residential","Commercial","Land"].map(c => (
              <Button key={c} onClick={() => setSellCategory(c)}>{c}</Button>
            ))}
          </div>

          {sellCategory === "Residential" && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {["All","Apartments","Maisonettes","Villas","Bungalows","Bedsitters"].map(t => (
                <Button key={t} onClick={() => setSellResidentialType(t)}>{t}</Button>
              ))}
            </div>
          )}

          {sellCategory === "Commercial" && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {["All","Offices","Warehouses"].map(t => (
                <Button key={t} onClick={() => setSellCommercialType(t)}>{t}</Button>
              ))}
            </div>
          )}

          {sellCategory === "Land" && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {["All","Residential (Buy & Build)","Redevelopment Land","Agricultural"].map(t => (
                <Button key={t} onClick={() => setSellLandType(t)}>{t}</Button>
              ))}
            </div>
          )}

          <PropertyGrid data={filterData(properties, "Sale", sellSearch, sellCategory, sellResidentialType, sellCommercialType, sellLandType)} />
        </div>
      )}

      {/* LISTINGS */}
      {view === "listings" && (
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-4">All Property Listings</h2>

          <div className="flex items-center bg-gray-900 p-2 rounded mb-6">
            <Search />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none"
              placeholder="Search all properties..."
            />
          </div>

          <PropertyGrid data={filterData(properties, "Rent", search, "All", "All", "All", "All").concat(filterData(properties, "Sale", search, "All", "All", "All", "All"))} />
        </div>
      )}

      {/* ABOUT */}
      {view === "about" && (
        <div className="p-10 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">About GAHAKA Commercial</h2>

          <div className="space-y-6 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-white">Purpose</h3>
              <p>
                To connect individuals and businesses in Kenya with reliable, transparent,
                and high-value real estate opportunities across residential, commercial,
                and land sectors.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white">Vision</h3>
              <p>
                To become the leading digital-first real estate agency in East Africa,
                redefining how property is bought, sold, and rented through innovation
                and trust.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white">Core Values</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Integrity in all transactions</li>
                <li>Transparency and trust with clients</li>
                <li>Customer-first service approach</li>
                <li>Innovation in property solutions</li>
                <li>Professionalism and accountability</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN */}
      {view === "admin" && (
        <div className="p-10 max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-6">Admin Login</h2>

          {!isAdminAuthenticated ? (
            <div className="space-y-4">
              <Input
                placeholder="Username"
                value={adminUser}
                onChange={(e) => setAdminUser(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />

              <Button
                onClick={() => {
                  if (adminUser === "admin" && adminPassword === "1234") {
                    setIsAdminAuthenticated(true);
                  } else {
                    alert("Invalid credentials");
                  }
                }}
              >
                Login
              </Button>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-semibold mb-4">Admin Dashboard</h3>
              <p className="text-gray-400 mb-4">Manage properties and view listings</p>

              <PropertyGrid data={properties} />

              <Button className="mt-4" onClick={() => setIsAdminAuthenticated(false)}>
                Logout
              </Button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
