export const deviceCategories = [
  { id: "phone", label: "Phone", icon: "Smartphone", baseKg: 0.18 },
  { id: "laptop", label: "Laptop", icon: "Laptop", baseKg: 2.1 },
  { id: "tablet", label: "Tablet", icon: "Tablet", baseKg: 0.65 },
  { id: "console", label: "Console", icon: "Gamepad2", baseKg: 2.8 }
];

export const brands = [
  {
    name: "Apple",
    models: ["iPhone 13 Pro", "iPhone 11", "MacBook Air M1", "iPad Pro 11"]
  },
  {
    name: "Samsung",
    models: ["Galaxy S22", "Galaxy Tab S8", "Galaxy Note 20", "Galaxy A72"]
  },
  {
    name: "Dell",
    models: ["XPS 13", "Latitude 7420", "Inspiron 15", "Alienware M15"]
  },
  {
    name: "Sony",
    models: ["PlayStation 4", "PlayStation 5", "Xperia 5", "Vaio Fit"]
  }
];

export const conditionOptions = [
  { id: "powersOn", label: "Device powers on", impact: 0.2 },
  { id: "screenGood", label: "Screen is reusable", impact: 0.18 },
  { id: "batteryOk", label: "Battery holds charge", impact: 0.1 },
  { id: "bodyGood", label: "Body has minor wear", impact: 0.08 },
  { id: "partsMissing", label: "No key parts missing", impact: 0.12 }
];

export const dashboardStats = [
  { label: "Total Earned", value: "PKR 86,400" },
  { label: "Devices Submitted", value: "18" },
  { label: "kg Diverted", value: "38.6" },
  { label: "Green Score", value: "920" }
];

export const submissions = [
  { id: "ES-1042", device: "iPhone 11", date: "12 Jun 2026", amount: "PKR 18,500", status: "Paid" },
  { id: "ES-1041", device: "Dell XPS 13", date: "08 Jun 2026", amount: "PKR 42,000", status: "Collected" },
  { id: "ES-1037", device: "Galaxy Tab S8", date: "01 Jun 2026", amount: "PKR 25,900", status: "Pending" }
];

export const catalogueItems = [
  {
    id: "CMP-8801",
    image: "https://mobiletrade.pk/wp-content/uploads/2023/10/1-55.jpg",
    type: "Phone",
    brand: "Apple",
    component: "OLED Display",
    grade: "A",
    price: 14500
  },
  {
    id: "CMP-7712",
    image: "https://snpi.dell.com/snp/images/products/large/en-sg~CPA-VG93V/CPA-VG93V.jpg",
    type: "Laptop",
    brand: "Dell",
    component: "Motherboard",
    grade: "B",
    price: 22000
  },
  {
    id: "CMP-5510",
    image: "https://static-01.daraz.pk/p/1da732f487c72825dd6dc89ff4354073.jpg",
    type: "Tablet",
    brand: "Samsung",
    component: "Battery Pack",
    grade: "A",
    price: 7200
  },
  {
    id: "CMP-3388",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFgPbljUC1thkyZBhO92iAwH8Oz5bF44c8WJJLAF6eOw5D4LJLACetQ6cy&s=10",
    type: "Console",
    brand: "Sony",
    component: "Cooling Fan",
    grade: "C",
    price: 3900
  }
];
