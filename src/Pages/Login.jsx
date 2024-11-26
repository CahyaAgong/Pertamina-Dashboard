import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AlertTriangle, Droplet, Battery, MapPin, DollarSign } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from './../Component/ui/card';
import { Alert, AlertDescription } from './../Component/ui/alert'

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(redirectPage, 1000);
  };

  const handleSSOLogin = (provider) => {
    setLoading(true);
    // Simulated SSO login
    setTimeout(redirectPage, 1000);
  };

  const redirectPage = () => {
    setLoading(false)

    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={require('./../Assets/Image/pertamina-logo.png')} alt="Pertamina Logo" className="h-12" />
              <div className="text-xl font-semibold text-white">Executive IoT Monitoring System</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Login Section */}
          <div className="space-y-6">
            <Card className="border-t-4 border-t-red-600">
              <CardHeader>
                <CardTitle className="text-red-700">Executive Login</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                    <input 
                      type="text" 
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none"
                      placeholder="Enter your Employee ID"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                      type="password" 
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none ${loading ? 'opacity-75' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login to Dashboard'}
                  </button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with SSO</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleSSOLogin('microsoft')}
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Microsoft SSO
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSSOLogin('google')}
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Google SSO
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Alert variant="warning" className="bg-red-50 border-red-200">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription>
                This is a secure system. Unauthorized access is strictly prohibited and monitored.
              </AlertDescription>
            </Alert>
          </div>

          {/* Preview Stats Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-red-700">Real-Time Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Droplet className="h-5 w-5 text-blue-500" />
                    <div className="text-sm font-medium text-gray-600">Active Barrels</div>
                  </div>
                  <div className="mt-2 text-2xl font-bold">14,382</div>
                  <div className="text-sm text-green-600">+2.4% from yesterday</div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div className="text-sm font-medium text-gray-600">Alerts</div>
                  </div>
                  <div className="mt-2 text-2xl font-bold">7</div>
                  <div className="text-sm text-red-600">Critical: 2</div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <div className="text-sm font-medium text-gray-600">Daily Revenue</div>
                  </div>
                  <div className="mt-2">
                    <div className="text-xl font-bold">Rp 42.5B</div>
                    <div className="text-lg text-gray-600">$2.7M USD</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Battery className="h-5 w-5 text-orange-500" />
                    <div className="text-sm font-medium text-gray-600">Sensor Status</div>
                  </div>
                  <div className="mt-2 text-2xl font-bold">98.7%</div>
                  <div className="text-sm text-green-600">Operational</div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-t-4 border-t-red-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-red-500" />
                    <div className="font-medium">Distribution Centers Revenue</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Jakarta Distribution Center</span>
                      <span>4,521 barrels</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Daily Revenue</span>
                      <span>Rp 18.2B (USD 1.16M)</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Surabaya Hub</span>
                      <span>3,842 barrels</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Daily Revenue</span>
                      <span>Rp 14.8B (USD 945K)</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Medan Facility</span>
                      <span>2,890 barrels</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Daily Revenue</span>
                      <span>Rp 9.5B (USD 605K)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login