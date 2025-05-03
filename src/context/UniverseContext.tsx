
import React, { createContext, useState, useContext, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "organizer";
  department?: string;
  phone?: string;
  srmEmail?: string;
  personalEmail?: string;
  section?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  price: number;
  category: "hackathon" | "ideathon" | "workshop" | "milan" | "aarush" | "roadshow";
  image: string;
  details: string;
  tickets_available: number;
  registration_deadline: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  purchaseDate: string;
  status: "pending" | "confirmed" | "cancelled";
  price: number;
  userName: string;
  userDepartment: string;
  pdfUrl?: string;
}

interface UniverseContextProps {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  events: Event[];
  tickets: Ticket[];
  addEvent: (event: Event) => void;
  addTicket: (ticket: Ticket) => void;
  isAuthenticated: boolean;
  userRole: "user" | "organizer" | null;
  logout: () => void;
}

const UniverseContext = createContext<UniverseContextProps | undefined>(undefined);

// Sample events data
const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Hackathon 2025",
    description: "48-hour coding challenge with exciting prizes",
    date: "2025-06-15",
    time: "10:00 AM",
    venue: "Tech Building, Block 5",
    organizer: "CodeClub SRM",
    price: 500,
    category: "hackathon",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    details: "Join us for the biggest hackathon of the year! Form teams of up to 4 members and solve real-world problems with innovative solutions. Top teams win cash prizes and internship opportunities.",
    tickets_available: 200,
    registration_deadline: "2025-06-10"
  },
  {
    id: "2",
    title: "Aarush 2025",
    description: "Annual technical and cultural fest",
    date: "2025-03-20",
    time: "9:00 AM",
    venue: "Main Campus Grounds",
    organizer: "Student Council",
    price: 1200,
    category: "aarush",
    image: "https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    details: "Aarush is SRM's annual techno-cultural fest that brings together students from across the country. Experience three days of competitions, workshops, and star-studded performances.",
    tickets_available: 5000,
    registration_deadline: "2025-03-15"
  },
  {
    id: "3",
    title: "AI Workshop Series",
    description: "Learn Machine Learning and AI fundamentals",
    date: "2025-07-05",
    time: "2:00 PM",
    venue: "University Building 2, Room 304",
    organizer: "AI Club SRM",
    price: 300,
    category: "workshop",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    details: "A comprehensive 3-day workshop on Machine Learning and AI fundamentals. Learn from industry experts and get hands-on experience with real projects. Certificate provided upon completion.",
    tickets_available: 50,
    registration_deadline: "2025-07-01"
  },
  {
    id: "4",
    title: "Milan 2025",
    description: "Cultural extravaganza with dance, music and more",
    date: "2025-04-10",
    time: "6:00 PM",
    venue: "Auditorium",
    organizer: "Cultural Committee",
    price: 800,
    category: "milan",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    details: "Milan is SRM's cultural fest that celebrates diverse art forms. Participate in competitions for dance, music, fashion, and more. Witness performances by celebrity artists.",
    tickets_available: 1000,
    registration_deadline: "2025-04-05"
  },
  {
    id: "5",
    title: "Startup Ideathon",
    description: "Present your business ideas to investors",
    date: "2025-05-25",
    time: "11:00 AM",
    venue: "Business School, Conference Hall",
    organizer: "E-Cell SRM",
    price: 250,
    category: "ideathon",
    image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    details: "Got a groundbreaking business idea? Present it to a panel of investors and industry experts. The best ideas receive mentorship and funding opportunities to turn them into reality.",
    tickets_available: 80,
    registration_deadline: "2025-05-20"
  },
  {
    id: "6",
    title: "Tech Roadshow 2025",
    description: "Showcase of latest technological innovations",
    date: "2025-08-12",
    time: "10:30 AM",
    venue: "Central Quadrangle",
    organizer: "Tech Club",
    price: 0,
    category: "roadshow",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    details: "Experience the future of technology at SRM's Tech Roadshow. See demonstrations of robots, drones, VR/AR experiences, and other cutting-edge innovations developed by students and faculty.",
    tickets_available: 300,
    registration_deadline: "2025-08-10"
  }
];

export const UniverseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('universe_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('universe_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('universe_user');
    }
  }, [currentUser]);

  const addEvent = (event: Event) => {
    setEvents(prevEvents => [...prevEvents, event]);
  };

  const addTicket = (ticket: Ticket) => {
    setTickets(prevTickets => [...prevTickets, ticket]);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const isAuthenticated = !!currentUser;
  const userRole = currentUser?.role || null;

  const value = {
    currentUser,
    setCurrentUser,
    events,
    tickets,
    addEvent,
    addTicket,
    isAuthenticated,
    userRole,
    logout
  };

  return (
    <UniverseContext.Provider value={value}>
      {children}
    </UniverseContext.Provider>
  );
};

export const useUniverse = () => {
  const context = useContext(UniverseContext);
  if (context === undefined) {
    throw new Error("useUniverse must be used within a UniverseProvider");
  }
  return context;
};
