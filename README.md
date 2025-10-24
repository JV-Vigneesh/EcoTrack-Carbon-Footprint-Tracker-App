# 🌍 EcoTrack – Carbon Footprint Tracker Web Application

## 🧩 Problem Statement  
**EcoTrack** is a dynamic, user-friendly web application designed to help individuals track and reduce their carbon footprint based on daily activities such as transportation, energy consumption, and food choices.  

### 🎯 Objective  
Develop a responsive, data-driven web app that:  
- Calculates a user’s carbon footprint based on their lifestyle.  
- Provides personalized sustainability tips and recommendations.  
- Visualizes carbon data in an engaging and educational way.  
- Uses gamification (points system) to encourage eco-friendly habits.  

Climate change is one of the defining challenges of our time, and individual actions can make a measurable difference. EcoTrack empowers users to make smarter, greener choices.

---

## ⚙️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | Vite + TypeScript + Tailwind CSS |
| **Backend / Database** | [Supabase](https://supabase.com/) (PostgreSQL + Auth + Realtime) |
| **Hosting** | Vercel |
| **Version Control** | Git & GitHub |

---

## 🌱 Features

✅ Log daily activities:  
- **Transportation** (car, metro, bike, bus, etc.)  
- **Energy Usage** (electricity consumption in kWh)  
- **Food Habits** (diet type: vegetarian, non-veg, plant-based, etc.)  

✅ Get **real-time carbon footprint calculation** (CO₂ in kg).  
✅ Earn **eco points** based on sustainable actions.  
✅ View your **progress dashboard** with charts and insights.  
✅ Receive **personalized recommendations** on how to reduce emissions.  
✅ Uses **Indian emission factors** for accurate regional context.  

---

## 🧮 Carbon Footprint Calculation

EcoTrack uses regionally adjusted emission factors (specific to India) for accurate calculations:

| Activity | Example | Emission Factor (kg CO₂e) | Notes |
|-----------|----------|----------------------------|-------|
| **Car (petrol)** | 1 km | 0.192 | Based on Indian petrol vehicles |
| **Bus** | 1 km | 0.567 | Public transport average |
| **Metro Train** | 1 km | 0.008 | Electric, low carbon |
| **Electricity Usage** | 1 kWh | 0.82 | Indian grid average |
| **Diet - Dairy/Meat Heavy** | 1 day | 3.3 | High meat consumption |
| **Diet - Plant-Based Local** | 1 day | 1.5 | Lowest footprint |

The calculation functions are modular:
- `calculateTransportationCarbon(mode, distance_km)`  
- `calculateEnergyCarbon(kwh)`  
- `calculateFoodCarbon(dietType)`  
- `getRecommendations(activities, totalCarbon)`  

Each function returns:
```ts
export interface CarbonResult {
  carbon_kg: number;
  points_earned: number;
}
````

---

## 📊 Gamification System

* Users earn **points** for low-emission behaviors.
* The cleaner your actions, the higher your score!
* Example:

  * 🚶‍♂️ Walking / Biking → up to **150% bonus points**
  * 🚌 Public transport → +20% bonus
  * 🚗 Petrol vehicles → fewer points

---

## 🧠 Smart Recommendations

EcoTrack’s recommendation engine analyzes activity data and suggests improvements, for example:

* “Try switching to the Metro or shared auto to cut emissions.”
* “Reduce AC usage or raise temperature settings to 25°C+.”
* “Focus on plant-based meals to reduce food-related emissions.”

---

## 🗄️ Database (Supabase)

* User authentication (sign-up/login).
* Activity logs stored in Supabase tables (`transportation`, `energy`, `food`).
* Real-time updates and dashboard sync.
* Easy scalability via PostgreSQL backend.

Example schema snippet:

```sql
create table activities (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users,
  activity_type text,
  data jsonb,
  carbon_kg numeric,
  points_earned integer,
  created_at timestamp default now()
);
```

---

## 🚀 Getting Started

### 1️⃣ Prerequisites

* Node.js v18+
* npm or yarn
* Supabase account & project setup

### 2️⃣ Installation

```bash
git clone https://github.com/JV-Vigneesh/EcoTrack-Carbon-Footprint-Tracker-App.git
cd EcoTrack-Carbon-Footprint-Tracker-App
npm install
```

### 3️⃣ Configure Supabase

Create a `.env` file:

```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

### 4️⃣ Run the App

```bash
npm run dev
```

Then open: [http://localhost:5173](http://localhost:5173)

---

## 💡 Future Enhancements

* 🏆 Leaderboards for top eco-friendly users.
* 📈 Community goals and challenges.
* 🌐 Integration with carbon offset APIs.
* 📱 Mobile PWA support.

---

## 📜 License

This project is licensed under the **MIT License**.
Feel free to use and modify it for educational or personal projects.

---

## 👨‍💻 Author

Developed with 💚 by [**JV Vigneesh**](https://github.com/JV-Vigneesh)

> “Measure what matters, change what counts — your footprint today shapes tomorrow.”
