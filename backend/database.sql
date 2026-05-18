-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  short_description TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  current_challenges TEXT NOT NULL,
  ai_solution TEXT NOT NULL,
  workflow_image VARCHAR(255),
  github_link VARCHAR(255),
  technologies TEXT[] NOT NULL,
  benefits TEXT NOT NULL,
  future_improvements TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Categories
INSERT INTO categories (name, description, icon) VALUES
('Auto Garage / Auto Repair Services', 'AI solutions for vehicle booking, service reminders, and workshop automation', 'Wrench'),
('Makeup Artist / Beauty Services', 'AI-powered client booking, consultation, and beauty workflow automation', 'Sparkles'),
('Event Management Services', 'Streamline planning, vendor coordination, and event operations with AI', 'CalendarDays'),
('Corporate Gifting Solutions', 'Automate gifting recommendations, approvals, and bulk order handling', 'Gift'),
('Photography & Videography Services', 'Manage bookings, shoot planning, and delivery workflows with AI', 'Camera'),
('HR Consultancy / Recruitment Agency', 'Automate candidate screening, interview scheduling, and recruitment workflows', 'Users'),
('Training & Coaching Institutes', 'Improve course inquiry handling, scheduling, and learning support automation', 'BookOpen'),
('Travel & Tour Agency', 'AI-assisted itinerary planning, bookings, and customer support automation', 'Plane'),
('Catering Services / Cloud Kitchen', 'Automate order handling, menu recommendations, and kitchen operations', 'UtensilsCrossed'),
('Fitness / Gym Services', 'Handle memberships, class scheduling, and member engagement with AI', 'Dumbbell'),
('Salon & Spa Services', 'Automate appointment booking, reminders, and service recommendations', 'Scissors'),
('Boutique / Fashion Designer', 'Support style recommendations, inventory, and order handling automation', 'Shirt'),
('Dermatologist Clinic / Skin Care Center', 'Streamline patient intake, follow-ups, and skincare consultation workflows', 'HeartPulse'),
('Dental Clinic / Dentist', 'Automate appointments, patient reminders, and clinic workflow management', 'Tooth'),
('Bakery & Home-based Food Business', 'Improve order management, delivery tracking, and customer communication', 'Croissant'),
('Jewellery Designing & Custom Jewellery', 'Automate design requests, quotation handling, and customer follow-ups', 'Gem'),
('Courier & Logistics Services', 'Optimize parcel tracking, dispatch, and delivery coordination workflows', 'Truck'),
('Nursery / Plant & Landscaping Services', 'Manage leads, site visits, and plant/service scheduling with AI', 'Leaf'),
('Pet Grooming & Pet Care Services', 'Handle pet bookings, service reminders, and customer support automation', 'PawPrint'),
('Yoga Instructor / Wellness Coach', 'Automate class bookings, reminders, and wellness follow-up workflows', 'Lotus'),
('Interior Design & Furnishing Services', 'Support consultation booking, design approvals, and project coordination', 'DraftingCompass'),
('Digital Marketing Agency', 'Automate lead handling, campaign updates, and reporting workflows', 'Megaphone'),
('Housekeeping, Facility Management, Laundry & Dry Cleaning Services', 'Streamline service requests, scheduling, and operations management', 'Sparkles')
ON CONFLICT DO NOTHING;
