
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  PlusCircle, 
  Calendar, 
  Users, 
  Ticket, 
  ArrowUp, 
  ArrowDown, 
  BarChart3, 
  Tag, 
  Download, 
  Edit,
  MapPin,
  Eye
} from "lucide-react";
import { useUniverse } from "@/context/UniverseContext";
import FloatingParticles from "@/components/FloatingParticles";

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const { events, isAuthenticated, currentUser, tickets } = useUniverse();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Sample stats - would come from API in a real app
  const stats = {
    totalEvents: events.length,
    activeEvents: events.filter(e => new Date(e.date) >= new Date()).length,
    pastEvents: events.filter(e => new Date(e.date) < new Date()).length,
    totalTickets: tickets.length,
    totalRevenue: tickets.reduce((sum, ticket) => sum + ticket.price, 0)
  };

  useEffect(() => {
    // Check authentication and role
    if (!isAuthenticated || currentUser?.role !== "organizer") {
      navigate("/login");
      return;
    }

    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, currentUser, navigate]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <FloatingParticles count={10} colors={['#8B5CF6', '#A78BFA']} />
      
      <main className="flex-grow pt-24 pb-12 relative z-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 animate-slide-right">
            <div>
              <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
              <p className="text-muted-foreground">Manage your events and track ticket sales</p>
            </div>
            <Button
              className="bg-gradient text-white"
              onClick={() => navigate("/organizer/create-event")}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Event
            </Button>
          </div>
          
          {/* Tabs Navigation */}
          <Tabs 
            defaultValue="overview" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="animate-slide-up"
          >
            <TabsList className="mb-6">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-universe-purple data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="events" 
                className="data-[state=active]:bg-universe-purple data-[state=active]:text-white"
              >
                My Events
              </TabsTrigger>
              <TabsTrigger 
                value="tickets" 
                className="data-[state=active]:bg-universe-purple data-[state=active]:text-white"
              >
                Ticket Sales
              </TabsTrigger>
              <TabsTrigger 
                value="attendees" 
                className="data-[state=active]:bg-universe-purple data-[state=active]:text-white"
              >
                Attendees
              </TabsTrigger>
            </TabsList>
            
            {/* Tab Content */}
            <TabsContent value="overview" className="mt-0">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-32 rounded-xl" />
                  ))}
                  <Skeleton className="h-80 rounded-xl col-span-full" />
                </div>
              ) : (
                <DashboardOverview stats={stats} navigate={navigate} />
              )}
            </TabsContent>
            
            <TabsContent value="events" className="mt-0">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} className="h-64 rounded-xl" />
                  ))}
                </div>
              ) : (
                <EventsList events={events} navigate={navigate} />
              )}
            </TabsContent>
            
            <TabsContent value="tickets" className="mt-0">
              {isLoading ? (
                <div className="space-y-6">
                  <Skeleton className="h-64 rounded-xl w-full" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Skeleton className="h-80 rounded-xl" />
                    <Skeleton className="h-80 rounded-xl" />
                  </div>
                </div>
              ) : (
                <TicketSales tickets={tickets} events={events} />
              )}
            </TabsContent>
            
            <TabsContent value="attendees" className="mt-0">
              {isLoading ? (
                <Skeleton className="h-96 rounded-xl w-full" />
              ) : (
                <AttendeesList tickets={tickets} events={events} />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = ({ stats, navigate }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Events" 
          value={stats.totalEvents} 
          icon={<Calendar />}
          trend={{ value: "+2", up: true }}
          color="bg-purple-100 text-universe-purple"
          onClick={() => {}}
        />
        <StatCard 
          title="Active Events" 
          value={stats.activeEvents} 
          icon={<Calendar />}
          trend={null} // Add trend as null for cards without trend
          color="bg-blue-100 text-blue-600"
          onClick={() => {}}
        />
        <StatCard 
          title="Tickets Sold" 
          value={stats.totalTickets} 
          icon={<Ticket />}
          trend={{ value: "+5", up: true }}
          color="bg-green-100 text-green-600"
          onClick={() => {}}
        />
        <StatCard 
          title="Total Revenue" 
          value={formatCurrency(stats.totalRevenue)} 
          icon={<Tag />}
          trend={{ value: "+₹1,200", up: true }}
          color="bg-amber-100 text-amber-600"
          onClick={() => {}}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2 border border-border overflow-hidden hover:border-universe-purple/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Sales Overview</h3>
              <select className="bg-card border border-border rounded-md px-2 py-1 text-sm">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
              </select>
            </div>
            
            <div className="h-64 flex items-center justify-center">
              <BarChart3 className="h-32 w-32 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border overflow-hidden hover:border-universe-purple/50 transition-colors">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{["Hackathon 2025", "Tech Workshop", "Milan Cultural Night"][i]}</h4>
                    <p className="text-xs text-muted-foreground">{["Jun 15, 10:00 AM", "Jul 5, 2:00 PM", "Apr 10, 6:00 PM"][i]}</p>
                  </div>
                  <span className="text-sm font-medium">{["200", "50", "1000"][i]} tickets</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-3 border-t border-border">
            <Button 
              variant="ghost" 
              className="w-full text-universe-purple"
              onClick={() => {}}
            >
              View all events
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-border overflow-hidden hover:border-universe-purple/50 transition-colors">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Recent Ticket Sales</h3>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">Student {i + 1}</h4>
                      <p className="text-xs text-muted-foreground">Purchased ticket for {["Hackathon", "Aarush", "Milan", "Workshop", "Roadshow"][i]}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{["₹500", "₹1,200", "₹800", "₹300", "Free"][i]}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-3 border-t border-border">
            <Button 
              variant="ghost" 
              className="w-full text-universe-purple"
              onClick={() => {}}
            >
              View all transactions
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border border-border overflow-hidden hover:border-universe-purple/50 transition-colors">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start bg-gradient text-white"
                onClick={() => navigate("/organizer/create-event")}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Event
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {}}
              >
                <Download className="mr-2 h-4 w-4" /> Download Reports
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {}}
              >
                <Users className="mr-2 h-4 w-4" /> Manage Attendees
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {}}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

