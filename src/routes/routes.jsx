
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout/MainLayout';
import ErrorPage from '../Conponent/ErrorPage/ErrorPage';
import Home from '../Pages/Home/Home';
import Blog from '../Pages/Blog/Blog';
import Login from './../Pages/Login/Login';
import DonationRequests from '../Pages/DonationRequests/DonationRequests';
import Register from '../Pages/Register/Register';
import DashBoard from '../Layout/DashBoard/DashBoard';
import PrivateRoute from './PrivateRoute';
import AdminProfile from '../Pages/Dashboard/AdminProfile/AdminProfile';
import VolunteerProfile from '../Pages/Dashboard/VolunteerProfile/VolunteerProfile';
import UserProfile from '../Pages/Dashboard/UserProfile/UserProfile';
import AdminDashboard from '../Pages/Dashboard/AdminDashboard/AdminDashboard';
import AllUsers from '../Pages/Dashboard/AllUsers/AllUsers';
import AllBloodDonation from './../Pages/Dashboard/AllBloodDonation/AllBloodDonation';
import ContentManagement from '../Pages/Dashboard/ContentManagement/ContentManagement';

import UserDashboard from '../Pages/Dashboard/UserDashboard/UserDashboard';
import MyDonationRequests from '../Pages/Dashboard/MyDonationRequests/MyDonationRequests';
import CreateDonationRequest from '../Pages/Dashboard/CreateDonationRequest/CreateDonationRequest';
import AdminRoutes from './AdminRoutes';
import VolunteerRoutes from './VolunteerRoutes';

import UpdateProfile from '../Pages/Dashboard/UpdateProfile/updateProfile';

const routes = createBrowserRouter([
    {
        path:'/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path:'/',
                element: <Home></Home>,
            },
            {
                path: 'blog',
                element: <Blog></Blog>
            },
            {
                path: 'donationRequests',
                element: <DonationRequests></DonationRequests>
            },{
                path:'/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
        
            }
            
        ]
    },
    {
        path:'/dashBoard',
        element:<PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children:[
            // donor routes
            {
                path: 'userProfile',
                element: <UserProfile></UserProfile>
            },
            
            {
                path: 'userDashboard',
                element: <UserDashboard></UserDashboard>
            },
            {
                path:'myDonationRequests',
                element: <MyDonationRequests></MyDonationRequests>
            },
            {
                path: 'createDonationRequest',
                element: <CreateDonationRequest></CreateDonationRequest>
            },




            // admin routes 
            {
                path: 'adminProfile',
                element: <AdminRoutes><AdminProfile></AdminProfile></AdminRoutes>
            },
            {
                path:'adminUpdateProfile/:id',
                element: <UpdateProfile></UpdateProfile>
                
            },
            {
                path: 'adminDashboard',
                element: <AdminRoutes><AdminDashboard></AdminDashboard></AdminRoutes>
            },
            {
                path:'allUsers',
                element:<AdminRoutes><AllUsers></AllUsers></AdminRoutes>
            },
            {
                path: 'admin/allBloodDonation',
                element: <AdminRoutes><AllBloodDonation></AllBloodDonation></AdminRoutes>
            },
            {
                path: 'admin/contentManagement',
                element: <AdminRoutes><ContentManagement></ContentManagement></AdminRoutes>
            },


            // volunteer routes 
            {
                path: 'volunteerProfile',
                element: <VolunteerRoutes><VolunteerProfile></VolunteerProfile></VolunteerRoutes>
            },
            {
                path: 'volunteerDashboard',
                element: <VolunteerRoutes><AdminDashboard></AdminDashboard></VolunteerRoutes>
            },
            {
                path:'volunteer/allBloodDonation',
                element: <VolunteerRoutes><AllBloodDonation></AllBloodDonation></VolunteerRoutes>
            },
            {
                path: 'volunteer/contentManagement',
                element: <VolunteerRoutes><ContentManagement></ContentManagement></VolunteerRoutes>
            }
        ]
    }
    
])

export default routes;