import React, { Fragment, useRef, useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from "./../Component/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "./../Component/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./../Component/ui/dialog";

import { FIX_NUMBER } from './../utils/constants'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Truck, Package, MapPin, TrendingUp, Clock, AlertCircle, CheckCircle, Share2, Droplet, Timer } from 'lucide-react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Enhanced mock data
const volumeData = [
  { name: 'Jakarta', volume: 15000, value: 15000, revenue: 450000000 },
  { name: 'Surabaya', volume: 12000, value: 12000, revenue: 360000000 },
  { name: 'Medan', volume: 8000, value: 8000, revenue: 240000000 },
  { name: 'Makassar', volume: 6000, value: 6000, revenue: 180000000 },
  { name: 'Balikpapan', volume: 5000, value: 5000, revenue: 150000000 }
];

const timeData = [
  { time: '00:00', volume: 4200 },
  { time: '04:00', volume: 3800 },
  { time: '08:00', volume: 5100 },
  { time: '12:00', volume: 5800 },
  { time: '16:00', volume: 4900 },
  { time: '20:00', volume: 4300 }
];

const truckData = [
  {
    id: 'TRK-001',
    status: 'In Transit',
    location: 'Jakarta - Bandung',
    barrels: 48,
    fillLevel: 92,
    temperature: 25.4,
    pressure: 2.1,
    lastUpdate: '10 minutes ago',
    eta: '2 hours',
    driver: 'Budi Santoso',
    route: 'Route A-12'
  },
  {
    id: 'TRK-002',
    status: 'Loading',
    location: 'Surabaya Hub',
    barrels: 36,
    fillLevel: 45,
    temperature: 24.8,
    pressure: 2.0,
    lastUpdate: '5 minutes ago',
    eta: 'N/A',
    driver: 'Ahmad Yani',
    route: 'Route B-08'
  },
  {
    id: 'TRK-003',
    status: 'Delivered',
    location: 'Medan Terminal',
    barrels: 52,
    fillLevel: 100,
    temperature: 26.1,
    pressure: 2.2,
    lastUpdate: '2 minutes ago',
    eta: 'Completed',
    driver: 'Rudi Hartono',
    route: 'Route C-15'
  }
];

const COLORS = ['#FF4136', '#FF725C', '#FF9A8B', '#FFB4A2', '#FFCDB2'];

const StatusIndicator = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Transit': return 'text-blue-500';
      case 'Loading': return 'text-yellow-500';
      case 'Delivered': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Transit': return <Share2 className={`h-4 w-4 ${getStatusColor(status)}`} />;
      case 'Loading': return <Timer className={`h-4 w-4 ${getStatusColor(status)}`} />;
      case 'Delivered': return <CheckCircle className={`h-4 w-4 ${getStatusColor(status)}`} />;
      default: return <AlertCircle className={`h-4 w-4 ${getStatusColor(status)}`} />;
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {getStatusIcon(status)}
      <span className={`text-sm ${getStatusColor(status)}`}>{status}</span>
    </div>
  );
};

const PertaminaDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [truckDetail, setTruckDetail] = useState(null)

  const [isUSD, setIsUSD] = useState(false)

  const dashboardRef = useRef();
  
  
  const openDialog = (id) => {
    const truckDetail = truckData.filter(item => item.id === id)
    setTruckDetail(truckDetail[0])
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  const convertToUSD = (amountInIDR) => {
    return amountInIDR * FIX_NUMBER.exchangeRate;
  };

  const formatNumber = (number) => {
    return number.toLocaleString(); // Menambahkan pemisah ribuan
  };

  const formatUSD = (number) => {
    const integerPart = Math.floor(number);
    const decimalPart = (number % 1).toFixed(2).slice(2);
    return `${formatNumber(integerPart)}.${decimalPart}`;
  };

  const TruckDetailDialog = ({ truck }) => {

    const totalInIDR = truck.barrels * FIX_NUMBER.barrelToLiter * FIX_NUMBER.perBarrel;

    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Truck className="h-5 w-5 text-red-600" />
            <span>{truck.id} Details</span>
          </DialogTitle>
        </DialogHeader>
    
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Status</p>
            <StatusIndicator status={truck.status} />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-sm font-medium">{truck.location}</p>
          </div>
    
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Barrels</p>
            <p className="text-sm font-medium">{truck.barrels} units</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Fill Level</p>
            <p className="text-sm font-medium">{truck.fillLevel}%</p>
          </div>
    
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Temperature</p>
            <p className="text-sm font-medium">{truck.temperature}°C</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Pressure</p>
            <p className="text-sm font-medium">{truck.pressure} bar</p>
          </div>
    
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Driver</p>
            <p className="text-sm font-medium">{truck.driver}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Route</p>
            <p className="text-sm font-medium">{truck.route}</p>
          </div>
    
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Last Update</p>
            <p className="text-sm font-medium">{truck.lastUpdate}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">ETA</p>
            <p className="text-sm font-medium">{truck.eta}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Calculation</p>
            <p className="text-sm font-medium">
            {!isUSD
              ? `Rp ${formatNumber(totalInIDR)}`
              : `$ ${formatUSD(convertToUSD(totalInIDR))}`}
            </p>
          </div>
        </div>
      </DialogContent>
    )
  };

  const handleExportPDF = async () => {
    const element = dashboardRef.current;

    // Ambil screenshot elemen dengan html2canvas
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    // Buat dokumen PDF dengan jsPDF
    const pdf = new jsPDF();
    const imgWidth = 190; // Lebar gambar dalam PDF (dalam mm)
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Rasio gambar

    // Tambahkan gambar ke dokumen PDF
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

    // Unduh PDF
    pdf.save('dashboard.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6" ref={dashboardRef}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <img src={require('./../Assets/Image/pertamina-logo.png')} className='w-8 h-8' alt="company-logo" />
          <h1 className="text-2xl font-bold text-gray-900">Pertamina IoT Barrel Monitoring</h1>
          <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">Live Data</span>
        </div>

        <div className='flex items-center space-x-3'>
          <label className="inline-flex space-x-2 items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" onChange={(e) => setIsUSD(e.target.checked)} />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="text-xs font-medium text-gray-900">IDR / USD</span>
          </label>

          <button onClick={handleExportPDF} className='px-4 py-2 text-sm font-medium text-black bg-white rounded-md shadow-md hover:bg-[#f3f4f6] flex items-center space-x-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>

            <span>Export PDF</span>
          </button>

          <Tabs defaultValue="daily" className="w-[300px]" onValueChange={setSelectedPeriod}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Barrels</CardTitle>
            <Package className="h-4 w-4 text-red-600" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">46,000</div>
            <p className="text-xs text-green-500">+12.5% from last {selectedPeriod}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Trucks</CardTitle>
            <Truck className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">284</div>
            <p className="text-xs text-gray-500">Currently in transit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {/* Rp 892.5M */}
              {!isUSD 
                ? `Rp ${formatNumber(FIX_NUMBER.amountInIDR)}` 
                : `$ ${formatUSD(convertToUSD(FIX_NUMBER.amountInIDR))}`
              }
            </div>
            <p className="text-xs text-green-500">+8.2% from last {selectedPeriod}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Delivery Time</CardTitle>
            <Clock className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2h</div>
            <p className="text-xs text-blue-500">-18min from last {selectedPeriod}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Map and Active Trucks */}
        <div className="col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribution Map</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <div className="h-[350px] bg-gray-200 rounded flex items-center justify-center">
                <p className="text-gray-500">Interactive Map View</p>
                <MapPin size={40} color="blue" />
              </div> */}

              <MapContainer center={[-6.2248327, 106.8379731]} zoom={15} style={{ height: "300px", width: "100%" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[-6.2248327, 106.8379731]}>
                  <Popup>
                    <div className='inline-flex items-center space-x-2'>
                      {/* <MapPin size={24} color="red" /> */}
                      <Truck className="h-4 w-4 text-red-600" />
                      <i className='text-sm'>This is the location!</i>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Trucks Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {truckData.map((truck) => (
                  <Fragment key={truck.id}>
                      <DialogTrigger asChild>
                        <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow" onClick={() => openDialog(truck.id)}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Truck className="h-5 w-5 text-red-600" />
                              <div>
                                <p className="font-medium">{truck.id}</p>
                                <p className="text-sm text-gray-500">{truck.location}</p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <StatusIndicator status={truck.status} />
                              <div className="text-right">
                                <p className="font-medium">{truck.barrels} barrels</p>
                                <p className="text-sm text-gray-500">Fill: {truck.fillLevel}%</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogTrigger>

                      {truckDetail && 
                        <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
                          <TruckDetailDialog truck={truckDetail} />
                        </Dialog>
                      }
                    </Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column Charts */}
        <div className="col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Volume by Region</CardTitle>
            </CardHeader>

            <CardContent className='w-full h-[300px] flex justify-center'>
              <PieChart width={300} height={300}>
                <Pie
                  data={volumeData}
                  cx={150}
                  cy={150}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name }) => name}
                >
                  {volumeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>24h Volume Timeline</CardTitle>
            </CardHeader>

            <CardContent>
              <LineChart width={300} height={200} data={timeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="volume" stroke="#FF4136" />
              </LineChart>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Chart */}
        <Card className="col-span-12">
          <CardHeader>
            <CardTitle>Volume Trends by Region</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart width={1000} height={300} data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="volume" fill="#FF4136" />
            </BarChart>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PertaminaDashboard;