// Events List Component
const EventsList = ({ events, navigate }) => {
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Events</h2>
        <Button 
          className="bg-gradient text-white"
          onClick={() => navigate("/organizer/create-event")}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Event
        </Button>
      </div>
      
      {sortedEvents.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Events Created Yet</h3>
          <p className="text-muted-foreground mb-6">
            Start by creating your first event to see it listed here.
          </p>
          <Button 
            className="bg-gradient text-white"
            onClick={() => navigate("/organizer/create-event")}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Create Your First Event
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden border-border hover:shadow-md transition-all hover:border-universe-purple/50 hover:-translate-y-1">
              <div className="h-48 relative">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="font-semibold text-white">{event.title}</h3>
                  <p className="text-sm text-white/80">{formatDate(event.date)}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    {event.tickets_available} tickets available
                  </span>
                  <span className="text-sm font-medium">
                    {event.price > 0 ? `₹${event.price}` : "Free"}
                  </span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{event.venue}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {}}
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button 
                  className="w-full bg-universe-purple text-white"
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  <Eye className="mr-2 h-4 w-4" /> View
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Ticket Sales Component
const TicketSales = ({ tickets, events }) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Ticket Sales</h2>
        <Button 
          variant="outline"
          onClick={() => {}}
        >
          <Download className="mr-2 h-4 w-4" /> Download Report
        </Button>
      </div>
      
      {tickets.length === 0 ? (
        <div className="text-center py-12">
          <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Ticket Sales Yet</h3>
          <p className="text-muted-foreground mb-6">
            Once tickets start selling for your events, you'll see the data here.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard 
              title="Total Sales" 
              value={tickets.length} 
              icon={<Ticket />}
              trend={null} // Added trend as null
              color="bg-green-100 text-green-600"
              onClick={() => {}}
            />
            <StatCard 
              title="Revenue" 
              value={formatCurrency(tickets.reduce((sum, ticket) => sum + ticket.price, 0))} 
              icon={<Tag />}
              trend={null} // Added trend as null
              color="bg-amber-100 text-amber-600"
              onClick={() => {}}
            />
            <StatCard 
              title="Avg. Ticket Price" 
              value={formatCurrency(tickets.reduce((sum, ticket) => sum + ticket.price, 0) / Math.max(1, tickets.length))} 
              icon={<BarChart3 />}
              trend={null} // Added trend as null
              color="bg-blue-100 text-blue-600"
              onClick={() => {}}
            />
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4">Ticket Sales by Event</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4 text-left">Event Name</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-right">Tickets Sold</th>
                    <th className="py-3 px-4 text-right">Revenue</th>
                    <th className="py-3 px-4 text-right">Available</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => {
                    const eventTickets = tickets.filter(t => t.eventId === event.id);
                    const eventRevenue = eventTickets.reduce((sum, t) => sum + t.price, 0);
                    
                    return (
                      <tr key={event.id} className="border-b border-border">
                        <td className="py-3 px-4">{event.title}</td>
                        <td className="py-3 px-4">{formatDate(event.date)}</td>
                        <td className="py-3 px-4 text-right">{eventTickets.length}</td>
                        <td className="py-3 px-4 text-right">{formatCurrency(eventRevenue)}</td>
                        <td className="py-3 px-4 text-right">{event.tickets_available}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Attendees List Component
const AttendeesList = ({ tickets, events }) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Attendees</h2>
        <Button 
          variant="outline"
          onClick={() => {}}
        >
          <Download className="mr-2 h-4 w-4" /> Export List
        </Button>
      </div>
      
      {tickets.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Attendees Yet</h3>
          <p className="text-muted-foreground mb-6">
            Once people register for your events, you'll see them listed here.
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <input
              type="text"
              placeholder="Search attendees..."
              className="px-3 py-2 rounded-md border border-border bg-background w-64"
            />
            <select className="px-3 py-2 rounded-md border border-border bg-background">
              <option value="all">All Events</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>{event.title}</option>
              ))}
            </select>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Department</th>
                  <th className="py-3 px-4 text-left">Event</th>
                  <th className="py-3 px-4 text-left">Purchase Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => {
                  const event = events.find(e => e.id === ticket.eventId);
                  
                  return (
                    <tr key={ticket.id} className="border-b border-border">
                      <td className="py-3 px-4">{ticket.userName}</td>
                      <td className="py-3 px-4">user{ticket.id.slice(0,3)}@example.com</td>
                      <td className="py-3 px-4">{ticket.userDepartment}</td>
                      <td className="py-3 px-4">{event?.title}</td>
                      <td className="py-3 px-4">{formatDate(ticket.purchaseDate)}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          ticket.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                          ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, trend, color, onClick }) => {
  return (
    <Card 
      className="border border-border overflow-hidden hover:shadow-md transition-all hover:border-universe-purple/50 cursor-pointer hover:-translate-y-1"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
              <div className="flex items-center mt-2">
                {trend.up ? (
                  <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 text-red-600 mr-1" />
                )}
                <span className={`text-xs ${trend.up ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.value} from last period
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function for date formatting
function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Helper function for currency formatting
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export default OrganizerDashboard;
