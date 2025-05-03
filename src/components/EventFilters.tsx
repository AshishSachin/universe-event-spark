
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface EventFiltersProps {
  onFilterChange: (category: string, search: string) => void;
}

const EventFilters = ({ onFilterChange }: EventFiltersProps) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    onFilterChange(category, searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onFilterChange(activeCategory, e.target.value);
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Search events..."
          className="pl-10 pr-4 bg-background border-input placeholder:text-muted-foreground focus:border-universe-purple focus:ring-universe-purple/20 transition-all duration-300"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={handleCategoryChange}>
        <TabsList className="w-full overflow-x-auto flex whitespace-nowrap pb-2 scrollbar-none justify-start md:justify-center">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-universe-purple data-[state=active]:text-white flex-shrink-0 px-4 animate-scale-up"
            style={{ animationDelay: '0s' }}
          >
            All Events
          </TabsTrigger>
          <TabsTrigger 
            value="hackathon"
            className="data-[state=active]:bg-universe-purple data-[state=active]:text-white flex-shrink-0 px-4 animate-scale-up"
            style={{ animationDelay: '0.1s' }}
          >
            Hackathons
          </TabsTrigger>
          <TabsTrigger 
            value="ideathon"
            className="data-[state=active]:bg-universe-purple data-[state=active]:text-white flex-shrink-0 px-4 animate-scale-up"
            style={{ animationDelay: '0.2s' }}
          >
            Ideathons
          </TabsTrigger>
          <TabsTrigger 
            value="workshop"
            className="data-[state=active]:bg-universe-purple data-[state=active]:text-white flex-shrink-0 px-4 animate-scale-up"
            style={{ animationDelay: '0.3s' }}
          >
            Workshops
          </TabsTrigger>
          <TabsTrigger 
            value="milan"
            className="data-[state=active]:bg-universe-purple data-[state=active]:text-white flex-shrink-0 px-4 animate-scale-up"
            style={{ animationDelay: '0.4s' }}
          >
            Milan
          </TabsTrigger>
          <TabsTrigger 
            value="aarush"
            className="data-[state=active]:bg-universe-purple data-[state=active]:text-white flex-shrink-0 px-4 animate-scale-up"
            style={{ animationDelay: '0.5s' }}
          >
            Aarush
          </TabsTrigger>
          <TabsTrigger 
            value="roadshow"
            className="data-[state=active]:bg-universe-purple data-[state=active]:text-white flex-shrink-0 px-4 animate-scale-up"
            style={{ animationDelay: '0.6s' }}
          >
            Roadshows
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default EventFilters;
