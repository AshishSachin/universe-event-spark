
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { Event } from "@/context/UniverseContext";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  index?: number;
}

const EventCard = ({ event, index = 0 }: EventCardProps) => {
  // Category colors
  const categoryColors = {
    hackathon: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
    ideathon: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
    workshop: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
    milan: "bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300",
    aarush: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
    roadshow: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
  };

  return (
    <Link to={`/events/${event.id}`}>
      <Card 
        className={cn(
          "overflow-hidden border-border hover:shadow-lg transition-all duration-300 h-full",
          "hover:border-universe-purple/50 hover:-translate-y-1",
          "animate-slide-up group"
        )}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <Badge 
            className={cn(
              "absolute top-3 right-3 font-medium", 
              categoryColors[event.category]
            )}
          >
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-universe-purple transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
          
          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span className="line-clamp-1">{event.venue}</span>
            </div>
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <span className="font-semibold">
              {event.price > 0 ? `₹${event.price}` : "Free"}
            </span>
            <span className="text-xs text-muted-foreground">
              {event.tickets_available} tickets left
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
